// import { MATERIAL_MASTER_HEADER_DATA } from "@/utils/data"
// import BasicTable from "@/components/tables/BasicTable"
// import { useNavigate } from "react-router-dom"
// import { useEffect, useState, useCallback } from "react"
// import ModalComponent from "@/components/ModalComponent"
// import { startCase } from "lodash"
// import ModalDeleteComponent from "@/components/forms/ModalDeleteComponent"
// import axios from "axios"
// import Loading from "@/navigation/Loading"
// import { formatDate, formatDateTime } from "@/utils/convert"
// import usePagination from "@/components/UsePagination" // Correct import path
// import Pagination from "@/components/Pagination" // Correct import path
// import nookies from "nookies"

// interface IMaterialMasterProps {}

// const MaterialMaster: React.FunctionComponent<IMaterialMasterProps> = ({}) => {
//   const navigate = useNavigate()
//   const token = nookies.get(null).accessToken || ""
//   const [modal, setModal] = useState(false)
//   const [selectedViewUser, setSelectedViewUser] = useState<Record<
//     string,
//     any
//   > | null>(null)
//   const [listData, setListData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [modalDelete, setDeleteModal] = useState(false)
//   const [totalItems, setTotalItems] = useState(0)

//   const itemsPerPageOptions = [5, 10, 15, 20, 30, 40, 50]
//   const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]) // Default to 10 items per page

//   const {
//     currentPage,
//     totalPages,
//     goToNextPage,
//     goToPreviousPage,
//     goToPage,
//     currentData,
//   } = usePagination(totalItems, itemsPerPage)

//   const handleClickEditAction = (infoSelectedRow: Record<string, any>) => {
//     navigate(`/material-master/configuration?id=${infoSelectedRow.MaterialId}`)
//   }

//   // const handleClickViewAction = (infoSelectedRow: Record<string, any>) => {
//   //   setSelectedViewUser(infoSelectedRow)
//   //   setModal(true)
//   // }
//   const handleClickViewAction = (infoSelectedRow: Record<string, any>) => {
//     const { serialNumber, ...rest } = infoSelectedRow // Exclude serialNumber
//     setSelectedViewUser(rest) // Set the filtered object
//     setModal(true)
//   }
//   // ---------------------------
//   const handleDeleteAction = (infoSelectedRow: Record<string, any>) => {
//     setSelectedViewUser(infoSelectedRow)

//     setDeleteModal(true)
//   }

//   const handleCloseModal = (modalStatus: boolean) => {
//     setModal(modalStatus)
//   }
//   // --------------------
//   const handleCloseDeleteModal = (modalDeleteStatus: boolean) => {
//     setDeleteModal(modalDeleteStatus)
//   }
//   // --------------------------
//   const handleSuccessCloseDeleteModal = (modalDeleteStatus: boolean) => {
//     setDeleteModal(modalDeleteStatus)
//     fetchAPI()
//   }

//   const fetchAPI = useCallback(() => {
//     setLoading(true)
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster`,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log("API Response:", res.data) // Debugging line to inspect the data
//         if (res.data.data) {
//           const filteredData = res.data.data.filter(
//             (item: any) => !item.IsDeleted,
//           ) // Filter out deleted items
//           // console.log("filtered data is ", filteredData)
//           setListData(filteredData)
//           setTotalItems(filteredData.length) // Set totalItems based on filtered data
//         }
//       })
//       .catch((error) => console.log(error))
//       .finally(() => {
//         setLoading(false)
//       })
//   }, [])

//   useEffect(() => {
//     fetchAPI()
//   }, [fetchAPI, currentPage, itemsPerPage])

//   const renderDeleteModal = () => (
//     <ModalDeleteComponent
//       showDeleteModal={modalDelete}
//       handleCloseDeleteModal={handleCloseDeleteModal}
//       handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
//       itemId={selectedViewUser?.MaterialId} //
//       itemName={selectedViewUser?.MaterialName} //
//       apiNameUrl="MaterialMaster"
//     />
//   )

//   const renderModal = () => (
//     <ModalComponent
//       showModal={modal}
//       handleCloseModal={handleCloseModal}
//       title={`Material Master Details (${selectedViewUser?.MaterialId})`}
//     >
//       {renderSelectedItems()}
//     </ModalComponent>
//   )
//   const renderSelectedItems = () => {
//     return (
//       <div className="overflow-x-auto w-full sm:max-w-sm mx-auto">
//         <table className="table table-xs border border-base-300">
//           <tbody>
//             {" "}
//             {Object.keys(selectedViewUser ?? {})
//               .filter(
//                 (keyItem) =>
//                   ![
//                     "IsDeleted",
//                     "UserIdFk",
//                     "FactoryIdFk",
//                     "PlantIdFk",
//                     "DepartmentIdFk",
//                     "ShiftIdFk",
//                     "JobIdFk",
//                     "LocationIdFk",
//                   ].includes(keyItem),
//               )
//               .map((keyItem, index) => {
//                 let value = selectedViewUser![keyItem]
//                 // Format 'ModifiedBy' field
//                 if (keyItem === "ModifiedBy") {
//                   value = value || "NA"
//                 }
//                 // Format dates if applicable
//                 if (
//                   keyItem === "CreationDate" ||
//                   keyItem === "LastModifiedDate"
//                 ) {
//                   value = formatDateTime(value)
//                 } else if (keyItem === "ValidFrom" || keyItem === "ValidTo") {
//                   value = formatDate(value)
//                 } else {
//                   value = value?.toString()
//                 }
//                 return (
//                   <tr key={keyItem + index}>
//                     <td className="font-semibold">{startCase(keyItem)}</td>
//                     <td>
//                       <span className="mr-2">:</span>
//                       {value}
//                     </td>
//                   </tr>
//                 )
//               })}
//           </tbody>
//         </table>
//       </div>
//     )
//   }
//   const currentItems = currentData(listData).map((item, index) => ({
//     ...item,
//     serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
//   }))

//   return (
//     <div className="w-full">
//       <div className="border rounded border-base-300">
//         <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
//           Material Master
//         </div>
//         <div className="w-full p-4 bg-neutral screen-height-media">
//           <div className="w-full mb-2 text-right">
//             <button
//               className="btn btn-primary btn-outline btn-sm"
//               onClick={() => navigate("/material-master/configuration")}
//             >
//               Add New
//             </button>
//           </div>

//           {loading ? (
//             <Loading />
//           ) : (
//             currentItems && (
//               <>
//                 <BasicTable
//                   tableHeader={MATERIAL_MASTER_HEADER_DATA}
//                   tableData={currentItems} // Use currentItems after filtering and pagination
//                   handleClickEditAction={handleClickEditAction}
//                   handleClickViewAction={handleClickViewAction}
//                   handleDeleteAction={handleDeleteAction}
//                   currentPage={currentPage} // Pass currentPage here
//                   itemsPerPage={itemsPerPage} // Pass itemsPerPage here
//                 />
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   goToPage={goToPage}
//                   goToNextPage={goToNextPage}
//                   goToPreviousPage={goToPreviousPage}
//                   itemsPerPage={itemsPerPage}
//                   setItemsPerPage={setItemsPerPage}
//                   itemsPerPageOptions={itemsPerPageOptions}
//                 />
//               </>
//             )
//           )}
//         </div>
//       </div>
//       {modal && renderModal()}
//       {modalDelete && renderDeleteModal()}
//     </div>
//   )
// }

// export default MaterialMaster





import { MATERIAL_MASTER_HEADER_DATA } from "@/utils/data"
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

interface IMaterialMasterProps {}

const MaterialMaster: React.FunctionComponent<IMaterialMasterProps> = ({}) => {
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
    navigate(`/material-master/configuration?id=${infoSelectedRow.materialId}`)
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
  // --------------------------
  const handleSuccessCloseDeleteModal = (modalDeleteStatus: boolean) => {
    setDeleteModal(modalDeleteStatus)
    fetchAPI()
  }

  const fetchAPI = useCallback(() => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("API Response:", res.data) // Debugging line to inspect the data
        if (res.data.data) {
          const filteredData = res.data.data.filter(
            (item: any) => !item.isDeleted,
          ) // Filter out deleted items
          // console.log("filtered data is ", filteredData)
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


  const renderDeleteModal = () => (
    <ModalDeleteComponent
      showDeleteModal={modalDelete}
      handleCloseDeleteModal={handleCloseDeleteModal}
      handleSuccessCloseDeleteModal={handleSuccessCloseDeleteModal}
      itemId={selectedViewUser?.materialId} //
      itemName={selectedViewUser?.materialName} //
      apiNameUrl="MaterialMaster"
    />
  )

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`Material Master Details (${selectedViewUser?.materialId})`}
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
                    "userIdFk",
                    "factoryIdFk",
                    "plantIdFk",
                    "departmentIdFk",
                    "shiftIdFk",
                    "jobIdFk",
                    "locationIdFk",
                  ].includes(keyItem),
              )
              .map((keyItem, index) => {
                let value = selectedViewUser![keyItem]
                // Format 'ModifiedBy' field
                if (keyItem === "modifiedBy") {
                  value = value || "NA"
                }
                // Format dates if applicable
                if (
                  keyItem === "creationDate" ||
                  keyItem === "lastModifiedDate"
                ) {
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
    <div className="w-full">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          Material Master
        </div>
        <div className="w-full p-4 bg-neutral screen-height-media">
          <div className="w-full mb-2 text-right">
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/material-master/configuration")}
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
                  tableHeader={MATERIAL_MASTER_HEADER_DATA}
                  tableData={currentItems} // Use currentItems after filtering and pagination
                  handleClickEditAction={handleClickEditAction}
                  handleClickViewAction={handleClickViewAction}
                  handleDeleteAction={handleDeleteAction}
                  searchQuery={searchQuery} // aritra change
setSearchQuery={setSearchQuery} // aritra change
                  currentPage={currentPage} // Pass currentPage here
                  itemsPerPage={itemsPerPage} // Pass itemsPerPage here
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

export default MaterialMaster
