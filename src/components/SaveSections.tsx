import { MdDelete, MdSaveAlt, MdUpload } from "react-icons/md";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TableProps } from "@/App";
import { Label } from "./ui/label";
import { ActionAlert } from "./modals/ActionAlert";
import { useState } from "react";

interface SessionStorageData {
    [key: string]: any;
}

export default function SaveSection({setColumns, setRows, setCategories} : TableProps) {
    const save = () => {
        // Get data from sessionStorage
        const sessionStorageData: SessionStorageData = {};
        const keys = ['columns', 'rows', 'categories'];
        keys.forEach(key => {
            const value = sessionStorage.getItem(key);
            if (value !== null) {
                sessionStorageData[key] = JSON.parse(value);
            }
        });

        // Convert data to JSON
        const jsonData = JSON.stringify(sessionStorageData);

        // Create a Blob with the JSON data
        const blob = new Blob([jsonData], { type: "application/json" });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "rationalyze-data.json";

        // Append the <a> element to the body
        document.body.appendChild(a);

        // Click the <a> element to trigger the download
        a.click();

        // Remove the temporary <a> element
        document.body.removeChild(a);

        // Revoke the URL to release memory
        URL.revokeObjectURL(url);
    };
    
    const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string) as SessionStorageData;
                    Object.entries(data).forEach(([key, value]) => {
                        if (key === 'columns') setColumns(value)
                        if (key === 'rows') setRows(value)
                        if (key === 'categories') setCategories(value)
                    });
                } catch (error) {
                    alert("Error uploading file!");
                }
            };
            reader.readAsText(file);
        }
    };

    const [openClearAlert, setOpenClearAlert] = useState(false)
    const clear = () => {
        setColumns([]);
        setRows([]);
        setCategories([]);
    }

    return (
        <div className='mx-auto lg:w-2/3 max-lg:mx-6 flex flex-wrap gap-8'>
            <Button onClick={save} className="flex items-center gap-2">
                <MdSaveAlt className="text-xl"/> 
                Save to JSON
            </Button>

            <div className="flex gap-2 items-center">
                <Button>
                    <Label htmlFor="uploadFile" className="text-xl cursor-pointer"><MdUpload /></Label>
                </Button>
                <Input type="file" id="uploadFile" className="max-w-72 text-primary file:text-muted-foreground" accept="application/json" onChange={upload}/>
            </div>
            
            <Button variant="destructive" className="flex gap-2 items-center" onClick={() => {setOpenClearAlert(true)}}><MdDelete className="text-xl"/> Clear Everything</Button>
            <ActionAlert open={openClearAlert} setOpen={setOpenClearAlert} handleAction={clear}/>
        </div>
    )
}