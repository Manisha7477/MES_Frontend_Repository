import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

interface IBarChartProps {
  chartData: any
  chartConfig?: Record<string, any>
}

ChartJs.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale, Title)

const BarChart: React.FunctionComponent<IBarChartProps> = ({
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
    scales: {
      x: {
        title: {
          display: chartConfig?.displayXaxisTitle ?? false,
          text: chartConfig?.xAxisTitle ?? "",
        },
      },
      y: {
        title: {
          display: chartConfig?.displayYaxisTitle ?? false,
          text: chartConfig?.yAxisTitle ?? "",
        },
      },
    },
  }
  return (
    <div className="chart">
      <Bar data={chartData} options={chartOption} />
    </div>
  )
}

export default BarChart
