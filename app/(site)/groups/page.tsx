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
  Select,
  Collapse,
  Radio,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
type IAlgo =
  | "KMeans"
  | "Agglomerative"
  | "AffinityPropagation"
  | "MeanShift"
  | "GaussianMixture";
type IGroup =
  | "age"
  | "designation"
  | "gender"
  | "location"
  | "experience"
  | "skills";
export default function Groups() {
  const [isLoading, setIsLoading] = useState(false);
  const [NoOfTeams, setNoOfTeams] = useState(5);
  const [algo, setAlgo] = useState<IAlgo>("KMeans");
  const [groupParams, setGroupParams] = useState<IGroup[]>(["location"]);
  const [groups, setGroups] = useState<IEmployee[][]>([]);
  const [viewType, setViewType] = useState("list");
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
                    const modifiedData = employees.map((i) => {
                      return {
                        ...i,
                        id: undefined,
                        phone: undefined,
                        experience: i.experience.map((j) => j.role),
                        skills: i.skills.map((j) => ({
                          [j.name]: j.level,
                        })),
                      };
                    });
                    const group = await fetchData(
                      "http://localhost:8000/group",
                      "POST",
                      {
                        candidates: employees, //TODO: Selected candidates
                        team_no: NoOfTeams,
                        params: groupParams.map((i) => i.toLowerCase()),
                        algo: algo,
                      }
                    );
                    message.success("Groups Formed");
                    setGroups(group.data as IEmployee[][]);
                  }}
                >
                  <Form.Item label="Members Per Team">
                    <Input
                      type="Number"
                      min={1}
                      value={NoOfTeams}
                      onChange={(e) => {
                        setNoOfTeams(Number(e.target.value));
                      }}
                      placeholder="No of members in a Team"
                    ></Input>
                  </Form.Item>
                  <Form.Item label="Form Team Based On">
                    {[
                      "age",
                      "designation",
                      "gender",
                      "location",
                      "experience",
                      "skills",
                    ].map((i) => (
                      <Checkbox
                        key={"GroupParams-list" + i}
                        checked={groupParams?.includes(i as IGroup)}
                        className="mr-4"
                        onChange={(e) => {
                          setGroupParams((prev) => {
                            if (e.target.checked) {
                              return Array.from(
                                new Set([...prev, i as IGroup])
                              );
                            } else {
                              return prev.filter((params) => params != i);
                            }
                          });
                        }}
                      >
                        {i}
                      </Checkbox>
                    ))}
                  </Form.Item>
                  <Form.Item label="Algorithm">
                    <Select
                      defaultValue={"KMeans"}
                      onChange={(opt) => setAlgo(opt as IAlgo)}
                    >
                      {[
                        "KMeans",
                        "Agglomerative",
                        "AffinityPropagation",
                        "MeanShift",
                        "GaussianMixture",
                      ].map((algo) => (
                        <Select.Option value={algo} key={algo}>
                          {algo}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit">Form Groups</Button>
                  </Form.Item>
                </Form>
              </Flex>
              {groups.length != 0 && (
                <div>
                  <Typography.Title>Formed Groups</Typography.Title>
                  <Button
                    className="mb-2"
                    onClick={() => {
                      fileDownload("Groups.json", JSON.stringify(groups));
                    }}
                  >
                    Download JSON
                  </Button>
                  <div className="mt-5 mb-5">
                    <div className="text-lg">View Type</div>
                    <Radio.Group
                      onChange={(val) => setViewType(val.target.value)}
                      value={viewType}
                    >
                      <Radio value={"list"}>List View</Radio>
                      <Radio value={"table"}>Table View</Radio>
                    </Radio.Group>
                  </div>
                  {viewType === "list" && (
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
                          <Card title={"Group - " + (index + 1)}>
                            <Collapse
                              ghost
                              defaultActiveKey={group
                                .map((mem) =>
                                  groupParams.map(
                                    (param) => mem.name + mem[param].toString()
                                  )
                                )
                                .flat()}
                              items={group.map((mem) => ({
                                key: mem.name,
                                label: mem.name,
                                children: (
                                  <p>
                                    {groupParams.map((param) => {
                                      let value;
                                      if (param === "skills") {
                                        value = mem[param]
                                          .map((s) => s.name)
                                          .join(",");
                                      } else if (param === "experience") {
                                        value = mem[param]
                                          .map((e) => e.role)
                                          .join(",");
                                      } else {
                                        value = mem[param];
                                      }
                                      return (
                                        <div
                                          key={mem.name + mem[param].toString()}
                                        >
                                          <span className="font-bold">
                                            {param[0].toUpperCase() +
                                              param.slice(1)}{" "}
                                          </span>
                                          - {value}
                                        </div>
                                      );
                                    })}
                                  </p>
                                ),
                              }))}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  )}
                  {viewType === "table" &&
                    groups.map((group, ind) => {
                      const processedData = group.map((employee) => ({
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
                          <Table
                            title={() => (
                              <div className="text-xl font-bold">
                                Group-{ind + 1}
                              </div>
                            )}
                            key={"Group-" + ind}
                            columns={[
                              {
                                key: "name",
                                dataIndex: "name",
                                title: "NAME",
                                fixed: "left",
                              },
                              ...groupParams.map((param) => {
                                return {
                                  key: param,
                                  dataIndex: param,
                                  title: param,
                                };
                              }),
                            ]}
                            dataSource={processedData}
                          />
                        </>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
