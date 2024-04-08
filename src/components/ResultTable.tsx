import { Column, Row } from "@/App"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, toPercent } from "@/lib/utils"
import { useDarkMode } from "usehooks-ts"

import { Chart as ChartJS, ChartData, ChartTypeRegistry, registerables, ChartOptions } from "chart.js";
import { Chart } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";

ChartJS.register(...registerables);


type TableProps = {
    columns: Column[],
    rows: Row[]
}

export default function ResultTable({columns, rows} : TableProps) {

    const { isDarkMode } = useDarkMode()

    const result = useMemo(() => {
        return calcTotalResult(rows, columns)
    }, [columns, rows]) 
    
    const [min, max] = useMemo(() => {
        let min = Infinity
        let max = -Infinity

        for (const key in result) {
            if (result[key] < min) min = result[key]
            if (result[key] > max) max = result[key]
        }

        return [min, max]
    }, [result])

    const [chartData, setChartData] = useState<ChartData<keyof ChartTypeRegistry>>({
        datasets: [{
            data: Object.values(result).map((v) => parseFloat((v*100).toFixed(2))),
            label: "Result [%]"
        }],
        labels: Object.keys(result),
    })
    const options: ChartOptions<keyof ChartTypeRegistry> = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                min: 0,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }

    useEffect(() => {
        setChartData({
            datasets: [{
                data: Object.values(result).map((v) => parseFloat((v*100).toFixed(2))),
                label: "Result [%]",
                backgroundColor: Object.keys(result).map((key) => result[key] === min ? "rgba(255, 99, 132, 0.2)" : result[key] === max ? "rgba(75, 192, 192, 0.2)" : "rgba(255, 159, 64, 0.2)"),
                borderColor: Object.keys(result).map((key) => result[key] === min ? "rgba(255, 99, 132, 1)" : result[key] === max ? "rgba(75, 192, 192, 1)" : "rgba(255, 159, 64, 1)"),
                borderWidth: 1
            }],
            labels: Object.keys(result)
        })
    }, [result])

    return (
        <div className='mx-auto lg:w-2/3 max-lg:mx-6 flex flex-wrap gap-y-12 justify-between items-center'>
            <div className="w-full max-w-96 overflow-x-auto">
                <Table className="">
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
                                <TableRow 
                                  key={index} 
                                  className={cn(result[row.title] === min ? 
                                                  (isDarkMode? "bg-red-300 hover:bg-red-200 text-secondary" : "bg-red-100 hover:bg-red-200") : 
                                                  result[row.title] === max ?
                                                  (isDarkMode? "bg-green-300 hover:bg-green-200 text-secondary" : "bg-green-100 hover:bg-green-200") : "")}>
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
            <div className="w-full lg:w-1/2 mlg:max-h-96">
              <Chart type="bar" updateMode="active" data={chartData} options={options}/>
            </div>
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