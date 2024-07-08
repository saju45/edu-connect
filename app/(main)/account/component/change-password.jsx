"use client"
import { changePassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { toast } from "sonner";
function ChangePassword({email}){

    const [passwordState,setPasswordState]=useState({
        "oldPassword":'',
        "newPassword":''
    });


    const handleChange=(event)=>{
        const field=event.target.name;
        const value=event.target.value;

        setPasswordState({
            ...passwordState,
            [field]:value
        })

    }

    const doPasswordChange=async(event)=>{

        event.preventDefault();
        console.log(passwordState);

		try {
			
			await changePassword(email,passwordState?.oldPassword,passwordState?.newPassword);

		} catch (error) {
			console.error(error.message);
		}
    }

    return (
        <div>
				<h5 className="text-lg font-semibold mb-4">
							Change password :
						</h5>
						<form onSubmit={doPasswordChange}>
							<div className="grid grid-cols-1 gap-5">
								<div>
									<Label className="mb-2 block">Old password :</Label>
									<Input
										type="password"
										placeholder="Old password"
                                        name="oldPassword"
                                        id="oldPassword"
                                        value={passwordState.oldPassword}
                                        onChange={handleChange}
										required=""
									/>
								</div>
								<div>
									<Label className="mb-2 block">New password :</Label>
									<Input
										type="password"
										placeholder="New password"
                                        name="newPassword"
                                        id="newPassword"
                                        value={passwordState.newPassword}
                                        onChange={handleChange}
										required=""
									/>
								</div>
								<div>
									<Label className="mb-2 block">
										Re-type New password :
									</Label>
									<Input
										type="password"
										placeholder="Re-type New password"
										required=""
									/>
								</div>
							</div>
							{/*end grid*/}
							<Button className="mt-5 cursor-pointer" type="submit">
								Save password
							</Button>
						</form>
					</div>
    )
}

export default ChangePassword;