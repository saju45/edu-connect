import { auth } from "@/auth";
import EnrollCourseCard from "../../component/enroll-coursecard";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";
import Link from "next/link";


async function EnrolledCourses() {

	const session=await auth();

	if (!session?.user?.email) {
		redirect("/login")
	}
	const loggedInUser=await getUserByEmail(session?.user?.email);


	const enrollments=await getEnrollmentsForUser(loggedInUser?.id);

	return (
		<div className="grid sm:grid-cols-2 gap-6">
			
			{
				(enrollments && enrollments.length>0)?(
					<>
					 {enrollments.map((enrollment)=>(
						<Link href={`/courses/${enrollment?.course?._id}/lesson`} key={enrollment?.id} >
						<EnrollCourseCard  enrollment={enrollment}/>
						</Link>
					 ))}
					</>
				):(
					<p>No Enrollment found!</p>
				)
			}

		</div>
	);
}

export default EnrolledCourses;
