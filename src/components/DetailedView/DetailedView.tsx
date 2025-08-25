import React, { useState, useEffect, useRef } from "react"
import Select from "react-select"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import nookies from "nookies"
import BasicTable from "../tables/BasicTable"
import { ITableHeader } from "@/utils/types"
import { saveAs } from "file-saver"

interface DetailedViewProps {
  options: { value: string; label: string }[]
  detailView: {
    Id: string | null | undefined
    workcenter_id: number | null | undefined
    Bar_Slno: string | null | undefined
  }
  tableHeader: ITableHeader[]
}

const DetailedView: React.FC<DetailedViewProps> = ({
  options,
  detailView,
  tableHeader,
}) => {
  const token = nookies.get(null).accessToken || ""
  const [fromDate, setLocalFromDate] = useState<string>("")
  const [toDate, setLocalToDate] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<any[]>([])
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [processDetails, setProcessDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const [tableData, setTableData] = useState<any[]>([])
  const [filterTableData, setFilterTableData] = useState<any[]>([])

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setLocalFromDate(date)
  }

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setLocalToDate(date)
  }

  const handleChange = (selectedItems: any) => {
    setSelectedOptions(selectedItems)
  }

  const handleOnClick = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !event.composedPath().includes(selectRef.current as EventTarget)
    ) {
      setMenuIsOpen(false)
    }
  }

  const handleSelectClick = () => {
    if (!menuIsOpen) setMenuIsOpen(true)
  }

  useEffect(() => {
    document.body.addEventListener("click", handleOnClick)
    return () => {
      document.body.removeEventListener("click", handleOnClick)
    }
  }, [])

  useEffect(() => {
    const fetchProcessDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetAllProcess`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        setProcessDetails(response.data)
      } catch (error) {
        console.error("Error fetching process details:", error)
      }
    }
    fetchProcessDetails()
  }, [])

  const fetchAtRender = async () => {
    if (!fromDate && !toDate && selectedOptions.length === 0) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetallShiftwiseData`,
          {
            params: {
              FromDate: "",
              ToDate: "",
              ShiftIds: "",
              Bar_Slno: detailView.Bar_Slno,
              userId: detailView.Id,
              ProcessId: detailView.workcenter_id,
            },
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        const fetchedData = response.data.Data

        if (fetchedData && fetchedData.length > 0) {
          const dataWithIndex = fetchedData.map((row: any, index: number) => ({
            ...row,
            RowIndex: index + 1, // Add index starting at 1
          }))

          setFilterTableData(dataWithIndex) // Update filtered data
          setTableData(dataWithIndex) // Update table data

          // Optionally log the download links for debugging
          dataWithIndex.forEach(
            (row: { DownloadLink: string }, index: number) => {
              console.log(
                `Download link for row ${index + 1}:`,
                row.DownloadLink,
              )
            },
          )
        } else {
          console.log("No data available for the selected criteria.")
          setFilterTableData([]) // Reset the filtered data
          setTableData([]) // Reset the table data
        }
      } catch (error) {
        console.error("Error fetching data at render:", error)
      }
    }
  }

  // useEffect for initial fetch
  useEffect(() => {
    fetchAtRender()
    // Only run when filters are cleared
  }, [fromDate, toDate, selectedOptions.length === 0])

  const handleApplyFilters = async () => {
    if (!fromDate || !toDate || selectedOptions.length === 0) {
      toast.error(
        "All fields are required. Please complete them before applying filters.",
      )
      return
    }

    setIsLoading(true) // Start loading
    const selectedShiftIds = selectedOptions.map((opt) => opt.value).join(",")

    try {
      console.log("Request Params:", {
        FromDate: fromDate,
        ToDate: toDate,
        ShiftIds: selectedShiftIds,
      })

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/GetallShiftwiseData`,
        {
          params: {
            FromDate: fromDate,
            ToDate: toDate,
            ShiftIds: selectedShiftIds,
            Bar_Slno: detailView.Bar_Slno,
            userId: detailView.Id,
            ProcessId: detailView.workcenter_id,
          },
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const fetchedData = response.data.Data
      console.log("Fetch data coming is ", fetchedData)

      if (fetchedData && fetchedData.length > 0) {
        const dataWithIndex = fetchedData.map((row: any, index: number) => ({
          ...row,
          RowIndex: index + 1, // Add index starting at 1
        }))

        setTableData(dataWithIndex) // Update table data
        setFilterTableData(dataWithIndex) // Update filtered data

        // Optionally log the download links for debugging
        dataWithIndex.forEach(
          (row: { DownloadLink: string }, index: number) => {
            console.log(`Download link for row ${index + 1}:`, row.DownloadLink)
          },
        )
      } else {
        console.log("No data available for the selected filters.")
        setTableData([]) // Reset table data
        setFilterTableData([]) // Reset filtered data
      }
    } catch (error) {
      toast.error("Error applying filters. Please try again.")
      console.error("Error applying filters:", error)
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

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

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap gap-10 items-center">
        {/* Shift Selection */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-2">Select Shift</label>
          <div
            ref={selectRef}
            onClick={handleSelectClick}
            className="w-full sm:w-96 md:w-full"
          >
            <Select
              isMulti
              options={options}
              value={selectedOptions}
              onChange={handleChange}
              isSearchable
              menuIsOpen={menuIsOpen}
              placeholder="Type to Search"
              className="basic-multi-select"
              onFocus={() => setMenuIsOpen(true)}
            />
          </div>
        </div>

        {/* From Date */}
        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium mb-2">
            From Date:
          </label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={handleFromDateChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        {/* To Date */}
        <div>
          <label htmlFor="toDate" className="block text-sm font-medium mb-2">
            To Date:
          </label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={handleToDateChange}
            min={fromDate}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        {/* Apply Filters Button */}
        <div className="mt-6">
          <button
            className="btn btn-primary shadow-lg hover:shadow-xl hover:font-bold hover:text-neutral-50 focus:ring-4 focus:ring-blue-300 active:scale-95 transition-all duration-300 px-6 py-2 text-sm rounded-full"
            onClick={handleApplyFilters}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Applying..." : "Apply all filters"}
          </button>
        </div>
      </div>

      {/* Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      )}
      <div className="mt-6">
        <BasicTable
          tableHeader={tableHeader}
          tableData={filterTableData ? filterTableData : []}
          handleClickDownload={handleClickDownload}
          currentPage={0}
          itemsPerPage={0} searchQuery={""} setSearchQuery={function (query: string): void {
            throw new Error("Function not implemented.")
          } }        />
      </div>
    </div>
  )
}

export default DetailedView
