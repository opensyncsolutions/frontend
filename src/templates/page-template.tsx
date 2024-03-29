import { ReactNode, useLayoutEffect } from "react";
import Tabs, { Tab } from "@/components/tabs";
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
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="space-y-8 pt-4 md:pt-8 px-6 md:pt-4 animate-fade-in gap-4 sticky top-[55px] md:top-[40px] !z-10 bg-white pb-[8px]">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex flex-col gap-2 relative">
            {breadCrumb?.length ? <Breadcrumb items={breadCrumb} /> : null}
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          </div>
          <div className="items-center space-x-2">{titleActions}</div>
        </div>
        {tabs?.length ? <Tabs tabs={tabs} tabKey={tabKey} /> : null}
      </div>
      <div className="flex-1 z-1 space-y-8 py-4 md:py-8 px-6 md:pt-4 animate-fade-in ">
        <div>{children}</div>
      </div>
    </>
  );
};

export default PageTemplate;
