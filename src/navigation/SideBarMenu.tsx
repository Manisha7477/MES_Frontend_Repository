//Chirag's Code


// import React, { useEffect, useState } from "react"
// import { Link, useLocation } from "react-router-dom"
// import axios from "axios"
// import { useAuth } from "@/contexts/auth"
// import { IMenu, ISubMenu } from "@/utils/types"
// import { HiOutlineTable } from "react-icons/hi"

// import {
//   MdDashboard,
//   MdFactory,
//   MdCategory,
//   MdOutlineWarehouse,
//   MdOutlineInventory2,
// } from "react-icons/md"

// const iconMap = {
//   MdDashboard,
//   MdFactory,
//   MdCategory,
//   MdOutlineWarehouse,
//   MdOutlineInventory2,
//   HiOutlineTable,
// }

// const getIconComponent = (iconName: string | number) => {
//   return iconMap[iconName as keyof typeof iconMap] || HiOutlineTable
// }

// const userHasAccess = (userRole: string, accessRole: string | string[]) => {
//   if (!accessRole) return true
//   if (Array.isArray(accessRole)) return accessRole.includes(userRole)
//   return userRole === accessRole
// }

// interface SideBarMenuProps {
//   isOpenMenu: boolean
// }

// const SideBarMenu: React.FC<SideBarMenuProps> = ({ isOpenMenu }) => {
//   const { pathname } = useLocation()
//   const { user } = useAuth()
//   const [menuData, setMenuData] = useState<IMenu[]>([])
//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})

//   useEffect(() => {
//     const fetchMenuData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/V2.0/Roles/Getpermissions`,
//           {
//             headers: {
//               Authorization: `Bearer ${user?.accessToken}`,
//             },
//           }
//         )

//         if (response.data.statusCode === "0000") {
//           const roleData = response.data.data.find(
//             (role: any) => role.roleName === user?.role
//           )

//           const detailedMenuData: IMenu[] =
//             roleData?.getMenuLists?.map((menuItem: any) => {
//               const subMenus: ISubMenu[] = menuItem.getSubMenuList?.map(
//                 (subItem: any) => ({
//                   subMenuId: subItem.subMenuId,
//                   subMenuName: subItem.subMenu,
//                   subMenuURL: subItem.subMenuURL || "",
//                   subMenuIcon: subItem.subMenuIcon || "",
//                 })
//               ) || []

//               return {
//                 menuId: menuItem.menuId,
//                 menuName: menuItem.menu,
//                 menuURL: menuItem.menuURL || "",
//                 menuIcon: menuItem.menuIcon || "",
//                 accessRole: menuItem.accessRole || user?.role || "admin",
//                 subMenus,
//               }
//             }) || []

//           setMenuData(detailedMenuData)
//         }
//       } catch (error) {
//         console.error("Error fetching menu data:", error)
//         setMenuData([])
//       }
//     }

//     fetchMenuData()
//   }, [user?.role])

//   const toggleMenu = (menuName: string) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [menuName]: !prev[menuName],
//     }))
//   }

//   const renderSubMenu = (subMenus: ISubMenu[]) =>
//     subMenus.map((subItem) => {
//       const SubIcon = getIconComponent(subItem.subMenuIcon)
//       return (
//         <li key={subItem.subMenuId}>
//           <Link
//             to={subItem.subMenuURL}
//             className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-base-200 ${pathname.includes(subItem.subMenuURL)
//                 ? "bg-primary text-white"
//                 : ""
//               }`}
//           >
//             <SubIcon />
//             {subItem.subMenuName}
//           </Link>
//         </li>
//       )
//     })

//   const renderMenu = () =>
//     menuData.map((menuItem) => {
//       if (!userHasAccess(user?.role || "", menuItem.accessRole)) return null

//       const MenuIcon = getIconComponent(menuItem.menuIcon)
//       const isActive = pathname.includes(menuItem.menuURL)

//       return (
//         <li key={menuItem.menuId} className="mb-1">
//           {menuItem.subMenus?.length > 0 ? (
//             <>
//               <div
//                 onClick={() => toggleMenu(menuItem.menuName)}
//                 className="flex items-center gap-2 px-4 py-2 cursor-pointer text-sm rounded-md hover:bg-base-200"
//               >
//                 <MenuIcon />
//                 {menuItem.menuName}
//               </div>
//               {openMenus[menuItem.menuName] && (
//                 <ul className="ml-4">{renderSubMenu(menuItem.subMenus)}</ul>
//               )}
//             </>
//           ) : (
//             <Link
//               to={menuItem.menuURL}
//               className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-base-200 ${isActive ? "bg-primary text-white" : ""
//                 }`}
//             >
//               <MenuIcon />
//               {menuItem.menuName}
//             </Link>
//           )}
//         </li>
//       )
//     })

//   return (
//     <aside className="w-full max-w-[250px] bg-base-100 shadow-md h-screen overflow-y-auto">
//       <ul className="menu p-2">{renderMenu()}</ul>
//     </aside>
//   )
// }

// export default SideBarMenu



///* Before 220825 change   *///

import React, { useEffect, useState } from "react"
import { classNames } from "@/utils/dom"
import { Link, useLocation } from "react-router-dom"
import {
  MdDashboard,
  MdAssuredWorkload,
  MdOutlineInventory2,
  MdOutlineWarehouse,
  MdOutlineProductionQuantityLimits,
  MdCategory,
  MdFactory,
  MdCorporateFare,
  MdInventory2,
  MdOutlineCategory,
  MdLocalShipping,
  MdOutlinePrecisionManufacturing,
  MdOutlineBusinessCenter,
  MdOutlineShoppingCart,
  MdAssignment,
  MdOutlineAssignmentInd,
  MdOutlineEngineering,
  MdOutlineLocationOn,
  MdSettingsInputComponent,
} from "react-icons/md"
import {
  HiUsers,
  HiOutlineTable,
  HiClipboardList,
  HiUserGroup,
} from "react-icons/hi"
import { TbBuildingFactory, TbBuildingFactory2 } from "react-icons/tb"
import { IMenu, ISubMenu, IUser } from "@/utils/types"
import { TiFlowChildren, TiPointOfInterest } from "react-icons/ti"
import { ImExit, ImEnter } from "react-icons/im"
import { BiBarcodeReader, BiMoveHorizontal, BiTransfer } from "react-icons/bi"
import {
  BsClockHistory,
  BsGearFill,
  BsPersonFillGear,
  BsShieldLock,
} from "react-icons/bs"
import {
  FaBoxOpen,
  FaSortNumericUp,
  FaTruckLoading,
  FaUsersCog,
  FaUserTie,
} from "react-icons/fa"
import { RiAccountPinCircleFill, RiLuggageDepositFill } from "react-icons/ri"
import { FaBusinessTime } from "react-icons/fa6"
import {
  MdOutlineSettingsInputComponent,
  MdPrecisionManufacturing,
} from "react-icons/md"
import axios from "axios"
import { useAuth } from "@/contexts/auth"
import nookies from "nookies"
import { SubMenu } from "./SubMenu"

const iconMap = {
  MdDashboard,
  MdAssuredWorkload,
  MdOutlineInventory2,
  MdOutlineWarehouse,
  MdOutlineProductionQuantityLimits,
  MdCategory,
  MdFactory,
  MdCorporateFare,
  MdInventory2,
  MdOutlineCategory,
  MdLocalShipping,
  MdOutlinePrecisionManufacturing,
  MdOutlineBusinessCenter,
  MdOutlineShoppingCart,
  MdAssignment,
  MdOutlineAssignmentInd,
  MdOutlineEngineering,
  MdOutlineLocationOn,
  HiUserGroup,
  HiUsers,
  HiClipboardList,
  TbBuildingFactory,
  TbBuildingFactory2,
  TiFlowChildren,
  TiPointOfInterest,
  ImExit,
  ImEnter,
  BiBarcodeReader,
  BiMoveHorizontal,
  BiTransfer,
  BsClockHistory,
  BsGearFill,
  BsPersonFillGear,
  BsShieldLock,
  FaBoxOpen,
  FaSortNumericUp,
  FaTruckLoading,
  FaUsersCog,
  FaUserTie,
  RiAccountPinCircleFill,
  RiLuggageDepositFill,
  FaBusinessTime,
  MdOutlineSettingsInputComponent,
  MdPrecisionManufacturing,
  MdSettingsInputComponent,
}

const getIconComponent = (iconName: string | number) => {
  return iconMap[iconName as keyof typeof iconMap] || null
}

interface SideBarMenuProps {
  user: IUser
  isOpenMenu: boolean
}

const userHasAccess = (userRole: string, accessRole: string) => {
  return accessRole.includes(userRole)
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ isOpenMenu }) => {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const menus = JSON.parse(nookies.get(null).menuDetails || "[]")
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
  const [menuData, setMenuData] = useState<IMenu[] | undefined>([])
  const [subMenuData, setSubMenuData] = useState<ISubMenu[] | undefined>([])

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/Roles/Getpermissions`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        )

        if (response.data.statusCode === "0000") {
          response.data.data.forEach(
            (role: { roleName?: string; getMenuLists?: any[] }) => {
              if (user?.role === role.roleName) {
                const { getMenuLists } = role

                interface subMenuInter {
                  subMenuId: number
                  subMenu: string
                  subMenuURL: string
                  subMenuIcon: string
                }

                const detailedMenuData: IMenu[] | undefined =
                  getMenuLists?.map((menuItem: any) => {
                    const subMenuData: ISubMenu[] =
                      menuItem.getSubMenuList?.map((subMenuItem: subMenuInter) => {
                        const { subMenuId, subMenu, subMenuURL, subMenuIcon } =
                          subMenuItem
                        return {
                          subMenuId,
                          subMenuName: subMenu,
                          subMenuURL: subMenuURL || "",
                          subMenuIcon: subMenuIcon || "",
                        }
                      }) || []

                    return {
                      menuId: menuItem.menuId,
                      menuName: menuItem.menu,
                      menuURL: menuItem.menuURL || "",
                      menuIcon: menuItem.menuIcon || "",
                      accessRole: user?.role || "admin",
                      subMenus: subMenuData,
                    }
                  })

                setMenuData(detailedMenuData)
                setSubMenuData(subMenuData)
              }
            },
          )
        }
      } catch (error) {
        console.error("Error fetching menu data", error)
        setMenuData([])
      }
    }

    fetchMenuData()
  }, [user?.role])

  const renderMenu = () => {
    return (
      menuData &&
      menuData.map((menuItem: IMenu) => {
        if (userHasAccess(user?.role || "", menuItem.accessRole)) {
          const MenuIconComponent = getIconComponent(menuItem.menuIcon)
          return (
            <li className="mb-2" key={menuItem.menuId}>
              {menuItem?.subMenus?.length > 0 ? (
                <details open={!!openMenus[menuItem?.menuName]}>
                  <summary className="p-2 flex items-center gap-2 cursor-pointer">
                    {MenuIconComponent ? (
                      <MenuIconComponent />
                    ) : (
                      <HiOutlineTable />
                    )}
                    {menuItem?.menuName}
                  </summary>
                  <ul className="menu p-0 relative">
                    {renderSubMenu(menuItem?.subMenus)}
                  </ul>
                </details>
              ) : (
                <Link
                  to={menuItem.menuURL}
                  className={classNames(
                    "flex gap-1 items-center min-w-[12vw] text-sm hover:bg-base-200 rounded-lg px-2 py-2",
                    pathname.includes(menuItem.menuURL)
                      ? "text-base-100 bg-primary rounded-lg"
                      : "hover:text-primary",
                  )}
                >
                  {MenuIconComponent ? (
                    <MenuIconComponent />
                  ) : (
                    <HiOutlineTable />
                  )}
                  {menuItem.menuName}
                </Link>
              )}
            </li>
          )
        }
        return null
      })
    )
  }

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menuName]: !prevOpenMenus[menuName],
    }))
  }

  const renderSubMenu = (subMenus: ISubMenu[]) => {
    return (
      subMenus &&
      subMenus.map((subItem) => {
        const SubMenuIconComponent = getIconComponent(subItem.subMenuIcon)

        return (
          <li className="mb-1" key={subItem.subMenuId}>
            <Link
              to={subItem.subMenuURL}
              className={classNames(
                "flex gap-1 items-center text-sm hover:bg-base-200 rounded-lg px-2 py-2",
                pathname.includes(subItem.subMenuURL)
                  ? "text-base-100 bg-primary rounded-lg"
                  : "hover:text-primary",
              )}
            >
              {SubMenuIconComponent ? (
                <SubMenuIconComponent />
              ) : (
                <HiOutlineTable />
              )}
              {subItem.subMenuName}
            </Link>
          </li>
        )
      })
    )
  }

  return (
    <div
      className={classNames(
        "drawer sm:drawer-open z-50 max-screen-height-media",
        isOpenMenu ? "drawer-open" : "",
      )}
    >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div>
          	<ul
            className={classNames(
              "mt-2 p-0 sm:block menu overflow-y-auto",          //
              isOpenMenu ? "block" : "hidden",
            )}
            style={{ maxHeight: "calc(100vh - 4rem)" }}         //
          >
            {renderMenu()}
          </ul>

        </div>
      </div>
    </div>
  )
}

export default SideBarMenu






// import React, { useEffect, useState } from "react"
// import { classNames } from "@/utils/dom"
// import { Link, useLocation } from "react-router-dom"
// import {
//   MdDashboard,
//   MdAssuredWorkload,
//   MdOutlineInventory2,
//   MdOutlineWarehouse,
//   MdOutlineProductionQuantityLimits,
//   MdCategory,
//   MdFactory,
//   MdCorporateFare,
//   MdInventory2,
//   MdOutlineCategory,
//   MdLocalShipping,
//   MdOutlinePrecisionManufacturing,
//   MdOutlineBusinessCenter,
//   MdOutlineShoppingCart,
//   MdAssignment,
//   MdOutlineAssignmentInd,
//   MdOutlineEngineering,
//   MdOutlineLocationOn,
//   MdSettingsInputComponent,
// } from "react-icons/md"
// import {
//   HiUsers,
//   HiOutlineTable,
//   HiClipboardList,
//   HiUserGroup,
// } from "react-icons/hi"
// import { TbBuildingFactory, TbBuildingFactory2 } from "react-icons/tb"
// import { IMenu, ISubMenu, IUser } from "@/utils/types"
// import { TiFlowChildren, TiPointOfInterest } from "react-icons/ti"
// import { ImExit, ImEnter } from "react-icons/im"
// import { BiBarcodeReader, BiMoveHorizontal, BiTransfer } from "react-icons/bi"
// import {
//   BsClockHistory,
//   BsGearFill,
//   BsPersonFillGear,
//   BsShieldLock,
// } from "react-icons/bs"
// import {
//   FaBoxOpen,
//   FaSortNumericUp,
//   FaTruckLoading,
//   FaUsersCog,
//   FaUserTie,
// } from "react-icons/fa"
// import { RiAccountPinCircleFill, RiLuggageDepositFill } from "react-icons/ri"
// import { FaBusinessTime } from "react-icons/fa6"
// import {
//   MdOutlineSettingsInputComponent,
//   MdPrecisionManufacturing,
// } from "react-icons/md"
// import axios from "axios"
// import { useAuth } from "@/contexts/auth"
// import nookies from "nookies"
// import { array, number, string } from "yup"
// import { SubMenu } from "./SubMenu"

// // interface MenuItem {
// //   name: string
// //   href?: string
// //   icon: React.ReactNode
// //   accessRole: string[]
// //   subMenu?: MenuItem[]
// // }

// const iconMap = {
//   MdDashboard,
//   MdAssuredWorkload,
//   MdOutlineInventory2,
//   MdOutlineWarehouse,
//   MdOutlineProductionQuantityLimits,
//   MdCategory,
//   MdFactory,
//   MdCorporateFare,
//   MdInventory2,
//   MdOutlineCategory,
//   MdLocalShipping,
//   MdOutlinePrecisionManufacturing,
//   MdOutlineBusinessCenter,
//   MdOutlineShoppingCart,
//   MdAssignment,
//   MdOutlineAssignmentInd,
//   MdOutlineEngineering,
//   MdOutlineLocationOn,
//   HiUserGroup,
//   HiUsers,
//   HiClipboardList,
//   TbBuildingFactory,
//   TbBuildingFactory2,
//   TiFlowChildren,
//   TiPointOfInterest,
//   ImExit,
//   ImEnter,
//   BiBarcodeReader,
//   BiMoveHorizontal,
//   BiTransfer,
//   BsClockHistory,
//   BsGearFill,
//   BsPersonFillGear,
//   BsShieldLock,
//   FaBoxOpen,
//   FaSortNumericUp,
//   FaTruckLoading,
//   FaUsersCog,
//   FaUserTie,
//   RiAccountPinCircleFill,
//   RiLuggageDepositFill,
//   FaBusinessTime,
//   MdOutlineSettingsInputComponent,
//   MdPrecisionManufacturing,
//   MdSettingsInputComponent,
// }

// const getIconComponent = (iconName: string | number) => {
//   return iconMap[iconName as keyof typeof iconMap] || null
// }

// interface SideBarMenuProps {
//   user: IUser
//   isOpenMenu: boolean
// }

// const userHasAccess = (userRole: string, accessRole: string) => {
//   return accessRole.includes(userRole)
// }

// const SideBarMenu: React.FC<SideBarMenuProps> = ({
//   // user,
//   isOpenMenu,
// }) => {
//   const { pathname } = useLocation()
//   const { user, loading } = useAuth()
//   // console.log("user.role from sidebar:", user?.role)
//   const menus = JSON.parse(nookies.get(null).menuDetails || "[]")
//   // console.log("Menus from SideBarMenu file: ", menus)
//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
//   const [menuData, setMenuData] = useState<IMenu[] | undefined>([])
//   const [subMenuData, setSubMenuData] = useState<ISubMenu[] | undefined>([])
//   // Fetch menu data from API
//   useEffect(() => {
//     const fetchMenuData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/V2.0/Roles/Getpermissions`,
//           {
//             headers: {
//               Authorization: `Bearer ${user?.accessToken}`,
//             },
//           },
//         )
//         if (response.data.StatusCode === "0000") {
//           // console.log("response")
//           // console.log("Role:", response.data.Data.RoleName)
//           response.data.Data.forEach(
//             (role: { RoleName?: string; GetMenuLists?: string[] }) => {
//               if (user?.role === role.RoleName) {
//                 // console.log("Role: ", role.RoleName);
//                 const { GetMenuLists } = role
//                 // console.log("GetMenuLists: ", GetMenuLists)
//                 interface subMenuInter {
//                   SubMenuId: number
//                   SubMenu: string
//                   SubMenuURL: string
//                   SubMenuIcon: string
//                 }
//                 interface temp {
//                   MenuId: number
//                   Menu: string
//                   MenuURL: string
//                   MenuIcon: string
//                   GetSubMenuList: subMenuInter[]
//                 }
//                 const detailedMenuData: IMenu[] | undefined = GetMenuLists?.map(
//                   (menuItem: any) => {
//                     const subMenuData: ISubMenu[] =
//                       menuItem.GetSubMenuList?.map((subMenuItem: any) => {
//                         const { SubMenuId, SubMenu, SubMenuURL, SubMenuIcon } =
//                           subMenuItem
//                         return {
//                           subMenuId: SubMenuId,
//                           subMenuName: SubMenu,
//                           subMenuURL: SubMenuURL || "",
//                           subMenuIcon: SubMenuIcon || "",
//                         }
//                       }) || []
//                     // console.log("subMenuData: ", subMenuData)
//                     return {
//                       menuId: menuItem.MenuId,
//                       menuName: menuItem.Menu,
//                       menuURL: menuItem.MenuURL || "",
//                       menuIcon: menuItem.MenuIcon || "",
//                       accessRole: user?.role || "admin",
//                       subMenus: subMenuData,
//                     }
//                   },
//                 )
//                 setMenuData(detailedMenuData)
//                 setSubMenuData(subMenuData)
//               }
//             },
//           )
//         }
//       } catch (error) {
//         console.error("Error fetching menu data", error)
//         setMenuData([])
//       }
//     }

//     fetchMenuData()
//   }, [user?.role])

//   const renderMenu = () => {
//     return (
//       menuData &&
//       menuData.map((menuItem: IMenu) => {
//         if (userHasAccess(user?.role || "", menuItem.accessRole)) {
//           // console.log("menu isopen or not: ", openMenus[menuItem?.menuName])
//           // console.log("menu -> submenu: ", menuItem.subMenus)
//           const MenuIconComponent = getIconComponent(menuItem.menuIcon)
//           return (
//             <li className="mb-2" key={menuItem.menuId}>
//               {menuItem?.subMenus?.length > 0 ? (
//                 <details open={!!openMenus[menuItem?.menuName]}>
//                   <summary
//                     className="p-2 flex items-center gap-2 cursor-pointer"
//                     // onClick={() => toggleMenu(menuItem.menuName)}
//                   >
//                     {MenuIconComponent ? (
//                       <MenuIconComponent />
//                     ) : (
//                       <HiOutlineTable />
//                     )}
//                     {menuItem?.menuName}
//                   </summary>
//                   <ul className="menu p-0 relative">
//                     {renderSubMenu(menuItem?.subMenus)}
//                   </ul>
//                 </details>
//               ) : (
//                 <Link
//                   to={menuItem.menuURL}
//                   className={classNames(
//                     "flex gap-1 items-center min-w-[12vw] text-sm hover:bg-base-200 rounded-lg px-2 py-2",
//                     pathname.includes(menuItem.menuURL)
//                       ? "text-base-100 bg-primary rounded-lg"
//                       : "hover:text-primary",
//                   )}
//                 >
//                   {MenuIconComponent ? (
//                     <MenuIconComponent />
//                   ) : (
//                     <HiOutlineTable />
//                   )}
//                   {menuItem.menuName}
//                 </Link>
//               )}
//             </li>
//           )
//         }
//         return null
//       })
//     )
//   }

//   const toggleMenu = (menuName: string) => {
//     setOpenMenus((prevOpenMenus) => ({
//       ...prevOpenMenus,
//       [menuName]: !prevOpenMenus[menuName],
//     }))
//   }

//   const renderSubMenu = (subMenus: ISubMenu[]) => {
//     // console.log("submenu in rendersubmenu", subMenus)
//     return (
//       subMenus &&
//       subMenus.map((subItem) => {
//         // console.log("subMenu:",subItem.subMenuName)
//         const SubMenuIconComponent = getIconComponent(subItem.subMenuIcon)

//         return (
//           <li className="mb-1" key={subItem.subMenuId}>
//             <Link
//               to={subItem.subMenuURL}
//               className={classNames(
//                 "flex gap-1 items-center text-sm hover:bg-base-200 rounded-lg px-2 py-2",
//                 pathname.includes(subItem.subMenuURL)
//                   ? "text-base-100 bg-primary rounded-lg"
//                   : "hover:text-primary",
//               )}
//             >
//               {SubMenuIconComponent ? (
//                 <SubMenuIconComponent />
//               ) : (
//                 <HiOutlineTable />
//               )}
//               {subItem.subMenuName}
//             </Link>
//           </li>
//         )
//       })
//     )
//   }

//   return (
//     <div
//       className={classNames(
//         "drawer sm:drawer-open z-50 max-screen-height-media",
//         isOpenMenu ? "drawer-open" : "",
//       )}
//     >
//       <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-side">
//         <label
//           htmlFor="my-drawer"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <div>
//           <ul
//             className={classNames(
//               "min-h-full mt-2 p-0 sm:block menu",
//               isOpenMenu ? "block" : "hidden",
//             )}
//           >
//             {renderMenu()}
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SideBarMenu
