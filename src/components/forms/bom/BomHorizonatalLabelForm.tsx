import { useNavigate } from "react-router-dom"
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik"
import { IFormVariable } from "@/utils/types"
import HorizontalLabelFormField from "../HorizontalLabelFormField"
// import BomLevelForm from "./BomLevelForm"
import StringField from "../fields/StringField"
import TextareaField from "../fields/TextareaField"
import NumberField from "../fields/NumberField"
import SelectField from "../fields/SelectField"
import SelectOneField from "../fields/SelectOneField"
import CustomSelectField from "../fields/CustomSelectField"
import BooleanField from "../fields/BooleanField"
import RadioField from "../fields/RadioField"
import PasswordField from "../fields/PasswordField"
import DateField from "../fields/DateField"
import TimeField from "../fields/TimeField"
import DependedField from "../fields/DependedField"
import { string } from "yup"

interface IBomHorizontalLabelFormProps {
  formVariables: IFormVariable[]
  initialDefaultValueData: {}
  rmFormVariables: IFormVariable[]
  rmInitialDefaultValues: FormikValues
  formValidationSchemaData: any
  rmFormValidationSchemaData: any
  handleCancelForm: Function
  handleSubmitForm: Function
  showSaveCancelButtons?: boolean
}

const BomHorizontalLabelForm: React.FunctionComponent<
  IBomHorizontalLabelFormProps
> = ({
  formVariables,
  initialDefaultValueData,
  formValidationSchemaData,
  rmFormValidationSchemaData,
  rmFormVariables,
  rmInitialDefaultValues,
  handleCancelForm,
  handleSubmitForm,
}) => {
  const navigate = useNavigate()

  const renderFields = (variable: IFormVariable) => {
    switch (variable.type) {
      case "string":
        return <StringField variable={variable} displayLabel={false} />
      case "string(textarea)":
        return <TextareaField variable={variable} displayLabel={false} />
      case "number":
        return <NumberField variable={variable} displayLabel={false} />
      case "select":
        return <SelectField variable={variable} displayLabel={false} />
      case "selectcustom":
        return <CustomSelectField variable={variable} displayLabel={false} />
      case "selectone":
        return <SelectOneField variable={variable} displayLabel={false} />
      case "bool":
        return <BooleanField variable={variable} displayLabel={false} />
      case "radio":
        return <RadioField variable={variable} displayLabel={false} />
      case "password":
        return <PasswordField variable={variable} displayLabel={false} />
      case "date":
        return <DateField variable={variable} displayLabel={false} />
      case "time":
        return <TimeField variable={variable} displayLabel={false} />
      case "depended":
        return <DependedField variable={variable} displayLabel={false} />
      default:
        return <StringField variable={variable} displayLabel={false} />
    }
  }

  const handleCancel = () => {
    console.log("Data", initialDVD)
    console.log("BomData", initialDVD.bomLevelItem)
    handleCancelForm()
  }

  // function separateCamelCase(str: string) {
  //   return str.replace(/([a-z])([A-Z])/g, "$1 $2")
  // }

  const handleSubmit = (answerValues: FormikValues, actions: FormikValues) => {
    console.log(answerValues)
    handleSubmitForm(answerValues, actions)
  }

  const initialDVD = {
    ...initialDefaultValueData,
    bomLevelItem: rmInitialDefaultValues,
  }

  console.log(
    "initila default value data = " +
      JSON.stringify(initialDefaultValueData, null, 2),
  )
  console.log("initial Dvd = " + JSON.stringify(initialDVD, null, 2))
  const separateCamelCase = (text: string): string => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2") // insert space between camelCase
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // handle PascalCase like UOM
      .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={initialDVD}
        validationSchema={formValidationSchemaData}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
        validateOnMount
        enableReinitialize
      >
        {({ isSubmitting, values }) => (
          <Form autoComplete="on">
            {/* Finished Goods Section */}
            <HorizontalLabelFormField formVariables={formVariables} />

            {/* Raw Materials Section */}
            <div className="mt-10 mb-5 font-bold">
              <h1>Raw Materials </h1>
            </div>

            <FieldArray name="BomLevelItem">
              {({ push, remove }) => (
                <>
                  {/* Render Fields Inside the Same Container */}
                  <div className="border p-4 mb-4 rounded">
                    {values?.bomLevelItem?.map((variable: any, sindex: any) => (
                      <div
                        key={sindex}
                        className="w-full md:flex gap-4 items-center"
                      >
                        {/* Loop over fields and render them inside the same container */}
                        {Object.keys(variable)
                          .filter((key) =>
                            [
                              "itemCategory",
                              "materialId",
                              "quantity",
                              "uOM",
                            ].includes(key),
                          )
                          .map((key) => (
                            <div className="w-full md:w-1/4" key={`${key}`}>
                              {/* Label and input fields */}
                              <label
                                htmlFor={`bomLevelItem.${sindex}.${key}`}
                                className="text-xs font-semibold"
                              >
                                {separateCamelCase(key)}
                                {/* {key.charAt(0).toUpperCase() + key.slice(1)} */}
                                {variable.required && (
                                  <span className="text-error text-left ml-1">
                                    *
                                  </span>
                                )}
                              </label>
                              <div className="w-full">
                                {/* Field Rendering (can be input or select based on the field) */}
                                {renderFields({
                                  name: `bomLevelItem.${sindex}.${key}`,
                                  type:
                                    key === "materialId" ||
                                    key === "itemCategory"
                                      ? "select"
                                      : "string",
                                  display: separateCamelCase(key),
                                  required: true,
                                  API:
                                    key == "materialId"
                                      ? `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialNumberDD`
                                      : key == "itemCategory"
                                      ? `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetItemCategoryDD`
                                      : "",
                                })}
                              </div>
                            </div>
                          ))}

                        {/* Remove Button */}
                        <div className="md:w-1/12 flex justify-center md:justify-end mt-4 md:mt-0">
                          <button
                            type="button"
                            onClick={() => remove(sindex)}
                            className="btn btn-sm btn-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* "Add Raw Material" Button Outside the Container */}
                  <div className="w-full mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        // Push new fields based on the template of the first entry
                        const newBomItem = values.bomLevelItem[0] // Use the fields from the first object as a template
                        push({
                          itemCategory: "",
                          materialId: "",
                          quantity: "",
                          uOM: "",
                        })
                      }}
                      className="btn btn-sm btn-primary text-base-100"
                    >
                      Add Raw Material
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

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

export default BomHorizontalLabelForm
