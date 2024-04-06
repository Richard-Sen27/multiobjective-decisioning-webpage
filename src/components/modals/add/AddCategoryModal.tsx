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
import { useEffect, useState } from "react"
import { VariableCategory } from "../../LinguisticVariables"

type AddCategoryModalProps = {
  children: React.ReactNode,
  categories: VariableCategory[],
  setCategories: (category: VariableCategory[]) => void
}

export default function AddCategoryModal({children, categories, setCategories} : AddCategoryModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(name.length === 0 || name === 'none') return
    setCategories([...categories, {name, variables: []}])
    setOpen(false)
  }
  useEffect(() => {
    if(!open) setName('')
  }, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          children
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Variable Category</DialogTitle>
            <DialogDescription>
              Add a new category for more linguistic variables.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a category name"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
