const extend = require('js-base/core/extend');
const FlAwardDetailItemDesign = require('library/FlAwardDetailItem');

const FlAwardDetailItem = extend(FlAwardDetailItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this.setData = data => {
			if (data.icon) {
				data.icon.indexOf("http") !== -1 ?
					this.imgIcon.loadFromUrl(data.icon) :
					this.imgIcon.dispatch({
						type: "updateUserStyle",
						userStyle: { image: data.icon, visible: true }
					});
			}
			data.title && (this.lblTitle.text = data.title);
			data.count && (this.lblCount.text = data.count);
		};
	}
);


module.exports = FlAwardDetailItem;
