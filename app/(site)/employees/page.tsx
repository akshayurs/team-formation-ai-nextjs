"use client";

// import Table from "@/components/Table";
import fetchData from "@/lib/fetchData";
import IEmployee from "@/types/employee";
import { Button, Empty, Flex, Layout, Table, Typography, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/lib/table/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import UploadJSON from "@/components/UploadJson";
import { fileDownload } from "@/lib/fileDownload";
import { useRouter } from "next/navigation";
export default function Employees() {
  const router = useRouter();
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const loadEmployees = useCallback(async (s: typeof session) => {
    const email = s?.user?.email;
    const res = await fetchData(`employees?email=${email}`, "GET");
    setIsLoading(false);
    setEmployees(res.data as IEmployee[]);
  }, []);
  useEffect(() => {
    if (session) loadEmployees(session);
  }, [loadEmployees, session]);

  const columns: ColumnType<any>[] = [
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
      key: "employeeType",
      dataIndex: "employeeType",
      title: "Type",
    },
    {
      key: "currentProjects",
      dataIndex: "currentProjects",
      title: "Projects",
    },
    {
      key: "skills",
      dataIndex: "skills",
      title: "SKILLS",
    },

    {
      title: "Edit",
      dataIndex: "id",
      width: 60,
      ellipsis: true,
      render: (id: string) => {
        return (
          <button
            onClick={() => {
              router.push("/employees/edit/" + id);
            }}
          >
            <EditOutlined />
          </button>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "id",
      width: 60,
      ellipsis: true,
      render: (id: string) => {
        return (
          <button
            onClick={async () => {
              const res = await fetchData(`employees?id=${id}`, "DELETE");
              if (res.success === true) {
                message.success(res.message);
              }
            }}
          >
            <DeleteOutlined className="text-red-600" />
          </button>
        );
      },
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
    <div className="p-3">
      <Typography.Title>Employees</Typography.Title>
      <Flex gap={5} className="mb-1">
        <Button>
          <Link href={"/employees/add"}>Add New Employee</Link>
        </Button>
        <UploadJSON url="/employees/bulk" email={session?.user?.email} />
        <Button
          onClick={() => {
            fileDownload("employees.json", JSON.stringify(employees));
          }}
        >
          Download JSON
        </Button>
        <Button
          onClick={async () => {
            const res = await fetchData(
              `employees/bulk?email=${session?.user?.email}`,
              "DELETE"
            );
            if (res.success === true) {
              message.success(res.message);
            }
          }}
          icon={<DeleteOutlined />}
        >
          Delete All Users
        </Button>
      </Flex>
      <Table columns={columns} dataSource={processedData} loading={isLoading} />
      {/* <NextTable columns={columns} rows={employees} isLoading={isLoading} /> */}
    </div>
  );
}
