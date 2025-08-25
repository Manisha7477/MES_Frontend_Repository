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

interface IStackBarChartProps {
  chartConfig?: Record<string, any>
  chartData: any
}

ChartJs.register(BarElement, Tooltip, Legend, CategoryScale, Title, LinearScale)

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Working Employee ",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      backgroundColor: "#716ACA",
      fontColor: "white",
    },
    {
      label: "New Employee ",
      backgroundColor: "#11CDEF",
      fontColor: "#11CDEF",
      data: [12, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
    },
    {
      label: "Allowed Leave ",
      data: [20, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      backgroundColor: "#FFB822",
      fontColor: "white",
    },
    {
      label: "Resigned ",
      backgroundColor: "#F4516C",
      fontColor: "#11CDEF",
      data: [52, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
    },
    {
      label: "Marternity ",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      backgroundColor: "#2DCE89",
      fontColor: "white",
    },
  ],
}

const StackBarChart: React.FunctionComponent<IStackBarChartProps> = ({
  chartConfig,
  chartData,
}) => {
  const optionsChart: any = {
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
        stacked: true,
      },
      y: {
        title: {
          display: chartConfig?.displayYaxisTitle ?? false,
          text: chartConfig?.yAxisTitle ?? "",
        },
        stacked: true,
      },
    },
    // tooltips: { // Khi rê chuột hiển thị từng data
    //   callbacks: {
    //     label: function(item, data) {
    //       var label = data.datasets[item.datasetIndex].label || "";
    //       var yLabel = item.yLabel;
    //       var content = "";
    //       if (data.datasets.length > 1) {
    //         content += label;
    //       }
    //       content += yLabel;
    //       return content;
    //     }
    //   }
    // }

    //Khi rê chuột hiển thị tất cả data
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: true,
    },
  }
  return (
    <div className="chart">
      <Bar data={chartData ?? data} options={optionsChart} />
    </div>
  )
}

export default StackBarChart
