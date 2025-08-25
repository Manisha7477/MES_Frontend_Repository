import { WAREHOUSE_MASTER_HEADER_DATA } from "@/utils/data"
import BasicTable from "@/components/tables/BasicTable"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import ModalComponent from "@/components/ModalComponent"
import { startCase } from "lodash"
import ModalDeleteComponent from "@/components/forms/ModalDeleteComponent"
import axios from "axios"
import Loading from "@/navigation/Loading"
import { formatDate, formatDateTime } from "@/utils/convert"
import usePagination from "@/components/UsePagination" // Correct import path
import Pagination from "@/components/Pagination" // Correct import path

interface IWarehouseMasterProps {}

const WarehouseMaster: React.FunctionComponent<
  IWarehouseMasterProps
> = ({}) => {
  const navigate = useNavigate()
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
      `/warehouse-master/configuration?id=${infoSelectedRow.WarehouseId}`,
    )
  }

  const handleClickViewAction = (infoSelectedRow: Record<string, any>) => {
    setSelectedViewUser(infoSelectedRow)
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

  const fetchAPI = useCallback(() => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MESWarehouse_Master`)
      .then((res) => {
        if (res.data.data) {
          const filteredData = res.data.data.filter(
            (item: any) => !item.IsDeleted,
          ) // Filter out deleted items
          setListData(filteredData)
          setTotalItems(filteredData.length) // Set totalItems based on filtered data
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchAPI()
  }, [fetchAPI, currentPage, itemsPerPage])

  const renderDeleteModal = () => (
    <ModalDeleteComponent
      showDeleteModal={modalDelete}
      handleCloseDeleteModal={handleCloseDeleteModal}
      handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
      itemId={selectedViewUser?.WarehouseId}
      itemName={selectedViewUser?.WarehouseName}
      apiNameUrl="MESWarehouse_Master"
    />
  )

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`Warehouse Master Details (${selectedViewUser?.WarehouseId})`}
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
                    "SupervisorIdFk",
                    "FactoryIdFk",
                    "PlantIdFk",
                    "DummyColumn2",
                    "DummyColumn1",
                    "ShiftIdFk",
                    "JobIdFk",
                    "WarehouseId",
                  ].includes(keyItem),
              )
              .map((keyItem, index) => {
                return (
                  <tr key={keyItem + index}>
                    <td className="font-semibold">{startCase(keyItem)}</td>
                    <td>
                      <span className="mr-2">:</span>
                      {keyItem == "CreationDate" ||
                      keyItem == "LastModifiedDate"
                        ? formatDateTime(selectedViewUser![keyItem])
                        : keyItem == "ValidFrom" || keyItem == "ValidTo"
                        ? formatDate(selectedViewUser![keyItem])
                        : selectedViewUser![keyItem].toString()}
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
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1">
          Warehouse Master
        </div>
        <div className="w-full px-10 bg-neutral screen-height-media mt-10">
          <div className="w-full mb-2 text-right flex justify-between">
            {/* <span className="self-center font-bold text-sm">
              Warehouse Master Overview
            </span> */}
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/warehouse-master/configuration")}
            >
              Add New
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            currentItems && (
              <>
                <BasicTable
                    tableHeader={WAREHOUSE_MASTER_HEADER_DATA}
                    tableData={currentItems} // Use currentItems after filtering and pagination
                    handleClickEditAction={handleClickEditAction}
                    handleClickViewAction={handleClickViewAction}
                    handleDeleteAction={handleDeleteAction}
                    currentPage={currentPage} // Pass currentPage here
                    itemsPerPage={itemsPerPage} // Pass itemsPerPage here />
                    searchQuery={""} setSearchQuery={function (query: string): void {
                      throw new Error("Function not implemented.")
                    } }                />
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
            )
          )}
        </div>
      </div>
      {modal && renderModal()}
      {modalDelete && renderDeleteModal()}
    </div>
  )
}

export default WarehouseMaster
