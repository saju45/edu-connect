import { getCourseDeatails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getInstructorDashboardData,ENROLLMENT_DATA } from "@/lib/dashboard-helper";

const EnrollmentsPage = async ({params:{courseId}}) => {

  const course=await getCourseDeatails(courseId)
  const enrollments=await getInstructorDashboardData(ENROLLMENT_DATA);
  const enrollmentsForCourse=enrollments?.filter((enrollment)=>enrollment?.course.toString()==courseId);
  console.log("Enrollments DAta : ",enrollments);

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollmentsForCourse} />
    </div>
  );
};

export default EnrollmentsPage;
