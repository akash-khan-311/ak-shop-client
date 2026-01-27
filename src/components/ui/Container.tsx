import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="md:container px-3 mx-auto md:px-0">{children}</div>;
};

export default Container;
