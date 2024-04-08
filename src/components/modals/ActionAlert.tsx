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
import { useEffect } from "react"
import { createPortal } from "react-dom"
  
type ActionAlertProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    handleAction: () => void
}

export function ActionAlert({ handleAction, open, setOpen } : ActionAlertProps) {
    
    const triggerAction = () => {
        handleAction()
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
            setOpen(false)
        }
    }, [open])
    
    return createPortal(
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you upload this file, you will lose all unsaved changes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={triggerAction}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>, document.body
    )
}