"use client";

import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
} from "antd";
import React from "react";
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

	return (
		<div className="w-2/3 mx-auto my-2">
			<Form
				onFinish={(value) => {
					console.log("form submitted", value);
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
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Description"
					name="description"
					rules={[{ required: true }]}
				>
					<Input.TextArea />
				</Form.Item>

				<Form.Item
					label="Duration"
					name="duration"
					rules={[{ required: true }]}
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
											onClick={() => remove(field.name)}
										>
											Remove
										</Button>
									</Input.Group>
								</Form.Item>
							))}
							<Form.Item>
								<Button onClick={() => add()}>Add Skill</Button>
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
					rules={[{ required: true }]}
				>
					<DatePicker />
				</Form.Item>

				<Form.Item
					label="Location Name"
					name={["location", "name"]}
					rules={[{ required: true }]}
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
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
