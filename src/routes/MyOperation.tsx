import { IUser } from "@/utils/types"

import AdminOperation from "./AdminOperation"
import SupervisorOperation from "./SupervisorOperation"
import OperationConfirmation from "./OperationConfirmation"

interface IHomeProps {
  user: IUser | null
  accessToken: string
}

const MyOperation: React.FunctionComponent<IHomeProps> = ({
  user,
  accessToken,
}) => {
  switch (user?.role) {
    case "Admin":
      return <AdminOperation />
    case "SI":
    case "Supervisor":
      return <SupervisorOperation />
    case "Operator":
      return <OperationConfirmation />
    case "Manager":
      return <AdminOperation />
    default:
      return <div className="w-full text-center">Coming Soon!</div>
  }
}

export default MyOperation
