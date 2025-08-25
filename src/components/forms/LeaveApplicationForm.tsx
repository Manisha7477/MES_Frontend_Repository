import { IFormVariable } from "@/utils/types"
import { Form, Formik, FormikValues } from "formik"
import LevelTopCreationFormField from "@/components/forms/LevelTopCreationFormField"

interface ILeaveApplicationFormProps {
  formVariables: IFormVariable[]
  initialDefaultValueData: FormikValues
  formValidationSchemaData: any
}

const LeaveApplicationForm: React.FunctionComponent<
  ILeaveApplicationFormProps
> = ({ formVariables, initialDefaultValueData, formValidationSchemaData }) => {
  const handleSubmit = (answerValues: FormikValues) => {
    // API call here on submit
    console.log(answerValues)
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={initialDefaultValueData}
        validationSchema={formValidationSchemaData}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
        validateOnMount
      >
        {({ isSubmitting }) => (
          <Form autoComplete="on">
            <LevelTopCreationFormField formVariables={formVariables} />
            <div className="mb-4 text-right">
              <button
                type="submit"
                className="btn btn-sm btn-primary text-base-100"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LeaveApplicationForm
