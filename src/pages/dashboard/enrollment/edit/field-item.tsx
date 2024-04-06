import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/select-input";
import { Switch } from "@/components/ui/switch";
import { DATE_FORMAT } from "@/shared/constants/constants";
import {
  capitalizeFirstLetter,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import { format, parse } from "date-fns";
import { Control, Controller, FieldErrors } from "react-hook-form";

const FieldItem = ({
  field: { name, type, options },
  control,
  errors,
}: {
  field: Field;
  errors: FieldErrors<{
    [x: string]: any;
  }>;
  control: Control<
    {
      [x: string]: any;
    },
    any,
    {
      [x: string]: any;
    }
  >;
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          if (type === "TEXT" && !options)
            return (
              <Input
                label={capitalizeFirstLetter(separateTextOnCapitalLetter(name))}
                placeholder={`Enter ${separateTextOnCapitalLetter(name)}`}
                {...field}
                error={(errors?.[name]?.message as string) || ""}
              />
            );
          if (type === "NUMBER" && !options)
            return (
              <Input
                label={capitalizeFirstLetter(separateTextOnCapitalLetter(name))}
                placeholder={`Enter ${separateTextOnCapitalLetter(name)}`}
                type="number"
                {...field}
                error={(errors?.[name]?.message as string) || ""}
              />
            );
          if (options) {
            const option = options.find(
              (option) => option?.value === field?.value
            );
            let value: Record<"value" | "label" | "name", string> | undefined =
              option
                ? {
                    ...option,
                    label: option?.name,
                  }
                : undefined;

            return (
              <SelectInput
                options={options.map((option) => ({
                  ...option,
                  label: option?.name,
                }))}
                label={capitalizeFirstLetter(separateTextOnCapitalLetter(name))}
                placeholder={`Enter ${separateTextOnCapitalLetter(name)}`}
                {...field}
                onChange={(e) => {
                  field?.onChange(e.value);
                }}
                value={value}
                error={(errors?.[name]?.message as string) || ""}
              />
            );
          }

          if (type === "DATE") {
            return (
              <DatePicker
                label={capitalizeFirstLetter(separateTextOnCapitalLetter(name))}
                placeholder={`Select ${separateTextOnCapitalLetter(name)}`}
                {...field}
                value={
                  field?.value
                    ? parse(
                        format(field?.value, DATE_FORMAT),
                        DATE_FORMAT,
                        new Date()
                      )
                    : undefined
                }
                onChange={(date) => {
                  field.onChange(date?.toISOString());
                }}
                error={(errors?.[name]?.message as string) || ""}
              />
            );
          }
          if (type === "BOOLEAN") {
            return (
              <div className="flex items-center gap-4">
                <Switch
                  {...field}
                  checked={field?.value}
                  onCheckedChange={(e) => {
                    field?.onChange(e);
                  }}
                />
                {capitalizeFirstLetter(separateTextOnCapitalLetter(name))}
              </div>
            );
          }
          return <>{name}</>;
        }}
      />
    </div>
  );
};

export default FieldItem;
