import { useCallback, useState } from "react";
import { GoodsView } from "@/components/search-goods/GoodsView.tsx";
import FindGoodsInput, {
  FindGoodsSchema,
} from "@/components/common/FindGoodsInput.tsx";
import { z } from "zod";
import { useGetWarehouseGoods } from "@/hooks/useGoods";
import { useAtom } from "jotai/index";
import { warehouseGoodSearchParams } from "@/utils/atoms.ts";
import { GetMultiGoodRequest } from "@/models/good/goodRequests.ts";
import { PaginationComponent } from "@/components/common/Pagination.tsx";

const SearchGoods = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useAtom<GetMultiGoodRequest>(
    warehouseGoodSearchParams,
  );
  const { data: goods, error, isFetching } = useGetWarehouseGoods(searchParams);

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
        withAmount: true,
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
      <div className="flex justify-between md:w-3/4 mb-4 px-2 pt-12">
        <FindGoodsInput onSubmit={onSubmit} />
      </div>
      <div className="flex w-full md:flex-row md:w-3/4 flex-wrap">
        {!isFetching &&
          goods?.data.map((good, key) => (
            <div key={key} className="w-full md:w-1/4 p-2">
              <GoodsView good={good} />
            </div>
          ))}
      </div>
      <div className="max-w-screen flex flex-wrap">
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

export default SearchGoods;
