import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getInstructorDashboardData } from "@/lib/dashboard-helper";

import { COURSE_DATA } from "@/lib/dashboard-helper";

const CoursesPage = async () => {

  const courses=await getInstructorDashboardData(COURSE_DATA);

  console.log("course Page : ",courses);
  return (
    <div className="p-6">
 
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
