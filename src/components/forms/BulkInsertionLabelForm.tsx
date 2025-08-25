import { useNavigate } from "react-router-dom"
import { IFormVariable } from "@/utils/types"
import { Form, Formik, FormikValues } from "formik"
import HorizontalLabelFormField from "@/components/forms/HorizontalLabelFormField"
import * as yup from "yup"
import { ChangeEvent, useState, useRef, useCallback } from "react"
import { toast, ToastContainer } from "react-toastify"
import { FaSpinner } from "react-icons/fa"
import * as XLSX from "xlsx"
import userStore from "@/store/user"

// Define required fields for Excel validation
const REQUIRED_EXCEL_FIELDS = [
  "materialName",
  "description",
  "unitOfMeasure",
  "stockQuantity",
  "minimumStockLevel",
  "maximumStockLevel",
  "reorderPoint",
  "procurementType",
  "priceOfMaterial",
] as const

type RequiredExcelField = (typeof REQUIRED_EXCEL_FIELDS)[number]

interface ParsedData {
  [key: string]: string | number | boolean | null
}

interface ValidationError {
  row: number
  field: string
  message: string
}

interface IHorizontalLabelFormProps {
  formVariables: IFormVariable[]
  initialDefaultValueData: FormikValues
  formValidationSchemaData: any
  handleCancelForm: Function
  handleSubmitForm: Function
  showGenerateUploadButtons?: boolean
}

const BulkInsertionLabelForm: React.FunctionComponent<
  IHorizontalLabelFormProps
> = ({
  formVariables,
  initialDefaultValueData,
  formValidationSchemaData,
  handleCancelForm,
  handleSubmitForm,
  showGenerateUploadButtons = true,
}) => {
  const navigate = useNavigate()
  const currentUser = userStore((state) => state.user)
  const token = currentUser?.accessToken || ""
  const username = currentUser?.username || "System" // Fallback to "System" if username is not available

  const [isGenerating, setIsGenerating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Utility functions
  const formatDate = useCallback((value: unknown): string => {
    if (!value) return new Date().toISOString()
    if (value instanceof Date) return value.toISOString()
    if (typeof value === "string") {
      const date = new Date(value)
      return !isNaN(date.getTime())
        ? date.toISOString()
        : new Date().toISOString()
    }
    return new Date().toISOString()
  }, [])

  const extractNumericValue = useCallback(
    (value: string | undefined): number => {
      if (!value) return 0
      const numericValue = parseFloat(value.split(" ")[0])
      return isNaN(numericValue) ? 0 : numericValue
    },
    [],
  )

  // Validation functions
  const validateExcelData = (data: ParsedData[]): ValidationError[] => {
    const errors: ValidationError[] = []

    data.forEach((row, index) => {
      REQUIRED_EXCEL_FIELDS.forEach((field) => {
        const value = row[field]
        if (value === undefined || value === null || value === "") {
          errors.push({
            row: index + 1,
            field,
            message: `Empty value in ${field}`,
          })
        }
      })

      // Additional type-specific validations
      if (row.stockQuantity !== undefined && isNaN(Number(row.stockQuantity))) {
        errors.push({
          row: index + 1,
          field: "stockQuantity",
          message: "Stock Quantity must be a number",
        })
      }

      if (
        row.priceOfMaterial !== undefined &&
        (isNaN(Number(row.priceOfMaterial)) || Number(row.priceOfMaterial) < 0)
      ) {
        errors.push({
          row: index + 1,
          field: "priceOfMaterial",
          message: "Price must be a positive number",
        })
      }
    })

    return errors
  }

  // Transform Excel data to API format
  const transformExcelData = useCallback(
    (parsedData: ParsedData[], formValues: FormikValues) => {
      return parsedData.map((row, index) => ({
        materialId: index + 1,
        materialName: row.materialName || "",
        description: row.description || "",
        itemCategory: 2,
        unitOfMeasure: row.unitOfMeasure || "",
        materialGroup: 1,
        batchIndicator: formValues.batchIndicator || false,
        stockQuantity: Number(row.stockQuantity) || 0,
        minimumStockLevel: Number(row.minimumStockLevel) || 0,
        maximumStockLevel: Number(row.maximumStockLevel) || 0,
        reorderPoint: Number(row.reorderPoint) || 0,
        createdBy: username, // Using the logged-in username
        creationDate: formatDate(new Date()),
        modifiedBy: username, // Using the logged-in username
        lastModifiedDate: formatDate(new Date()),
        validFrom: formatDate(formValues.validFrom),
        validTo: formatDate(formValues.validTo),
        factoryIdFk: Number(formValues.factoryIdFk),
        plantIdFk: Number(formValues.plantIdFk),
        locationIdFk: Number(formValues.locationIdFk),
        machineCapacity: extractNumericValue(row.machineCapacity?.toString()),
        procurementType: row.procurementType || "",
        serializedMaterial: formValues.serializedMaterial || false,
        priceOfMaterial: Number(row.priceOfMaterial) || 0,
        isDeleted: false,
      }))
    },
    [formatDate, extractNumericValue, username], // Added username to dependencies
  )

  const handleSubmit = async (answerValues: FormikValues, actions: any) => {
    actions.setErrors({})
    actions.setSubmitting(true)

    try {
      await formValidationSchemaData.validate(answerValues, {
        abortEarly: false,
      })

      // Custom validations
      if (
        answerValues.bom &&
        answerValues.alternateBom &&
        answerValues.bom === answerValues.alternateBom
      ) {
        actions.setFieldError(
          "alternateBom",
          "Bom and AlternateBom cannot be the same",
        )
        actions.setSubmitting(false)
        return
      }

      if (
        answerValues.validFrom &&
        answerValues.validTo &&
        new Date(answerValues.validFrom) > new Date(answerValues.validTo)
      ) {
        actions.setFieldError(
          "validTo",
          "Valid To should be greater than Valid From",
        )
        actions.setSubmitting(false)
        return
      }

      handleSubmitForm(answerValues, actions)
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const errors = validationErrors.inner.reduce((acc: any, error: any) => {
          acc[error.path] = error.message
          return acc
        }, {})
        actions.setErrors(errors)
      }
      actions.setSubmitting(false)
    }
  }

  // API call function
  const uploadToAPI = useCallback(
    async (payload: any) => {
      console.log("Data being sent to API:", JSON.stringify(payload, null, 2))
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      )

      const responseData = await response.json()

      if (!response.ok || responseData.StatusCode !== "0000") {
        throw new Error(
          responseData.StatusMessage || `API Error: ${response.statusText}`,
        )
      }

      return responseData
    },
    [token],
  )

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    formValues: FormikValues,
  ) => {
    const file = e.target.files?.[0]
    if (!file) {
      toast.error("Please select a file to upload.")
      return
    }

    setIsUploading(true)

    try {
      // Read and parse Excel file
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(new Uint8Array(data), { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet) as ParsedData[]

      if (parsedData.length === 0) {
        throw new Error("The uploaded sheet is empty.")
      }

      // Validate Excel data
      const validationErrors = validateExcelData(parsedData)
      if (validationErrors.length > 0) {
        const errorMessage = validationErrors
          .map((error) => `Row ${error.row}: ${error.message}`)
          .join("\n")
        throw new Error(`Validation errors found:\n${errorMessage}`)
      }

      // Transform data
      const materialMasterData = transformExcelData(parsedData, formValues)

      // Create payload
      const payload = {
        StatusCode: "0000",
        StatusMessage: "Bulk Upload",
        materialMasterData: materialMasterData,
      }

      // Upload to API
      const responseData = await uploadToAPI(payload)

      toast.success(
        `${
          responseData.Data?.successCount || "All"
        } records uploaded successfully!`,
      )
      setTimeout(() => navigate("/material-master"), 2000)
    } catch (error) {
      console.error("Upload Error:", error)
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      )
    } finally {
      setIsUploading(false)
      if (e.target) e.target.value = ""
    }
  }

  // Generate template function
  const handleGenerate = useCallback((isValid: boolean) => {
    if (!isValid) {
      toast.error("Please fill out all required fields correctly.")
      return
    }

    setIsGenerating(true)
    setTimeout(() => {
      const link = document.createElement("a")
      link.href = `${window.location.origin}/Material_Bulk_Data_Template.xlsx`
      link.setAttribute("download", "Material_Bulk_Data_Template.xlsx")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setIsGenerating(false)
      toast.success("Template generated successfully in downloads!")
    }, 1500)
  }, [])

  return (
    <div className="w-full">
      <Formik
        initialValues={initialDefaultValueData}
        validationSchema={formValidationSchemaData}
        onSubmit={handleSubmit}
        validateOnMount
        enableReinitialize
      >
        {({ isSubmitting, isValid, values, errors }) => (
          <Form autoComplete="on">
            <HorizontalLabelFormField formVariables={formVariables} />

            {showGenerateUploadButtons && (
              <div className="mt-10 mb-4 flex items-center">
                <button
                  type="button"
                  className="btn btn-sm btn-primary text-base-100 flex items-center justify-center"
                  disabled={isGenerating || isSubmitting}
                  onClick={() => handleGenerate(isValid)}
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" /> Generating...
                    </span>
                  ) : (
                    "Generate"
                  )}
                </button>
                <div className="ml-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary text-base-100 flex items-center justify-center"
                    disabled={isUploading || isSubmitting}
                    onClick={() => {
                      if (!isValid) {
                        toast.error(
                          "Please fill out all required fields before selecting a file.",
                        )
                        return
                      }
                      fileInputRef.current?.click()
                    }}
                  >
                    {isUploading ? (
                      <span className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" /> Uploading...
                      </span>
                    ) : (
                      "Upload"
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx, .xls"
                    className="hidden"
                    onChange={(e) => handleUpload(e, values)}
                  />
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default BulkInsertionLabelForm
