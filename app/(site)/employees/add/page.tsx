"use client";

import {
	Button,
	Form,
	Input,
	InputNumber,
	Radio,
	Typography,
	message,
} from "antd";
import fetchData from "@/lib/fetchData";
import React from "react";
import { useSession } from "next-auth/react";
export default function Employees() {
	const { data: session } = useSession();
	interface FieldType {
		name: string;
		age: number;
		phone: string;
		email: string;
		designation: string;
		gender: "MALE" | "FEMALE";
		location: string;
		experience: { role: string; years: number }[];
		skills: { name: string; level: number }[];
	}
	const onFinish = async (values: FieldType) => {
		const res = await fetchData("employees", "POST", {
			...values,
			createdByEmail: session?.user?.email,
		});
		if (res.success) {
			message.success(res.message);
		}
	};
	return (
		<div className="mx-auto w-2/3">
			<Typography.Title className="text-center">
				Add New Employee
			</Typography.Title>
			<Form onFinish={onFinish} layout="vertical">
				<Form.Item
					name="name"
					label="Name"
					rules={[{ required: true, message: "Please enter name" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="age"
					label="Age"
					rules={[
						{
							required: true,
							type: "number",
							message: "Please enter age",
						},
					]}
				>
					<InputNumber />
				</Form.Item>

				<Form.Item
					name="phone"
					label="Phone"
					rules={[
						{
							required: true,
							message: "Please enter phone number",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Please enter valid email",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="designation"
					label="Designation"
					rules={[
						{ required: true, message: "Please enter designation" },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item label="Gender" name="gender">
					<Radio.Group>
						<Radio value="MALE"> Male </Radio>
						<Radio value="FEMALE"> Female </Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item
					name="location"
					label="Location"
					rules={[
						{ required: true, message: "Please enter location" },
					]}
				>
					<Input />
				</Form.Item>

				<Form.List name="experience">
					{(fields, { add, remove }) => (
						<>
							{fields.map((field, index) => (
								<Form.Item
									{...field}
									label={`Experience #${index + 1}`}
									key={field.key}
								>
									<Input.Group compact>
										<Form.Item
											name={[field.name, "role"]}
											noStyle
											rules={[
												{
													required: true,
													message:
														"Please enter role",
												},
											]}
										>
											<Input
												style={{ width: "50%" }}
												placeholder="Role"
											/>
										</Form.Item>
										<Form.Item
											name={[field.name, "years"]}
											noStyle
											rules={[
												{
													required: true,
													type: "number",
													message:
														"Please enter years",
												},
											]}
										>
											<InputNumber
												style={{ width: "50%" }}
												placeholder="Years"
											/>
										</Form.Item>
										<Button
											block
											type="link"
											danger
											onClick={() => remove(field.name)}
										>
											Remove
										</Button>
									</Input.Group>
								</Form.Item>
							))}

							<Form.Item>
								<Button block onClick={() => add()}>
									Add Experience
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.List name="skills">
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
											onClick={() => remove(field.name)}
										>
											Remove
										</Button>
									</Input.Group>
								</Form.Item>
							))}
							<Form.Item>
								<Button block onClick={() => add()}>
									Add Skill
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>

				<Form.Item>
					<Button block htmlType="submit">
						Add
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
