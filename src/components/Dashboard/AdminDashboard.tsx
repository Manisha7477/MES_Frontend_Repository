// // import { useState, useEffect } from "react"
// // import axios from "axios"
// // import BasicTable from "@/components/tables/BasicTable"
// // import CardInfo from "@/components/Dashboard/CardInfo"
// // import { HiOutlineCog } from "react-icons/hi"
// // import ModalComponent from "@/components/ModalComponent"
// // import TableHeaderConfig from "@/components/TableHeaderConfig"
// // import {
// //   ORGANIZATION_STRUCTURE_HEADER_DATA,
// //   ORGANIZATION_STRUCTURE_DATA,
// // } from "@/utils/data"
// // import { ITableHeader } from "@/utils/types"
// // import nookies from "nookies"

// // interface IAdminDashboardProps {}

// // const AdminDashboard: React.FunctionComponent<IAdminDashboardProps> = ({}) => {
// //   const [modal, setModal] = useState(false)
// //   const [tableHeaderFilter, setTableHeaderFilter] = useState(
// //     ORGANIZATION_STRUCTURE_HEADER_DATA,
// //   )
// //   const token = nookies.get(null).accessToken || ""
// //   const [cardInfoData, setCardInfoData] = useState<any[]>([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     // Fetch data from the API
// //     axios
// //       .get(`${process.env.NEXT_PUBLIC_API_URL}/DashBoard`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((response) => {
// //         const data = response.data.Data[0]
// //         const updatedCardInfoData = [
// //           {
// //             title: "Total Factory",
// //             value: data.FactoryCount,
// //             description: "Jindal Factories",
// //           },
// //           {
// //             title: "Total Plant",
// //             value: data.PlantCount,
// //             description: "Working Plant",
// //           },
// //           {
// //             title: "Total Storage",
// //             value: data.StorageLocationCount,
// //             description: "Storage Location",
// //           },
// //           {
// //             title: "Total Users",
// //             value: data.EmployeeCount,
// //             description: "Application Users",
// //           },
// //         ]
// //         setCardInfoData(updatedCardInfoData)
// //         setLoading(false)
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching dashboard data:", error)
// //         setLoading(false)
// //       })
// //   }, [])

// //   const handleTableConfig = () => {
// //     setModal(true)
// //   }

// //   const handleVisibleStatus = (itemsUpdatedData: ITableHeader[]) => {
// //     const filterTableHeader = itemsUpdatedData.filter((item) => item.visible)
// //     setTableHeaderFilter(filterTableHeader)
// //   }

// //   const filterTableHeader = tableHeaderFilter?.filter((item) => item.visible)

// //   const handleCloseModal = (modalStatus: boolean) => {
// //     setModal(modalStatus)
// //   }

// //   const renderModal = () => (
// //     <ModalComponent
// //       showModal={modal}
// //       handleCloseModal={handleCloseModal}
// //       title="Organization Structure View - Header Setting"
// //     >
// //       <TableHeaderConfig
// //         tableHeaderData={ORGANIZATION_STRUCTURE_HEADER_DATA}
// //         handleVisibleStatus={handleVisibleStatus}
// //       />
// //     </ModalComponent>
// //   )

// //   return (
// //     <>
// //       <div className="w-full">
// //         <div className="">
// //           {/* <div className="grid md:grid-cols-3 gap-2 w-[80vw] mt-5" > */}
// //           {/* <div className="mt-5 w-[80vw] mb-3"> */}
// //           <div className="">
// //             <div className="flex flex-wrap">
// //               {loading ? <p>Loading...</p> : <CardInfo data={cardInfoData} />}
// //             </div>
// //           </div>
// //           <div className="sm:overflow-x-auto pl-10 w-[80vw] mt-4 ml-2 mr-3 card bg-base-100 shadow-lg">
// //             <div className="flex justify-between items-center font-semibold mb-2 text-primary border-b-2 pb-1">
// //               <div>Organization Structure View </div>
// //               <div>
// //                 <HiOutlineCog
// //                   className="cursor-pointer"
// //                   onClick={handleTableConfig}
// //                 />
// //               </div>
// //             </div>
// //             {/* <div className="sm:overflow-x-auto pl-7"> */}
// //             {filterTableHeader && (
// //               <BasicTable
// //                 tableHeader={filterTableHeader}
// //                 tableData={ORGANIZATION_STRUCTURE_DATA}
// //                 currentPage={0}
// //                 itemsPerPage={0}
// //               />
// //             )}
// //             {/* </div> */}
// //           </div>
// //           {modal && renderModal()}
// //         </div>
// //       </div>
// //     </>
// //   )
// // }

// // export default AdminDashboard

// import { useState, useEffect } from "react"
// import axios from "axios"
// import BasicTable from "@/components/tables/BasicTable"
// import CardInfo from "@/components/Dashboard/CardInfo"
// import { HiOutlineCog } from "react-icons/hi"
// import ModalComponent from "@/components/ModalComponent"
// import TableHeaderConfig from "@/components/TableHeaderConfig"
// import {
//   ORGANIZATION_STRUCTURE_HEADER_DATA,
//   ORGANIZATION_STRUCTURE_DATA,
// } from "@/utils/data"
// import { ITableHeader } from "@/utils/types"
// import nookies from "nookies"
// import OperationalEfficiencyCharts from "../Chart/OperationalEfficiencyCharts"

// interface IAdminDashboardProps {}
// interface ChartData {
//   labels: string[]
//   datasets: {
//     label: string
//     data: number[]
//     backgroundColor: string
//   }[]
// }

// type MaintenanceInfo = {
//   "Equipment ID": string
//   "Last Maintenance Date": string
//   "Performed By": string
//   "Maintenance Details": string
// }

// type SegmentDetails = {
//   data: SegmentData
//   maintenanceInfo: MaintenanceInfo
//   chartData: ChartData
// }

// interface PlantOperationChildModalProps {
//   details: SegmentDetails
// }
// interface SegmentData {
//   data: { [key: string]: string }
//   maintenanceInfo: {
//     "Equipment ID": string
//     "Last Maintenance Date": string
//     "Performed By": string
//     "Maintenance Details": string
//   }
//   chartData: ChartData
// }

// interface InfoData {
//   segments: {
//     [key: string]: SegmentData
//   }
// }

// type infoDataType = any
// const infoData: infoDataType = {
//   segments: {
//     "Cell Testing": {
//       data: {
//         "PO Number ": "PO98321",
//         "Total Tests Conducted": "1,000",
//         "Successful Tests": "950",
//         "Success Rate": "95%",
//       },
//       maintenanceInfo: {
//         "Test Time Per Cell": "15 minutes",
//         "Standard Time": "12 minutes",
//         Deviation: "+3 minutes",
//         "Process Name": "Cell Testing",
//         "Maintenance Details":
//           "Test success rate evaluated; observed a deviation of +3 minutes from the standard time.",
//       },
//       chartData: {
//         labels: ["Cumulative August"],
//         datasets: [
//           {
//             label: "Test Success Rate",
//             data: [95],
//             backgroundColor: "#33A533",
//           },
//           {
//             label: "Deviation from Standard Time",
//             data: [3],
//             backgroundColor: "#FF6262",
//           },
//         ],
//       },
//     },
//     "Cell Grading": {
//       data: {
//         "PO Number ": "PO56748",
//         "Grading Distribution": "Grade A 600 (60%)",
//         //  {
//         //   "Grade A": "600 (60%)",
//         //   "Grade B": "300 (30%)",
//         //   "Grade C": "100 (10%)"
//         // },
//         "Cell Quality Rating": "Grade A (4.5/5)",
//         "Average Time Per Cell": "5 minutes",
//       },
//       maintenanceInfo: {
//         "Process Name": "Cell Grading",
//         "Maintenance Details":
//           "Grading efficiency evaluated with an average quality rating of Grade A (4.5/5). Time per cell grading is within acceptable limits.",
//       },
//       chartData: {
//         labels: ["Grade A", "Grade B", "Grade C"],
//         datasets: [
//           {
//             label: "Grading Distribution",
//             data: [60, 30, 10],
//             backgroundColor: ["#33A533", "#FFD943", "#FF6262"],
//           },
//         ],
//       },
//     },
//     "BMS Testing": {
//       data: {
//         "PO Number ": "PO12497",
//         "BMS Functionality": "Tests Conducted: 500",
//         "Test Coverage": "Planned Tests: 20",
//       },
//       maintenanceInfo: {
//         "Process Name": "BMS Testing",
//         "Maintenance Details":
//           "BMS functionality testing achieved a 96% pass rate with 90% test coverage. Remaining planned tests will be executed in the next cycle.",
//       },
//       chartData: {
//         labels: ["Pass", "Fail"],
//         datasets: [
//           {
//             label: "BMS Functionality Results",
//             data: [96, 4],
//             backgroundColor: ["#33A533", "#FF6262"],
//           },
//         ],
//       },
//     },
//     "Cell Compression and Strapping for Module Assembly": {
//       data: {
//         "PO Number ": "PO76455",
//         "Compression Success Rate": "Tests Performed: 800",
//         "Strapping Completion Rate": "Modules Completed: 700",
//         "Quality Check Pass Rate": "Pass Rate: 98%",
//       },
//       maintenanceInfo: {
//         "Process Name": "Cell Compression and Strapping",
//         "Maintenance Details":
//           "Compression and strapping processes are performing within expected parameters. Quality checks have identified a defect rate of 2%, which is within acceptable limits.",
//       },
//       chartData: {
//         labels: ["Compression Success", "Strapping Completion", "Quality Pass"],
//         datasets: [
//           {
//             label: "Performance Metrics",
//             data: [95, 93, 98],
//             backgroundColor: ["#33A533", "#62A1FF", "#FFD943"],
//           },
//           {
//             label: "Defects or Failures",
//             data: [5, 7, 2],
//             backgroundColor: ["#FF6262", "#CACFCD", "#FF6262"],
//           },
//         ],
//       },
//     },
//     "Laser Welding": {
//       data: {
//         "PO Number ": "PO89012",
//         "Welding Success Rate": "Total Welds: 600",
//         "Laser Welding Efficiency": "Time per Weld 8 minutes",
//       },
//       maintenanceInfo: {
//         "Process Name": "Laser Welding",
//         "Maintenance Details":
//           "Laser welding process is performing at a success rate of 95%. Efficiency improvements needed to reduce weld time deviation from the target.",
//       },
//       chartData: {
//         labels: ["Success Rate", "Failures", "Time Deviation"],
//         datasets: [
//           {
//             label: "Welding Metrics",
//             data: [95, 5, 1],
//             backgroundColor: ["#33A533", "#FF6262", "#FFD943"],
//           },
//         ],
//       },
//     },
//     "Battery Pack Assembly Dashboard": {
//       data: {
//         "PO Number ": "PO34578",
//         "Assembly Line Speed": "Modules Assembled: 150",
//         "Assembly Error Rate": "Error Rate: 4%",
//         "Material Consumption": "Material Used : 200 kg",
//       },
//       maintenanceInfo: {
//         "Process Name": "Battery Pack Assembly",
//         "Maintenance Details":
//           "Assembly line operates at 93.75% of the target speed. Error rate is within acceptable limits. Material utilization can be optimized further to reduce excess consumption.",
//       },
//       chartData: {
//         labels: ["Assembly Speed", "Error Rate", "Material Utilization"],
//         datasets: [
//           {
//             label: "Assembly Metrics",
//             data: [93.75, 4, 95],
//             backgroundColor: ["#33A533", "#FF6262", "#FFD943"],
//           },
//         ],
//       },
//     },
//     "Insulation Test": {
//       data: {
//         "PO Number ": "PO20964",
//         "Pass Rate": "Tested Packs: 150",
//         "Test Time Per Pack": "Average Test Time : 12 minutes",
//       },
//       maintenanceInfo: {
//         "Process Name": "Insulation Test",
//         "Maintenance Details":
//           "Pass rate is satisfactory at 96.7%. Average test time aligns with expectations, though further optimization could reduce the maximum time.",
//       },
//       chartData: {
//         labels: [
//           "Pass Rate",
//           "Average Test Time",
//           "Max Test Time",
//           "Min Test Time",
//         ],
//         datasets: [
//           {
//             label: "Insulation Test Metrics",
//             data: [96.7, 12, 15, 10],
//             backgroundColor: ["#33A533", "#FFD943", "#FF6262", "#62A1FF"],
//           },
//         ],
//       },
//     },
//     "Air Leak Proof Test": {
//       data: {
//         "PO Number ": "PO98123",
//         "Leakage Detection Rate": "Detection Rate : 97%",
//         "Test Duration": "Average Test Duration : 18 minutes",
//         "Test Success Rate": "97%",
//       },
//       maintenanceInfo: {
//         "Process Name": "Air Leak Proof Test",
//         "Maintenance Details":
//           "Leakage detection is effective with a 97% detection rate. Test durations are within acceptable ranges, but further analysis of failed tests is recommended to improve reliability.",
//       },
//       chartData: {
//         labels: [
//           "Detection Rate",
//           "Passed",
//           "Failed",
//           "Avg Duration",
//           "Max Duration",
//           "Min Duration",
//         ],
//         datasets: [
//           {
//             label: "Air Leak Proof Test Metrics",
//             data: [97, 97, 3, 18, 22, 16],
//             backgroundColor: [
//               "#33A533",
//               "#62A1FF",
//               "#FF6262",
//               "#FFD943",
//               "#CACFCD",
//               "#6C6CFF",
//             ],
//           },
//         ],
//       },
//     },
//     "Battery Pack CDC Test ": {
//       data: {
//         "PO Number ": "PO56320",
//         "Test Coverage": "Test Coverage : 90%",
//         "Pass Rate": "85%",
//       },
//       maintenanceInfo: {
//         "Process Name": "Battery Pack CDC Test",
//         "Maintenance Details":
//           "Testing coverage is at 90%, indicating the need for improved scheduling to test all planned packs. A pass rate of 94.4% highlights strong performance, but the 5 failed tests require further analysis.",
//       },
//       chartData: {
//         labels: ["Test Coverage", "Passed", "Failed"],
//         datasets: [
//           {
//             label: "Battery Pack CDC Test Metrics",
//             data: [90, 85, 5],
//             backgroundColor: ["#62A1FF", "#33A533", "#FF6262"],
//           },
//         ],
//       },
//     },
//     "Comprehensive Test": {
//       data: {
//         "PO Number ": "PO48756",
//         "Overall Pass Rate": "Pass Rate: 92%",
//         "Test Duration": "Average Duration : 120 minutes",
//       },
//       maintenanceInfo: {
//         "Process Name": "Comprehensive Test",
//         "Maintenance Details":
//           "With an overall pass rate of 92%, the testing process shows consistent reliability. The duration metrics highlight room for optimization in average and maximum testing times to improve efficiency.",
//       },
//       chartData: {
//         labels: ["Passed", "Failed"],
//         datasets: [
//           {
//             label: "Test Outcomes",
//             data: [460, 40],
//             backgroundColor: ["#33A533", "#FF6262"],
//           },
//         ],
//       },
//     },
//   },
// }

// interface CardProps {
//   title: string
//   data: { [key: string]: string }
//   handleTableConfig: (segment: string) => void
// }

// const CardComponent: React.FC<CardProps> = ({
//   title,
//   data,
//   handleTableConfig,
// }) => {
//   // Get the first 3 entries from the data object
//   const entries = Object.entries(data).slice(0, 3)

//   return (
//     <div
//       onClick={() => handleTableConfig(title)}
//       className="cursor-pointer card bg-base-100 w-[25vw] shadow-xl mb-4"
//     >
//       <div className="card-body">
//         <h2 className="card-title font-bold">{title}</h2>
//         {entries.map(([key, value]) => (
//           <p key={key}>
//             <span className="font-semibold">{key}:</span> {value}
//           </p>
//         ))}
//       </div>
//     </div>
//   )
// }

// const AdminDashboard: React.FunctionComponent<IAdminDashboardProps> = ({}) => {
//   const [modal, setModal] = useState(false)
//   const [tableHeaderFilter, setTableHeaderFilter] = useState(
//     ORGANIZATION_STRUCTURE_HEADER_DATA,
//   )
//   const token = nookies.get(null).accessToken || ""
//   const [cardInfoData, setCardInfoData] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   // const [modal, setModal] = useState(false); // Modal state
//   const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

//   const handleTableConfig = (segment: string) => {
//     setSelectedSegment(segment)
//     setModal(true)
//   }

//   const handleCloseModal = (modalStatus: boolean) => {
//     setModal(modalStatus)
//     if (!modalStatus) {
//       setSelectedSegment(null)
//     }
//   }

//   useEffect(() => {
//     // Fetch data from the API
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/DashBoard`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         const data = response.data.Data[0]
//         const updatedCardInfoData = [
//           {
//             title: "Total Factory",
//             value: data.FactoryCount,
//             description: "Factories",
//           },
//           {
//             title: "Total Plant",
//             value: data.PlantCount,
//             description: "Working Plant",
//           },
//           {
//             title: "Total Storage",
//             value: data.StorageLocationCount,
//             description: "Storage Location",
//           },
//           {
//             title: "Total Users",
//             value: data.EmployeeCount,
//             description: "Application Users",
//           },
//         ]
//         setCardInfoData(updatedCardInfoData)
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error("Error fetching dashboard data:", error)
//         setLoading(false)
//       })
//   }, [])

//   const handleVisibleStatus = (itemsUpdatedData: ITableHeader[]) => {
//     const filterTableHeader = itemsUpdatedData.filter((item) => item.visible)
//     setTableHeaderFilter(filterTableHeader)
//   }

//   const filterTableHeader = tableHeaderFilter?.filter((item) => item.visible)

//   const renderModal = () => (
//     <ModalComponent
//       showModal={modal}
//       handleCloseModal={handleCloseModal}
//       title={selectedSegment ? `${selectedSegment} Details` : "Details"}
//     >
//       {selectedSegment && (
//         <PlantOperationChildModal
//           details={infoData.segments[selectedSegment]}
//         />
//       )}
//     </ModalComponent>
//   )
//   return (
//     <>
//       <div className="w-full ">
//         <div className="">
//           {/* <div className="grid md:grid-cols-3 gap-2 w-[80vw] mt-5" > */}
//           {/* <div className="mt-5 w-[80vw] mb-3"> */}
//           <div className="">
//             <div className="flex flex-wrap">
//               {loading ? <p>Loading...</p> : <CardInfo data={cardInfoData} />}
//             </div>
//           </div>

//           {/* New DASHBOARD FOR ADMIN FOR DEMO  */}
//           <div className="flex  flex-wrap gap-4 p-4">
//             {Object.entries(infoData.segments).map(([segment, segmentData]) => {
//               const segmentDataTyped = segmentData as SegmentData
//               return (
//                 <CardComponent
//                   key={segment}
//                   title={segment}
//                   data={segmentDataTyped.data}
//                   handleTableConfig={handleTableConfig}
//                 />
//               )
//             })}
//             {modal && renderModal()}
//           </div>

//           {/* New DASHBOARD FOR ADMIN FOR DEMO  */}
//           {/* <div className="sm:overflow-x-auto pl-10 w-[80vw] mt-4 ml-2 mr-3 card bg-base-100 shadow-lg">
//             <div className="flex justify-between items-center font-semibold mb-2 text-primary border-b-2 pb-1">
//               <div>Organization Structure View </div>
//               <div>

//               </div>
//             </div>
//               {filterTableHeader && (
//               <BasicTable
//                 tableHeader={filterTableHeader}
//                 tableData={ORGANIZATION_STRUCTURE_DATA}
//                 currentPage={0}
//                 itemsPerPage={0}
//               />
//             )}
//           </div> */}
//           {modal && renderModal()}
//         </div>
//       </div>
//     </>
//   )
// }

// export default AdminDashboard

// const PlantOperationChildModal: React.FC<PlantOperationChildModalProps> = ({
//   details,
// }) => {
//   const [openSections, setOpenSections] = useState<string[]>([])

//   const toggleSection = (sectionKey: string) => {
//     setOpenSections((prevOpenSections) =>
//       prevOpenSections.includes(sectionKey)
//         ? prevOpenSections.filter((key) => key !== sectionKey)
//         : [...prevOpenSections, sectionKey],
//     )
//   }

//   return (
//     <div>
//       {/* Assuming `details` is a single segment, you may not need to loop */}
//       <div className="shadow-lg rounded-lg bg-white mb-8 ">
//         <div className="p-6">
//           <div className="flex flex-wrap justify-between items-start">
//             <div className="w-full md:w-[45%] mb-5">
//               <h2 className="text-xl font-semibold text-center mb-4">Chart</h2>
//               <div className="w-full h-[40vh]">
//                 <OperationalEfficiencyCharts
//                   barData={details.chartData}
//                   type="bar"
//                 />
//               </div>
//             </div>
//             <div className="w-full md:w-[45%]">
//               <h2 className="text-xl font-bold mb-3">Details</h2>
//               {Object.entries(details.data).map(([subKey, subValue], index) => (
//                 <div className="text-sm mb-2" key={index}>
//                   <span className="text-lg font-semibold">{subKey}:</span>{" "}
//                   {subValue}
//                 </div>
//               ))}
//               <h2 className="text-lg font-semibold mt-4 mb-2">
//                 Maintenance Info
//               </h2>
//               {Object.entries(details.maintenanceInfo).map(
//                 ([subKey, subValue], index) => (
//                   <div className="text-sm mb-2" key={index}>
//                     <span className="text-lg font-semibold">{subKey}:</span>{" "}
//                     {subValue}
//                   </div>
//                 ),
//               )}
//             </div>
//           </div>
//         </div>
//         {/* </div> */}
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from "react"
import axios from "axios"
import BasicTable from "@/components/tables/BasicTable"
import CardInfo from "@/components/Dashboard/CardInfo"
import { HiOutlineCog } from "react-icons/hi"
import ModalComponent from "@/components/ModalComponent"
import TableHeaderConfig from "@/components/TableHeaderConfig"
import {
  ORGANIZATION_STRUCTURE_HEADER_DATA,
  ORGANIZATION_STRUCTURE_DATA,
} from "@/utils/data"
import { ITableHeader } from "@/utils/types"
import nookies from "nookies"
import OperationalEfficiencyCharts from "../Chart/OperationalEfficiencyCharts"

interface IAdminDashboardProps {
  isOpenMenu: boolean
}
interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
  }[]
}

type MaintenanceInfo = {
  "Equipment ID": string
  "Last Maintenance Date": string
  "Performed By": string
  "Maintenance Details": string
}

type SegmentDetails = {
  data: SegmentData
  maintenanceInfo: MaintenanceInfo
  chartData: ChartData
}

interface PlantOperationChildModalProps {
  details: SegmentDetails
}
interface SegmentData {
  data: { [key: string]: string }
  maintenanceInfo: {
    "Equipment ID": string
    "Last Maintenance Date": string
    "Performed By": string
    "Maintenance Details": string
  }
  chartData: ChartData
}

interface InfoData {
  segments: {
    [key: string]: SegmentData
  }
}

type infoDataType = any
const infoData: infoDataType = {
  segments: {
    "Cell Testing": {
      data: {
        "PO Number ": "PO98321",
        "Total Tests Conducted": "1,000",
        "Successful Tests": "950",
        "Success Rate": "95%",
      },
      maintenanceInfo: {
        "Test Time Per Cell": "15 minutes",
        "Standard Time": "12 minutes",
        Deviation: "+3 minutes",
        "Process Name": "Cell Testing",
        "Maintenance Details":
          "Test success rate evaluated; observed a deviation of +3 minutes from the standard time.",
      },
      chartData: {
        labels: ["Cumulative August"],
        datasets: [
          {
            label: "Test Success Rate",
            data: [95],
            backgroundColor: "#33A533",
          },
          {
            label: "Deviation from Standard Time",
            data: [3],
            backgroundColor: "#FF6262",
          },
        ],
      },
    },
    "Cell Grading": {
      data: {
        "PO Number ": "PO56748",
        "Grading Distribution": "Grade A 600 (60%)",
        //  {
        //   "Grade A": "600 (60%)",
        //   "Grade B": "300 (30%)",
        //   "Grade C": "100 (10%)"
        // },
        "Cell Quality Rating": "Grade A (4.5/5)",
        "Average Time Per Cell": "5 minutes",
      },
      maintenanceInfo: {
        "Process Name": "Cell Grading",
        "Maintenance Details":
          "Grading efficiency evaluated with an average quality rating of Grade A (4.5/5). Time per cell grading is within acceptable limits.",
      },
      chartData: {
        labels: ["Grade A", "Grade B", "Grade C"],
        datasets: [
          {
            label: "Grading Distribution",
            data: [60, 30, 10],
            backgroundColor: ["#33A533", "#FFD943", "#FF6262"],
          },
        ],
      },
    },
    "BMS Testing": {
      data: {
        "PO Number ": "PO12497",
        "BMS Functionality": "Tests Conducted: 500",
        "Test Coverage": "Planned Tests: 20",
      },
      maintenanceInfo: {
        "Process Name": "BMS Testing",
        "Maintenance Details":
          "BMS functionality testing achieved a 96% pass rate with 90% test coverage. Remaining planned tests will be executed in the next cycle.",
      },
      chartData: {
        labels: ["Pass", "Fail"],
        datasets: [
          {
            label: "BMS Functionality Results",
            data: [96, 4],
            backgroundColor: ["#33A533", "#FF6262"],
          },
        ],
      },
    },
    "Cell Compression and Strapping for Module Assembly": {
      data: {
        "PO Number ": "PO76455",
        "Compression Success Rate": "Tests Performed: 800",
        "Strapping Completion Rate": "Modules Completed: 700",
        "Quality Check Pass Rate": "Pass Rate: 98%",
      },
      maintenanceInfo: {
        "Process Name": "Cell Compression and Strapping",
        "Maintenance Details":
          "Compression and strapping processes are performing within expected parameters. Quality checks have identified a defect rate of 2%, which is within acceptable limits.",
      },
      chartData: {
        labels: ["Compression Success", "Strapping Completion", "Quality Pass"],
        datasets: [
          {
            label: "Performance Metrics",
            data: [95, 93, 98],
            backgroundColor: ["#33A533", "#62A1FF", "#FFD943"],
          },
          {
            label: "Defects or Failures",
            data: [5, 7, 2],
            backgroundColor: ["#FF6262", "#CACFCD", "#FF6262"],
          },
        ],
      },
    },
    "Laser Welding": {
      data: {
        "PO Number ": "PO89012",
        "Welding Success Rate": "Total Welds: 600",
        "Laser Welding Efficiency": "Time per Weld 8 minutes",
      },
      maintenanceInfo: {
        "Process Name": "Laser Welding",
        "Maintenance Details":
          "Laser welding process is performing at a success rate of 95%. Efficiency improvements needed to reduce weld time deviation from the target.",
      },
      chartData: {
        labels: ["Success Rate", "Failures", "Time Deviation"],
        datasets: [
          {
            label: "Welding Metrics",
            data: [95, 5, 1],
            backgroundColor: ["#33A533", "#FF6262", "#FFD943"],
          },
        ],
      },
    },
    "Battery Pack Assembly Dashboard": {
      data: {
        "PO Number ": "PO34578",
        "Assembly Line Speed": "Modules Assembled: 150",
        "Assembly Error Rate": "Error Rate: 4%",
        "Material Consumption": "Material Used : 200 kg",
      },
      maintenanceInfo: {
        "Process Name": "Battery Pack Assembly",
        "Maintenance Details":
          "Assembly line operates at 93.75% of the target speed. Error rate is within acceptable limits. Material utilization can be optimized further to reduce excess consumption.",
      },
      chartData: {
        labels: ["Assembly Speed", "Error Rate", "Material Utilization"],
        datasets: [
          {
            label: "Assembly Metrics",
            data: [93.75, 4, 95],
            backgroundColor: ["#33A533", "#FF6262", "#FFD943"],
          },
        ],
      },
    },
    "Insulation Test": {
      data: {
        "PO Number ": "PO20964",
        "Pass Rate": "Tested Packs: 150",
        "Test Time Per Pack": "Average Test Time : 12 minutes",
      },
      maintenanceInfo: {
        "Process Name": "Insulation Test",
        "Maintenance Details":
          "Pass rate is satisfactory at 96.7%. Average test time aligns with expectations, though further optimization could reduce the maximum time.",
      },
      chartData: {
        labels: [
          "Pass Rate",
          "Average Test Time",
          "Max Test Time",
          "Min Test Time",
        ],
        datasets: [
          {
            label: "Insulation Test Metrics",
            data: [96.7, 12, 15, 10],
            backgroundColor: ["#33A533", "#FFD943", "#FF6262", "#62A1FF"],
          },
        ],
      },
    },
    "Air Leak Proof Test": {
      data: {
        "PO Number ": "PO98123",
        "Leakage Detection Rate": "Detection Rate : 97%",
        "Test Duration": "Average Test Duration : 18 minutes",
        "Test Success Rate": "97%",
      },
      maintenanceInfo: {
        "Process Name": "Air Leak Proof Test",
        "Maintenance Details":
          "Leakage detection is effective with a 97% detection rate. Test durations are within acceptable ranges, but further analysis of failed tests is recommended to improve reliability.",
      },
      chartData: {
        labels: [
          "Detection Rate",
          "Passed",
          "Failed",
          "Avg Duration",
          "Max Duration",
          "Min Duration",
        ],
        datasets: [
          {
            label: "Air Leak Proof Test Metrics",
            data: [97, 97, 3, 18, 22, 16],
            backgroundColor: [
              "#33A533",
              "#62A1FF",
              "#FF6262",
              "#FFD943",
              "#CACFCD",
              "#6C6CFF",
            ],
          },
        ],
      },
    },
    "Battery Pack CDC Test ": {
      data: {
        "PO Number ": "PO56320",
        "Test Coverage": "Test Coverage : 90%",
        "Pass Rate": "85%",
      },
      maintenanceInfo: {
        "Process Name": "Battery Pack CDC Test",
        "Maintenance Details":
          "Testing coverage is at 90%, indicating the need for improved scheduling to test all planned packs. A pass rate of 94.4% highlights strong performance, but the 5 failed tests require further analysis.",
      },
      chartData: {
        labels: ["Test Coverage", "Passed", "Failed"],
        datasets: [
          {
            label: "Battery Pack CDC Test Metrics",
            data: [90, 85, 5],
            backgroundColor: ["#62A1FF", "#33A533", "#FF6262"],
          },
        ],
      },
    },
    "Comprehensive Test": {
      data: {
        "PO Number ": "PO48756",
        "Overall Pass Rate": "Pass Rate: 92%",
        "Test Duration": "Average Duration : 120 minutes",
      },
      maintenanceInfo: {
        "Process Name": "Comprehensive Test",
        "Maintenance Details":
          "With an overall pass rate of 92%, the testing process shows consistent reliability. The duration metrics highlight room for optimization in average and maximum testing times to improve efficiency.",
      },
      chartData: {
        labels: ["Passed", "Failed"],
        datasets: [
          {
            label: "Test Outcomes",
            data: [460, 40],
            backgroundColor: ["#33A533", "#FF6262"],
          },
        ],
      },
    },
  },
}

interface CardProps {
  title: string
  data: { [key: string]: string }
  handleTableConfig: (segment: string) => void
  isOpenMenu: boolean
}

const CardComponent: React.FC<CardProps> = ({
  title,
  data,
  handleTableConfig,
  isOpenMenu,
}) => {
  // Get the first 3 entries from the data object
  const entries = Object.entries(data).slice(0, 3)

  return (
    <div
      onClick={() => handleTableConfig(title)}
      className={`cursor-pointer card bg-base-100 ${
        isOpenMenu ? "w-[25vw]" : "w-[30vw]"
      } shadow-xl mb-4`}
    >
      <div className="card-body">
        <h2 className="card-title font-bold">{title}</h2>
        {entries.map(([key, value]) => (
          <p key={key}>
            <span className="font-semibold">{key}:</span> {value}
          </p>
        ))}
      </div>
    </div>
  )
}

const AdminDashboard: React.FunctionComponent<IAdminDashboardProps> = ({
  isOpenMenu,
}) => {
  const [modal, setModal] = useState(false)
  const [tableHeaderFilter, setTableHeaderFilter] = useState(
    ORGANIZATION_STRUCTURE_HEADER_DATA,
  )
  const token = nookies.get(null).accessToken || ""
  const [cardInfoData, setCardInfoData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  // const [modal, setModal] = useState(false); // Modal state
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  const handleTableConfig = (segment: string) => {
    setSelectedSegment(segment)
    setModal(true)
  }

  const handleCloseModal = (modalStatus: boolean) => {
    setModal(modalStatus)
    if (!modalStatus) {
      setSelectedSegment(null)
    }
  }

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/DashBoard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data[0]
        const updatedCardInfoData = [
          {
            title: "Total Factory",
            value: data.FactoryCount,
            description: "Factories",
          },
          {
            title: "Total Plant",
            value: data.PlantCount,
            description: "Working Plant",
          },
          {
            title: "Total Storage",
            value: data.StorageLocationCount,
            description: "Storage Location",
          },
          {
            title: "Total Users",
            value: data.EmployeeCount,
            description: "Application Users",
          },
        ]
        setCardInfoData(updatedCardInfoData)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      })
  }, [])

  const handleVisibleStatus = (itemsUpdatedData: ITableHeader[]) => {
    const filterTableHeader = itemsUpdatedData.filter((item) => item.visible)
    setTableHeaderFilter(filterTableHeader)
  }

  const filterTableHeader = tableHeaderFilter?.filter((item) => item.visible)

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={selectedSegment ? `${selectedSegment} Details` : "Details"}
    >
      {selectedSegment && (
        <PlantOperationChildModal
          details={infoData.segments[selectedSegment]}
        />
      )}
    </ModalComponent>
  )
  return (
    <>
      <div className="w-full ">
        <div className="">
          {/* <div className="grid md:grid-cols-3 gap-2 w-[80vw] mt-5" > */}
          {/* <div className="mt-5 w-[80vw] mb-3"> */}
          <div className="">
            <div className="flex flex-wrap">
              {loading ? <p>Loading...</p> : <CardInfo data={cardInfoData} />}
            </div>
          </div>

          {/* New DASHBOARD FOR ADMIN FOR DEMO  */}
          <div className="flex  flex-wrap gap-4 p-4">
            {Object.entries(infoData.segments).map(([segment, segmentData]) => {
              const segmentDataTyped = segmentData as SegmentData
              return (
                <CardComponent
                  key={segment}
                  title={segment}
                  data={segmentDataTyped.data}
                  handleTableConfig={handleTableConfig}
                  isOpenMenu={isOpenMenu}
                />
              )
            })}
            {modal && renderModal()}
          </div>

          {/* New DASHBOARD FOR ADMIN FOR DEMO  */}
          {/* <div className="sm:overflow-x-auto pl-10 w-[80vw] mt-4 ml-2 mr-3 card bg-base-100 shadow-lg">
            <div className="flex justify-between items-center font-semibold mb-2 text-primary border-b-2 pb-1">
              <div>Organization Structure View </div>
              <div>
                
              </div>
            </div>
              {filterTableHeader && (
              <BasicTable
                tableHeader={filterTableHeader}
                tableData={ORGANIZATION_STRUCTURE_DATA}
                currentPage={0}
                itemsPerPage={0}
              />
            )} 
          </div> */}
          {modal && renderModal()}
        </div>
      </div>
    </>
  )
}

export default AdminDashboard

const PlantOperationChildModal: React.FC<PlantOperationChildModalProps> = ({
  details,
}) => {
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prevOpenSections) =>
      prevOpenSections.includes(sectionKey)
        ? prevOpenSections.filter((key) => key !== sectionKey)
        : [...prevOpenSections, sectionKey],
    )
  }

  return (
    <div>
      {/* Assuming `details` is a single segment, you may not need to loop */}
      <div className="shadow-lg rounded-lg bg-white mb-8 ">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start">
            <div className="w-full md:w-[45%] mb-5">
              <h2 className="text-xl font-semibold text-center mb-4">Chart</h2>
              <div className="w-full h-[40vh]">
                <OperationalEfficiencyCharts
                  barData={details.chartData}
                  type="bar"
                />
              </div>
            </div>
            <div className="w-full md:w-[45%]">
              <h2 className="text-xl font-bold mb-3">Details</h2>
              {Object.entries(details.data).map(([subKey, subValue], index) => (
                <div className="text-sm mb-2" key={index}>
                  <span className="text-lg font-semibold">{subKey}:</span>{" "}
                  {subValue}
                </div>
              ))}
              <h2 className="text-lg font-semibold mt-4 mb-2">
                Maintenance Info
              </h2>
              {Object.entries(details.maintenanceInfo).map(
                ([subKey, subValue], index) => (
                  <div className="text-sm mb-2" key={index}>
                    <span className="text-lg font-semibold">{subKey}:</span>{" "}
                    {subValue}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}
