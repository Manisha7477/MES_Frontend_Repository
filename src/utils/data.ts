import {
  IOption,
  IOrderDetails,
  IRadialData,
  MenuItem,
  ITDAssignmentData,
  ITableData,
  BatteryTestData,
  TableDataWithSchemaType,
  IFormVariable,
  ISampleData,
  ITableVarible,
  ITableVarible1,
  type ITableHeader,
} from "@/utils/types"

import { date, number, string } from "yup"
import nookies from "nookies"

const token = nookies.get(null).accessToken || ""

export const SAMPLE_TABLE_DATA: ISampleData[] = [
  {
    name: "Ankit Kumar",
    job: "UX Designer",
    color: "Blue",
  },
  {
    name: "Aaditya Singh",
    job: "Senior Full Stack Developer",
    color: "Green",
  },
  {
    name: "Prathmesh",
    job: "Senior DotNet Developer",
    color: "Yellow",
  },
  {
    name: "Shivendra Singh",
    job: "Software Developer",
    color: "RED",
  },
]

export const MENU_DATA: MenuItem[] = [
  {
    title: "Organisation Structure",
    path: "/organisation_structure",
    submenu: [
      {
        title: "Factory",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/define",
          },
          {
            title: "Change",
            path: "/change",
          },
          {
            title: "Display",
            path: "/display",
          },
        ],
      },
      {
        title: "Plant",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/define",
          },
          {
            title: "Change",
            path: "/change",
          },
          {
            title: "Display",
            path: "/display",
          },
        ],
      },
      {
        title: "Storage Location",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/define",
          },
          {
            title: "Change",
            path: "/change",
          },
          {
            title: "Display",
            path: "/display",
          },
        ],
      },
      {
        title: "Assignments",
        path: "/",
        submenu: [
          {
            title: "Assign Storage Location to Plants",
            path: "/define",
          },
          {
            title: "Assign Plant to Factory",
            path: "/change",
          },
          {
            title: "Set up Organisation Structure",
            path: "/display",
          },
        ],
      },
    ],
  },
  {
    title: "Shopfloor Structure",
    path: "/organisation_structure",
    submenu: [
      {
        title: "Manufacturing Lines/Production Versions",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Routings",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/define",
          },
          {
            title: "Change",
            path: "/change",
          },
          {
            title: "Display",
            path: "/display",
          },
        ],
      },
      {
        title: "Work Centers",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/define",
          },
          {
            title: "Change",
            path: "/change",
          },
          {
            title: "Display",
            path: "/display",
          },
        ],
      },
    ],
  },
  {
    title: "User Management",
    path: "/organisation_structure",
    submenu: [
      {
        title: "User ID",
        path: "/",
        submenu: [
          {
            title: "User Creation",
            path: "/user-creation",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Assignments",
        path: "/",
        submenu: [
          {
            title: "Assign Shift Operators to Supervisors",
            path: "/define",
          },
          {
            title: "Assign Supervisors to Managers",
            path: "/change",
          },
          {
            title: "Assign Managers to Admins",
            path: "/display",
          },
          {
            title: "Setup User Structure",
            path: "/display",
          },
        ],
      },
      {
        title: "Shift Managements",
        path: "/",
        submenu: [
          {
            title: "Shift Creation",
            path: "/define",
          },
          {
            title: "Define Shift Time Groups",
            path: "/change",
          },
          {
            title: "Assign Shifts to Users",
            path: "/display",
          },
        ],
      },
      {
        title: "Job Allocations",
        path: "/",
        submenu: [
          {
            title: "Assign Jobs",
            path: "/display",
          },
        ],
      },
    ],
  },
  {
    title: "Master Data",
    path: "/user_management",
    submenu: [
      {
        title: "Material Master",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "BOM",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Serial Number Profile",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Inventory Management",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Number Ranges",
        path: "/",
        submenu: [
          {
            title: "Define Number Range Groups",
            path: "/",
          },
          {
            title: "Define Range From and To",
            path: "/",
          },
          {
            title: "Assign Range to Group",
            path: "/",
          },
          {
            title: "Assign Group to Objects",
            path: "/",
          },
        ],
      },
    ],
  },
  {
    title: "Transactional Data",
    path: "/user_management",
    submenu: [
      {
        title: "Production Orders",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Supplier Orders",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Supplier Master",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Stock Transfer Orders",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
      {
        title: "Order Confirmation",
        path: "/",
        submenu: [
          {
            title: "Define",
            path: "/",
          },
          {
            title: "Change",
            path: "/",
          },
          {
            title: "Display",
            path: "/",
          },
        ],
      },
    ],
  },
  {
    title: "Work In Progress",
    path: "/user_management",
    submenu: [
      {
        title: "Production Orders",
        path: "/",
        submenu: [
          {
            title: "Overall PO's",
            path: "/",
          },
          {
            title: "Open PO's",
            path: "/",
          },
          {
            title: "Closed OP's",
            path: "/",
          },
        ],
      },
      {
        title: "Reworks",
        path: "/",
        submenu: [
          {
            title: "Overall",
            path: "/",
          },
          {
            title: "Opened",
            path: "/",
          },
          {
            title: "Finished",
            path: "/",
          },
        ],
      },
      {
        title: "Work Centers",
        path: "/",
        submenu: [
          {
            title: "Work Running",
            path: "/",
          },
          {
            title: "Work Closed",
            path: "/",
          },
          {
            title: "Work Vacant",
            path: "/",
          },
        ],
      },
      {
        title: "Shift Ananlysis",
        path: "/",
        submenu: [
          {
            title: "Running",
            path: "/",
          },
          {
            title: "Closed",
            path: "/",
          },
          {
            title: "Vacant",
            path: "/",
          },
        ],
      },
    ],
  },
]

export const USER_CREATION_FORM_DATA: IFormVariable[] = [
  {
    name: "FirstName",
    type: "string",
    display: "First Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    showInUpdate: true,
  },
  {
    name: "LastName",
    type: "string",
    display: "Last Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    showInUpdate: true,
  },
  {
    name: "UserName",
    type: "string",
    display: "User Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    showInUpdate: true,
  },
  {
    name: "ContactNumber",
    type: "string",
    display: "Contact Number",
    default: "",
    description: "",
    required: true,
    group: 2,
    showInUpdate: true,
  },
  {
    name: "Email",
    type: "string",
    display: "Email",
    default: "",
    description: "",
    required: true,
    group: 1,
    showInUpdate: true,
  },
  {
    name: "Password",
    type: "password",
    display: "Password",
    default: "",
    description: "",
    required: true,
    group: 2,
    showInUpdate: false,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
    showInUpdate: true,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
    showInUpdate: true,
  },

  // {
  //   name: "RoleId",
  //   type: "selectone",
  //   display: "Role",
  //   options: [""],
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 2,
  //   API: `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetRolesDD`,
  //   showInUpdate: true,
  // },
  // {
  //   name: "SupervisorId",
  //   type: "supervisorDD",
  //   display: "By Supervisor",
  //   default: "",
  //   description: "",
  //   required: false,
  //   group: 2,
  //   options: [],
  //   supervisorDrop: "RoleId",
  //   API: `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetSupervisorDD`,
  //   showInUpdate: true,
  // },
  // {
  //   name: "ManagerId",
  //   type: "managerDD",
  //   display: "By Manager",
  //   default: "",
  //   description: "",
  //   required: false,
  //   group: 2,
  //   options: [],
  //   managerDrop: "SupervisorId",
  //   dependedDrop: "RoleId",
  //   API: `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetManagerDD`,
  //  showInUpdate: true,
  // },
]

export const TABLE_DATA: ITableVarible[] = [
  {
    parameter: "Battery Management System",
    cell_voltage: 13,
    pack_voltage: 38,
    charge_dicharge: 8,
    state_of_charge: 20,
    state_of_health: 15,
    cell_temperature: 28,
    pack_temperature: 71,
    ambient_temperature: 77,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 13,
    pack_voltage: 25,
    charge_dicharge: 12,
    state_of_charge: 35,
    state_of_health: 19,
    cell_temperature: 57,
    pack_temperature: 97,
    ambient_temperature: 18,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 17,
    pack_voltage: 127,
    charge_dicharge: 14,
    state_of_charge: 52,
    state_of_health: 67,
    cell_temperature: 10,
    pack_temperature: 71,
    ambient_temperature: 68,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 28,
    pack_voltage: 842,
    charge_dicharge: 17,
    state_of_charge: 2,
    state_of_health: 11,
    cell_temperature: 78,
    pack_temperature: 29,
    ambient_temperature: 36,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 2,
    pack_voltage: 944,
    charge_dicharge: 95,
    state_of_charge: 28,
    state_of_health: 59,
    cell_temperature: 37,
    pack_temperature: 95,
    ambient_temperature: 91,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 42,
    pack_voltage: 666,
    charge_dicharge: 75,
    state_of_charge: 14,
    state_of_health: 42,
    cell_temperature: 79,
    pack_temperature: 100,
    ambient_temperature: 71,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 97,
    pack_voltage: 819,
    charge_dicharge: 86,
    state_of_charge: 87,
    state_of_health: 61,
    cell_temperature: 23,
    pack_temperature: 80,
    ambient_temperature: 55,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 41,
    pack_voltage: 484,
    charge_dicharge: 86,
    state_of_charge: 87,
    state_of_health: 49,
    cell_temperature: 3,
    pack_temperature: 1,
    ambient_temperature: 51,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 71,
    pack_voltage: 148,
    charge_dicharge: 29,
    state_of_charge: 78,
    state_of_health: 76,
    cell_temperature: 97,
    pack_temperature: 45,
    ambient_temperature: 37,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 19,
    pack_voltage: 540,
    charge_dicharge: 79,
    state_of_charge: 99,
    state_of_health: 51,
    cell_temperature: 0,
    pack_temperature: 90,
    ambient_temperature: 45,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 57,
    pack_voltage: 30,
    charge_dicharge: 72,
    state_of_charge: 80,
    state_of_health: 47,
    cell_temperature: 0,
    pack_temperature: 10,
    ambient_temperature: 21,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 18,
    pack_voltage: 0,
    charge_dicharge: 56,
    state_of_charge: 69,
    state_of_health: 21,
    cell_temperature: 23,
    pack_temperature: 23,
    ambient_temperature: 68,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 97,
    pack_voltage: 864,
    charge_dicharge: 52,
    state_of_charge: 48,
    state_of_health: 54,
    cell_temperature: 60,
    pack_temperature: 52,
    ambient_temperature: 14,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 66,
    pack_voltage: 339,
    charge_dicharge: 98,
    state_of_charge: 43,
    state_of_health: 94,
    cell_temperature: 4,
    pack_temperature: 56,
    ambient_temperature: 4,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 1,
    pack_voltage: 15,
    charge_dicharge: 43,
    state_of_charge: 95,
    state_of_health: 41,
    cell_temperature: 59,
    pack_temperature: 27,
    ambient_temperature: 29,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 21,
    pack_voltage: 567,
    charge_dicharge: 44,
    state_of_charge: 46,
    state_of_health: 88,
    cell_temperature: 51,
    pack_temperature: 87,
    ambient_temperature: 6,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 16,
    pack_voltage: 590,
    charge_dicharge: 34,
    state_of_charge: 20,
    state_of_health: 14,
    cell_temperature: 45,
    pack_temperature: 69,
    ambient_temperature: 28,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 92,
    pack_voltage: 953,
    charge_dicharge: 43,
    state_of_charge: 73,
    state_of_health: 27,
    cell_temperature: 92,
    pack_temperature: 25,
    ambient_temperature: 28,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 88,
    pack_voltage: 773,
    charge_dicharge: 76,
    state_of_charge: 29,
    state_of_health: 31,
    cell_temperature: 9,
    pack_temperature: 68,
    ambient_temperature: 79,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 42,
    pack_voltage: 393,
    charge_dicharge: 54,
    state_of_charge: 19,
    state_of_health: 49,
    cell_temperature: 15,
    pack_temperature: 57,
    ambient_temperature: 32,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 38,
    pack_voltage: 390,
    charge_dicharge: 47,
    state_of_charge: 31,
    state_of_health: 3,
    cell_temperature: 50,
    pack_temperature: 24,
    ambient_temperature: 91,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 89,
    pack_voltage: 359,
    charge_dicharge: 8,
    state_of_charge: 64,
    state_of_health: 4,
    cell_temperature: 59,
    pack_temperature: 90,
    ambient_temperature: 33,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 90,
    pack_voltage: 649,
    charge_dicharge: 56,
    state_of_charge: 85,
    state_of_health: 100,
    cell_temperature: 26,
    pack_temperature: 48,
    ambient_temperature: 78,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 8,
    pack_voltage: 433,
    charge_dicharge: 35,
    state_of_charge: 64,
    state_of_health: 79,
    cell_temperature: 2,
    pack_temperature: 13,
    ambient_temperature: 63,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 3,
    pack_voltage: 982,
    charge_dicharge: 73,
    state_of_charge: 45,
    state_of_health: 79,
    cell_temperature: 2,
    pack_temperature: 16,
    ambient_temperature: 76,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 33,
    pack_voltage: 331,
    charge_dicharge: 58,
    state_of_charge: 12,
    state_of_health: 59,
    cell_temperature: 41,
    pack_temperature: 90,
    ambient_temperature: 72,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 50,
    pack_voltage: 133,
    charge_dicharge: 82,
    state_of_charge: 57,
    state_of_health: 53,
    cell_temperature: 42,
    pack_temperature: 47,
    ambient_temperature: 73,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 99,
    pack_voltage: 709,
    charge_dicharge: 43,
    state_of_charge: 35,
    state_of_health: 82,
    cell_temperature: 66,
    pack_temperature: 38,
    ambient_temperature: 20,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 19,
    pack_voltage: 248,
    charge_dicharge: 66,
    state_of_charge: 8,
    state_of_health: 46,
    cell_temperature: 53,
    pack_temperature: 15,
    ambient_temperature: 90,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 96,
    pack_voltage: 886,
    charge_dicharge: 52,
    state_of_charge: 40,
    state_of_health: 56,
    cell_temperature: 92,
    pack_temperature: 94,
    ambient_temperature: 19,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 82,
    pack_voltage: 661,
    charge_dicharge: 50,
    state_of_charge: 58,
    state_of_health: 62,
    cell_temperature: 70,
    pack_temperature: 43,
    ambient_temperature: 42,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 99,
    pack_voltage: 753,
    charge_dicharge: 67,
    state_of_charge: 37,
    state_of_health: 33,
    cell_temperature: 67,
    pack_temperature: 3,
    ambient_temperature: 61,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 17,
    pack_voltage: 726,
    charge_dicharge: 61,
    state_of_charge: 67,
    state_of_health: 94,
    cell_temperature: 57,
    pack_temperature: 31,
    ambient_temperature: 16,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 12,
    pack_voltage: 355,
    charge_dicharge: 100,
    state_of_charge: 67,
    state_of_health: 7,
    cell_temperature: 11,
    pack_temperature: 69,
    ambient_temperature: 13,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 71,
    pack_voltage: 298,
    charge_dicharge: 24,
    state_of_charge: 63,
    state_of_health: 68,
    cell_temperature: 27,
    pack_temperature: 38,
    ambient_temperature: 9,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 27,
    pack_voltage: 194,
    charge_dicharge: 5,
    state_of_charge: 25,
    state_of_health: 25,
    cell_temperature: 90,
    pack_temperature: 32,
    ambient_temperature: 77,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 40,
    pack_voltage: 862,
    charge_dicharge: 8,
    state_of_charge: 56,
    state_of_health: 39,
    cell_temperature: 60,
    pack_temperature: 70,
    ambient_temperature: 59,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 16,
    pack_voltage: 227,
    charge_dicharge: 56,
    state_of_charge: 10,
    state_of_health: 28,
    cell_temperature: 81,
    pack_temperature: 24,
    ambient_temperature: 87,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 43,
    pack_voltage: 793,
    charge_dicharge: 98,
    state_of_charge: 96,
    state_of_health: 13,
    cell_temperature: 23,
    pack_temperature: 7,
    ambient_temperature: 39,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 19,
    pack_voltage: 492,
    charge_dicharge: 10,
    state_of_charge: 78,
    state_of_health: 23,
    cell_temperature: 12,
    pack_temperature: 44,
    ambient_temperature: 84,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 15,
    pack_voltage: 128,
    charge_dicharge: 2,
    state_of_charge: 19,
    state_of_health: 0,
    cell_temperature: 65,
    pack_temperature: 42,
    ambient_temperature: 63,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 50,
    pack_voltage: 567,
    charge_dicharge: 73,
    state_of_charge: 21,
    state_of_health: 36,
    cell_temperature: 46,
    pack_temperature: 55,
    ambient_temperature: 84,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 68,
    pack_voltage: 713,
    charge_dicharge: 77,
    state_of_charge: 17,
    state_of_health: 43,
    cell_temperature: 52,
    pack_temperature: 35,
    ambient_temperature: 39,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 11,
    pack_voltage: 130,
    charge_dicharge: 56,
    state_of_charge: 96,
    state_of_health: 90,
    cell_temperature: 1,
    pack_temperature: 16,
    ambient_temperature: 52,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 78,
    pack_voltage: 75,
    charge_dicharge: 66,
    state_of_charge: 57,
    state_of_health: 67,
    cell_temperature: 15,
    pack_temperature: 77,
    ambient_temperature: 66,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 61,
    pack_voltage: 532,
    charge_dicharge: 6,
    state_of_charge: 38,
    state_of_health: 96,
    cell_temperature: 65,
    pack_temperature: 17,
    ambient_temperature: 21,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 91,
    pack_voltage: 227,
    charge_dicharge: 54,
    state_of_charge: 5,
    state_of_health: 43,
    cell_temperature: 84,
    pack_temperature: 23,
    ambient_temperature: 45,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 28,
    pack_voltage: 432,
    charge_dicharge: 12,
    state_of_charge: 64,
    state_of_health: 18,
    cell_temperature: 68,
    pack_temperature: 33,
    ambient_temperature: 21,
    cell_balancing_status: false,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 9,
    pack_voltage: 984,
    charge_dicharge: 75,
    state_of_charge: 96,
    state_of_health: 56,
    cell_temperature: 71,
    pack_temperature: 53,
    ambient_temperature: 26,
    cell_balancing_status: true,
  },
  {
    parameter: "Battery Management System",
    cell_voltage: 7,
    pack_voltage: 877,
    charge_dicharge: 60,
    state_of_charge: 1,
    state_of_health: 54,
    cell_temperature: 56,
    pack_temperature: 80,
    ambient_temperature: 93,
    cell_balancing_status: false,
  },
]
//Pack CDC Entries
export const PACK_CDC: BatteryTestData[] = [
  {
    stepIndex: 1,
    stepName: "Initial Charge",
    stepTime: "00:30:00.000",
    voltage: 3.7,
    cRate: 0.5,
    current: 1.5,
    cutOffVoltage: 4.2,
    cutOffCRate: 0.1,
    cutOffCurrent: 0.2,
    energy: 5.55,
    negativeDeltaV: 0.05,
    power: 5.55,
    resistance: 0.01,
    capacity: 1.5,
    recordSettings: "Auto",
    auxChannelRecordingCondition: "Normal",
    maxVoltage: 4.2,
    minVoltage: 3.7,
    maxTemperature: 40,
    minTemperature: 20,
    segmentRecord1: "Segment 1 Data",
    segmentRecord2: "Segment 2 Data",
    currentRange: 2,
  },
  {
    stepIndex: 2,
    stepName: "Discharge",
    stepTime: "01:00:00.000",
    voltage: 3.6,
    cRate: 1,
    current: 2,
    cutOffVoltage: 3.0,
    cutOffCRate: 0.2,
    cutOffCurrent: 0.3,
    energy: 7.2,
    negativeDeltaV: 0.1,
    power: 7.2,
    resistance: 0.015,
    capacity: 2,
    recordSettings: "Manual",
    auxChannelRecordingCondition: "High",
    maxVoltage: 4.1,
    minVoltage: 3.0,
    maxTemperature: 45,
    minTemperature: 25,
    segmentRecord1: "Segment 3 Data",
    segmentRecord2: "Segment 4 Data",
    currentRange: 3,
  },
  {
    stepIndex: 3,
    stepName: "Trickle Charge",
    stepTime: "00:15:00.000",
    voltage: 3.8,
    cRate: 0.2,
    current: 0.5,
    cutOffVoltage: 4.1,
    cutOffCRate: 0.05,
    cutOffCurrent: 0.1,
    energy: 1.9,
    negativeDeltaV: 0.02,
    power: 1.9,
    resistance: 0.008,
    capacity: 0.5,
    recordSettings: "Auto",
    auxChannelRecordingCondition: "Low",
    maxVoltage: 4.1,
    minVoltage: 3.8,
    maxTemperature: 35,
    minTemperature: 18,
    segmentRecord1: "Segment 5 Data",
    segmentRecord2: "Segment 6 Data",
    currentRange: 1,
  },
]

export const PROGRESS_DATA: {
  [key: string]: IRadialData
} = {
  completion_status: {
    text: "Completion Status against PO",
    value: 70,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  ok_quantity: {
    text: "Ok Quantity",
    value: 25,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  scrap_quantity: {
    text: "Scrap Quantity",
    value: 5,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
}

export const DOWNTIME_PROGRESS_DATA: IRadialData[] = [
  {
    number: 1,
    text: "Scrap Quantity",
    value: 90,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 2,
    text: "Scrap Quantity",
    value: 85,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 3,
    text: "Scrap Quantity",
    value: 89,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 4,
    text: "Scrap Quantity",
    value: 90,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 5,
    text: "Scrap Quantity",
    value: 75,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 6,
    text: "Scrap Quantity",
    value: 95,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 7,
    text: "Scrap Quantity",
    value: 70,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 8,
    text: "Scrap Quantity",
    value: 77,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 9,
    text: "Scrap Quantity",
    value: 88,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 10,
    text: "Scrap Quantity",
    value: 91,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 11,
    text: "Scrap Quantity",
    value: 81,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
  {
    number: 12,
    text: "Scrap Quantity",
    value: 65,
    size: "8rem",
    thick: "1rem",
    color: "red",
  },
]

export const OPERATION_DETAIL_FORM: IFormVariable[] = [
  {
    name: "operation",
    type: "string",
    display: "Operation",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "opDescription",
    type: "string",
    display: "Op. Description",
    default: "",
    description: "",
    required: false,
    group: 2,
  },
  {
    name: "confirmQty",
    type: "number",
    display: "Confirm Qty",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "scrapQty",
    type: "number",
    display: "Scrap Qty",
    default: "",
    description: "",
    required: false,
    group: 2,
  },
]
export const TABLE_DATA1: ITableVarible1[] = [
  {
    "Cell Serial Number": 11,
    "Test Start Date and Time": "ten",
    "Charge Rate(C-rate)": 11,
    "Discharge Rate(C-rate)": 23,
    "Charging Voltage(Volts)": 33,
    "Discharging rate(Volts)": 44,
    "Test Duration(Hours or Minutes)": 44,
    "Initial Cell Temperature (Degrees Celsius)": 33,
    "Final Cell Temperature (Degrees Celsius)": 12,
    "Overheating or Overcurrent Events": "Heating",
    "Pass/Fail Criteria": true,
  },
]

export type CELL_CAPACITY_TESTING_TYPE = {
  "Cell Serial Number": string
  "Vendor Information": string
  "Test Start Date and Time": string
  "Test Conditions": string
  "Testing Equipment ID": string
  "Testing Procedure": string
  "Charge Rate (C-rate)": number
  "Discharge Rate (C-rate)": number
  "Charging Voltage (Volts)": number
  "Discharging Voltage (Volts)": number
  "Test Duration (Hours or Minutes)": number
  "Number of Test Cycles": number
  "Initial Capacity (Ampere-hours or Watt-hours)": number
  "End of Test Capacity (Ampere-hours or Watt-hours)": number
  "Charging Efficiency (%)": number
  "Discharging Efficiency (%)": number
  "Initial Cell Temperature (Degrees Celsius)": number
  "Final Cell Temperature (Degrees Celsius)": number
  "Voltage vs. Time (Profile)": string
  "Current vs. Time (Profile)": string
  "Overheating or Overcurrent Events": string
  "Degradation Analysis": string
  "Pass/Fail Criteria": string
  "Operator ID": string
}
export type CELL_SORTING_TYPE = {
  "Cell Serial Number": string
  "Initial Capacity": number
  "End of Test Capacity": number
  "Capacity Range": string
  "Sorting Method": string
  "Sorting Equipment ID": string
  "Sorting Technician ID": string
  "Sorted Category": string
  "Visual Confirmation": string
  "Sorting Date and Time": string
  "Error Codes or Deviation Indicators": string
  "IDs of Operators or Technicians": string
}
export type PACK_ASSEMBLY_TYPE = {
  "Unique Component IDs": string
  "Supplier Information": string
  "Start Time": string
  "End Time": string
  "Sequence Number": number
  "Torque Values (Newton-meters)": number
  "Fastening Status (Successful/Not Successful)": string
  "Position Sensor Data (Coordinates)": string
  "Image Captures (Photos or Videos)": string
  "Defect Identification (Yes/No)": string
  "Ambient Temperature (Degrees Celsius)": number
  "Humidity (%)": number
  "Pressure Sensor Data (Pascals)": number
  "Voltage Checks (Volts)": number
  "Continuity Testing (Yes/No)": string
  "Welding Parameters (Energy Input)": string
  "Seal Integrity (Intact/Compromised)": string
  "Performance Test Results (Pass/Fail)": string
  "Quality Checks (Pass/Fail)": string
  "Serial Numbers	Batch Information": string
  "IDs of Assembly Operators": string
  "Cleanroom Data (Yes/No)": string
  "Error Codes or Descriptions": string
  "Material Consumption (Quantities)": number
  "Operator Comments": string
  "Voltage Check Completed (YES/NO)": string
  "Current Check Completed (YES/NO)": string
  "Modules Connected (YES/NO)": string
  "Connection Type (e.g., Series, Parallel)": string
  "Assembly Completed (YES/NO)": string
  "Connection Completed (YES/NO)": string
  "Insulation Test Completed (YES/NO)": string
  "Cascade Assembly Completed (YES/NO)": string
  "Top Lid Assembly Details": string
  "Air Leak Test Completed (YES/NO)": string
}
export type BMS_TESTING_TYPE = {
  TestID: string
  BatteryID: string
  StartTime: string
  EndTime: string
  TesterID: string
  VoltageStart: number
  VoltageEnd: number
  CurrentStart: number
  CurrentEnd: number
  TemperatureStart: number
  TemperatureEnd: number
  Result: string
  Notes: string
}
export type BATTERY_PACK_TESTING_TYPE = {
  "Battery Testing": string
  "Battery Serial Number": string
  "FQC Pass/Fail": string
  "Testing Equipment ID": string
  "Test Start Date and Time": string
  "Test Conditions": string
  "Charge Rate (C-rate)": number
  "Discharge Rate (C-rate)": number
  "Charging Voltage (Volts)": number
  "Discharging Voltage (Volts)": number
  "Test Duration (Hours or Minutes)": number
  "Number of Test Cycles": number
  "Initial Capacity (Ampere-hours or Watt-hours)": number
  "End of Test Capacity (Ampere-hours or Watt-hours)": number
  "Charging Efficiency (%)": number
  "Discharging Efficiency (%)": number
  "Initial Battery Temperature (Degrees Celsius)": number
  "Final Battery Temperature (Degrees Celsius)": number
  "Voltage vs. Time (Profile)": string
  "Current vs. Time (Profile)": string
  "Overheating or Overcurrent Events": string
  "Degradation Analysis": string
  "Pass/Fail Criteria": string
  "IDs of Operators or Technicians": string
}
export type FINAL_QUALITY_CHECK_TYPE = {
  "Final Quality Checks": string
  "Appearance Check (Pass/Fail)": string
  "Size Measurements (Millimeters)": number
  "Capacity Test (Ampere-hours)": number
  "Voltage Testing (Volts)": number
  "Internal Resistance Measurement (Ohms)": number
  "Overvoltage Test (Pass/Fail)": string
  "Undervoltage Test (Pass/Fail)": string
  "Short Circuit Test (Pass/Fail)": string
  "Number of Cycles": number
  "Thermal Cycling Data (Temperature Range, Cycles)": string
  "Humidity Testing (Percentage)": string
  "Operation Duration (Hours)": number
  "Test Results (Pass/Fail)": string
  "Serial Numbers	Packaging Details": string
  "Labeling Information": string
  "Quality Approval Status": string
  "(Approved/Not Approved)": string
}
export const FINAL_QUALITY_CHECK: FINAL_QUALITY_CHECK_TYPE[] = [
  {
    "Final Quality Checks": "1",
    "Appearance Check (Pass/Fail)": "1",
    "Size Measurements (Millimeters)": 1,
    "Capacity Test (Ampere-hours)": 1,
    "Voltage Testing (Volts)": 1,
    "Internal Resistance Measurement (Ohms)": 1,
    "Overvoltage Test (Pass/Fail)": "1",
    "Undervoltage Test (Pass/Fail)": "1",
    "Short Circuit Test (Pass/Fail)": "1",
    "Number of Cycles": 1,
    "Thermal Cycling Data (Temperature Range, Cycles)": "1",
    "Humidity Testing (Percentage)": "1",
    "Operation Duration (Hours)": 1,
    "Test Results (Pass/Fail)": "1",
    "Serial Numbers	Packaging Details": "1",
    "Labeling Information": "1",
    "Quality Approval Status": "1",
    "(Approved/Not Approved)": "1",
  },
  {
    "Final Quality Checks": "21",
    "Appearance Check (Pass/Fail)": "21",
    "Size Measurements (Millimeters)": 21,
    "Capacity Test (Ampere-hours)": 1,
    "Voltage Testing (Volts)": 21,
    "Internal Resistance Measurement (Ohms)": 21,
    "Overvoltage Test (Pass/Fail)": "21",
    "Undervoltage Test (Pass/Fail)": "21",
    "Short Circuit Test (Pass/Fail)": "21",
    "Number of Cycles": 21,
    "Thermal Cycling Data (Temperature Range, Cycles)": "21",
    "Humidity Testing (Percentage)": "21",
    "Operation Duration (Hours)": 21,
    "Test Results (Pass/Fail)": "21",
    "Serial Numbers	Packaging Details": "21",
    "Labeling Information": "21",
    "Quality Approval Status": "21",
    "(Approved/Not Approved)": "21",
  },
]
export type PACKING_TYPE = {
  "Unique Component IDs": string
  "Supplier Information": string
  "Start Time": string
  "End Time": string
  "Sequence Number": number
  "Torque Values (Newton-meters)": number
  "Fastening Status (Successful/Not Successful)": string
  "Position Sensor Data (Coordinates)": string
  "Image Captures (Photos or Videos)": string
  "Defect Identification (Yes/No)": string
  "Ambient Temperature (Degrees Celsius)": number
  "Humidity (%)": number
  "Pressure Sensor Data (Pascals)": number
  "Voltage Checks (Volts)": number
  "Continuity Testing (Yes/No)": string
  "Welding Parameters (Energy Input)": number
  "Seal Integrity (Intact/Compromised)": string
  "Performance Test Results (Pass/Fail)": string
  "Quality Checks (Pass/Fail)": string
  "Serial Numbers	Batch Information": string
  "IDs of Assembly Operators": string
  "Cleanroom Data (Yes/No)": string
  "Error Codes or Descriptions": string
  "Material Consumption (Quantities)": number
  "Operator Comments": string
  "Voltage Check Completed (YES/NO)": string
  "Current Check Completed (YES/NO)": string
  "Modules Connected (YES/NO)": string
  "Connection Type (e.g., Series, Parallel)": string
  "Assembly Completed (YES/NO)": string
  "Connection Completed (YES/NO)": string
  "Insulation Test Completed (YES/NO)": string
  "Cascade Assembly Completed (YES/NO)": string
  "Top Lid Assembly Details": string
  "Air Leak Test Completed (YES/NO)": string
}

export const CELL_CAPACITY_TESTING: CELL_CAPACITY_TESTING_TYPE[] = [
  {
    "Cell Serial Number": "1",
    "Vendor Information": "Ayush",
    "Test Start Date and Time": "12/02/22",
    "Test Conditions": "Humid",
    "Testing Equipment ID": "11",
    "Testing Procedure": "p1",
    "Charge Rate (C-rate)": 11,
    "Discharge Rate (C-rate)": 11,
    "Charging Voltage (Volts)": 11,
    "Discharging Voltage (Volts)": 11,
    "Test Duration (Hours or Minutes)": 11,
    "Number of Test Cycles": 11,
    "Initial Capacity (Ampere-hours or Watt-hours)": 11,
    "End of Test Capacity (Ampere-hours or Watt-hours)": 11,
    "Charging Efficiency (%)": 11,
    "Discharging Efficiency (%)": 11,
    "Initial Cell Temperature (Degrees Celsius)": 11,
    "Final Cell Temperature (Degrees Celsius)": 11,
    "Voltage vs. Time (Profile)": "11",
    "Current vs. Time (Profile)": "11",
    "Overheating or Overcurrent Events": "11",
    "Degradation Analysis": "11",
    "Pass/Fail Criteria": "11",
    "Operator ID": "11",
  },
  {
    "Cell Serial Number": "22",
    "Vendor Information": "Ayu22",
    "Test Start Date and Time": "12/02/22",
    "Test Conditions": "Humid",
    "Testing Equipment ID": "22",
    "Testing Procedure": "22",
    "Charge Rate (C-rate)": 22,
    "Discharge Rate (C-rate)": 22,
    "Charging Voltage (Volts)": 22,
    "Discharging Voltage (Volts)": 22,
    "Test Duration (Hours or Minutes)": 22,
    "Number of Test Cycles": 22,
    "Initial Capacity (Ampere-hours or Watt-hours)": 22,
    "End of Test Capacity (Ampere-hours or Watt-hours)": 22,
    "Charging Efficiency (%)": 22,
    "Discharging Efficiency (%)": 22,
    "Initial Cell Temperature (Degrees Celsius)": 22,
    "Final Cell Temperature (Degrees Celsius)": 22,
    "Voltage vs. Time (Profile)": "22",
    "Current vs. Time (Profile)": "22",
    "Overheating or Overcurrent Events": "22",
    "Degradation Analysis": "22",
    "Pass/Fail Criteria": "22",
    "Operator ID": "22",
  },
  {
    "Cell Serial Number": "33",
    "Vendor Information": "Ayush",
    "Test Start Date and Time": "12/02/33",
    "Test Conditions": "Humid",
    "Testing Equipment ID": "33",
    "Testing Procedure": "33",
    "Charge Rate (C-rate)": 33,
    "Discharge Rate (C-rate)": 33,
    "Charging Voltage (Volts)": 33,
    "Discharging Voltage (Volts)": 33,
    "Test Duration (Hours or Minutes)": 33,
    "Number of Test Cycles": 33,
    "Initial Capacity (Ampere-hours or Watt-hours)": 33,
    "End of Test Capacity (Ampere-hours or Watt-hours)": 33,
    "Charging Efficiency (%)": 33,
    "Discharging Efficiency (%)": 33,
    "Initial Cell Temperature (Degrees Celsius)": 33,
    "Final Cell Temperature (Degrees Celsius)": 11,
    "Voltage vs. Time (Profile)": "33",
    "Current vs. Time (Profile)": "33",
    "Overheating or Overcurrent Events": "33",
    "Degradation Analysis": "33",
    "Pass/Fail Criteria": "33",
    "Operator ID": "33",
  },
]

export const CELL_SORTING: CELL_SORTING_TYPE[] = [
  {
    "Cell Serial Number": "1",
    "Initial Capacity": 1,
    "End of Test Capacity": 1,
    "Capacity Range": "1",
    "Sorting Method": "1",
    "Sorting Equipment ID": "1",
    "Sorting Technician ID": "1",
    "Sorted Category": "1",
    "Visual Confirmation": "1",
    "Sorting Date and Time": "1",
    "Error Codes or Deviation Indicators": "1",
    "IDs of Operators or Technicians": "1",
  },
  {
    "Cell Serial Number": "2",
    "Initial Capacity": 2,
    "End of Test Capacity": 2,
    "Capacity Range": "2",
    "Sorting Method": "2",
    "Sorting Equipment ID": "2",
    "Sorting Technician ID": "2",
    "Sorted Category": "2",
    "Visual Confirmation": "2",
    "Sorting Date and Time": "2",
    "Error Codes or Deviation Indicators": "2",
    "IDs of Operators or Technicians": "2",
  },
  {
    "Cell Serial Number": "3",
    "Initial Capacity": 3,
    "End of Test Capacity": 3,
    "Capacity Range": "3",
    "Sorting Method": "3",
    "Sorting Equipment ID": "3",
    "Sorting Technician ID": "3",
    "Sorted Category": "3",
    "Visual Confirmation": "3",
    "Sorting Date and Time": "3",
    "Error Codes or Deviation Indicators": "3",
    "IDs of Operators or Technicians": "3",
  },
]

export const PACK_ASSEMBLY: PACK_ASSEMBLY_TYPE[] = [
  {
    "Unique Component IDs": "6",
    "Supplier Information": "6",
    "Start Time": "6",
    "End Time": "6",
    "Sequence Number": 6,
    "Torque Values (Newton-meters)": 6,
    "Fastening Status (Successful/Not Successful)": "6",
    "Position Sensor Data (Coordinates)": "6",
    "Image Captures (Photos or Videos)": "6",
    "Defect Identification (Yes/No)": "6",
    "Ambient Temperature (Degrees Celsius)": 6,
    "Humidity (%)": 6,
    "Pressure Sensor Data (Pascals)": 6,
    "Voltage Checks (Volts)": 6,
    "Continuity Testing (Yes/No)": "6",
    "Welding Parameters (Energy Input)": "6",
    "Seal Integrity (Intact/Compromised)": "6",
    "Performance Test Results (Pass/Fail)": "6",
    "Quality Checks (Pass/Fail)": "6",
    "Serial Numbers	Batch Information": "6",
    "IDs of Assembly Operators": "6",
    "Cleanroom Data (Yes/No)": "6",
    "Error Codes or Descriptions": "6",
    "Material Consumption (Quantities)": 6,
    "Operator Comments": "6",
    "Voltage Check Completed (YES/NO)": " 6",
    "Current Check Completed (YES/NO)": "6",
    "Modules Connected (YES/NO)": "6",
    "Connection Type (e.g., Series, Parallel)": "6",
    "Assembly Completed (YES/NO)": "6",
    "Connection Completed (YES/NO)": "6",
    "Insulation Test Completed (YES/NO)": "6",
    "Cascade Assembly Completed (YES/NO)": "6",
    "Top Lid Assembly Details": "6",
    "Air Leak Test Completed (YES/NO)": "6",
  },
  {
    "Unique Component IDs": "77",
    "Supplier Information": "77",
    "Start Time": "77",
    "End Time": "77",
    "Sequence Number": 77,
    "Torque Values (Newton-meters)": 77,
    "Fastening Status (Successful/Not Successful)": "77",
    "Position Sensor Data (Coordinates)": "77",
    "Image Captures (Photos or Videos)": "77",
    "Defect Identification (Yes/No)": "77",
    "Ambient Temperature (Degrees Celsius)": 77,
    "Humidity (%)": 77,
    "Pressure Sensor Data (Pascals)": 77,
    "Voltage Checks (Volts)": 77,
    "Continuity Testing (Yes/No)": "77",
    "Welding Parameters (Energy Input)": "77",
    "Seal Integrity (Intact/Compromised)": "77",
    "Performance Test Results (Pass/Fail)": "77",
    "Quality Checks (Pass/Fail)": "77",
    "Serial Numbers	Batch Information": "77",
    "IDs of Assembly Operators": "77",
    "Cleanroom Data (Yes/No)": "77",
    "Error Codes or Descriptions": "77",
    "Material Consumption (Quantities)": 77,
    "Operator Comments": "77",
    "Voltage Check Completed (YES/NO)": " 77",
    "Current Check Completed (YES/NO)": "77",
    "Modules Connected (YES/NO)": "77",
    "Connection Type (e.g., Series, Parallel)": "77",
    "Assembly Completed (YES/NO)": "77",
    "Connection Completed (YES/NO)": "77",
    "Insulation Test Completed (YES/NO)": "77",
    "Cascade Assembly Completed (YES/NO)": "77",
    "Top Lid Assembly Details": "77",
    "Air Leak Test Completed (YES/NO)": "77",
  },
  {
    "Unique Component IDs": "99",
    "Supplier Information": "99",
    "Start Time": "99",
    "End Time": "99",
    "Sequence Number": 99,
    "Torque Values (Newton-meters)": 99,
    "Fastening Status (Successful/Not Successful)": "99",
    "Position Sensor Data (Coordinates)": "99",
    "Image Captures (Photos or Videos)": "99",
    "Defect Identification (Yes/No)": "99",
    "Ambient Temperature (Degrees Celsius)": 99,
    "Humidity (%)": 99,
    "Pressure Sensor Data (Pascals)": 99,
    "Voltage Checks (Volts)": 99,
    "Continuity Testing (Yes/No)": "99",
    "Welding Parameters (Energy Input)": "99",
    "Seal Integrity (Intact/Compromised)": "99",
    "Performance Test Results (Pass/Fail)": "99",
    "Quality Checks (Pass/Fail)": "99",
    "Serial Numbers	Batch Information": "99",
    "IDs of Assembly Operators": "99",
    "Cleanroom Data (Yes/No)": "99",
    "Error Codes or Descriptions": "99",
    "Material Consumption (Quantities)": 99,
    "Operator Comments": "99",
    "Voltage Check Completed (YES/NO)": " 99",
    "Current Check Completed (YES/NO)": "99",
    "Modules Connected (YES/NO)": "99",
    "Connection Type (e.g., Series, Parallel)": "99",
    "Assembly Completed (YES/NO)": "99",
    "Connection Completed (YES/NO)": "99",
    "Insulation Test Completed (YES/NO)": "99",
    "Cascade Assembly Completed (YES/NO)": "99",
    "Top Lid Assembly Details": "99",
    "Air Leak Test Completed (YES/NO)": "99",
  },
]

export const BMS_TESTING: BMS_TESTING_TYPE[] = [
  {
    TestID: "11",
    BatteryID: "11",
    StartTime: "11",
    EndTime: "11",
    TesterID: "11",
    VoltageStart: 11,
    VoltageEnd: 11,
    CurrentStart: 11,
    CurrentEnd: 11,
    TemperatureStart: 11,
    TemperatureEnd: 11,
    Result: "11",
    Notes: "11",
  },
  {
    TestID: "22",
    BatteryID: "22",
    StartTime: "22",
    EndTime: "22",
    TesterID: "22",
    VoltageStart: 22,
    VoltageEnd: 22,
    CurrentStart: 22,
    CurrentEnd: 22,
    TemperatureStart: 22,
    TemperatureEnd: 22,
    Result: "22",
    Notes: "22",
  },
  {
    TestID: "33",
    BatteryID: "33",
    StartTime: "33",
    EndTime: "33",
    TesterID: "33",
    VoltageStart: 33,
    VoltageEnd: 33,
    CurrentStart: 33,
    CurrentEnd: 33,
    TemperatureStart: 33,
    TemperatureEnd: 33,
    Result: "33",
    Notes: "33",
  },
]
export const BATTERY_PACK_TESTING: BATTERY_PACK_TESTING_TYPE[] = [
  {
    "Battery Testing": "1",
    "Battery Serial Number": "1",
    "FQC Pass/Fail": "1",
    "Testing Equipment ID": "1",
    "Test Start Date and Time": "1",
    "Test Conditions": "1",
    "Charge Rate (C-rate)": 1,
    "Discharge Rate (C-rate)": 1,
    "Charging Voltage (Volts)": 1,
    "Discharging Voltage (Volts)": 1,
    "Test Duration (Hours or Minutes)": 1,
    "Number of Test Cycles": 1,
    "Initial Capacity (Ampere-hours or Watt-hours)": 1,
    "End of Test Capacity (Ampere-hours or Watt-hours)": 1,
    "Charging Efficiency (%)": 1,
    "Discharging Efficiency (%)": 1,
    "Initial Battery Temperature (Degrees Celsius)": 1,
    "Final Battery Temperature (Degrees Celsius)": 1,
    "Voltage vs. Time (Profile)": "1",
    "Current vs. Time (Profile)": "1",
    "Overheating or Overcurrent Events": "1",
    "Degradation Analysis": "1",
    "Pass/Fail Criteria": "1",
    "IDs of Operators or Technicians": "1",
  },
  {
    "Battery Testing": "23",
    "Battery Serial Number": "23",
    "FQC Pass/Fail": "23",
    "Testing Equipment ID": "23",
    "Test Start Date and Time": "23",
    "Test Conditions": "23",
    "Charge Rate (C-rate)": 23,
    "Discharge Rate (C-rate)": 23,
    "Charging Voltage (Volts)": 23,
    "Discharging Voltage (Volts)": 23,
    "Test Duration (Hours or Minutes)": 23,
    "Number of Test Cycles": 23,
    "Initial Capacity (Ampere-hours or Watt-hours)": 23,
    "End of Test Capacity (Ampere-hours or Watt-hours)": 23,
    "Charging Efficiency (%)": 23,
    "Discharging Efficiency (%)": 23,
    "Initial Battery Temperature (Degrees Celsius)": 23,
    "Final Battery Temperature (Degrees Celsius)": 23,
    "Voltage vs. Time (Profile)": "23",
    "Current vs. Time (Profile)": "23",
    "Overheating or Overcurrent Events": "23",
    "Degradation Analysis": "23",
    "Pass/Fail Criteria": "23",
    "IDs of Operators or Technicians": "23",
  },
  {
    "Battery Testing": "12",
    "Battery Serial Number": "12",
    "FQC Pass/Fail": "12",
    "Testing Equipment ID": "12",
    "Test Start Date and Time": "12",
    "Test Conditions": "12",
    "Charge Rate (C-rate)": 12,
    "Discharge Rate (C-rate)": 12,
    "Charging Voltage (Volts)": 12,
    "Discharging Voltage (Volts)": 12,
    "Test Duration (Hours or Minutes)": 12,
    "Number of Test Cycles": 12,
    "Initial Capacity (Ampere-hours or Watt-hours)": 12,
    "End of Test Capacity (Ampere-hours or Watt-hours)": 12,
    "Charging Efficiency (%)": 12,
    "Discharging Efficiency (%)": 12,
    "Initial Battery Temperature (Degrees Celsius)": 12,
    "Final Battery Temperature (Degrees Celsius)": 12,
    "Voltage vs. Time (Profile)": "12",
    "Current vs. Time (Profile)": "12",
    "Overheating or Overcurrent Events": "12",
    "Degradation Analysis": "12",
    "Pass/Fail Criteria": "12",
    "IDs of Operators or Technicians": "12",
  },
  {
    "Battery Testing": "33",
    "Battery Serial Number": "33",
    "FQC Pass/Fail": "33",
    "Testing Equipment ID": "33",
    "Test Start Date and Time": "33",
    "Test Conditions": "33",
    "Charge Rate (C-rate)": 33,
    "Discharge Rate (C-rate)": 33,
    "Charging Voltage (Volts)": 33,
    "Discharging Voltage (Volts)": 33,
    "Test Duration (Hours or Minutes)": 33,
    "Number of Test Cycles": 33,
    "Initial Capacity (Ampere-hours or Watt-hours)": 33,
    "End of Test Capacity (Ampere-hours or Watt-hours)": 33,
    "Charging Efficiency (%)": 33,
    "Discharging Efficiency (%)": 33,
    "Initial Battery Temperature (Degrees Celsius)": 33,
    "Final Battery Temperature (Degrees Celsius)": 33,
    "Voltage vs. Time (Profile)": "33",
    "Current vs. Time (Profile)": "33",
    "Overheating or Overcurrent Events": "33",
    "Degradation Analysis": "33",
    "Pass/Fail Criteria": "33",
    "IDs of Operators or Technicians": "33",
  },
]

export const PACKING: PACKING_TYPE[] = [
  {
    "Unique Component IDs": "1",
    "Supplier Information": "1",
    "Start Time": "1",
    "End Time": "1",
    "Sequence Number": 1,
    "Torque Values (Newton-meters)": 1,
    "Fastening Status (Successful/Not Successful)": "1",
    "Position Sensor Data (Coordinates)": "1",
    "Image Captures (Photos or Videos)": "1",
    "Defect Identification (Yes/No)": "1",
    "Ambient Temperature (Degrees Celsius)": 1,
    "Humidity (%)": 1,
    "Pressure Sensor Data (Pascals)": 1,
    "Voltage Checks (Volts)": 1,
    "Continuity Testing (Yes/No)": "1",
    "Welding Parameters (Energy Input)": 1,
    "Seal Integrity (Intact/Compromised)": "1",
    "Performance Test Results (Pass/Fail)": "1",
    "Quality Checks (Pass/Fail)": "1",
    "Serial Numbers	Batch Information": "1",
    "IDs of Assembly Operators": "1",
    "Cleanroom Data (Yes/No)": "1",
    "Error Codes or Descriptions": "1",
    "Material Consumption (Quantities)": 1,
    "Operator Comments": "1",
    "Voltage Check Completed (YES/NO)": "1",
    "Current Check Completed (YES/NO)": "1",
    "Modules Connected (YES/NO)": "1",
    "Connection Type (e.g., Series, Parallel)": "1",
    "Assembly Completed (YES/NO)": "1",
    "Connection Completed (YES/NO)": "1",
    "Insulation Test Completed (YES/NO)": "1",
    "Cascade Assembly Completed (YES/NO)": "1",
    "Top Lid Assembly Details": "1",
    "Air Leak Test Completed (YES/NO)": "1",
  },
  {
    "Unique Component IDs": "66",
    "Supplier Information": "66",
    "Start Time": "66",
    "End Time": "66",
    "Sequence Number": 66,
    "Torque Values (Newton-meters)": 66,
    "Fastening Status (Successful/Not Successful)": "66",
    "Position Sensor Data (Coordinates)": "66",
    "Image Captures (Photos or Videos)": "66",
    "Defect Identification (Yes/No)": "66",
    "Ambient Temperature (Degrees Celsius)": 66,
    "Humidity (%)": 66,
    "Pressure Sensor Data (Pascals)": 66,
    "Voltage Checks (Volts)": 66,
    "Continuity Testing (Yes/No)": "66",
    "Welding Parameters (Energy Input)": 66,
    "Seal Integrity (Intact/Compromised)": "66",
    "Performance Test Results (Pass/Fail)": "66",
    "Quality Checks (Pass/Fail)": "66",
    "Serial Numbers	Batch Information": "66",
    "IDs of Assembly Operators": "66",
    "Cleanroom Data (Yes/No)": "66",
    "Error Codes or Descriptions": "66",
    "Material Consumption (Quantities)": 66,
    "Operator Comments": "1",
    "Voltage Check Completed (YES/NO)": "66",
    "Current Check Completed (YES/NO)": "66",
    "Modules Connected (YES/NO)": "66",
    "Connection Type (e.g., Series, Parallel)": "66",
    "Assembly Completed (YES/NO)": "66",
    "Connection Completed (YES/NO)": "66",
    "Insulation Test Completed (YES/NO)": "66",
    "Cascade Assembly Completed (YES/NO)": "66",
    "Top Lid Assembly Details": "66",
    "Air Leak Test Completed (YES/NO)": "66",
  },
]

// export const BATTERY_PACK_TESTING : BATTERY_PACK_TESTING_TYPE[] : [
// {

// 'Battery Testing'
// 'Battery Serial Number'
// 'FQC Pass/Fail'
// 'Testing Equipment ID'
// 'Test Start Date and Time'
// 'Test Conditions'
// 'Charge Rate (C-rate)'
// 'Discharge Rate (C-rate)'
// 'Charging Voltage (Volts)'
// 'Discharging Voltage (Volts)'
// 'Test Duration (Hours or Minutes)'
// 'Number of Test Cycles'
// 'Initial Capacity (Ampere-hours or Watt-hours)'
// 'End of Test Capacity (Ampere-hours or Watt-hours)'
// 'Charging Efficiency (%)	Discharging Efficiency (%)'
// 'Initial Battery Temperature (Degrees Celsius)'
// 'Final Battery Temperature (Degrees Celsius)'
// 'Voltage vs. Time (Profile)'
// 'Current vs. Time (Profile)'
// 'Overheating or Overcurrent Events'
// 'Degradation Analysis'
// 'Pass/Fail Criteria'
// 'IDs of Operators or Technician's
// }
// ]

// export const tableDataWithSchema = {
//   tableDef: [
//     {
//       id: "parameters",
//       key: "parameter",
//     },
//     {
//       id: "votage",
//       header: "Voltage",
//       columns: [
//         {
//           header: "Cell Voltage (Volts)",
//           key: "cell_voltage",
//         },
//         {
//           header: "Pack Voltage (Volts)",
//           key: "pack_voltage",
//         },
//       ],
//     },
//     {
//       id: "current",
//       header: "Current Data",
//       columns: [
//         {
//           header: "Charge/Discharge Current (Ampere)",
//           key: "charge_dicharge",
//         },
//         {
//           header: "State of Charge (SoC) (%)",
//           key: "state_of_charge",
//         },
//         {
//           header: "State of Health (SoH) (%)",
//           key: "state_of_health",
//         },
//       ],
//     },
//     {
//       id: "temperature",
//       header: "Temperature Data",
//       columns: [
//         {
//           header: "Cell Temperature (Degree Celcius)",
//           key: "cell_temperature",
//         },
//         {
//           header: "Pack Temperature (Degree Celcius)",
//           key: "pack_temperature",
//         },
//         {
//           header: "Ambient Temperature (Degree Celcius)",
//           key: "ambient_temperature",
//         },
//       ],
//     },
//     {
//       id: "balance",
//       header: "Balancing",
//       columns: [
//         {
//           header: "Cell Balancing Status (On/Off)",
//           key: "cell_balancing_status",
//         },
//       ],
//     },
//   ],
//   // data: [
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 13,
//   //     pack_voltage: 38,
//   //     charge_dicharge: 8,
//   //     state_of_charge: 20,
//   //     state_of_health: 15,
//   //     cell_temperature: 28,
//   //     pack_temperature: 71,
//   //     ambient_temperature: 77,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 13,
//   //     pack_voltage: 25,
//   //     charge_dicharge: 12,
//   //     state_of_charge: 35,
//   //     state_of_health: 19,
//   //     cell_temperature: 57,
//   //     pack_temperature: 97,
//   //     ambient_temperature: 18,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 17,
//   //     pack_voltage: 127,
//   //     charge_dicharge: 14,
//   //     state_of_charge: 52,
//   //     state_of_health: 67,
//   //     cell_temperature: 10,
//   //     pack_temperature: 71,
//   //     ambient_temperature: 68,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 28,
//   //     pack_voltage: 842,
//   //     charge_dicharge: 17,
//   //     state_of_charge: 2,
//   //     state_of_health: 11,
//   //     cell_temperature: 78,
//   //     pack_temperature: 29,
//   //     ambient_temperature: 36,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 2,
//   //     pack_voltage: 944,
//   //     charge_dicharge: 95,
//   //     state_of_charge: 28,
//   //     state_of_health: 59,
//   //     cell_temperature: 37,
//   //     pack_temperature: 95,
//   //     ambient_temperature: 91,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 42,
//   //     pack_voltage: 666,
//   //     charge_dicharge: 75,
//   //     state_of_charge: 14,
//   //     state_of_health: 42,
//   //     cell_temperature: 79,
//   //     pack_temperature: 100,
//   //     ambient_temperature: 71,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 97,
//   //     pack_voltage: 819,
//   //     charge_dicharge: 86,
//   //     state_of_charge: 87,
//   //     state_of_health: 61,
//   //     cell_temperature: 23,
//   //     pack_temperature: 80,
//   //     ambient_temperature: 55,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 41,
//   //     pack_voltage: 484,
//   //     charge_dicharge: 86,
//   //     state_of_charge: 87,
//   //     state_of_health: 49,
//   //     cell_temperature: 3,
//   //     pack_temperature: 1,
//   //     ambient_temperature: 51,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 71,
//   //     pack_voltage: 148,
//   //     charge_dicharge: 29,
//   //     state_of_charge: 78,
//   //     state_of_health: 76,
//   //     cell_temperature: 97,
//   //     pack_temperature: 45,
//   //     ambient_temperature: 37,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 19,
//   //     pack_voltage: 540,
//   //     charge_dicharge: 79,
//   //     state_of_charge: 99,
//   //     state_of_health: 51,
//   //     cell_temperature: 0,
//   //     pack_temperature: 90,
//   //     ambient_temperature: 45,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 57,
//   //     pack_voltage: 30,
//   //     charge_dicharge: 72,
//   //     state_of_charge: 80,
//   //     state_of_health: 47,
//   //     cell_temperature: 0,
//   //     pack_temperature: 10,
//   //     ambient_temperature: 21,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 18,
//   //     pack_voltage: 0,
//   //     charge_dicharge: 56,
//   //     state_of_charge: 69,
//   //     state_of_health: 21,
//   //     cell_temperature: 23,
//   //     pack_temperature: 23,
//   //     ambient_temperature: 68,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 97,
//   //     pack_voltage: 864,
//   //     charge_dicharge: 52,
//   //     state_of_charge: 48,
//   //     state_of_health: 54,
//   //     cell_temperature: 60,
//   //     pack_temperature: 52,
//   //     ambient_temperature: 14,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 66,
//   //     pack_voltage: 339,
//   //     charge_dicharge: 98,
//   //     state_of_charge: 43,
//   //     state_of_health: 94,
//   //     cell_temperature: 4,
//   //     pack_temperature: 56,
//   //     ambient_temperature: 4,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 1,
//   //     pack_voltage: 15,
//   //     charge_dicharge: 43,
//   //     state_of_charge: 95,
//   //     state_of_health: 41,
//   //     cell_temperature: 59,
//   //     pack_temperature: 27,
//   //     ambient_temperature: 29,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 21,
//   //     pack_voltage: 567,
//   //     charge_dicharge: 44,
//   //     state_of_charge: 46,
//   //     state_of_health: 88,
//   //     cell_temperature: 51,
//   //     pack_temperature: 87,
//   //     ambient_temperature: 6,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 16,
//   //     pack_voltage: 590,
//   //     charge_dicharge: 34,
//   //     state_of_charge: 20,
//   //     state_of_health: 14,
//   //     cell_temperature: 45,
//   //     pack_temperature: 69,
//   //     ambient_temperature: 28,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 92,
//   //     pack_voltage: 953,
//   //     charge_dicharge: 43,
//   //     state_of_charge: 73,
//   //     state_of_health: 27,
//   //     cell_temperature: 92,
//   //     pack_temperature: 25,
//   //     ambient_temperature: 28,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 88,
//   //     pack_voltage: 773,
//   //     charge_dicharge: 76,
//   //     state_of_charge: 29,
//   //     state_of_health: 31,
//   //     cell_temperature: 9,
//   //     pack_temperature: 68,
//   //     ambient_temperature: 79,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 42,
//   //     pack_voltage: 393,
//   //     charge_dicharge: 54,
//   //     state_of_charge: 19,
//   //     state_of_health: 49,
//   //     cell_temperature: 15,
//   //     pack_temperature: 57,
//   //     ambient_temperature: 32,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 38,
//   //     pack_voltage: 390,
//   //     charge_dicharge: 47,
//   //     state_of_charge: 31,
//   //     state_of_health: 3,
//   //     cell_temperature: 50,
//   //     pack_temperature: 24,
//   //     ambient_temperature: 91,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 89,
//   //     pack_voltage: 359,
//   //     charge_dicharge: 8,
//   //     state_of_charge: 64,
//   //     state_of_health: 4,
//   //     cell_temperature: 59,
//   //     pack_temperature: 90,
//   //     ambient_temperature: 33,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 90,
//   //     pack_voltage: 649,
//   //     charge_dicharge: 56,
//   //     state_of_charge: 85,
//   //     state_of_health: 100,
//   //     cell_temperature: 26,
//   //     pack_temperature: 48,
//   //     ambient_temperature: 78,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 8,
//   //     pack_voltage: 433,
//   //     charge_dicharge: 35,
//   //     state_of_charge: 64,
//   //     state_of_health: 79,
//   //     cell_temperature: 2,
//   //     pack_temperature: 13,
//   //     ambient_temperature: 63,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 3,
//   //     pack_voltage: 982,
//   //     charge_dicharge: 73,
//   //     state_of_charge: 45,
//   //     state_of_health: 79,
//   //     cell_temperature: 2,
//   //     pack_temperature: 16,
//   //     ambient_temperature: 76,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 33,
//   //     pack_voltage: 331,
//   //     charge_dicharge: 58,
//   //     state_of_charge: 12,
//   //     state_of_health: 59,
//   //     cell_temperature: 41,
//   //     pack_temperature: 90,
//   //     ambient_temperature: 72,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 50,
//   //     pack_voltage: 133,
//   //     charge_dicharge: 82,
//   //     state_of_charge: 57,
//   //     state_of_health: 53,
//   //     cell_temperature: 42,
//   //     pack_temperature: 47,
//   //     ambient_temperature: 73,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 99,
//   //     pack_voltage: 709,
//   //     charge_dicharge: 43,
//   //     state_of_charge: 35,
//   //     state_of_health: 82,
//   //     cell_temperature: 66,
//   //     pack_temperature: 38,
//   //     ambient_temperature: 20,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 19,
//   //     pack_voltage: 248,
//   //     charge_dicharge: 66,
//   //     state_of_charge: 8,
//   //     state_of_health: 46,
//   //     cell_temperature: 53,
//   //     pack_temperature: 15,
//   //     ambient_temperature: 90,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 96,
//   //     pack_voltage: 886,
//   //     charge_dicharge: 52,
//   //     state_of_charge: 40,
//   //     state_of_health: 56,
//   //     cell_temperature: 92,
//   //     pack_temperature: 94,
//   //     ambient_temperature: 19,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 82,
//   //     pack_voltage: 661,
//   //     charge_dicharge: 50,
//   //     state_of_charge: 58,
//   //     state_of_health: 62,
//   //     cell_temperature: 70,
//   //     pack_temperature: 43,
//   //     ambient_temperature: 42,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 99,
//   //     pack_voltage: 753,
//   //     charge_dicharge: 67,
//   //     state_of_charge: 37,
//   //     state_of_health: 33,
//   //     cell_temperature: 67,
//   //     pack_temperature: 3,
//   //     ambient_temperature: 61,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 17,
//   //     pack_voltage: 726,
//   //     charge_dicharge: 61,
//   //     state_of_charge: 67,
//   //     state_of_health: 94,
//   //     cell_temperature: 57,
//   //     pack_temperature: 31,
//   //     ambient_temperature: 16,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 12,
//   //     pack_voltage: 355,
//   //     charge_dicharge: 100,
//   //     state_of_charge: 67,
//   //     state_of_health: 7,
//   //     cell_temperature: 11,
//   //     pack_temperature: 69,
//   //     ambient_temperature: 13,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 71,
//   //     pack_voltage: 298,
//   //     charge_dicharge: 24,
//   //     state_of_charge: 63,
//   //     state_of_health: 68,
//   //     cell_temperature: 27,
//   //     pack_temperature: 38,
//   //     ambient_temperature: 9,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 27,
//   //     pack_voltage: 194,
//   //     charge_dicharge: 5,
//   //     state_of_charge: 25,
//   //     state_of_health: 25,
//   //     cell_temperature: 90,
//   //     pack_temperature: 32,
//   //     ambient_temperature: 77,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 40,
//   //     pack_voltage: 862,
//   //     charge_dicharge: 8,
//   //     state_of_charge: 56,
//   //     state_of_health: 39,
//   //     cell_temperature: 60,
//   //     pack_temperature: 70,
//   //     ambient_temperature: 59,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 16,
//   //     pack_voltage: 227,
//   //     charge_dicharge: 56,
//   //     state_of_charge: 10,
//   //     state_of_health: 28,
//   //     cell_temperature: 81,
//   //     pack_temperature: 24,
//   //     ambient_temperature: 87,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 43,
//   //     pack_voltage: 793,
//   //     charge_dicharge: 98,
//   //     state_of_charge: 96,
//   //     state_of_health: 13,
//   //     cell_temperature: 23,
//   //     pack_temperature: 7,
//   //     ambient_temperature: 39,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 19,
//   //     pack_voltage: 492,
//   //     charge_dicharge: 10,
//   //     state_of_charge: 78,
//   //     state_of_health: 23,
//   //     cell_temperature: 12,
//   //     pack_temperature: 44,
//   //     ambient_temperature: 84,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 15,
//   //     pack_voltage: 128,
//   //     charge_dicharge: 2,
//   //     state_of_charge: 19,
//   //     state_of_health: 0,
//   //     cell_temperature: 65,
//   //     pack_temperature: 42,
//   //     ambient_temperature: 63,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 50,
//   //     pack_voltage: 567,
//   //     charge_dicharge: 73,
//   //     state_of_charge: 21,
//   //     state_of_health: 36,
//   //     cell_temperature: 46,
//   //     pack_temperature: 55,
//   //     ambient_temperature: 84,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 68,
//   //     pack_voltage: 713,
//   //     charge_dicharge: 77,
//   //     state_of_charge: 17,
//   //     state_of_health: 43,
//   //     cell_temperature: 52,
//   //     pack_temperature: 35,
//   //     ambient_temperature: 39,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 11,
//   //     pack_voltage: 130,
//   //     charge_dicharge: 56,
//   //     state_of_charge: 96,
//   //     state_of_health: 90,
//   //     cell_temperature: 1,
//   //     pack_temperature: 16,
//   //     ambient_temperature: 52,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 78,
//   //     pack_voltage: 75,
//   //     charge_dicharge: 66,
//   //     state_of_charge: 57,
//   //     state_of_health: 67,
//   //     cell_temperature: 15,
//   //     pack_temperature: 77,
//   //     ambient_temperature: 66,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 61,
//   //     pack_voltage: 532,
//   //     charge_dicharge: 6,
//   //     state_of_charge: 38,
//   //     state_of_health: 96,
//   //     cell_temperature: 65,
//   //     pack_temperature: 17,
//   //     ambient_temperature: 21,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 91,
//   //     pack_voltage: 227,
//   //     charge_dicharge: 54,
//   //     state_of_charge: 5,
//   //     state_of_health: 43,
//   //     cell_temperature: 84,
//   //     pack_temperature: 23,
//   //     ambient_temperature: 45,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 28,
//   //     pack_voltage: 432,
//   //     charge_dicharge: 12,
//   //     state_of_charge: 64,
//   //     state_of_health: 18,
//   //     cell_temperature: 68,
//   //     pack_temperature: 33,
//   //     ambient_temperature: 21,
//   //     cell_balancing_status: false,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 9,
//   //     pack_voltage: 984,
//   //     charge_dicharge: 75,
//   //     state_of_charge: 96,
//   //     state_of_health: 56,
//   //     cell_temperature: 71,
//   //     pack_temperature: 53,
//   //     ambient_temperature: 26,
//   //     cell_balancing_status: true,
//   //   },
//   //   {
//   //     parameter: "Battery Management System",
//   //     cell_voltage: 7,
//   //     pack_voltage: 877,
//   //     charge_dicharge: 60,
//   //     state_of_charge: 1,
//   //     state_of_health: 54,
//   //     cell_temperature: 56,
//   //     pack_temperature: 80,
//   //     ambient_temperature: 93,
//   //     cell_balancing_status: false,
//   //   },
//   // ],
// }

// Todo

export const tableDataWithSchema: TableDataWithSchemaType = {
  tableDef: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "Voltage",
      columns: [
        {
          header: "Cell Voltage (Volts)",
          key: "cell_voltage",
        },
        {
          header: "Pack Voltage (Volts)",
          key: "pack_voltage",
        },
      ],
    },
    {
      id: "current",
      header: "Current Data",
      columns: [
        {
          header: "Charge/Discharge Current (Ampere)",
          key: "charge_dicharge",
        },
        {
          header: "State of Charge (SoC) (%)",
          key: "state_of_charge",
        },
        {
          header: "State of Health (SoH) (%)",
          key: "state_of_health",
        },
      ],
    },
    {
      id: "temperature",
      header: "Temperature Data",
      columns: [
        {
          header: "Cell Temperature (Degree Celcius)",
          key: "cell_temperature",
        },
        {
          header: "Pack Temperature (Degree Celcius)",
          key: "pack_temperature",
        },
        {
          header: "Ambient Temperature (Degree Celcius)",
          key: "ambient_temperature",
        },
      ],
    },
    {
      id: "balance",
      header: "Balancing",
      columns: [
        {
          header: "Cell Balancing Status (On/Off)",
          key: "cell_balancing_status",
        },
      ],
    },
  ],
  // TODO: --------------------------------------------------------------------------------------------------------
  cellCapacityTesting: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "",
      columns: [
        {
          header: "Cell Serial Number",
          key: "Cell Serial Number",
        },
        ,
        {
          header: "Test Start Date and Time",
          key: "Test Start Date and Time",
        },

        {
          header: "Charge Rate(C-rate)",
          key: "Charge Rate(C-rate)",
        },
        {
          header: "Discharge Rate(C-rate)",
          key: "Discharge Rate(C-rate)",
        },
        {
          header: "Charging Voltage(Volts)",
          key: "Charging Voltage(Volts)",
        },
        {
          header: "Discharging rate(Volts)",
          key: "Discharging rate(Volts)",
        },
        {
          header: "Test Duration(Hours or Minutes)",
          key: "Test Duration(Hours or Minutes)",
        },
        {
          header: "Initial Cell Temperature (Degrees Celsius)",
          key: "Initial Cell Temperature (Degrees Celsius)",
        },
        {
          header: "Final Cell Temperature (Degrees Celsius)",
          key: "Final Cell Temperature (Degrees Celsius)",
        },
        {
          header: "Overheating or Overcurrent Events",
          key: "Overheating or Overcurrent Events",
        },
        {
          header: "Pass/Fail Criteria",
          key: "Pass/Fail Criteria",
        },
      ],
    },
  ],
  cellSorting: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "",
      columns: [
        {
          header: "Cell Serial Number",
          key: "Cell Serial Number",
        },
        {
          header: "Sorting Method",
          key: "Sorting Method",
        },
        ,
        {
          header: "Sorting Date and Time",
          key: "Sorting Date and Time",
        },
        {
          header: "Error Codes or Deviation Indicators",
          key: "Error Codes or Deviation Indicators",
        },
      ],
    },
  ],
  PackAssembly: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "",
      columns: [
        {
          header: "Gas Composition",
          key: "Gas Composition",
        },
        {
          header: "Gas Flow Rate (Liters per Minute)",
          key: "Gas Flow Rate (Liters per Minute)",
        },
        ,
        {
          header: "Power Level (Watts)",
          key: "Power Level (Watts)",
        },
        {
          header: "Vacuum Level (Pascals or Torr)",
          key: "Vacuum Level (Pascals or Torr)",
        },
        {
          header: "Plasma Density",
          key: "Plasma Density",
        },
        {
          header: "Plasma Energy",
          key: "Plasma Energy",
        },
        {
          header: "Surface Energy Data",
          key: "Surface Energy Data",
        },
        {
          header: "Adhesion Strength Results",
          key: "Adhesion Strength Results",
        },
      ],
    },
  ],

  BMSTesting: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "",
      columns: [
        {
          header: "TestID",
          key: "TestID",
        },
        {
          header: "BatteryID",
          key: "BatteryID",
        },
        ,
        {
          header: "StartTime",
          key: "StartTime",
        },
        {
          header: "EndTime",
          key: "EndTime",
        },
        {
          header: "TesterID",
          key: "TesterID",
        },
        {
          header: "VoltageStart",
          key: "VoltageStart",
        },
        {
          header: "VoltageEnd",
          key: "VoltageEnd",
        },
        {
          header: "CurrentStart",
          key: "CurrentStart",
        },
        {
          header: "CurrentEnd",
          key: "CurrentEnd",
        },
        {
          header: "TemperatureStart",
          key: "TemperatureStart",
        },
        {
          header: "TemperatureEnd",
          key: "TemperatureEnd",
        },
        {
          header: "Result",
          key: "Result",
        },
        {
          header: "Notes",
          key: "Notes",
        },
      ],
    },
  ],
  BatterypackTesting: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "",
      columns: [
        {
          header: "Battery Serial Number",
          key: "Battery Serial Number",
        },
        {
          header: "Test Start Date and Time",
          key: "Test Start Date and Time",
        },
        ,
        {
          header: "Test Conditions",
          key: "Test Conditions",
        },
        {
          header: "Charge Rate (C-rate)",
          key: "Charge Rate (C-rate)",
        },
        {
          header: "Discharge Rate (C-rate)",
          key: "Discharge Rate (C-rate)",
        },
        {
          header: "Charging Voltage (Volts)",
          key: "Charging Voltage (Volts)",
        },
        {
          header: "Discharging Voltage (Volts)",
          key: "Discharging Voltage (Volts)",
        },
        {
          header: "Test Duration (Hours or Minutes)",
          key: "Test Duration (Hours or Minutes)",
        },
        {
          header: "Initial Battery Temperature (Degrees Celsius)",
          key: "Initial Battery Temperature (Degrees Celsius)",
        },
        {
          header: "Final Battery Temperature (Degrees Celsius)",
          key: "Final Battery Temperature (Degrees Celsius)",
        },
        {
          header: "Pass/Fail Criteria",
          key: "Pass/Fail Criteria",
        },
      ],
    },
  ],
  FinalQualityCheck: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "",
      columns: [
        {
          header: "Final Quality Checks",
          key: "Final Quality Checks",
        },
        {
          header: "Appearance Check (Pass/Fail)",
          key: "Appearance Check (Pass/Fail)",
        },
        ,
        {
          header: "Size Measurements (Millimeters)",
          key: "Size Measurements (Millimeters)",
        },
        {
          header: "Capacity Test (Ampere-hours)",
          key: "Capacity Test (Ampere-hours)",
        },
        {
          header: "Voltage Testing (Volts)",
          key: "Voltage Testing (Volts)",
        },
        {
          header: "Quality Approval Status (Approved/Not Approved)",
          key: "Quality Approval Status (Approved/Not Approved)",
        },
      ],
    },
  ],

  Packing: [
    // {
    //   id: "parameters",
    //   key: "parameter",
    // },
    {
      id: "votage",
      header: "",
      columns: [
        {
          header: "PackID",
          key: "PackID",
        },
        {
          header: "BatteryID",
          key: "BatteryID",
        },
        ,
        {
          header: "PackDate",
          key: "PackDate",
        },
        {
          header: "OperatorID",
          key: "OperatorID",
        },
        {
          header: "PackType",
          key: "PackType",
        },
        {
          header: "Quantity",
          key: "Quantity",
        },
        {
          header: "Weight",
          key: "Weight",
        },
        {
          header: "Dimensions",
          key: "Dimensions",
        },
        {
          header: "SealStatus",
          key: "SealStatus",
        },
        {
          header: "InspectionResult",
          key: "InspectionResult",
        },
        {
          header: "InspectionResult",
          key: "InspectionResult",
        },
      ],
    },
  ],

  // TODO:-----------------------------------------------------

  // data: [
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 13,
  //     pack_voltage: 38,
  //     charge_dicharge: 8,
  //     state_of_charge: 20,
  //     state_of_health: 15,
  //     cell_temperature: 28,
  //     pack_temperature: 71,
  //     ambient_temperature: 77,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 13,
  //     pack_voltage: 25,
  //     charge_dicharge: 12,
  //     state_of_charge: 35,
  //     state_of_health: 19,
  //     cell_temperature: 57,
  //     pack_temperature: 97,
  //     ambient_temperature: 18,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 17,
  //     pack_voltage: 127,
  //     charge_dicharge: 14,
  //     state_of_charge: 52,
  //     state_of_health: 67,
  //     cell_temperature: 10,
  //     pack_temperature: 71,
  //     ambient_temperature: 68,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 28,
  //     pack_voltage: 842,
  //     charge_dicharge: 17,
  //     state_of_charge: 2,
  //     state_of_health: 11,
  //     cell_temperature: 78,
  //     pack_temperature: 29,
  //     ambient_temperature: 36,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 2,
  //     pack_voltage: 944,
  //     charge_dicharge: 95,
  //     state_of_charge: 28,
  //     state_of_health: 59,
  //     cell_temperature: 37,
  //     pack_temperature: 95,
  //     ambient_temperature: 91,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 42,
  //     pack_voltage: 666,
  //     charge_dicharge: 75,
  //     state_of_charge: 14,
  //     state_of_health: 42,
  //     cell_temperature: 79,
  //     pack_temperature: 100,
  //     ambient_temperature: 71,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 97,
  //     pack_voltage: 819,
  //     charge_dicharge: 86,
  //     state_of_charge: 87,
  //     state_of_health: 61,
  //     cell_temperature: 23,
  //     pack_temperature: 80,
  //     ambient_temperature: 55,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 41,
  //     pack_voltage: 484,
  //     charge_dicharge: 86,
  //     state_of_charge: 87,
  //     state_of_health: 49,
  //     cell_temperature: 3,
  //     pack_temperature: 1,
  //     ambient_temperature: 51,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 71,
  //     pack_voltage: 148,
  //     charge_dicharge: 29,
  //     state_of_charge: 78,
  //     state_of_health: 76,
  //     cell_temperature: 97,
  //     pack_temperature: 45,
  //     ambient_temperature: 37,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 19,
  //     pack_voltage: 540,
  //     charge_dicharge: 79,
  //     state_of_charge: 99,
  //     state_of_health: 51,
  //     cell_temperature: 0,
  //     pack_temperature: 90,
  //     ambient_temperature: 45,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 57,
  //     pack_voltage: 30,
  //     charge_dicharge: 72,
  //     state_of_charge: 80,
  //     state_of_health: 47,
  //     cell_temperature: 0,
  //     pack_temperature: 10,
  //     ambient_temperature: 21,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 18,
  //     pack_voltage: 0,
  //     charge_dicharge: 56,
  //     state_of_charge: 69,
  //     state_of_health: 21,
  //     cell_temperature: 23,
  //     pack_temperature: 23,
  //     ambient_temperature: 68,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 97,
  //     pack_voltage: 864,
  //     charge_dicharge: 52,
  //     state_of_charge: 48,
  //     state_of_health: 54,
  //     cell_temperature: 60,
  //     pack_temperature: 52,
  //     ambient_temperature: 14,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 66,
  //     pack_voltage: 339,
  //     charge_dicharge: 98,
  //     state_of_charge: 43,
  //     state_of_health: 94,
  //     cell_temperature: 4,
  //     pack_temperature: 56,
  //     ambient_temperature: 4,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 1,
  //     pack_voltage: 15,
  //     charge_dicharge: 43,
  //     state_of_charge: 95,
  //     state_of_health: 41,
  //     cell_temperature: 59,
  //     pack_temperature: 27,
  //     ambient_temperature: 29,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 21,
  //     pack_voltage: 567,
  //     charge_dicharge: 44,
  //     state_of_charge: 46,
  //     state_of_health: 88,
  //     cell_temperature: 51,
  //     pack_temperature: 87,
  //     ambient_temperature: 6,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 16,
  //     pack_voltage: 590,
  //     charge_dicharge: 34,
  //     state_of_charge: 20,
  //     state_of_health: 14,
  //     cell_temperature: 45,
  //     pack_temperature: 69,
  //     ambient_temperature: 28,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 92,
  //     pack_voltage: 953,
  //     charge_dicharge: 43,
  //     state_of_charge: 73,
  //     state_of_health: 27,
  //     cell_temperature: 92,
  //     pack_temperature: 25,
  //     ambient_temperature: 28,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 88,
  //     pack_voltage: 773,
  //     charge_dicharge: 76,
  //     state_of_charge: 29,
  //     state_of_health: 31,
  //     cell_temperature: 9,
  //     pack_temperature: 68,
  //     ambient_temperature: 79,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 42,
  //     pack_voltage: 393,
  //     charge_dicharge: 54,
  //     state_of_charge: 19,
  //     state_of_health: 49,
  //     cell_temperature: 15,
  //     pack_temperature: 57,
  //     ambient_temperature: 32,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 38,
  //     pack_voltage: 390,
  //     charge_dicharge: 47,
  //     state_of_charge: 31,
  //     state_of_health: 3,
  //     cell_temperature: 50,
  //     pack_temperature: 24,
  //     ambient_temperature: 91,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 89,
  //     pack_voltage: 359,
  //     charge_dicharge: 8,
  //     state_of_charge: 64,
  //     state_of_health: 4,
  //     cell_temperature: 59,
  //     pack_temperature: 90,
  //     ambient_temperature: 33,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 90,
  //     pack_voltage: 649,
  //     charge_dicharge: 56,
  //     state_of_charge: 85,
  //     state_of_health: 100,
  //     cell_temperature: 26,
  //     pack_temperature: 48,
  //     ambient_temperature: 78,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 8,
  //     pack_voltage: 433,
  //     charge_dicharge: 35,
  //     state_of_charge: 64,
  //     state_of_health: 79,
  //     cell_temperature: 2,
  //     pack_temperature: 13,
  //     ambient_temperature: 63,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 3,
  //     pack_voltage: 982,
  //     charge_dicharge: 73,
  //     state_of_charge: 45,
  //     state_of_health: 79,
  //     cell_temperature: 2,
  //     pack_temperature: 16,
  //     ambient_temperature: 76,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 33,
  //     pack_voltage: 331,
  //     charge_dicharge: 58,
  //     state_of_charge: 12,
  //     state_of_health: 59,
  //     cell_temperature: 41,
  //     pack_temperature: 90,
  //     ambient_temperature: 72,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 50,
  //     pack_voltage: 133,
  //     charge_dicharge: 82,
  //     state_of_charge: 57,
  //     state_of_health: 53,
  //     cell_temperature: 42,
  //     pack_temperature: 47,
  //     ambient_temperature: 73,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 99,
  //     pack_voltage: 709,
  //     charge_dicharge: 43,
  //     state_of_charge: 35,
  //     state_of_health: 82,
  //     cell_temperature: 66,
  //     pack_temperature: 38,
  //     ambient_temperature: 20,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 19,
  //     pack_voltage: 248,
  //     charge_dicharge: 66,
  //     state_of_charge: 8,
  //     state_of_health: 46,
  //     cell_temperature: 53,
  //     pack_temperature: 15,
  //     ambient_temperature: 90,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 96,
  //     pack_voltage: 886,
  //     charge_dicharge: 52,
  //     state_of_charge: 40,
  //     state_of_health: 56,
  //     cell_temperature: 92,
  //     pack_temperature: 94,
  //     ambient_temperature: 19,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 82,
  //     pack_voltage: 661,
  //     charge_dicharge: 50,
  //     state_of_charge: 58,
  //     state_of_health: 62,
  //     cell_temperature: 70,
  //     pack_temperature: 43,
  //     ambient_temperature: 42,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 99,
  //     pack_voltage: 753,
  //     charge_dicharge: 67,
  //     state_of_charge: 37,
  //     state_of_health: 33,
  //     cell_temperature: 67,
  //     pack_temperature: 3,
  //     ambient_temperature: 61,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 17,
  //     pack_voltage: 726,
  //     charge_dicharge: 61,
  //     state_of_charge: 67,
  //     state_of_health: 94,
  //     cell_temperature: 57,
  //     pack_temperature: 31,
  //     ambient_temperature: 16,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 12,
  //     pack_voltage: 355,
  //     charge_dicharge: 100,
  //     state_of_charge: 67,
  //     state_of_health: 7,
  //     cell_temperature: 11,
  //     pack_temperature: 69,
  //     ambient_temperature: 13,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 71,
  //     pack_voltage: 298,
  //     charge_dicharge: 24,
  //     state_of_charge: 63,
  //     state_of_health: 68,
  //     cell_temperature: 27,
  //     pack_temperature: 38,
  //     ambient_temperature: 9,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 27,
  //     pack_voltage: 194,
  //     charge_dicharge: 5,
  //     state_of_charge: 25,
  //     state_of_health: 25,
  //     cell_temperature: 90,
  //     pack_temperature: 32,
  //     ambient_temperature: 77,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 40,
  //     pack_voltage: 862,
  //     charge_dicharge: 8,
  //     state_of_charge: 56,
  //     state_of_health: 39,
  //     cell_temperature: 60,
  //     pack_temperature: 70,
  //     ambient_temperature: 59,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 16,
  //     pack_voltage: 227,
  //     charge_dicharge: 56,
  //     state_of_charge: 10,
  //     state_of_health: 28,
  //     cell_temperature: 81,
  //     pack_temperature: 24,
  //     ambient_temperature: 87,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 43,
  //     pack_voltage: 793,
  //     charge_dicharge: 98,
  //     state_of_charge: 96,
  //     state_of_health: 13,
  //     cell_temperature: 23,
  //     pack_temperature: 7,
  //     ambient_temperature: 39,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 19,
  //     pack_voltage: 492,
  //     charge_dicharge: 10,
  //     state_of_charge: 78,
  //     state_of_health: 23,
  //     cell_temperature: 12,
  //     pack_temperature: 44,
  //     ambient_temperature: 84,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 15,
  //     pack_voltage: 128,
  //     charge_dicharge: 2,
  //     state_of_charge: 19,
  //     state_of_health: 0,
  //     cell_temperature: 65,
  //     pack_temperature: 42,
  //     ambient_temperature: 63,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 50,
  //     pack_voltage: 567,
  //     charge_dicharge: 73,
  //     state_of_charge: 21,
  //     state_of_health: 36,
  //     cell_temperature: 46,
  //     pack_temperature: 55,
  //     ambient_temperature: 84,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 68,
  //     pack_voltage: 713,
  //     charge_dicharge: 77,
  //     state_of_charge: 17,
  //     state_of_health: 43,
  //     cell_temperature: 52,
  //     pack_temperature: 35,
  //     ambient_temperature: 39,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 11,
  //     pack_voltage: 130,
  //     charge_dicharge: 56,
  //     state_of_charge: 96,
  //     state_of_health: 90,
  //     cell_temperature: 1,
  //     pack_temperature: 16,
  //     ambient_temperature: 52,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 78,
  //     pack_voltage: 75,
  //     charge_dicharge: 66,
  //     state_of_charge: 57,
  //     state_of_health: 67,
  //     cell_temperature: 15,
  //     pack_temperature: 77,
  //     ambient_temperature: 66,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 61,
  //     pack_voltage: 532,
  //     charge_dicharge: 6,
  //     state_of_charge: 38,
  //     state_of_health: 96,
  //     cell_temperature: 65,
  //     pack_temperature: 17,
  //     ambient_temperature: 21,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 91,
  //     pack_voltage: 227,
  //     charge_dicharge: 54,
  //     state_of_charge: 5,
  //     state_of_health: 43,
  //     cell_temperature: 84,
  //     pack_temperature: 23,
  //     ambient_temperature: 45,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 28,
  //     pack_voltage: 432,
  //     charge_dicharge: 12,
  //     state_of_charge: 64,
  //     state_of_health: 18,
  //     cell_temperature: 68,
  //     pack_temperature: 33,
  //     ambient_temperature: 21,
  //     cell_balancing_status: false,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 9,
  //     pack_voltage: 984,
  //     charge_dicharge: 75,
  //     state_of_charge: 96,
  //     state_of_health: 56,
  //     cell_temperature: 71,
  //     pack_temperature: 53,
  //     ambient_temperature: 26,
  //     cell_balancing_status: true,
  //   },
  //   {
  //     parameter: "Battery Management System",
  //     cell_voltage: 7,
  //     pack_voltage: 877,
  //     charge_dicharge: 60,
  //     state_of_charge: 1,
  //     state_of_health: 54,
  //     cell_temperature: 56,
  //     pack_temperature: 80,
  //     ambient_temperature: 93,
  //     cell_balancing_status: false,
  //   },
  // ],
}

export const TD_ASSIGNMENT_HEADER: string[] = [
  "Date",
  "Operations",
  "PO Number",
]

// export const TD_ASSIGNMENT_DATA: ITDAssignmentData[] = [
//   {
//     date: "09/10/2023",
//     operations: "0010-Cell Charging",
//     poNumber: 10010,
//   },
//   {
//     date: "09/10/2023",
//     operations: "0030 Axis Robot",
//     poNumber: 10020,
//   },
//   {
//     date: "09/10/2023",
//     operations: "0010-Robot+Vision Camera",
//     poNumber: 10030,
//   },
//   {
//     date: "10/10/2023",
//     operations: "0010-Module Stacking",
//     poNumber: 10040,
//   },
// ]

export const OPERATOR_SHIFT_ASSIGNMENT_DATA = {
  holidayData: [
    {
      date: "2nd Oct 2023",
      title: "Gandhi Jayanti",
    },
    {
      date: "21st to 23rd Oct 2023",
      title: "Dussera",
    },
  ],
  shiftAssignData: [
    {
      day: "Monday",
      date: "09/10/2023",
      time: "10:00 AM to 6:00 PM",
    },
    {
      day: "Tuesday",
      date: "10/10/2023",
      time: "10:00 AM to 6:00 PM",
    },
    {
      day: "Wednesday",
      date: "11/10/2023",
      time: "10:00 AM to 6:00 PM",
    },
    {
      day: "Thursday",
      date: "12/10/2023",
      time: "10:00 AM to 6:00 PM",
    },
    {
      day: "Friday",
      date: "13/10/2023",
      time: "10:00 AM to 6:00 PM",
    },
    {
      day: "Saturday",
      date: "14/10/2023",
      time: "10:00 AM to 6:00 PM",
    },
  ],
}
//dropdown menu
// export const OPERATION_ID: IOption = [
//   { option: "0030-tableDef" },
//   { option: "0030-cellCapacityTesting" },
//   { option: "0010-cellSorting" },
//   { option: "0100-Pack Assembly" },
//   { option: "0130-BMS Testing" },
//   { option: "0100-Battery pack Testing" },
//   { option: "0030-Final Quality Check" },
//   { option: "0030-Packing" },
// ]

// export const PRODUCTION_ORDER: IOption = [
//   { option: "101010" },
//   { option: "101011" },
//   { option: "101012" },
//   { option: "101013" },
//   { option: "101014" },
//   { option: "101015" },
//   { option: "101016" },
// ]
// utils/data.ts

export const ORDER_DETAIL_FORM: IOrderDetails = [
  { header: "Product", value: "Product" },
  { header: "Description", value: "ProductDescription" },
  { header: "Order Qty", value: "OrderQuantity" },
  { header: "Confirmed Qty", value: "ConfirmedQuantity" },
  { header: "Open Qty", value: "OpenQuantity" },
  { header: "Time Spent", value: "TimeSpent" },
]

export const OperatorDashboardIconsData = [
  {
    label: "View Operation",
    iconName: "tbreport",
    link: "/operation",
  },

  {
    label: "Monitoring",
    iconName: "monit",
  },
  {
    label: "Machine History",
    iconName: "history",
  },
  {
    label: "Reports",
    iconName: "report",
  },
  {
    label: "Attendance",
    iconName: "user",
  },
  {
    label: "Shift Change",
    iconName: "clock",
  },
  {
    label: "Inventory Check",
    iconName: "inevntory",
  },
  {
    label: "Leave Application",
    iconName: "calendar",
  },
]
export const SupervisorDashboardIconsData = [
  {
    label: "View Operation",
    iconName: "tbreport",

    link: "/operation",
  },
  {
    label: "Monitoring",
    iconName: "monit",
  },
  {
    label: "Machine History",
    iconName: "history",
  },
  {
    label: "Reports",
    iconName: "report",
  },
  {
    label: "Attendance",
    iconName: "user",
  },
  {
    label: "Shift Change",
    iconName: "clock",
  },
  {
    label: "Inventory Check",
    iconName: "inevntory",
  },
  {
    label: "Leave Application",
    iconName: "calendar",
  },
]

export const MONITORING_DATA = [
  {
    machineNumber: 123456,
    status: "success",
    jobNumber: 1234,
    currentProgram: "Program 1",
    runTime: "20 min",
  },
  {
    machineNumber: 223456,
    status: "failure",
    jobNumber: 2234,
    currentProgram: "Program 2",
    runTime: "30 min",
  },
  {
    machineNumber: 323456,
    status: "success",
    jobNumber: 3234,
    currentProgram: "Program 3",
    runTime: "60 min",
  },
  {
    machineNumber: 423456,
    status: "failure",
    jobNumber: 4234,
    currentProgram: "Program 4",
    runTime: "20 min",
  },
  {
    machineNumber: 523456,
    status: "warning",
    jobNumber: 5234,
    currentProgram: "Program 5",
    runTime: "20 min",
  },
  {
    machineNumber: 623456,
    status: "failure",
    jobNumber: 6234,
    currentProgram: "Program 6",
    runTime: "20 min",
  },
]

export const machineHistoryHeaderData: ITableHeader[] = [
  {
    name: "time",
    display: "Time",
  },
  {
    name: "duration",
    display: "Duration",
  },
  {
    name: "machine",
    display: "Machine",
  },
  {
    name: "status",
    display: "Status",
  },
  {
    name: "workShift",
    display: "Work Shift",
  },
  {
    name: "employee",
    display: "Employee",
  },
  {
    name: "program",
    display: "Program",
  },
  {
    name: "alarm",
    display: "Alarm",
  },
]

export const machineHistoryData: ITableData[] = [
  {
    time: "2023-10-05, 10:00",
    duration: "1hr 20 min",
    machine: "00111",
    status: "In Process",
    workShift: "A",
    employee: "Avijan Das",
    program: "ART-01",
    alarm: "",
  },
  {
    time: "2023-10-06, 10:00",
    duration: "1hr 50 min",
    machine: "00112",
    status: "In Process",
    workShift: "A",
    employee: "Avijan Das",
    program: "ART-01",
    alarm: "",
  },
  {
    time: "2023-10-07, 10:00",
    duration: "1hr 30 min",
    machine: "00114",
    status: "In Process",
    workShift: "A",
    employee: "Avijan Das",
    program: "ART-01",
    alarm: "yes",
  },
  {
    time: "2023-10-08, 10:00",
    duration: "1hr 40 min",
    machine: "00113",
    status: "In Active",
    workShift: "A",
    employee: "Avijan Das",
    program: "ART-01",
    alarm: "",
  },
  {
    time: "2023-10-09, 10:00",
    duration: "1hr 20 min",
    machine: "00115",
    status: "In Process",
    workShift: "A",
    employee: "Avijan Das",
    program: "ART-01",
    alarm: "",
  },
  {
    time: "2023-10-10, 10:00",
    duration: "1hr 20 min",
    machine: "00116",
    status: "In Process",
    workShift: "A",
    employee: "Avijan Das",
    program: "ART-01",
    alarm: "",
  },
]

export const ATTENDANCE_HEADER_DATA: ITableHeader[] = [
  {
    name: "login",
    display: "Login",
  },
  {
    name: "logout",
    display: "Logout",
  },
  {
    name: "duration",
    display: "Duration",
  },
  {
    name: "workShift",
    display: "Work Shift",
  },
  {
    name: "employee",
    display: "Employee",
  },
]

export const ATTENDANCE_DATA: ITableData[] = [
  {
    login: "2023-10-05, 10:00",
    logout: "2023-10-05, 18:00",
    duration: "1hr 20 min",
    workShift: "A",
    employee: "Avijan Das",
  },
  {
    login: "2023-10-06, 10:00",
    logout: "2023-10-06, 18:00",
    duration: "1hr 20 min",
    workShift: "A",
    employee: "Avijan Das",
  },
  {
    login: "2023-10-07, 10:00",
    logout: "2023-10-07, 18:00",
    duration: "1hr 20 min",
    workShift: "A",
    employee: "Avijan Das",
  },
  {
    login: "2023-10-08, 10:00",
    logout: "2023-10-08, 18:00",
    duration: "1hr 20 min",
    workShift: "A",
    employee: "Avijan Das",
  },
]

export const SHIFT_CHANGE_FORM_DATA: IFormVariable[] = [
  {
    name: "preferShift",
    type: "select",
    display: "Prefer Shift",
    default: "",
    description: "",
    options: ["A", "B", "C"],
    required: true,
    group: 1,
  },
  {
    name: "reasonForRequest",
    type: "string(textarea)",
    display: "Reason For Request",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]

export const LEAVE_APPLICATION_FORM_DATA: IFormVariable[] = [
  {
    name: "fromDate",
    type: "date",
    display: "From Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "toDate",
    type: "date",
    display: "To Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "subject",
    type: "string(textarea)",
    display: "Subject",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]

export const INVENTORY_CHECK_FORM_DATA: IFormVariable[] = [
  {
    name: "productionVersion",
    type: "string",
    display: "Production Version",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "productionVersionDesc",
    type: "string",
    display: "Prod. Ver. Description",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "productId",
    type: "string",
    display: "Product Id",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "deletionFlag",
    type: "string",
    display: "Deletion Flag",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "routingGroup",
    type: "string",
    display: "Routing Group",
    default: "",
    description: "",
    required: true,
    group: 3,
  },
  {
    name: "productDescription",
    type: "string",
    display: "Product Description",
    default: "",
    description: "",
    required: true,
    group: 3,
  },
  {
    name: "bom",
    type: "string",
    display: "BOM",
    default: "",
    description: "",
    required: true,
    group: 4,
  },
  {
    name: "routingCourier",
    type: "string",
    display: "Routing Courier",
    default: "",
    description: "",
    required: true,
    group: 4,
  },
]

export const INVENTORY_CHECK_HEADER_DATA: ITableHeader[] = [
  {
    name: "component",
    display: "Component",
  },
  {
    name: "description",
    display: "Description",
  },
  {
    name: "quantity",
    display: "Quantity",
  },
  {
    name: "uom",
    display: "UOM",
  },
  {
    name: "operation",
    display: "Operation",
  },
  {
    name: "assignmentDate",
    display: "Assignment Date",
  },
  {
    name: "assignedBy",
    display: "Assigned By",
  },
]

export const INVENTORY_CHECK_DATA: ITableData[] = [
  {
    component: "MFG1",
    description: "Shop Floor",
    quantity: 9001,
    uom: 10,
    operation: "Dummy",
    assignmentDate: "2023-10-05",
    assignedBy: "AD101",
  },
  {
    component: "Auto",
    description: "Auto Data",
    quantity: 9012,
    uom: 20,
    operation: "Dummy",
    assignmentDate: "2023-10-05",
    assignedBy: "AF101",
  },
  {
    component: "Auto",
    description: "Auto Data",
    quantity: 9012,
    uom: 30,
    operation: "Dummy",
    assignmentDate: "2023-10-05",
    assignedBy: "AF101",
  },
]

export const MANAGE_USERS_FILTER_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "idNo",
  //   type: "string",
  //   display: "By User Id",
  //   default: "",
  //   description: "",
  //   required: false,
  //   group: 1,
  // },
  {
    name: "userName",
    type: "string",
    display: "Username",
    default: "",
    description: "",
    required: false,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "fullName",
    type: "string",
    display: "Full Name",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "contactPhone",
    type: "number",
    display: "By Phone no.",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "roleId",
    type: "select",
    display: "By Role",
    default: "",
    options: ["Operator", "Supervisor", "Manager", "System Integrator"],
    description: "",
    required: false,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetRolesDD`,
  },
]

// export const MANAGE_USERS_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI. No.",
//   },
//   {
//     name: "UserName",
//     display: "UserName",
//   },
//   {
//     name: "FullName",
//     display: "Employee Name",
//   },
//   {
//     name: "RoleName",
//     display: "Role",
//   },
//   {
//     name: "Email",
//     display: "Email",
//   },
//   {
//     name: "ContactNumber",
//     display: "Phone No.",
//   },
//   {
//     name: "CreatedBy",
//     display: "Created By",
//   },
//   {
//     name: "ModifiedBy",
//     display: "Modified By",
//   },
//   {
//     name: "ValidFrom",
//     display: "Valid From",
//   },
//   {
//     name: "ValidTo",
//     display: "Valid To",
//   },
//   {
//     name: "action",
//     display: "Action",
//   },
// ]

// // / ----------User Filteration
// export const USER_STRUCTURE_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI. No.",
//     visible: true,
//   },

//   {
//     name: "UserName",
//     display: "UserName",
//     visible: true,
//   },
//   {
//     name: "FullName",
//     display: "Employee Name",
//     visible: true,
//   },
//   {
//     name: "RoleName",
//     display: "Role",
//     visible: true,
//   },
//   {
//     name: "Email",
//     display: "Email",
//     visible: true,
//   },
//   {
//     name: "ContactNumber",
//     display: "Phone No.",
//     visible: true,
//   },
//   {
//     name: "CreatedBy",
//     display: "Created By",
//     visible: true,
//   },
//   {
//     name: "ModifiedBy",
//     display: "Modified By",
//     visible: true,
//   },
//   {
//     name: "ValidFrom",
//     display: "Valid From",
//     visible: true,
//   },
//   {
//     name: "ValidTo",
//     display: "Valid To",
//     visible: true,
//   },
// ]
// export const MANAGE_USERS_DATA: ITableData[] = [
//   {
//     idNo: 1122,
//     role: "Manager",
//     fullName: "Ankit Kumar",
//     emailId: "ankit@gmail.com",
//     phoneNo: "1234567890",
//     factoryId: "1124",
//     lineId: "1003",
//     routingId: "1090",
//     workCenterId: "1144",
//     status: "Active",
//     employeeId: "ME1123",
//     durationOfShift: "Weekly",
//     jobAllocation: "JA01",
//     shift: "B",
//     validFrom: "2023-10-10",
//     validTo: "2024-10-10",
//   },
//   {
//     idNo: 1123,
//     role: "Operator",
//     fullName: "Ankit Kumar",
//     emailId: "ankit@gmail.com",
//     phoneNo: "1234567890",
//     factoryId: "1124",
//     lineId: "1004",
//     routingId: "1091",
//     workCenterId: "1145",
//     status: "Active",
//     employeeId: "ME1123",
//     durationOfShift: "Monthly",
//     jobAllocation: "JA02",
//     shift: "A",
//     validFrom: "2023-10-10",
//     validTo: "2024-10-10",
//   },
//   {
//     idNo: 1125,
//     role: "Operator",
//     fullName: "Ankit Kumar",
//     emailId: "ankit@gmail.com",
//     phoneNo: "1234567890",
//     factoryId: "1124",
//     lineId: "1005",
//     routingId: "1092",
//     workCenterId: "1146",
//     status: "Active",
//     employeeId: "ME1123",
//     durationOfShift: "Yearly",
//     jobAllocation: "JA03",
//     shift: "C",
//     validFrom: "2023-10-10",
//     validTo: "2024-10-10",
//   },
//   {
//     idNo: 1126,
//     role: "Supervisor",
//     fullName: "Ankit Kumar",
//     emailId: "ankit@gmail.com",
//     phoneNo: "1234567890",
//     factoryId: "1124",
//     lineId: "1006",
//     routingId: "1093",
//     workCenterId: "1147",
//     status: "Active",
//     employeeId: "ME1123",
//     durationOfShift: "Weekly",
//     jobAllocation: "JA04",
//     shift: "A",
//     validFrom: "2023-10-10",
//     validTo: "2024-10-10",
//   },
//   {
//     idNo: 1127,
//     role: "System Integrator",
//     fullName: "Avijan Das",
//     emailId: "avijan@gmail.com",
//     phoneNo: "1234567890",
//     factoryId: "1124",
//     lineId: "1007",
//     routingId: "1094",
//     workCenterId: "1148",
//     status: "Active",
//     employeeId: "ME1124",
//     durationOfShift: "Monthly",
//     jobAllocation: "JA05",
//     shift: "B",
//     validFrom: "2023-10-10",
//     validTo: "2024-10-10",
//   },
// ]

export const MANAGE_USERS_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "userName", // ✅ matches API
    display: "User Name",
  },
  {
    name: "fullName", // ✅ matches API
    display: "Employee Name",
  },
  {
    name: "roleName", // ✅ matches API
    display: "Role",
  },
  {
    name: "email", // ✅ matches API
    display: "Email",
  },
  {
    name: "contactNumber", // ✅ matches API
    display: "Phone No.",
  },
  {
    name: "createdBy", // ✅ matches API
    display: "Created By",
  },
  {
    name: "modifiedBy", // ✅ matches API
    display: "Modified By",
  },
  {
    name: "validFrom", // ✅ matches API
    display: "Valid From",
  },
  {
    name: "validTo", // ✅ matches API
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

// ---------- User Filteration
export const USER_STRUCTURE_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
    visible: true,
  },
  {
    name: "userName", // ✅ matches API
    display: "User Name",
    visible: true,
  },
  {
    name: "fullName", // ✅ matches API
    display: "Employee Name",
    visible: true,
  },
  {
    name: "roleName", // ✅ matches API
    display: "Role",
    visible: true,
  },
  {
    name: "email", // ✅ matches API
    display: "Email",
    visible: true,
  },
  {
    name: "contactNumber", // ✅ matches API
    display: "Phone No.",
    visible: true,
  },
  {
    name: "createdBy", // ✅ matches API
    display: "Created By",
    visible: true,
  },
  {
    name: "modifiedBy", // ✅ matches API
    display: "Modified By",
    visible: true,
  },
  {
    name: "validFrom", // ✅ matches API
    display: "Valid From",
    visible: true,
  },
  {
    name: "validTo", // ✅ matches API
    display: "Valid To",
    visible: true,
  },
]


export const ROLE_ASSIGNMENT_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  // {
  //   name: "PlantId",
  //   display: "Plant ID",
  // },
  {
    name: "userName",
    display: "Username",
  },
  // {
  //   name: "Employeename",
  //   display: "Employee Name",
  // },
  {
    name: "roleName",
    display: "Role",
  },
  {
    name: "supervisorName",
    display: "Under Supervisor",
  },
  {
    name: "managerName",
    display: "Under Manager",
  },
  {
    name: "delete",
    display: "Action",
  },
]

export const ROLE_ASSIGNMENT_FORM_DATA: IFormVariable[] = [
  {
    name: "userId",
    type: "select",
    display: "User Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
    showInUpdate: true,
  },
  {
    name: "roleId",
    type: "selectone",
    display: "Role",
    options: [""],
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetRolesDD`,
    showInUpdate: true,
  },
  {
    name: "supervisorId",
    type: "supervisorDD",
    display: "By Supervisor",
    default: "",
    description: "",
    required: false,
    group: 2,
    options: [],
    supervisorDrop: "roleId",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetSupervisorDD`,
    showInUpdate: true,
  },
  {
    name: "managerId",
    type: "managerDD",
    display: "By Manager",
    default: "",
    description: "",
    required: false,
    group: 2,
    options: [],
    managerDrop: "supervisorId",
    dependedDrop: "roleId",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_UserDetails/GetManagerDD`,
    showInUpdate: true,
  },
]

// export const FACTORY_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI. No.",
//   },
//   {
//     name: "FactoryId",
//     display: "Factory ID",
//   },
//   {
//     name: "FactoryName",
//     display: "Factory Name",
//   },
//   {
//     name: "Address",
//     display: "Address",
//   },
//   // {
//   //   name: "Capacity",
//   //   display: "Capacity",
//   // },
//   {
//     name: "ContactPerson",
//     display: "Contact Person",
//   },
//   {
//     name: "ContactEmail",
//     display: "Contact Email",
//   },
//   {
//     name: "ContactPhone",
//     display: "Contact Phone",
//   },
//   {
//     name: "CreatedBy",
//     display: "Created By",
//   },
//   // {
//   //   name: "CreationDate",
//   //   display: "Created Date",
//   // },
//   {
//     name: "ModifiedBy",
//     display: "Modified By",
//   },
//   // {
//   //   name: "LastModifiedDate",
//   //   display: "Last Modified Date",
//   // },
//   {
//     name: "action",
//     display: "Action",
//   },
// ]

export const FACTORY_DATA: ITableData[] = [
  {
    idNo: 1001,
    factoryName: "Rejection",
    address: "Dummy Address",
    capacity: "10000",
    contactPerson: "1125",
    contactEmail: "abc@gmail.com",
    contactPhone: "124567890",
    createdBy: "1123",
    createdDate: "2023-10-05",
    lastModifiedBy: "1126",
    lastModifiedDate: "2023-10-05",
  },
  {
    idNo: 1002,
    factoryName: "Finished",
    address: "Dummy Address",
    capacity: "10000",
    contactPerson: "1126",
    contactEmail: "abc@gmail.com",
    contactPhone: "124567890",
    createdBy: "1123",
    createdDate: "2023-10-05",
    lastModifiedBy: "1126",
    lastModifiedDate: "2023-10-05",
  },
  {
    idNo: 1003,
    factoryName: "Finished",
    address: "Dummy Address",
    capacity: "10000",
    contactPerson: "1127",
    contactEmail: "abc@gmail.com",
    contactPhone: "124567890",
    createdBy: "1123",
    createdDate: "2023-10-05",
    lastModifiedBy: "1126",
    lastModifiedDate: "2023-10-05",
  },
  {
    idNo: 1004,
    factoryName: "Semi-finished",
    address: "Dummy Address",
    capacity: "10000",
    contactPerson: "1128",
    contactEmail: "abc@gmail.com",
    contactPhone: "124567890",
    createdBy: "1123",
    createdDate: "2023-10-05",
    lastModifiedBy: "1126",
    lastModifiedDate: "2023-10-05",
  },
]

// export const FACTORY_FORM_DATA: IFormVariable[] = [
//   {
//     name: "factoryName",
//     type: "string",
//     display: "Factory Name",
//     default: null,
//     description: "",
//     required: true,
//     group: 1,
//   },
//   // {
//   //   name: "Capacity",
//   //   type: "number",
//   //   display: "Capacity",
//   //   default: "",
//   //   description: "",
//   //   required: true,
//   //   group: 2,
//   // },
//   {
//     name: "Address",
//     type: "string(textarea)",
//     display: "Address",
//     default: null,
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "ContactPerson",
//     type: "string",
//     display: "Contact Person",
//     default: null,
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "ContactEmail",
//     type: "string",
//     display: "Contact Email",
//     default: null,
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "ContactPhone",
//     type: "number",
//     display: "Contact Phone",
//     default: null,
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "ValidFrom",
//     type: "date",
//     display: "Valid From",
//     default: null,
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "ValidTo",
//     type: "date",
//     display: "Valid To",
//     default: null,
//     description: "",
//     required: true,
//     group: 2,
//   },
// ]

export const FACTORY_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "factoryId", // ✅ matches API
    display: "Factory ID",
  },
  {
    name: "factoryName", // ✅ matches API
    display: "Factory Name",
  },
  {
    name: "address", // ✅ matches API
    display: "Address",
  },
  {
    name: "contactPerson", // ✅ matches API
    display: "Contact Person",
  },
  {
    name: "contactEmail", // ✅ matches API
    display: "Contact Email",
  },
  {
    name: "contactPhone", // ✅ matches API
    display: "Contact Phone",
  },
  {
    name: "createdBy", // ✅ matches API
    display: "Created By",
  },
  {
    name: "modifiedBy", // ✅ matches API
    display: "Modified By",
  },
  {
    name: "action",
    display: "Action",
  },
]


export const FACTORY_FORM_DATA: IFormVariable[] = [
  {
    name: "factoryName", // ✅ Matches "factoryName"
    type: "string",
    display: "Factory Name",
    default: null,
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "address", // ✅ Matches "address"
    type: "string(textarea)",
    display: "Address",
    default: null,
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "contactPerson", // ✅ Matches "contactPerson"
    type: "string",
    display: "Contact Person",
    default: null,
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "contactEmail", // ✅ Matches "contactEmail"
    type: "string",
    display: "Contact Email",
    default: null,
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "contactPhone", // ✅ Matches "contactPhone"
    type: "string", // changed from number because API returns string
    display: "Contact Phone",
    default: null,
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom", // ✅ Matches "validFrom"
    type: "date",
    display: "Valid From",
    default: null,
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo", // ✅ Matches "validTo"
    type: "date",
    display: "Valid To",
    default: null,
    description: "",
    required: true,
    group: 2,
  },
]


// export const PLANT_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI. No.",
//   },
//   // {
//   //   name: "PlantId",
//   //   display: "Plant ID",
//   // },
//   {
//     name: "PlantName",
//     display: "Plant Name",
//   },
//   {
//     name: "FactoryName",
//     display: "Factory Name",
//   },
//   {
//     name: "PlantAddress",
//     display: "Address",
//   },
//   {
//     name: "PlantContactPerson",
//     display: "Contact Person",
//   },
//   {
//     name: "PlantContactEmail",
//     display: "Contact Email",
//   },
//   {
//     name: "PlantContactPhone",
//     display: "Contact Phone",
//   },
//   {
//     name: "CreatedBy",
//     display: "Created By",
//   },
//   {
//     name: "CreationDate",
//     display: "Created Date",
//   },
//   {
//     name: "ModifiedBy",
//     display: "Last Modified By",
//   },
//   {
//     name: "LastModifiedDate",
//     display: "Last Modified Date",
//   },
//   {
//     name: "action",
//     display: "Action",
//   },
// ]

export const PLANT_DATA: ITableData[] = [
  {
    idNo: "1122",
    plantName: "Jindal",
    factoryId: "1080",
    capacity: "1100",
    address: "Dummy Address",
    contactPerson: "Aditya Kapoor",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987764321",
    createdBy: "1123",
    createdDate: "08/09/2023",
    lastModifiedBy: "1124",
    lastModifiedDate: "09/11/2023",
  },
  {
    idNo: "1123",
    plantName: "Jindal",
    factoryId: "1020",
    capacity: "1100",
    address: "Dummy Address",
    contactPerson: "Aditya Kumar",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987764321",
    createdBy: "1123",
    createdDate: "08/09/2023",
    lastModifiedBy: "1125",
    lastModifiedDate: "09/11/2023",
  },
  {
    idNo: "1124",
    plantName: "Jindal",
    factoryId: "1090",
    capacity: "1100",
    address: "Dummy Address",
    contactPerson: "Aditya Roy",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987764321",
    createdBy: "1123",
    createdDate: "08/09/2023",
    lastModifiedBy: "1126",
    lastModifiedDate: "09/11/2023",
  },
  {
    idNo: "1125",
    plantName: "Jindal",
    factoryId: "1060",
    capacity: "1100",
    address: "Dummy Address",
    contactPerson: "Aditya Das",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987764321",
    createdBy: "1123",
    createdDate: "08/09/2023",
    lastModifiedBy: "1127",
    lastModifiedDate: "09/11/2023",
  },
  {
    idNo: "2",
    plantName: "Jindal",
    factoryId: "1050",
    capacity: "1100",
    address: "Dummy Address",
    contactPerson: "Aditya Singh",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987764321",
    createdBy: "1123",
    createdDate: "08/09/2023",
    lastModifiedBy: "1128",
    lastModifiedDate: "09/11/2023",
  },
]

// export const PLANT_FORM_DATA: IFormVariable[] = [
//   {
//     name: "PlantName",
//     type: "string",
//     display: "Plant Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "FactoryIdFk",
//     type: "select",
//     display: "Factory Name",
//     default: "",
//     options: ["1122", "1123", "1124"],
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
//   },
//   {
//     name: "PlantAddress",
//     type: "string",
//     display: "Address",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "PlantContactPerson",
//     type: "string",
//     display: "Contact Person",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "PlantContactEmail",
//     type: "string",
//     display: "Contact Email",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "PlantContactPhone",
//     type: "string",
//     display: "Contact Phone",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "ValidFrom",
//     type: "date",
//     display: "Valid From",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "ValidTo",
//     type: "date",
//     display: "Valid To",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
// ]

export const PLANT_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  // {
  //   name: "plantId", // ✅ matches API
  //   display: "Plant ID",
  // },
  {
    name: "plantName", // ✅ matches API
    display: "Plant Name",
  },
  {
    name: "factoryIdFk", // ✅ matches API (note: API gives ID, not name)
    display: "Factory Name",
  },
  {
    name: "plantAddress", // ✅ matches API
    display: "Address",
  },
  {
    name: "plantContactPerson", // ✅ matches API
    display: "Contact Person",
  },
  {
    name: "plantContactEmail", // ✅ matches API
    display: "Contact Email",
  },
  {
    name: "plantContactPhone", // ✅ matches API
    display: "Contact Phone",
  },
  {
    name: "createdBy", // ✅ matches API
    display: "Created By",
  },
  {
    name: "creationDate", // ✅ matches API
    display: "Created Date",
  },
  {
    name: "modifiedBy", // ✅ matches API
    display: "Last Modified By",
  },
  {
    name: "lastModifiedDate", // ✅ matches API
    display: "Last Modified Date",
  },
  {
    name: "action",
    display: "Action",
  },
]


export const PLANT_FORM_DATA: IFormVariable[] = [
  {
    name: "plantName", // ✅ matches API
    type: "string",
    display: "Plant Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "factoryIdFk", // ✅ matches API
    type: "select",
    display: "Factory Name",
    default: "",
    options: ["1122", "1123", "1124"],
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantAddress", // ✅ matches API
    type: "string",
    display: "Address",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "plantContactPerson", // ✅ matches API
    type: "string",
    display: "Contact Person",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "plantContactEmail", // ✅ matches API
    type: "string",
    display: "Contact Email",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "plantContactPhone", // ✅ matches API
    type: "string", // stays string to match API type
    display: "Contact Phone",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom", // ✅ matches API
    type: "date",
    display: "Valid From",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo", // ✅ matches API
    type: "date",
    display: "Valid To",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]


export const STORAGE_LOCATION_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  // {
  //   name: "StorageLocationId",
  //   display: "S. Location ID",
  // },
  {
    name: "locationName",
    display: "S. Location Name",
  },
  // {
  //   name: "FactoryIdFk",
  //   display: "Factory ID",
  // },
  // {
  //   name: "PlantIdFk",
  //   display: "Plant ID",
  // },
  {
    name: "factoryName",
    display: "Factory Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  // {
  //   name: "StorageCapacity",
  //   display: "Capacity",
  // },
  {
    name: "inventoryType",
    display: "Inventory Type",
  },
  {
    name: "contactPerson",
    display: "Contact Person",
  },
  {
    name: "storageContactEmail",
    display: "Contact Email",
  },
  {
    name: "storageContactPhone",
    display: "Contact Phone",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  // {
  //   name: "CreationDate",
  //   display: "Created Date",
  // },
  {
    name: "modifiedBy",
    display: "Last Modified By",
  },
  // {
  //   name: "LastModifiedDate",
  //   display: "Last Modified Date",
  // },
  {
    name: "action",
    display: "Action",
  },
]

export const STORAGE_LOCATION_DATA: ITableData[] = [
  {
    idNo: "2001",
    storageLocationName: "Storage1",
    plantId: "1101",
    capacity: "4000",
    inventoryType: "Raw Materials",
    contactPerson: "Eren",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987654321",
    createdBy: "1123",
    createdDate: "09/09/2023",
    lastModifiedBy: "1123",
    lastModifiedDate: "09/09/2023",
  },
  {
    idNo: "2002",
    storageLocationName: "Storage2",
    plantId: "1101",
    capacity: "4000",
    inventoryType: "Raw Materials",
    contactPerson: "Levi",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987654321",
    createdBy: "1123",
    createdDate: "09/09/2023",
    lastModifiedBy: "1123",
    lastModifiedDate: "09/09/2023",
  },
  {
    idNo: "2003",
    storageLocationName: "Storage3",
    plantId: "1101",
    capacity: "4000",
    inventoryType: "Raw Materials",
    contactPerson: "Jean",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987654321",
    createdBy: "1123",
    createdDate: "09/09/2023",
    lastModifiedBy: "1123",
    lastModifiedDate: "09/09/2023",
  },
  {
    idNo: "2004",
    storageLocationName: "Storage4",
    plantId: "1101",
    capacity: "4000",
    inventoryType: "Unfinished Goods",
    contactPerson: "Mikasa",
    contactEmail: "abc@gmail.com",
    contactPhone: "0987654321",
    createdBy: "1123",
    createdDate: "09/09/2023",
    lastModifiedBy: "1123",
    lastModifiedDate: "09/09/2023",
  },
]

export const STORAGE_LOCATION_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "idNo",
  //   type: "string",
  //   display: "Storage Location ID",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "locationName",
    type: "string",
    display: "Storage Location Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory Name",
    default: "",
    options: ["1", "2", "3"],
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant ID",
    default: "",
    options: ["1", "2", "3"],
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  // {
  //   name: "address",
  //   type: "string(textarea)",
  //   display: "Address",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "storageCapacity",
    type: "number",
    display: "Capacity",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "inventoryType",
    type: "string",
    display: "Inventory Type",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "contactPerson",
    type: "string",
    display: "Contact Person",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "storageContactEmail",
    type: "string",
    display: "Contact Email",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "storageContactPhone",
    type: "string",
    display: "Contact Phone",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]

export const ORGANIZATION_STRUCTURE_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
    visible: true,
  },
  {
    name: "storage",
    display: "Storage",
    visible: true,
  },
  {
    name: "descriptionStorage",
    display: "Storage Description",
    visible: true,
  },
  {
    name: "factory",
    display: "Factory",
    visible: true,
  },
  {
    name: "descriptionFactory",
    display: "Factory Description",
    visible: true,
  },
  {
    name: "plant",
    display: "Plant",
    visible: true,
  },
  {
    name: "descriptionPlant",
    display: "Plant Description",
    visible: true,
  },
  {
    name: "assignDate",
    display: "Assignment Date",
    visible: true,
  },
  {
    name: "addedBy",
    display: "Added By",
    visible: true,
  },
]

export const ORGANIZATION_STRUCTURE_DATA: ITableData[] = [
  {
    storage: 1122,
    descriptionStorage: "Dummy Description",
    factory: 1124,
    descriptionFactory: "Dummy Description",
    plant: 1124,
    descriptionPlant: "Dummy Description",
    addedBy: "John",
    assignDate: "2023-10-05",
  },
  {
    storage: 1123,
    descriptionStorage: "Dummy Description",
    factory: 1122,
    descriptionFactory: "Dummy Description",
    plant: 1122,
    descriptionPlant: "Dummy Description",
    addedBy: "John",
    assignDate: "2023-10-05",
  },
  {
    storage: 1124,
    descriptionStorage: "Dummy Description",
    factory: 1122,
    descriptionFactory: "Dummy Description",
    plant: 1122,
    descriptionPlant: "Dummy Description",
    addedBy: "John",
    assignDate: "2023-10-05",
  },
]

export const WORK_CENTER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "workcenterName",
    display: "Work Center Name",
  },
  {
    name: "factoryName",
    display: "Factory Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  {
    name: "lineName",
    display: "Line Name",
  },
  {
    name: "capacity",
    display: "Capacity",
  },
  {
    name: "operation",
    display: "Operation Description",
  },
  {
    name: "operationDescription",
    display: "Operation Description",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "modifiedBy",
    display: "Last Modidfied By",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const WORK_CENTER_DATA: ITableData[] = [
  {
    idNo: 1122,
    name: "Dummy Name",
    routingId: "1124",
    capacity: 120,
    type: "Machinig",
    contactId: "CP001",
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
    deletionFlag: "No",
  },
  {
    idNo: 1123,
    name: "Dummy Name",
    routingId: "1123",
    capacity: 145,
    type: "Machinig",
    contactId: "CP002",
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
    deletionFlag: "Yes",
  },
  {
    idNo: 1124,
    name: "Dummy Name",
    routingId: "1122",
    capacity: 123,
    type: "Assembly",
    contactId: "CP003",
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
    deletionFlag: "Yes",
  },
]

export const WORK_CENTER_FORM_DATA: IFormVariable[] = [
  {
    name: "workcenterName",
    type: "string",
    display: "Work Center Name",
    // default: "",
    default: "xyz",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory Id",
    default: "",
    options: ["1122", "1123", "1124"],
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant Id",
    default: "",
    options: ["1122", "1123", "1124"],
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getmesplantdd`,
  },
  {
    name: "lineIdFk",
    type: "select",
    display: "Line Id",
    default: "",
    options: ["1122", "1123", "1124"],
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getmeslinedd`,
  },
  {
    name: "routingIdFk",
    type: "select",
    display: "Routing Id",
    default: "",
    options: ["1122", "1123", "1124"],
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESWorkCenter/getmesroutingdd`,
  },
  {
    name: "capacity",
    type: "number",
    display: "Capacity",
    default: "5",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "operation",
    type: "string",
    display: "Operation",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "operationDescription",
    type: "string",
    display: "Operation Description",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

export const ROUTING_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "routingId",
    display: "Routing ID",
  },
  {
    name: "routingName",
    display: "Routing Name",
  },
  {
    name: "lineName",
    display: "Line Name",
  },
  {
    name: "factoryName",
    display: "Factory Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  {
    name: "operationSequence",
    display: "Operation Sequence",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "modifiedBy",
    display: "Modified By",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  // {
  //   name: "operationName",
  //   display: "Operation Name",
  // },
  // {
  //   name: "machineId",
  //   display: "Machine ID",
  // },
  // {
  //   name: "toolId",
  //   display: "Tool ID",
  // },
  // {
  //   name: "contactPersonId",
  //   display: "Contact Person ID",
  // },
  {
    name: "action",
    display: "Action",
  },
]

// export const ROUTING_DATA: ITableData[] = [
//   {
//     siNo: 1,
//     routingId: "RID1",
//     routingName: "Vision Station",
//     lineId: "AI0012",
//     operationSequence: "1",
//     operationName: "Pack Assembly",
//     machineId: "P48811",
//     toolId: "P48811",
//     contactPersonId: "1124",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 2,
//     routingId: "RID2",
//     routingName: "Buffer Station",
//     lineId: "AI0013",
//     operationSequence: "15",
//     operationName: "Cell Capacity",
//     machineId: "A99211",
//     toolId: "A99211",
//     contactPersonId: "1125",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 3,
//     routingId: "RID3",
//     routingName: "Compression Station",
//     lineId: "AI0014",
//     operationSequence: "11",
//     operationName: "Laser Weilding",
//     machineId: "G51580",
//     toolId: "G51580",
//     contactPersonId: "1126",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 4,
//     routingId: "RID4",
//     routingName: "Unloading Station",
//     lineId: "AI0015",
//     operationSequence: "14",
//     operationName: "Cell Sorting",
//     machineId: "D54554",
//     toolId: "D54554",
//     contactPersonId: "1127",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 5,
//     routingId: "RID5",
//     routingName: "Vision Station",
//     lineId: "AI0016",
//     operationSequence: "1",
//     operationName: "Vision Operation",
//     machineId: "M85082",
//     toolId: "M85082",
//     contactPersonId: "1129",
//     setupTime: "01:00:00",
//     runTime: "02:30:00",
//     cycleTime: "02:40:00",
//   },
//   {
//     siNo: 6,
//     routingId: "RID6",
//     routingName: "Buffer Station",
//     lineId: "AI0012",
//     operationSequence: "10",
//     operationName: "Buffer Station",
//     machineId: "U67096",
//     toolId: "U67096",
//     contactPersonId: "1124",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 7,
//     routingId: "RID7",
//     routingName: "Compression Station",
//     lineId: "AI0012",
//     operationSequence: "12",
//     operationName: "Plasma Cleaning",
//     machineId: "R64088",
//     toolId: "R64088",
//     contactPersonId: "1124",
//     setupTime: "01:00:00",
//     runTime: "02:30:00",
//     cycleTime: "02:40:00",
//   },
//   {
//     siNo: 8,
//     routingId: "RID8",
//     routingName: "Uploading Station",
//     lineId: "AI0012",
//     operationSequence: "5",
//     operationName: "Insulating Sheet",
//     machineId: "M44901",
//     toolId: "M44901",
//     contactPersonId: "1124",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 9,
//     routingId: "RID9",
//     routingName: "Vision Station",
//     lineId: "AI0012",
//     operationSequence: "9",
//     operationName: "BMS Testing",
//     machineId: "C35664",
//     toolId: "C35664",
//     contactPersonId: "1124",
//     setupTime: "01:00:00",
//     runTime: "02:30:00",
//     cycleTime: "02:40:00",
//   },
//   {
//     siNo: 10,
//     routingId: "RID10",
//     routingName: "Buffer Station",
//     lineId: "AI0012",
//     operationSequence: "7",
//     operationName: "Buffer Station",
//     machineId: "K68019",
//     toolId: "K68019",
//     contactPersonId: "1124",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 11,
//     routingId: "RID11",
//     routingName: "Compression Station",
//     lineId: "AI0012",
//     operationSequence: "4",
//     operationName: "Serial No.",
//     machineId: "T59776",
//     toolId: "T59776",
//     contactPersonId: "1124",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 12,
//     routingId: "RID12",
//     routingName: "Uploading Station",
//     lineId: "AI0012",
//     operationSequence: "6",
//     operationName: "Uploading Station",
//     machineId: "K57067",
//     toolId: "K57067",
//     contactPersonId: "1124",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
//   {
//     siNo: 13,
//     routingId: "RID13",
//     routingName: "Uploading Station",
//     lineId: "AI0012",
//     operationSequence: "6",
//     operationName: "Uploading Station",
//     machineId: "K57067",
//     toolId: "K57067",
//     contactPersonId: "1124",
//     setupTime: "02:00:00",
//     runTime: "02:00:00",
//     cycleTime: "02:00:00",
//   },
// ]

export const ROUTING_FORM_DATA: IFormVariable[] = [
  {
    name: "routingName",
    type: "string",
    display: "Routing Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "description",
    type: "string",
    display: "Description",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "lineIdFk",
    type: "select",
    display: "Line Name",
    options: [],
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESLineDD`,
  },
  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory Name",
    options: [],
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant Name",
    options: [],
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "operationSequence",
    type: "number",
    display: "Operation Sequence",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]

export const MANUFACTURING_LINE_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "lineName",
    display: "Line Name",
  },
  {
    name: "factoryName",
    display: "Factory Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  {
    name: "issueLocationName",
    display: "Issue Location",
  },
  {
    name: "receivingLocationName",
    display: "Receiving Location",
  },
  {
    name: "lotNumber",
    display: "Lot Number",
  },
  {
    name: "bom",
    display: "Bom",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

// export const MANUFACTURING_LINE_DATA: ITableData[] = [
//   {
//     idNo: 1121,
//     name: "Dummy Name",
//     productionVersion: "v1",
//     productionDescription: "Dummy Description",
//     plantId: "1122",
//     factoryId: "1125",
//     capacity: 133,
//     lineType: "Assembly",
//     contactId: "CP003",
//     contactEmail: "a@email.com",
//     contactPhone: "1234567890",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//     lotNumber: 123,
//     lotSizeFrom: 234,
//     lotSizeTo: 678,
//     bom: "Dummy",
//     alternateBom: "Dummy",
//     issueLocation: "Location1",
//     receivingLocation: "Location2",
//     status: "Active",
//     deletionFlag: "Yes",
//   },
//   {
//     idNo: 1122,
//     name: "Dummy Name",
//     productionVersion: "v2",
//     productionDescription: "Dummy Description",
//     plantId: "1122",
//     factoryId: "1125",
//     capacity: 153,
//     lineType: "Assembly",
//     contactId: "CP003",
//     contactEmail: "b@email.com",
//     contactPhone: "1234567890",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//     lotNumber: 123,
//     lotSizeFrom: 234,
//     lotSizeTo: 678,
//     bom: "Dummy",
//     alternateBom: "Dummy",
//     issueLocation: "Location1",
//     receivingLocation: "Location2",
//     status: "Active",
//     deletionFlag: "Yes",
//   },
//   {
//     idNo: 1123,
//     name: "Dummy Name",
//     productionVersion: "v11",
//     productionDescription: "Dummy Description",
//     plantId: "1122",
//     factoryId: "1125",
//     capacity: 123,
//     lineType: "Assembly",
//     contactId: "CP003",
//     contactEmail: "a@email.com",
//     contactPhone: "1234567890",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//     lotNumber: 123,
//     lotSizeFrom: 234,
//     lotSizeTo: 678,
//     bom: "Dummy",
//     alternateBom: "Dummy",
//     issueLocation: "Location1",
//     receivingLocation: "Location2",
//     status: "Active",
//     deletionFlag: "Yes",
//   },
//   {
//     idNo: 1124,
//     name: "Dummy Name",
//     productionVersion: "v12",
//     productionDescription: "Dummy Description",
//     plantId: "1122",
//     factoryId: "1125",
//     capacity: 123,
//     lineType: "Assembly",
//     contactId: "CP003",
//     contactEmail: "a@email.com",
//     contactPhone: "1234567890",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//     lotNumber: 123,
//     lotSizeFrom: 234,
//     lotSizeTo: 678,
//     bom: "Dummy",
//     alternateBom: "Dummy",
//     issueLocation: "Location1",
//     receivingLocation: "Location2",
//     status: "Active",
//     deletionFlag: "Yes",
//   },
// ]

export const MANUFACTURING_LINE_FORM_DATA: IFormVariable[] = [
  {
    name: "lineName",
    type: "string",
    display: "Line Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "issueLocationFk",
    type: "select",
    display: "Issue Location",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "receivingLocationFk",
    type: "select",
    display: "Receiving Location",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "lineCapacity",
    type: "number",
    display: "Line Capacity",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "lotNumber",
    type: "string",
    display: "Lot Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "bom",
    type: "select",
    display: "BOM",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetAlternateBom`,
  },
  {
    name: "alternateBom",
    type: "select",
    display: "Alternate Bom",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetAlternateBom`,
  },
  {
    name: "status",
    type: "select",
    display: "Status",
    default: "",
    options: ["Active", "In Active"],
    description: "",
    required: false,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

// export const BOM_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI. No.",
//   },
//   {
//     name: "bomName",
//     display: "Bom Name",
//   },
//   {
//     name: "MaterialName",
//     display: "Material Name",
//   },
//   {
//     name: "Plantname",
//     display: "Plant Name",
//   },
//   {
//     name: "StorageLocation",
//     display: "Storage Location",
//   },
//   {
//     name: "UsageName",
//     display: "Usage Name",
//   },
//   {
//     name: "AlternateBomName",
//     display: "Alternate Bom",
//   },
//   {
//     name: "BomCategoryName",
//     display: "BOM Category",
//   },

//   {
//     name: "BomComponentName",
//     display: "BOM Components",
//   },
//   // {
//   //   name: "EndTime",
//   //   display: "End Time",

//   // },
//   {
//     name: "ValidTo",
//     display: "Valid To",
//   },
//   {
//     name: "ValidFrom",
//     display: "Valid From",
//   },
//   {
//     name: "BaseQuantity",
//     display: "Base Quantity",
//   },
//   {
//     name: "BomItem",
//     display: "BOM Item",
//   },
//   {
//     name: "action",
//     display: "Action",
//   },
// ]

// // export const BOM_DATA: ITableData[] = [
// //   {
// //     idNo: 1122,
// //     materialId: "M1234",
// //     materialGroup: "G11",
// //     unitOfMeasure: 123,
// //     itemCategory: "Metal",
// //     componentMaterialId: "Assembly",
// //     componentQuentity: 1250,
// //     validFrom: "2023-10-05",
// //     validTo: "2023-10-05",
// //   },
// //   {
// //     idNo: 1123,
// //     materialId: "M1234",
// //     materialGroup: "G11",
// //     unitOfMeasure: 123,
// //     itemCategory: "Plastic",
// //     componentMaterialId: "Machining",
// //     componentQuentity: 1250,
// //     validFrom: "2023-10-05",
// //     validTo: "2023-10-05",
// //   },
// //   {
// //     idNo: 1124,
// //     materialId: "M1234",
// //     materialGroup: "G11",
// //     unitOfMeasure: 123,
// //     itemCategory: "Metal",
// //     componentMaterialId: "Assembly",
// //     componentQuentity: 1250,
// //     validFrom: "2023-10-05",
// //     validTo: "2023-10-05",
// //   },
// // ]

// export const BOM_FORM_DATA: IFormVariable[] = [
//   {
//     name: "BomName",
//     type: "string",
//     display: "Bom Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "MaterialNumber",
//     type: "select",
//     display: "Material Number",
//     default: "",
//     description: "",
//     options: ["m-1", "m-2"],
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialNumberDD`,
//   },
//   {
//     name: "PlantId",
//     type: "select",
//     display: "Plant",
//     default: "",
//     description: "",
//     options: ["p-1", "p-2"],
//     required: true,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetPlantDD`,
//     group: 1,
//   },
//   {
//     name: "StorageLocationId",
//     type: "select",
//     display: "Storage Location",
//     default: "",
//     description: "",
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetStorageLocationDD`,
//     options: ["SL-1", "SL-2"],
//     required: true,
//     group: 2,
//   },
//   {
//     name: "Usage",
//     type: "select",
//     display: "Usage",
//     default: "",
//     description: "",
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomUsageDD`,
//     options: ["production", "engineering", "costing"],
//     required: true,
//     group: 1,
//   },
//   {
//     name: "AlternateBomId",
//     type: "select",
//     display: "Alternate Bom",
//     default: "",
//     description: "",
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetAlternateBom`,
//     options: ["BOM-1", "BOM-2"],
//     group: 2,
//   },
//   {
//     name: "BomCategory",
//     type: "select",
//     display: "BOM Category",
//     default: "",
//     description: "",
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomCategoryDD`,
//     options: [
//       "Material BOM",
//       "Document BOM",
//       "Equipment BOM",
//       "Functional Location BOM",
//     ],
//     required: true,
//     group: 1,
//   },
//   {
//     name: "BomComponent",
//     type: "select",
//     display: "BOM Components",
//     default: "",
//     description: "",
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomComponentDD`,
//     options: ["Stock Items", "Non-stock Items", "Variable-size Items"],
//     required: true,
//     group: 2,
//   },
//   // {
//   //   name: "EndTime",
//   //   type: "time",
//   //   display: "End Time",
//   //   default: "",
//   //   description: "",
//   //   required: true,
//   //   group: 2,
//   // },
//   {
//     name: "ValidTo",
//     type: "date",
//     display: "Valid To",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "ValidFrom",
//     type: "date",
//     display: "Valid From",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "BaseQuantity",
//     type: "number",
//     display: "Base Quantity",
//     default: 0,
//     description: "",
//     required: true,
//     group: 1,
//   },
// ]

// export const BOM_ITEM_FORM_DATA: IFormVariable[] = [
//   {
//     name: "BomName",
//     type: "string",
//     display: "Bom Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "MaterialNumber",
//     type: "select",
//     display: "Material Number",
//     default: "",
//     description: "",
//     options: ["m-1", "m-2"],
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialNumberDD`,
//   },
//   {
//     name: "PlantId",
//     type: "select",
//     display: "Plant",
//     default: "",
//     description: "",
//     options: ["p-1", "p-2"],
//     required: true,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetPlantDD`,
//     group: 1,
//   },

//   {
//     name: "AlternateBomId",
//     type: "select",
//     display: "Alternate Bom",
//     default: "",
//     description: "",
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetAlternateBom`,
//     options: ["BOM-1", "BOM-2"],
//     group: 2,
//   },

//   {
//     name: "ValidTo",
//     type: "date",
//     display: "Valid To",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "ValidFrom",
//     type: "date",
//     display: "Valid From",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "BaseQuantity",
//     type: "number",
//     display: "Base Quantity",
//     default: 0,
//     description: "",
//     required: true,
//     group: 1,
//   },
// ]

// export const BOM_LEVEL_FORM_DATA: IFormVariable[] = [
//   {
//     name: "Item Category",
//     type: "select",
//     display: "Item Category",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetItemCategoryDD`,
//   },
//   // {
//   //   name: "ItemCategoryName",
//   //   type: "string",
//   //   display: "Item Category Name",
//   //   default: "",
//   //   description: "",
//   //   required: true,
//   //   group: 2,
//   // },
//   {
//     name: "MaterialId",
//     type: "select",
//     display: "Material Number",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialNumberDD`,
//   },
//   // {
//   //   name: "MaterialName",
//   //   type: "string",
//   //   display: "Material Name",
//   //   default: "",
//   //   description: "",
//   //   required: true,
//   //   group: 2,
//   // },
//   {
//     name: "Quantity",
//     type: "number",
//     display: "Quantity",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "UOM",
//     type: "string",
//     display: "UOM",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
// ]

export const BOM_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "bomName",
    display: "Bom Name",
  },
  {
    name: "materialName",
    display: "Material Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  {
    name: "storageLocation",
    display: "Storage Location",
  },
  {
    name: "usageName",
    display: "Usage Name",
  },
  {
    name: "alternateBomName",
    display: "Alternate Bom",
  },
  {
    name: "bomCategoryName",
    display: "BOM Category",
  },
  {
    name: "bomComponentName",
    display: "BOM Components",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "baseQuantity",
    display: "Base Quantity",
  },
  {
    name: "bomItem",
    display: "BOM Item",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const BOM_FORM_DATA: IFormVariable[] = [
  {
    name: "bomName",
    type: "string",
    display: "Bom Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "materialNumber",
    type: "select",
    display: "Material Number",
    default: "",
    description: "",
    options: ["m-1", "m-2"],
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialNumberDD`,
  },
  {
    name: "plantId",
    type: "select",
    display: "Plant",
    default: "",
    description: "",
    options: ["p-1", "p-2"],
    required: true,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetPlantDD`,
    group: 1,
  },
  {
    name: "storageLocationId",
    type: "select",
    display: "Storage Location",
    default: "",
    description: "",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetStorageLocationDD`,
    options: ["SL-1", "SL-2"],
    required: true,
    group: 2,
  },
  {
    name: "usage",
    type: "select",
    display: "Usage",
    default: "",
    description: "",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomUsageDD`,
    options: ["production", "engineering", "costing"],
    required: true,
    group: 1,
  },
  {
    name: "alternateBomId",
    type: "select",
    display: "Alternate Bom",
    default: "",
    description: "",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetAlternateBom`,
    options: ["BOM-1", "BOM-2"],
    group: 2,
  },
  {
    name: "bomCategory",
    type: "select",
    display: "BOM Category",
    default: "",
    description: "",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomCategoryDD`,
    options: [
      "Material BOM",
      "Document BOM",
      "Equipment BOM",
      "Functional Location BOM",
    ],
    required: true,
    group: 1,
  },
  {
    name: "bomComponent",
    type: "select",
    display: "BOM Components",
    default: "",
    description: "",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetBomComponentDD`,
    options: ["Stock Items", "Non-stock Items", "Variable-size Items"],
    required: true,
    group: 2,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "baseQuantity",
    type: "number",
    display: "Base Quantity",
    default: 0,
    description: "",
    required: true,
    group: 1,
  },
]

export const BOM_ITEM_FORM_DATA: IFormVariable[] = [
  {
    name: "bomName",
    type: "string",
    display: "Bom Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "materialNumber",
    type: "select",
    display: "Material Number",
    default: "",
    description: "",
    options: ["m-1", "m-2"],
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialNumberDD`,
  },
  {
    name: "plantId",
    type: "select",
    display: "Plant",
    default: "",
    description: "",
    options: ["p-1", "p-2"],
    required: true,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetPlantDD`,
    group: 1,
  },
  {
    name: "alternateBomId",
    type: "select",
    display: "Alternate Bom",
    default: "",
    description: "",
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetAlternateBom`,
    options: ["BOM-1", "BOM-2"],
    group: 2,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "baseQuantity",
    type: "number",
    display: "Base Quantity",
    default: 0,
    description: "",
    required: true,
    group: 1,
  },
]

export const BOM_LEVEL_FORM_DATA: IFormVariable[] = [
  {
    name: "itemCategory",
    type: "select",
    display: "Item Category",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetItemCategoryDD`,
  },
  {
    name: "materialId",
    type: "select",
    display: "Material Number",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialNumberDD`,
  },
  {
    name: "quantity",
    type: "number",
    display: "Quantity",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "uom",
    type: "string",
    display: "UOM",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]


export const SERIAL_PROFILE_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "idNo",
    display: "Profile Id",
  },
  {
    name: "profileName",
    display: "Profile Name",
  },
  {
    name: "format",
    display: "Format",
  },
  {
    name: "startValue",
    display: "Start Value",
  },
  {
    name: "endValue",
    display: "End Value",
  },
  {
    name: "category",
    display: "Category",
  },
  {
    name: "plantId",
    display: "Plant",
  },
  {
    name: "status",
    display: "Status",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "createdDate",
    display: "Created Date",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const SERIAL_PROFILE_DATA: ITableData[] = [
  {
    idNo: 1122,
    profileName: "Profile1",
    description: "Dummy Data",
    format: "M1234",
    startValue: 124,
    endValue: 1123,
    category: "Production",
    categoryDescription: "Dummy Data",
    procedure: "Assembly",
    procedureDescription: "Dummy Data",
    plantId: "1122",
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
    status: "Active",
    createdBy: 1123,
    createdDate: new Date().toLocaleDateString("fr-CA"),
  },
  {
    idNo: 1123,
    profileName: "Profile2",
    description: "Dummy Data",
    format: "M1234",
    startValue: 124,
    endValue: 1123,
    category: "Machine",
    categoryDescription: "Dummy Data",
    procedure: "Assembly",
    procedureDescription: "Dummy Data",
    plantId: "1123",
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
    status: "Active",
    createdBy: 1123,
    createdDate: new Date().toLocaleDateString("fr-CA"),
  },
  {
    idNo: 1124,
    profileName: "Profile3",
    description: "Dummy Data",
    format: "M1234",
    startValue: 124,
    endValue: 1123,
    category: "Production",
    categoryDescription: "Dummy Data",
    procedure: "Assembly",
    procedureDescription: "Dummy Data",
    plantId: "1124",
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
    status: "Active",
    createdBy: 1123,
    createdDate: new Date().toLocaleDateString("fr-CA"),
  },
]

export const SERIAL_PROFILE_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "idNo",
  //   type: "string",
  //   display: "Profile Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "format",
    type: "string",
    display: "Format",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "startValue",
    type: "number",
    display: "Start Value",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "endValue",
    type: "number",
    display: "End Value",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "category",
    type: "string",
    display: "Category",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "categoryDescription",
    type: "string(textarea)",
    display: "Category Description",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "procedure",
    type: "string",
    display: "Procedure",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "procedureDescription",
    type: "string(textarea)",
    display: "Procedure Description",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "profileName",
    type: "string",
    display: "Profile Name",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "plantId",
    type: "number",
    display: "Plant",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "description",
    type: "string(textarea)",
    display: "Description",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "status",
    type: "bool",
    display: "Status",
    default: true,
    description: "",
    required: true,
    group: 2,
  },
]

export const NUMBER_RANGES_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "rangeId",
    display: "Range Id",
  },
  {
    name: "rangeName",
    display: "Range Name",
  },
  {
    name: "rangeGroup",
    display: "Range Group",
  },
  {
    name: "startValue",
    display: "Start Value",
  },
  {
    name: "endValue",
    display: "End Value",
  },
  {
    name: "pageName",
    display: "Assigned To",
  },

  {
    name: "action",
    display: "Action",
  },
]

// export const NUMBER_RANGES_DATA: ITableData[] = [
//   {
//     idNo: 1122,
//     rangeName: "Range1",
//     rangeGroup: "M1234",
//     startValue: 124,
//     endValue: 1123,
//     assignedTo: "Production Order",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//   },
//   {
//     idNo: 1123,
//     rangeName: "Range2",
//     rangeGroup: "M1234",
//     startValue: 124,
//     endValue: 1123,
//     assignedTo: "Stock Order",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//   },
//   {
//     idNo: 1124,
//     rangeName: "Range3",
//     rangeGroup: "M1234",
//     startValue: 124,
//     endValue: 1123,
//     assignedTo: "Production Order",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//   },
// ]

export const NUMBER_RANGES_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "idNo",
  //   type: "string",
  //   display: "Range Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "rangeName",
    type: "string",
    display: "Range Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "rangeGroup",
    type: "string",
    display: "Range Group",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "startValue",
    type: "number",
    display: "Start Value",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "endValue",
    type: "number",
    display: "End Value",
    default: "",
    description: "",
    required: true,
    group: 2,
  },

  {
    name: "assignedTo",
    type: "select",
    display: "Assigned To",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESNumberRanges/GetAssignedToDD`,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

// export const MATERIAL_MASTER_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI. No.",
//   },
//   {
//     name: "idNo",
//     display: "Material Id",
//   },
//   {
//     name: "materialName",
//     display: "Material Name",
//   },
//   {
//     name: "materialCode",
//     display: "Material Code",
//   },
//   {
//     name: "itemCategory",
//     display: "Item Category",
//   },
//   {
//     name: "UOM",
//     display: "Unit of Measure",
//   },
//   {
//     name: "materialGroup",
//     display: "Material Group",
//   },
//   {
//     name: "batchIndicator",
//     display: "Batch Indicator",
//   },
//   {
//     name: "validFrom",
//     display: "Valid From",
//   },
//   {
//     name: "validTo",
//     display: "Valid To",
//   },
//   {
//     name: "action",
//     display: "Action",
//   },
// ]
export const MATERIAL_MASTER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "materialNumber",
    display: "Material Number",
  },
  {
    name: "materialName",
    display: "Material Name",
  },
  {
    name: "description",
    display: "Description",
  },
  {
    name: "itemCategory",
    display: "Item Category",
  },
  {
    name: "unitOfMeasure",
    display: "Unit of Measure",
  },
  {
    name: "materialGroup",
    display: "Material Group",
  },
  {
    name: "batchIndicator",
    display: "Batch Indicator",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const MATERIAL_MASTER_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "MaterialId",
  //   type: "number",
  //   display: "Material Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "materialName",
    type: "string",
    display: "Material Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "description",
    type: "string(textarea)",
    display: "Description",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "itemCategory",
    type: "select",
    display: "Item Category",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetItemCategoryDD`,
  },
  {
    name: "unitOfMeasure",
    type: "string",
    display: "UOM",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "materialGroup",
    type: "select",
    display: "Material Group",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialgroupDD`,
  },
  {
    name: "batchIndicator",
    type: "bool",
    display: "Batch Indicator",
    default: true,
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "stockQuantity",
    type: "number",
    display: "Stock Quantity",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "minimumStockLevel",
    type: "number",
    display: "Min Stock Level",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "maximumStockLevel",
    type: "number",
    display: "Max Stock Level",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "reorderPoint",
    type: "number",
    display: "Reorder Point",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "priceOfMaterial",
    type: "number",
    display: "Price Of Material",
    default: "",
    description: "Range : 0-99999",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant Id",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "locationIdFk",
    type: "select",
    display: "Location Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "machineCapacity",
    type: "number",
    display: "Machine Capacity",
    default: "",
    description: "",
    required: false,
    group: 2,
  },
  {
    name: "procurementType",
    type: "string",
    display: "Procurement Type",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "serializedMaterial",
    type: "bool",
    display: "Serialized Material",
    default: true,
    description: "",
    required: true,
    group: 2,
  },
]
export const MATERIAL_MASTER_BULK_INSERTION_DATA: IFormVariable[] = [
  {
    name: "itemCategory",
    type: "select",
    display: "Item Category",
    default: "",
    description: "",

    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetItemCategoryDD`,
  },

  {
    name: "materialGroup",
    type: "select",
    display: "Material Group",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialgroupDD`,
  },
  {
    name: "batchIndicator",
    type: "bool",
    display: "Batch Indicator",
    default: false,
    description: "",
    required: false,
    group: 1,
  },

  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant Id",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "locationIdFk",
    type: "select",
    display: "Location Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },

  {
    name: "serializedMaterial",
    type: "bool",
    display: "Serialized Material",
    default: false,
    description: "",
    required: false,
    group: 2,
  },
]

// export const MATERIAL_MASTER_BULK_INSERTION_DATA: IFormVariable[] = [
//     {
//     name: "ItemCategory",
//     type: "select",
//     display: "Item Category",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetItemCategoryDD`,
//   },

//   {
//     name: "MaterialGroup",
//     type: "select",
//     display: "Material Group",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MES_BOM/GetMaterialgroupDD`,
//   },
//   {
//     name: "BatchIndicator",
//     type: "bool",
//     display: "Batch Indicator",
//     default: false,
//     description: "",
//     required: false,
//     group: 1,
//   },

//   {
//     name: "ValidFrom",
//     type: "date",
//     display: "Valid From",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "ValidTo",
//     type: "date",
//     display: "Valid To",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "FactoryIdFk",
//     type: "select",
//     display: "Factory Id",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
//   },
//   {
//     name: "PlantIdFk",
//     type: "select",
//     display: "Plant Id",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
//   },
//   {
//     name: "LocationIdFk",
//     type: "select",
//     display: "Location Id",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
//   },

//   {
//     name: "SerializedMaterial",
//     type: "bool",
//     display: "Serialized Material",
//     default: false,
//     description: "",
//     required: false,
//     group: 2,
//   },

// ]

// Material Group Master Header Data
export const MATERIAL_GROUP_MASTER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },

  {
    name: "materialGroupName",
    display: "Material Group Name",
  },
  {
    name: "description",
    display: "Description",
  },
  {
    name: "materialGroupRange",
    display: "Material Group Range",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]
// =====================material group master data
export const MATERIAL_GROUP_MASTER_DATA: ITableData[] = [
  {
    idNo: 1122,
    materialGroupName: "Material1",
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
    description: "Dummy Data",
  },
]

// export const MATERIAL_MASTER_DATA: ITableData[] = [
//   {
//     idNo: 1122,
//     materialName: "Material1",
//     materialCode: "M1234",
//     itemCategory: "Metal",
//     materialGroup: "G1",
//     reorderPoint: "Production",
//     plantId: "1124",
//     locationId: "1124",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//     serializedMaterial: "Active",
//     description: "Dummy Data",
//     priceOfMaterial: 1234,
//     stockQuantity: 123,
//     minStockLevel: 1223,
//     maxStockLevel: 2123,
//     UOM: "Kilograms",
//     batchIndicator: "Active",
//     machineCapacity: 123,
//     procurementType: "Make to Order",
//   },
//   {
//     idNo: 1123,
//     materialName: "Material2",
//     materialCode: "M1232",
//     itemCategory: "Plastic",
//     materialGroup: "G1",
//     reorderPoint: "Production",
//     plantId: "1124",
//     locationId: "1124",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//     serializedMaterial: "Active",
//     description: "Dummy Data",
//     priceOfMaterial: 1234,
//     stockQuantity: 123,
//     minStockLevel: 1223,
//     maxStockLevel: 2123,
//     UOM: "Meters",
//     batchIndicator: "Active",
//     machineCapacity: 123,
//     procurementType: "Make to Order",
//   },
//   {
//     idNo: 1124,
//     materialName: "Material3",
//     materialCode: "M1233",
//     itemCategory: "Metal",
//     materialGroup: "G1",
//     reorderPoint: "Production",
//     plantId: "1124",
//     locationId: "1124",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//     serializedMaterial: "Active",
//     description: "Dummy Data",
//     priceOfMaterial: 1234,
//     stockQuantity: 123,
//     minStockLevel: 1223,
//     maxStockLevel: 2123,
//     UOM: "Kilograms",
//     batchIndicator: "Active",
//     machineCapacity: 123,
//     procurementType: "Make to Order",
//   },
// ]
// ================================Material Group master

export const MATERIAL_GROUP_MASTER_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "idNo",
  //   type: "string",
  //   display: "Material Group Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "materialGroupName",
    type: "string",
    display: "Material Group Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },

  {
    name: "description",
    type: "string(textarea)",
    display: "Description",
    default: "",
    description: "",
    required: true,
    group: 2,
  },

  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

// export const MATERIAL_MASTER_FORM_DATA: IFormVariable[] = [
//   {
//     name: "idNo",
//     type: "string",
//     display: "Material Id",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "materialName",
//     type: "string",
//     display: "Material Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "materialCode",
//     type: "string",
//     display: "Material Code",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "itemCategory",
//     type: "string",
//     display: "Item Category",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "materialGroup",
//     type: "select",
//     display: "Material Group",
//     default: "",
//     options: ["G1", "G2", "G3"],
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "reorderPoint",
//     type: "number",
//     display: "Reorder Point",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "description",
//     type: "string(textarea)",
//     display: "Description",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "plantId",
//     type: "number",
//     display: "Plant Id",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "locationId",
//     type: "number",
//     display: "Location Id",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "validFrom",
//     type: "date",
//     display: "Valid From",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "validTo",
//     type: "date",
//     display: "Valid To",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "serializedMaterial",
//     type: "bool",
//     display: "Serialized Material",
//     default: true,
//     description: "",
//     required: true,
//     group: 2,
//   },
//   {
//     name: "priceOfMaterial",
//     type: "number",
//     display: "Price Of Material",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "stockQuantity",
//     type: "number",
//     display: "Stock Quantity",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "minStockLevel",
//     type: "number",
//     display: "Min Stock Level",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "maxStockLevel",
//     type: "number",
//     display: "Max Stock Level",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "UOM",
//     type: "string",
//     display: "UOM",
//     default: "",
//     description: "",
//     required: false,
//     group: 2,
//   },
//   {
//     name: "batchIndicator",
//     type: "bool",
//     display: "Batch Indicator",
//     default: true,
//     description: "",
//     required: false,
//     group: 2,
//   },
//   {
//     name: "machineCapacity",
//     type: "string",
//     display: "Machine Capacity",
//     default: "",
//     description: "",
//     required: false,
//     group: 2,
//   },
//   {
//     name: "procurementType",
//     type: "string",
//     display: "Procurement Type",
//     default: "",
//     description: "",
//     required: false,
//     group: 2,
//   },
// ]

export const WAREHOUSE_MASTER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "WarehouseCode",
    display: "Warehouse Code",
  },
  {
    name: "WarehouseName",
    display: "Warehouse Name",
  },
  {
    name: "Location",
    display: "Location",
  },
  {
    name: "SupervisorName",
    display: "Supervisor Id",
  },
  {
    name: "Capacity",
    display: "Capacity (cubic meters)",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const WAREHOUSE_MASTER_DATA: ITableData[] = [
  {
    idNo: 1122,
    warehouseName: "Warehouse1",
    warehouseCode: "W1231",
    capacity: 1234,
    location: "Dummy Data",
    superviserId: 1223,
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
  },
  {
    idNo: 1123,
    warehouseName: "Warehouse2",
    warehouseCode: "W1232",
    capacity: 1234,
    location: "Dummy Data",
    superviserId: 1223,
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
  },
  {
    idNo: 1124,
    warehouseName: "Warehouse3",
    warehouseCode: "W1233",
    capacity: 1234,
    location: "Dummy Data",
    superviserId: 1223,
    validFrom: "2023-10-05",
    validTo: "2023-10-05",
  },
]

export const WAREHOUSE_MASTER_FORM_DATA: IFormVariable[] = [
  {
    name: "WarehouseCode",
    type: "string",
    display: "Warehouse Code",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "WarehouseName",
    type: "string",
    display: "Warehouse Name",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "Capacity",
    type: "number",
    display: "Capacity(cubic meters)",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "Location",
    type: "string(textarea)",
    display: "Location",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "SupervisorIdFk",
    type: "selectone",
    display: "Supervisor Id",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetUserDD_Supervisor`,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

export const INVENTORY_LEVELS_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "InventoryLevelId",
    display: "Inventory Level Id",
  },
  {
    name: "WarehouseId",
    display: "Warehouse Id",
  },
  {
    name: "MaterialId",
    display: "Material Id",
  },
  {
    name: "QuantityReserved",
    display: "Quantity Reserved",
  },
  {
    name: "QuantityOnHand",
    display: "Quantity On Hand",
  },
  {
    name: "QuantityAvailable",
    display: "Quantity Available",
  },
  {
    name: "ModifiedBy",
    display: "Last Updated By",
  },
  {
    name: "LastModifiedDate",
    display: "Last Updated Date",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const INVENTORY_LEVELS_DATA: ITableData[] = [
  {
    idNo: 1122,
    warehouseId: "W1231",
    materialId: "M123",
    quantityReserved: 1234,
    quantityOnHand: 1234,
    quantityAvailable: 123,
    lastUpdatedBy: 1231,
    lastUpdatedDate: "2023-10-05",
  },
  {
    idNo: 1123,
    warehouseId: "W1232",
    materialId: "M123",
    quantityReserved: 1234,
    quantityOnHand: 1234,
    quantityAvailable: 123,
    lastUpdatedBy: 1231,
    lastUpdatedDate: "2023-10-05",
  },
  {
    idNo: 1124,
    warehouseId: "W1233",
    materialId: "M123",
    quantityReserved: 1234,
    quantityOnHand: 1234,
    quantityAvailable: 123,
    lastUpdatedBy: 1231,
    lastUpdatedDate: "2023-10-05",
  },
]

export const INVENTORY_LEVELS_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "idNo",
  //   type: "string",
  //   display: "Inventory Level Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "WarehouseId",
    type: "select",
    display: "Warehouse Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetWarehouseDD`,
  },
  {
    name: "MaterialId",
    type: "select",
    display: "Material Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "QuantityReserved",
    type: "number",
    display: "Quantity Reserved",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "QuantityOnHand",
    type: "number",
    display: "Quantity On Hand",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "QuantityAvailable",
    type: "number",
    display: "Quantity Available",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]

export const STOCK_MOVEMENT_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "MovementId",
    display: "Movement Id",
  },
  {
    name: "WarehouseIdFk",
    display: "Warehouse Id",
  },
  {
    name: "MaterialIdFk",
    display: "Material Id",
  },
  {
    name: "MovementType",
    display: "Movement Type",
  },
  {
    name: "QuantityMoved",
    display: "Quantity Moved",
  },
  {
    name: "FromLocation",
    display: "From Location",
  },
  {
    name: "ToLocation",
    display: "To Location",
  },
  {
    name: "MovementDate",
    display: "Movement Date",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const STOCK_MOVEMENT_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "MovementId",
  //   type: "string",
  //   display: "Movement Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "WarehouseIdFk",
    type: "select",
    display: "Warehouse Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetWarehouseDD`,
  },
  {
    name: "MaterialIdFk",
    type: "select",
    display: "Material Id",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "QuantityMoved",
    type: "number",
    display: "Quantity Moved",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "MovementType",
    type: "string",
    display: "Movement Type",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "FromLocation",
    type: "select",
    display: "From Location",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "ToLocation",
    type: "select",
    display: "To Location",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "MovementDate",
    type: "date",
    display: "Movement Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

export const PICKING_PACKING_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "OperationId",
    display: "Operation Id",
  },
  {
    name: "WarehouseId",
    display: "Warehouse Id",
  },
  {
    name: "MaterialId",
    display: "Material Id",
  },
  {
    name: "OrderId",
    display: "Order Id",
  },
  {
    name: "QuantityPicked",
    display: "Quantity Picked",
  },
  {
    name: "PickingDate",
    display: "Picking Date",
  },
  {
    name: "QuantityPacked",
    display: "Quantity Packed",
  },
  {
    name: "PackingDate",
    display: "Packing Date",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

// export const PICKING_PACKING_DATA: ITableData[] = [
//   {
//     idNo: 1122,
//     operationId: "1122",
//     warehouseId: "W1231",
//     materialId: "M123",
//     orderId: "OR123",
//     quantityPicked: 430,
//     quantityPacked: 430,
//     pickedBy: "1234",
//     packedBy: "1234",
//     pickingDate: "2023-10-05",
//     packingDate: "2023-10-05",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//   },
//   {
//     idNo: 1123,
//     operationId: "1123",
//     warehouseId: "W1232",
//     materialId: "M123",
//     orderId: "OR123",
//     quantityPicked: 430,
//     quantityPacked: 430,
//     pickedBy: "1234",
//     packedBy: "1234",
//     pickingDate: "2023-10-05",
//     packingDate: "2023-10-05",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//   },
//   {
//     idNo: 1124,
//     operationId: "1124",
//     warehouseId: "W1233",
//     materialId: "M123",
//     orderId: "OR123",
//     quantityPicked: 430,
//     quantityPacked: 430,
//     pickedBy: "1234",
//     packedBy: "1234",
//     pickingDate: "2023-10-05",
//     packingDate: "2023-10-05",
//     validFrom: "2023-10-05",
//     validTo: "2023-10-05",
//   },
// ]

export const PICKING_PACKING_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "OperationId",
  //   type: "string",
  //   display: "Operation Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "WarehouseId",
    type: "select",
    display: "Warehouse Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetWarehouseDD`,
  },
  {
    name: "MaterialId",
    type: "select",
    display: "Material Id",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "OrderId",
    type: "string",
    display: "Order Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESProductOrder/GetProductOrderDD`,
  },
  {
    name: "QuantityPicked",
    type: "number",
    display: "Quantity Picked",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "QuantityPacked",
    type: "number",
    display: "Quantity Packed",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "PackedBy",
    type: "selectone",
    display: "Packed By",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_Picking_Packing/GetPackedbyDD`,
  },
  {
    name: "PickedBy",
    type: "selectone",
    display: "Picked By",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_Picking_Packing/GetPackedbyDD`,
  },
  {
    name: "PackingDate",
    type: "date",
    display: "Packing Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },

  {
    name: "PickingDate",
    type: "date",
    display: "Picking Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },

  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
]

export const DISPATCH_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "DispatchId",
    display: "Dispatch ID",
  },
  {
    name: "OrderId",
    display: "Order ID",
  },
  {
    name: "WarehouseId",
    display: "Warehouse ID",
  },
  {
    name: "DispatchDate",
    display: "Dispatch Date",
  },
  {
    name: "DispatchedByPersonName",
    display: "Dispatched By",
  },
  {
    name: "DispatchedToPersonName",
    display: "Dispatched To",
  },
  {
    name: "TrackingNumber",
    display: "Tracking Number",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const DISPATCH_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "dispatchId",
  //   type: "string",
  //   display: "Dispatch ID",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "OrderId",
    type: "select",
    display: "Order ID",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESProductOrder/GetProductOrderDD`,
  },
  {
    name: "WarehouseId",
    type: "select",
    display: "Warehouse ID",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetWarehouseDD`,
  },
  {
    name: "DispatchDate",
    type: "date",
    display: "Dispatch Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "DispatchedBy",
    type: "selectone",
    display: "Dispatched By",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "DispatchedTo",
    type: "selectone",
    display: "Dispatch To",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "ShippingCarrier",
    type: "string",
    display: "Shipping Carrier",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "TrackingNumber",
    type: "string",
    display: "Tracking Number",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

export const GATE_OUT_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "OutEntryId",
    display: "Entry ID",
  },
  {
    name: "OutEntryNumber",
    display: "Entry Number",
  },
  {
    name: "OutPlantIdFk",
    display: "Plant",
  },
  {
    name: "OutStoragLocIdFk",
    display: "Storage Location",
  },
  {
    name: "OutMatrlMstId",
    display: "Material ID",
  },
  {
    name: "OutQuantity",
    display: "Quantity",
  },
  {
    name: "OutEntyDate",
    display: "Entry Date",
  },
  {
    name: "OutEntyTime",
    display: "Out Time",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const GATE_OUT_DATA: ITableData[] = [
  {
    idNo: 740001,
    entryId: "740001",
    entryNumber: "50",
    plant: "A1101",
    storageLocation: "SL01",
    materialId: "MID02",
    quantity: "10",
    entryDate: "2023-05-10",
    entryTime: "05:00",
    validFrom: "2023-04-02",
    validTo: "2023-04-02",
  },
  {
    idNo: 740002,
    entryId: "740002",
    entryNumber: "20",
    plant: "A1102",
    storageLocation: "SL02",
    materialId: "MID07",
    quantity: "10",
    entryDate: "2023-05-10",
    entryTime: "05:00",
    validFrom: "2023-04-02",
    validTo: "2023-04-02",
  },
  {
    idNo: 740003,
    entryId: "740003",
    entryNumber: "30",
    plant: "C3002",
    storageLocation: "SL03",
    materialId: "MID04",
    quantity: "10",
    entryDate: "2023-05-10",
    entryTime: "05:00",
    validFrom: "2023-04-02",
    validTo: "2023-04-02",
  },
  {
    idNo: 740004,
    entryId: "740004",
    entryNumber: "30",
    plant: "B1043",
    storageLocation: "SL04",
    materialId: "MID03",
    quantity: "10",
    entryDate: "2023-05-10",
    entryTime: "05:00",
    validFrom: "2023-04-02",
    validTo: "2023-04-02",
  },
]

export const GATE_OUT_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "OutEntryId",
  //   type: "number",
  //   display: "Entry ID",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "OutMatrlMstId",
    type: "select",
    display: "Material ID",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "OutEntryNumber",
    type: "string",
    display: "Entry Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "OutPlantIdFk",
    type: "select",
    display: "Plant",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "OutEntyDate",
    type: "date",
    display: "Entry Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "OutStoragLocIdFk",
    type: "select",
    display: "Storage Location",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "OutEntyTime",
    type: "time",
    display: "Entry Time",
    default: "",
    description: "",
    required: true,
    group: 1,
  },

  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "OutQuantity",
    type: "number",
    display: "Quantity",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
]

export const GATE_IN_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  // {
  //   name: "InEntryId",
  //   display: "Entry ID",
  // },
  {
    name: "InEntryNumber",
    display: "Entry Number",
  },
  {
    name: "InPlantIdFk",
    display: "Plant",
  },
  {
    name: "InStoragLocIdFk",
    display: "Storage Location",
  },
  {
    name: "InMatrlMstId",
    display: "Material ID",
  },
  {
    name: "InQuantity",
    display: "Quantity",
  },
  {
    name: "InEntyDate",
    display: "Entry Date",
  },
  {
    name: "InEntyTime",
    display: "Entry Time",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

// export const GATE_IN_DATA: ITableData[] = [
//   {
//     idNo: 740001,
//     entryId: "740001",
//     entryNumber: "50",
//     plant: "A1101",
//     storageLocation: "SL01",
//     materialId: "MID02",
//     quantity: "10",
//     entryDate: "2023-05-10",
//     entryTime: "09:00",
//     validFrom: "2023-04-02",
//     validTo: "2023-04-02",
//   },
//   {
//     idNo: 740002,
//     entryId: "740002",
//     entryNumber: "20",
//     plant: "A1102",
//     storageLocation: "SL02",
//     materialId: "MID07",
//     quantity: "10",
//     entryDate: "2023-05-10",
//     entryTime: "09:00",
//     validFrom: "2023-04-02",
//     validTo: "2023-04-02",
//   },
//   {
//     idNo: 740003,
//     entryId: "740003",
//     entryNumber: "30",
//     plant: "C3002",
//     storageLocation: "SL03",
//     materialId: "MID04",
//     quantity: "10",
//     entryDate: "2023-05-10",
//     entryTime: "09:00",
//     validFrom: "2023-04-02",
//     validTo: "2023-04-02",
//   },
//   {
//     idNo: 740004,
//     entryId: "740004",
//     entryNumber: "30",
//     plant: "B1043",
//     storageLocation: "SL04",
//     materialId: "MID03",
//     quantity: "10",
//     entryDate: "2023-05-10",
//     entryTime: "09:00",
//     validFrom: "2023-04-02",
//     validTo: "2023-04-02",
//   },
// ]

export const GATE_IN_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "InEntryId",
  //   type: "string",
  //   display: "Entry ID",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "InEntryNumber",
    type: "string",
    display: "Entry Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "InMatrlMstId",
    type: "select",
    display: "Material ID",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },

  {
    name: "InPlantIdFk",
    type: "select",
    display: "Plant",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "InStoragLocIdFk",
    type: "select",
    display: "Storage Location",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "InEntyDate",
    type: "date",
    display: "Entry Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },

  {
    name: "InEntyTime",
    type: "time",
    display: "Entry Time",
    default: "",
    description: "",
    required: true,
    group: 2,
  },

  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "InQuantity",
    type: "string",
    display: "Quantity",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
]

export const PRODUCTION_ORDER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  // {
  //   name: "OrderId",
  //   display: "Order ID",
  // },
  {
    name: "orderNumber",
    display: "Order Number",
  },
  {
    name: "versionName",
    display: "Version Name",
  },
  // {
  //   name: "orderType",
  //   display: "Order Type",
  // },
  // Dsiplaying Version ID
  {
    name: "factoryName",
    display: "Factory Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  {
    name: "storageLocationName",
    display: "Storage Location",
  },
  {
    name: "materialName",
    display: "Material Name",
  },

  {
    name: "quantity",
    display: "Quantity",
  },
  {
    name: "plannedStartDate",
    display: "Planned Start Date",
  },
  {
    name: "plannedEndDate",
    display: "Planned End Date",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]
// Hard Coded Values
// export const PRODUCTION_ORDER_DATA: ITableData[] = [
//   {
//     idNo: 2001,
//     orderId: "2001",
//     orderType: "MTS",
//     // Hard Coded Values
//     VersionDetails: "B-Version",
//     orderNumber: "3971",
//     quantity: "100",
//     factory: "1001",
//     plant: "1101",
//     storageLocation: "2001",
//     materialId: "MID02",
//     plannedStartDate: "2023-08-08",
//     plannedEndDate: "2023-12-08",
//     manufacturingId: "30004992",
//     uom: "Kilograms",
//     serialNoProfile: "A1",
//     serialNumber: "A11444492",
//     batchNumber: "BAT20213",
//     lotNumber: "LOT112243",
//     validFrom: "2023-04-02",
//     validTo: "2024-04-02",
//     deletionFlag: "No",
//     status: "Created",
//   },
//   {
//     idNo: 2002,
//     orderId: "2002",
//     orderType: "MTO",
//     VersionDetails: "A-Version",
//     orderNumber: "3971",
//     quantity: "100",
//     factory: "1001",
//     plant: "1101",
//     storageLocation: "2001",
//     materialId: "MID02",
//     plannedStartDate: "2023-08-08",
//     plannedEndDate: "2023-12-08",
//     manufacturingId: "30004992",
//     uom: "Kilograms",
//     serialNoProfile: "A1",
//     serialNumber: "A11444492",
//     batchNumber: "BAT20213",
//     lotNumber: "LOT112243",
//     validFrom: "2023-04-02",
//     validTo: "2024-04-02",
//     deletionFlag: "No",
//     status: "Created",
//   },
//   {
//     idNo: 2003,
//     orderId: "2003",
//     orderType: "MTA",
//     VersionDetails: "C-Version",
//     orderNumber: "3971",
//     quantity: "100",
//     factory: "1001",
//     plant: "1101",
//     storageLocation: "2001",
//     materialId: "MID02",
//     plannedStartDate: "2023-08-08",
//     plannedEndDate: "2023-12-08",
//     manufacturingId: "30004992",
//     uom: "Kilograms",
//     serialNoProfile: "A1",
//     serialNumber: "A11444492",
//     batchNumber: "BAT20213",
//     lotNumber: "LOT112243",
//     validFrom: "2023-04-02",
//     validTo: "2024-04-02",
//     deletionFlag: "No",
//     status: "Created",
//   },
// ]

export const PRODUCTION_ORDER_FORM_DATA: IFormVariable[] = [
  {
    name: "orderNumber",
    type: "string",
    display: "Order Number",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  // Field Added By SS
  {
    name: "versionId",
    type: "select",
    display: "Version Id Details",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESProductOrder/GetProductionVersionDD`,
  },

  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "storageLocationIdFk",
    type: "select",
    display: "Storage Location",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "materialIdFk",
    type: "select",
    display: "Material ID",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "manufacturingIdFk",
    type: "select",
    display: "Manufacturing Line",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESLineDD`,
  },

  {
    name: "quantity",
    type: "number",
    display: "Quantity",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "uom",
    type: "string",
    display: "UOM",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "batchNumber",
    type: "string",
    display: "Batch Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "lotNumber",
    type: "string",
    display: "Lot Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "status",
    type: "select",
    display: "Status",
    default: "",
    options: [
      "Created",
      "Released",
      "Partial Confirmation",
      "Final Confirmation",
      "Goods Confirmation",
      "Finished",
      "Closed",
    ],
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "plannedStartDate",
    type: "date",
    display: "Planned Start Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "plannedEndDate",
    type: "date",
    display: "Planned End Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "actualStartDate",
    type: "date",
    display: "Actual Start Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "actualEndDate",
    type: "date",
    display: "Actual End Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },

  // {
  //   name: "serialNoProfile",
  //   type: "select",
  //   display: "Serial No. Profile",
  //   default: "",
  //   options: ["A1", "A2", "A3"],
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  // {
  //   name: "serialNumber",
  //   type: "string",
  //   display: "Serial Number",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 2,
  // },

  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  // {
  //   name: "deletionFlag",
  //   type: "bool",
  //   display: "Deletion Flag",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
]

export const SUPPLIER_ORDER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "SupplierName",
    display: "Supplier Name",
  },
  {
    name: "MaterialName",
    display: "Material Name",
  },
  {
    name: "Quantity",
    display: "Quantity",
  },
  {
    name: "Status",
    display: "Status",
  },
  {
    name: "CreatedBy",
    display: "Created By",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const SUPPLIER_ORDER_DATA: ITableData[] = [
  {
    idNo: 2001,
    orderId: "2001",
    supplierId: "MTA",
    orderNumber: "397",
    quantity: "100",
    invoiceNumber: "1001",
    paymentMethod: "Cash",
    materialId: "MID02",
    odredDate: "2023-08-08",
    invoiceDate: "2023-12-08",
    paymentDate: "2023-12-08",
    contactId: "1234",
    contactPhone: "1234567890",
    contactEmail: "ABC@gamil.com",
    validFrom: "2023-04-02",
    validTo: "2024-04-02",
    expectedDeliveryDate: "2024-04-02",
    deliveryAddress: "Dummy Data",
    deletionFlag: "No",
    status: "Created",
  },
  {
    idNo: 2002,
    orderId: "2002",
    supplierId: "MTA",
    orderNumber: "3971",
    quantity: "100",
    invoiceNumber: "1001",
    paymentMethod: "Cash",
    materialId: "MID02",
    odredDate: "2023-08-08",
    invoiceDate: "2023-12-08",
    paymentDate: "2023-12-08",
    contactId: "1234",
    contactPhone: "1234567890",
    contactEmail: "ABC@gamil.com",
    validFrom: "2023-04-02",
    validTo: "2024-04-02",
    expectedDeliveryDate: "2024-04-02",
    deliveryAddress: "Dummy Data",
    deletionFlag: "No",
    status: "Created",
  },
  {
    idNo: 2003,
    orderId: "2003",
    supplierId: "MTA",
    orderNumber: "3971",
    quantity: "100",
    invoiceNumber: "1001",
    paymentMethod: "Cash",
    materialId: "MID02",
    odredDate: "2023-08-08",
    invoiceDate: "2023-12-08",
    paymentDate: "2023-12-08",
    contactId: "1234",
    contactPhone: "1234567890",
    contactEmail: "ABC@gamil.com",
    validFrom: "2023-04-02",
    validTo: "2024-04-02",
    expectedDeliveryDate: "2024-04-02",
    deliveryAddress: "Dummy Data",
    deletionFlag: "No",
    status: "Created",
  },
]

export const SUPPLIER_ORDER_FORM_DATA: IFormVariable[] = [
  {
    name: "SuppOrderNumber",
    type: "string",
    display: "Supplier Order Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "SupplierIdFk",
    type: "select",
    display: "Supplier Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_Supplier_Master/GetSupplierMasterDD`,
  },
  {
    name: "MaterialIdFk",
    type: "select",
    display: "Material Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "Quantity",
    type: "number",
    display: "Quantity",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "OrderDate",
    type: "date",
    display: "Order Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ExpectedDeliveryDate",
    type: "date",
    display: "ExpectedDeliveryDate",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ActualDeliveryDate",
    type: "date",
    display: "ActualDeliveryDate",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "Status",
    type: "select",
    display: "Status",
    options: ["Open", "In Progress", "Delivered"],
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

//
export const SUPPLIER_MASTER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "SupplierCode",
    display: "Supplier Code",
  },
  {
    name: "SupplierName",
    display: "Supplier Name",
  },
  {
    name: "SupplierEmail",
    display: "Contact Email",
  },
  {
    name: "SupplierContactNumber",
    display: "Contact Number",
  },
  {
    name: "SupplierAddress",
    display: "Address",
  },
  {
    name: "CreatedBy",
    display: "Created By",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const SUPPLIER_MASTER_FORM_DATA: IFormVariable[] = [
  {
    name: "SupplierCode",
    type: "string",
    display: "Supplier Code",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "SupplierName",
    type: "string",
    display: "Supplier Name",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "SupplierEmail",
    type: "string",
    display: "Contact Email",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "SupplierContactNumber",
    type: "string",
    display: "Contact Number",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "SupplierAddress",
    type: "string",
    display: "Address",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

export const STOCK_TRANSFER_ORDER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "StkTransOrderId",
    display: "Order ID",
  },
  {
    name: "StkTransOrderNumber",
    display: "Order Number",
  },
  {
    name: "SrcPlantIdFk",
    display: "Source Plant",
  },
  {
    name: "SrcStoragLocIdFk",
    display: "Source Storage Location",
  },
  {
    name: "DstPlantIdFk",
    display: "Destination Plant",
  },
  {
    name: "DstStoragLocIdFk",
    display: "Destination Storage Location",
  },
  {
    name: "MatrlMstIdFk",
    display: "Material ID",
  },
  {
    name: "Quantity",
    display: "Quantity",
  },
  {
    name: "OrderDate",
    display: "Order Date",
  },
  {
    name: "CreatedBy",
    display: "Created By",
  },
  {
    name: "ModifiedBy",
    display: "Modified By",
  },
  {
    name: "ExpectedDeliveryDate",
    display: "Expected Delivery Date",
  },
  {
    name: "ActualDeliveryDate",
    display: "Actual Delivery Date",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "Status",
    display: "Status",
  },
  {
    name: "action",
    display: "Action",
  },
]

//
export const STOCK_TRANSFER_ORDER_DATA: ITableData[] = [
  {
    idNo: 4201,
    orderId: "4201",
    orderNumber: "1000",
    sourcePlant: "1101",
    sourceStorageLocation: "2001",
    destinationPlant: "1103",
    destinationStorageLocation: "2004",
    materialId: "MID02",
    quantity: "300",
    orderDate: "2023-11-08",
    createdBy: "1123",
    expectedDeliveryDate: "2023-11-17",
    actualDeliveryDate: "2023-11-18",
    validFrom: "2023-11-18",
    validTo: "2023-12-18",
    status: "Delivered",
    deletionFlag: "Yes",
  },
  {
    idNo: 4202,
    orderId: "4202",
    orderNumber: "1001",
    sourcePlant: "1101",
    sourceStorageLocation: "2001",
    destinationPlant: "1103",
    destinationStorageLocation: "2004",
    materialId: "MID04",
    quantity: "250",
    orderDate: "2023-11-08",
    createdBy: "1123",
    expectedDeliveryDate: "2023-11-17",
    actualDeliveryDate: "2023-11-18",
    validFrom: "2023-11-18",
    validTo: "2023-12-18",
    status: "Delivered",
    deletionFlag: "Yes",
  },
  {
    idNo: 4203,
    orderId: "4203",
    orderNumber: "1003",
    sourcePlant: "1101",
    sourceStorageLocation: "2001",
    destinationPlant: "1103",
    destinationStorageLocation: "2004",
    materialId: "MID06",
    quantity: "100",
    orderDate: "2023-11-08",
    createdBy: "1123",
    expectedDeliveryDate: "2023-11-17",
    actualDeliveryDate: "2023-11-18",
    validFrom: "2023-11-18",
    validTo: "2023-12-18",
    status: "Delivered",
    deletionFlag: "Yes",
  },
]

export const STOCK_TRANSFER_ORDER_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "StkTransOrderId",
  //   type: "string",
  //   display: "Order ID",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "StkTransOrderNumber",
    type: "string",
    display: "Order Number",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "SrcPlantIdFk",
    type: "select",
    display: "Source Plant",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "SrcStoragLocIdFk",
    type: "select",
    display: "Source Storage Location",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "DstPlantIdFk",
    type: "select",
    display: "Destiantion Plant",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "DstStoragLocIdFk",
    type: "select",
    display: "Destination Storage Location",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },
  {
    name: "MatrlMstIdFk",
    type: "select",
    display: "Material ID",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "Quantity",
    type: "number",
    display: "Quantity",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ExpectedDeliveryDate",
    type: "date",
    display: "Actual Delivery Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ActualDeliveryDate",
    type: "date",
    display: "Expected Delivery Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "OrderDate",
    type: "date",
    display: "Order Date",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "Status",
    type: "select",
    display: "Status",
    options: ["Delivered", "Shipped", "Pending", "Cancelled"],
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  // {
  //   name: "IsDeleted",
  //   type: "bool",
  //   display: "Deletion Flag",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 2,
  // },
]

//

export const GATE_ENTRY_STOCK_TRANSFER_MASTER_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "GateStkTransEntryId",
    display: "Entry Id",
  },
  {
    name: "GateStkEntryNumber",
    display: "Entry Number",
  },
  {
    name: "SrcPlantIdFk",
    display: "Source Plant",
  },
  {
    name: "SrcStoragLocIdFk",
    display: "Source Storage Location ",
  },
  {
    name: "DstPlantIdFk",
    display: "Destination Plant",
  },
  {
    name: "DstStoragLocIdFk",
    display: "Destination Storage Location",
  },
  {
    name: "MatrlMstIdFk",
    display: "Material Master",
  },
  {
    name: "Quantity",
    display: "Quantity",
  },
  {
    name: "EntryDate",
    display: "Entry Date",
  },
  {
    name: "EntryTime",
    display: "Entry Time",
  },
  {
    name: "CreatedBy",
    display: "Created By",
  },
  {
    name: "ModifiedBy",
    display: "Modified By",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const GATE_ENTRY_STOCK_TRANSFER_MASTER_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "GateStkTransEntryId",
  //   type: "number",
  //   display: "Entry Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "GateStkEntryNumber",
    type: "number",
    display: "Entry Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "MatrlMstIdFk",
    type: "select",
    display: "Material Master",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESIventory_Level/GetMaterialMasterDD`,
  },
  {
    name: "SrcPlantIdFk",
    type: "select",
    display: "Source Plant",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "DstPlantIdFk",
    type: "select",
    display: "Destination Plant",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "SrcStoragLocIdFk",
    type: "select",
    display: "Source Storage Location ",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },

  {
    name: "DstStoragLocIdFk",
    type: "select",
    display: "Destination Storage Location",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MaterialMaster/GetStorageDd`,
  },

  {
    name: "EntryDate",
    type: "date",
    display: "Entry Date",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "EntryTime",
    type: "time",
    display: "Entry Time",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "Quantity",
    type: "number",
    display: "Quantity",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
]

export const SHIFT_CREATION_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "shiftName",
    display: "Shift Name",
  },
  {
    name: "startTime",
    display: "Start Time",
  },
  {
    name: "endTime",
    display: "End Time",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "modifiedBy",
    display: "Last Modified By",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const SHIFT_CREATION_DATA: ITableData[] = [
  {
    idNo: 15001,
    shiftId: "15001",
    shiftName: "Shift-A",
    description: "Dummy Description",
    startTime: "06:30",
    endTime: "14:30",
    clockInStart: "06:30",
    clockInEnd: "06:45",
    clockOutStart: "14:30",
    clockOutEnd: "14:45",
    category: "Operator",
    validFrom: "2023-04-02",
    validTo: "2024-04-02",
  },
  {
    idNo: 15002,
    shiftId: "15002",
    shiftName: "Shift-B",
    description: "Dummy Description",
    startTime: "14:30",
    endTime: "22:30",
    clockInStart: "14:30",
    clockInEnd: "14:45",
    clockOutStart: "22:30",
    clockOutEnd: "22:45",
    category: "Supervisor",
    validFrom: "2023-04-02",
    validTo: "2024-04-02",
  },
  {
    idNo: 15003,
    shiftId: "15003",
    shiftName: "Shift-C",
    description: "Dummy Description",
    startTime: "22:30",
    endTime: "06:30",
    clockInStart: "22:30",
    clockInEnd: "22:45",
    clockOutStart: "06:30",
    clockOutEnd: "06:45",
    category: "Manager",
    validFrom: "2023-04-02",
    validTo: "2024-04-02",
  },
]

export const SHIFT_CREATION_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "shiftId",
  //   type: "string",
  //   display: "Shift Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "shiftName",
    type: "string",
    display: "Shift Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },

  {
    name: "startTime",
    type: "time",
    display: "Start Time",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "endTime",
    type: "time",
    display: "End Time",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
]

export const JOB_CREATION_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "jobName",
    display: "Job Name",
  },
  {
    name: "description",
    display: "Description",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const JOB_CREATION_DATA: ITableData[] = [
  {
    idNo: "1124",
    jobName: "Job1",
    category: "Operator",
    description: "Description",
    validFrom: "2023-01-11",
    validTo: "2023-02-11",
    createdBy: "1122",
  },
  {
    idNo: "1125",
    jobName: "Job2",
    category: "Supervisor",
    description: "Description",
    validFrom: "2023-01-11",
    validTo: "2023-02-11",
    createdBy: "1122",
  },
  {
    idNo: "1126",
    jobName: "Job3",
    category: "Supervisor",
    description: "Description",
    validFrom: "2023-01-11",
    validTo: "2023-02-11",
    createdBy: "1122",
  },
  {
    idNo: "1127",
    jobName: "Job4",
    category: "Manager",
    description: "Description",
    validFrom: "2023-01-11",
    validTo: "2023-02-11",
    createdBy: "1122",
  },
]

export const JOB_CREATION_FILTER_FORM_DATA: IFormVariable[] = [
  {
    name: "idNo",
    type: "string",
    display: "ID No.",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
]

export const JOB_CREATION_FORM_DATA: IFormVariable[] = [
  {
    name: "jobName",
    type: "string",
    display: "Job Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "description",
    type: "string",
    display: "Description",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]

export const SHIFT_ASSIGNMENT_HEADER: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "shiftName",
    display: "Shift Name",
  },
  {
    name: "factoryName",
    display: "Factory Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  {
    name: "lineName",
    display: "Line Name",
  },
  {
    name: "role",
    display: "Role",
  },
  {
    name: "clockInStart",
    display: "Clock In Start",
  },
  {
    name: "clockInEnd",
    display: "Clock In End",
  },
  {
    name: "clockOutStart",
    display: "Clock Out Start",
  },
  {
    name: "clockOutEnd",
    display: "Clock Out End",
  },
  // {
  //   name: "duration",
  //   display: "Duration",
  // },
  // {
  //   name: "createdDate",
  //   display: "Created Date",
  // },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "modifiedBy",
    display: "Modified By",
  },
  // {
  //   name: "lastModifiedBy",
  //   display: "Last Modified By",
  // },
  {
    name: "action",
    display: "Action",
  },
]

// export const SHIFT_ASSIGNMENT_DATA: ITableData[] = [
//   {
//     idNo: "1124",
//     userId: "1132",
//     shiftName: "A",
//     clockIn: "06:30",
//     clockOut: "14:30",
//     duration: "WEEKLY",
//     createdDate: "11/01/2023",
//     createdBy: "1122",
//     modifiedBy: "1122",
//     lastModifiedBy: "2023-01-11",
//   },
//   {
//     idNo: "1125",
//     userId: "1142",
//     shiftName: "B",
//     clockIn: "14:30",
//     clockOut: "22:30",
//     duration: "WEEKLY",
//     createdDate: "11/02/2023",
//     createdBy: "1122",
//     modifiedBy: "1122",
//     lastModifiedBy: "2023-01-11",
//   },
//   {
//     idNo: "1126",
//     userId: "1152",
//     shiftName: "A",
//     clockIn: "06:30",
//     clockOut: "14:30",
//     duration: "WEEKLY",
//     createdDate: "11/02/2023",
//     createdBy: "1122",
//     modifiedBy: "1122",
//     lastModifiedBy: "2023-01-11",
//   },
//   {
//     idNo: "1127",
//     userId: "1162",
//     shiftName: "A",
//     clockIn: "14:30",
//     clockOut: "22:30",
//     duration: "WEEKLY",
//     createdDate: "11/01/2023",
//     createdBy: "1122",
//     modifiedBy: "1122",
//     lastModifiedBy: "2023-01-11",
//   },
// ]

export const SHIFT_ASSIGNMENT_FORM_DATA: IFormVariable[] = [
  // {
  //   name: "AssignmentId",
  //   type: "string",
  //   display: "Assignment Id",
  //   default: "",
  //   description: "",
  //   required: true,
  //   group: 1,
  // },
  {
    name: "shiftId",
    type: "select",
    display: "Shift Id",
    default: "",
    description: "",
    options: [""],
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
  },
  {
    name: "factoryId",
    type: "select",
    display: "Factory Id",
    default: "",
    description: "",
    options: [""],
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantId",
    type: "select",
    display: "Plant Id",
    default: "",
    description: "",
    options: [""],
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "lineId",
    type: "select",
    display: "Line Id",
    default: "",
    description: "",
    options: [""],
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getmeslinedd`,
  },
  {
    name: "clockInStart",
    type: "time",
    display: "Clock In Start",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "clockInEnd",
    type: "time",
    display: "Clock In End",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "clockOutStart",
    type: "time",
    display: "Clock Out Start",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "clockOutEnd",
    type: "time",
    display: "Clock Out End",
    default: "",
    description: "",
    required: true,
    group: 2,
  },

  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "role",
    type: "selectone",
    display: "Role",
    options: [""],
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetRolesDD`,
  },
]

export const SHIFT_ASSIGNMENT_FILTER_DATA: IFormVariable[] = [
  {
    name: "userId",
    type: "string",
    display: "User Id",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "shiftName",
    type: "string",
    display: "Shift Name",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "createdDate",
    type: "date",
    display: "Created Date",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
]

export const JOB_ASSIGNMENT_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI No.",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },
  {
    name: "lineName",
    display: "Line Name",
  },
  {
    name: "jobName",
    display: "Job",
  },
  {
    name: "shiftName",
    display: "Shift",
  },
  {
    name: "clockInStart",
    display: "Clock-In Start",
  },
  {
    name: "clockOutEnd",
    display: "Clock-Out End",
  },
  {
    name: "role",
    display: "Role",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "action",
    display: "Action",
  },
]
// export const JOB_ASSIGNMENT_DATA: ITableData[] = [
//   {
//     idNo: "1124",
//     userId: "1132",
//     jobId: "100101",
//     jobName: "Job1",
//     manufacturingLine: "MFG01",
//     PONo: "26032021-000001",
//     operation: "Cell Sorting",
//     operationDescription: "Description 1",
//     shiftName: "A",
//     createdDate: "2023-01-11",
//     addedBy: "1122",
//     lastModifiedDate: "2023-02-11",
//   },
//   {
//     idNo: "1124",
//     userId: "1132",
//     jobId: "100101",
//     jobName: "Job1",
//     manufacturingLine: "MFG01",
//     PONo: "26032021-000001",
//     operation: "Cell Sorting",
//     operationDescription: "Description 1",
//     shiftName: "A",
//     createdDate: "2023-01-11",
//     addedBy: "1122",
//     lastModifiedDate: "2023-02-11",
//   },
//   {
//     idNo: "1124",
//     userId: "1132",
//     jobId: "100101",
//     jobName: "Job1",
//     manufacturingLine: "MFG01",
//     PONo: "26032021-000001",
//     operation: "Cell Sorting",
//     operationDescription: "Description 1",
//     shiftName: "A",
//     createdDate: "2023-01-11",
//     addedBy: "1122",
//     lastModifiedDate: "2023-02-11",
//   },
// ]

export const JOB_ASSIGNMENT_FORM_DATA: IFormVariable[] = [
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant",
    default: "",
    options: [""],
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "lineIdFk",
    type: "select",
    display: "Manufacturing Line",
    default: "",
    options: [""],
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESLineDD`,
  },
  {
    name: "jobIdFk",
    type: "select",
    display: "Job",
    default: "",
    options: [""],
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/JobCreation/GetJobDD`,
  },
  {
    name: "shiftIdFk",
    type: "select",
    display: "Shift",
    default: "",
    options: [""],
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
  },
  {
    name: "clockInStart",
    type: "time",
    display: "Clock-In Start",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "clockInEnd",
    type: "time",
    display: "Clock-In End",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "ClockOutStart",
    type: "time",
    display: "Clock-Out Start",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "clockOutEnd",
    type: "time",
    display: "Clock-Out End",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "role",
    type: "selectone",
    display: "Role",
    options: [""],
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/Roles`,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
]

export const JOB_ASSIGNMENT_FILTER_FORM_DATA: IFormVariable[] = [
  {
    name: "userId",
    type: "string",
    display: "User ID",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "jobName",
    type: "string",
    display: "Job Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "operation",
    type: "string",
    display: "Operation",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
]

//Job Allocation

// export const JOB_ALLOCATION_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI. No.",
//   },
//   {
//     name: "AllocationId",
//     display: "Assignment Id",
//   },
//   // {
//   //   name: "UserIdFk",
//   //   display: "User Id",
//   // },
//   {
//     name: "UserName",
//     display: "Username",
//   },
//   {
//     name: "JobIdFk",
//     display: "Job Name",
//   },
//   {
//     name: "PONumber",
//     display: "Production Order",
//   },
//   {
//     name: "WorkCenterIdFk",
//     display: "WorkCenter",
//   },
//   {
//     name: "Operation",
//     display: "Operation",
//   },
//   {
//     name: "ShiftIdFk",
//     display: "Shift Name",
//   },
//   {
//     name: "LineIdFk",
//     display: "Line Name",
//   },
//   {
//     name: "CreatedBy",
//     display: "Created By",
//   },
//   {
//     name: "ValidFrom",
//     display: "Valid From",
//   },
//   {
//     name: "ValidTo",
//     display: "Valid To",
//   },
//   {
//     name: "action",
//     display: "Action",
//   },
// ]

// export const JOB_ALLOCATION_FILTER_FORM_DATA: IFormVariable[] = [
//   {
//     name: "UserId",
//     type: "select",
//     display: "User Id",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
//   },
//   {
//     name: "JobIdFk",
//     type: "select",
//     display: "User Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/JobCreation/GetJobDD`,
//   },
//   {
//     name: "OperationId",
//     type: "select",
//     display: "Operation",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/Job_Allocation/GetOperationDD`,
//   },
// ]

// export const JOB_ALLOCATION_FORM_DATA: IFormVariable[] = [
//   {
//     name: "UserIdFk",
//     type: "select",
//     display: "Username",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
//   },
//   {
//     name: "JobIdFk",
//     type: "select",
//     display: "Job Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/JobCreation/GetJobDD`,
//   },
//   {
//     name: "PONumber",
//     type: "string",
//     display: "PO Number",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "WorkCenterIdFk",
//     type: "select",
//     display: "WorkCenter",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: ` ${process.env.NEXT_PUBLIC_API_URL}/MESWorkCenter/GetWorkCenterDD`,
//   },
//   // {
//   //   name: "Operation",
//   //   type: "select",
//   //   display: "Operation",
//   //   default: "",
//   //   description: "",
//   //   required: true,
//   //   group: 1,
//   //   API: `${process.env.NEXT_PUBLIC_API_URL}/Job_Allocation/GetOperationDD`,
//   // },
//   {
//     name: "Operation",
//     type: "depended",
//     display: "Operation",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     dependedField: "WorkCenterIdFk",
//     //  readOnly: true,
//   },
//   {
//     name: "ShiftIdFk",
//     type: "select",
//     display: "Shift",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
//   },
//   {
//     name: "LineIdFk",
//     type: "select",
//     display: "Manufacturing Line",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESLineDD`,
//   },
//   {
//     name: "ValidFrom",
//     type: "date",
//     display: "Valid From",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "ValidTo",
//     type: "date",
//     display: "Valid To",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//   },
// ]


export const JOB_ALLOCATION_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI. No.",
  },
  {
    name: "allocationId",
    display: "Assignment Id",
  },
  {
    name: "userName",
    display: "Username",
  },
  {
    name: "jobIdFk",
    display: "Job Name",
  },
  {
    name: "poNumber",
    display: "Production Order",
  },
  {
    name: "workCenterIdFk",
    display: "WorkCenter",
  },
  {
    name: "operation",
    display: "Operation",
  },
  {
    name: "shiftIdFk",
    display: "Shift Name",
  },
  {
    name: "lineIdFk",
    display: "Line Name",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const JOB_ALLOCATION_FILTER_FORM_DATA: IFormVariable[] = [
  {
    name: "userId",
    type: "select",
    display: "User Id",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "jobIdFk",
    type: "select",
    display: "User Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/JobCreation/GetJobDD`,
  },
  {
    name: "operationId",
    type: "select",
    display: "Operation",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/Job_Allocation/GetOperationDD`,
  },
]

export const JOB_ALLOCATION_FORM_DATA: IFormVariable[] = [
  {
    name: "userIdFk",
    type: "select",
    display: "Username",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "jobIdFk",
    type: "select",
    display: "Job Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/JobCreation/GetJobDD`,
  },
  {
    name: "poNumber",
    type: "string",
    display: "PO Number",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "workCenterIdFk",
    type: "select",
    display: "WorkCenter",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESWorkCenter/GetWorkCenterDD`,
  },
  {
    name: "operation",
    type: "depended",
    display: "Operation",
    default: "",
    description: "",
    required: true,
    group: 1,
    dependedField: "workCenterIdFk",
  },
  {
    name: "shiftIdFk",
    type: "select",
    display: "Shift",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
  },
  {
    name: "lineIdFk",
    type: "select",
    display: "Manufacturing Line",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESLineDD`,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]


export const WORK_CENTER_ALLOCATION_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI No.",
  },
  {
    name: "WorkcenterName",
    display: "Work Center Name",
  },
  {
    name: "FactoryName",
    display: "Factory Name",
  },
  {
    name: "PlantName",
    display: "Plant Name",
  },
  {
    name: "LineName",
    display: "Line Name",
  },
  {
    name: "DepartmentName",
    display: "Department",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  {
    name: "JobName",
    display: "Job",
  },
  {
    name: "ValidFrom",
    display: "Valid From",
  },
  {
    name: "ValidTo",
    display: "Valid To",
  },
  {
    name: "CreatedBy",
    display: "Created By",
  },
  {
    name: "ModifiedBy",
    display: "Modified BY",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const WORK_CENTER_ALLOCATION_FORM_DATA: IFormVariable[] = [
  {
    name: "FactoryIdFk",
    type: "select",
    display: "Factory Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "PlantIdFk",
    type: "select",
    display: "Plant Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "LineIdFk",
    type: "select",
    display: "Line Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getmeslinedd`,
  },
  {
    name: "WorkcenterIdFk",
    type: "select",
    display: "Work Center Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESWorkCenter/GetWorkCenterDD`,
  },
  {
    name: "ShiftIdFk",
    type: "select",
    display: "Shift Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
  },
  {
    name: "DepartmentIdFk",
    type: "select",
    display: "Department Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_Department/GetDepartmentDD`,
  },
  {
    name: "JobIdFk",
    type: "select",
    display: "Job Name",
    options: ["1", "2", "3"],
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/JobCreation/GetJobDD`,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

export const EMPLOYEE_ALLOCATION_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI No.",
  },
  {
    name: "UserName",
    display: "User Name",
  },
  {
    name: "FactoryName",
    display: "Factory Name",
  },
  {
    name: "PlantName",
    display: "Plant Name",
  },
  {
    name: "DepartmentName",
    display: "Department Name",
  },
  {
    name: "ShiftName",
    display: "Shift Name",
  },
  {
    name: "JobName",
    display: "Job Name",
  },
  {
    name: "CreatedBy",
    display: "CreatedBy",
  },
  {
    name: "ModifiedBy",
    display: "ModifiedBy",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const EMPLOYEE_ALLOCATION_FORM_DATA: IFormVariable[] = [
  {
    name: "UserIdFk",
    type: "select",
    display: "User Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "FactoryIdFk",
    type: "select",
    display: "Factory Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "PlantIdFk",
    type: "select",
    display: "Plant Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "DepartmentIdFk",
    type: "select",
    display: "Department Name",
    options: [""],
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MES_Department/GetDepartmentDD`,
  },
  {
    name: "ShiftIdFk",
    type: "select",
    display: "Shift Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
  },
  {
    name: "JobIdFk",
    type: "select",
    display: "Job Name",
    options: [""],
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/JobCreation/GetJobDD`,
  },
  {
    name: "ValidFrom",
    type: "date",
    display: "Valid From",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "ValidTo",
    type: "date",
    display: "Valid To",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
]

export const DEPARTMENT_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI No.",
  },
  {
    name: "departmentName",
    display: "Department Name",
  },
  {
    name: "factoryName",
    display: "Factory Name",
  },
  {
    name: "plantName",
    display: "Plant Name",
  },

  {
    name: "description",
    display: "Description",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const DEPARTMENT_FORM_DATA: IFormVariable[] = [
  {
    name: "factoryIdFk",
    type: "select",
    display: "Factory Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk",
    type: "select",
    display: "Plant Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "departmentName",
    type: "string",
    display: "Department Name",
    default: "",
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "description",
    type: "string",
    display: "Description",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]

export const SHIFT_ALLOCATION_HEADER: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI No.",
  },
  {
    name: "userName",
    display: "User Name",
  },
  {
    name: "shiftName",
    display: "Shift Name",
  },
  {
    name: "role",
    display: "Role",
  },
  {
    name: "createdBy",
    display: "Created By",
  },
  {
    name: "modifiedBy",
    display: "Modified By",
  },
  {
    name: "validFrom",
    display: "Valid From",
  },
  {
    name: "validTo",
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const SHIFT_ALLOCATION_FORM_DATA: IFormVariable[] = [
  {
    name: "userIdFk",
    type: "select",
    display: "User Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "shiftIdFk",
    type: "select",
    display: "Shift Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
  },
  {
    name: "role",
    type: "selectone",
    display: "Role",
    options: [""],
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/Roles/GetRolesDD`,
  },
  {
    name: "validFrom",
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
  {
    name: "validTo",
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
]

// export const PRODUCTION_VERSION_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI No.",
//   },
//   {
//     name: "VersionName",
//     display: "Version Name",
//   },
//   {
//     name: "VersionDescription",
//     display: "Version Description",
//   },
//   {
//     name: "FactoryName",
//     display: "Factory Name",
//   },
//   {
//     name: "PlantName",
//     display: "Plant Name",
//   },
//   {
//     name: "LineName",
//     display: "Line Name",
//   },
//   {
//     name: "CreatedBy",
//     display: "Created By",
//   },
//   {
//     name: "ModifiedBy",
//     display: "Modified By",
//   },
//   {
//     name: "ValidFrom",
//     display: "Valid From",
//   },
//   {
//     name: "ValidTo",
//     display: "Valid To",
//   },
//   {
//     name: "action",
//     display: "Action",
//   },
// ]

// export const PRODUCTION_VERSION_FORM_DATA: IFormVariable[] = [
//   {
//     name: "VersionName",
//     type: "string",
//     display: "Version Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   //Field Added by SS
//   {
//     name: "VersionDescription",
//     type: "string",
//     display: "Version Description",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "FactoryIdFk",
//     type: "select",
//     display: "Factory Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
//   },
//   {
//     name: "PlantIdFk",
//     type: "select",
//     display: "Plant Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 1,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
//   },
//   {
//     name: "LineIdFk",
//     type: "select",
//     display: "Line Name",
//     default: "",
//     description: "",
//     required: true,
//     group: 2,
//     API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESLineDD`,
//   },
//   {
//     name: "ValidFrom",
//     type: "date",
//     display: "Valid From",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "ValidTo",
//     type: "date",
//     display: "Valid To",
//     default: new Date().toLocaleDateString("fr-CA"),
//     description: "",
//     required: true,
//     group: 2,
//   },
// ]

export const PRODUCTION_VERSION_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "SI No.",
  },
  // {
  //   name: "versionId", // ✅ matches API
  //   display: "Version ID",
  // },
  {
    name: "versionName", // ✅ matches API
    display: "Version Name",
  },
  {
    name: "versionDescription", // ✅ matches API
    display: "Version Description",
  },
  {
    name: "factoryIdFk", // ✅ API gives ID, not name
    display: "Factory Name",
  },
  {
    name: "plantIdFk", // ✅ API gives ID, not name
    display: "Plant Name",
  },
  {
    name: "lineIdFk", // ✅ API gives ID, not name
    display: "Line Name",
  },
  {
    name: "createdBy", // ✅ matches API
    display: "Created By",
  },
  {
    name: "modifiedBy", // ✅ matches API
    display: "Modified By",
  },
  {
    name: "validFrom", // ✅ matches API
    display: "Valid From",
  },
  {
    name: "validTo", // ✅ matches API
    display: "Valid To",
  },
  {
    name: "action",
    display: "Action",
  },
]

export const PRODUCTION_VERSION_FORM_DATA: IFormVariable[] = [
  {
    name: "versionName", // ✅ matches API
    type: "string",
    display: "Version Name",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "versionDescription", // ✅ matches API
    type: "string",
    display: "Version Description",
    default: "",
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "factoryIdFk", // ✅ matches API
    type: "select",
    display: "Factory Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/getfactorydd`,
  },
  {
    name: "plantIdFk", // ✅ matches API
    type: "select",
    display: "Plant Name",
    default: "",
    description: "",
    required: true,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESPlantDD`,
  },
  {
    name: "lineIdFk", // ✅ matches API
    type: "select",
    display: "Line Name",
    default: "",
    description: "",
    required: true,
    group: 2,
    API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetMESLineDD`,
  },
  {
    name: "validFrom", // ✅ matches API
    type: "date",
    display: "Valid From",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 1,
  },
  {
    name: "validTo", // ✅ matches API
    type: "date",
    display: "Valid To",
    default: new Date().toLocaleDateString("fr-CA"),
    description: "",
    required: true,
    group: 2,
  },
]



// data.ts
export const PACK_CDC_OPTIONS = [
  "Pack Assembly",
  "Cell Capacity",
  "Laser Welding",
  "Plasma",
  "Pack CDC",
  "Component Overview",
  // Add other options as needed
]
// r appropriate data file
export const CELL_COMPRESSION_HEADER_DATA: ITableHeader[] = [
  // {
  //   name: "slNo",
  //   display: "Sl No.",
  // },
  // {
  //   name: "SerialNumber",
  //   display: "Serial Number",
  // },
  // {
  //   name: "Details",
  //   display: "Details",
  // },
  // {
  //   name: "Status",
  //   display: "Status",
  // },
  // {
  //   name: "Download",
  //   display: "Download",
  // },
  {
    name: "slNo",
    display: "Sl No.",
  },

  {
    name: "CompressionForce",
    display: "Compression Force",
  },
  {
    name: "CycleStartSignal",
    display: "CycleStart Signal",
  },
  {
    name: "CompressionDistance",
    display: "Compression Distance",
  },
  {
    name: "CycleCompletion",
    display: "Cycle Completion",
  },
  {
    name: "CompressionResult",
    display: "Compression Result",
  },
  {
    name: "BarcodeValidation",
    display: "Barcode Validation",
  },
  {
    name: "MESStatus",
    display: "MES Status",
  },
]

export const CELL_COMPRESSION_HEADER_DATA_DETAILED: ITableHeader[] = [
  // {
  //   name: "slNo",
  //   display: "Sl No.",
  // },
  // {
  //   name: "SerialNumber",
  //   display: "Serial Number",
  // },
  // {
  //   name: "Details",
  //   display: "Details",
  // },
  // {
  //   name: "Status",
  //   display: "Status",
  // },
  // {
  //   name: "ShiftName",
  //   display: "Shift",
  // },
  // {
  //   name: "Download",
  //   display: "Download",
  // },
  {
    name: "slNo",
    display: "Sl No.",
  },

  {
    name: "CompressionForce",
    display: "Compression Force",
  },
  {
    name: "CycleStartSignal",
    display: "CycleStart Signal",
  },
  {
    name: "CompressionDistance",
    display: "Compression Distance",
  },
  {
    name: "CycleCompletion",
    display: "Cycle Completion",
  },
  {
    name: "CompressionResult",
    display: "Compression Result",
  },
  {
    name: "BarcodeValidation",
    display: "Barcode Validation",
  },
  {
    name: "MESStatus",
    display: "MES Status",
  },
]

export const CDC_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "Discharge_Capacity",
    display: "Discharge Capacity",
  },
  {
    name: "Barcode",
    display: "Barcode",
  },
  {
    name: "Cycle_Start",
    display: "Cycle Start",
  },
  {
    name: "Cycle_End",
    display: "Cycle End",
  },
  {
    name: "Duration",
    display: "Duration",
  },
  {
    name: "Download",
    display: "Download",
  },

  // {
  //   name: "CellBalancingStatus",
  //   display: "Cell Balancing Status",
  // },
  // {
  //   name: "CellSerialNumber",
  //   display: "Cell Serial Number",
  // },
]

// export const PACK_CDC_HEADER_DATA: ITableHeader[] = [
//   {
//     name: "slNo",
//     display: "SI No.",
//   },
//   {
//     name: "Capacity",
//     display: "Discharge Capacity",
//   },
//   {
//     name: "PONumber",
//     display: "PONumber",
//   },
//   {
//     name: "Cycle_Start",
//     display: "Cycle Start",
//   },
//   {
//     name: "Cycle_End",
//     display: "Cycle End",
//   },
//   // {
//   //   name: "Duration",
//   //   display: "Duration",
//   // },
//   // {
//   //   name: "CellBalancingStatus",
//   //   display: "Cell Balancing Status",
//   // },
//   // {
//   //   name: "CellSerialNumber",
//   //   display: "Cell Serial Number",
//   // },
// ]

export const CDC_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "Discharge_Capacity",
    display: "Discharge Capacity",
  },
  {
    name: "Barcode",
    display: "Barcode",
  },
  {
    name: "Cycle_Start",
    display: "Cycle Start",
  },
  {
    name: "Cycle_End",
    display: "Cycle End",
  },
  {
    name: "Duration",
    display: "Duration",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const CELL_GRADING_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "Time",
    display: "Time",
  },
  {
    name: "Barcode",
    display: "Barcode",
  },
  {
    name: "OCV",
    display: "OCV",
  },
  {
    name: "IR",
    display: "IR",
  },
  {
    name: "Channel",
    display: "Channel",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const CELL_GRADING_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "Time",
    display: "Time",
  },
  {
    name: "Barcode",
    display: "Barcode",
  },
  {
    name: "OCV",
    display: "OCV",
  },
  {
    name: "IR",
    display: "IR",
  },
  {
    name: "Channel",
    display: "Channel",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const BMS_TEST_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "SerialNumber",
    display: "Serial Number",
  },
  {
    name: "ItemName",
    display: "Item Name",
  },
  {
    name: "State",
    display: "State",
  },
  {
    name: "Result",
    display: "Result",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const BMS_TEST_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "SerialNumber",
    display: "Serial Number",
  },
  {
    name: "ItemName",
    display: "Item Name",
  },
  {
    name: "State",
    display: "State",
  },
  {
    name: "Result",
    display: "Result",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const LASER_WELDING_HEADER_DATA: ITableHeader[] = [
  // {
  //   name: "slNo",
  //   display: "Sl No.",
  // },
  // {
  //   name: "SerialNumber",
  //   display: "Serial Number",
  // },
  // {
  //   name: "VisionStation",
  //   display: "Vision Station",
  // },
  // {
  //   name: "TerminalCleaningStation",
  //   display: "Terminal Cleaning Station",
  // },
  // {
  //   name: "BusBarLoadingStation",
  //   display: "BusBar Loading Station",
  // },
  // {
  //   name: "LaserWeldingStation",
  //   display: "Laser Welding Station",
  // },
  // {
  //   name: "UnloadingStation",
  //   display: "Unloading Station",
  // },
  // {
  //   name: "Download",
  //   display: "Download",
  // },

  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "BarcodeValidation",
    display: "Barcode Validation",
  },
  {
    name: "CycleStartStop",
    display: "Cycle Start/Stop",
  },
  {
    name: "LaserPower",
    display: "Laser Power",
  },
  {
    name: "WeldingCompletionStatus",
    display: "Welding Completion Status",
  },
  // {
  //   name: "LaserWeldingStation",
  //   display: "Laser Welding Station",
  // },
  {
    name: "MESStatus",
    display: "MES Status",
  },
]
export const LASER_WELDING_HEADER_DATA_DETAILED: ITableHeader[] = [
  // {
  //   name: "slNo",
  //   display: "Sl No.",
  // },
  // {
  //   name: "SerialNumber",
  //   display: "Serial Number",
  // },
  // {
  //   name: "VisionStation",
  //   display: "Vision Station",
  // },
  // {
  //   name: "TerminalCleaningStation",
  //   display: "Terminal Cleaning Station",
  // },
  // {
  //   name: "BusBarLoadingStation",
  //   display: "BusBar Loading Station",
  // },
  // {
  //   name: "LaserWeldingStation",
  //   display: "Laser Welding Station",
  // },
  // {
  //   name: "UnloadingStation",
  //   display: "Unloading Station",
  // },
  // {
  //   name: "ShiftName",
  //   display: "Shift",
  // },

  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "BarcodeValidation",
    display: "Barcode Validation",
  },
  {
    name: "CycleStartStop",
    display: "Cycle Start/Stop",
  },
  {
    name: "LaserPower",
    display: "Laser Power",
  },
  {
    name: "WeldingCompletionStatus",
    display: "Welding Completion Status",
  },
  // {
  //   name: "LaserWeldingStation",
  //   display: "Laser Welding Station",
  // },
  {
    name: "MESStatus",
    display: "MES Status",
  },
]

export const BATTERY_PACK_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "SerialNumber",
    display: "Serial Number",
  },
  {
    name: "EnclosureSubAssembly",
    display: "Enclosure SubAssembly",
  },
  {
    name: "ModuleInsertion",
    display: "Module Insertion",
  },
  {
    name: "BmsSensorApplication",
    display: "Bms Sensor Application",
  },
  {
    name: "TempSensorApplication",
    display: "Temp Sensor Application",
  },
  {
    name: "BmsSubAssembly",
    display: "Bms SubAssembly",
  },
  {
    name: "CidsubAssembly",
    display: "Cid SubAssembly",
  },
  {
    name: "HeatShrinkSleeve",
    display: "Heat Shrink Sleeve",
  },
  {
    name: "IrOcvTest",
    display: "IR & CV Test",
  },
  {
    name: "GasketApplication",
    display: "Gasket Application",
  },
  {
    name: "SerialNumbergeneration",
    display: "Serial Number Generation",
  },
  // {
  //   name: "Download",
  //   display: "Download",
  // },
]

export const BATTERY_PACK_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "SerialNumber",
    display: "Serial Number",
  },
  {
    name: "EnclosureSubAssembly",
    display: "Enclosure SubAssembly",
  },
  {
    name: "ModuleInsertion",
    display: "Module Insertion",
  },
  {
    name: "BmsSensorApplication",
    display: "Bms Sensor Application",
  },
  {
    name: "TempSensorApplication",
    display: "Temp Sensor Application",
  },
  {
    name: "BmsSubAssembly",
    display: "Bms SubAssembly",
  },
  {
    name: "CidsubAssembly",
    display: "Cid SubAssembly",
  },
  {
    name: "HeatShrinkSleeve",
    display: "Heat Shrink Sleeve",
  },
  {
    name: "IrOcvTest",
    display: "IR & CV Test",
  },
  {
    name: "GasketApplication",
    display: "Gasket Application",
  },
  {
    name: "SerialNumbergeneration",
    display: "Serial Number Generation",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  // {
  //   name: "Download",
  //   display: "Download",
  // },
]

export const BATTERY_INSULATION_TEST_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "BatterySerialNumber",
    display: "Battery Serial Number",
  },
  {
    name: "InsulationData",
    display: "Insulation Data",
  },
  {
    name: "Status",
    display: "Status",
  },
  // {
  //   name: "Download",
  //   display: "Download",
  // },
]

export const BATTERY_INSULATION_TEST_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "BatterySerialNumber",
    display: "Battery Serial Number",
  },
  {
    name: "InsulationData",
    display: "Insulation Data",
  },
  {
    name: "Status",
    display: "Status",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  // {
  //   name: "Download",
  //   display: "Download",
  // },
]

export const AIRLEAK_PROOF_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "BatterySerialNumber",
    display: "Battery Serial Number",
  },
  {
    name: "AirleakReading",
    display: "Airleak Reading",
  },
  {
    name: "Status",
    display: "Status",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const AIRLEAK_PROOF_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "BatterySerialNumber",
    display: "Battery Serial Number",
  },
  {
    name: "AirleakReading",
    display: "Airleak Reading",
  },
  {
    name: "Status",
    display: "Status",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const COMPREHENSIVE_TEST_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "SerialNumber",
    display: "Serial Number",
  },
  {
    name: "ShortCircuit",
    display: "Short Circuit",
  },
  {
    name: "OverVoltage",
    display: "OverVoltage",
  },
  {
    name: "UnderVoltage",
    display: "UnderVoltage",
  },
  {
    name: "PolarityTest",
    display: "Polarity Test",
  },
  // {
  //   name: "Download",
  //   display: "Download",
  // },
]

export const COMPREHENSIVE_TEST_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "SerialNumber",
    display: "Serial Number",
  },
  {
    name: "ShortCircuit",
    display: "Short Circuit",
  },
  {
    name: "OverVoltage",
    display: "OverVoltage",
  },
  {
    name: "UnderVoltage",
    display: "UnderVoltage",
  },
  {
    name: "PolarityTest",
    display: "Polarity Test",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
]

export const BATTERY_PACK_CDC_TEST_HEADER_DATA: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "Capacity",
    display: "Capacity",
  },
  {
    name: "Cycle_Start",
    display: "Cycle Start",
  },
  {
    name: "Cycle_End",
    display: "Cycle End",
  },
  {
    name: "Duration",
    display: "Duration",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const BATTERY_PACK_CDC_TEST_HEADER_DATA_DETAILED: ITableHeader[] = [
  {
    name: "slNo",
    display: "Sl No.",
  },
  {
    name: "Capacity",
    display: "Capacity",
  },
  {
    name: "Cycle_Start",
    display: "Cycle Start",
  },
  {
    name: "Cycle_End",
    display: "Cycle End",
  },
  {
    name: "Duration",
    display: "Duration",
  },
  {
    name: "ShiftName",
    display: "Shift",
  },
  {
    name: "Download",
    display: "Download",
  },
]

export const DETAILED_VIEW_FILTER_FORM_DATA: IFormVariable[] = [
  {
    name: "FromDate",
    type: "date",
    display: "From Date",
    default: "",
    description: "",
    required: false,
    group: 1,
    //API: `${process.env.NEXT_PUBLIC_API_URL}/MESRouting/GetContactPersonDD`,
  },
  {
    name: "ToDate",
    type: "date",
    display: "To Date",
    default: "",
    description: "",
    required: false,
    group: 1,
  },
  {
    name: "ShiftIdFk",
    type: "select",
    display: "",
    default: "",
    description: "",
    required: false,
    group: 1,
    API: `${process.env.NEXT_PUBLIC_API_URL}/ShiftAssignment/GetMESShiftDD`,
  },
]
