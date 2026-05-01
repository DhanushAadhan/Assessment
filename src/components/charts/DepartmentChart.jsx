import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

const DepartmentChart = ({ employees }) => {
  const deptMap = {};
  employees.forEach((e) => {
    deptMap[e.department] = (deptMap[e.department] || 0) + 1;
  });
  const data = Object.entries(deptMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-600 mb-4">
        Department Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={90}
            dataKey="value"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={13}
                  fontWeight="bold"
                >
                  {value}
                </text>
              );
            }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              paddingTop: "16px",
              fontSize: "12px",
              lineHeight: "22px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;