import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import { User } from "./model/user-model";
import bcryptjs from "bcryptjs";

export const{
    handlers:{GET,POST},
    auth,
    signIn,
    signOut
}
=NextAuth({
session:{
    strategy:'jwt'
},
providers:[
    CredentialsProvider({
        async authorize(credentials){
            if(credentials==null) return null;

            try {
                const user =await User.findOne({email:credentials?.email});
                console.log(user);

                if (user) {
                    const isMatch=  bcryptjs.compare(user?.password,credentials?.password);
                    if(isMatch){
                        return user
                    }else{
                        console.error("password mismatch");
                        throw new Error("Check our password")
                    }
                } else {
                    console.error("user not found");
                    throw new Error("user not found")
                }
            } catch (error) {
                
            }
        }
    })
]
})