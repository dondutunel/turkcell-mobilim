const extend = require('js-base/core/extend');
const FlMySentAwardItemDesign = require('library/FlMySentAwardItem');

const FlMySentAwardItem = extend(FlMySentAwardItemDesign)(
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
			data.award && (this.lblAward.text = data.award);
			data.title && (this.lblTitle.text = data.title);
			data.Aciklama && (this.lblTitle.text = data.Aciklama);
			data.date && (this.lblDate.text = data.date);
			data.message && (this.lblMessage.text = data.message);
			data.price && (this.lblPrice.text = `Hediye Miktarı: ${data.price}`);
			data.Fiyat && (this.lblPrice.text = `Hediye Miktarı: ${data.Fiyat}`);
		};
	}
);

module.exports = FlMySentAwardItem;
