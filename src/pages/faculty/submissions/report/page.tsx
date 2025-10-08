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
    console.log(submissions);

    // if (!formId) {
    //   navigate("/faculty/dashboard");
    //   return;
    // }

    try {
      console.log("Fetching form data for formId:", formId);

      const res = await databases.getRow({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "forms",
        rowId: formId || "",
      });

      console.log("Form fetch response:", res);

      // if (!formData) {
      //   navigate("/faculty/dashboard");
      //   return;
      // }

      setFormData({
        Name: res.Name,
        Type: res.Type,
        Branch: res.Branch,
        Faculties: JSON.parse(res.Faculties || "[]"),
      });

      console.log("Form fetch result:", res);
    } catch (error) {
      console.log(error);
    }
  }, [formId, navigate]);

  const getSubmissions = useCallback(async () => {
    try {
      const res = await databases.getRow({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "submissions",
        rowId: formId || "",
        queries: [Query.select(["Submissions"])],
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
      <FormSummary id={formId || ""} type={formData?.Type || ""} />
    </div>
  );
};

export default ReportPage;
