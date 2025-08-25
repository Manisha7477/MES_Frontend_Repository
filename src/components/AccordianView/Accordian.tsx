import React, { FC, useState } from "react"

interface AccordianProps {
  title: string
  children: React.ReactNode
}

const Accordian: FC<AccordianProps> = ({ title, children }) => {
  const [ischecked, setChecked] = useState<boolean>(true)
  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input
        type="radio"
        onClick={() => {
          setChecked(!ischecked)
        }}
        checked={ischecked}
      />
      <div className="collapse-title text-sm font-medium bg-info">{title}</div>
      <div className="collapse-content bg-neutral">{children}</div>
    </div>
  )
}

export default Accordian
