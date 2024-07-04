import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCallback, useState } from "react";
import { GoodStore } from "@/models/good/good.ts";
import { useDeleteGood } from "@/hooks/useGoods.ts";
import { useAtom } from "jotai/index";
import { storeGoodSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";

export interface DeleteGoodProps {
  good: GoodStore;
}

export const DeleteGood = ({ good }: DeleteGoodProps) => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(storeGoodSearchParams);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useDeleteGood(good.id);

  const onSubmit = useCallback(async () => {
    await mutateAsync();
    if (error) {
      alert(error?.message);
    }
    await queryClient.invalidateQueries({
      queryKey: ["goodsStore", searchParams],
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
      <DialogTrigger asChild>
        <Button variant="delete" disabled={good.amount > 0}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Good</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 w-full">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="delete" onClick={onSubmit}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
