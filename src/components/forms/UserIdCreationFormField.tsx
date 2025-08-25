import { IFormVariable } from "@/utils/types"
import { groupFormVariable } from "@/utils/forms"

import StringField from "@/components/forms/fields/StringField"
import NumberField from "@/components/forms/fields/NumberField"
import SelectField from "@/components/forms/fields/SelectField"
import BooleanField from "@/components/forms/fields/BooleanField"
import RadioField from "@/components/forms/fields/RadioField"
import DateField from "@/components/forms/fields/DateField"
import PasswordField from "@/components/forms/fields/PasswordField"

interface IUserIdCreationFormFieldProps {
  formVariables: IFormVariable[]
}

const UserIdCreationFormField: React.FunctionComponent<
  IUserIdCreationFormFieldProps
> = ({ formVariables }) => {
  const formatFormVars = groupFormVariable(formVariables)

  const renderFields = (variable: IFormVariable) => {
    switch (variable.type) {
      case "string":
        return <StringField variable={variable} displayLabel={false} />
      case "number":
        return <NumberField variable={variable} displayLabel={false} />
      case "select":
        return <SelectField variable={variable} displayLabel={false} />
      case "bool":
        return <BooleanField variable={variable} displayLabel={false} />
      case "radio":
        return <RadioField variable={variable} displayLabel={false} />
      case "date":
        return <DateField variable={variable} displayLabel={false} />
      case "password":
        return <PasswordField variable={variable} displayLabel={false} />

      default:
        return <StringField variable={variable} displayLabel={false} />
    }
  }

  return (
    <>
      <div className="flex-wrap sm:w-9/12">
        <div className="w-full sm:flex sm:gap-24">
          {Object.keys(formatFormVars).map((groupFormKey) => {
            return (
              <div className="w-full" key={groupFormKey}>
                {formatFormVars[groupFormKey].map((variable: IFormVariable) => (
                  <div className="relative" key={variable.name}>
                    <div className="flex">
                      <div className="w-full">
                        <label
                          htmlFor={variable.name}
                          className="w-full text-sm font-semibold"
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
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default UserIdCreationFormField
