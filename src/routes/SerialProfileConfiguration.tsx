import HorizontalLabelForm from "@/components/forms/HorizontalLabelForm"
import { SERIAL_PROFILE_FORM_DATA, SERIAL_PROFILE_DATA } from "@/utils/data"
import { useQuery } from "@/utils/dom"
import { initialFormikValues, formValidationSchema } from "@/utils/forms"
import { FormikValues } from "formik"
import { useNavigate } from "react-router-dom"


interface ISerialProfileConfigurationProps {}

const SerialProfileConfiguration: React.FunctionComponent<
  ISerialProfileConfigurationProps
> = ({}) => {
  const navigate = useNavigate()
  const query = useQuery()
  const id = query.get("id")

  const initialDefaultValueData = initialFormikValues(SERIAL_PROFILE_FORM_DATA)
  const formValidationSchemaData = formValidationSchema(
    SERIAL_PROFILE_FORM_DATA,
  )

  const updateData = SERIAL_PROFILE_DATA.find((dataItem) => dataItem.idNo == id)
  const initialDefaultData = Object.assign(
    {},
    initialDefaultValueData,
    updateData,
  )

  const handleCancelForm = () => {
    navigate("/serial-number-profile")
  }
  const handleSubmitForm = (
    answerValues: FormikValues,
    actions: FormikValues,
  ) => {
    // API call here on submit
    console.log(answerValues)
    setTimeout(() => {
      actions.setSubmitting(false)
      navigate("/serial-number-profile")
    }, 1000)
  }

  return (
    <div className="w-full px-2">
      <div className="border rounded border-base-300">
        <div className="bg-info rounded-t border-b border-base-300 font-bold px-4 py-1 mt-16">
          {id
            ? `Serial Number Profile Update (${id})`
            : `Add New Serial Number Profile`}
        </div>
        <div className="p-4 bg-neutral screen-height-media">
          <HorizontalLabelForm
            formVariables={SERIAL_PROFILE_FORM_DATA}
            initialDefaultValueData={initialDefaultData}
            formValidationSchemaData={formValidationSchemaData}
            handleCancelForm={handleCancelForm}
            handleSubmitForm={handleSubmitForm}
          />
        </div>
      </div>
    </div>
  )
}

export default SerialProfileConfiguration
