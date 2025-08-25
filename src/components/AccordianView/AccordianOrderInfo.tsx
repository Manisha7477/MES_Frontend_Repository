import { IOrderDetails } from "@/utils/types";
import React, { FC } from "react";

interface AccordianOrderInfoProps {
  orderDetails: IOrderDetails;
  lotNo: string;
  shift: string;
  productionOrderNumber: string;
}

const OrderDetailSection: FC<{ data: IOrderDetails }> = ({ data }) => {
  return (
    <div className="pt-3 grid grid-cols-2 gap-x-8 gap-y-4">
    {data.length > 0 ? (
      data.map((item) => (
        <div key={item.header} className="text-sm flex">
          <header className="font-semibold min-w-[120px]">{item.header}:</header>
          <section className="ml-3">{item.value}</section>
        </div>
      ))
    ) : (
      <div className="text-sm">No order details available</div>
    )}
    </div>
  );
};

const AccordianOrderInfo: FC<AccordianOrderInfoProps> = ({
  orderDetails,
  lotNo,
  shift,
  productionOrderNumber,
}) => {
  return (
    <div className="flex flex-col">
      <div className="py-3 border-b">
        <div className="flex flex-col gap-3 md:flex-row md:gap-3 md:py-3 px-1 mr-3 justify-between text-sm">
          <div className="flex items-center">
            <span className="font-semibold min-w-[120px]">Lot No. :</span>
            <span className="sm:mr-2">{lotNo || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold min-w-[120px]">Shift :</span>
            <span className="sm:mr-2">{shift || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold min-w-[150px]">Production Order :</span>
            <div className="border-2 rounded-md py-1 text-center">
              {productionOrderNumber || "N/A"}
            </div>
          </div>
        </div>
      </div>
      <OrderDetailSection data={orderDetails} />
    </div>
  );
};

export default AccordianOrderInfo;
