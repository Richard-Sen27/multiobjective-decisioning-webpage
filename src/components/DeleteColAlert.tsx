import { Column } from "@/App"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
  
type DeleteColAlertProps = {
    value: string,
    setValue: (open: string) => void,
    cols: Column[],
    setCols: Function
}

export function DeleteColAlert({ value, setValue, cols, setCols} : DeleteColAlertProps) {
    const [open, setOpen] = useState(false)
    
    const handleDelete = () => {
        setCols(cols.filter((col) => col.title !== value))
        setOpen(false)
    }

    useEffect(() => {
        if(open) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if(e.key === 'Escape') {
                    setOpen(false)
                }
            }
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        } else {
            setValue('')
        }
    }, [open])

    useEffect(() => {
        if(value && value.length > 0) {
            setOpen(true)
        }
    }, [value])
    
    return createPortal(
        <AlertDialog open={open}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete "{value}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>, document.body
    )
}