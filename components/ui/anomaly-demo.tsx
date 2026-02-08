"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";

// Simulated NPDS-style time series with anomalies
const generateData = () => {
  const data = [];
  for (let i = 0; i < 60; i++) {
    const baseline = 100 + Math.sin(i * 0.3) * 20 + Math.sin(i * 0.1) * 30;
    const noise = Math.random() * 10 - 5;
    let value = baseline + noise;

    // Inject anomalies
    if (i === 35) value += 60;
    if (i === 36) value += 55;
    if (i === 37) value += 70;
    if (i === 42) value += 45;

    data.push({
      day: i,
      value: Math.round(value),
      baseline: Math.round(baseline),
      isAnomaly: [35, 36, 37, 42].includes(i),
    });
  }
  return data;
};

const data = generateData();
const anomalyPoints = data.filter((d) => d.isAnomaly);

const CustomDot = (props: {
  cx?: number;
  cy?: number;
  payload?: { isAnomaly: boolean };
}) => {
  const { cx, cy, payload } = props;
  if (!payload?.isAnomaly) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#EF4444"
      stroke="#FCA5A5"
      strokeWidth={2}
    />
  );
};

export default function AnomalyDemo() {
  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold">Anomaly Detection — NPDS Simulation</h4>
          <p className="text-sm text-foreground-muted mt-1">
            Statistical baseline vs. observed substance reports (60-day window)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-foreground-subtle">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-accent-primary inline-block" />
            Observed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-border inline-block border-dashed" />
            Baseline
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            Anomaly
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#737373", fontSize: 11 }}
              label={{
                value: "Day",
                position: "insideBottom",
                offset: -2,
                fill: "#737373",
                fontSize: 11,
              }}
            />
            <YAxis tick={{ fill: "#737373", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid #262626",
                borderRadius: "8px",
                color: "#FAFAFA",
              }}
              formatter={(value, name) => [
                value,
                name === "value" ? "Reports" : "Baseline",
              ]}
            />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#404040"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={<CustomDot />}
            />
            {anomalyPoints.map((point) => (
              <ReferenceDot
                key={point.day}
                x={point.day}
                y={point.value}
                r={0}
                label={{
                  value: "⚠",
                  position: "top",
                  fill: "#EF4444",
                  fontSize: 14,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-foreground-subtle mt-3">
        Red dots indicate anomalous reports flagged 3+ weeks before traditional surveillance methods would detect them.
      </p>
    </div>
  );
}
