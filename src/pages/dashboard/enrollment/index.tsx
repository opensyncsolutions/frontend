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
import EditEnrollment from "./edit-enrollment";
import BasicDetails from "./basic-details";
import Disbursement from "./disbursement";
import BloodCollection from "./blood-collection";
import DataCollection from "./data-collection";
import Eac from "./eac";

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
  ];

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
          : search?.get("edit") === "true" && editEnrollmentsRole
          ? []
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
            ]
      }
      tabKey={tabkey}
      titleActions={
        !enrollment ? undefined : editEnrollmentsRole &&
          search?.get("edit") !== "true" ? (
          <Button
            className="gap-2"
            onClick={() => {
              search.set("edit", "true");
              setSearch(search);
            }}
          >
            <Edit2Icon size={14} /> Edit
          </Button>
        ) : editEnrollmentsRole && search?.get("edit") === "true" ? (
          <>
            <Button
              variant={"outline"}
              onClick={() => {
                search.delete("edit");
                setSearch(search);
              }}
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </>
        ) : undefined
      }
    >
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {enrollmentError && (
        <Error
          message={formatErrorMessage(enrollmentError)}
          refetch={() => {
            setLoading(true);
            enrollmentRefetch().finally(() => {
              setLoading(false);
            });
          }}
        />
      )}
      {enrollment && (
        <>
          {search.get("edit") === "true" && editEnrollmentsRole && (
            <EditEnrollment id={id || ""} />
          )}
          {search.get("edit") !== "true" && (
            <>
              {!tabs.includes(tab || "") && <BasicDetails id={id || ""} />}
              {tab === "disbursements" && <Disbursement id={id || ""} />}
              {tab === "blood-collections" && <BloodCollection id={id || ""} />}
              {tab === "data-collections" && <DataCollection id={id || ""} />}
              {tab === "eacs" && <Eac id={id || ""} />}
            </>
          )}
        </>
      )}
    </PageTemplate>
  );
};

export default Enrollment;
