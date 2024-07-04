import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { cn } from "@/lib/utils.ts";

export interface ItemSelectorProps {
  itemIds: number[];
  setItemId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ItemSelectorSchema = z.object({
  itemId: z.coerce.number(),
});

export const ItemSelector = ({ itemIds, setItemId }: ItemSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof ItemSelectorSchema>>({
    resolver: zodResolver(ItemSelectorSchema),
  });

  function onSubmit(data: z.infer<typeof ItemSelectorSchema>) {
    setItemId(data.itemId);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 md:flex-row flex-col items-center"
      >
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={open}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                      onClick={() => setOpen((open) => !open)}
                    >
                      {field.value
                        ? itemIds.find((id) => id === field.value)
                        : "Select an item ..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search item..." />
                    <CommandList>
                      <CommandEmpty>No item found</CommandEmpty>
                      <CommandGroup>
                        {itemIds.map((item) => (
                          <CommandItem
                            key={item}
                            value={item.toString()}
                            onSelect={() => {
                              form.setValue("itemId", item);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                item === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {item}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-700 hover:bg-blue-500">
          Show Details
        </Button>
      </form>
    </Form>
  );
};
