import RoundedProgressBar from "@/components/progress-bar/rounded-progress-bar";
import { Card } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { useDashboardSummary } from "@/shared/services/summary";

interface SummaryProps {
  objective?: "" | "/obj2";
}

const arrayOfObjects = (data: DashboardSummaryType | object) =>
  Object.entries(data)
    .filter(([_, value]) => typeof value === "object")
    .map(([_, value]) => ({
      title: value.title,
      stat: value.stat,
      value: value.value,
    }));

const Summary = ({ objective = "" }: SummaryProps) => {
  const { dashboardSummary, dashboardSummaryLoading } =
    useDashboardSummary(objective);

  const summary = arrayOfObjects(dashboardSummary || {});

  if (dashboardSummaryLoading)
    return (
      <div className="h-12 flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="">
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 w-full",
          "transition-all"
        )}
      >
        {summary?.map((item, i) => {
          return (
            <Card
              className="animate-fade-in p-4 flex items-center gap-5 flex-wrap justify-center w-full"
              key={i}
            >
              <div
                className={cn(
                  "lg:!w-[calc(100%-140px)] w-full text-center lg:text-left",
                  "flex flex-col gap-3"
                )}
              >
                <span>{item?.title}</span>
                <span className="font-bold text-2xl">{item?.stat}</span>
              </div>
              <div className="max-w-[120px]">
                <RoundedProgressBar
                  percent={item?.value > 100 ? 100 : item?.value}
                  value={item?.value}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
