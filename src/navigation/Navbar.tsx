import { AppConfig } from "@/utils/AppConfig"
import { INavigationItem, IUser } from "@/utils/types"
import { Link } from "react-router-dom"
import { HiMenu, HiX, HiBell } from "react-icons/hi"

interface INavbarProps {
  user: IUser
  siteName: string
  userNavigation: INavigationItem[]
  handleMenuStatus: Function
  isOpenMenu: boolean
}

const Navbar: React.FunctionComponent<INavbarProps> = ({
  user,
  siteName,
  userNavigation,
  handleMenuStatus,
  isOpenMenu,
}) => {
  // const userFirstLetterMatch = user.firstName.match(/\b(\w)/g)

  const userFirstLetterMatch = user.firstName
    ? user.firstName.match(/\b(\w)/g)
    : []
  const userFirstLetter = userFirstLetterMatch?.join("")

  const handleClickMenu = () => {
    handleMenuStatus()
  }
  const userNavigateRender = () =>
    userNavigation.map((menuItem) => {
      return (
        <li key={menuItem.name}>
          <Link to={menuItem.href} className="justify-between">
            {menuItem.name}
            {/*<span className="badge badge-primary">New</span>*/}
          </Link>
        </li>
      )
    })

  const notificationItems = [
    "Notification 1",
    "Notification 2",
    "Notification 3",
  ]

  return (
    // <div className="navbar fixed w-full z-50 sm:px-8 flex justify-between bg-base-100 shadow-sm ">
    <div className="navbar fixed w-full z-50 sm:px-8 shadow-md flex justify-between bg-primary">
      <div className="flex-none">
        <button
          // className=" btn btn-square btn-sm btn-outline bg-primary hover:bg-primary"
          className=" btn btn-square btn-sm btn-outline text-neutral-100"
          onClick={handleClickMenu}
        >
          {isOpenMenu ? (
            <HiX className="w-4 h-4 " />
          ) : (
            <HiMenu className="w-4 h-4 " />
          )}
        </button>

        <div className="ml-10 hidden md:block">
          <Link to="/">
            <img src={AppConfig.logoPath} alt="Logo" className="w-72 h-16" />
          </Link>
        </div>
      </div>
      {/* <h1 className="text-sm sm:text-2xl text-neutral-50 align-left sm:align-center font-bold">
        {siteName}
      </h1> */}

      <div className="flex justify-between items-center gap-x-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <HiBell className="w-6 h-6 text-warning" />
              <span className="badge badge-sm indicator-item">
                {notificationItems.length}
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
           className="mt-3 z-[1] p-6 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 top-6 r-0 text-xl "
          >
            {notificationItems.map((item) => {
              return (
                <li key={item}>
                  <a>{item}</a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="flex items-center cursor-pointer">
            <div className="avatar placeholder">
              <div className="bg-primary-focus text-base-100 rounded-full w-6 sm:w-8">
                {user.photoUrl ? (
                  <img
                    className="rounded-full w-4 h-4 sm:w-9 sm:h-9"
                    src={user.photoUrl}
                    alt="User"
                  />
                ) : (
                  <span className="text-xl">{userFirstLetter}</span>
                )}
              </div>
            </div>
            <div className="ml-2 pt-0.5 text-sm text-neutral-100">{`${user.firstName} ${user.lastName}`}</div>
          </div>

          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 top-6 r-0"
          >
            {userNavigateRender()}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

// // import { AppConfig } from "@/utils/AppConfig"
// // import { INavigationItem, IUser } from "@/utils/types"
// // import { Link } from "react-router-dom"
// // import { HiMenu, HiX, HiBell } from "react-icons/hi"

// // interface INavbarProps {
// //   user: IUser
// //   siteName: string
// //   userNavigation: INavigationItem[]
// //   handleMenuStatus: Function
// //   isOpenMenu: boolean
// // }

// // const Navbar: React.FunctionComponent<INavbarProps> = ({
// //   user,
// //   siteName,
// //   userNavigation,
// //   handleMenuStatus,
// //   isOpenMenu,
// // }) => {
// //   // const userFirstLetterMatch = user.firstName.match(/\b(\w)/g)

// //   const userFirstLetterMatch = user.firstName ? user.firstName.match(/\b(\w)/g) : [];
// //   const userFirstLetter = userFirstLetterMatch?.join("")

// //   const handleClickMenu = () => {
// //     handleMenuStatus()
// //   }
// //   const userNavigateRender = () =>
// //     userNavigation.map((menuItem) => {
// //       return (
// //         <li key={menuItem.name}>
// //           <Link to={menuItem.href} className="justify-between">
// //             {menuItem.name}
// //             <span className="badge badge-primary">New</span>
// //           </Link>
// //         </li>
// //       )
// //     })

// //   const notificationItems = [
// //     "Notification 1",
// //     "Notification 2",
// //     "Notification 3",
// //   ]

// //   return (
// //     <div className="navbar fixed w-full z-50 sm:px-8 shadow-md flex justify-between bg-primary">
// //       <div className="flex-none md:hidden">
// //         <button
// //           className="md:hidden btn btn-square btn-sm btn-outline text-base-100 hover:bg-primary"
// //           onClick={handleClickMenu}
// //         >
// //           {isOpenMenu ? (
// //             <HiX className="w-4 h-4"/>
// //           ) : (
// //             <HiMenu className="w-4 h-4"/>
// //           )}
// //         </button>
// //       </div>
// //       <div className="flex hidden sm:block">
// //         <Link to="/">
// //           <img src={AppConfig.logoPath} alt="Logo" className="w-52 h-10" />
// //         </Link>
// //       </div>

// //       <h1 className="text-sm sm:text-2xl text-neutral-50 align-left sm:align-center font-bold">
// //         {siteName}
// //       </h1>

// //       <div className="flex justify-between items-center gap-x-2">
// //         <div className="dropdown dropdown-end">
// //           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
// //             <div className="indicator">
// //               <HiBell className="w-6 h-6 text-warning" />
// //               <span className="badge badge-sm indicator-item">
// //                 {notificationItems.length}
// //               </span>
// //             </div>
// //           </div>
// //           <ul
// //             tabIndex={0}
// //             className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 top-8"
// //           >
// //             {notificationItems.map((item) => {
// //               return (
// //                 <li key={item}>
// //                   <a>{item}</a>
// //                 </li>
// //               )
// //             })}
// //           </ul>
// //         </div>

// //         <div className="dropdown dropdown-end">
// //           <div tabIndex={0} className="flex items-center cursor-pointer">
// //             <div className="avatar placeholder">
// //               <div className="bg-primary-focus text-base-100 rounded-full w-6 sm:w-8">
// //                 {user.photoUrl ? (
// //                   <img
// //                     className="rounded-full w-4 h-4 sm:w-9 sm:h-9"
// //                     src={user.photoUrl}
// //                     alt="User"
// //                   />
// //                 ) : (
// //                   <span className="text-xl">{userFirstLetter}</span>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="ml-2 pt-0.5 text-neutral-50 text-sm">{`${user.firstName} ${user.lastName}`}</div>
// //           </div>

// //           <ul
// //             tabIndex={0}
// //             className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 top-6 r-0"
// //           >
// //             {userNavigateRender()}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Navbar

// import { AppConfig } from "@/utils/AppConfig"
// import { INavigationItem, IUser } from "@/utils/types"
// import { Link } from "react-router-dom"
// import { HiMenu, HiX, HiBell } from "react-icons/hi"

// interface INavbarProps {
//   user: IUser
//   siteName: string
//   userNavigation: INavigationItem[]
//   handleMenuStatus: Function
//   isOpenMenu: boolean
// }

// const Navbar: React.FunctionComponent<INavbarProps> = ({
//   user,
//   siteName,
//   userNavigation,
//   handleMenuStatus,
//   isOpenMenu,
// }) => {
//   // const userFirstLetterMatch = user.firstName.match(/\b(\w)/g)

//   const userFirstLetterMatch = user.firstName ? user.firstName.match(/\b(\w)/g) : [];
//   const userFirstLetter = userFirstLetterMatch?.join("")

//   const handleClickMenu = () => {
//     handleMenuStatus()
//   }
//   const userNavigateRender = () =>
//     userNavigation.map((menuItem) => {
//       return (
//         <li key={menuItem.name}>
//           <Link to={menuItem.href} className="justify-between">
//             {menuItem.name}
//             <span className="badge badge-primary">New</span>
//           </Link>
//         </li>
//       )
//     })

//   const notificationItems = [
//     "Notification 1",
//     "Notification 2",
//     "Notification 3",
//   ]

//   return (
//     <div className="navbar fixed w-full z-50 sm:px-8 flex justify-between bg-base-100 shadow-sm ">
//       <div className="flex-none md:hidden">
//         <button
//           className="md:hidden btn btn-square btn-sm btn-outline text-base-100 hover:bg-primary"
//           onClick={handleClickMenu}
//         >
//           {isOpenMenu ? (
//             <HiX className="w-4 h-4"/>
//           ) : (
//             <HiMenu className="w-4 h-4"/>
//           )}
//         </button>
//       </div>
//       <div className="flex hidden sm:block">
//         <Link to="/">
//           <img src={AppConfig.logoPath} alt="Logo" className="w-52 h-16" />
//         </Link>
//       </div>

//       {/* <h1 className="text-sm sm:text-2xl text-neutral-50 align-left sm:align-center font-bold">
//         {siteName}
//       </h1> */}

//       <div className="flex justify-between items-center gap-x-2">
//         <div className="dropdown dropdown-end">
//           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
//             <div className="indicator">
//               <HiBell className="w-6 h-6 text-warning" />
//               <span className="badge badge-sm indicator-item">
//                 {notificationItems.length}
//               </span>
//             </div>
//           </div>
//           <ul
//             tabIndex={0}
//             className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 top-8"
//           >
//             {notificationItems.map((item) => {
//               return (
//                 <li key={item}>
//                   <a>{item}</a>
//                 </li>
//               )
//             })}
//           </ul>
//         </div>

//         <div className="dropdown dropdown-end">
//           <div tabIndex={0} className="flex items-center cursor-pointer">
//             <div className="avatar placeholder">
//               <div className="bg-primary-focus text-base-100 rounded-full w-6 sm:w-8">
//                 {user.photoUrl ? (
//                   <img
//                     className="rounded-full w-4 h-4 sm:w-9 sm:h-9"
//                     src={user.photoUrl}
//                     alt="User"
//                   />
//                 ) : (
//                   <span className="text-xl">{userFirstLetter}</span>
//                 )}
//               </div>
//             </div>
//             <div className="ml-2 pt-0.5  text-sm">{`${user.firstName} ${user.lastName}`}</div>
//           </div>

//           <ul
//             tabIndex={0}
//             className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 top-6 r-0"
//           >
//             {userNavigateRender()}
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar
