const extend = require('js-base/core/extend');
const PgMySentAwardsDesign = require('ui/ui_pgMySentAwards');
const touch = require("sf-extension-utils/lib/touch");
const { getAvailableAwards, getMyAwards } = require("../services/awardService");
const { wait } = require("lib/dialog");
const genericErrorHandler = require("lib/genericErrorHandler");

const PgMySentAwards = extend(PgMySentAwardsDesign)(
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
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function onLoad(superOnLoad) {
	superOnLoad();
	initListView(this, this.lvMain);

	const waitDialog = wait();
	Promise.all([getAvailableAwards(), getMyAwards()])
		.then(e => {
			let availableAwards = e[0];
			let receivedAwards = e[1].givenAwards;
			let awards = receivedAwards.map(awardID => availableAwards.find(a => a.Kod === awardID));
			this.itemsData = awards;
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
		//	page.router.push("/btb/tab3/myAwards/pgMyAwardDetail", page.itemsData[index]);
	};
	lv.itemCount = page.itemsData.length;
	lv.refreshData();
}


module.exports = PgMySentAwards;
