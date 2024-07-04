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
import { useQueryClient } from "@tanstack/react-query";
import { CategoryWithCount } from "@/models/category/category.ts";
import {
  CategoryForm,
  CategorySchema,
} from "@/components/admin/category/CategoryForm.tsx";
import { useUpdateCategory } from "@/hooks/useCategories.ts";
import { useAtom } from "jotai/index";
import { adminCategoryParams } from "@/utils/atoms.ts";

export interface EditCategoryProps {
  category: CategoryWithCount;
}

export const EditCategory = ({ category }: EditCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(adminCategoryParams);

  const queryClient = useQueryClient();

  const { mutateAsync, error } = useUpdateCategory(category.id);

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
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <CategoryForm onSubmit={onSubmit} category={category} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
