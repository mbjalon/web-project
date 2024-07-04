import { PurchaseInfo } from "@/components/store/PurchaseInfo.tsx";
import { catColor } from "@/utils/constants.ts";

export interface GoodBoxProps {
  name: string;
  description: string;
  category: string;
  goodId: number;
}

export const GoodBox = ({
  name,
  description,
  category,
  goodId,
}: GoodBoxProps) => {
  return (
    <div className="w-full md:w-1/4 p-2">
      <div className="b-gray-200 border-[1px] flex flex-col justify-between p-4 rounded-lg">
        <div className="flex justify-between font-medium">
          <div className="break-all">{name}</div>
          <div
            className={`break-all ${catColor(category)} text-white text-sm font-medium w-fit px-2 py-1 rounded-md`}
          >
            {category}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="break-all text-sm text-gray-400 font-normal">
            {description}
          </div>

          <div className="flex items-center pt-4">
            <PurchaseInfo goodId={goodId} goodName={name} />
          </div>
        </div>
      </div>
    </div>
  );
};
