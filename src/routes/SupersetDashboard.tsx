import React, { useEffect } from "react"
import axios from "axios"
import { embedDashboard } from "@superset-ui/embedded-sdk"

const SupersetDashboard: React.FunctionComponent = () => {
  const SUPSERSET_BASE_URL = "https://122.166.153.170:8443"
  const SECURITY_API_URL = `${SUPSERSET_BASE_URL}/api/v1/security`
  const DASHBOARD_ID = "33662e46-edef-43a6-9460-e50390c24404"

  const loginToSuperset = async () => {
    const loginPayload = {
      password: "pa55w0rd1",
      provider: "db",
      refresh: true,
      username: "ubuntu_user",
    }

    try {
      const response = await axios.post(
        `${SECURITY_API_URL}/login`,
        loginPayload,
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      return response.data.access_token
    } catch (error) {
      console.error("Failed to login to Superset:", error)
      throw new Error("Login failed")
    }
  }

  const fetchGuestToken = async (accessToken: string) => {
    const guestTokenPayload = {
      resources: [{ type: "dashboard", id: DASHBOARD_ID }],
      rls: [],
      user: {
        username: "lumbini123",
        first_name: "lumbini",
        last_name: "elite",
      },
      subject: "lumbini123",
    }

    try {
      const response = await axios.post(
        `${SECURITY_API_URL}/guest_token/`,
        guestTokenPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return response.data.token
    } catch (error) {
      console.error("Failed to fetch guest token:", error)
      throw new Error("Guest token retrieval failed")
    }
  }

  const initializeDashboard = async () => {
    try {
      const accessToken = await loginToSuperset()
      const guestToken = await fetchGuestToken(accessToken)

      embedDashboard({
        id: DASHBOARD_ID,
        supersetDomain: SUPSERSET_BASE_URL,
        mountPoint: document.getElementById(
          "superset-container",
        ) as HTMLElement,
        fetchGuestToken: () => guestToken,
        dashboardUiConfig: { hideTitle: true },
      })

      adjustIframeStyles()
    } catch (error) {
      console.error("Error initializing Superset dashboard:", error)
    }
  }

  const adjustIframeStyles = () => {
    const iframe = document.querySelector("iframe")
    if (iframe) {
      iframe.style.width = "100%"
      iframe.style.minHeight = "100vh"
    }
  }

  useEffect(() => {
    initializeDashboard()
  }, [])

  return (
    <div className="w-full">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          Superset Dashboard
        </div>
        <div id="superset-container" className="p-4"></div>
      </div>
    </div>
  )
}

export default SupersetDashboard

// import React, { useEffect } from "react"
// import axios from "axios"
// import { embedDashboard } from "@superset-ui/embedded-sdk"

// interface ISupersetDashboardProps {}

// const SupersetDashboard: React.FunctionComponent<
//   ISupersetDashboardProps
// > = () => {
//   const supersetUrl = "http://122.166.153.170:8088"
//   const supersetApiUrl = `${supersetUrl}/api/v1/security`
//   const dashboardId = "33662e46-edef-43a6-9460-e50390c24404"

//   const getTokenAndEmbedDashboard = async () => {
//     try {
//       // Login to get access token
//       const loginBody = {
//         password: "pa55w0rd1",
//         provider: "db",
//         refresh: true,
//         username: "ubuntu_user",
//       }
//       const loginHeaders = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//       const loginResponse = await axios.post(
//         `${supersetApiUrl}/login`,
//         loginBody,
//         loginHeaders,
//       )
//       const accessToken = loginResponse.data.access_token

//       // Generate guest token
//       const guestTokenBody = {
//         resources: [{ type: "dashboard", id: dashboardId }],
//         rls: [],
//         user: {
//           username: "lumbini123",
//           first_name: "lumbini",
//           last_name: "elite",
//         },
//         subject: "lumbini123", // Add this line
//       }
//       const guestTokenHeaders = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }

//       const guestTokenResponse = await axios.post(
//         `${supersetApiUrl}/guest_token/`,
//         guestTokenBody,
//         guestTokenHeaders,
//       )
//       const guestToken = guestTokenResponse.data.token
//       console.log("Gueast token comign is ", guestToken)

//       // Embed the dashboard
//       embedDashboard({
//         id: dashboardId,
//         supersetDomain: supersetUrl,
//         mountPoint: document.getElementById(
//           "superset-container",
//         ) as HTMLElement,
//         fetchGuestToken: () => guestToken,
//         dashboardUiConfig: { hideTitle: true },
//       })

//       // Adjust iframe styles
//       const iframe = document.querySelector("iframe")
//       if (iframe) {
//         iframe.style.width = "100%"
//         iframe.style.minHeight = "100vh"
//       }
//     } catch (error) {
//       console.error("Error embedding Superset dashboard:", error)
//     }
//   }

//   useEffect(() => {
//     getTokenAndEmbedDashboard()
//   }, [])

//   return (
//     <div className="w-full">
//       <div className="border rounded border-base-300">
//         <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
//           Superset Dashboard
//         </div>
//         <div id="superset-container" className="p-4"></div>
//       </div>
//     </div>
//   )
// }

// export default SupersetDashboard
