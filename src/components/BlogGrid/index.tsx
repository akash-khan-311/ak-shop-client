import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import blogData from "./blogData";
import BlogItem from "../Blog/BlogItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogGrid = () => {
  return (
    <>
      <Breadcrumb title={"Blog Grid"} pages={["blog grid"]} />{" "}
      <section className="overflow-hidden py-20 bg-gray-2 dark:bg-dark-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5">
            {/* <!-- blog item --> */}
            {blogData.map((blog) => (
              <BlogItem blog={blog} key={blog.id} />
            ))}
          </div>

          {/* <!-- Blog Pagination Start --> */}
          <div className="flex justify-center mt-15">
            <div className="bg-white dark:bg-dark shadow-1 rounded-md p-2">
              <ul className="flex items-center">
                <li>
                  <button
                    id="paginationLeft"
                    aria-label="button for pagination left"
                    type="button"
                    disabled
                    className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px disabled:text-gray-4"
                  >
                    <ChevronLeft size={20} />
                  </button>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] bg-pink text-white hover:text-white hover:bg-pink"
                  >
                    1
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-pink"
                  >
                    2
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-pink"
                  >
                    3
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-pink"
                  >
                    4
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-pink"
                  >
                    5
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-pink"
                  >
                    ...
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-pink"
                  >
                    10
                  </a>
                </li>

                <li>
                  <button
                    id="paginationLeft"
                    aria-label="button for pagination left"
                    type="button"
                    className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-pink disabled:text-gray-4"
                  >
                    <ChevronRight size={20} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- Blog Pagination End --> */}
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
