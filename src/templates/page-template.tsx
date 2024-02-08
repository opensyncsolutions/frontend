import { ReactNode } from "react";
import Tabs, { Tab } from "@/components/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Breadcrumb from "@/components/breadcrumb";

export interface PageTemplateProps {
  children: ReactNode;
  title: ReactNode;
  breadCrumb?: BreadCrumb[];
  titleActions?: ReactNode;
  tabs?: Tab[];
  tabKey?: string;
}

const PageTemplate = ({
  title,
  titleActions,
  tabs,
  breadCrumb,
  children,
  tabKey,
}: PageTemplateProps) => {
  return (
    <ScrollArea>
      <div className="flex-1 space-y-8 py-4 md:py-8 px-6 md:pt-4 animate-fade-in">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            {breadCrumb?.length ? <Breadcrumb items={breadCrumb} /> : null}
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          </div>
          <div className="items-center space-x-2">{titleActions}</div>
        </div>
        <Tabs
          tabs={tabs?.length ? tabs : []}
          tabKey={tabKey}
          className="space-y-4"
        >
          {children}
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default PageTemplate;
