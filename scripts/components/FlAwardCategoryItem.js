const extend = require('js-base/core/extend');
const FlAwardCategoryItemDesign = require('library/FlAwardCategoryItem');

const FlAwardCategoryItem = extend(FlAwardCategoryItemDesign)(
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
			data.Aciklama && (this.lblTitle.text = data.Aciklama);
			data.count && (this.lblCount.text = data.count);
			data.Adet && (this.lblCount.text = data.Adet);
		};
	}
);

module.exports = FlAwardCategoryItem;
