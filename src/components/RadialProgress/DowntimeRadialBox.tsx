import { IRadialData } from "@/utils/types"
import React, { FC, HTMLAttributes } from "react"

export interface DowntimeRadialProps {
  radData: IRadialData
}

const DowntimeRadial: FC<DowntimeRadialProps & HTMLAttributes<HTMLDivElement>> = ({ radData, className }) => {
  return (
    <div className={`flex border-2 justify-between ${className}`}>
      <text className="font-medium">Line {}</text>
      <div className="flex flex-col">
        <div
          className={`mb-4 radial-progress justify-self-center shadow-[inset_0_0_0_1rem_rgba(0,0,0,0.2)] ${
            radData.value < 50
              ? radData.value < 25
                ? "text-error"
                : "text-secondary"
              : "text-success"
          }`}
          style={
            {
              "--value": radData.value,
              "--size": radData.size,
              "--thickness": radData.thick,
            } as any
          }
        >
          {radData.value}% nos.
        </div>
        <div className="mb-1 text-center">{radData.text}:</div>
      </div>
      <text className="font-medium">Running</text>
    </div>
  )
}

export default DowntimeRadial
