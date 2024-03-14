import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";
import { DateRange } from "react-day-picker";

const dateFormat = "dd-MM-yyyy";

const DatePicker = ({
  value: date,
  onChange,
  error,
  label,
  disabled,
}: {
  value?: DateRange;
  onChange?: (date?: DateRange | undefined) => void;
  error?: string;
  label?: string;
  disabled?: boolean;
}) => {
  return (
    <div>
      {label && (
        <Label className={cn(error ? "text-red-500" : "")}>{label}</Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error ? "border-red-500" : ""
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, dateFormat)} -{" "}
                  {format(date.to, dateFormat)}
                </>
              ) : (
                format(date.from, dateFormat)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            fromDate={new Date()}
            disabled={disabled}
            selected={date}
            onSelect={(date) => onChange?.(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export const DateRangePicker = ({
  value: date,
  onChange,
  error,
  label,
  disabled,
}: {
  value: DateRange;
  onChange: (date?: DateRange) => void;
  error?: string;
  label?: string;
  disabled?: boolean;
}) => {
  return (
    <div>
      {label && (
        <Label className={cn(error ? "text-red-500" : "")}>{label}</Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error ? "border-red-500" : ""
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date?.from ? date?.from?.toISOString() : "", "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode={"range"}
            fromDate={new Date()}
            disabled={disabled}
            selected={date}
            onSelect={(date: DateRange | undefined) => onChange(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default DatePicker;
