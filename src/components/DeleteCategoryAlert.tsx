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
  
type DeleteCategoryAlertProps = {
    value: string | null,
    setValue: (value: string | null) => void,
    trigger: Function
}

export function DeleteCategoryAlert({ trigger, value, setValue } : DeleteCategoryAlertProps) {
    const [open, setOpen] = useState(false)
    
    const handleDelete = () => {
        // setRows(rows.filter((row) => row.title !== value))
        trigger()
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
            setValue(null)
        }
    }, [open])

    useEffect(() => {
        if(value && value.length > 0) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [value])
    
    return createPortal(
        <AlertDialog open={open}>
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