import '@/globals.css'
import { useEffect, useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import CriterionTable from './components/CriterionTable'
import ResultTable from './components/ResultTable'
import LinguisticVariables, { VariableCategory } from './components/LinguisticVariables'

function App() {
  
  const [tableProps, setTableProps] = useState<TableProps>({
    columns: [],
    setColumns: () => {},
    rows: [],
    setRows: () => {},
    categories: [],
    setCategories: () => {}
  })

  const [columns, setColumns] = useSessionStorage<Column[]>('columns', [])
  const [rows, setRows] = useSessionStorage<Row[]>('rows', [])
  const [categories, setCategories] = useSessionStorage<VariableCategory[]>('categories', [])


  useEffect(() => {
    setTableProps({
      columns,
      setColumns,
      rows,
      setRows,
      categories,
      setCategories
    })

  }, [columns, rows, categories])

  return (
    <>
      <CriterionTable {...tableProps}/>
      <LinguisticVariables {...tableProps}/>
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
  category: string | null,
  beneficial: boolean
}

export type TableProps = {
  columns: Column[],
  setColumns: (columns: Column[]) => void,
  rows: Row[],
  setRows: (rows: Row[]) => void,
  categories: VariableCategory[],
  setCategories: (categories: VariableCategory[]) => void
}

export default App
