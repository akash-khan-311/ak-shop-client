import { cn } from "@/lib/utils";

import Typography from "@/components/ui/typography";
import { DashboardCard } from "@/types/card";
import { Check, RefreshCcw, ShoppingCart, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function StatusOverview() {
  const cards: DashboardCard[] = [
    {
      icon: <ShoppingCart />,
      title: "Total Orders",
      value: "815",
      className: "bg-orange/30 dark:bg-orange dark:text-white text-orange",
    },
    {
      icon: <RefreshCcw />,
      title: "Orders Pending",
      value: "263",
      className: "text-teal dark:text-white bg-teal/30 dark:bg-teal",
    },
    {
      icon: <Truck />,
      title: "Orders Processing",
      value: "97",
      className: "text-yellow dark:text-white bg-yellow/30 dark:bg-yellow",
    },
    {
      icon: <Check />,
      title: "Orders Delivered",
      value: "418",
      className: "text-green dark:text-white bg-green/30 dark:bg-green",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center gap-3 p-0">
            <div
              className={cn(
                "size-12 rounded-full grid place-items-center [&>svg]:size-5",
                card.className
              )}
            >
              {card.icon}
            </div>

            <div className="flex flex-col gap-y-1">
              <Typography className="text-sm text-muted-foreground">
                {card.title}
              </Typography>

              <Typography className="text-2xl font-semibold text-popover-foreground">
                {card.value}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
