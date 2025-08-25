import { ReactNode } from "react"

interface ITitleBoxStructureProps {
  title: string
  children: ReactNode
}

const TitleBoxStructure: React.FunctionComponent<ITitleBoxStructureProps> = ({
  title,
  children,
}) => {
  return (
    <div className=" w-[70vw] border shadow-md mb-4 mt-16">
      <div className="bg-primary text-center border-b font-bold  py-1">
        <span className="text-base-100">{title}</span>
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}

export default TitleBoxStructure
