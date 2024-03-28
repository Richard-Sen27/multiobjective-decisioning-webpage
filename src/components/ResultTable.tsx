import { Column, Row } from "@/App"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


type TableProps = {
    columns: Column[],
    rows: Row[]
}

export default function ResultTable({columns, rows} : TableProps) {
    const result = calcTotalResult(rows, columns)
    return (
        <div className='mx-auto w-2/3 mt-12'>
            <Table className="w-96">
                <TableCaption>Calculated Subject Perfomances</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Result</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {   
                        false ? rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{result[row.title]}</TableCell>
                            </TableRow>
                        ))
                        :
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">No data avaliable! Please enter all values!</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

type Result = {
    [key: string]: number
}

function calcTotalResult(rows: Row[], columns: Column[]): Result {

    return {}
}