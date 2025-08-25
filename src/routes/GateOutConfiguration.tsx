import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { GATE_OUT_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { FormikValues } from "formik"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IGateOutConfigurationProps {
  user: IUser
}

const GateOutConfiguration: React.FunctionComponent<
  IGateOutConfigurationProps
> = ({user}) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(GATE_OUT_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(
    GATE_OUT_FORM_DATA,
  )

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MES_Gate_Out/${updateId}`)
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
            OutEntyDate: formatDateOnly(updateData.OutEntyDate)
          }
        : {}
      : {}

  const initialDefaultData =
    Object.assign({}, updateData, formatDateTypeUpdate) || initialDefaultValueData

  const handleCancelForm = () => {
    navigate("/gate-out")
  }
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    // // API call here on submit
    // console.log(answerValues)
    // setTimeout(() => {
    //   actions.setSubmitting(false)
    //   navigate("/gate-out")
    // }, 1000)

    setLoading(true)
    console.log(user)
  


  id
      ? axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/MES_Gate_Out`, {
            MesGateOut: [
              Object.assign({}, answerValues, {
                ModifiedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("Gate out updated successfully!")
            navigate("/gate-out")
          })
          .catch((error) => {
            toast.error("Error updating gate out: " + error.message)
  
      })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/MES_Gate_Out`, {
            MesGateOut: [
              Object.assign({}, answerValues, {
                CreatedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("New gate out created successfully!")
            navigate("/gate-out")
          })
          .catch((error) => {
            toast.error("Error creating new gate out: " + error.message)
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
          {id ? `Gate Exit Update (${id})` : `Add New Gate Exit`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
        {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={GATE_OUT_FORM_DATA}
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

export default GateOutConfiguration
