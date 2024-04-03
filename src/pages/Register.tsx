import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  z } from "zod";
import * as apiClient from "../api_Client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const formSchema = z.object({
  firstName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({ message: "Please Enter email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  })
}).refine(data => data.confirmPassword === data.password, {
  message: "Password don't Match",
  path: ["confirmPassword"]
})
type ErrorMessage = {
  response: {
      data: {
          message: string
      }
  }
}
const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },

  });
  const {mutate,isLoading} = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      await queryClient.invalidateQueries("fetchCurrentUser");
      toast.success("Registration Success!")
      navigate("/");
    },
    onError: (error: ErrorMessage) => {
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.confirmPassword !== values.password) return;
    mutate(values);
  }
  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col   items-center  "
      >
        <div className="w-[450px]   space-y-3 shadow-lg bg-white rounded-md px-3 py-2">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your firstname" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your lastname" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    {...field}
                  />
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmpassword</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your confirmpassword"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? "Submitting..." : "Register"}</Button>
          <h1 className="">Already have an Account ? <Link className="text-md tracking-tight font-bold hover:underline" to={"/signin"}>SignIn</Link></h1>
        </div>
      </form>
    </Form>
  );
};

export default Register;
