

import {
    AccordionContent,
    
  } from "@/components/ui/accordion";

import { SidebarLessonItem } from "./sidebar-lesson-items";
import { replaceMongoIdInArray } from "@/lib/convertData";
export const SidebarLesson=({courseId,lessons,module})=>{
 
  const allLessons = replaceMongoIdInArray(lessons).toSorted(
    (a, b) => a.order - b.order
  );

    return(
        <AccordionContent>
        <div className="flex flex-col w-full gap-3">
          {/* active and completed */}
          {allLessons.map((lesson) => (
                <SidebarLessonItem
                    key={lesson.id}
                    courseId={courseId}
                    lesson={lesson}
                    module={module}/>
            ))}
         
        </div>
      </AccordionContent>
    )
}