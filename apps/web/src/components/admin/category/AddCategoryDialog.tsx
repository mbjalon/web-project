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
import { useAtom } from "jotai/index";
import { adminCategoryParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";
import {
  CategoryForm,
  CategorySchema,
} from "@/components/admin/category/CategoryForm.tsx";
import { useCreateCategory } from "@/hooks/useCategories.ts";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(adminCategoryParams);
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useCreateCategory();

  const onSubmit = useCallback(
    async (data: z.infer<typeof CategorySchema>) => {
      await mutateAsync(data);
      if (error) {
        alert(error?.message);
      }
      await queryClient.invalidateQueries({
        queryKey: ["categories", searchParams],
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
        <Button className="bg-green-600 hover:bg-green-700 px-6">
          + Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <CategoryForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
