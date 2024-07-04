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
import { GoodForm, GoodSchema } from "@/components/admin/good/GoodForm.tsx";
import { useAtom } from "jotai/index";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateGood } from "@/hooks/useGoods.ts";
import { GoodStore } from "@/models/good/good.ts";

export interface EditGoodProps {
  good: GoodStore;
}

export const EditGood = ({ good }: EditGoodProps) => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(shelfSearchParams);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useUpdateGood(good.id);

  const onSubmit = useCallback(
    async (data: z.infer<typeof GoodSchema>) => {
      await mutateAsync(data);
      if (error) {
        alert(error?.message);
      }
      await queryClient.invalidateQueries({
        queryKey: ["goodsStore", searchParams],
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
          <DialogTitle>Edit Good</DialogTitle>
          <GoodForm onSubmit={onSubmit} good={good} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
