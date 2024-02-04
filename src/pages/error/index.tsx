import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorPageProps = {
  message: string;
  refetch: () => void;
  retryText?: string;
  padding?: number;
  className?: string;
};

const Error = ({
  message,
  refetch,
  retryText,
  padding = 0,
  className,
}: ErrorPageProps) => {
  return (
    <div
      style={{
        width: "100%",
        padding,
      }}
      className={cn(
        "flex flex-col items-center justify-center h-full max-w-[80%] gap-4 m-auto",
        className
      )}
    >
      <Alert variant="destructive">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button onClick={refetch}>{retryText || "Retry"}</Button>
    </div>
  );
};

export default Error;
