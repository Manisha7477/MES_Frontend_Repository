import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { DISPATCH_FORM_DATA } from "@/utils/data"
import { formatDateOnly } from "@/utils/convert"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

interface IDispatchConfigurationProps { user: IUser}

const DispatchConfiguration: React.FunctionComponent<
  IDispatchConfigurationProps
> = ({user}) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(DISPATCH_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(
    DISPATCH_FORM_DATA,
  )

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_Dispatching/${updateId}`)
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
            DispatchDate: formatDateOnly(updateData.DispatchDate)          
          }
        : {}
      : {}
  const initialDefaultData = Object.assign({},updateData ,formatDateTypeUpdate) || initialDefaultValueData
    
  

  const handleCancelForm = () => {
    navigate("/dispatch")
  } 
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    setLoading(true)

    id
      ? axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/MES_Dispatching`, {
            MesDispatching: [
              Object.assign({}, answerValues, {
                ModifiedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            navigate("/dispatch")
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/MES_Dispatching`, {
            MesDispatching: [
              Object.assign({}, answerValues, {
                CreatedBy: user.email
              }),
            ],
          })
          .then((_res) => {
            navigate("/dispatch")
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
  }

 

  return (
    <div className="w-full px-2">
      <div className="border rounded border-base-300 mt-16">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1">
          {id ? `Dipatch Update (${id})` : `Add New Dispatch`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
        {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={DISPATCH_FORM_DATA}
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

export default DispatchConfiguration
