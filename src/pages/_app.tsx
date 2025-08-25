// import { AppProps } from "next/app"
// import { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import { AuthProvider } from "@/contexts/auth"

// import "../styles/globals.css"

// function MyApp({ Component, pageProps }: AppProps) {
//   const router = useRouter()
//   const [render, setRender] = useState(false)

//   useEffect(() => {
//     if (router.pathname === "/") return
//   }, [router.pathname])

//   useEffect(() => setRender(true), [])

//   return render ? (
//     <div className="min-h-screen h-full">
//       <AuthProvider>
//         <Component {...pageProps} />
//       </AuthProvider>
//     </div>
//   ) : null
// }
// export default MyApp

import { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AuthProvider } from "@/contexts/auth"
import "../styles/globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (router.pathname === "/") return
  }, [router.pathname])

  useEffect(() => setRender(true), [])

  return render ? (
    <div className="min-h-screen h-full">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  ) : null
}
export default MyApp
