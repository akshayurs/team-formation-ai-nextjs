"use server";

export async function myAction(formData: FormData) {
	const username = formData.get("username");
	console.log(username);
}
