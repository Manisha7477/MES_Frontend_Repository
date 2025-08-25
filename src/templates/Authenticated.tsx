import { BrowserRouter } from "react-router-dom"
import AppRouter from "@/routes/AppRouter"
import Navbar from "@/navigation/Navbar"
import { AppConfig, UserNavigation } from "@/utils/AppConfig"
// import { SideBarMenu } from "@/navigation/SideBarMenu"
import SideBarMenu from "@/navigation/SideBarMenu"
import { IUser } from "@/utils/types"
import { useState } from "react"

interface IAuthenticatedProps {
  user: IUser
  meta: React.ReactNode
}

const Authenticated: React.FunctionComponent<IAuthenticatedProps> = ({
  user,
  meta,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClickMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <BrowserRouter>
      {meta}
      <div className="md:flex flex-col  min-h-screen w-full text-base-content">
        <Navbar
          user={user}
          siteName={AppConfig.siteName}
          userNavigation={UserNavigation}
          handleMenuStatus={handleClickMenu}
          isOpenMenu={isOpen}
        />
        <div className="w-full mt-4 sm:flexz">
          <div className="bg-base-100 z-40 w-50 sm:border-r-2 sm:border-primary fixed top-20 h-full overflow-y-auto">
            {isOpen && <SideBarMenu user={user} isOpenMenu={isOpen} />}

            {/* <SideBarMenu /> */}
          </div>
          <div
            className={`pl-2 overflow-x-auto ${
              isOpen ? "md:ml-52" : "sm-ml-0"
            }`}
          >
            <AppRouter isOpenMenu={isOpen} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Authenticated
// import { BrowserRouter } from "react-router-dom"
// import AppRouter from "@/routes/AppRouter"
// import Navbar from "@/navigation/Navbar"
// import { AppConfig, UserNavigation } from "@/utils/AppConfig"
// // import { SideBarMenu } from "@/navigation/SideBarMenu"
// import SideBarMenu from "@/navigation/SideBarMenu"
// import { IUser } from "@/utils/types"
// import { useState } from "react"

// interface IAuthenticatedProps {
//   user: IUser
//   meta: React.ReactNode
// }

// const Authenticated: React.FunctionComponent<IAuthenticatedProps> = ({
//   user,
//   meta,
// }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const handleClickMenu = () => {
//     setIsOpen(!isOpen)
//   }
//   return (
//     <BrowserRouter>
//       {meta}
//       <div className="md:flex flex-col  min-h-screen w-full text-base-content">
//       <Navbar
//           user={user}
//           siteName={AppConfig.siteName}
//           userNavigation={UserNavigation}
//           handleMenuStatus={handleClickMenu}
//           isOpenMenu={isOpen}
//         />
//         <div className="w-full mt-4 sm:flexz">
//           {/* <div className="bg-base-100 z-40 w-full sm:max-w-max sm:border-r-2 sm:border-primary sm:min-h-screen sm:relative fixed top-16"> */}
//           <div className="bg-base-100 z-40 w-50 sm:border-r-2 sm:border-primary fixed top-20 h-full overflow-y-auto">
//             {/* <div className="bg-base-100 z-40 w-full sm:max-w-max sm:border-r-2 sm:border-primary sm:min-h-screen sm:relative fixed top-16"> */}
//             <SideBarMenu user={user} isOpenMenu={isOpen} />

//             {/* <SideBarMenu /> */}
//           </div>
//           <div className="pl-2  md:ml-52 overflow-x-auto">
//             {/* <div className="px-2 lg:px-6 mt-20 mr-30 md:ml-40 xl:ml-50"> */}
//             {/* <div className="lg:pl-4"> */}
//             {/* <div className="flex-grow px-2 lg:px-6 mt-20 overflow-auto"> */}
//             {/* <AppRouter user={user} /> */}

//             <AppRouter />
//           </div>
//         </div>
//       </div>
//     </BrowserRouter>
//   )
// }

// export default Authenticated

// // import { BrowserRouter } from "react-router-dom"
// // import AppRouter from "@/routes/AppRouter"
// // import Navbar from "@/navigation/Navbar"
// // import { AppConfig, UserNavigation } from "@/utils/AppConfig"
// // import { SideBarMenu } from "@/navigation/SideBarMenu"
// // import { IUser } from "@/utils/types"
// // import { useState } from "react"

// // interface IAuthenticatedProps {
// //   user: IUser
// //   meta: React.ReactNode
// // }

// // const Authenticated: React.FunctionComponent<IAuthenticatedProps> = ({
// //   user,
// //   meta,
// // }) => {
// //   const [isOpen, setIsOpen] = useState(false)
// //   const handleClickMenu = () => {
// //     setIsOpen(!isOpen)
// //   }

// //   return (
// //     <BrowserRouter>
// //       {meta}
// //       <div className="flex flex-col min-h-screen w-full text-base-content">
// //         <Navbar
// //           user={user}
// //           siteName={AppConfig.siteName}
// //           userNavigation={UserNavigation}
// //           handleMenuStatus={handleClickMenu}
// //           isOpenMenu={isOpen}
// //         />
// //         <div className="w-full flex">
// //           {/* Sidebar */}
// //           <div className="bg-base-100 z-40 w-50 sm:border-r-2 sm:border-primary fixed top-16 h-full overflow-y-auto">
// //             {/* Sidebar remains scrollable */}
// //             <SideBarMenu user={user} isOpenMenu={isOpen} />
// //           </div>

// //           {/* Main Content */}
// //           {/* <div className="flex-grow px-2 lg:px-6 mt-20  overflow-y-auto"></div> */}
// //           <div className="  px-2 lg:px-6 mt-20 md:ml-40  overflow-y-auto">
// //             {/* <div className="flex-grow px-2 lg:px-6 mt-20 overflow-auto"> */}

// //             {/* Main content becomes scrollable */}
// //             <AppRouter user={user} />
// //           </div>
// //         </div>
// //       </div>
// //     </BrowserRouter>
// //   )
// // }

// // export default Authenticated
