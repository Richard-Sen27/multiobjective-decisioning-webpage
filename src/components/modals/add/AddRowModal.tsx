import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdAdd } from "react-icons/md"
import { Row } from "@/App"
import { useEffect, useState } from "react"

type AddRowModalProps = {
  rows: Row[],
  setRows: Function
}

export default function AddRowModal({rows, setRows} : AddRowModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(name.length === 0) return
    setRows([...rows, {title: name}])
    setOpen(false)
  }
  useEffect(() => {
    if(!open) setName('')
  }, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type='button' variant="outline" 
            className="text-2xl text-center p-2 hover:bg-green-400 hover:cursor-pointer transition-all duration-300 flex items-center justify-center">
            <MdAdd />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a row</DialogTitle>
            <DialogDescription>
              Add a new Subject for more options.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the subject name"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Criterion</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
