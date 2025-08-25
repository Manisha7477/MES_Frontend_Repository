import { IFormVariable } from "@/utils/types";
import { string } from "yup";
export type ITableData = { [key: string]: any }
// export const BOM_DATA : ITableData[] = [
//     {
//         "BomId": 1, 
//         "bomName": "BOM1",
//         "rmStore": "RM1",
//         "fgStore": "FG1",
//         "scrapStore": "Ss1",
//         "fgName" : "FG1",
//         "noOfRm" : "11",
//         "ValidFrom": "2024-02-07T12:40:59.04",
//         "ValidTo": "2024-02-07T12:40:59.04",
//         "CreatedBy": "Admin",
//         "CreationDate": "2024-02-09T07:42:38.7",
//         "ModifiedBy": "",
//         "LastModifiedDate": "2024-02-09T07:42:38.7",
//         "IsDeleted": false
//     },
//     {
//         "BomId": 2,
//         "bomName": "BOM2",
//         "rmStore": "RM2",
//         "fgStore": "FG2",
//         "scrapStore": "Ss2",
//         "fgName" : "FG2",
//         "noOfRm" : "12",
//         "ValidFrom": "2024-02-07T12:40:59.04",
//         "ValidTo": "2024-02-07T12:40:59.04",
//         "CreatedBy": "Admin",
//         "CreationDate": "2024-02-09T07:42:38.7",
//         "ModifiedBy": "",
//         "LastModifiedDate": "2024-02-09T07:42:38.7",
//         "IsDeleted": false
//     },
//     {
//        "BomId": 3,
//         "bomName": "BOM3",
//         "rmStore": "RM3",
//         "fgStore": "FG3",
//         "scrapStore": "Ss3",
//         "fgName" : "FG3",
//         "noOfRm" : "13",
//         "ValidFrom": "2024-02-07T12:40:59.04",
//         "ValidTo": "2024-02-07T12:40:59.04",
//         "CreatedBy": "Admin",
//         "CreationDate": "2024-02-09T07:42:38.7",
//         "ModifiedBy": "",
//         "LastModifiedDate": "2024-02-09T07:42:38.7",
//         "IsDeleted": false
//     },
//     {
//         "BomId": 4,
//         "bomName": "BOM4",
//         "rmStore": "RM4",
//         "fgStore": "FG4",
//         "scrapStore": "Ss4",
//         "fgName" : "FG4",
//         "noOfRm" : "14",
//         "ValidFrom": "2024-02-07T12:40:59.04",
//         "ValidTo": "2024-02-07T12:40:59.04",
//         "CreatedBy": "Admin",
//         "CreationDate": "2024-02-09T07:42:38.7",
//         "ModifiedBy": "",
//         "LastModifiedDate": "2024-02-09T07:42:38.7",
//         "IsDeleted": false
//     }
// ]










export const BOM_DATA : ITableData[] = [
  {
      slNo: 1,
      BomId : 1, 
      MaterialNumber: "MN-1",
      plant: "P-1",
      AlternateBom: "FG1",
      BOMCategory: "Ss1",
      BOMComponents: "11",
      EndTime: "07:42:38.7",
      ValidFrom: "2024-02-07",
      ValidTo: "2024-02-07",
      BaseQuantity: 100,
      BomItem : "Item1"
  },
  {
      slNo: 2,
      BomId : 2, 
      MaterialNumber: "MN-2",
      plant: "P-2",
      AlternateBom: "FG2",
      BOMCategory: "Ss2",
      BOMComponents: "12",
      EndTime: "08:45:38.7",
      ValidFrom: "2024-03-01",
      ValidTo: "2024-03-10",
      BaseQuantity: 200,
      BomItem : "Item2"
  },
  {
      slNo: 3,
      BomId : 3, 
      MaterialNumber: "MN-3",
      plant: "P-3",
      AlternateBom: "FG3",
      BOMCategory: "Ss3",
      BOMComponents: "13",
      EndTime: "09:42:38.7",
      ValidFrom: "2024-04-05",
      ValidTo: "2024-04-15",
      BaseQuantity: 300,
      BomItem : "Item3"
  },
  {
      slNo: 4,
      BomId : 4, 
      MaterialNumber: "MN-4",
      plant: "P-4",
      AlternateBom: "FG4",
      BOMCategory: "Ss4",
      BOMComponents: "14",
      EndTime: "10:20:38.7",
      ValidFrom: "2024-05-06",
      ValidTo: "2024-05-16",
      BaseQuantity: 400,
      BomItem : "Item4"
  },
  {
      slNo: 5,
      BomId : 5, 
      MaterialNumber: "MN-5",
      plant: "P-5",
      AlternateBom: "FG5",
      BOMCategory: "Ss5",
      BOMComponents: "15",
      EndTime: "11:30:38.7",
      ValidFrom: "2024-06-07",
      ValidTo: "2024-06-17",
      BaseQuantity: 500,
      BomItem : "Item5"
  },
  {
      slNo: 6,
      BomId : 6, 
      MaterialNumber: "MN-6",
      plant: "P-6",
      AlternateBom: "FG6",
      BOMCategory: "Ss6",
      BOMComponents: "16",
      EndTime: "12:35:38.7",
      ValidFrom: "2024-07-08",
      ValidTo: "2024-07-18",
      BaseQuantity: 600,
      BomItem : "Item6"
  },
  {
      slNo: 7,
      BomId : 7, 
      MaterialNumber: "MN-7",
      plant: "P-7",
      AlternateBom: "FG7",
      BOMCategory: "Ss7",
      BOMComponents: "17",
      EndTime: "13:40:38.7",
      ValidFrom: "2024-08-09",
      ValidTo: "2024-08-19",
      BaseQuantity: 700,
      BomItem : "Item7"
  },
  {
      slNo: 8,
      BomId : 8, 
      MaterialNumber: "MN-8",
      plant: "P-8",
      AlternateBom: "FG8",
      BOMCategory: "Ss8",
      BOMComponents: "18",
      EndTime: "14:45:38.7",
      ValidFrom: "2024-09-10",
      ValidTo: "2024-09-20",
      BaseQuantity: 800,
      BomItem : "Item8"
  }
];




type IfieldType =
  | "string"
  | "number"
  | "select"
  | "selectone"
  | "bool"
  | "radio"
  | "string(textarea)"
  | "date"
  | "password"
  | "time"
  | "depended"
  | "file"
;("blank")

// export type IFormVariable = {
//     name: string
//     type: IfieldType
//     display: string
//     description: string
//     options?: string[]
//     default: string | number | boolean
//     required: boolean
//     group: number
//     API?: string
//     showInUpdate?: boolean
//     dependedField?: string
//   }
  export const BOM_FORM_DATA: IFormVariable[]   =[
    
    {
      name: "bomName",
      type: "string",
      display: "BOM Name",
      default: "",
      description: "",
      required: true,
      group: 2,
      bomIndex : 0,
    },
    {
        name: "rmStore",
        type: "string",
        display: "RM store",
        default: "",
        description: "",
        required: true,
        group: 2,
        bomIndex : 0,
    },
    {
        name: "fgStore",
        type: "string",
        display: "FG store",
        default: "",
        description: "",
        required: true,
        group: 2,
        bomIndex : 0,
    },
    {
        name : "scrapStore",
        type : "string",
        display : "Scrap Store",
        default : "",
        description : "",
        required : true,
        group : 2,
        bomIndex : 0,
    },
    {
      name : "fgName",
      type : "string",
      display : "FG Name",
      default : "",
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },
    {
      name : "noOfRm",
      type : "string",
      display : "Number of RM",
      default : "",
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },
    {
      name : "createdBy",
      type : "string",
      display : "Created By",
      default : "",
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },
    {
      name : "bomDescription",
      type : "string",
      display : "BOM Description",
      default : "",
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },
    {
      name : "comment",
      type : "string",
      display : "Comment",
      default : "",
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },
    {
      name : "creationDate",
      type : "date",
      display : "Creation Date",
      default : new Date().toLocaleDateString("fr-CA"),
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },
    //  {/* Note : For BOM Usage and BOM Category,
    //     We need to pass the api also, because our code is fetching an api , 
    //     when the type is select. That's why We are seeing the api issue when 
    //     clicking on create bom
        
    //     */}
    {
      name : "bomCategory",
      type : "select",
      display : "BOM Category",
      default : "",
      options : ["Material","Document","Equipment","Functional"],
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },
    {
      name : "bomUsage",
      type : "select",
      display : "BOM Usage",
      default : "",
      options : ["Production","Engineering","Costing"],
      description : "",
      required : true,
      group : 2,
      bomIndex : 0,
    },


    // FG
    {
      name : "id",
      type : "select",
      display : "FG ID",
      default : "",
      options : ["FG01","FG02","FG03"],
      description : "",
      required : true,
      group : 1,
      bomIndex : 1
    }, 
    {
      name : "name",
      type : "select",
      display : "Name",
      default : "",
      options : ["FG Material #1","FG Material #2","FG Material #3"],
      description : "",
      required : true,
      group : 1
    },  
    {
      name : "itemCategory",
      type : "select",
      display : "Item Category",
      default : "",
      options : ["FG Material","Raw Material"],
      description : "",
      required : true,
      group : 2,
      bomIndex : 1
    },
    {
      name : "quantity",
      type : "number",
      display : "Quantity",
      default : "1", 
      description : "",
      required : true,
      group : 2,
      bomIndex : 1
    },
    {
      name : "unit",
      type : "select",
      display : "Unit",
      default : "",
      options : ["Kg","Ltr"],
      description : "",
      required : true,
      group : 2,
      bomIndex : 1
    },
    {
      name : "comment",
      type : "string",
      display : "Comment",
      default : "", 
      description : "",
      required : true,
      group : 2,
      bomIndex : 1
    }, 
 
  {
    description:"",
    name: "rawMaterials",
    type: "array",  // Indicate this as an array of raw materials
    display: "Raw Materials",
    group: 2,
    bomIndex: 2,
    items: [  
      {
        name: "rmId",
        type: "select",
        display: "RM ID",
        default: "",
        options: ["RM1", "RM2"],
        description: "",
        required: true,
      },
      {
        name: "rmName",
        type: "select",
        display: "Raw Material Name",
        default: "",
        options: ["Raw Material 1", "Raw Material 2"],
        description: "",
        required: true,
      },
      {
        name: "quantity",
        type: "number",
        display: "Quantity",
        default: 0,
        description: "Quantity required for BOM",
        required: true,
      },
      // You can add more fields as necessary
    ],
  },





  ]
  // const countries = [
  //   { name: "India", value: "IN", cities: ["Delhi", "Mumbai"] },
  //   { name: "Pak", value: "PK", cities: ["Lahore", "Karachi"] },
  //   { name: "Bangladesh", value: "BG", cities: ["Dhaka", "Chittagong"] }
  // ];

 export interface RmFormVariable {
    id: string;
    name: string;
    category: string;
    unit: string;
  }
  
  export const BOM_RM_FORM_DATA: IFormVariable[] = [
    {
      name : "id",
      type : "select",
      display : "ID",
      default : "",
      options : ["RM1","RM2"],
      description : "",
      required : true,
      group : 2
    }, {
      name : "name",
      type : "select",
      display : "Name",
      default : "",
      options : ["Raw Material 1","Raw Material 2"],
      description : "",
      required : true,
      group : 2
    },   {
      name : "itemCategory",
      type : "select",
      display : "Item Category",
      default : "",
      options : ["Raw materail","Finished Goods"],
      description : "",
      required : true,
      group : 2
    },{
      name : "quantity",
      type : "number",
      display : "Quantity",
      default : "1", 
      description : "",
      required : true,
      group : 2
    },{
      name : "unit",
      type : "select",
      display : "Unit",
      default : "",
      options : ["kg","Ltr"],
      description : "",
      required : true,
      group : 2
    },{
      name : "comment",
      type : "string",
      display : "Comment",
      default : "", 
      description : "",
      required : true,
      group : 2
    },
  
  ];



  //  export const BOM_FG_FORM_DATA: RmFormVariable[] = [
  //   { id: "FG01", name: "FG Material #1", category: "FG Material", unit: "Kg" },
  //   { id: "FG02", name: "FG Material #2", category: "FG Material", unit: "Kg" },
  //   { id: "FG03", name: "FG Material #3", category: "FG Material", unit: "Ltr" },
  // ];

 













  export type ITableHeader = {
    name: string
    display: string
    visible?: boolean
  }

  export const BOM_HEADER_DATA: ITableHeader[] = [
    {
      name: "slNo",
      display: "SI. No.",
    },
    {
      name: "materialNumber",
      display: "Material Number",
    },
    {
      name: "plant",
      display: "plant",
    },
    {
      name: "alternateBom",
      display: "Alternate Bom",
    },
    {
      name: "bOMCategory",
      display: "BOM Category",
    },{
      name: "bomItem",
      display: "BOM Item",
    },
    {
      name: "bOMComponents",
      display: "BOM Components",
    },{
      name: "endTime",
      display: "End Time",

    },
    {
        name : "validTo",
        display : "Valid To"
    },{
        name : "validFrom",
        display : "Valid From"
    },{
      name : "baseQuantity",
      display : "Base Quantity"
  }, 
    
  ]















































  const jsonData = {
    "MyDashborad" : "Mydashboard",
    "User Management" : {
        "Manage Users" : "Manage Users"
    },
    "Factory Setup" : {
        "Manage Factory" : "Manage Factory",
        "Manage Plant" : "Manage Plant",
        "Department" : "Department",
        "Storage Location" : "Storage Location"
    },
    "Shopfloor Structure" : {
        "Manufacturing Lines" : "Manufacturing Lines",
        "Routing" : "Routing",
        "Work Center" : "Work Center",
        "Work Center Allocation" : "Work Center Allocation"
    },
    "Material Control" : {
        "Material Master" : "Material Master",
        "Material Group Master" : "Material Group Master",
        "BOM" : "BOM",
        "Serial Number Profile" : "Serial Number Profile",
        "Number Ranges" : "Number Ranges"
   },
    
  
    
  }