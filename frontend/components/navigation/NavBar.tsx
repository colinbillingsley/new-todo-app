import {
	Folders,
	LayoutDashboard,
	ListCheck,
	ListChecks,
	UserCircle2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";
import LogoutButton from "../LogoutButton";

const NAVICONSIZE = 20;
const STROKEWIDTH = 1.5;

export interface NavLinkType {
	icon?: React.ReactNode;
	href: string;
	label: string;
}

const NavLinks: NavLinkType[] = [
	{
		icon: <LayoutDashboard size={NAVICONSIZE} strokeWidth={STROKEWIDTH} />,
		href: "/dashboard",
		label: "Dashboard",
	},
	{
		icon: <Folders size={NAVICONSIZE} strokeWidth={STROKEWIDTH} />,
		href: "/lists",
		label: "Lists",
	},
	{
		icon: <ListChecks size={NAVICONSIZE} strokeWidth={STROKEWIDTH} />,
		href: "/tasks",
		label: "Tasks",
	},
	{
		icon: <UserCircle2 size={NAVICONSIZE} strokeWidth={STROKEWIDTH} />,
		href: "/account",
		label: "Account",
	},
];

const NavBar = () => {
	return (
		<div className="w-full bg-emerald-50 flex items-center justify-between px-4">
			<div>ToDo.io</div>

			<div className="flex items-center gap-4">
				<nav>
					<ul className="flex items-center justify-center gap-2">
						{NavLinks.map((link) => (
							<li key={link.href}>
								<NavLink href={link.href} label={link.label} icon={link.icon} />
								{/* <Link href={link.href} className="flex items-center gap-1 p-4">
								{link.icon}
								<span>{link.label}</span>
							</Link> */}
							</li>
						))}
					</ul>
				</nav>

				<LogoutButton />
			</div>
		</div>
	);
};

export default NavBar;
