import IUser from "./user";

interface IEmployee {
	id: string;
	name: string;
	age: number;
	phone: string;
	email: string;
	designation: string;
	gender: "MALE" | "FEMALE";
	location: string;
	experience: IExperience[];
	skills: ISkill[];
	createdBy: IUser | null;
	createdByEmail: string | null;
}

interface IExperience {
	id: string;
	role: string;
	years: number;
	employee: IEmployee | null;
	employeeId: string | null;
}

interface ISkill {
	id: string;
	name: string;
	level: number;
	employee: IEmployee | null;
	employeeId: string | null;
}

export default IEmployee;
