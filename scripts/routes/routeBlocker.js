const Network = require("sf-core/device/network");

function isOffline() {
    let isOffline = Network.connectionType === Network.ConnectionType.NONE;
    return isOffline;
}

const ignorePaths = [
    "/btb/tab1/page1",
    "/btb/tab2/pgIslemlerim",
    "/btb/tab3/hr",
    "/btb/tab4/page4",
    "/btb/tab5/page5",
];

exports.init = router => {
    router.addRouteBlocker((path = "", routeData, action, ok) => {
        if (ignorePaths.includes(path))
            return ok(true);
        if (isOffline()) {
            alert("Aktif bir internet bağlantısı bulunamadı!");
            return ok(false);
        }
        return ok(true);
    });
};
