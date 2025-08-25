import { IRadialData } from "@/utils/types"
import React, { FC } from "react"

export interface RadialProgressProps {
  radData: IRadialData
}

const RadialProgress: FC<RadialProgressProps> = ({ radData }) => {
  return (
    <>
      <div className="mb-1 text-center">{radData.text}:</div>
      <div
        className={`mb-4 radial-progress justify-self-center shadow-[inset_0_0_0_1rem_rgba(0,0,0,0.2)] ${
          radData.value < 50 ? "text-error" : "text-success"
        }`}
        style={
          {
            "--value": radData.value,
            "--size": radData.size,
            "--thickness": radData.thick,
          } as any
        }
      >
        {radData.value}%
      </div>
    </>

    // <>
    //   <div className="mb-1 text-center">{radData.text}:</div>
    //   <div
    //     className={`mb-4 radial-progress justify-self-center shadow-[inset_0_0_0_1rem_rgba(0,0,0,0.2)] ${
    //       radData.value < 50
    //         ? radData.value < 25
    //           ? "text-error"
    //           : "text-secondary"
    //         : "text-success"
    //     }`}
    //     style={
    //       {
    //         "--value": radData.value,
    //         "--size": radData.size,
    //         "--thickness": radData.thick,
    //       } as any
    //     }
    //   >
    //     {radData.value}% nos.
    //   </div>
    // </>
  )
}

export default RadialProgress
