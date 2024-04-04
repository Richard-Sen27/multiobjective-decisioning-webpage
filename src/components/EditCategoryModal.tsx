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
import { VariableCategory } from "./LinguisticVariables";

type EditCategoryModalProps = {
  value: VariableCategory | null;
  setValue: (val: VariableCategory | null) => void;
  categories: VariableCategory[];
  setCategories: (categories: VariableCategory[]) => void;
};

export default function EditCategoryModal({
  value,
  setValue,
  categories,
  setCategories,
}: EditCategoryModalProps) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(value?.name || "");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || name.length === 0) return;
    
    const index = categories.findIndex((c) => c.name === value?.name);
    const newCategories = [...categories];
    newCategories[index].name = name;
    setCategories(newCategories);

    setOpen(false);
  };

  useEffect(() => {
    if (value) {
        setName(value.name);
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
            <DialogTitle>Edit Category Name</DialogTitle>
            <DialogDescription>
              Here you can change the name of the category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-categories-4 items-center gap-4">
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
