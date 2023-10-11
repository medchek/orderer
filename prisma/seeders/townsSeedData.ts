// replace regex ("\d+":\s)(\{\n\s+[0-9a-zÀ-ÿ\u0600-\u06FF_"':\s\n,\d-]+\})

export interface TownSeed {
  [wilayaCode: string]: {
    name: string;
    arName: string;
    code: number;
  }[];
}

/**
 * List of the towns by wilaya code
 */
const townsData: TownSeed = {
  "1": [
    {
      name: "Adrar",
      arName: "أدرار",
      code: 1001,
    },
    {
      name: "Tamest",
      arName: "تامست",
      code: 1002,
    },
    {
      name: "Charouine",
      arName: "شروين",
      code: 1003,
    },
    {
      name: "Reggane",
      arName: "رقان",
      code: 1004,
    },
    {
      name: "In Zghmir",
      arName: "ان زقمير",
      code: 1005,
    },
    {
      name: "Tit",
      arName: "تيط",
      code: 1006,
    },
    {
      name: "Ksar Kaddour",
      arName: "قصر قدور",
      code: 1007,
    },
    {
      name: "Tsabit",
      arName: "تسابيت",
      code: 1008,
    },
    {
      name: "Timimoun",
      arName: "تيميمون",
      code: 1009,
    },
    {
      name: "Ouled Saïd",
      arName: "أوالد السعيد",
      code: 1010,
    },
    {
      name: "Zaouiet Kounta",
      arName: "زاوية كنتة",
      code: 1011,
    },
    {
      name: "Aoulef",
      arName: "أولف",
      code: 1012,
    },
    {
      name: "Tamekten",
      arName: "تمقطن",
      code: 1013,
    },
    {
      name: "Tamantit",
      arName: "تمنطيط",
      code: 1014,
    },
    {
      name: "Fenoughil",
      arName: "فنوغيل",
      code: 1015,
    },
    {
      name: "Tinerkouk",
      arName: "تينركوك",
      code: 1016,
    },
    {
      name: "Deldoul",
      arName: "دلدول",
      code: 1017,
    },
    {
      name: "Sali",
      arName: "سالى",
      code: 1018,
    },
    {
      name: "Akabli",
      arName: "أقبلى",
      code: 1019,
    },
    {
      name: "Metarfa",
      arName: "الطارفة",
      code: 1020,
    },
    {
      name: "Ouled Ahmed Tammi",
      arName: "أوالد أحمد تيمى",
      code: 1021,
    },
    {
      name: "Bouda",
      arName: "بودة",
      code: 1022,
    },
    {
      name: "Aougrout",
      arName: "أوقروت",
      code: 1023,
    },
    {
      name: "Talmine",
      arName: "طلمين",
      code: 1024,
    },
    {
      name: "Sebaa",
      arName: "السبع",
      code: 1025,
    },
    {
      name: "Ouled Aïssa",
      arName: "أوالد عيسى",
      code: 1026,
    },
    {
      name: "Timiaouine",
      arName: "تيمياوين",
      code: 1027,
    },
  ],
  "2": [
    {
      name: "Chlef",
      arName: "الشلف",
      code: 2001,
    },
    {
      name: "Ténès",
      arName: "تنس",
      code: 2002,
    },
    {
      name: "Bénairia",
      arName: "بنايرية",
      code: 2003,
    },
    {
      name: "El Karimia",
      arName: "الكريمية",
      code: 2004,
    },
    {
      name: "Tadjena",
      arName: "تأجنة",
      code: 2005,
    },
    {
      name: "Taougrite",
      arName: "تاوقريت",
      code: 2006,
    },
    {
      name: "Beni Haoua",
      arName: "بنى حواء",
      code: 2007,
    },
    {
      name: "Sobha",
      arName: "صبحة",
      code: 2008,
    },
    {
      name: "Harchoun",
      arName: "حرشون",
      code: 2009,
    },
    {
      name: "Ouled Fares",
      arName: "أولاد فارس",
      code: 2010,
    },
    {
      name: "Sidi Akkacha",
      arName: "سيدى عكاشة",
      code: 2011,
    },
    {
      name: "Boukadir",
      arName: "بوقادير",
      code: 2012,
    },
    {
      name: "Beni Rached",
      arName: "بنى راشد",
      code: 2013,
    },
    {
      name: "Talassa",
      arName: "تلعصة",
      code: 2014,
    },
    {
      name: "Harenfa",
      arName: "الھرنفة",
      code: 2015,
    },
    {
      name: "Oued Goussine",
      arName: "وادى قوسين",
      code: 2016,
    },
    {
      name: "Dahra",
      arName: "الظھرة",
      code: 2017,
    },
    {
      name: "Ouled Abbes",
      arName: "أولاد عباس",
      code: 2018,
    },
    {
      name: "Sendjas",
      arName: "السنجاس",
      code: 2019,
    },
    {
      name: "Zeboudja",
      arName: "الزبوجة",
      code: 2020,
    },
    {
      name: "Oued Sly",
      arName: "وادى سلى",
      code: 2021,
    },
    {
      name: "Abou El Hassan",
      arName: "أبو الحسن",
      code: 2022,
    },
    {
      name: "El Marsa",
      arName: "المرسى",
      code: 2023,
    },
    {
      name: "Chettia",
      arName: "الشطية",
      code: 2024,
    },
    {
      name: "Sidi Abderrahmane",
      arName: "سيدي عبد الرحمان",
      code: 2025,
    },
    {
      name: "Moussadek",
      arName: "مصدق",
      code: 2026,
    },
    {
      name: "El Hadjadj",
      arName: "الحجاج",
      code: 2027,
    },
    {
      name: "Labiod Medjadja",
      arName: "الابيض مجاجة",
      code: 2028,
    },
    {
      name: "Oued Fodda",
      arName: "وادى الفضة",
      code: 2029,
    },
    {
      name: "Ouled Ben Abdelkader",
      arName: "أولاد بن عبد القادر",
      code: 2030,
    },
    {
      name: "Bouzeghaia",
      arName: "بوزغاية",
      code: 2031,
    },
    {
      name: "Aïn Merane",
      arName: "عين مران",
      code: 2032,
    },
    {
      name: "Oum Drou",
      arName: "أم الذروع",
      code: 2033,
    },
    {
      name: "Breira",
      arName: "بريرة",
      code: 2034,
    },
    {
      name: "Beni Bouateb",
      arName: "بنى بوعتاب",
      code: 2035,
    },
  ],
  "3": [
    {
      name: "Laghouat",
      arName: "الأغواط",
      code: 3001,
    },
    {
      name: "Ksar El Hirane",
      arName: "قصر الحيران",
      code: 3002,
    },
    {
      name: "Bennasser Benchohra",
      arName: "بن ناصر بن شهرة",
      code: 3003,
    },
    {
      name: "Sidi Makhlouf",
      arName: "سيدي مخلوف",
      code: 3004,
    },
    {
      name: "Hassi Delaa",
      arName: "حاسي دلاعة",
      code: 3005,
    },
    {
      name: "Hassi R'mel",
      arName: "حاسي الرمل",
      code: 3006,
    },
    {
      name: "Aïn Madhi",
      arName: "عين ماضي",
      code: 3007,
    },
    {
      name: "Tadjemout",
      arName: "تاجموت",
      code: 3008,
    },
    {
      name: "Kheneg",
      arName: "الخنق",
      code: 3009,
    },
    {
      name: "Gueltat Sidi Saad",
      arName: "قلتة سيدي سعد",
      code: 3010,
    },
    {
      name: "Aïn Sidi Ali",
      arName: "عين سيدي علي",
      code: 3011,
    },
    {
      name: "Beidha",
      arName: "البيضاء",
      code: 3012,
    },
    {
      name: "Brida",
      arName: "بريدة",
      code: 3013,
    },
    {
      name: "El Ghicha",
      arName: "الغيشة",
      code: 3014,
    },
    {
      name: "Hadj Mechri",
      arName: "الحاج المشري",
      code: 3015,
    },
    {
      name: "Sebgag",
      arName: "سبقاق",
      code: 3016,
    },
    {
      name: "Taouiala",
      arName: "تاويالة",
      code: 3017,
    },
    {
      name: "Tadjrouna",
      arName: "تاجرونة",
      code: 3018,
    },
    {
      name: "Aflou",
      arName: "آفلو",
      code: 3019,
    },
    {
      name: "El Assafia",
      arName: "العسافية",
      code: 3020,
    },
    {
      name: "Oued Morra",
      arName: "وادي مرة",
      code: 3021,
    },
    {
      name: "Oued M'zi",
      arName: "وادي مزي",
      code: 3022,
    },
    {
      name: "El Houaita",
      arName: "الحوايطة",
      code: 3023,
    },
    {
      name: "Sidi Bouzid",
      arName: "سيدي بوزيد",
      code: 3024,
    },
  ],
  "4": [
    {
      name: "Oum El Bouaghi",
      arName: "أم البواقي",
      code: 4001,
    },
    {
      name: "Aïn Beïda",
      arName: "عين البيضاء",
      code: 4002,
    },
    {
      name: "Aïn M'lila",
      arName: "عين مليلة",
      code: 4003,
    },
    {
      name: "Behir Chergui",
      arName: "بحير شرقي",
      code: 4004,
    },
    {
      name: "El Amiria",
      arName: "العامرية",
      code: 4005,
    },
    {
      name: "Sigus",
      arName: "سيقوس",
      code: 4006,
    },
    {
      name: "El Belala",
      arName: "البلالة",
      code: 4007,
    },
    {
      name: "Aïn Babouche",
      arName: "عين بابوش",
      code: 4008,
    },
    {
      name: "Berriche",
      arName: "بريش",
      code: 4009,
    },
    {
      name: "Ouled Hamla",
      arName: "أولاد حملة",
      code: 4010,
    },
    {
      name: "Dhalaa",
      arName: "الضلعة",
      code: 4011,
    },
    {
      name: "Aïn Kercha",
      arName: "عين كرشة",
      code: 4012,
    },
    {
      name: "Hanchir Toumghani",
      arName: "هنشير تومغني",
      code: 4013,
    },
    {
      name: "El Djazia",
      arName: "الجازية",
      code: 4014,
    },
    {
      name: "Aïn Diss",
      arName: "عين الديس",
      code: 4015,
    },
    {
      name: "Fkirina",
      arName: "فكرينة",
      code: 4016,
    },
    {
      name: "Souk Naamane",
      arName: "سوق نعمان",
      code: 4017,
    },
    {
      name: "Zorg",
      arName: "الزرق",
      code: 4018,
    },
    {
      name: "El Fedjoudj Boughrara Saoudi",
      arName: "الفجوج بوغرارة سعودي",
      code: 4019,
    },
    {
      name: "Ouled Zouaï",
      arName: "أولاد زواي",
      code: 4020,
    },
    {
      name: "Bir Chouhada",
      arName: "بئر الشهداء",
      code: 4021,
    },
    {
      name: "Ksar Sbahi",
      arName: "قصر صباحي",
      code: 4022,
    },
    {
      name: "Oued Nini",
      arName: "وادي نيني",
      code: 4023,
    },
    {
      name: "Meskiana",
      arName: "مسكيانة",
      code: 4024,
    },
    {
      name: "Aïn Fakroun",
      arName: "عين فكرون",
      code: 4025,
    },
    {
      name: "Rahia",
      arName: "الراحية",
      code: 4026,
    },
    {
      name: "Aïn Zitoun",
      arName: "عين الزيتون",
      code: 4027,
    },
    {
      name: "Ouled Gacem",
      arName: "أولاد قاسم",
      code: 4028,
    },
    {
      name: "El Harmilia",
      arName: "الحرميلية",
      code: 4029,
    },
  ],
  "5": [
    {
      name: "Aïn Djasser",
      arName: "عين جاسر",
      code: 5001,
    },
    {
      name: "Aïn Touta",
      arName: "عين التوتة",
      code: 5002,
    },
    {
      name: "Aïn Yagout",
      arName: "عين ياقوت",
      code: 5003,
    },
    {
      name: "Amantan",
      arName: "أمنطان",
      code: 5004,
    },
    {
      name: "Amdoukal",
      arName: "أمدوكال",
      code: 5005,
    },
    {
      name: "Arris",
      arName: "آريس",
      code: 5006,
    },
    {
      name: "Ngaous",
      arName: "نقاوس",
      code: 5007,
    },
    {
      name: "Batna",
      arName: "باتنة",
      code: 5008,
    },
    {
      name: "Ben Foudhala El Hakania",
      arName: "بني فضالة الحقانية",
      code: 5009,
    },
    {
      name: "Bitam",
      arName: "بيطام",
      code: 5010,
    },
    {
      name: "Boulhilat",
      arName: "بولهيلات",
      code: 5011,
    },
    {
      name: "Boumagueur",
      arName: "بومقر",
      code: 5012,
    },
    {
      name: "Boumia",
      arName: "بومية",
      code: 5013,
    },
    {
      name: "Bouzina",
      arName: "بوزينة",
      code: 5014,
    },
    {
      name: "Djerma",
      arName: "جرمة ",
      code: 5015,
    },
    {
      name: "Djezzar",
      arName: "الجزار",
      code: 5016,
    },
    {
      name: "El Hassi",
      arName: "الحاسي",
      code: 5017,
    },
    {
      name: "El Madher",
      arName: "المعذر",
      code: 5018,
    },
    {
      name: "Fesdis",
      arName: "فسديس",
      code: 5019,
    },
    {
      name: "Foum Toub",
      arName: "فم الطوب",
      code: 5020,
    },
    {
      name: "Ghassira",
      arName: "غسيرة",
      code: 5021,
    },
    {
      name: "Chemora",
      arName: "الشمرة",
      code: 5022,
    },
    {
      name: "Gosbat",
      arName: "القصبات",
      code: 5023,
    },
    {
      name: "Guigba",
      arName: "القيقبة",
      code: 5024,
    },
    {
      name: "Hidoussa",
      arName: "حيدوسة",
      code: 5025,
    },
    {
      name: "Ichmoul",
      arName: "إشمول",
      code: 5026,
    },
    {
      name: "Inoughissen",
      arName: "إينوغيسن",
      code: 5027,
    },
    {
      name: "Kimmel",
      arName: "كيمل",
      code: 5028,
    },
    {
      name: "Ksar Bellezma",
      arName: "قصر بلزمة",
      code: 5029,
    },
    {
      name: "Larbaâ",
      arName: "لارباع",
      code: 5030,
    },
    {
      name: "Lazrou",
      arName: "لازرو",
      code: 5031,
    },
    {
      name: "Lemsane",
      arName: "لمسان",
      code: 5032,
    },
    {
      name: "Mâafa",
      arName: "معافة",
      code: 5033,
    },
    {
      name: "Menâa",
      arName: "منعة",
      code: 5034,
    },
    {
      name: "Merouana",
      arName: "مروانة",
      code: 5035,
    },
    {
      name: "Metkaouak",
      arName: "متكعوك",
      code: 5036,
    },
    {
      name: "N'gaous",
      arName: "نقاوس",
      code: 5037,
    },
    {
      name: "Chir",
      arName: "شير",
      code: 5038,
    },
    {
      name: "Oued Chaâba",
      arName: "وادي الشعبة",
      code: 5039,
    },
    {
      name: "Oued El Ma",
      arName: "وادي الماء",
      code: 5040,
    },
    {
      name: "Oued Taga",
      arName: "وادي الطاقة",
      code: 5041,
    },
    {
      name: "Ouled Ammar",
      arName: "أولاد عمار",
      code: 5042,
    },
    {
      name: "Ouled Aouf",
      arName: "أولاد عوف",
      code: 5043,
    },
    {
      name: "Ouled Fadel",
      arName: "أولاد فاضل",
      code: 5044,
    },
    {
      name: "Ouled Sellam",
      arName: "أولاد سلام",
      code: 5045,
    },
    {
      name: "Ouled Si Slimane",
      arName: "أولاد سي سليمان",
      code: 5046,
    },
    {
      name: "Ouyoun El Assafir",
      arName: "عيون العصافير",
      code: 5047,
    },
    {
      name: "Rahbat",
      arName: "الرحبات",
      code: 5048,
    },
    {
      name: "Ras El Aioun",
      arName: "رأس العيون",
      code: 5049,
    },
    {
      name: "Sefiane",
      arName: "سفيان",
      code: 5050,
    },
    {
      name: "Seggana",
      arName: "سقانة",
      code: 5051,
    },
    {
      name: "Seriana",
      arName: "سريانة",
      code: 5052,
    },
    {
      name: "Talkhamt",
      arName: "تالخمت",
      code: 5053,
    },
    {
      name: "Taxlent",
      arName: "تاكسلانت",
      code: 5054,
    },
    {
      name: "Tazoult",
      arName: "تازولت",
      code: 5055,
    },
    {
      name: "Teniet El Abed",
      arName: "ثنية العابد",
      code: 5056,
    },
    {
      name: "Tighanimine",
      arName: "تيغانمين",
      code: 5057,
    },
    {
      name: "Tigherghar",
      arName: "تيغرغار",
      code: 5058,
    },
    {
      name: "Tilatou",
      arName: "تيلاطو",
      code: 5059,
    },
    {
      name: "Timgad",
      arName: "تيمقاد",
      code: 5060,
    },
    {
      name: "Tkout",
      arName: "تكوت",
      code: 5061,
    },
    {
      name: "Zana El Beida",
      arName: "زانة البيضاء",
      code: 5062,
    },
  ],
  "6": [
    {
      name: "Béjaïa",
      arName: "بجاية",
      code: 6001,
    },
    {
      name: "Amizour",
      arName: "أميزور",
      code: 6002,
    },
    {
      name: "Ferraoun",
      arName: "فرعون",
      code: 6003,
    },
    {
      name: "Taourirt Ighil",
      arName: "تاوريرت آغيل",
      code: 6004,
    },
    {
      name: "Chellata",
      arName: "شلاطة",
      code: 6005,
    },
    {
      name: "Tamokra",
      arName: "تمقرة",
      code: 6006,
    },
    {
      name: "Timezrit",
      arName: "تيمزريت",
      code: 6007,
    },
    {
      name: "Souk El Ténine",
      arName: "سوق الاثنين",
      code: 6008,
    },
    {
      name: "M'cisna",
      arName: "مسيسنة",
      code: 6009,
    },
    {
      name: "Tinabdher",
      arName: "تينبذار",
      code: 6010,
    },
    {
      name: "Tichy",
      arName: "تيشي",
      code: 6011,
    },
    {
      name: "Semaoun",
      arName: "سمعون",
      code: 6012,
    },
    {
      name: "Kendira",
      arName: "كنديرة",
      code: 6013,
    },
    {
      name: "Tifra",
      arName: "تيفرة",
      code: 6014,
    },
    {
      name: "Ighram",
      arName: "آغرام",
      code: 6015,
    },
    {
      name: "Amalou",
      arName: "أمالو",
      code: 6016,
    },
    {
      name: "Ighil Ali",
      arName: "إغيل علي",
      code: 6017,
    },
    {
      name: "Fenaïa Ilmaten",
      arName: "فناية الماثن",
      code: 6018,
    },
    {
      name: "Toudja",
      arName: "توجة",
      code: 6019,
    },
    {
      name: "Darguina",
      arName: "درقينة",
      code: 6020,
    },
    {
      name: "Sidi Ayad",
      arName: "سيدي عياد",
      code: 6021,
    },
    {
      name: "Aokas",
      arName: "أوقاس",
      code: 6022,
    },
    {
      name: "Beni Djellil",
      arName: "بني جليل",
      code: 6023,
    },
    {
      name: "Adekar",
      arName: "آدكار",
      code: 6024,
    },
    {
      name: "Akbou",
      arName: "أقبو",
      code: 6025,
    },
    {
      name: "Seddouk",
      arName: "صدوق",
      code: 6026,
    },
    {
      name: "Tazmalt",
      arName: "تازمالت",
      code: 6027,
    },
    {
      name: "Aït R'zine",
      arName: "آيت أرزين",
      code: 6028,
    },
    {
      name: "Chemini",
      arName: "شميني",
      code: 6029,
    },
    {
      name: "Souk Oufella",
      arName: "سوق أوفلة",
      code: 6030,
    },
    {
      name: "Taskriout",
      arName: "تاسكريوت",
      code: 6031,
    },
    {
      name: "Tibane",
      arName: "طيبان",
      code: 6032,
    },
    {
      name: "Tala Hamza",
      arName: "تالة حمزة",
      code: 6033,
    },
    {
      name: "Barbacha",
      arName: "برباشة",
      code: 6034,
    },
    {
      name: "Beni Ksila",
      arName: "بني كسيلة",
      code: 6035,
    },
    {
      name: "Ouzellaguen",
      arName: "أوزلاقن",
      code: 6036,
    },
    {
      name: "Bouhamza",
      arName: "بوحمزة",
      code: 6037,
    },
    {
      name: "Beni Mellikeche",
      arName: "بني مليكش",
      code: 6038,
    },
    {
      name: "Sidi Aïch",
      arName: "سيدي عيش",
      code: 6039,
    },
    {
      name: "El Kseur",
      arName: "القصر",
      code: 6040,
    },
    {
      name: "Melbou",
      arName: "ملبو",
      code: 6041,
    },
    {
      name: "Akfadou",
      arName: "أكفادو",
      code: 6042,
    },
    {
      name: "Leflaye",
      arName: "لفلاي",
      code: 6043,
    },
    {
      name: "Kherrata",
      arName: "خراطة",
      code: 6044,
    },
    {
      name: "Draâ El-kaïd",
      arName: "ذراع القايد",
      code: 6045,
    },
    {
      name: "Tamridjet",
      arName: "تامريجت",
      code: 6046,
    },
    {
      name: "Aït Smail",
      arName: "آيت سماعيل",
      code: 6047,
    },
    {
      name: "Boukhelifa",
      arName: "بوخليفة",
      code: 6048,
    },
    {
      name: "Tizi N'berber",
      arName: "تيزي أنبربار",
      code: 6049,
    },
    {
      name: "Beni Maouche",
      arName: "بني معوش",
      code: 6050,
    },
    {
      name: "Oued Ghir",
      arName: "وادي غير",
      code: 6051,
    },
    {
      name: "Boudjellil",
      arName: "بوجليل",
      code: 6052,
    },
  ],
  "7": [
    {
      name: "Aïn Naga",
      arName: "عين الناقة",
      code: 7001,
    },
    {
      name: "Aïn Zaatout",
      arName: "عين زعطوط",
      code: 7002,
    },
    {
      name: "Biskra",
      arName: "بسكرة",
      code: 7003,
    },
    {
      name: "Bordj Ben Azzouz",
      arName: "برج بن عزوز",
      code: 7004,
    },
    {
      name: "Bouchagroune",
      arName: "بوشقرون",
      code: 7005,
    },
    {
      name: "Branis",
      arName: "البرانيس",
      code: 7006,
    },
    {
      name: "Chetma",
      arName: "شتمة",
      code: 7007,
    },
    {
      name: "Djemorah",
      arName: "جمورة",
      code: 7008,
    },
    {
      name: "El Feidh",
      arName: "الفيض",
      code: 7009,
    },
    {
      name: "El Ghrous",
      arName: "الغروس",
      code: 7010,
    },
    {
      name: "El Hadjeb",
      arName: "الحاجب",
      code: 7011,
    },
    {
      name: "El Haouch",
      arName: "الحوش",
      code: 7012,
    },
    {
      name: "El Kantara",
      arName: "القنطرة",
      code: 7013,
    },
    {
      name: "El Mizaraa",
      arName: "المزيرعة",
      code: 7014,
    },
    {
      name: "El Outaya",
      arName: "لوطاية",
      code: 7015,
    },
    {
      name: "Foughala",
      arName: "فوغالة",
      code: 7016,
    },
    {
      name: "Khenguet Sidi Nadji",
      arName: "خنقة سيدي ناجي",
      code: 7017,
    },
    {
      name: "Lichana",
      arName: "ليشانة",
      code: 7018,
    },
    {
      name: "Lioua",
      arName: "ليوة",
      code: 7019,
    },
    {
      name: "M'chouneche",
      arName: "مشونش",
      code: 7020,
    },
    {
      name: "Mekhadma",
      arName: "مخادمة",
      code: 7021,
    },
    {
      name: "M'lili",
      arName: "مليلي",
      code: 7022,
    },
    {
      name: "Oumache",
      arName: "أوماش",
      code: 7023,
    },
    {
      name: "Ourlal",
      arName: "أورلال",
      code: 7024,
    },
    {
      name: "Sidi Okba",
      arName: "سيدي عقبة",
      code: 7025,
    },
    {
      name: "Tolga",
      arName: "طولقة",
      code: 7026,
    },
    {
      name: "Zeribet El Oued",
      arName: "زريبة الوادي",
      code: 7027,
    },
  ],
  "8": [
    {
      name: "Béchar",
      arName: "بشار",
      code: 8001,
    },
    {
      name: "Erg Ferradj",
      arName: "عرق فراج",
      code: 8002,
    },
    {
      name: "Ouled Khoudir",
      arName: "أولاد خضير",
      code: 8003,
    },
    {
      name: "Meridja",
      arName: "مريجة",
      code: 8004,
    },
    {
      name: "Timoudi",
      arName: "تيمودي",
      code: 8005,
    },
    {
      name: "Lahmar",
      arName: "لحمر",
      code: 8006,
    },
    {
      name: "Beni Ikhlef",
      arName: "بني يخلف",
      code: 8007,
    },
    {
      name: "Mechraa Houari Boumedienne",
      arName: "مشرع هواري بومدين",
      code: 8008,
    },
    {
      name: "Kenadsa",
      arName: "القنادسة",
      code: 8009,
    },
    {
      name: "Igli",
      arName: "إقلي",
      code: 8010,
    },
    {
      name: "Tabelbala",
      arName: "تبلبالة",
      code: 8011,
    },
    {
      name: "Taghit",
      arName: "تاغيت",
      code: 8012,
    },
    {
      name: "El Ouata",
      arName: "الواتة",
      code: 8013,
    },
    {
      name: "Boukais",
      arName: "بوكايس",
      code: 8014,
    },
    {
      name: "Mougheul",
      arName: "موغل",
      code: 8015,
    },
    {
      name: "Abadla",
      arName: "العبادلة",
      code: 8016,
    },
    {
      name: "Kerzaz",
      arName: "كرزاز",
      code: 8017,
    },
    {
      name: "Ksabi",
      arName: "القصابي",
      code: 8018,
    },
    {
      name: "Tamtert",
      arName: "تامترت",
      code: 8019,
    },
    {
      name: "Beni Ounif",
      arName: "بني ونيف",
      code: 8020,
    },
  ],
  "9": [
    {
      name: "Blida",
      arName: "البليدة",
      code: 9001,
    },
    {
      name: "Chebli",
      arName: "الشبلي",
      code: 9002,
    },
    {
      name: "Bouinan",
      arName: "بوينان",
      code: 9003,
    },
    {
      name: "Oued El Alleug",
      arName: "وادي العلايق",
      code: 9004,
    },
    {
      name: "Ouled Yaïch",
      arName: "أولاد يعيش",
      code: 9005,
    },
    {
      name: "Chréa",
      arName: "الشريعة",
      code: 9006,
    },
    {
      name: "El Affroun",
      arName: "العفرون",
      code: 9007,
    },
    {
      name: "Chiffa",
      arName: "الشفة",
      code: 9008,
    },
    {
      name: "Hammam Melouane",
      arName: "حمام ملوان",
      code: 9009,
    },
    {
      name: "Ben Khelil",
      arName: "بن خليل",
      code: 9010,
    },
    {
      name: "Soumaa",
      arName: "الصومعة",
      code: 9011,
    },
    {
      name: "Mouzaia",
      arName: "موزاية",
      code: 9012,
    },
    {
      name: "Souhane",
      arName: "صوحان",
      code: 9013,
    },
    {
      name: "Meftah",
      arName: "مفتاح",
      code: 9014,
    },
    {
      name: "Ouled Slama",
      arName: "أولاد السلامة",
      code: 9015,
    },
    {
      name: "Boufarik",
      arName: "بوفاريك",
      code: 9016,
    },
    {
      name: "Larbaa",
      arName: "الأربعاء",
      code: 9017,
    },
    {
      name: "Oued Djer",
      arName: "واد جر",
      code: 9018,
    },
    {
      name: "Beni Tamou",
      arName: "بني تامو",
      code: 9019,
    },
    {
      name: "Bouarfa",
      arName: "بوعرفة",
      code: 9020,
    },
    {
      name: "Beni Mered",
      arName: "بني مراد",
      code: 9021,
    },
    {
      name: "Bougara",
      arName: "بوقرة",
      code: 9022,
    },
    {
      name: "Guerouaou",
      arName: "قرواو",
      code: 9023,
    },
    {
      name: "Aïn Romana",
      arName: "عين الرمانة",
      code: 9024,
    },
    {
      name: "Djebabra",
      arName: "الجبابرة",
      code: 9025,
    },
  ],
  "10": [
    {
      name: "Aïn Bessem",
      arName: "عين بسام",
      code: 10001,
    },
    {
      name: "Hanif",
      arName: "الحانيف",
      code: 10002,
    },
    {
      name: "Aghbalou",
      arName: "أغبالو",
      code: 10003,
    },
    {
      name: "Aïn El Hadjar",
      arName: "عين الحجر",
      code: 10004,
    },
    {
      name: "Ahl El Ksar",
      arName: "أهل القصر",
      code: 10005,
    },
    {
      name: "Aïn Laloui",
      arName: "عين العلوي",
      code: 10006,
    },
    {
      name: "Ath Mansour",
      arName: "آث منصور",
      code: 10007,
    },
    {
      name: "Aomar",
      arName: "عومار",
      code: 10008,
    },
    {
      name: "Aïn El Turc",
      arName: "عين الترك",
      code: 10009,
    },
    {
      name: "Aït Laziz",
      arName: "آيت لعزيز",
      code: 10010,
    },
    {
      name: "Bouderbala",
      arName: "بودربالة",
      code: 10011,
    },
    {
      name: "Bechloul",
      arName: "بشلول",
      code: 10012,
    },
    {
      name: "Bir Ghbalou",
      arName: "بئر غبالو",
      code: 10013,
    },
    {
      name: "Boukram",
      arName: "بوكرام",
      code: 10014,
    },
    {
      name: "Bordj Okhriss",
      arName: "برج أوخريص",
      code: 10015,
    },
    {
      name: "Bouira",
      arName: "البويرة",
      code: 10016,
    },
    {
      name: "Chorfa",
      arName: "الشرفة",
      code: 10017,
    },
    {
      name: "Dechmia",
      arName: "الدشمية",
      code: 10018,
    },
    {
      name: "Dirrah",
      arName: "ديرة",
      code: 10019,
    },
    {
      name: "Djebahia",
      arName: "الجباحية",
      code: 10020,
    },
    {
      name: "El Hakimia",
      arName: "الحاكمية",
      code: 10021,
    },
    {
      name: "El Hachimia",
      arName: "الهاشمية",
      code: 10022,
    },
    {
      name: "El Adjiba",
      arName: "العجيبة",
      code: 10023,
    },
    {
      name: "El Khabouzia",
      arName: "الخبوزية",
      code: 10024,
    },
    {
      name: "El Mokrani",
      arName: "المقراني",
      code: 10025,
    },
    {
      name: "El Asnam",
      arName: "الأصنام",
      code: 10026,
    },
    {
      name: "Guerrouma",
      arName: "قرومة",
      code: 10027,
    },
    {
      name: "Haizer",
      arName: "حيزر",
      code: 10028,
    },
    {
      name: "Hadjera Zerga",
      arName: "الحجرة الزرقاء",
      code: 10029,
    },
    {
      name: "Kadiria",
      arName: "قادرية",
      code: 10030,
    },
    {
      name: "Lakhdaria",
      arName: "الأخضرية",
      code: 10031,
    },
    {
      name: "M'chedallah",
      arName: "مشد الله",
      code: 10032,
    },
    {
      name: "Mezdour",
      arName: "مسدور",
      code: 10033,
    },
    {
      name: "Maala",
      arName: "معالة",
      code: 10034,
    },
    {
      name: "Maamora",
      arName: "المعمورة",
      code: 10035,
    },
    {
      name: "Oued El Berdi",
      arName: "وادي البردي",
      code: 10036,
    },
    {
      name: "Ouled Rached",
      arName: "أولاد راشد",
      code: 10037,
    },
    {
      name: "Raouraoua",
      arName: "الروراوة",
      code: 10038,
    },
    {
      name: "Ridane",
      arName: "ريدان",
      code: 10039,
    },
    {
      name: "Saharidj",
      arName: "الصھاريج",
      code: 10040,
    },
    {
      name: "Sour El Ghouzlane",
      arName: "سور الغزلان",
      code: 10041,
    },
    {
      name: "Souk El Khemis",
      arName: "سوق الخميس",
      code: 10042,
    },
    {
      name: "Taguedit",
      arName: "تاقديت",
      code: 10043,
    },
    {
      name: "Taghzout",
      arName: "تاغزوت",
      code: 10044,
    },
    {
      name: "Zbarbar",
      arName: "الزبربر",
      code: 10045,
    },
  ],
  "11": [
    {
      name: "Tamanrasset",
      arName: "تامنراست",
      code: 11001,
    },
    {
      name: "Abalessa",
      arName: "أبلسة",
      code: 11002,
    },
    {
      name: "Idles",
      arName: "إدلس",
      code: 11003,
    },
    {
      name: "Tazrouk",
      arName: "تاظروك",
      code: 11004,
    },
    {
      name: "In Amguel",
      arName: "عين امقل",
      code: 11005,
    },
  ],
  "12": [
    {
      name: "Tébessa",
      arName: "تبسة",
      code: 12001,
    },
    {
      name: "Bir El Ater",
      arName: "بئر العاتر",
      code: 12002,
    },
    {
      name: "Cheria",
      arName: "الشريعة",
      code: 12003,
    },
    {
      name: "Stah Guentis",
      arName: "سطح قنطيس",
      code: 12004,
    },
    {
      name: "El Aouinet",
      arName: "العوينات",
      code: 12005,
    },
    {
      name: "El Houidjbet",
      arName: "الحويجبات",
      code: 12006,
    },
    {
      name: "Safsaf El Ouesra",
      arName: "صفصاف الوسرة",
      code: 12007,
    },
    {
      name: "Hammamet",
      arName: "الحمامات",
      code: 12008,
    },
    {
      name: "Negrine",
      arName: "نقرين",
      code: 12009,
    },
    {
      name: "Bir Mokkadem",
      arName: "بئر مقدم",
      code: 12010,
    },
    {
      name: "El Kouif",
      arName: "الكويف",
      code: 12011,
    },
    {
      name: "Morsott",
      arName: "مرسط",
      code: 12012,
    },
    {
      name: "El Ogla",
      arName: "العقلة",
      code: 12013,
    },
    {
      name: "Bir Dheb",
      arName: "بئر الذهب",
      code: 12014,
    },
    {
      name: "El Ogla Melha",
      arName: "العقلة المالحة",
      code: 12015,
    },
    {
      name: "Guorriguer",
      arName: "قريقر",
      code: 12016,
    },
    {
      name: "Bekkaria",
      arName: "بكارية",
      code: 12017,
    },
    {
      name: "Boukhadra",
      arName: "بوخضرة",
      code: 12018,
    },
    {
      name: "Ouenza",
      arName: "الونزة",
      code: 12019,
    },
    {
      name: "El Ma Labiodh",
      arName: "الماء الأبيض",
      code: 12020,
    },
    {
      name: "Oum Ali",
      arName: "أم علي",
      code: 12021,
    },
    {
      name: "Tlidjene",
      arName: "ثليجان",
      code: 12022,
    },
    {
      name: "Aïn Zerga",
      arName: "عين الزرقاء",
      code: 12023,
    },
    {
      name: "El Meridj",
      arName: "المريج",
      code: 12024,
    },
    {
      name: "Boulhaf Dir",
      arName: "بولحاف الدير",
      code: 12025,
    },
    {
      name: "Bedjene",
      arName: "بجن",
      code: 12026,
    },
    {
      name: "El Mezeraa",
      arName: "المزرعة",
      code: 12027,
    },
    {
      name: "Ferkane",
      arName: "فركان",
      code: 12028,
    },
  ],
  "13": [
    {
      name: "Tlemcen",
      arName: "تلمسان",
      code: 13001,
    },
    {
      name: "Beni Mester",
      arName: "بني مستار",
      code: 13002,
    },
    {
      name: "Aïn Tallout",
      arName: "عين تالوت",
      code: 13003,
    },
    {
      name: "Remchi",
      arName: "الرمشي",
      code: 13004,
    },
    {
      name: "El Fehoul",
      arName: "الفحول",
      code: 13005,
    },
    {
      name: "Sabra",
      arName: "صبرة",
      code: 13006,
    },
    {
      name: "Ghazaouet",
      arName: "الغزوات",
      code: 13007,
    },
    {
      name: "Souani",
      arName: "السواني",
      code: 13008,
    },
    {
      name: "Djebala",
      arName: "جبالة",
      code: 13009,
    },
    {
      name: "El Gor",
      arName: "القور",
      code: 13010,
    },
    {
      name: "Oued Lakhdar",
      arName: "الواد الأخضر",
      code: 13011,
    },
    {
      name: "Aïn Fezza",
      arName: "عين فزة",
      code: 13012,
    },
    {
      name: "Ouled Mimoun",
      arName: "أولاد ميمون",
      code: 13013,
    },
    {
      name: "Amieur",
      arName: "عمير",
      code: 13014,
    },
    {
      name: "Aïn Youcef",
      arName: "عين يوسف",
      code: 13015,
    },
    {
      name: "Zenata",
      arName: "زناتة",
      code: 13016,
    },
    {
      name: "Beni Snous",
      arName: "بني سنوس",
      code: 13017,
    },
    {
      name: "Bab El Assa",
      arName: "باب العسة",
      code: 13018,
    },
    {
      name: "Dar Yaghmouracene",
      arName: "دار يغمراسن",
      code: 13019,
    },
    {
      name: "Fellaoucene",
      arName: "فلاوسن",
      code: 13020,
    },
    {
      name: "Azails",
      arName: "العزايل",
      code: 13021,
    },
    {
      name: "Sebaa Chioukh",
      arName: "السبعة شيوخ",
      code: 13022,
    },
    {
      name: "Terni Beni Hdiel",
      arName: "تيرني بني ھديل",
      code: 13023,
    },
    {
      name: "Bensekrane",
      arName: "بن سكران",
      code: 13024,
    },
    {
      name: "Aïn Nehala",
      arName: "عين نحالة",
      code: 13025,
    },
    {
      name: "Hennaya",
      arName: "الحناية",
      code: 13026,
    },
    {
      name: "Maghnia",
      arName: "مغنية",
      code: 13027,
    },
    {
      name: "Hammam Boughrara",
      arName: "حمام بوغرارة",
      code: 13028,
    },
    {
      name: "Souahlia",
      arName: "السواحلية",
      code: 13029,
    },
    {
      name: "Msirda Fouaga",
      arName: "مسيردة الفواقة",
      code: 13030,
    },
    {
      name: "Aïn Fetah",
      arName: "عين فتاح",
      code: 13031,
    },
    {
      name: "El Aricha",
      arName: "العريشة",
      code: 13032,
    },
    {
      name: "Souk Tlata",
      arName: "سوق الثلاثاء",
      code: 13033,
    },
    {
      name: "Sidi Abdelli",
      arName: "سيدي العبدلي",
      code: 13034,
    },
    {
      name: "Sebdou",
      arName: "سبدو",
      code: 13035,
    },
    {
      name: "Beni Ouarsous",
      arName: "بني ورسوس",
      code: 13036,
    },
    {
      name: "Sidi Medjahed",
      arName: "سيدي مجاهد",
      code: 13037,
    },
    {
      name: "Beni Boussaid",
      arName: "بني بوسعيد",
      code: 13038,
    },
    {
      name: "Marsa Ben M'hidi",
      arName: "مرسى بن مهيدي",
      code: 13039,
    },
    {
      name: "Nedroma",
      arName: "ندرومة",
      code: 13040,
    },
    {
      name: "Sidi Djillali",
      arName: "سيدي الجيلالي",
      code: 13041,
    },
    {
      name: "Beni Bahdel",
      arName: "بني بهدل",
      code: 13042,
    },
    {
      name: "El Bouihi",
      arName: "البويهي",
      code: 13043,
    },
    {
      name: "Honaïne",
      arName: "هنين",
      code: 13044,
    },
    {
      name: "Tienet",
      arName: "تيانت",
      code: 13045,
    },
    {
      name: "Ouled Riyah",
      arName: "أولاد رياح",
      code: 13046,
    },
    {
      name: "Bouhlou",
      arName: "بوحلو",
      code: 13047,
    },
    {
      name: "Beni Khellad",
      arName: "بني خلاد",
      code: 13048,
    },
    {
      name: "Aïn Ghoraba",
      arName: "عين غرابة",
      code: 13049,
    },
    {
      name: "Chetouane",
      arName: "شتوان",
      code: 13050,
    },
    {
      name: "Mansourah",
      arName: "المنصورة",
      code: 13051,
    },
    {
      name: "Beni Semiel",
      arName: "بني صميل",
      code: 13052,
    },
    {
      name: "Aïn Kebira",
      arName: "عين الكبيرة",
      code: 13053,
    },
  ],
  "14": [
    {
      name: "Aïn Bouchekif",
      arName: "عين بوشقيف",
      code: 14001,
    },
    {
      name: "Aïn Deheb",
      arName: "عين الذهب",
      code: 14002,
    },
    {
      name: "Aïn El Hadid",
      arName: "عين الحديد",
      code: 14003,
    },
    {
      name: "Aïn Kermes",
      arName: "عين كرمس",
      code: 14004,
    },
    {
      name: "Aïn Dzarit",
      arName: "عين دزاريت",
      code: 14005,
    },
    {
      name: "Bougara",
      arName: "بوقرة",
      code: 14006,
    },
    {
      name: "Chehaima",
      arName: "شحيمة",
      code: 14007,
    },
    {
      name: "Dahmouni",
      arName: "دحموني",
      code: 14008,
    },
    {
      name: "Djebilet Rosfa",
      arName: "جبيلة الرصفاء",
      code: 14009,
    },
    {
      name: "Djillali Ben Amar",
      arName: "جيلالي بن عمار",
      code: 14010,
    },
    {
      name: "Faidja",
      arName: "الفايجة",
      code: 14011,
    },
    {
      name: "Frenda",
      arName: "فرندة",
      code: 14012,
    },
    {
      name: "Guertoufa",
      arName: "قرطوفة",
      code: 14013,
    },
    {
      name: "Hamadia",
      arName: "حمادية",
      code: 14014,
    },
    {
      name: "Ksar Chellala",
      arName: "قصر الشلالة",
      code: 14015,
    },
    {
      name: "Madna",
      arName: "مادنة",
      code: 14016,
    },
    {
      name: "Mahdia",
      arName: "مهدية",
      code: 14017,
    },
    {
      name: "Mechraa Safa",
      arName: "مشرع الصفاء",
      code: 14018,
    },
    {
      name: "Medrissa",
      arName: "مدريسة",
      code: 14019,
    },
    {
      name: "Medroussa",
      arName: "مدروسة",
      code: 14020,
    },
    {
      name: "Meghila",
      arName: "مغيلة",
      code: 14021,
    },
    {
      name: "Mellakou",
      arName: "ملاكو",
      code: 14022,
    },
    {
      name: "Nadorah",
      arName: "الناظورة",
      code: 14023,
    },
    {
      name: "Naima",
      arName: "النعيمة",
      code: 14024,
    },
    {
      name: "Oued Lilli",
      arName: "وادي ليلي",
      code: 14025,
    },
    {
      name: "Rahouia",
      arName: "الرحوية",
      code: 14026,
    },
    {
      name: "Rechaïga",
      arName: "الرشايقة",
      code: 14027,
    },
    {
      name: "Sebaïne",
      arName: "سبعين",
      code: 14028,
    },
    {
      name: "Sebt",
      arName: "السبت",
      code: 14029,
    },
    {
      name: "Serghine",
      arName: "سرغين",
      code: 14030,
    },
    {
      name: "Si Abdelghani",
      arName: "سي عبد الغني",
      code: 14031,
    },
    {
      name: "Sidi Abderahmane",
      arName: "سيدي عبد الرحمان",
      code: 14032,
    },
    {
      name: "Sidi Ali Mellal",
      arName: "سيدي علي ملال",
      code: 14033,
    },
    {
      name: "Sidi Bakhti",
      arName: "سيدي بختي",
      code: 14034,
    },
    {
      name: "Sidi Hosni",
      arName: "سيدي حسني",
      code: 14035,
    },
    {
      name: "Sougueur",
      arName: "السوقر",
      code: 14036,
    },
    {
      name: "Tagdemt",
      arName: "تاقدمت",
      code: 14037,
    },
    {
      name: "Takhemaret",
      arName: "تاخمرت",
      code: 14038,
    },
    {
      name: "Tiaret",
      arName: "تيارت",
      code: 14039,
    },
    {
      name: "Tidda",
      arName: "تيدة",
      code: 14040,
    },
    {
      name: "Tousnina",
      arName: "توسنينة",
      code: 14041,
    },
    {
      name: "Zmalet El Emir Abdelkader",
      arName: "زمالة الأمير عبد القادر",
      code: 14042,
    },
  ],
  "15": [
    {
      name: "Tizi Ouzou",
      arName: "تيزي وزو",
      code: 15001,
    },
    {
      name: "Ain El Hammam",
      arName: "عين الحمام",
      code: 15002,
    },
    {
      name: "Akbil",
      arName: "أقبيل",
      code: 15003,
    },
    {
      name: "Freha",
      arName: "فريحة",
      code: 15004,
    },
    {
      name: "Souamaâ",
      arName: "الصوامع",
      code: 15005,
    },
    {
      name: "Mechtras",
      arName: "مشطراس",
      code: 15006,
    },
    {
      name: "Irdjen",
      arName: "إرجن",
      code: 15007,
    },
    {
      name: "Timizart",
      arName: "تيميزارت",
      code: 15008,
    },
    {
      name: "Makouda",
      arName: "ماكودة",
      code: 15009,
    },
    {
      name: "Draâ El Mizan",
      arName: "ذراع الميزان",
      code: 15010,
    },
    {
      name: "Tizi Gheniff",
      arName: "تيزي غنيف",
      code: 15011,
    },
    {
      name: "Bounouh",
      arName: "بونوح",
      code: 15012,
    },
    {
      name: "Aït Chafâa",
      arName: "أيت شفعة",
      code: 15013,
    },
    {
      name: "Frikat",
      arName: "فريقات",
      code: 15014,
    },
    {
      name: "Beni Aïssi",
      arName: "بني عيسي",
      code: 15015,
    },
    {
      name: "Beni Zmenzer",
      arName: "بني زمنزر",
      code: 15016,
    },
    {
      name: "Iferhounène",
      arName: "إيفرحونن",
      code: 15017,
    },
    {
      name: "Azazga",
      arName: "عزازقة",
      code: 15018,
    },
    {
      name: "Illoula Oumalou",
      arName: "إيلولة أمالو",
      code: 15019,
    },
    {
      name: "Yakouren",
      arName: "إعكوران",
      code: 15020,
    },
    {
      name: "Larbaâ Nath Irathen",
      arName: "الأربعاء نايث إيراثن",
      code: 15021,
    },
    {
      name: "Tizi Rached",
      arName: "تيزي راشد",
      code: 15022,
    },
    {
      name: "Zekri",
      arName: "زكري",
      code: 15023,
    },
    {
      name: "Ouaguenoun",
      arName: "واقنون",
      code: 15024,
    },
    {
      name: "Aïn Zaouia",
      arName: "عين الزاوية",
      code: 15025,
    },
    {
      name: "M'kira",
      arName: "مكيرة",
      code: 15026,
    },
    {
      name: "Aït Yahia",
      arName: "أيت يحي",
      code: 15027,
    },
    {
      name: "Aït Mahmoud",
      arName: "أيت محمود",
      code: 15028,
    },
    {
      name: "Mâatkas",
      arName: "المعاتقة",
      code: 15029,
    },
    {
      name: "Aït Boumahdi",
      arName: "أيت بومهدي",
      code: 15030,
    },
    {
      name: "Abi Youcef",
      arName: "أبي يوسف",
      code: 15031,
    },
    {
      name: "Beni Douala",
      arName: "بني دوالة",
      code: 15032,
    },
    {
      name: "Illilten",
      arName: "إليلتن",
      code: 15033,
    },
    {
      name: "Bouzeguène",
      arName: "بوزقن",
      code: 15034,
    },
    {
      name: "Aït Aggouacha",
      arName: "أيت قواشة",
      code: 15035,
    },
    {
      name: "Ouadhia",
      arName: "واضية",
      code: 15036,
    },
    {
      name: "Azeffoun",
      arName: "أزفون",
      code: 15037,
    },
    {
      name: "Tigzirt",
      arName: "تيقزيرت",
      code: 15038,
    },
    {
      name: "Aït Aïssa Mimoun",
      arName: "آيت عيسى ميمون",
      code: 15039,
    },
    {
      name: "Boghni",
      arName: "بوغني",
      code: 15040,
    },
    {
      name: "Ifigha",
      arName: "إيفيغاء",
      code: 15041,
    },
    {
      name: "Aït Oumalou",
      arName: "أيت أومالو",
      code: 15042,
    },
    {
      name: "Tirmitine",
      arName: "تيرمتين",
      code: 15043,
    },
    {
      name: "Akerrou",
      arName: "أقرو",
      code: 15044,
    },
    {
      name: "Yatafen",
      arName: "يطافن",
      code: 15045,
    },
    {
      name: "Beni Ziki",
      arName: "بني زيكي",
      code: 15046,
    },
    {
      name: "Draâ Ben Khedda",
      arName: "ذراع بن خدة",
      code: 15047,
    },
    {
      name: "Ouacifs ",
      arName: "واسيف",
      code: 15048,
    },
    {
      name: "Idjeur",
      arName: "إجر",
      code: 15049,
    },
    {
      name: "Mekla",
      arName: "مقلع",
      code: 15050,
    },
    {
      name: "Tizi N'thleta",
      arName: "تيزي نثلاثة",
      code: 15051,
    },
    {
      name: "Beni Yenni",
      arName: "بني يني",
      code: 15052,
    },
    {
      name: "Aghrib",
      arName: "أغريب",
      code: 15053,
    },
    {
      name: "Iflissen",
      arName: "إفليسن",
      code: 15054,
    },
    {
      name: "Boudjima",
      arName: "بوجيمة",
      code: 15055,
    },
    {
      name: "Aït Yahia Moussa",
      arName: "أيت يحي موسى",
      code: 15056,
    },
    {
      name: "Souk El Thenine",
      arName: "سوق الاثنين",
      code: 15057,
    },
    {
      name: "Aït Khellili",
      arName: "أيت خليلي",
      code: 15058,
    },
    {
      name: "Sidi Nâamane",
      arName: "سيدي نعمان",
      code: 15059,
    },
    {
      name: "Iboudraren",
      arName: "إبودرارن",
      code: 15060,
    },
    {
      name: "Agouni Gueghrane",
      arName: "أقني قغران",
      code: 15061,
    },
    {
      name: "Mizrana",
      arName: "مزرانة",
      code: 15062,
    },
    {
      name: "Imsouhel",
      arName: "أمسوحال",
      code: 15063,
    },
    {
      name: "Tadmaït",
      arName: "تادمايت",
      code: 15064,
    },
    {
      name: "Aït Bouaddou",
      arName: "أيت بوعدو",
      code: 15065,
    },
    {
      name: "Assi Youcef",
      arName: "أسي يوسف",
      code: 15066,
    },
    {
      name: "Aït Toudert",
      arName: "أيت تودرت",
      code: 15067,
    },
  ],
  "16": [
    {
      name: "Alger-centre",
      arName: "الجزائر الوسطى",
      code: 16001,
    },
    {
      name: "Sidi M'hamed",
      arName: "سيدي امحمد",
      code: 16002,
    },
    {
      name: "El Madania",
      arName: "المدنية",
      code: 16003,
    },
    {
      name: "Belouizdad",
      arName: "محمد بلوزداد",
      code: 16004,
    },
    {
      name: "Bab El Oued",
      arName: "باب الواد",
      code: 16005,
    },
    {
      name: "Bologhine",
      arName: "بولوغين",
      code: 16006,
    },
    {
      name: "Casbah",
      arName: "القصبة",
      code: 16007,
    },
    {
      name: "Oued Koriche",
      arName: "وادي قريش",
      code: 16008,
    },
    {
      name: "Bir Mourad Raïs",
      arName: "بير مراد رايس",
      code: 16009,
    },
    {
      name: "El Biar",
      arName: "الأبيار",
      code: 16010,
    },
    {
      name: "Bouzareah",
      arName: "بوزريعة",
      code: 16011,
    },
    {
      name: "Birkhadem",
      arName: "بئر خادم",
      code: 16012,
    },
    {
      name: "El Harrach",
      arName: "الحراش",
      code: 16013,
    },
    {
      name: "Baraki",
      arName: "براقي",
      code: 16014,
    },
    {
      name: "Oued Smar",
      arName: "وادي السمار",
      code: 16015,
    },
    {
      name: "Bachdjerrah",
      arName: "باش جراح",
      code: 16016,
    },
    {
      name: "Hussein Dey",
      arName: "حسين داي",
      code: 16017,
    },
    {
      name: "Kouba",
      arName: "القبة",
      code: 16018,
    },
    {
      name: "Bourouba",
      arName: "بوروبة",
      code: 16019,
    },
    {
      name: "Dar El Beïda",
      arName: "الدار البيضاء",
      code: 16020,
    },
    {
      name: "Bab Ezzouar",
      arName: "باب الزوار",
      code: 16021,
    },
    {
      name: "Ben Aknoun",
      arName: "بن عكنون",
      code: 16022,
    },
    {
      name: "Dely Ibrahim",
      arName: "دالي إبراهيم",
      code: 16023,
    },
    {
      name: "El Hammamet",
      arName: "الحمامات",
      code: 16024,
    },
    {
      name: "Raïs Hamidou",
      arName: "رايس حميدو",
      code: 16025,
    },
    {
      name: "Gué de Constantine",
      arName: "جسر قسنطينة",
      code: 16026,
    },
    {
      name: "El Mouradia",
      arName: "المرادية",
      code: 16027,
    },
    {
      name: "Hydra",
      arName: "حيدرة",
      code: 16028,
    },
    {
      name: "Mohammadia",
      arName: "المحمدية",
      code: 16029,
    },
    {
      name: "Bordj El Kiffan",
      arName: "برج الكيفان",
      code: 16030,
    },
    {
      name: "El Magharia",
      arName: "المقرية",
      code: 16031,
    },
    {
      name: "Beni Messous",
      arName: "بني مسوس",
      code: 16032,
    },
    {
      name: "Les Eucalyptus",
      arName: "کالیتوس",
      code: 16033,
    },
    {
      name: "Birtouta",
      arName: "بئر توتة",
      code: 16034,
    },
    {
      name: "Tessala El Merdja",
      arName: "تسالة المرجة",
      code: 16035,
    },
    {
      name: "Ouled Chebel",
      arName: "أولاد شبل",
      code: 16036,
    },
    {
      name: "Sidi Moussa",
      arName: "سيدي موسى",
      code: 16037,
    },
    {
      name: "Aïn Taya",
      arName: "عين طاية",
      code: 16038,
    },
    {
      name: "Bordj El Bahri",
      arName: "برج البحري",
      code: 16039,
    },
    {
      name: "El Marsa",
      arName: "المرسى",
      code: 16040,
    },
    {
      name: "H'raoua",
      arName: "هراوة",
      code: 16041,
    },
    {
      name: "Rouïba",
      arName: "الرويبة",
      code: 16042,
    },
    {
      name: "Reghaïa",
      arName: "الرغاية",
      code: 16043,
    },
    {
      name: "Aïn Benian",
      arName: "عين البنيان",
      code: 16044,
    },
    {
      name: "Staoueli",
      arName: "سطاوالي",
      code: 16045,
    },
    {
      name: "Zeralda",
      arName: "زرالدة",
      code: 16046,
    },
    {
      name: "Mahelma",
      arName: "المحالمة",
      code: 16047,
    },
    {
      name: "Rahmania",
      arName: "الرحمانية",
      code: 16048,
    },
    {
      name: "Souidania",
      arName: "السويدانية",
      code: 16049,
    },
    {
      name: "Cheraga",
      arName: "الشراقة",
      code: 16050,
    },
    {
      name: "Ouled Fayet",
      arName: "أولاد فايت",
      code: 16051,
    },
    {
      name: "El Achour",
      arName: "العاشور",
      code: 16052,
    },
    {
      name: "Draria",
      arName: "درارية",
      code: 16053,
    },
    {
      name: "Douera",
      arName: "الدويرة",
      code: 16054,
    },
    {
      name: "Baba Hassen",
      arName: "بابا حسن",
      code: 16055,
    },
    {
      name: "Khraicia",
      arName: "خرايسية",
      code: 16056,
    },
    {
      name: "Saoula",
      arName: "السحاولة",
      code: 16057,
    },
  ],
  "17": [
    {
      name: "Aïn Chouhada",
      arName: "عين الشهداء",
      code: 17001,
    },
    {
      name: "Aïn El Ibel",
      arName: "عين الابل",
      code: 17002,
    },
    {
      name: "Aïn Feka",
      arName: "عين أفقه",
      code: 17003,
    },
    {
      name: "Aïn Maabed",
      arName: "عين معبد",
      code: 17004,
    },
    {
      name: "Aïn Oussara",
      arName: "عين وسارة",
      code: 17005,
    },
    {
      name: "Amourah",
      arName: "عمورة",
      code: 17006,
    },
    {
      name: "Benhar",
      arName: "بنهار",
      code: 17007,
    },
    {
      name: "Beni Yagoub",
      arName: "بن يعقوب",
      code: 17008,
    },
    {
      name: "Birine",
      arName: "البيرين",
      code: 17009,
    },
    {
      name: "Bouira Lahdab",
      arName: "بويرة الأحداب",
      code: 17010,
    },
    {
      name: "Charef",
      arName: "الشارف",
      code: 17011,
    },
    {
      name: "Dar Chioukh",
      arName: "دار الشيوخ",
      code: 17012,
    },
    {
      name: "Deldoul",
      arName: "دلدول",
      code: 17013,
    },
    {
      name: "Djelfa",
      arName: "الجلفة",
      code: 17014,
    },
    {
      name: "Douis",
      arName: "الدويس",
      code: 17015,
    },
    {
      name: "El Guedid",
      arName: "القديد",
      code: 17016,
    },
    {
      name: "El Idrissia",
      arName: "الإدريسية",
      code: 17017,
    },
    {
      name: "El Khemis",
      arName: "الخميس",
      code: 17018,
    },
    {
      name: "Faidh El Botma",
      arName: "فيض البطمة",
      code: 17019,
    },
    {
      name: "Guernini",
      arName: "القرنيني",
      code: 17020,
    },
    {
      name: "Guettara",
      arName: "قطارة",
      code: 17021,
    },
    {
      name: "Had Sahary",
      arName: "حد الصحاري",
      code: 17022,
    },
    {
      name: "Hassi Bahbah",
      arName: "حاسي بحبح",
      code: 17023,
    },
    {
      name: "Hassi El Euch",
      arName: "حاسي العش",
      code: 17024,
    },
    {
      name: "Hassi Fedoul",
      arName: "حاسي فدول",
      code: 17025,
    },
    {
      name: "Messaad",
      arName: "مسعد",
      code: 17026,
    },
    {
      name: "M'liliha",
      arName: "مليليحة",
      code: 17027,
    },
    {
      name: "Moudjebara",
      arName: "مجبارة",
      code: 17028,
    },
    {
      name: "Oum Laadham",
      arName: "أم العظام",
      code: 17029,
    },
    {
      name: "Sed Rahal",
      arName: "سد رحال",
      code: 17030,
    },
    {
      name: "Selmana",
      arName: "سلمانة",
      code: 17031,
    },
    {
      name: "Sidi Baizid",
      arName: "سيدي بايزيد",
      code: 17032,
    },
    {
      name: "Sidi Ladjel",
      arName: "سيدي لعجال",
      code: 17033,
    },
    {
      name: "Tadmit",
      arName: "تعضميت",
      code: 17034,
    },
    {
      name: "Zaafrane",
      arName: "الزعفران",
      code: 17035,
    },
    {
      name: "Zaccar",
      arName: "زكار",
      code: 17036,
    },
  ],
  "18": [
    {
      name: "Jijel",
      arName: "جيجل",
      code: 18001,
    },
    {
      name: "Eraguene",
      arName: "إيراقن سويسي",
      code: 18002,
    },
    {
      name: "El Aouana",
      arName: "العوانة",
      code: 18003,
    },
    {
      name: "Ziama Mansouriah",
      arName: "زيامة منصورية",
      code: 18004,
    },
    {
      name: "Taher",
      arName: "الطاهير",
      code: 18005,
    },
    {
      name: "Emir Abdelkader",
      arName: "الأمير عبد القادر",
      code: 18006,
    },
    {
      name: "Chekfa",
      arName: "الشقفة",
      code: 18007,
    },
    {
      name: "Chahna",
      arName: "الشحنة",
      code: 18008,
    },
    {
      name: "El Milia",
      arName: "الميلية",
      code: 18009,
    },
    {
      name: "Sidi Maarouf",
      arName: "سيدي معروف",
      code: 18010,
    },
    {
      name: "Settara",
      arName: "السطارة",
      code: 18011,
    },
    {
      name: "El Ancer",
      arName: "العنصر",
      code: 18012,
    },
    {
      name: "Sidi Abdelaziz",
      arName: "سيدي عبد العزيز",
      code: 18013,
    },
    {
      name: "Kaous",
      arName: "قاوس",
      code: 18014,
    },
    {
      name: "Ghebala",
      arName: "غبالة",
      code: 18015,
    },
    {
      name: "Bouraoui Belhadef",
      arName: "بوراوي بلهادف",
      code: 18016,
    },
    {
      name: "Djimla",
      arName: "جيملة",
      code: 18017,
    },
    {
      name: "Selma Benziada",
      arName: "سلمى بن زيادة",
      code: 18018,
    },
    {
      name: "Boucif Ouled Askeur",
      arName: "بوسيف أولاد عسكر",
      code: 18019,
    },
    {
      name: "El Kennar Nouchfi",
      arName: "القنار",
      code: 18020,
    },
    {
      name: "Ouled Yahia Khedrouche",
      arName: "أولاد يحيى خدروش",
      code: 18021,
    },
    {
      name: "Boudriaa Ben Yadjis",
      arName: "بودريعة بن ياجيس",
      code: 18022,
    },
    {
      name: "Kheïri Oued Adjoul",
      arName: "خيري وادي العجول",
      code: 18023,
    },
    {
      name: "Texenna",
      arName: "تاكسنة",
      code: 18024,
    },
    {
      name: "Djemaa Beni Habibi",
      arName: "الجمعة بني حبيبي",
      code: 18025,
    },
    {
      name: "Bordj Tahar",
      arName: "برج الطهر",
      code: 18026,
    },
    {
      name: "Ouled Rabah",
      arName: "أولاد رابح",
      code: 18027,
    },
    {
      name: "Ouadjana",
      arName: "وجانة",
      code: 18028,
    },
  ],
  "19": [
    {
      name: "Aïn Abessa",
      arName: "عين عباسة",
      code: 19001,
    },
    {
      name: "Aïn Arnat",
      arName: "عين أرنات",
      code: 19002,
    },
    {
      name: "Aïn Azel",
      arName: "عين آزال",
      code: 19003,
    },
    {
      name: "Aïn El Kebira",
      arName: "عين الكبيرة",
      code: 19004,
    },
    {
      name: "Aïn Lahdjar",
      arName: "عين الحجر",
      code: 19005,
    },
    {
      name: "Aïn Legradj",
      arName: "عين لقراج",
      code: 19006,
    },
    {
      name: "Aïn Oulmene",
      arName: "عين ولمان",
      code: 19007,
    },
    {
      name: "Aïn Roua",
      arName: "عين الروى",
      code: 19008,
    },
    {
      name: "Aïn Sebt",
      arName: "عين السبت",
      code: 19009,
    },
    {
      name: "Aït Naoual Mezada",
      arName: "آيت نوال مزادة",
      code: 19010,
    },
    {
      name: "Aït Tizi",
      arName: "آيت تيزي",
      code: 19011,
    },
    {
      name: "Beni Ouartilene",
      arName: "بني ورتيلان",
      code: 19012,
    },
    {
      name: "Amoucha",
      arName: "عموشة",
      code: 19013,
    },
    {
      name: "Babor",
      arName: "بابور",
      code: 19014,
    },
    {
      name: "Bazer Sakhra",
      arName: "بازر الصخرة",
      code: 19015,
    },
    {
      name: "Beidha Bordj",
      arName: "بيضاء برج",
      code: 19016,
    },
    {
      name: "Belaa",
      arName: "بلاعة",
      code: 19017,
    },
    {
      name: "Beni Aziz",
      arName: "بني عزيز",
      code: 19018,
    },
    {
      name: "Beni Chebana",
      arName: "بني شبانة",
      code: 19019,
    },
    {
      name: "Beni Fouda",
      arName: "بني فودة",
      code: 19020,
    },
    {
      name: "Beni Hocine",
      arName: "بني حسين",
      code: 19021,
    },
    {
      name: "Beni Mouhli",
      arName: "بني محلي",
      code: 19022,
    },
    {
      name: "Bir El Arch",
      arName: "بئر العرش",
      code: 19023,
    },
    {
      name: "Bir Haddada",
      arName: "بئر حدادة",
      code: 19024,
    },
    {
      name: "Bouandas",
      arName: "بوعنداس",
      code: 19025,
    },
    {
      name: "Bougaa",
      arName: "بوقاعة",
      code: 19026,
    },
    {
      name: "Bousselam",
      arName: "بوسلام",
      code: 19027,
    },
    {
      name: "Boutaleb",
      arName: "بوطالب",
      code: 19028,
    },
    {
      name: "Dehamcha",
      arName: "الدهامشة",
      code: 19029,
    },
    {
      name: "Djemila",
      arName: "جميلة",
      code: 19030,
    },
    {
      name: "Draa Kebila",
      arName: "ذراع قبيلة",
      code: 19031,
    },
    {
      name: "El Eulma",
      arName: "العلمة",
      code: 19032,
    },
    {
      name: "El Ouldja",
      arName: "الولجة",
      code: 19033,
    },
    {
      name: "El Ouricia",
      arName: "الأوريسية",
      code: 19034,
    },
    {
      name: "Guellal",
      arName: "قلال",
      code: 19035,
    },
    {
      name: "Guelta Zerka",
      arName: "القلتة الزرقاء",
      code: 19036,
    },
    {
      name: "Guenzet",
      arName: "قنزات",
      code: 19037,
    },
    {
      name: "Guidjel",
      arName: "قجال",
      code: 19038,
    },
    {
      name: "Hamma",
      arName: "الحامة",
      code: 19039,
    },
    {
      name: "Hammam Guergour",
      arName: "حمام قرقور",
      code: 19040,
    },
    {
      name: "Hammam Soukhna",
      arName: "حمام السخنة",
      code: 19041,
    },
    {
      name: "Harbil",
      arName: "حربيل",
      code: 19042,
    },
    {
      name: "Ksar El Abtal",
      arName: "قصر الأبطال",
      code: 19043,
    },
    {
      name: "Maaouia",
      arName: "معاوية",
      code: 19044,
    },
    {
      name: "Maoklane",
      arName: "ماوكلان",
      code: 19045,
    },
    {
      name: "Mezloug",
      arName: "مزلوق",
      code: 19046,
    },
    {
      name: "Oued El Barad",
      arName: "واد البارد",
      code: 19047,
    },
    {
      name: "Ouled Addouane",
      arName: "أولاد عدوان",
      code: 19048,
    },
    {
      name: "Ouled Sabor",
      arName: "أولاد صابر",
      code: 19049,
    },
    {
      name: "Ouled Si Ahmed",
      arName: "أولاد سي أحمد",
      code: 19050,
    },
    {
      name: "Ouled Tebben",
      arName: "أولاد تبان",
      code: 19051,
    },
    {
      name: "Rasfa",
      arName: "الرصفة",
      code: 19052,
    },
    {
      name: "Salah Bey",
      arName: "صالح باي",
      code: 19053,
    },
    {
      name: "Serdj El Ghoul",
      arName: "سرج الغول",
      code: 19054,
    },
    {
      name: "Sétif",
      arName: "سطيف",
      code: 19055,
    },
    {
      name: "Tachouda",
      arName: "تاشودة",
      code: 19056,
    },
    {
      name: "Talaifacene",
      arName: "تالة ايفاسن",
      code: 19057,
    },
    {
      name: "Taya",
      arName: "الطاية",
      code: 19058,
    },
    {
      name: "Tella",
      arName: "التلة",
      code: 19059,
    },
    {
      name: "Tizi N'bechar",
      arName: "تيزي نبشار",
      code: 19060,
    },
  ],
  "20": [
    {
      name: "Aïn El Hadjar",
      arName: "عين الحجر",
      code: 20001,
    },
    {
      name: "Aïn Sekhouna",
      arName: "عين السخونة",
      code: 20002,
    },
    {
      name: "Aïn Soltane",
      arName: "عين سلطان",
      code: 20003,
    },
    {
      name: "Doui Thabet",
      arName: "ذوي ثابت",
      code: 20004,
    },
    {
      name: "El Hassasna",
      arName: "الحساسنة",
      code: 20005,
    },
    {
      name: "Hounet",
      arName: "هونة",
      code: 20006,
    },
    {
      name: "Maamora",
      arName: "المعمورة",
      code: 20007,
    },
    {
      name: "Moulay Larbi",
      arName: "مولاي لعربي",
      code: 20008,
    },
    {
      name: "Ouled Brahim",
      arName: "أولاد إبراهيم",
      code: 20009,
    },
    {
      name: "Ouled Khaled",
      arName: "أولاد خالد",
      code: 20010,
    },
    {
      name: "Saïda",
      arName: "سعيدة",
      code: 20011,
    },
    {
      name: "Sidi Ahmed",
      arName: "سیدی احمد",
      code: 20012,
    },
    {
      name: "Sidi Amar",
      arName: "سيدي اعمر",
      code: 20013,
    },
    {
      name: "Sidi Boubekeur",
      arName: "سيدي بوبكر",
      code: 20014,
    },
    {
      name: "Tircine",
      arName: "تيرسين",
      code: 20015,
    },
    {
      name: "Youb",
      arName: "يوب",
      code: 20016,
    },
  ],
  "21": [
    {
      name: "Aïn Bouziane",
      arName: "عين بوزيان",
      code: 21001,
    },
    {
      name: "Aïn Charchar",
      arName: "عين شرشار",
      code: 21002,
    },
    {
      name: "Aïn Kechra",
      arName: "عين قشرة",
      code: 21003,
    },
    {
      name: "Aïn Zouit",
      arName: "عين زويت",
      code: 21004,
    },
    {
      name: "Azzaba",
      arName: "عزابة",
      code: 21005,
    },
    {
      name: "Bekkouche Lakhdar",
      arName: "بكوش لخضر",
      code: 21006,
    },
    {
      name: "Bin El Ouiden",
      arName: "بين الويدان",
      code: 21007,
    },
    {
      name: "Ben Azzouz",
      arName: "بن عزوز",
      code: 21008,
    },
    {
      name: "Beni Bechir",
      arName: "بني بشير",
      code: 21009,
    },
    {
      name: "Beni Oulbane",
      arName: "بني ولبان",
      code: 21010,
    },
    {
      name: "Beni Zid",
      arName: "بني زيد",
      code: 21011,
    },
    {
      name: "Bouchtata",
      arName: "بوشطاطة",
      code: 21012,
    },
    {
      name: "Cheraia",
      arName: "الشرايع",
      code: 21013,
    },
    {
      name: "Collo",
      arName: "القل",
      code: 21014,
    },
    {
      name: "Djendel Saadi Mohamed",
      arName: "جندل",
      code: 21015,
    },
    {
      name: "El Ghedir",
      arName: "لغدير",
      code: 21016,
    },
    {
      name: "El Hadaiek",
      arName: "الحدائق",
      code: 21017,
    },
    {
      name: "El Harrouch",
      arName: "الحروش",
      code: 21018,
    },
    {
      name: "El Marsa",
      arName: "المرسى",
      code: 21019,
    },
    {
      name: "Emdjez Edchich",
      arName: "أمجاز الدشيش",
      code: 21020,
    },
    {
      name: "Es Sebt",
      arName: "السبت",
      code: 21021,
    },
    {
      name: "Filfila",
      arName: "فلفلة",
      code: 21022,
    },
    {
      name: "Hamadi Krouma",
      arName: "حمادي كرومة",
      code: 21023,
    },
    {
      name: "Kanoua",
      arName: "قنواع",
      code: 21024,
    },
    {
      name: "Kerkera",
      arName: "الكركرة",
      code: 21025,
    },
    {
      name: "Kheneg Mayoum",
      arName: "خناق مايون",
      code: 21026,
    },
    {
      name: "Oued Zehour",
      arName: "وادي الزهور",
      code: 21027,
    },
    {
      name: "Ouldja Boulballout",
      arName: "الوجلة بوالبلوط",
      code: 21028,
    },
    {
      name: "Ouled Attia",
      arName: "أولاد عطية",
      code: 21029,
    },
    {
      name: "Ouled Hbaba",
      arName: "أولاد أحبابة",
      code: 21030,
    },
    {
      name: "Oum Toub",
      arName: "أم الطوب",
      code: 21031,
    },
    {
      name: "Ramdane Djamel",
      arName: "رمضان جمال",
      code: 21032,
    },
    {
      name: "Salah Bouchaour",
      arName: "صالح بوالشعور",
      code: 21033,
    },
    {
      name: "Sidi Mezghiche",
      arName: "سيدي مزغيش",
      code: 21034,
    },
    {
      name: "Skikda",
      arName: "سكيكدة",
      code: 21035,
    },
    {
      name: "Tamalous",
      arName: "تمالوس",
      code: 21036,
    },
    {
      name: "Zerdaza",
      arName: "زردازة",
      code: 21037,
    },
    {
      name: "Zitouna",
      arName: "زيتونة",
      code: 21038,
    },
  ],
  "22": [
    {
      name: "Aïn Adden",
      arName: "عين أدان",
      code: 22001,
    },
    {
      name: "Aïn El Berd",
      arName: "عين البرد",
      code: 22002,
    },
    {
      name: "Aïn Kada",
      arName: "عين قادة",
      code: 22003,
    },
    {
      name: "Aïn Thrid",
      arName: "عين الثريد",
      code: 22004,
    },
    {
      name: "Aïn Tindamine",
      arName: "عين تندامين",
      code: 22005,
    },
    {
      name: "Amarnas",
      arName: "العمارنة",
      code: 22006,
    },
    {
      name: "Badredine El Mokrani",
      arName: "بدر الدين المقراني",
      code: 22007,
    },
    {
      name: "Belarbi",
      arName: "بلعربي",
      code: 22008,
    },
    {
      name: "Ben Badis",
      arName: "بن باديس",
      code: 22009,
    },
    {
      name: "Benachiba Chelia",
      arName: "بن عشيبة شلية",
      code: 22010,
    },
    {
      name: "Bir El Hammam",
      arName: "بئر الحمام",
      code: 22011,
    },
    {
      name: "Boudjebaa El Bordj",
      arName: "بوجبهة البرج",
      code: 22012,
    },
    {
      name: "Boukhanafis",
      arName: "بوخنيفيس",
      code: 22013,
    },
    {
      name: "Chettouane Belaila",
      arName: "شيطوان بليلة",
      code: 22014,
    },
    {
      name: "Dhaya",
      arName: "الضاية",
      code: 22015,
    },
    {
      name: "El Haçaiba",
      arName: "الحصيبة",
      code: 22016,
    },
    {
      name: "Hassi Dahou",
      arName: "حاسي دحو",
      code: 22017,
    },
    {
      name: "Hassi Zehana",
      arName: "حاسي زهانة",
      code: 22018,
    },
    {
      name: "Lamtar",
      arName: "لمطار",
      code: 22019,
    },
    {
      name: "Makedra",
      arName: "مقدرة",
      code: 22020,
    },
    {
      name: "Marhoum",
      arName: "مرحوم",
      code: 22021,
    },
    {
      name: "M'cid",
      arName: "مسيد",
      code: 22022,
    },
    {
      name: "Merine",
      arName: "مرين",
      code: 22023,
    },
    {
      name: "Mezaourou",
      arName: "مزاورو",
      code: 22024,
    },
    {
      name: "Mostefa Ben Brahim",
      arName: "مصطفى بن إبراهيم",
      code: 22025,
    },
    {
      name: "Moulay Slissen",
      arName: "مولاي سليسن",
      code: 22026,
    },
    {
      name: "Oued Sebaa",
      arName: "واد السبع",
      code: 22027,
    },
    {
      name: "Oued Sefioun",
      arName: "واد سفيون",
      code: 22028,
    },
    {
      name: "Oued Taourira",
      arName: "واد تاوريرة",
      code: 22029,
    },
    {
      name: "Ras El Ma",
      arName: "رأس الماء",
      code: 22030,
    },
    {
      name: "Redjem Demouche",
      arName: "رجم دموش",
      code: 22031,
    },
    {
      name: "Sehala Thaoura",
      arName: "سهالة ثاورة",
      code: 22032,
    },
    {
      name: "Sfisef",
      arName: "سفيزف",
      code: 22033,
    },
    {
      name: "Sidi Ali Benyoub",
      arName: "سيدي علي بن يوب",
      code: 22034,
    },
    {
      name: "Sidi Ali Boussidi",
      arName: "سيدي علي بوسيدي",
      code: 22035,
    },
    {
      name: "Sidi Bel Abbes",
      arName: "سيدي بلعباس",
      code: 22036,
    },
    {
      name: "Sidi Brahim",
      arName: "سيدي إبراهيم",
      code: 22037,
    },
    {
      name: "Sidi Chaib",
      arName: "سيدي شعيب",
      code: 22038,
    },
    {
      name: "Sidi Daho Des Zairs",
      arName: "سيدي دحو الزائر",
      code: 22039,
    },
    {
      name: "Sidi Hamadouche",
      arName: "سيدي حمادوش",
      code: 22040,
    },
    {
      name: "Sidi Khaled",
      arName: "سيدي خالد",
      code: 22041,
    },
    {
      name: "Sidi Lahcene",
      arName: "سيدي لحسن",
      code: 22042,
    },
    {
      name: "Sidi Yacoub",
      arName: "سيدي يعقوب",
      code: 22043,
    },
    {
      name: "Tabia",
      arName: "طابية",
      code: 22044,
    },
    {
      name: "Tafissour",
      arName: "تفسور",
      code: 22045,
    },
    {
      name: "Taoudmout",
      arName: "تاودموت",
      code: 22046,
    },
    {
      name: "Teghalimet",
      arName: "تغاليمت",
      code: 22047,
    },
    {
      name: "Telagh",
      arName: "تلاغ",
      code: 22048,
    },
    {
      name: "Tenira",
      arName: "تنيرة",
      code: 22049,
    },
    {
      name: "Tessala",
      arName: "تسالة",
      code: 22050,
    },
    {
      name: "Tilmouni",
      arName: "تلموني",
      code: 22051,
    },
    {
      name: "Zerouala",
      arName: "زروالة",
      code: 22052,
    },
  ],
  "23": [
    {
      name: "Annaba",
      arName: "عنابة",
      code: 23001,
    },
    {
      name: "Berrahal",
      arName: "برحال",
      code: 23002,
    },
    {
      name: "El Hadjar",
      arName: "الحجار",
      code: 23003,
    },
    {
      name: "Eulma",
      arName: "العلمة",
      code: 23004,
    },
    {
      name: "El Bouni",
      arName: "البوني",
      code: 23005,
    },
    {
      name: "Oued El Aneb",
      arName: "وادي العنب",
      code: 23006,
    },
    {
      name: "Cheurfa",
      arName: "الشرفة",
      code: 23007,
    },
    {
      name: "Seraïdi",
      arName: "سرايدي",
      code: 23008,
    },
    {
      name: "Aïn Berda",
      arName: "عين الباردة",
      code: 23009,
    },
    {
      name: "Chetaïbi",
      arName: "شطايبي",
      code: 23010,
    },
    {
      name: "Sidi Amar",
      arName: "سيدي عمار",
      code: 23011,
    },
    {
      name: "Treat",
      arName: "تريعات",
      code: 23012,
    },
  ],
  "24": [
    {
      name: "Aïn Ben Beida",
      arName: "عين بن بيضاء",
      code: 24001,
    },
    {
      name: "Aïn Larbi",
      arName: "عين العربي",
      code: 24002,
    },
    {
      name: "Aïn Makhlouf",
      arName: "عين مخلوف",
      code: 24003,
    },
    {
      name: "Aïn Reggada",
      arName: "عين رقادة",
      code: 24004,
    },
    {
      name: "Aïn Sandel",
      arName: "عين صندل",
      code: 24005,
    },
    {
      name: "Belkheir",
      arName: "بلخير",
      code: 24006,
    },
    {
      name: "Ben Djerrah",
      arName: "بن جراح",
      code: 24007,
    },
    {
      name: "Beni Mezline",
      arName: "بني مزلين",
      code: 24008,
    },
    {
      name: "Bordj Sabath",
      arName: "برج صباط",
      code: 24009,
    },
    {
      name: "Bouhachana",
      arName: "بوحشانة",
      code: 24010,
    },
    {
      name: "Bouhamdane",
      arName: "بوحمدان",
      code: 24011,
    },
    {
      name: "Bouati Mahmoud",
      arName: "بوعاطي محمود",
      code: 24012,
    },
    {
      name: "Bouchegouf",
      arName: "بوشقوف",
      code: 24013,
    },
    {
      name: "Boumahra Ahmed",
      arName: "بومهرة أحمد",
      code: 24014,
    },
    {
      name: "Dahouara",
      arName: "الدهوارة",
      code: 24015,
    },
    {
      name: "Djeballah Khemissi",
      arName: "جبالة لخميسي",
      code: 24016,
    },
    {
      name: "El Fedjoudj",
      arName: "الفجوج",
      code: 24017,
    },
    {
      name: "Guellat Bou Sbaa",
      arName: "قلعة بوصبع",
      code: 24018,
    },
    {
      name: "Guelma",
      arName: "قالمة",
      code: 24019,
    },
    {
      name: "Hammam Debagh",
      arName: "حمام دباغ",
      code: 24020,
    },
    {
      name: "Hammam N'bail",
      arName: "حمام النبايل",
      code: 24021,
    },
    {
      name: "Héliopolis",
      arName: "هيليوبوليس",
      code: 24022,
    },
    {
      name: "Houari Boumédiène",
      arName: "هواري بومدين",
      code: 24023,
    },
    {
      name: "Khezarra",
      arName: "لخزارة",
      code: 24024,
    },
    {
      name: "Medjez Amar",
      arName: "مجاز عمار",
      code: 24025,
    },
    {
      name: "Medjez Sfa",
      arName: "مجاز الصفاء",
      code: 24026,
    },
    {
      name: "Nechmaya",
      arName: "نشماية",
      code: 24027,
    },
    {
      name: "Oued Cheham",
      arName: "وادي الشحم",
      code: 24028,
    },
    {
      name: "Oued Fragha",
      arName: "وادي فراغة",
      code: 24029,
    },
    {
      name: "Oued Zenati",
      arName: "وادي الزناتي",
      code: 24030,
    },
    {
      name: "Ras El Agba",
      arName: "راس العقبة",
      code: 24031,
    },
    {
      name: "Roknia",
      arName: "الركنية",
      code: 24032,
    },
    {
      name: "Sellaoua Announa",
      arName: "سلاوة عنونة",
      code: 24033,
    },
    {
      name: "Tamlouka",
      arName: "تاملوكة",
      code: 24034,
    },
  ],
  "25": [
    {
      name: "Aïn Abid",
      arName: "عين عبيد",
      code: 25001,
    },
    {
      name: "Aïn Smara",
      arName: "عين سمارة",
      code: 25002,
    },
    {
      name: "Beni Hamiden",
      arName: "بني حميدان",
      code: 25003,
    },
    {
      name: "Constantine",
      arName: "قسنطينة",
      code: 25004,
    },
    {
      name: "Didouche Mourad",
      arName: "ديدوش مراد",
      code: 25005,
    },
    {
      name: "El Khroub",
      arName: "الخروب",
      code: 25006,
    },
    {
      name: "Hamma Bouziane",
      arName: "حامة بوزيان",
      code: 25007,
    },
    {
      name: "Ibn Badis",
      arName: "ابن باديس",
      code: 25008,
    },
    {
      name: "Ibn Ziad",
      arName: "ابن زياد",
      code: 25009,
    },
    {
      name: "Messaoud Boudjriou",
      arName: "مسعود بوجريو",
      code: 25010,
    },
    {
      name: "Ouled Rahmoune",
      arName: "أولاد رحمون",
      code: 25011,
    },
    {
      name: "Zighoud Youcef",
      arName: "زيغود يوسف",
      code: 25012,
    },
  ],
  "26": [
    {
      name: "Aïn Boucif",
      arName: "عين بوسيف",
      code: 26001,
    },
    {
      name: "Aïn Ouksir",
      arName: "عين القصير",
      code: 26002,
    },
    {
      name: "Aissaouia",
      arName: "العيساوية",
      code: 26003,
    },
    {
      name: "Aziz",
      arName: "عزيز",
      code: 26004,
    },
    {
      name: "Baata",
      arName: "بعطة",
      code: 26005,
    },
    {
      name: "Benchicao",
      arName: "بن شكاو",
      code: 26006,
    },
    {
      name: "Beni Slimane",
      arName: "بني سليمان",
      code: 26007,
    },
    {
      name: "Berrouaghia",
      arName: "البرواقية",
      code: 26008,
    },
    {
      name: "Bir Ben Laabed",
      arName: "بئر بن عابد",
      code: 26009,
    },
    {
      name: "Boghar",
      arName: "بوغار",
      code: 26010,
    },
    {
      name: "Bou Aiche",
      arName: "بوعيش",
      code: 26011,
    },
    {
      name: "Bouaichoune",
      arName: "بوعيشون",
      code: 26012,
    },
    {
      name: "Bouchrahil",
      arName: "بوشراحيل",
      code: 26013,
    },
    {
      name: "Boughezoul",
      arName: "بوغزول",
      code: 26014,
    },
    {
      name: "Bouskene",
      arName: "بوسكن",
      code: 26015,
    },
    {
      name: "Chahbounia",
      arName: "الشهبونية",
      code: 26016,
    },
    {
      name: "Chellalet El Adhaoura",
      arName: "شلالة العذاورة",
      code: 26017,
    },
    {
      name: "Cheniguel",
      arName: "شنيقل",
      code: 26018,
    },
    {
      name: "Derrag",
      arName: "دراق",
      code: 26019,
    },
    {
      name: "Deux Bassins",
      arName: "فج الحوضين",
      code: 26020,
    },
    {
      name: "Djouab",
      arName: "جواب",
      code: 26021,
    },
    {
      name: "Draa Essamar",
      arName: "ذراع السمار",
      code: 26022,
    },
    {
      name: "El Azizia",
      arName: "العزيزية",
      code: 26023,
    },
    {
      name: "El Guelb El Kebir",
      arName: "القلب الكبير",
      code: 26024,
    },
    {
      name: "El Hamdania",
      arName: "الحمدانية",
      code: 26025,
    },
    {
      name: "El Omaria",
      arName: "العمارية",
      code: 26026,
    },
    {
      name: "El Ouinet",
      arName: "العوينات",
      code: 26027,
    },
    {
      name: "Hannacha",
      arName: "حناشة",
      code: 26028,
    },
    {
      name: "Kef Lakhdar",
      arName: "الكاف الأخضر",
      code: 26029,
    },
    {
      name: "Khams Djouamaa",
      arName: "خمس جوامع",
      code: 26030,
    },
    {
      name: "Ksar Boukhari",
      arName: "قصر البخاري",
      code: 26031,
    },
    {
      name: "Meghraoua",
      arName: "مغراوة",
      code: 26032,
    },
    {
      name: "Médéa",
      arName: "المدية",
      code: 26033,
    },
    {
      name: "Moudjbar",
      arName: "مجبر",
      code: 26034,
    },
    {
      name: "Meftaha",
      arName: "المفاتحة",
      code: 26035,
    },
    {
      name: "Mezerana",
      arName: "مزغنة",
      code: 26036,
    },
    {
      name: "Mihoub",
      arName: "ميهوب",
      code: 26037,
    },
    {
      name: "Ouamri",
      arName: "وامري",
      code: 26038,
    },
    {
      name: "Oued Harbil",
      arName: "وادي حربيل",
      code: 26039,
    },
    {
      name: "Ouled Antar",
      arName: "أولاد عنتر",
      code: 26040,
    },
    {
      name: "Ouled Bouachra",
      arName: "أولاد بوعشرة",
      code: 26041,
    },
    {
      name: "Ouled Brahim",
      arName: "أولاد إبراهيم",
      code: 26042,
    },
    {
      name: "Ouled Deide",
      arName: "أولاد دايد",
      code: 26043,
    },
    {
      name: "Ouled Hellal",
      arName: "أولاد هلال",
      code: 26044,
    },
    {
      name: "Ouled Maaref",
      arName: "أولاد معرف",
      code: 26045,
    },
    {
      name: "Oum El Djalil",
      arName: "أم الجليل",
      code: 26046,
    },
    {
      name: "Ouzera",
      arName: "وزرة",
      code: 26047,
    },
    {
      name: "Rebaia",
      arName: "الربعية",
      code: 26048,
    },
    {
      name: "Saneg",
      arName: "سانق",
      code: 26049,
    },
    {
      name: "Sedraia",
      arName: "سدراية",
      code: 26050,
    },
    {
      name: "Seghouane",
      arName: "سغوان",
      code: 26051,
    },
    {
      name: "Si Mahdjoub",
      arName: "سي المحجوب",
      code: 26052,
    },
    {
      name: "Sidi Damed",
      arName: "سيدي دامد",
      code: 26053,
    },
    {
      name: "Sidi Errabia",
      arName: "سيدي الربيع",
      code: 26054,
    },
    {
      name: "Sidi Naamane",
      arName: "سيدي نعمان",
      code: 26055,
    },
    {
      name: "Sidi Zahar",
      arName: "سيدي زهار",
      code: 26056,
    },
    {
      name: "Sidi Ziane",
      arName: "سيدي زيان",
      code: 26057,
    },
    {
      name: "Souagui",
      arName: "السواقي",
      code: 26058,
    },
    {
      name: "Tablat",
      arName: "تابلاط",
      code: 26059,
    },
    {
      name: "Tafraout",
      arName: "تافراوت",
      code: 26060,
    },
    {
      name: "Tamesguida",
      arName: "تمزقيدة",
      code: 26061,
    },
    {
      name: "Tizi Mahdi",
      arName: "تيزي المهدي",
      code: 26062,
    },
    {
      name: "Tlatet Eddouar",
      arName: "ثلاثة الدوائر",
      code: 26063,
    },
    {
      name: "Zoubiria",
      arName: "الزبيرية",
      code: 26064,
    },
  ],
  "27": [
    {
      name: "Abdelmalek Ramdane",
      arName: "بن عبد المالك رمضان",
      code: 27001,
    },
    {
      name: "Achaacha",
      arName: "عشعاشة",
      code: 27002,
    },
    {
      name: "Aïn Boudinar",
      arName: "عين بودينار",
      code: 27003,
    },
    {
      name: "Aïn Nouissy",
      arName: "عين النويصي",
      code: 27004,
    },
    {
      name: "Aïn Sidi Cherif",
      arName: "عين سيدي شريف",
      code: 27005,
    },
    {
      name: "Aïn Tedles",
      arName: "عين تادلس",
      code: 27006,
    },
    {
      name: "Blad Touahria",
      arName: "الطواهرية",
      code: 27007,
    },
    {
      name: "Bouguirat",
      arName: "بوقيرات",
      code: 27008,
    },
    {
      name: "El Hassiane",
      arName: "الحسيان",
      code: 27009,
    },
    {
      name: "Fornaka",
      arName: "فرناكة",
      code: 27010,
    },
    {
      name: "Hadjadj",
      arName: "حجاج",
      code: 27011,
    },
    {
      name: "Hassi Mameche",
      arName: "حاسي مماش",
      code: 27012,
    },
    {
      name: "Khadra",
      arName: "خضرة",
      code: 27013,
    },
    {
      name: "Kheireddine",
      arName: "خير الدين",
      code: 27014,
    },
    {
      name: "Mansourah",
      arName: "منصورة",
      code: 27015,
    },
    {
      name: "Mesra",
      arName: "ماسرة",
      code: 27016,
    },
    {
      name: "Mazagran",
      arName: "مزغران",
      code: 27017,
    },
    {
      name: "Mostaganem",
      arName: "مستغانم",
      code: 27018,
    },
    {
      name: "Nekmaria",
      arName: "نقمارية",
      code: 27019,
    },
    {
      name: "Oued El Kheir",
      arName: "واد الخير",
      code: 27020,
    },
    {
      name: "Ouled Boughalem",
      arName: "أولاد بوغالم",
      code: 27021,
    },
    {
      name: "Ouled Maallah",
      arName: "أولاد مع الله",
      code: 27022,
    },
    {
      name: "Safsaf",
      arName: "الصفصاف",
      code: 27023,
    },
    {
      name: "Sayada",
      arName: "صيادة",
      code: 27024,
    },
    {
      name: "Sidi Ali",
      arName: "سيدي علي",
      code: 27025,
    },
    {
      name: "Sidi Belattar",
      arName: "سيدي بلعطار",
      code: 27026,
    },
    {
      name: "Sidi Lakhdar",
      arName: "سيدي لخضر",
      code: 27027,
    },
    {
      name: "Sirat",
      arName: "سيرات",
      code: 27028,
    },
    {
      name: "Souaflia",
      arName: "السوافلية",
      code: 27029,
    },
    {
      name: "Sour",
      arName: "الصور",
      code: 27030,
    },
    {
      name: "Stidia",
      arName: "ستيدية",
      code: 27031,
    },
    {
      name: "Tazgait",
      arName: "تازقايت",
      code: 27032,
    },
  ],
  "28": [
    {
      name: "Aïn El Hadjel",
      arName: "عين الحجل",
      code: 28001,
    },
    {
      name: "Aïn El Melh",
      arName: "عين الملح",
      code: 28002,
    },
    {
      name: "Aïn Errich",
      arName: "عين الريش",
      code: 28003,
    },
    {
      name: "Aïn Fares",
      arName: "عين فارس",
      code: 28004,
    },
    {
      name: "Aïn Khadra",
      arName: "عين الخضراء",
      code: 28005,
    },
    {
      name: "Belaiba",
      arName: "بلعايبة",
      code: 28006,
    },
    {
      name: "Ben Srour",
      arName: "بن سرور",
      code: 28007,
    },
    {
      name: "Beni Ilmane",
      arName: "بني يلمان",
      code: 28008,
    },
    {
      name: "Benzouh",
      arName: "بنزوه",
      code: 28009,
    },
    {
      name: "Berhoum",
      arName: "برهوم",
      code: 28010,
    },
    {
      name: "Bir Foda",
      arName: "بئر الفضة",
      code: 28011,
    },
    {
      name: "Bou Saâda",
      arName: "بوسعادة",
      code: 28012,
    },
    {
      name: "Bouti Sayah",
      arName: "بوطي السايح",
      code: 28013,
    },
    {
      name: "Chellal",
      arName: "شلال",
      code: 28014,
    },
    {
      name: "Dehahna",
      arName: "الدهاهنة",
      code: 28015,
    },
    {
      name: "Djebel Messaad",
      arName: "جبل أمساعد",
      code: 28016,
    },
    {
      name: "El Hamel",
      arName: "الهامل",
      code: 28017,
    },
    {
      name: "El Houamed",
      arName: "الحوامد",
      code: 28018,
    },
    {
      name: "Hammam Dhalaa",
      arName: "حمام الضلعة",
      code: 28019,
    },
    {
      name: "Khettouti Sed El Djir",
      arName: "خطوطي سد الجير",
      code: 28020,
    },
    {
      name: "Khoubana",
      arName: "خبانة",
      code: 28021,
    },
    {
      name: "Maadid",
      arName: "المعاضيد",
      code: 28022,
    },
    {
      name: "Maarif",
      arName: "المعاريف",
      code: 28023,
    },
    {
      name: "Magra",
      arName: "مقرة",
      code: 28024,
    },
    {
      name: "M'cif",
      arName: "مسيف",
      code: 28025,
    },
    {
      name: "Medjedel",
      arName: "مجدل",
      code: 28026,
    },
    {
      name: "M'sila",
      arName: "المسيلة",
      code: 28027,
    },
    {
      name: "M'tarfa",
      arName: "المطارفة",
      code: 28028,
    },
    {
      name: "Ouanougha",
      arName: "ونوغة",
      code: 28029,
    },
    {
      name: "Ouled Addi Guebala",
      arName: "أولاد عدي القبالة",
      code: 28030,
    },
    {
      name: "Ouled Atia",
      arName: "أولاد عطية",
      code: 28031,
    },
    {
      name: "Mohammed Boudiaf",
      arName: "محمد بوضياف",
      code: 28032,
    },
    {
      name: "Ouled Derradj",
      arName: "أولاد دراج",
      code: 28033,
    },
    {
      name: "Ouled Madhi",
      arName: "أولاد ماضي",
      code: 28034,
    },
    {
      name: "Ouled Mansour",
      arName: "أولاد منصور",
      code: 28035,
    },
    {
      name: "Ouled Sidi Brahim",
      arName: "أولاد سيدي إبراهيم",
      code: 28036,
    },
    {
      name: "Ouled Slimane",
      arName: "أولاد سليمان",
      code: 28037,
    },
    {
      name: "Oultem",
      arName: "أولتام",
      code: 28038,
    },
    {
      name: "Sidi Aïssa",
      arName: "سيدي عيسى",
      code: 28039,
    },
    {
      name: "Sidi Ameur",
      arName: "سيدي عامر",
      code: 28040,
    },
    {
      name: "Sidi Hadjeres",
      arName: "سيدي هجرس",
      code: 28041,
    },
    {
      name: "Sidi M'hamed",
      arName: "سيدي امحمد",
      code: 28042,
    },
    {
      name: "Slim",
      arName: "سليم",
      code: 28043,
    },
    {
      name: "Souamaa",
      arName: "الصوامع",
      code: 28044,
    },
    {
      name: "Tamsa",
      arName: "تامسة",
      code: 28045,
    },
    {
      name: "Tarmount",
      arName: "تارمونت",
      code: 28046,
    },
    {
      name: "Zarzour",
      arName: "الزرزور",
      code: 28047,
    },
  ],
  "29": [
    {
      name: "Aïn Fares",
      arName: "عين فارس",
      code: 29001,
    },
    {
      name: "Aïn Fekan",
      arName: "عين فكان",
      code: 29002,
    },
    {
      name: "Aïn Ferah",
      arName: "عين فراح",
      code: 29003,
    },
    {
      name: "Aïn Fras",
      arName: "عين افرص",
      code: 29004,
    },
    {
      name: "Alaïmia",
      arName: "العلايمية",
      code: 29005,
    },
    {
      name: "Aouf",
      arName: "عوف",
      code: 29006,
    },
    {
      name: "Beniane",
      arName: "البنيان",
      code: 29007,
    },
    {
      name: "Bou Hanifia",
      arName: "بوحنيفية",
      code: 29008,
    },
    {
      name: "Bou Henni",
      arName: "بوهني",
      code: 29009,
    },
    {
      name: "Chorfa",
      arName: "الشرفة",
      code: 29010,
    },
    {
      name: "El Bordj",
      arName: "البرج",
      code: 29011,
    },
    {
      name: "El Gaada",
      arName: "القعدة",
      code: 29012,
    },
    {
      name: "El Ghomri",
      arName: "الغمري",
      code: 29013,
    },
    {
      name: "El Guettana",
      arName: "القيطنة",
      code: 29014,
    },
    {
      name: "El Keurt",
      arName: "القرط",
      code: 29015,
    },
    {
      name: "El Menaouer",
      arName: "المنور",
      code: 29016,
    },
    {
      name: "Ferraguig",
      arName: "فراقيق",
      code: 29017,
    },
    {
      name: "Froha",
      arName: "فروحة",
      code: 29018,
    },
    {
      name: "Gharrous",
      arName: "غروس",
      code: 29019,
    },
    {
      name: "Guerdjoum",
      arName: "قرجوم",
      code: 29020,
    },
    {
      name: "Ghriss",
      arName: "غريس",
      code: 29021,
    },
    {
      name: "Hachem",
      arName: "الهاشم",
      code: 29022,
    },
    {
      name: "Hacine",
      arName: "حسين",
      code: 29023,
    },
    {
      name: "Khalouia",
      arName: "خلوية",
      code: 29024,
    },
    {
      name: "Makdha",
      arName: "ماقضة",
      code: 29025,
    },
    {
      name: "Mamounia",
      arName: "المامونية",
      code: 29026,
    },
    {
      name: "Maoussa",
      arName: "ماوسة",
      code: 29027,
    },
    {
      name: "Mascara",
      arName: "معسكر",
      code: 29028,
    },
    {
      name: "Matemore",
      arName: "مطمور",
      code: 29029,
    },
    {
      name: "Mocta Douz",
      arName: "مقطع دوز",
      code: 29030,
    },
    {
      name: "Mohammadia",
      arName: "المحمدية",
      code: 29031,
    },
    {
      name: "Nesmoth",
      arName: "نسموط",
      code: 29032,
    },
    {
      name: "Oggaz",
      arName: "عقاز",
      code: 29033,
    },
    {
      name: "Oued El Abtal",
      arName: "وادي الأبطال",
      code: 29034,
    },
    {
      name: "Oued Taria",
      arName: "وادي تاغية",
      code: 29035,
    },
    {
      name: "Ras El Aïn Amirouche",
      arName: "رأس عين عميروش",
      code: 29036,
    },
    {
      name: "Sedjerara",
      arName: "سجرارة",
      code: 29037,
    },
    {
      name: "Sehailia",
      arName: "السحايلية",
      code: 29038,
    },
    {
      name: "Sidi Abdeldjebar",
      arName: "سيدي عبد الجبار",
      code: 29039,
    },
    {
      name: "Sidi Abdelmoumen",
      arName: "سيدي عبد المؤمن",
      code: 29040,
    },
    {
      name: "Sidi Kada",
      arName: "سيدي قادة",
      code: 29041,
    },
    {
      name: "Sidi Boussaid",
      arName: "سيدي بوسعيد",
      code: 29042,
    },
    {
      name: "Sig",
      arName: "سيق",
      code: 29043,
    },
    {
      name: "Tighennif",
      arName: "تيغنيف",
      code: 29044,
    },
    {
      name: "Tizi",
      arName: "تيزي",
      code: 29045,
    },
    {
      name: "Zahana",
      arName: "زهانة",
      code: 29046,
    },
    {
      name: "Zelmata",
      arName: "زلامطة",
      code: 29047,
    },
  ],
  "30": [
    {
      name: "Aïn Beida",
      arName: "ﻋﻴﻦ اﻟﺒﻴﻀﺎء",
      code: 30001,
    },
    {
      name: "El Borma",
      arName: "اﻟﺒﺮﻣﺔ",
      code: 30002,
    },
    {
      name: "Hassi Ben Abdellah",
      arName: "ﺣﺎﺳﻲ ﺑﻦ ﻋﺒﺪ اﷲ",
      code: 30003,
    },
    {
      name: "Hassi Messaoud",
      arName: "حاسي مسعود",
      code: 30004,
    },
    {
      name: "N'goussa",
      arName: "ﻧﻘﻮﺳﺔ",
      code: 30005,
    },
    {
      name: "Ouargla",
      arName: "ورقلة",
      code: 30006,
    },
    {
      name: "Rouissat",
      arName: "اﻟﺮوﻳﺴﺎت",
      code: 30007,
    },
    {
      name: "Sidi Khouiled",
      arName: "ﺳﻴﺪي ﺧﻮﻳﻠﺪ",
      code: 30008,
    },
    {
      name: "El Hadjira",
      arName: "اﻟﺤﺠﻴﺮة",
      code: 30009,
    },
    {
      name: "El Allia",
      arName: "اﻟﻌﺎﻟﻴﺔ",
      code: 30010,
    },
  ],
  "31": [
    {
      name: "Oran",
      arName: "وهران",
      code: 31001,
    },
    {
      name: "Gdyel",
      arName: "قديل",
      code: 31002,
    },
    {
      name: "Bir El Djir",
      arName: "بئر الجير",
      code: 31003,
    },
    {
      name: "Hassi Bounif",
      arName: "حاسي بونيف",
      code: 31004,
    },
    {
      name: "Es Senia",
      arName: "السانية",
      code: 31005,
    },
    {
      name: "Arzew",
      arName: "أرزيو",
      code: 31006,
    },
    {
      name: "Bethioua",
      arName: "بطيوة",
      code: 31007,
    },
    {
      name: "Marsa El Hadjadj",
      arName: "مرسى الحجاج",
      code: 31008,
    },
    {
      name: "Aïn El Turk",
      arName: "عين الترك",
      code: 31009,
    },
    {
      name: "El Ançor",
      arName: "العنصر",
      code: 31010,
    },
    {
      name: "Oued Tlelat",
      arName: "وادي تليلات",
      code: 31011,
    },
    {
      name: "Tafraoui",
      arName: "طفراوي",
      code: 31012,
    },
    {
      name: "Sidi El Chahmi",
      arName: "سيدي الشحمي",
      code: 31013,
    },
    {
      name: "Boufatis",
      arName: "بوفاطيس",
      code: 31014,
    },
    {
      name: "Mers El Kébir",
      arName: "المرسى الكبير",
      code: 31015,
    },
    {
      name: "Bousfer",
      arName: "بوسفر",
      code: 31016,
    },
    {
      name: "El Kerma",
      arName: "الكرمة",
      code: 31017,
    },
    {
      name: "El Braya",
      arName: "البرية",
      code: 31018,
    },
    {
      name: "Hassi Ben Okba",
      arName: "حاسي بن عقبة",
      code: 31019,
    },
    {
      name: "Ben Freha",
      arName: "بن فريحة",
      code: 31020,
    },
    {
      name: "Hassi Mefsoukh",
      arName: "حاسي مفسوخ",
      code: 31021,
    },
    {
      name: "Sidi Benyebka",
      arName: "سيدي بن يبقى",
      code: 31022,
    },
    {
      name: "Misserghin",
      arName: "مسرغين",
      code: 31023,
    },
    {
      name: "Boutlelis",
      arName: "بوتليليس",
      code: 31024,
    },
    {
      name: "Aïn El Kerma",
      arName: "عين الكرمة",
      code: 31025,
    },
    {
      name: "Aïn El Bia",
      arName: "عين البية",
      code: 31026,
    },
  ],
  "32": [
    {
      name: "El Bayadh",
      arName: "البيض",
      code: 32001,
    },
    {
      name: "Rogassa",
      arName: "الرقاصة",
      code: 32002,
    },
    {
      name: "Stitten",
      arName: "ستيتن",
      code: 32003,
    },
    {
      name: "Brezina",
      arName: "بريزينة",
      code: 32004,
    },
    {
      name: "Ghassoul",
      arName: "الغاسول",
      code: 32005,
    },
    {
      name: "Boualem",
      arName: "بوعلام",
      code: 32006,
    },
    {
      name: "El Abiodh Sidi Cheikh",
      arName: "الأبيض سيدي الشيخ",
      code: 32007,
    },
    {
      name: "Aïn El Orak",
      arName: "عين العراك",
      code: 32008,
    },
    {
      name: "Arbaouat",
      arName: "أربوات",
      code: 32009,
    },
    {
      name: "Bougtoub",
      arName: "بوقطب",
      code: 32010,
    },
    {
      name: "El Kheiter",
      arName: "الخيثر",
      code: 32011,
    },
    {
      name: "Kef Lahmar",
      arName: "كاف لحمر",
      code: 32012,
    },
    {
      name: "Boussemghoun",
      arName: "بوسمغون",
      code: 32013,
    },
    {
      name: "Chellala",
      arName: "الشلالة",
      code: 32014,
    },
    {
      name: "Kraakda",
      arName: "كراكدة",
      code: 32015,
    },
    {
      name: "El Bnoud",
      arName: "البنود",
      code: 32016,
    },
    {
      name: "Cheguig",
      arName: "شقيق",
      code: 32017,
    },
    {
      name: "Sidi Ameur",
      arName: "سيدي عمر",
      code: 32018,
    },
    {
      name: "El Mehara",
      arName: "المحرة",
      code: 32019,
    },
    {
      name: "Tousmouline",
      arName: "توسمولين",
      code: 32020,
    },
    {
      name: "Sidi Slimane",
      arName: "سيدي سليمان",
      code: 32021,
    },
    {
      name: "Sidi Tifour",
      arName: "سيدي طيفور",
      code: 32022,
    },
  ],
  "33": [
    {
      name: "Illizi",
      arName: "ﻳﻠﻴﺰى",
      code: 33001,
    },
    {
      name: "Debdeb",
      arName: "دبدب",
      code: 33002,
    },
    {
      name: "Bordj Omar Driss",
      arName: "برج عمار إدريس",
      code: 33003,
    },
    {
      name: "In Amenas",
      arName: "إن أمناس",
      code: 33004,
    },
  ],
  "34": [
    {
      name: "Aïn Taghrout",
      arName: "عين تاغروت",
      code: 34001,
    },
    {
      name: "Aïn Tesra",
      arName: "عين تسرة",
      code: 34002,
    },
    {
      name: "Belimour",
      arName: "بليمور",
      code: 34003,
    },
    {
      name: "Ben Daoud",
      arName: "بن داود",
      code: 34004,
    },
    {
      name: "Bir Kasdali",
      arName: "بئر قصد علي",
      code: 34005,
    },
    {
      name: "Bordj Bou Arreridj",
      arName: "برج بوعريريج",
      code: 34006,
    },
    {
      name: "Bordj Ghédir",
      arName: "برج الغدير",
      code: 34007,
    },
    {
      name: "Bordj Zemoura",
      arName: "برج زمورة",
      code: 34008,
    },
    {
      name: "Colla",
      arName: "القلة",
      code: 34009,
    },
    {
      name: "Djaafra",
      arName: "الجعافرة",
      code: 34010,
    },
    {
      name: "El Ach",
      arName: "العش",
      code: 34011,
    },
    {
      name: "El Achir",
      arName: "اليشير",
      code: 34012,
    },
    {
      name: "El Anseur",
      arName: "العناصر",
      code: 34013,
    },
    {
      name: "El Hamadia",
      arName: "الحمادية",
      code: 34014,
    },
    {
      name: "El Main",
      arName: "الماين",
      code: 34015,
    },
    {
      name: "El M'hir",
      arName: "المهير",
      code: 34016,
    },
    {
      name: "Ghilassa",
      arName: "غيلاسة",
      code: 34017,
    },
    {
      name: "Haraza",
      arName: "حرازة",
      code: 34018,
    },
    {
      name: "Hasnaoua",
      arName: "حسناوة",
      code: 34019,
    },
    {
      name: "Khelil",
      arName: "خليل",
      code: 34020,
    },
    {
      name: "Ksour",
      arName: "القصور",
      code: 34021,
    },
    {
      name: "Mansoura",
      arName: "المنصورة",
      code: 34022,
    },
    {
      name: "Medjana",
      arName: "مجانة",
      code: 34023,
    },
    {
      name: "Ouled Brahem",
      arName: "أولاد براهم",
      code: 34024,
    },
    {
      name: "Ouled Dahmane",
      arName: "أولاد دحمان",
      code: 34025,
    },
    {
      name: "Ouled Sidi Brahim",
      arName: "أولاد سيدي إبراهيم",
      code: 34026,
    },
    {
      name: "Rabta",
      arName: "الرابطة",
      code: 34027,
    },
    {
      name: "Ras El Oued",
      arName: "رأس الوادي",
      code: 34028,
    },
    {
      name: "Sidi Embarek",
      arName: "سيدي امبارك",
      code: 34029,
    },
    {
      name: "Tefreg",
      arName: "تفرق",
      code: 34030,
    },
    {
      name: "Taglait",
      arName: "تقلعيت",
      code: 34031,
    },
    {
      name: "Teniet En Nasr",
      arName: "ثنية النصر",
      code: 34032,
    },
    {
      name: "Tassameurt",
      arName: "تاسمرت",
      code: 34033,
    },
    {
      name: "Tixter",
      arName: "تكستار",
      code: 34034,
    },
  ],
  "35": [
    {
      name: "Afir",
      arName: "اعفير",
      code: 35001,
    },
    {
      name: "Ammal",
      arName: "عمال",
      code: 35002,
    },
    {
      name: "Baghlia",
      arName: "بغلية",
      code: 35003,
    },
    {
      name: "Ben Choud",
      arName: "بن شود",
      code: 35004,
    },
    {
      name: "Beni Amrane",
      arName: "بني عمران",
      code: 35005,
    },
    {
      name: "Bordj Menaïel",
      arName: "برج منايل",
      code: 35006,
    },
    {
      name: "Boudouaou",
      arName: "بودواو",
      code: 35007,
    },
    {
      name: "Boudouaou-el-bahri",
      arName: "بودواو البحري",
      code: 35008,
    },
    {
      name: "Boumerdes",
      arName: "بومرداس",
      code: 35009,
    },
    {
      name: "Bouzegza Keddara",
      arName: "قدارة",
      code: 35010,
    },
    {
      name: "Chabet El Ameur",
      arName: "شعبة العامر",
      code: 35011,
    },
    {
      name: "Corso",
      arName: "قورصو",
      code: 35012,
    },
    {
      name: "Dellys",
      arName: "دلس",
      code: 35013,
    },
    {
      name: "Djinet",
      arName: "جنات",
      code: 35014,
    },
    {
      name: "El Kharrouba",
      arName: "الخروبة",
      code: 35015,
    },
    {
      name: "Hammedi",
      arName: "حمادي",
      code: 35016,
    },
    {
      name: "Issers",
      arName: "يسر",
      code: 35017,
    },
    {
      name: "Khemis El-khechna",
      arName: "خميس الخشنة",
      code: 35018,
    },
    {
      name: "Larbatache",
      arName: "الأربعطاش",
      code: 35019,
    },
    {
      name: "Leghata",
      arName: "لقاطة",
      code: 35020,
    },
    {
      name: "Naciria",
      arName: "الناصرية",
      code: 35021,
    },
    {
      name: "Ouled Aïssa",
      arName: "أولاد عيسى",
      code: 35022,
    },
    {
      name: "Ouled Hedadj",
      arName: "أولاد هداج",
      code: 35023,
    },
    {
      name: "Ouled Moussa",
      arName: "أولاد موسى",
      code: 35024,
    },
    {
      name: "Si Mustapha",
      arName: "سي مصطفى",
      code: 35025,
    },
    {
      name: "Sidi Daoud",
      arName: "سيدي داود",
      code: 35026,
    },
    {
      name: "Souk El Had",
      arName: "سوق الحد",
      code: 35027,
    },
    {
      name: "Taourga",
      arName: "تاورقة",
      code: 35028,
    },
    {
      name: "Thenia",
      arName: "الثنية",
      code: 35029,
    },
    {
      name: "Tidjelabine",
      arName: "تجلابين",
      code: 35030,
    },
    {
      name: "Timezrit",
      arName: "تيمزريت",
      code: 35031,
    },
    {
      name: "Zemmouri",
      arName: "زموري",
      code: 35032,
    },
  ],
  "36": [
    {
      name: "Aïn El Assel",
      arName: "عين العسل",
      code: 36001,
    },
    {
      name: "Aïn Kerma",
      arName: "عين الكرمة",
      code: 36002,
    },
    {
      name: "Asfour",
      arName: "عصفور",
      code: 36003,
    },
    {
      name: "Ben Mehidi",
      arName: "بن مهيدي",
      code: 36004,
    },
    {
      name: "Berrihane",
      arName: "بريحان",
      code: 36005,
    },
    {
      name: "Besbes",
      arName: "البسباس",
      code: 36006,
    },
    {
      name: "Bougous",
      arName: "بوقوس",
      code: 36007,
    },
    {
      name: "Bouhadjar",
      arName: "بوحجار",
      code: 36008,
    },
    {
      name: "Bouteldja",
      arName: "بوثلجة",
      code: 36009,
    },
    {
      name: "Chebaita Mokhtar",
      arName: "شبيطة مختار",
      code: 36010,
    },
    {
      name: "Chefia",
      arName: "الشافية",
      code: 36011,
    },
    {
      name: "Chihani",
      arName: "الشيحاني",
      code: 36012,
    },
    {
      name: "Dréan",
      arName: "الذرعان",
      code: 36013,
    },
    {
      name: "Echatt",
      arName: "الشط",
      code: 36014,
    },
    {
      name: "El Aioun",
      arName: "العيون",
      code: 36015,
    },
    {
      name: "El Kala",
      arName: "القالة",
      code: 36016,
    },
    {
      name: "El Tarf",
      arName: "الطارف",
      code: 36017,
    },
    {
      name: "Hammam Beni Salah",
      arName: "حمام بني صالح",
      code: 36018,
    },
    {
      name: "Lac Des Oiseaux",
      arName: "بحيرة الطيور",
      code: 36019,
    },
    {
      name: "Oued Zitoun",
      arName: "واد الزيتون",
      code: 36020,
    },
    {
      name: "Raml Souk",
      arName: "رمل السوق",
      code: 36021,
    },
    {
      name: "Souarekh",
      arName: "السوارخ",
      code: 36022,
    },
    {
      name: "Zerizer",
      arName: "زريزر",
      code: 36023,
    },
    {
      name: "Zitouna",
      arName: "الزيتونة",
      code: 36024,
    },
  ],
  "37": [
    {
      name: "Oum El Assel",
      arName: "أم العسل",
      code: 37001,
    },
    {
      name: "Tindouf",
      arName: "تندوف",
      code: 37002,
    },
  ],
  "38": [
    {
      name: "Ammari",
      arName: "عماري",
      code: 38001,
    },
    {
      name: "Beni Chaib",
      arName: "بني شعيب",
      code: 38002,
    },
    {
      name: "Beni Lahcene",
      arName: "بني لحسن",
      code: 38003,
    },
    {
      name: "Boucaid",
      arName: "بوقايد",
      code: 38004,
    },
    {
      name: "Bordj Bou Naama",
      arName: "برج بونعامة",
      code: 38005,
    },
    {
      name: "Bordj El Emir Abdelkader",
      arName: "برج الأمير عبد القادر",
      code: 38006,
    },
    {
      name: "Khemisti",
      arName: "خميستي",
      code: 38007,
    },
    {
      name: "Larbaâ",
      arName: "الأربعاء",
      code: 38008,
    },
    {
      name: "Lardjem",
      arName: "لرجام",
      code: 38009,
    },
    {
      name: "Layoune",
      arName: "العيون",
      code: 38010,
    },
    {
      name: "Lazharia",
      arName: "الأزهرية",
      code: 38011,
    },
    {
      name: "Maacem",
      arName: "المعاصم",
      code: 38012,
    },
    {
      name: "Melaab",
      arName: "الملعب",
      code: 38013,
    },
    {
      name: "Ouled Bessem",
      arName: "أولاد بسام",
      code: 38014,
    },
    {
      name: "Sidi Abed",
      arName: "سيدي عابد",
      code: 38015,
    },
    {
      name: "Sidi Boutouchent",
      arName: "سيدي بوتشنت",
      code: 38016,
    },
    {
      name: "Sidi Lantri",
      arName: "سيدي العنتري",
      code: 38017,
    },
    {
      name: "Sidi Slimane",
      arName: "سيدي سليمان",
      code: 38018,
    },
    {
      name: "Tamalaht",
      arName: "تملاحت",
      code: 38019,
    },
    {
      name: "Theniet El Had",
      arName: "ثنية الأحد",
      code: 38020,
    },
    {
      name: "Tissemsilt",
      arName: "تيسمسيلت",
      code: 38021,
    },
    {
      name: "Youssoufia",
      arName: "اليوسفية",
      code: 38022,
    },
  ],
  "39": [
    {
      name: "El Oued",
      arName: "الوادي",
      code: 39001,
    },
    {
      name: "Robbah",
      arName: "الرباح",
      code: 39002,
    },
    {
      name: "Oued El Alenda",
      arName: "وادي العلندة",
      code: 39003,
    },
    {
      name: "Bayadha",
      arName: "البياضة",
      code: 39004,
    },
    {
      name: "Nakhla",
      arName: "النخلة",
      code: 39005,
    },
    {
      name: "Guemar",
      arName: "قمار",
      code: 39006,
    },
    {
      name: "Kouinine",
      arName: "كوينين",
      code: 39007,
    },
    {
      name: "Reguiba",
      arName: "الرقيبة",
      code: 39008,
    },
    {
      name: "Hamraia",
      arName: "الحمراية",
      code: 39009,
    },
    {
      name: "Taghzout",
      arName: "تغزوت",
      code: 39010,
    },
    {
      name: "Debila",
      arName: "الدبيلة",
      code: 39011,
    },
    {
      name: "Hassani Abdelkrim",
      arName: "حساني عبد الكريم",
      code: 39012,
    },
    {
      name: "Hassi Khalifa",
      arName: "حاسي خليفة",
      code: 39013,
    },
    {
      name: "Taleb Larbi",
      arName: "طالب العربي",
      code: 39014,
    },
    {
      name: "Douar El Ma",
      arName: "دوار الماء",
      code: 39015,
    },
    {
      name: "Sidi Aoun",
      arName: "سيدي عون",
      code: 39016,
    },
    {
      name: "Trifaoui",
      arName: "الطريفاوي",
      code: 39017,
    },
    {
      name: "Magrane",
      arName: "المقرن",
      code: 39018,
    },
    {
      name: "Ben Guecha",
      arName: "بن قشة",
      code: 39019,
    },
    {
      name: "Ourmes",
      arName: "ورماس",
      code: 39020,
    },
    {
      name: "El Ogla",
      arName: "العقلة",
      code: 39021,
    },
    {
      name: "Mih Ouansa",
      arName: "أميه ونسة",
      code: 39022,
    },
  ],
  "40": [
    {
      name: "Aïn Touila",
      arName: "عين الطويلة",
      code: 40001,
    },
    {
      name: "Babar",
      arName: "بابار",
      code: 40002,
    },
    {
      name: "Baghai",
      arName: "بغاي",
      code: 40003,
    },
    {
      name: "Bouhmama",
      arName: "بوحمامة",
      code: 40004,
    },
    {
      name: "Chechar",
      arName: "ششار",
      code: 40005,
    },
    {
      name: "Chelia",
      arName: "شلية",
      code: 40006,
    },
    {
      name: "El Hamma",
      arName: "الحامة",
      code: 40007,
    },
    {
      name: "El Mahmal",
      arName: "المحمل",
      code: 40008,
    },
    {
      name: "El Oueldja",
      arName: "الولجة",
      code: 40009,
    },
    {
      name: "Ensigha",
      arName: "أنسيغة",
      code: 40010,
    },
    {
      name: "Kais",
      arName: "قايس",
      code: 40011,
    },
    {
      name: "Khenchela",
      arName: "خنشلة",
      code: 40012,
    },
    {
      name: "Khirane",
      arName: "خيران",
      code: 40013,
    },
    {
      name: "M'sara",
      arName: "أمصارة",
      code: 40014,
    },
    {
      name: "M'toussa",
      arName: "متوسة",
      code: 40015,
    },
    {
      name: "Ouled Rechache",
      arName: "أولاد رشاش",
      code: 40016,
    },
    {
      name: "Remila",
      arName: "الرميلة",
      code: 40017,
    },
    {
      name: "Tamza",
      arName: "طامزة",
      code: 40018,
    },
    {
      name: "Taouzient",
      arName: "تاوزيانت",
      code: 40019,
    },
    {
      name: "Yabous",
      arName: "يابوس",
      code: 40020,
    },
  ],
  "41": [
    {
      name: "Souk Ahras",
      arName: "سوق أهراس",
      code: 41001,
    },
    {
      name: "Sedrata",
      arName: "سدراتة",
      code: 41002,
    },
    {
      name: "Hanancha",
      arName: "الحنانشة",
      code: 41003,
    },
    {
      name: "Mechroha",
      arName: "المشروحة",
      code: 41004,
    },
    {
      name: "Ouled Driss",
      arName: "أولاد إدريس",
      code: 41005,
    },
    {
      name: "Tiffech",
      arName: "تيفاش",
      code: 41006,
    },
    {
      name: "Zaarouria",
      arName: "الزعرورية",
      code: 41007,
    },
    {
      name: "Taoura",
      arName: "تاورة",
      code: 41008,
    },
    {
      name: "Dréa",
      arName: "الدريعة",
      code: 41009,
    },
    {
      name: "Heddada",
      arName: "الحدادة",
      code: 41010,
    },
    {
      name: "Khedara",
      arName: "الخضارة",
      code: 41011,
    },
    {
      name: "Merahna",
      arName: "المراهنة",
      code: 41012,
    },
    {
      name: "Ouled Moumene",
      arName: "أولاد مؤمن",
      code: 41013,
    },
    {
      name: "Bir Bou Haouch",
      arName: "بئر بوحوش",
      code: 41014,
    },
    {
      name: "M'daourouch",
      arName: "مداوروش",
      code: 41015,
    },
    {
      name: "Oum El Adhaim",
      arName: "أم العظائم",
      code: 41016,
    },
    {
      name: "Aïn Zana",
      arName: "عين زانة",
      code: 41017,
    },
    {
      name: "Aïn Soltane",
      arName: "عين سلطان",
      code: 41018,
    },
    {
      name: "Ouillen",
      arName: "ويلان",
      code: 41019,
    },
    {
      name: "Sidi Fredj",
      arName: "سيدي فرج",
      code: 41020,
    },
    {
      name: "سافل الويدان",
      arName: "null",
      code: 41021,
    },
    {
      name: "Ragouba",
      arName: "الراقوبة",
      code: 41022,
    },
    {
      name: "Khemissa",
      arName: "خميسة",
      code: 41023,
    },
    {
      name: "Oued Keberit",
      arName: "وادي الكبريت",
      code: 41024,
    },
    {
      name: "Terraguelt",
      arName: "ترقالت",
      code: 41025,
    },
    {
      name: "Zouabi",
      arName: "الزوابي",
      code: 41026,
    },
  ],
  "42": [
    {
      name: "Tipaza",
      arName: "تيبازة",
      code: 42001,
    },
    {
      name: "Menaceur",
      arName: "مناصر",
      code: 42002,
    },
    {
      name: "Larhat",
      arName: "لارهاط",
      code: 42003,
    },
    {
      name: "Douaouda",
      arName: "دواودة",
      code: 42004,
    },
    {
      name: "Bourkika",
      arName: "بورقيقة",
      code: 42005,
    },
    {
      name: "Khemisti",
      arName: "خميستي",
      code: 42006,
    },
    {
      name: "Aghbal",
      arName: "أغبال",
      code: 42007,
    },
    {
      name: "Hadjout",
      arName: "حجوط",
      code: 42008,
    },
    {
      name: "Sidi Amar",
      arName: "سيدي عمار",
      code: 42009,
    },
    {
      name: "Gouraya",
      arName: "قوراية",
      code: 42010,
    },
    {
      name: "Nador",
      arName: "الناظور",
      code: 42011,
    },
    {
      name: "Chaiba",
      arName: "الشعيبة",
      code: 42012,
    },
    {
      name: "Aïn Tagourait",
      arName: "عين تقورايت",
      code: 42013,
    },
    {
      name: "Cherchell",
      arName: "شرشال",
      code: 42014,
    },
    {
      name: "Damous",
      arName: "الداموس",
      code: 42015,
    },
    {
      name: "Merad",
      arName: "مراد",
      code: 42016,
    },
    {
      name: "Fouka",
      arName: "فوكة",
      code: 42017,
    },
    {
      name: "Bou Ismaïl",
      arName: "بو إسماعيل",
      code: 42018,
    },
    {
      name: "Ahmar El Aïn",
      arName: "حمر العين",
      code: 42019,
    },
    {
      name: "Bouharoun",
      arName: "بوهارون",
      code: 42020,
    },
    {
      name: "Sidi Ghiles",
      arName: "سيدي غيلاس",
      code: 42021,
    },
    {
      name: "Messelmoun",
      arName: "مسلمون",
      code: 42022,
    },
    {
      name: "Sidi Rached",
      arName: "سيدي راشد",
      code: 42023,
    },
    {
      name: "Koléa",
      arName: "القليعة",
      code: 42024,
    },
    {
      name: "Attatba",
      arName: "حطاطبة",
      code: 42025,
    },
    {
      name: "Sidi Semiane",
      arName: "سيدي سميان",
      code: 42026,
    },
    {
      name: "Beni Milleuk",
      arName: "بني مليك",
      code: 42027,
    },
    {
      name: "Hadjeret Ennous",
      arName: "حجرة النصs",
      code: 42028,
    },
  ],
  "43": [
    {
      name: "Ahmed Rachedi",
      arName: "أحمد راشدي",
      code: 43001,
    },
    {
      name: "Aïn Beida Harriche",
      arName: "عين البيضاء حريش",
      code: 43002,
    },
    {
      name: "Aïn Mellouk",
      arName: "عين الملوك",
      code: 43003,
    },
    {
      name: "Aïn Tine",
      arName: "عين التين",
      code: 43004,
    },
    {
      name: "Amira Arrès",
      arName: "عميرة أراس",
      code: 43005,
    },
    {
      name: "Benyahia Abderrahmane",
      arName: "بن يحيى عبد الرحمان",
      code: 43006,
    },
    {
      name: "Bouhatem",
      arName: "بوحاتم",
      code: 43007,
    },
    {
      name: "Chelghoum Laid",
      arName: "شلغوم العيد",
      code: 43008,
    },
    {
      name: "Chigara",
      arName: "الشيقارة",
      code: 43009,
    },
    {
      name: "Derradji Bousselah",
      arName: "دراحي بوصلاح",
      code: 43010,
    },
    {
      name: "El Mechira",
      arName: "المشيرة",
      code: 43011,
    },
    {
      name: "Elayadi Barbes",
      arName: "العياضي برباس",
      code: 43012,
    },
    {
      name: "Ferdjioua",
      arName: "فرجيوة",
      code: 43013,
    },
    {
      name: "Grarem Gouga",
      arName: "القرارم قوقة",
      code: 43014,
    },
    {
      name: "Hamala",
      arName: "حمالة",
      code: 43015,
    },
    {
      name: "Mila",
      arName: "ميلة",
      code: 43016,
    },
    {
      name: "Minar Zarza",
      arName: "مينار زارزة",
      code: 43017,
    },
    {
      name: "Oued Athmania",
      arName: "وادي العثمانية",
      code: 43018,
    },
    {
      name: "Oued Endja",
      arName: "وادي النجاء",
      code: 43019,
    },
    {
      name: "Oued Seguen",
      arName: "وادي سقان",
      code: 43020,
    },
    {
      name: "Ouled Khalouf",
      arName: "أولاد خلوف",
      code: 43021,
    },
    {
      name: "Rouached",
      arName: "الرواشد",
      code: 43022,
    },
    {
      name: "Sidi Khelifa",
      arName: "سيدي خليفة",
      code: 43023,
    },
    {
      name: "Sidi Merouane",
      arName: "سيدي مروان",
      code: 43024,
    },
    {
      name: "Tadjenanet",
      arName: "تاجنانت",
      code: 43025,
    },
    {
      name: "Tassadane Haddada",
      arName: "تسدان حدادة",
      code: 43026,
    },
    {
      name: "Teleghma",
      arName: "التلاغمة",
      code: 43027,
    },
    {
      name: "Terrai Bainen",
      arName: "ترعي باينان",
      code: 43028,
    },
    {
      name: "Tessala Lemtaï",
      arName: "تسالة لمطاعي",
      code: 43029,
    },
    {
      name: "Tiberguent",
      arName: "تبرقنت",
      code: 43030,
    },
    {
      name: "Yahia Beni Guecha",
      arName: "يحيى بن قشة",
      code: 43031,
    },
    {
      name: "Zeghaia",
      arName: "زغاية",
      code: 43032,
    },
  ],
  "44": [
    {
      name: "Aïn Beniane",
      arName: "عين بنيان",
      code: 44001,
    },
    {
      name: "Aïn Bouyahia",
      arName: "عين بويحيى",
      code: 44002,
    },
    {
      name: "Aïn Defla",
      arName: "عين الدفلى",
      code: 44003,
    },
    {
      name: "Aïn Lechiekh",
      arName: "عين لشياخ",
      code: 44004,
    },
    {
      name: "Aïn Soltane",
      arName: "عين سلطان",
      code: 44005,
    },
    {
      name: "Aïn Torki",
      arName: "عين تركي",
      code: 44006,
    },
    {
      name: "Arib",
      arName: "عريب",
      code: 44007,
    },
    {
      name: "Bathia",
      arName: "بطحية",
      code: 44008,
    },
    {
      name: "Belaas",
      arName: "بلعاص",
      code: 44009,
    },
    {
      name: "Ben Allal",
      arName: "بن علال",
      code: 44010,
    },
    {
      name: "Birbouche",
      arName: "بربوش",
      code: 44011,
    },
    {
      name: "Bir Ould Khelifa",
      arName: "بئر ولد خليفة",
      code: 44012,
    },
    {
      name: "Bordj Emir Khaled",
      arName: "برج الأمير خالد",
      code: 44013,
    },
    {
      name: "Boumedfaa",
      arName: "بومدفع",
      code: 44014,
    },
    {
      name: "Bourached",
      arName: "بوراشد",
      code: 44015,
    },
    {
      name: "Djelida",
      arName: "جليدة",
      code: 44016,
    },
    {
      name: "Djemaa Ouled Cheikh",
      arName: "جمعة ولاد الشيخ",
      code: 44017,
    },
    {
      name: "Djendel",
      arName: "جندل",
      code: 44018,
    },
    {
      name: "El Abadia",
      arName: "العبادية",
      code: 44019,
    },
    {
      name: "El Amra",
      arName: "العامرة",
      code: 44020,
    },
    {
      name: "El Attaf",
      arName: "العطاف",
      code: 44021,
    },
    {
      name: "El Hassania",
      arName: "الحسنية",
      code: 44022,
    },
    {
      name: "El Maine",
      arName: "الماين",
      code: 44023,
    },
    {
      name: "Hammam Righa",
      arName: "حمام ريغة",
      code: 44024,
    },
    {
      name: "Hoceinia",
      arName: "الحسينية",
      code: 44025,
    },
    {
      name: "Khemis Miliana",
      arName: "خميس مليانة",
      code: 44026,
    },
    {
      name: "Mekhatria",
      arName: "المخاطرية",
      code: 44027,
    },
    {
      name: "Miliana",
      arName: "مليانة",
      code: 44028,
    },
    {
      name: "Oued Chorfa",
      arName: "واد الشرفاء",
      code: 44029,
    },
    {
      name: "Oued Djemaa",
      arName: "وادي الجمعة",
      code: 44030,
    },
    {
      name: "Rouina",
      arName: "الروينة",
      code: 44031,
    },
    {
      name: "Sidi Lakhdar",
      arName: "سيدي الأخضر",
      code: 44032,
    },
    {
      name: "Tacheta Zougagha",
      arName: "تاشتة زقاغة",
      code: 44033,
    },
    {
      name: "Tarik Ibn Ziad",
      arName: "طارق بن زياد",
      code: 44034,
    },
    {
      name: "Tiberkanine",
      arName: "تيبركانين",
      code: 44035,
    },
    {
      name: "Zeddine",
      arName: "زدين",
      code: 44036,
    },
  ],
  "45": [
    {
      name: "Naâma",
      arName: "النعامة",
      code: 45001,
    },
    {
      name: "Mecheria",
      arName: "المشرية",
      code: 45002,
    },
    {
      name: "Aïn Sefra",
      arName: "عين الصفراء",
      code: 45003,
    },
    {
      name: "Tiout",
      arName: "تيوت",
      code: 45004,
    },
    {
      name: "Sfissifa",
      arName: "صفيصيفة",
      code: 45005,
    },
    {
      name: "Moghrar",
      arName: "مغرار",
      code: 45006,
    },
    {
      name: "Assela",
      arName: "عسلة",
      code: 45007,
    },
    {
      name: "Djeniene Bourezg",
      arName: "جنين بورزق",
      code: 45008,
    },
    {
      name: "Aïn Ben Khelil",
      arName: "عين بن خليل",
      code: 45009,
    },
    {
      name: "Makman Ben Amer",
      arName: "مكمن بن عمار",
      code: 45010,
    },
    {
      name: "Kasdir",
      arName: "القصدير",
      code: 45011,
    },
    {
      name: "El Biod",
      arName: "البيوض",
      code: 45012,
    },
  ],
  "46": [
    {
      name: "Aghlal",
      arName: "آغلال",
      code: 46001,
    },
    {
      name: "Aïn El Arbaa",
      arName: "عين الأربعاءعين الأربعاء",
      code: 46002,
    },
    {
      name: "Aïn Kihal",
      arName: "عين الكيحل",
      code: 46003,
    },
    {
      name: "Aïn Témouchent",
      arName: "عين تموشنت",
      code: 46004,
    },
    {
      name: "Aïn Tolba",
      arName: "عين الطلبة",
      code: 46005,
    },
    {
      name: "Aoubellil",
      arName: "عقب الليل",
      code: 46006,
    },
    {
      name: "Beni Saf",
      arName: "بني صاف",
      code: 46007,
    },
    {
      name: "Bouzedjar",
      arName: "بوزجار",
      code: 46008,
    },
    {
      name: "Chaabat El Leham",
      arName: "شعبة اللحم",
      code: 46009,
    },
    {
      name: "Chentouf",
      arName: "شنتوف",
      code: 46010,
    },
    {
      name: "El Amria",
      arName: "العامرية",
      code: 46011,
    },
    {
      name: "El Emir Abdelkader",
      arName: "الأمير عبد القادر",
      code: 46012,
    },
    {
      name: "El Malah",
      arName: "المالح",
      code: 46013,
    },
    {
      name: "El Messaid",
      arName: "امسعيد",
      code: 46014,
    },
    {
      name: "Hammam Bouhadjar",
      arName: "حمام بوحجر",
      code: 46015,
    },
    {
      name: "Hassasna",
      arName: "الحساسنة",
      code: 46016,
    },
    {
      name: "Hassi El Ghella",
      arName: "حاسي الغلة",
      code: 46017,
    },
    {
      name: "Oued Berkeche",
      arName: "وادي برقش",
      code: 46018,
    },
    {
      name: "Oued Sabah",
      arName: "وادي الصباح",
      code: 46019,
    },
    {
      name: "Ouled Boudjemaa",
      arName: "اولاد بوجمعة",
      code: 46020,
    },
    {
      name: "Ouled Kihal",
      arName: "اولاد الكيحل",
      code: 46021,
    },
    {
      name: "Oulhaça El Gheraba",
      arName: "ولهاصة",
      code: 46022,
    },
    {
      name: "Sidi Ben Adda",
      arName: "سيدي بن عدة",
      code: 46023,
    },
    {
      name: "Sidi Boumedienne",
      arName: "سيدي بومدين",
      code: 46024,
    },
    {
      name: "Sidi Ouriache",
      arName: "سيدي أورياش",
      code: 46025,
    },
    {
      name: "Sidi Safi",
      arName: "سيدي الصافي",
      code: 46026,
    },
    {
      name: "Tamzoura",
      arName: "تامزوغة",
      code: 46027,
    },
    {
      name: "Terga",
      arName: "تارقة",
      code: 46028,
    },
  ],
  "47": [
    {
      name: "Berriane",
      arName: "بريان",
      code: 47001,
    },
    {
      name: "Bounoura",
      arName: "بنورة",
      code: 47002,
    },
    {
      name: "Dhayet Bendhahoua",
      arName: "ضاية بن ضحوة",
      code: 47003,
    },
    {
      name: "El Atteuf",
      arName: "العطف",
      code: 47004,
    },
    {
      name: "El Guerrara",
      arName: "القرارة",
      code: 47005,
    },
    {
      name: "Ghardaïa",
      arName: "غرداية",
      code: 47006,
    },
    {
      name: "Mansoura",
      arName: "منصورة",
      code: 47007,
    },
    {
      name: "Metlili",
      arName: "متليلي",
      code: 47008,
    },
    {
      name: "Sebseb",
      arName: "سبسب",
      code: 47009,
    },
    {
      name: "Zelfana",
      arName: "زلفانة",
      code: 47010,
    },
  ],
  "48": [
    {
      name: "Aïn Rahma",
      arName: "عين الرحمة",
      code: 48001,
    },
    {
      name: "Aïn Tarek",
      arName: "عين طارق",
      code: 48002,
    },
    {
      name: "Ammi Moussa",
      arName: "عمي موسى",
      code: 48003,
    },
    {
      name: "Belassel Bouzegza",
      arName: "بلعسل بوزغزة ",
      code: 48004,
    },
    {
      name: "Bendaoud",
      arName: "بن داود",
      code: 48005,
    },
    {
      name: "Beni Dergoun",
      arName: "بني درقن",
      code: 48006,
    },
    {
      name: "Beni Zentis",
      arName: "بني زنطيس",
      code: 48007,
    },
    {
      name: "Dar Ben Abdellah",
      arName: "دار بن عبد الله",
      code: 48008,
    },
    {
      name: "Djidioua",
      arName: "جديوية",
      code: 48009,
    },
    {
      name: "El Guettar",
      arName: "القطار",
      code: 48010,
    },
    {
      name: "El Hamadna",
      arName: "الحمادنة",
      code: 48011,
    },
    {
      name: "El Hassi",
      arName: "الحاسي",
      code: 48012,
    },
    {
      name: "El Matmar",
      arName: "المطمر",
      code: 48013,
    },
    {
      name: "El Ouldja",
      arName: "الولجة",
      code: 48014,
    },
    {
      name: "Had Echkalla",
      arName: "حد الشكالة",
      code: 48015,
    },
    {
      name: "Hamri",
      arName: "حمري",
      code: 48016,
    },
    {
      name: "Kalaa",
      arName: "القلعة",
      code: 48017,
    },
    {
      name: "Lahlef",
      arName: "لحلاف",
      code: 48018,
    },
    {
      name: "Mazouna",
      arName: "مازونة",
      code: 48019,
    },
    {
      name: "Mediouna",
      arName: "مديونة",
      code: 48020,
    },
    {
      name: "Mendes",
      arName: "منداس",
      code: 48021,
    },
    {
      name: "Merdja Sidi Abed",
      arName: "مرجة سيدي عابد",
      code: 48022,
    },
    {
      name: "Ouarizane",
      arName: "واريزان",
      code: 48023,
    },
    {
      name: "Oued Essalem",
      arName: "واد السلام",
      code: 48024,
    },
    {
      name: "Oued Rhiou",
      arName: "وادي ارهيو",
      code: 48025,
    },
    {
      name: "Ouled Aiche",
      arName: "أولاد يعيش",
      code: 48026,
    },
    {
      name: "Oued El Djemaa",
      arName: "واد الجمعة",
      code: 48027,
    },
    {
      name: "Ouled Sidi Mihoub",
      arName: "أولاد سيدي الميهوب",
      code: 48028,
    },
    {
      name: "Ramka",
      arName: "الرمكة",
      code: 48029,
    },
    {
      name: "Relizane",
      arName: "غليزان",
      code: 48030,
    },
    {
      name: "Sidi Khettab",
      arName: "سيدي خطاب",
      code: 48031,
    },
    {
      name: "Sidi Lazreg",
      arName: "سيدي لزرق",
      code: 48032,
    },
    {
      name: "Sidi M'hamed Ben Ali",
      arName: "سيدي امحمد بن علي",
      code: 48033,
    },
    {
      name: "Sidi M'hamed Benaouda",
      arName: "سيدي محمد بن عودة",
      code: 48034,
    },
    {
      name: "Sidi Saada",
      arName: "سيدي سعادة",
      code: 48035,
    },
    {
      name: "Souk El Had",
      arName: "سوق الحد",
      code: 48036,
    },
    {
      name: "Yellel",
      arName: "يلل",
      code: 48037,
    },
    {
      name: "Zemmora",
      arName: "زمورة",
      code: 48038,
    },
  ],
  "49": [
    {
      name: "Aougrout",
      arName: "أوﻗﺮت",
      code: 49001,
    },
    {
      name: "Charouine",
      arName: "ﺷﺮوﻳﻦ",
      code: 49002,
    },
    {
      name: "Deldoul",
      arName: "دﻟﺪول",
      code: 49003,
    },
    {
      name: "Ksar Kaddour",
      arName: "قصر قدور",
      code: 49004,
    },
    {
      name: "Metarfa",
      arName: "المطارفة",
      code: 49005,
    },
    {
      name: "Ouled Aïssa",
      arName: "وﻻد ﻋﻴﺴﻰ",
      code: 49006,
    },
    {
      name: "Ouled Saïd",
      arName: "أولاد السعيد",
      code: 49007,
    },
    {
      name: "Talmine",
      arName: "ﻃﺎﻟﻤﻴﻦ",
      code: 49008,
    },
    {
      name: "Timimoun",
      arName: "ﺗﻴﻤﻴﻤﻮن",
      code: 49009,
    },
    {
      name: "Tinerkouk",
      arName: "تينركوك",
      code: 49010,
    },
  ],
  "50": [
    {
      name: "Bordj Badji Mokhtar",
      arName: "ﺑﺮج ﺑﺎﺟﻰ ﻣﺨﺘﺎر",
      code: 50001,
    },
    {
      name: "Timiaouine",
      arName: "ﺗﻴﻤﻴﺎوﻳﻦ",
      code: 50002,
    },
  ],
  "51": [
    {
      name: "Besbes",
      arName: "البسباس",
      code: 51001,
    },
    {
      name: "Ech Chaïba",
      arName: "الشعيبة",
      code: 51002,
    },
    {
      name: "Doucen",
      arName: "الدوسن",
      code: 51003,
    },
    {
      name: "Ouled Djellal",
      arName: "أولاد جلال",
      code: 51004,
    },
    {
      name: "Sidi Khaled",
      arName: "سيدي خالد",
      code: 51005,
    },
    {
      name: "Ras El Miaad",
      arName: "راس الميعاد",
      code: 51006,
    },
  ],
  "52": [
    {
      name: "Béni Abbès",
      arName: "بني عباس",
      code: 52001,
    },
    {
      name: "Beni Ikhlef",
      arName: "بني يخلف",
      code: 52002,
    },
    {
      name: "El Ouata",
      arName: "الواتة",
      code: 52003,
    },
    {
      name: "Igli",
      arName: "إقلي",
      code: 52004,
    },
    {
      name: "Kerzaz",
      arName: "كرزاز",
      code: 52005,
    },
    {
      name: "Ksabi",
      arName: "القصابي",
      code: 52006,
    },
    {
      name: "Oulad Khodeir",
      arName: "أولاد خضير",
      code: 52007,
    },
    {
      name: "Tabelbala",
      arName: "تبلبالة",
      code: 52008,
    },
    {
      name: "Tamtert",
      arName: "تامترت",
      code: 52009,
    },
    {
      name: "Timoudi",
      arName: "تيمودي",
      code: 52010,
    },
  ],
  "53": [
    {
      name: "In Salah",
      arName: "عين صالح",
      code: 53001,
    },
    {
      name: "Foggaret Ezzaouia",
      arName: "فقارة الزوى",
      code: 53002,
    },
    {
      name: "In Ghar",
      arName: "إن غار",
      code: 53003,
    },
  ],
  "54": [
    {
      name: "In Guezzam",
      arName: "عين قزام",
      code: 54001,
    },
    {
      name: "Tin Zaouatine",
      arName: "تين زاوتين",
      code: 54002,
    },
  ],
  "55": [
    {
      name: "Benaceur",
      arName: "ﺑﻦ ﻧﺎﺻﺮ",
      code: 55001,
    },
    {
      name: "Blidet Amor",
      arName: "ﺑﻠﻴﺪة ﻋﺎﻣﺮ",
      code: 55002,
    },
    {
      name: "El Allia",
      arName: "العالية",
      code: 55003,
    },
    {
      name: "El Hadjira",
      arName: "الحجيرة",
      code: 55004,
    },
    {
      name: "Megarine",
      arName: "اﻟﻤﻘﺎرﻳﻦ",
      code: 55005,
    },
    {
      name: "M'naguer",
      arName: "اﻟﻤﻨﻘﺮ",
      code: 55006,
    },
    {
      name: "Nezla",
      arName: "ﻧﺰﻟﺔ",
      code: 55007,
    },
    {
      name: "Sidi Slimane",
      arName: "ﺳﻴﺪي ﺳﻠﻴﻤﺎن",
      code: 55008,
    },
    {
      name: "Taibet",
      arName: "اﻟﻄﻴﺒﺎت",
      code: 55009,
    },
    {
      name: "Temacine",
      arName: "ﺗﻤﺎﺳﻴﻦ",
      code: 55010,
    },
    {
      name: "Tebesbest",
      arName: "ﺗﻴﺒسﺴﺖ",
      code: 55011,
    },
    {
      name: "Touggourt",
      arName: "تقرت",
      code: 55012,
    },
    {
      name: "Zaouia El Abidia",
      arName: "ﻟﺰاوﻳﺔ اﻟﻌﺎﺑﺪﻳﺔ",
      code: 55013,
    },
  ],
  "56": [
    {
      name: "Djanet",
      arName: "ﺟﺎﻧﺖ",
      code: 56001,
    },
    {
      name: "Bordj El Gaouas",
      arName: "ﺑﺮ ج اﻟﺤﻮاس",
      code: 56002,
    },
  ],
  "57": [
    {
      name: "Djamaa",
      arName: "جامعة",
      code: 57001,
    },
    {
      name: "El M'ghair",
      arName: "المغير",
      code: 57002,
    },
    {
      name: "Merara",
      arName: "المرارة",
      code: 57003,
    },
    {
      name: "Oum Touyour",
      arName: "أم الطيور",
      code: 57004,
    },
    {
      name: "Sidi Amrane",
      arName: "سيدي عمران",
      code: 57005,
    },
    {
      name: "Sidi Khellil",
      arName: "سيدي خليل",
      code: 57006,
    },
    {
      name: "Still",
      arName: "سطيل",
      code: 57007,
    },
    {
      name: "Tendla",
      arName: "تندلة",
      code: 57008,
    },
  ],
  "58": [
    {
      name: "El Menia",
      arName: "المنيعة",
      code: 58001,
    },
    {
      name: "Hassi Gara",
      arName: "حاسي القارة",
      code: 58002,
    },
    {
      name: "Hassi Fehal",
      arName: "حاسي الفحل",
      code: 58003,
    },
  ],
};
export default townsData;
