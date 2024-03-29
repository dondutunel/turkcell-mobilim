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
				icon: "awardcup_icon.png",
				text: "ANLIK ODUL",
				routePath: "/btb/tab3/sendAward/pgInstantAward"
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
	},
	"pgInstantAward": {
		"items": [{
				title: "Anlık Ödül Gönder",
				count: "175",
				routePath: "/btb/tab3/sendAward/pgSendInstantAward"
			},
			{
				title: "Anlık Ödüllerim",
				count: "61",
				routePath: "/btb/tab3/myAwards/pgMyAwards"
			},
			{
				title: "Gönderdiğim Anlık Ödüller",
				count: "93",
				routePath: "/btb/tab3/myAwards/pgMySentAwards"
			}
		]
	}
};
