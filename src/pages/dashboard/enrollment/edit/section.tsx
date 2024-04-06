import { Control, FieldErrors } from "react-hook-form";
import FieldItem from "./field-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/shared/contexts/languages";

const Section = ({
  fields,
  section,
  errors,
  control,
  index,
}: {
  section?: Section;
  fields: Field[];
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
  index: number;
}) => {
  const { language } = useLanguage();
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border rounded"
      defaultValue={index === 1 ? "item-1" : undefined}
    >
      <AccordionItem value="item-1" defaultChecked={index === 1}>
        <AccordionTrigger className="px-4">
          <h3>
            {section?.translations?.[language]?.name ||
              section?.name ||
              "Others"}
          </h3>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {fields
              ?.sort((a, b) => a.sortOrder - b.sortOrder)
              ?.map((field) => (
                <FieldItem
                  field={field}
                  errors={errors}
                  control={control}
                  key={field?.id}
                />
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Section;
