"use client";

import fetchData from "@/lib/fetchData";
import { fileDownload } from "@/lib/fileDownload";
import IEmployee from "@/types/employee";
import {
	Button,
	Typography,
	Upload,
	message,
	Table,
	Flex,
	Input,
	Form,
	Checkbox,
	List,
	Card,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Groups() {
	const [isLoading, setIsLoading] = useState(false);
	const [NoOfTeams, setNoOfTeams] = useState(1);
	const [groupParams, setGroupParams] = useState<Array<string>>([
		"softskills",
	]);
	fetch("http://localhost:8000");
	const [groups, setGroups] = useState<Array<Array<string>>>([]);
	const uploadProps = {
		showUploadList: {
			showRemoveIcon: false,
		},
	};
	const { data: session } = useSession();
	const [employees, setEmployees] = useState<IEmployee[]>([]);
	const [selectedEmp, setSelectedEmp] = useState<Array<string>>([]);
	useEffect(() => {
		setSelectedEmp(employees.map((i) => i.email));
	}, [employees]);
	const columns: ColumnType<any>[] = [
		{
			key: "select",
			dataIndex: "email",
			title: "Select",
			render: (a) => (
				<Checkbox
					checked={selectedEmp.includes(a)}
					onChange={(e) => {
						setSelectedEmp((prev) => {
							if (e.target.checked) {
								return Array.from(new Set([...prev, a]));
							} else {
								return prev.filter((params) => params != a);
							}
						});
					}}
				></Checkbox>
			),
		},
		{
			key: "name",
			dataIndex: "name",
			title: "NAME",
			fixed: "left",
		},
		{
			key: "email",
			dataIndex: "email",
			title: "EMAIL",
		},
		{
			key: "age",
			dataIndex: "age",
			title: "AGE",
		},
		{
			key: "phone",
			dataIndex: "phone",
			title: "PHONE",
		},
		{
			key: "designation",
			dataIndex: "designation",
			title: "DESIGNATION",
		},
		{
			key: "gender",
			dataIndex: "gender",
			title: "GENDER",
		},
		{
			key: "location",
			dataIndex: "location",
			title: "LOCATION",
		},
		{
			key: "experience",
			dataIndex: "experience",
			title: "EXPERIENCE",
		},
		{
			key: "skills",
			dataIndex: "skills",
			title: "SKILLS",
		},
	];

	const processedData = employees.map((employee) => ({
		...employee,
		experience: employee.experience
			.map((exp) => `${exp.role} (${exp.years})`)
			.join(", "),
		skills: employee.skills
			.map((skill) => `${skill.name} (${skill.level})`)
			.join(", "),
	}));
	return (
		<>
			<div className="p-3">
				<Typography.Title>Groups</Typography.Title>
				<div>
					<Flex gap={5} className="mb-3">
						<Upload
							accept="application/json"
							maxCount={1}
							multiple={false}
							onChange={async (e) => {
								const file = e.file;
								if (file && file.type === "application/json") {
									if (!e.event) return;
									const jsonData =
										(await file.originFileObj?.text()) ||
										"";
									setEmployees(JSON.parse(jsonData));
								} else {
									message.error(
										"Please Upload json file. You have uploaded" +
											file.type
									);
								}
							}}
							{...uploadProps}
						>
							<Button>Upload JSON</Button>
						</Upload>
						<Button
							onClick={async () => {
								setIsLoading(true);
								const email = session?.user?.email;
								const res = await fetchData(
									`employees?email=${email}`,
									"GET"
								);
								setIsLoading(false);
								setEmployees(res.data as IEmployee[]);
							}}
						>
							Load Employees From DB
						</Button>
					</Flex>
					{employees.length != 0 && (
						<Flex gap={3} className="mb-2">
							<Button
								onClick={() => {
									setSelectedEmp(employees.map((i) => i.id));
								}}
							>
								Select All
							</Button>
							<Button
								onClick={() => {
									setSelectedEmp([]);
								}}
							>
								Clear Selection
							</Button>
						</Flex>
					)}

					<Table
						dataSource={processedData}
						columns={columns}
						loading={isLoading}
						pagination={{
							showSizeChanger: true,
							pageSizeOptions: [5, 10, 15, 20, 50, 100],
							defaultPageSize: 5,
						}}
					/>
					{employees.length != 0 && (
						<div>
							<Flex gap={3} className="mb-1">
								<Form
									layout="vertical"
									onFinish={async () => {
										const modifiedData = employees.map(
											(i) => {
												return {
													...i,
													id: undefined,
													phone: undefined,
													experience:
														i.experience.map(
															(j) => j.role
														),
													skills: i.skills.map(
														(j) => ({
															[j.name]: j.level,
														})
													),
												};
											}
										);
										const group = await fetchData(
											"http://localhost:8000/group",
											"POST",
											{
												candidates: employees, //TODO: Selected candidates
												team_no: NoOfTeams,
												params: groupParams.map((i) =>
													i.toLowerCase()
												),
											}
										);
										message.success("Groups Formed");
										setGroups(
											group.data as Array<Array<string>>
										);
									}}
								>
									<Form.Item label="Members Per Team">
										<Input
											type="Number"
											min={1}
											value={NoOfTeams}
											onChange={(e) => {
												setNoOfTeams(
													Number(e.target.value)
												);
											}}
											placeholder="No of members in a Team"
										></Input>
									</Form.Item>
									<Form.Item label="Form Team Based On">
										{[
											"Age",
											"Designation",
											"Gender",
											"Location",
											"Experience",
											"Skills",
										].map((i) => (
											<Checkbox
												key={"GroupParams-list" + i}
												checked={groupParams?.includes(
													i
												)}
												className="mr-4"
												onChange={(e) => {
													setGroupParams((prev) => {
														if (e.target.checked) {
															return Array.from(
																new Set([
																	...prev,
																	i,
																])
															);
														} else {
															return prev.filter(
																(params) =>
																	params != i
															);
														}
													});
												}}
											>
												{i}
											</Checkbox>
										))}
									</Form.Item>
									<Form.Item>
										<Button htmlType="submit">
											Form Groups
										</Button>
									</Form.Item>
								</Form>
							</Flex>
							{groups.length != 0 && (
								<div>
									<Typography.Title>
										Formed Groups
									</Typography.Title>
									<Button
										className="mb-2"
										onClick={() => {
											fileDownload(
												"Groups.json",
												JSON.stringify(groups)
											);
										}}
									>
										Download JSON
									</Button>
									<List
										dataSource={groups}
										grid={{
											gutter: 16,
											xs: 1,
											sm: 2,
											md: 4,
											lg: 4,
											xl: 6,
											xxl: 3,
										}}
										renderItem={(group, index) => (
											<List.Item>
												<Card
													title={
														"Group - " + (index + 1)
													}
												>
													<List
														dataSource={group}
														renderItem={(
															item,
															index
														) => (
															<List.Item>
																{index + 1}.{" "}
																{item}
															</List.Item>
														)}
													/>
												</Card>
											</List.Item>
										)}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
