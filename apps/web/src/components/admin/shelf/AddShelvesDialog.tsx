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
import { useCreateShelves } from "@/hooks/useShelves.ts";
import { useAtom } from "jotai/index";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";
import { isNumber } from "@/utils/isNumber.ts";

const AddShelfSchema = z.object({
  fromRow: z.string(),
  toRow: z.string(),
  fromPosition: z.string(),
  toPosition: z.string(),
  fromLevel: z.string(),
  toLevel: z.string(),
  capacity: z.string(),
});

export const AddShelves = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useAtom(shelfSearchParams);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddShelfSchema>>({
    resolver: zodResolver(AddShelfSchema),
    defaultValues: {
      fromRow: "",
      toRow: "",
      fromPosition: "",
      toPosition: "",
      fromLevel: "",
      toLevel: "",
      capacity: "",
    },
  });

  const { mutateAsync, error } = useCreateShelves();

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
      }}
    >
      <DialogTrigger asChild className="w-full">
        <Button className="bg-green-700 hover:bg-green-600">+ Shelves</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Shelves</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4"
          >
            <div className="grid grid-cols-2 grid-rows-4 gap-x-4 items-center font-medium ">
              <FormField
                control={form.control}
                name="fromRow"
                render={({ field }) => (
                  <FormItem className="row-span-1 col-span-1">
                    <FormControl>
                      <Input
                        placeholder="From Row"
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
                name="toRow"
                render={({ field }) => (
                  <FormItem className="row-span-1 col-auto">
                    <FormControl>
                      <Input
                        placeholder="To Row"
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
                name="fromPosition"
                render={({ field }) => (
                  <FormItem className="row-span-2 col-span-1">
                    <FormControl>
                      <Input
                        placeholder="From Position"
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
                name="toPosition"
                render={({ field }) => (
                  <FormItem className="row-span-2 col-auto">
                    <FormControl>
                      <Input
                        placeholder="To Position"
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
                name="fromLevel"
                render={({ field }) => (
                  <FormItem className="row-span-3 col-span-1">
                    <FormControl>
                      <Input
                        placeholder="From Level"
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
                name="toLevel"
                render={({ field }) => (
                  <FormItem className="row-span-3 col-auto">
                    <FormControl>
                      <Input
                        placeholder="To Level"
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
                  <FormItem className="row-span-4 col-span-2 mt-4">
                    <FormControl>
                      <Input
                        placeholder="Maximum Capacity"
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
            <Button variant="add" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
