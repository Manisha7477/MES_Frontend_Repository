import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { INVENTORY_LEVELS_FORM_DATA} from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IInventoryLevelsConfigurationProps {
  user: IUser
}

const InventoryLevelsConfiguration: React.FunctionComponent<
  IInventoryLevelsConfigurationProps
> = ({user}) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(
    INVENTORY_LEVELS_FORM_DATA,
  )
  const formValidationSchemaData = formValidationSchema(
    INVENTORY_LEVELS_FORM_DATA,
  )


  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/${updateId}`)
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
    ? updateData.ValidFrom && updateData.ValidTo
      ? {
          ValidFrom: formatDateOnly(updateData.ValidFrom),
          ValidTo: formatDateOnly(updateData.ValidTo),
        }
      : {}
    : {}

  const initialDefaultData = Object.assign(
    {},
    updateData, formatDateTypeUpdate) ||
    initialDefaultValueData


  const handleCancelForm = () => {
    navigate("/inventory-levels")
  }
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    setLoading(true)

    id
      ? axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level`, {
            MesInventoryLevels: [
              Object.assign({}, answerValues, {
                ModifiedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("Inventory levels updated successfully!")
            navigate("/inventory-levels")
          })
          .catch((error) => {toast.error("Error updating inventory levels: " + error.message)})
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level`, {
            MesInventoryLevels: [
              Object.assign({}, answerValues, {
                CreatedBy: user.email
              }),
            ],
          })
          .then((_res) => {
            toast.success("New inventory level created successfully!")
            navigate("/inventory-levels")
          })
          .catch((error) => {
            toast.error("Error creating new inventory level: " + error.message)
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
          {id ? `Inventory Levels Update (${id})` : `Add New Inventory Levels`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
        {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={INVENTORY_LEVELS_FORM_DATA}
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

export default InventoryLevelsConfiguration
