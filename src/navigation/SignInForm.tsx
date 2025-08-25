import { useEffect, useState } from "react"
import nookies from "nookies"
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik"
import { useRouter } from "next/router"
import Loading from "@/navigation/Loading"
import axios from "axios"
import * as Yup from "yup"
interface ISignInFormProps {}
type IFormField = {
  userName: string
  password: string
}
export const SignInForm: React.FunctionComponent<ISignInFormProps> = ({}) => {
  const router = useRouter()
  const [loginErrorMessage, setLoginErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  let token = nookies.get(null).accessToken || ""
  const [currentTime, setCurrentTime] = useState(() => {
    const savedTime = localStorage.getItem("currentTime")
    return savedTime ? parseInt(savedTime, 10) : 0
  })
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [userLoginTimeInSeconds, setUserLoginTimeInSeconds] = useState(0)
  const [timeDiff, setTimeDiff] = useState(0)
  const [validityInSec, setValidityInSec] = useState(0)
  const [refreshTokenValidityInSec, setRefreshTokenValidityInSec] = useState(0)
  const [redirected, setRedirected] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const formFieldValues: IFormField = {
    userName: "",
    password: "",
  }
  useEffect(() => {
    const updateCurrentTime = () => {
      const date = new Date()
      const totalSeconds = Math.floor(date.getTime() / 1000)
      setCurrentTime(totalSeconds)
      localStorage.setItem("currentTime", totalSeconds.toString())
      if (userLoginTimeInSeconds > 0 && validityInSec > 0) {
        const timeDiff = totalSeconds - userLoginTimeInSeconds
        setTimeDiff(timeDiff)
        const refreshToken = nookies.get(null).refreshToken || ""
        if (
          timeDiff >= validityInSec &&
          timeDiff <= refreshTokenValidityInSec
        ) {
          // Access token expired but still within refresh token validity
          if (!redirected) {
            nookies.set(null, "accessToken", refreshToken, { path: "/" })
            setRedirected(true) // Prevent further redirection
          }
        } else if (timeDiff > refreshTokenValidityInSec) {
          // Both access token and refresh token expired
          handleSessionExpiration()
        }
      }
    }
    const handleSessionExpiration = () => {
      setLoginErrorMessage("Your session has expired. Please login again.")
      setSessionExpired(true)
      setRedirected(true)
      setUserLoginTimeInSeconds(0)
      setValidityInSec(0)
      setTimeDiff(0)
      setCurrentTime(0)
      setIntervalId(null)
      // Clear localStorage and cookies
      localStorage.removeItem("currentTime")
      nookies.destroy(null, "accessToken")
      nookies.destroy(null, "refreshToken")
      nookies.destroy(null, "userId")
      nookies.destroy(null, "menuDetails")
      router.push("/signin")
    }
    // Set interval to update time every second
    const id = setInterval(() => {
      if (!sessionExpired) {
        updateCurrentTime()
      } else {
        clearInterval(id)
      }
    }, 1000)
    // Save the interval ID and clean up on unmount
    setIntervalId(id)
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [userLoginTimeInSeconds, validityInSec, sessionExpired, redirected])
  // ------------

  const onSignIn = async (signInValues: FormikValues) => {
  setLoading(true)
  const { email, password } = signInValues

  if (email && password) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/User/LoginUser`,
        {
          userName: email, // backend expects "userName" not "Username"
          password: password,
        }
      )

      if (response.data.statusCode === "200") {
        const {
          userId,
          userName,
          firstName,
          lastName,
          emailId,
          accessToken,
          refreshToken,
          expireaccesstoken,
          expirerefreshtoken,
          menuSubMenuDetails,
        } = response.data

        if (
          accessToken &&
          refreshToken &&
          expireaccesstoken &&
          expirerefreshtoken &&
          menuSubMenuDetails
        ) {
          // Convert expiry dates to seconds
          const accessExpiry = Math.floor(new Date(expireaccesstoken).getTime() / 10)
          const refreshExpiry = Math.floor(new Date(expirerefreshtoken).getTime() / 1000)
          const now = Math.floor(Date.now() / 1000)

          // Save tokens and user details
          localStorage.setItem("currentTime", now.toString())
          setUserLoginTimeInSeconds(now)
          setValidityInSec(accessExpiry - now)
          setRefreshTokenValidityInSec(refreshExpiry - now)

          nookies.set(null, "accessToken", accessToken, { path: "/" })
          nookies.set(null, "refreshToken", refreshToken, { path: "/" })
          nookies.set(null, "userId", userId, { path: "/" })
          nookies.set(null, "userName", userName, { path: "/" })
          nookies.set(null, "emailId", emailId, { path: "/" })
          nookies.set(null, "fullName", `${firstName} ${lastName}`, { path: "/" })
          nookies.set(null, "menuDetails", JSON.stringify(menuSubMenuDetails), { path: "/" })

          // Redirect to home page
          router.push("/")
        } else {
          setLoginErrorMessage("Invalid response from server. Please try again.")
        }
      } else {
        setLoginErrorMessage("Invalid username or password.")
      }
    } catch (error) {
      setLoginErrorMessage("Error occurred while logging in. Please try again later.")
    }
  } else {
    setLoginErrorMessage("Both Username/Email and Password are required.")
  }
  setLoading(false)
}

  return (
    <div className="w-80 items-center justify-center">
      {loading && <Loading color="text-base-100" />}
      {loginErrorMessage && (
        <div className="text-error text-sm text-left">{loginErrorMessage}</div>
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Username or Email is required.")
            .test(
              "is-valid-username-or-email",
              "Enter a valid Username or Email ID.",
              (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validation regex
                const usernameRegex = /^[a-zA-Z0-9_]+$/ // Username validation regex
                return emailRegex.test(value!) || usernameRegex.test(value!)
              },
            ),
          password: Yup.string().required("Password is required."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSignIn(values) // Assuming `onSignIn` handles the logic for sign-in
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="relative">
              <div className="form-control">
                <Field
                  type="text"
                  name="email"
                  placeholder="Username or Email ID"
                  className="input input-sm input-bordered w-full"
                />
                <div className="text-error text-sm text-left">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="form-control">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-sm input-bordered w-full"
                />
                <div className="text-error text-sm text-left">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 my-2">
                <div className="w-full text-left">
                  <button
                    type="submit"
                    className="btn btn-sm btn-warning w-full"
                    disabled={isSubmitting}
                  >
                    Log In
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning w-full"
                    onClick={() => alert("Reset password functionality here.")}
                    disabled={isSubmitting}
                  >
                    Forget Password
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default SignInForm

// import { useEffect, useState } from "react"
// import nookies from "nookies"
// import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik"
// import { useRouter } from "next/router"
// // import { userDatabase } from "@/utils/AppConfig"
// import Loading from "@/navigation/Loading"
// import axios from "axios"

// interface ISignInFormProps {}

// type IFormField = {
//   // email: string
//   username:string
//   password: string
// }

// export const SignInForm: React.FunctionComponent<ISignInFormProps> = ({}) => {
//   const router = useRouter()
//   const [loginErrorMessage, setLoginErrorMessage] = useState("")
//   const [loading, setLoading] = useState(false)

//   let token = nookies.get(null).accessToken || ""

//   const [currentTime, setCurrentTime] = useState(() =>{
//      const savedTime = localStorage.getItem("currentTime");
//     return savedTime ? parseInt(savedTime, 10) : 0;
//   })

//   // const [currentTime, setCurrentTime] = useState("");
//   const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
//   const [userLoginTimeInSeconds, setUserLoginTimeInSeconds] = useState(0);
//   const [timeDiff, setTimeDiff] = useState(0);
//   const [validityInSec, setValidityInSec] = useState(0);
//   const [refreshTokenValidityInSec, setRefreshTokenValidityInSec] = useState(0);
//   const [redirected, setRedirected] = useState(false);
//   const [sessionExpired, setSessionExpired] = useState(false);

//   const formFieldValues: IFormField = {
//     // email: "si@email.com",
//     // password: "Password@12345",

//     // email:"",
//     username:"",
//     password:""
//   }

//   useEffect(() => {
//     // Set interval to update the current time every second
//     const id = setInterval(() => {

//       if (sessionExpired) {
//         // Don't update timeDiff if session expired
//         clearInterval(id); // Clear the interval if session expired
//         return;
//       }
//       const date = new Date();
//       const totalSeconds = Math.floor(date.getTime()/1000)
//       // console.log('Updating current time:', totalSeconds);
//       setCurrentTime(totalSeconds);
//       localStorage.setItem("currentTime", totalSeconds.toString());
//       if(userLoginTimeInSeconds > 0 && validityInSec > 0)
//       {
//          const timeDiff = totalSeconds - userLoginTimeInSeconds;
//          setTimeDiff(timeDiff)
//         //  console.log("userLoginTimeInSeconds: ", userLoginTimeInSeconds);
//         //  console.log("totalSeconds in currentTime: ", totalSeconds)
//         //  console.log("timeDiff: ", timeDiff)
//         //  console.log("validityInSec: ", validityInSec);
//         //  console.log("refreshTokenValidityInSec: ", refreshTokenValidityInSec);
//         //  console.log("accesstoken before validity is not expired: ", token)
//          const refresh = nookies.get(null).refreshToken || ""
//         //  console.log("refreshtoken from cookies: ", refresh)
//          if(timeDiff >= validityInSec && timeDiff <= refreshTokenValidityInSec && !redirected)
//         {
//               const refreshTokenFromCookies = nookies.get(null).refreshToken || ""
//               token = refreshTokenFromCookies;
//               nookies.set(null, "accessToken", token, { path: "/" });
//               // console.log("accesstoken after validity is expired then assigned refreshtoken to accesstoken, accesstoken: ", token)

//                // No redirection, just update the token and set redirected flag
//                setRedirected(true);

//               // router.push("/")
//             }
//          else if(timeDiff > refreshTokenValidityInSec)
//          {
//             // console.log("timeDiff > refreshTokenValidityInSec " + "timeDiff: " + timeDiff + "refreshTokenValidityInSec: " + refreshTokenValidityInSec)

//             setLoginErrorMessage("Your session has expired. Please login again.");
//             setSessionExpired(true);
//             setRedirected(true);
//             setUserLoginTimeInSeconds(0);
//             setValidityInSec(0)
//             setTimeDiff(0)
//             setCurrentTime(0)
//             setIntervalId(null)
//             localStorage.removeItem("currentTime");
//             nookies.destroy(null, "accessToken")
//             nookies.destroy(null, "refreshToken")
//             nookies.destroy(null, "userId")
//             nookies.destroy(null, "menuDetails")
//             router.push("/signin");
//          }
//       }
//     }, 1000);

//     // Save the interval ID so it can be cleared later
//     setIntervalId(id);
//     // Clean up the interval on component unmount
//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [userLoginTimeInSeconds, validityInSec, sessionExpired, redirected]);

//   const onSignIn = async (signInValues: FormikValues) => {
//     setLoading(true);
//     if (signInValues.email && signInValues.password) {
//       // console.log("signInValues.email... ", signInValues.email);
//       // console.log("signInValues.password... ", signInValues.password);
//       try {
//         const getLoginUser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/Token/LoginUser`, {
//           Username: signInValues.email,
//           Password: signInValues.password,
//         });
//         // console.log("getLoginUser: ", getLoginUser);
//         if (getLoginUser.data.StatusCode === "200") {
//           // console.log("getLoginUser.data: ", getLoginUser);
//           const { AccessToken, UserId, MenuSubMenuDetails, ValidityInSec, RefreshToken, RefreshTokenValidity } = getLoginUser.data;
//           // console.log("AccessToken: ", AccessToken);
//           // console.log("UserId: ", UserId);
//           // console.log("MenuSubMenuDetails: ", MenuSubMenuDetails);
//           // console.log("AccessTokenExpire: ", ValidityInSec);

//           if (AccessToken && MenuSubMenuDetails && !isNaN(ValidityInSec) && ValidityInSec > 0 && RefreshToken && !isNaN(RefreshTokenValidity) && RefreshTokenValidity > 0) {
//             localStorage.setItem("currentTime", Math.floor(Date.now() / 1000).toString());
//             const userLoginTimeInSeconds = Math.floor(Date.now() / 1000);
//             setUserLoginTimeInSeconds(userLoginTimeInSeconds);
//             setValidityInSec(ValidityInSec);
//             setRefreshTokenValidityInSec(RefreshTokenValidity)
//                 nookies.set(null, "accessToken", AccessToken, { path: "/" });
//                 nookies.set(null, "refreshToken", RefreshToken, { path: "/"});
//                 nookies.set(null, "userId", UserId, { path: "/" });
//                 nookies.set(null, "menuDetails", JSON.stringify(MenuSubMenuDetails), { path: "/" });
//                 // nookies.set(null, "accessTokenExpire", ValidityInSec, { path: "/" });
//                 // console.log("menuDetails: ", MenuSubMenuDetails);
//                 router.push("/");
//             } else {
//               setLoginErrorMessage("Invalid response from server. Please try again.");
//             }
//           } else {
//             setLoginErrorMessage("Invalid email or password");
//           }
//             }
//       catch (error) {
//         setLoginErrorMessage("Error occurred while logging in");
//         // console.log("Error occurred while logging in: ", error);
//       }
//     } else {
//       setLoginErrorMessage("Email and Password required!");
//       // console.log("Please fill Email and Password");
//     }
//     setLoading(false);
//   };
//   return (
//     <div className="w-80 items-center justify-center">
//       {loading && <Loading color="text-base-100" />}
//       {loginErrorMessage && (
//         <div className="text-error text-sm text-left">{loginErrorMessage}</div>
//       )}
//       <Formik
//         initialValues={formFieldValues}
//         onSubmit={(values, { setSubmitting }) => {
//           onSignIn(values)
//           setSubmitting(false)
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="relative">
//               <div className="form-control">
//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Email Id"
//                   className="input input-sm input-bordered w-full"
//                 />
//                 <div className="text-error text-sm text-left">
//                   <ErrorMessage name="email" />
//                 </div>
//               </div>
//               <div className="form-control">
//                 <Field
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="input input-sm input-bordered w-full"
//                 />
//                 <div className="text-error text-sm text-left">
//                   <ErrorMessage name="password" />
//                 </div>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-2 my-2">
//                 <div className="w-full text-left">
//                   <button
//                     type="submit"
//                     className="btn btn-sm btn-warning w-full"
//                     disabled={isSubmitting}
//                   >
//                     Log In
//                   </button>
//                 </div>
//                 <div className="flex-shrink-0">
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-warning w-full"
//                     disabled={isSubmitting}
//                   >
//                     Forget Password
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }

// export default SignInForm
