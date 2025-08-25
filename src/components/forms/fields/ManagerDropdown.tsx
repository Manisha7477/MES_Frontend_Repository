import { useEffect, useState } from "react"
import { Field, useFormikContext } from "formik"
import axios from "axios"
import { IFormVariable, ITableData } from "@/utils/types"
import nookies from "nookies"

interface IDependedFieldProps {
  variable: IFormVariable
  displayLabel?: boolean
}

const ManagerDropdown: React.FunctionComponent<IDependedFieldProps> = ({
  variable,
  displayLabel = true,
}) => {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: string | null // Allow null for resetting values
  }>()
  const [DropOptions, setDropOptions] = useState<ITableData>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const token = nookies.get(null).accessToken || ""
  const [displayValue, setDisplayValue] = useState<string>("")

  const depFieldSup = values[variable.managerDrop!] || "" // Supervisor-dependent value
  const depFieldRole = values[variable.dependedDrop!] || "" // Role-dependent value

  useEffect(() => {
    console.log("Values received: ", values, "Variable:", variable)

    // Reset field value
    setFieldValue(variable.name, null)
    setDisplayValue("")

    if (
      depFieldRole === undefined ||
      parseInt(depFieldRole) === 1 ||
      parseInt(depFieldRole) === 4 ||
      parseInt(depFieldRole) === 5
    ) {
      setDisabled(true)
      console.log("Fetching options for roles 1, 4, 5...")

      const fetchOperation = async () => {
        try {
          const result = await axios.get(variable.API!, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log("API Response for Manager:", result.data.data)
          setDropOptions(result.data.data)
        } catch (error) {
          console.error("Error fetching Manager details:", error)
        }
      }

      fetchOperation()
    } else if (parseInt(depFieldRole) === 3) {
      console.log("Fetching data for Operator role:", depFieldSup)

      const fetchOperation = async () => {
        try {
          const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetManagerDD_SupervisorId?userId=${depFieldSup}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          console.log("Supervisor-specific API result:", result.data.data[0])
          setFieldValue(
            variable.name,
            result.data[0]?.ManagerId?.toString() || null,
          ) // Set value or null
          setDisplayValue(result.data[0]?.managerName || "")
        } catch (error) {
          console.error("Error fetching Manager details:", error)
        }
      }

      fetchOperation()
    } else {
      setDisabled(false)
    }
  }, [depFieldRole, depFieldSup, token, variable.name, setFieldValue])

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
        {parseInt(depFieldRole) !== 3 ? (
          <Field
            as="select"
            id={variable.name}
            name={variable.name}
            placeholder={variable.display}
            className="select select-sm select-bordered w-full"
            disabled={disabled}
            value={values[variable.name] || ""} // Default to empty string
            onChange={(e: any) => {
              const value = e.target.value || null // Set null if empty
              setFieldValue(variable.name, value)
            }}
          >
            <option value="">Select</option>
            {DropOptions.length > 0
              ? DropOptions.map((optionItem: any, index: number) => (
                  <option
                    value={
                      (Object.values(optionItem)[2] as string) ||
                      (Object.values(optionItem)[0] as string)
                    }
                    key={optionItem + index}
                    className="capitalize"
                  >
                    {`${Object.values(optionItem)[1]}`}
                  </option>
                ))
              : variable.options?.map((optionItem) => (
                  <option
                    value={optionItem}
                    key={optionItem}
                    className="capitalize"
                  >
                    {optionItem}
                  </option>
                ))}
          </Field>
        ) : (
          <Field
            id={variable.name}
            name={variable.name}
            placeholder={variable.display}
            value={displayValue}
            className="input input-sm input-bordered w-full"
            readOnly
          />
        )}
      </div>
    </div>
  )
}

export default ManagerDropdown

// // ManagerDropdown.tsx
// import { useEffect, useState } from "react"
// import { Field, useFormikContext } from "formik"
// import axios from "axios"
// import { IFormVariable, ITableData } from "@/utils/types"
// import nookies from "nookies"

// interface IDependedFieldProps {
//   variable: IFormVariable
//   displayLabel?: boolean
// }

// const ManagerDropdown: React.FunctionComponent<IDependedFieldProps> = ({
//   variable,
//   displayLabel = true,
// }) => {
//   const { values, setFieldValue } = useFormikContext<{
//     [key: string]: string
//   }>()
//   const [DropOptions, setDropOptions] = useState<ITableData>([])

//   const [disabled, setDisabled] = useState<boolean>(false)
//   const token = nookies.get(null).accessToken || ""
//   const [displayValue, setDisplayValue] = useState("")

//   const depFieldSup = values[variable.managerDrop!]
//   const depFieldRole = values[variable.dependedDrop!]

//   useEffect(() => {
//     console.log("Values coming is ",values," and variable coming is ",variable)
//     values[variable.name] = ""
//     setDisplayValue("")
//     if (
//       depFieldRole == undefined ||
//       parseInt(depFieldRole) == 1 ||
//       parseInt(depFieldRole) == 4 ||
//       parseInt(depFieldRole) == 5
//     ) {
//       setDisabled(true)
//       console.log("Coming in fetchOper")
//       const fetchOperation = async () => {
//         try {
//           const result = await axios.get(variable.API!, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           })
//           console.log("REsult coming in dropdown=",result.data.data)
//           setDropOptions(result.data.data)
//         } catch (error) {
//           console.error("Error fetching Manager Details:", error)
//         }
//       }

//       fetchOperation()
//     } else if (parseInt(depFieldRole) == 3) {
//       console.log(depFieldSup)
//       const fetchOperation = async () => {
//         try {
//           const result = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetManagerDD_SupervisorId?UserId=${depFieldSup}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           )
//           // console.log("result in fetch COMING"+result.data.data[0])
//           console.log("result in fetch coming ",JSON.stringify(result.data.data[0], null, 2));
//           setFieldValue(variable.name, result.data.data[0].ManagerId.toString())
//           setDisplayValue(result.data.data[0].ManagerName)
//         } catch (error) {
//           console.error("Error fetching Manager Details:", error)
//         }
//       }

//       fetchOperation()
//     } else {
//       setDisabled(false)
//     }
//   }, [depFieldRole, depFieldSup, token, variable.name])

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
//         {parseInt(depFieldRole) != 3 ? (
//           <Field
//             as="select"
//             id={variable.name}
//             name={variable.name}
//             placeholder={variable.display}
//             className="select select-sm select-bordered w-full"
//             disabled={disabled}
//           >
//             <option value="">Select</option>
//             {Object.keys(DropOptions).length > 0
//               ? DropOptions.map((optionItem: any, index: number) => (
//                   <option
//                     // value={Object.values(optionItem).at(0) as string}
//                     value={
//                       (Object.values(optionItem)[2] as string) ||
//                       (Object.values(optionItem)[0] as string)
//                     }
//                     key={optionItem + index}
//                     className="capitalize"
//                   >
//                     {`${Object.values(optionItem).at(1)}`}
//                   </option>
//                 ))
//               : variable.options?.map((optionItem) => (
//                   <option
//                     value={optionItem}
//                     key={optionItem}
//                     className="capitalize"
//                   >
//                     {optionItem}
//                   </option>
//                 ))}
//           </Field>
//         ) : (
//           <Field
//             id={variable.name}
//             name={variable.name}
//             placeholder={variable.display}
//             value={displayValue}
//             className="input input-sm input-bordered w-full"
//             readonly
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default ManagerDropdown

// import { useEffect, useState } from "react";
// import { Field, useFormikContext } from "formik";
// import axios from "axios";
// import { IFormVariable, ITableData } from "@/utils/types";
// import nookies from "nookies";

// interface IDependedFieldProps {
//   variable: IFormVariable;
//   displayLabel?: boolean;
// }

// const ManagerDropdown: React.FunctionComponent<IDependedFieldProps> = ({
//   variable,
//   displayLabel = true,
// }) => {
//   const { values, setFieldValue } = useFormikContext<{
//     [key: string]: string | null;
//   }>();
//   const [DropOptions, setDropOptions] = useState<ITableData>([]);
//   const [disabled, setDisabled] = useState<boolean>(false);
//   const token = nookies.get(null).accessToken || "";
//   const [displayValue, setDisplayValue] = useState<string>("");

//   const depFieldSup = values[variable.managerDrop!];
//   const depFieldRole = values[variable.dependedDrop!];

//   useEffect(() => {
//     console.log("Values coming is ", values, " and variable coming is ", variable);

//     // Initialize field value as null
//     setFieldValue(variable.name, null);
//     setDisplayValue("");

//     if (
//       depFieldRole === undefined ||
//       parseInt(depFieldRole) === 1 ||
//       parseInt(depFieldRole) === 4 ||
//       parseInt(depFieldRole) === 5
//     ) {
//       setDisabled(true);
//       console.log("Fetching operation triggered for roles 1, 4, 5");

//       const fetchOperation = async () => {
//         try {
//           const result = await axios.get(variable.API!, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           console.log("Result from API:", result.data.data);
//           setDropOptions(result.data.data);
//         } catch (error) {
//           console.error("Error fetching Manager Details:", error);
//         }
//       };

//       fetchOperation();
//     } else if (parseInt(depFieldRole) === 3) {
//       console.log("Fetching operation triggered for role 3, Supervisor:", depFieldSup);

//       const fetchOperation = async () => {
//         try {
//           const result = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetManagerDD_SupervisorId?UserId=${depFieldSup}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           console.log("Result from Supervisor API:", result.data.data[0]);
//           setFieldValue(variable.name, result.data.data[0].ManagerId.toString());
//           setDisplayValue(result.data.data[0].ManagerName);
//         } catch (error) {
//           console.error("Error fetching Manager Details:", error);
//         }
//       };

//       fetchOperation();
//     } else {
//       setDisabled(false);
//     }
//   }, [depFieldRole, depFieldSup, token, variable.name, setFieldValue]);

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
//         {parseInt(depFieldRole) !== 3 ? (
//           <Field
//             as="select"
//             id={variable.name}
//             name={variable.name}
//             placeholder={variable.display}
//             className="select select-sm select-bordered w-full"
//             disabled={disabled}
//             value={values[variable.name] || ""} // Default to empty string for display
//             onChange={(e) => {
//               const value = e.target.value || null; // Convert empty string to null
//               setFieldValue(variable.name, value);
//             }}
//           >
//             <option value="">Select</option>
//             {DropOptions.length > 0
//               ? DropOptions.map((optionItem: any, index: number) => (
//                   <option
//                     value={
//                       (Object.values(optionItem)[2] as string) ||
//                       (Object.values(optionItem)[0] as string)
//                     }
//                     key={optionItem + index}
//                     className="capitalize"
//                   >
//                     {`${Object.values(optionItem)[1]}`}
//                   </option>
//                 ))
//               : variable.options?.map((optionItem) => (
//                   <option
//                     value={optionItem}
//                     key={optionItem}
//                     className="capitalize"
//                   >
//                     {optionItem}
//                   </option>
//                 ))}
//           </Field>
//         ) : (
//           <Field
//             id={variable.name}
//             name={variable.name}
//             placeholder={variable.display}
//             value={displayValue}
//             className="input input-sm input-bordered w-full"
//             readOnly
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManagerDropdown;
