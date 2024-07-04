import { useCallback, useState } from "react";
import { ShelfView } from "@/components/search-shelves/ShelfView.tsx";
import FindShelvesInput, {
  FindShelvesSchema,
} from "@/components/common/FindShelvesInput.tsx";
import { z } from "zod";

import { useGetShelves } from "@/hooks/useShelves.ts";
import { GetMultiShelfRequest } from "@/models/shelf/shelfRequests.ts";
import { PaginationComponent } from "@/components/common/Pagination.tsx";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { useAtom } from "jotai";

const SearchShelves = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] =
    useAtom<GetMultiShelfRequest>(shelfSearchParams);
  const { data: shelves, error, isFetching } = useGetShelves(searchParams);

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

  if (error) {
    return (
      <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px]">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px] pt-12">
      <div className="flex md:w-3/4 flex-wrap pl-2">
        <FindShelvesInput onSubmit={onSubmit} />
      </div>

      <div className="flex w-full md:flex-row md:w-3/4 flex-wrap pt-6">
        {!isFetching &&
          shelves?.data.map((shelf, key) => (
            <div key={key} className="w-full md:w-1/3 p-2">
              <ShelfView shelf={shelf} items={shelf.Items} />
            </div>
          ))}
      </div>
      <div className="md:w-3/4 flex flex-wrap">
        <PaginationComponent
          pagination={shelves?.pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};

export default SearchShelves;
