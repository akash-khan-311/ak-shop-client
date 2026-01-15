import { RotateCcw, Layers3, CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { DashboardCard } from "@/types/card";
import Typography from "@/components/ui/typography";

export default function SalesOverview() {
  const cards: DashboardCard[] = [
    {
      icon: <Layers3 />,
      title: "Today Orders",
      value: "$897.40",
      className: "bg-teal",
    },
    {
      icon: <Layers3 />,
      title: "Yesterday Orders",
      value: "$679.93",
      className: "bg-orange",
    },
    {
      icon: <RotateCcw />,
      title: "This Month",
      value: "$13146.96",
      className: "bg-green",
    },
    {
      icon: <CalendarDays />,
      title: "Last Month",
      value: "$31964.92",
      className: "bg-yellow",
    },
    {
      icon: <CalendarDays />,
      title: "All-Time Sales",
      value: "$626513.05",
      className: "bg-red",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-2">
      {cards.map((card, index) => (
        <div
          key={`sales-overview-${index}`}
          className={cn(
            "p-6 rounded-lg flex flex-col items-center justify-center space-y-3 text-center",
            card.className
          )}
        >
          <div className="[&>svg]:size-8">{card.icon}</div>

          <Typography className="">{card.title}</Typography>

          <Typography className="text-2xl font-semibold">
            {card.value}
          </Typography>
        </div>
      ))}
    </div>
  );
}
