import { CourseProgress } from "@/components/course-progress";

import { GiveReview } from "./give-review";
import { Downloadcertificate } from "./download-certificate";
import { SidebarModules } from "./sidebar-modules";

export const CourseSidebar = () => {

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
        <SidebarModules/>
        <div className="w-full px-6">
          <Downloadcertificate/>
          <GiveReview/>
        </div>
      </div>
    </>
  );
};
