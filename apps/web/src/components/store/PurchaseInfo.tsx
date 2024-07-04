import { useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { usePurchaseGood } from "@/hooks/useGoods";
import { isNumber } from "@/utils/isNumber.ts";
import { isFloatOrNumber } from "@/utils/isFloatOrNumber";

export interface PurchaseInfoProps {
  goodId: number;
  goodName: string;
}

const PurchaseInfoSchema = z.object({
  amount: z.string(),
  pricePerUnit: z.string(),
});

export const PurchaseInfo = ({ goodId, goodName }: PurchaseInfoProps) => {
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { mutateAsync, error } = usePurchaseGood(goodId);

  const form = useForm<z.infer<typeof PurchaseInfoSchema>>({
    resolver: zodResolver(PurchaseInfoSchema),
    defaultValues: {
      amount: "",
      pricePerUnit: "",
    },
  });

  const updateTotalPrice = useCallback(() => {
    const amount = parseFloat(form.getValues("amount")) || 0;
    const pricePerUnit = parseFloat(form.getValues("pricePerUnit")) || 0;
    setTotalPrice(amount * pricePerUnit);
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (name === "amount" || name === "pricePerUnit") {
        updateTotalPrice();
      }
    });

    return () => subscription.unsubscribe();
  }, [form, updateTotalPrice]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof PurchaseInfoSchema>) => {
      await mutateAsync({
        userId: sessionStorage.getItem("userId") ?? "",
        amount: data.amount,
        pricePerUnit: data.pricePerUnit,
      });
      if (error) {
        alert(error?.message);
      }
      setOpen(false);
    },
    [mutateAsync, error],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="ml-4 text-lg px-4">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-xl">
            How many {goodName}'s you want to log?
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-row items-start font-medium"
          >
            <div className="flex break-all items-center font-medium py-2">
              <div className="mr-2 font-semibold">Add:</div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        className="w-14 text-right"
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
              <div className="w-max font-semibold ml-2 mr-2">pieces for</div>
              <FormField
                control={form.control}
                name="pricePerUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        {...field}
                        className="w-16 text-right"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (isFloatOrNumber(value) || value === "") {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="ml-2">$ /piece</div>
            </div>

            <div className="w-full flex justify-between mt-4">
              <div className="pt-1">Total price: {totalPrice.toFixed(2)} $</div>
              <Button type="submit" className="px-6">
                Log
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
