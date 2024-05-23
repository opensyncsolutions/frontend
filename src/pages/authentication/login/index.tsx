import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardTitle,
  // CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "./service";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useEffect } from "react";
import { useWindowSize } from "@/shared/hooks/use-window-size";

const formSchema = z.object({
  username: z.string({ required_error: "You must provide an email/username" }),
  password: z.string({ required_error: "You must provide a password" }),
});
const Login = () => {
  const { login, loginLoading } = useLogin();
  const { width } = useWindowSize();
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

  useEffect(() => {
    document.documentElement.style.background = "rgba(8, 55, 66, 1)";
  }, []);

  return (
    <div
      className=""
      style={{
        backgroundImage: "url(/images/bg.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
        backgroundSize: "cover",
      }}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto py-12 flex flex-col justify-between gap-6 min-h-[100dvh]">
        <div className="flex justify-between items-center">
          <span>
            <Logo />
          </span>
          <Button
            formTarget="_blank"
            onClick={() => window.open("https://opensync.solutions/support")}
            variant={"outline"}
            className="bg-transparent text-neutral-100 !border-primary-100 border-2"
          >
            Support
          </Button>
        </div>
        <div className="flex justify-center items-center gap-8">
          {width > 650 ? (
            <div>
              <Logo icon className="h-[300px]" height={400} />
            </div>
          ) : null}
          <Card className="max-w-[500px] w-[80%] animate-slide-up-and-fade bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-left text-neutral-100">
                Login
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
                  labelClassName="text-neutral-100"
                  className="bg-transparent border-primary-100 text-neutral-100"
                  error={errors?.username?.message || ""}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  label="Password"
                  disabled={loginLoading}
                  {...form("password")}
                  labelClassName="text-neutral-100"
                  className="bg-transparent border-primary-100 text-neutral-100"
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
                    className="bg-transparent text-neutral-100 !border-primary-100 border-2 w-[200px]"
                    variant={"outline"}
                  >
                    {loginLoading ? "Please Wait..." : "Login"}
                  </Button>
                </div>
                {/* <CardFooter>
              <div className="flex justify-center w-full pt-2">
                <Link to="/forgot-password" className="text-primary">
                  Forgot Password?
                </Link>
              </div>
            </CardFooter> */}
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="text-neutral-100 text-center space-y-3 text-sm font-[500]">
          <div
            style={{
              backgroundImage: "url(/images/line.svg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
            className="h-[1px] w-full mb-6"
          />
          <p>{new Date().getFullYear()} © OPENSYNC - ALL RIGHTS RESERVED</p>
          <p>POWERED BY RASELLO &copy;</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
