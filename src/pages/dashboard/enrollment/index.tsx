import { Button } from "@/components/ui/button";
import PageTemplate from "@/templates/page-template";

const Enrollment = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Enrollment",
        },
      ]}
      tabs={[
        {
          name: "Objective 1",
          value: "objective-1",
        },
        {
          name: "Objective 2",
          value: "objective-2",
        },
        {
          name: "Obje 2",
          value: "objective-3",
        },
      ]}
      tabKey="objective"
      title="Enrollment"
      titleActions={
        <div>
          <Button>Download</Button>
        </div>
      }
    >
      Hello enroll please
    </PageTemplate>
  );
};

export default Enrollment;
