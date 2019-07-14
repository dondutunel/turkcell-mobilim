/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgInstantAwardDesign = require('ui/ui_pgInstantAward');
const touch = require("sf-extension-utils/lib/touch");

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
		this.itemsData = props.data.items;
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
	initItems(this, this.itemsData);
}

function initItems(page, itemsData) {
	itemsData.forEach((itemData, index) => {
		const uiItem = page[UI_ITEMS[index]];
		uiItem.setData(itemData);
		touch.addPressEvent(uiItem, () => {
			itemData.routePath && page.router.push(itemData.routePath);
		});
	});

}

module.exports = PgInstantAward;
