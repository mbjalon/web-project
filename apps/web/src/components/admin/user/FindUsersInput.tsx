import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { pageSizes, roles } from "@/utils/constants.ts";

export const FindUsersSchema = z.object({
  email: z.string().optional(),
  role: z.string().optional(),
  pageSize: z.string().optional(),
});

export interface FindUsersInputProps {
  onSubmit: (data: z.infer<typeof FindUsersSchema>) => void;
}

const FindUsersInput = ({ onSubmit }: FindUsersInputProps) => {
  const form = useForm<z.infer<typeof FindUsersSchema>>({
    resolver: zodResolver(FindUsersSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center gap-4 md:w-3/4 flex-wrap  justify-center md:justify-start"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.concat(["-"]).map((role, key) => (
                    <SelectItem value={role} key={key}>
                      {role}
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
    </Form>
  );
};

export default FindUsersInput;
