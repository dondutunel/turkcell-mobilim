const System = require("sf-core/device/system");
const createPageContext = require("@smartface/contx/lib/smartface/pageContext");
const Image = require("sf-core/ui/image");
const Color = require("sf-core/ui/color");
const Application = require("sf-core/application");
const OS = require('sf-core/device/system').OS;
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    BottomTabBarRouter,
    Route
} = require("@smartface/router");
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const backClose = require("sf-extension-utils/lib/router/back-close");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const pagesData = require("../pagesData");
class StylingComponent {
    subscribeContext({
        type, // context type
        style, // style with native objects
        rawStyle // style with json objects
    }) {
        // console.log(JSON.stringify(rawStyle));
        // You can assign styles below using style object
    }
}

StylingComponent.$$styleContext = {
    classNames: "",
    userProps: {
        width: null,
        height: null,
        paddingLeft: 10,
        paddingRight: 10
    }
};

const pageContext = createPageContext(new StylingComponent(), "btbExample");

// Theme styling BottomTabBarRouter using Application.theme
Application.theme(
    pageContext,
    'btbExample'
);

const ik_icon = Image.createFromFile("images://ik_icon.png");
const sirketim_icon = Image.createFromFile("images://sirketim_icon.png");
const home_icon = Image.createFromFile("images://home_icon.png");
const categories_icon = Image.createFromFile("images://categories_icon.png");
const dashboard_icon = Image.createFromFile("images://dashboard_icon.png");
const backArrowImage = Image.createFromFile("images://arrow_back.png");

backClose.setDefaultBackStyle({ image: backArrowImage, hideTitle: true });
backClose.dissmissBuilder = (match, routeData, router, pageInstance, pageProps, route) => {
    return {
        text: global.lang.cancel,
        image: System.OS === "Android" && backArrowImage,
        position: "left"
    };
};

const bottomTabBarRouter = BottomTabBarRouter.of({
    path: "/",
    to: "/btb/tab1",
    tabbarParams: () => ({
        ios: { translucent: false },
        itemColor: {
            normal: Color.create("#919191"),
            selected: Color.create("#00a1f1")
        }
    }),
    items: () => [
        { title: "Ana Sayfa", icon: home_icon },
        { title: "İşlemlerim", icon: categories_icon },
        { title: "IK", icon: ik_icon },
        { title: "Şirketim", icon: sirketim_icon },
        { title: "Dashboard", icon: dashboard_icon }
    ],
    routes: [
        // tab1
        StackRouter.of({
            path: "/btb/tab1",
            to: "/btb/tab1/page1",
            routes: [
                Route.of({
                    path: "/btb/tab1/page1",
                    build: buildExtender({ pageName: "page1", singleton: true, pageProps: {} })
                }),
            ]
        }),
        // tab2
        StackRouter.of({
            path: "/btb/tab2",
            to: "/btb/tab2/pgIslemlerim",
            routes: [
                Route.of({
                    path: "/btb/tab2/pgIslemlerim",
                    build: buildExtender({
                        pageName: "pgIslemlerim",
                        headerBarStyle: { visible: false },
                        singleton: true,
                        pageProps: { shouldExit: true, data: pagesData.pgIslemlerim }
                    })
                }),
                Route.of({
                    path: "/btb/tab2/pgSeyahatTalebi",
                    build: buildExtender({ pageName: "pgSeyahatTalebi", singleton: false, pageProps: {} })
                }),
                Route.of({
                    path: "/btb/tab2/pgFlightInfo",
                    build: buildExtender({ pageName: "pgFlightInfo", singleton: false, pageProps: {} })
                }),
                Route.of({
                    path: "/btb/tab2/pgKonaklamaInfo",
                    build: buildExtender({ pageName: "pgKonaklamaInfo", singleton: false, pageProps: {} })
                })
            ]
        }),
        // tab3
        StackRouter.of({
            path: "/btb/tab3",
            to: "/btb/tab3/hr",
            routes: [
                Route.of({
                    path: "/btb/tab3/hr",
                    headerBarStyle: { visible: false },
                    build: buildExtender({ pageName: "pgIslemlerim", singleton: true, pageProps: { data: pagesData.pgHr } })
                }),
                Route.of({
                    path: "/btb/tab3/sendAward/pgInstantAward",
                    build: buildExtender({ pageName: "pgInstantAward", singleton: false, pageProps: { data: pagesData.pgInstantAward } })
                }),
                Route.of({
                    path: "/btb/tab3/sendAward/pgSendInstantAward",
                    build: buildExtender({ pageName: "pgSendInstantAward", singleton: false, pageProps: { data: pagesData.pgSendInstantAward } })
                }),
                Route.of({
                    path: "/btb/tab3/sendAward/pgAwardDetails",
                    build: buildExtender({ pageName: "pgAwardDetails", singleton: false, pageProps: { data: pagesData.pgAwardDetails } })
                }),
                Route.of({
                    path: "/btb/tab3/sendAward/pgSendInstantAwardForm",
                    build: buildExtender({ pageName: "pgSendInstantAwardForm", singleton: false, pageProps: { data: pagesData.pgSendInstantAwardForm } })
                }),
                Route.of({
                    path: "/btb/tab3/myAwards/pgMyAwards",
                    build: buildExtender({ pageName: "pgMyAwards", singleton: false, pageProps: { data: pagesData.pgMyAwards } })
                }),
                Route.of({
                    path: "/btb/tab3/myAwards/pgMyAwardDetail",
                    build: buildExtender({ pageName: "pgMyAwardDetail", singleton: false, pageProps: { data: pagesData.pgMyAwardDetail } })
                }),
                Route.of({
                    path: "/btb/tab3/myAwards/pgMySentAwards",
                    build: buildExtender({ pageName: "pgMySentAwards", singleton: false, pageProps: { data: pagesData.pgMySentAwards } })
                })
            ]
        }),
        // tab4
        StackRouter.of({
            path: "/btb/tab4",
            to: "/btb/tab4/page4",
            routes: [
                Route.of({
                    path: "/btb/tab4/page4",
                    build: buildExtender({ pageName: "page4", singleton: true, pageProps: {} })
                }),
            ]
        }),
        // tab5
        StackRouter.of({
            path: "/btb/tab5",
            to: "/btb/tab5/page5",
            routes: [
                Route.of({
                    path: "/btb/tab5/page5",
                    build: buildExtender({ pageName: "page5", singleton: true, pageProps: {} })
                }),
            ]
        })
    ]
});

const router = Router.of({
    path: "/",
    to: "/login",
    isRoot: true,
    headerBarParams: () => { ios: { translucent: false } },
    routes: [
        Route.of({
            path: "/login",
            build: buildExtender({ pageName: "pgLogin", singleton: true, pageProps: { shouldExit: true } })
        }),
        bottomTabBarRouter
    ]
});

module.exports = router;
