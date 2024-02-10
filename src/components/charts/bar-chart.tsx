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

interface BarChartProps {
  data: {
    name: string;
    uv: number;
    pv?: number;
  }[];
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
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={3}>
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 10,
          left: 0,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          height={70}
          tick={<CustomizedXAxisTick />}
          interval={"preserveStartEnd"}
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
          content={(props) => <CustomTooltip {...props} data={data} />}
          cursor={false}
        />
        <Bar
          dataKey="uv"
          name={names?.uv}
          barSize={45}
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
