import { Button } from "./ui/button";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Badge } from "./ui/badge";
import { useSessionStorage } from "usehooks-ts";
import { DeleteCategoryAlert } from "./DeleteCategoryAlert";
import AddCategoryModal from "./AddCategoryModal";
import AddVariableModal from "./AddVariableModal";
import EditCategoryModal from "./EditCategoryModal";
import { DeleteVariableAlert } from "./DeleteVariableAlert";
import EditVariableModal from "./EditVariableModal";
  

export type VariableCategory = {
    name: string;
    variables: Variable[];
}
export type Variable = {
    name: string;
    value: number;
}

type LinguisticVariablesProps = {
    categories: VariableCategory[];
    setCategories: (categories: VariableCategory[]) => void;
}

export type SpecificVariable = {
    category: VariableCategory;
    variable: Variable;
}

export default function LinguisticVariables({categories, setCategories}: LinguisticVariablesProps) {
    const [showVariableValues, setShowVariableValues] = useSessionStorage<boolean>('showVarValues', false)
    
    // modal states
    const [addVar2Category, setAddVar2Category] = useState<VariableCategory | null>(null)
    const [editVariable, setEditVariable] = useState<SpecificVariable | null>(null)
    const [deleteVariable, setDeleteVariable] = useState<SpecificVariable | null>(null)
    const [editCategory, setEditCategory] = useState<VariableCategory | null>(null)
    const [deleteCategory, setDeleteCategory] = useState<string | null>(null)

    const removeCategory = (category: string | null) => {
        if(!category) return
        setCategories(categories.filter((v) => v.name !== category))
    }

    const addVariable = (category: VariableCategory, variable: Variable) => {
        setCategories(categories.map((v) => {
            if(v.name === category.name) {
                return {...v, variables: [...v.variables, variable]}
            }
            return v
        }))
    }
    
    return (
        <div className="mx-auto md:w-2/3 max-md:mx-8">
            <AddVariableModal addVariable={addVariable} category={addVar2Category} setCategory={setAddVar2Category}/>
            <EditCategoryModal value={editCategory} setValue={setEditCategory} categories={categories} setCategories={setCategories}/>
            <DeleteCategoryAlert value={deleteCategory} setValue={setDeleteCategory} trigger={() => removeCategory(deleteCategory)}/>
            <DeleteVariableAlert value={deleteVariable} setValue={setDeleteVariable} category={categories} setCategory={setCategories}/>
            <EditVariableModal value={editVariable} setValue={setEditVariable} category={categories} setCategory={setCategories}/>
            {
                categories.length > 0 ? 
                
                <ScrollArea id="area" className="w-full flex gap-4 whitespace-nowrap overflow-x-auto">
                    <ScrollBar orientation="horizontal"/>
                    <div className="w-max flex gap-4">
                    {
                        categories.map((c, i) => {
                            return (
                                <ContextMenu key={i}>
                                    <ContextMenuTrigger asChild>
                                        <Card className="w-fit min-w-64 max-w-80 select-none">
                                            <CardHeader>
                                                <CardTitle>{c.name}</CardTitle>                                                
                                            </CardHeader>
                                            <CardContent className="flex gap-4 flex-wrap">
                                                {
                                                    c.variables.map((v) => {
                                                            return (
                                                                <ContextMenu key={v.name}>
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger>
                                                                                <ContextMenuTrigger asChild>
                                                                                    <Badge variant="secondary" key={v.name} className=" hover:opacity-80 cursor-pointer">
                                                                                        {v.name}
                                                                                        {
                                                                                            showVariableValues && <span className="ml-2">({v.value})</span>
                                                                                        }
                                                                                    </Badge>
                                                                                </ContextMenuTrigger>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                {v.value}
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                    <ContextMenuContent>
                                                                        <ContextMenuItem onClick={() => { setEditVariable({category: c, variable: v}) }}>
                                                                            <MdEdit className="mr-2"/> {v.name}
                                                                        </ContextMenuItem>
                                                                        <ContextMenuItem className="!text-destructive" onClick={() => {setDeleteVariable({category: c, variable: v})}}>
                                                                            <MdDelete className="mr-2"/> {v.name}
                                                                        </ContextMenuItem>
                                                                    </ContextMenuContent>
                                                                </ContextMenu>
                                                            )
                                                        })
                                                    }
                                            </CardContent>
                                        </Card>
                                    </ContextMenuTrigger>

                                    <ContextMenuContent>
                                        <ContextMenuItem onClick={() => {setAddVar2Category(c)}}>
                                            <MdAdd className="mr-2"/> Variable
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={() => {setEditCategory(c)}}>
                                            <MdEdit className="mr-2"/> {c.name}
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={() => setDeleteCategory(c.name)} className='!text-destructive'>
                                            <MdDelete className="mr-2"/> {c.name}
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            )
                        }) 
                    }
                    </div>
                </ScrollArea>
                : 
                null
            }
            <div className="mt-4 flex flex-wrap gap-6 items-center">
                <AddCategoryModal categories={categories} setCategories={setCategories}>
                    <Button className="flex gap-2"><MdAdd className="text-xl"/> Variable Category</Button>
                </AddCategoryModal>
                <div className="flex gap-2 items-center justify-center w-fit">
                    <Switch id="showVarValues" checked={showVariableValues} onCheckedChange={setShowVariableValues}/>
                    <Label htmlFor="showVarValues">Show Variable Values</Label>
                </div>
            </div>
        </div>
    )
}