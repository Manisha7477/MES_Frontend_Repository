import { useEffect, useState } from "react"
import ThemeToggle from "@/components/ThemeToggle"
import { parseCookies } from "nookies" // Import nookies to read cookies

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"
    }
    return "light"
  })

  useEffect(() => {
    const cookies = parseCookies() // Get cookies
    const token = cookies.token // Assuming the token is stored as 'token'

    if (token) {
      // Token is found, you can perform any necessary token validation or actions here.
      console.log("Token found: ", token)
    } else {
      console.error("No token found in cookies.")
    }
  }, []) // Empty dependency array so it runs only once after component mount

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="text-2xl font-semibold mb-4">Settings</div>

      {/* Theme Selection */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-medium mb-2">Theme Setting</h2>
        <p className="text-gray-600 mb-4">
          Choose between light and dark mode for your website.
        </p>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Settings

// import { useEffect, useState } from "react"
// import ThemeToggle from "@/components/ThemeToggle"
// import { getUserDetails, updateUserDetails } from "@/utils/AppConfig"
// import { IUser } from "@/utils/types"
// import { parseCookies } from "nookies" // Import nookies to read cookies
// import { jwtDecode } from "jwt-decode"
// const jwt_decode = require("jwt-decode")

// const Settings: React.FC = () => {
//   const [theme, setTheme] = useState<string>(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("theme") || "light"
//     }
//     return "light"
//   })

//   const [user, setUser] = useState<IUser | null>(null)
//   const [loading, setLoading] = useState<boolean>(false) // Add loading state to show loading indicator if needed

//   useEffect(() => {
//     const cookies = parseCookies() // Get cookies
//     const token = cookies.authToken // Assuming the token is stored as 'authToken'

//     if (token) {
//       try {
//         // Decode the JWT token to get user details (like email or user ID)
//         const decodedToken = jwtDecode<{ email: string }>(token) // Adjust if the token has other fields like user ID
//         const userEmail = decodedToken.email

//         if (userEmail) {
//           // Fetch user details using the email obtained from the decoded token
//           const fetchUserDetails = async () => {
//             try {
//               setLoading(true)
//               const userDetails = await getUserDetails(userEmail) // Use the email from token
//               setUser(userDetails || null)
//             } catch (error) {
//               console.error("Error fetching user details", error)
//             } finally {
//               setLoading(false)
//             }
//           }

//           fetchUserDetails()
//         }
//       } catch (error) {
//         console.error("Error decoding token", error)
//       }
//     } else {
//       console.error("No authentication token found in cookies")
//     }
//   }, []) // Empty dependency array so it runs only once after component mount

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()

//     if (user) {
//       try {
//         setLoading(true)
//         // Update user details
//         await updateUserDetails(user)

//         // Optionally, refresh the user details here
//         const updatedUserDetails = await getUserDetails(user.email)
//         setUser(updatedUserDetails || null)

//         alert("User details updated successfully!")
//       } catch (error) {
//         console.error("Error updating user details", error)
//         alert("Failed to update user details.")
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setUser((prev) => (prev ? { ...prev, [name]: value } : null))
//   }

//   return (
//     <div className="flex flex-col p-6 space-y-6">
//       <div className="text-2xl font-semibold mb-4">Settings</div>

//       {/* Theme Selection */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-medium mb-2">Theme Setting</h2>
//         <p className="text-gray-600 mb-4">
//           Choose between light and dark mode for your website.
//         </p>
//         <ThemeToggle />
//       </div>

//       {/* User Info Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-medium mb-2">User Information</h2>
//         {loading ? (
//           <p>Loading...</p> // Show loading indicator while fetching data
//         ) : user ? (
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   value={user.firstName}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={user.lastName}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//                   disabled
//                 />
//               </div>
//               <div className="text-right">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-md"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </form>
//         ) : (
//           <p>No user data available.</p> // If no user data is fetched
//         )}
//       </div>
//     </div>
//   )
// }

// export default Settings

// import { useEffect, useState } from "react"
// import ThemeToggle from "@/components/ThemeToggle"
// import Table from "@/components/Table"
// import Profile from "@/routes/Profile"
// import { SAMPLE_TABLE_DATA } from "@/utils/data"
// import { getUserDetails, updateUserDetails } from "@/utils/AppConfig"
// import { IUser } from "@/utils/types"

// const Settings: React.FC = () => {
//   const [theme, setTheme] = useState<string>(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("theme") || "light"
//     }
//     return "light"
//   })

//   const [user, setUser] = useState<IUser | null>(null)

//   useEffect(() => {
//     // Fetch user details on component mount
//     const userDetails = getUserDetails("si@email.com") // Adjust the email as needed
//     // console.log("User details coming is ",userDetails)
//     setUser(userDetails || null)
//   }, [])

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault()

//     if (user) {
//       // Update user details
//       updateUserDetails(user)

//       // Optionally, you might want to refresh the user details here
//       const updatedUserDetails = getUserDetails(user.email)
//       setUser(updatedUserDetails || null)

//       alert("User details updated successfully!")
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setUser((prev) => (prev ? { ...prev, [name]: value } : null))
//   }

//   return (
//     <div className="flex flex-col p-6 space-y-6">
//       <div className="text-2xl font-semibold mb-4">Settings</div>

//       {/* Theme Selection */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-medium mb-2">Theme Setting</h2>
//         <p className="text-gray-600 mb-4">
//           Choose between light and dark mode for your website.
//         </p>
//         <ThemeToggle />
//       </div>

//     </div>
//   )
// }

// export default Settings
