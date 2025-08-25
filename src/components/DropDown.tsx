import { IOption } from "@/utils/types"
import React, { FC, useEffect, useState } from "react"
import { BiChevronDown } from "react-icons/bi"

interface DropDownProps {
  title: string;
  data: IOption
  setOperation : (value:string)=>void;
  resetTrigger: string | null; // New prop to reset dropdown
}

const DropDown: FC<DropDownProps> = ({ title, data, setOperation, resetTrigger }) => {
  const [selectedOption, setSelectedOption] = useState<string>("select value");
  const [selectedOptionValue, setSelectedOptionValue] = useState<string>("");

  // Reset the dropdown to the default value when resetTrigger changes
  useEffect(() => {
    setSelectedOption("select value");
    setSelectedOptionValue("");
  }, [resetTrigger]);

  // Notify parent when value changes
  useEffect(() => {
    setOperation(selectedOptionValue);
  }, [selectedOptionValue, setOperation]);

  return (
    <div className="flex flex-col rounded-md border-2 border-info mb-4">
      <span className="py-2 bg-info text-center text-sm">{title}</span>
      <div className="dropdown dropdown-bottom w-full">
        <button className="w-full text-left flex justify-between items-center">
          <span className="p-2 grow border-r border-r-base-300 text-center">
            {selectedOption}
          </span>
          <BiChevronDown size={24} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu shadow bg-base-100 w-full p-0"
        >
          {data.map((i, index) => (
            <li
              key={i.option + index}
              value={i.option}
              className="hover:bg-primary-content p-2 text-center"
              onClick={(e) => {
                e.preventDefault();
                setSelectedOption(i.option);
                setSelectedOptionValue(i.value);
                const elem = document.activeElement;
                if (elem) {
                  (elem as HTMLElement).blur();
                }
              }}
            >
              {i.option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropDown
