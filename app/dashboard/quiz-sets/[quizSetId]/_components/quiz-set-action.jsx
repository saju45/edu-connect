"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { changeQuizesPublishedState, deleteQuizSEt } from "@/app/actions/quizSet";

export const QuizSetAction = ({quizSetId,quizSet }) => {

  console.log("quizes form quizaction : ",quizSetId);

  const [action,setAction]=useState(null);
  const [published,setPublished]=useState(quizSet?.active);

  const router=useRouter();

  async function handleSubmit(event){

    event.preventDefault();
    console.log("actions : ",action);

    try {
    
      switch (action) {
        case "change-active":{
          const activeState=  await changeQuizesPublishedState(quizSetId);
         setPublished(!activeState);
         toast.success("The quizset has been updated")
         router.refresh();
          break;
        }   
          
      
        case "delete":{
          if(published){
            toast.error("A published module can not be deleted. First unpublish it, then delete.")

          }else{
            await deleteQuizSEt(quizSetId);
            router.refresh();
            router.push(`/dashboard/quiz-sets`);
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
    <form onSubmit={handleSubmit}>
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
