"use client";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";

export type NavLinkProps = {
	href: string;
	label: string;
	icon?: React.ReactNode;
	className?: string;
};

const NavLink = ({ href, label, icon, className }: NavLinkProps) => {
	const isActive = usePathname() === href;

	if (isActive) {
		className = cn(className, "font-bold text-emerald-700");
	} else {
		className = cn(className, "text-emerald-900");
	}

	return (
		<Link
			href={href}
			className={cn(
				`flex items-center gap-1 p-4 hover:text-emerald-600 transition-all duration-[300ms]`,
				className,
			)}
		>
			{icon}
			<span>{label}</span>
		</Link>
	);
};

export default NavLink;
