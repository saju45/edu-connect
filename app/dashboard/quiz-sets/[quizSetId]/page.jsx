import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import { QuizSetAction } from "./_components/quiz-set-action";
import { TitleForm } from "./_components/title-form";
import { AddQuizForm } from "./_components/add-quiz-form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { Trash } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Circle } from "lucide-react";
import { getQuizSetById } from "@/queries/quizzes";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { QuizCardActions } from "./_components/quiz-card-action";



const EditQuizSet =async ({params:{quizSetId}}) => {


  const quizSet=await getQuizSetById(quizSetId)

  const quizes=replaceMongoIdInArray(quizSet?.quizIds);


  return (
    <>
    {
      !quizSet?.active &&(
        <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
      )
    }
     
      <div className="p-6">
        <div className="flex items-center justify-end">
          <QuizSetAction quizSetId={quizSetId} quizSet={quizSet} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-16">
          {/* Quiz List */}
          <div className="max-lg:order-2">
            <h2 className="text-xl mb-6">Quiz List</h2>
            {
              !quizes?.length>0 &&(
                <AlertBanner
                label="No Quiz are in the set, add some using the form above."
                variant="warning"
                className="rounded mb-6"
              />
              )
            }
         
            <div className="space-y-6">
              {quizes.map((quiz) => {
                return (
                  <div
                    key={quiz.id}
                    className=" bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border"
                  >
                    <h2 className="mb-3">{quiz.title}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quiz.options.map((option) => {
                        return (
                          <div
                            className={cn(
                              "py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600"
                            )}
                            key={option.text}
                          >
                            {option.is_correct ? (
                              <CircleCheck className="size-4 text-emerald-500 " />
                            ) : (
                              <Circle className="size-4" />
                            )}

                            <p>{option.text}</p>
                          </div>
                        );
                      })}
                    </div>
                    <QuizCardActions quiz={quiz} quizSetId={quizSetId}/>
                  </div>
                );
              })}
            </div>
          </div>
          {/*  */}
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your quiz set</h2>
            </div>
            <div className="max-w-[800px]">
              <TitleForm
                initialData={{
                  title: quizSet?.title,
                }}
                quizSetId={quizSet?.id}
              />
            </div>

            <div className="max-w-[800px]">
              <AddQuizForm quizSetId={quizSet?.id}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditQuizSet;
