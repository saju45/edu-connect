import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";

export async function getUserByEmail(email) {
    console.log("getUserByEmail email : ",email);
    const user = await User.findOne({ email: email }).lean();
    console.log("usere : ",user);
    return replaceMongoIdInObject(user);
}
