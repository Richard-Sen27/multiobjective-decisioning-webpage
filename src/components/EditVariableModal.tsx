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
import { SpecificVariable, VariableCategory } from "./LinguisticVariables";

type EditColModalProps = {
  value: SpecificVariable | null;
  setValue: (col: SpecificVariable | null) => void;
  category: VariableCategory[],
    setCategory: (category: VariableCategory[]) => void
};

export default function EditColModal({
  value,
  setValue,
  category,
  setCategory,
}: EditColModalProps) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(value?.variable.name || "");
  const [number, setNumber] = useState(value?.variable.value || 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    setCategory(category.map((c) => {
      if (c.name === value.category.name) {
        return {
          ...c,
          variables: c.variables.map((v) => {
            if (v.name === value.variable.name) {
              return { name, value: number };
            }
            return v;
          }),
        };
      }
      return c;
    }));
    setOpen(false);
  };

  useEffect(() => {
    if (value) {
        setName(value.variable.name);
        setNumber(value.variable.value);
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
                <Label htmlFor="value" className="text-right">
                    Value
                </Label>
                <Input
                    id="value"
                    type="number"
                    placeholder="Enter a Value"
                    className="col-span-3"
                    value={number}
                    onChange={(e) => setNumber(parseFloat(e.target.value))}
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
