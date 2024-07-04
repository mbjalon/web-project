import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCallback, useState, useEffect } from "react";
import { useDeleteUser } from "@/hooks/useUsers.ts";
import { useAtom } from "jotai/index";
import { userSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";

export interface DeleteUserProps {
  userId: number;
}

export const DeleteUser = ({ userId }: DeleteUserProps) => {
  const [open, setOpen] = useState(false);
  const [isSelf, setIsSelf] = useState(false);
  const [searchParams] = useAtom(userSearchParams);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useDeleteUser(userId);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId && parseInt(storedUserId, 10) === userId) {
      setIsSelf(true);
    }
  }, [userId]);

  const onSubmit = useCallback(async () => {
    await mutateAsync();
    if (error) {
      alert(error?.message);
    }
    await queryClient.invalidateQueries({ queryKey: ["users", searchParams] });
    setOpen(false);
  }, [error, mutateAsync, queryClient, searchParams]);

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 w-full">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={onSubmit}
            disabled={isSelf}
          >
            Delete
          </Button>
        </div>
        {isSelf && (
          <p className="text-red-500">You cannot delete your own account.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
