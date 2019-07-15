module.exports = (function() {

	const user = {};

	return {
		setUserId: (id) => user.id = id,
		getUserId: () => user.id
	}
}());
