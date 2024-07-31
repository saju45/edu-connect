import { CourseProgress } from "@/components/course-progress";

import { GiveReview } from "./give-review";
import { Downloadcertificate } from "./download-certificate";
import { SidebarModules } from "./sidebar-modules";
import { getCourseDeatails } from "@/queries/courses";
import { Watch } from "@/model/watch-model";
import { getLoggedInUser } from "@/lib/loggedin-user";

export const CourseSidebar = async({courseId}) => {

  const loggedInUser=await getLoggedInUser();

  const course=await getCourseDeatails(courseId);


  // const updatedModules=await Promise.all(course?.modules?.map(async(module)=>{
    
  //   const moduleId=module?._id.toString();
  //   const lesssons=module?.lessonIds;

  //   const updatedLessons=await Promise.all(lesssons.map(async(lesson)=>{

  //     const lessonId=lesson?._id.toString();
  //     const watch=await Watch.findOne({lesson:lessonId,module:moduleId,user:loggedInUser?.id})

  //     if(watch?.state==="completed"){
  //       console.log(`This lesson ${lesson.title} has completed`);
  //       lesson.state="completed"
  //     }

  //     return lesson;
  //   }))

  //   return module;

  // }))

  
  const updatedModules = await Promise.all(course?.modules.map(async(module) => {
    const moduleId = module._id.toString();
    const lessons = module?.lessonIds;

    const updatedLessons = await Promise.all(lessons.map(async (lesson) => {
      const lessonId = lesson._id.toString();
      const watch = await Watch.findOne({lesson: lessonId, module: moduleId, user: loggedInUser.id}).lean();
      if (watch?.state === 'completed') {
        console.log(`This lesson ${lesson.title} has completed`);
        lesson.state = 'completed';
      }
      return lesson;
    }))
    return module;
  }));

  console.log({updatedModules});

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">Reactive Accelerator</h1>
          {/* Check purchase */}
          {
            <div className="mt-10">
              <CourseProgress variant="success" value={80} />
            </div>
          }
        </div>
        <SidebarModules courseId={courseId} modules={updatedModules}/>
        <div className="w-full px-6">
          <Downloadcertificate/>
          <GiveReview/>
        </div>
      </div>
    </>
  );
};
