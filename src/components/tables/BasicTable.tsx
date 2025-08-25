import React, { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { ITableHeader, ITableData } from "@/utils/types"
import {
  HiArrowSmDown,
  HiArrowSmUp,
  HiExclamation,
  HiEye,
  HiOutlineTrash,
} from "react-icons/hi"
import { MdAddHome, MdEditSquare } from "react-icons/md"
import { FaDownload } from "react-icons/fa" // Import Download Icon
import { classNames } from "@/utils/dom"
import { formatDate, formatDateTime } from "@/utils/convert"

interface IBasicTableProps {
  tableHeader: ITableHeader[]
  tableData: ITableData[]
  handleClickEditAction?: Function
  handleClickViewAction?: Function
  handleDeleteAction?: Function
  handleClickDownload?: Function
  currentPage: number
  itemsPerPage: number
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const columnHelper = createColumnHelper<ITableData>()

const BasicTable: React.FunctionComponent<IBasicTableProps> = ({
  tableHeader,
  tableData,
  handleClickEditAction,
  handleClickViewAction,
  handleDeleteAction,
  handleClickDownload,
  currentPage,
  itemsPerPage,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate()
  // const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const handleClickEdit = (infoSelected: ITableData) => {
    const rowData = infoSelected
    handleClickEditAction && handleClickEditAction(rowData)
  }

  const handleClickView = (infoSelected: ITableData) => {
    const rowData = infoSelected
    handleClickViewAction && handleClickViewAction(rowData)
  }

  const handleDelete = (infoSelected: ITableData) => {
    const rowData = infoSelected
    handleDeleteAction && handleDeleteAction(rowData)
  }

  const handleDownload = (infoSelected: ITableData) => {
    const rowData = infoSelected
    handleClickDownload && handleClickDownload(rowData)
  }

  const columns = tableHeader.map((tableHeaderItem) =>
    columnHelper.accessor(tableHeaderItem.name, {
      header: () => tableHeaderItem.display,
      cell: (info) => {
        const rowData = info.row.original

        return info.column.id === "action" ? (
          <div className="flex justify-center gap-2">
            <MdEditSquare
              onClick={() => {
                if (rowData) handleClickEdit(rowData)
              }}
              className="cursor-pointer hover:opacity-50 text-primary w-5 h-5"
              title="Edit"
            />
            <HiEye
              onClick={() => {
                if (rowData) handleClickView(rowData)
              }}
              className="cursor-pointer hover:opacity-50 w-5 h-5"
              title="View"
            />
            <HiOutlineTrash
              onClick={() => {
                if (rowData) handleDelete(rowData)
              }}
              className="text-error cursor-pointer hover:opacity-50 w-5 h-5"
              title="Delete"
            />
          </div>
        ) : info.column.id === "delete" ? (
          <div className="flex justify-center gap-2">
            <HiOutlineTrash
              onClick={() => {
                if (rowData) handleDelete(rowData)
              }}
              className="text-error cursor-pointer hover:opacity-50 w-5 h-5"
              title="Delete"
            />
          </div>
        ) : info.column.id === "Download" ? (
          // <div className="flex justify-center">
          <div className="ml-6">
            <FaDownload
              onClick={() => {
                if (rowData) handleDownload(rowData)
              }}
              className="cursor-pointer hover:opacity-50 text-primary w-5 h-5"
              title="Download"
            />
          </div>
        ) : info.column.id === "alarm" && info.getValue() ? (
          <div className="flex justify-center">
            <HiExclamation className="text-error w-5 h-5" />
          </div>
        ) : info.column.id === "bomItem" ? (
          <div className="flex justify-between items-center">
            <span className="mr-2">{info.row.original.BomItem}</span>
            <button
              className="flex items-center cursor-pointer text-primary"
              onClick={() => {
                const {
                  bomId,
                  bomName,
                  materialNumber,
                  materialName,
                  plantId,
                  plantName,
                  alternateBomId,
                  alternateBomName,
                  createdBy,
                } = info.row.original
                navigate(`/bomitems/configuration?id=${bomId}`, {
                  state: {
                    bomId,
                    bomName,
                    materialNumber,
                    materialName,
                    plantId,
                    plantName,
                    alternateBomId,
                    alternateBomName,
                    createdBy,
                  },
                })
              }}
            >
              <MdAddHome className="w-5 h-5" title="Edit" />
            </button>
          </div>
        ) : [
            "creationDate",
            "lastModifiedDate",
            "packingDate",
            "pickingDate",
            "dispatchDate",
            "orderDate",
            "actualDeliveryDate",
            "expectedDeliveryDate",
            "movementDate",
            "entryDate",
            "inEntyDate",
            "outEntyDate",
            "plannedStartDate",
            "plannedEndDate",
            "actualStartDate",
            "actualEndDate",
            "cycle_Start",
            "cycle_End",
          ].includes(info.column.id) ? (
          <span className="whitespace-nowrap">
            {formatDateTime(info.renderValue())}
          </span>
        ) : ["validFrom", "validTo"].includes(info.column.id) ? (
          <span className="whitespace-nowrap">
            {formatDate(info.renderValue())}
          </span>
        ) : (
          info.renderValue()
        )
      },
      footer: (info) => info.column.id,
    }),
  )

  const [data, setData] = useState(tableData)
  // const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    setData(tableData)
  }, [tableData])

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      sorting,
      // globalFilter, //specify our global filter here
    },
    // onGlobalFilterChange: setGlobalFilter, //if the filter changes, change the hook value
    // globalFilterFn: "includesString", //type of filtering
    // getFilteredRowModel: getFilteredRowModel(), //row model to filter the table
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  return (
    <div className="overflow-x-auto w-full">
      <div className="relative">
        {/* <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)} // Set the global filter state
        placeholder="Search Keyword"
        className="border border-primary p-2 rounded mb-4 min-w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
      /> */}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Keyword"
          className="border border-primary p-2 rounded mb-4 min-w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <FaSearch
          className="absolute left-3 top-6 transform -translate-y-1/2 text-primary"
          size={14} // Adjust the icon size as needed
        />
      </div>
      <table className="table">
        <thead className="bg-info">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="font-bold text-[#000000] whitespace-normal"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div
                        className={classNames(
                          "flex",
                          header.id === "action" ? "justify-center" : "",
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <HiArrowSmUp className="relative top-1" />,
                          desc: <HiArrowSmDown className="relative top-1" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => {
            const serialNumber = (currentPage - 1) * itemsPerPage + rowIndex + 1
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="whitespace-normal text-xs">
                    {cell.column.id === "slNo"
                      ? serialNumber
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BasicTable
