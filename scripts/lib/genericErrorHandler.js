module.exports = (e) => {
	alert(JSON.stringify(e, null, '\t'));
	const logError = require("./logService").logError;
	setTimeout(() => logError(JSON.stringify(e, null, "\t")), 1);
};
