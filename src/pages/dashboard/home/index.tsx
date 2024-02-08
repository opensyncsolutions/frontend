import PageTemplate from "@/templates/page-template";
import { useSearchParams } from "react-router-dom";
import Page from "./page";

const tabKey = "objective";

const Home = () => {
  const [search] = useSearchParams();
  const objective = search.get(tabKey);
  return (
    <PageTemplate
      title="Dashboard"
      tabs={[
        {
          name: "Objective 1",
          value: "objective-1",
        },
        {
          name: "Objective 2",
          value: "objective-2",
        },
      ]}
      tabKey={tabKey}
    >
      {objective !== "objective-2" && <Page key={"objective 1"} />}
      {objective === "objective-2" && (
        <Page objective="/obj2" key={"objective 2"} />
      )}
    </PageTemplate>
  );
};

export default Home;
