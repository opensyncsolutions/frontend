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
  names,
}: TooltipProps<ValueType, NameType> & {
  data: GraphObject[];
  names?: {
    uv: string;
    pv?: string;
  };
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
          {typeof uv === "number" ? (
            <p className={"text-xs"}>
              {names?.uv}: {uv}
            </p>
          ) : null}
          {typeof pv === "number" ? (
            <p className={"text-xs"}>
              {names?.pv}: {pv}
            </p>
          ) : null}
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
        fontSize={11}
      >
        {payload.value}
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
