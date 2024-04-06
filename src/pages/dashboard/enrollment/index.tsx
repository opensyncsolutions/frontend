import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { useGetMe } from "@/shared/services/auth";
import { useEnrollement } from "@/shared/services/enrollments";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import PageTemplate from "@/templates/page-template";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EditEnrollment from "./edit";
import BasicDetails from "./basic-details";
import Disbursement from "./disbursement";
import BloodCollection from "./blood-collection";
import DataCollection from "./data-collection";
import Eac from "./eac";
import Phones from "./phones";

const tabkey = "tab";

const Enrollment = () => {
  const [search, setSearch] = useSearchParams();
  const { me } = useGetMe();
  const { editEnrollmentsRole } = getRoles(me?.roles || []);
  const id = useParams()?.id;
  const [loading, setLoading] = useState(false);
  const { enrollment, enrollmentLoading, enrollmentError, enrollmentRefetch } =
    useEnrollement(id || "");

  const isLoading = loading || enrollmentLoading;

  const tab = search.get(tabkey);

  const tabs = [
    "disbursements",
    "blood-collections",
    "data-collections",
    "eacs",
    "phones",
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (enrollmentError) {
    return (
      <Error
        message={formatErrorMessage(enrollmentError)}
        refetch={() => {
          setLoading(true);
          enrollmentRefetch().finally(() => {
            setLoading(false);
          });
        }}
      />
    );
  }

  if (search?.get("edit") === "true" && editEnrollmentsRole) {
    return <EditEnrollment id={id || ""} />;
  }

  return (
    <PageTemplate
      title="Enrollment"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Enrollments",
          to: "/enrollments",
        },
        {
          label: "Enrollment",
        },
      ]}
      tabs={
        !enrollment
          ? undefined
          : [
              {
                name: "Basic Details",
                value: "basic",
              },
              {
                name: "Cash Disbursement",
                value: "disbursements",
              },
              {
                name: "Blood Collections",
                value: "blood-collections",
              },
              {
                name: "Data Collections",
                value: "data-collections",
              },
              {
                name: "EACs",
                value: "eacs",
              },
              {
                name: "Phones",
                value: "phones",
              },
            ]
      }
      tabKey={tabkey}
      titleActions={
        !enrollment ? undefined : editEnrollmentsRole ? (
          <Button
            className="gap-2"
            onClick={() => {
              search.set("edit", "true");
              setSearch(search);
            }}
          >
            <Edit2Icon size={14} /> Edit
          </Button>
        ) : undefined
      }
    >
      {!tabs.includes(tab || "") && <BasicDetails id={id || ""} />}
      {tab === "disbursements" && <Disbursement id={id || ""} />}
      {tab === "blood-collections" && <BloodCollection id={id || ""} />}
      {tab === "data-collections" && <DataCollection id={id || ""} />}
      {tab === "eacs" && <Eac id={id || ""} />}
      {tab === "phones" && <Phones id={id || ""} />}
    </PageTemplate>
  );
};

export default Enrollment;
