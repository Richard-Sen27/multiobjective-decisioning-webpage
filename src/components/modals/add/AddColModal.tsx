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
import { VariableCategory } from "../../LinguisticVariables"

type AddColModalProps = {
  columns: Column[],
  setColumns: (columns: Column[]) => void,
  categories: VariableCategory[],
}

export default function AddColModal({columns, setColumns, categories} : AddColModalProps) {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [colType, setColType] = useState<string>('beneficial')
  const [weight, setWeight] = useState(0.5)
  const [category, setCategory] = useState<VariableCategory>({name: 'none', variables: []})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(name.length === 0 || colType === null) return
    setColumns([...columns, {title: name, beneficial: colType === 'beneficial', weight: weight, category: category.name === 'none'? null : category.name}])
    setOpen(false)
  }
  useEffect(() => {
    if(!open) {
      setName('')
      setColType('beneficial')
      setCategory({name: 'none', variables: []})
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
              Every column represents one criterion. Price, memory and camera resolution are criterions for the decision of the most rational phone purchase.
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
                <Label htmlFor="weight" className="text-right">
                    Weight
                </Label>
                <Input
                    id="weight"
                    min={0}
                    step={0.01}
                    max={1}
                    type="number"
                    placeholder="Enter a Weight"
                    className="col-span-3"
                    value={weight}
                    onChange={(e) => {setWeight(parseFloat(e.target.value))}}
                    required
                />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={category.name} onValueChange={(v) => {setCategory({name: v, variables: []})}}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {
                      categories.map((c, i) => <SelectItem key={i} value={c.name}>{c.name}</SelectItem>)
                    }
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={colType} onValueChange={setColType}>
                <SelectTrigger className="col-span-3">
                    <SelectValue id="type" placeholder="Col-Type" />
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
