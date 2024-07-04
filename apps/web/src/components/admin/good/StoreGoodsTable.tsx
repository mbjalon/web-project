import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import FindGoodsInput, {
  FindGoodsSchema,
} from "@/components/common/FindGoodsInput.tsx";
import { EditGood } from "@/components/admin/good/EditGoodDialog.tsx";
import { AddGood } from "@/components/admin/good/AddGoodDialog.tsx";
import { useCallback, useState } from "react";
import { useAtom } from "jotai/index";
import { GetMultiGoodRequest } from "@/models/good/goodRequests.ts";
import { storeGoodSearchParams } from "@/utils/atoms.ts";
import { useGetStoreGoods } from "@/hooks/useGoods.ts";
import { z } from "zod";
import { PaginationComponent } from "@/components/common/Pagination.tsx";
import { DeleteGood } from "@/components/admin/good/DeleteGoodDialog.tsx";

export const StoreGoodsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useAtom<GetMultiGoodRequest>(
    storeGoodSearchParams,
  );
  const { data: goods, isFetching } = useGetStoreGoods(searchParams);

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
  return (
    <div className="md:w-3/4 w-full">
      <div className="flex justify-between items-center mb-4 px-2 pt-12 flex-col-reverse md:flex-row gap-4">
        <FindGoodsInput onSubmit={onSubmit} />
        <AddGood />
      </div>
      {!isFetching && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {goods?.data.map((good, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{good.name}</TableCell>
                <TableCell>{good.description}</TableCell>
                <TableCell>{good.Category.name}</TableCell>
                <TableCell className="flex gap-4 justify-end">
                  <EditGood good={good} />
                  <DeleteGood good={good} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
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
