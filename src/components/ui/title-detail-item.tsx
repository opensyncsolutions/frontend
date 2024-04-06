import { ReactNode } from "react";

const TitleDetailItem = ({
  title,
  content,
}: {
  title: ReactNode;
  content: ReactNode;
}) => {
  return (
    <div className="space-y-2">
      <p className="text-neutral-500 text-sm">{title}</p>
      <p className="font-bold whitespace-pre-line break-words text-sm">
        {content}
      </p>
    </div>
  );
};

export default TitleDetailItem;
