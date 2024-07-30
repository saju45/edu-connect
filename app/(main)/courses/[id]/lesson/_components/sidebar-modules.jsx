"use client";
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
import { replaceMongoIdInArray } from "@/lib/convertData";
import { useSearchParams } from "next/navigation";
export const SidebarModules=({courseId,modules})=>{

  const searchParams=useSearchParams()
  const allModules = replaceMongoIdInArray(modules).toSorted((a, b) => a.order - b.order);

  const query=searchParams.get("name");
  const expendedModule=allModules.find((module)=>{
    return module.lessonIds.find((lesson)=>{
      return lesson.slug===query
        })
  });

  const expendedModuleId=expendedModule?.id??allModules[0].id;


    return(
        <Accordion
        defaultValue={expendedModuleId}
        type="single"
        collapsible
        className="w-full px-6"
      >
        {/* item */}
      

    
     {   allModules?.map((module) =>(
          <AccordionItem key={module?.id} className="border-0" value={module.id}>
          <AccordionTrigger>{module?.title}</AccordionTrigger>
         <SidebarLesson courseId={courseId} lessons={module?.lessonIds} module={module?.slug}/>
         
        </AccordionItem>
        ))
        }
     
        {/* item ends */}

      

      
      </Accordion>
    )
}