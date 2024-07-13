


import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";

import { dbConnect } from "@/service/mongo";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";
import { Object } from "core-js";


export async function getCourseList() {

    await dbConnect();
    const courses = await Course.find({}).select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor"]).populate({
        path:"category",
        model:Category
    }).populate({
        path:"instructor",
        model:User
    }).populate({
        path:"testimonials",
        model:Testimonial
    }).populate({
        path:"modules",
        model:Module
    }).lean();
    return replaceMongoIdInArray( courses);
}

export async function getCourseDeatails(id){

    const course=await Course.findById(id).populate({
        path:"category",
        model:Category
    }).populate({
        path:"instructor",
        model:User
    }).populate({
        path:"testimonials",
        model:Testimonial,
        populate: {
            path: "user",
            model: User
        }
    }).populate({
        path:"modules",
        model:Module
    }).lean();

    return replaceMongoIdInObject(course);
}


export async function getCourseDetailsByInstructor(instructorId,expand){

    const courses=await Course.find({instructor:instructorId}).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
          const enrollment = await getEnrollmentsForCourse(course._id.toString());
          return enrollment;
        })
    );


    const groupedByCourses = Object.groupBy(enrollments.flat(), ({ course }) => course);
  

    const totalRevenue = courses.reduce((acc, course) => {
        return (acc + groupedByCourses[course._id].length * course.price)
    }, 0);


    const totalEnrollments = enrollments.reduce(function (acc, obj) {
        return acc + obj.length;
    }, 0)

    const testimonials = await Promise.all(
        courses.map(async (course) => {
          const testimonial = await getTestimonialsForCourse(course._id.toString());
          return testimonial;
        })
      );

      const totalTestimonials = testimonials.flat();
      const avgRating = (totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0)) / totalTestimonials.length;

   
   
        if(expand){

            return {
                "courses":courses?.flat(),
                "enrollments":enrollments?.flat(),
                "reviews":totalTestimonials,
        
            }
        }
        
        return {
        "courses":courses.length,
        "enrollments":totalEnrollments,
        "reviews":totalTestimonials.length,
        "rating":avgRating.toPrecision(2),
        "revenue":totalRevenue

    }

}

