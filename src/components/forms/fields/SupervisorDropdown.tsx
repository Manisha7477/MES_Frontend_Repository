import { useEffect, useState } from "react"
import { Field, useFormikContext } from "formik"
import axios from "axios"
import { IFormVariable, ITableData } from "@/utils/types"
import nookies from "nookies"

interface IDependedFieldProps {
  variable: IFormVariable
  displayLabel?: boolean
}

const SupervisorDropdown: React.FunctionComponent<IDependedFieldProps> = ({
  variable,
  displayLabel = true,
}) => {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: string | null // Allow `string | null` for form values
  }>()
  const [DropOptions, setDropOptions] = useState<ITableData>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const token = nookies.get(null).accessToken || "" // Default to empty string if null

  // Get dependent field value with a fallback to an empty string
  const depField = values[variable.supervisorDrop!] || ""

  useEffect(() => {
    // Initialize the field value
    setFieldValue(variable.name, null)

    if (
      depField === undefined ||
      parseInt(depField) === 1 ||
      parseInt(depField) === 2 ||
      parseInt(depField) === 4 ||
      parseInt(depField) === 5
    ) {
      setDisabled(true)
      console.log("Dep : ", depField)

      const fetchOperation = async () => {
        try {
          const result = await axios.get(variable.API!, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setDropOptions(result.data.data)
        } catch (error) {
          console.error("Error fetching Manager Details:", error)
        }
      }

      fetchOperation()
    } else {
      setDisabled(false)
    }
  }, [depField, setFieldValue, token, variable.name])

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
        <Field
          as="select"
          id={variable.name}
          name={variable.name}
          placeholder={variable.display}
          className="select select-sm select-bordered w-full"
          disabled={disabled}
          value={values[variable.name] || ""} // Default to empty string for display
          onChange={(e: any) => {
            const value = e.target.value || null // Set to null if empty
            setFieldValue(variable.name, value)
          }}
        >
          <option value="">Select</option>
          {DropOptions.length > 0
            ? DropOptions.map((optionItem: any, index: number) => (
                <option
                  value={Object.values(optionItem)[0] as string}
                  key={optionItem + index}
                  className="capitalize"
                >
                  {`${Object.values(optionItem)[1]}`}
                </option>
              ))
            : variable.options?.map((optionItem) => (
                <option
                  value={optionItem}
                  key={optionItem}
                  className="capitalize"
                >
                  {optionItem}
                </option>
              ))}
        </Field>
      </div>
    </div>
  )
}

export default SupervisorDropdown
