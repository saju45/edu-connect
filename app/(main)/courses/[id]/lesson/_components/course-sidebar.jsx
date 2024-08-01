import { CourseProgress } from "@/components/course-progress";

import { GiveReview } from "./give-review";
import { Downloadcertificate } from "./download-certificate";
import { SidebarModules } from "./sidebar-modules";
import { getCourseDeatails } from "@/queries/courses";
import { Watch } from "@/model/watch-model";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getAReport } from "@/queries/reports";

export const CourseSidebar = async({courseId}) => {

  const loggedInUser=await getLoggedInUser();
  const course=await getCourseDeatails(courseId);

  const report=await getAReport({course:courseId,student:loggedInUser?.id})
  
  const totalCompletedModules=report?.totalCompletedModeules?report.totalCompletedModeules?.length:0;
  const totalModules=course?.modules?course?.modules.length:0;
  const totalProgress = (totalModules > 0) ? (totalCompletedModules/totalModules) * 100 : 0


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
              <CourseProgress variant="success" value={totalProgress} />
            </div>
          }
        </div>
        <SidebarModules courseId={courseId} modules={updatedModules}/>
        <div className="w-full px-6">
          <Downloadcertificate courseId={courseId} totalProgress={totalProgress}/>
          <GiveReview/>
        </div>
      </div>
    </>
  );
};
