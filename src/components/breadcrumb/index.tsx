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
          {!item?.to && (
            <span className="font-normal">{item?.label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;

// export default function BreadCrumb({ items }: BreadCrumbPropsType) {
//   return (
//     <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
//       <Link
//         href={"/dashboard"}
//         className="overflow-hidden text-ellipsis whitespace-nowrap"
//       >
//         Dashboard
//       </Link>
//       {items?.map((item: BreadCrumbType, index: number) => (
//         <React.Fragment key={item.title}>
//           <ChevronRightIcon className="h-4 w-4" />
//           <Link
//             href={item.link}
//             className={cn(
//               "font-medium",
//               index === items.length - 1
//                 ? "text-foreground pointer-events-none"
//                 : "text-muted-foreground",
//             )}
//           >
//             {item.title}
//           </Link>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
