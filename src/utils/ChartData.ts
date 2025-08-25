const monthsLevel = [
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
]

export const chartInventoryLevelData = {
  labels: monthsLevel,
  datasets: [
    {
      label: "Quantity Reserved ",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      backgroundColor: "#F4516C",
      fontColor: "white",
    },
    {
      label: "Quantity On Hand",
      backgroundColor: "#2DCE89",
      fontColor: "#11CDEF",
      data: [12, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
    },
    {
      label: "Quantity Available ",
      data: [20, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      backgroundColor: "#FFB822",
      fontColor: "white",
    },
    // {
    //   label: "Resigned ",
    //   backgroundColor: "#F4516C",
    //   fontColor: "#11CDEF",
    //   data: [52, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
    // },
    // {
    //   label: "Marternity ",
    //   data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
    //   backgroundColor: "#2DCE89",
    //   fontColor: "white",
    // },
  ],
}

export const chartProductionOrderData = {
  labels: monthsLevel,
  datasets: [
    {
      label: "Production Order",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      //backgroundColor:'green',
      backgroundColor: [
        //"#716ACA",
        "#11CDEF",
        // "#FFB822",
        // "#F4516C",
        // "#2DCE89",
        // "#0084A1",
      ],
    },
  ],
}

export const chartSupplierOrderData = {
  labels: monthsLevel,
  datasets: [
    {
      label: "Supplier Order",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      //backgroundColor:'green',
      backgroundColor: [
        "#716ACA",
        //"#11CDEF",
        // "#FFB822",
        // "#F4516C",
        // "#2DCE89",
        // "#0084A1",
      ],
    },
  ],
}
//----------------Pie chart data
// export const chartPieData = {
//   labels: monthsLevel,
//   datasets: [
//     {
//       label: "Supplier Order",
//       data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
//       //backgroundColor:'green',
//       backgroundColor: [
//         "#716ACA",
//         //"#11CDEF",
//         // "#FFB822",
//         // "#F4516C",
//         // "#2DCE89",
//         // "#0084A1",
//       ],
//     },
//   ],
// }
// export const chartPieData = {
//   labels: ["Supplier SHIVA", "Supplier Bharat", "Supplier DEVA", "Supplier KRISHNA"],
//   datasets: [
//     {
//       label: "Supplier Orders",
//       data: [25, 20, 30, 25],
//       backgroundColor: ["#716ACA", "#11CDEF", "#FFB822", "#F4516C"],
//     },
//   ],
// };
export const chartPieData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Supplier Order",
      data: [25, 20, 30, 22, 17, 29],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
    },
  ],
};

export const chartPieData2 = {
  labels: ["July", "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Supplier Order",
      data: [30, 25, 35, 28, 20, 32],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
    },
  ],
};


export const chartStockTransferOrderData = {
  labels: monthsLevel,
  datasets: [
    {
      label: "Stock Transfer Order",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      //backgroundColor:'green',
      backgroundColor: ["#2DCE89"],
    },
    {
      label: "Stock Movement Order",
      data: [21, 16, 40, 27, 25, 24, 29, 24, 36, 26, 19, 39],
      //backgroundColor:'green',
      backgroundColor: ["#F4516C"],
    },
  ],
}

export const chartPickingPackingData = {
  labels: monthsLevel,
  datasets: [
    {
      label: "Quantity Picked ",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      backgroundColor: "#0084A1",
      fontColor: "white",
    },
    {
      label: "Quantity Packed",
      backgroundColor: "#11CDEF",
      fontColor: "#11CDEF",
      data: [12, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
    },
  ],
}

export const chartGateEntryData = {
  labels: monthsLevel,
  datasets: [
    {
      label: "Gate Entry(In)",
      data: [25, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 29],
      //backgroundColor:'green',
      backgroundColor: ["#2DCE89"],
    },
    {
      label: "Gate Entry(Out)",
      data: [21, 16, 40, 27, 25, 24, 29, 24, 36, 26, 19, 39],
      //backgroundColor:'green',
      backgroundColor: ["#F4516C"],
    },
  ],
}
