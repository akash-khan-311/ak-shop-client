import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ menuItem, stickyMenu }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  return (
    <li
      onClick={() => setDropdownToggler(!dropdownToggler)}
      className={`group relative before:w-0 before:h-[3px] before:bg-white before:bg-pink before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full ${
        pathUrl.includes(menuItem.title) && "before:!w-full"
      }`}
    >
      <Link
        href="#"
        className={`hover:text-pink dark:hover:text-gray dark:text-white text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize ${
          stickyMenu ? "xl:py-4" : "xl:py-6"
        } ${pathUrl.includes(menuItem.title) && "!text-pink"}`}
      >
        {menuItem.title}

        <ChevronDown size={16} />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <ul
        className={`dropdown bg-white dark:bg-dark shadow-0 ${dropdownToggler && "flex"} ${
          stickyMenu
            ? "xl:group-hover:translate-y-0"
            : "xl:group-hover:translate-y-0"
        }`}
      >
        {menuItem.submenu.map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={`flex text-custom-sm  hover:text-pink hover:bg-gray-1 py-[7px] px-4.5 ${
                pathUrl === item.path && "text-pink dark:text-white bg-gray-1"
              } `}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;
