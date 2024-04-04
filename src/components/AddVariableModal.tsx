import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Variable, VariableCategory } from "./LinguisticVariables";

type AddColModalProps = {
  addVariable: (category: VariableCategory, variable: Variable) => void;
  category: VariableCategory | null;
  setCategory: (category: VariableCategory | null) => void
};

export default function EditColModal({
  category,
  setCategory,
  addVariable,
}: AddColModalProps) {

    // console.log('value:', value)

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === null || !name || name.length === 0 || !category) return;
    addVariable(category, { name, value });
    setOpen(false);
  };

  useEffect(() => {
    if (category) {
        setOpen(true);
    }
  }, [category]);

  useEffect(() => {
    if (!open) {
      setName("");
      setValue(null);
      setCategory(null);
    }
  }, [open]);

  return createPortal(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Variable to "{category?.name}"</DialogTitle>
            <DialogDescription>
              Add a new variable for more options in this category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a variable name"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Value
              </Label>
              <Input
                type="number"
                value={value !== null? value : ''}
                onChange={(e) => setValue(parseFloat(e.target.value))}
                placeholder="Enter value for the variable"
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
    </Dialog>,
    document.body
  );
}
