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
import { storeGoodSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateGood } from "@/hooks/useGoods.ts";

export const AddGood = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(storeGoodSearchParams);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useCreateGood();

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
      <DialogTrigger asChild className="w-full md:w-auto">
        <Button variant="add">+ Good</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Good</DialogTitle>
        </DialogHeader>
        <GoodForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
