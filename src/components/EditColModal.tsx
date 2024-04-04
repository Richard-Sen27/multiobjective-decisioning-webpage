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
import { Column } from "@/App";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { VariableCategory } from "./LinguisticVariables";

type EditColModalProps = {
  value: Column | null;
  setValue: (col: Column | null) => void;
  cols: Column[];
  setCols: Function;
  categories: VariableCategory[];
};

export default function EditColModal({
  value,
  setValue,
  cols,
  setCols,
  categories,
}: EditColModalProps) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(value?.title || "");
  const [weight, setWeight] = useState(value?.weight || 0);
  const [category, setCategory] = useState<string>(value?.category || 'none');
  const [colType, setColType] = useState<string>(value?.beneficial ? "beneficial" : "nonBenficial")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || value?.title.length === 0) return;
    const index = cols.findIndex((c) => c.title === value?.title);
    const newcols = [...cols];
    newcols[index].title = name;
    newcols[index].weight = weight;
    newcols[index].beneficial = colType === "beneficial";
    newcols[index].category = category === "none" ? null : category;
    setCols(newcols);
    setOpen(false);
  };

  useEffect(() => {
    if (value) {
        setColType(value.beneficial ? "beneficial" : "nonBenficial")
        setName(value.title);
        setWeight(value.weight);
        setCategory(value.category ?? 'none');
        setOpen(true);
    }
  }, [value]);

  useEffect(() => {
    if (!open) {
      setValue(null);
    }
  }, [open]);

  return createPortal(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Parameter Name</DialogTitle>
            <DialogDescription>
              Here you can change the name of the parameter.
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
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    required
                />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>,
    document.body
  );
}
