import { getInstructorDashboardData, REVIEW_DATA } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getCourseDeatails } from "@/queries/courses";


const ReviewsPage = async ({params:{courseId}}) => {

  const course=await getCourseDeatails(courseId);
  const reviews=await getInstructorDashboardData(REVIEW_DATA);

  console.log("Reviews Page : ",reviews);

  const reviewDataForCourse=reviews.filter((review)=>review?.courseId.toString()==courseId);

  console.log("reviewDataForCourse : ",reviewDataForCourse);

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={reviewDataForCourse} />
    </div>
  );
};

export default ReviewsPage;
