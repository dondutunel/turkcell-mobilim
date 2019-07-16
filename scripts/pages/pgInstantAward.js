/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgInstantAwardDesign = require('ui/ui_pgInstantAward');
const touch = require("sf-extension-utils/lib/touch");
const { getUserId } = require("../globalData");
const { getAvailableAwards, getMyAwards } = require("../services/awardService");
const { wait } = require("lib/dialog");

const UI_ITEMS = [
	"flInstantAward",
	"flMyInstantAward",
	"flSentMyInstantAward"
];
const PgInstantAward = extend(PgInstantAwardDesign)(
	// Constructor
	function(_super, props) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.itemsData = props.data.items.slice();
		this.serviceData = {}
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
	const page = this;
	const waitDialog = wait();
	Promise.all([
		getAvailableAwards(),
		getMyAwards()
	]).then(res => {
		page.userData = res[1];
		console.info("Response: ", res);
		page.serviceData[UI_ITEMS[0]] = res[0];
		page.itemsData[0].count = res[0].length;
		page.serviceData[UI_ITEMS[1]] = res[1];
		if (!res[1].funds) {
			const ui_item = UI_ITEMS.splice(0, 1);
			page.layout.removeChild(page[ui_item]);
			page.itemsData.splice(0,1);
		}
		page.itemsData[1].count = res[1].length;
		initItems(page, page.itemsData);
		page.layout.applyLayout();
	}).finally(() => waitDialog.hide());
}

function initItems(page, itemsData) {
	itemsData.forEach((itemData, index) => {
		const uiItem = page[UI_ITEMS[index]];
		uiItem.setData(itemData);
		touch.addPressEvent(uiItem, () => {
			itemData.routePath && page.router.push(itemData.routePath, page.userData);
		});
	});
}

module.exports = PgInstantAward;
