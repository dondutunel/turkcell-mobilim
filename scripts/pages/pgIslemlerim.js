const Color = require("sf-core/ui/color");
const FlexLayout = require("sf-core/ui/flexlayout");
const Screen = require("sf-core/device/screen");
const extend = require("js-base/core/extend");
const touch = require("sf-extension-utils/lib/touch");
const PgIslemlerimDesign = require('ui/ui_pgIslemlerim');
const FlCategoryItem = require("../components/FlCategoryItem");

const profileGravatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg";
const PROFILE_RADIUS = 14;
const MAIN_ITEM_CLASS_NAME = ".flCategoryItem.main";
const SUB_ITEM_TEXT_CLASS_NAME = ".flCategoryItem-title.submenu";
const SWITCH_INVISIBLE_CLASS_NAME = "#pgIslemlerim-subMenu-switch.invisible";
const ITEM_MARGIN = 15;
const ITEM_RATIO = 110 / 105;

const PgIslemlerim = extend(PgIslemlerimDesign)(
	// Constructor
	function(_super, routeData, router) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this._data = routeData.data;
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
	this.lblTitle.text = this._data.title;
	this.flUserHeaderBar.imgUser.loadFromUrl({
		url: profileGravatar,
		onSuccess: () => {
			this.flUserHeaderBar.imgUser.image = this.flUserHeaderBar.imgUser.image.android.round(PROFILE_RADIUS);
		}
	});
	createMainItems(this, 3, ITEM_MARGIN, ITEM_RATIO, this._data.mainItems);
	if (this._data.switchButtons && this._data.switchButtons.length > 0) {
		this.flSwitchButton.setData(this._data.switchButtons);
	}
	else {
		this.flSwitchButton.dispatch({
			type: "pushClassNames",
			classNames: [SWITCH_INVISIBLE_CLASS_NAME]
		});
	}
	createSubMenuItems(this, 2, 3, ITEM_MARGIN * 2, ITEM_RATIO);
	setSubMenuItemsData(this, this._data.subMenuItems[this.flSwitchButton.currentIndex + ``]);
	this.flSwitchButton.onIndexChange = index => {
		console.log("index: ", index);
		setSubMenuItemsData(this, this._data.subMenuItems[this.flSwitchButton.currentIndex + ``]);
	};
	this.layout.applyLayout();
}

function createMainItems(page, itemCount, itemMargin, itemRatio, itemsData) {
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
		item.setData(itemsData[i]);
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
		userStyle: { height: itemHeight + (2 * itemMargin) }
	});
	flMainItems.applyLayout();
}

function createSubMenuItems(page, rowCount, columnCount, parentPadding, itemRatio) {
	const { flMain } = page;
	const itemWidth = (Screen.width - ((columnCount - 1) * 1) - parentPadding) / columnCount;
	const itemHeight = itemWidth * itemRatio;
	let flRow, item;
	flMain.items = [];
	for (let i = 0; i < rowCount; ++i) {
		flRow = new FlexLayout({
			height: itemHeight,
			flexDirection: FlexLayout.FlexDirection.ROW,
			alignItems: FlexLayout.AlignItems.STRETCH
		});
		flMain.addChild(flRow, "flRow" + i);
		for (let j = 0; j < columnCount; ++j) {
			item = new FlCategoryItem();
			flRow.addChild(item, "item" + j);
			item.dispatch({
				type: "updateUserStyle",
				userStyle: {
					width: itemWidth,
					height: itemHeight
				}
			});
			item.tvTitle.dispatch({
				type: "pushClassNames",
				classNames: [SUB_ITEM_TEXT_CLASS_NAME]
			});
			flMain.items.push(item);
			item.applyLayout();
			if (j + 1 !== columnCount) {
				flRow.addChild(new FlexLayout(), "line" + j, ".flLine.vertical");
			}
		}
		if (i + 1 !== rowCount) {
			flMain.addChild(new FlexLayout(), "line" + i, ".flLine.horizontal");
		}
	}
}

function setSubMenuItemsData(page, data) {
	const { flMain, router } = page;
	flMain.items.forEach((item, index) => {
		const itemData = data[index];
		itemData ? item.setData(itemData) : item.clearData();
		touch.addPressEvent(item, () => {
			itemData && itemData.routePath && (router.push(itemData.routePath));
		});
	});
}

module.exports = PgIslemlerim;
