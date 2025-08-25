import { MATERIAL_MASTER_BULK_INSERTION_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { IUser } from "@/utils/types"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { useNavigate } from "react-router-dom"
import BulkInsertionLabelForm from "../forms/BulkInsertionLabelForm"

interface IMaterialMasterConfigurationProps {
  user: IUser | null
}

const Bulk_Insertion: React.FunctionComponent<
  IMaterialMasterConfigurationProps
> = ({ user }) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")

  const initialDefaultValueData = initialFormikValues(
    MATERIAL_MASTER_BULK_INSERTION_DATA,
  )
  const formValidationSchemaData = formValidationSchema(
    MATERIAL_MASTER_BULK_INSERTION_DATA,
  )

  const handleCancelForm = () => {
    navigate("/material-master/configuration")
  }

  const handleSubmitForm = () => {}

  return (
    <div className="w-full px-2 mt-28">
      <BulkInsertionLabelForm
        formVariables={MATERIAL_MASTER_BULK_INSERTION_DATA}
        initialDefaultValueData={initialDefaultValueData}
        formValidationSchemaData={formValidationSchemaData}
        handleCancelForm={handleCancelForm}
        handleSubmitForm={handleSubmitForm}
        showGenerateUploadButtons={true}
      />
    </div>
  )
}

export default Bulk_Insertion
