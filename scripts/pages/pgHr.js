const Color = require("sf-core/ui/color");
const FlexLayout = require("sf-core/ui/flexlayout");
const Screen = require("sf-core/device/screen");
const extend = require("js-base/core/extend");
const touch = require("sf-extension-utils/lib/touch");
const Page2Design = require('ui/ui_pgIslemlerim');
const FlCategoryItem = require("../components/FlCategoryItem");
const FlSwitchButton = require("../components/FlSwitchButton");

const profileGravatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg";
const PROFILE_RADIUS = 14;
const MAIN_ITEM_CLASS_NAME = ".flCategoryItem.main";
const SUB_ITEM_TEXT_CLASS_NAME = ".flCategoryItem-title.submenu";
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

const SWITCH_DATA = [{
		text: "Talep Islemlerim",
		isActive: true
	},
	{
		text: "Is Guvenligi",
		isActive: false
	}
];


const SUBMENU_DATA = {
	"Talep Islemlerim": [{
			icon: "seyahat_icon.png",
			text: "Seyahat\nTalebi"
		},
		{
			icon: "ofis_icon.png",
			text: "Ofis\nDisindayim"
		},
		{
			icon: "mobil_icon.png",
			text: "Mobil\nCalisimci"
		},
		{
			icon: "vekalet_icon.png",
			text: "Vekalet"
		},
		{
			icon: "izin_icon.png",
			text: "Izin"
		},
		{
			icon: "cym_icon.png",
			text: "CYM"
		}
	],
	"Is Guvenligi": [{
			icon: "mobil_icon.png",
			text: "Mobil\nCalisimci"
		},
		{
			icon: "vekalet_icon.png",
			text: "Vekalet"
		},
		{
			icon: "izin_icon.png",
			text: "Izin"
		}
	]
};

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
			this.flUserHeaderBar.imgUser.image = this.flUserHeaderBar.imgUser.image.android.round(PROFILE_RADIUS);
		}
	});
	createMainItems(this, 3, ITEM_MARGIN, ITEM_RATIO, MAIN_ITEMS_DATA);
	const flSwitchButton = new FlSwitchButton();
	this.flSubMenu.addChild(flSwitchButton, "flSwitchButton");
	flSwitchButton.setData(SWITCH_DATA);
	createSubMenuItems(this, 2, 3, ITEM_MARGIN * 2, ITEM_RATIO);
	setSubMenuItemsData(this.flSubMenu, SUBMENU_DATA["Talep Islemlerim"]);
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
	const { flSubMenu } = page;
	const itemWidth = (Screen.width - ((columnCount - 1) * 1) - parentPadding) / columnCount;
	const itemHeight = itemWidth * itemRatio;
	let flRow, item, flMain;
	flSubMenu.items = [];
	flMain = new FlexLayout({
		flexGrow: 1,
		alignItems: FlexLayout.AlignItems.STRETCH,
		marginTop: 27
	});
	flSubMenu.addChild(flMain, "flMain");
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
			flSubMenu.items.push(item);
			item.applyLayout();
			if (j + 1 !== columnCount) {
				flRow.addChild(new FlexLayout(), "line" + j, ".flLine.vertical");
			}
		}
		if (i + 1 !== rowCount) {
			flMain.addChild(new FlexLayout(), "line" + i, ".flLine.horizontal");
		}
	}
	flSubMenu.applyLayout();
}

function setSubMenuItemsData(menu, data) {
	const { items } = menu;
	items.forEach((item, index) => {
		item.setData(data[index]);
		touch.addPressEvent(item, () => {

		});
	});
}

module.exports = Page2;
