


// import { CourseProgress } from "@/components/course-progress";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDeatails } from "@/queries/courses";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

const SingleCoursePage = async ({params:{id}}) => {

  const course=await getCourseDeatails(id);

  console.log("SingleCoursePage : ",course);

  return (
    <>
    
    <CourseDetailsIntro title={course?.title} subtitle={course?.subtitle} thumbnail={course?.thumbnail}/>
   <CourseDetails course={course}/>
      {/* Testimonials */}
    {course?.testimonials && <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)}/> }
      {/* Releated Course */}
     <RelatedCourses/>
      {/* Authors */}
      {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
      {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
    </>
  );
};
export default SingleCoursePage;
