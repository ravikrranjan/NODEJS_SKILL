/**
 * Library for storing and editing data
 */

// Dependencies

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//

console.log("----__dirname", __dirname);

const baseDir = path.join(__dirname, "..", ".data");

export const create = (dir, file, data, cb) => {
	const writeStream = fs.createWriteStream(`${baseDir}/${dir}/${file}.json`, { autoClose: true, flags: "w" });

	writeStream.write(JSON.stringify(data));
};

export const read = (dir, file, cb) => {
	const readStream = fs.createReadStream(`${baseDir}/${dir}/${file}.json`, "utf-8");
	let data = "";
	readStream.on("data", (chunk) => {
		data += chunk;
	});
	readStream.on("end", (chunk) => {
		cb(null, data);
	});
	readStream.on("error", (chunk) => {
		cb(null);
	});
};

export const deleteFile = (dir, file, cb) => {
	fs.unlink(`${baseDir}/${dir}/${file}.json`, (err) => {
		if (err) return cb("Error deleting file");
		cb();
	});
};
