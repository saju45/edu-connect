import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";


export async function getLesson(lessonId) {
    const lesson = await Lesson.findById(lessonId).lean();
    return replaceMongoIdInObject(lesson);
}

export async function create(lessonData) {
    try {
        console.log("create lesson form ques lesson data : ",lessonData);
        const lesson = await Lesson.create(lessonData);
        console.log("create lesson data : ",lesson);
        return JSON.parse(JSON.stringify(lesson));
    } catch (err) {
        throw new Error(err);
    }
}