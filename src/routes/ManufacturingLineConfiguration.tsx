import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { MANUFACTURING_LINE_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IManufacturingLineConfigurationProps {
  user: IUser | null
}

const ManufacturingLineConfiguration: React.FunctionComponent<
  IManufacturingLineConfigurationProps
> = ({ user }) => {
  const navigate = useNavigate();
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, setUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(
    MANUFACTURING_LINE_FORM_DATA,
  )
  const formValidationSchemaData = formValidationSchema(
    MANUFACTURING_LINE_FORM_DATA,
  )  
  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MesLine/${updateId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.data) {
          console.log("REs data inside MLC is ",res.data.data)
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
    navigate("/manufacturing-line")
  }
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => { 
    // API call here on submit 
    
    if(answerValues.bom == answerValues.alternateBom){
      alert("Bom and altBom can't be same")
      return;
    }
    console.log(JSON.stringify(answerValues, null, 2));
 
    setLoading(true)
    const headers = {
      Authorization: `Bearer ${user?.accessToken}`, // Pass the token here
    }

    id
      ? axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/MesLine`,
            {
              mesLine: [
                Object.assign({}, answerValues, {
                  modifiedBy: user?.email,
                }),
              ],
            },
            { headers },
          )
          .then((_res) => {
            toast.success("Manufacturing line updated successfully!")
            navigate("/manufacturing-line")
          })
          .catch((error) => {
            toast.error("Error updating manufacturing line: " + error.message)
          })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/MesLine`,
            {
              mesLine: [
                Object.assign({}, answerValues, {
                  createdBy: user?.email,
                }),
              ],
            },
            { headers },
          )
          .then((_res) => {
            toast.success("New manufacturing line created successfully!")

            navigate("/manufacturing-line")
          })
          .catch((error) => {
            toast.error(
              "Error creating new manufacturing line: " + error.message,
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
          {id
            ? `Manufacturing Line Update (${id})`
            : `Add New Manufacturing Line`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
          {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={MANUFACTURING_LINE_FORM_DATA}
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

export default ManufacturingLineConfiguration
