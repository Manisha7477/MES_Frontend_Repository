import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { STOCK_TRANSFER_ORDER_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { FormikValues } from "formik"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IStockTransferOrderConfigurationProps {
  user: IUser
}

const StockTransferOrderConfiguration: React.FunctionComponent<
  IStockTransferOrderConfigurationProps
> = ({ user }) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(STOCK_TRANSFER_ORDER_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(
    STOCK_TRANSFER_ORDER_FORM_DATA,
  )

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_Stock_Transfer_Orders/${updateId}`)
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

  // const updateData: { [key: string]: any } = updateDataById[0]

  // const formatDateTypeUpdate =
  //   updateData !== undefined
  //     ? updateData.ValidFrom && updateData.ValidTo
  //       ? {
  //           ValidFrom: formatDateOnly(updateData.ValidFrom),
  //           ValidTo: formatDateOnly(updateData.ValidTo),
  //         }
  //       : {}
  //     : {}

  // const initialDefaultData =
  //   Object.assign({}, updateData, formatDateTypeUpdate) || initialDefaultValueData

  const updateData: { [key: string]: any } = updateDataById[0]

const formatDateTypeUpdate =
  updateData !== undefined
    ? updateData.ValidFrom && updateData.ValidTo
      ? {
          ValidFrom: formatDateOnly(updateData.ValidFrom),
          ValidTo: formatDateOnly(updateData.ValidTo),
          OrderDate: formatDateOnly(updateData.OrderDate),
          ActualDeliveryDate: formatDateOnly(updateData.ActualDeliveryDate),
          ExpectedDeliveryDate: formatDateOnly(updateData.ExpectedDeliveryDate),
        }
      : {}
    : {}

const initialDefaultData =
  Object.assign({}, updateData, formatDateTypeUpdate) || initialDefaultValueData


  const handleCancelForm = () => {
    navigate("/stock-transfer-order")
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
          .put(`${process.env.NEXT_PUBLIC_API_URL}/MES_Stock_Transfer_Orders`, {
            MesStockTransferOrders: [
              Object.assign({}, answerValues, {
                ModifiedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("Stock transfer order updated successfully!")
            navigate("/stock-transfer-order")
          })
          .catch((error) => {
            toast.error("Error updating stock transfer order: " + error.message)
  
      })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/MES_Stock_Transfer_Orders`, {
            MesStockTransferOrders: [
              Object.assign({}, answerValues, {
                CreatedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("New stock transfer order created successfully!")

            navigate("/stock-transfer-order")
          })
          .catch((error) => {
            toast.error("Error creating new stock transfer order: " + error.message)
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
          {id
            ? `Stock Transfer Order Update (${id})`
            : `Add New Stock Transfer Order`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
        {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={STOCK_TRANSFER_ORDER_FORM_DATA}
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

export default StockTransferOrderConfiguration
