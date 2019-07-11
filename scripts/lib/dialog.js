const Application = require("sf-core/application");
const Dialog = require("sf-core/ui/dialog");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const FlWaitMain = require("components/FlWaitMain");
const onShowList = new Set();
const onHideList = new Set();

var dialogCounter = 0;
exports.wait = () => {
    let dialogWait = new Dialog();
    componentContextPatch(dialogWait, `dialogWait${dialogCounter++}`);
    let waitContent = new FlWaitMain();
    /**.dialog class needs to be added here, but given the current situation,
     * There is no need to add one for now.
     */
    dialogWait.layout.addChild(waitContent, "waitContent", ".wait-main");
    dialogWait.layout.applyLayout();
    Application.hideKeyboard();
    let originalDialogHide = dialogWait.hide;
    dialogWait.hide = () => {
        originalDialogHide.call(dialogWait);
        onHideList.forEach(cb => cb(dialogWait));
    };
    dialogWait.show();
    onShowList.forEach(cb => cb(dialogWait));

    return dialogWait;
};


exports.onShow = callback => {
    onShowList.add(callback);
    return () => onShowList.delete(callback);
};
Object.freeze(exports.onShow);


exports.onHide = callback => {
    onHideList.add(callback);
    return () => onHideList.delete(callback);

};
Object.freeze(exports.onHide);
