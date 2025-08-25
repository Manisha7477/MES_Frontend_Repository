import { useState, useEffect } from "react"
import { IUser } from "@/utils/types"
import { Field, Formik, Form } from "formik"
import * as Yup from "yup"

interface IProfileProps {
  user: IUser | null;
}

const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [tempAvatar, setTempAvatar] = useState<string | null>(null) // Temporary avatar for preview before save
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Retrieve saved avatar from session storage
  useEffect(() => {
    const savedAvatar = sessionStorage.getItem("avatar")
    if (savedAvatar) {
      setAvatar(savedAvatar)
    }
  }, [])

  // Handle file upload for the avatar
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setTempAvatar(base64String) // Temporary avatar for preview
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle avatar save
  const handleSaveAvatar = () => {
    if (tempAvatar) {
      setAvatar(tempAvatar)
      sessionStorage.setItem("avatar", tempAvatar) // Save to session storage
      sendAvatarToBackend(tempAvatar) // Send to backend
      setTempAvatar(null)
    }
  }

  // Handle avatar reset (cancel changes)
  const handleCancelAvatar = () => {
    setTempAvatar(null)
  }

  // Handle avatar delete (remove photo)
  const handleDeleteAvatar = () => {
    setAvatar(null)
    setTempAvatar(null)
    sessionStorage.removeItem("avatar") // Clear from session storage
    removeAvatarFromBackend() // Send delete request to backend
  }

  const sendAvatarToBackend = (base64String: string) => {
    // Add your API request logic here, e.g., using axios
    console.log("Sending avatar to backend:", base64String)
    // Example:
    // axios.post('/api/upload-avatar', { avatar: base64String, userId: user.id });
  }

  const removeAvatarFromBackend = () => {
    // Logic for removing avatar from the backend
    console.log("Removing avatar from backend")
    // Example:
    // axios.post('/api/remove-avatar', { userId: user.id });
  }

  // Form validation schema for changing password
  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  })

  const handleSubmit = (values: any) => {
    console.log("Changing password with:", values)
    // Add logic for sending change password request using token
  }

  return (
    <div className="w-[80vw]">
      <div className="flex gap-12 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex-shrink-0">
          {/* Display uploaded avatar or default avatar */}
          <div className="avatar placeholder">
            <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center">
              {tempAvatar ? (
                <img
                  src={tempAvatar}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-4xl font-bold">
                  {user?.firstName.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Avatar upload button */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1">
              Upload Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          {/* Save, Cancel, and Delete buttons */}
          <div className="mt-4 flex gap-2">
            {tempAvatar && (
              <>
                <button className="btn btn-success" onClick={handleSaveAvatar}>
                  Save
                </button>
                <button className="btn btn-error" onClick={handleCancelAvatar}>
                  Cancel
                </button>
              </>
            )}
            {avatar && (
              <button className="btn btn-warning" onClick={handleDeleteAvatar}>
                Delete Photo
              </button>
            )}
          </div>
        </div>

        <div className="flex-grow">
          <h2 className="text-3xl font-semibold mb-4">
            {user?.firstName} {user?.lastName}
          </h2>
          <div className="text-lg">
            <div className="mb-4">
              <span className="font-semibold">Email: </span>
              {user?.email}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Role: </span>
              {user?.role}
            </div>
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={() => setIsChangingPassword(!isChangingPassword)}
              >
                {isChangingPassword ? "Cancel" : "Change Password"}
              </button>
            </div>
          </div>

          {isChangingPassword && (
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={passwordSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="bg-gray-100 p-4 rounded-lg shadow-inner">
                  <h3 className="text-xl font-semibold mb-4">
                    Change Password
                  </h3>
                  <div className="mb-4">
                    <label
                      className="block font-semibold"
                      htmlFor="oldPassword"
                    >
                      Old Password
                    </label>
                    <Field
                      name="oldPassword"
                      type="password"
                      className="input input-bordered w-full mt-2"
                    />
                    {errors.oldPassword && touched.oldPassword && (
                      <div className="text-error">{errors.oldPassword}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block font-semibold"
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <Field
                      name="newPassword"
                      type="password"
                      className="input input-bordered w-full mt-2"
                    />
                    {errors.newPassword && touched.newPassword && (
                      <div className="text-error">{errors.newPassword}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block font-semibold"
                      htmlFor="confirmPassword"
                    >
                      Confirm New Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="input input-bordered w-full mt-2"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-error">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

// import { useState, useEffect } from "react"
// import { IUser } from "@/utils/types"
// import { Field, Formik, Form } from "formik"
// import * as Yup from "yup"

// interface IProfileProps {
//   user: IUser
// }

// const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
//   const [avatar, setAvatar] = useState<string | null>(null)
//   const [tempAvatar, setTempAvatar] = useState<string | null>(null) // Temporary avatar for preview before save
//   const [isChangingPassword, setIsChangingPassword] = useState(false)

//   // Retrieve saved avatar from session storage
//   useEffect(() => {
//     const savedAvatar = sessionStorage.getItem("avatar")
//     if (savedAvatar) {
//       setAvatar(savedAvatar)
//     }
//   }, [])

//   // Handle file upload for the avatar
//   const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const base64String = reader.result as string
//         setTempAvatar(base64String) // Temporary avatar for preview
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // Handle avatar save
//   const handleSaveAvatar = () => {
//     if (tempAvatar) {
//       setAvatar(tempAvatar)
//       sessionStorage.setItem("avatar", tempAvatar) // Save to session storage
//       sendAvatarToBackend(tempAvatar) // Send to backend
//       setTempAvatar(null)
//     }
//   }

//   // Handle avatar reset
//   const handleCancelAvatar = () => {
//     setTempAvatar(null)
//   }

//   const sendAvatarToBackend = (base64String: string) => {
//     // Add your API request logic here, e.g., using axios
//     console.log("Sending avatar to backend:", base64String)
//     // Example:
//     // axios.post('/api/upload-avatar', { avatar: base64String, userId: user.id });
//   }

//   // Form validation schema for changing password
//   const passwordSchema = Yup.object().shape({
//     oldPassword: Yup.string().required("Old password is required"),
//     newPassword: Yup.string()
//       .min(6, "Password should be at least 6 characters")
//       .required("New password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("newPassword")], "Passwords must match")
//       .required("Confirm password is required"),
//   })

//   const handleSubmit = (values: any) => {
//     console.log("Changing password with:", values)
//     // Add logic for sending change password request using token
//   }

//   return (
//     <div className="w-[80vw]">
//       <div className="flex gap-12 p-4 bg-white shadow-lg rounded-lg">
//         <div className="flex-shrink-0">
//           {/* Display uploaded avatar or default avatar */}
//           <div className="avatar placeholder">
//             <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center">
//               {tempAvatar ? (
//                 <img
//                   src={tempAvatar}
//                   alt="avatar"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : avatar ? (
//                 <img
//                   src={avatar}
//                   alt="avatar"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <span className="text-4xl font-bold">
//                   {user.firstName.charAt(0)}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Avatar upload button */}
//           <div className="mt-4">
//             <label className="block text-sm font-semibold mb-1">
//               Upload Avatar
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               className="file-input file-input-bordered w-full max-w-xs"
//             />
//           </div>

//           {/* Save and Cancel buttons */}
//           {tempAvatar && (
//             <div className="mt-4 flex gap-2">
//               <button className="btn btn-success" onClick={handleSaveAvatar}>
//                 Save
//               </button>
//               <button className="btn btn-error" onClick={handleCancelAvatar}>
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="flex-grow">
//           <h2 className="text-3xl font-semibold mb-4">
//             {user.firstName} {user.lastName}
//           </h2>
//           <div className="text-lg">
//             <div className="mb-4">
//               <span className="font-semibold">Email: </span>
//               {user.email}
//             </div>
//             <div className="mb-4">
//               <span className="font-semibold">Role: </span>
//               {user.role}
//             </div>
//             <div className="mb-4">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => setIsChangingPassword(!isChangingPassword)}
//               >
//                 {isChangingPassword ? "Cancel" : "Change Password"}
//               </button>
//             </div>
//           </div>

//           {isChangingPassword && (
//             <Formik
//               initialValues={{
//                 oldPassword: "",
//                 newPassword: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={passwordSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form className="bg-gray-100 p-4 rounded-lg shadow-inner">
//                   <h3 className="text-xl font-semibold mb-4">
//                     Change Password
//                   </h3>
//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="oldPassword"
//                     >
//                       Old Password
//                     </label>
//                     <Field
//                       name="oldPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.oldPassword && touched.oldPassword && (
//                       <div className="text-error">{errors.oldPassword}</div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="newPassword"
//                     >
//                       New Password
//                     </label>
//                     <Field
//                       name="newPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.newPassword && touched.newPassword && (
//                       <div className="text-error">{errors.newPassword}</div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="confirmPassword"
//                     >
//                       Confirm New Password
//                     </label>
//                     <Field
//                       name="confirmPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.confirmPassword && touched.confirmPassword && (
//                       <div className="text-error">{errors.confirmPassword}</div>
//                     )}
//                   </div>

//                   <div className="flex justify-end">
//                     <button type="submit" className="btn btn-primary">
//                       Update Password
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile

// import { useState, useEffect } from "react"
// import { IUser } from "@/utils/types"
// import { Field, Formik, Form } from "formik"
// import * as Yup from "yup"

// interface IProfileProps {
//   user: IUser
// }

// const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
//   const [avatar, setAvatar] = useState<string | null>(null)
//   const [isChangingPassword, setIsChangingPassword] = useState(false)

//   // Retrieve saved avatar from session storage
//   useEffect(() => {
//     const savedAvatar = sessionStorage.getItem("avatar")
//     if (savedAvatar) {
//       setAvatar(savedAvatar)
//     }
//   }, [])

//   // Handle file upload for the avatar
//   const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const base64String = reader.result as string
//         setAvatar(base64String)
//         sessionStorage.setItem("avatar", base64String) // Save to session storage

//         // Send the image to the backend
//         sendAvatarToBackend(base64String)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const sendAvatarToBackend = (base64String: string) => {
//     // Add your API request logic here, e.g., using axios
//     console.log("Sending avatar to backend:", base64String)
//     // Example:
//     // axios.post('/api/upload-avatar', { avatar: base64String, userId: user.id });
//   }

//   // Form validation schema for changing password
//   const passwordSchema = Yup.object().shape({
//     oldPassword: Yup.string().required("Old password is required"),
//     newPassword: Yup.string()
//       .min(6, "Password should be at least 6 characters")
//       .required("New password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("newPassword")], "Passwords must match")
//       .required("Confirm password is required"),
//   })

//   const handleSubmit = (values: any) => {
//     console.log("Changing password with:", values)
//     // Add logic for sending change password request using token
//   }

//   return (
//     <div className="w-[80vw]">
//       <div className="flex gap-12 p-4 bg-white shadow-lg rounded-lg">
//         <div className="flex-shrink-0">
//           {/* Display uploaded avatar or default avatar */}
//           <div className="avatar placeholder">
//             <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center">
//               {avatar ? (
//                 <img
//                   src={avatar}
//                   alt="avatar"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <span className="text-4xl font-bold">
//                   {user.firstName.charAt(0)}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Avatar upload button */}
//           <div className="mt-4">
//             <label className="block text-sm font-semibold mb-1">
//               Upload Avatar
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               className="file-input file-input-bordered w-full max-w-xs"
//             />
//           </div>
//         </div>

//         <div className="flex-grow">
//           <h2 className="text-3xl font-semibold mb-4">
//             {user.firstName} {user.lastName}
//           </h2>
//           <div className="text-lg">
//             <div className="mb-4">
//               <span className="font-semibold">Email: </span>
//               {user.email}
//             </div>
//             <div className="mb-4">
//               <span className="font-semibold">Role: </span>
//               {user.role}
//             </div>
//             <div className="mb-4">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => setIsChangingPassword(!isChangingPassword)}
//               >
//                 {isChangingPassword ? "Cancel" : "Change Password"}
//               </button>
//             </div>
//           </div>

//           {isChangingPassword && (
//             <Formik
//               initialValues={{
//                 oldPassword: "",
//                 newPassword: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={passwordSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form className="bg-gray-100 p-4 rounded-lg shadow-inner">
//                   <h3 className="text-xl font-semibold mb-4">
//                     Change Password
//                   </h3>
//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="oldPassword"
//                     >
//                       Old Password
//                     </label>
//                     <Field
//                       name="oldPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.oldPassword && touched.oldPassword && (
//                       <div className="text-error">{errors.oldPassword}</div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="newPassword"
//                     >
//                       New Password
//                     </label>
//                     <Field
//                       name="newPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.newPassword && touched.newPassword && (
//                       <div className="text-error">{errors.newPassword}</div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="confirmPassword"
//                     >
//                       Confirm New Password
//                     </label>
//                     <Field
//                       name="confirmPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.confirmPassword && touched.confirmPassword && (
//                       <div className="text-error">{errors.confirmPassword}</div>
//                     )}
//                   </div>

//                   <div className="flex justify-end">
//                     <button type="submit" className="btn btn-primary">
//                       Update Password
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile

// import { useState } from "react"
// import { IUser } from "@/utils/types"
// import { Field, Formik, Form } from "formik"
// import * as Yup from "yup"

// interface IProfileProps {
//   user: IUser
// }

// const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
//   const userFirstLetterMatch = user.firstName.match(/\b(\w)/g)
//   const userFirstLetter = userFirstLetterMatch?.join("")
//   const [isChangingPassword, setIsChangingPassword] = useState(false)

//   // Form validation schema
//   const passwordSchema = Yup.object().shape({
//     oldPassword: Yup.string().required("Old password is required"),
//     newPassword: Yup.string()
//       .min(6, "Password should be at least 6 characters")
//       .required("New password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("newPassword")], "Passwords must match")
//       .required("Confirm password is required"),
//   })

//   const handleSubmit = (values: any) => {
//     console.log("Changing password with:", values)
//     // Add logic for sending change password request using token
//   }

//   return (
//     <div className="w-[80vw]">
//       <div className="flex gap-12 p-4 bg-white shadow-lg rounded-lg">
//         <div className="flex-shrink-0">
//           <div className="avatar placeholder">
//             <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center">
//               <span className="text-4xl font-bold">{userFirstLetter}</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex-grow">
//           <h2 className="text-3xl font-semibold mb-4">
//             {user.firstName} {user.lastName}
//           </h2>
//           <div className="text-lg">
//             <div className="mb-4">
//               <span className="font-semibold">Email: </span>
//               {user.email}
//             </div>
//             <div className="mb-4">
//               <span className="font-semibold">Role: </span>
//               {user.role}
//             </div>
//             <div className="mb-4">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => setIsChangingPassword(!isChangingPassword)}
//               >
//                 {isChangingPassword ? "Cancel" : "Change Password"}
//               </button>
//             </div>
//           </div>

//           {isChangingPassword && (
//             <Formik
//               initialValues={{
//                 oldPassword: "",
//                 newPassword: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={passwordSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form className="bg-gray-100 p-4 rounded-lg shadow-inner">
//                   <h3 className="text-xl font-semibold mb-4">
//                     Change Password
//                   </h3>
//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="oldPassword"
//                     >
//                       Old Password
//                     </label>
//                     <Field
//                       name="oldPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.oldPassword && touched.oldPassword && (
//                       <div className="text-error">{errors.oldPassword}</div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="newPassword"
//                     >
//                       New Password
//                     </label>
//                     <Field
//                       name="newPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.newPassword && touched.newPassword && (
//                       <div className="text-error">{errors.newPassword}</div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block font-semibold"
//                       htmlFor="confirmPassword"
//                     >
//                       Confirm New Password
//                     </label>
//                     <Field
//                       name="confirmPassword"
//                       type="password"
//                       className="input input-bordered w-full mt-2"
//                     />
//                     {errors.confirmPassword && touched.confirmPassword && (
//                       <div className="text-error">{errors.confirmPassword}</div>
//                     )}
//                   </div>

//                   <div className="flex justify-end">
//                     <button type="submit" className="btn btn-primary">
//                       Update Password
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile

// import { IUser } from "@/utils/types"

// interface IProfileProps {
//   user: IUser
// }

// const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
//   const userFirstLetterMatch = user.firstName.match(/\b(\w)/g)
//   const userFirstLetter = userFirstLetterMatch?.join("")

//   return (
//     // <div className="card card-side bg-base-100 shadow-xl">
//     <div className="w-[80vw]">
//       <div className="flex gap-48 p-4">
//         <div className="w-24">
//           <div className="avatar online placeholder">
//             <div className="w-24 rounded-full bg-primary-focus text-base-100">
//               <span className="text-3xl">{userFirstLetter}</span>
//             </div>
//           </div>
//         </div>
//         <div className="">
//           <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
//           <div className="my-4">
//             <span className="font-semibold mr-2">Email</span> {user.email}
//           </div>
//           <div className="my-4">
//             <span className="font-semibold mr-2">Role</span> {user.role}
//           </div>
//           {/* <div className="my-4">
//             <span className="font-semibold mr-2">Password</span> {user.}
//           </div> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile
