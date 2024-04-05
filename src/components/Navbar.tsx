import { Separator } from "./ui/separator";

export default function Navbar() {    
    return (
        <div className="w-full">
            <div className="border-b-primary py-3 px-4 flex justify-between">
                <div className="flex items-center gap-4">
                    <img src="/icon2-removebg.png" alt="Logo" className="w-10"/>
                    <h1 className="text-2xl font-bold">Rationalyze <span className="max-lg:hidden">- Multi-Criteria Decision Making Tool</span></h1>
                </div>
                <div className="flex items-center gap-8">
                </div>
            </div>
                <Separator orientation="horizontal"/>
        </div>
    )
}