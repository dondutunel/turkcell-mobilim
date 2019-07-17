const Label = require("sf-core/ui/label");
const KeyboardType = require("sf-core/ui/keyboardtype");
const System = require("sf-core/device/system");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const extend = require('js-base/core/extend');
const PgSeyahatTalebiDesign = require('ui/ui_pgSeyahatTalebi');
const { wait } = require("lib/dialog");
const { getTripOptions, getAutocompleteCity, getAgentList } = require("../services/seyahatService");
const debounce = require("../utils/debounce");
const { showDatePicker, showListview, showPicker } = require("../lib/showHelperUiItems");
const genericErrorHandler = require("lib/genericErrorHandler");
const populateMaterialTextbox = require("../utils/populateMaterialTextbox");

const HIDE_MT_CLASS_NAME = ".materialTextBox-wrapper.hide";
const MATERIAL_OPTIONS = [{
        name: "mtRegion",
        icon: "arrowbottom.png"
    },
    {
        name: "mtPurpose",
        icon: "arrowbottom.png"
    }, {
        name: "mtFrom",
        icon: "search_icon.png"
    },
    {
        name: "mtTo",
        icon: "search_icon.png"
    },
    {
        name: "mtDepartureDate",
        icon: "date_icon.png"
    },
    {
        name: "mtReturnDate",
        icon: "date_icon.png"
    },
    {
        name: "mtAcente",
        icon: "arrowbottom.png"
    },
    {
        name: "mtBirthDate",
        icon: "date_icon.png"
    }
];
const MATERIALS_COMMON = ["mtRegion", "mtPurpose", "mtDescription", "mtFrom", "mtTo", "mtDepartureDate", "mtReturnDate"]
const MATERIALS_FLIGHT = ["mtAcente", "mtBirthDate", "mtID"];
const MAX_LAYOUT_HEIGHT = 757;
const MAX_DESC_LENGTH = 150;
const materialColor = getCombinedStyle(".materialTextBox");

const PgSeyahatTalebi = extend(PgSeyahatTalebiDesign)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.itemsData = {};
        this.showPicker = showPicker.bind(this);
        this.showDatePicker = showDatePicker.bind(this);
        this.showListview = debounce(showListview, 300);
        this.routerData = {
            isFlightInfo: false,
            isAccommodationInfo: false
        };
        this.btnContinue.enabled = true;
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
    //this.svMain.layout.minHeight = Screen.height;
    this.lvPickerList.context = this.svMain.layout;
    initMaterials(this);
    this.btnContinue.onPress = () => {

        if (!validateForm(this))
            return
        this.routerData.from = this.mtFrom.materialTextBox.text;
        this.routerData.to = this.mtTo.materialTextBox.text;
        this.routerData.date = {
            min: page.mtDepartureDate.materialTextBox.rawValue,
            max: page.mtReturnDate.materialTextBox.rawValue,
        };
        if (this.routerData.isFlightInfo) {
            page.router.push("/btb/tab2/pgFlightInfo", this.routerData);
        }
        else if (this.routerData.isAccommodationInfo) {
            page.router.push("/btb/tab2/pgKonaklamaInfo", this.routerData);
        }
    };
    propagateTouchEvents(this.svMain);
    this.flCheckFlight.setData({ text: "Ucus" });
    this.flCheckAccommodation.setData({ text: "Konaklama" });
    this.flCheckAccommodation.onCheckedChange = isChecked => {
        this.routerData.isAccommodationInfo = isChecked;
        updateContinueButtonState(this);
    };
    this.flCheckFlight.onCheckedChange = isChecked => {
        this.routerData.isFlightInfo = isChecked;
        updateContinueButtonState(this);
        showHideMaterialTextBox(this.mtAcente, isChecked);
        showHideMaterialTextBox(this.mtBirthDate, isChecked);
        showHideMaterialTextBox(this.mtID, isChecked);
        if (System.OS !== "iOS") {
            isChecked && (this.svMain.layout.height = MAX_LAYOUT_HEIGHT);
            this.svMain.layout.applyLayout();
        }
        this.layout.applyLayout();

    };
    Promise.all([getTripOptions(), getAgentList()]).then(res => {
            this.itemsData["mtRegion"] = res[0].types;
            this.itemsData["mtPurpose"] = res[0].purposes;
            this.itemsData["mtAcente"] = res[1];
        }).catch(genericErrorHandler)
        .finally(() => waitDialog.hide());
}

function initMaterials(page) {
    page.mtRegion.options = {
        hint: "Yurt İçi - Yurt Dışı",
        touchEnabled: false
    };
    page.mtRegion.onDropDownClick = () => page.showPicker("mtRegion", data => {
        global.isDomestic = data.Code === "YURTICI";
        return data.Description;
    });
    page.mtPurpose.options = {
        hint: "Temsil",
        touchEnabled: false
    };
    page.mtPurpose.onDropDownClick = () => page.showPicker("mtPurpose", data => {
        page.mtDepartureDate.materialTextBox.hint = `${data.Description} Başlangıç`;
        page.mtReturnDate.materialTextBox.hint = `${data.Description} Bitiş`;
        return data.Description;
    });
    const lblRemainLength = new Label({ text: `${MAX_DESC_LENGTH}`, textColor: materialColor.lineColor.normal });
    page.mtDescription.options = {
        hint: "Seyahat Açıklaması",
        onTextChanged: (e) => {
            const text = page.mtDescription.materialTextBox.text || "";
            const subText = text.substr(0, MAX_DESC_LENGTH);
            if (subText !== text) {
                page.mtDescription.materialTextBox.text = subText;
            }
            lblRemainLength.text = "" + (MAX_DESC_LENGTH - subText.length);
            lblRemainLength.textColor = materialColor.lineColor[text ? "selected" : "normal"];

        }
    };
    page.mtDescription.materialTextBox.rightLayout = { view: lblRemainLength, width: 30 };
    page.mtFrom.options = {
        hint: "Nereden",
        onTextChanged: (e) => {
            const text = page.mtFrom.materialTextBox.text;
            if (e && text && text.length >= 3) {
                page.showListview(
                    page,
                    page.mtFrom,
                    getAutocompleteCity,
                    text,
                    data => data.City,
                    (data) => {
                        page.mtFrom.materialTextBox.text = data.City;
                    }
                );
            }
        }
    };
    page.mtTo.options = {
        hint: "Nereye",
        onTextChanged: (e) => {
            const text = page.mtTo.materialTextBox.text;
            if (e && text && text.length >= 3) {
                page.showListview(
                    page,
                    page.mtTo,
                    getAutocompleteCity,
                    text,
                    data => data.City,
                    (data) => {
                        page.mtTo.materialTextBox.text = data.City;
                    }
                );
            }
        }
    };
    page.mtDepartureDate.options = {
        hint: "Başlangıç",
        touchEnabled: false
    };
    page.mtDepartureDate.onDropDownClick = () => page.showDatePicker("mtDepartureDate", new Date());
    page.mtReturnDate.options = {
        hint: "Bitiş",
        touchEnabled: false
    };
    page.mtReturnDate.onDropDownClick = () => {
        const minDate = page.mtDepartureDate.materialTextBox.rawValue;
        if (minDate) {
            page.showDatePicker("mtReturnDate", minDate);
        }
    };
    page.mtAcente.options = {
        hint: "Acente",
        touchEnabled: false
    };
    page.mtAcente.onDropDownClick = () => page.showPicker("mtAcente", data => data.AgentName);
    page.mtBirthDate.options = {
        hint: "Doğum Tarihi",
        touchEnabled: false
    };
    page.mtBirthDate.onDropDownClick = () => page.showDatePicker("mtBirthDate", null, new Date());
    page.mtID.options = {
        hint: "TC Kimlik No ",
        keyboardType: KeyboardType.NUMBER
    };
    populateMaterialTextbox(page, MATERIAL_OPTIONS);
}

function showHideMaterialTextBox(mt, show) {
    if (show) {
        mt.dispatch({
            type: "removeClassName",
            className: [HIDE_MT_CLASS_NAME]
        });
    }
    else {
        mt.dispatch({
            type: "pushClassNames",
            classNames: [HIDE_MT_CLASS_NAME]
        });
    }
    mt.applyLayout();
}

function updateContinueButtonState(page) {
    page.btnContinue.enabled = (page.routerData.isAccommodationInfo || page.routerData.isFlightInfo);
}

function validateForm(page) {
    let isInvalid = MATERIALS_COMMON.some(item => !page[item].materialTextBox.text);
    if (page.routerData.isFlightInfo) {
        isInvalid = MATERIALS_FLIGHT.some(item => !page[item].materialTextBox.text);
    }

    if (isInvalid) {
        alert("Bütün alanların dolu olması gerekmektedir");
    }
    return !isInvalid;
}

module.exports = PgSeyahatTalebi;
