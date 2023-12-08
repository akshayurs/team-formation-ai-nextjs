export function fileDownload(filename: string, data: string) {
	const blob = new Blob([data], { type: "text/csv" });
	const elem = window.document.createElement("a");
	elem.href = window.URL.createObjectURL(blob);
	elem.download = filename;
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
}
