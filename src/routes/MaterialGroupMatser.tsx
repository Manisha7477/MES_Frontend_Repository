import { MATERIAL_GROUP_MASTER_HEADER_DATA } from "@/utils/data"
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
import nookies from "nookies"

interface IMaterialGroupMasterProps {}

const MaterialGroupMaster: React.FunctionComponent<
  IMaterialGroupMasterProps
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
  const [searchQuery, setSearchQuery] = useState("") //aritra change
  const itemsPerPageOptions = [5, 10, 15, 20, 30, 40, 50]
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]) // Default to 10 items per page

    // Filter data based on search query BEFORE pagination - aritra change
  const filteredData = listData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    currentData,
  } = usePagination(filteredData.length, itemsPerPage)

  const handleClickEditAction = (infoSelectedRow: Record<string, any>) => {
    navigate(
      `/material-group-master/configuration?id=${infoSelectedRow.materialGroupId}`,
    )
  }

  const handleClickViewAction = (infoSelectedRow: Record<string, any>) => {
    setSelectedViewUser(infoSelectedRow)
    setModal(true)
  }
  // ---------------------------
  const handleDeleteAction = (infoSelectedRow: Record<string, any>) => {
    setSelectedViewUser(infoSelectedRow)
    setDeleteModal(true)
  }

  const handleCloseModal = (modalStatus: boolean) => {
    setModal(modalStatus)
  }
  // --------------------
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
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_MaterialGroup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        if (res.data.data) {
          const filteredData = res.data.data.filter(
            (item: any) => !item.isDeleted,
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

  // Apply pagination AFTER filtering - aritra change
  const currentItems = currentData(filteredData).map((item, index) => ({
    ...item,
    serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
  }))


  const renderDeleteModal = () => (
    <ModalDeleteComponent
      showDeleteModal={modalDelete}
      handleCloseDeleteModal={handleCloseDeleteModal}
      handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
      itemId={selectedViewUser?.materialGroupId} //
      itemName={selectedViewUser?.materialGroupName} //
      apiNameUrl="MES_MaterialGroup"
    />
  )

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`Material Group Details (${selectedViewUser?.materialGroupId})`}
    >
      {renderSelectedItems()}
    </ModalComponent>
  )

  const renderSelectedItems = () => {
    return (
      <div className="overflow-x-auto w-full sm:max-w-sm mx-auto">
        <table className="table table-xs border border-base-300">
          <tbody>
            {" "}
            {Object.keys(selectedViewUser ?? {})
              .filter(
                (keyItem) =>
                  ![
                    "isDeleted",
                    "factoryIdFk",
                    "plantIdFk",
                    "receivingLocationFk",
                    "issueLocationFk",
                  ].includes(keyItem),
              )
              .map((keyItem, index) => {
                return (
                  <tr key={keyItem + index}>
                    <td className="font-semibold">{startCase(keyItem)}</td>
                    <td>
                      {keyItem == "creationDate" ||
                      keyItem == "lastModifiedDate"
                        ? formatDateTime(selectedViewUser![keyItem])
                        : keyItem == "validFrom" || keyItem == "validTo"
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

  // const currentItems = currentData(listData).map((item, index) => ({
  //   ...item,
  //   serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
  // }))

  return (
    // <div className="w-full">
    <div className="w-full">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          Material Group Master
        </div>
        <div className="w-full p-4 bg-neutral screen-height-media">
          <div className="w-full mb-2 text-right">
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/material-group-master/configuration")}
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
                  tableHeader={MATERIAL_GROUP_MASTER_HEADER_DATA}
                  tableData={currentItems}
                  handleClickEditAction={handleClickEditAction}
                  handleClickViewAction={handleClickViewAction}
                  handleDeleteAction={handleDeleteAction}
                  searchQuery={searchQuery} // aritra change
setSearchQuery={setSearchQuery} // aritra change
                  currentPage={currentPage} // Pass currentPage here
                  itemsPerPage={itemsPerPage} // Pass itemsPerPage here />
                />
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

export default MaterialGroupMaster
