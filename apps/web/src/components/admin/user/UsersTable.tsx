import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import FindUsersInput, {
  FindUsersSchema,
} from "@/components/admin/user/FindUsersInput.tsx";
import { EditUser } from "@/components/admin/user/EditUserDialog.tsx";
import { AddUser } from "@/components/admin/user/AddUserDialog.tsx";
import { useGetUsers } from "@/hooks/useUsers.ts";
import { z } from "zod";
import { DeleteUser } from "@/components/admin/user/DeleteUserDialog.tsx";
import { userSearchParams } from "@/utils/atoms.ts";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { PaginationComponent } from "@/components/common/Pagination.tsx";
import { GetMultiUserRequest } from "@/models/user/userRequest.ts";

export const UsersTable = () => {
  const [searchParams, setSearchParams] =
    useAtom<GetMultiUserRequest>(userSearchParams);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetUsers(searchParams);

  const onSubmit = useCallback(
    (data: z.infer<typeof FindUsersSchema>) => {
      sessionStorage.setItem("pageSize", data.pageSize ?? "24");
      setCurrentPage(1);
      setSearchParams({
        email: data.email,
        role: data.role && data.role !== "-" ? data.role : undefined,
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
        <FindUsersInput onSubmit={onSubmit} />
        <AddUser />
      </div>
      {!isFetching && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>E-mail</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Role</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((user, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.deletedAt?.toString()}</TableCell>
                <TableCell className="flex gap-4 justify-end">
                  <EditUser user={user} />
                  <DeleteUser userId={user.id} />
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
