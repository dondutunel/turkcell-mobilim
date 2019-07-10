const Screen = require("sf-core/device/screen");
const extend = require("js-base/core/extend");
const touch = require("sf-extension-utils/lib/touch");
const Page2Design = require('ui/ui_pgIslemlerim');
const FlCategoryItem = require("../components/FlCategoryItem");

const profileGravatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg";
const MAIN_ITEM_CLASS_NAME = ".flCategoryItem.main";
const ITEM_MARGIN = 15;
const ITEM_RATIO = 110 / 105;
const MAIN_ITEMS_DATA = [{
		icon: "masrafim_icon.png",
		text: "MASRAFIM"
	},
	{
		icon: "toplanti_icon.png",
		text: "TOPLANTI\nODASI"
	},
	{
		icon: "masrafim_icon.png",
		text: "EGITIMLERIM"
	}
];

const Page2 = extend(Page2Design)(
	// Constructor
	function(_super, routeData, router) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	});

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
	superOnShow();
	console.log("pgIslemlerim");
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	this.headerBar.leftItemEnabled = false;
	this.flUserHeaderBar.imgUser.loadFromUrl({
		url: profileGravatar,
		onSuccess: () => {
			this.flUserHeaderBar.imgUser.image = this.flUserHeaderBar.imgUser.image.android.round(14);
		}
	});
	createMainItems(this, 3, ITEM_MARGIN, ITEM_RATIO);
}

function createMainItems(page, itemCount, itemMargin, itemRatio) {
	const { flMainItems } = page;

	const itemWidth = (Screen.width - ((itemCount + 1) * itemMargin)) / itemCount;
	const itemHeight = itemWidth * itemRatio;

	let item;
	for (let i = 0; i < itemCount; ++i) {
		item = new FlCategoryItem();
		flMainItems.addChild(item, "item" + i);
		item.dispatch({
			type: "pushClassNames",
			classNames: [MAIN_ITEM_CLASS_NAME]
		});
		item.setData(MAIN_ITEMS_DATA[i]);
		item.dispatch({
			type: "updateUserStyle",
			userStyle: {
				width: itemWidth,
				height: itemHeight,
				marginLeft: itemMargin
			}
		});
		item.applyLayout();
		touch.addPressEvent(item, () => {});
	}
	flMainItems.dispatch({
		type: "updateUserStyle",
		userStyle: { height: itemHeight + (2 * ITEM_MARGIN) }
	});
	flMainItems.applyLayout();
}

module.exports = Page2;
