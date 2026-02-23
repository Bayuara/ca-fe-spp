import { ReactNode, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OrderedList from "../layout/OrderedList";
import clsx from "clsx";

interface IAccordionDescription {
  label: string;
  instructions: ReactNode;
}

const AccordionDescription = (props: Partial<IAccordionDescription>) => {
  const { label, instructions = [] } = props;
  const [openSection, setOpenSection] = useState(false);

  const toggleSection = () => {
    setOpenSection(!openSection);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="w-full bg-putihLight px-6 rounded-lg border border-gray-400 space-y-4 phone:px-3.5"
      >
        <AccordionTrigger
          className={clsx(
            "flex justify-between items-center cursor-pointer text-xl phone:text-sm font-bold",
            {
              "border-black border-b pb-4": openSection,
            }
          )}
          onClick={toggleSection}
        >
          {label}
        </AccordionTrigger>
        {openSection && (
          <AccordionContent>
            <OrderedList instructions={instructions} />
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionDescription;
