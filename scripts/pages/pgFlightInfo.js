const Label = require("sf-core/ui/label");
const FlUcusItem = require("components/FlUcusItem");
const Image = require("sf-core/ui/image");
const HeaderBarItem = require("sf-core/ui/headerbaritem");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const extend = require('js-base/core/extend');
const PgKonaklamaDesign = require('ui/ui_pgFlightInfo');
const { getAirportOptions } = require("../services/seyahatService");
const { wait } = require("lib/dialog");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");

const MAX_DESC_LENGTH = 150;
const MAX_NOTE_LENGTH = 80;
const materialColor = getCombinedStyle(".materialTextBox");
const MATERIAL_OPTIONS = [{
    name: "mtNote",
    hint: "Notunuz",
    maxLen: MAX_NOTE_LENGTH
}, {

    name: "mtDescription",
    hint: "Açıklama",
    maxLen: MAX_DESC_LENGTH
}]

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
        !routeData.isAccommodationInfo && (this.btnContinue.text = "Talebi Gönder");
        this.btnContinue.onPress = () => {
            if (routeData.isAccommodationInfo) {
                this.router.push("/btb/tab2/pgKonaklamaInfo", this.routeData);
            }
            else {
                const waitDialog = wait();
                setTimeout(() => {
                    waitDialog.hide();
                    alert("Seyahat talebi başarıyla oluşturulmuştur!");
                    this.router.goBacktoHome();
                }, 1000);
            }
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
            page.svMain.layout.removeChild(page.flFooter);
            page.svMain.layout.addChild(ucusItem, `konaklamaItem${itemIndex++}`);
            page.svMain.layout.addChild(page.flFooter);
            ucusItem.init(this.routeData.date);
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
    MATERIAL_OPTIONS.forEach(option => {
        initMaterials(this[option.name], option, option.maxLen);
    });
    Promise.all([getAirportOptions(from, to)]).then(res => {
        page.itemsData["mtLocationFrom"] = res[0].from;
        page.itemsData["mtLocationTo"] = res[0].to;
    }).finally(() => waitDialog.hide());
}

function initMaterials(mt, options, max_len) {
    const lblRemainLength = new Label({ text: `${max_len}`, textColor: materialColor.lineColor.normal });
    mt.options = Object.assign({}, options, {
        onTextChanged: (e) => {
            const text = mt.materialTextBox.text || "";
            const subText = text.substr(0, max_len);
            if (subText !== text) {
                mt.materialTextBox.text = subText;
            }
            lblRemainLength.text = "" + (max_len - subText.length);
            lblRemainLength.textColor = materialColor.lineColor[text ? "selected" : "normal"];
        }
    });
    mt.materialTextBox.rightLayout = { view: lblRemainLength, width: 30 };
}

module.exports = PgKonaklama;
