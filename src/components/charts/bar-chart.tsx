import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend,
} from "recharts";
import { CustomTooltip, CustomizedXAxisTick } from "./tools";
import { useWindowSize } from "@/shared/hooks/use-window-size";

interface BarChartProps {
  data: GraphObject[];
  label?: {
    x: string;
    y: string;
  };
  names?: {
    uv: string;
    pv?: string;
  };
  tickCount?: number;
}

const BarGraph = ({ data, label, tickCount = 6, names }: BarChartProps) => {
  const { width } = useWindowSize();
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      aspect={width < 767 ? 1 : width < 1200 ? 2 : 3}
    >
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 0,
          left: -20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          height={width > 767 ? 40 : 90}
          interval={0}
          textAnchor="middle"
          fontSize={10}
          opacity={0.6}
          tick={width < 767 ? <CustomizedXAxisTick /> : undefined}
        >
          <Label value={label?.x} position={"bottom"} fill="black" />
        </XAxis>
        <YAxis tickLine={false} axisLine={false} tickCount={tickCount}>
          <Label
            value={label?.y}
            position={"insideLeft"}
            fill="black"
            angle={-90}
          />
        </YAxis>
        <Tooltip
          content={(props) => (
            <CustomTooltip {...props} data={data} names={names} />
          )}
          cursor={false}
        />
        <Bar
          dataKey="uv"
          name={names?.uv}
          barSize={40}
          fill={"rgba(73, 145, 100, 1)"}
        />
        {typeof data?.[0]?.pv === "number" && (
          <Bar
            dataKey={"pv"}
            name={names?.pv || ""}
            barSize={45}
            fill={"rgba(73, 145, 232, 1)"}
          />
        )}
        {names && <Legend />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
