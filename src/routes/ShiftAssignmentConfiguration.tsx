import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { SHIFT_ASSIGNMENT_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IShiftAssignmentConfigurationProps {
  user: IUser | null
}

const ShiftAssignmentConfiguration: React.FunctionComponent<
  IShiftAssignmentConfigurationProps
> = ({ user }) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")

  const [loading, setLoading] = useState(false)
  const [updateDataById, setUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(
    SHIFT_ASSIGNMENT_FORM_DATA,
  )
  const formValidationSchemaData = formValidationSchema(
    SHIFT_ASSIGNMENT_FORM_DATA,
  )

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/${updateId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.data) {
          setUpdateDataById(res.data.data)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (id) {
      fetchAPI(id)
    }
  }, [id])

  const updateData: { [key: string]: any } = updateDataById[0]

  const formatDateTypeUpdate =
    updateData !== undefined
      ? updateData.validFrom && updateData.validTo
        ? {
            validFrom: formatDateOnly(updateData.validFrom),
            validTo: formatDateOnly(updateData.validTo),
          }
        : {}
      : {}

  const initialDefaultData =
    Object.assign({}, updateData, formatDateTypeUpdate) ||
    initialDefaultValueData

  const handleCancelForm = () => {
    navigate("/shift-details")
  }
  const handleSubmitForm = async (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    setLoading(true)
    const headers = {
      Authorization: `Bearer ${user?.accessToken}`, // Pass the token here
    }

    id
      ? axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment`,
            {
              shiftAssignment: [
                Object.assign({}, answerValues, {
                  modifiedBy: user?.email,
                }),
              ],
            },
            { headers },
          )
          .then((_res) => {
            toast.success("Shift assignment updated successfully!")
            navigate("/shift-details")
          })
          .catch((error) => {
            toast.error("Error updating shift assignment: " + error.message)
          })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment`,
            {
              shiftAssignment: [
                Object.assign({}, answerValues, {
                  createdBy: user?.email,
                }),
              ],
            },
            { headers },
          )
          .then((_res) => {
            toast.success("New shift assigned successfully!")
            navigate("/shift-details")
          })
          .catch((error) => {
            toast.error(
              "Error creating new jshift assignment: " + error.message,
            )
          })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
  }

  return (
    <div className="w-full px-2">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          {id ? `Edit (${id})` : `Create`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
          {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={SHIFT_ASSIGNMENT_FORM_DATA}
            initialDefaultValueData={initialDefaultData}
            formValidationSchemaData={formValidationSchemaData}
            handleCancelForm={handleCancelForm}
            handleSubmitForm={handleSubmitForm}
          />
        </div>
      </div>
    </div>
  )
}

export default ShiftAssignmentConfiguration
