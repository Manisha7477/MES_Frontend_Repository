import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
//import UserIdCreationForm from "@/components/forms/UserIdCreationForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { USER_CREATION_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import nookies from "nookies"

interface IUserIdCreationProps {
  user: IUser
}

const UserIdCreation: React.FunctionComponent<IUserIdCreationProps> = ({
  user,
}) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
   const token = nookies.get(null).accessToken || ""

  const [loading, setLoading] = useState(false)
  const [updateDataById, setUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(USER_CREATION_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(USER_CREATION_FORM_DATA)

  const filteredFormData = USER_CREATION_FORM_DATA.filter((field) => {
    return id ? field.showInUpdate !== false : true
  })

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    const headers = {
      Authorization: `Bearer ${token}`, // Pass the token here
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/User/MES_UserDetails?userId=${updateId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.data) {
          setUpdateDataById(res.data.data)
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
    navigate("/manage-users")
  }

  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    setLoading(true)

    id
      ? axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/User/MES_UserDetails`, {
            userDetails: [
              Object.assign({}, answerValues, {
                modifiedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            navigate("/manage-users")
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/User/MES_UserDetails`, {
            userDetails: [
              Object.assign({}, answerValues, {
                createdBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            navigate("/manage-users")
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
  }
  return (
    <div className=" ">
      <div className="sm:border rounded border-base-300">
        <div className="  bg-info rounded-t border-b border-base-300 font-bold   md:pl-5 ml-0 pr-9 mt-20 mb-1">
          {id ? `User Id Update (${id})` : `User Id Creation hree`}
        </div>
        <div className="bg-neutral screen-height-media w-full pl-5 ml-0 pr-9">
          {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={filteredFormData}
            initialDefaultValueData={initialDefaultData}
            formValidationSchemaData={formValidationSchemaData}
            handleSubmitForm={handleSubmitForm}
            handleCancelForm={handleCancelForm}
          />
        </div>
      </div>
    </div>
  )
}

export default UserIdCreation
