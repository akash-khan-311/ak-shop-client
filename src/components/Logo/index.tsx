import Link from "next/link";

const Logo = () => {
  return (
    <Link className="flex-shrink-0 text-3xl font-semibold " href="/">
      <span className="text-pink dark:text-pink">AK</span> Shop
    </Link>
  );
};

export default Logo;
