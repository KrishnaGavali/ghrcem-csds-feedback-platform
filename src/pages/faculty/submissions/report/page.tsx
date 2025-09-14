import Navbar from "@/components/dashboard/navbar";
import FormInfo from "@/components/report/FormInfo";
import FormSummary from "@/components/report/FormSummary";
import { databases } from "@/handlers/appwrite";
import { Query } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

type formDataType = {
  Name: string;
  Type: string;
  Branch: string;
  Faculties: { facultyName: string; subject: string }[];
};

const ReportPage = () => {
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("formId");
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataType | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);

  const getformData = useCallback(async () => {
    // setLoading(true);

    if (!formId) {
      navigate("/faculty/dashboard");
      return;
    }

    try {
      const res = await databases.listRows({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "forms",
        queries: [
          Query.search("$id", formId),
          Query.limit(1),
          Query.select(["Faculties", "Type", "Name", "Branch"]),
        ],
      });

      const formData = res.rows[0];

      if (!formData) {
        navigate("/faculty/dashboard");
        return;
      }

      setFormData({
        Name: formData.Name,
        Type: formData.Type,
        Branch: formData.Branch,
        Faculties: JSON.parse(formData.Faculties || "[]"),
      });

      console.log("Form fetch result:", res);
    } catch (error) {
      console.log(error);
    }
  }, [formId, navigate]);

  const getSubmissions = useCallback(async () => {
    try {
      const res = await databases.listRows({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "submissions",
        queries: [
          Query.equal("FormId", formId || ""),
          Query.select(["submission"]),
        ],
      });

      console.log("Submissions fetch result:", res);

      setSubmissions(res.rows);
    } catch (error) {
      console.log(error);
    }
  }, [formId]);

  useEffect(() => {
    getformData();
    getSubmissions();
  }, [getformData]);

  return (
    <div className="flex flex-col h-screen gap-2.5">
      <Navbar />
      <FormInfo
        Name={formData?.Name || ""}
        Type={formData?.Type || ""}
        Branch={formData?.Branch || ""}
      />
      <FormSummary
        submissions={submissions}
        faculties={formData?.Faculties || []}
      />
    </div>
  );
};

export default ReportPage;
