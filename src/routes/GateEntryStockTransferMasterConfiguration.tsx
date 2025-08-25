import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { GATE_ENTRY_STOCK_TRANSFER_MASTER_FORM_DATA} from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { FormikValues } from "formik"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IGateEntryStockTransferMasterConfigurationProps {
  user: IUser
}

const GateEntryStockTransferMasterConfiguration: React.FunctionComponent<
  IGateEntryStockTransferMasterConfigurationProps
> = ({ user }) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(GATE_ENTRY_STOCK_TRANSFER_MASTER_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(
    GATE_ENTRY_STOCK_TRANSFER_MASTER_FORM_DATA,
  )


  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_Gate_Entry_Stock_Transfer/${updateId}`)
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

  const initialDefaultData =
    Object.assign({}, updateData, formatDateTypeUpdate) || initialDefaultValueData


  const handleCancelForm = () => {
    navigate("/gate-stock-transfer")
  }
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    // API call here on submit
    setLoading(true)
    console.log(user)

    
    id
      ? axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/MES_Gate_Entry_Stock_Transfer`, {
            GateEntryStockTransfer: [
              Object.assign({}, answerValues, {
                ModifiedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("GateEntry stock transfer updated successfully!")
            navigate("/gate-stock-transfer")
          })
          .catch((error) => {
            toast.error("Error updating gateentry stock transfer: " + error.message)
  
      })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/MES_Gate_Entry_Stock_Transfer`, {
            GateEntryStockTransfer: [
              Object.assign({}, answerValues, {
                CreatedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("New gateEntry stock transfer created successfully!")
            navigate("/gate-stock-transfer")
          })
          .catch((error) => {
            toast.error("Error creating new gateentry stock transfer: " + error.message)
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
          {id ? `Gate Entry Stock Update (${id})` : `Add New Gate Entry Stock Transfer`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
        {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={GATE_ENTRY_STOCK_TRANSFER_MASTER_FORM_DATA}
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

export default GateEntryStockTransferMasterConfiguration
