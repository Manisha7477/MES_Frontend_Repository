import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { FACTORY_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import nookies from "nookies"
import { toast } from "react-toastify"



interface IFactoryConfigurationProps {
  user: IUser | null;
}

const FactoryConfiguration: React.FunctionComponent<
  IFactoryConfigurationProps
> = ({ user }) => {

 const token = nookies.get(null).accessToken || ""

  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])
  const initialDefaultValueData = initialFormikValues(FACTORY_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(FACTORY_FORM_DATA)

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MesFactory/${updateId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.data) {
          seUpdateDataById(res.data.data)
          console.log(res.data.data)
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
      ? updateData.ValidFrom && updateData.validTo
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
    navigate("/manage-factory")
  }
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    setLoading(true)

    const headers = {
      Authorization: `Bearer ${token}`, // Pass the token here
    };

    id
      ? axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/MesFactory`, {
            mesfactory: [
              Object.assign({}, answerValues, {
                modifiedBy: user?.email,
              }),
            ],
          },
          { headers }
        )
          .then((_res) => {
            toast.success("Factory updated successfully!")
            navigate("/manage-factory")
          })
          .catch((error) => {
            toast.error("Error updating factory: " + error.message)
  
      })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/MesFactory`, {
            mesfactory: [
              Object.assign({}, answerValues, {
                createdBy: user?.email,
              }),
            ],
          },
          { headers }
        )
          .then((_res) => {
            toast.success("New factory added successfully!")
            navigate("/manage-factory")
          })
          .catch((error) => {
            toast.error("Error adding new factory: " + error.message)
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
          {id ? `Factory Update (${id})` : `Add New Factory`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
          {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={FACTORY_FORM_DATA}
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

export default FactoryConfiguration
