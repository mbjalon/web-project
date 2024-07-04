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
import { useCreateShelf } from "@/hooks/useShelves.ts";
import { useAtom } from "jotai/index";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";
import { isNumber } from "@/utils/isNumber.ts";

const AddShelfSchema = z.object({
  row: z.string(),
  position: z.string(),
  level: z.string(),
  capacity: z.string(),
});

export const AddShelf = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(shelfSearchParams);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddShelfSchema>>({
    resolver: zodResolver(AddShelfSchema),
    defaultValues: {
      row: "",
      position: "",
      level: "",
      capacity: "",
    },
  });

  const { mutateAsync, error } = useCreateShelf();

  const onSubmit = useCallback(
    async (data: z.infer<typeof AddShelfSchema>) => {
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
        console.log("created");
      }}
    >
      <DialogTrigger asChild className="w-full">
        <Button variant="add">+ Shelf</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Shelf</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex break-all gap-4 items-center font-medium md:flex-row flex-col">
              <FormField
                control={form.control}
                name="row"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Row"
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
                        placeholder="Position"
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
                        placeholder="Level"
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
                        placeholder="Capacity"
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
            </div>
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
