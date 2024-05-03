import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const prisma = new PrismaClient();
  let newEmployee: any = {
    name: body.name,
    age: body.age,
    phone: body.phone,
    email: body.email,
    currentProjects: body.currentProjects,
    employeeType: body.employeeType,
    designation: body.designation,
    location: body.location,
    gender: body.gender,
    createdByEmail: body.createdByEmail,
  };

  if (
    body.experience &&
    Array.isArray(body.experience) &&
    body.experience.length > 0
  ) {
    newEmployee.experience = {
      createMany: {
        data: body.experience.map((exp: any) => ({
          role: exp.role,
          years: exp.years,
        })),
      },
    };
  }

  if (body.skills && Array.isArray(body.skills) && body.skills.length > 0) {
    newEmployee.skills = {
      createMany: {
        data: body.skills.map((skill: any) => ({
          name: skill.name,
          level: skill.level,
        })),
      },
    };
  }

  try {
    const employee = await prisma.employee.create({
      data: newEmployee,
    });
    await prisma.$disconnect();
    return NextResponse.json({
      success: true,
      data: employee,
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

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  const id = request.nextUrl.searchParams.get("id");
  const email = request.nextUrl.searchParams.get("email");
  let employees;

  if (id) {
    employees = await prisma.employee.findFirst({
      where: {
        id,
      },
      include: {
        experience: true,
        skills: true,
      },
    });
  } else if (email) {
    employees = await prisma.employee.findMany({
      where: {
        createdByEmail: email,
      },

      include: {
        experience: true,
        skills: true,
      },
    });
  } else {
    employees = await prisma.employee.findMany({
      include: {
        experience: true,
        skills: true,
      },
    });
  }
  prisma.$disconnect();
  return NextResponse.json({ success: true, data: employees });
}

export async function DELETE(request: NextRequest) {
  const prisma = new PrismaClient();
  const id = request.nextUrl.searchParams.get("id");
  let employees;
  if (id) {
    employees = await prisma.employee.delete({
      where: {
        id,
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

export async function PUT(request: NextRequest) {
  const prisma = new PrismaClient();
  const body = await request.json();
  let newEmployee: any = {
    name: body.name,
    age: body.age,
    phone: body.phone,
    email: body.email,
    designation: body.designation,
    currentProjects: body.currentProjects,
    employeeType: body.employeeType,
    location: body.location,
    gender: body.gender,
    createdByEmail: body.createdByEmail,
  };
  const old = await prisma.employee.findFirst({
    where: {
      id: body.id,
    },
    include: {
      experience: true,
      skills: true,
    },
  });
  if (!old) return;
  if (
    body.experience &&
    Array.isArray(body.experience) &&
    body.experience.length > 0
  ) {
    newEmployee.experience = {
      deleteMany: {
        id: { in: old.experience.map((e: any) => e.id).filter((e: any) => e) },
      },
      createMany: {
        data: body.experience.map((exp: any) => ({
          role: exp.role,
          years: exp.years,
        })),
      },
    };
  }

  if (body.skills && Array.isArray(body.skills) && body.skills.length > 0) {
    newEmployee.skills = {
      deleteMany: {
        id: { in: old.skills.map((e: any) => e.id).filter((e: any) => e) },
      },
      createMany: {
        data: body.skills.map((skill: any) => ({
          name: skill.name,
          level: skill.level,
        })),
      },
    };
  }
  console.log(newEmployee);
  console.log(newEmployee.skills);
  console.log(newEmployee.skills.deleteMany.id.in);
  console.log(newEmployee.experience);
  console.log(newEmployee.experience.deleteMany.id.in);
  await prisma.employee.update({
    where: {
      id: body.id,
    },
    data: newEmployee,
  });
  prisma.$disconnect();
  return NextResponse.json({
    success: true,
    message: "Updated",
  });
}
