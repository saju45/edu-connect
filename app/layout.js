import { Inter,Poppins} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { dbConnect } from "@/service/mongo";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],  
  subsets: ["latin"],variable:"--font-poppins" });

export const metadata = {
  title: "EduConnect - Wold's Best Learning Platform",
  description: "Explore || Learn || Build || Share",
};






export default async function RootLayout({ children }) {

  await dbConnect();

  return (
    <html lang="en">
      <body className={cn(inter.className,poppins.className)}>
        {children}
        <Toaster richColors position="top-center"/>
        </body>
    </html>
  );
}
