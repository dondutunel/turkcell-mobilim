const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlUcusItem');
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const populateMaterialTextbox = require("../utils/populateMaterialTextbox");
const addActionToMateriaTextboxs = require("../lib/addActionToMateriaTextboxs");
const { showDatePicker, showListview, showPicker } = require("../lib/showHelperUiItems");

const options = {
 "mtLocationFrom": {
  hint: "Nereden",
  touchEnabled: false,
  picker: true,
  mapperFn: data => data.AirPortName_Turkish
 },
 "mtLocationTo": {
  hint: "Nereye",
  touchEnabled: false,
  picker: true,
  mapperFn: data => data.AirPortName_Turkish

 },
 "mtDateFrom": {
  hint: "Tarih",
  datePicker: true
 },
 "mtTimeFrom": {
  hint: "Saat"
 },
 "mtDonusDate": {
  hint: "Tarih",
  datePicker: true
 },
 "mtDonusTime": {
  hint: "Saat"
 },
};

const MATERIAL_OPTIONS = [{
 name: "mtDateFrom",
 icon: "date_icon.png"

}, {
 name: "mtDonusDate",
 icon: "date_icon.png"
}];

const FlKonaklamaItem = extend(FlKonaklamaItemDesign)(
 // Constructor
 function(_super, props = {}, pageName) {
  // Initalizes super class for this scope
  _super(this, props);
  this.pageName = pageName;

  const FULL_HEIGHT = getCombinedStyle(".flKonaklamaItem").height;
  const HEADER_HEIGHT = getCombinedStyle(".flKonaklamaItem-header").height;
  const HEIGHT_WITHOUT_RETURN_DATE = FULL_HEIGHT - HEADER_HEIGHT;

  this.init = (date) => {
   Object.keys(options).forEach(componentName => {
    this[componentName].options = options[componentName];
   });
   addActionToMateriaTextboxs(this, options);
   populateMaterialTextbox(this, MATERIAL_OPTIONS);
   console.log(date);
   this.mtDateFrom.onDropDownClick = () => showDatePicker.call(this, "mtDateFrom", date.min, date.max);
   this.mtDonusDate.onDropDownClick = () => {
    const minDate = this.mtDateFrom.materialTextBox.rawValue;
    minDate && showDatePicker.call(this, "mtDonusDate", minDate, date.max);
   };

   // Init checkbox
   this.flCheckbox.setData({ text: "Dönüş Tarihi" });
   this.flCheckbox.onCheckedChange = (isChecked) => {
    let visible = !!isChecked;
    this.flDonusTarihi.dispatch({
     type: "updateUserStyle",
     userStyle: {
      visible,
      height: visible ? HEADER_HEIGHT : 0
     }
    });
    this.dispatch({
     type: "updateUserStyle",
     userStyle: {
      height: visible ? FULL_HEIGHT : HEIGHT_WITHOUT_RETURN_DATE
     }
    });
    this.onChange && this.onChange(); // Exposed
   };
   this.flCheckbox.onCheckedChange(false);

   // Init delete button
   this.btnRemove.onPress = () => {
    this.onDelete && this.onDelete(); // Exposed
   };
  };
 }
);

module.exports = FlKonaklamaItem;
