import { ComponentProps, Fragment } from "react";

import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

type BreadCrumbProps = ComponentProps<"div"> & {
  items: BreadCrumb[];
};

const Breadcrumb = ({ items, ...rest }: BreadCrumbProps) => {
  return (
    <div {...rest} className={`flex items-center gap-2`}>
      {items?.map((item, index: number) => (
        <Fragment key={item.label}>
          {index !== 0 && <ChevronRightIcon className="h-4 w-4" />}
          {item?.to && (
            <Link
              to={item.to}
              className={cn("font-normal", "text-muted-foreground")}
            >
              {item.label}
            </Link>
          )}
          {!item?.to && <span className="font-normal">{item?.label}</span>}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
