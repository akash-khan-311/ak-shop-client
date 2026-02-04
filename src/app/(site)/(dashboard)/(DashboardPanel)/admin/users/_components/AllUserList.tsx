"use client";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useToggleStatusChangeMutation,
} from "@/redux/features/auth/authApi";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo, useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { USER_ROLE } from "@/constant";
import toast from "react-hot-toast";
import { ConfirmationModal } from "@/components/ui/confirmationToast";

const statusStyles = {
  active: "bg-green/60 text-white",
  inactive: "bg-orange/60 text-white",
  blocked: "bg-red/60 text-white",
};

export default function AllUserList() {
  const token: string | undefined = useAppSelector(selectCurrentToken);
  const [toggleStatus, { isLoading: statusLoading }] =
    useToggleStatusChangeMutation();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>(null);
  const { data, isLoading } = useGetAllUsersQuery(
    token ? undefined : skipToken,
  );
  const users = useMemo(() => data?.data || [], [data]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeading = ["Name", "Email", "Phone", "Role", "Status", "Actions"];

  const [filters, setFilters] = useState({
    search: "",
    role: "All Users",
    sort: "No Sort",
  });
  // Filter and sort products
  const filteredUsers = useMemo(() => {
    let filtered = users?.filter((user: any) => {
      // 🔍 Search filter
      const matchesSearch = user.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      // user filter
      const matchesUser =
        filters.role === "All Users" || user.role === filters.role;

      return matchesSearch && matchesUser;
    });

    //  Sort
    if (filters.sort === "Active") {
      filtered = filtered.filter((user: any) => user.status === "active");
    } else if (filters.sort === "Inactive") {
      filtered = filtered.filter((user: any) => user.status === "inactive");
    } else if (filters.sort === "Blocked") {
      filtered = filtered.filter((user: any) => user.status === "blocked");
    }

    return filtered;
  }, [users, filters]);
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const filterKeys = [
    {
      key: "search",
      type: "search" as "search",
      placeholder: "Search Name...",
    },
    {
      key: "role",
      type: "select" as "select",
      options: ["All Users", ...users.map((user) => user.role)],
    },
    {
      key: "sort",
      type: "sort" as "sort",
      options: ["No Sort", "Active", "Inactive", "Blocked"],
    },
  ];

  const handleBlockedUnblocked = async (id: string) => {
    try {
      const data = {
        id: id,
        token: token,
      };

      const result = await toggleStatus(data).unwrap();
      if (result?.success) toast.success(result?.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to toggle published status");
    }
  };

  const confirmDelete = (id: number) => {
    setModalOpen(true);
    setIdToDelete(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const result = await deleteUser({ id: idToDelete }).unwrap();

      toast.success(result.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    } finally {
      setModalOpen(false);
      setIdToDelete(null);
    }
  };
  return (
    <div className="">
      <div className="">
        <DashboardPageHeader
          pathnames={["Users", "All Users"]}
          title="All Users"
          description="All Users Listing Here"
        />

        {/* Filters */}
        <DataTableFilters
          filters={filterKeys}
          values={filters}
          setValues={setFilters}
          onReset={() =>
            setFilters({
              search: "",
              role: "All Users",
              sort: "No Sort",
            })
          }
        />

        {/* Table */}
        <div className="rounded-lg overflow-hidden shadow-xl">
          <div className="relative w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-3">
            <Table className="">
              {/* Table Header */}
              <TableHeader>
                <TableRow>
                  {tableHeading.map((item) => (
                    <TableHead className="uppercase" key={item}>
                      {item === "Category Name" ? (
                        <div className="flex items-center gap-x-5">{item}</div>
                      ) : (
                        <>{item}</>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="dark:bg-[#000] bg-gray-2">
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-24 text-center text-base"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-base"
                    >
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers?.map((user: any) => (
                    <TableRow
                      className={`hover:bg-muted/90 dark:hover:bg-muted/50  "dark:bg-dark dark:dark:bg-[#000] bg-white`}
                      key={user._id}
                    >
                      <TableCell>
                        <div className="flex items-center gap-x-5">
                          <div className="flex  items-center gap-x-2 rounded-full">
                            <Image
                              src={user?.avatar?.url || "/demo_male.png"}
                              width={50}
                              height={50}
                              alt={user.name}
                              className="rounded-full hidden lg:block w-10 h-10 object-cover"
                            />

                            <h2 className="text-base">{user.name}</h2>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-x-5">
                          <div className="flex  items-center gap-x-2 rounded-full">
                            <h2 className="text-base">{user.email}</h2>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-x-5">
                          <div className="flex  items-center gap-x-2 rounded-full">
                            <h2 className="text-base capitalize">
                              {user?.phone || "N/A"}
                            </h2>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-x-5">
                          <div className="flex  items-center gap-x-2 rounded-full">
                            <h2 className="text-base capitalize">
                              {user.role}
                            </h2>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-x-5">
                          <div className="flex items-center gap-x-2 rounded-full">
                            <h2
                              className={`${statusStyles[user.status]} text-base capitalize px-4 rounded-full`}
                            >
                              {user.status}
                            </h2>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-start items-center gap-x-10">
                          <TooltipProvider delayDuration={1}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <label className="relative inline-block">
                                  <input
                                    onChange={() =>
                                      handleBlockedUnblocked(user.id)
                                    }
                                    disabled={
                                      user.role === USER_ROLE.superAdmin
                                    }
                                    checked={
                                      user.status === "blocked" ? true : false
                                    }
                                    type="checkbox"
                                    className="peer invisible"
                                  />
                                  <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-red border border-slate-300 transition-all duration-100 peer-checked:bg-green disabled:opacity-50 disabled:bg-pink peer-disabled:bg-gray-4 peer-disabled:border-gray-4 " />

                                  <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4  peer-disabled:bg-gray-2 peer-disabled:cursor-not-allowed " />
                                </label>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {user.status === "blocked"
                                    ? "Unblock User"
                                    : user.role === USER_ROLE.superAdmin
                                      ? "Action Not Allowed"
                                      : "Block User"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider delayDuration={1}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => confirmDelete(user.id)}
                                  className="disabled:opacity-50"
                                  disabled={user.role === USER_ROLE.superAdmin}
                                >
                                  <Trash2 size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {user.status === "blocked"
                                    ? "Delete User"
                                    : user.role === USER_ROLE.superAdmin
                                      ? "Action Not Allowed"
                                      : "Delete User"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <DataTablePagination
            filteredItems={filteredUsers}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      {modalOpen && (
        <ConfirmationModal
          onCancel={() => setModalOpen(false)}
          isLoading={deleteLoading}
          title={`Are You Sure?`}
          message="This action cannot be undone. This will permanently delete the category and its associated data from the database."
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}
