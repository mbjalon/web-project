import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useCallback, useState } from "react";
import { useGetShelves } from "@/hooks/useShelves.ts";
import { EditShelf } from "@/components/admin/shelf/EditShelfDialog.tsx";
import { DeleteShelf } from "@/components/admin/shelf/DeleteShelfDialog.tsx";
import FindShelvesInput, {
  FindShelvesSchema,
} from "@/components/common/FindShelvesInput.tsx";
import { z } from "zod";
import { useAtom } from "jotai/index";
import { GetMultiShelfRequest } from "@/models/shelf/shelfRequests.ts";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { PaginationComponent } from "@/components/common/Pagination.tsx";
import { AddShelf } from "@/components/admin/shelf/AddShelfDialog.tsx";
import { AddShelves } from "@/components/admin/shelf/AddShelvesDialog.tsx";

export const ShelvesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] =
    useAtom<GetMultiShelfRequest>(shelfSearchParams);
  const { data, isFetching } = useGetShelves(searchParams);

  const onSubmit = useCallback(
    (data: z.infer<typeof FindShelvesSchema>) => {
      sessionStorage.setItem("pageSize", data.pageSize ?? "24");
      setCurrentPage(1);
      setSearchParams({
        row: data.row && data.row !== "-" ? data.row : undefined,
        position:
          data.position && data.position !== "-" ? data.position : undefined,
        level: data.level && data.level !== "-" ? data.level : undefined,
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
        <FindShelvesInput onSubmit={onSubmit} />
        <div className="md:w-auto w-full gap-4 flex">
          <AddShelf />
          <AddShelves />
        </div>
      </div>
      {!isFetching && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coordinates</TableHead>
              <TableHead>Fullness</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((shelf, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">
                  {" "}
                  {`${shelf.row?.toString() ?? "xx"}-${
                    shelf.position?.toString() ?? "xx"
                  }-${shelf.level?.toString() ?? "xx"}`}
                </TableCell>
                <TableCell>{`${shelf.freeCapacity} / ${shelf.capacity}`}</TableCell>
                <TableCell className="flex gap-4 justify-end">
                  <EditShelf shelf={shelf} />
                  <DeleteShelf
                    shelfId={shelf.id}
                    isEmpty={shelf.freeCapacity === shelf.capacity}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="max-w-screen flex flex-wrap">
        <PaginationComponent
          pagination={data?.pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};
