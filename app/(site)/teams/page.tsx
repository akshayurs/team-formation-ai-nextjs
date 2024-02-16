"use client";

import fetchData from "@/lib/fetchData";
import IEmployee from "@/types/employee";
import {
	Button,
	Checkbox,
	DatePicker,
	Flex,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Upload,
	message,
} from "antd";
import Table, { ColumnType } from "antd/es/table";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
export default function Teams() {
	interface project {
		name: string;
		description: string;
		duration: number;
		techStack: { skill: string; level: number }[];
		budget: number;
		deadlineRigidity: "FLEXIBLE" | "STRICT" | "MODERATE";
		reliabilityLevel: "LOW" | "MEDIUM" | "HIGH";
		startDate: string;
		location: {
			name: string;
			rigidity: "FLEXIBLE" | "STRICT" | "MODERATE";
		};
		paradigmType: "OPEN" | "CLOSED" | "RANDOM";
		experienceLevel: "JUNIOR" | "INTERMEDIATE" | "SENIOR";
		availability: "FULLTIME" | "PARTTIME";
	}
	const [isLoading, setIsLoading] = useState(false);
	const [NoOfTeams, setNoOfTeams] = useState(1);
	const [groupParams, setGroupParams] = useState<Array<string>>([
		"softskills",
	]);
	const [groups, setGroups] = useState<Array<Array<string>>>([]);
	const uploadProps = {
		showUploadList: {
			showRemoveIcon: false,
		},
	};
	const { data: session } = useSession();
	type OutputTable = IEmployee & {
		score: number;
	};
	const [employees, setEmployees] = useState<IEmployee[]>([]);
	const [recommendedEmployees, setRecommendedEmployees] = useState<
		OutputTable[]
	>([]);
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
	const processedRecommended = recommendedEmployees.map((employee) => ({
		...employee,
		experience: employee.experience
			.map((exp) => `${exp.role} (${exp.years})`)
			.join(", "),
		skills: employee.skills
			.map((skill) => `${skill.name} (${skill.level})`)
			.join(", "),
	}));
	const outputColumns: ColumnType<any>[] = [
		{
			key: "Score",
			dataIndex: "score",
			title: "SCORE",
			fixed: "left",
			render: (a) => {
				return (
					<div
						style={{
							color: a == 0 ? "red" : "green",
						}}
					>
						{a}
					</div>
				);
			},
		},
		...columns.slice(1),
	];
	console.log(recommendedEmployees);
	return (
		<div className="mx-5">
			<div className="w-2/3 mx-auto my-2">
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
									(await file.originFileObj?.text()) || "";
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
				<Form
					onFinish={async (value) => {
						console.log("form submitted", value);
						let roleskills: Record<string, number> = {};
						if (value.techStack == undefined) {
							return message.error("Skill is required");
						}
						if (
							value.location.rigidity != "FLEXIBLE" &&
							value.location.name == undefined
						) {
							return message.error("Location Required");
						}
						value.techStack.forEach((j: any) => {
							roleskills[j.name] = j.level;
						});
						const team = await fetchData(
							"http://localhost:8000/team",
							"POST",
							{
								candidates: employees.map((i) => {
									let skills: Record<string, number> = {};
									i.skills.forEach((j) => {
										skills[j.name] = j.level;
									});

									return {
										...i,
										id: undefined,
										phone: undefined,
										skills,
									};
								}),
								role: {
									skills: roleskills,
									location: value.location,
									experience: value.experienceLevel,
								},
							}
						);
						const data: any = team.data;
						setRecommendedEmployees(
							data.map((mem: any) => {
								const emp = employees.find(
									(i) => i.email == mem.email
								);
								return { ...emp, score: mem.score };
							})
						);
						console.log(team);
					}}
					layout="vertical"
					initialValues={{
						deadlineRigidity: "MODERATE",
						reliabilityLevel: "MEDIUM",
						paradigmType: "CLOSED",
						experienceLevel: "INTERMEDIATE",
						availability: "FULLTIME",
						location: {
							rigidity: "STRICT",
						},
					}}
					// labelCol={{ span: 8 }}
					// wrapperCol={{ span: 12 }}
				>
					<Form.Item
						label="Name"
						name="name"
						// rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Description"
						name="description"
						// rules={[{ required: true }]}
					>
						<Input.TextArea />
					</Form.Item>

					<Form.Item
						label="Duration"
						name="duration"
						// rules={[{ required: true }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.List name="techStack">
						{(fields, { add, remove }) => (
							<>
								{fields.map((field, index) => (
									<Form.Item
										{...field}
										label={`Skill #${index + 1}`}
										key={field.key}
									>
										<Input.Group compact>
											<Form.Item
												name={[field.name, "name"]}
												noStyle
												rules={[
													{
														required: true,
														message:
															"Please enter skill name",
													},
												]}
											>
												<Input
													style={{ width: "50%" }}
													placeholder="Skill Name"
												/>
											</Form.Item>
											<Form.Item
												name={[field.name, "level"]}
												noStyle
												rules={[
													{
														required: true,
														type: "number",
														message:
															"Please enter skill level",
													},
												]}
											>
												<InputNumber
													style={{ width: "50%" }}
													placeholder="Skill Level"
												/>
											</Form.Item>
											<Button
												block
												type="link"
												danger
												onClick={() =>
													remove(field.name)
												}
											>
												Remove
											</Button>
										</Input.Group>
									</Form.Item>
								))}
								<Form.Item>
									<Button onClick={() => add()}>
										Add Skill
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>

					<Form.Item
						label="Deadline Rigidity"
						name="deadlineRigidity"
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Radio value="FLEXIBLE">Flexible</Radio>
							<Radio value="MODERATE">Moderate</Radio>
							<Radio value="STRICT">Strict</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						label="Reliability Level"
						name="reliabilityLevel"
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Radio value="LOW">Low</Radio>
							<Radio value="MEDIUM">Medium</Radio>
							<Radio value="HIGH">High</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						label="Start Date"
						name="startDate"
						// rules={[{ required: true }]}
					>
						<DatePicker />
					</Form.Item>

					<Form.Item
						label="Location Name"
						name={["location", "name"]}
						// rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Location Rigidity"
						name={["location", "rigidity"]}
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Radio value="FLEXIBLE">Flexible</Radio>
							<Radio value="STRICT">Strict</Radio>
							<Radio value="MODERATE">Moderate</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						label="Paradigm Type"
						name="paradigmType"
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Radio value="OPEN">Open</Radio>
							<Radio value="CLOSED">Closed</Radio>
							<Radio value="RANDOM">Random</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						label="Experience Level"
						name="experienceLevel"
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Radio value="JUNIOR">Junior</Radio>
							<Radio value="INTERMEDIATE">Intermediate</Radio>
							<Radio value="SENIOR">Senior</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						label="Availability"
						name="availability"
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Radio value="FULLTIME">Full-time</Radio>
							<Radio value="PARTTIME">Part-time</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item wrapperCol={{ span: 12, offset: 8 }}>
						<Button htmlType="submit">Submit</Button>
					</Form.Item>
				</Form>
			</div>
			<Table dataSource={processedRecommended} columns={outputColumns} />
		</div>
	);
}
