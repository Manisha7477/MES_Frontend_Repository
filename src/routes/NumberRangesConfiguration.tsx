import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { NUMBER_RANGES_FORM_DATA } from "@/utils/data"
import { formatDateOnly } from "@/utils/convert"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface INumberRangesConfigurationProps {
  user: IUser | null
}

const NumberRangesConfiguration: React.FunctionComponent<
  INumberRangesConfigurationProps
> = ({ user }) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(NUMBER_RANGES_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(NUMBER_RANGES_FORM_DATA)

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MESNumberRanges/${updateId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.data) {
          seUpdateDataById(res.data.data)
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
    navigate("/number-ranges")
  }
  const handleSubmitForm = (
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
            `${process.env.NEXT_PUBLIC_API_URL}/MESNumberRanges`,
            {
              mesNumberRanges: [
                Object.assign({}, answerValues, {
                  modifiedBy: user?.email,
                }),
              ],
            },
            { headers },
          )
          .then((_res) => {
            toast.success("Number ranges updated successfully!")
            navigate("/number-ranges")
          })
          .catch((error) => {
            toast.error("Error updating number ranges: " + error.message)
          })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/MESNumberRanges`,
            {
              mesNumberRanges: [
                Object.assign({}, answerValues, {
                  createdBy: user?.email,
                }),
              ],
            },
            { headers },
          )
          .then((_res) => {
            toast.success("New number ranges created successfully!")
            navigate("/number-ranges")
          })
          .catch((error) => {
            toast.error("Error creating new number ranges: " + error.message)
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
          {id ? `Number Ranges Update (${id})` : `Add New Number Ranges`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
          {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={NUMBER_RANGES_FORM_DATA}
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

export default NumberRangesConfiguration
