import PageTemplate from "@/templates/page-template";
import Menu from "./menu";
import DragAndDropList from "@/components/dnd";

const Configurations = () => {
  return (
    <PageTemplate
      title="Configurations"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Configurations",
        },
      ]}
    >
      <Menu />
      {/* <DragAndDropList /> */}
    </PageTemplate>
  );
};

export default Configurations;
