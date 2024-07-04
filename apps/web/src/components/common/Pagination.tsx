import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination.tsx";

interface Paginated {
  pagination?: {
    page?: string;
    pageSize?: string;
  };
  [key: string]: unknown;
}

export interface PaginationComponentProps {
  pagination?: { currentPage?: number; pageSize?: number; totalPages?: number };
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchParams: React.Dispatch<React.SetStateAction<Paginated>>;
}

export const PaginationComponent = ({
  pagination,
  currentPage,
  setCurrentPage,
  setSearchParams,
}: PaginationComponentProps) => {
  return (
    <Pagination className="flex py-8">
      <PaginationContent className="flex-wrap justify-center">
        {[...Array(pagination?.totalPages).keys()]
          .map((page) => page + 1)
          .map((page, key) => (
            <PaginationItem key={key}>
              <PaginationLink
                onClick={() => {
                  setCurrentPage(page);
                  setSearchParams((prevState) => ({
                    ...prevState,
                    pagination: {
                      page: page.toString(),
                      pageSize: prevState.pagination?.pageSize,
                    },
                  }));
                }}
                isActive={page == currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
      </PaginationContent>
    </Pagination>
  );
};
