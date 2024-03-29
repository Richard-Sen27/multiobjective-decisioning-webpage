import { Row } from "@/App"
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
  
type DeleteRowAlertProps = {
    value: string,
    setValue: (open: string) => void,
    rows: Row[],
    setRows: Function
}

export function DeleteRowAlert({ value, setValue, rows, setRows} : DeleteRowAlertProps) {
    const [open, setOpen] = useState(false)
    
    const handleDelete = () => {
        setRows(rows.filter((row) => row.title !== value))
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