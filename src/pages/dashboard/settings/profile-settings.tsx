import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";

import { ReactNode, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Dp from "./dp";
import { PhoneInput } from "@/components/ui/phone-input";
import phone from "phone";
import { useGetMe } from "@/shared/services/auth";
import { useEditUser, useUploadDP } from "@/shared/services/users";

const isValidPhoneNumber = (value: any) => {
  if (!value) {
    return false;
  }
  let phoneNumber = value?.startsWith("+") ? value : "+" + value;
  return phone(phoneNumber)?.isValid;
};

const ProfileSettings = () => {
  const { me, meRefetch } = useGetMe();
  const [file, setFile] = useState<File | null>(null);
  const [edit, setEdit] = useState(false);

  const formSchema = z.object(
    !edit
      ? {}
      : {
          name: z.string().optional(),
          phoneNumber: z
            .custom(isValidPhoneNumber, {
              message: "Invalid phone number",
            })
            .optional(),
        }
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: me?.name,
      phoneNumber: "",
    },
  });

  const { editUser, editUserLoading } = useEditUser(me?.id, () => {
    if (file) {
      return upload(file).then(() => {
        setFile(null);
        setEdit(false);
        meRefetch();
      });
    }
    setEdit(false);
    meRefetch();
  });
  const { upload, uploadLoading } = useUploadDP();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (edit)
      editUser({
        name: values?.name,
        phoneNumber: values?.phoneNumber,
      });
    else setEdit(true);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="flex flex-row flex-wrap justify-between items-center">
            <h2 className="text-2xl font-bold">Profile</h2>
            <div className="flex gap-3">
              {edit && (
                <Button
                  variant={"outline"}
                  onClick={() => setEdit(false)}
                  disabled={uploadLoading || editUserLoading}
                  type="button"
                >
                  Cancel
                </Button>
              )}
              <Button
                disabled={uploadLoading || editUserLoading}
                onClick={() => {
                  form.handleSubmit(onSubmit);
                }}
              >
                {uploadLoading || editUserLoading ? "Please Wait" : "Edit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Dp
              edit={edit}
              disabled={uploadLoading || editUserLoading}
              updateFile={(file) => setFile(file)}
            />
            <br />
            <br />
            <div className="flex flex-wrap gap-5">
              <div className="md:w-[45%] w-[100%]">
                <LabelContentContainer
                  label="Name"
                  id="name"
                  content={
                    edit ? (
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="name"
                                disabled={uploadLoading || editUserLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      me?.name
                    )
                  }
                />
              </div>
              <div className="md:w-[45%] w-[100%]">
                <LabelContentContainer
                  label="Phone Number"
                  id="phoneNumber"
                  content={
                    edit ? (
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <PhoneInput
                                {...field}
                                placeholder="+255 650 000 000"
                                variant={
                                  form.getFieldState(field.name).error
                                    ? "error"
                                    : "default"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      "***********"
                    )
                  }
                />
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettings;

export const LabelContentContainer = ({
  label,
  id,
  content,
}: {
  label: string;
  content: ReactNode;
  id?: string;
}) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <div className="w-[100%]">
        <label htmlFor={id} className="flex justify-start">
          {label}:
        </label>
      </div>
      <div className="w-[100%] break-all">{content}</div>
    </div>
  );
};
