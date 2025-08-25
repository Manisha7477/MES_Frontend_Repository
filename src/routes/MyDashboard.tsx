import { IUser } from "@/utils/types"
import OperatorDashboard from "@/components/Dashboard/OperatorDashboard"
import AdminDashboard from "@/components/Dashboard/AdminDashboard"
import SupervisorDashboard from "@/components/Dashboard/SupervisorDashboard"
import ManagerDashboard from "@/components/Dashboard/ManagerDashboard"

interface IHomeProps {
  user: IUser | null
  accessToken: string
  isOpenMenu: boolean
}

const MyDashboard: React.FunctionComponent<IHomeProps> = ({
  user,
  accessToken,
  isOpenMenu,
}) => {
  switch (user?.role) {
    case "Admin":
      return <AdminDashboard isOpenMenu={isOpenMenu} />
    case "SI":
    case "Supervisor":
      return <SupervisorDashboard />
    case "Operator":
      return <OperatorDashboard />
    case "Manager":
      return <ManagerDashboard />
    default:
      return (
        <div className="w-full text-center bg-background">Coming Soon!</div>
      )
  }
}

export default MyDashboard
