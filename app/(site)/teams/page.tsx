"use client";

import fetchData from "@/lib/fetchData";
import IEmployee from "@/types/employee";
import { generateScores } from "@/utils/recommend";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import Table, { ColumnType } from "antd/es/table";
import { FormProps } from "antd/lib";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
interface ITeam {
  name: string;
  size: number;
  techStack: {
    name: string;
    level: number;
  }[];
}
interface project {
  name: string;
  description: string;
  duration: number;
  budget: number;
  deadlineRigidity: "FLEXIBLE" | "STRICT" | "MODERATE";
  reliabilityLevel: "LOW" | "MEDIUM" | "HIGH";
  startDate: string;
  location: {
    name: string;
    rigidity: "FLEXIBLE" | "STRICT" | "MODERATE";
  };
  team: ITeam[];
  paradigmType: "OPEN" | "CLOSED" | "RANDOM";
  experienceLevel: "JUNIOR" | "INTERMEDIATE" | "SENIOR";
  availability: "FULLTIME" | "PARTTIME";
  ALGO: "MANUAL" | "AUTOSELECT";
}
export default function Teams() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  // const [NoOfTeams, setNoOfTeams] = useState(1);
  // const [groupParams, setGroupParams] = useState<Array<string>>([
  // 	"softskills",
  // ]);
  // const [groups, setGroups] = useState<Array<Array<string>>>([]);
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
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [recommendedEmployees, setRecommendedEmployees] = useState<
    OutputTable[][]
  >([]);
  const [selectedEmp, setSelectedEmp] = useState<IEmployee[]>([]);
  const [selectedManualEmp, setSelectedManualEmp] = useState<IEmployee[][]>([]);
  useEffect(() => {
    setSelectedEmp(employees);
  }, [employees]);
  const columns: ColumnType<any>[] = [
    {
      key: "select",
      dataIndex: "email",
      title: "Select",
      render: (a: string) => (
        <Checkbox
          checked={!!selectedEmp.find((ele) => ele.email == a)}
          onChange={(e) => {
            setSelectedEmp((prev) => {
              if (e.target.checked) {
                const semp = selectedEmp.find((ele) => ele.email == a);
                const emp = employees.find((ele) => ele.email == a);
                if (emp && !semp) {
                  return [...prev, emp];
                }
                return prev;
              } else {
                return prev.filter((params) => params.email != a);
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
  const processedRecommended = recommendedEmployees.map((team) =>
    team.map((employee) => ({
      ...employee,
      experience: employee.experience
        .map((exp) => `${exp.role} (${exp.years})`)
        .join(", "),
      skills: employee.skills
        .map((skill) => `${skill.name} (${skill.level})`)
        .join(", "),
    }))
  );

  const generateColumns = (ind: number) => {
    const outputColumns: ColumnType<any>[] = [
      {
        key: "select",
        dataIndex: "email",
        title: "Select",
        render: (a: string) => (
          <Checkbox
            checked={!!selectedManualEmp[ind].find((ele) => ele.email == a)}
            onChange={(e) => {
              setSelectedManualEmp((previous) => {
                let prev = JSON.parse(JSON.stringify(previous));
                if (e.target.checked) {
                  const semp = selectedManualEmp[ind].find(
                    (ele) => ele.email == a
                  );
                  const emp = employees.find((ele) => ele.email == a);
                  if (emp && !semp) {
                    prev[ind] = [...prev[ind], emp];
                    return { ...prev };
                  }
                  return prev;
                } else {
                  prev[ind] = prev[ind].filter(
                    (params: any) => params.email != a
                  );
                  return { ...prev };
                }
              });
            }}
          ></Checkbox>
        ),
      },
      {
        key: "Score",
        dataIndex: "score",
        title: "SCORE",
        fixed: "left",
        render: (a) => {
          return (
            <div
              style={{
                color: a <= 0 ? "red" : "green",
              }}
            >
              {a}
            </div>
          );
        },
      },
      ...columns.slice(1),
    ];
    return outputColumns;
  };

  const [allSkills, setAllSkills] = useState<{ value: string }[]>();
  const [allLocation, setAllLocation] = useState<{ value: string }[]>();
  useEffect(() => {
    setAllSkills((prev) =>
      Array.from(
        new Set(
          selectedEmp
            .map((e) => e.skills)
            .flat()
            .map((a) => a.name)
        )
      ).map((s) => ({ value: s.trim() }))
    );
    setAllLocation((prev) => {
      return Array.from(new Set(selectedEmp.map((e) => e.location.trim()))).map(
        (e) => ({ value: e })
      );
    });
  }, [selectedEmp]);
  const onFinish: FormProps<project>["onFinish"] = async (value) => {
    console.log("form submitted", value);
    console.log(selectedEmp);
    setTeams(value.team);
    if (value.team == undefined) {
      return message.error("Skill is required");
    }
    if (
      value.location.rigidity != "FLEXIBLE" &&
      value.location.name == undefined
    ) {
      return message.error("Location Required");
    }
    const arr: OutputTable[][] = [];
    const autoSelect: OutputTable[][] = [];
    value.team.map((t, ind) => {
      const { overallScore } = generateScores(selectedEmp, value, ind);
      let res = selectedEmp.map((emp) => ({
        ...emp,
        score: overallScore[emp.id],
      }));
      res = res.sort((a, b) => b.score - a.score);
      autoSelect.push(res.slice(0, t.size));
      arr.push(res);
    });
    if (value.ALGO === "AUTOSELECT") {
      setIsAuto(true);
      setRecommendedEmployees(autoSelect);
      setSelectedManualEmp(autoSelect);
    } else {
      setIsAuto(false);
      setRecommendedEmployees(arr);
      setSelectedManualEmp(autoSelect);
    }
  };
  console.log(selectedManualEmp);
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
                const jsonData = (await file.originFileObj?.text()) || "";
                setEmployees(JSON.parse(jsonData));
              } else {
                message.error(
                  "Please Upload json file. You have uploaded" + file.type
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
              const res = await fetchData(`employees?email=${email}`, "GET");
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
                setSelectedEmp([...employees]);
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
          className="!mt-5"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            name: "user2",
            description: "ytfc",
            duration: "10",
            location: {
              name: "Mysore",
              rigidity: "MODERATE",
            },
            team: [
              {
                name: "Dev",
                size: "3",
                techStack: [
                  {
                    name: "Business Analysis",
                    level: "3",
                  },
                  {
                    name: "Python",
                    level: "6",
                  },
                ],
              },
              {
                name: "Marketing",
                size: "1",
                techStack: [
                  {
                    name: "Leadership",
                    level: "2",
                  },
                  {
                    name: "Team Management",
                    level: "1",
                  },
                ],
              },
            ],
            deadlineRigidity: "MODERATE",
            reliabilityLevel: "MEDIUM",
            paradigmType: "CLOSED",
            experienceLevel: "INTERMEDIATE",
            availability: "FULLTIME",
            ALGO: "MANUAL",
          }}
          // initialValues={{
          //   deadlineRigidity: "MODERATE",
          //   reliabilityLevel: "MEDIUM",
          //   paradigmType: "CLOSED",
          //   experienceLevel: "INTERMEDIATE",
          //   availability: "FULLTIME",
          //   location: {
          //     rigidity: "STRICT",
          //   },
          // }}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 12 }}
        >
          <Form.Item
            label="Project/Team Name"
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
            label="Duration (Weeks)"
            name="duration"
            // rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Location Name"
            name={["location", "name"]}
            // rules={[{ required: true }]}
          >
            <AutoComplete
              placeholder="Location"
              style={{ width: 300 }}
              options={allLocation}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.List name="team">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                    className="bg-gray-200 bg-opacity-40 p-2 rounded-2xl"
                  >
                    <DeleteOutlined
                      className="mx-auto self-center p-5"
                      style={{ color: "red" }}
                      onClick={() => {
                        console.log({ remove: name });
                        remove(name);
                      }}
                    />
                    <div>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        fieldKey={[fieldKey, "name"]}
                        label="Team Name"
                        rules={[{ required: true, message: "Missing Name" }]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "size"]}
                        fieldKey={[fieldKey, "size"]}
                        label="Team Size"
                        rules={[{ required: true, message: "Missing size" }]}
                      >
                        <Input placeholder="Size" />
                      </Form.Item>
                    </div>
                    <Form.List name={[name, "techStack"]}>
                      {(
                        techStackFields,
                        { add: addTechStack, remove: removeTechStack }
                      ) => (
                        <>
                          {techStackFields.map(
                            ({
                              key: techStackKey,
                              name: techStackName,
                              // fieldKey: techStackFieldKey,
                              ...restTechStackField
                            }) => (
                              <Space
                                key={techStackKey}
                                style={{ display: "flex", marginBottom: 0 }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restTechStackField}
                                  name={[techStackName, "name"]}
                                  // fieldKey={[techStackFieldKey, "name"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing skill name",
                                    },
                                  ]}
                                >
                                  <AutoComplete
                                    style={{ width: 300 }}
                                    options={allSkills}
                                    placeholder="Skill Name"
                                    filterOption={(inputValue, option) =>
                                      option!.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                      -1
                                    }
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restTechStackField}
                                  name={[techStackName, "level"]}
                                  // fieldKey={[techStackFieldKey, "level"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing skill level",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Skill Level" />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => {
                                    console.log({ techStackName });
                                    removeTechStack(techStackName);
                                  }}
                                />
                              </Space>
                            )
                          )}
                          <Form.Item className="!mb-2">
                            <Button
                              type="dashed"
                              onClick={() => addTechStack()}
                              icon={<PlusOutlined />}
                            >
                              Add Tech Stack
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Team
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
            label="Employee Type / Availability"
            name="availability"
            rules={[{ required: true }]}
          >
            <Checkbox.Group defaultValue={["FULLTIME"]}>
              <Checkbox value="FULLTIME">Full time</Checkbox>
              <Checkbox value="PARTTIME">Part time</Checkbox>
              <Checkbox value="INTERN">Intern</Checkbox>
              <Checkbox value="CONTRACT">Contract</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Form Team" name="ALGO">
            <Radio.Group>
              <Radio value="MANUAL">Manual</Radio>
              <Radio value="AUTOSELECT">Auto Select</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
      {!isAuto &&
        processedRecommended.map((rec, ind) => (
          <>
            <div className="text-2xl mt-3 mb-1">
              {teams[ind].name} -{" "}
              {teams[ind].techStack
                .sort((a, b) => b.level - a.level)
                .map((s) => s.name)
                .join(",")}
            </div>
            <Table
              key={"team-output-" + ind}
              dataSource={rec}
              columns={generateColumns(ind)}
            />
          </>
        ))}
      <div className="text-3xl mb-1">Final Team</div>
      <Table
        dataSource={selectedManualEmp
          .map((team, ind) => {
            const arr: any = [];
            team.forEach((emp) => {
              arr.push({
                emp: {
                  ...emp,
                  experience: emp.experience
                    .map((exp) => `${exp.role} (${exp.years})`)
                    .join(", "),
                  skills: emp.skills
                    .map((skill) => `${skill.name} (${skill.level})`)
                    .join(", "),
                },
                team: teams[ind],
              });
            });
            return arr;
          })
          .flat()}
        columns={[
          {
            key: "team",
            dataIndex: ["team", "name"],
            title: "Team",
          },
          {
            key: "name",
            dataIndex: ["emp", "name"],
            title: "NAME",
          },
          {
            key: "location",
            dataIndex: ["emp", "location"],
            title: "location",
          },
          {
            key: "experience",
            dataIndex: ["emp", "experience"],
            title: "Experience",
          },
          {
            key: "skill",
            dataIndex: ["emp", "skills"],
            title: "Skills",
          },
        ]}
      />
    </div>
  );
}
