import { IFormVariable } from "@/utils/types";
import { useEffect, useState } from "react";
import StringField from "@/components/forms/fields/StringField";
import NumberField from "@/components/forms/fields/NumberField";
import SelectField from "@/components/forms/fields/SelectField";
import BooleanField from "@/components/forms/fields/BooleanField";
import RadioField from "@/components/forms/fields/RadioField";
import TextareaField from "@/components/forms/fields/TextareaField";
import DateField from "@/components/forms/fields/DateField";
import PasswordField from "@/components/forms/fields/PasswordField";
import TimeField from "@/components/forms/fields/TimeField";
import SelectOneField from "../fields/SelectOneField";
import DependedField from "../fields/DependedField";
import { FieldArray, Field } from "formik";
import { groupFormVariable } from "@/utils/forms";

interface IHorizontalLabelFormFieldProps {
  formVariables: IFormVariable[];
  bomIndex: number;
}

const BomHorizontalLabelFormField: React.FunctionComponent<IHorizontalLabelFormFieldProps> = ({ formVariables, bomIndex }) => {
  const [formatFormVars, setFormatFormVars] = useState<{ [key: string]: IFormVariable[] }>({});

  useEffect(() => { 
    const filteredFormVars = formVariables.filter((variable) => variable.bomIndex === bomIndex);
    const groupedFormVars = groupFormVariable(filteredFormVars); // Ensure it returns `{ [key: string]: IFormVariable[] }`
    setFormatFormVars(groupedFormVars);
  }, [formVariables, bomIndex]);

  const renderFields = (variable: IFormVariable, index: number) => {
    switch (variable.type) {
      case "string":
        return <StringField variable={variable} displayLabel={false} />;
      case "string(textarea)":
        return <TextareaField variable={variable} displayLabel={false} />;
      case "number":
        return <NumberField variable={variable} displayLabel={false} />;
      case "select":
        return <SelectField variable={variable} displayLabel={false} />;
      case "selectone":
        return <SelectOneField variable={variable} displayLabel={false} />;
      case "bool":
        return <BooleanField variable={variable} displayLabel={false} />;
      case "radio":
        return <RadioField variable={variable} displayLabel={false} />;
      case "password":
        return <PasswordField variable={variable} displayLabel={false} />;
      case "date":
        return <DateField variable={variable} displayLabel={false} />;
      case "time":
        return <TimeField variable={variable} displayLabel={false} />;
      case "depended":
        return <DependedField variable={variable} displayLabel={false} />;
      default:
        return <StringField variable={variable} displayLabel={false} />;
    }
  };

  return (
    <div className="flex-wrap w-full">
      <div className="w-full md:flex md:gap-16">
        {Object.keys(formatFormVars).map((groupFormKey, index) => (
          <div className="w-full" key={index}>
            {formatFormVars[groupFormKey].map((variable: IFormVariable, sIndex: number) => (
              <div className="relative" key={sIndex}>
                <div className="w-full md:flex gap-4">
                  <div className="w-full md:w-64">
                    <label htmlFor={variable.name} className="w-full text-xs font-semibold">
                      {variable.display}
                      {variable.required && <span className="text-error text-left ml-1">*</span>}
                    </label>
                  </div>
                  <div className="w-full">{renderFields(variable, sIndex)}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BomHorizontalLabelFormField;
