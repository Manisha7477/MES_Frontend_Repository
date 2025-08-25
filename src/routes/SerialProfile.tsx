import { SERIAL_PROFILE_HEADER_DATA, SERIAL_PROFILE_DATA } from "@/utils/data"
import BasicTable from "@/components/tables/BasicTable"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ModalComponent from "@/components/ModalComponent"
import { startCase } from "lodash"
import usePagination from "@/components/UsePagination" // Import the pagination hook
import Pagination from "@/components/Pagination" // Import the Pagination component
import nookies from "nookies"

interface ISerialProfileProps {}

const SerialProfile: React.FunctionComponent<ISerialProfileProps> = ({}) => {
  const navigate = useNavigate()
  const token = nookies.get(null).accessToken || ""
  const [modal, setModal] = useState(false)
  const [selectedViewUser, setSelectedViewUser] = useState<Record<
    string,
    any
  > | null>(null)
  const [listData, setListData] = useState([]) // aritra change
  const [itemsPerPage, setItemsPerPage] = useState(10) // Default to 10 items per page
  const [totalItems, setTotalItems] = useState(SERIAL_PROFILE_DATA.length) // Total items based on SERIAL_PROFILE_DATA length
  const [searchQuery, setSearchQuery] = useState("") //aritra change
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    currentData,
  } = usePagination(totalItems, itemsPerPage)

  const handleClickEditAction = (infoSelectedRow: Record<string, any>) => {
    navigate(`/serial-number-profile/configuration?id=${infoSelectedRow.idNo}`)
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

  const handleCloseModal = (modalStatus: boolean) => {
    setModal(modalStatus)
  }

  // const currentItems = currentData(SERIAL_PROFILE_DATA)

  // Filter data based on search query BEFORE pagination - aritra change
  const filteredData = listData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  // Apply pagination AFTER filtering - aritra change
  const currentItems = currentData(SERIAL_PROFILE_DATA).map((item, index) => ({
    ...item,
    serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
  }))

  

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`Serial Number Profile Details (${selectedViewUser?.idNo})`}
    >
      {renderSelectedItems()}
    </ModalComponent>
  )

  const renderSelectedItems = () => {
    return (
      <div className="overflow-x-auto w-full sm:max-w-sm mx-auto">
        <table className="table table-xs border border-base-300">
          <tbody>
            {Object.keys(selectedViewUser ?? {}).map((keyItem, index) => {
              // Fallback to 'NA' if selectedViewUser is null/undefined or keyItem value is falsy
              const value = selectedViewUser
                ? selectedViewUser[keyItem] ||
                  (keyItem === "ModifiedBy" ? "NA" : "NA") // Add specific fallback logic if needed
                : "NA"

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

  return (
    <div className="w-full">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          Serial Number Profile
        </div>
        <div className="w-full p-4 bg-neutral screen-height-media">
          <div className="w-full mb-2 text-right">
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/serial-number-profile/configuration")}
            >
              Add New
            </button>
          </div>
          <BasicTable
            tableHeader={SERIAL_PROFILE_HEADER_DATA}
            tableData={currentItems} // Use paginated data
            handleClickEditAction={handleClickEditAction}
            handleClickViewAction={handleClickViewAction}
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
            itemsPerPageOptions={[5, 10, 15, 20, 30, 40, 50]} // Example options
          />
        </div>
      </div>
      {modal && renderModal()}
    </div>
  )
}

export default SerialProfile
