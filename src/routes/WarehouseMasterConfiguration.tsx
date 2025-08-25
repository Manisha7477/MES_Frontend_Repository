import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { WAREHOUSE_MASTER_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IWarehouseMasterConfigurationProps {
  user: IUser
}

const WarehouseMasterConfiguration: React.FunctionComponent<
  IWarehouseMasterConfigurationProps
> = ({ user }) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")
  const [loading, setLoading] = useState(false)
  const [updateDataById, seUpdateDataById] = useState([])

  const initialDefaultValueData = initialFormikValues(WAREHOUSE_MASTER_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(
    WAREHOUSE_MASTER_FORM_DATA,
  )

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/MESWarehouse_Master/${updateId}`)
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
    navigate("/warehouse-master")
  }
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    // API call here on submit
    setLoading(true)
    //console.log(user)

    id
      ? axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/MESWarehouse_Master`, {
            MesWarehouseMaster: [
              Object.assign({}, answerValues, {
                ModifiedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("Warehouse updated successfully!")
            navigate("/warehouse-master")
          })
          .catch((error) => {
            toast.error("Error updating warehouse: " + error.message)
  
      })
          .finally(() => {
            setLoading(false)
            actions.setSubmitting(false)
          })
      : axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/MESWarehouse_Master`, {
            MesWarehouseMaster: [
              Object.assign({}, answerValues, {
                CreatedBy: user.email,
              }),
            ],
          })
          .then((_res) => {
            toast.success("New warehouse created successfully!")
            navigate("/warehouse-master")
          })
          .catch((error) => {
            toast.error("Error creating new warehouse: " + error.message)
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
          {id ? `Warehouse Master Update (${id})` : `Add New Warehouse master`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
          {loading && <Loading />}
          <HorizontalLabelForm
            formVariables={WAREHOUSE_MASTER_FORM_DATA}
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

export default WarehouseMasterConfiguration




// import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
// import { WAREHOUSE_MASTER_FORM_DATA, WAREHOUSE_MASTER_DATA } from "@/utils/data"
// import { useQuery } from "@/utils/dom"
// import { initialFormikValues, formValidationSchema } from "@/utils/forms"
// import { FormikValues } from "formik"
// import { useNavigate } from "react-router-dom"

// interface IWarehouseMasterConfigurationProps {}

// const WarehouseMasterConfiguration: React.FunctionComponent<
//   IWarehouseMasterConfigurationProps
// > = ({}) => {
//   const navigate = useNavigate()
//   const query = useQuery()
//   const id = query.get("id")

//   const initialDefaultValueData = initialFormikValues(
//     WAREHOUSE_MASTER_FORM_DATA,
//   )
//   const formValidationSchemaData = formValidationSchema(
//     WAREHOUSE_MASTER_FORM_DATA,
//   )

//   const updateData = WAREHOUSE_MASTER_DATA.find(
//     (dataItem) => dataItem.idNo == id,
//   )
//   const initialDefaultData = Object.assign(
//     {},
//     initialDefaultValueData,
//     updateData,
//   )

//   const handleCancelForm = () => {
//     navigate("/warehouse-master")
//   }
//   const handleSubmitForm = (
//     answerValues: FormikValues,
//     actions: FormikValues,
//   ) => {
//     // API call here on submit
//     console.log(answerValues)
//     setTimeout(() => {
//       actions.setSubmitting(false)
//       navigate("/warehouse-master")
//     }, 1000)
//   }

//   return (
//     <div className="w-full px-2">
//       <div className="border rounded border-base-300">
//         <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1">
//           {id
//             ? `Warehouse Master Data Update (${id})`
//             : `Add New Warehouse Master Data`}
//         </div>
//         <div className="p-4 bg-neutral screen-height-media">
//           <HorizontalLabelForm
//             formVariables={WAREHOUSE_MASTER_FORM_DATA}
//             initialDefaultValueData={initialDefaultData}
//             formValidationSchemaData={formValidationSchemaData}
//             handleCancelForm={handleCancelForm}
//             handleSubmitForm={handleSubmitForm}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WarehouseMasterConfiguration
