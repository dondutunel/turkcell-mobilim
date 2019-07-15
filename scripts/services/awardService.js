const { request } = require("./http");

module.exports = {
	getMyAwards: (userId) => request("/mobile/award", userId, { method: "GET" }),
	sendAward: (userId, awardId) => request("/mobile/award", "", {
		method: "POST",
		body: { userId, awardId }
	}),
	getAvailableAwards: () => request("/mobile/award", "", { method: "GET" })
};
