import React from "react";

type Props = {
  pathnames: string[];
  title: string;
  description: string;
};

export default function DashboardPageHeader({
  pathnames,
  title,
  description,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-2">
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold  mb-1">{title}</h2>
        <p className="text-slate-400 text-sm text-gray-6">{description}</p>
      </div>
      <div className="text-sm text-gray-6">
        <span className="text-gray-6 cursor-pointer">{pathnames[0]}</span>
        <span className="mx-2">{">"}</span>
        <span className="text-gray-6">{pathnames[1]}</span>
      </div>
    </div>
  );
}
