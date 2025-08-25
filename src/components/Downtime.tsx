import React from "react"
import { DOWNTIME_PROGRESS_DATA, PROGRESS_DATA } from "@/utils/data"
import DowntimeRadial from "@/components/RadialProgress/DowntimeRadial"
import DowntimeRadialBox from "@/components/RadialProgress/DowntimeRadialBox"

interface Props {}

const MyComponent: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-11">
      <div className="flex ml-10">
        <div className="mr-20 flex flex-col gap-5">
          <div className="flex space-x-3">
            <text className="font-medium">Infeed Count</text>
            <progress
              className="progress progress-primary w-56 h-10 rounded-none"
              value="50"
              max="100"
            ></progress>
            <text className="font-medium">5732/42289</text>
          </div>
          <div className="flex space-x-3">
            <text className="font-medium">Outfeed Count</text>
            <progress
              className="progress progress-primary w-56 h-10 rounded-none"
              value="10"
              max="100"
            ></progress>
            <text className="font-medium">201490/98940</text>
          </div>
        </div>

        <div className="flex space-x-10">
          <DowntimeRadial radData={PROGRESS_DATA.completion_status} />
          <DowntimeRadial radData={PROGRESS_DATA.completion_status} />
          <DowntimeRadial radData={PROGRESS_DATA.completion_status} />
          <DowntimeRadial radData={PROGRESS_DATA.completion_status} />
        </div>
      </div>
      <div className="grid grid-cols-4">
        {DOWNTIME_PROGRESS_DATA.map((rd) => (
          <DowntimeRadialBox
            key={rd.number}
            className="mx-10 my-10"
            radData={rd}
          />
        ))}
      </div>
    </div>
  )
}

export default MyComponent
