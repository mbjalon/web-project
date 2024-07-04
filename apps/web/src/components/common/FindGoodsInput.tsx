import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetCategories } from "@/hooks/useCategories.ts";
import { pageSizes } from "@/utils/constants.ts";
import { warehouseCategoryParams } from "@/utils/atoms.ts";
import { useAtom } from "jotai/index";

export const FindGoodsSchema = z.object({
  name: z.string(),
  categoryName: z.string(),
  pageSize: z.string().optional(),
});

export interface FindGoodsInputProps {
  onSubmit: (data: z.infer<typeof FindGoodsSchema>) => void;
}

const FindGoodsInput = ({ onSubmit }: FindGoodsInputProps) => {
  const [searchParams] = useAtom(warehouseCategoryParams);
  const { data, error, isFetching } = useGetCategories(searchParams);
  const form = useForm<z.infer<typeof FindGoodsSchema>>({
    resolver: zodResolver(FindGoodsSchema),
    defaultValues: {
      name: "",
    },
  });

  if (error) {
    return (
      <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px]">
        Error: {error.message}
      </div>
    );
  }

  return (
    <Form {...form}>
      {!isFetching && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-center gap-4 md:w-3/4 flex-wrap justify-center md:justify-start"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Goods" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.data
                      .map((category) => category.name)
                      .concat(["-"])
                      .map((category, key) => (
                        <SelectItem key={key} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pageSize"
            render={({ field }) => (
              <FormItem className="w-20">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={sessionStorage.getItem("pageSize") ?? "24"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizes.map((size, key) => (
                      <SelectItem key={key} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      )}
    </Form>
  );
};

export default FindGoodsInput;
