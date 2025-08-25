// import { createContext, useContext, useEffect, useState } from "react"
// import { GetServerSidePropsContext } from "next"
// import { useRouter } from "next/router"
// import nookies from "nookies"
// import { userStore } from "@/store"
// import { IUser } from "@/utils/types"
// // import { userDatabase } from "@/utils/AppConfig"
// import axios from "axios"

// const AuthContext = createContext<{ user: IUser | null; loading: boolean }>({
//   user: null,
//   loading: true,
// })

// export function AuthProvider(
//   { children }: any,
//   ctx: GetServerSidePropsContext,
// ) {
//   const router = useRouter()
//   const [user, setUser] = useState<IUser | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)
//   const setUserStore = userStore((state) => state.setUser)

//   const token = nookies.get(ctx).accessToken || ""
//   const accessTokenExpireTime = nookies.get(ctx).accessTokenExpire || " "
//   const userId = nookies.get(ctx).userId || ""
//   const menus = JSON.parse(nookies.get(null).menuDetails || "[]")
//   // console.log("Menus: ", menus);
//   // const email = nookies.get(ctx).email || ""

//   const userAuthDetails = async () => {
//     //  console.log("accessToken validity: ", accessTokenValidity)

//     try {
//       if (token && userId) {
//         //  console.log("Token in auth: ", token)
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/V2.0/User/MES_UserDetails`,
//           {
//             params: {
//               UserId: userId,
//             },
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         )
//         //  console.log("Response: ", response)
//         const { UserId, UserName, FirstName, LastName, Email, RoleName } =
//           response.data.Data[0]
//         const userData: IUser = {
//           userid: UserId,
//           username: UserName,
//           firstName: FirstName,
//           lastName: LastName,
//           email: Email,
//           role: RoleName,
//           photoUrl: "",
//           accessToken: token,
//           // accessTokenValidity: accessTokenExpireTime,
//           menuDetails: menus,
//         }
//         // const userData: IUser = response.data;
//         setUserStore(userData)
//         setUser(userData)
//         // console.log("userData: ", userData);
//         nookies.destroy(null, "token")
//         nookies.set(null, "token", token, { path: "/" })
//         // console.log("token:", token);

//         setLoading(false)
//         return
//       } else {
//         setUserStore(null)
//         setUser(null)
//         nookies.destroy(null, "token")
//         // nookies.set(null, "token", "", { path: "/" })
//         router.push("/signin")
//         return
//       }
//     } catch (error) {
//       console.log("Login User data storing failed: ", error)
//     }
//   }
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       ;(window as any).nookies = nookies
//     }
//     userAuthDetails()
//   }, [token, userId])

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   return useContext(AuthContext)
// }


// import { createContext, useContext, useEffect, useState } from "react"
// import { GetServerSidePropsContext } from "next"
// import { useRouter } from "next/router"
// import nookies from "nookies"
// import { userStore } from "@/store"
// import { IUser } from "@/utils/types"
// import axios from "axios"

// const AuthContext = createContext<{ user: IUser | null; loading: boolean }>({
//   user: null,
//   loading: true,
// })

// export function AuthProvider(
//   { children }: any,
//   ctx: GetServerSidePropsContext,
// ) {
//   const router = useRouter()
//   const [user, setUser] = useState<IUser | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)
//   const setUserStore = userStore((state) => state.setUser)

//   // ✅ keep names same as before (no breakage in other files)
//   const userId = nookies.get(ctx).userId || ""
//   const token = nookies.get(ctx).accessToken || ""
//   const accessTokenExpireTime = nookies.get(ctx).accessTokenExpire || ""
//   const menus = JSON.parse(nookies.get(null).menuDetails || "[]")

//   const userAuthDetails = async () => {
//     try {
//       if (token && userId) {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/V2.0/User/MES_UserDetails`,
//           {
//             params: { UserId: userId },
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         )

//         // ✅ handle both possible shapes safely
//         const apiData = response.data?.data?.[0] ?? null

//         if (!apiData) {
//           console.warn("No user data in API response")
//           setUserStore(null)
//           setUser(null)
//           router.push("/signin")
//           return
//         }

//         // ✅ Destructure safely (with defaults)
//         const {
//           userId: apiUserId = "",
//           userName = "",
//           firstName = "",
//           lastName = "",
//           email = "",
//           accessToken = token,
//           refreshToken = "",
//           expireaccesstoken = "",
//           expirerefreshtoken = "",
//           menuSubMenuDetails = menus,
//           roleName = "", // in case old response still comes
//         } = apiData

//         // ✅ Build user object
//         const userData: IUser = {
//           userid: apiUserId || userId, // prefer API userId, fallback to cookie
//           username: userName,
//           firstName,
//           lastName,
//           email: email,
//           role: roleName || "", // fallback since new response doesn’t have role
//           photoUrl: "",
//           accessToken,
//           menuDetails: menuSubMenuDetails ?? menus,
//         }

//         // ✅ Store everywhere
//         setUserStore(userData)
//         setUser(userData)

//         // ✅ Update cookies with latest tokens
//         nookies.destroy(null, "token")
//         nookies.set(null, "token", accessToken, { path: "/" })
//         nookies.set(null, "refreshToken", refreshToken, { path: "/" })
//         nookies.set(null, "accessTokenExpire", expireaccesstoken, { path: "/" })
//         nookies.set(null, "refreshTokenExpire", expirerefreshtoken, { path: "/" })

//         setLoading(false)
//       } else {
//         setUserStore(null)
//         setUser(null)
//         nookies.destroy(null, "token")
//         router.push("/signin")
//       }
//     } catch (error) {
//       console.error("Login User data storing failed: ", error)
//       setUserStore(null)
//       setUser(null)
//       router.push("/signin")
//     }
//   }

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       ;(window as any).nookies = nookies
//     }
//     userAuthDetails()
//   }, [token, userId])

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)


import { createContext, useContext, useEffect, useState } from "react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import nookies from "nookies"
import { userStore } from "@/store"
import { IUser } from "@/utils/types"
import axios from "axios"

const AuthContext = createContext<{ user: IUser | null; loading: boolean }>({
  user: null,
  loading: true,
})

export function AuthProvider(
  { children }: any,
  ctx: GetServerSidePropsContext,
) {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const setUserStore = userStore((state) => state.setUser)

  // ✅ Fetch userId & token from cookies safely
  const cookieUserId = nookies.get(ctx).userId || ""
  const cookieToken = nookies.get(ctx).accessToken || ""
  const menus = JSON.parse(nookies.get(null).menuDetails || "[]")

  const userAuthDetails = async () => {
    try {
      if (!cookieToken || !cookieUserId) {
        // Missing cookies → clear state & redirect
        setUserStore(null)
        setUser(null)
        nookies.destroy(null, "token")
        router.push("/signin")
        return
      }

      // ✅ Call API with cookieUserId in path
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/User/MES_UserDetails/${cookieUserId}`,
        {
          headers: { Authorization: `Bearer ${cookieToken}` },
        },
      )

      const apiData = response.data?.data?.[0] ?? null

      if (!apiData) {
        console.warn("No user data in API response")
        setUserStore(null)
        setUser(null)
        router.push("/signin")
        return
      }

      // ✅ Destructure API response with defaults
      const {
        userId: apiUserId = cookieUserId,
        userName = "",
        firstName = "",
        lastName = "",
        email = "",
        accessToken = cookieToken,
        refreshToken = "",
        expireaccesstoken = "",
        expirerefreshtoken = "",
        menuSubMenuDetails = menus,
        roleName = "",
      } = apiData

      // ✅ Build consistent user object
      const userData: IUser = {
        userid: apiUserId,
        username: userName,
        firstName,
        lastName,
        email,
        role: roleName,
        photoUrl: "",
        accessToken,
        menuDetails: menuSubMenuDetails ?? menus,
      }

      // ✅ Update Zustand store & local state
      setUserStore(userData)
      setUser(userData)

      // ✅ Update cookies to reflect latest userId & tokens
      nookies.set(null, "userId", apiUserId, { path: "/" })
      nookies.set(null, "token", accessToken, { path: "/" })
      nookies.set(null, "refreshToken", refreshToken, { path: "/" })
      nookies.set(null, "accessTokenExpire", expireaccesstoken, { path: "/" })
      nookies.set(null, "refreshTokenExpire", expirerefreshtoken, { path: "/" })
      nookies.set(null, "menuDetails", JSON.stringify(menuSubMenuDetails ?? menus), { path: "/" })

      setLoading(false)
    } catch (error) {
      console.error("Login User data storing failed: ", error)
      setUserStore(null)
      setUser(null)
      nookies.destroy(null, "token")
      nookies.destroy(null, "userId")
      router.push("/signin")
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).nookies = nookies
    }
    userAuthDetails()
  }, [cookieToken, cookieUserId])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
