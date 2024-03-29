import '@/globals.css'
import { useEffect, useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import CriterionTable from './components/CriterionTable'
import ResultTable from './components/ResultTable'

function App() {
  const [columns, setColumns] = useState<Column[]>([])
  const [rows, setRows] = useState<Row[]>([])
  
  const [tableProps, setTableProps] = useState<TableProps>({
    columns: [],
    setColumns: () => {},
    rows: [],
    setRows: () => {},
  })

  const [storedColumns, setStoredColumns] = useSessionStorage<Column[]>('columns', columns)
  const [storedRows, setStoredRows] = useSessionStorage<Row[]>('rows', rows)
  
  useEffect(() => {
    setColumns(storedColumns)
    setRows(storedRows)
  }, [])

  useEffect(() => {
    setTableProps({
      columns,
      setColumns,
      rows,
      setRows
    })
    // console.log('columns:', columns)
    // console.log('rows:', rows)
    setStoredColumns(columns)
    setStoredRows(rows)
  }, [columns, rows])

  return (
    <>
      <CriterionTable {...tableProps}/>
      <ResultTable {...tableProps}/>
    </>
  )
}

export type Row = {
  title: string,
  [key: string]: string
}

export type Column = {
  title: string,
  weight: number,
  beneficial: boolean
}

export type TableProps = {
  columns: Column[],
  setColumns: Function,
  rows: Row[],
  setRows: Function
}

export default App
