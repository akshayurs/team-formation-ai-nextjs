"use client";

// import Table from "@/components/Table";
import fetchData from "@/lib/fetchData";
import IUser from "@/types/user";
import { Table, Typography } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import React, { useEffect, useState } from "react";
export default function Users() {
	const [users, setUsers] = useState<IUser[]>([]);
	const loadUsers = async () => {
		const res = await fetchData("users", "GET");
		setUsers(res.data as IUser[]);
	};
	useEffect(() => {
		loadUsers();
	}, []);
	const columns: ColumnType<any>[] = [
		{
			key: "name",
			dataIndex: "name",
			title: "NAME",
		},
		{
			dataIndex: "email",
			key: "email",
			title: "EMAIL",
		},
	];

	return (
		<div>
			<Table
				title={() => (
					<Typography.Title level={4}>Companies</Typography.Title>
				)}
				columns={columns}
				dataSource={users}
			/>
		</div>
	);
}
