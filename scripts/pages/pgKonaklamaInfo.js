const System = require("sf-core/device/system");
const Screen = require("sf-core/device/screen");
const Label = require("sf-core/ui/label");
const FlKonaklamaItem = require("components/FlKonaklamaItem");
const Image = require("sf-core/ui/image");
const HeaderBarItem = require("sf-core/ui/headerbaritem");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const extend = require('js-base/core/extend');
const PgKonaklamaDesign = require('ui/ui_pgKonaklama');
const { getHotels } = require("../services/seyahatService");
const { wait } = require("lib/dialog");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const genericErrorHandler = require("lib/genericErrorHandler");

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
}];

const PgKonaklama = extend(PgKonaklamaDesign)(
    // Constructor
    function(_super, props, match, routeData) {
        // Initalizes super class for this page scope
        _super(this);
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.itemsData = {};
        this.routeData = routeData;
        this.btnContinue.onPress = () => {
            const waitDialog = wait();
            setTimeout(() => {
                waitDialog.hide();
                alert("Seyahat Talebiniz Başarıyla Oluşturulmuştur");
                this.router.goBacktoHome();
            }, 1000);
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
    const waitDialog = wait();
    this.lvPickerList.context = this.layout;
    this.flCheckItem.touchEnabled = false;
    this.flCheckItem.setData({ text: "" });
    this.flKosullar.onTouchEnded = () => {
        this.flCheckItem.onTouchEnded();
    }
    this.tvKosullar.onTouchEnded = () => {
        this.router.push("/btb/tab2/pgWebview");
    }
    if (System.OS === "Android")
        this.svMain.layout.minHeight = Screen.height - (150 + 235);
    this.svMain.layout.applyLayout();
    const addAccomodationButton = new HeaderBarItem({
        image: Image.createFromFile("images://plus.png"),
        onPress: () => {
            let konaklamaItem = new FlKonaklamaItem();
            page.svMain.layout.addChild(konaklamaItem, `konaklamaItem${itemIndex++}`);
            konaklamaItem.init(this.routeData.date);
            konaklamaItem.itemsData = page.itemsData;
            konaklamaItem.lvPickerList = page.lvPickerList;
            konaklamaItem.onDelete = () => {
                page.svMain.layout.removeChild(konaklamaItem);
                konaklamaItem.onChange();
            };
            konaklamaItem.onChange = () => {
                page.svMain.layout.applyLayout();
                page.layout.applyLayout();
            };
            konaklamaItem.onChange();
        }
    });
    page.headerBar.setItems([addAccomodationButton]);
    propagateTouchEvents(page.svMain);
    MATERIAL_OPTIONS.forEach(option => {
        initMaterials(this[option.name], option, option.maxLen);
    });
    Promise.all([getHotels()]).then(res => {
        page.itemsData["mtHotel"] = res[0];
    }).catch(genericErrorHandler).finally(() => waitDialog.hide());
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
