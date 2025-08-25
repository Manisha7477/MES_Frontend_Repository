import { useState } from "react"
import { ErrorMessage, Field, useFormikContext } from "formik"
import { GoEye, GoEyeClosed } from "react-icons/go"
import { IFormVariable } from "@/utils/types"
import * as Yup from "yup"

interface IPasswordFieldProps {
  variable: IFormVariable
  displayLabel?: boolean
}

const PasswordField: React.FC<IPasswordFieldProps> = ({
  variable,
  displayLabel,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const { values, errors, touched } = useFormikContext<any>()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword)
  }

  return (
    <div className="form-control">
      {displayLabel && (
        <label htmlFor={variable.name} className="w-full">
          {variable.display}
          {variable.required && (
            <span className="text-error text-left ml-1">*</span>
          )}
        </label>
      )}
      <div className="input input-sm input-bordered flex">
        <Field
          type={showPassword ? "text" : "password"}
          id={variable.name}
          name={variable.name}
          placeholder={variable.description || variable.display}
          className="focus:border-transparent w-full"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="toggle-password"
        >
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </button>
      </div>
      <ErrorMessage
        name={variable.name}
        component="div"
        className="error-message"
      />

      {/* Retype Password Field */}
      <div className="input input-sm input-bordered flex mt-4">
        <Field
          type={showRetypePassword ? "text" : "password"}
          id={`${variable.name}_retype`}
          name={`${variable.name}_retype`}
          placeholder={`Retype ${variable.display}`}
          className="focus:border-transparent w-full"
        />
        <button
          type="button"
          onClick={toggleRetypePasswordVisibility}
          className="toggle-password"
        >
          {showRetypePassword ? <GoEye /> : <GoEyeClosed />}
        </button>
      </div>
      <ErrorMessage
        name={`${variable.name}_retype`}
        component="div"
        className="error-message"
      />

      {/* Display custom error message if passwords don't match */}
      {touched[variable.name] &&
        touched[`${variable.name}_retype`] &&
        errors[`${variable.name}_retype`] && (
          <div className="error-message">Passwords do not match</div>
        )}
    </div>
  )
}

// Validation schema example using Yup
export const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  password_retype: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please retype your password"),
})

export default PasswordField

// import { useState } from "react"
// import { ErrorMessage, Field } from "formik"
// import { GoEye, GoEyeClosed } from "react-icons/go"
// import { IFormVariable } from "@/utils/types"

// interface IPasswordFieldProps {
//   variable: IFormVariable
//   displayLabel?: boolean
// }

// const PasswordField: React.FC<IPasswordFieldProps> = ({
//   variable,
//   displayLabel,
// }) => {
//   const [showPassword, setShowPassword] = useState(false)

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <div className="form-control">
//       {displayLabel && (
//         <label htmlFor={variable.name} className="w-full">
//           {variable.display}
//           {variable.required && (
//             <span className="text-error text-left ml-1">*</span>
//           )}
//         </label>
//       )}
//       <div className="input input-sm input-bordered flex">
//         <Field
//           type={showPassword ? "text" : "password"}
//           id={variable.name}
//           name={variable.name}
//           placeholder={variable.description || variable.display}
//           className="focus:border-transparent w-full"
//         />
//         <button
//           type="button"
//           onClick={togglePasswordVisibility}
//           className="toggle-password"
//         >
//           {showPassword ? <GoEye /> : <GoEyeClosed />}
//         </button>
//       </div>
//       <ErrorMessage
//         name={variable.name}
//         component="div"
//         className="error-message"
//       />
//     </div>
//   )
// }

// export default PasswordField
