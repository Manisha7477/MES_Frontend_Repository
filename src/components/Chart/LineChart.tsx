import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"

interface ILineChartProps {
  chartData: any
  chartConfig?: Record<string, any>
}

ChartJs.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
)

const LineChart: React.FunctionComponent<ILineChartProps> = ({
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
      <Line data={chartData} options={chartOption} />
    </div>
  )
}

export default LineChart
