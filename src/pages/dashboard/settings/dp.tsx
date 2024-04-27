import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDragAndDrop } from "@/shared/hooks/use-drag-drop";
import { useGetMe } from "@/shared/services/auth";
import { toast } from "sonner";

const Dp = ({
  edit,
  updateFile,
  disabled,
}: {
  edit: boolean;
  updateFile: (file: File) => void;
  disabled?: boolean;
}) => {
  const { me } = useGetMe();
  const { onDragOver, onDragLeave } = useDragAndDrop();
  const [rawFile, setRawFile] = useState<string | ArrayBuffer | null>();

  const readFile = (file: File) => {
    if (file.type !== "image/png" && file?.type !== "image/jpeg") {
      return toast("Invalid file type, please upload image", {
        duration: 5000,
      });
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setRawFile(reader.result);
    });
    reader.readAsDataURL(file);
    updateFile(file);
  };

  return (
    <div className="flex gap-5 items-center justify-center">
      <label
        htmlFor="file"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => {
          readFile(e.dataTransfer?.files?.[0]);
        }}
        className="cursor-pointer"
      >
        <Avatar className="h-[100px] w-[100px] relative ">
          <AvatarImage
            // @ts-ignore
            src={rawFile ? rawFile : me?.dp}
            alt="@shadcn"
            className="object-cover"
          />
          <AvatarFallback className="text-3xl">
            {me?.name?.split("")?.[0]}
          </AvatarFallback>
        </Avatar>
      </label>
      {edit ? (
        <Button variant={"secondary"} type="button">
          <label
            htmlFor="file"
            className="flex items-center cursor-pointer justify-center"
          >
            Upload Profile Picture
          </label>
        </Button>
      ) : null}
      <input
        type="file"
        accept=".png,.jpg"
        id="file"
        disabled={!edit || disabled}
        onChange={(e) => {
          if (e.target?.files?.[0]) readFile(e.target?.files?.[0]);
        }}
        style={{
          display: "none",
        }}
      />
    </div>
  );
};

export default Dp;
