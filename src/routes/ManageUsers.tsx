import ManageUsersFilterForm from "@/components/forms/ManageUsersFilterForm"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import {
  MANAGE_USERS_FILTER_FORM_DATA,
  MANAGE_USERS_HEADER_DATA,
  USER_STRUCTURE_HEADER_DATA,
} from "@/utils/data"
import BasicTable from "@/components/tables/BasicTable"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import ModalComponent from "@/components/ModalComponent"
import { startCase } from "lodash"
import ModalDeleteComponent from "@/components/forms/ModalDeleteComponent"
import axios from "axios"
import { formatDate, formatDateTime } from "@/utils/convert"
import Loading from "@/navigation/Loading"
import usePagination from "@/components/UsePagination" // Correct import path
import Pagination from "@/components/Pagination" // Correct import path
import nookies from "nookies"
import { HiOutlineCog } from "react-icons/hi"
import TableHeaderConfig from "@/components/TableHeaderConfig"
import type { ITableHeader } from "./BomData"

interface IManageUsersProps {}

const ManageUsers: React.FunctionComponent<IManageUsersProps> = ({}) => {
  const token = nookies.get(null).accessToken || ""
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [selectedViewUser, setSelectedViewUser] = useState<Record<
    string,
    any
  > | null>(null)

  const initialDefaultValueData = initialFormikValues(
    MANAGE_USERS_FILTER_FORM_DATA,
  )
  const formValidationSchemaData = formValidationSchema(
    MANAGE_USERS_FILTER_FORM_DATA,
  )
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalDelete, setDeleteModal] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [globalFilter, setGlobalFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("") //aritra change
  const itemsPerPageOptions = [5, 10, 15, 20, 30, 40, 50]
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]) // Default to 10 items per page
  const [tableHeaderFilter, setTableHeaderFilter] = useState(
    USER_STRUCTURE_HEADER_DATA,
  )
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    currentData,
  } = usePagination(totalItems, itemsPerPage)

  // const handleClickEditAction = (infoSelectedRow: Record<string, any>) => {
  //   console.log(infoSelectedRow)
  //   navigate(`/manage-users/user-creation?id=${infoSelectedRow.UserId}`)
  // }

  const handleClickEditAction = (infoSelectedRow: Record<string, any>) => {
  console.log(infoSelectedRow)
  navigate(`/manage-users/user-creation?id=${infoSelectedRow.userId}`) // ✅ camelCase
}

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

  // ------------------

  const handleVisibleStatus = (itemsUpdatedData: ITableHeader[]) => {
    const filterTableHeader = itemsUpdatedData.filter((item) => item.visible)
    setTableHeaderFilter(filterTableHeader)
  }

  const filterTableHeader = tableHeaderFilter?.filter((item) => item.visible)
  // const fetchAPI = useCallback(() => {
  //   setLoading(true)
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/V2.0/User/MES_UserDetails`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params: {
  //         page: currentPage,
  //         limit: itemsPerPage,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.data) {
  //         const filteredData = res.data.data.filter(
  //           (item: any) => !item.IsDeleted,
  //         )
  //         setListData(filteredData)
  //         setTotalItems(filteredData.length) // Set totalItems correctly after filtering
  //       }
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [currentPage, itemsPerPage])

  const fetchAPI = useCallback(() => {
  setLoading(true)
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/User/MES_UserDetails`, {
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
          (item: any) => !item.isDeleted, // ✅ camelCase
        )
        setListData(filteredData)
        setTotalItems(filteredData.length)
      }
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setLoading(false)
    })
}, [currentPage, itemsPerPage])


  useEffect(() => {
    fetchAPI()
  }, [fetchAPI])

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

  // const renderDeleteModal = () => (
  //   <ModalDeleteComponent
  //     showDeleteModal={modalDelete}
  //     handleCloseDeleteModal={handleCloseDeleteModal}
  //     handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
  //     itemId={selectedViewUser?.UserId}
  //     itemName={selectedViewUser?.UserName}
  //     apiNameUrl="MES_UserDetails"
  //   />
  // )

  const renderDeleteModal = () => (
  <ModalDeleteComponent
    showDeleteModal={modalDelete}
    handleCloseDeleteModal={handleCloseDeleteModal}
    handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
    itemId={selectedViewUser?.userId} // ✅ camelCase
    itemName={selectedViewUser?.userName} // ✅ camelCase
    apiNameUrl="MES_UserDetails"
  />
)

  // const renderModal = () => (
  //   <ModalComponent
  //     showModal={modal}
  //     handleCloseModal={handleCloseModal}
  //     title={`User Details(${selectedViewUser?.FullName})`}
  //   >
  //     {renderSelectedItems()}
  //     <TableHeaderConfig
  //       tableHeaderData={USER_STRUCTURE_HEADER_DATA}
  //       handleVisibleStatus={handleVisibleStatus}
  //     />
  //   </ModalComponent>
  // )

  const renderModal = () => (
  <ModalComponent
    showModal={modal}
    handleCloseModal={handleCloseModal}
    title={`User Details (${selectedViewUser?.fullName ?? selectedViewUser?.userName})`} 
    // ✅ fullName might not exist, so fallback to userName
  >
    {renderSelectedItems()}
    <TableHeaderConfig
      tableHeaderData={USER_STRUCTURE_HEADER_DATA}
      handleVisibleStatus={handleVisibleStatus}
    />
  </ModalComponent>
)


  const renderSelectedItems = () => {
    return (
      <div className="overflow-x-auto w-full sm:max-w-sm mx-auto">
        <table className="table table-xs border border-base-300">
          <tbody>
            {Object.keys(selectedViewUser ?? {})
              // .filter(
              //   (keyItem) =>
              //     ![
              //       "IsDeleted",
              //       "UserId",
              //       "Password",
              //       "RoleId",
              //       "ManagerId",
              //       "SupervisorId",
              //       "SerialNumber",
              //     ].includes(keyItem),
              // )
              // .map((keyItem, index) => {
              //   let value = selectedViewUser![keyItem]
              //   // Format 'ModifiedBy' field
              //   if (keyItem === "ModifiedBy") {
              //     value = value || "NA"
              //   }
              //   // Format dates if applicable
              //   if (
              //     keyItem === "CreationDate" ||
              //     keyItem === "LastModifiedDate"
              //   ) {
              //     value = formatDateTime(value)
              //   } else if (keyItem === "ValidFrom" || keyItem === "ValidTo") {
              //     value = formatDate(value)
              //   } else {
              //     value = value?.toString()
              //   }

              //   return (
              //     <tr key={keyItem + index}>
              //       <td className="font-semibold">{startCase(keyItem)}</td>
              //       <td>
              //         <span className="mr-2">:</span>
              //         {value}
              //       </td>
              //     </tr>
              //   )
              // })

              .filter(
  (keyItem) =>
    ![
      "isDeleted", "userId", "password", "roleId",
      "managerId", "supervisorId", "serialNumber",
    ].includes(keyItem),
)
.map((keyItem, index) => {
  let value = selectedViewUser![keyItem]

  if (keyItem === "modifiedBy") {
    value = value || "NA"
  }

  if (keyItem === "creationDate" || keyItem === "lastModifiedDate") {
    value = formatDateTime(value)
  } else if (keyItem === "validFrom" || keyItem === "validTo") {
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
})

              }
          </tbody>
        </table>
      </div>
    )
  }

  // const currentItems = currentData(listData).map((item, index) => ({
  //   ...item,
  //   serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
  // }))

  const handleTableConfig = () => {
    setModal(true)
  }

  return (
    <div className="sm:ml-10 xl:ml-0 min-w-[80vw]">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-20">
          Manage Users
        </div>

        <div className="overflow-auto h-50">
          <div className="p-4 bg-neutral screen-height-media w-full">
            <button
              className="sm:btn btn-primary btn-outline btn-sm sm:float-right mb-2"
              onClick={() => navigate("/manage-users/user-creation")}
            >
              Create New User
            </button>
            {loading ? (
              <Loading />
            ) : (
              currentItems && (
                <>
                  <BasicTable
                    tableHeader={MANAGE_USERS_HEADER_DATA}
                    tableData={currentItems} // Use currentItems after filtering and pagination
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
    </div>
  )
}

export default ManageUsers
