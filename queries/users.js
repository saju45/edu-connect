import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs"
export async function getUserByEmail(email) {
    console.log("getUserByEmail email : ",email);
    const user = await User.findOne({ email: email }).select("-password").lean();
    console.log("usere : ",user);
    return replaceMongoIdInObject(user);
}

export async function getUserDetails(userId) {
  const user = await User.findById(userId).select("-password").lean();
  return replaceMongoIdInObject(user);
}

export async function validatePassword(email, password) {
    const user = await getUserByEmail(email);

    // const isMatch=password===user.password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    return isMatch;
 }