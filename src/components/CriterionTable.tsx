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

import { Row, TableProps } from '@/App'
import { Input } from "@/components/ui/input"
import AddColModal from '@/components/AddColModal'
import AddRowModal from "@/components/AddRowModal";
import { useEffect, useState } from 'react';
import EditRowModal from './EditRowModal'
import { DeleteRowAlert } from './DeleteRowAlert'

export default function CriterionTable({columns, setColumns, rows, setRows} : TableProps) {
    const [editValue, setEditValue] = useState('')
    const [deleteValue, setDeleteValue] = useState('')
    return(
      <div className='mx-auto w-2/3 mt-12'>
        <Table>
          <TableCaption>A list of your Criterions and Values</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Subject</TableHead>
              {
                columns.map((c, i) => <TableHead key={i}>{c.title}</TableHead>)
              }
              <TableHead>
                <AddColModal columns={columns} setColumns={setColumns}/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EditRowModal value={editValue} setValue={setEditValue} rows={rows} setRows={setRows}/>
            <DeleteRowAlert value={deleteValue} setValue={setDeleteValue} rows={rows} setRows={setRows}/>  

            {
              rows.map((r, i) => (
                <ContextMenu key={i}>
                  <ContextMenuTrigger className='w-full h-full cursor-pointer' asChild>
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
                    <ContextMenuItem onClick={() => setEditValue(r.title)}>
                      Edit
                    </ContextMenuItem>
                    
                    <ContextMenuItem onClick={() => setDeleteValue(r.title)} className='!text-red-500'>
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