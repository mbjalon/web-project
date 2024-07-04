import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryWithCount } from "@/models/category/category.ts";

export const CategorySchema = z.object({
  name: z.string(),
});

export interface CategoryFormProps {
  onSubmit: (data: z.infer<typeof CategorySchema>) => void;
  category?: CategoryWithCount;
}

export const CategoryForm = ({ onSubmit, category }: CategoryFormProps) => {
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex break-all gap-4 items-center font-medium ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
