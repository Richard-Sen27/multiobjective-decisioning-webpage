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
import { SpecificVariable, VariableCategory } from "../../LinguisticVariables"
  
type DeleteVariableAlertProps = {
    value: SpecificVariable | null,
    setValue: (val: SpecificVariable | null) => void,
    category: VariableCategory[],
    setCategory: (category: VariableCategory[]) => void
}

export function DeleteVariableAlert({ value, setValue, category, setCategory} : DeleteVariableAlertProps) {
    const [open, setOpen] = useState(false)
    
    const handleDelete = () => {
        if(!value) return
        setCategory(category.map((c) => {
            if(c.name === value.category.name) {
                return {...c, variables: c.variables.filter((v) => v.name !== value.variable.name)}
            }
            return c
        }))
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
        if(value && value.variable.name.length > 0) {
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
                        This action cannot be undone. This will permanently delete "{value?.variable.name}".
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