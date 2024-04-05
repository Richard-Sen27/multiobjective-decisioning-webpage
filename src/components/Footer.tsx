import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { useDarkMode, useSessionStorage } from "usehooks-ts";
import { BsFillMoonStarsFill, BsFillSunFill, BsGit, BsGithub, BsLinkedin } from "react-icons/bs";
import { useEffect } from "react";
import Impressum from "./Impressum";

export default function Footer() {
    const { isDarkMode, set } = useDarkMode()
    const [themeSession, setThemeSession] = useSessionStorage('dark-mode', isDarkMode)
    
    useEffect(() => {
        if(isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        setThemeSession(isDarkMode)
    }, [isDarkMode])
    
    useEffect(() => {
        set(themeSession)
    }, [])

    return (
        <footer className="mt-auto w-full relative p-5 flex flex-col">
            <Separator orientation="horizontal" className="absolute left-0 top-0"/>
            <div className="flex flex-wrap flex-row-reverse gap-y-4 gap-x-16 items-center justify-end sm:justify-between">
                <div className="flex gap-8 justify-between max-sm:w-full">
                    <div className="flex items-center gap-4">
                        {isDarkMode ? <BsFillMoonStarsFill size={24}/> : <BsFillSunFill size={24}/> }
                        <Switch checked={isDarkMode} onCheckedChange={set}/>
                    </div>
                    <Impressum />
                </div>

                <div className="flex gap-6 h-fit flex-wrap">
                    <a href="https://github.com/Richard-Sen27/multiobjective-decisioning-webpage" target="_blank" className="flex gap-2 items-center"><BsGit/> Repo</a>
                    <Separator orientation="vertical" className="h-8"/>
                    <a href="https://github.com/Richard-Sen27" target="_blank" className="flex gap-2 items-center"><BsGithub/> Profile</a>
                    <Separator orientation="vertical" className="h-8"/>
                    <a href="https://www.linkedin.com/in/richard-senger-75a200252/" target="_blank" className="flex gap-2 items-center"><BsLinkedin/> Profile</a>
                </div>
            </div>
        </footer>
    )
}