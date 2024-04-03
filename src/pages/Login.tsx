import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
type ErrorMessage = {
    response: {
        data: {
            message: string
        }
    }
}

const formSchema = z.object({
    email: z.string().email({ message: "Please Enter email address" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});
const Login = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { mutate, isLoading } = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            await queryClient.invalidateQueries("fetchCurrentUser");
            toast.success("Sign in Successful!");
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: ErrorMessage) => {
            toast.error(error.response.data.message);
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col items-center  "
            >
                <div className="w-[450px]  space-y-3 shadow-lg bg-white rounded-md px-3 py-2">
                    <h1 className="text-3xl font-bold">Login</h1>
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
                    <Button type="submit">{isLoading ? "Logging..." : "Login"}</Button>
                    <h1 className="">Don't have an Account ? <Link className="text-md tracking-tight font-bold hover:underline" to={"/signup"}>SignUp</Link></h1>
                </div>
            </form>
        </Form>
    );
};

export default Login;
