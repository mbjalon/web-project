import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
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
import { useMemo } from "react";
import { useGetCoordinates } from "@/hooks/useShelves.ts";
import { pageSizes } from "@/utils/constants.ts";

export const FindShelvesSchema = z.object({
  row: z.string().optional(),
  position: z.string().optional(),
  level: z.string().optional(),
  pageSize: z.string().optional(),
});

export interface FindShelvesInputProps {
  onSubmit: (data: z.infer<typeof FindShelvesSchema>) => void;
}

const FindShelvesInput = ({ onSubmit }: FindShelvesInputProps) => {
  const { data: coords, error, isFetching } = useGetCoordinates();

  const form = useForm<z.infer<typeof FindShelvesSchema>>({
    resolver: zodResolver(FindShelvesSchema),
  });

  const rows = useMemo(() => {
    if (isFetching) return;
    return Array.from(
      new Set((coords?.data ?? []).map((coord) => coord.row?.toString())),
    );
  }, [coords, isFetching]);

  const positions = useMemo(() => {
    if (isFetching) return;
    return Array.from(
      new Set((coords?.data ?? []).map((coord) => coord.position?.toString())),
    ).concat(["-"]);
  }, [coords, isFetching]);

  const levels = useMemo(() => {
    if (isFetching) return;
    return Array.from(
      new Set((coords?.data ?? []).map((coord) => coord.level?.toString())),
    ).concat(["-"]);
  }, [coords, isFetching]);

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
            name="row"
            render={({ field }) => (
              <FormItem className="w-24">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Row" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rows?.map((row, key) => (
                      <SelectItem key={key} value={row ?? ""}>
                        {row}
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
            name="position"
            render={({ field }) => (
              <FormItem className="w-24">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {positions?.map((position, key) => (
                      <SelectItem key={key} value={position ?? ""}>
                        {position}
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
            name="level"
            render={({ field }) => (
              <FormItem className="w-24">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levels?.map((level, key) => (
                      <SelectItem key={key} value={level ?? ""}>
                        {level}
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

export default FindShelvesInput;
