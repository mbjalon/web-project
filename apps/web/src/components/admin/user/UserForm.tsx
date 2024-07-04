import { z } from "zod";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { UserWithId } from "@/models/user/user.ts";
import { roles } from "@/utils/constants.ts";
import { UserRole } from "@/types/types.ts";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string().optional(),
  role: z.nativeEnum(UserRole),
});

export interface UserFormProps {
  onSubmit: (data: z.infer<typeof UserSchema>) => void;
  user?: UserWithId;
  isRegistration?: boolean;
}

export const UserForm = ({ onSubmit, user, isRegistration }: UserFormProps) => {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: isRegistration
      ? {
          email: "",
          password: "",
          confirmPassword: "",
          role: undefined,
        }
      : {
          email: user?.email,
          password: user?.password,
          role: user?.role,
        },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 pt-4"
      >
        <div className="flex flex-col break-all gap-4 items-center font-medium ">
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
          {isRegistration && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((category, key) => (
                      <SelectItem key={key} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
