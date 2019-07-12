const MT_ICON_NORMAL_CLASS_NAME = ".materialTextBox-icon";
const MT_ICON_ACTIVE_CLASS_NAME = ".materialTextBox-icon.active";

module.exports = function populateMaterialTextBoxs(page, mtOptions) {
    mtOptions.forEach(mtOption => {
        const materialTextBox = page[mtOption.name].materialTextBox;
        const imgDropDown = page[mtOption.name].imgDropDown;
        imgDropDown.dispatch({
            type: "pushClassNames",
            classNames: [MT_ICON_NORMAL_CLASS_NAME]
        });
        imgDropDown.dispatch({
            type: "updateUserStyle",
            userStyle: { image: mtOption.icon }
        });
        imgDropDown.isActive = false;
        const originalOnTextChanged = materialTextBox.onTextChanged;
        const originalOnEditEnds = materialTextBox.onEditEnds;
        materialTextBox.onTextChanged = materialTextBox.onEditEnds = (e) => {
            originalOnTextChanged && originalOnTextChanged(e);
            originalOnEditEnds && originalOnEditEnds(e);
            if (materialTextBox.text && !imgDropDown.isActive) {
                imgDropDown.dispatch({
                    type: "pushClassNames",
                    classNames: [MT_ICON_ACTIVE_CLASS_NAME]
                });
                imgDropDown.isActive = true;
            }
            else if (!materialTextBox.text && imgDropDown.isActive) {
                imgDropDown.dispatch({
                    type: "removeClassName",
                    className: [MT_ICON_ACTIVE_CLASS_NAME]
                });
                imgDropDown.isActive = false;
            }
        };
    });
}
