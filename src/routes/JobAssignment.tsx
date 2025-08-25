import {
  JOB_ASSIGNMENT_HEADER_DATA,
  JOB_ASSIGNMENT_FILTER_FORM_DATA,
} from "@/utils/data"
import BasicTable from "@/components/tables/BasicTable"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ModalComponent from "@/components/ModalComponent"
import { startCase } from "lodash"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { Form, Formik, FormikValues } from "formik"
import LevelTopCreationFormField from "@/components/forms/LevelTopCreationFormField"
import ModalDeleteComponent from "@/components/forms/ModalDeleteComponent"
import axios from "axios"
import Loading from "@/navigation/Loading"
import usePagination from "@/components/UsePagination" // Import the pagination hook
import Pagination from "@/components/Pagination" // Import the Pagination component
import nookies from "nookies"

interface IJobAssignmentProps {}

const JobAssignment: React.FunctionComponent<IJobAssignmentProps> = ({}) => {
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
    navigate(`/job-assignment/configuration?id=${infoSelectedRow.assignmentId}`)
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
      .get(`${process.env.NEXT_PUBLIC_API_URL}/Job_Assignment`, {
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
            (item: any) => !item.isDeleted,
          )
          setListData(filteredData)
          setTotalItems(filteredData.length) // Set the total items from the API response
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
      itemId={selectedViewUser?.assignmentId}
      itemName={selectedViewUser?.jobName}
      apiNameUrl="Job_Assignment"
    />
  )

  const initialDefaultValueData = initialFormikValues(
    JOB_ASSIGNMENT_FILTER_FORM_DATA,
  )
  const formValidationSchemaData = formValidationSchema(
    JOB_ASSIGNMENT_FILTER_FORM_DATA,
  )

  const handleSubmit = (answerValues: FormikValues, actions: FormikValues) => {
    // API call here on submit
    console.log(answerValues)
    setTimeout(() => {
      actions.setSubmitting(false)
    }, 1000)
  }

  const renderModal = () => (
    <ModalComponent
      showModal={modal}
      handleCloseModal={handleCloseModal}
      title={`Job Assignement Details (${selectedViewUser?.assignmentId})`}
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
                    "isDeleted",
                    "jobIdFk",
                    "factoryIdFk",
                    "plantIdFk",
                    "departmentIdFk",
                    "shiftIdFk",
                    "lineIdFk",
                    "assignmentId",
                  ].includes(keyItem),
              )
              .map((keyItem, index) => {
                // Fallback to 'NA' if selectedViewUser is null/undefined or keyItem value is falsy
                const value = selectedViewUser
                  ? selectedViewUser[keyItem] ||
                    (keyItem === "modifiedBy" ? "NA" : "NA") // Add specific fallback logic if needed
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

  // const currentItems = currentData(listData).map((item, index) => ({
  //   ...item,
  //   serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
  // }))

  return (
    <div className="w-full">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          Job Assignment Overview
        </div>
        <div className="w-full p-4 bg-neutral screen-height-media">
          <div className="w-full mb-2 text-right">
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => navigate("/job-assignment/configuration")}
            >
              CREATE NEW
            </button>
          </div>
          {/* <Formik
            initialValues={initialDefaultValueData}
            validationSchema={formValidationSchemaData}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions)
            }}
            validateOnMount
          >
            {({ isSubmitting }) => (
              <Form autoComplete="on">
                <div className="flex sm:flex-col lg:flex-row gap-4 w-full mb-2">
                  <div>
                    <LevelTopCreationFormField
                      formVariables={JOB_ASSIGNMENT_FILTER_FORM_DATA}
                    />
                  </div>
                  <div className="w-full sm:text-start self-end pb-3">
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary text-base-100"
                      disabled={isSubmitting}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik> */}
          {loading ? (
            <Loading />
          ) : (
            <>
              <BasicTable
                tableHeader={JOB_ASSIGNMENT_HEADER_DATA}
                tableData={currentItems} // Use paginated data
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
          )}
        </div>
      </div>
      {modal && renderModal()}
      {modalDelete && renderDeleteModal()}
    </div>
  )
}

export default JobAssignment
