/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgMyAwardDetailDesign = require('ui/ui_pgMyAwardDetail');

const PgMyAwardDetail = extend(PgMyAwardDetailDesign)(
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
	this.svMain.layout.minHeight = 400;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	this.lblTitle.text = this.routeData.title;
	this.lblDate.text = this.routeData.date;
	this.lblName.text = this.routeData.userName;
	this.lblMessage.text = this.routeData.message;
	this.lblDetail.text = this.routeData.detail;
}

module.exports = PgMyAwardDetail;
