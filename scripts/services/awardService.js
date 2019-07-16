const { request } = require("./http");
const config = require("config.json");
const isActiveService = config.isActiveService;
const { getUserId } = require("globalData");

module.exports = {
	getMyAwards: () => {
		let userID = getUserId();
		if (isActiveService)
			return request("/mobile/award", `/${userID}`, { method: "GET" });
		return new Promise((resolve) => {
			setTimeout(() => resolve({
				"userID": "alnyli07",
				"funds": 200,
				"receivedAwards": ["046D7312", "8411B3F6"],
				"givenAwards": ["418FB595"]
			}), 1000);
		});
	},
	sendAward: (userIDTo, awardID) => {
		let userIDFrom = getUserId();
		if (isActiveService)
			return request("/mobile/award/sendAward", "", {
				method: "POST",
				body: { userIDFrom, userIDTo, awardID }
			});
		return new Promise((resolve) => {
			setTimeout(() => resolve({}), 1000);
		});
	},
	getAvailableAwards: () => {
		if (isActiveService)
			return request("/mobile/award", "", { method: "GET" });
		return new Promise((resolve) => {
			setTimeout(() => resolve([{
				"Aciklama": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies ligula in nisi sagittis, nec sollicitudin purus pretium. Mauris arcu turpis, fermentum non lacus id, dictum fermentum erat. Praesent ut magna sollicitudin orci tempor interdum. Pellentesque mattis, risus ac faucibus hendrerit, justo felis ultrices nunc, at mollis tellus nisl quis ex. Quisque pretium et massa ullamcorper molestie. Donec quis egestas dui, ut porttitor erat. Ut varius quam sed viverra rhoncus. Duis pharetra malesuada sagittis. Sed cursus nibh nec ultricies volutpat. Suspendisse tempor magna purus, at pulvinar mi faucibus id. Cras sapien justo, elementum eu erat et, elementum ultricies est.",
				"Adet": 10,
				"Fiyat": 100,
				"Kod": "418FB595"
			}, {
				"Aciklama": "Proin diam erat, congue at consequat at, auctor nec sem. Aliquam gravida tellus nibh, eget condimentum lectus convallis vitae. Vivamus dapibus dictum erat porttitor vestibulum. Donec ultricies porta risus id luctus. Vestibulum faucibus arcu vel quam ultricies, non dapibus leo accumsan. Aliquam erat volutpat. Donec nec sollicitudin ex. Nunc eget sem et magna semper gravida. Maecenas nec pulvinar dui. Phasellus erat eros, hendrerit vitae auctor nec, fermentum vel metus. Pellentesque vel metus id sem auctor varius. Duis ultricies pretium nisi quis lobortis. Proin placerat risus vitae pharetra congue. Etiam vitae laoreet turpis, blandit pharetra nisl.",
				"Adet": 15,
				"Fiyat": 456,
				"Kod": "8411B3F6"
			}, {
				"Aciklama": "Donec vehicula ultricies commodo. Proin posuere, lectus ac viverra dapibus, metus purus egestas quam, quis egestas nisi erat non tellus. Nam ac auctor diam. Nulla vitae tempus lorem. Maecenas nec vehicula ante. Phasellus pharetra enim eget purus sodales ullamcorper. Donec at nunc ornare, fringilla risus nec, laoreet libero. Etiam non nisl quam. Maecenas purus neque, sodales et lacus at, congue dignissim eros. Ut ornare ipsum eu magna vulputate, vitae ultricies orci finibus. Maecenas et ante orci. Nullam tincidunt nunc semper eros dignissim egestas. Sed lobortis in enim eget sodales. In hac habitasse platea dictumst.",
				"Adet": 45,
				"Fiyat": 345,
				"Kod": "046D7312"
			}]), 1000);
		});
	}
};
