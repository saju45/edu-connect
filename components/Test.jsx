"use client"

import { toast } from "sonner";
import { Button } from "./ui/button";

const Test = () => {
    const handleClick = (mode) => {
        mode ? toast.success("Test success") : toast.error("Test error");
    };

    return <Button  variants="link" className="underline" onClick={() => handleClick(true)}>Test Toast</Button>;
};

export default Test;
