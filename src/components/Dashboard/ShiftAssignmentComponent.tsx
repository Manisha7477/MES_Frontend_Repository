import { shiftAssignmentDataType } from "@/utils/types"

interface IShiftAssignmentComponentProps {
  shiftAssignmentData: shiftAssignmentDataType
}

const ShiftAssignmentComponent: React.FunctionComponent<
  IShiftAssignmentComponentProps
> = ({ shiftAssignmentData }) => {
  return (
    <div className="w-full sm:flex">
      <div className="w-[20vw] text-sm">
        <div className="font-semibold text-center mb-4 mt-2">
          List of Holiday
        </div>
        {shiftAssignmentData.holidayData.map((holidayDataItem) => {
          return (
            <div
              key={holidayDataItem.title}
              className="font-semibold text-xs mb-2 pl-2"
            >
              {`${holidayDataItem.date} : ${holidayDataItem.title}`}
            </div>
          )
        })}
      </div>
      <div className="w-full">
        {shiftAssignmentData.shiftAssignData.map((shiftAssignDataItem) => {
          return (
            <div
              key={shiftAssignDataItem.date}
              className="w-full flex bg-info text-xs mb-2 gap-6 p-2 font-semibold"
            >
              <div>
                {shiftAssignDataItem.day} <br /> {shiftAssignDataItem.date}
              </div>
              <div>{shiftAssignDataItem.time}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShiftAssignmentComponent
