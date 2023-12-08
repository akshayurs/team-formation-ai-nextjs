"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DarkModeToggle = dynamic(() => import("react-dark-mode-toggle"), {
	ssr: false,
});
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

export default function App() {
	const path = usePathname();
	const { theme, setTheme } = useTheme();
	const { data: session, status } = useSession();
	const [windowLoaded, setWindowLoaded] = useState(false);
	useEffect(() => {
		setWindowLoaded(true);
	}, []);

	const items = {
		center: [
			{ name: "Home", href: "/" },
			{ name: "Companies", href: "/users" },
			...(session
				? [
						{ name: "Employees", href: "/employees" },
						{ name: "Teams", href: "/teams" },
				  ]
				: []),
			{ name: "About", href: "/about" },
		],
		right: !session
			? [{ name: "Login", href: "/api/auth/signin", onClick: undefined }]
			: [
					{
						name: "Sign Out",
						href: "/api/auth/signout",
					},
			  ],
	};
	return (
		<div>
			{status === "loading" && (
				<div className="z-50 fixed top-0 left-0 h-screen w-screen flex items-center justify-center backdrop-blur-sm">
					<Spinner />
				</div>
			)}
			<Navbar shouldHideOnScroll>
				<NavbarBrand>
					<p className="font-bold text-inherit">Team AI</p>
				</NavbarBrand>
				<NavbarContent className="gap-4" justify="center">
					{items.center.map((item) => {
						const isActive = path === item.href;
						return (
							<NavbarItem isActive={isActive} key={item.href}>
								<Link
									color={isActive ? "primary" : "foreground"}
									href={item.href}
								>
									{item.name}
								</Link>
							</NavbarItem>
						);
					})}
				</NavbarContent>
				<NavbarContent justify="end">
					{items.right.map((item) => (
						<NavbarItem key={item.href}>
							<Button
								color="default"
								variant="flat"
								as={Link}
								href={item.href}
							>
								{item.name}
							</Button>
						</NavbarItem>
					))}
					{windowLoaded && (
						<DarkModeToggle
							onChange={(val) => {
								setTheme(val ? "dark" : "light");
							}}
							checked={theme === "dark"}
							size={80}
						/>
					)}
				</NavbarContent>
			</Navbar>
		</div>
	);
}
