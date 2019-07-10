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
				userStyle: { image: data.icon }
			});
			this.tvTitle.text = data.text;
		};
	}
);

module.exports = FlCategoryItem;
