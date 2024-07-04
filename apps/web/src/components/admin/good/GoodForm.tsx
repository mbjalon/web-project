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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Unit } from "@/types/types.ts";
import { useGetCategories } from "@/hooks/useCategories.ts";
import { GoodStore } from "@/models/good/good.ts";
import { useAtom } from "jotai/index";
import { warehouseCategoryParams } from "@/utils/atoms.ts";
import { units } from "@/utils/constants.ts";

export const GoodSchema = z.object({
  name: z.string(),
  description: z.string(),
  unit: z.enum([Unit.pcs, Unit.kg]),
  categoryName: z.string(),
});

export interface UserFormProps {
  onSubmit: (data: z.infer<typeof GoodSchema>) => void;
  good?: GoodStore;
}

export const GoodForm = ({ onSubmit, good }: UserFormProps) => {
  const [searchParams] = useAtom(warehouseCategoryParams);
  const { data } = useGetCategories(searchParams);

  const form = useForm<z.infer<typeof GoodSchema>>({
    resolver: zodResolver(GoodSchema),
    defaultValues: {
      name: good?.name ?? "",
      description: good?.description ?? "",
      unit: good?.unit ?? undefined,
      categoryName: good?.Category.name ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex md:flex-row flex-col break-all gap-4 items-center font-medium flex-wrap justify-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
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
                      {data?.data.map((category, key) => (
                        <SelectItem key={key} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit, key) => (
                        <SelectItem key={key} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
