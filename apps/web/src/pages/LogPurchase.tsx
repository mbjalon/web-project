import { GoodBox } from "@/components/store/GoodBox.tsx";
import { z } from "zod";
import { useCallback, useState } from "react";

import FindGoodsInput, {
  FindGoodsSchema,
} from "@/components/common/FindGoodsInput.tsx";
import { useGetStoreGoods } from "@/hooks/useGoods";
import { useAtom } from "jotai/index";
import { GetMultiGoodRequest } from "@/models/good/goodRequests.ts";
import { storeGoodSearchParams } from "@/utils/atoms.ts";
import { PaginationComponent } from "@/components/common/Pagination.tsx";

const LogPurchase = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useAtom<GetMultiGoodRequest>(
    storeGoodSearchParams,
  );
  const { data: goods, error, isFetching } = useGetStoreGoods(searchParams);

  const onSubmit = useCallback(
    (data: z.infer<typeof FindGoodsSchema>) => {
      sessionStorage.setItem("pageSize", data.pageSize ?? "24");
      setCurrentPage(1);
      setSearchParams({
        name: data.name,
        categoryName:
          data.categoryName && data.categoryName !== "-"
            ? data.categoryName
            : undefined,
        withAmount: false,
        pagination: {
          page: "1",
          pageSize: data.pageSize ?? sessionStorage.getItem("pageSize") ?? "24",
        },
      });
    },
    [setSearchParams],
  );

  if (error) {
    return (
      <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px]">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px]">
      <div className="flex justify-between md:w-3/4 pt-12">
        <FindGoodsInput onSubmit={onSubmit} />
      </div>

      <div className="flex w-full md:flex-row md:w-3/4 flex-wrap pt-2">
        {!isFetching &&
          goods?.data.map((good, key) => (
            <GoodBox
              name={good.name}
              description={good.description}
              category={good.Category.name}
              goodId={good.id}
              key={key}
            />
          ))}
      </div>
      <div>
        <PaginationComponent
          pagination={goods?.pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};

export default LogPurchase;
