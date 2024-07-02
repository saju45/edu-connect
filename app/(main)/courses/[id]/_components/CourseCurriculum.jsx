import {
  BookCheck,
  Clock10,
  FileQuestion,
  NotepadText,
  Radio,
  StickyNote,
  Tv,
  Video,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import CourseModuleList from "./module/CourseModuleList";

function CourseCurriculum({course}) {
  const totalDuration = course?.modules.reduce(function (acc, obj) { return acc + obj.duration; }, 0);

  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {totalDuration} Hours
        </span>
        
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible
        className="w-full"
      >
        {
          course?.modules && course?.modules.map((module,index)=>(
            <CourseModuleList key={index} module={module}/>
          ))
        }
   
      </Accordion>
    </>
  );
}

export default CourseCurriculum;
