import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { useDarkMode, useSessionStorage } from "usehooks-ts";
import { BsFillMoonStarsFill, BsFillSunFill, BsGit, BsGithub, BsInfoCircleFill, BsLinkedin } from "react-icons/bs";
import { useEffect } from "react";
import Impressum from "./Impressum";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  

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
        <footer className="mt-auto w-full relative p-6 flex flex-col">
            <Separator orientation="horizontal" className="absolute left-0 top-0"/>
            <div className="flex flex-wrap flex-row-reverse gap-y-6 gap-x-16 items-center justify-end ">
                <div className="flex gap-8 justify-between max-sm:w-full">
                    <div className="flex items-center gap-4">
                        {isDarkMode ? <BsFillMoonStarsFill size={24}/> : <BsFillSunFill size={24}/> }
                        <Switch checked={isDarkMode} onCheckedChange={set}/>
                    </div>
                    <Impressum />
                </div>

                <div className="flex gap-x-6 gap-y-4 h-fit flex-wrap mr-auto">

                    <div className="flex gap-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex gap-2 items-center cursor-pointer" role="button"><BsInfoCircleFill/> About</div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>About</DialogTitle>
                                <DialogDescription>
                                    This site is a simple web application that allows you to create a decision matrix with multiple objectives. A more in depth tutorial for usage is coming soon.
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <Separator orientation="vertical" className="h-8"/>
                    </div>
                    <div className="flex gap-6">
                        <a href="https://github.com/Richard-Sen27/multiobjective-decisioning-webpage" target="_blank" className="flex gap-2 items-center"><BsGit/> Repo</a>
                        <Separator orientation="vertical" className="h-8"/>
                    </div>
                    <div className="flex gap-6">
                        <a href="https://github.com/Richard-Sen27" target="_blank" className="flex gap-2 items-center"><BsGithub/> Profile</a>
                        <Separator orientation="vertical" className="h-8"/>
                    </div>
                    <a href="https://www.linkedin.com/in/richard-senger-75a200252/" target="_blank" className="flex gap-2 items-center"><BsLinkedin/> Profile</a>
                </div>
            </div>
        </footer>
    )
}