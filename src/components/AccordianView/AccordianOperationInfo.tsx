import { IOperationDetails } from "@/utils/types";
import React, { FC } from "react";

interface AccordianOperationInfoProps {
  operationDetails: IOperationDetails;  // Expecting an array of operation details
}

const OrderDetailSection: FC<{ data: IOperationDetails }> = ({ data }) => {
  return (
    <div className="pt-3 grid grid-cols-2 gap-x-8 gap-y-4">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="text-sm flex">
            <header className="font-semibold min-w-[120px]">{item.header}:</header>
            <section className="ml-3">{item.value ?? "N/A"}</section>
          </div>
        ))
      ) : (
        <div className="text-sm">No operation details available</div>
      )}
    </div>
  );
};

const AccordianOperationInfo: FC<AccordianOperationInfoProps> = ({ operationDetails }) => {
  return (
    <div className="flex flex-col">
      <div className="py-3 border-b">
        <OrderDetailSection data={operationDetails} />
      </div>
    </div>
  );
};

export default AccordianOperationInfo;


// import { OPERATION_DETAIL_FORM } from "@/utils/data"
// import { groupFormVariable } from "@/utils/forms"
// import { IFormVariable } from "@/utils/types"
// import React, { FC } from "react"
// import StringField from "../forms/fields/StringField"
// import NumberField from "../forms/fields/NumberField"
// import { Formik, Form } from "formik"

// interface AccordianData2Props {}

// const AccordianData2: FC<AccordianData2Props> = ({}) => {
//   const formatFormVars = groupFormVariable(OPERATION_DETAIL_FORM)

//   const renderFields = (variable: IFormVariable) => {
//     switch (variable.type) {
//       case "string":
//         return <StringField variable={variable} displayLabel={false} />
//       case "number":
//         return <div className="flex justify-between items-center gap-1"><NumberField variable={variable} displayLabel={false} /> <span>Nos</span></div>
//       default:
//         return <StringField variable={variable} displayLabel={false} />
//     }
//   }

//   return (
//     <div className="w-full pt-5">
//       <Formik initialValues={{}} onSubmit={() => {}}>
//         <Form autoComplete="on">
//           <div className="flex-wrap sm:w-9/12">
//             <div className="w-full sm:flex sm:gap-24">
//               {Object.keys(formatFormVars).map((groupFormKey) => {
//                 return (
//                   <div className="w-full" key={groupFormKey}>
//                     {formatFormVars[groupFormKey].map(
//                       (variable: IFormVariable) => (
//                         <div className="relative" key={variable.name}>
//                           <div className="flex">
//                             <div className="w-full">
//                               <label
//                                 htmlFor={variable.name}
//                                 className="w-full text-sm font-semibold"
//                               >
//                                 {variable.display}
//                                 {variable.required && (
//                                   <span className="text-error text-left ml-1">
//                                     *
//                                   </span>
//                                 )}
//                               </label>
//                             </div>
//                             <div className="w-full">
//                               {renderFields(variable)}
//                             </div>
//                           </div>
//                         </div>
//                       ),
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </Form>
//       </Formik>
//     </div>
//   )
// }

// export default AccordianData2
