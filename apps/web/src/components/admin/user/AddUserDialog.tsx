import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";

import { useCallback, useState } from "react";
import { UserForm, UserSchema } from "@/components/admin/user/UserForm.tsx";
import { useCreateUser } from "@/hooks/useUsers.ts";
import { useAtom } from "jotai/index";
import { userSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";

export const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(userSearchParams);
  const queryClient = useQueryClient();
  const { mutateAsync, error } = useCreateUser();

  const onSubmit = useCallback(
    async (data: z.infer<typeof UserSchema>) => {
      await mutateAsync({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword ?? "",
        role: data.role,
      });
      if (error) {
        alert(error?.message);
      }
      await queryClient.invalidateQueries({
        queryKey: ["users", searchParams],
      });
      setOpen(false);
    },
    [error, mutateAsync, queryClient, searchParams],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
      }}
    >
      <DialogTrigger asChild className="w-full md:w-auto">
        <Button variant="add">+ User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <UserForm onSubmit={onSubmit} isRegistration={true} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
