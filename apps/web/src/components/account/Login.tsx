import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "@/hooks/useUsers.ts";

const loginFormSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
});

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useLoginUser();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const res = await mutateAsync(values);
    sessionStorage.setItem("userId", JSON.stringify(res.id));
    sessionStorage.setItem("userRole", JSON.stringify(res.role));
    navigate("/search-shelves");
  }

  return (
    <div className="flex flex-col items-center mx-2 md:mx-0 mt-[72px] font-medium">
      <h2 className="mb-10 mt-20 text-4xl">Login</h2>
      <div className="md:w-8/12 lg:w-1/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-blue-500" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
