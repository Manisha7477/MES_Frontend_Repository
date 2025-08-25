import React, { useEffect, useState } from "react"
import axios from "axios"
import DropDown from "@/components/DropDown"
import { useAuth } from "@/contexts/auth"
import AccordianOrderInfo from "@/components/AccordianView/AccordianOrderInfo"
import RadialProgress from "@/components/RadialProgress/RadialProgress"
import Downtime from "@/components/Downtime"
import ModalComponent from "@/components/ModalComponent"
import InventoryCheck from "@/components/Dashboard/InventoryCheck"

import { saveAs } from "file-saver"

import {
  IOrderDetails,
  IOperation,
  ITableData,
  ITableHeader,
  IBarCode,
  IOperatorUser,
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
  CELL_COMPRESSION_HEADER_DATA,
  CELL_COMPRESSION_HEADER_DATA_DETAILED,
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

const SupervisorOperation: React.FC = () => {
  const [modal, setModal] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState("")
  // const [productionOrders, setProductionOrders] = useState<IProductionOrder[]>(
  //   [],
  // )
  const [operationDetails, setOperationDetails] = useState<IOperationDetails>(
    [],
  )
  const [operatoruser, setOperatorUser] = useState<IOperatorUser[]>([])
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
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null)
  const [tableData, setTableData] = useState<ITableData[]>()

  const { user } = useAuth()
  const [table_header, setTable_header] = useState<ITableHeader[]>([])
  const [table_header_detailed, setTable_header_detailed] = useState<ITableHeader[]>([])
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [progressData, setProgressData] = useState<IRadialData[]>([])

  const token = nookies.get(null).accessToken || ""

  // Download Button
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

  //for multiselect dropdown

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
 

  // multiselect dropdown finished here

  useEffect(() => {
    const selectedWorkcenter = operations.find(
      (op) => op.Operation === selectedOperation,
    )?.WorkcenterId

    switch (selectedWorkcenter) {
      case 1:
        setTable_header(CDC_HEADER_DATA)
        setTable_header_detailed(CDC_HEADER_DATA_DETAILED)
        break
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

  // ------------------------------------------------------------------------------------------------------
  //for operation-find according to user
  useEffect(() => {
    if (user && user.userid) {
      console.log("Fetching operations for user:", user.userid)
      const fetchOperations = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetSupervisor_Operation?UserId=${user.userid}`,
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
  }, [user, token])

  // Operator--------------------------------------

  useEffect(() => {
    if (selectedOperation) {
      const selectedWorkcenterId = operations.find(
        (op) => op.Operation === selectedOperation,
      )?.WorkcenterId

      if (selectedWorkcenterId) {
        const fetchOperators = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetUserdd_WorkcenterId?WorkcenterId=${selectedWorkcenterId}`,
              { headers: { Authorization: `Bearer ${token}` } },
            )
            setOperatorUser(response.data.Data)
          } catch (error) {
            console.error("Error fetching serial bar codes:", error)
          }
        }
        fetchOperators()
      }
    }
  }, [selectedOperation, operations, token])

  // SerialBarcode
  useEffect(() => {
    if (selectedOperation && selectedOperator) {
      const selectedOperatorId = operatoruser.find(
        (op) => op.UserName === selectedOperator,
      )?.UserId

      const selectedWorkcenterId = operations.find(
        (op) => op.Operation === selectedOperation,
      )?.WorkcenterId

      if (selectedWorkcenterId) {
        const fetchSerialBarCodes = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetSerial_BarcodeDD?Id=${selectedOperatorId}&workcenter_id=${selectedWorkcenterId}`,
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
  }, [selectedOperation, operations, selectedOperator, operatoruser])

  // -------------------
  useEffect(() => {
    if (user && selectedOperation && serialbarcode) {
      const selectedWorkcenterId = operations.find(
        (op) => op.Operation === selectedOperation,
      )?.WorkcenterId

      const selectedOperatorId = operatoruser.find(
        (op) => op.UserName === selectedOperator,
      )?.UserId

      if (selectedWorkcenterId) {
        const fetchOperationDetails = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetConfirmed_ScrapQuantity?Id=${selectedOperatorId}&workcenter_id=${selectedWorkcenterId}&Bar_Slno=${serialbarcode}`,
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
  }, [user, selectedOperation, serialbarcode, operations, operatoruser, token])

  useEffect(() => {
    if (selectedOperator) {
      const selectedOperatorId = operatoruser.find(
        (op) => op.UserName === selectedOperator,
      )?.UserId
      const fetchOrderDetails = async () => {
        try {
          {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetOrderDetails?Id=${selectedOperatorId}`,
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
  }, [selectedOperator, operatoruser, token])

  useEffect(() => {
    const selectedWorkcenter = operations.find(
      (op) => op.Operation === selectedOperation,
    )?.WorkcenterId

    const selectedOperatorId = operatoruser.find(
      (op) => op.UserName === selectedOperator,
    )?.UserId

    console.log("work", selectedWorkcenter)
    if (selectedWorkcenter && serialbarcode) {
      const fetchOperations = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetallCDCData?UserId=${selectedOperatorId}&ProcessId=${selectedWorkcenter}&Bar_Slno=${serialbarcode}`,
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

  useEffect(() => {
    if (selectedOperator && selectedOperation && serialbarcode) {
      const fetchProgressData = async () => {
        try {
          const selectedWorkcenterId = operations.find(
            (op) => op.Operation === selectedOperation,
          )?.WorkcenterId

          const selectedOperatorId = operatoruser.find(
            (op) => op.UserName === selectedOperator,
          )?.UserId

          //CHNAGES TO SHOW DETAILED VIEW 

          const tempDetailProps: {
            Id: string | undefined | null
            workcenter_id: number | undefined | null
            Bar_Slno: string | undefined | null
          } = {
            Id: selectedOperatorId,
            workcenter_id: selectedWorkcenterId,
            Bar_Slno: serialbarcode,
          }
          setDetailedViewProps(tempDetailProps)

          if (selectedWorkcenterId && selectedOperatorId) {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetConfirmed_ScrapQuantity`,
              {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                  Id: selectedOperatorId, // Use selectedOperatorId instead of user.userid
                  workcenter_id: selectedWorkcenterId,
                  Bar_Slno: serialbarcode,
                },
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
  }, [
    selectedOperator,
    selectedOperation,
    serialbarcode,
    operations,
    operatoruser,
  ])

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

  // const handleOperationChange = (operation: string) => {
  //   setSelectedOperation(operation)
  // }

  // const handleOperatorChange = (operator: string) => {
  //   setSelectedOperator(operator)
  // }

  const handleOperationChange = (operation: string) => {
    setSelectedOperation(operation)
    setSelectedOperator(null) // Reset operator dropdown
    setSerialBarCode(null) // Reset serial barcode dropdown
  }

  const handleOperatorChange = (operator: string) => {
    setSelectedOperator(operator)
    setSerialBarCode(null) // Reset serial barcode dropdown
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
        <div className="text-sm mb-4 p-2 bg-success rounded-md text-neutral-50 text-center">
          <div className="font-semibold mb-1">Production</div>
          <div>
            <p>Time: {currentTime.toLocaleTimeString()}</p>
            <p className="pt-2">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex flex-col mb-5 rounded-md border-2 border-info">
          <h3 className="bg-info text-center py-2 text-sm">Supervisor Name</h3>
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
            value: op.Operation,
            // Ensure OrderId is a string
          }))}
        />
        <DropDown
          title="Operators"
          setOperation={handleOperatorChange}
          resetTrigger={selectedOperation} // Reset when operation changes
          data={operatoruser.map((op) => ({
            option: op.UserName,
            value: op.UserName,
          }))}
        />
        {/* <DropDown
          title="Operators"
          setOperation={handleOperatorChange}
          resetTrigger={selectedOperation} // Reset when operation changes
          data={operatoruser.map((op) => ({
            option: op.UserName,
            value: op.UserId.toString(), // Use UserId (ensure it's unique)
          }))}
        /> */}

        <DropDown
          title="Serial Bar Code"
          setOperation={handleSerialBarCodeChange}
          resetTrigger={selectedOperator} // Reset when operator changes
          data={serialBarCodes.map((serial) => ({
            option: serial.SerialBarCodeNumber,
            value: serial.SerialBarCodeNumber,
          }))}
        />

        {/* Progress Boxes */}
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
        <div className="flex flex-col gap-3 px-4">
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
            itemsPerPage={0} searchQuery={""} setSearchQuery={function (query: string): void {
              throw new Error("Function not implemented.")
            } }          />
        </div>
      </div>
    </div>
  )
}

export default SupervisorOperation
