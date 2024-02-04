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
import { useForgotPassword } from "./service";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const formSchema = z.object({
  email: z.string({ required_error: "You must provide an email" }).email(),
});
const ForgotPassword = () => {
  const { forgotPassword, forgotPasswordLoading } = useForgotPassword();
  const {
    register: form,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  watch("email");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    forgotPassword(values);
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
              placeholder="Email"
              disabled={forgotPasswordLoading}
              {...form("email")}
              label="Email"
              error={errors?.email?.message || ""}
            />

            <div>
              <Button
                disabled={forgotPasswordLoading || !getValues("email")}
                // loading={loginLoading}
                className="w-full"
              >
                {forgotPasswordLoading ? "Please Wait..." : "Reset"}
              </Button>
            </div>
            <CardFooter>
              <div className="flex justify-center w-full pt-2">
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
