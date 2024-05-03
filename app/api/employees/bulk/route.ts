import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const prisma = new PrismaClient();

  try {
    const employees = await Promise.all(
      body.employees.map(async (emp: any) => {
        const newEmployee = await prisma.employee.create({
          data: {
            name: emp.name,
            age: emp.age,
            phone: emp.phone,
            email: emp.email,
            designation: emp.designation,
            location: emp.location,
            gender: emp.gender,
            employeeType: emp.employeeType,
            currentProjects: emp.currentProjects,
            createdByEmail: body.createdByEmail,
            experience: {
              createMany: {
                data: emp.experience.map((exp: any) => ({
                  role: exp.role,
                  years: exp.years,
                })),
              },
            },
            skills: {
              createMany: {
                data: emp.skills.map((skill: any) => ({
                  name: skill.name,
                  level: skill.level,
                })),
              },
            },
          },
        });
        return newEmployee;
      })
    );

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      data: employees,
      message: "Created",
    });
  } catch (error: any) {
    console.error("Error creating employee:", error);
    await prisma.$disconnect();

    return NextResponse.json({
      success: false,
      error: error.message as string,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const prisma = new PrismaClient();
  const email = request.nextUrl.searchParams.get("email");
  let employees;
  if (email) {
    employees = await prisma.employee.deleteMany({
      where: {
        createdByEmail: email,
      },
    });
  } else {
    employees = await prisma.employee.deleteMany();
  }
  prisma.$disconnect();
  return NextResponse.json({
    success: true,
    data: employees,
    message: "Deleted",
  });
}
