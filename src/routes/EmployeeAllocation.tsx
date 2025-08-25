import { EMPLOYEE_ALLOCATION_HEADER_DATA } from "@/utils/data"
import BasicTable from "@/components/tables/BasicTable"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ModalComponent from "@/components/ModalComponent"
import { startCase } from "lodash"
import axios from "axios"
import ModalDeleteComponent from "@/components/forms/ModalDeleteComponent"
import Loading from "@/navigation/Loading"
import { formatDate, formatDateTime } from "@/utils/convert"
import usePagination from "@/components/UsePagination" // Import the pagination hook
import Pagination from "@/components/Pagination" // Import the Pagination component
import nookies from "nookies"

interface IEmployeeAllocationProps {}

const EmployeeAllocation: React.FunctionComponent<
  IEmployeeAllocationProps
> = ({}) => {
  const navigate = useNavigate()
  const token = nookies.get(null).accessToken || ""
  const [modal, setModal] = useState(false)
  const [selectedViewUser, setSelectedViewUser] = useState<Record<
    string,
    any
  > | null>(null)
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalDelete, setDeleteModal] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPageOptions = [5, 10, 15, 20, 30, 40, 50]
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]) // Default to 10 items per page

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    currentData,
  } = usePagination(totalItems, itemsPerPage)

  const handleClickEditAction = (infoSelectedRow: Record<string, any>) => {
    navigate(
      `/employee-allocation/configuration?id=${infoSelectedRow.AllocationId}`,
    )
  }

  // const handleClickViewAction = (infoSelectedRow: Record<string, any>) => {
  //   setSelectedViewUser(infoSelectedRow)
  //   setModal(true)
  // }
  const handleClickViewAction = (infoSelectedRow: Record<string, any>) => {
    const { serialNumber, ...rest } = infoSelectedRow // Exclude serialNumber
    setSelectedViewUser(rest) // Set the filtered object
    setModal(true)
  }

  const handleDeleteAction = (infoSelectedRow: Record<string, any>) => {
    setSelectedViewUser(infoSelectedRow)
    setDeleteModal(true)
  }

  const handleCloseModal = (modalStatus: boolean) => {
    setModal(modalStatus)
  }

  const handleCloseDeleteModal = (modalDeleteStatus: boolean) => {
    setDeleteModal(modalDeleteStatus)
  }

  const handleSuccessCloseDeleteModal = (modalDeleteStatus: boolean) => {
    setDeleteModal(modalDeleteStatus)
    fetchAPI()
  }

  const fetchAPI = () => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_Employee_Allocation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      })
      .then((res) => {
        if (res.data.data) {
          const filteredData = res.data.data.filter(
            (item: any) => !item.IsDeleted,
          )
          setListData(filteredData)
          setTotalItems(filteredData.length) // Assuming API returns total number of items
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchAPI()
  }, [currentPage, itemsPerPage]) // Re-fetch data when page or items per page changes

  const renderDeleteModal = () => (
    <ModalDeleteComponent
      showDeleteModal={modalDelete}
      handleCloseDeleteModal={handleCloseDeleteModal}
      handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
      itemId={selectedViewUser?.AllocationId}
      itemName={selectedViewUser?.UserName}
      apiNameUrl="MES_Employee_Allocation"
    />
  )

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`Employee Allocation Details (${selectedViewUser?.AllocationId})`}
    >
      {renderSelectedItems()}
    </ModalComponent>
  )

  const renderSelectedItems = () => {
    return (
      <div className="overflow-x-auto w-full sm:max-w-sm mx-auto">
        <table className="table table-xs border border-base-300">
          <tbody>
            {Object.keys(selectedViewUser ?? {})
              .filter(
                (keyItem) =>
                  ![
                    "IsDeleted",
                    "UserIdFk",
                    "FactoryIdFk",
                    "PlantIdFk",
                    "DepartmentIdFk",
                    "ShiftIdFk",
                    "JobIdFk",
                    "AllocationId",
                  ].includes(keyItem),
              )
              .map((keyItem, index) => {
                let value = selectedViewUser![keyItem]
                // Format 'ModifiedBy' field
                if (keyItem === "ModifiedBy") {
                  value = value || "NA"
                }
                // Format dates if applicable
                if (
                  keyItem === "CreationDate" ||
                  keyItem === "LastModifiedDate"
                ) {
                  value = formatDateTime(value)
                } else if (keyItem === "ValidFrom" || keyItem === "ValidTo") {
                  value = formatDate(value)
                } else {
                  value = value?.toString()
                }
                return (
                  <tr key={keyItem + index}>
                    <td className="font-semibold">{startCase(keyItem)}</td>
                    <td>
                      <span className="mr-2">:</span>
                      {value}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
  const currentItems = currentData(listData).map((item, index) => ({
    ...item,
    serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
  }))

  return (
    <div className="w-full">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          Employee Allocation Overview
        </div>
        <div className="w-full p-4 bg-neutral screen-height-media">
          <div className="w-full mb-2 text-right">
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/employee-allocation/configuration")}
            >
              CREATE NEW
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <BasicTable
                  tableHeader={EMPLOYEE_ALLOCATION_HEADER_DATA}
                  tableData={currentItems} // Use paginated data
                  handleClickEditAction={handleClickEditAction}
                  handleClickViewAction={handleClickViewAction}
                  handleDeleteAction={handleDeleteAction}
                  currentPage={currentPage} // Pass currentPage here
                  itemsPerPage={itemsPerPage} // Pass itemsPerPage here
                  searchQuery={""} setSearchQuery={function (query: string): void {
                    throw new Error("Function not implemented.")
                  } }              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                itemsPerPageOptions={itemsPerPageOptions}
              />
            </>
          )}
        </div>
      </div>
      {modal && renderModal()}
      {modalDelete && renderDeleteModal()}
    </div>
  )
}

export default EmployeeAllocation
