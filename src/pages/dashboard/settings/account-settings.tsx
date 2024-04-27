import { CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LabelContentContainer } from "./profile-settings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/shared/services/auth";
import { useEditUser } from "@/shared/services/users";

const AccountSetting = () => {
  return (
    <div className="">
      <CardHeader>
        <h2 className="text-2xl font-bold">Account</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-5">
          <div className="md:w-[45%] w-[100%]">
            <Username />
          </div>
          <div className="md:w-[45%] w-[100%]">
            <Email />
          </div>
          <div className="md:w-[45%] w-[100%]">
            <Password />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default AccountSetting;

const emailFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, {
      message: "Email cannot be empty",
    })
    .email(),
});
const Email = () => {
  const { me, meRefetch } = useGetMe();
  const [edit, setEdit] = useState(false);
  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {},
  });
  const { editUser, editUserLoading } = useEditUser(me?.id, () => meRefetch());
  const onSubmit = (values: z.infer<typeof emailFormSchema>) => {
    editUser(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <LabelContentContainer
          label={"Email"}
          id="email"
          content={
            edit ? (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="email"
                          {...field}
                          error={form?.formState?.errors?.email?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <div className="flex gap-2">
                  <Button
                    variant={"outline"}
                    onClick={() => setEdit(false)}
                    type="button"
                    disabled={editUserLoading}
                  >
                    Cancel
                  </Button>
                  <Button disabled={editUserLoading}>
                    {editUserLoading ? "Please wait" : "Submit"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-3 items-center">
                {"***********"}
                <Button
                  variant={"ghost"}
                  onClick={() => setEdit(true)}
                  color="primary"
                  className="text-blue-500 p-0"
                >
                  Edit
                </Button>
              </div>
            )
          }
        />
      </form>
    </Form>
  );
};

const passwordFormSchema = z.object({
  password: z.string({ required_error: "Password is required" }).min(1, {
    message: "Password cannot be empty",
  }),
});

const Password = () => {
  const { me, meRefetch } = useGetMe();
  const [edit, setEdit] = useState(false);
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
    },
  });
  const { editUser, editUserLoading } = useEditUser(me?.id, () => meRefetch());
  const onSubmit = (values: z.infer<typeof passwordFormSchema>) => {
    editUser({
      password: values?.password,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <LabelContentContainer
          label={"Password"}
          id="password"
          content={
            edit ? (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          {...field}
                          error={form?.formState?.errors?.password?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <br />
                <div className="flex gap-2">
                  <Button
                    variant={"outline"}
                    onClick={() => setEdit(false)}
                    type="button"
                    disabled={editUserLoading}
                  >
                    Cancel
                  </Button>
                  <Button disabled={editUserLoading}>
                    {editUserLoading ? "Please wait" : "Submit"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-3 items-center">
                ***********{" "}
                <Button
                  variant={"ghost"}
                  onClick={() => setEdit(true)}
                  color="primary"
                  className="text-blue-500 p-0"
                >
                  Edit
                </Button>
              </div>
            )
          }
        />
      </form>
    </Form>
  );
};

const usernameFormSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(1, {
    message: "Username cannot be empty",
  }),
});

const Username = () => {
  const { me, meRefetch } = useGetMe();
  const [edit, setEdit] = useState(false);
  const form = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: me?.username,
    },
  });
  const { editUser, editUserLoading } = useEditUser(me?.id, () => meRefetch());
  const onSubmit = (values: z.infer<typeof usernameFormSchema>) => {
    editUser(values).then(() => {
      meRefetch();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <LabelContentContainer
          label={"Username"}
          id="username"
          content={
            edit ? (
              <>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="username"
                          {...field}
                          error={form?.formState?.errors?.username?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <div className="flex gap-2">
                  <Button
                    variant={"outline"}
                    onClick={() => setEdit(false)}
                    type="button"
                    disabled={editUserLoading}
                  >
                    Cancel
                  </Button>
                  <Button disabled={editUserLoading}>
                    {editUserLoading ? "Please wait" : "Submit"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-3 items-center">
                {me?.username}{" "}
                <Button
                  variant={"ghost"}
                  onClick={() => setEdit(true)}
                  color="primary"
                  className="text-blue-500 p-0"
                >
                  Edit
                </Button>
              </div>
            )
          }
        />
      </form>
    </Form>
  );
};
