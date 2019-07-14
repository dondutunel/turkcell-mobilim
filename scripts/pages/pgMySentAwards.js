/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgMySentAwardsDesign = require('ui/ui_pgMySentAwards');
const touch = require("sf-extension-utils/lib/touch");

const TEMP_ITEMS = [{
	title: "Okan Gürbüz",
	date: "25.12.2018",
	price: "100 TL",
	message: "Altınyıldız Classics 100 TL Dijital Hediye Çeki"
}, {
	title: "Uğur Erdem",
	date: "25.12.2018",
	price: "50 TL",
	message: "KOTON 50 TL Digital Hediye Çeki"

}, {
	title: "Muhammed Esad Ünal",
	date: "25.12.2018",
	price: "50 TL",
	message: "Mavi 100 TL Digital Hediye Çeki"
}];

const PgMySentAwards = extend(PgMySentAwardsDesign)(
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
}


function initListView(page, lv) {
	const originalRowCreate = lv.onRowCreate;
	lv.refreshEnabled = false;
	let counter = 0;
	lv.onRowCreate = (index) => {
		const item = originalRowCreate.call(lv);
		touch.addPressEvent(item.content, selectedEvent.bind(null, counter++));
		return item;
	};
	lv.onRowBind = (item, index) => {
		const data = page.itemsData[index];
		item.setData(data);
	};
	const selectedEvent = (index) => {
	//	page.router.push("/btb/tab3/myAwards/pgMyAwardDetail", page.itemsData[index]);
	};
	lv.itemCount = page.itemsData.length;
	lv.refreshData();
}


module.exports = PgMySentAwards;
