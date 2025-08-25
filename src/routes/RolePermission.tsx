import React, { useState, useEffect } from "react"
import axios from "axios"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import nookies from "nookies"
import { userStore } from "@/store"

interface SubMenu {
  subMenuId: number
  subMenuName: string
}

interface Menu {
  menuId: number
  menuName: string
  subMenus: SubMenu[]
}

interface RolePermissions {
  [roleName: string]: {
    [permission: string]: boolean
  }
}

interface RolePermissionsModel {
  RoleId: number
  MenuList: {
    MenuId: number
    IsSelected?: boolean
    SubMenuLists: {
      SubMenuId: number
      IsSelected: boolean
    }[]
  }[]
}

interface Roles {
  [roleName: string]: number
}

const RolePermission: React.FC = () => {
  const [availablePermissions, setAvailablePermissions] = useState<Menu[]>([])
  const [checkedPermissions, setCheckedPermissions] = useState<RolePermissions>(
    {},
  )
  const [modifiedPermissions, setModifiedPermissions] =
    useState<RolePermissions>({})
  const [expandedMenus, setExpandedMenus] = useState<{
    [menuId: number]: boolean
  }>({})

  const token = nookies.get(null).accessToken || ""

  useEffect(() => {
    fetchRolesData()
    fetchPermissionsData()
  }, [])

  const fetchRolesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/Menu`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data.statusCode === "0000") {
        const rolesData: Menu[] = response.data.data.map((menu: any) => ({
          menuId: menu.menuId,
          menuName: menu.menu,
          subMenus: menu.subMenuList.map((subMenu: any) => ({
            subMenuId: subMenu.subMenuId,
            subMenuName: subMenu.subMenu,
          })),
        }))
        setAvailablePermissions(rolesData)
      } else {
        console.error("Failed to fetch roles data.")
      }
    } catch (error) {
      console.error("Error fetching roles data: ", error)
    }
  }

  // const fetchPermissionsData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/Roles/Getpermissions`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     if (response.data.statusCode === "0000") {
  //       const permissions: RolePermissions = {}
  //       //const rolesData = response.data.data || [] 
  //       response.data.data.forEach((role: any) => {
  //         permissions[role.roleName] = {}
  //         role.GetMenuLists.forEach((menu: any) => {
  //           permissions[role.roleName][menu.Menu] = true
  //           menu.getSubMenuList.forEach((subMenu: any) => {
  //             permissions[role.roleName][subMenu.subMenu] = true
  //           })
  //         })
  //       })
  //       setCheckedPermissions(permissions)
  //     } else {
  //       console.error("Failed to fetch permissions data.")
  //     }
  //   } catch (error) {
  //     console.error("Error fetching permissions data: ", error)
  //   }
  // }

  const fetchPermissionsData = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/Roles/Getpermissions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.data.statusCode === "0000") {
      const permissions: RolePermissions = {}
      const rolesData = response.data.data

      rolesData.forEach((role: any) => {
        permissions[role.roleName] = {}

        ;(role.GetMenuLists || []).forEach((menu: any) => {
          permissions[role.roleName][menu.Menu] = true
          ;(menu.getSubMenuList || []).forEach((subMenu: any) => {
            permissions[role.roleName][subMenu.subMenu] = true
          })
        })
      })

      setCheckedPermissions(permissions)
    } else {
      console.error(
        "Failed to fetch permissions data:",
        response.data.statusMessage,
      )
    }
  } catch (error) {
    console.error("Error fetching permissions data: ", error)
  }
}


  const toggleMenu = (menuId: number) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }))
  }

  const toggleMainAndSubMenu = (
    roleName: string,
    menuName: string,
    isSelected: boolean,
  ) => {
    setModifiedPermissions((prevState) => {
      const updatedRolePermissions = { ...prevState[roleName] }

      updatedRolePermissions[menuName] = isSelected

      const menu = availablePermissions.find((m) => m.menuName === menuName)
      if (menu) {
        menu.subMenus.forEach((subMenu) => {
          updatedRolePermissions[subMenu.subMenuName] = isSelected
        })
      }

      return {
        ...prevState,
        [roleName]: updatedRolePermissions,
      }
    })
  }

  const handleCheckboxChange = (
    roleName: string,
    permission: string,
    isMainMenu: boolean,
  ) => {
    const isCurrentlyChecked = isChecked(roleName, permission)

    if (isMainMenu) {
      toggleMainAndSubMenu(roleName, permission, !isCurrentlyChecked)
    } else {
      setModifiedPermissions((prevState) => {
        const updatedRolePermissions = {
          ...prevState[roleName],
          [permission]: !isCurrentlyChecked,
        }

        const menu = availablePermissions.find((m) =>
          m.subMenus.some((sub) => sub.subMenuName === permission),
        )

        if (menu) {
          const isAnySubmenuSelected = menu.subMenus.some(
            (sub) => updatedRolePermissions[sub.subMenuName],
          )

          updatedRolePermissions[menu.menuName] = isAnySubmenuSelected
        }

        return {
          ...prevState,
          [roleName]: updatedRolePermissions,
        }
      })
    }
  }

  const newUpdatedRoles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/Roles/Getpermissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      localStorage.setItem(
        "updatedRolePermissions",
        JSON.stringify(response.data.Data),
      )
      console.log("updatedRoles:", response.data.data)
    } catch (error) {
      alert("error in new updated roles")
    }
  }

  const isChecked = (roleName: string, permission: string) => {
    if (
      modifiedPermissions[roleName] &&
      modifiedPermissions[roleName][permission] !== undefined
    ) {
      return modifiedPermissions[roleName][permission]
    }
    return (
      checkedPermissions[roleName] && checkedPermissions[roleName][permission]
    )
  }

  const handleSave = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to save these changes?",
    )
    if (!confirmation) {
      return
    }

    const rolePermissionsModel: RolePermissionsModel[] = []
    const roles: Roles = { Manager: 1, Supervisor: 2, Operator: 3 }

    Object.keys(checkedPermissions).forEach((roleName) => {
      const menuList = availablePermissions
        .map((menu) => {
          const isMenuSelected = isChecked(roleName, menu.menuName)
          const subMenuLists = menu.subMenus
            .map((subMenu) => ({
              SubMenuId: subMenu.subMenuId,
              IsSelected: isChecked(roleName, subMenu.subMenuName),
            }))
            .filter(
              (subMenu) =>
                subMenu.IsSelected === true || subMenu.IsSelected === false,
            )

          if (isMenuSelected || subMenuLists.length > 0) {
            return {
              MenuId: menu.menuId,
              IsSelected: isMenuSelected || undefined,
              SubMenuLists: subMenuLists,
            }
          }
          return null
        })
        .filter((menu) => menu !== null)

      if (menuList.length > 0) {
        rolePermissionsModel.push({
          RoleId: roles[roleName],
          MenuList: menuList as RolePermissionsModel["MenuList"],
        })
      }
    })

    const body = { RolePermissionsModel: rolePermissionsModel }
    // console.log("body: ", body)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/Roles/Updatepermissions`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data.statusCode === "0000") {
        alert("Permissions have been successfully updated!")
        await newUpdatedRoles()
        // window.location.reload()
      } else {
        console.error("Failed to update permissions:", response.data.Message)
      }
    } catch (error) {
      console.error("Error while updating permissions:", error)
    }
  }

  const handleCancel = () => {
    setModifiedPermissions({})
    window.location.reload()
  }

  return (
    <div className="w-full overflow-x-auto md:ml-9 p-6 rounded-lg shadow-lg bg-white mt-16">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="p-4 text-left">Permission</th>
            <th className="p-4 text-center">Manager</th>
            <th className="p-4 text-center">Supervisor</th>
            <th className="p-4 text-center">Operator</th>
          </tr>
        </thead>
        <tbody>
          {availablePermissions.map((menu) => (
            <React.Fragment key={menu.menuId}>
              <tr className="bg-white transition-colors duration-300 hover:bg-gray-50">
                <td
                  onClick={() => toggleMenu(menu.menuId)}
                  className="flex items-center cursor-pointer p-4 border-b border-gray-300"
                >
                  {menu.menuName}
                  <span className="ml-2">
                    {expandedMenus[menu.menuId] ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </span>
                </td>
                {["Manager", "Supervisor", "Operator"].map((role) => (
                  <td key={role} className="text-center">
                    <input
                      type="checkbox"
                      checked={isChecked(role, menu.menuName)}
                      onChange={() =>
                        handleCheckboxChange(role, menu.menuName, true)
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                ))}
              </tr>
              {expandedMenus[menu.menuId] &&
                menu.subMenus.map((subMenu) => (
                  <tr key={subMenu.subMenuId} className="bg-gray-50">
                    <td className="pl-10 p-4 border-b border-gray-300">
                      - {subMenu.subMenuName}
                    </td>
                    {["Manager", "Supervisor", "Operator"].map((role) => (
                      <td key={role} className="text-center">
                        <input
                          type="checkbox"
                          checked={isChecked(role, subMenu.subMenuName)}
                          onChange={() =>
                            handleCheckboxChange(
                              role,
                              subMenu.subMenuName,
                              false,
                            )
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
     <div className="mt-4 flex justify-end space-x-4 px-10">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 p-2 rounded-lg"
        >
          Cancel
        </button>
      </div>

    </div>
  )
}

export default RolePermission

