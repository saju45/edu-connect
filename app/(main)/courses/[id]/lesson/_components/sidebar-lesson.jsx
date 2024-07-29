

import {
    AccordionContent,
    
  } from "@/components/ui/accordion";

import { SidebarLessonItem } from "./sidebar-lesson-items";
export const SidebarLesson=()=>{
 
    return(
        <AccordionContent>
        <div className="flex flex-col w-full gap-3">
          {/* active and completed */}
         <SidebarLessonItem/>
         
        </div>
      </AccordionContent>
    )
}