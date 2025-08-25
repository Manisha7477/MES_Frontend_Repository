import { IFormVariable } from "@/utils/types"
import { groupFormVariable } from "@/utils/forms"

import StringField from "@/components/forms/fields/StringField"
import NumberField from "@/components/forms/fields/NumberField"
import SelectField from "@/components/forms/fields/SelectField"
import BooleanField from "@/components/forms/fields/BooleanField"
import RadioField from "@/components/forms/fields/RadioField"
import TextareaField from "@/components/forms/fields/TextareaField"
import DateField from "@/components/forms/fields/DateField"
import PasswordField from "@/components/forms/fields/PasswordField"
import TimeField from "@/components/forms/fields/TimeField"
import SelectOneField from "./fields/SelectOneField"
import DependedField from "./fields/DependedField"
import CustomSelectField from "./fields/CustomSelectField"
//import DependedDropdown from "./fields/DependedDropdown"
import ManagerDropdown from "./fields/ManagerDropdown"
import SupervisorDropdown from "./fields/SupervisorDropdown"
interface IHorizontalLabelFormFieldProps {
  formVariables: IFormVariable[]
  // title?: string; // New title prop
}

const HorizontalLabelFormField: React.FunctionComponent<
  IHorizontalLabelFormFieldProps
> = ({ formVariables }) => {
  const formatFormVars = groupFormVariable(formVariables)

  const renderFields = (variable: IFormVariable) => {
    switch (variable.type) {
      case "string":
        return <StringField variable={variable} displayLabel={false} />
      case "string(textarea)":
        return <TextareaField variable={variable} displayLabel={false} />
      case "number":
        return <NumberField variable={variable} displayLabel={false} />
      case "select":
        return <CustomSelectField variable={variable} displayLabel={false} />
      // return <SelectField variable={variable} displayLabel={false} />
      case "selectcustom":
        return <CustomSelectField variable={variable} displayLabel={false} />
      case "selectone":
        // return <CustomSelectField variable={variable} displayLabel={false} />
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
      // case "dependeddropdown":
      //   return <DependedDropdown variable={variable} displayLabel={false} />
      case "supervisorDD":
        return <SupervisorDropdown variable={variable} displayLabel={false} />
      case "managerDD":
        return <ManagerDropdown variable={variable} displayLabel={false} />
      default:
        return <StringField variable={variable} displayLabel={false} />
    }
  }

  return (
    <div className="flex-wrap w-full">
      {/* {/ {title && <h2 className="text-lg font-bold mb-4">{title}</h2>} /} */}
      <div className="w-full xl:flex xl:gap-16">
        {Object.keys(formatFormVars).map((groupFormKey, index) => (
          <div className="w-full" key={index}>
            {formatFormVars[groupFormKey].map(
              (variable: IFormVariable, sIndex: number) => (
                <div className="relative" key={sIndex}>
                  <div className="w-full md:flex gap-4">
                    <div className="w-full md:w-64">
                      <label
                        htmlFor={variable.name}
                        className="w-full text-xs font-semibold"
                      >
                        {variable.display}
                        {variable.required && (
                          <span className="text-error text-left ml-1">*</span>
                        )}
                      </label>
                    </div>

                    <div className="w-full">{renderFields(variable)}</div>
                  </div>
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HorizontalLabelFormField
