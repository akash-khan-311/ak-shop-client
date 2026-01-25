"use client";

import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
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
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetTemplatesQuery } from "@/redux/features/specTemplate/specTemplate";
import { useGetUserByIdQuery } from "@/redux/features/users/usersApi";
import { useAppSelector } from "@/redux/hook";
import { Plus, SquarePen, Trash2, ZoomIn } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
const tableHeading = [
  "Category",
  "Subcategory",
  "Fields",
  "Added By",
  "Published",
  "View",
  "Actions",
];
export default function AllSpecificationsList() {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const userId = user?.userId;
  const { data, isLoading } = useGetTemplatesQuery(
    { token, userId },
    { skip: !token },
  );

  const {data: userData} = useGetUserByIdQuery(userId)

const userDetails = userData?.data

  const templates = useMemo(() => data?.data || [], [data]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTemplates = templates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <div>
      <DashboardPageHeader
        pathnames={["Specification", "Templates"]}
        title="Specification Templates"
        description="All specification templates listed here"
      />

      {/* Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="relative w-full border overflow-x-auto scrollbar-thin scrollbar-thumb-gray-3">
          <Table>
            {/* Header */}
            <TableHeader>
              <TableRow>
                {tableHeading.map((item) => (
                  <TableHead key={item} className="uppercase">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody className="dark:bg-[#000] bg-gray-2">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : paginatedTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No templates found</TableCell>
                </TableRow>
              ) : (
                paginatedTemplates.map((t: any) => (
                  <TableRow key={t._id} className="hover:bg-muted/50">
                    {/* Category */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium capitalize">{t.categorySlug}</span>
                      </div>
                    </TableCell>

                    {/* Subcategory */}
                    <TableCell> <span className="font-medium capitalize">{t.subcategorySlug}</span></TableCell>
                    {/* Fields */}
                    <TableCell>{t.fields?.length || 0}</TableCell>

                    {/* Published */}
                    <TableCell>
                  
                      <span className="font-medium capitalize">{userDetails?.name} {userData?.lastName}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          t.isPublished
                            ? "bg-green/20 text-green"
                            : "bg-gray-7 text-gray-3"
                        }`}
                      >
                        {t.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </TableCell>
                    <TableCell>
                       <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/dashboard/spec-templates/${t._id}`}>
                              <ZoomIn size={20} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Template</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="flex items-center gap-5">
                      <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/dashboard/spec-templates/${t._id}`}>
                              <SquarePen size={20} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Template</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/dashboard/spec-templates/${t._id}`}>
                              <Trash2 size={20} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Specifications</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <DataTablePagination
          filteredItems={templates}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
