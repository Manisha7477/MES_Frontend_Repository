// import React, { useState } from "react";
// import { IFormVariable } from "@/utils/types";
// import { ErrorMessage, Field } from "formik";
// import PopupForm from "../Modals/PopupForm";

// interface IBooleanFieldProps {
//   variable: IFormVariable;
//   displayLabel?: boolean;
// }

// const PopupBooleanField: React.FunctionComponent<IBooleanFieldProps> = ({
//   variable,
//   displayLabel = true,
// }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsPopupOpen(event.target.checked);  
//   };
//   const closePopup = () => {
//     setIsPopupOpen(false);  
//   };

//   return (
//     <div className="form-control" key={variable.name}>
//         {isPopupOpen && ( <PopupForm isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
//       )}
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
//           type="checkbox"
//           id={variable.name}
//           name={variable.name}
//           placeholder={variable.display}
//           className="toggle toggle-primary"
//           onChange={handleCheckboxChange}  
//         />
//         <div className="text-error text-xs text-left">
//           <ErrorMessage name={variable.name} />
//         </div>
//         <div className="text-sm text-faint mt-1">{variable.description}</div>
//       </div> 
      
//     </div>
    
//   );
// };
// export default PopupBooleanField;


