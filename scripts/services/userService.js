const { request } = require("./http");
const { setUserId } = require("../globalData");

module.exports = {
	login: (userName, password) =>
		/*request("/mobile/login", "", {
		method: "POST",
		body: {
			userName,
			password
		}
	})*/
		new Promise((resolve, reject) => setTimeout(() => {
			setUserId(userName || "TCUERDEM");
			resolve(userName);
		}, 300))
};
