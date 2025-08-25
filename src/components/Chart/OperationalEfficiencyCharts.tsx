import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
);

interface OperationalEfficiencyChartsProps {
  barData?: ChartData<"bar">;
  lineData?: ChartData<"line">;
  type: "bar" | "line";
}

const OperationalEfficiencyCharts: React.FC<OperationalEfficiencyChartsProps> = ({
  barData,
  lineData,
  type,
}) => {
  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
          },
        },
      },
    },
  };

  if (type === "bar" && barData) {
    return <Bar data={barData} options={options} />;
  } else if (type === "line" && lineData) {
    return <Line data={lineData} options={options} />;
  }
  return null;
};

export default OperationalEfficiencyCharts;
