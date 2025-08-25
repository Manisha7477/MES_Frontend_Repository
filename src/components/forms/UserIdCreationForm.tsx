import { IFormVariable } from "@/utils/types"
import { Form, Formik, FormikValues } from "formik"
import UserIdCreationFormField from "@/components/forms/UserIdCreationFormField"

interface IUserIdCreationFormProps {
  formVariables: IFormVariable[]
  initialDefaultValueData: FormikValues
  formValidationSchemaData: any
  handleCancelForm: Function
  handleSubmitForm: Function
}

const UserIdCreationForm: React.FunctionComponent<IUserIdCreationFormProps> = ({
  formVariables,
  initialDefaultValueData,
  formValidationSchemaData,
  handleCancelForm,
  handleSubmitForm,
}) => {

  const handleCancel = () => {
    handleCancelForm()
  }
  const handleSubmit = (answerValues: FormikValues, actions: FormikValues) => {
    handleSubmitForm(answerValues, actions)
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={initialDefaultValueData}
        validationSchema={formValidationSchemaData}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
        validateOnMount
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form autoComplete="on">
            <UserIdCreationFormField formVariables={formVariables} />
            <div className="mt-10 mb-4">
              <button 
                type="submit"
                className="btn btn-sm btn-primary text-base-100"
                disabled={isSubmitting}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary ml-4 text-base-100"
                disabled={isSubmitting}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UserIdCreationForm
