const extend = require('js-base/core/extend');
const PgAwardDetailsDesign = require('ui/ui_pgAwardDetails');
const touch = require("sf-extension-utils/lib/touch");
const { wait } = require("lib/dialog");
const { getAvailableAwards } = require("../services/awardService");
const genericErrorHandler = require("lib/genericErrorHandler");

const PgAwardDetails = extend(PgAwardDetailsDesign)(
	// Constructor
	function(_super, props, match, routeData) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.itemsData = [];
		this.routeData = routeData;
		this.lblTotal.text = `${routeData.funds} TL`;
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function onLoad(superOnLoad) {
	superOnLoad();
	initListView(this, this.lvMain);
	this.headerBar.title = this.routeData.title;

	const waitDialog = wait();
	getAvailableAwards()
		.then(e => {
			this.itemsData = e;
			this.lvMain.itemCount = this.itemsData.length;
			this.lvMain.refreshData();
		})
		.catch(genericErrorHandler)
		.finally(() => waitDialog.hide());
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
		console.info("onAawardSelexcted: ", page.itemsData[index]);
		page.router.push("/btb/tab3/sendAward/pgSendInstantAwardForm", page.itemsData[index]);
	};
	lv.itemCount = page.itemsData.length;
	lv.refreshData();
}

module.exports = PgAwardDetails;
