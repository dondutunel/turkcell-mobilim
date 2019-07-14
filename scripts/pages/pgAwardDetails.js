/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgAwardDetailsDesign = require('ui/ui_pgAwardDetails');
const touch = require("sf-extension-utils/lib/touch");

const TEMP_ITEMS = [{
	title: "Altınyıldız Classics 100 TL Dijital Hediye Çeki",
	icon: "https://primemall.s3-eu-west-1.amazonaws.com/images/brand_logo/NkVFl6Wbe_brand_logo_-main-.jpg?1522327384181"
}, {
	title: "KOTON 50 TL Digital Hediye Çeki",
	icon: "https://primemall.s3-eu-west-1.amazonaws.com/images/brand_logo/4kgQNcdGl_brand_logo_-main-.jpg?1447011583157"
}, {
	title: "Mavi 50 TL Digital Hediye Çeki",
	icon: "https://sky-static.mavi.com/sys-master/maviTrImages/hec/h5f/8844403081246/mavi-logo.svg"
}];
const PgAwardDetails = extend(PgAwardDetailsDesign)(
	// Constructor
	function(_super, props, match, routeData) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.itemsData = TEMP_ITEMS;
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
	initListView(this, this.lvMain);
	this.headerBar.title = this.routeData.title;
}

function initListView(page, lv) {
	const originalRowCreate = lv.onRowCreate;
	lv.refreshEnabled = false;
	lv.onRowCreate = () => {
		const item = originalRowCreate.call(lv);
		touch.addPressEvent(item.content, () => {});
		return item;
	};
	lv.onRowBind = (item, index) => {
		const data = page.itemsData[index];
		item.setData(data);
	};
	lv.onRowSelected = (item, index) => {
		page.router.push("/btb/tab3/sendAward/pgSendInstantAwardForm", page.itemsData[index]);
	}
	lv.itemCount = page.itemsData.length;
	lv.refreshData();
}

module.exports = PgAwardDetails;
