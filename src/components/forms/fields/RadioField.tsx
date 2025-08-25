import { IFormVariable } from "@/utils/types"
import { ErrorMessage, useFormikContext } from "formik"

interface IRadioFieldProps {
  variable: IFormVariable
  displayLabel?: boolean
}

const RadioField: React.FunctionComponent<IRadioFieldProps> = ({
  variable,
  displayLabel = true,
}) => {
  const { values, setFieldValue } = useFormikContext()

  const isChecked = (value: string) =>
    //@ts-ignore
    values[variable.name] === value ? true : false

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(variable.name, e.target.value)
  }

  return (
    <div className="form-control" key={variable.name}>
      {displayLabel && (
        <label htmlFor={variable.name} className="w-full">
          {variable.display}
          {variable.required && (
            <span className="text-error text-left ml-1">*</span>
          )}
        </label>
      )}
      <div className="w-full">
        <div className="flex gap-4 item-center">
          {variable.options?.map((optionItem) => (
            <div className="item-center" key={optionItem}>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  id={variable.name}
                  name={variable.name}
                  className="radio radio-sm radio-primary"
                  value={optionItem}
                  onChange={onChangeHandle}
                  checked={isChecked(optionItem)}
                />
                <span className="label-text capitalize ml-1">{optionItem}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="text-error text-xs text-left">
          <ErrorMessage name={variable.name} />
        </div>

        <div className="text-sm text-faint mt-1">{variable.description}</div>
      </div>
    </div>
  )
}

export default RadioField
