import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMoveItem } from "@/hooks/useItems.ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useGetCoordinates } from "@/hooks/useShelves.ts";
import { useQueryClient } from "@tanstack/react-query";
import { shelfSearchParams } from "@/utils/atoms.ts";
import { useAtom } from "jotai";

const SelectShelfForm = z.object({
  coord: z.string(),
});

export interface SelectShelfProps {
  itemId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
}

export const SelectShelf = ({
  itemId,
  open,
  setOpen,
  amount,
}: SelectShelfProps) => {
  const { data: coords, error, isFetching } = useGetCoordinates();

  const queryClient = useQueryClient();
  const [searchParams] = useAtom(shelfSearchParams);

  const form = useForm<z.infer<typeof SelectShelfForm>>({
    resolver: zodResolver(SelectShelfForm),
  });

  const { mutateAsync, error: mutateError } = useMoveItem(itemId);

  const onSubmit = useCallback(
    async (data: z.infer<typeof SelectShelfForm>) => {
      await mutateAsync({
        amount: amount,
        shelf: {
          row: JSON.parse(data.coord).row,
          position: JSON.parse(data.coord).position,
          level: JSON.parse(data.coord).level,
        },
      });
      if (mutateError) {
        alert(mutateError?.message);
      }
      await queryClient.invalidateQueries({
        queryKey: ["shelves", searchParams],
      });
      await queryClient.invalidateQueries({
        queryKey: ["item", itemId],
      });
      setOpen(false);
    },
    [
      amount,
      itemId,
      mutateAsync,
      mutateError,
      queryClient,
      searchParams,
      setOpen,
    ],
  );

  if (error) {
    return (
      <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px]">
        Error: {error.message}
      </div>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
      }}
    >
      {!isFetching && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move the item to different shelf</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex break-all gap-4 items-center font-medium ">
                <FormField
                  control={form.control}
                  name="coord"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-36 mt-4">
                            <SelectValue placeholder="Coordinates" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(coords?.data ?? []).map((coord, key) => (
                            <SelectItem
                              key={key}
                              value={JSON.stringify(coord) ?? ""}
                            >
                              {`${coord.row}-${coord.position}-${coord.level}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-36">
                Move
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};
