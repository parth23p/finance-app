"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { Chart, ChartLoading } from "./chart";
import { SpendingPie, SpendingPieLoading } from "./spending-pie";
import { categories } from "@/db/schema";

export const DataCharts=()=>{
    const{data,isLoading}=useGetSummary();
    // console.log("summary data:",{data})
    if(isLoading){
        return(
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <ChartLoading />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
               <SpendingPieLoading />
            </div>
        </div>
        )
    }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart
                    data={data?.activeDays}
                />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPie data={data?.categories}/>
            </div>
        </div>
    )
}