import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useGetCategories } from "@/hooks/useCategories.ts";
import { AddCategory } from "@/components/admin/category/AddCategoryDialog.tsx";
import { EditCategory } from "@/components/admin/category/EditCategoryDialog.tsx";
import { DeleteCategory } from "@/components/admin/category/DeleteCategoryDialog.tsx";
import FindCategoriesInput, {
  FindCategoriesSchema,
} from "@/components/admin/category/FindCategoriesInput.tsx";
import { useCallback, useState } from "react";
import { useAtom } from "jotai/index";
import { adminCategoryParams } from "@/utils/atoms.ts";
import { GetMultiCategoryRequest } from "@/models/category/categoryRequests.ts";
import { z } from "zod";
import { PaginationComponent } from "@/components/common/Pagination.tsx";

export const CategoriesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] =
    useAtom<GetMultiCategoryRequest>(adminCategoryParams);

  const { data: categories, isFetching } = useGetCategories(searchParams);

  const onSubmit = useCallback(
    (data: z.infer<typeof FindCategoriesSchema>) => {
      sessionStorage.setItem("pageSize", data.pageSize ?? "24");
      setCurrentPage(1);
      setSearchParams({
        name: data.name,
        withAmount: true,
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
        <FindCategoriesInput onSubmit={onSubmit} />
        <AddCategory />
      </div>
      {!isFetching && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>No. of Goods</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.data.map((category, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category._count?.Goods}</TableCell>
                <TableCell className="flex gap-4 justify-end">
                  <EditCategory category={category} />
                  <DeleteCategory category={category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="max-w-screen flex flex-wrap">
        <PaginationComponent
          pagination={categories?.pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};
