// import { IFormVariable } from "@/utils/types"
// import * as yup from "yup"
// const _ = require("lodash")

// export const groupFormVariable = (variableList: IFormVariable[]) => {
//   return _.groupBy(variableList, "group")
// }

// export const initialFormikValues = (variableList: IFormVariable[]) => {
//   let initialFormData = variableList.reduce((formatDefault, formVarsData) => {
//     const defaultValue = formVarsData.default !== "" ? formVarsData.default : ""
//     return { ...formatDefault, [formVarsData.name]: defaultValue }
//   }, {})
//   return initialFormData
// }

// export const formValidationSchema = (variableList: IFormVariable[]) => {
//   let formValidationData: { [key: string]: any } = {}

//   variableList.forEach((variable) => {
//     if (variable.required) {
//       if (variable.type === "string") {
//         formValidationData[variable.name] = yup
//           .string()
//           .min(1, "Too Short!")
//           .required(`A value for ${variable.display} is required`)
//       } else if (variable.type === "number") {
//         formValidationData[variable.name] = yup
//           .number()
//           .min(1, "-ve values not allowed")
//           //.max(1000, "Value is too large")
//           .required(`A value for ${variable.display} is required`)
//       } else if (variable.type === "select") {
//         formValidationData[variable.name] = yup
//           .string()
//           .required(`A value for ${variable.display} is required`)
//       }
//     } else {
//       if (variable.type === "number") {
//         formValidationData[variable.name] = yup
//           .number()
//           .min(1, "-ve values not allowed")
//         // .max(1000, "Value is too large")
//       } else if (variable.type === "select") {
//         formValidationData[variable.name] = yup.string().nullable() // Allow null for non-required fields
//       }
//     }
//   })

//   const formValidationResult = yup.object().shape(formValidationData)
//   return formValidationResult
// }


// import { IFormVariable } from "@/utils/types";
// import * as yup from "yup";
// const _ = require("lodash");

// // Group variables by the "group" field for better organization
// export const groupFormVariable = (variableList: IFormVariable[]) => {
//   return _.groupBy(variableList, "group");
// };

// // Generate initial form values while ensuring defaults are handled correctly
// export const initialFormikValues = (variableList: IFormVariable[]) => {
//   return variableList.reduce((initialValues, variable) => {
//     // Set the default value, ensuring valid defaults for required fields
//     const defaultValue = 
//       variable.required && (variable.default === "" || variable.default === undefined)
//         ? null // Use null for required fields without valid defaults
//         : variable.default;

//     return { ...initialValues, [variable.name]: defaultValue };
//   }, {});
// };

// // Create a Yup validation schema based on the provided variables
// export const formValidationSchema = (variableList: IFormVariable[]) => {
//   const validationSchema: { [key: string]: any } = {};

//   variableList.forEach((variable) => {
//     if (variable.required) {
//       // Validation rules for required fields
//       if (variable.type === "string") {
//         validationSchema[variable.name] = yup
//           .string()
//           .min(1, "Too Short!")
//           .required(`A value for ${variable.display} is required`);
//       } else if (variable.type === "number") {
//         validationSchema[variable.name] = yup
//           .number()
//           .min(1, "-ve values not allowed")
//           .required(`A value for ${variable.display} is required`);
//       } else if (variable.type === "select") {
//         validationSchema[variable.name] = yup
//           .string()
//           .required(`A value for ${variable.display} is required`)
//           .notOneOf(["", null], `${variable.display} cannot be empty`);
//       } else if (variable.type === "bool") {
//         validationSchema[variable.name] = yup
//           .boolean()
//           .required(`A value for ${variable.display} is required`);
//       } else if (variable.type === "date") {
//         validationSchema[variable.name] = yup
//           .date()
//           .required(`A value for ${variable.display} is required`);
//       }
//     } else {
//       // Validation rules for optional fields
//       if (variable.type === "number") {
//         validationSchema[variable.name] = yup
//           .number()
//           .nullable()
//           .min(1, "-ve values not allowed");
//       } else if (variable.type === "select") {
//         validationSchema[variable.name] = yup.string().nullable(); // Allow null for non-required select fields
//       } else if (variable.type === "bool") {
//         validationSchema[variable.name] = yup.boolean().nullable();
//       } else if (variable.type === "date") {
//         validationSchema[variable.name] = yup.date().nullable();
//       }
//     }
//   });

//   return yup.object().shape(validationSchema);
// };


import { IFormVariable } from "@/utils/types"
import * as yup from "yup"
const _ = require("lodash")

export const groupFormVariable = (variableList: IFormVariable[]) => {
  return _.groupBy(variableList, "group")
}

export const initialFormikValues = (variableList: IFormVariable[]) => {
  return variableList.reduce((accumulator, variable) => {
    let defaultValue = variable.default

    if (
      (variable.type === "string" || variable.type === "password") &&
      (defaultValue === "" || defaultValue === null || defaultValue === undefined)
    ) {
      defaultValue = ""
    } else if (
      (variable.type === "number" || variable.type === "date") &&
      (defaultValue === "" || defaultValue === null || defaultValue === undefined)
    ) {
      defaultValue = null
    }

    accumulator[variable.name] = defaultValue

    if (variable.type === "password") {
      accumulator[`${variable.name}_retype`] = ""
    }



    return accumulator
  }, {} as Record<string, any>)
}




// Helper lists for display-based validation
const emailDisplayNames = ["Email", "User Email", "Contact Email"]
const contactNumberDisplayNames = [
  "Contact Number",
  "Phone Number",
  "Contact Phone",
  "Phone",

]
const nameFields = ["Name", "Contact Person", "First Name", "Last Name", "Job Name", "Description", "Routing Name", "Operation", "Operation Description", "Description", "Department Name","Material Name","Material Group Name"]
const factoryPlantFields = ["Factory Name", "Plant Name", "Storage Location Name", "Shift Name", "Version Name", "Version Description", "Line Name", "Work Center Name", "Material Group Name", "Description"]
const no = ["PO Number", "Line Capacity", "Lot Number","Batch Number","Order Number"]

export const formValidationSchema = (variableList: IFormVariable[]) => {
  let formValidationData: { [key: string]: any } = {}

  let startTimeKey = "";
  let endTimeKey = "";




  variableList.forEach((variable) => {
    if (variable.display === "Start Time") {
      startTimeKey = variable.name;
    }
    if (variable.display === "End Time") {
      endTimeKey = variable.name;
    }
    if (variable.required) {
      switch (variable.type) {
        case "string":
        case "string(textarea)":
          if (emailDisplayNames.includes(variable.display)) {
            formValidationData[variable.name] = yup
              .string()
              .email("Invalid email format")
              .matches(
                /^[^@]+@[^@]+\.[^@]{2,}$/,
                "Email must be a valid email address",
              )
              .required(`A value for ${variable.display} is required`)
          } else if (contactNumberDisplayNames.includes(variable.display)) {
            formValidationData[variable.name] = yup
              .string()
              .matches(
                /^\d{10}$/,
                `${variable.display} must be a 10-digit number`,
              )
              .required(`A value for ${variable.display} is required`)
          } else if (nameFields.includes(variable.display)) {
            formValidationData[variable.name] = yup
              .string()
              .matches(
                /^[A-Za-z\s]+$/,
                `${variable.display} must only contain letters and spaces`,
              )
              .required(`A value for ${variable.display} is required`)
          } else if (factoryPlantFields.includes(variable.display)) {
            formValidationData[variable.name] = yup
              .string()
              .matches(
                /^[A-Za-z\s0-9_()-.]+$/,
                `${variable.display} must only contain letters and spaces`,
              )
              .required(`A value for ${variable.display} is required`)
          } else if (no.includes(variable.display)) {
            formValidationData[variable.name] = yup
              .string()
              .matches(
                /^[A-Za-z0-9-]+$/,
                `${variable.display} must only contain digit and Letters`,
              )
              .required(`A value for ${variable.display} is required`)
          } else {
            formValidationData[variable.name] = yup
              .string()
              .min(1, "Too Short!")
              .required(`A value for ${variable.display} is required`)
          }


          break

        case "number":
          formValidationData[variable.name] = yup
            .number()
            .min(1, "-ve values not allowed")
            //.max(1000, "Value is too large")
            .required(`A value for ${variable.display} is required`)
          break

        case "select":
        case "selectcustom":
        case "selectone":
          formValidationData[variable.name] = yup
            .string()
            .required(`A value for ${variable.display} is required`)
          break

        case "bool":
          formValidationData[variable.name] = yup
            .boolean()
            .required(`A value for ${variable.display} is required`)
          break

        case "radio":
          formValidationData[variable.name] = yup
            .string()
            .required(`A value for ${variable.display} is required`)
          break

        case "date":
          formValidationData[variable.name] = yup
            .date()
            .typeError(`${variable.display} must be a valid date`)
            .required(`A value for ${variable.display} is required`)
          break

        case "password":
          // Password validation
          formValidationData[variable.name] = yup
            .string()
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(
              /[!@#$%^&*(),.?":{}|<>]/,
              "Password must contain at least one special character.",
            )
            .required(`A value for ${variable.display} is required`)

          // Retype password validation
          formValidationData[`${variable.name}_retype`] = yup
            .string()
            .oneOf(
              [yup.ref(variable.name),],
              `${variable.display} does not match the retyped password.`,
            )
            .required(`Please retype the ${variable.display}.`)
          break

        case "time":
          formValidationData[variable.name] = yup
            .string()
            .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")
            .required(`A value for ${variable.display} is required`)
          break

        case "depended":
        case "supervisorDD":
        case "managerDD":
          formValidationData[variable.name] = yup
            .string()
            .required(`A value for ${variable.display} is required`)
          break

        case "array":
          formValidationData[variable.name] = yup
            .array()
            .of(yup.string())
            .required(`A value for ${variable.display} is required`)
          break

        default:
          formValidationData[variable.name] = yup
            .string()
            .required(`A value for ${variable.display} is required`)
          break
      }
    } else {
      // Not required fields
      switch (variable.type) {
        case "number":
          formValidationData[variable.name] = yup
            .number()
            .min(1, "-ve values not allowed")
            .notRequired()
          break
        default:
          formValidationData[variable.name] = yup.string().notRequired()
          break
      }
    }
  })


  return yup.object().shape(formValidationData).test(
    "clock-time-duplicate-check",
    "Time validation error",
    function (values) {
      const toMinutes = (time?: string) => {
        if (!time || !/^\d{2}:\d{2}$/.test(time)) return NaN;
        const [hh, mm] = time.split(":").map(Number);
        return hh * 60 + mm;
      };

      // 1️⃣ Start / End Time
      if (startTimeKey && endTimeKey) {
        const start = values[startTimeKey];
        const end = values[endTimeKey];
        if (start && end && toMinutes(start) === toMinutes(end)) {
          return this.createError({
            path: startTimeKey,
            message: "Cannot add the same time for Start and End",
          });
        }
      }

      // 2️⃣ Clock In / Clock Out Start & End
      const clockFields: { [key: string]: string } = {};
      variableList.forEach((variable) => {
        if (variable.display === "Clock In Start") clockFields.inStart = variable.name;
        if (variable.display === "Clock In End") clockFields.inEnd = variable.name;
        if (variable.display === "Clock Out Start") clockFields.outStart = variable.name;
        if (variable.display === "Clock Out End") clockFields.outEnd = variable.name;
      });

      const times = {
        inStart: toMinutes(values[clockFields.inStart]),
        inEnd: toMinutes(values[clockFields.inEnd]),
        outStart: toMinutes(values[clockFields.outStart]),
        outEnd: toMinutes(values[clockFields.outEnd]),
      };

      //  Compare Clock In Start vs Clock In End
      if (!Number.isNaN(times.inStart) && !Number.isNaN(times.inEnd) && times.inStart === times.inEnd) {
        return this.createError({
          path: clockFields.inStart,
          message: "Clock In Start and Clock In End cannot be the same",
        });
      }

      //  Compare Clock Out Start vs Clock Out End
      if (!Number.isNaN(times.outStart) && !Number.isNaN(times.outEnd) && times.outStart === times.outEnd) {
        return this.createError({
          path: clockFields.outStart,
          message: "Clock Out Start and Clock Out End cannot be the same",
        });
      }

      return true;
    }
  );


}

