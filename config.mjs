/**
 * Create config file
 */

const environment = {};
environment.staging = {
	port: 3737,
	envName: "staging",
};

environment.production = {
	port: 5000,
	envName: "production",
};

// Determine which environment was passed as a command-line argument, default environment is production
const currentEnvironment =
	typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV?.toLowerCase() : "production";

// Check that the current environment is one of the environments above , if not, default to staging

const environmentToExport = typeof environment[currentEnvironment] === "object" ? environment[currentEnvironment] : {};
export default environmentToExport;
