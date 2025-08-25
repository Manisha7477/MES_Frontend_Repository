import { useRouter } from "next/router"
import nookies from "nookies"

const SignOut = () => {
  const router = useRouter()

  if (typeof window !== "undefined") {
    nookies.destroy(null, "accessToken")
    nookies.destroy(null, "refreshToken")
    nookies.destroy(null, "userId")
    nookies.destroy(null, "menuDetails")
   
    // nookies.set(null, "accessToken", "", { path: "/" })
    router.push("/signin")
  }

  return <></>
}

export default SignOut
