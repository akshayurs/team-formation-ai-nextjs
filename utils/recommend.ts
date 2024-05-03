import IEmployee from "../types/employee";

// const obj = {
//   name: "Project1",
//   description: "Desc1",
//   duration: "10",
//   location: {
//     name: "Mysore",
//     rigidity: "MODERATE",
//   },
//   team: [
//     {
//       size: "3",
//       techStack: [
//         {
//           name: "Java",
//           level: "2",
//         },
//         {
//           name: "JavaScript",
//           level: "3",
//         },
//       ],
//       name: "Dev",
//     },
//     {
//       size: "2",
//       techStack: [
//         {
//           name: "Social Media Marketing",
//           level: "4",
//         },
//         {
//           name: "SEO",
//           level: "1",
//         },
//       ],
//       name: "Marketing",
//     },
//     {
//       name: "DB",
//       techStack: [
//         {
//           name: "Data Analysis",
//           level: "3",
//         },
//         {
//           name: "SQL",
//           level: "4",
//         },
//       ],
//       size: "3",
//     },
//   ],
//   deadlineRigidity: "MODERATE",
//   reliabilityLevel: "MEDIUM",
//   paradigmType: "CLOSED",
//   experienceLevel: "INTERMEDIATE",
//   availability: ["FULLTIME", "INTERN", "PARTTIME"],
// };

// const employees: IEmployee[] = [
//   {
//     id: "657357ac2a23fffa40c8f3be",
//     name: "User 6",
//     age: 22,
//     phone: "3339998888",
//     email: "user6@example.com",
//     designation: "Marketing Specialist",
//     gender: "FEMALE",
//     employeeType: "PARTTIME",
//     currentProjects: 5,
//     location: "Boston",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "662f8466d3b94be5dd190fba",
//         role: "Intern",
//         years: 1,
//         employeeId: "657357ac2a23fffa40c8f3be",
//       },
//       {
//         id: "662f8466d3b94be5dd190fbb",
//         role: "Marketing Specialist",
//         years: 2,
//         employeeId: "657357ac2a23fffa40c8f3be",
//       },
//     ],
//     skills: [
//       {
//         id: "662f8466d3b94be5dd190fbc",
//         name: "Social Media Marketing",
//         level: 4,
//         employeeId: "657357ac2a23fffa40c8f3be",
//       },
//       {
//         id: "662f8466d3b94be5dd190fbd",
//         name: "SEO",
//         level: 3,
//         employeeId: "657357ac2a23fffa40c8f3be",
//       },
//     ],
//   },
//   {
//     id: "657357ad2a23fffa40c8f3d1",
//     name: "User 7",
//     age: 32,
//     phone: "6664445555",
//     email: "user7@example.com",
//     designation: "Consultant",
//     gender: "FEMALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "Houston",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "662f7fd1af09e348d06ee7e6",
//         role: "Consultant",
//         years: 6,
//         employeeId: "657357ad2a23fffa40c8f3d1",
//       },
//       {
//         id: "662f7fd1af09e348d06ee7e7",
//         role: "Advisor",
//         years: 4,
//         employeeId: "657357ad2a23fffa40c8f3d1",
//       },
//     ],
//     skills: [
//       {
//         id: "662f7fd1af09e348d06ee7e8",
//         name: "Consulting",
//         level: 4,
//         employeeId: "657357ad2a23fffa40c8f3d1",
//       },
//       {
//         id: "662f7fd1af09e348d06ee7e9",
//         name: "Business Analysis",
//         level: 5,
//         employeeId: "657357ad2a23fffa40c8f3d1",
//       },
//     ],
//   },
//   {
//     id: "657357ac2a23fffa40c8f3bc",
//     name: "User 4",
//     age: 24,
//     phone: "9998765432",
//     email: "user4@example.com",
//     designation: "Developer",
//     gender: "MALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "Seattle",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357ac2a23fffa40c8f3c2",
//         role: "Developer",
//         years: 3,
//         employeeId: "657357ac2a23fffa40c8f3bc",
//       },
//       {
//         id: "657357ac2a23fffa40c8f3c3",
//         role: "Intern",
//         years: 1,
//         employeeId: "657357ac2a23fffa40c8f3bc",
//       },
//     ],
//     skills: [
//       {
//         id: "657357ad2a23fffa40c8f3cb",
//         name: "Python",
//         level: 3,
//         employeeId: "657357ac2a23fffa40c8f3bc",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3cd",
//         name: "JavaScript",
//         level: 4,
//         employeeId: "657357ac2a23fffa40c8f3bc",
//       },
//     ],
//   },
//   {
//     id: "657357ac2a23fffa40c8f3c6",
//     name: "User 3",
//     age: 35,
//     phone: "5551234567",
//     email: "user3@example.com",
//     designation: "Manager",
//     gender: "FEMALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "Chicago",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357ad2a23fffa40c8f3df",
//         role: "Supervisor",
//         years: 5,
//         employeeId: "657357ac2a23fffa40c8f3c6",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3de",
//         role: "Manager",
//         years: 8,
//         employeeId: "657357ac2a23fffa40c8f3c6",
//       },
//     ],
//     skills: [
//       {
//         id: "657357ad2a23fffa40c8f3e2",
//         name: "Leadership",
//         level: 5,
//         employeeId: "657357ac2a23fffa40c8f3c6",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3e3",
//         name: "Team Management",
//         level: 5,
//         employeeId: "657357ac2a23fffa40c8f3c6",
//       },
//     ],
//   },
//   {
//     id: "657357a02a23fffa40c8f3af",
//     name: "Kishan",
//     age: 20,
//     phone: "123456789",
//     email: "kishanappane@gmail.com",
//     designation: "Student",
//     gender: "MALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "Mysore",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357a12a23fffa40c8f3b1",
//         role: "Student",
//         years: 5,
//         employeeId: "657357a02a23fffa40c8f3af",
//       },
//       {
//         id: "657357a12a23fffa40c8f3b2",
//         role: "Intern",
//         years: 2,
//         employeeId: "657357a02a23fffa40c8f3af",
//       },
//     ],
//     skills: [
//       {
//         id: "657357a12a23fffa40c8f3b5",
//         name: "Java",
//         level: 4,
//         employeeId: "657357a02a23fffa40c8f3af",
//       },
//     ],
//   },
//   {
//     id: "657357ac2a23fffa40c8f3bd",
//     name: "User 1",
//     age: 30,
//     phone: "1234567890",
//     email: "user1@example.com",
//     designation: "Engineer",
//     gender: "FEMALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "New York",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357ac2a23fffa40c8f3c4",
//         role: "Engineer",
//         years: 5,
//         employeeId: "657357ac2a23fffa40c8f3bd",
//       },
//       {
//         id: "657357ac2a23fffa40c8f3c5",
//         role: "Intern",
//         years: 2,
//         employeeId: "657357ac2a23fffa40c8f3bd",
//       },
//     ],
//     skills: [
//       {
//         id: "657357ad2a23fffa40c8f3cf",
//         name: "JavaScript",
//         level: 4,
//         employeeId: "657357ac2a23fffa40c8f3bd",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3d0",
//         name: "React",
//         level: 5,
//         employeeId: "657357ac2a23fffa40c8f3bd",
//       },
//     ],
//   },
//   {
//     id: "657357ac2a23fffa40c8f3c0",
//     name: "User 5",
//     age: 27,
//     phone: "7775551234",
//     email: "user5@example.com",
//     designation: "Designer",
//     gender: "FEMALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "Los Angeles",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357ac2a23fffa40c8f3ca",
//         role: "Intern",
//         years: 2,
//         employeeId: "657357ac2a23fffa40c8f3c0",
//       },
//       {
//         id: "657357ac2a23fffa40c8f3c9",
//         role: "Designer",
//         years: 4,
//         employeeId: "657357ac2a23fffa40c8f3c0",
//       },
//     ],
//     skills: [
//       {
//         id: "657357ad2a23fffa40c8f3d2",
//         name: "UI/UX Design",
//         level: 4,
//         employeeId: "657357ac2a23fffa40c8f3c0",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3d3",
//         name: "Adobe Photoshop",
//         level: 5,
//         employeeId: "657357ac2a23fffa40c8f3c0",
//       },
//     ],
//   },
//   {
//     id: "657357a12a23fffa40c8f3b0",
//     name: "Akshay Urs M",
//     age: 25,
//     phone: "8105567227",
//     email: "akshayursm@gmail.com",
//     designation: "Student",
//     gender: "MALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "Mysore",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357a12a23fffa40c8f3b4",
//         role: "Intern",
//         years: 1,
//         employeeId: "657357a12a23fffa40c8f3b0",
//       },
//       {
//         id: "657357a12a23fffa40c8f3b3",
//         role: "Student",
//         years: 4,
//         employeeId: "657357a12a23fffa40c8f3b0",
//       },
//     ],
//     skills: [
//       {
//         id: "657357a12a23fffa40c8f3b7",
//         name: "Java",
//         level: 3,
//         employeeId: "657357a12a23fffa40c8f3b0",
//       },
//       {
//         id: "657357a12a23fffa40c8f3b6",
//         name: "Python",
//         level: 4,
//         employeeId: "657357a12a23fffa40c8f3b0",
//       },
//     ],
//   },
//   {
//     id: "657357ac2a23fffa40c8f3bf",
//     name: "User 2",
//     age: 28,
//     phone: "9876543210",
//     email: "user2@example.com",
//     designation: "Analyst",
//     gender: "MALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "San Francisco",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357ad2a23fffa40c8f3dc",
//         role: "Analyst",
//         years: 4,
//         employeeId: "657357ac2a23fffa40c8f3bf",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3dd",
//         role: "Consultant",
//         years: 3,
//         employeeId: "657357ac2a23fffa40c8f3bf",
//       },
//     ],
//     skills: [
//       {
//         id: "657357ad2a23fffa40c8f3e0",
//         name: "Data Analysis",
//         level: 5,
//         employeeId: "657357ac2a23fffa40c8f3bf",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3e1",
//         name: "SQL",
//         level: 4,
//         employeeId: "657357ac2a23fffa40c8f3bf",
//       },
//     ],
//   },
//   {
//     id: "657357ac2a23fffa40c8f3c1",
//     name: "User 8",
//     age: 26,
//     phone: "1112223333",
//     email: "user8@example.com",
//     designation: "Researcher",
//     gender: "MALE",
//     employeeType: "FULLTIME",
//     currentProjects: 0,
//     location: "Washington D.C.",
//     createdByEmail: "akshayursm@gmail.com",
//     experience: [
//       {
//         id: "657357ad2a23fffa40c8f3ce",
//         role: "Scientist",
//         years: 3,
//         employeeId: "657357ac2a23fffa40c8f3c1",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3cc",
//         role: "Researcher",
//         years: 4,
//         employeeId: "657357ac2a23fffa40c8f3c1",
//       },
//     ],
//     skills: [
//       {
//         id: "657357ad2a23fffa40c8f3d6",
//         name: "Data Analysis",
//         level: 4,
//         employeeId: "657357ac2a23fffa40c8f3c1",
//       },
//       {
//         id: "657357ad2a23fffa40c8f3d7",
//         name: "Research Methodology",
//         level: 5,
//         employeeId: "657357ac2a23fffa40c8f3c1",
//       },
//     ],
//   },
// ];

function transformPreferance(preferance: unknown) {
  const obj = JSON.parse(JSON.stringify(preferance));
  obj.team = obj.team.map((i: any) => ({
    ...i,
    size: parseInt(i.size),
    techStack: i.techStack.map((j: any) => ({
      ...j,
      level: parseInt(j.level),
    })),
  }));
  return obj as IPrefrence;
}
interface ITeam {
  name: string;
  size: number;
  techStack: {
    name: string;
    level: number;
  }[];
}
interface IPrefrence {
  name: string;
  description: string;
  duration: number;
  location: {
    name: string;
    rigidity: "FLEXIBLE" | "MODERATE" | "STRICT";
  };
  team: ITeam[];
  deadlineRigidity: "FLEXIBLE" | "MODERATE" | "STRICT";
  reliabilityLevel: "LOW" | "MEDIUM" | "HIGH";
  paradigmType: "OPEN" | "CLOSED" | "RANDOM";
  experienceLevel: "JUNIOR" | "INTERMEDIATE" | "SENIOR";
  availability: "FULLTIME" | "INTERN" | "PARTTIME" | "CONTRACT";
}
const RANDOM_RANGE = [5, 15];
const generateRandom = () => {
  return Math.round(RANDOM_RANGE[0] + Math.random() * RANDOM_RANGE[1]);
};
const WEIGHTS = {
  LOCATION: 50,
  EXPERIENCE: 5,
  EXPERIENCECAP: 25,
  EXPERIENCELEVEL: {
    JUNIOR: 10,
    // INTERMEDIATE: RANDOM,
    SENIOR: 10,
  },
  RELIABILITY: {
    HIGH: 10,
    LOW: 10,
    // MEDIUM: RANDOM,
  },
  PARADIGM: {
    CLOSED: 5,
    OPEN: 5,
    // RANDOM: RANDOM,
  },
  DEADLINE: {
    MODERATE: 5,
    // FLEXIBLE: RANDOM
    STRICT: 10,
  },
  SKILL: 30,
};
const generateScoresFn = (
  employees: IEmployee[],
  preferance: IPrefrence,
  teamInd = 0
) => {
  let filteredEmployee = employees;
  const locationScore: Record<string, number> = {};
  const skillScore: Record<string, number> = {};
  const exprienceScore: Record<string, number> = {};
  const availabilityScore: Record<string, number> = {};
  if (preferance.location.rigidity == "STRICT") {
    filteredEmployee = filteredEmployee.filter((emp) => {
      const val = emp.location === preferance.location.name;
      if (!val) {
        locationScore[emp.id] = 5;
        console.log(locationScore[emp.id]);
      }
      return val;
    });
  }
  console.log(locationScore);
  filteredEmployee = filteredEmployee.filter((emp) => {
    const val = preferance.availability.includes(emp.employeeType);
    if (!val) availabilityScore[emp.id] = -1;
    return val;
  });
  employees.forEach((emp) => (locationScore[emp.id] = 0));
  employees.forEach((emp) => (skillScore[emp.id] = 0));
  employees.forEach((emp) => (exprienceScore[emp.id] = 0));
  filteredEmployee.forEach((emp) => {
    // location
    console.log(preferance.location.rigidity);
    console.log(
      emp.location.toLowerCase().trim(),
      preferance.location.name.toLowerCase().trim()
    );
    if (preferance.location.rigidity === "MODERATE") {
      if (
        emp.location.toLowerCase().trim() ==
        preferance.location.name.toLowerCase().trim()
      ) {
        locationScore[emp.id] += WEIGHTS.LOCATION;
      }
    }

    //skill
    preferance.team[teamInd].techStack.map((stack) => {
      const name = stack.name.trim().toLowerCase();
      emp.skills.forEach((skill) => {
        if (skill.name.toLowerCase().trim() === name) {
          skillScore[emp.id] += skill.level * stack.level * WEIGHTS.SKILL;
        }
      });
    });

    //experience
    let totalExp = 0;
    emp.experience.map((exp) => {
      totalExp += exp.years;
    });
    //deadline
    if (preferance.deadlineRigidity == "STRICT") {
      exprienceScore[emp.id] += WEIGHTS.DEADLINE.STRICT * totalExp;
    } else if (preferance.deadlineRigidity === "MODERATE") {
      exprienceScore[emp.id] += WEIGHTS.DEADLINE.MODERATE * totalExp;
    } else if (preferance.deadlineRigidity === "FLEXIBLE") {
      exprienceScore[emp.id] += generateRandom() * totalExp;
    }
    //paradigm
    if (preferance.paradigmType === "OPEN") {
      exprienceScore[emp.id] +=
        WEIGHTS.PARADIGM.OPEN * (WEIGHTS.EXPERIENCECAP - totalExp);
    } else if (preferance.paradigmType == "CLOSED") {
      exprienceScore[emp.id] += WEIGHTS.PARADIGM.OPEN * totalExp;
    } else if (preferance.paradigmType == "RANDOM") {
      exprienceScore[emp.id] += generateRandom() * totalExp;
    }
    //Reliability
    if (preferance.reliabilityLevel === "HIGH") {
      exprienceScore[emp.id] += WEIGHTS.RELIABILITY.HIGH * totalExp;
    } else if (preferance.reliabilityLevel === "LOW") {
      exprienceScore[emp.id] +=
        WEIGHTS.RELIABILITY.HIGH * (WEIGHTS.EXPERIENCECAP - totalExp);
    } else if (preferance.reliabilityLevel === "MEDIUM") {
      exprienceScore[emp.id] += generateRandom() * totalExp;
    }
    //Experience Level
    if (preferance.experienceLevel == "JUNIOR") {
      exprienceScore[emp.id] +=
        WEIGHTS.EXPERIENCELEVEL.JUNIOR * (WEIGHTS.EXPERIENCECAP - totalExp);
    } else if (preferance.experienceLevel == "INTERMEDIATE") {
      exprienceScore[emp.id] += generateRandom() * totalExp;
    } else if (preferance.experienceLevel == "SENIOR") {
      exprienceScore[emp.id] += WEIGHTS.EXPERIENCELEVEL.SENIOR * totalExp;
    }
  });
  const overallScore: Record<string, number> = {};
  employees.forEach((emp) => {
    if (
      locationScore[emp.id] === -1 ||
      skillScore[emp.id] === -1 ||
      exprienceScore[emp.id] === -1 ||
      availabilityScore[emp.id] === -1
    ) {
      overallScore[emp.id] = -1;
    } else {
      overallScore[emp.id] =
        locationScore[emp.id] + skillScore[emp.id] + exprienceScore[emp.id];
    }
  });
  return {
    overallScore,
    locationScore,
    exprienceScore,
    skillScore,
    availabilityScore,
  };
};

export const generateScores = (
  employees: IEmployee[],
  preferance: unknown,
  teamInd = 0
) => {
  return generateScoresFn(employees, transformPreferance(preferance), teamInd);
};
