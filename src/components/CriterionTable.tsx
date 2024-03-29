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

export default function CriterionTable({columns, setColumns, rows, setRows} : TableProps) {
    const [editRow, setEditRow] = useState('')
    const [deleteRow, setDeleteRow] = useState('')

    const [editCol, setEditCol] = useState<Column | null>(null)
    const [deleteCol, setDeleteCol] = useState('')
    return(
      <div className='mx-auto w-2/3 mt-12'>
        <Table>
          <TableCaption>A list of your Criterions and Values</TableCaption>
          <TableHeader>
            <EditColModal value={editCol} setValue={setEditCol} cols={columns} setCols={setColumns}/>
            <DeleteColAlert value={deleteCol} setValue={setDeleteCol} cols={columns} setCols={setColumns}/>
            <TableRow>
              <TableHead className="w-[100px]">Subject</TableHead>
              {
                columns.map((c, i) => 
                  <ContextMenu key={i}>
                    <ContextMenuTrigger className='cursor-pointer' asChild>
                      <TableHead>{c.title} ({toPercent(c.weight)})</TableHead>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                    <ContextMenuItem onClick={() => setEditCol(c)}>
                      Edit
                    </ContextMenuItem>
                    
                    <ContextMenuItem onClick={() => setDeleteCol(c.title)} className='!text-red-500'>
                        Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                  </ContextMenu>
                )
              }
              <TableHead>
                <AddColModal columns={columns} setColumns={setColumns}/>
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
                      <TableCell colSpan={columns.length > 0? 1 : columns.length + 2}>
                            {r.title}
                      </TableCell>
                      {
                        columns.map((col, colIndex) => 
                          <TableInputCell key={col+"-"+colIndex} colAttr={col.title} rowIndex={i} rows={rows} setRows={setRows}/>
                        )
                      }
                      {
                        columns.length > 0 && <TableCell colSpan={1}/>
                      }
                    </TableRow>
                  </ContextMenuTrigger>
                  
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => setEditRow(r.title)}>
                      Edit
                    </ContextMenuItem>
                    
                    <ContextMenuItem onClick={() => setDeleteRow(r.title)} className='!text-red-500'>
                        Delete
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
    colAttr: string,
    rows: Row[],
    setRows: Function
  }
  function TableInputCell({rowIndex, colAttr, rows, setRows} : TableInputCellProps) {
    const [value, setValue] = useState(rows[rowIndex][colAttr] || '')
    useEffect(() => {
      setRows(rows.map((row, rI) => {
        if(rI === rowIndex) {
          return {
            ...row,
            [colAttr]: value
          }
        }
        return row
      }))
    // console.log('value:', value)
    }, [value])
    return(
      <TableCell colSpan={1}>
        <Input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder='Enter a value'
          className=''/>
      </TableCell>
    )
  }