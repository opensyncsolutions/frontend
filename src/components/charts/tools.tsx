import { cn } from "@/lib/utils";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({
  active,
  payload,
  label,
  data,
}: TooltipProps<ValueType, NameType> & {
  data: {
    name: string;
    uv: number;
    pv?: number;
  }[];
}) => {
  let uv = payload?.[0]?.payload?.uv;
  let pv = payload?.[0]?.payload?.pv;
  if (active && payload && payload.length) {
    const isLastIndex =
      data.findIndex((item) => item?.name === label) === data?.length - 1;

    return (
      <div className="relative">
        <div
          className={cn(
            "w-[12px] h-[16px] translate-y-[-50%] top-[50%] absolute overflow-hidden inline-block",
            !isLastIndex ? "left-[-12px]" : "right-[-12px]"
          )}
        >
          <div
            className={cn(
              "h-12 bg-white",
              !isLastIndex
                ? "-rotate-45 transform origin-top-right rounded-l-[6px]"
                : "rotate-45 transform origin-top-left rounded-r-[6px]"
            )}
            style={{
              boxShadow: "2px 2px 10px 0px rgba(112, 112, 117, 0.30)",
            }}
          />
        </div>
        <div
          className={"bg-white p-3 rounded-[4px]"}
          style={{
            boxShadow: "-2px 2px 10px 0px rgba(112, 112, 117, 0.30)",
          }}
        >
          <h4
            className={"text-xs font-[700]"}
            style={{
              marginBottom: ".5rem",
            }}
          >
            {label}
          </h4>
          <p className={"text-xs"}>{uv}</p>
          <p className={"text-xs"}>{pv}</p>
        </div>
      </div>
    );
  }

  return null;
};

export const CustomizedXAxisTick = ({ ...props }) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill={"#454E57"}
        transform="rotate(-30)"
        opacity={0.6}
      >
        {payload.value?.slice(0, 10) + "..."}
      </text>
    </g>
  );
};

export const CustomizedYAxisTick = ({ ...props }) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill={"#454E57"}>
        {payload.value}
      </text>
    </g>
  );
};
