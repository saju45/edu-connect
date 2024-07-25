"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { changeCoursePublishedState, deletecourse } from "@/app/actions/course";
import { toast } from "sonner";

export const CourseActions = ({ course,courseId}) => {
  const [action,setAction]=useState(null);
    const [published,setPublished]=useState(course?.active);
 

    const router=useRouter();


    async function handleSubmit(event){

      event.preventDefault();
      console.log("actions : ",action);
  
      try {
      
        switch (action) {
          case "change-active":{
            const activeState=  await changeCoursePublishedState(courseId);
           setPublished(!activeState);
           toast.success("The Module has been updated")
           router.refresh();
            break;
          }   
            
        
          case "delete":{
            if(published){
              toast.error("A published course can not be deleted. First unpublish it, then delete.")
  
            }else{
              await deletecourse(courseId);
              toast.success("course successfully deleted")
              router.push(`/dashboard/courses`);
            }
            break;
          }
          default:{
            throw new Error("Invalid lesson action");
          }
            
        }
        
      } catch (error) {
        toast.error(error.message);
      }
  
    }
  
  return (
    <form onSubmit={handleSubmit} >
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" onClick={()=>setAction("change-active")}>
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm" onClick={()=>setAction("delete")}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
    </form>
   
  );
};
