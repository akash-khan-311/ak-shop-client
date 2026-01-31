

export type TCouponUiStatus = "active" | "coming" | "expired" | "inactive" | "no-expiry";
export const getCouponStatus = (coupon: {
    isActive: boolean;
    startDate?: string | null;
    endDate?: string | null;
}): TCouponUiStatus => {

    if (!coupon.isActive) return "inactive";

    const now = new Date();

    const start = coupon.startDate ? new Date(coupon.startDate) : null;
    const end = coupon.endDate ? new Date(coupon.endDate) : null;


    const hasValidStart = start && !isNaN(start.getTime());
    const hasValidEnd = end && !isNaN(end.getTime());


    if (hasValidEnd && now.getTime() > (end as Date).getTime()) return "expired";


    if (hasValidStart && now.getTime() < (start as Date).getTime()) return "coming";


    return hasValidStart || hasValidEnd ? "active" : "no-expiry";
};

export const getStatus = (c) => {
    const now = new Date();
    const start = c.startDate ? new Date(c.startDate) : null;
    const end = c.endDate ? new Date(c.endDate) : null;

    if (end && now > end) return "Expired";
    if (start && now < start) return "Coming";
    return "Active";
};

export const statusLabel: Record<TCouponUiStatus, string> = {
    active: "Active",
    coming: "Coming",
    expired: "Expired",
    inactive: "Inactive",
    "no-expiry": "No Expiry",
};

export const statusClass: Record<TCouponUiStatus, string> = {
    active: "dark:bg-green/50 bg-green text-white",
    coming: "dark:bg-yellow/50 bg-yellow text-white",
    expired: "dark:bg-red/50 bg-red text-red",
    inactive: "dark:bg-gray-5/50 bg-gray-5 text-white",
    "no-expiry": "dark:bg-blue/50 bg-blue text-white",
};

export const formatDate = (date?: string | null) => {
    if (!date) return "—";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "—";

    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};