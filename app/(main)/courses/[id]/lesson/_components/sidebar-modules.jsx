
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import { SidebarLesson } from "./sidebar-lesson";
export const SidebarModules=()=>{

    return(
        <Accordion
        defaultValue="item-1"
        type="single"
        collapsible
        className="w-full px-6"
      >
        {/* item */}
        <AccordionItem className="border-0" value="item-1">
          <AccordionTrigger>Introduction </AccordionTrigger>
         <SidebarLesson/>
         
        </AccordionItem>
        {/* item ends */}

      

      
      </Accordion>
    )
}