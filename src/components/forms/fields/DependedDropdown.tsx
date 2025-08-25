// // DependedDropdown.tsx
// import { useEffect, useState } from "react";
// import { Field, useFormikContext } from "formik";
// import axios from "axios";
// import { IFormVariable } from "@/utils/types";
// import nookies from "nookies";

// interface IDependedFieldProps {
//   variable: IFormVariable;
//   displayLabel?: boolean;
// }

// const DependedDropdown: React.FunctionComponent<IDependedFieldProps> = ({
//   variable,
//   displayLabel = true,
// }) => {
//   const { values, setFieldValue } = useFormikContext<{ [key: string]: string }>();
//   const token = nookies.get(null).accessToken || "";
//   const [displayValue, setDisplayValue] = useState("");

//   const depField = values[variable.dependedField!];

//   useEffect(() => {
//     if (depField) {
//       const fetchOperation = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetManagerDD_SupervisorId?UserId=${depField}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setFieldValue(variable.name, response.data.Data[0].ManagerId.toString());
//           setDisplayValue(response.data.Data[0].ManagerName);
//         } catch (error) {
//           console.error("Error fetching Manager Details:", error);
//         }
//       };

//       fetchOperation();
//     }
//   }, [depField, setFieldValue, token, variable.name]);

//   return (
//     <div className="form-control" key={variable.name}>
//       {displayLabel && (
//         <label htmlFor={variable.name} className="w-full">
//           {variable.display}
//           {variable.required && <span className="text-error text-left ml-1">*</span>}
//         </label>
//       )}
//       <div className="w-full">
//         <Field
//           id={variable.name}
//           name={variable.name}
//           placeholder={variable.display}
//           value={displayValue}
//           className="input input-sm input-bordered w-full"
//           readOnly
//         />
//       </div>
//     </div>
//   );
// };

// export default DependedDropdown;
