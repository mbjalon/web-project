import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryWithCount } from "@/models/category/category.ts";
import { useDeleteCategory } from "@/hooks/useCategories.ts";
import { useAtom } from "jotai/index";
import { shelfSearchParams } from "@/utils/atoms.ts";

export interface DeleteCategoryProps {
  category: CategoryWithCount;
}

export const DeleteCategory = ({ category }: DeleteCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(shelfSearchParams);

  const queryClient = useQueryClient();

  const { mutateAsync, error } = useDeleteCategory(category.id);

  const onSubmit = useCallback(async () => {
    await mutateAsync();
    if (error) {
      alert(error?.message);
    }
    await queryClient.invalidateQueries({
      queryKey: ["categories", searchParams],
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
        <Button variant="delete" disabled={(category._count?.Goods ?? 1) > 0}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
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
