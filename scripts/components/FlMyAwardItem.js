const extend = require('js-base/core/extend');
const FlMyAwardItemDesign = require('library/FlMyAwardItem');

const FlMyAwardItem = extend(FlMyAwardItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this.setData = data => {
			/*
			if (data.icon) {
				data.icon.indexOf("http") !== -1 ?
					this.imgIcon.loadFromUrl(data.icon) :
					this.imgIcon.dispatch({
						type: "updateUserStyle",
						userStyle: { image: data.icon, visible: true }
					});
			}
			*/
			data.title && (this.lblTitle.text = data.title);
			data.Aciklama && (this.lblTitle.text = data.Aciklama);
			data.date && (this.lblDate.text = data.date);
		};
	}
);

module.exports = FlMyAwardItem;
