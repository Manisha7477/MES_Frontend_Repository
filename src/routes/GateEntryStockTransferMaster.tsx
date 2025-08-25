import { GATE_ENTRY_STOCK_TRANSFER_MASTER_HEADER_DATA } from "@/utils/data"
import BasicTable from "@/components/tables/BasicTable"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ModalComponent from "@/components/ModalComponent"
import { startCase } from "lodash"
import ModalDeleteComponent from "@/components/forms/ModalDeleteComponent"
import axios from "axios"
import Loading from "@/navigation/Loading"
import { formatDate, formatDateTime } from "@/utils/convert"
import usePagination from "@/components/UsePagination" // Correct import path
import Pagination from "@/components/Pagination" // Correct import path

interface IGateEntryStockMasterProps {}

const GateEntryStockTransferMaster: React.FunctionComponent<IGateEntryStockMasterProps> = ({}) => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [selectedViewUser, setSelectedViewUser] = useState<Record<string, any> | null>(null)
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
    navigate(`/gate-stock-transfer/configuration?id=${infoSelectedRow.GateStkTransEntryId}`)
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

  const fetchAPI = () => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_Gate_Entry_Stock_Transfer`, {
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
          setTotalItems(filteredData.length) // Ensure you set the totalItems correctly from the API response
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
      itemId={selectedViewUser?.GateStkTransEntryId}
      itemName={selectedViewUser?.GateStkEntryNumber}
      apiNameUrl="MES_Gate_Entry_Stock_Transfer"
    />
  )

  const handleCloseDeleteModal = (modalDeleteStatus: boolean) => {
    setDeleteModal(modalDeleteStatus)
  }

  const handleSuccessCloseDeleteModal = (modalDeleteStatus: boolean) => {
    setDeleteModal(modalDeleteStatus)
    fetchAPI()
  }

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`Gate Entry Stock Details (${selectedViewUser?.GateStkTransEntryId})`}
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
                    "SrcPlantIdFk",
                    "SrcStoragLocIdFk",
                    "DstPlantIdFk",
                    "DstStoragLocIdFk",
                    "MatrlMstIdFk",
                    "JobIdFk",
                    "MatrlMstName"
                  ].includes(keyItem),
              )
              .map((keyItem, index) => {
                return (
                  <tr key={keyItem + index}>
                    <td className="font-semibold">{startCase(keyItem)}</td>
                    <td>
                      <span className="mr-2">:</span>
                      {keyItem == "CreationDate" || keyItem == "LastModifiedDate"
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
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          Gate Entry Stock Details
        </div>
        <div className="w-full p-4 bg-neutral screen-height-media">
          <div className="w-full mb-2 text-right flex justify-between">
            {/* <span className="self-center font-bold text-sm">
              Gate-Entry-Stock (Overview)
            </span> */}
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/gate-stock-transfer/configuration")}
            >
              Add New
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <BasicTable
                  tableHeader={GATE_ENTRY_STOCK_TRANSFER_MASTER_HEADER_DATA}
                  tableData={currentItems} // Use paginated data
                  handleClickEditAction={handleClickEditAction}
                  handleClickViewAction={handleClickViewAction}
                  handleDeleteAction={handleDeleteAction} currentPage={currentPage} // Pass currentPage here
                  itemsPerPage={itemsPerPage} // Pass itemsPerPage here />
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

export default GateEntryStockTransferMaster
