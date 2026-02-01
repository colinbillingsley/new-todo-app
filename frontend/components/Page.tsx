import React from "react";

const Page = ({ children }: { children: React.ReactNode }) => {
	return <main className="min-h-screen mx-[12rem]">{children}</main>;
};

export default Page;
