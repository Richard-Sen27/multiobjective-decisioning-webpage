
import { useEffect } from "react";
import Impressum from "./Impressum";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { useDarkMode } from "usehooks-ts";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function Navbar() {
    const { isDarkMode, set } = useDarkMode()
    useEffect(() => {
        if(isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode])
    return (
        <div className="w-full">
            <div className="border-b-primary py-3 px-4 flex justify-between">
                <div className="flex items-center gap-4">
                    <img src="/icon2-removebg.png" alt="Logo" className="w-10"/>
                    <h1 className="text-2xl font-bold">Rationalyze <span className="max-lg:hidden">- Multi-Criteria Decision Making Tool</span></h1>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                        {isDarkMode ? <BsFillMoonStarsFill size={24}/> : <BsFillSunFill size={24}/> }
                        <Switch checked={isDarkMode} onCheckedChange={set}/>
                    </div>
                    <Impressum/>
                </div>
            </div>
                <Separator orientation="horizontal"/>
        </div>
    )
}