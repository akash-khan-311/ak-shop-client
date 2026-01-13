import { EcommerceMetrics } from "@/components/vendor/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/components/vendor/ecommerce/MonthlySalseChart";
import MonthlyTarget from "@/components/vendor/ecommerce/MonthlyTarget";
import RecentOrders from "@/components/vendor/ecommerce/RecentOrders";
import StatisticsChart from "@/components/vendor/ecommerce/StatisticsChart";
import React from "react";

export default function DashBoard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DemographicCard /> */}
      </div>

      <div className="col-span-12 ">
        <RecentOrders />
      </div>
    </div>
  );
}
