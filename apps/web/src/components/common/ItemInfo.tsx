import { useGetItem } from "@/hooks/useItems";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { SelectShelf } from "@/components/common/SelectShelf.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "react-qr-code";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { useNavigate } from "react-router-dom";
import { isNumber } from "@/utils/isNumber.ts";

export const MoveItemAmountSchema = z.object({
  amount: z.string(),
});

export interface ItemInfoProps {
  itemId: number;
}

export const ItemInfo = ({ itemId }: ItemInfoProps) => {
  const [open, setOpen] = useState(false);

  const { data: item, error, isFetching } = useGetItem(itemId);

  const nav = useNavigate();

  const form = useForm<z.infer<typeof MoveItemAmountSchema>>({
    resolver: zodResolver(MoveItemAmountSchema),
    defaultValues: { amount: "" },
  });

  const onSubmit = () => {
    setOpen(true);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px]">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      {!isFetching && (
        <div className="flex md:flex-row flex-col items-center justify-between gap-4">
          <div className="flex flex-col gap-4 w-max  rounded-sm border-black border-2 p-4">
            <div className="flex justify-between">
              <span>Amount:</span>
              <span>{item?.data.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Shelf: </span>
              <span>{`${item?.data.Shelf.row.toString() ?? "xx"}-${
                item?.data.Shelf.position.toString() ?? "xx"
              }-${item?.data.Shelf.level.toString() ?? "xx"}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Price/pc: </span>
              <span>{item?.data.pricePerUnit} $</span>
            </div>
            <div className="flex justify-between">
              <span>Total price: </span>
              <span>
                {(
                  (item?.data.pricePerUnit ?? 0) * (item?.data.quantity ?? 0)
                ).toFixed(2)}{" "}
                $
              </span>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-4"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Amount"
                          {...field}
                          className="w-24"
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
                <Button
                  type="submit"
                  disabled={
                    (item?.data.quantity ?? 0) < Number(form.watch("amount"))
                  }
                >
                  Move
                </Button>
                <SelectShelf
                  itemId={item?.data.id ?? -1}
                  open={open}
                  setOpen={setOpen}
                  amount={Number(form.getValues("amount"))}
                />
              </form>
            </Form>
            <Button
              onClick={() => {
                nav(`/item?itemId=${itemId}`);
              }}
            >
              Print
            </Button>
          </div>
          <div className="flex flex-col">
            <QRCode value={`https://items/${item?.data.id}`} />
          </div>
        </div>
      )}
    </div>
  );
};
