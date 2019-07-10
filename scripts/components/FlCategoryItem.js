const extend = require('js-base/core/extend');
const FlCategoryItemDesign = require('library/FlCategoryItem');

const FlCategoryItem = extend(FlCategoryItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;

		this.setData = (data) => {
			this.imgIcon.dispatch({
				type: "updateUserStyle",
				userStyle: { image: data.icon, visible: true }
			});
			this.tvTitle.text = data.text;
		};
		this.clearData = () => {
			this.imgIcon.dispatch({
				type: "updateUserStyle",
				userStyle: { visible: false }
			});
			this.tvTitle.text = "";
		};
	}
);

module.exports = FlCategoryItem;
