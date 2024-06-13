"use client";

import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";


export default function DashboardPage() {
  return(
  <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
    <DataGrid />
    <DataCharts />
  </div>
  );
}
