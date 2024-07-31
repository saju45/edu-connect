import { Report } from "@/model/report-model";
import { Assessment } from "@/model/assessment-model";

import { replaceMongoIdInObject } from "@/lib/convertData";
import { Module } from "@/model/module.model";
import mongoose from "mongoose";


export async function getAReport(filter){

    try {
        const report=await Report.findOne(filter)
        .populate({
            path:"quizAssessment",
            model:Assessment
        }).lean();

        return replaceMongoIdInObject(report);
    } catch (error) {
        throw new Error(error);
    }
}

export async function createWatchReport(data) {
    console.log("createWatchReport : ",data);
    try {
        let report = await Report.findOne({
            course: data.courseId,
            student: data.userId,
        });
        if (!report) {
            report = await Report.create({
                course: data.courseId,
                student: data.userId,
            });
        }

        const foundLesson = report.totalCompletedLessons.find(
            (lessonId) => lessonId.toString() === data.lessonId
        );

        if (!foundLesson) {
            report.totalCompletedLessons.push(
                new mongoose.Types.ObjectId(data.lessonId)
            );
        }
        const modul= await Module.findById(data.moduleId);
        const lessonIdsToCheck = modul.lessonIds;
        const completedLessonsIds = report.totalCompletedLessons;

        const isModuleComplete = lessonIdsToCheck.every((lesson) =>
            completedLessonsIds.includes(lesson)
        );

        if (isModuleComplete) {
            const foundModule = report.totalCompletedModeules.find(
                (module) => module.toString() === data.moduleId
            );
            if (!foundModule) {
                report.totalCompletedModeules.push(
                    new mongoose.Types.ObjectId(data.moduleId)
                );
            }
        }
        report.save();
    } catch (error) {
        throw new Error(error);
    }
}
