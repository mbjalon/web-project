import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCallback, useState } from "react";
import { useDeleteShelf } from "@/hooks/useShelves.ts";
import { useQueryClient } from "@tanstack/react-query";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { useAtom } from "jotai";

export interface DeleteShelfProps {
  shelfId: number;
  isEmpty: boolean;
}

export const DeleteShelf = ({ shelfId, isEmpty }: DeleteShelfProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, error } = useDeleteShelf(shelfId);
  const [searchParams] = useAtom(shelfSearchParams);
  const queryClient = useQueryClient();

  const onSubmit = useCallback(async () => {
    await mutateAsync();
    if (error) {
      alert(error?.message);
    }
    await queryClient.invalidateQueries({
      queryKey: ["shelves", searchParams],
    });
    setOpen(false);
  }, [error, mutateAsync, queryClient, searchParams]);

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
      }}
    >
      <DialogTrigger asChild disabled={!isEmpty}>
        <Button variant="delete">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Shelf?</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 w-full">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="delete" className="w-full" onClick={onSubmit}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
