import Summary from "./summary";

interface PageProps {
  objective?: "" | "/obj2";
}

const Page = ({ objective = "" }: PageProps) => {
  return (
    <div className="animate-fade-in">
      <Summary objective={objective} />
    </div>
  );
};

export default Page;
