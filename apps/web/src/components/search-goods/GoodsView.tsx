import * as React from "react";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { ItemSelector } from "@/components/search-goods/ItemSelector.tsx";
import { ItemInfo } from "@/components/common/ItemInfo.tsx";
import { Input } from "@/components/ui/input.tsx";
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
import { GoodWarehouse } from "@/models/good/good.ts";
import { useSellGood } from "@/hooks/useGoods";
import { catColor } from "@/utils/constants.ts";
import { useAtom } from "jotai/index";
import { warehouseGoodSearchParams } from "@/utils/atoms.ts";
import { useQueryClient } from "@tanstack/react-query";

export interface GoodsViewProps {
  good: GoodWarehouse;
}

export const SellGoodsSchema = z.object({
  quantity: z.string(),
});

export const GoodsView = ({ good }: GoodsViewProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState<number | null>(
    good.Items[0].id,
  );
  const [searchParams] = useAtom(warehouseGoodSearchParams);
  const queryClient = useQueryClient();
  const sortedItems = good.Items.sort((a, b) => a.id - b.id);

  const { mutateAsync, error } = useSellGood(good.id);

  const form = useForm<z.infer<typeof SellGoodsSchema>>({
    resolver: zodResolver(SellGoodsSchema),
    defaultValues: {
      quantity: "",
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof SellGoodsSchema>) => {
      await mutateAsync({ quantity: Number(data.quantity) });
      if (error) {
        alert(error?.message);
      }
      await queryClient.invalidateQueries({
        queryKey: ["goodsWarehouse", searchParams],
      });
    },
    [mutateAsync, error, queryClient, searchParams],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
        setSelectedItem(-1);
      }}
    >
      <DialogTrigger asChild>
        <div
          className={`b-gray-200 border-[1px] flex flex-col ${catColor(good.Category.name)} hover:opacity-80 duration-150 justify-between items-center rounded-lg overflow-clip hover:cursor-pointer`}
        >
          <div className="py-4 flex flex-col items-center w-full h-full text-center p-4 font-medium text-white">
            {good?.name}
          </div>
          <div className="flex justify-between w-full bg-white p-4">
            <div>
              {good?.amount}
              {good.unit}
            </div>
            <div>Value: ${good?.value ?? 0}</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full md:w-1/2 max-w-full overflow-y-scroll max-h-dvh">
        <DialogHeader className="flex flex-col w-full gap-2 pb-4 mb-4 border-b-[1px] border-b-gray-200 md:items-start items-center">
          <div className="h-full flex flex-col gap-2">
            <DialogTitle>{good.name}</DialogTitle>
            <div className="break-all text-sm text-gray-400">
              {good.description}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium">
            <div
              className={`px-2 py-1 ${catColor(good.Category.name)} text-white rounded-md`}
            >
              {good.Category.name}
            </div>
            <div className="px-2 py-1 bg-gray-100 rounded-md">
              {good.amount}
              {good.unit}
            </div>
            <div className="px-2 py-1 bg-gray-100 rounded-md">
              ${good.value}
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2 pt-2"
            >
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Amount" {...field} className="w-24" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-500 ml-2"
                disabled={(good?.amount ?? 0) < Number(form.watch("quantity"))}
              >
                Remove 🗑️
              </Button>
            </form>
          </Form>
        </DialogHeader>
        <ItemSelector
          itemIds={sortedItems.map((item) => item.id)}
          setItemId={setSelectedItem}
        />
        {sortedItems
          .filter((item) => item.id === selectedItem)
          .map((item, key) => (
            <ItemInfo key={key} itemId={item.id} />
          ))}
      </DialogContent>
    </Dialog>
  );
};
