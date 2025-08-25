export type IAppConfig = {
  siteName: string
  logoPath: string
  imagePath: string
}

export type INavigationItem = {
  name: string
  href: string
  external?: boolean
}

export interface IUser {
  userid: string
  username: string
  firstName: string
  lastName: string
  email: string
  // role: IUserRole
  role: string
  photoUrl: string
  accessToken: string
  // accessTokenValidity: number
  menuDetails: any[]
}

export interface ISubMenu {
  subMenuId: number
  subMenuName: string
  subMenuURL: string
  subMenuIcon: string
}

export interface IMenu {
  menuId: number
  menuName: string
  menuURL: string
  menuIcon: string
  // accessRole: string[]
  accessRole: IUser["role"]
  subMenus: ISubMenu[]
}

export type ISampleData = {
  name: string
  job: string
  color: string
}

export type MenuItem = {
  title: string
  path: string
  submenu?: MenuItem[]
}
type IfieldType =
  | "string"
  | "number"
  | "select"
  | "selectcustom"
  | "selectone"
  | "bool"
  | "radio"
  | "string(textarea)"
  | "date"
  | "password"
  | "time"
  | "depended"
  | "supervisorDD"
  | "array"
  | "managerDD"
;("blank")

export type IFormVariable = {
  name: string
  type: IfieldType
  display: string
  description?: string
  options?: string[]
  default?: string | number | boolean | null
  required?: boolean
  group?: number
  API?: string
  showInUpdate?: boolean
  dependedField?: string
  supervisorDrop?: string
  managerDrop?: string
  dependedDrop?: string
  bomIndex?: number

  // New property to handle nested items for array types
  items?: IFormVariable[] // Add this to define fields for array items
}

export type ITableVarible = {
  parameter: string
  cell_voltage: number
  pack_voltage: number
  charge_dicharge: number
  state_of_charge: number
  state_of_health: number
  cell_temperature: number
  pack_temperature: number
  ambient_temperature: number
  cell_balancing_status: boolean
}
// New Type for table by Ayush
export type ITableVarible1 = {
  "Cell Serial Number": number
  "Test Start Date and Time": string
  "Charge Rate(C-rate)": number
  "Discharge Rate(C-rate)": number
  "Charging Voltage(Volts)": number
  "Discharging rate(Volts)": number
  "Test Duration(Hours or Minutes)": number
  "Initial Cell Temperature (Degrees Celsius)": number
  "Final Cell Temperature (Degrees Celsius)": number
  "Overheating or Overcurrent Events": string
  "Pass/Fail Criteria": boolean
}
// Type of table for operation confirmation page

export type tableDataWithSchemaKeyType = {
  id: string
  header: string
  columns: (ColumnType | undefined)[] // Change from [ColumnType] to ColumnType[]
}

export type tableDataWithSchemaType = {
  tableDef: tableDataWithSchemaKeyType[]
  cellCapacityTesting: tableDataWithSchemaKeyType[]
  cellSorting: tableDataWithSchemaKeyType[]
  PackAssembly: tableDataWithSchemaKeyType[]
  BMSTesting: tableDataWithSchemaKeyType[]
  BatterypackTesting: tableDataWithSchemaKeyType[]
  FinalQualityCheck: tableDataWithSchemaKeyType[]
  Packing: tableDataWithSchemaKeyType[]
}

//CDC datatypes
export type BatteryTestData = {
  stepIndex: number // Step Index
  stepName: string // Step Name
  stepTime: string // Step Time (hh:mm:ss.ms)
  voltage: number // Voltage (V)
  cRate: number // C-rate (C)
  current: number // Current (A)
  cutOffVoltage: number // Cut-off voltage (V)
  cutOffCRate: number // Cut-off C-rate (C)
  cutOffCurrent: number // Cut-off curr. (A)
  energy: number // Energy (Wh)
  negativeDeltaV: number // -ΔV (V)
  power: number // Power (W)
  resistance: number // Resistance (mΩ)
  capacity: number // Capacity (Ah)
  recordSettings: string // Record settings
  auxChannelRecordingCondition: string // Aux.CH recording condition
  maxVoltage: number // Max Vi (V)
  minVoltage: number // Min Vi (V)
  maxTemperature: number // Max Ti (℃)
  minTemperature: number // Min Ti (℃)
  segmentRecord1: string // Segment record1
  segmentRecord2: string // Segment record2
  currentRange: number // Current range (A)
}

export type IRadialData = {
  number?: number
  text: string
  value: number
  size: string
  thick: string
  color: string
}

export type IOption = {
  option: string
  value: string
}[]

export type IOrderDetails = {
  header: string
  value: string
}[]

export type IOperationDetails = {
  header: string
  value: string | number | null
}[]

export type ITDAssignmentData = {
  date: string
  operations: string
  poNumber: number
}

export type shiftAssignmentHolidayType = {
  date: string
  title: string
}
export type shiftAssignmentAssignType = {
  day: string
  date: string
  time: string
}
export type shiftAssignmentDataType = {
  holidayData: shiftAssignmentHolidayType[]
  shiftAssignData: shiftAssignmentAssignType[]
}

export type ITableHeader = {
  name: string 
  display: string
  visible?: boolean
}
export type ColumnType = {
  header: string
  key: string
}

export type TableDataWithSchemaKeyType = {
  id: string
  header: string
  columns: (ColumnType | undefined)[] // Change from [ColumnType] to ColumnType[]
}

export type TableDataWithSchemaType = {
  tableDef: TableDataWithSchemaKeyType[]
  cellCapacityTesting: TableDataWithSchemaKeyType[]
  cellSorting: TableDataWithSchemaKeyType[]
  PackAssembly: TableDataWithSchemaKeyType[]
  BMSTesting: TableDataWithSchemaKeyType[]
  BatterypackTesting: TableDataWithSchemaKeyType[]
  FinalQualityCheck: TableDataWithSchemaKeyType[]
  Packing: TableDataWithSchemaKeyType[]
}

export type ITableData = { [key: string]: any }

export interface IProductionOrder {
  OrderNumber: string
  OrderId: number
}

export interface IOperation {
  WorkcenterId: number
  Operation: string
  OperationDescription: string
}

export interface IBarCode {
  SerialBarCodeNumber: string
}

export interface IOperatorUser {
  UserId: string
  UserName: string
}

