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
import { useEffect, useState } from "react"

type AddVariableModalProps = {
  children?: React.ReactNode,
  title: string,
  description: string,
  labelName?: string,
  submitButtonMsg?: string,
  placeholder?: string,
  
  data: string | null,
  setData: (data: string) => void
}

export default function AddVariableModal({children, title, description, labelName = 'Name', submitButtonMsg = 'Add', placeholder = 'Enter a value', setData} : AddVariableModalProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(value.length === 0) return
    // setRows([...rows, {title: value}])
    setData(value)
    setOpen(false)
  }
  
  useEffect(() => {
    if(!open) setValue('')
  }, [open])
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          children ? children : 
          <Button type='button' variant="outline" 
              className="text-2xl text-center p-2 hover:bg-green-400 hover:cursor-pointer transition-all duration-300 flex items-center justify-center">
              <MdAdd />
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle> { title } </DialogTitle>
            <DialogDescription>
              { description }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                { labelName }
              </Label>
              <Input
                id={ "add-"+labelName }
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={ placeholder }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{ submitButtonMsg }</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
