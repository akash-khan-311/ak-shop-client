"use client";
import Loader from "@/components/ui/Loader/PageLoader";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import RoleBadges from "./RoleBadges";

export default function Profile() {
  const token = useAppSelector(selectCurrentToken);
  const { data, isLoading } = useGetMeQuery(token);
  const user = data?.data;
  const isAdmin = user?.role === "admin";

  if (isLoading) return <Loader />;
  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-gray-6 bg-white/60 dark:bg-dark-2/40 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border border-gray-6">
              <Image
                src={user?.avatar?.url || "/demo_male.png"}
                alt={`${user?.name} profile photo`}
                width={150}
                height={150}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-9 dark:text-gray-1">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-6 dark:text-gray-4">
                {user?.email}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <RoleBadges role={user?.role} status={user?.status} />
              </div>
            </div>
          </div>

          {/* Role-based primary actions */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
              className="px-4 py-2 rounded-xl bg-pink text-white text-sm font-medium"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/profile/edit"
              className="px-4 py-2 rounded-xl border border-gray-6 text-sm font-medium hover:bg-gray-2 dark:hover:bg-dark"
            >
              Edit Profile
            </Link>

            {isAdmin && (
              <Link
                href="/admin/users"
                className="px-4 py-2 rounded-xl border border-gray-6 text-sm font-medium hover:bg-gray-2 dark:hover:bg-dark"
              >
                Manage Users
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Details grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account */}
        <div className="rounded-2xl border border-gray-6 bg-white/60 dark:bg-dark-2/40 p-6 shadow-sm">
          <h2 className="text-base font-semibold mb-4">Account</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-6 dark:text-gray-4">Role</dt>
              <dd className="font-medium capitalize">{user?.role}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-6 dark:text-gray-4">Email</dt>
              <dd className="font-medium">{user?.email}</dd>
            </div>
            {user?.phone && (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-6 dark:text-gray-4">Phone</dt>
                <dd className="font-medium">{user?.phone}</dd>
              </div>
            )}
            {user?.createdAt && (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-6 dark:text-gray-4">Joined</dt>
                <dd className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Role panel */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-6 bg-white/60 dark:bg-dark-2/40 p-6 shadow-sm">
          <h2 className="text-base font-semibold mb-4">
            {isAdmin ? "Admin Panel" : "User Panel"}
          </h2>

          {isAdmin ? (
            <div className="space-y-3 text-sm">
              <p className="text-gray-6 dark:text-gray-4">
                Manage users, vendors, categories, products, and system
                settings.
              </p>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  title="Permissions"
                  value={
                    user?.permissions?.length
                      ? `${user?.permissions.length} granted`
                      : "—"
                  }
                />
                <InfoCard title="Status" value={user?.status || "—"} />
              </div> */}

              <div className="pt-2 flex gap-2 flex-wrap">
                <Link
                  className="px-4 py-2 rounded-xl bg-gray-7 text-white text-sm"
                  href="/admin/orders"
                >
                  All Orders
                </Link>
                <Link
                  className="px-4 py-2 rounded-xl bg-gray-7 text-white text-sm"
                  href="/admin/settings"
                >
                  Settings
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <p className="text-gray-6 dark:text-gray-4">
                View your orders, manage addresses, and update your profile.
              </p>
              <div className="pt-2 flex gap-2 flex-wrap">
                <Link
                  className="px-4 py-2 rounded-xl bg-gray-7 text-white text-sm"
                  href="/user/orders"
                >
                  My Orders
                </Link>
                <Link
                  className="px-4 py-2 rounded-xl bg-gray-7 text-white text-sm"
                  href="/user/address"
                >
                  Addresses
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-6 p-4 bg-white/40 dark:bg-dark/30">
      <p className="text-xs text-gray-6 dark:text-gray-4">{title}</p>
      <p className="text-sm font-semibold mt-1">{value}</p>
    </div>
  );
}
