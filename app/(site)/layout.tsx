"use client";

import * as React from "react";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider, theme } from "antd";
import { useTheme } from "next-themes";
import { Background } from "@/components/Background";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { theme: NextTheme } = useTheme();
	return (
		<SessionProvider>
			<ConfigProvider
				theme={{
					algorithm:
						NextTheme === "dark"
							? theme.darkAlgorithm
							: theme.defaultAlgorithm,
				}}
			>
				<Background NextTheme={NextTheme} />
				<NavBar />
				{children}
			</ConfigProvider>
		</SessionProvider>
	);
}
