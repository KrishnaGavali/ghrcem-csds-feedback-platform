import FeedbackForm from "@/components/formsubmit/form";
import Navbar from "@/components/formsubmit/navbar";
import { useForm } from "@/context/Form";
import { useEffect, useState } from "react";
import { databases } from "@/handlers/appwrite";
import { Query } from "appwrite";
import { useLocation } from "react-router";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const FormSubmit = () => {
  const { setFaculties } = useForm();
  const { search } = useLocation();
  const [validFormId, setValidFormId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(search);
  const formId = queryParams.get("formId");

  if (!formId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6 shadow-md rounded-2xl">
          <p className="text-red-500 text-lg">Form ID is missing in the URL.</p>
        </Card>
      </div>
    );
  }

  const fetchFaculty = async () => {
    try {
      // 1. Check cache first
      const cached = localStorage.getItem(`faculties_${formId}`);
      if (cached === "Invalid") {
        setValidFormId(null);
        setLoading(false);
        return;
      }

      if (cached) {
        const parsed = JSON.parse(cached);
        const now = Date.now();

        if (parsed.ts && now - parsed.ts < CACHE_TTL) {
          setFaculties(parsed.faculties);
          setValidFormId(formId);
          setLoading(false);
          return;
        } else {
          localStorage.removeItem(`faculties_${formId}`);
        }
      }

      // 2. Fetch from Appwrite if not cached or expired
      const res = await databases.listRows({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "forms",
        queries: [
          Query.equal("$id", formId),
          Query.limit(1),
          Query.select(["$id", "Faculties", "Type", "Name", "Branch"]),
        ],
      });

      if (res.total === 0) {
        localStorage.setItem(`faculties_${formId}`, "Invalid");
        setValidFormId(null);
        setLoading(false);
        return;
      }

      const faculties = JSON.parse(res.rows[0].Faculties || "[]");

      // Save to context + localStorage with TTL
      setFaculties(faculties);
      localStorage.setItem(
        `faculties_${formId}`,
        JSON.stringify({ faculties, ts: Date.now() })
      );

      setValidFormId(formId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching form:", error);
      setValidFormId(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Delay fetch by 2 seconds to avoid "flash of invalid form"
    const timer = setTimeout(() => {
      fetchFaculty();
    }, 1500);

    return () => clearTimeout(timer);
  }, [formId]);

  // Loader while fetching
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  // Render error if invalid formId
  if (validFormId === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6 shadow-md rounded-2xl">
          <p className="text-red-500 text-lg">
            Invalid Form ID or form not found.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <FeedbackForm />
    </div>
  );
};

export default FormSubmit;
