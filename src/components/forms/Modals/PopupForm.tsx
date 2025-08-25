// // import dataLoading from '@/navigation/dataLoading';
// import JobCreation from '@/routes/JobCreation';
// import user from '@/store/user';
// import { JOB_ASSIGNMENT_FORM_DATA, JOB_CREATION_FORM_DATA, MATERIAL_MASTER_POPUP_FORM_DATA } from '@/utils/data';
// import { IFormVariable, IUser } from '@/utils/types';
// import { error, group } from 'console';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify';
// import HorizontalLabelForm from '../HorizontalLabelForm';
// import { useQuery } from '@/utils/dom';
// import { initialFormikValues, formValidationSchema } from '@/utils/forms';
// import { useNavigate } from 'react-router-dom';
// import { formatDateOnly } from '@/utils/convert';
// import axios from 'axios';
// import { FormikValues } from 'formik';
// import { useAuth } from '@/contexts/auth';
// import Loading from '@/navigation/Loading';
// import { string } from 'yup';


// // {
// //   name: "JobName",
// //   type: "string",
// //   display: "Job Name",
// //   default: "",
// //   description: "",
// //   required: true,
// //   group: 1,
// // },
// interface PopupFormProps {
//   isPopupOpen: boolean;
//   setIsPopupOpen: (isOpen: boolean) => void;
// }






// const PopupForm : React.FC<PopupFormProps> = ({ isPopupOpen, setIsPopupOpen }) => {
//     const { user, loading } = useAuth();
//     const navigate = useNavigate();
//     const query = useQuery();
//     const id = query.get("id");
//     const [dataLoading, setDataLoading] = useState(false);
//     const [updateDataById, seUpdateDataById] = useState([]);
  
//     const initialDefaultValueData = initialFormikValues(MATERIAL_MASTER_POPUP_FORM_DATA);
//     const formValidationSchemaData = formValidationSchema(MATERIAL_MASTER_POPUP_FORM_DATA);
  
//     const fetchAPI = (updateId: string) => {
//       setDataLoading(true);
//       axios
//         .get(`${process.env.NEXT_PUBLIC_API_URL}/JobCreation/${updateId}`, {
//           headers: {
//             Authorization: `Bearer ${user?.accessToken}`,
//           },
//         })
//         .then((res) => {
//           if (res.data.data) {
//             seUpdateDataById(res.data.data);
//           }
//         })
//         .catch((error) => console.log(error))
//         .finally(() => {
//           setDataLoading(false);
//         });
//     };
  
//     useEffect(() => {
//       if (id) {
//         fetchAPI(id);
//       }
//     }, [id]);
  
//     const updateData: { [key: string]: any } = updateDataById[0];
  
//     const formatDateTypeUpdate =
//       updateData !== undefined
//         ? updateData.ValidFrom && updateData.ValidTo
//           ? {
//               ValidFrom: formatDateOnly(updateData.ValidFrom),
//               ValidTo: formatDateOnly(updateData.ValidTo),
//             }
//           : {}
//         : {};
  
//     const initialDefaultData =
//       Object.assign({}, updateData, formatDateTypeUpdate) || initialDefaultValueData;
  
//     const handleCancelForm = () => {
//       setIsPopupOpen(false);
//     };
  
//     const handleSubmitForm = (answerValues: FormikValues, actions: FormikValues) => {
//       setDataLoading(true);
//       const headers = {
//         Authorization: `Bearer ${user?.accessToken}`,
//       };
//       id
//         ? axios
//             .put(
//               `${process.env.NEXT_PUBLIC_API_URL}/JobCreation`,
//               {
//                 JobCreation: [
//                   Object.assign({}, answerValues, {
//                     ModifiedBy: user?.email,
//                   }),
//                 ],
//               },
//               { headers }
//             )
//             .then((_res) => {
//               toast.success("Job details updated successfully!");
//               navigate("/job-creation");
//             })
//             .catch((error) => {
//               toast.error("Error updating job details: " + error.message);
//             })
//             .finally(() => {
//               setDataLoading(false);
//               actions.setSubmitting(false);
//             })
//         : axios
//             .post(
//               `${process.env.NEXT_PUBLIC_API_URL}/JobCreation`,
//               {
//                 JobCreation: [
//                   Object.assign({}, answerValues, {
//                     CreatedBy: user?.email,
//                   }),
//                 ],
//               },
//               { headers }
//             )
//             .then((_res) => {
//               toast.success("New job created successfully!");
//               navigate("/job-creation");
//             })
//             .catch((error) => {
//               toast.error("Error creating new job: " + error.message);
//             })
//             .finally(() => {
//               setDataLoading(false);
//               actions.setSubmitting(false);
//             });
//     };
  
    
//     return (
//       isPopupOpen && (
//         <div> 
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40"
//             onClick={() => setIsPopupOpen(false)} // Close popup on clicking the overlay
//           ></div>
     
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="w-full max-w-md bg-base-100 rounded-lg shadow-lg">
            
//               <div className="bg-info text-white rounded-t-lg px-4 py-2 font-bold">
//                 {id ? `Edit (${id})` : `Generate`}
//               </div> 
//               <div className="p-4 bg-neutral">
//                 {dataLoading && <Loading />}
//                 <HorizontalLabelForm
//                   formVariables={MATERIAL_MASTER_POPUP_FORM_DATA}
//                   initialDefaultValueData={initialDefaultData}
//                   formValidationSchemaData={formValidationSchemaData}
//                   handleCancelForm={() => setIsPopupOpen(false)}
//                   handleSubmitForm={handleSubmitForm}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     );
    
//   };
  
//   export default PopupForm;
  