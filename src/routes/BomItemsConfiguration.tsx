import BomHorizontalLabelForm from "@/components/forms/bom/BomHorizonatalLabelForm"
import Loading from "@/navigation/Loading"
import { formatDateOnly } from "@/utils/convert"
import { BOM_ITEM_FORM_DATA, BOM_LEVEL_FORM_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { IFormVariable, IUser } from "@/utils/types"
import axios from "axios"
import { FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import nookies from "nookies"

interface IBomConfigurationProps {
  user: IUser | null
}

const BomItemsConfiguration: React.FunctionComponent<
  IBomConfigurationProps
> = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery()
  const token = nookies.get(null).accessToken || ""

  const id = query.get("id")

  const [loading, setLoading] = useState(false)
  const [updateDataById, setUpdateDataById] = useState<any[]>([])
  const [bomLevels, setBomLevels] = useState<any[]>([])
  const [data, setData] = useState<number | null>(null)
  const [validfrom, setValidFrom] = useState<string | null>(null)
  const [validto, setValidTo] = useState<string | null>(null)
  const [bomItem, setBomItem] = useState()
  const initialDefaultValueData = initialFormikValues(BOM_ITEM_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(BOM_ITEM_FORM_DATA)
  const rmInitialDefaultData = initialFormikValues(BOM_LEVEL_FORM_DATA)
  const rmFormValidationSchemaData = formValidationSchema(BOM_LEVEL_FORM_DATA)

  const fetchAPI = (updateId: string) => {
    setLoading(true)
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomData_BomId?Id=${updateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.data.data) {
          const bomData = res.data.data[0]
          setBomItem(res.data.data[0].GetBomItem[0].ItemId)
          setUpdateDataById(res.data.data)
          setBomLevels(bomData.GetBomItem[0].GetBomLevelItem)
          setData(bomData.GetBomItem[0].BaseQuantity)
          setValidFrom(bomData.GetBomItem[0].ValidFrom)
          setValidTo(bomData.GetBomItem[0].ValidTo)
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

  const initialDefaultData = {
    BomId: location.state?.BomId || "",
    BomName: location.state?.BomName || "",
    MaterialNumber: location.state?.MaterialNumber || "",
    MaterialName: location.state?.MaterialName || "",
    PlantId: location.state?.PlantId || "",
    PlantName: location.state?.PlantName || "",
    AlternateBomId: location.state?.AlternateBomId || "",
    AlternateBomName: location.state?.AlternateBomName || "",
    BaseQuantity: data !== null ? data : "",
    ValidFrom: validfrom !== null ? formatDateOnly(validfrom) : "",
    ValidTo: validto !== null ? formatDateOnly(validto) : "",
  }

  const rmDefaultData = bomLevels || []

  const handleCancelForm = () => {
    navigate("/bom")
    console.log(rmDefaultData)
  }

  const handleSubmitForm = async (
    values: FormikValues,
    actions: FormikValues,
  ) => {
    setLoading(true)

    const bomLevelData = values?.BomLevelItem?.map((level: any) => ({
      ...level,
      ItemCategory: parseInt(level.ItemCategory),
      MaterialId: parseInt(level.MaterialId),
      Quantity: parseInt(level.Quantity),
      CreatedBy: user?.email,
      CreatedDate: new Date().toISOString(),
      ModifiedBy: user?.email,
      ModifiedDate: new Date().toISOString(),
      IsDeleted: false,
      ItemId: bomItem,
    }))

    const payload = {
      BomItem: [
        {
          ...values,
          AlternateBomId: values.AlternateBomId,
          MaterialId: values.MaterialNumber,
          CreatedBy: user?.email,
          CreatedDate: new Date().toISOString(),
          ModifiedBy: user?.email,
          ModifiedDate: new Date().toISOString(),
          IsDeleted: false,
          BomLevelItem: bomLevelData,
          ItemId: bomItem,
        },
      ],
    }

    try {
      if (bomItem) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/BomItem`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        navigate("/bom")
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/BomItem`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        navigate("/bom")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      actions.setSubmitting(false)
    }
  }
  return (
    <div className="w-full px-2">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          {id ? `BOM Update (${id})` : `Add BOM Item`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
          {loading && <Loading />}
          <BomHorizontalLabelForm
            formVariables={BOM_ITEM_FORM_DATA}
            initialDefaultValueData={initialDefaultData}
            rmFormVariables={BOM_LEVEL_FORM_DATA}
            rmInitialDefaultValues={rmDefaultData}
            formValidationSchemaData={formValidationSchemaData}
            rmFormValidationSchemaData={rmFormValidationSchemaData}
            handleCancelForm={handleCancelForm}
            handleSubmitForm={handleSubmitForm}
          />
        </div>
      </div>
    </div>
  )
}

export default BomItemsConfiguration

// import BomHorizontalLabelForm from "@/components/forms/bom/BomHorizonatalLabelForm"
// import Loading from "@/navigation/Loading"
// import { formatDateOnly } from "@/utils/convert"
// import { BOM_ITEM_FORM_DATA, BOM_LEVEL_FORM_DATA } from "@/utils/data"
// import { useQuery } from "@/utils/dom"
// import { initialFormikValues, formValidationSchema } from "@/utils/forms"
// import { IFormVariable, IUser } from "@/utils/types"
// import axios from "axios"
// import { FormikValues } from "formik"
// import { useEffect, useState } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import nookies from "nookies"

// interface IBomConfigurationProps {
//   user: IUser | null
// }

// const BomItemsConfiguration: React.FunctionComponent<IBomConfigurationProps> = ({ user }) => {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const query = useQuery()
//   const token = nookies.get(null).accessToken || ""

//   const id = query.get("id")

//   const [loading, setLoading] = useState(false)
//   const [updateDataById, setUpdateDataById] = useState<any[]>([])
//   const [bomLevels, setBomLevels] = useState<any[]>([])
//   const [data, setData] = useState<number | null>(null)
//   const [validfrom, setValidFrom] = useState<string | null>(null)
//   const [validto, setValidTo] = useState<string | null>(null)
//   const [bomItem,setBomItem] = useState()
//   const initialDefaultValueData = initialFormikValues(BOM_ITEM_FORM_DATA)
//   const formValidationSchemaData = formValidationSchema(BOM_ITEM_FORM_DATA)
//   const rmInitialDefaultData = initialFormikValues(BOM_LEVEL_FORM_DATA)
//   const rmFormValidationSchemaData = formValidationSchema(BOM_LEVEL_FORM_DATA)

//   const fetchAPI = (updateId: string) => {
//     setLoading(true)
//     axios
//       .get(
//         `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomData_BomId?Id=${updateId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )
//       .then((res) => {
//         if (res.data.data) {
//           const bomData = res.data.data[0]
//           setBomItem(res.data.data[0].GetBomItem[0].ItemId)
//           setUpdateDataById(res.data.data)
//           setBomLevels(bomData.GetBomItem[0].GetBomLevelItem)
//           setData(bomData.GetBomItem[0].BaseQuantity)
//           setValidFrom(bomData.GetBomItem[0].ValidFrom)
//           setValidTo(bomData.GetBomItem[0].ValidTo)
//         }
//       })
//       .catch((error) => console.log(error))
//       .finally(() => {
//         setLoading(false)
//       })
//   }

//   useEffect(() => {
//     if (id) {
//       fetchAPI(id)
//     }
//   }, [id])

//   const initialDefaultData = {
//     BomId: location.state?.BomId || '',
//     BomName: location.state?.BomName || '',
//     MaterialNumber: location.state?.MaterialNumber || '',
//     MaterialName: location.state?.MaterialName || '',
//     PlantId: location.state?.PlantId || '',
//     PlantName: location.state?.PlantName || '',
//     AlternateBomId: location.state?.AlternateBomId || '',
//     AlternateBomName: location.state?.AlternateBomName || '',
//     BaseQuantity: data !== null ? data : '',
//     ValidFrom: validfrom !== null ? formatDateOnly(validfrom) : '',
//     ValidTo: validto !== null ? formatDateOnly(validto) : '',
//   }

//   const rmDefaultData = bomLevels || []

//   const handleCancelForm = () => {
//     navigate("/bom")
//     console.log(rmDefaultData)
//   }

//   const handleSubmitForm = async (
//     values: FormikValues,
//     actions: FormikValues,
//   ) => {
//     setLoading(true)

//     const bomLevelData = values?.BomLevelItem?.map((level: any) => ({
//       ...level,
//       ItemCategory: parseInt(level.ItemCategory),
//       MaterialId: parseInt(level.MaterialId),
//       Quantity: parseInt(level.Quantity),
//       CreatedBy: user?.email,
//       CreatedDate: new Date().toISOString(),
//       ModifiedBy: user?.email,
//       ModifiedDate: new Date().toISOString(),
//       IsDeleted: false,
//     }))

//     const payload = {
//       BomItem: [
//         {
//           ...values,
//           AlternateBomId: values.AlternateBomId,
//           MaterialId: values.MaterialNumber,
//           CreatedBy: user?.email,
//           CreatedDate: new Date().toISOString(),
//           ModifiedBy: user?.email,
//           ModifiedDate: new Date().toISOString(),
//           IsDeleted: false,
//           BomLevelItem: bomLevelData,
//         },
//       ],
//     }

//     try {
//       if (bomItem) {
//         await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/BomItem`, payload, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         navigate("/bom")
//         console.log("Submitting Payload:", JSON.stringify(payload, null, 2));

//       } else {
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/BomItem`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         )
//         navigate("/bom")
//       }
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//       actions.setSubmitting(false)
//     }
//   }

//   return (
//     <div className="w-full px-2">
//       <div className="border rounded border-base-300">
//         <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
//           {id ? `BOM Update (${id})` : `Add BOM Item`}
//         </div>
//         <div className="p-4 bg-neutral screen-height-media">
//           {loading && <Loading />}
//           <BomHorizontalLabelForm
//             formVariables={BOM_ITEM_FORM_DATA}
//             initialDefaultValueData={initialDefaultData}
//             rmFormVariables={BOM_LEVEL_FORM_DATA}
//             rmInitialDefaultValues={rmDefaultData}
//             formValidationSchemaData={formValidationSchemaData}
//             rmFormValidationSchemaData={rmFormValidationSchemaData}
//             handleCancelForm={handleCancelForm}
//             handleSubmitForm={handleSubmitForm}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BomItemsConfiguration
