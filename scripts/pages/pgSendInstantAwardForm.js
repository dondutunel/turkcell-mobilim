/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgSendInstantAwardFormDesign = require('ui/ui_pgSendInstantAwardForm');

const PgSendInstantAwardForm = extend(PgSendInstantAwardFormDesign)(
	// Constructor
	function(_super, props, match, routeData) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.routeData = routeData;
	}
);

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	this.tbName.hint = "Hediye Gönderilecek Kişi";
	this.taMessage.text ="";
	setData.call(this, this.routeData);
}


function setData(data) {
	if (data.icon) {
		data.icon.indexOf("http") !== -1 ?
			this.imgIcon.loadFromUrl(data.icon) :
			this.imgIcon.dispatch({
				type: "updateUserStyle",
				userStyle: { image: data.icon, visible: true }
			});
	}
	data.title && (this.lblTitle.text = data.title);
}

module.exports = PgSendInstantAwardForm;
