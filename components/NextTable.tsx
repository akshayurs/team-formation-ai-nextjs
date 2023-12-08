"use client";
import React from "react";
import {
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";
interface TableProps {
	columns: Array<{ key: string; label: string }>;
	rows: Array<any>;
	isLoading?: boolean;
}
const NextTable: React.FC<TableProps> = ({
	columns,
	rows,
	isLoading = false,
}) => {
	return (
		<Table
			aria-label="Example static collection table"
			classNames={{
				table: "min-h-[400px]",
			}}
		>
			<TableHeader columns={columns}>
				{columns.map((column) => (
					<TableColumn key={column.key}>{column.label}</TableColumn>
				))}
			</TableHeader>
			<TableBody
				isLoading={isLoading}
				items={rows}
				loadingContent={<Spinner label="Loading..." />}
			>
				{(item) => (
					<TableRow key={item.key}>
						{(columnKey) => (
							<TableCell>
								{getKeyValue(item, columnKey)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
export default NextTable;
