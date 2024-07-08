import { auth } from "@/auth";
import EnrollCourseCard from "../../component/enroll-coursecard";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";


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
					 {enrollments.map((enrollment)=><EnrollCourseCard key={enrollment?.id} enrollment={enrollment}/>)}
					</>
				):(
					<p>No Enrollment found!</p>
				)
			}

		</div>
	);
}

export default EnrolledCourses;
