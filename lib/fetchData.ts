import { message } from "antd";

interface response {
	data: Object;
	success: boolean;
	message: string;
}

async function fetchData(
	url: string,
	method: string,
	body?: Record<string, any>,
): Promise<response> {
	const requestOptions: RequestInit = {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: body ? JSON.stringify(body) : undefined,
	};

	try {
		const response = await fetch(`/api/${url}`, requestOptions);

		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		const responseData: response = await response.json();
		if (!responseData.success) {
			message.error(responseData.message);
		}

		return responseData;
	} catch (error) {
		console.error("Error sending JSON request:", error);
		throw error;
	}
}

export default fetchData;
