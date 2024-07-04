import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { pageSizes } from "@/utils/constants.ts";

export const FindCategoriesSchema = z.object({
  name: z.string(),
  pageSize: z.string().optional(),
});

export interface FindCategoriesInputProps {
  onSubmit: (data: z.infer<typeof FindCategoriesSchema>) => void;
}

const FindCategoriesInput = ({ onSubmit }: FindCategoriesInputProps) => {
  const form = useForm<z.infer<typeof FindCategoriesSchema>>({
    resolver: zodResolver(FindCategoriesSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center gap-4 md:w-3/4  justify-center md:justify-start"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Categories" {...field} />
              </FormControl>
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
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
};

export default FindCategoriesInput;
