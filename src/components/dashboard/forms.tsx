import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FormCard from "./formcard";
import { databases } from "@/handlers/appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/context/Auth";

type Faculty = {
  facultyName: string;
  subject: string;
};

type DefaultRow = {
  Name: string;
  Type: string;
  Branch: string;
  Faculties: Array<Faculty>;
  $id: string;
};

const FormsList = () => {
  const [forms, setForms] = useState<DefaultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const fetchForms = async () => {
    if (!isAuth) return; // Don't fetch if user not authenticated
    setLoading(true);
    try {
      const res = await databases.listRows({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "forms",
      });

      setForms(
        res.rows.map((row: any) => ({
          $id: row.$id,
          Name: row.Name || "",
          Type: row.Type || "",
          Branch: row.Branch || "",
          Faculties: JSON.parse(row.Faculties || "[]"),
        }))
      );
    } catch (err) {
      console.error("Error fetching forms:", err);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load + auth check
  useEffect(() => {
    if (!isAuth) {
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
      return;
    }

    const delayTimeout = setTimeout(() => {
      fetchForms();
    }, 1500);

    return () => clearTimeout(delayTimeout);
  }, [isAuth]);

  return (
    <div className="mt-4 w-full">
      {!isAuth ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-red-600 text-lg font-medium">
            Invalid access. Redirecting...
          </p>
        </div>
      ) : (
        <>
          {/* Header with Refresh Button */}
          <div className="flex justify-end items-center mb-4">
            <Button
              onClick={fetchForms}
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="flex flex-wrap gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-full sm:w-72 bg-card border border-border rounded-xl shadow-md animate-pulse"
                >
                  <div className="p-6 flex flex-col gap-4">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-6 w-full rounded-md" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                    <div className="border-t border-border my-2"></div>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : forms.length === 0 ? (
            <div className="flex justify-center mt-8">
              <p className="text-muted-foreground text-lg font-medium">
                No forms available.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {forms.map((form) => (
                <FormCard
                  key={form.$id}
                  id={form.$id}
                  name={form.Name}
                  branch={form.Branch}
                  type={form.Type}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FormsList;
