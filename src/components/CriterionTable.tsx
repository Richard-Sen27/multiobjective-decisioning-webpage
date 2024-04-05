import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Column, Row, TableProps } from '@/App'
import { Input } from "@/components/ui/input"
import AddColModal from '@/components/AddColModal'
import AddRowModal from "@/components/AddRowModal";
import { useEffect, useState } from 'react';
import EditRowModal from './EditRowModal'
import { DeleteRowAlert } from './DeleteRowAlert'
import { DeleteColAlert } from './DeleteColAlert'
import EditColModal from './EditColModal'
import { toPercent } from '@/lib/utils'
import { BsArrowUpRightCircle, BsArrowDownRightCircle } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { VariableCategory } from './LinguisticVariables'
import { MdDelete, MdEdit } from 'react-icons/md'

export default function CriterionTable({columns, setColumns, rows, setRows, categories} : TableProps) {
    const [editRow, setEditRow] = useState('')
    const [deleteRow, setDeleteRow] = useState('')

    const [editCol, setEditCol] = useState<Column | null>(null)
    const [deleteCol, setDeleteCol] = useState('')

    return(
      <div className='mx-auto md:w-2/3 max-md:mx-8'>
        <Table>
          <TableCaption>A list of your Criterions and Values</TableCaption>
          <TableHeader>
            <EditColModal value={editCol} setValue={setEditCol} cols={columns} setCols={setColumns} categories={categories}/>
            <DeleteColAlert value={deleteCol} setValue={setDeleteCol} cols={columns} setCols={setColumns}/>
            <TableRow>
              <TableHead className="w-[100px]">Subject</TableHead>
              {
                columns.map((c, i) => 
                  <ContextMenu key={i}>
                    <ContextMenuTrigger className='cursor-pointer' asChild>
                      <TableHead className='text-nowrap select-none'>
                        <div className='flex items-center gap-2'>
                          {c.beneficial? <BsArrowUpRightCircle className='text-green-500'/> : <BsArrowDownRightCircle className='text-red-500'/>} 
                          {c.title} ({toPercent(c.weight)})
                        </div>
                      </TableHead>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                    <ContextMenuItem onClick={() => setEditCol(c)}>
                      <MdEdit className='mr-2'/> {c.title}
                    </ContextMenuItem>
                    
                    <ContextMenuItem onClick={() => setDeleteCol(c.title)} className='!text-red-500'>
                        <MdDelete className='mr-2'/> {c.title}
                    </ContextMenuItem>
                  </ContextMenuContent>
                  </ContextMenu>
                )
              }
              <TableHead>
                <AddColModal columns={columns} setColumns={setColumns} categories={categories}/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EditRowModal value={editRow} setValue={setEditRow} rows={rows} setRows={setRows}/>
            <DeleteRowAlert value={deleteRow} setValue={setDeleteRow} rows={rows} setRows={setRows}/>  

            {
              rows.map((r, i) => (
                <ContextMenu key={i}>
                  <ContextMenuTrigger className='cursor-pointer' asChild>
                    <TableRow key={i}>
                      <TableCell className="text-nowrap select-none" colSpan={columns.length > 0? 1 : columns.length + 2}>
                            {r.title}
                      </TableCell>
                      {
                        columns.map((col, colIndex) => 
                          <TableInputCell key={col+"-"+colIndex} col={col} categories={categories} rowIndex={i} rows={rows} setRows={setRows}/>
                        )
                      }
                      {
                        columns.length > 0 && <TableCell colSpan={1}/>
                      }
                    </TableRow>
                  </ContextMenuTrigger>
                  
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => setEditRow(r.title)}>
                      <MdEdit className='mr-2'/> {r.title}
                    </ContextMenuItem>
                    
                    <ContextMenuItem onClick={() => setDeleteRow(r.title)} className='!text-red-500'>
                        <MdDelete className='mr-2'/> {r.title}
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            }
            <TableRow>
              <TableCell className="p-2" colSpan={columns.length+2}>
                <AddRowModal rows={rows} setRows={setRows}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
  
  type TableInputCellProps = {
    rowIndex: number,
    col: Column,
    categories: VariableCategory[],
    rows: Row[],
    setRows: (rows: Row[]) => void
  }

  function TableInputCell({rowIndex, col, categories, rows, setRows} : TableInputCellProps) {
    const [value, setValue] = useState(rows[rowIndex][col.title] || '')

    useEffect(() => {
      setRows(rows.map((row, rI) => {
        return rI === rowIndex? 
          {
            ...row,
            [col.title]: value
          }
        :
          row
      }))

    }, [value])

    return(
      <TableCell colSpan={1}>
        {
          col.category ?
            <Select value={value} onValueChange={(e) => {setValue(e)}}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a variable"/>
              </SelectTrigger>
              <SelectContent>
                {
                  categories.find((c) => c.name === col.category)?.variables.map((v, i) => 
                    <SelectItem key={i} value={v.value.toString()}>{v.name}</SelectItem>
                  )
                }
              </SelectContent>
            </Select>
            :
            <Input 
              type="number" 
              value={value} 
              onChange={(e) => setValue(e.target.value)} 
              placeholder='Enter a value'
              className=''/>    
        }
      </TableCell>
    )
  }