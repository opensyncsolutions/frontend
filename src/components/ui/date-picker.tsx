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
  placeholder = "Pick a date",
}: {
  value?: Date;
  onChange?: (date?: Date | undefined) => void;
  error?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
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
            {date ? format(date, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            disabled={disabled}
            defaultMonth={date}
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
  placeholder = "Pick a date",
}: {
  value: DateRange;
  onChange: (date?: DateRange) => void;
  error?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
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
              "w-full justify-start text-left text-xs font-normal truncated",
              !date && "text-muted-foreground",
              error ? "border-red-500" : ""
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 min-w-4" />
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
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={date}
            toDate={new Date()}
            disabled={disabled}
            onSelect={(date) => onChange?.(date)}
            initialFocus
            defaultMonth={date?.from}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default DatePicker;
