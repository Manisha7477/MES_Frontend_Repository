import React, { useEffect, useState } from "react"
import axios from "axios"
import DropDown from "@/components/DropDown"
import { useAuth } from "@/contexts/auth"
import AccordianOrderInfo from "@/components/AccordianView/AccordianOrderInfo"
import RadialProgress from "@/components/RadialProgress/RadialProgress"
import TableView from "@/components/TableView"
import Downtime from "@/components/Downtime"
import ModalComponent from "@/components/ModalComponent"
import InventoryCheck from "@/components/Dashboard/InventoryCheck"
import { saveAs } from "file-saver"
import {
  IOrderDetails,
  IProductionOrder,
  IOperation,
  ITableVarible1,
  ITableVarible,
  ITableData,
  ITableHeader,
  IBarCode,
  IOperationDetails,
  type IRadialData,
} from "@/utils/types"
import {
  AIRLEAK_PROOF_HEADER_DATA,
  AIRLEAK_PROOF_HEADER_DATA_DETAILED,
  BATTERY_INSULATION_TEST_HEADER_DATA,
  BATTERY_INSULATION_TEST_HEADER_DATA_DETAILED,
  BATTERY_PACK_CDC_TEST_HEADER_DATA,
  BATTERY_PACK_CDC_TEST_HEADER_DATA_DETAILED,
  BATTERY_PACK_HEADER_DATA,
  BATTERY_PACK_HEADER_DATA_DETAILED,
  BMS_TEST_HEADER_DATA,
  BMS_TEST_HEADER_DATA_DETAILED,
  CDC_HEADER_DATA,
  CDC_HEADER_DATA_DETAILED,
  CELL_COMPRESSION_HEADER_DATA_DETAILED,
  CELL_COMPRESSION_HEADER_DATA,
  CELL_GRADING_HEADER_DATA,
  CELL_GRADING_HEADER_DATA_DETAILED,
  COMPREHENSIVE_TEST_HEADER_DATA,
  COMPREHENSIVE_TEST_HEADER_DATA_DETAILED,
  LASER_WELDING_HEADER_DATA,
  LASER_WELDING_HEADER_DATA_DETAILED,
} from "@/utils/data"
import AccordianOperationInfo from "@/components/AccordianView/AccordianOperationInfo"
import Accordian from "@/components/AccordianView/Accordian"
import BasicTable from "@/components/tables/BasicTable"
import nookies from "nookies"
import DetailedView from "@/components/DetailedView/DetailedView"

const OperationCreation: React.FC = () => {
  const [modal, setModal] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState("")

  const [operationDetails, setOperationDetails] = useState<IOperationDetails>(
    [],
  )
  const [serialBarCodes, setSerialBarCodes] = useState<IBarCode[]>([])
  const [operations, setOperations] = useState<IOperation[]>([])
  const [orderDetails, setOrderDetails] = useState<IOrderDetails>([])
  const [lotNo, setLotNo] = useState("")
  const [shift, setShift] = useState("")
  const [productionOrderNumber, setProductionOrderNumber] = useState("")
  const [serialbarcode, setSerialBarCode] = useState<string | null>(null)
  const [selectedOperation, setSelectedOperation] = useState<string | null>(
    null,
  )
  const [tableData, setTableData] = useState<ITableData[]>()
  const [table_header_detailed, setTable_header_detailed] = useState<
    ITableHeader[]
  >([])
  const [downloadLink, setDownloadLink] = useState(null)
  const [searchQuery, setSearchQuery] = useState("") //aritra change
  const { user } = useAuth() // taken userid by user according to user name
  const [table_header, setTable_header] = useState<ITableHeader[]>([])
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [progressData, setProgressData] = useState<IRadialData[]>([])
  const token = nookies.get(null).accessToken || ""

  // const handleClickDownload = async (rowId: string) => {
  //   try {
  //     // Make sure `downloadLink` is set before proceeding
  //     if (!downloadLink) {
  //       alert("Download link is not available.")
  //       return
  //     }

  //     const sourceFilePath = downloadLink // Use the fetched download link directly

  //     const response = await axios.get(
  //       `${
  //         process.env.NEXT_PUBLIC_API_URL
  //       }/MES_TDAssignment/CheckAndDownloadFile?FilePath=${encodeURIComponent(
  //         sourceFilePath,
  //       )}`,
  //       {
  //         responseType: "blob",
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     )

  //     // Create a Blob from the response data
  //     const blob = new Blob([response.data], {
  //       type: "application/vnd.ms-excel", // You can modify this type if the file is not Excel
  //     })

  //     // Generate a filename (you can customize this based on your needs)
  //     const filename = `RowData_${rowId}.xlsx`

  //     // Save the file locally using the FileSaver.js library
  //     saveAs(blob, filename)
  //   } catch (error) {
  //     console.error("Error downloading the file:", error)
  //     alert("Failed to download the file.")
  //   }
  // }
  const handleClickDownload = async (row: {
    RowId: string
    DownloadLink: string
    RowIndex: number
  }) => {
    try {
      console.log("Row object received:", row)

      // Validate the download link
      if (!row.DownloadLink) {
        alert("Download link is not available.")
        return
      }

      const sourceFilePath = row.DownloadLink

      // Fetch the file from the server
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/MES_TDAssignment/CheckAndDownloadFile?FilePath=${encodeURIComponent(
          sourceFilePath,
        )}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // Determine the file extension based on content type or link
      let extension = "xlsx" // Default to `.xlsx`
      const contentType = response.headers["content-type"]

      if (
        contentType === "text/csv" ||
        row.DownloadLink.toLowerCase().endsWith(".csv")
      ) {
        extension = "csv"
      }

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: contentType || "application/octet-stream",
      })

      // Generate a filename using the row's RowIndex
      const filename = `Row${row.RowIndex}.${extension}`

      // Save the file locally using FileSaver.js
      saveAs(blob, filename)
    } catch (error) {
      console.error("Error downloading the file:", error)
      alert("Failed to download the file.")
    }
  }

  //for multiselect dropdown & filtering data

  const [detailViewProps, setDetailedViewProps] = useState<{
    Id: string | undefined | null
    workcenter_id: number | undefined | null
    Bar_Slno: string | undefined | null
  }>({
    Id: "",
    workcenter_id: null,
    Bar_Slno: "",
  })
  const shifts = [
    { shiftId: "1", shiftName: "Shift A" },
    { shiftId: "2", shiftName: "Shift B" },
    { shiftId: "3", shiftName: "Shift C" },
  ]

  const options = shifts.map((op) => ({
    label: op.shiftName,
    value: op.shiftId,
  }))

  //for multiselect dropdown & filtering data finished

  useEffect(() => {
    const selectedWorkcenter = operations.find(
      (op) => op.Operation === selectedOperation,
    )?.WorkcenterId

    switch (selectedWorkcenter) {
      case 1:
        setTable_header(CDC_HEADER_DATA)
        setTable_header_detailed(CDC_HEADER_DATA_DETAILED)
        break
      // case 2:
      //   setTable_header(PACK_CDC_HEADER_DATA)
      case 2:
        setTable_header(CELL_GRADING_HEADER_DATA)
        setTable_header_detailed(CELL_GRADING_HEADER_DATA_DETAILED)
        break
      case 3:
        setTable_header(BMS_TEST_HEADER_DATA)
        setTable_header_detailed(BMS_TEST_HEADER_DATA_DETAILED)
        break
      case 5:
        setTable_header(CELL_COMPRESSION_HEADER_DATA)
        setTable_header_detailed(CELL_COMPRESSION_HEADER_DATA_DETAILED)
        break
      case 10007:
        setTable_header(LASER_WELDING_HEADER_DATA)
        setTable_header_detailed(LASER_WELDING_HEADER_DATA_DETAILED)
        break
      case 10008:
        setTable_header(BATTERY_PACK_HEADER_DATA)
        setTable_header_detailed(BATTERY_PACK_HEADER_DATA_DETAILED)
        break
      case 10009:
        setTable_header(BATTERY_INSULATION_TEST_HEADER_DATA)
        setTable_header_detailed(BATTERY_INSULATION_TEST_HEADER_DATA_DETAILED)
        break
      case 10010:
        setTable_header(AIRLEAK_PROOF_HEADER_DATA)
        setTable_header_detailed(AIRLEAK_PROOF_HEADER_DATA_DETAILED)
        break
      case 10012:
        setTable_header(COMPREHENSIVE_TEST_HEADER_DATA)
        setTable_header_detailed(COMPREHENSIVE_TEST_HEADER_DATA_DETAILED)
        break
      case 10011:
        setTable_header(BATTERY_PACK_CDC_TEST_HEADER_DATA)
        setTable_header_detailed(BATTERY_PACK_CDC_TEST_HEADER_DATA_DETAILED)
        break

      default:
        setTable_header(CDC_HEADER_DATA)
        setTable_header_detailed(CDC_HEADER_DATA_DETAILED)
    }
  }, [selectedOperation, operations])

  useEffect(() => {
    if (user) {
      console.log("Fetching operations for user:", user.userid)
      const fetchOperations = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetOperationDDOperator?Id=${user.userid}`,
            { headers: { Authorization: `Bearer ${token}` } },
          )
          setOperations(response.data.Data)
          console.log("confirm", response.data.Data)
        } catch (error) {
          console.error("Error fetching operations:", error)
        }
      }
      fetchOperations()
    }
  }, [user])

  //find serial barcode according to user and operation
  useEffect(() => {
    if (user && selectedOperation) {
      const selectedWorkcenterId = operations.find(
        (op) => op.Operation === selectedOperation,
      )?.WorkcenterId

      if (selectedWorkcenterId) {
        const fetchSerialBarCodes = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetSerial_BarcodeDD?Id=${user.userid}&workcenter_id=${selectedWorkcenterId}`,
              { headers: { Authorization: `Bearer ${token}` } },
            )
            setSerialBarCodes(response.data.Data)
          } catch (error) {
            console.error("Error fetching serial bar codes:", error)
          }
        }
        fetchSerialBarCodes()
      }
    }
  }, [selectedOperation, user, operations])

  //order details data
  useEffect(() => {
    if (user) {
      const fetchOrderDetails = async () => {
        try {
          {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetOrderDetails?Id=${user.userid}`,
              { headers: { Authorization: `Bearer ${token}` } },
            )
            const data = response.data.Data[0]
            setOrderDetails([
              { header: "Product", value: data.Product },
              { header: "Description", value: data.ProductDescription },
              { header: "Order Qty", value: data.OrderQuantity },
              {
                header: "Confirmed Qty",
                value: data.ConfirmedQuantity ?? "N/A",
              },
              { header: "Open Qty", value: data.OpenQuantity ?? "N/A" },
              { header: "Time Spent", value: data.TimeSpent ?? "N/A" },
            ])
            setLotNo(data.LotNumber)
            setShift(data.ShiftName)
            setProductionOrderNumber(data.OrderNumber)
          }
        } catch (error) {
          console.error("Error fetching order details:", error)
        }
      }

      fetchOrderDetails()
    }
  }, [user])

  //for opertaion details
  useEffect(() => {
    if (user && selectedOperation && serialbarcode) {
      const selectedWorkcenterId = operations.find(
        (op) => op.Operation === selectedOperation,
      )?.WorkcenterId
      if (selectedWorkcenterId) {
        const fetchOperationDetails = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetConfirmed_ScrapQuantity?Id=${user.userid}&workcenter_id=${selectedWorkcenterId}&Bar_Slno=${serialbarcode}`,
              { headers: { Authorization: `Bearer ${token}` } },
            )
            const data = response.data.Data[0]
            setOperationDetails([
              { header: "Confirm Qty", value: data.ConfirmQuantity },
              { header: "Scrap Qty", value: data.ScrapQuantity },
            ])
          } catch (error) {
            console.error("Error fetching operation details:", error)
          }
        }
        fetchOperationDetails()
      }
    }
  }, [user, selectedOperation, serialbarcode])

  // ========radial data

  useEffect(() => {
    if (user && selectedOperation && serialbarcode) {
      const fetchProgressData = async () => {
        try {
          const selectedWorkcenterId = operations.find(
            (op) => op.Operation === selectedOperation,
          )?.WorkcenterId

          const tempDetailProps: {
            Id: string | undefined | null
            workcenter_id: number | undefined | null
            Bar_Slno: string | undefined | null
          } = {
            // Id: selectedOperatorId,
            Id: user.userid,
            workcenter_id: selectedWorkcenterId,
            Bar_Slno: serialbarcode,
          }
          setDetailedViewProps(tempDetailProps)

          if (selectedWorkcenterId) {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetConfirmed_ScrapQuantity`,

              {
                params: {
                  Id: user.userid,
                  workcenter_id: selectedWorkcenterId,
                  Bar_Slno: serialbarcode,
                },
                headers: { Authorization: `Bearer ${token}` },
              },
            )

            if (response.data && response.data.Data.length > 0) {
              const data = response.data.Data[0]
              setProgressData([
                {
                  text: "Confirm Quantity %",
                  value: data.ConfirmQuantityPercentage,
                  size: "8rem",
                  thick: "1.0rem",
                  color: "green", // Stick to green
                },
                {
                  text: "Scrap Quantity %",
                  value: data.ScrapQuantityPercentage,
                  size: "8rem",
                  thick: "1.0rem",
                  color: "red", // Always red for Scrap Quantity %
                },
              ])
            }
          }
        } catch (error) {
          console.error("Error fetching progress data:", error)
        }
      }

      fetchProgressData()
    }
  }, [user, selectedOperation, serialbarcode, operations])

  useEffect(() => {
    const selectedWorkcenter = operations.find(
      (op) => op.Operation === selectedOperation,
    )?.WorkcenterId
    console.log("work", selectedWorkcenter)
    if (selectedWorkcenter && serialbarcode) {
      const fetchOperations = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetallCDCData?UserId=${user?.userid}&ProcessId=${selectedWorkcenter}&Bar_Slno=${serialbarcode}`,
            { headers: { Authorization: `Bearer ${token}` } },
          )
          console.log("Data coming for pack=", response.data.Data)
          const fetchedData = response.data.Data
          if (fetchedData && fetchedData.length > 0) {
            const dataWithIndex = fetchedData.map(
              (row: any, index: number) => ({
                ...row,
                RowIndex: index + 1, // Start index at 1 for better readability
              }),
            )

            // Set the table data with all the fetched rows
            setTableData(dataWithIndex)

            // Optionally log the download links for debugging
            dataWithIndex.forEach(
              (row: { DownloadLink: any }, index: number) => {
                console.log(
                  `Download link for row ${index + 1}:`,
                  row.DownloadLink,
                )
              },
            )
          } else {
            console.log("No data available for the selected criteria.")
            setTableData([]) // Reset the table data if no rows are found
          }
        } catch (error) {
          console.error("Error fetching operations:", error)
        }
      }

      fetchOperations()
    }
  }, [serialbarcode, selectedOperation])

  const handleClick = (clickItem: string) => {
    setSelectedTitle(clickItem)
    setModal(true)
  }

  const handleCloseModal = (modalStatus: boolean) => {
    setModal(modalStatus)
  }

  const handleSerialBarCodeChange = (SerialBarCodeNumber: string) => {
    setSerialBarCode(SerialBarCodeNumber)
  }

  const handleOperationChange = (operation: string) => {
    setSelectedOperation(operation)
  }

  const renderSelectedItems = () => {
    switch (selectedTitle) {
      case "Downtime":
        return <Downtime />
      case "Finish Operation":
        return (
          <div className="w-full bg-neutral">
            <header className="text-center text-base font-medium bg-info">
              Order Details
            </header>
            <AccordianOrderInfo
              orderDetails={orderDetails}
              lotNo={lotNo}
              shift={shift}
              productionOrderNumber={productionOrderNumber}
            />
            <div className="flex flex-col mt-6">
              <text className="py-5 text-center text-base font-medium border-t-2">
                Are you sure this operation is finished?
              </text>
              <div className="flex justify-center gap-10">
                <button className="btn w-40 bg-primary">Yes</button>
                <button className="btn w-40 bg-primary">No</button>
              </div>
            </div>
          </div>
        )
      case "Detailed View":
        return (
          <div className="flex flex-col space-y-6">
            <DetailedView
              options={options}
              detailView={detailViewProps}
              tableHeader={table_header_detailed}
            />
          </div>
        )
      case "Component Overview":
        return <InventoryCheck />
      default:
        return <div className="w-full text-center">Not Available</div>
    }
  }

  const render = () => {
    return selectedTitle === "Detailed View" || selectedTitle === "Downtime" ? (
      <ModalComponent
        showModal={modal}
        handleCloseModal={handleCloseModal}
        title={selectedTitle}
        width="w-full max-w-full rounded-none"
        height="h-full max-h-full"
      >
        {renderSelectedItems()}
      </ModalComponent>
    ) : (
      <ModalComponent
        showModal={modal}
        handleCloseModal={handleCloseModal}
        title={selectedTitle}
      >
        {renderSelectedItems()}
      </ModalComponent>
    )
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full md:flex gap-4 text-sm mb-6 mt-16">
      {/* Production Box */}
      <div className="flex-col mt-8 gap-5 w-full md:w-52">
        <div className="text-sm mb-4 p-2 bg-success rounded-md text-neutral-50 text-center py-2">
          <div className="font-semibold mb-1">Production</div>
          <div>
            <p>Time: {currentTime.toLocaleTimeString()}</p>
            <p className="pt-2">Date: {currentTime.toLocaleDateString()}</p>
          </div>
        </div>

        {/* Assigned User Id Box */}
        <div className="flex flex-col mb-5 rounded-md border-2 border-info">
          <h3 className="bg-info text-center py-2 text-sm">Assigned User Id</h3>
          <span className="bg-base-100 text-center py-2">
            {user ? `${user.firstName} ${user.lastName}` : "N/A"}
          </span>
        </div>
        <DropDown
          title="Operation"
          setOperation={handleOperationChange}
          resetTrigger={null}
          data={operations.map((op) => ({
            option: op.Operation,
            value: op.Operation, // Ensure OrderId is a string
          }))}
        />
        <DropDown
          title="Serial Bar Code"
          setOperation={handleSerialBarCodeChange}
          resetTrigger={selectedOperation}
          data={serialBarCodes.map((serial) => ({
            option: serial.SerialBarCodeNumber,
            value: serial.SerialBarCodeNumber,
          }))}
        />

        {/* Progress Boxes -Radial  */}
        {/* <div className="flex flex-col mt-4 p-2 border border-neutral-900 items-center overflow-x-auto gap-4">
          {progressData &&
            progressData.map((data, index) => (
              <RadialProgress key={index} radData={data} />
            ))}
        </div> */}

        {/* Progress Boxes -Radial */}
        {progressData && progressData.length > 0 && user && (
          <div className="flex flex-col mt-4 p-2 border border-neutral-900 items-center overflow-x-auto gap-4">
            {progressData.map((data, index) => (
              <RadialProgress key={index} radData={data} />
            ))}
          </div>
        )}
      </div>
      <div className="w-[75vw]">
        <div className="text-center text-lg font-bold mb-2">
          Operation Confirmation
        </div>
        <div className="flex flex-col gap-3 px-5">
          <Accordian title="Order Details">
            <AccordianOrderInfo
              orderDetails={orderDetails}
              lotNo={lotNo}
              shift={shift}
              productionOrderNumber={productionOrderNumber}
            />
          </Accordian>

          <Accordian title="Operation Details">
            <AccordianOperationInfo operationDetails={operationDetails} />
          </Accordian>

          {/* <button
            name="Finish Operation"
            className="btn btn-sm btn-primary self-end my-4 text-neutral"
            onClick={() => handleClick("Finish Operation")}
          >
            FINISH OPERATION
          </button> */}
          {modal && render()}
        </div>

        <div className="font-bold mb-4">Output Parameter: </div>

        <div className="flex flex-wrap gap-3 mb-4">
          {/* <button
            name="Downtime"
            className="btn btn-sm btn-primary text-neutral"
            onClick={() => handleClick("Downtime")}
          >
            Downtime
          </button>
          <button
            name="Component Overview"
            className="btn btn-sm btn-primary text-neutral"
            onClick={() => handleClick("Component Overview")}
          >
            COMPONENT OVERVIEW
          </button> */}
          <button
            name="Detailed View"
            className="btn btn-sm btn-primary text-neutral"
            onClick={() => handleClick("Detailed View")}
          >
            Detailed View
          </button>
        </div>
        <div className="w-full overflow-auto mb-4">
          <BasicTable
            tableHeader={table_header}
            tableData={tableData ? tableData : []}
            handleClickDownload={handleClickDownload}
            currentPage={0}
            itemsPerPage={0}
            searchQuery={searchQuery} // aritra change
setSearchQuery={setSearchQuery} // aritra change
          />
        </div>
      </div>
    </div>
  )
}

export default OperationCreation

//07112024
// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import DropDown from "@/components/DropDown"
// import { useAuth } from "@/contexts/auth"
// import AccordianOrderInfo from "@/components/AccordianView/AccordianOrderInfo"
// import RadialProgress from "@/components/RadialProgress/RadialProgress"
// import TableView from "@/components/TableView"
// import Downtime from "@/components/Downtime"
// import ModalComponent from "@/components/ModalComponent"
// import InventoryCheck from "@/components/Dashboard/InventoryCheck"
// import {
//   IOrderDetails,
//   IProductionOrder,
//   IOperation,
//   ITableVarible1,
//   ITableVarible,
//   ITableData,
//   ITableHeader,
// } from "@/utils/types"
// import {
//   CDC_HEADER_DATA,
//   //OPERATION_ID,
//   PACK_CDC_HEADER_DATA,
//   PROGRESS_DATA,
//   TABLE_DATA,
//   TABLE_DATA1,
// } from "@/utils/data"
// import AccordianOperationInfo from "@/components/AccordianView/AccordianOperationInfo"
// import Accordian from "@/components/AccordianView/Accordian"
// import BasicTable from "@/components/tables/BasicTable"

// const OperationCreation: React.FC = () => {
//   const [modal, setModal] = useState(false)
//   const [selectedTitle, setSelectedTitle] = useState("")
//   const [productionOrders, setProductionOrders] = useState<IProductionOrder[]>(
//     [],
//   )
//   const [operations, setOperations] = useState<IOperation[]>([])
//   const [orderDetails, setOrderDetails] = useState<IOrderDetails>([])
//   const [lotNo, setLotNo] = useState("")
//   const [shift, setShift] = useState("")
//   const [productionOrderNumber, setProductionOrderNumber] = useState("")
//   const [selectedProductionOrder, setSelectedProductionOrder] = useState<
//     string | null
//   >(null)
//   const [selectedOperation, setSelectedOperation] = useState<string | null>(
//     null,
//   )
//   const [tableData, setTableData] = useState<ITableData[]>()
//   const { user } = useAuth()
//   const [table_header, setTable_header] = useState<ITableHeader[]>([])

//   useEffect(() => {
//     const selectedWorkcenter = operations.find(
//       (op) => op.Operation === selectedOperation,
//     )?.WorkcenterId

//     switch (selectedWorkcenter) {
//       case 1:
//         setTable_header(CDC_HEADER_DATA)
//         break;
//       case 2:
//         setTable_header(PACK_CDC_HEADER_DATA)
//         break;

//         default:
//         setTable_header(CDC_HEADER_DATA)
//     }
//   }, [selectedOperation, operations])

//   useEffect(() => {
//     if (user) {
//       const fetchProductionOrders = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetPODD?Id=${user.userid}`,
//           )
//           setProductionOrders(response.data.Data)
//           if (response.data.Data.length > 0) {
//             const defaultOrderId = response.data.Data[0].OrderId.toString()
//             setSelectedProductionOrder(defaultOrderId)
//           }
//         } catch (error) {
//           console.error("Error fetching production orders:", error)
//         }
//       }

//       fetchProductionOrders()
//     }
//   }, [user])

//   useEffect(() => {
//     if (user && selectedProductionOrder) {
//       const fetchOperations = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetOperationDDOperator?Id=${user.userid}&OrderId=${selectedProductionOrder}`,
//           )
//           setOperations(response.data.Data)
//         } catch (error) {
//           console.error("Error fetching operations:", error)
//         }
//       }

//       fetchOperations()
//     }
//   }, [selectedProductionOrder, user])

//   useEffect(() => {
//     if (user && selectedProductionOrder && selectedOperation) {
//       const fetchOrderDetails = async () => {
//         try {
//           const selectedWorkcenter = operations.find(
//             (op) => op.Operation === selectedOperation,
//           )?.WorkcenterId
//           if (selectedWorkcenter) {
//             const response = await axios.get(
//               `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetOrderDetails?Id=${user.userid}&OrderId=${selectedProductionOrder}&WorkcenterId=${selectedWorkcenter}`,
//             )
//             const data = response.data.Data[0]
//             setOrderDetails([
//               { header: "Product", value: data.Product },
//               { header: "Description", value: data.ProductDescription },
//               { header: "Order Qty", value: data.OrderQuantity },
//               {
//                 header: "Confirmed Qty",
//                 value: data.ConfirmedQuantity ?? "N/A",
//               },
//               { header: "Open Qty", value: data.OpenQuantity ?? "N/A" },
//               { header: "Time Spent", value: data.TimeSpent ?? "N/A" },
//             ])
//             setLotNo(data.LotNumber)
//             setShift(data.ShiftName)
//             setProductionOrderNumber(data.OrderNumber)
//           }
//         } catch (error) {
//           console.error("Error fetching order details:", error)
//         }
//       }

//       fetchOrderDetails()
//     }
//   }, [selectedOperation, selectedProductionOrder, user, operations])

//   useEffect(() => {
//     const selectedWorkcenter = operations.find(
//       (op) => op.Operation === selectedOperation,
//     )?.WorkcenterId
//     console.log("work", selectedWorkcenter)
//     if (selectedWorkcenter && selectedProductionOrder) {
//       const fetchOperations = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetallCDCData?ProcessId=${selectedWorkcenter}&OrderId=${selectedProductionOrder}&UserId=${user?.userid}`,
//           )
//           setTableData(response.data.Data)
//         } catch (error) {
//           console.error("Error fetching operations:", error)
//         }
//       }

//       fetchOperations()
//     }
//   }, [selectedProductionOrder, selectedOperation])

//   const handleClick = (clickItem: string) => {
//     setSelectedTitle(clickItem)
//     setModal(true)
//   }

//   const handleCloseModal = (modalStatus: boolean) => {
//     setModal(modalStatus)
//   }

//   const handleProductionOrderChange = (orderId: string) => {
//     setSelectedProductionOrder(orderId)
//   }

//   const handleOperationChange = (operation: string) => {
//     setSelectedOperation(operation)
//   }

//   const renderSelectedItems = () => {
//     switch (selectedTitle) {
//       case "Downtime":
//         return <Downtime />
//       case "Finish Operation":
//         return (
//           <div className="w-full bg-neutral">
//             <header className="text-center text-base font-medium bg-info">
//               Order Details
//             </header>
//             <AccordianOrderInfo
//               orderDetails={orderDetails}
//               lotNo={lotNo}
//               shift={shift}
//               productionOrderNumber={productionOrderNumber}
//             />
//             <div className="flex flex-col mt-6">
//               <text className="py-5 text-center text-base font-medium border-t-2">
//                 Are you sure this operation is finished?
//               </text>
//               <div className="flex justify-center gap-10">
//                 <button className="btn w-40 bg-primary">Yes</button>
//                 <button className="btn w-40 bg-primary">No</button>
//               </div>
//             </div>
//           </div>
//         )
//       case "Detailed View":
//         return (
//           // <TableView data={tableData!} operationType="cellCapacityTesting" />
//           <BasicTable
//             tableHeader={table_header}
//             tableData={tableData ? tableData : []}currentPage={0} itemsPerPage={0}
//           />
//         )
//       case "Component Overview":
//         return <InventoryCheck />
//       default:
//         return <div className="w-full text-center">Not Available</div>
//     }
//   }

//     const render = () => {
//     return selectedTitle === "Detailed View" || selectedTitle === "Downtime" ? (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//         width="w-full max-w-full rounded-none"
//         height="h-full max-h-full"
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     ) : (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     )
//   }

//   return (
//     <div className="w-full md:flex gap-4 text-sm mb-6">
//       {/* Production Box */}
//       <div className="flex-col mt-8 gap-5 w-full md:w-52">
//         <div className="text-sm mb-4 p-2 bg-success rounded-md text-neutral-50">
//           <div className="font-semibold mb-1">Production</div>
//           <div>
//             <p>Time: {new Date().toLocaleTimeString()}</p>
//             <p className="pt-2">Date: {new Date().toLocaleDateString()}</p>
//           </div>
//         </div>

//          {/* Assigned User Id Box */}
//          <div className="flex flex-col mb-5 rounded-md border-2 border-info">
//           <h3 className="bg-info text-center py-2 text-sm">Assigned User Id</h3>
//           <span className="bg-base-100 text-center py-2">
//           {user ? `${user.firstName} ${user.lastName}` : "N/A"}
//           </span>
//         </div>
//         <DropDown
//           title="Production Order"
//           setOperation={handleProductionOrderChange}
//           data={productionOrders.map((order) => ({
//             option: order.OrderNumber,
//             value: order.OrderId.toString(), // Ensure OrderId is a string
//           }))}
//         />
//        <DropDown
//           title="Operation"
//           setOperation={handleOperationChange}
//           data={operations.map((op) => ({
//             option: op.Operation,
//             value: op.Operation,
//           }))}
//         />

//         {/* Progress Boxes */}
//         <div className="flex flex-col mt-4 p-2 border border-neutral-900 items-center overflow-x-auto">
//           <RadialProgress radData={PROGRESS_DATA.completion_status} />
//           <RadialProgress radData={PROGRESS_DATA.ok_quantity} />
//           <RadialProgress radData={PROGRESS_DATA.scrap_quantity} />
//         </div>
//       </div>
//       <div className="w-[75vw]">
//         <div className="text-center text-lg font-bold mb-2">
//           Operation Confirmation
//         </div>
//         <div className="flex flex-col gap-3">
//           <Accordian title="Order Details">
//             <AccordianOrderInfo
//               orderDetails={orderDetails}
//               lotNo={lotNo}
//               shift={shift}
//               productionOrderNumber={productionOrderNumber}
//             />
//           </Accordian>

//           <Accordian title="Operation Details">
//             <AccordianOperationInfo />
//           </Accordian>

//           <button
//             name="Finish Operation"
//             className="btn btn-sm btn-primary self-end my-4 text-neutral"
//             onClick={() => handleClick("Finish Operation")}
//           >
//             FINISH OPERATION
//           </button>
//           {modal && render()}
//         </div>

//         <div className="font-bold mb-4">Output Parameter: </div>

//         <div className="flex flex-wrap gap-3 mb-4">
//           <button
//             name="Downtime"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Downtime")}
//           >
//             Downtime
//           </button>
//           <button
//             name="Component Overview"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Component Overview")}
//           >
//             COMPONENT OVERVIEW
//           </button>
//           <button
//             name="Detailed View"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Detailed View")}
//           >
//             Detailed View
//           </button>
//         </div>
//         <div className="w-full overflow-auto mb-4">
//            <BasicTable
//             tableHeader={table_header}
//             tableData={tableData ? tableData : []}currentPage={0} itemsPerPage={0}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OperationCreation

//27082024

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DropDown from "@/components/DropDown";
// import { useAuth } from "@/contexts/auth";
// import AccordianOrderInfo from "@/components/AccordianView/AccordianOrderInfo";
// import RadialProgress from "@/components/RadialProgress/RadialProgress";
// import TableView from "@/components/TableView";
// import Downtime from "@/components/Downtime";
// import ModalComponent from "@/components/ModalComponent";
// import InventoryCheck from "@/components/Dashboard/InventoryCheck";
// import { IOrderDetails, IProductionOrder, IOperation,ITableData } from "@/utils/types";
// import {
//   CDC_HEADER_DATA,
//   //OPERATION_ID,
//   PROGRESS_DATA,
//   TABLE_DATA1,
// } from "@/utils/data";
// import AccordianOperationInfo from "@/components/AccordianView/AccordianOperationInfo";
// import Accordian from "@/components/AccordianView/Accordian";
// import BasicTable from "@/components/tables/BasicTable"

// const OperationCreation: React.FC = () => {
//   const [modal, setModal] = useState(false);
//   const [selectedTitle, setSelectedTitle] = useState("");
//   const [productionOrders, setProductionOrders] = useState<IProductionOrder[]>([]);
//   const [operations, setOperations] = useState<IOperation[]>([]);
//   const [orderDetails, setOrderDetails] = useState<IOrderDetails>([]);
//   const [lotNo, setLotNo] = useState("");
//   const [shift, setShift] = useState("");
//   const [productionOrderNumber, setProductionOrderNumber] = useState("");
//   const [selectedProductionOrder, setSelectedProductionOrder] = useState<string | null>(null);
//   const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
//   const [tableData, setTableData] = useState<ITableData[]>()
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       const fetchProductionOrders = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetPODD?Id=${user.userid}`
//           );
//           setProductionOrders(response.data.Data);
//           if (response.data.Data.length > 0) {
//             const defaultOrderId = response.data.Data[0].OrderId.toString();
//             setSelectedProductionOrder(defaultOrderId);
//           }
//         } catch (error) {
//           console.error("Error fetching production orders:", error);
//         }
//       };

//       fetchProductionOrders();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user && selectedProductionOrder) {
//       const fetchOperations = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetOperationDDOperator?Id=${user.userid}&OrderId=${selectedProductionOrder}`
//           );
//           setOperations(response.data.Data);
//         } catch (error) {
//           console.error("Error fetching operations:", error);
//         }
//       };

//       fetchOperations();
//     }
//   }, [selectedProductionOrder, user]);

//   useEffect(() => {
//     if (user && selectedProductionOrder && selectedOperation) {
//       const fetchOrderDetails = async () => {
//         try {
//           const selectedWorkcenter = operations.find(op => op.Operation === selectedOperation)?.WorkcenterId;
//           if (selectedWorkcenter) {
//             const response = await axios.get(
//               `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetOrderDetails?Id=${user.userid}&OrderId=${selectedProductionOrder}&WorkcenterId=${selectedWorkcenter}`
//             );
//             const data = response.data.Data[0];
//             setOrderDetails([
//               { header: "Product", value: data.Product },
//               { header: "Description", value: data.ProductDescription },
//               { header: "Order Qty", value: data.OrderQuantity },
//               { header: "Confirmed Qty", value: data.ConfirmedQuantity ?? "N/A" },
//               { header: "Open Qty", value: data.OpenQuantity ?? "N/A" },
//               { header: "Time Spent", value: data.TimeSpent ?? "N/A" },
//             ]);
//             setLotNo(data.LotNumber);
//             setShift(data.ShiftName);
//             setProductionOrderNumber(data.OrderNumber);
//           }
//         } catch (error) {
//           console.error("Error fetching order details:", error);
//         }
//       };

//       fetchOrderDetails();
//     }
//   }, [selectedOperation, selectedProductionOrder, user, operations]);

//   useEffect(() => {
//     const selectedWorkcenter = operations.find(
//       (op) => op.Operation === selectedOperation,
//     )?.WorkcenterId
//     console.log("work", selectedWorkcenter)
//     if (selectedWorkcenter && selectedProductionOrder && user) {
//       const fetchOperations = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetallCDCData?ProcessId=${selectedWorkcenter}&OrderId=${selectedProductionOrder}&UserId=${user.userid}`,
//           )
//           setTableData(response.data.Data)
//         } catch (error) {
//           console.error("Error fetching operations:", error)
//         }
//       }

//       fetchOperations()
//     }
//   }, [selectedProductionOrder, selectedOperation])

//   const handleClick = (clickItem: string) => {
//     setSelectedTitle(clickItem);
//     setModal(true);
//   };

//   const handleCloseModal = (modalStatus: boolean) => {
//     setModal(modalStatus);
//   };

//   const handleProductionOrderChange = (orderId: string) => {
//     setSelectedProductionOrder(orderId);
//   };

//   const handleOperationChange = (operation: string) => {
//     setSelectedOperation(operation);
//   };

//   const renderSelectedItems = () => {
//     switch (selectedTitle) {
//       case "Downtime":
//         return <Downtime />;
//       case "Finish Operation":
//         return (
//           <div className="w-full bg-neutral">
//             <header className="text-center text-base font-medium bg-info">Order Details</header>
//             <AccordianOrderInfo
//               orderDetails={orderDetails}
//               lotNo={lotNo}
//               shift={shift}
//               productionOrderNumber={productionOrderNumber}
//             />
//             <div className="flex flex-col mt-6">
//               <text className="py-5 text-center text-base font-medium border-t-2">
//                 Are you sure this operation is finished?
//               </text>
//               <div className="flex justify-center gap-10">
//                 <button className="btn w-40 bg-primary">Yes</button>
//                 <button className="btn w-40 bg-primary">No</button>
//               </div>
//             </div>
//           </div>
//         );
//       case "Detailed View":
//         return (
//           // <TableView data={tableData!} operationType="cellCapacityTesting" />
//           <BasicTable
//             tableHeader={CDC_HEADER_DATA}
//             tableData={tableData ? tableData : []}
//           />
//         )
//       case "Component Overview":
//         return <InventoryCheck />;
//       default:
//         return <div className="w-full text-center">Not Available</div>;
//     }
//   };

//   return (
//     <div className="w-full md:flex gap-4 text-sm mb-6">
//       {/* Production Box */}
//       <div className="flex-col mt-8 gap-5 w-full md:w-52">
//         <div className="text-sm mb-4 p-2 bg-success rounded-md text-neutral-50">
//           <div className="font-semibold mb-1">Production</div>
//           <div>
//             <p>Time: {new Date().toLocaleTimeString()}</p>
//             <p className="pt-2">Date: {new Date().toLocaleDateString()}</p>
//           </div>
//         </div>
//         <DropDown
//           title="Operation"
//           setOperation={handleOperationChange}
//           data={operations.map((op) => ({
//             option: op.Operation,
//             value: op.Operation,
//           }))}
//         />
//         <DropDown
//           title="Production Order"
//           setOperation={handleProductionOrderChange}
//           data={productionOrders.map((order) => ({
//             option: order.OrderNumber,
//             value: order.OrderId.toString(), // Ensure OrderId is a string
//           }))}
//         />
//         {/* Assigned User Id Box */}
//         <div className="flex flex-col rounded-md border-2 border-info">
//           <h3 className="bg-info text-center py-2 text-sm">Assigned User Id</h3>
//           <span className="bg-base-100 text-center py-2">{user?.userid || "N/A"}</span>
//         </div>

//         {/* Progress Boxes */}
//         <div className="flex flex-col mt-4 p-2 border border-neutral-900 items-center overflow-x-auto">
//           <RadialProgress radData={PROGRESS_DATA.completion_status} />
//           <RadialProgress radData={PROGRESS_DATA.ok_quantity} />
//           <RadialProgress radData={PROGRESS_DATA.scrap_quantity} />
//         </div>
//       </div>
//       <div className="w-full">
//         <div className="text-center text-lg font-bold mb-2">Operation Confirmation</div>
//         <div className="flex flex-col gap-3">
//           <Accordian title="Order Details">
//             <AccordianOrderInfo
//               orderDetails={orderDetails}
//               lotNo={lotNo}
//               shift={shift}
//               productionOrderNumber={productionOrderNumber}
//             />
//           </Accordian>

//           <Accordian title="Operation Details">
//             <AccordianOperationInfo />
//           </Accordian>

//            <button
//             name="Finish Operation"
//             className="btn btn-sm btn-primary self-end my-4 text-neutral"
//             onClick={() => handleClick("Finish Operation")}
//           >
//             FINISH OPERATION
//           </button>
//           {modal && renderSelectedItems()}
//         </div>

//         <div className="font-bold mb-4">Output Parameter: </div>

//         <div className="flex flex-wrap gap-3 mb-4">
//           <button
//             name="Downtime"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Downtime")}
//           >
//             Downtime
//           </button>
//           <button
//             name="Component Overview"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Component Overview")}
//           >
//             COMPONENT OVERVIEW
//           </button>
//           <button
//             name="Detailed View"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Detailed View")}
//           >
//             Detailed View
//           </button>
//           {modal && renderSelectedItems()}
//         </div>
//         <div className="w-full overflow-auto mb-4">
//            {/* <TableView data={tableData === undefined ? TABLE_DATA1 : tableData} operationType="cellCapacityTesting" /> */}
//            <BasicTable
//             tableHeader={CDC_HEADER_DATA}
//             tableData={tableData ? tableData : []}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OperationCreation;

// //12082024
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import DropDown from "@/components/DropDown";
// import { useAuth } from "@/contexts/auth";
// import Accordian from "@/components/AccordianView/Accordian";
// import AccordianOrderInfo from "@/components/AccordianView/AccordianOrderInfo";
// import AccordianOperationInfo from "@/components/AccordianView/AccordianOperationInfo";
// import RadialProgress from "@/components/RadialProgress/RadialProgress";
// import TableView from "@/components/TableView";
// import Downtime from "@/components/Downtime";
// import ModalComponent from "@/components/ModalComponent";
// import InventoryCheck from "@/components/Dashboard/InventoryCheck";
// import { IProductionOrder } from "@/utils/types"
// import {
//   OPERATION_ID,
//   ORDER_DETAIL_FORM,
//   PROGRESS_DATA,
//   TABLE_DATA1,
// } from "@/utils/data";

// const OperationCreation: React.FC = () => {
//   const today = new Date();
//   const time: string = today.toLocaleTimeString();
//   const date: string = today.toLocaleDateString();
//   const [modal, setModal] = useState(false);
//   const [selectedTitle, setSelectedTitle] = useState("");
//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [operation, setOperation] = useState("");
//   const [operationType, setOperationType] = useState("cellCapacityTesting");
//   const [productionOrders, setProductionOrders] = useState<IProductionOrder[]>([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       const fetchProductionOrders = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetPODD?Id=${user.userid}`
//           );
//           setProductionOrders(response.data.Data);
//         } catch (error) {
//           console.error("Error fetching production orders:", error);
//         }
//       };
//       fetchProductionOrders();
//     }
//   }, [user]);

//   useEffect(() => {
//     switch (operation) {
//       case "0030-tableDef":
//         setOperationType("tableDef");
//         break;
//       case "0030-cellCapacityTesting":
//         setOperationType("cellCapacityTesting");
//         break;
//       case "0010-cellSorting":
//         setOperationType("cellSorting");
//         break;
//       case "0100-Pack Assembly":
//         setOperationType("PackAssembly");
//         break;
//       case "0130-BMS Testing":
//         setOperationType("BMSTesting");
//         break;
//       case "0100-Battery pack Testing":
//         setOperationType("BatterypackTesting");
//         break;
//       case "0030-Final Quality Check":
//         setOperationType("FinalQualityCheck");
//         break;
//       case "0030-Packing":
//         setOperationType("Packing");
//         break;
//       default:
//         setOperationType("cellCapacityTesting");
//         break;
//     }
//   }, [operation]);

//   const handleClick = (clickItem: string) => {
//     setSelectedTitle(clickItem);
//     setModal(true);
//   };

//   const handleCloseModal = (modalStatus: boolean) => {
//     setModal(modalStatus);
//   };

//   const renderSelectedItems = () => {
//     switch (selectedTitle) {
//       case "Downtime":
//         return <div className="w-full">{<Downtime />}</div>;

//       case "Finish Operation":
//         return (
//           <div className="w-full bg-neutral">
//             <header className="text-center text-base font-medium bg-info">
//               Order Details
//             </header>
//             <AccordianOrderInfo data={ORDER_DETAIL_FORM} />
//             <div className="flex flex-col mt-6">
//               <text className="py-5 text-center text-base font-medium border-t-2">
//                 Are you sure this operation is finished?
//               </text>
//               <div className="flex justify-center gap-10">
//                 <button className="btn w-40 bg-primary">Yes</button>
//                 <button className="btn w-40 bg-primary">No</button>
//               </div>
//             </div>
//           </div>
//         );

//       case "Detailed View":
//         return <div className="w-full">{<TableView data={TABLE_DATA1} operationType={operationType} />}</div>;
//       case "Component Overview":
//         return <div className="w-full">{<InventoryCheck />}</div>;

//       default:
//         return <div className="w-full text-center">Not Available</div>;
//     }
//   };

//   const renderModal = () => {
//     return selectedTitle === "Detailed View" || selectedTitle === "Downtime" ? (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//         width="w-full max-w-full rounded-none"
//         height="h-full max-h-full"
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     ) : (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     );
//   };

//   return (
//     <div className="w-full md:flex gap-4 text-sm mb-6">
//       {/* Production Box */}
//       <div className="flex-col mt-8 gap-5 w-full md:w-52">
//         <div className="text-sm mb-4 p-2 bg-success rounded-md text-neutral-50">
//           <div className="font-semibold mb-1">Production</div>
//           <div>
//             <p>Time: {time}</p>
//             <p className="pt-2">Date: {date}</p>
//           </div>
//         </div>
//         <DropDown title="Operation" setOperation={setOperation} data={OPERATION_ID} />
//         <DropDown
//           title="Production Order"
//           setOperation={setOperation}
//           data={productionOrders.map((order) => ({
//             option: order.OrderNumber,
//             value: order.OrderId,
//           }))}
//         />
//         {/* Assigned User Id Box */}
//         <div className="flex flex-col rounded-md border-2 border-info">
//           <h3 className="bg-info text-center py-2 text-sm">Assigned User Id</h3>
//           <span className="bg-base-100 text-center py-2">{user?.userid || "N/A"}</span>
//         </div>

//         {/* Progress Boxes */}
//         <div className="flex flex-col mt-4 p-2 border border-neutral-900 items-center overflow-x-auto">
//           <RadialProgress radData={PROGRESS_DATA.completion_status} />
//           <RadialProgress radData={PROGRESS_DATA.ok_quantity} />
//           <RadialProgress radData={PROGRESS_DATA.scrap_quantity} />
//         </div>
//       </div>
//       <div className="w-full">
//         <div className="text-center text-lg font-bold mb-2">
//           Operation Confirmation
//         </div>
//         <div className="flex flex-col gap-3">
//           <Accordian title="Order Details">
//             <AccordianOrderInfo data={ORDER_DETAIL_FORM} />
//           </Accordian>

//           <Accordian title="Operation Details">
//             <AccordianOperationInfo />
//           </Accordian>

//           <button
//             name="Finish Operation"
//             className="btn btn-sm btn-primary self-end my-4 text-neutral"
//             onClick={() => handleClick("Finish Operation")}
//           >
//             FINISH OPERATION
//           </button>
//           {modal && renderModal()}
//         </div>

//         <div className="font-bold mb-4">Output Parameter: </div>

//         <div className="flex flex-wrap gap-3 mb-4">
//           <button
//             name="Downtime"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Downtime")}
//           >
//             Downtime
//           </button>
//           <button
//             name="Component Overview"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Component Overview")}
//           >
//             COMPONENT OVERVIEW
//           </button>
//           <button
//             name="Detailed View"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Detailed View")}
//           >
//             Detailed View
//           </button>
//           {modal && renderModal()}
//         </div>
//         <div className="w-full overflow-auto mb-4">
//           <TableView data={TABLE_DATA1} operationType={operationType} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OperationCreation;

//----------------------------------------------------------------------------------------------------------------------------------------

// import Accordian from "@/components/AccordianView/Accordian"
// import AccordianOrderInfo from "@/components/AccordianView/AccordianOrderInfo"
// import AccordianOperationInfo from "@/components/AccordianView/AccordianOperationInfo"
// import RadialProgress from "@/components/RadialProgress/RadialProgress"
// import TableView from "@/components/TableView"
// import DropDown from "@/components/DropDown"
// import Downtime from "@/components/Downtime"
// import {
//   OPERATION_ID,
//   ORDER_DETAIL_FORM,
//   PRODUCTION_ORDER,
//   PROGRESS_DATA,
//   TABLE_DATA1,
// } from "@/utils/data"
// import React, { useEffect, useRef, useState } from "react"
// import { BiUpload } from "react-icons/bi"
// import ModalComponent from "@/components/ModalComponent"
// import InventoryCheck from "@/components/Dashboard/InventoryCheck"
// import { TiUploadOutline } from "react-icons/ti"

// interface OperationCreationProps {}

// const OperationCreation: React.FC<OperationCreationProps> = ({}) => {
//   const today = new Date()
//   const time: string = today.toLocaleTimeString()
//   const date: string = today.toLocaleDateString()
//   const [modal, setModal] = useState(false)
//   const [selectedTitle, setSelectedTitle] = useState("")
//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [operation,setOperation] = useState("");
//   const [operationType,setOperationType] = useState("cellCapacityTesting")
//   // console.log("Operation=",operation)

//   const handleClick = (clickItem: string) => {
//     setSelectedTitle(clickItem)
//     setModal(true)
//   }

//   const handleCloseModal = (modalStatus: boolean) => {
//     setModal(modalStatus)
//   }

//   const handleButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   const handleFileInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const fileList = event.target.files
//     if (!fileList) return
//     setSelectedFiles(fileList)
//   }

//   const renderSelectedItems = () => {
//     switch (selectedTitle) {
//       case "Downtime":
//         return <div className="w-full">{<Downtime />}</div>

//       case "Finish Operation":
//         return (
//           <div className="w-full bg-neutral">
//             <header className="text-center text-base font-medium bg-info">
//               Order Details
//             </header>
//             <AccordianOrderInfo data={ORDER_DETAIL_FORM} />
//             <div className="flex flex-col mt-6">
//               <text className="py-5 text-center text-base font-medium border-t-2">
//                 Are you sure this operation is finished ?
//               </text>
//               <div className="flex justify-center gap-10">
//                 <button className="btn w-40 bg-primary">Yes</button>
//                 <button className="btn w-40 bg-primary">No</button>
//               </div>
//             </div>
//           </div>
//         )

//       case "Detailed View":
//         return <div className="w-full">{<TableView data={TABLE_DATA1}  operationType={operationType} />}</div>

//       // case "Upload":
//       //   return (
//       //     <div className="w-full flex flex-col">
//       //       <input
//       //         type="file"
//       //         id="imgupload"
//       //         style={{ display: "none" }}
//       //         ref={fileInputRef}
//       //         onChange={handleFileInputChange}
//       //       />
//       //       <h3 className="text-center text-xl font-medium">Drag & Drop Files here</h3>
//       //       <TiUploadOutline size={100} className="self-center my-10" />
//       //       {selectedFiles && (
//       //         <div className="flex justify-center">
//       //           <ul>
//       //             {Array.from(selectedFiles).map((file, index) => (
//       //               <li key={index}>{file.name}</li>
//       //             ))}
//       //           </ul>
//       //         </div>
//       //       )}
//       //       <div className="flex justify-center gap-10 my-6">
//       //         <button className="btn" onClick={handleButtonClick}>
//       //           Select
//       //         </button>
//       //         <button
//       //           className="btn"
//       //           onClick={() => {
//       //             setModal(false)
//       //           }}
//       //         >
//       //           Upload
//       //         </button>
//       //       </div>
//       //     </div>
//       //   )

//       case "Component Overview":
//         return <div className="w-full">{<InventoryCheck />}</div>

//       default:
//         return <div className="w-full text-center">Not Available</div>
//     }
//   }

//   const render = () => {
//     return selectedTitle === "Detailed View" || selectedTitle === "Downtime" ? (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//         width="w-full max-w-full rounded-none"
//         height="h-full max-h-full"
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     ) : (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     )
//   }

//   useEffect(()=>{
//     // console.log("coming in operation")
//     if(operation == "0030-tableDef")
//         setOperationType("tableDef")
//     if(operation === "0030-cellCapacityTesting")
//         setOperationType("cellCapacityTesting");

//     if(operation === "0010-cellSorting")
//         setOperationType("cellSorting")
//     if(operation === "0100-Pack Assembly")
//         setOperationType("PackAssembly")
//     if(operation === "0130-BMS Testing")
//        setOperationType("BMSTesting")
//     if(operation === "0100-Battery pack Testing")
//       setOperationType("BatterypackTesting")
//     if(operation === "0030-Final Quality Check")
//       setOperationType("FinalQualityCheck")
//    if(operation === "0030-Packing")
//      setOperationType("Packing")

//     // console.log("operation=",operation);

//   },[operation])

//   return (
//     <div className="w-full md:flex gap-4 text-sm mb-6">
//       {/* Production Box */}
//       <div className="flex-col mt-8 gap-5 w-full md:w-52">
//         <div className="text-sm mb-4 p-2 bg-success rounded-md text-neutral-50">
//           <div className="font-semibold mb-1">Production</div>
//           <div>
//             <p>Time : {time}</p>
//             <p className="pt-2">Date : {date}</p>
//           </div>
//         </div>
//         <DropDown title="Operation" setOperation={setOperation} data={OPERATION_ID} />
//         <DropDown title="Production Order"  setOperation={setOperation} data={PRODUCTION_ORDER} />

//         {/* Assigned User Id Box */}
//         <div className="flex flex-col rounded-md border-2 border-info">
//           <h3 className="bg-info text-center py-2 text-sm">Assigned User Id</h3>
//           <span className="bg-base-100 text-center py-2">10001010</span>
//         </div>

//         {/* Assigned User Id Box */}
//         <div className="flex flex-col mt-4 p-2 border border-neutral-900 items-center overflow-x-auto">
//           <RadialProgress radData={PROGRESS_DATA.completion_status} />
//           <RadialProgress radData={PROGRESS_DATA.ok_quantity} />
//           <RadialProgress radData={PROGRESS_DATA.scrap_quantity} />
//         </div>
//       </div>
//       <div className="w-full">
//         <div className="text-center text-lg font-bold mb-2">
//           Operation Confirmation
//         </div>
//         <div className="flex flex-col gap-3">
//           <Accordian title="Order Details">
//             <AccordianOrderInfo data={ORDER_DETAIL_FORM} />
//           </Accordian>

//           <Accordian title="Operation Details">
//             <AccordianOperationInfo />
//           </Accordian>

//           {/* <button
//             name="Component Overview"
//             className="btn btn-sm btn-primary self-end my-4 text-neutral"
//             onClick={() => handleClick("Component Overview")}
//           >
//             Component Overview
//           </button> */}
//           <button name="Finish Operation" className="btn btn-sm btn-primary self-end my-4 text-neutral"  onClick={() => handleClick("Finish Operation")}  >
//             FINISH OPERATION
//           </button>
//           {modal && render()}
//         </div>

//         <div className="font-bold mb-4">Output Parameter: </div>

//         <div className="flex flex-wrap gap-3 mb-4">
//           <button
//             name="Downtime"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Downtime")}
//           >
//             Downtime
//           </button>
//           {/* <button
//             name="Finish Operation"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Finish Operation")}
//           >
//             Finish Operation
//           </button> */}
//           <button   name="Component Overview"
//             className="btn btn-sm btn-primary text-neutral" onClick={()=>handleClick("Component Overview")} >
//               COMPONENT OVERVIEW

//           </button>
//           <button
//             name="Detailed View"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Detailed View")}
//           >
//             Detailed View
//           </button>
//           {/* <button
//             name="Upload"
//             className="btn btn-sm bg-base-100 self-end lg:ml-auto"
//             onClick={() => handleClick("Upload")}
//           >
//             <span>Upload :</span>
//             <BiUpload size={24} />
//           </button> */}
//           {modal && render()}
//         </div>
//         <div className="w-full overflow-auto mb-4">
//           <TableView data={TABLE_DATA1} operationType={operationType} />
//         </div>
//       </div>

//     </div>
//   )
// }

// export default OperationCreation

// import Accordian from "@/components/AccordianView/Accordian"
// import AccordianOrderInfo from "@/components/AccordianView/AccordianOrderInfo"
// import AccordianOperationInfo from "@/components/AccordianView/AccordianOperationInfo"
// import RadialProgress from "@/components/RadialProgress/RadialProgress"
// import TableView from "@/components/TableView"
// import DropDown from "@/components/DropDown" // Adjust the import path as needed
// import Downtime from "@/components/Downtime"
// import {
//   OPERATION_ID,
//   ORDER_DETAIL_FORM,
//   PRODUCTION_ORDER,
//   PROGRESS_DATA,
//   TABLE_DATA,
// } from "@/utils/data"
// import React, { useRef, useState } from "react"
// import { BiUpload } from "react-icons/bi"
// import ModalComponent from "@/components/ModalComponent"
// import InventoryCheck from "@/components/Dashboard/InventoryCheck"
// import { TiUploadOutline } from "react-icons/ti"
// import { ITableVarible } from "@/utils/types";

// interface OperationCreationProps {}

// const OperationCreation: React.FC<OperationCreationProps> = ({}) => {
//   const today = new Date()
//   const time: string = today.toLocaleTimeString()
//   const date: string = today.toLocaleDateString()
//   const [modal, setModal] = useState(false)
//   const [selectedTitle, setSelectedTitle] = useState("")
//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleClick = (clickItem: string) => {
//     setSelectedTitle(clickItem)
//     setModal(true)
//   }

//   const handleCloseModal = (modalStatus: boolean) => {
//     setModal(modalStatus)
//   }

//   const handleButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   const handleFileInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const fileList = event.target.files
//     if (!fileList) return
//     setSelectedFiles(fileList)
//   }
// //------------------------- case
//   const renderSelectedItems = () => {
//     switch (selectedTitle) {
//       case "Downtime":
//         return <div className="w-full">{<Downtime />}</div>
// //finish operaton menu
//       case "Finish Operation":
//         return (
//           <div className="w-full bg-neutral">
//             <header className="text-center text-base font-medium bg-info">
//               Order Details
//             </header>
//             <AccordianOrderInfo data={ORDER_DETAIL_FORM} />
//             <div className="flex flex-col mt-6">
//               <text className="py-5 text-center text-base font-medium border-t-2">
//                 Are you sure this operation is finished ?
//               </text>
//               <div className="flex justify-center gap-10">
//                 <button className="btn w-40 bg-primary">Yes</button>
//                 <button className="btn w-40 bg-primary">No</button>
//               </div>
//             </div>
//           </div>
//         )
// //Detail View
//       case "Detailed View":
//         return <div className="w-full">{<TableView data={TABLE_DATA} />}</div>
// //Upload
//       case "Upload":
//         return (
//           <div className="w-full flex flex-col">
//             <input
//               type="file"
//               id="imgupload"
//               style={{ display: "none" }}
//               ref={fileInputRef}
//               onChange={handleFileInputChange}
//             />
//             <h3 className="text-center text-xl font-medium">Drag & Drop Files here</h3>
//             <TiUploadOutline size={100} className="self-center my-10" />
//             {selectedFiles && (
//               <div className="flex justify-center">
//                 <ul>
//                   {Array.from(selectedFiles).map((file, index) => (
//                     <li key={index}>{file.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <div className="flex justify-center gap-10 my-6">
//               <button className="btn" onClick={handleButtonClick}>
//                 Select
//               </button>
//               <button
//                 className="btn"
//                 onClick={() => {
//                   setModal(false)
//                 }}
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         )
// //component overview
//       case "Component Overview":
//         return <div className="w-full">{<InventoryCheck />}</div>

//       default:
//         return <div className="w-full text-center">Not Available</div>
//     }
//   }
// //---------------------------------------
//   const render = () => {
//     return selectedTitle === "Detailed View" || selectedTitle === "Downtime" ? (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//         width="w-full max-w-full rounded-none"
//         height="h-full max-h-full"
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     ) : (
//       <ModalComponent
//         showModal={modal}
//         handleCloseModal={handleCloseModal}
//         title={selectedTitle}
//       >
//         {renderSelectedItems()}
//       </ModalComponent>
//     )
//   }
// //page UI from  here
//   return (
//     // Operation Confirmation
//     <div className="w-full md:flex gap-4 text-sm mb-6">
//       <div className="w-full">
//         <div className="text-center text-lg font-bold mb-2">
//           Operation Confirmation
//         </div>
//         <div className="flex flex-col gap-3">
//           <Accordian title="Order Details">
//             <AccordianOrderInfo data={ORDER_DETAIL_FORM} />
//           </Accordian>
//           {/* ----Operation Details---- */}

//           <Accordian title="Operation Details">
//             <AccordianOperationInfo />
//           </Accordian>
// {/* ----Component OverView */}
//           <button
//             name="Component Overview"
//             className="btn btn-sm btn-primary self-end my-4 text-neutral"
//             onClick={() => handleClick("Component Overview")}
//           >
//             Component Overview
//           </button>
//           {modal && render()}
//         </div>
// {/* ------------------------------------------------------ */}
//         <div className="font-bold mb-4">Output Parameter: </div>

//         <div className="flex flex-wrap gap-3 mb-4">
//           <button
//             name="Downtime"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Downtime")}
//           >
//             Downtime
//           </button>
//           <button
//             name="Finish Operation"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Finish Operation")}
//           >
//             Finish Operation
//           </button>
//           <button
//             name="Detailed View"
//             className="btn btn-sm btn-primary text-neutral"
//             onClick={() => handleClick("Detailed View")}
//           >
//             Detailed View
//           </button>
//           {/* ----------------------------- */}
//           <button
//             name="Upload"
//             className="btn btn-sm bg-base-100 self-end lg:ml-auto"
//             onClick={() => handleClick("Upload")}
//           >
//             <span>Upload :</span>
//             <BiUpload size={24} />
//           </button>
//           {modal && render()}
//         </div>

//         {/* ------------Table Display values ---------------------- */}
//         <div className="w-full overflow-auto mb-4">
//           <TableView data={TABLE_DATA} />
//         </div>
//       </div>

//       {/* Production Box */}
//       <div className="flex-col gap-5 w-full md:w-52">
//         <div className="text-sm mb-4 p-2 bg-success rounded-md text-neutral-50">
//           <div className="font-semibold mb-1">Production</div>
//           <div>
//             <p>Time : {time}</p>
//             <p className="pt-2">Date : {date}</p>
//           </div>
//         </div>
//         {/* ----------------------- */}
//         <DropDown title="Operation" data={OPERATION_ID} />
//         <DropDown title="Production Order" data={PRODUCTION_ORDER} />

//         {/* Assigned User Id Box */}
//         <div className="flex flex-col rounded-md border-2 border-info">
//           <h3 className="bg-info text-center py-2 text-sm">Assigned User Id</h3>
//           <span className="bg-base-100 text-center py-2">10001010</span>
//         </div>
//          {/* --------------------- */}
//         {/* Assigned User Id Box */}
//         <div className="flex flex-col mt-4 p-2 border border-neutral-900 items-center overflow-x-auto">
//           <RadialProgress radData={PROGRESS_DATA.completion_status} />
//           <RadialProgress radData={PROGRESS_DATA.ok_quantity} />
//           <RadialProgress radData={PROGRESS_DATA.scrap_quantity} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OperationCreation
