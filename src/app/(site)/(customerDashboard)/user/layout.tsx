import Sidebar from "@/components/customerDashboard/Sidebar/Sidebar";
import React from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="">
        <div className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4] dark:bg-dark">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                <Sidebar />
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
