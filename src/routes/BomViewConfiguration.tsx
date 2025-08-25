import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import BasicTable from "@/components/tables/BasicTable"
import { ITableHeader } from "./BomData"
import usePagination from "@/components/UsePagination"
import { IoClose } from "react-icons/io5"
import nookies from "nookies"

const BOM_LEVEL_ITEM_HEADER: ITableHeader[] = [
  { name: "itemCategoryName", display: "Item Category" },
  { name: "materialName", display: "Material Name" },
  { name: "quantity", display: "Quantity" },
  { name: "uOM", display: "Unit of Measure (UOM)" },
]

const BomViewConfiguration = () => {
  const navigate = useNavigate()
  const [listData, setListData] = useState([])
  const [searchQuery, setSearchQuery] = useState("") //aritra change
  const itemsPerPageOptions = [5, 10, 15, 20, 30, 40, 50]
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]) // Default 10 items/page
  const { id } = useParams<{ id: string }>()
  const [bomData, setBomData] = useState<any>(null)
  const [bomItems, setBomItems] = useState<any[]>([]) // Subarray storage for GetBomItem
  const [totalItems, setTotalItems] = useState(0)

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    currentData,
  } = usePagination(totalItems, itemsPerPage)

  const fetchBomData = async () => {
    const token = nookies.get(null).accessToken || "" // Retrieve token from cookies

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomData_BomId`,
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const result = response.data
      setBomData(result.Data[0])
      setBomItems(result.Data[0]?.getBomItem || [])
      setTotalItems(result.Data[0]?.getBomItem.length || 0) // Update totalItems
    } catch (error) {
      console.error("Error fetching BOM data:", error)
    }
  }

  useEffect(() => {
    fetchBomData()
  }, [currentPage, itemsPerPage])

  // Filter data based on search query BEFORE pagination - aritra change
  const filteredData = listData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  // Apply pagination AFTER filtering - aritra change
  const currentItems = currentData(filteredData).map((item, index) => ({
    ...item,
    serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
  }))


  return (
    <div className="mt-20 px-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">BOM Configuration</h1>
        <IoClose
          size={20}
          className="close-icon transition-all transform hover:scale-110 hover:text-primary hover:shadow-lg hover:cursor-pointer"
          onClick={() => navigate("/bom")}
        />
      </div>

      {/* BOM Details */}
      {bomData ? (
        <div className="mt-6 bg-white p-6 shadow-md rounded-lg hover:shadow-xl hover:border-2 hover:border-primary hover:bg-gray-50 hover:cursor-pointer">
          <h3 className="text-lg font-bold mb-6 text-blue-600">BOM Details</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* <div className="flex flex-row gap-6"> */}
            <div className="space-y-3">
              <p>
                <strong>Document Number:</strong> {bomData.bomId}
              </p>
              <p>
                <strong>Name:</strong> {bomData.bomName}
              </p>
              <p>
                <strong>Plant Name:</strong> {bomData.plantName}
              </p>
              <p>
                <strong>Category:</strong> {bomData.bomCategoryName}
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <strong>Created By:</strong> {bomData.createdBy}
              </p>
              <p>
                <strong>Created Date:</strong>{" "}
                {new Date(bomData.createdDate).toLocaleString()}
              </p>
              <p>
                <strong>Valid From:</strong>{" "}
                {new Date(bomData.validFrom).toLocaleDateString()}
              </p>
              <p>
                <strong>Valid To:</strong>{" "}
                {new Date(bomData.validTo).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}

      {/* BOM Items */}
      {bomItems.length > 0 && (
        <div className="mt-6 bg-white p-6 shadow-md rounded-lg hover:shadow-xl hover:border-2 hover:border-primary hover:bg-gray-50 hover:cursor-pointer">
          <h3 className="text-lg font-bold mb-4 text-blue-600">BOM Items</h3>
          {bomItems.map((item, index) => (
            <div
              key={index}
              className={`mb-6 p-4 rounded-md shadow-sm ${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
              <div className="bg-white p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4 text-blue-600">
                  Material Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p>
                      <strong>Material Name:</strong> {item.materialName}
                    </p>
                    <p>
                      <strong>Plant Name:</strong> {item.plantName}
                    </p>
                    <p>
                      <strong>Base Quantity:</strong> {item.baseQuantity}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p>
                      <strong>valid From:</strong>{" "}
                      {new Date(item.ValidFrom).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>valid To:</strong>{" "}
                      {new Date(item.ValidTo).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  {item.getBomLevelItem && (
                    <BasicTable
                      tableHeader={BOM_LEVEL_ITEM_HEADER}
                      searchQuery={searchQuery} // aritra change
                      setSearchQuery={setSearchQuery} // aritra change
                      tableData={item.GetBomLevelItem}
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BomViewConfiguration
