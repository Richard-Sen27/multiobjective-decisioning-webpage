import { Column, Row } from "@/App"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, toPercent } from "@/lib/utils"


type TableProps = {
    columns: Column[],
    rows: Row[]
}

export default function ResultTable({columns, rows} : TableProps) {
    const result = calcTotalResult(rows, columns)
    let min = Infinity
    let max = -Infinity
    for (const key in result) {
        if (result[key] < min) min = result[key]
        if (result[key] > max) max = result[key]
    }
    // console.log('result: ',result)
    return (
        <div className='mx-auto md:w-2/3 max-md:mx-8 mt-12'>
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
                        Object.keys(result).length > 0 ? rows.map((row, index) => (
                            <TableRow key={index} className={cn(result[row.title] === min? "bg-red-100 hover:bg-red-200" : result[row.title] === max? "bg-green-100 hover:bg-green-200" : "")}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{toPercent(result[row.title])}</TableCell>
                            </TableRow>
                        ))
                        :
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">No data avaliable!</TableCell>
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
    const result: Result = {};
  
    // Calculate the min and max values for each column
    const columnStats: { [key: string]: { min: number, max: number } } = {};
    columns.forEach(column => {
      columnStats[column.title] = { min: Infinity, max: -Infinity };
      rows.forEach(row => {
        const value = parseFloat(row[column.title]);
        if (!isNaN(value)) {
          columnStats[column.title].min = Math.min(columnStats[column.title].min, value);
          columnStats[column.title].max = Math.max(columnStats[column.title].max, value);
        }
      });
    });
  
    // Normalize data, apply weights, and sum up for each row
    rows.forEach(row => {
      let rowSum = 0;
      columns.forEach(column => {
        const value = parseFloat(row[column.title]);
        if (!isNaN(value)) {
          const normalizedValue = column.beneficial
            ? value / columnStats[column.title].max
            : columnStats[column.title].min / value;
          rowSum += isNaN(normalizedValue)? 0: normalizedValue * column.weight;
        }
      });
      result[row.title] = rowSum;
    });
  
    return result;
  }