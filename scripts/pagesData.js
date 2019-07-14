module.exports = {
    "pgIslemlerim": {
        title: "Islemlerim",
        mainItems: [{
                icon: "masrafim_icon.png",
                text: "MASRAFIM"
            },
            {
                icon: "toplanti_icon.png",
                text: "TOPLANTI\nODASI"
            },
            {
                icon: "masrafim_icon.png",
                text: "EGITIMLERIM"
            }
        ],
        switchButtons: [{
                text: "Talep Islemlerim",
                isActive: true
            },
            {
                text: "Is Guvenligi",
                isActive: false
            }
        ],
        subMenuItems: {
            "0": [{
                    icon: "seyahat_icon.png",
                    text: "Seyahat\nTalebi",
                    routePath: "/btb/tab2/pgSeyahatTalebi"
                },
                {
                    icon: "ofis_icon.png",
                    text: "Ofis\nDisindayim"
                },
                {
                    icon: "mobil_icon.png",
                    text: "Mobil\nCalisimci"
                },
                {
                    icon: "vekalet_icon.png",
                    text: "Vekalet"
                },
                {
                    icon: "izin_icon.png",
                    text: "Izin"
                },
                {
                    icon: "cym_icon.png",
                    text: "CYM"
                }
            ],
            "1": [{
                    icon: "mobil_icon.png",
                    text: "Mobil\nCalisimci"
                },
                {
                    icon: "vekalet_icon.png",
                    text: "Vekalet"
                },
                {
                    icon: "izin_icon.png",
                    text: "Izin"
                },
                {
                    icon: "cym_icon.png",
                    text: "CYM"
                }
            ]
        }
    },
    "pgHr": {
        title: "Insan Kaynaklari",
        mainItems: [{
                icon: "award_icon.png",
                text: "ANLIK ODUL",
                routePath: "/btb/tab3/pgInstantAward"
            },
            {
                icon: "flex_icon.png",
                text: "FLEX\nSOURCING"
            },
            {
                icon: "reflex_icon.png",
                text: "REFLEX"
            }
        ],
        subMenuItems: {
            "0": [{
                    icon: "flexperf_icon.png",
                    text: "Flex\nPerformans"
                },
                {
                    icon: "review_icon.png",
                    text: "360\nDegerlendirme"
                },
                {
                    icon: "taleb_icon.png",
                    text: "Is Degerleme\nTalebi"
                },
                {
                    icon: "price_icon.png",
                    text: "Toplam Ucret\nDashboard"
                },
                {
                    icon: "yupc_icon.png",
                    text: "YUPC"
                }
            ]
        }
    }
};
