
import React, { useState } from "react"
import { AppConfig } from "@/utils/AppConfig"
import { MenuItem } from "@/utils/types"
import { SubMenu } from "@/navigation/SubMenu"
import { classNames } from "@/utils/dom"

interface SideBarProps {
  data: MenuItem[]
}

export const SideBar: React.FC<SideBarProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside
      className={classNames(
        "z-50 h-full sticky top-0", // Sticky sidebar that stays in view
        isOpen ? "w-72" : "w-20",
      )}
    >
      <div className="drawer-content">
        <label
          className="btn btn-sm bg-neutral-50 drawer-button m-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={`${AppConfig.imagePath}/menu.png`} alt="menuIcon" />
        </label>
      </div>
      <div className="drawer-side w-72 h-full overflow-y-auto bg-base-100">
        {/* Sidebar becomes scrollable */}
        <ul className="menu p-4 w-72 text-base-content">
          {data.map((item) => (
            <SubMenu key={item.title} data={item} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
