const { request } = require("./http");
const { setUserId } = require("../globalData");
const config = require("config.json");
const isActiveService = config.isActiveService;

module.exports = {
	login: (userID, password) => {
		if (isActiveService) {
			return new Promise((resolve, reject) => {
				request("/mobile/login", "", {
						method: "POST",
						body: {
							userID,
							password
						}
					})
					.then(() => {
						resolve();
						setUserId(userID);
					})
					.catch(reject);
			});
		}
		else {
			setUserId(userID);
			return Promise.resolve();
		}
	}
};
