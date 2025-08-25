import {
  ArcElement,
  Chart as ChartJs,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

interface IPieChartProps {
  chartData: any;
  chartConfig?: Record<string, any>;
}

ChartJs.register(ArcElement, Tooltip, Legend, Title);

const PieChart: React.FunctionComponent<IPieChartProps> = ({
  chartData,
  chartConfig,
}) => {
  const chartOption: any = {
    plugins: {
      title: {
        display: chartConfig?.displayTitle ?? false,
        text: chartConfig?.title ?? "",
      },
      legend: {
        display: chartConfig?.displayLegend ?? true,
        position: chartConfig?.legendPosition ?? "bottom",
        labels: {
          fontColor: "#000",
        },
      },
    },
    responsive: true,
  };

  return (
    <div className="chart">
      <Pie data={chartData} options={chartOption} />
    </div>
  );
};

export default PieChart;
// import {
//   ArcElement,
//   Chart as ChartJs,
//   Legend,
//   Title,
//   Tooltip,
// } from "chart.js";
// import { Pie } from "react-chartjs-2";

// interface IPieChartProps {
//   chartData: any;
//   chartConfig?: Record<string, any>;
// }

// ChartJs.register(ArcElement, Tooltip, Legend, Title);

// const PieChart: React.FunctionComponent<IPieChartProps> = ({
//   chartData,
//   chartConfig,
// }) => {
//   const chartOption: any = {
//     plugins: {
//       title: {
//         display: chartConfig?.displayTitle ?? false,
//         text: chartConfig?.title ?? "",
//       },
//       legend: {
//         display: chartConfig?.displayLegend ?? true,
//         position: chartConfig?.legendPosition ?? "bottom",
//         labels: {
//           fontColor: "#000",
//         },
//       },
//     },
//     responsive: true,
//   };

//   return (
//     <div className="chart">
//       <Pie data={chartData} options={chartOption} />
//     </div>
//   );
// };

// export default PieChart;
