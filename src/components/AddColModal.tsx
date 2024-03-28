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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdAdd } from "react-icons/md"
import { useEffect, useState } from "react"
import { Column } from "@/App"

type AddColModalProps = {
  columns: Column[],
  setColumns: Function
}

export default function AddColModal({columns, setColumns} : AddColModalProps) {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [colType, setColType] = useState<string>('beneficial')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log('submitted')
    if(name.length === 0 || colType === null) return
    setColumns([...columns, {title: name, benefitial: colType === 'beneficial'}])
    setOpen(false)
  }
  useEffect(() => {
    if(!open) {
      setName('')
      setColType('beneficial')
    }
  }, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type='button' variant="outline" 
            className="text-2xl text-center p-2 hover:bg-green-400 hover:cursor-pointer transition-all duration-300 flex items-center justify-center">
          <MdAdd />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a column (criterion)</DialogTitle>
            <DialogDescription>
              Every column represents one criterion. Price, memroy and camera resolution are criterions for the decision of the most rational phone purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter a Name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
                <Select value={colType} onValueChange={setColType}>
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Col-Type" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="beneficial">Beneficial</SelectItem>
                      <SelectItem value="nonBenficial">Non-Beneficial</SelectItem>
                  </SelectContent>
                </Select>
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
