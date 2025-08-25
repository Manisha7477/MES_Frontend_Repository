import { IFormVariable, ITableData } from "@/utils/types"
import axios from "axios"
import { ErrorMessage, Field } from "formik"
import { useEffect, useState } from "react"
import nookies from "nookies"
interface ISelectOneFieldProps {
  variable: IFormVariable
  displayLabel?: boolean
}

interface ISelectOneFieldProps {
  variable: IFormVariable
  displayLabel?: boolean
}

const SelectOneField: React.FunctionComponent<ISelectOneFieldProps> = ({
  variable,
  displayLabel = true,
}) => {
  const [DropOptions, setDropOptions] = useState<ITableData>([])
  const token = nookies.get(null).accessToken || ""

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(variable.API!, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        // Assuming result.data.data is an array of table data
        setDropOptions(result.data.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="form-control" key={variable.name}>
      {displayLabel && (
        <label htmlFor={variable.name} className="w-full">
          {variable.display}
          {variable.required && (
            <span className="text-error text-left ml-1">*</span>
          )}
        </label>
      )}
      <div className="w-full">
        <Field
          as="select"
          id={variable.name}
          name={variable.name}
          placeholder={variable.display}
          className="select select-sm select-bordered w-full"
        >
          <option value="">Select</option>
          {Object.keys(DropOptions).length > 0
            ? DropOptions.map((optionItem: any, index: number) => (
                <option
                  value={Object.values(optionItem)[0] as string}
                  key={optionItem + index}
                  className="capitalize"
                >
                  {`${Object.values(optionItem)[1]}`}
                </option>
              ))
            : variable.options?.map((optionItem, index) => (
                <option
                  value={optionItem}
                  key={optionItem + index}
                  className="capitalize"
                >
                  {optionItem}
                </option>
              ))}
        </Field>
        <div className="text-error text-xs text-left">
          <ErrorMessage name={variable.name} />
        </div>

        <div className="text-sm text-faint mt-1">{variable.description}</div>
      </div>
    </div>
  )
}

export default SelectOneField

// import { IFormVariable, ITableData } from "@/utils/types"
// import axios from "axios"
// import { ErrorMessage, Field } from "formik"
// import { useEffect, useState } from "react"

// interface ISelectOneFieldProps {
//   variable: IFormVariable
//   displayLabel?: boolean
// }

// interface ISelectOneFieldProps {
//     variable: IFormVariable
//     displayLabel?: boolean
//   }

// const SelectOneField: React.FunctionComponent<ISelectOneFieldProps> = ({
//   variable,
//   displayLabel = true,
// }) => {
//   const [DropOptions, setDropOptions] = useState<ITableData>([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await axios.get(variable.API!)
//         // Assuming result.data.data is an array of table data
//         setDropOptions(result.data.data)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       }
//     }
//     fetchData()
//   }, [])

//   return (
//     <div className="form-control" key={variable.name}>
//       {displayLabel && (
//         <label htmlFor={variable.name} className="w-full">
//           {variable.display}
//           {variable.required && (
//             <span className="text-error text-left ml-1">*</span>
//           )}
//         </label>
//       )}
//       <div className="w-full">
//         <Field
//           as="select"
//           id={variable.name}
//           name={variable.name}
//           placeholder={variable.display}
//           className="select select-sm select-bordered w-full"
//         >
//           <option value="">Select</option>
//           {Object.keys(DropOptions).length > 0
//             ? DropOptions.map((optionItem: any , index : number ) => (
//                 <option
//                   value={Object.values(optionItem)[0] as string}

//                   key={index}
//                   className="capitalize"
//                 >
//                   {`${Object.values(optionItem)[1]}`}
//                 </option>
//               ))
//             : variable.options?.map((optionItem : any , index : number ) => (
//                 <option
//                   value={optionItem}
//                   key={index}
//                   className="capitalize"
//                 >
//                   {optionItem}
//                 </option>
//               ))}
//         </Field>
//         <div className="text-error text-xs text-left">
//           <ErrorMessage name={variable.name} />
//         </div>

//         <div className="text-sm text-faint mt-1">{variable.description}</div>
//       </div>
//     </div>
//   )
// }

// export default SelectOneField
