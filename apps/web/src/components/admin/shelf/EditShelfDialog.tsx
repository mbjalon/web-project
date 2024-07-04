import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useCallback, useState } from "react";
import { useUpdateShelf } from "@/hooks/useShelves.ts";
import { Shelf } from "@/models/shelf/shelf.ts";
import { useAtom } from "jotai/index";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";
import { isNumber } from "@/utils/isNumber.ts";

const EditShelfForm = z.object({
  row: z.string(),
  position: z.string(),
  level: z.string(),
  capacity: z.string(),
});

export interface EditShelfProps {
  shelf: Shelf;
}

export const EditShelf = ({ shelf }: EditShelfProps) => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(shelfSearchParams);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof EditShelfForm>>({
    resolver: zodResolver(EditShelfForm),
    defaultValues: {
      row: shelf.row?.toString(),
      position: shelf.position?.toString(),
      level: shelf.level?.toString(),
      capacity: shelf.capacity?.toString(),
    },
  });

  const { mutateAsync, error } = useUpdateShelf(shelf.id);

  const onSubmit = useCallback(
    async (data: z.infer<typeof EditShelfForm>) => {
      await mutateAsync(data);
      if (error) {
        alert(error?.message);
      }
      await queryClient.invalidateQueries({
        queryKey: ["shelves", searchParams],
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
          <DialogTitle>Edit Shelf</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onError={() => alert("error")}
            className="flex flex-col items-center gap-4"
          >
            <FormField
              control={form.control}
              name="row"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="New Row"
                      {...field}
                      onChange={(e) => {
                        if (isNumber(e.target.value)) {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="New Position"
                      {...field}
                      onChange={(e) => {
                        if (isNumber(e.target.value)) {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="New Level"
                      {...field}
                      onChange={(e) => {
                        if (isNumber(e.target.value)) {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="New Capacity"
                      {...field}
                      onChange={(e) => {
                        if (isNumber(e.target.value)) {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
