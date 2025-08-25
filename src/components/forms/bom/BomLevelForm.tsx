// import { useNavigate } from "react-router-dom"
// import { Field, FieldArray, Form, Formik, FormikValues } from "formik"
// import BomHorizontalLabelFormField from "./BomHorizontalLabelFormField"
// import { IFormVariable } from "@/utils/types"
// import { Key, useEffect } from "react"
// import HorizontalLabelFormField from "../HorizontalLabelFormField"
// import { BOM_LEVEL_FORM_DATA } from "@/utils/data"
// import { formValidationSchema, initialFormikValues } from "@/utils/forms"
// import HorizontalLabelForm from "../HorizontalLabelForm"
// import React from "react"

// interface IBomHorizontalLabelFormProps {
//   rmFormVariables: IFormVariable[]
//   rmInitialDefaultValues: FormikValues
//   rmFormValidationSchemaData: any
//   handleRemoveItem: Function
//   handleAddItem: Function
//   handleCancelForm: Function
//   handleSubmitForm: Function
//   // onFormUpdate: Function
//   //   bomLevel: any[]
// }

// const BomHorizontalLabelForm: React.FunctionComponent<
//   IBomHorizontalLabelFormProps
// > = ({
//   rmFormValidationSchemaData,
//   rmFormVariables,
//   rmInitialDefaultValues,
//   handleRemoveItem,
//   handleAddItem,
//   handleCancelForm,
//   handleSubmitForm
//   // onFormUpdate,
//   //   bomLevel,
// }) => {
//   const navigate = useNavigate()

//   const handleRemove = () => {
//     handleRemoveItem()
//   }

//   const handleAdd = () => {
//     handleAddItem()
//   }

//   const handleSubmit = (answerValues: FormikValues, actions: FormikValues) => {
//     console.log(answerValues)
//     handleSubmitForm(answerValues, actions)
//   }

//   const handleCancel = () => {
//     handleCancelForm()
//   }

//   return (
//     <div className="w-full">
//       <Formik
//         initialValues={rmInitialDefaultValues}
//         validationSchema={rmFormValidationSchemaData}
//         onSubmit={async (values, actions) => {
//           handleSubmit(values, actions)
//         }}
//         validateOnMount
//         enableReinitialize
//       >
//         {({ isSubmitting , values }) => {
//           // onFormUpdate(values?.GetBomLevelItem) // Pass the updated array to the parent

//           console.log(values)
//           return (
//             <>
//               <Form>
//                 <FieldArray name="GetBomLevelItem">
//                   {({ insert, push, remove }) => (
//                     <>
//                       {values?.GetBomLevelItem?.map(
//                         (Material: any, index: any) => (
//                           <div key={index} className="border p-4 mb-4 rounded">
//                             <HorizontalLabelForm
//                               key={index}
//                               formVariables={rmFormVariables}
//                               initialDefaultValueData={
//                                 values?.GetBomLevelItem[index]
//                               }
//                               formValidationSchemaData={
//                                 rmFormValidationSchemaData
//                               }
//                               handleCancelForm={() => {}}
//                               handleSubmitForm={() => {}}
//                               showSaveCancelButtons={false}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => remove(index)}
//                               className="btn btn-sm btn-danger"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ),
//                       )}
//                       <button
//                         type="button"
//                         onClick={() =>
//                           push(initialFormikValues(BOM_LEVEL_FORM_DATA))
//                         }
//                         className="btn btn-sm btn-primary text-base-100"
//                       >
//                         Add Raw Material
//                       </button>
//                     </>
//                   )}
//                 </FieldArray>
//               </Form>
//               <div className="mt-10 mb-4">
//                 <button
//                   type="submit"
//                   className="btn btn-sm btn-primary text-base-100"
//                   disabled={isSubmitting}
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-primary ml-4 text-base-100"
//                   disabled={isSubmitting}
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )
//         }}
//       </Formik>
//     </div>
//   )
// }

// export default BomHorizontalLabelForm
