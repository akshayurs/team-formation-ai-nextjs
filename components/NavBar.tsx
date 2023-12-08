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
	Link,
	Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

export default function App() {
	const path = usePathname();
	const { theme, setTheme } = useTheme();
	const { data: session } = useSession();
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
						onClick: () => {
							signOut({
								callbackUrl: "/",
							});
						},
						href: "temp signout",
					},
			  ],
	};
	return (
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
							onClick={item.onClick ?? undefined}
							variant="flat"
						>
							<Link href={item.href}></Link>
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
	);
}
