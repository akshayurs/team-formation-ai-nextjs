import { Upload, Button, message } from "antd";
import fetchData from "@/lib/fetchData";

interface props {
	url: string;
	email: string | undefined | null;
}

const UploadJson: React.FC<props> = ({ url, email }) => {
	const uploadProps = {
		showUploadList: {
			showRemoveIcon: false,
		},
	};

	return (
		<Upload
			accept="application/json"
			maxCount={1}
			multiple={false}
			onChange={async (e) => {
				const file = e.file;
				if (file && file.type === "application/json") {
					if (!e.event) return;
					const jsonData = (await file.originFileObj?.text()) || "";
					const res = await fetchData(url, "POST", {
						employees: JSON.parse(jsonData),
						createdByEmail: email,
					});
					if (res.success === true) {
						message.success(res.message);
					}
				} else {
					message.error(
						"Please Upload json file. You have uploaded" +
							file.type,
					);
				}
			}}
			{...uploadProps}
		>
			<Button>Upload JSON</Button>
		</Upload>
	);
};

export default UploadJson;
