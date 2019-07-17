/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgMyAwardDetailDesign = require('ui/ui_pgMyAwardDetail');
const TEMP_DATA = {
	message: "2018’deki başarılı çalışmaların için\n teşekkürler.",
	detail: "Etiam vel euismod augue. Praesent venenatis efficitur tortor ac blandit. Suspendisse rhoncus ex sit amet nisl gravida, non eleifend leo auctor. Nunc non imperdiet quam. ",
	userName: "Saner Ateş",
	awardCode: "FA030593TURK",
	date: "22.05.2019"
}
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
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	this.svMain.layout.minHeight = 420;
	this.lblTitle.text = this.routeData.Aciklama || TEMP_DATA.title;
	this.lblDate.text = this.routeData.Tarih || TEMP_DATA.date;
	this.lblName.text = this.routeData.userName || TEMP_DATA.userName;
	this.lblMessage.text = this.routeData.Aciklama || TEMP_DATA.message;
	this.lblDetail.text = this.routeData.Aciklama || TEMP_DATA.detail;
	this.lblAwardCode.text = this.routeData.Kod || TEMP_DATA.awardCode;
}

module.exports = PgMyAwardDetail;
