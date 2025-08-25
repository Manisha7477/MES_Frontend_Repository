import { Route, Routes } from "react-router-dom"

import NotFound from "@/routes/NotFound"

import Home from "@/routes/Home"
import Profile from "@/routes/Profile"
import Settings from "@/routes/Settings"
import UserIdCreation from "@/routes/UserIdCreation"
import OperationConfirmation from "@/routes/OperationConfirmation"
import MyDashboard from "@/routes//MyDashboard"
import ManageUsers from "@/routes/ManageUsers"
import AccessWrapper from "@/routes/AccessWrapper"
import ManageFactory from "@/routes/ManageFactory"
import FactoryConfiguration from "@/routes/FactoryConfiguration"
import ManagePlant from "@/routes/ManagePlant"
import PlantConfiguration from "@/routes/PlantConfiguration"
import ManageStorageLocation from "@/routes/ManageStorageLocation"
import StorageLocationConfiguration from "@/routes/StorageLocationConfiguration"
import ManageWorkCenter from "@/routes/ManageWorkCenter"
import WorkCenterConfiguration from "@/routes/WorkCenterConfiguration"
import Routing from "@/routes/Routing"
import RoutingConfiguration from "@/routes/RoutingConfiguration"
import ManufacturingLine from "@/routes/ManufacturingLine"
import ManufacturingLineConfiguration from "@/routes/ManufacturingLineConfiguration"
import Bom from "@/routes/Bom"
import BomConfiguration from "@/routes/BomConfiguration"
import SerialProfileConfiguration from "@/routes/SerialProfileConfiguration"
import SerialProfile from "@/routes/SerialProfile"
import NumberRanges from "@/routes/NumberRanges"
import NumberRangesConfiguration from "@/routes/NumberRangesConfiguration"
import MaterialMaster from "@/routes/MaterialMaster"
import MaterialMasterConfiguration from "@/routes/MaterialMasterConfiguration"

import ProductionOrder from "@/routes/ProductionOrder"
import ProductionOrderConfiguration from "@/routes/ProductionOrderConfiguration"

import ShiftCreation from "@/routes/ShiftCreation"
import ShiftCreationConfiguration from "@/routes/ShiftCreationConfiguration"
import ShiftAssignment from "@/routes/ShiftAssignment"
import ShiftAssignmentConfiguration from "@/routes/ShiftAssignmentConfiguration"
import JobAssignmentConfiguration from "@/routes/JobAssignmentConfiguration"
import JobAssignment from "@/routes/JobAssignment"
import JobAllocation from "@/routes/JobAllocation"
import JobAllocationConfiguration from "@/routes/JobAllocationConfiguration"
import Department from "@/routes/Department"
import DepartmentConfiguration from "@/routes/DepartmentConfiguration"
import WorkCenterAllocation from "@/routes/WorkCenterAllocation"
import WorkCenterAllocationConfiguration from "@/routes/WorkCenterAllocationConfiguration"
import EmployeeAllocation from "@/routes/EmployeeAllocation"
import EmployeeAllocationConfiguration from "@/routes/EmployeeAllocationConfiguration"
import ShiftAllocation from "@/routes/ShiftAllocation"
import ShiftAllocationConfiguration from "@/routes/ShiftAllocationConfiguration"
import ProductionVersion from "@/routes/ProductionVersion"
import ProductionVersionConfiguration from "@/routes/ProductionVersionConfiguration"
import JobCreation from "@/routes/JobCreation"
import JobCreationConfiguration from "@/routes/JobCreationConfiguration"
import MaterialGroupMasterConfiguration from "./MaterialGroupMasterConfiguration"
import MaterialGroupMaster from "./MaterialGroupMatser"
import RolePermission from "./RolePermission"

import { useAuth } from "@/contexts/auth"
import { useEffect, useState } from "react"
import axios from "axios"
import nookies from "nookies"
import SignOut from "@/routes/SignOut"
import BomItemsConfiguration from "./BomItemsConfiguration"
import BomViewConfiguration from "./BomViewConfiguration"

import MyOperation from "./MyOperation"

import RoleAssignment from "./RoleAssignment"
import RoleAssignmentConfiguration from "./RoleAssignmentConfiguration"
import SupersetDashboard from "./SupersetDashboard"
import Bulk_Insertion from "@/components/Bulk Insertion/Bulk_Insertion"

interface INavbarProps {
  isOpenMenu: boolean
}

const AppRouter: React.FunctionComponent<INavbarProps> = ({ isOpenMenu }) => {
  const { user, loading } = useAuth()
  const token = nookies.get(null).accessToken || ""
  const [loadingRoles, setLoadingRoles] = useState(true)
  const [roleMap, setRoleMap] = useState(new Map())

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          // `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetSubMenuWithRoles`,
          `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetSubMenuWithRoles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const rolesMap = new Map<string, string[]>()
        console.log("response.data.data",response.data.data);
        
        response.data.data.forEach(
          (submenu: {
            getRoleList: { roleName: string }[]
            subMenuUrl: string
          }) => {
            // Get roles as an array of role names (string format)
            const roleNames = submenu.getRoleList.map((role) => role.roleName)
            // Set the map with SubMenuUrl as key and role names as the value
            rolesMap.set(submenu.subMenuUrl, roleNames)
          },
        )

        // Set the created map into the state
        setRoleMap(new Map(rolesMap))
        // console.log("rolesMap as an object: ", JSON.stringify(Object.fromEntries(rolesMap), null, 2));
      } catch (error) {
        console.error("Error fetching roles:", error)
      } finally {
        setLoadingRoles(false)
      }
    }

    fetchRoles()
  }, [])
  if (!loading && !loadingRoles) {
    return (
      <Routes>
        <Route path="/" element={<Home accessToken={token} />} />
        <Route
          path="/my-dashboard"
          element={
            <MyDashboard
              user={user}
              isOpenMenu={isOpenMenu}
              accessToken={token}
            />
          }
        />
        <Route
          path="/operation"
          element={<MyOperation user={user} accessToken={token} />}
        />
        <Route
          path="/manage-users"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/manage-users")?.includes(user?.role)}
            >
              <ManageUsers />
            </AccessWrapper>
          }
        />

        <Route
          path="/manage-users/user-creation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-users")
                ?.includes(user?.role || "")}
            >
              <UserIdCreation user={user} />
            </AccessWrapper>
          }
        />
        <Route
          path="/user-mapping"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/user-mapping")?.includes(user?.role)}
            >
              <RoleAssignment />
            </AccessWrapper>
          }
        />
        <Route
          path="/user-mapping/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/user-mapping")
                ?.includes(user?.role || "")}
            >
              <RoleAssignmentConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/manage-factory"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-factory")
                ?.includes(user?.role || "")}
            >
              <ManageFactory />
            </AccessWrapper>
          }
        />
        <Route
          path="/manage-factory/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-factory")
                ?.includes(user?.role || "")}
            >
              <FactoryConfiguration user={user} />
            </AccessWrapper>
          }
        />
        <Route
          path="/manage-plant"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-plant")
                ?.includes(user?.role || "")}
            >
              <ManagePlant />
            </AccessWrapper>
          }
        />
        <Route
          path="/manage-plant/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-plant")
                ?.includes(user?.role || "")}
            >
              <PlantConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/manage-storage-location"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-storage-location")
                ?.includes(user?.role || "")}
            >
              <ManageStorageLocation />
            </AccessWrapper>
          }
        />

        <Route
          path="/manage-storage-location/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-storage-location")
                ?.includes(user?.role || "")}
            >
              <StorageLocationConfiguration user={user} />
            </AccessWrapper>
          }
        />
        <Route
          path="/manage-work-center"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-work-center")
                ?.includes(user?.role || "")}
            >
              <ManageWorkCenter />
            </AccessWrapper>
          }
        />
        <Route
          path="/manage-work-center/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manage-work-center")
                ?.includes(user?.role || "")}
            >
              <WorkCenterConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/routing"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/routing")?.includes(user?.role || "")}
            >
              <Routing />
            </AccessWrapper>
          }
        />
        <Route
          path="/routing/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/routing")?.includes(user?.role || "")}
            >
              <RoutingConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/manufacturing-line"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manufacturing-line")
                ?.includes(user?.role || "")}
            >
              <ManufacturingLine />
            </AccessWrapper>
          }
        />

        <Route
          path="/manufacturing-line/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/manufacturing-line")
                ?.includes(user?.role || "")}
            >
              <ManufacturingLineConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/bom"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/bom")?.includes(user?.role || "")}
            >
              <Bom />
            </AccessWrapper>
          }
        />
        <Route
          path="/bom/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/bom")?.includes(user?.role || "")}
            >
              <BomConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/bomitems/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/bom")?.includes(user?.role || "")}
            >
              <BomItemsConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/bomDetails/:id"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap.get("/bom")?.includes(user?.role || "")}
            >
              <BomViewConfiguration />
            </AccessWrapper>
          }
        />

        <Route
          path="/serial-number-profile"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/serial-number-profile")
                ?.includes(user?.role || "")}
            >
              <SerialProfile />
            </AccessWrapper>
          }
        />
        <Route
          path="/serial-number-profile/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/serial-number-profile")
                ?.includes(user?.role || "")}
            >
              <SerialProfileConfiguration />
            </AccessWrapper>
          }
        />

        <Route
          path="/number-ranges"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/number-ranges")
                ?.includes(user?.role || "")}
            >
              <NumberRanges />
            </AccessWrapper>
          }
        />
        <Route
          path="/number-ranges/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/number-ranges")
                ?.includes(user?.role || "")}
            >
              <NumberRangesConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/material-master"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/material-master")
                ?.includes(user?.role || "")}
            >
              <MaterialMaster />
            </AccessWrapper>
          }
        />
        <Route
          path="/material-master/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/material-master")
                ?.includes(user?.role || "")}
            >
              <MaterialMasterConfiguration user={user} />
            </AccessWrapper>
          }
        />
        <Route
          path="/material-group-master"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/material-group-master")
                ?.includes(user?.role || "")}
            >
              <MaterialGroupMaster />
            </AccessWrapper>
          }
        />
        <Route
          path="/material-group-master/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/material-group-master")
                ?.includes(user?.role || "")}
            >
              <MaterialGroupMasterConfiguration user={user} />
            </AccessWrapper>
          }
        />
        <Route
          path="/production-order"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/production-order")
                ?.includes(user?.role || "")}
            >
              <ProductionOrder />
            </AccessWrapper>
          }
        />
        <Route
          path="/production-order/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/production-order")
                ?.includes(user?.role || "")}
            >
              <ProductionOrderConfiguration user={user} />
            </AccessWrapper>
          }
        />
        <Route
          path="/shift-creation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/shift-creation")
                ?.includes(user?.role || "")}
            >
              <ShiftCreation />
            </AccessWrapper>
          }
        />
        <Route
          path="/shift-creation/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/shift-creation")
                ?.includes(user?.role || "")}
            >
              <ShiftCreationConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/job-creation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/job-creation")
                ?.includes(user?.role || "")}
            >
              <JobCreation />
            </AccessWrapper>
          }
        />
        <Route
          path="/job-creation/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/job-creation")
                ?.includes(user?.role || "")}
            >
              <JobCreationConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/job-assignment"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/job-assignment")
                ?.includes(user?.role || "")}
            >
              <JobAssignment />
            </AccessWrapper>
          }
        />
        <Route
          path="/job-assignment/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/job-assignment")
                ?.includes(user?.role || "")}
            >
              <JobAssignmentConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/job-allocation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/job-allocation")
                ?.includes(user?.role || "")}
            >
              <JobAllocation />
            </AccessWrapper>
          }
        />
        <Route
          path="/job-allocation/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/job-allocation")
                ?.includes(user?.role || "")}
            >
              <JobAllocationConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/shift-details"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/shift-details")
                ?.includes(user?.role || "")}
            >
              <ShiftAssignment />
            </AccessWrapper>
          }
        />
        <Route
          path="/shift-details/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/shift-details")
                ?.includes(user?.role || "")}
            >
              <ShiftAssignmentConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/employee-allocation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/employee-allocation")
                ?.includes(user?.role || "")}
            >
              <EmployeeAllocation />
            </AccessWrapper>
          }
        />
        <Route
          path="/employee-allocation/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/employee-allocation")
                ?.includes(user?.role || "")}
            >
              <EmployeeAllocationConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/department"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/department")
                ?.includes(user?.role || "")}
            >
              <Department />
            </AccessWrapper>
          }
        />
        <Route
          path="/department/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/department")
                ?.includes(user?.role || "")}
            >
              <DepartmentConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/work-center-allocation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/work-center-allocation")
                ?.includes(user?.role || "")}
            >
              <WorkCenterAllocation />
            </AccessWrapper>
          }
        />
        <Route
          path="/work-center-allocation/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/work-center-allocation")
                ?.includes(user?.role || "")}
            >
              <WorkCenterAllocationConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/shift-allocation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/shift-allocation")
                ?.includes(user?.role || "")}
            >
              <ShiftAllocation />
            </AccessWrapper>
          }
        />
        <Route
          path="/shift-allocation/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/shift-allocation")
                ?.includes(user?.role || "")}
            >
              <ShiftAllocationConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/production-version"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/production-version")
                ?.includes(user?.role || "")}
            >
              <ProductionVersion />
            </AccessWrapper>
          }
        />
        <Route
          path="/production-version/configuration"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/production-version")
                ?.includes(user?.role || "")}
            >
              <ProductionVersionConfiguration user={user} />
            </AccessWrapper>
          }
        />

        <Route
          path="/operation"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={["Operator", "Admin"].includes(user?.role || "")}
            >
              <OperationConfirmation />
            </AccessWrapper>
          }
        />

        <Route
          path="/bulk-insertion"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={["Manager", "Admin"].includes(user?.role || "")}
            >
              <Bulk_Insertion user={null} />
            </AccessWrapper>
          }
        />

        <Route
          path="/bulk-insertion"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={["Manager", "Admin"].includes(user?.role || "")}
            >
              <Bulk_Insertion user={null} />
            </AccessWrapper>
          }
        />

        <Route
          path="/role-permission"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/role-permission")
                ?.includes(user?.role || "")}
            >
              <RolePermission />
            </AccessWrapper>
          }
        />
        <Route
          path="/superset-dashboard"
          element={
            <AccessWrapper
              user={user}
              accessToken={token}
              accessRole={roleMap
                .get("/superset-dashboard")
                ?.includes(user?.role || "")}
            >
              <SupersetDashboard />
            </AccessWrapper>
          }
        />

        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<SignOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }
  return null
}

export default AppRouter
