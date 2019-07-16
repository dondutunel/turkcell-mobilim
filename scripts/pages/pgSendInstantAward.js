/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgSendInstantAwardDesign = require('ui/ui_pgSendInstantAward');
const touch = require("sf-extension-utils/lib/touch");

const TEMP_ITEMS = [{
    title: "Giyim",
    count: "25",
    icon: "giyim_icon.png"
}, {
    title: "Seyahat",
    count: "35",
    icon: "bag_icon.png"
}, {
    title: "Tekonolji",
    count: "40",
    icon: "cam_icon.png"
}, {
    title: "Spor",
    count: "15",
    icon: "spor_icon.png"
}, {
    title: "Gida",
    count: "60",
    icon: "burger_icon.png"
}]

const PgSendInstantAward = extend(PgSendInstantAwardDesign)(
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
        this.lblTotal.text = `${routeData.funds} TL`;
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
    lv.onRowCreate = () => {
        const item = originalRowCreate.call(lv);
        touch.addPressEvent(item, () => {});
        return item;
    };
    lv.onRowBind = (item, index) => {
        const data = page.itemsData[index];
        item.setData(data);
    };
    lv.onRowSelected = (item, index) => {
        page.routeData.title = page.itemsData[index].title;
        page.router.push("/btb/tab3/sendAward/pgAwardDetails", page.routeData);
    };
    lv.itemCount = page.itemsData.length;
    lv.refreshData();
}
module.exports = PgSendInstantAward;
