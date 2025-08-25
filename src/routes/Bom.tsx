import { BOM_HEADER_DATA } from "@/utils/data"
import BasicTable from "@/components/tables/BasicTable"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ModalComponent from "@/components/ModalComponent"
import { startCase } from "lodash"
import ModalDeleteComponent from "@/components/forms/ModalDeleteComponent"
import axios from "axios"
import Loading from "@/navigation/Loading"
import { formatDate, formatDateTime } from "@/utils/convert"
import usePagination from "@/components/UsePagination"
import Pagination from "@/components/Pagination"
import nookies from "nookies"

interface IBomProps {}
const Bom: React.FunctionComponent<IBomProps> = ({}) => {
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

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    currentData,
  } = usePagination(totalItems, itemsPerPage)

  const handleClickEditAction = (infoSelectedRow: Record<string, any>) => {
    navigate(`/bom/configuration?id=${infoSelectedRow.bomId}`)
  }
  // const renderDeleteModal = () => (
  //   <ModalDeleteComponent
  //     showDeleteModal={modalDelete}
  //     handleCloseDeleteModal={handleCloseDeleteModal}
  //     handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
  //     itemId={selectedViewUser?.MaterialId} //
  //     itemName={selectedViewUser?.MaterialName} //
  //     apiNameUrl="MaterialMaster"
  //   />
  // )

  const handleClickViewAction = (infoSelectedRow: Record<string, any>) => {
    // onClick={()=>navigate(`/bomDetails/${info.row.original.BomId}`)}
    // setSelectedViewUser(infoSelectedRow)
    // setModal(true)
    // const { BomId, MaterialNumber, PlantId, AlternateBom, CreatedBy } = infoSelectedRow.row.original;
    console.log("row=" + infoSelectedRow.bomId)
    navigate(`/bomDetails/${infoSelectedRow.bomId}`)
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

  const fetchAPI = () => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_BOM`, {
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
  }, [currentPage, itemsPerPage])

  // Filter data based on search query BEFORE pagination - aritra change7
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

  const renderDeleteModal = () => {
    // console.log("Selected view coming is ",selectedViewUser)
    return (
      <ModalDeleteComponent
        showDeleteModal={modalDelete}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
        itemId={selectedViewUser?.bomId}
        itemName={selectedViewUser?.bomName}
        apiNameUrl="MES_BOM/DeleteBomData"
      />
    )
  }

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`BOM Details (${selectedViewUser?.bomId})`}
    >
      {renderSelectedItems()}
    </ModalComponent>
  )

  const renderSelectedItems = () => {
    return (
      <div className="overflow-x-auto w-full sm:max-w-sm mx-auto">
        <table className=" table table-xs border border-base-300">
          <tbody>
            {" "}
            {Object.keys(selectedViewUser ?? {})
              .filter(
                (keyItem) =>
                  !["isDeleted", "factoryIdFk", "plantIdFk"].includes(keyItem),
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
    <div className="w-[80vw] mt-16">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1">
          Bill Of Materials
        </div>
        <div className="w-full p-4 bg-neutral screen-height-media">
          <div className="w-full mb-2 text-right ">
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/bom/configuration")}
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
                  tableHeader={BOM_HEADER_DATA}
                  tableData={currentItems}
                  handleClickEditAction={handleClickEditAction}
                  handleClickViewAction={handleClickViewAction}
                  searchQuery={searchQuery} // aritra change
                  setSearchQuery={setSearchQuery} // aritra change
                  handleDeleteAction={handleDeleteAction}
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

export default Bom
