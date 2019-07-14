const FlUcusItem = require("components/FlUcusItem");
const Image = require("sf-core/ui/image");
const HeaderBarItem = require("sf-core/ui/headerbaritem");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const extend = require('js-base/core/extend');
const PgKonaklamaDesign = require('ui/ui_pgFlightInfo');
const { getAirportOptions } = require("../services/seyahatService");
const { wait } = require("lib/dialog");

const PgKonaklama = extend(PgKonaklamaDesign)(
    // Constructor
    function(_super, props, match, routeData) {
        // Initalizes super class for this page scope
        _super(this);
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.routeData = routeData;
        this.itemsData = {};
        this.btnContinue.onPress = () => {
            routeData.isAccommodationInfo &&
                this.router.push("/btb/tab2/pgKonaklamaInfo");
        };
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
    const page = this;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
    let itemIndex = 0;
    const page = this;
    const { from, to } = page.routeData;
    const waitDialog = wait();
    const addAccomodationButton = new HeaderBarItem({
        image: Image.createFromFile("images://plus.png"),
        onPress: () => {
            let ucusItem = new FlUcusItem();
            page.svMain.layout.removeChild(page.btnContinue);
            page.svMain.layout.addChild(ucusItem, `konaklamaItem${itemIndex++}`);
            page.svMain.layout.addChild(page.btnContinue);
            ucusItem.init();
            ucusItem.itemsData = this.itemsData;
            ucusItem.onDelete = () => {
                page.svMain.layout.removeChild(ucusItem);
                ucusItem.onChange();
            };
            ucusItem.onChange = () => {
                page.svMain.layout.applyLayout();
                page.layout.applyLayout();
            };
            ucusItem.onChange();
        }
    });
    page.headerBar.setItems([addAccomodationButton]);
    propagateTouchEvents(page.svMain);
    Promise.all([getAirportOptions(from, to)]).then(res => {
        page.itemsData["mtLocationFrom"] = res[0].from;
        page.itemsData["mtLocationTo"] = res[0].to;
    }).finally(() => waitDialog.hide());
}

module.exports = PgKonaklama;
