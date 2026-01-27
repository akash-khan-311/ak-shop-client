import { EcommerceMetrics } from "@/components/vendor/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/components/vendor/ecommerce/MonthlySalseChart";
import MonthlyTarget from "@/components/vendor/ecommerce/MonthlyTarget";

import StatisticsChart from "@/components/vendor/ecommerce/StatisticsChart";
import React, { Fragment } from "react";
import SalesOverview from "../../../_components/SalesOverview";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import StatusOverview from "../../../_components/StatusOverview";
import DashboardCharts from "../../../_components/dashboard-charts";
import OrdersTable from "../orders/_components/orders-table/RecentOrders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | AK Shop E-Commerce Solutions",
  description: "This is Dashboard for AK Shop",
};

export default function DashBoard() {
  return (
    <Fragment>
      <section>
        <DashboardPageHeader
          pathnames={["Vendor", "Dashboard"]}
          title="Dashboard"
          description="Dashboard"
        />

        <div className="space-y-8 mb-8">
          <SalesOverview />
          <StatusOverview />
          <DashboardCharts />
        </div>
      </section>

      <section>
        {/* <PageTitle component="h2">Recent Orders</PageTitle> */}

        <OrdersTable />
      </section>
    </Fragment>
  );
}
