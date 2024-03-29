import { Column, Row } from "@/App"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


type TableProps = {
    columns: Column[],
    rows: Row[]
}

export default function ResultTable({columns, rows} : TableProps) {
    const result = calcTotalResult(rows, columns)
    // console.log('result: ',result)
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
                        rows ? rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{toPercent(result[row.title])}</TableCell>
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

function toPercent(value: number): string {
    return `${(value * 100).toFixed(2)}%`;
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
          rowSum += normalizedValue * column.weight;
        }
      });
      result[row.title] = rowSum;
    });
  
    return result;
  }