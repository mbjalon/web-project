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
import { useUpdateUser } from "@/hooks/useUsers.ts";
import { UserWithId } from "@/models/user/user.ts";
import { useAtom } from "jotai/index";
import { userSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";

export interface EditUserProps {
  user: UserWithId;
}

export const EditUser = ({ user }: EditUserProps) => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(userSearchParams);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useUpdateUser(user.id);

  const onSubmit = useCallback(
    async (data: z.infer<typeof UserSchema>) => {
      await mutateAsync(data);
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
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <UserForm onSubmit={onSubmit} user={user} />
      </DialogContent>
    </Dialog>
  );
};
