const { request } = require("./http");
const { setUserId } = require("../globalData");
const config = require("config.json");
const isActiveService = config.isActiveService;

module.exports = {
	login: (userID, password) => {
		if (isActiveService) {
			return request("/mobile/login", "", {
					method: "POST",
					body: {
						userID,
						password
					}
				})
				.then(() => {
					return setUserId(userID);
				});
		}
		else {
			setUserId(userID);
			return Promise.resolve();
		}
	}
};
