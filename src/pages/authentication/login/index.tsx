import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "./service";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const formSchema = z.object({
  username: z.string({ required_error: "You must provide an email/username" }),
  password: z.string({ required_error: "You must provide a password" }),
});
const Login = () => {
  const { login, loginLoading } = useLogin();
  const {
    register: form,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  watch("username");
  watch("password");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values);
  };
  return (
    <div className="flex justify-center items-center min-h-[100dvh]">
      <Card className="max-w-[500px] w-[80%] animate-slide-up-and-fade">
        <CardHeader>
          <CardTitle className="text-center flex justify-center flex-col gap-3 items-center">
            <Logo height={50} />
            RKPK
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              placeholder="Username"
              disabled={loginLoading}
              {...form("username")}
              label="Username"
              error={errors?.username?.message || ""}
            />

            <Input
              placeholder="Password"
              type="password"
              label="Password"
              disabled={loginLoading}
              {...form("password")}
              error={errors?.password?.message || ""}
            />

            <div>
              <Button
                disabled={
                  loginLoading ||
                  !getValues("username") ||
                  !getValues("password")
                }
                // loading={loginLoading}
                className="w-full"
              >
                {loginLoading ? "Please Wait..." : "Login"}
              </Button>
            </div>
            <CardFooter>
              <div className="flex justify-center w-full pt-2">
                <Link to="/forgot-password" className="text-primary">
                  Forgot Password?
                </Link>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
