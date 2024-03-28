import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Row } from "@/App"
import {  useEffect, useState } from "react"
import { createPortal } from "react-dom"

type AddRowModalProps = {
    value: string,
    setValue: (open: string) => void,
    rows: Row[],
    setRows: Function
}

export default function EditRowModal({  value, setValue, rows, setRows} : AddRowModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if( name?.length === 0) return
    const index = rows.findIndex(r => r.title === value)
    const newRows = [...rows]
    newRows[index].title = name
    setRows(newRows)
    setOpen(false)
  }
  
  useEffect(() => {
    if(value && value.length > 0) {
      setName(value)
      setOpen(true)
    }
  }, [value])

  useEffect(() => {
    if(!open)  {
        setName('')
        setValue('')
    }
  }, [open])
  
  return createPortal(
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Subject Name</DialogTitle>
            <DialogDescription>
              Here you can change the name of the subject.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the subject name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Edit Criterion</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>, document.body
  )
}
