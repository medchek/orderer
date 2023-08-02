
// replace regex ("\d+":\s)(\{\n\s+[0-9a-zÀ-ÿ\u0600-\u06FF_"':\s\n,\d-]+\})

export interface TownSeed {
  [wilayaCode: string]: {
    name: string;
    arName: string;
    code: number;
  }[]
}

/**
 * List of the towns by wilaya code
 */
const townsData: TownSeed = {
  "1": [
    {
      "name": "adrar",
      "arName": "أدرار",
      "code": 1001
    },
    {
      "name": "tamest",
      "arName": "تامست",
      "code": 1002
    },
    {
      "name": "charouine",
      "arName": "شروين",
      "code": 1003
    },
    {
      "name": "reggane",
      "arName": "رقان",
      "code": 1004
    },
    {
      "name": "in zghmir",
      "arName": "ان زقمير",
      "code": 1005
    },
    {
      "name": "tit",
      "arName": "تيط",
      "code": 1006
    },
    {
      "name": "ksar kaddour",
      "arName": "قصر قدور",
      "code": 1007
    },
    {
      "name": "tsabit",
      "arName": "تسابيت",
      "code": 1008
    },
    {
      "name": "timimoun",
      "arName": "تيميمون",
      "code": 1009
    },
    {
      "name": "ouled saïd",
      "arName": "أوالد السعيد",
      "code": 1010
    },
    {
      "name": "zaouiet kounta",
      "arName": "زاوية كنتة",
      "code": 1011
    },
    {
      "name": "aoulef",
      "arName": "أولف",
      "code": 1012
    },
    {
      "name": "tamekten",
      "arName": "تمقطن",
      "code": 1013
    },
    {
      "name": "tamantit",
      "arName": "تمنطيط",
      "code": 1014
    },
    {
      "name": "fenoughil",
      "arName": "فنوغيل",
      "code": 1015
    },
    {
      "name": "tinerkouk",
      "arName": "تينركوك",
      "code": 1016
    },
    {
      "name": "deldoul",
      "arName": "دلدول",
      "code": 1017
    },
    {
      "name": "sali",
      "arName": "سالى",
      "code": 1018
    },
    {
      "name": "akabli",
      "arName": "أقبلى",
      "code": 1019
    },
    {
      "name": "metarfa",
      "arName": "الطارفة",
      "code": 1020
    },
    {
      "name": "ouled ahmed tammi",
      "arName": "أوالد أحمد تيمى",
      "code": 1021
    },
    {
      "name": "bouda",
      "arName": "بودة",
      "code": 1022
    },
    {
      "name": "aougrout",
      "arName": "أوقروت",
      "code": 1023
    },
    {
      "name": "talmine",
      "arName": "طلمين",
      "code": 1024
    },
    {
      "name": "sebaa",
      "arName": "السبع",
      "code": 1025
    },
    {
      "name": "ouled aïssa",
      "arName": "أوالد عيسى",
      "code": 1026
    },
    {
      "name": "timiaouine",
      "arName": "تيمياوين",
      "code": 1027
    }
  ],
  "2": [
    {
      "name": "chlef",
      "arName": "الشلف",
      "code": 2001
    },
    {
      "name": "ténès",
      "arName": "تنس",
      "code": 2002
    },
    {
      "name": "bénairia",
      "arName": "بنايرية",
      "code": 2003
    },
    {
      "name": "el karimia",
      "arName": "الكريمية",
      "code": 2004
    },
    {
      "name": "tadjena",
      "arName": "تأجنة",
      "code": 2005
    },
    {
      "name": "taougrite",
      "arName": "تاوقريت",
      "code": 2006
    },
    {
      "name": "beni haoua",
      "arName": "بنى حواء",
      "code": 2007
    },
    {
      "name": "sobha",
      "arName": "صبحة",
      "code": 2008
    },
    {
      "name": "harchoun",
      "arName": "حرشون",
      "code": 2009
    },
    {
      "name": "ouled fares",
      "arName": "أولاد فارس",
      "code": 2010
    },
    {
      "name": "sidi akkacha",
      "arName": "سيدى عكاشة",
      "code": 2011
    },
    {
      "name": "boukadir",
      "arName": "بوقادير",
      "code": 2012
    },
    {
      "name": "beni rached",
      "arName": "بنى راشد",
      "code": 2013
    },
    {
      "name": "talassa",
      "arName": "تلعصة",
      "code": 2014
    },
    {
      "name": "harenfa",
      "arName": "الھرنفة",
      "code": 2015
    },
    {
      "name": "oued goussine",
      "arName": "وادى قوسين",
      "code": 2016
    },
    {
      "name": "dahra",
      "arName": "الظھرة",
      "code": 2017
    },
    {
      "name": "ouled abbes",
      "arName": "أولاد عباس",
      "code": 2018
    },
    {
      "name": "sendjas",
      "arName": "السنجاس",
      "code": 2019
    },
    {
      "name": "zeboudja",
      "arName": "الزبوجة",
      "code": 2020
    },
    {
      "name": "oued sly",
      "arName": "وادى سلى",
      "code": 2021
    },
    {
      "name": "abou el hassan",
      "arName": "أبو الحسن",
      "code": 2022
    },
    {
      "name": "el marsa",
      "arName": "المرسى",
      "code": 2023
    },
    {
      "name": "chettia",
      "arName": "الشطية",
      "code": 2024
    },
    {
      "name": "sidi abderrahmane",
      "arName": "سيدي عبد الرحمان",
      "code": 2025
    },
    {
      "name": "moussadek",
      "arName": "مصدق",
      "code": 2026
    },
    {
      "name": "el hadjadj",
      "arName": "الحجاج",
      "code": 2027
    },
    {
      "name": "labiod medjadja",
      "arName": "الابيض مجاجة",
      "code": 2028
    },
    {
      "name": "oued fodda",
      "arName": "وادى الفضة",
      "code": 2029
    },
    {
      "name": "ouled ben abdelkader",
      "arName": "أولاد بن عبد القادر",
      "code": 2030
    },
    {
      "name": "bouzeghaia",
      "arName": "بوزغاية",
      "code": 2031
    },
    {
      "name": "aïn merane",
      "arName": "عين مران",
      "code": 2032
    },
    {
      "name": "oum drou",
      "arName": "أم الذروع",
      "code": 2033
    },
    {
      "name": "breira",
      "arName": "بريرة",
      "code": 2034
    },
    {
      "name": "beni bouateb",
      "arName": "بنى بوعتاب",
      "code": 2035
    }
  ],
  "3": [
    {
      "name": "laghouat",
      "arName": "الأغواط",
      "code": 3001
    },
    {
      "name": "ksar el hirane",
      "arName": "قصر الحيران",
      "code": 3002
    },
    {
      "name": "bennasser benchohra",
      "arName": "بن ناصر بن شهرة",
      "code": 3003
    },
    {
      "name": "sidi makhlouf",
      "arName": "سيدي مخلوف",
      "code": 3004
    },
    {
      "name": "hassi delaa",
      "arName": "حاسي دلاعة",
      "code": 3005
    },
    {
      "name": "hassi r'mel",
      "arName": "حاسي الرمل",
      "code": 3006
    },
    {
      "name": "aïn madhi",
      "arName": "عين ماضي",
      "code": 3007
    },
    {
      "name": "tadjemout",
      "arName": "تاجموت",
      "code": 3008
    },
    {
      "name": "kheneg",
      "arName": "الخنق",
      "code": 3009
    },
    {
      "name": "gueltat sidi saad",
      "arName": "قلتة سيدي سعد",
      "code": 3010
    },
    {
      "name": "aïn sidi ali",
      "arName": "عين سيدي علي",
      "code": 3011
    },
    {
      "name": "beidha",
      "arName": "البيضاء",
      "code": 3012
    },
    {
      "name": "brida",
      "arName": "بريدة",
      "code": 3013
    },
    {
      "name": "el ghicha",
      "arName": "الغيشة",
      "code": 3014
    },
    {
      "name": "hadj mechri",
      "arName": "الحاج المشري",
      "code": 3015
    },
    {
      "name": "sebgag",
      "arName": "سبقاق",
      "code": 3016
    },
    {
      "name": "taouiala",
      "arName": "تاويالة",
      "code": 3017
    },
    {
      "name": "tadjrouna",
      "arName": "تاجرونة",
      "code": 3018
    },
    {
      "name": "aflou",
      "arName": "آفلو",
      "code": 3019
    },
    {
      "name": "el assafia",
      "arName": "العسافية",
      "code": 3020
    },
    {
      "name": "oued morra",
      "arName": "وادي مرة",
      "code": 3021
    },
    {
      "name": "oued m'zi",
      "arName": "وادي مزي",
      "code": 3022
    },
    {
      "name": "el houaita",
      "arName": "الحوايطة",
      "code": 3023
    },
    {
      "name": "sidi bouzid",
      "arName": "سيدي بوزيد",
      "code": 3024
    }
  ],
  "4": [
    {
      "name": "oum el bouaghi",
      "arName": "أم البواقي",
      "code": 4001
    },
    {
      "name": "aïn beïda",
      "arName": "عين البيضاء",
      "code": 4002
    },
    {
      "name": "aïn m'lila",
      "arName": "عين مليلة",
      "code": 4003
    },
    {
      "name": "behir chergui",
      "arName": "بحير شرقي",
      "code": 4004
    },
    {
      "name": "el amiria",
      "arName": "العامرية",
      "code": 4005
    },
    {
      "name": "sigus",
      "arName": "سيقوس",
      "code": 4006
    },
    {
      "name": "el belala",
      "arName": "البلالة",
      "code": 4007
    },
    {
      "name": "aïn babouche",
      "arName": "عين بابوش",
      "code": 4008
    },
    {
      "name": "berriche",
      "arName": "بريش",
      "code": 4009
    },
    {
      "name": "ouled hamla",
      "arName": "أولاد حملة",
      "code": 4010
    },
    {
      "name": "dhalaa",
      "arName": "الضلعة",
      "code": 4011
    },
    {
      "name": "aïn kercha",
      "arName": "عين كرشة",
      "code": 4012
    },
    {
      "name": "hanchir toumghani",
      "arName": "هنشير تومغني",
      "code": 4013
    },
    {
      "name": "el djazia",
      "arName": "الجازية",
      "code": 4014
    },
    {
      "name": "aïn diss",
      "arName": "عين الديس",
      "code": 4015
    },
    {
      "name": "fkirina",
      "arName": "فكرينة",
      "code": 4016
    },
    {
      "name": "souk naamane",
      "arName": "سوق نعمان",
      "code": 4017
    },
    {
      "name": "zorg",
      "arName": "الزرق",
      "code": 4018
    },
    {
      "name": "el fedjoudj boughrara saoudi",
      "arName": "الفجوج بوغرارة سعودي",
      "code": 4019
    },
    {
      "name": "ouled zouaï",
      "arName": "أولاد زواي",
      "code": 4020
    },
    {
      "name": "bir chouhada",
      "arName": "بئر الشهداء",
      "code": 4021
    },
    {
      "name": "ksar sbahi",
      "arName": "قصر صباحي",
      "code": 4022
    },
    {
      "name": "oued nini",
      "arName": "وادي نيني",
      "code": 4023
    },
    {
      "name": "meskiana",
      "arName": "مسكيانة",
      "code": 4024
    },
    {
      "name": "aïn fakroun",
      "arName": "عين فكرون",
      "code": 4025
    },
    {
      "name": "rahia",
      "arName": "الراحية",
      "code": 4026
    },
    {
      "name": "aïn zitoun",
      "arName": "عين الزيتون",
      "code": 4027
    },
    {
      "name": "ouled gacem",
      "arName": "أولاد قاسم",
      "code": 4028
    },
    {
      "name": "el harmilia",
      "arName": "الحرميلية",
      "code": 4029
    }
  ],
  "5": [
    {
      "name": "aïn djasser",
      "arName": "عين جاسر",
      "code": 5001
    },
    {
      "name": "aïn touta",
      "arName": "عين التوتة",
      "code": 5002
    },
    {
      "name": "aïn yagout",
      "arName": "عين ياقوت",
      "code": 5003
    },
    {
      "name": "amantan",
      "arName": "أمنطان",
      "code": 5004
    },
    {
      "name": "amdoukal",
      "arName": "أمدوكال",
      "code": 5005
    },
    {
      "name": "arris",
      "arName": "آريس",
      "code": 5006
    },
    {
      "name": "ngaous",
      "arName": "نقاوس",
      "code": 5007
    },
    {
      "name": "batna",
      "arName": "باتنة",
      "code": 5008
    },
    {
      "name": "ben foudhala el hakania",
      "arName": "بني فضالة الحقانية",
      "code": 5009
    },
    {
      "name": "bitam",
      "arName": "بيطام",
      "code": 5010
    },
    {
      "name": "boulhilat",
      "arName": "بولهيلات",
      "code": 5011
    },
    {
      "name": "boumagueur",
      "arName": "بومقر",
      "code": 5012
    },
    {
      "name": "boumia",
      "arName": "بومية",
      "code": 5013
    },
    {
      "name": "bouzina",
      "arName": "بوزينة",
      "code": 5014
    },
    {
      "name": "djerma",
      "arName": "جرمة ",
      "code": 5015
    },
    {
      "name": "djezzar",
      "arName": "الجزار",
      "code": 5016
    },
    {
      "name": "el hassi",
      "arName": "الحاسي",
      "code": 5017
    },
    {
      "name": "el madher",
      "arName": "المعذر",
      "code": 5018
    },
    {
      "name": "fesdis",
      "arName": "فسديس",
      "code": 5019
    },
    {
      "name": "foum toub",
      "arName": "فم الطوب",
      "code": 5020
    },
    {
      "name": "ghassira",
      "arName": "غسيرة",
      "code": 5021
    },
    {
      "name": "chemora",
      "arName": "الشمرة",
      "code": 5022
    },
    {
      "name": "gosbat",
      "arName": "القصبات",
      "code": 5023
    },
    {
      "name": "guigba",
      "arName": "القيقبة",
      "code": 5024
    },
    {
      "name": "hidoussa",
      "arName": "حيدوسة",
      "code": 5025
    },
    {
      "name": "ichmoul",
      "arName": "إشمول",
      "code": 5026
    },
    {
      "name": "inoughissen",
      "arName": "إينوغيسن",
      "code": 5027
    },
    {
      "name": "kimmel",
      "arName": "كيمل",
      "code": 5028
    },
    {
      "name": "ksar bellezma",
      "arName": "قصر بلزمة",
      "code": 5029
    },
    {
      "name": "larbaâ",
      "arName": "لارباع",
      "code": 5030
    },
    {
      "name": "lazrou",
      "arName": "لازرو",
      "code": 5031
    },
    {
      "name": "lemsane",
      "arName": "لمسان",
      "code": 5032
    },
    {
      "name": "mâafa",
      "arName": "معافة",
      "code": 5033
    },
    {
      "name": "menâa",
      "arName": "منعة",
      "code": 5034
    },
    {
      "name": "merouana",
      "arName": "مروانة",
      "code": 5035
    },
    {
      "name": "metkaouak",
      "arName": "متكعوك",
      "code": 5036
    },
    {
      "name": "n'gaous",
      "arName": "نقاوس",
      "code": 5037
    },
    {
      "name": "chir",
      "arName": "شير",
      "code": 5038
    },
    {
      "name": "oued chaâba",
      "arName": "وادي الشعبة",
      "code": 5039
    },
    {
      "name": "oued el ma",
      "arName": "وادي الماء",
      "code": 5040
    },
    {
      "name": "oued taga",
      "arName": "وادي الطاقة",
      "code": 5041
    },
    {
      "name": "ouled ammar",
      "arName": "أولاد عمار",
      "code": 5042
    },
    {
      "name": "ouled aouf",
      "arName": "أولاد عوف",
      "code": 5043
    },
    {
      "name": "ouled fadel",
      "arName": "أولاد فاضل",
      "code": 5044
    },
    {
      "name": "ouled sellam",
      "arName": "أولاد سلام",
      "code": 5045
    },
    {
      "name": "ouled si slimane",
      "arName": "أولاد سي سليمان",
      "code": 5046
    },
    {
      "name": "ouyoun el assafir",
      "arName": "عيون العصافير",
      "code": 5047
    },
    {
      "name": "rahbat",
      "arName": "الرحبات",
      "code": 5048
    },
    {
      "name": "ras el aioun",
      "arName": "رأس العيون",
      "code": 5049
    },
    {
      "name": "sefiane",
      "arName": "سفيان",
      "code": 5050
    },
    {
      "name": "seggana",
      "arName": "سقانة",
      "code": 5051
    },
    {
      "name": "seriana",
      "arName": "سريانة",
      "code": 5052
    },
    {
      "name": "talkhamt",
      "arName": "تالخمت",
      "code": 5053
    },
    {
      "name": "taxlent",
      "arName": "تاكسلانت",
      "code": 5054
    },
    {
      "name": "tazoult",
      "arName": "تازولت",
      "code": 5055
    },
    {
      "name": "teniet el abed",
      "arName": "ثنية العابد",
      "code": 5056
    },
    {
      "name": "tighanimine",
      "arName": "تيغانمين",
      "code": 5057
    },
    {
      "name": "tigherghar",
      "arName": "تيغرغار",
      "code": 5058
    },
    {
      "name": "tilatou",
      "arName": "تيلاطو",
      "code": 5059
    },
    {
      "name": "timgad",
      "arName": "تيمقاد",
      "code": 5060
    },
    {
      "name": "tkout",
      "arName": "تكوت",
      "code": 5061
    },
    {
      "name": "zana el beida",
      "arName": "زانة البيضاء",
      "code": 5062
    }
  ],
  "6": [
    {
      "name": "béjaïa",
      "arName": "بجاية",
      "code": 6001
    },
    {
      "name": "amizour",
      "arName": "أميزور",
      "code": 6002
    },
    {
      "name": "ferraoun",
      "arName": "فرعون",
      "code": 6003
    },
    {
      "name": "taourirt ighil",
      "arName": "تاوريرت آغيل",
      "code": 6004
    },
    {
      "name": "chellata",
      "arName": "شلاطة",
      "code": 6005
    },
    {
      "name": "tamokra",
      "arName": "تمقرة",
      "code": 6006
    },
    {
      "name": "timezrit",
      "arName": "تيمزريت",
      "code": 6007
    },
    {
      "name": "souk el ténine",
      "arName": "سوق الاثنين",
      "code": 6008
    },
    {
      "name": "m'cisna",
      "arName": "مسيسنة",
      "code": 6009
    },
    {
      "name": "tinabdher",
      "arName": "تينبذار",
      "code": 6010
    },
    {
      "name": "tichy",
      "arName": "تيشي",
      "code": 6011
    },
    {
      "name": "semaoun",
      "arName": "سمعون",
      "code": 6012
    },
    {
      "name": "kendira",
      "arName": "كنديرة",
      "code": 6013
    },
    {
      "name": "tifra",
      "arName": "تيفرة",
      "code": 6014
    },
    {
      "name": "ighram",
      "arName": "آغرام",
      "code": 6015
    },
    {
      "name": "amalou",
      "arName": "أمالو",
      "code": 6016
    },
    {
      "name": "ighil ali",
      "arName": "إغيل علي",
      "code": 6017
    },
    {
      "name": "fenaïa ilmaten",
      "arName": "فناية الماثن",
      "code": 6018
    },
    {
      "name": "toudja",
      "arName": "توجة",
      "code": 6019
    },
    {
      "name": "darguina",
      "arName": "درقينة",
      "code": 6020
    },
    {
      "name": "sidi ayad",
      "arName": "سيدي عياد",
      "code": 6021
    },
    {
      "name": "aokas",
      "arName": "أوقاس",
      "code": 6022
    },
    {
      "name": "beni djellil",
      "arName": "بني جليل",
      "code": 6023
    },
    {
      "name": "adekar",
      "arName": "آدكار",
      "code": 6024
    },
    {
      "name": "akbou",
      "arName": "أقبو",
      "code": 6025
    },
    {
      "name": "seddouk",
      "arName": "صدوق",
      "code": 6026
    },
    {
      "name": "tazmalt",
      "arName": "تازمالت",
      "code": 6027
    },
    {
      "name": "aït r'zine",
      "arName": "آيت أرزين",
      "code": 6028
    },
    {
      "name": "chemini",
      "arName": "شميني",
      "code": 6029
    },
    {
      "name": "souk oufella",
      "arName": "سوق أوفلة",
      "code": 6030
    },
    {
      "name": "taskriout",
      "arName": "تاسكريوت",
      "code": 6031
    },
    {
      "name": "tibane",
      "arName": "طيبان",
      "code": 6032
    },
    {
      "name": "tala hamza",
      "arName": "تالة حمزة",
      "code": 6033
    },
    {
      "name": "barbacha",
      "arName": "برباشة",
      "code": 6034
    },
    {
      "name": "beni ksila",
      "arName": "بني كسيلة",
      "code": 6035
    },
    {
      "name": "ouzellaguen",
      "arName": "أوزلاقن",
      "code": 6036
    },
    {
      "name": "bouhamza",
      "arName": "بوحمزة",
      "code": 6037
    },
    {
      "name": "beni mellikeche",
      "arName": "بني مليكش",
      "code": 6038
    },
    {
      "name": "sidi aïch",
      "arName": "سيدي عيش",
      "code": 6039
    },
    {
      "name": "el kseur",
      "arName": "القصر",
      "code": 6040
    },
    {
      "name": "melbou",
      "arName": "ملبو",
      "code": 6041
    },
    {
      "name": "akfadou",
      "arName": "أكفادو",
      "code": 6042
    },
    {
      "name": "leflaye",
      "arName": "لفلاي",
      "code": 6043
    },
    {
      "name": "kherrata",
      "arName": "خراطة",
      "code": 6044
    },
    {
      "name": "draâ el-kaïd",
      "arName": "ذراع القايد",
      "code": 6045
    },
    {
      "name": "tamridjet",
      "arName": "تامريجت",
      "code": 6046
    },
    {
      "name": "aït smail",
      "arName": "آيت سماعيل",
      "code": 6047
    },
    {
      "name": "boukhelifa",
      "arName": "بوخليفة",
      "code": 6048
    },
    {
      "name": "tizi n'berber",
      "arName": "تيزي أنبربار",
      "code": 6049
    },
    {
      "name": "beni maouche",
      "arName": "بني معوش",
      "code": 6050
    },
    {
      "name": "oued ghir",
      "arName": "وادي غير",
      "code": 6051
    },
    {
      "name": "boudjellil",
      "arName": "بوجليل",
      "code": 6052
    }
  ],
  "7": [
    {
      "name": "aïn naga",
      "arName": "عين الناقة",
      "code": 7001
    },
    {
      "name": "aïn zaatout",
      "arName": "عين زعطوط",
      "code": 7002
    },
    {
      "name": "biskra",
      "arName": "بسكرة",
      "code": 7003
    },
    {
      "name": "bordj ben azzouz",
      "arName": "برج بن عزوز",
      "code": 7004
    },
    {
      "name": "bouchagroune",
      "arName": "بوشقرون",
      "code": 7005
    },
    {
      "name": "branis",
      "arName": "البرانيس",
      "code": 7006
    },
    {
      "name": "chetma",
      "arName": "شتمة",
      "code": 7007
    },
    {
      "name": "djemorah",
      "arName": "جمورة",
      "code": 7008
    },
    {
      "name": "el feidh",
      "arName": "الفيض",
      "code": 7009
    },
    {
      "name": "el ghrous",
      "arName": "الغروس",
      "code": 7010
    },
    {
      "name": "el hadjeb",
      "arName": "الحاجب",
      "code": 7011
    },
    {
      "name": "el haouch",
      "arName": "الحوش",
      "code": 7012
    },
    {
      "name": "el kantara",
      "arName": "القنطرة",
      "code": 7013
    },
    {
      "name": "el mizaraa",
      "arName": "المزيرعة",
      "code": 7014
    },
    {
      "name": "el outaya",
      "arName": "لوطاية",
      "code": 7015
    },
    {
      "name": "foughala",
      "arName": "فوغالة",
      "code": 7016
    },
    {
      "name": "khenguet sidi nadji",
      "arName": "خنقة سيدي ناجي",
      "code": 7017
    },
    {
      "name": "lichana",
      "arName": "ليشانة",
      "code": 7018
    },
    {
      "name": "lioua",
      "arName": "ليوة",
      "code": 7019
    },
    {
      "name": "m'chouneche",
      "arName": "مشونش",
      "code": 7020
    },
    {
      "name": "mekhadma",
      "arName": "مخادمة",
      "code": 7021
    },
    {
      "name": "m'lili",
      "arName": "مليلي",
      "code": 7022
    },
    {
      "name": "oumache",
      "arName": "أوماش",
      "code": 7023
    },
    {
      "name": "ourlal",
      "arName": "أورلال",
      "code": 7024
    },
    {
      "name": "sidi okba",
      "arName": "سيدي عقبة",
      "code": 7025
    },
    {
      "name": "tolga",
      "arName": "طولقة",
      "code": 7026
    },
    {
      "name": "zeribet el oued",
      "arName": "زريبة الوادي",
      "code": 7027
    }
  ],
  "8": [
    {
      "name": "béchar",
      "arName": "بشار",
      "code": 8001
    },
    {
      "name": "erg ferradj",
      "arName": "عرق فراج",
      "code": 8002
    },
    {
      "name": "ouled khoudir",
      "arName": "أولاد خضير",
      "code": 8003
    },
    {
      "name": "meridja",
      "arName": "مريجة",
      "code": 8004
    },
    {
      "name": "timoudi",
      "arName": "تيمودي",
      "code": 8005
    },
    {
      "name": "lahmar",
      "arName": "لحمر",
      "code": 8006
    },
    {
      "name": "beni ikhlef",
      "arName": "بني يخلف",
      "code": 8007
    },
    {
      "name": "mechraa houari boumedienne",
      "arName": "مشرع هواري بومدين",
      "code": 8008
    },
    {
      "name": "kenadsa",
      "arName": "القنادسة",
      "code": 8009
    },
    {
      "name": "igli",
      "arName": "إقلي",
      "code": 8010
    },
    {
      "name": "tabelbala",
      "arName": "تبلبالة",
      "code": 8011
    },
    {
      "name": "taghit",
      "arName": "تاغيت",
      "code": 8012
    },
    {
      "name": "el ouata",
      "arName": "الواتة",
      "code": 8013
    },
    {
      "name": "boukais",
      "arName": "بوكايس",
      "code": 8014
    },
    {
      "name": "mougheul",
      "arName": "موغل",
      "code": 8015
    },
    {
      "name": "abadla",
      "arName": "العبادلة",
      "code": 8016
    },
    {
      "name": "kerzaz",
      "arName": "كرزاز",
      "code": 8017
    },
    {
      "name": "ksabi",
      "arName": "القصابي",
      "code": 8018
    },
    {
      "name": "tamtert",
      "arName": "تامترت",
      "code": 8019
    },
    {
      "name": "beni ounif",
      "arName": "بني ونيف",
      "code": 8020
    }
  ],
  "9": [
    {
      "name": "blida",
      "arName": "البليدة",
      "code": 9001
    },
    {
      "name": "chebli",
      "arName": "الشبلي",
      "code": 9002
    },
    {
      "name": "bouinan",
      "arName": "بوينان",
      "code": 9003
    },
    {
      "name": "oued el alleug",
      "arName": "وادي العلايق",
      "code": 9004
    },
    {
      "name": "ouled yaïch",
      "arName": "أولاد يعيش",
      "code": 9005
    },
    {
      "name": "chréa",
      "arName": "الشريعة",
      "code": 9006
    },
    {
      "name": "el affroun",
      "arName": "العفرون",
      "code": 9007
    },
    {
      "name": "chiffa",
      "arName": "الشفة",
      "code": 9008
    },
    {
      "name": "hammam melouane",
      "arName": "حمام ملوان",
      "code": 9009
    },
    {
      "name": "ben khelil",
      "arName": "بن خليل",
      "code": 9010
    },
    {
      "name": "soumaa",
      "arName": "الصومعة",
      "code": 9011
    },
    {
      "name": "mouzaia",
      "arName": "موزاية",
      "code": 9012
    },
    {
      "name": "souhane",
      "arName": "صوحان",
      "code": 9013
    },
    {
      "name": "meftah",
      "arName": "مفتاح",
      "code": 9014
    },
    {
      "name": "ouled slama",
      "arName": "أولاد السلامة",
      "code": 9015
    },
    {
      "name": "boufarik",
      "arName": "بوفاريك",
      "code": 9016
    },
    {
      "name": "larbaa",
      "arName": "الأربعاء",
      "code": 9017
    },
    {
      "name": "oued djer",
      "arName": "واد جر",
      "code": 9018
    },
    {
      "name": "beni tamou",
      "arName": "بني تامو",
      "code": 9019
    },
    {
      "name": "bouarfa",
      "arName": "بوعرفة",
      "code": 9020
    },
    {
      "name": "beni mered",
      "arName": "بني مراد",
      "code": 9021
    },
    {
      "name": "bougara",
      "arName": "بوقرة",
      "code": 9022
    },
    {
      "name": "guerouaou",
      "arName": "قرواو",
      "code": 9023
    },
    {
      "name": "aïn romana",
      "arName": "عين الرمانة",
      "code": 9024
    },
    {
      "name": "djebabra",
      "arName": "الجبابرة",
      "code": 9025
    }
  ],
  "10": [
    {
      "name": "aïn bessem",
      "arName": "عين بسام",
      "code": 10001
    },
    {
      "name": "hanif",
      "arName": "الحانيف",
      "code": 10002
    },
    {
      "name": "aghbalou",
      "arName": "أغبالو",
      "code": 10003
    },
    {
      "name": "aïn el hadjar",
      "arName": "عين الحجر",
      "code": 10004
    },
    {
      "name": "ahl el ksar",
      "arName": "أهل القصر",
      "code": 10005
    },
    {
      "name": "aïn laloui",
      "arName": "عين العلوي",
      "code": 10006
    },
    {
      "name": "ath mansour",
      "arName": "آث منصور",
      "code": 10007
    },
    {
      "name": "aomar",
      "arName": "عومار",
      "code": 10008
    },
    {
      "name": "aïn el turc",
      "arName": "عين الترك",
      "code": 10009
    },
    {
      "name": "aït laziz",
      "arName": "آيت لعزيز",
      "code": 10010
    },
    {
      "name": "bouderbala",
      "arName": "بودربالة",
      "code": 10011
    },
    {
      "name": "bechloul",
      "arName": "بشلول",
      "code": 10012
    },
    {
      "name": "bir ghbalou",
      "arName": "بئر غبالو",
      "code": 10013
    },
    {
      "name": "boukram",
      "arName": "بوكرام",
      "code": 10014
    },
    {
      "name": "bordj okhriss",
      "arName": "برج أوخريص",
      "code": 10015
    },
    {
      "name": "bouira",
      "arName": "البويرة",
      "code": 10016
    },
    {
      "name": "chorfa",
      "arName": "الشرفة",
      "code": 10017
    },
    {
      "name": "dechmia",
      "arName": "الدشمية",
      "code": 10018
    },
    {
      "name": "dirrah",
      "arName": "ديرة",
      "code": 10019
    },
    {
      "name": "djebahia",
      "arName": "الجباحية",
      "code": 10020
    },
    {
      "name": "el hakimia",
      "arName": "الحاكمية",
      "code": 10021
    },
    {
      "name": "el hachimia",
      "arName": "الهاشمية",
      "code": 10022
    },
    {
      "name": "el adjiba",
      "arName": "العجيبة",
      "code": 10023
    },
    {
      "name": "el khabouzia",
      "arName": "الخبوزية",
      "code": 10024
    },
    {
      "name": "el mokrani",
      "arName": "المقراني",
      "code": 10025
    },
    {
      "name": "el asnam",
      "arName": "الأصنام",
      "code": 10026
    },
    {
      "name": "guerrouma",
      "arName": "قرومة",
      "code": 10027
    },
    {
      "name": "haizer",
      "arName": "حيزر",
      "code": 10028
    },
    {
      "name": "hadjera zerga",
      "arName": "الحجرة الزرقاء",
      "code": 10029
    },
    {
      "name": "kadiria",
      "arName": "قادرية",
      "code": 10030
    },
    {
      "name": "lakhdaria",
      "arName": "الأخضرية",
      "code": 10031
    },
    {
      "name": "m'chedallah",
      "arName": "مشد الله",
      "code": 10032
    },
    {
      "name": "mezdour",
      "arName": "مسدور",
      "code": 10033
    },
    {
      "name": "maala",
      "arName": "معالة",
      "code": 10034
    },
    {
      "name": "maamora",
      "arName": "المعمورة",
      "code": 10035
    },
    {
      "name": "oued el berdi",
      "arName": "وادي البردي",
      "code": 10036
    },
    {
      "name": "ouled rached",
      "arName": "أولاد راشد",
      "code": 10037
    },
    {
      "name": "raouraoua",
      "arName": "الروراوة",
      "code": 10038
    },
    {
      "name": "ridane",
      "arName": "ريدان",
      "code": 10039
    },
    {
      "name": "saharidj",
      "arName": "الصھاريج",
      "code": 10040
    },
    {
      "name": "sour el ghouzlane",
      "arName": "سور الغزلان",
      "code": 10041
    },
    {
      "name": "souk el khemis",
      "arName": "سوق الخميس",
      "code": 10042
    },
    {
      "name": "taguedit",
      "arName": "تاقديت",
      "code": 10043
    },
    {
      "name": "taghzout",
      "arName": "تاغزوت",
      "code": 10044
    },
    {
      "name": "zbarbar",
      "arName": "الزبربر",
      "code": 10045
    }
  ],
  "11": [
    {
      "name": "tamanrasset",
      "arName": "تامنراست",
      "code": 11001
    },
    {
      "name": "abalessa",
      "arName": "أبلسة",
      "code": 11002
    },
    {
      "name": "idles",
      "arName": "إدلس",
      "code": 11003
    },
    {
      "name": "tazrouk",
      "arName": "تاظروك",
      "code": 11004
    },
    {
      "name": "in amguel",
      "arName": "عين امقل",
      "code": 11005
    }
  ],
  "12": [
    {
      "name": "tébessa",
      "arName": "تبسة",
      "code": 12001
    },
    {
      "name": "bir el ater",
      "arName": "بئر العاتر",
      "code": 12002
    },
    {
      "name": "cheria",
      "arName": "الشريعة",
      "code": 12003
    },
    {
      "name": "stah guentis",
      "arName": "سطح قنطيس",
      "code": 12004
    },
    {
      "name": "el aouinet",
      "arName": "العوينات",
      "code": 12005
    },
    {
      "name": "el houidjbet",
      "arName": "الحويجبات",
      "code": 12006
    },
    {
      "name": "safsaf el ouesra",
      "arName": "صفصاف الوسرة",
      "code": 12007
    },
    {
      "name": "hammamet",
      "arName": "الحمامات",
      "code": 12008
    },
    {
      "name": "negrine",
      "arName": "نقرين",
      "code": 12009
    },
    {
      "name": "bir mokkadem",
      "arName": "بئر مقدم",
      "code": 12010
    },
    {
      "name": "el kouif",
      "arName": "الكويف",
      "code": 12011
    },
    {
      "name": "morsott",
      "arName": "مرسط",
      "code": 12012
    },
    {
      "name": "el ogla",
      "arName": "العقلة",
      "code": 12013
    },
    {
      "name": "bir dheb",
      "arName": "بئر الذهب",
      "code": 12014
    },
    {
      "name": "el ogla melha",
      "arName": "العقلة المالحة",
      "code": 12015
    },
    {
      "name": "guorriguer",
      "arName": "قريقر",
      "code": 12016
    },
    {
      "name": "bekkaria",
      "arName": "بكارية",
      "code": 12017
    },
    {
      "name": "boukhadra",
      "arName": "بوخضرة",
      "code": 12018
    },
    {
      "name": "ouenza",
      "arName": "الونزة",
      "code": 12019
    },
    {
      "name": "el ma labiodh",
      "arName": "الماء الأبيض",
      "code": 12020
    },
    {
      "name": "oum ali",
      "arName": "أم علي",
      "code": 12021
    },
    {
      "name": "tlidjene",
      "arName": "ثليجان",
      "code": 12022
    },
    {
      "name": "aïn zerga",
      "arName": "عين الزرقاء",
      "code": 12023
    },
    {
      "name": "el meridj",
      "arName": "المريج",
      "code": 12024
    },
    {
      "name": "boulhaf dir",
      "arName": "بولحاف الدير",
      "code": 12025
    },
    {
      "name": "bedjene",
      "arName": "بجن",
      "code": 12026
    },
    {
      "name": "el mezeraa",
      "arName": "المزرعة",
      "code": 12027
    },
    {
      "name": "ferkane",
      "arName": "فركان",
      "code": 12028
    }
  ],
  "13": [
    {
      "name": "tlemcen",
      "arName": "تلمسان",
      "code": 13001
    },
    {
      "name": "beni mester",
      "arName": "بني مستار",
      "code": 13002
    },
    {
      "name": "aïn tallout",
      "arName": "عين تالوت",
      "code": 13003
    },
    {
      "name": "remchi",
      "arName": "الرمشي",
      "code": 13004
    },
    {
      "name": "el fehoul",
      "arName": "الفحول",
      "code": 13005
    },
    {
      "name": "sabra",
      "arName": "صبرة",
      "code": 13006
    },
    {
      "name": "ghazaouet",
      "arName": "الغزوات",
      "code": 13007
    },
    {
      "name": "souani",
      "arName": "السواني",
      "code": 13008
    },
    {
      "name": "djebala",
      "arName": "جبالة",
      "code": 13009
    },
    {
      "name": "el gor",
      "arName": "القور",
      "code": 13010
    },
    {
      "name": "oued lakhdar",
      "arName": "الواد الأخضر",
      "code": 13011
    },
    {
      "name": "aïn fezza",
      "arName": "عين فزة",
      "code": 13012
    },
    {
      "name": "ouled mimoun",
      "arName": "أولاد ميمون",
      "code": 13013
    },
    {
      "name": "amieur",
      "arName": "عمير",
      "code": 13014
    },
    {
      "name": "aïn youcef",
      "arName": "عين يوسف",
      "code": 13015
    },
    {
      "name": "zenata",
      "arName": "زناتة",
      "code": 13016
    },
    {
      "name": "beni snous",
      "arName": "بني سنوس",
      "code": 13017
    },
    {
      "name": "bab el assa",
      "arName": "باب العسة",
      "code": 13018
    },
    {
      "name": "dar yaghmouracene",
      "arName": "دار يغمراسن",
      "code": 13019
    },
    {
      "name": "fellaoucene",
      "arName": "فلاوسن",
      "code": 13020
    },
    {
      "name": "azails",
      "arName": "العزايل",
      "code": 13021
    },
    {
      "name": "sebaa chioukh",
      "arName": "السبعة شيوخ",
      "code": 13022
    },
    {
      "name": "terni beni hdiel",
      "arName": "تيرني بني ھديل",
      "code": 13023
    },
    {
      "name": "bensekrane",
      "arName": "بن سكران",
      "code": 13024
    },
    {
      "name": "aïn nehala",
      "arName": "عين نحالة",
      "code": 13025
    },
    {
      "name": "hennaya",
      "arName": "الحناية",
      "code": 13026
    },
    {
      "name": "maghnia",
      "arName": "مغنية",
      "code": 13027
    },
    {
      "name": "hammam boughrara",
      "arName": "حمام بوغرارة",
      "code": 13028
    },
    {
      "name": "souahlia",
      "arName": "السواحلية",
      "code": 13029
    },
    {
      "name": "msirda fouaga",
      "arName": "مسيردة الفواقة",
      "code": 13030
    },
    {
      "name": "aïn fetah",
      "arName": "عين فتاح",
      "code": 13031
    },
    {
      "name": "el aricha",
      "arName": "العريشة",
      "code": 13032
    },
    {
      "name": "souk tlata",
      "arName": "سوق الثلاثاء",
      "code": 13033
    },
    {
      "name": "sidi abdelli",
      "arName": "سيدي العبدلي",
      "code": 13034
    },
    {
      "name": "sebdou",
      "arName": "سبدو",
      "code": 13035
    },
    {
      "name": "beni ouarsous",
      "arName": "بني ورسوس",
      "code": 13036
    },
    {
      "name": "sidi medjahed",
      "arName": "سيدي مجاهد",
      "code": 13037
    },
    {
      "name": "beni boussaid",
      "arName": "بني بوسعيد",
      "code": 13038
    },
    {
      "name": "marsa ben m'hidi",
      "arName": "مرسى بن مهيدي",
      "code": 13039
    },
    {
      "name": "nedroma",
      "arName": "ندرومة",
      "code": 13040
    },
    {
      "name": "sidi djillali",
      "arName": "سيدي الجيلالي",
      "code": 13041
    },
    {
      "name": "beni bahdel",
      "arName": "بني بهدل",
      "code": 13042
    },
    {
      "name": "el bouihi",
      "arName": "البويهي",
      "code": 13043
    },
    {
      "name": "honaïne",
      "arName": "هنين",
      "code": 13044
    },
    {
      "name": "tienet",
      "arName": "تيانت",
      "code": 13045
    },
    {
      "name": "ouled riyah",
      "arName": "أولاد رياح",
      "code": 13046
    },
    {
      "name": "bouhlou",
      "arName": "بوحلو",
      "code": 13047
    },
    {
      "name": "beni khellad",
      "arName": "بني خلاد",
      "code": 13048
    },
    {
      "name": "aïn ghoraba",
      "arName": "عين غرابة",
      "code": 13049
    },
    {
      "name": "chetouane",
      "arName": "شتوان",
      "code": 13050
    },
    {
      "name": "mansourah",
      "arName": "المنصورة",
      "code": 13051
    },
    {
      "name": "beni semiel",
      "arName": "بني صميل",
      "code": 13052
    },
    {
      "name": "aïn kebira",
      "arName": "عين الكبيرة",
      "code": 13053
    }
  ],
  "14": [
    {
      "name": "aïn bouchekif",
      "arName": "عين بوشقيف",
      "code": 14001
    },
    {
      "name": "aïn deheb",
      "arName": "عين الذهب",
      "code": 14002
    },
    {
      "name": "aïn el hadid",
      "arName": "عين الحديد",
      "code": 14003
    },
    {
      "name": "aïn kermes",
      "arName": "عين كرمس",
      "code": 14004
    },
    {
      "name": "aïn dzarit",
      "arName": "عين دزاريت",
      "code": 14005
    },
    {
      "name": "bougara",
      "arName": "بوقرة",
      "code": 14006
    },
    {
      "name": "chehaima",
      "arName": "شحيمة",
      "code": 14007
    },
    {
      "name": "dahmouni",
      "arName": "دحموني",
      "code": 14008
    },
    {
      "name": "djebilet rosfa",
      "arName": "جبيلة الرصفاء",
      "code": 14009
    },
    {
      "name": "djillali ben amar",
      "arName": "جيلالي بن عمار",
      "code": 14010
    },
    {
      "name": "faidja",
      "arName": "الفايجة",
      "code": 14011
    },
    {
      "name": "frenda",
      "arName": "فرندة",
      "code": 14012
    },
    {
      "name": "guertoufa",
      "arName": "قرطوفة",
      "code": 14013
    },
    {
      "name": "hamadia",
      "arName": "حمادية",
      "code": 14014
    },
    {
      "name": "ksar chellala",
      "arName": "قصر الشلالة",
      "code": 14015
    },
    {
      "name": "madna",
      "arName": "مادنة",
      "code": 14016
    },
    {
      "name": "mahdia",
      "arName": "مهدية",
      "code": 14017
    },
    {
      "name": "mechraa safa",
      "arName": "مشرع الصفاء",
      "code": 14018
    },
    {
      "name": "medrissa",
      "arName": "مدريسة",
      "code": 14019
    },
    {
      "name": "medroussa",
      "arName": "مدروسة",
      "code": 14020
    },
    {
      "name": "meghila",
      "arName": "مغيلة",
      "code": 14021
    },
    {
      "name": "mellakou",
      "arName": "ملاكو",
      "code": 14022
    },
    {
      "name": "nadorah",
      "arName": "الناظورة",
      "code": 14023
    },
    {
      "name": "naima",
      "arName": "النعيمة",
      "code": 14024
    },
    {
      "name": "oued lilli",
      "arName": "وادي ليلي",
      "code": 14025
    },
    {
      "name": "rahouia",
      "arName": "الرحوية",
      "code": 14026
    },
    {
      "name": "rechaïga",
      "arName": "الرشايقة",
      "code": 14027
    },
    {
      "name": "sebaïne",
      "arName": "سبعين",
      "code": 14028
    },
    {
      "name": "sebt",
      "arName": "السبت",
      "code": 14029
    },
    {
      "name": "serghine",
      "arName": "سرغين",
      "code": 14030
    },
    {
      "name": "si abdelghani",
      "arName": "سي عبد الغني",
      "code": 14031
    },
    {
      "name": "sidi abderahmane",
      "arName": "سيدي عبد الرحمان",
      "code": 14032
    },
    {
      "name": "sidi ali mellal",
      "arName": "سيدي علي ملال",
      "code": 14033
    },
    {
      "name": "sidi bakhti",
      "arName": "سيدي بختي",
      "code": 14034
    },
    {
      "name": "sidi hosni",
      "arName": "سيدي حسني",
      "code": 14035
    },
    {
      "name": "sougueur",
      "arName": "السوقر",
      "code": 14036
    },
    {
      "name": "tagdemt",
      "arName": "تاقدمت",
      "code": 14037
    },
    {
      "name": "takhemaret",
      "arName": "تاخمرت",
      "code": 14038
    },
    {
      "name": "tiaret",
      "arName": "تيارت",
      "code": 14039
    },
    {
      "name": "tidda",
      "arName": "تيدة",
      "code": 14040
    },
    {
      "name": "tousnina",
      "arName": "توسنينة",
      "code": 14041
    },
    {
      "name": "zmalet el emir abdelkader",
      "arName": "زمالة الأمير عبد القادر",
      "code": 14042
    }
  ],
  "15": [
    {
      "name": "tizi ouzou",
      "arName": "تيزي وزو",
      "code": 15001
    },
    {
      "name": "ain el hammam",
      "arName": "عين الحمام",
      "code": 15002
    },
    {
      "name": "akbil",
      "arName": "أقبيل",
      "code": 15003
    },
    {
      "name": "freha",
      "arName": "فريحة",
      "code": 15004
    },
    {
      "name": "souamaâ",
      "arName": "الصوامع",
      "code": 15005
    },
    {
      "name": "mechtras",
      "arName": "مشطراس",
      "code": 15006
    },
    {
      "name": "irdjen",
      "arName": "إرجن",
      "code": 15007
    },
    {
      "name": "timizart",
      "arName": "تيميزارت",
      "code": 15008
    },
    {
      "name": "makouda",
      "arName": "ماكودة",
      "code": 15009
    },
    {
      "name": "draâ el mizan",
      "arName": "ذراع الميزان",
      "code": 15010
    },
    {
      "name": "tizi gheniff",
      "arName": "تيزي غنيف",
      "code": 15011
    },
    {
      "name": "bounouh",
      "arName": "بونوح",
      "code": 15012
    },
    {
      "name": "aït chafâa",
      "arName": "أيت شفعة",
      "code": 15013
    },
    {
      "name": "frikat",
      "arName": "فريقات",
      "code": 15014
    },
    {
      "name": "beni aïssi",
      "arName": "بني عيسي",
      "code": 15015
    },
    {
      "name": "beni zmenzer",
      "arName": "بني زمنزر",
      "code": 15016
    },
    {
      "name": "iferhounène",
      "arName": "إيفرحونن",
      "code": 15017
    },
    {
      "name": "azazga",
      "arName": "عزازقة",
      "code": 15018
    },
    {
      "name": "illoula oumalou",
      "arName": "إيلولة أمالو",
      "code": 15019
    },
    {
      "name": "yakouren",
      "arName": "إعكوران",
      "code": 15020
    },
    {
      "name": "larbaâ nath irathen",
      "arName": "الأربعاء نايث إيراثن",
      "code": 15021
    },
    {
      "name": "tizi rached",
      "arName": "تيزي راشد",
      "code": 15022
    },
    {
      "name": "zekri",
      "arName": "زكري",
      "code": 15023
    },
    {
      "name": "ouaguenoun",
      "arName": "واقنون",
      "code": 15024
    },
    {
      "name": "aïn zaouia",
      "arName": "عين الزاوية",
      "code": 15025
    },
    {
      "name": "m'kira",
      "arName": "مكيرة",
      "code": 15026
    },
    {
      "name": "aït yahia",
      "arName": "أيت يحي",
      "code": 15027
    },
    {
      "name": "aït mahmoud",
      "arName": "أيت محمود",
      "code": 15028
    },
    {
      "name": "mâatkas",
      "arName": "المعاتقة",
      "code": 15029
    },
    {
      "name": "aït boumahdi",
      "arName": "أيت بومهدي",
      "code": 15030
    },
    {
      "name": "abi youcef",
      "arName": "أبي يوسف",
      "code": 15031
    },
    {
      "name": "beni douala",
      "arName": "بني دوالة",
      "code": 15032
    },
    {
      "name": "illilten",
      "arName": "إليلتن",
      "code": 15033
    },
    {
      "name": "bouzeguène",
      "arName": "بوزقن",
      "code": 15034
    },
    {
      "name": "aït aggouacha",
      "arName": "أيت قواشة",
      "code": 15035
    },
    {
      "name": "ouadhia",
      "arName": "واضية",
      "code": 15036
    },
    {
      "name": "azeffoun",
      "arName": "أزفون",
      "code": 15037
    },
    {
      "name": "tigzirt",
      "arName": "تيقزيرت",
      "code": 15038
    },
    {
      "name": "aït aïssa mimoun",
      "arName": "آيت عيسى ميمون",
      "code": 15039
    },
    {
      "name": "boghni",
      "arName": "بوغني",
      "code": 15040
    },
    {
      "name": "ifigha",
      "arName": "إيفيغاء",
      "code": 15041
    },
    {
      "name": "aït oumalou",
      "arName": "أيت أومالو",
      "code": 15042
    },
    {
      "name": "tirmitine",
      "arName": "تيرمتين",
      "code": 15043
    },
    {
      "name": "akerrou",
      "arName": "أقرو",
      "code": 15044
    },
    {
      "name": "yatafen",
      "arName": "يطافن",
      "code": 15045
    },
    {
      "name": "beni ziki",
      "arName": "بني زيكي",
      "code": 15046
    },
    {
      "name": "draâ ben khedda",
      "arName": "ذراع بن خدة",
      "code": 15047
    },
    {
      "name": "ouacifs ",
      "arName": "واسيف",
      "code": 15048
    },
    {
      "name": "idjeur",
      "arName": "إجر",
      "code": 15049
    },
    {
      "name": "mekla",
      "arName": "مقلع",
      "code": 15050
    },
    {
      "name": "tizi n'thleta",
      "arName": "تيزي نثلاثة",
      "code": 15051
    },
    {
      "name": "beni yenni",
      "arName": "بني يني",
      "code": 15052
    },
    {
      "name": "aghrib",
      "arName": "أغريب",
      "code": 15053
    },
    {
      "name": "iflissen",
      "arName": "إفليسن",
      "code": 15054
    },
    {
      "name": "boudjima",
      "arName": "بوجيمة",
      "code": 15055
    },
    {
      "name": "aït yahia moussa",
      "arName": "أيت يحي موسى",
      "code": 15056
    },
    {
      "name": "souk el thenine",
      "arName": "سوق الاثنين",
      "code": 15057
    },
    {
      "name": "aït khellili",
      "arName": "أيت خليلي",
      "code": 15058
    },
    {
      "name": "sidi nâamane",
      "arName": "سيدي نعمان",
      "code": 15059
    },
    {
      "name": "iboudraren",
      "arName": "إبودرارن",
      "code": 15060
    },
    {
      "name": "agouni gueghrane",
      "arName": "أقني قغران",
      "code": 15061
    },
    {
      "name": "mizrana",
      "arName": "مزرانة",
      "code": 15062
    },
    {
      "name": "imsouhel",
      "arName": "أمسوحال",
      "code": 15063
    },
    {
      "name": "tadmaït",
      "arName": "تادمايت",
      "code": 15064
    },
    {
      "name": "aït bouaddou",
      "arName": "أيت بوعدو",
      "code": 15065
    },
    {
      "name": "assi youcef",
      "arName": "أسي يوسف",
      "code": 15066
    },
    {
      "name": "aït toudert",
      "arName": "أيت تودرت",
      "code": 15067
    }
  ],
  "16": [
    {
      "name": "alger-centre",
      "arName": "الجزائر الوسطى",
      "code": 16001
    },
    {
      "name": "sidi m'hamed",
      "arName": "سيدي امحمد",
      "code": 16002
    },
    {
      "name": "el madania",
      "arName": "المدنية",
      "code": 16003
    },
    {
      "name": "belouizdad",
      "arName": "محمد بلوزداد",
      "code": 16004
    },
    {
      "name": "bab el oued",
      "arName": "باب الواد",
      "code": 16005
    },
    {
      "name": "bologhine",
      "arName": "بولوغين",
      "code": 16006
    },
    {
      "name": "casbah",
      "arName": "القصبة",
      "code": 16007
    },
    {
      "name": "oued koriche",
      "arName": "وادي قريش",
      "code": 16008
    },
    {
      "name": "bir mourad raïs",
      "arName": "بير مراد رايس",
      "code": 16009
    },
    {
      "name": "el biar",
      "arName": "الأبيار",
      "code": 16010
    },
    {
      "name": "bouzareah",
      "arName": "بوزريعة",
      "code": 16011
    },
    {
      "name": "birkhadem",
      "arName": "بئر خادم",
      "code": 16012
    },
    {
      "name": "el harrach",
      "arName": "الحراش",
      "code": 16013
    },
    {
      "name": "baraki",
      "arName": "براقي",
      "code": 16014
    },
    {
      "name": "oued smar",
      "arName": "وادي السمار",
      "code": 16015
    },
    {
      "name": "bachdjerrah",
      "arName": "باش جراح",
      "code": 16016
    },
    {
      "name": "hussein dey",
      "arName": "حسين داي",
      "code": 16017
    },
    {
      "name": "kouba",
      "arName": "القبة",
      "code": 16018
    },
    {
      "name": "bourouba",
      "arName": "بوروبة",
      "code": 16019
    },
    {
      "name": "dar el beïda",
      "arName": "الدار البيضاء",
      "code": 16020
    },
    {
      "name": "bab ezzouar",
      "arName": "باب الزوار",
      "code": 16021
    },
    {
      "name": "ben aknoun",
      "arName": "بن عكنون",
      "code": 16022
    },
    {
      "name": "dely ibrahim",
      "arName": "دالي إبراهيم",
      "code": 16023
    },
    {
      "name": "el hammamet",
      "arName": "الحمامات",
      "code": 16024
    },
    {
      "name": "raïs hamidou",
      "arName": "رايس حميدو",
      "code": 16025
    },
    {
      "name": "djasr kasentina",
      "arName": "جسر قسنطينة",
      "code": 16026
    },
    {
      "name": "el mouradia",
      "arName": "المرادية",
      "code": 16027
    },
    {
      "name": "hydra",
      "arName": "حيدرة",
      "code": 16028
    },
    {
      "name": "mohammadia",
      "arName": "المحمدية",
      "code": 16029
    },
    {
      "name": "bordj el kiffan",
      "arName": "برج الكيفان",
      "code": 16030
    },
    {
      "name": "el magharia",
      "arName": "المقرية",
      "code": 16031
    },
    {
      "name": "beni messous",
      "arName": "بني مسوس",
      "code": 16032
    },
    {
      "name": "les eucalyptus",
      "arName": "کالیتوس",
      "code": 16033
    },
    {
      "name": "birtouta",
      "arName": "بئر توتة",
      "code": 16034
    },
    {
      "name": "tessala el merdja",
      "arName": "تسالة المرجة",
      "code": 16035
    },
    {
      "name": "ouled chebel",
      "arName": "أولاد شبل",
      "code": 16036
    },
    {
      "name": "sidi moussa",
      "arName": "سيدي موسى",
      "code": 16037
    },
    {
      "name": "aïn taya",
      "arName": "عين طاية",
      "code": 16038
    },
    {
      "name": "bordj el bahri",
      "arName": "برج البحري",
      "code": 16039
    },
    {
      "name": "el marsa",
      "arName": "المرسى",
      "code": 16040
    },
    {
      "name": "h'raoua",
      "arName": "هراوة",
      "code": 16041
    },
    {
      "name": "rouïba",
      "arName": "الرويبة",
      "code": 16042
    },
    {
      "name": "reghaïa",
      "arName": "الرغاية",
      "code": 16043
    },
    {
      "name": "aïn benian",
      "arName": "عين البنيان",
      "code": 16044
    },
    {
      "name": "staoueli",
      "arName": "سطاوالي",
      "code": 16045
    },
    {
      "name": "zeralda",
      "arName": "زرالدة",
      "code": 16046
    },
    {
      "name": "mahelma",
      "arName": "المحالمة",
      "code": 16047
    },
    {
      "name": "rahmania",
      "arName": "الرحمانية",
      "code": 16048
    },
    {
      "name": "souidania",
      "arName": "السويدانية",
      "code": 16049
    },
    {
      "name": "cheraga",
      "arName": "الشراقة",
      "code": 16050
    },
    {
      "name": "ouled fayet",
      "arName": "أولاد فايت",
      "code": 16051
    },
    {
      "name": "el achour",
      "arName": "العاشور",
      "code": 16052
    },
    {
      "name": "draria",
      "arName": "درارية",
      "code": 16053
    },
    {
      "name": "douera",
      "arName": "الدويرة",
      "code": 16054
    },
    {
      "name": "baba hassen",
      "arName": "بابا حسن",
      "code": 16055
    },
    {
      "name": "khraicia",
      "arName": "خرايسية",
      "code": 16056
    },
    {
      "name": "saoula",
      "arName": "السحاولة",
      "code": 16057
    }
  ],
  "17": [
    {
      "name": "aïn chouhada",
      "arName": "عين الشهداء",
      "code": 17001
    },
    {
      "name": "aïn el ibel",
      "arName": "عين الابل",
      "code": 17002
    },
    {
      "name": "aïn feka",
      "arName": "عين أفقه",
      "code": 17003
    },
    {
      "name": "aïn maabed",
      "arName": "عين معبد",
      "code": 17004
    },
    {
      "name": "aïn oussara",
      "arName": "عين وسارة",
      "code": 17005
    },
    {
      "name": "amourah",
      "arName": "عمورة",
      "code": 17006
    },
    {
      "name": "benhar",
      "arName": "بنهار",
      "code": 17007
    },
    {
      "name": "beni yagoub",
      "arName": "بن يعقوب",
      "code": 17008
    },
    {
      "name": "birine",
      "arName": "البيرين",
      "code": 17009
    },
    {
      "name": "bouira lahdab",
      "arName": "بويرة الأحداب",
      "code": 17010
    },
    {
      "name": "charef",
      "arName": "الشارف",
      "code": 17011
    },
    {
      "name": "dar chioukh",
      "arName": "دار الشيوخ",
      "code": 17012
    },
    {
      "name": "deldoul",
      "arName": "دلدول",
      "code": 17013
    },
    {
      "name": "djelfa",
      "arName": "الجلفة",
      "code": 17014
    },
    {
      "name": "douis",
      "arName": "الدويس",
      "code": 17015
    },
    {
      "name": "el guedid",
      "arName": "القديد",
      "code": 17016
    },
    {
      "name": "el idrissia",
      "arName": "الإدريسية",
      "code": 17017
    },
    {
      "name": "el khemis",
      "arName": "الخميس",
      "code": 17018
    },
    {
      "name": "faidh el botma",
      "arName": "فيض البطمة",
      "code": 17019
    },
    {
      "name": "guernini",
      "arName": "القرنيني",
      "code": 17020
    },
    {
      "name": "guettara",
      "arName": "قطارة",
      "code": 17021
    },
    {
      "name": "had sahary",
      "arName": "حد الصحاري",
      "code": 17022
    },
    {
      "name": "hassi bahbah",
      "arName": "حاسي بحبح",
      "code": 17023
    },
    {
      "name": "hassi el euch",
      "arName": "حاسي العش",
      "code": 17024
    },
    {
      "name": "hassi fedoul",
      "arName": "حاسي فدول",
      "code": 17025
    },
    {
      "name": "messaad",
      "arName": "مسعد",
      "code": 17026
    },
    {
      "name": "m'liliha",
      "arName": "مليليحة",
      "code": 17027
    },
    {
      "name": "moudjebara",
      "arName": "مجبارة",
      "code": 17028
    },
    {
      "name": "oum laadham",
      "arName": "أم العظام",
      "code": 17029
    },
    {
      "name": "sed rahal",
      "arName": "سد رحال",
      "code": 17030
    },
    {
      "name": "selmana",
      "arName": "سلمانة",
      "code": 17031
    },
    {
      "name": "sidi baizid",
      "arName": "سيدي بايزيد",
      "code": 17032
    },
    {
      "name": "sidi ladjel",
      "arName": "سيدي لعجال",
      "code": 17033
    },
    {
      "name": "tadmit",
      "arName": "تعضميت",
      "code": 17034
    },
    {
      "name": "zaafrane",
      "arName": "الزعفران",
      "code": 17035
    },
    {
      "name": "zaccar",
      "arName": "زكار",
      "code": 17036
    }
  ],
  "18": [
    {
      "name": "jijel",
      "arName": "جيجل",
      "code": 18001
    },
    {
      "name": "eraguene",
      "arName": "إيراقن سويسي",
      "code": 18002
    },
    {
      "name": "el aouana",
      "arName": "العوانة",
      "code": 18003
    },
    {
      "name": "ziama mansouriah",
      "arName": "زيامة منصورية",
      "code": 18004
    },
    {
      "name": "taher",
      "arName": "الطاهير",
      "code": 18005
    },
    {
      "name": "emir abdelkader",
      "arName": "الأمير عبد القادر",
      "code": 18006
    },
    {
      "name": "chekfa",
      "arName": "الشقفة",
      "code": 18007
    },
    {
      "name": "chahna",
      "arName": "الشحنة",
      "code": 18008
    },
    {
      "name": "el milia",
      "arName": "الميلية",
      "code": 18009
    },
    {
      "name": "sidi maarouf",
      "arName": "سيدي معروف",
      "code": 18010
    },
    {
      "name": "settara",
      "arName": "السطارة",
      "code": 18011
    },
    {
      "name": "el ancer",
      "arName": "العنصر",
      "code": 18012
    },
    {
      "name": "sidi abdelaziz",
      "arName": "سيدي عبد العزيز",
      "code": 18013
    },
    {
      "name": "kaous",
      "arName": "قاوس",
      "code": 18014
    },
    {
      "name": "ghebala",
      "arName": "غبالة",
      "code": 18015
    },
    {
      "name": "bouraoui belhadef",
      "arName": "بوراوي بلهادف",
      "code": 18016
    },
    {
      "name": "djimla",
      "arName": "جيملة",
      "code": 18017
    },
    {
      "name": "selma benziada",
      "arName": "سلمى بن زيادة",
      "code": 18018
    },
    {
      "name": "boucif ouled askeur",
      "arName": "بوسيف أولاد عسكر",
      "code": 18019
    },
    {
      "name": "el kennar nouchfi",
      "arName": "القنار",
      "code": 18020
    },
    {
      "name": "ouled yahia khedrouche",
      "arName": "أولاد يحيى خدروش",
      "code": 18021
    },
    {
      "name": "boudriaa ben yadjis",
      "arName": "بودريعة بن ياجيس",
      "code": 18022
    },
    {
      "name": "kheïri oued adjoul",
      "arName": "خيري وادي العجول",
      "code": 18023
    },
    {
      "name": "texenna",
      "arName": "تاكسنة",
      "code": 18024
    },
    {
      "name": "djemaa beni habibi",
      "arName": "الجمعة بني حبيبي",
      "code": 18025
    },
    {
      "name": "bordj tahar",
      "arName": "برج الطهر",
      "code": 18026
    },
    {
      "name": "ouled rabah",
      "arName": "أولاد رابح",
      "code": 18027
    },
    {
      "name": "ouadjana",
      "arName": "وجانة",
      "code": 18028
    }
  ],
  "19": [
    {
      "name": "aïn abessa",
      "arName": "عين عباسة",
      "code": 19001
    },
    {
      "name": "aïn arnat",
      "arName": "عين أرنات",
      "code": 19002
    },
    {
      "name": "aïn azel",
      "arName": "عين آزال",
      "code": 19003
    },
    {
      "name": "aïn el kebira",
      "arName": "عين الكبيرة",
      "code": 19004
    },
    {
      "name": "aïn lahdjar",
      "arName": "عين الحجر",
      "code": 19005
    },
    {
      "name": "aïn legradj",
      "arName": "عين لقراج",
      "code": 19006
    },
    {
      "name": "aïn oulmene",
      "arName": "عين ولمان",
      "code": 19007
    },
    {
      "name": "aïn roua",
      "arName": "عين الروى",
      "code": 19008
    },
    {
      "name": "aïn sebt",
      "arName": "عين السبت",
      "code": 19009
    },
    {
      "name": "aït naoual mezada",
      "arName": "آيت نوال مزادة",
      "code": 19010
    },
    {
      "name": "aït tizi",
      "arName": "آيت تيزي",
      "code": 19011
    },
    {
      "name": "beni ouartilene",
      "arName": "بني ورتيلان",
      "code": 19012
    },
    {
      "name": "amoucha",
      "arName": "عموشة",
      "code": 19013
    },
    {
      "name": "babor",
      "arName": "بابور",
      "code": 19014
    },
    {
      "name": "bazer sakhra",
      "arName": "بازر الصخرة",
      "code": 19015
    },
    {
      "name": "beidha bordj",
      "arName": "بيضاء برج",
      "code": 19016
    },
    {
      "name": "belaa",
      "arName": "بلاعة",
      "code": 19017
    },
    {
      "name": "beni aziz",
      "arName": "بني عزيز",
      "code": 19018
    },
    {
      "name": "beni chebana",
      "arName": "بني شبانة",
      "code": 19019
    },
    {
      "name": "beni fouda",
      "arName": "بني فودة",
      "code": 19020
    },
    {
      "name": "beni hocine",
      "arName": "بني حسين",
      "code": 19021
    },
    {
      "name": "beni mouhli",
      "arName": "بني محلي",
      "code": 19022
    },
    {
      "name": "bir el arch",
      "arName": "بئر العرش",
      "code": 19023
    },
    {
      "name": "bir haddada",
      "arName": "بئر حدادة",
      "code": 19024
    },
    {
      "name": "bouandas",
      "arName": "بوعنداس",
      "code": 19025
    },
    {
      "name": "bougaa",
      "arName": "بوقاعة",
      "code": 19026
    },
    {
      "name": "bousselam",
      "arName": "بوسلام",
      "code": 19027
    },
    {
      "name": "boutaleb",
      "arName": "بوطالب",
      "code": 19028
    },
    {
      "name": "dehamcha",
      "arName": "الدهامشة",
      "code": 19029
    },
    {
      "name": "djemila",
      "arName": "جميلة",
      "code": 19030
    },
    {
      "name": "draa kebila",
      "arName": "ذراع قبيلة",
      "code": 19031
    },
    {
      "name": "el eulma",
      "arName": "العلمة",
      "code": 19032
    },
    {
      "name": "el ouldja",
      "arName": "الولجة",
      "code": 19033
    },
    {
      "name": "el ouricia",
      "arName": "الأوريسية",
      "code": 19034
    },
    {
      "name": "guellal",
      "arName": "قلال",
      "code": 19035
    },
    {
      "name": "guelta zerka",
      "arName": "القلتة الزرقاء",
      "code": 19036
    },
    {
      "name": "guenzet",
      "arName": "قنزات",
      "code": 19037
    },
    {
      "name": "guidjel",
      "arName": "قجال",
      "code": 19038
    },
    {
      "name": "hamma",
      "arName": "الحامة",
      "code": 19039
    },
    {
      "name": "hammam guergour",
      "arName": "حمام قرقور",
      "code": 19040
    },
    {
      "name": "hammam soukhna",
      "arName": "حمام السخنة",
      "code": 19041
    },
    {
      "name": "harbil",
      "arName": "حربيل",
      "code": 19042
    },
    {
      "name": "ksar el abtal",
      "arName": "قصر الأبطال",
      "code": 19043
    },
    {
      "name": "maaouia",
      "arName": "معاوية",
      "code": 19044
    },
    {
      "name": "maoklane",
      "arName": "ماوكلان",
      "code": 19045
    },
    {
      "name": "mezloug",
      "arName": "مزلوق",
      "code": 19046
    },
    {
      "name": "oued el barad",
      "arName": "واد البارد",
      "code": 19047
    },
    {
      "name": "ouled addouane",
      "arName": "أولاد عدوان",
      "code": 19048
    },
    {
      "name": "ouled sabor",
      "arName": "أولاد صابر",
      "code": 19049
    },
    {
      "name": "ouled si ahmed",
      "arName": "أولاد سي أحمد",
      "code": 19050
    },
    {
      "name": "ouled tebben",
      "arName": "أولاد تبان",
      "code": 19051
    },
    {
      "name": "rasfa",
      "arName": "الرصفة",
      "code": 19052
    },
    {
      "name": "salah bey",
      "arName": "صالح باي",
      "code": 19053
    },
    {
      "name": "serdj el ghoul",
      "arName": "سرج الغول",
      "code": 19054
    },
    {
      "name": "sétif",
      "arName": "سطيف",
      "code": 19055
    },
    {
      "name": "tachouda",
      "arName": "تاشودة",
      "code": 19056
    },
    {
      "name": "talaifacene",
      "arName": "تالة ايفاسن",
      "code": 19057
    },
    {
      "name": "taya",
      "arName": "الطاية",
      "code": 19058
    },
    {
      "name": "tella",
      "arName": "التلة",
      "code": 19059
    },
    {
      "name": "tizi n'bechar",
      "arName": "تيزي نبشار",
      "code": 19060
    }
  ],
  "20": [
    {
      "name": "aïn el hadjar",
      "arName": "عين الحجر",
      "code": 20001
    },
    {
      "name": "aïn sekhouna",
      "arName": "عين السخونة",
      "code": 20002
    },
    {
      "name": "aïn soltane",
      "arName": "عين سلطان",
      "code": 20003
    },
    {
      "name": "doui thabet",
      "arName": "ذوي ثابت",
      "code": 20004
    },
    {
      "name": "el hassasna",
      "arName": "الحساسنة",
      "code": 20005
    },
    {
      "name": "hounet",
      "arName": "هونة",
      "code": 20006
    },
    {
      "name": "maamora",
      "arName": "المعمورة",
      "code": 20007
    },
    {
      "name": "moulay larbi",
      "arName": "مولاي لعربي",
      "code": 20008
    },
    {
      "name": "ouled brahim",
      "arName": "أولاد إبراهيم",
      "code": 20009
    },
    {
      "name": "ouled khaled",
      "arName": "أولاد خالد",
      "code": 20010
    },
    {
      "name": "saïda",
      "arName": "سعيدة",
      "code": 20011
    },
    {
      "name": "sidi ahmed",
      "arName": "سیدی احمد",
      "code": 20012
    },
    {
      "name": "sidi amar",
      "arName": "سيدي اعمر",
      "code": 20013
    },
    {
      "name": "sidi boubekeur",
      "arName": "سيدي بوبكر",
      "code": 20014
    },
    {
      "name": "tircine",
      "arName": "تيرسين",
      "code": 20015
    },
    {
      "name": "youb",
      "arName": "يوب",
      "code": 20016
    }
  ],
  "21": [
    {
      "name": "aïn bouziane",
      "arName": "عين بوزيان",
      "code": 21001
    },
    {
      "name": "aïn charchar",
      "arName": "عين شرشار",
      "code": 21002
    },
    {
      "name": "aïn kechra",
      "arName": "عين قشرة",
      "code": 21003
    },
    {
      "name": "aïn zouit",
      "arName": "عين زويت",
      "code": 21004
    },
    {
      "name": "azzaba",
      "arName": "عزابة",
      "code": 21005
    },
    {
      "name": "bekkouche lakhdar",
      "arName": "بكوش لخضر",
      "code": 21006
    },
    {
      "name": "bin el ouiden",
      "arName": "بين الويدان",
      "code": 21007
    },
    {
      "name": "ben azzouz",
      "arName": "بن عزوز",
      "code": 21008
    },
    {
      "name": "beni bechir",
      "arName": "بني بشير",
      "code": 21009
    },
    {
      "name": "beni oulbane",
      "arName": "بني ولبان",
      "code": 21010
    },
    {
      "name": "beni zid",
      "arName": "بني زيد",
      "code": 21011
    },
    {
      "name": "bouchtata",
      "arName": "بوشطاطة",
      "code": 21012
    },
    {
      "name": "cheraia",
      "arName": "الشرايع",
      "code": 21013
    },
    {
      "name": "collo",
      "arName": "القل",
      "code": 21014
    },
    {
      "name": "djendel saadi mohamed",
      "arName": "جندل",
      "code": 21015
    },
    {
      "name": "el ghedir",
      "arName": "لغدير",
      "code": 21016
    },
    {
      "name": "el hadaiek",
      "arName": "الحدائق",
      "code": 21017
    },
    {
      "name": "el harrouch",
      "arName": "الحروش",
      "code": 21018
    },
    {
      "name": "el marsa",
      "arName": "المرسى",
      "code": 21019
    },
    {
      "name": "emdjez edchich",
      "arName": "أمجاز الدشيش",
      "code": 21020
    },
    {
      "name": "es sebt",
      "arName": "السبت",
      "code": 21021
    },
    {
      "name": "filfila",
      "arName": "فلفلة",
      "code": 21022
    },
    {
      "name": "hamadi krouma",
      "arName": "حمادي كرومة",
      "code": 21023
    },
    {
      "name": "kanoua",
      "arName": "قنواع",
      "code": 21024
    },
    {
      "name": "kerkera",
      "arName": "الكركرة",
      "code": 21025
    },
    {
      "name": "kheneg mayoum",
      "arName": "خناق مايون",
      "code": 21026
    },
    {
      "name": "oued zehour",
      "arName": "وادي الزهور",
      "code": 21027
    },
    {
      "name": "ouldja boulballout",
      "arName": "الوجلة بوالبلوط",
      "code": 21028
    },
    {
      "name": "ouled attia",
      "arName": "أولاد عطية",
      "code": 21029
    },
    {
      "name": "ouled hbaba",
      "arName": "أولاد أحبابة",
      "code": 21030
    },
    {
      "name": "oum toub",
      "arName": "أم الطوب",
      "code": 21031
    },
    {
      "name": "ramdane djamel",
      "arName": "رمضان جمال",
      "code": 21032
    },
    {
      "name": "salah bouchaour",
      "arName": "صالح بوالشعور",
      "code": 21033
    },
    {
      "name": "sidi mezghiche",
      "arName": "سيدي مزغيش",
      "code": 21034
    },
    {
      "name": "skikda",
      "arName": "سكيكدة",
      "code": 21035
    },
    {
      "name": "tamalous",
      "arName": "تمالوس",
      "code": 21036
    },
    {
      "name": "zerdaza",
      "arName": "زردازة",
      "code": 21037
    },
    {
      "name": "zitouna",
      "arName": "زيتونة",
      "code": 21038
    }
  ],
  "22": [
    {
      "name": "aïn adden",
      "arName": "عين أدان",
      "code": 22001
    },
    {
      "name": "aïn el berd",
      "arName": "عين البرد",
      "code": 22002
    },
    {
      "name": "aïn kada",
      "arName": "عين قادة",
      "code": 22003
    },
    {
      "name": "aïn thrid",
      "arName": "عين الثريد",
      "code": 22004
    },
    {
      "name": "aïn tindamine",
      "arName": "عين تندامين",
      "code": 22005
    },
    {
      "name": "amarnas",
      "arName": "العمارنة",
      "code": 22006
    },
    {
      "name": "badredine el mokrani",
      "arName": "بدر الدين المقراني",
      "code": 22007
    },
    {
      "name": "belarbi",
      "arName": "بلعربي",
      "code": 22008
    },
    {
      "name": "ben badis",
      "arName": "بن باديس",
      "code": 22009
    },
    {
      "name": "benachiba chelia",
      "arName": "بن عشيبة شلية",
      "code": 22010
    },
    {
      "name": "bir el hammam",
      "arName": "بئر الحمام",
      "code": 22011
    },
    {
      "name": "boudjebaa el bordj",
      "arName": "بوجبهة البرج",
      "code": 22012
    },
    {
      "name": "boukhanafis",
      "arName": "بوخنيفيس",
      "code": 22013
    },
    {
      "name": "chettouane belaila",
      "arName": "شيطوان بليلة",
      "code": 22014
    },
    {
      "name": "dhaya",
      "arName": "الضاية",
      "code": 22015
    },
    {
      "name": "el haçaiba",
      "arName": "الحصيبة",
      "code": 22016
    },
    {
      "name": "hassi dahou",
      "arName": "حاسي دحو",
      "code": 22017
    },
    {
      "name": "hassi zehana",
      "arName": "حاسي زهانة",
      "code": 22018
    },
    {
      "name": "lamtar",
      "arName": "لمطار",
      "code": 22019
    },
    {
      "name": "makedra",
      "arName": "مقدرة",
      "code": 22020
    },
    {
      "name": "marhoum",
      "arName": "مرحوم",
      "code": 22021
    },
    {
      "name": "m'cid",
      "arName": "مسيد",
      "code": 22022
    },
    {
      "name": "merine",
      "arName": "مرين",
      "code": 22023
    },
    {
      "name": "mezaourou",
      "arName": "مزاورو",
      "code": 22024
    },
    {
      "name": "mostefa ben brahim",
      "arName": "مصطفى بن إبراهيم",
      "code": 22025
    },
    {
      "name": "moulay slissen",
      "arName": "مولاي سليسن",
      "code": 22026
    },
    {
      "name": "oued sebaa",
      "arName": "واد السبع",
      "code": 22027
    },
    {
      "name": "oued sefioun",
      "arName": "واد سفيون",
      "code": 22028
    },
    {
      "name": "oued taourira",
      "arName": "واد تاوريرة",
      "code": 22029
    },
    {
      "name": "ras el ma",
      "arName": "رأس الماء",
      "code": 22030
    },
    {
      "name": "redjem demouche",
      "arName": "رجم دموش",
      "code": 22031
    },
    {
      "name": "sehala thaoura",
      "arName": "سهالة ثاورة",
      "code": 22032
    },
    {
      "name": "sfisef",
      "arName": "سفيزف",
      "code": 22033
    },
    {
      "name": "sidi ali benyoub",
      "arName": "سيدي علي بن يوب",
      "code": 22034
    },
    {
      "name": "sidi ali boussidi",
      "arName": "سيدي علي بوسيدي",
      "code": 22035
    },
    {
      "name": "sidi bel abbes",
      "arName": "سيدي بلعباس",
      "code": 22036
    },
    {
      "name": "sidi brahim",
      "arName": "سيدي إبراهيم",
      "code": 22037
    },
    {
      "name": "sidi chaib",
      "arName": "سيدي شعيب",
      "code": 22038
    },
    {
      "name": "sidi daho des zairs",
      "arName": "سيدي دحو الزائر",
      "code": 22039
    },
    {
      "name": "sidi hamadouche",
      "arName": "سيدي حمادوش",
      "code": 22040
    },
    {
      "name": "sidi khaled",
      "arName": "سيدي خالد",
      "code": 22041
    },
    {
      "name": "sidi lahcene",
      "arName": "سيدي لحسن",
      "code": 22042
    },
    {
      "name": "sidi yacoub",
      "arName": "سيدي يعقوب",
      "code": 22043
    },
    {
      "name": "tabia",
      "arName": "طابية",
      "code": 22044
    },
    {
      "name": "tafissour",
      "arName": "تفسور",
      "code": 22045
    },
    {
      "name": "taoudmout",
      "arName": "تاودموت",
      "code": 22046
    },
    {
      "name": "teghalimet",
      "arName": "تغاليمت",
      "code": 22047
    },
    {
      "name": "telagh",
      "arName": "تلاغ",
      "code": 22048
    },
    {
      "name": "tenira",
      "arName": "تنيرة",
      "code": 22049
    },
    {
      "name": "tessala",
      "arName": "تسالة",
      "code": 22050
    },
    {
      "name": "tilmouni",
      "arName": "تلموني",
      "code": 22051
    },
    {
      "name": "zerouala",
      "arName": "زروالة",
      "code": 22052
    }
  ],
  "23": [
    {
      "name": "annaba",
      "arName": "عنابة",
      "code": 23001
    },
    {
      "name": "berrahal",
      "arName": "برحال",
      "code": 23002
    },
    {
      "name": "el hadjar",
      "arName": "الحجار",
      "code": 23003
    },
    {
      "name": "eulma",
      "arName": "العلمة",
      "code": 23004
    },
    {
      "name": "el bouni",
      "arName": "البوني",
      "code": 23005
    },
    {
      "name": "oued el aneb",
      "arName": "وادي العنب",
      "code": 23006
    },
    {
      "name": "cheurfa",
      "arName": "الشرفة",
      "code": 23007
    },
    {
      "name": "seraïdi",
      "arName": "سرايدي",
      "code": 23008
    },
    {
      "name": "aïn berda",
      "arName": "عين الباردة",
      "code": 23009
    },
    {
      "name": "chetaïbi",
      "arName": "شطايبي",
      "code": 23010
    },
    {
      "name": "sidi amar",
      "arName": "سيدي عمار",
      "code": 23011
    },
    {
      "name": "treat",
      "arName": "تريعات",
      "code": 23012
    }
  ],
  "24": [
    {
      "name": "aïn ben beida",
      "arName": "عين بن بيضاء",
      "code": 24001
    },
    {
      "name": "aïn larbi",
      "arName": "عين العربي",
      "code": 24002
    },
    {
      "name": "aïn makhlouf",
      "arName": "عين مخلوف",
      "code": 24003
    },
    {
      "name": "aïn reggada",
      "arName": "عين رقادة",
      "code": 24004
    },
    {
      "name": "aïn sandel",
      "arName": "عين صندل",
      "code": 24005
    },
    {
      "name": "belkheir",
      "arName": "بلخير",
      "code": 24006
    },
    {
      "name": "ben djerrah",
      "arName": "بن جراح",
      "code": 24007
    },
    {
      "name": "beni mezline",
      "arName": "بني مزلين",
      "code": 24008
    },
    {
      "name": "bordj sabath",
      "arName": "برج صباط",
      "code": 24009
    },
    {
      "name": "bouhachana",
      "arName": "بوحشانة",
      "code": 24010
    },
    {
      "name": "bouhamdane",
      "arName": "بوحمدان",
      "code": 24011
    },
    {
      "name": "bouati mahmoud",
      "arName": "بوعاطي محمود",
      "code": 24012
    },
    {
      "name": "bouchegouf",
      "arName": "بوشقوف",
      "code": 24013
    },
    {
      "name": "boumahra ahmed",
      "arName": "بومهرة أحمد",
      "code": 24014
    },
    {
      "name": "dahouara",
      "arName": "الدهوارة",
      "code": 24015
    },
    {
      "name": "djeballah khemissi",
      "arName": "جبالة لخميسي",
      "code": 24016
    },
    {
      "name": "el fedjoudj",
      "arName": "الفجوج",
      "code": 24017
    },
    {
      "name": "guellat bou sbaa",
      "arName": "قلعة بوصبع",
      "code": 24018
    },
    {
      "name": "guelma",
      "arName": "قالمة",
      "code": 24019
    },
    {
      "name": "hammam debagh",
      "arName": "حمام دباغ",
      "code": 24020
    },
    {
      "name": "hammam n'bail",
      "arName": "حمام النبايل",
      "code": 24021
    },
    {
      "name": "héliopolis",
      "arName": "هيليوبوليس",
      "code": 24022
    },
    {
      "name": "houari boumédiène",
      "arName": "هواري بومدين",
      "code": 24023
    },
    {
      "name": "khezarra",
      "arName": "لخزارة",
      "code": 24024
    },
    {
      "name": "medjez amar",
      "arName": "مجاز عمار",
      "code": 24025
    },
    {
      "name": "medjez sfa",
      "arName": "مجاز الصفاء",
      "code": 24026
    },
    {
      "name": "nechmaya",
      "arName": "نشماية",
      "code": 24027
    },
    {
      "name": "oued cheham",
      "arName": "وادي الشحم",
      "code": 24028
    },
    {
      "name": "oued fragha",
      "arName": "وادي فراغة",
      "code": 24029
    },
    {
      "name": "oued zenati",
      "arName": "وادي الزناتي",
      "code": 24030
    },
    {
      "name": "ras el agba",
      "arName": "راس العقبة",
      "code": 24031
    },
    {
      "name": "roknia",
      "arName": "الركنية",
      "code": 24032
    },
    {
      "name": "sellaoua announa",
      "arName": "سلاوة عنونة",
      "code": 24033
    },
    {
      "name": "tamlouka",
      "arName": "تاملوكة",
      "code": 24034
    }
  ],
  "25": [
    {
      "name": "aïn abid",
      "arName": "عين عبيد",
      "code": 25001
    },
    {
      "name": "aïn smara",
      "arName": "عين سمارة",
      "code": 25002
    },
    {
      "name": "beni hamiden",
      "arName": "بني حميدان",
      "code": 25003
    },
    {
      "name": "constantine",
      "arName": "قسنطينة",
      "code": 25004
    },
    {
      "name": "didouche mourad",
      "arName": "ديدوش مراد",
      "code": 25005
    },
    {
      "name": "el khroub",
      "arName": "الخروب",
      "code": 25006
    },
    {
      "name": "hamma bouziane",
      "arName": "حامة بوزيان",
      "code": 25007
    },
    {
      "name": "ibn badis",
      "arName": "ابن باديس",
      "code": 25008
    },
    {
      "name": "ibn ziad",
      "arName": "ابن زياد",
      "code": 25009
    },
    {
      "name": "messaoud boudjriou",
      "arName": "مسعود بوجريو",
      "code": 25010
    },
    {
      "name": "ouled rahmoune",
      "arName": "أولاد رحمون",
      "code": 25011
    },
    {
      "name": "zighoud youcef",
      "arName": "زيغود يوسف",
      "code": 25012
    }
  ],
  "26": [
    {
      "name": "aïn boucif",
      "arName": "عين بوسيف",
      "code": 26001
    },
    {
      "name": "aïn ouksir",
      "arName": "عين القصير",
      "code": 26002
    },
    {
      "name": "aissaouia",
      "arName": "العيساوية",
      "code": 26003
    },
    {
      "name": "aziz",
      "arName": "عزيز",
      "code": 26004
    },
    {
      "name": "baata",
      "arName": "بعطة",
      "code": 26005
    },
    {
      "name": "benchicao",
      "arName": "بن شكاو",
      "code": 26006
    },
    {
      "name": "beni slimane",
      "arName": "بني سليمان",
      "code": 26007
    },
    {
      "name": "berrouaghia",
      "arName": "البرواقية",
      "code": 26008
    },
    {
      "name": "bir ben laabed",
      "arName": "بئر بن عابد",
      "code": 26009
    },
    {
      "name": "boghar",
      "arName": "بوغار",
      "code": 26010
    },
    {
      "name": "bou aiche",
      "arName": "بوعيش",
      "code": 26011
    },
    {
      "name": "bouaichoune",
      "arName": "بوعيشون",
      "code": 26012
    },
    {
      "name": "bouchrahil",
      "arName": "بوشراحيل",
      "code": 26013
    },
    {
      "name": "boughezoul",
      "arName": "بوغزول",
      "code": 26014
    },
    {
      "name": "bouskene",
      "arName": "بوسكن",
      "code": 26015
    },
    {
      "name": "chahbounia",
      "arName": "الشهبونية",
      "code": 26016
    },
    {
      "name": "chellalet el adhaoura",
      "arName": "شلالة العذاورة",
      "code": 26017
    },
    {
      "name": "cheniguel",
      "arName": "شنيقل",
      "code": 26018
    },
    {
      "name": "derrag",
      "arName": "دراق",
      "code": 26019
    },
    {
      "name": "deux bassins",
      "arName": "فج الحوضين",
      "code": 26020
    },
    {
      "name": "djouab",
      "arName": "جواب",
      "code": 26021
    },
    {
      "name": "draa essamar",
      "arName": "ذراع السمار",
      "code": 26022
    },
    {
      "name": "el azizia",
      "arName": "العزيزية",
      "code": 26023
    },
    {
      "name": "el guelb el kebir",
      "arName": "القلب الكبير",
      "code": 26024
    },
    {
      "name": "el hamdania",
      "arName": "الحمدانية",
      "code": 26025
    },
    {
      "name": "el omaria",
      "arName": "العمارية",
      "code": 26026
    },
    {
      "name": "el ouinet",
      "arName": "العوينات",
      "code": 26027
    },
    {
      "name": "hannacha",
      "arName": "حناشة",
      "code": 26028
    },
    {
      "name": "kef lakhdar",
      "arName": "الكاف الأخضر",
      "code": 26029
    },
    {
      "name": "khams djouamaa",
      "arName": "خمس جوامع",
      "code": 26030
    },
    {
      "name": "ksar boukhari",
      "arName": "قصر البخاري",
      "code": 26031
    },
    {
      "name": "meghraoua",
      "arName": "مغراوة",
      "code": 26032
    },
    {
      "name": "médéa",
      "arName": "المدية",
      "code": 26033
    },
    {
      "name": "moudjbar",
      "arName": "مجبر",
      "code": 26034
    },
    {
      "name": "meftaha",
      "arName": "المفاتحة",
      "code": 26035
    },
    {
      "name": "mezerana",
      "arName": "مزغنة",
      "code": 26036
    },
    {
      "name": "mihoub",
      "arName": "ميهوب",
      "code": 26037
    },
    {
      "name": "ouamri",
      "arName": "وامري",
      "code": 26038
    },
    {
      "name": "oued harbil",
      "arName": "وادي حربيل",
      "code": 26039
    },
    {
      "name": "ouled antar",
      "arName": "أولاد عنتر",
      "code": 26040
    },
    {
      "name": "ouled bouachra",
      "arName": "أولاد بوعشرة",
      "code": 26041
    },
    {
      "name": "ouled brahim",
      "arName": "أولاد إبراهيم",
      "code": 26042
    },
    {
      "name": "ouled deide",
      "arName": "أولاد دايد",
      "code": 26043
    },
    {
      "name": "ouled hellal",
      "arName": "أولاد هلال",
      "code": 26044
    },
    {
      "name": "ouled maaref",
      "arName": "أولاد معرف",
      "code": 26045
    },
    {
      "name": "oum el djalil",
      "arName": "أم الجليل",
      "code": 26046
    },
    {
      "name": "ouzera",
      "arName": "وزرة",
      "code": 26047
    },
    {
      "name": "rebaia",
      "arName": "الربعية",
      "code": 26048
    },
    {
      "name": "saneg",
      "arName": "سانق",
      "code": 26049
    },
    {
      "name": "sedraia",
      "arName": "سدراية",
      "code": 26050
    },
    {
      "name": "seghouane",
      "arName": "سغوان",
      "code": 26051
    },
    {
      "name": "si mahdjoub",
      "arName": "سي المحجوب",
      "code": 26052
    },
    {
      "name": "sidi damed",
      "arName": "سيدي دامد",
      "code": 26053
    },
    {
      "name": "sidi errabia",
      "arName": "سيدي الربيع",
      "code": 26054
    },
    {
      "name": "sidi naamane",
      "arName": "سيدي نعمان",
      "code": 26055
    },
    {
      "name": "sidi zahar",
      "arName": "سيدي زهار",
      "code": 26056
    },
    {
      "name": "sidi ziane",
      "arName": "سيدي زيان",
      "code": 26057
    },
    {
      "name": "souagui",
      "arName": "السواقي",
      "code": 26058
    },
    {
      "name": "tablat",
      "arName": "تابلاط",
      "code": 26059
    },
    {
      "name": "tafraout",
      "arName": "تافراوت",
      "code": 26060
    },
    {
      "name": "tamesguida",
      "arName": "تمزقيدة",
      "code": 26061
    },
    {
      "name": "tizi mahdi",
      "arName": "تيزي المهدي",
      "code": 26062
    },
    {
      "name": "tlatet eddouar",
      "arName": "ثلاثة الدوائر",
      "code": 26063
    },
    {
      "name": "zoubiria",
      "arName": "الزبيرية",
      "code": 26064
    }
  ],
  "27": [
    {
      "name": "abdelmalek ramdane",
      "arName": "بن عبد المالك رمضان",
      "code": 27001
    },
    {
      "name": "achaacha",
      "arName": "عشعاشة",
      "code": 27002
    },
    {
      "name": "aïn boudinar",
      "arName": "عين بودينار",
      "code": 27003
    },
    {
      "name": "aïn nouissy",
      "arName": "عين النويصي",
      "code": 27004
    },
    {
      "name": "aïn sidi cherif",
      "arName": "عين سيدي شريف",
      "code": 27005
    },
    {
      "name": "aïn tedles",
      "arName": "عين تادلس",
      "code": 27006
    },
    {
      "name": "blad touahria",
      "arName": "الطواهرية",
      "code": 27007
    },
    {
      "name": "bouguirat",
      "arName": "بوقيرات",
      "code": 27008
    },
    {
      "name": "el hassiane",
      "arName": "الحسيان",
      "code": 27009
    },
    {
      "name": "fornaka",
      "arName": "فرناكة",
      "code": 27010
    },
    {
      "name": "hadjadj",
      "arName": "حجاج",
      "code": 27011
    },
    {
      "name": "hassi mameche",
      "arName": "حاسي مماش",
      "code": 27012
    },
    {
      "name": "khadra",
      "arName": "خضرة",
      "code": 27013
    },
    {
      "name": "kheireddine",
      "arName": "خير الدين",
      "code": 27014
    },
    {
      "name": "mansourah",
      "arName": "منصورة",
      "code": 27015
    },
    {
      "name": "mesra",
      "arName": "ماسرة",
      "code": 27016
    },
    {
      "name": "mazagran",
      "arName": "مزغران",
      "code": 27017
    },
    {
      "name": "mostaganem",
      "arName": "مستغانم",
      "code": 27018
    },
    {
      "name": "nekmaria",
      "arName": "نقمارية",
      "code": 27019
    },
    {
      "name": "oued el kheir",
      "arName": "واد الخير",
      "code": 27020
    },
    {
      "name": "ouled boughalem",
      "arName": "أولاد بوغالم",
      "code": 27021
    },
    {
      "name": "ouled maallah",
      "arName": "أولاد مع الله",
      "code": 27022
    },
    {
      "name": "safsaf",
      "arName": "الصفصاف",
      "code": 27023
    },
    {
      "name": "sayada",
      "arName": "صيادة",
      "code": 27024
    },
    {
      "name": "sidi ali",
      "arName": "سيدي علي",
      "code": 27025
    },
    {
      "name": "sidi belattar",
      "arName": "سيدي بلعطار",
      "code": 27026
    },
    {
      "name": "sidi lakhdar",
      "arName": "سيدي لخضر",
      "code": 27027
    },
    {
      "name": "sirat",
      "arName": "سيرات",
      "code": 27028
    },
    {
      "name": "souaflia",
      "arName": "السوافلية",
      "code": 27029
    },
    {
      "name": "sour",
      "arName": "الصور",
      "code": 27030
    },
    {
      "name": "stidia",
      "arName": "ستيدية",
      "code": 27031
    },
    {
      "name": "tazgait",
      "arName": "تازقايت",
      "code": 27032
    }
  ],
  "28": [
    {
      "name": "aïn el hadjel",
      "arName": "عين الحجل",
      "code": 28001
    },
    {
      "name": "aïn el melh",
      "arName": "عين الملح",
      "code": 28002
    },
    {
      "name": "aïn errich",
      "arName": "عين الريش",
      "code": 28003
    },
    {
      "name": "aïn fares",
      "arName": "عين فارس",
      "code": 28004
    },
    {
      "name": "aïn khadra",
      "arName": "عين الخضراء",
      "code": 28005
    },
    {
      "name": "belaiba",
      "arName": "بلعايبة",
      "code": 28006
    },
    {
      "name": "ben srour",
      "arName": "بن سرور",
      "code": 28007
    },
    {
      "name": "beni ilmane",
      "arName": "بني يلمان",
      "code": 28008
    },
    {
      "name": "benzouh",
      "arName": "بنزوه",
      "code": 28009
    },
    {
      "name": "berhoum",
      "arName": "برهوم",
      "code": 28010
    },
    {
      "name": "bir foda",
      "arName": "بئر الفضة",
      "code": 28011
    },
    {
      "name": "bou saâda",
      "arName": "بوسعادة",
      "code": 28012
    },
    {
      "name": "bouti sayah",
      "arName": "بوطي السايح",
      "code": 28013
    },
    {
      "name": "chellal",
      "arName": "شلال",
      "code": 28014
    },
    {
      "name": "dehahna",
      "arName": "الدهاهنة",
      "code": 28015
    },
    {
      "name": "djebel messaad",
      "arName": "جبل أمساعد",
      "code": 28016
    },
    {
      "name": "el hamel",
      "arName": "الهامل",
      "code": 28017
    },
    {
      "name": "el houamed",
      "arName": "الحوامد",
      "code": 28018
    },
    {
      "name": "hammam dhalaa",
      "arName": "حمام الضلعة",
      "code": 28019
    },
    {
      "name": "khettouti sed el djir",
      "arName": "خطوطي سد الجير",
      "code": 28020
    },
    {
      "name": "khoubana",
      "arName": "خبانة",
      "code": 28021
    },
    {
      "name": "maadid",
      "arName": "المعاضيد",
      "code": 28022
    },
    {
      "name": "maarif",
      "arName": "المعاريف",
      "code": 28023
    },
    {
      "name": "magra",
      "arName": "مقرة",
      "code": 28024
    },
    {
      "name": "m'cif",
      "arName": "مسيف",
      "code": 28025
    },
    {
      "name": "medjedel",
      "arName": "مجدل",
      "code": 28026
    },
    {
      "name": "m'sila",
      "arName": "المسيلة",
      "code": 28027
    },
    {
      "name": "m'tarfa",
      "arName": "المطارفة",
      "code": 28028
    },
    {
      "name": "ouanougha",
      "arName": "ونوغة",
      "code": 28029
    },
    {
      "name": "ouled addi guebala",
      "arName": "أولاد عدي القبالة",
      "code": 28030
    },
    {
      "name": "ouled atia",
      "arName": "أولاد عطية",
      "code": 28031
    },
    {
      "name": "mohammed boudiaf",
      "arName": "محمد بوضياف",
      "code": 28032
    },
    {
      "name": "ouled derradj",
      "arName": "أولاد دراج",
      "code": 28033
    },
    {
      "name": "ouled madhi",
      "arName": "أولاد ماضي",
      "code": 28034
    },
    {
      "name": "ouled mansour",
      "arName": "أولاد منصور",
      "code": 28035
    },
    {
      "name": "ouled sidi brahim",
      "arName": "أولاد سيدي إبراهيم",
      "code": 28036
    },
    {
      "name": "ouled slimane",
      "arName": "أولاد سليمان",
      "code": 28037
    },
    {
      "name": "oultem",
      "arName": "أولتام",
      "code": 28038
    },
    {
      "name": "sidi aïssa",
      "arName": "سيدي عيسى",
      "code": 28039
    },
    {
      "name": "sidi ameur",
      "arName": "سيدي عامر",
      "code": 28040
    },
    {
      "name": "sidi hadjeres",
      "arName": "سيدي هجرس",
      "code": 28041
    },
    {
      "name": "sidi m'hamed",
      "arName": "سيدي امحمد",
      "code": 28042
    },
    {
      "name": "slim",
      "arName": "سليم",
      "code": 28043
    },
    {
      "name": "souamaa",
      "arName": "الصوامع",
      "code": 28044
    },
    {
      "name": "tamsa",
      "arName": "تامسة",
      "code": 28045
    },
    {
      "name": "tarmount",
      "arName": "تارمونت",
      "code": 28046
    },
    {
      "name": "zarzour",
      "arName": "الزرزور",
      "code": 28047
    }
  ],
  "29": [
    {
      "name": "aïn fares",
      "arName": "عين فارس",
      "code": 29001
    },
    {
      "name": "aïn fekan",
      "arName": "عين فكان",
      "code": 29002
    },
    {
      "name": "aïn ferah",
      "arName": "عين فراح",
      "code": 29003
    },
    {
      "name": "aïn fras",
      "arName": "عين افرص",
      "code": 29004
    },
    {
      "name": "alaïmia",
      "arName": "العلايمية",
      "code": 29005
    },
    {
      "name": "aouf",
      "arName": "عوف",
      "code": 29006
    },
    {
      "name": "beniane",
      "arName": "البنيان",
      "code": 29007
    },
    {
      "name": "bou hanifia",
      "arName": "بوحنيفية",
      "code": 29008
    },
    {
      "name": "bou henni",
      "arName": "بوهني",
      "code": 29009
    },
    {
      "name": "chorfa",
      "arName": "الشرفة",
      "code": 29010
    },
    {
      "name": "el bordj",
      "arName": "البرج",
      "code": 29011
    },
    {
      "name": "el gaada",
      "arName": "القعدة",
      "code": 29012
    },
    {
      "name": "el ghomri",
      "arName": "الغمري",
      "code": 29013
    },
    {
      "name": "el guettana",
      "arName": "القيطنة",
      "code": 29014
    },
    {
      "name": "el keurt",
      "arName": "القرط",
      "code": 29015
    },
    {
      "name": "el menaouer",
      "arName": "المنور",
      "code": 29016
    },
    {
      "name": "ferraguig",
      "arName": "فراقيق",
      "code": 29017
    },
    {
      "name": "froha",
      "arName": "فروحة",
      "code": 29018
    },
    {
      "name": "gharrous",
      "arName": "غروس",
      "code": 29019
    },
    {
      "name": "guerdjoum",
      "arName": "قرجوم",
      "code": 29020
    },
    {
      "name": "ghriss",
      "arName": "غريس",
      "code": 29021
    },
    {
      "name": "hachem",
      "arName": "الهاشم",
      "code": 29022
    },
    {
      "name": "hacine",
      "arName": "حسين",
      "code": 29023
    },
    {
      "name": "khalouia",
      "arName": "خلوية",
      "code": 29024
    },
    {
      "name": "makdha",
      "arName": "ماقضة",
      "code": 29025
    },
    {
      "name": "mamounia",
      "arName": "المامونية",
      "code": 29026
    },
    {
      "name": "maoussa",
      "arName": "ماوسة",
      "code": 29027
    },
    {
      "name": "mascara",
      "arName": "معسكر",
      "code": 29028
    },
    {
      "name": "matemore",
      "arName": "مطمور",
      "code": 29029
    },
    {
      "name": "mocta douz",
      "arName": "مقطع دوز",
      "code": 29030
    },
    {
      "name": "mohammadia",
      "arName": "المحمدية",
      "code": 29031
    },
    {
      "name": "nesmoth",
      "arName": "نسموط",
      "code": 29032
    },
    {
      "name": "oggaz",
      "arName": "عقاز",
      "code": 29033
    },
    {
      "name": "oued el abtal",
      "arName": "وادي الأبطال",
      "code": 29034
    },
    {
      "name": "oued taria",
      "arName": "وادي تاغية",
      "code": 29035
    },
    {
      "name": "ras el aïn amirouche",
      "arName": "رأس عين عميروش",
      "code": 29036
    },
    {
      "name": "sedjerara",
      "arName": "سجرارة",
      "code": 29037
    },
    {
      "name": "sehailia",
      "arName": "السحايلية",
      "code": 29038
    },
    {
      "name": "sidi abdeldjebar",
      "arName": "سيدي عبد الجبار",
      "code": 29039
    },
    {
      "name": "sidi abdelmoumen",
      "arName": "سيدي عبد المؤمن",
      "code": 29040
    },
    {
      "name": "sidi kada",
      "arName": "سيدي قادة",
      "code": 29041
    },
    {
      "name": "sidi boussaid",
      "arName": "سيدي بوسعيد",
      "code": 29042
    },
    {
      "name": "sig",
      "arName": "سيق",
      "code": 29043
    },
    {
      "name": "tighennif",
      "arName": "تيغنيف",
      "code": 29044
    },
    {
      "name": "tizi",
      "arName": "تيزي",
      "code": 29045
    },
    {
      "name": "zahana",
      "arName": "زهانة",
      "code": 29046
    },
    {
      "name": "zelmata",
      "arName": "زلامطة",
      "code": 29047
    }
  ],
  "30": [
    {
      "name": "aïn beida",
      "arName": "ﻋﻴﻦ اﻟﺒﻴﻀﺎء",
      "code": 30001
    },
    {
      "name": "el borma",
      "arName": "اﻟﺒﺮﻣﺔ",
      "code": 30002
    },
    {
      "name": "hassi ben abdellah",
      "arName": "ﺣﺎﺳﻲ ﺑﻦ ﻋﺒﺪ اﷲ",
      "code": 30003
    },
    {
      "name": "hassi messaoud",
      "arName": "حاسي مسعود",
      "code": 30004
    },
    {
      "name": "n'goussa",
      "arName": "ﻧﻘﻮﺳﺔ",
      "code": 30005
    },
    {
      "name": "ouargla",
      "arName": "ورقلة",
      "code": 30006
    },
    {
      "name": "rouissat",
      "arName": "اﻟﺮوﻳﺴﺎت",
      "code": 30007
    },
    {
      "name": "sidi khouiled",
      "arName": "ﺳﻴﺪي ﺧﻮﻳﻠﺪ",
      "code": 30008
    },
    {
      "name": "el hadjira",
      "arName": "اﻟﺤﺠﻴﺮة",
      "code": 30009
    },
    {
      "name": "el allia",
      "arName": "اﻟﻌﺎﻟﻴﺔ",
      "code": 30010
    }
  ],
  "31": [
    {
      "name": "oran",
      "arName": "وهران",
      "code": 31001
    },
    {
      "name": "gdyel",
      "arName": "قديل",
      "code": 31002
    },
    {
      "name": "bir el djir",
      "arName": "بئر الجير",
      "code": 31003
    },
    {
      "name": "hassi bounif",
      "arName": "حاسي بونيف",
      "code": 31004
    },
    {
      "name": "es senia",
      "arName": "السانية",
      "code": 31005
    },
    {
      "name": "arzew",
      "arName": "أرزيو",
      "code": 31006
    },
    {
      "name": "bethioua",
      "arName": "بطيوة",
      "code": 31007
    },
    {
      "name": "marsa el hadjadj",
      "arName": "مرسى الحجاج",
      "code": 31008
    },
    {
      "name": "aïn el turk",
      "arName": "عين الترك",
      "code": 31009
    },
    {
      "name": "el ançor",
      "arName": "العنصر",
      "code": 31010
    },
    {
      "name": "oued tlelat",
      "arName": "وادي تليلات",
      "code": 31011
    },
    {
      "name": "tafraoui",
      "arName": "طفراوي",
      "code": 31012
    },
    {
      "name": "sidi el chahmi",
      "arName": "سيدي الشحمي",
      "code": 31013
    },
    {
      "name": "boufatis",
      "arName": "بوفاطيس",
      "code": 31014
    },
    {
      "name": "mers el kébir",
      "arName": "المرسى الكبير",
      "code": 31015
    },
    {
      "name": "bousfer",
      "arName": "بوسفر",
      "code": 31016
    },
    {
      "name": "el kerma",
      "arName": "الكرمة",
      "code": 31017
    },
    {
      "name": "el braya",
      "arName": "البرية",
      "code": 31018
    },
    {
      "name": "hassi ben okba",
      "arName": "حاسي بن عقبة",
      "code": 31019
    },
    {
      "name": "ben freha",
      "arName": "بن فريحة",
      "code": 31020
    },
    {
      "name": "hassi mefsoukh",
      "arName": "حاسي مفسوخ",
      "code": 31021
    },
    {
      "name": "sidi benyebka",
      "arName": "سيدي بن يبقى",
      "code": 31022
    },
    {
      "name": "misserghin",
      "arName": "مسرغين",
      "code": 31023
    },
    {
      "name": "boutlelis",
      "arName": "بوتليليس",
      "code": 31024
    },
    {
      "name": "aïn el kerma",
      "arName": "عين الكرمة",
      "code": 31025
    },
    {
      "name": "aïn el bia",
      "arName": "عين البية",
      "code": 31026
    }
  ],
  "32": [
    {
      "name": "el bayadh",
      "arName": "البيض",
      "code": 32001
    },
    {
      "name": "rogassa",
      "arName": "الرقاصة",
      "code": 32002
    },
    {
      "name": "stitten",
      "arName": "ستيتن",
      "code": 32003
    },
    {
      "name": "brezina",
      "arName": "بريزينة",
      "code": 32004
    },
    {
      "name": "ghassoul",
      "arName": "الغاسول",
      "code": 32005
    },
    {
      "name": "boualem",
      "arName": "بوعلام",
      "code": 32006
    },
    {
      "name": "el abiodh sidi cheikh",
      "arName": "الأبيض سيدي الشيخ",
      "code": 32007
    },
    {
      "name": "aïn el orak",
      "arName": "عين العراك",
      "code": 32008
    },
    {
      "name": "arbaouat",
      "arName": "أربوات",
      "code": 32009
    },
    {
      "name": "bougtoub",
      "arName": "بوقطب",
      "code": 32010
    },
    {
      "name": "el kheiter",
      "arName": "الخيثر",
      "code": 32011
    },
    {
      "name": "kef lahmar",
      "arName": "كاف لحمر",
      "code": 32012
    },
    {
      "name": "boussemghoun",
      "arName": "بوسمغون",
      "code": 32013
    },
    {
      "name": "chellala",
      "arName": "الشلالة",
      "code": 32014
    },
    {
      "name": "kraakda",
      "arName": "كراكدة",
      "code": 32015
    },
    {
      "name": "el bnoud",
      "arName": "البنود",
      "code": 32016
    },
    {
      "name": "cheguig",
      "arName": "شقيق",
      "code": 32017
    },
    {
      "name": "sidi ameur",
      "arName": "سيدي عمر",
      "code": 32018
    },
    {
      "name": "el mehara",
      "arName": "المحرة",
      "code": 32019
    },
    {
      "name": "tousmouline",
      "arName": "توسمولين",
      "code": 32020
    },
    {
      "name": "sidi slimane",
      "arName": "سيدي سليمان",
      "code": 32021
    },
    {
      "name": "sidi tifour",
      "arName": "سيدي طيفور",
      "code": 32022
    }
  ],
  "33": [
    {
      "name": "illizi",
      "arName": "ﻳﻠﻴﺰى",
      "code": 33001
    },
    {
      "name": "debdeb",
      "arName": "دبدب",
      "code": 33002
    },
    {
      "name": "bordj omar driss",
      "arName": "برج عمار إدريس",
      "code": 33003
    },
    {
      "name": "in amenas",
      "arName": "إن أمناس",
      "code": 33004
    }
  ],
  "34": [
    {
      "name": "aïn taghrout",
      "arName": "عين تاغروت",
      "code": 34001
    },
    {
      "name": "aïn tesra",
      "arName": "عين تسرة",
      "code": 34002
    },
    {
      "name": "belimour",
      "arName": "بليمور",
      "code": 34003
    },
    {
      "name": "ben daoud",
      "arName": "بن داود",
      "code": 34004
    },
    {
      "name": "bir kasdali",
      "arName": "بئر قصد علي",
      "code": 34005
    },
    {
      "name": "bordj bou arreridj",
      "arName": "برج بوعريريج",
      "code": 34006
    },
    {
      "name": "bordj ghédir",
      "arName": "برج الغدير",
      "code": 34007
    },
    {
      "name": "bordj zemoura",
      "arName": "برج زمورة",
      "code": 34008
    },
    {
      "name": "colla",
      "arName": "القلة",
      "code": 34009
    },
    {
      "name": "djaafra",
      "arName": "الجعافرة",
      "code": 34010
    },
    {
      "name": "el ach",
      "arName": "العش",
      "code": 34011
    },
    {
      "name": "el achir",
      "arName": "اليشير",
      "code": 34012
    },
    {
      "name": "el anseur",
      "arName": "العناصر",
      "code": 34013
    },
    {
      "name": "el hamadia",
      "arName": "الحمادية",
      "code": 34014
    },
    {
      "name": "el main",
      "arName": "الماين",
      "code": 34015
    },
    {
      "name": "el m'hir",
      "arName": "المهير",
      "code": 34016
    },
    {
      "name": "ghilassa",
      "arName": "غيلاسة",
      "code": 34017
    },
    {
      "name": "haraza",
      "arName": "حرازة",
      "code": 34018
    },
    {
      "name": "hasnaoua",
      "arName": "حسناوة",
      "code": 34019
    },
    {
      "name": "khelil",
      "arName": "خليل",
      "code": 34020
    },
    {
      "name": "ksour",
      "arName": "القصور",
      "code": 34021
    },
    {
      "name": "mansoura",
      "arName": "المنصورة",
      "code": 34022
    },
    {
      "name": "medjana",
      "arName": "مجانة",
      "code": 34023
    },
    {
      "name": "ouled brahem",
      "arName": "أولاد براهم",
      "code": 34024
    },
    {
      "name": "ouled dahmane",
      "arName": "أولاد دحمان",
      "code": 34025
    },
    {
      "name": "ouled sidi brahim",
      "arName": "أولاد سيدي إبراهيم",
      "code": 34026
    },
    {
      "name": "rabta",
      "arName": "الرابطة",
      "code": 34027
    },
    {
      "name": "ras el oued",
      "arName": "رأس الوادي",
      "code": 34028
    },
    {
      "name": "sidi embarek",
      "arName": "سيدي امبارك",
      "code": 34029
    },
    {
      "name": "tefreg",
      "arName": "تفرق",
      "code": 34030
    },
    {
      "name": "taglait",
      "arName": "تقلعيت",
      "code": 34031
    },
    {
      "name": "teniet en nasr",
      "arName": "ثنية النصر",
      "code": 34032
    },
    {
      "name": "tassameurt",
      "arName": "تاسمرت",
      "code": 34033
    },
    {
      "name": "tixter",
      "arName": "تكستار",
      "code": 34034
    }
  ],
  "35": [
    {
      "name": "afir",
      "arName": "اعفير",
      "code": 35001
    },
    {
      "name": "ammal",
      "arName": "عمال",
      "code": 35002
    },
    {
      "name": "baghlia",
      "arName": "بغلية",
      "code": 35003
    },
    {
      "name": "ben choud",
      "arName": "بن شود",
      "code": 35004
    },
    {
      "name": "beni amrane",
      "arName": "بني عمران",
      "code": 35005
    },
    {
      "name": "bordj menaïel",
      "arName": "برج منايل",
      "code": 35006
    },
    {
      "name": "boudouaou",
      "arName": "بودواو",
      "code": 35007
    },
    {
      "name": "boudouaou-el-bahri",
      "arName": "بودواو البحري",
      "code": 35008
    },
    {
      "name": "boumerdes",
      "arName": "بومرداس",
      "code": 35009
    },
    {
      "name": "bouzegza keddara",
      "arName": "قدارة",
      "code": 35010
    },
    {
      "name": "chabet el ameur",
      "arName": "شعبة العامر",
      "code": 35011
    },
    {
      "name": "corso",
      "arName": "قورصو",
      "code": 35012
    },
    {
      "name": "dellys",
      "arName": "دلس",
      "code": 35013
    },
    {
      "name": "djinet",
      "arName": "جنات",
      "code": 35014
    },
    {
      "name": "el kharrouba",
      "arName": "الخروبة",
      "code": 35015
    },
    {
      "name": "hammedi",
      "arName": "حمادي",
      "code": 35016
    },
    {
      "name": "issers",
      "arName": "يسر",
      "code": 35017
    },
    {
      "name": "khemis el-khechna",
      "arName": "خميس الخشنة",
      "code": 35018
    },
    {
      "name": "larbatache",
      "arName": "الأربعطاش",
      "code": 35019
    },
    {
      "name": "leghata",
      "arName": "لقاطة",
      "code": 35020
    },
    {
      "name": "naciria",
      "arName": "الناصرية",
      "code": 35021
    },
    {
      "name": "ouled aïssa",
      "arName": "أولاد عيسى",
      "code": 35022
    },
    {
      "name": "ouled hedadj",
      "arName": "أولاد هداج",
      "code": 35023
    },
    {
      "name": "ouled moussa",
      "arName": "أولاد موسى",
      "code": 35024
    },
    {
      "name": "si mustapha",
      "arName": "سي مصطفى",
      "code": 35025
    },
    {
      "name": "sidi daoud",
      "arName": "سيدي داود",
      "code": 35026
    },
    {
      "name": "souk el had",
      "arName": "سوق الحد",
      "code": 35027
    },
    {
      "name": "taourga",
      "arName": "تاورقة",
      "code": 35028
    },
    {
      "name": "thenia",
      "arName": "الثنية",
      "code": 35029
    },
    {
      "name": "tidjelabine",
      "arName": "تجلابين",
      "code": 35030
    },
    {
      "name": "timezrit",
      "arName": "تيمزريت",
      "code": 35031
    },
    {
      "name": "zemmouri",
      "arName": "زموري",
      "code": 35032
    }
  ],
  "36": [
    {
      "name": "aïn el assel",
      "arName": "عين العسل",
      "code": 36001
    },
    {
      "name": "aïn kerma",
      "arName": "عين الكرمة",
      "code": 36002
    },
    {
      "name": "asfour",
      "arName": "عصفور",
      "code": 36003
    },
    {
      "name": "ben mehidi",
      "arName": "بن مهيدي",
      "code": 36004
    },
    {
      "name": "berrihane",
      "arName": "بريحان",
      "code": 36005
    },
    {
      "name": "besbes",
      "arName": "البسباس",
      "code": 36006
    },
    {
      "name": "bougous",
      "arName": "بوقوس",
      "code": 36007
    },
    {
      "name": "bouhadjar",
      "arName": "بوحجار",
      "code": 36008
    },
    {
      "name": "bouteldja",
      "arName": "بوثلجة",
      "code": 36009
    },
    {
      "name": "chebaita mokhtar",
      "arName": "شبيطة مختار",
      "code": 36010
    },
    {
      "name": "chefia",
      "arName": "الشافية",
      "code": 36011
    },
    {
      "name": "chihani",
      "arName": "الشيحاني",
      "code": 36012
    },
    {
      "name": "dréan",
      "arName": "الذرعان",
      "code": 36013
    },
    {
      "name": "echatt",
      "arName": "الشط",
      "code": 36014
    },
    {
      "name": "el aioun",
      "arName": "العيون",
      "code": 36015
    },
    {
      "name": "el kala",
      "arName": "القالة",
      "code": 36016
    },
    {
      "name": "el tarf",
      "arName": "الطارف",
      "code": 36017
    },
    {
      "name": "hammam beni salah",
      "arName": "حمام بني صالح",
      "code": 36018
    },
    {
      "name": "lac des oiseaux",
      "arName": "بحيرة الطيور",
      "code": 36019
    },
    {
      "name": "oued zitoun",
      "arName": "واد الزيتون",
      "code": 36020
    },
    {
      "name": "raml souk",
      "arName": "رمل السوق",
      "code": 36021
    },
    {
      "name": "souarekh",
      "arName": "السوارخ",
      "code": 36022
    },
    {
      "name": "zerizer",
      "arName": "زريزر",
      "code": 36023
    },
    {
      "name": "zitouna",
      "arName": "الزيتونة",
      "code": 36024
    }
  ],
  "37": [
    {
      "name": "oum el assel",
      "arName": "أم العسل",
      "code": 37001
    },
    {
      "name": "tindouf",
      "arName": "تندوف",
      "code": 37002
    }
  ],
  "38": [
    {
      "name": "ammari",
      "arName": "عماري",
      "code": 38001
    },
    {
      "name": "beni chaib",
      "arName": "بني شعيب",
      "code": 38002
    },
    {
      "name": "beni lahcene",
      "arName": "بني لحسن",
      "code": 38003
    },
    {
      "name": "boucaid",
      "arName": "بوقايد",
      "code": 38004
    },
    {
      "name": "bordj bou naama",
      "arName": "برج بونعامة",
      "code": 38005
    },
    {
      "name": "bordj el emir abdelkader",
      "arName": "برج الأمير عبد القادر",
      "code": 38006
    },
    {
      "name": "khemisti",
      "arName": "خميستي",
      "code": 38007
    },
    {
      "name": "larbaâ",
      "arName": "الأربعاء",
      "code": 38008
    },
    {
      "name": "lardjem",
      "arName": "لرجام",
      "code": 38009
    },
    {
      "name": "layoune",
      "arName": "العيون",
      "code": 38010
    },
    {
      "name": "lazharia",
      "arName": "الأزهرية",
      "code": 38011
    },
    {
      "name": "maacem",
      "arName": "المعاصم",
      "code": 38012
    },
    {
      "name": "melaab",
      "arName": "الملعب",
      "code": 38013
    },
    {
      "name": "ouled bessem",
      "arName": "أولاد بسام",
      "code": 38014
    },
    {
      "name": "sidi abed",
      "arName": "سيدي عابد",
      "code": 38015
    },
    {
      "name": "sidi boutouchent",
      "arName": "سيدي بوتشنت",
      "code": 38016
    },
    {
      "name": "sidi lantri",
      "arName": "سيدي العنتري",
      "code": 38017
    },
    {
      "name": "sidi slimane",
      "arName": "سيدي سليمان",
      "code": 38018
    },
    {
      "name": "tamalaht",
      "arName": "تملاحت",
      "code": 38019
    },
    {
      "name": "theniet el had",
      "arName": "ثنية الأحد",
      "code": 38020
    },
    {
      "name": "tissemsilt",
      "arName": "تيسمسيلت",
      "code": 38021
    },
    {
      "name": "youssoufia",
      "arName": "اليوسفية",
      "code": 38022
    }
  ],
  "39": [
    {
      "name": "el oued",
      "arName": "الوادي",
      "code": 39001
    },
    {
      "name": "robbah",
      "arName": "الرباح",
      "code": 39002
    },
    {
      "name": "oued el alenda",
      "arName": "وادي العلندة",
      "code": 39003
    },
    {
      "name": "bayadha",
      "arName": "البياضة",
      "code": 39004
    },
    {
      "name": "nakhla",
      "arName": "النخلة",
      "code": 39005
    },
    {
      "name": "guemar",
      "arName": "قمار",
      "code": 39006
    },
    {
      "name": "kouinine",
      "arName": "كوينين",
      "code": 39007
    },
    {
      "name": "reguiba",
      "arName": "الرقيبة",
      "code": 39008
    },
    {
      "name": "hamraia",
      "arName": "الحمراية",
      "code": 39009
    },
    {
      "name": "taghzout",
      "arName": "تغزوت",
      "code": 39010
    },
    {
      "name": "debila",
      "arName": "الدبيلة",
      "code": 39011
    },
    {
      "name": "hassani abdelkrim",
      "arName": "حساني عبد الكريم",
      "code": 39012
    },
    {
      "name": "hassi khalifa",
      "arName": "حاسي خليفة",
      "code": 39013
    },
    {
      "name": "taleb larbi",
      "arName": "طالب العربي",
      "code": 39014
    },
    {
      "name": "douar el ma",
      "arName": "دوار الماء",
      "code": 39015
    },
    {
      "name": "sidi aoun",
      "arName": "سيدي عون",
      "code": 39016
    },
    {
      "name": "trifaoui",
      "arName": "الطريفاوي",
      "code": 39017
    },
    {
      "name": "magrane",
      "arName": "المقرن",
      "code": 39018
    },
    {
      "name": "ben guecha",
      "arName": "بن قشة",
      "code": 39019
    },
    {
      "name": "ourmes",
      "arName": "ورماس",
      "code": 39020
    },
    {
      "name": "el ogla",
      "arName": "العقلة",
      "code": 39021
    },
    {
      "name": "mih ouansa",
      "arName": "أميه ونسة",
      "code": 39022
    }
  ],
  "40": [
    {
      "name": "aïn touila",
      "arName": "عين الطويلة",
      "code": 40001
    },
    {
      "name": "babar",
      "arName": "بابار",
      "code": 40002
    },
    {
      "name": "baghai",
      "arName": "بغاي",
      "code": 40003
    },
    {
      "name": "bouhmama",
      "arName": "بوحمامة",
      "code": 40004
    },
    {
      "name": "chechar",
      "arName": "ششار",
      "code": 40005
    },
    {
      "name": "chelia",
      "arName": "شلية",
      "code": 40006
    },
    {
      "name": "el hamma",
      "arName": "الحامة",
      "code": 40007
    },
    {
      "name": "el mahmal",
      "arName": "المحمل",
      "code": 40008
    },
    {
      "name": "el oueldja",
      "arName": "الولجة",
      "code": 40009
    },
    {
      "name": "ensigha",
      "arName": "أنسيغة",
      "code": 40010
    },
    {
      "name": "kais",
      "arName": "قايس",
      "code": 40011
    },
    {
      "name": "khenchela",
      "arName": "خنشلة",
      "code": 40012
    },
    {
      "name": "khirane",
      "arName": "خيران",
      "code": 40013
    },
    {
      "name": "m'sara",
      "arName": "أمصارة",
      "code": 40014
    },
    {
      "name": "m'toussa",
      "arName": "متوسة",
      "code": 40015
    },
    {
      "name": "ouled rechache",
      "arName": "أولاد رشاش",
      "code": 40016
    },
    {
      "name": "remila",
      "arName": "الرميلة",
      "code": 40017
    },
    {
      "name": "tamza",
      "arName": "طامزة",
      "code": 40018
    },
    {
      "name": "taouzient",
      "arName": "تاوزيانت",
      "code": 40019
    },
    {
      "name": "yabous",
      "arName": "يابوس",
      "code": 40020
    }
  ],
  "41": [
    {
      "name": "souk ahras",
      "arName": "سوق أهراس",
      "code": 41001
    },
    {
      "name": "sedrata",
      "arName": "سدراتة",
      "code": 41002
    },
    {
      "name": "hanancha",
      "arName": "الحنانشة",
      "code": 41003
    },
    {
      "name": "mechroha",
      "arName": "المشروحة",
      "code": 41004
    },
    {
      "name": "ouled driss",
      "arName": "أولاد إدريس",
      "code": 41005
    },
    {
      "name": "tiffech",
      "arName": "تيفاش",
      "code": 41006
    },
    {
      "name": "zaarouria",
      "arName": "الزعرورية",
      "code": 41007
    },
    {
      "name": "taoura",
      "arName": "تاورة",
      "code": 41008
    },
    {
      "name": "dréa",
      "arName": "الدريعة",
      "code": 41009
    },
    {
      "name": "heddada",
      "arName": "الحدادة",
      "code": 41010
    },
    {
      "name": "khedara",
      "arName": "الخضارة",
      "code": 41011
    },
    {
      "name": "merahna",
      "arName": "المراهنة",
      "code": 41012
    },
    {
      "name": "ouled moumene",
      "arName": "أولاد مؤمن",
      "code": 41013
    },
    {
      "name": "bir bou haouch",
      "arName": "بئر بوحوش",
      "code": 41014
    },
    {
      "name": "m'daourouch",
      "arName": "مداوروش",
      "code": 41015
    },
    {
      "name": "oum el adhaim",
      "arName": "أم العظائم",
      "code": 41016
    },
    {
      "name": "aïn zana",
      "arName": "عين زانة",
      "code": 41017
    },
    {
      "name": "aïn soltane",
      "arName": "عين سلطان",
      "code": 41018
    },
    {
      "name": "ouillen",
      "arName": "ويلان",
      "code": 41019
    },
    {
      "name": "sidi fredj",
      "arName": "سيدي فرج",
      "code": 41020
    },
    {
      "name": "سافل الويدان",
      "arName": "null",
      "code": 41021
    },
    {
      "name": "ragouba",
      "arName": "الراقوبة",
      "code": 41022
    },
    {
      "name": "khemissa",
      "arName": "خميسة",
      "code": 41023
    },
    {
      "name": "oued keberit",
      "arName": "وادي الكبريت",
      "code": 41024
    },
    {
      "name": "terraguelt",
      "arName": "ترقالت",
      "code": 41025
    },
    {
      "name": "zouabi",
      "arName": "الزوابي",
      "code": 41026
    }
  ],
  "42": [
    {
      "name": "tipaza",
      "arName": "تيبازة",
      "code": 42001
    },
    {
      "name": "menaceur",
      "arName": "مناصر",
      "code": 42002
    },
    {
      "name": "larhat",
      "arName": "لارهاط",
      "code": 42003
    },
    {
      "name": "douaouda",
      "arName": "دواودة",
      "code": 42004
    },
    {
      "name": "bourkika",
      "arName": "بورقيقة",
      "code": 42005
    },
    {
      "name": "khemisti",
      "arName": "خميستي",
      "code": 42006
    },
    {
      "name": "aghbal",
      "arName": "أغبال",
      "code": 42007
    },
    {
      "name": "hadjout",
      "arName": "حجوط",
      "code": 42008
    },
    {
      "name": "sidi amar",
      "arName": "سيدي عمار",
      "code": 42009
    },
    {
      "name": "gouraya",
      "arName": "قوراية",
      "code": 42010
    },
    {
      "name": "nador",
      "arName": "الناظور",
      "code": 42011
    },
    {
      "name": "chaiba",
      "arName": "الشعيبة",
      "code": 42012
    },
    {
      "name": "aïn tagourait",
      "arName": "عين تقورايت",
      "code": 42013
    },
    {
      "name": "cherchell",
      "arName": "شرشال",
      "code": 42014
    },
    {
      "name": "damous",
      "arName": "الداموس",
      "code": 42015
    },
    {
      "name": "merad",
      "arName": "مراد",
      "code": 42016
    },
    {
      "name": "fouka",
      "arName": "فوكة",
      "code": 42017
    },
    {
      "name": "bou ismaïl",
      "arName": "بو إسماعيل",
      "code": 42018
    },
    {
      "name": "ahmar el aïn",
      "arName": "حمر العين",
      "code": 42019
    },
    {
      "name": "bouharoun",
      "arName": "بوهارون",
      "code": 42020
    },
    {
      "name": "sidi ghiles",
      "arName": "سيدي غيلاس",
      "code": 42021
    },
    {
      "name": "messelmoun",
      "arName": "مسلمون",
      "code": 42022
    },
    {
      "name": "sidi rached",
      "arName": "سيدي راشد",
      "code": 42023
    },
    {
      "name": "koléa",
      "arName": "القليعة",
      "code": 42024
    },
    {
      "name": "attatba",
      "arName": "حطاطبة",
      "code": 42025
    },
    {
      "name": "sidi semiane",
      "arName": "سيدي سميان",
      "code": 42026
    },
    {
      "name": "beni milleuk",
      "arName": "بني مليك",
      "code": 42027
    },
    {
      "name": "hadjeret ennous",
      "arName": "حجرة النصs",
      "code": 42028
    }
  ],
  "43": [
    {
      "name": "ahmed rachedi",
      "arName": "أحمد راشدي",
      "code": 43001
    },
    {
      "name": "aïn beida harriche",
      "arName": "عين البيضاء حريش",
      "code": 43002
    },
    {
      "name": "aïn mellouk",
      "arName": "عين الملوك",
      "code": 43003
    },
    {
      "name": "aïn tine",
      "arName": "عين التين",
      "code": 43004
    },
    {
      "name": "amira arrès",
      "arName": "عميرة أراس",
      "code": 43005
    },
    {
      "name": "benyahia abderrahmane",
      "arName": "بن يحيى عبد الرحمان",
      "code": 43006
    },
    {
      "name": "bouhatem",
      "arName": "بوحاتم",
      "code": 43007
    },
    {
      "name": "chelghoum laid",
      "arName": "شلغوم العيد",
      "code": 43008
    },
    {
      "name": "chigara",
      "arName": "الشيقارة",
      "code": 43009
    },
    {
      "name": "derradji bousselah",
      "arName": "دراحي بوصلاح",
      "code": 43010
    },
    {
      "name": "el mechira",
      "arName": "المشيرة",
      "code": 43011
    },
    {
      "name": "elayadi barbes",
      "arName": "العياضي برباس",
      "code": 43012
    },
    {
      "name": "ferdjioua",
      "arName": "فرجيوة",
      "code": 43013
    },
    {
      "name": "grarem gouga",
      "arName": "القرارم قوقة",
      "code": 43014
    },
    {
      "name": "hamala",
      "arName": "حمالة",
      "code": 43015
    },
    {
      "name": "mila",
      "arName": "ميلة",
      "code": 43016
    },
    {
      "name": "minar zarza",
      "arName": "مينار زارزة",
      "code": 43017
    },
    {
      "name": "oued athmania",
      "arName": "وادي العثمانية",
      "code": 43018
    },
    {
      "name": "oued endja",
      "arName": "وادي النجاء",
      "code": 43019
    },
    {
      "name": "oued seguen",
      "arName": "وادي سقان",
      "code": 43020
    },
    {
      "name": "ouled khalouf",
      "arName": "أولاد خلوف",
      "code": 43021
    },
    {
      "name": "rouached",
      "arName": "الرواشد",
      "code": 43022
    },
    {
      "name": "sidi khelifa",
      "arName": "سيدي خليفة",
      "code": 43023
    },
    {
      "name": "sidi merouane",
      "arName": "سيدي مروان",
      "code": 43024
    },
    {
      "name": "tadjenanet",
      "arName": "تاجنانت",
      "code": 43025
    },
    {
      "name": "tassadane haddada",
      "arName": "تسدان حدادة",
      "code": 43026
    },
    {
      "name": "teleghma",
      "arName": "التلاغمة",
      "code": 43027
    },
    {
      "name": "terrai bainen",
      "arName": "ترعي باينان",
      "code": 43028
    },
    {
      "name": "tessala lemtaï",
      "arName": "تسالة لمطاعي",
      "code": 43029
    },
    {
      "name": "tiberguent",
      "arName": "تبرقنت",
      "code": 43030
    },
    {
      "name": "yahia beni guecha",
      "arName": "يحيى بن قشة",
      "code": 43031
    },
    {
      "name": "zeghaia",
      "arName": "زغاية",
      "code": 43032
    }
  ],
  "44": [
    {
      "name": "aïn beniane",
      "arName": "عين بنيان",
      "code": 44001
    },
    {
      "name": "aïn bouyahia",
      "arName": "عين بويحيى",
      "code": 44002
    },
    {
      "name": "aïn defla",
      "arName": "عين الدفلى",
      "code": 44003
    },
    {
      "name": "aïn lechiekh",
      "arName": "عين لشياخ",
      "code": 44004
    },
    {
      "name": "aïn soltane",
      "arName": "عين سلطان",
      "code": 44005
    },
    {
      "name": "aïn torki",
      "arName": "عين تركي",
      "code": 44006
    },
    {
      "name": "arib",
      "arName": "عريب",
      "code": 44007
    },
    {
      "name": "bathia",
      "arName": "بطحية",
      "code": 44008
    },
    {
      "name": "belaas",
      "arName": "بلعاص",
      "code": 44009
    },
    {
      "name": "ben allal",
      "arName": "بن علال",
      "code": 44010
    },
    {
      "name": "birbouche",
      "arName": "بربوش",
      "code": 44011
    },
    {
      "name": "bir ould khelifa",
      "arName": "بئر ولد خليفة",
      "code": 44012
    },
    {
      "name": "bordj emir khaled",
      "arName": "برج الأمير خالد",
      "code": 44013
    },
    {
      "name": "boumedfaa",
      "arName": "بومدفع",
      "code": 44014
    },
    {
      "name": "bourached",
      "arName": "بوراشد",
      "code": 44015
    },
    {
      "name": "djelida",
      "arName": "جليدة",
      "code": 44016
    },
    {
      "name": "djemaa ouled cheikh",
      "arName": "جمعة ولاد الشيخ",
      "code": 44017
    },
    {
      "name": "djendel",
      "arName": "جندل",
      "code": 44018
    },
    {
      "name": "el abadia",
      "arName": "العبادية",
      "code": 44019
    },
    {
      "name": "el amra",
      "arName": "العامرة",
      "code": 44020
    },
    {
      "name": "el attaf",
      "arName": "العطاف",
      "code": 44021
    },
    {
      "name": "el hassania",
      "arName": "الحسنية",
      "code": 44022
    },
    {
      "name": "el maine",
      "arName": "الماين",
      "code": 44023
    },
    {
      "name": "hammam righa",
      "arName": "حمام ريغة",
      "code": 44024
    },
    {
      "name": "hoceinia",
      "arName": "الحسينية",
      "code": 44025
    },
    {
      "name": "khemis miliana",
      "arName": "خميس مليانة",
      "code": 44026
    },
    {
      "name": "mekhatria",
      "arName": "المخاطرية",
      "code": 44027
    },
    {
      "name": "miliana",
      "arName": "مليانة",
      "code": 44028
    },
    {
      "name": "oued chorfa",
      "arName": "واد الشرفاء",
      "code": 44029
    },
    {
      "name": "oued djemaa",
      "arName": "وادي الجمعة",
      "code": 44030
    },
    {
      "name": "rouina",
      "arName": "الروينة",
      "code": 44031
    },
    {
      "name": "sidi lakhdar",
      "arName": "سيدي الأخضر",
      "code": 44032
    },
    {
      "name": "tacheta zougagha",
      "arName": "تاشتة زقاغة",
      "code": 44033
    },
    {
      "name": "tarik ibn ziad",
      "arName": "طارق بن زياد",
      "code": 44034
    },
    {
      "name": "tiberkanine",
      "arName": "تيبركانين",
      "code": 44035
    },
    {
      "name": "zeddine",
      "arName": "زدين",
      "code": 44036
    }
  ],
  "45": [
    {
      "name": "naâma",
      "arName": "النعامة",
      "code": 45001
    },
    {
      "name": "mecheria",
      "arName": "المشرية",
      "code": 45002
    },
    {
      "name": "aïn sefra",
      "arName": "عين الصفراء",
      "code": 45003
    },
    {
      "name": "tiout",
      "arName": "تيوت",
      "code": 45004
    },
    {
      "name": "sfissifa",
      "arName": "صفيصيفة",
      "code": 45005
    },
    {
      "name": "moghrar",
      "arName": "مغرار",
      "code": 45006
    },
    {
      "name": "assela",
      "arName": "عسلة",
      "code": 45007
    },
    {
      "name": "djeniene bourezg",
      "arName": "جنين بورزق",
      "code": 45008
    },
    {
      "name": "aïn ben khelil",
      "arName": "عين بن خليل",
      "code": 45009
    },
    {
      "name": "makman ben amer",
      "arName": "مكمن بن عمار",
      "code": 45010
    },
    {
      "name": "kasdir",
      "arName": "القصدير",
      "code": 45011
    },
    {
      "name": "el biod",
      "arName": "البيوض",
      "code": 45012
    }
  ],
  "46": [
    {
      "name": "aghlal",
      "arName": "آغلال",
      "code": 46001
    },
    {
      "name": "aïn el arbaa",
      "arName": "عين الأربعاءعين الأربعاء",
      "code": 46002
    },
    {
      "name": "aïn kihal",
      "arName": "عين الكيحل",
      "code": 46003
    },
    {
      "name": "aïn témouchent",
      "arName": "عين تموشنت",
      "code": 46004
    },
    {
      "name": "aïn tolba",
      "arName": "عين الطلبة",
      "code": 46005
    },
    {
      "name": "aoubellil",
      "arName": "عقب الليل",
      "code": 46006
    },
    {
      "name": "beni saf",
      "arName": "بني صاف",
      "code": 46007
    },
    {
      "name": "bouzedjar",
      "arName": "بوزجار",
      "code": 46008
    },
    {
      "name": "chaabat el leham",
      "arName": "شعبة اللحم",
      "code": 46009
    },
    {
      "name": "chentouf",
      "arName": "شنتوف",
      "code": 46010
    },
    {
      "name": "el amria",
      "arName": "العامرية",
      "code": 46011
    },
    {
      "name": "el emir abdelkader",
      "arName": "الأمير عبد القادر",
      "code": 46012
    },
    {
      "name": "el malah",
      "arName": "المالح",
      "code": 46013
    },
    {
      "name": "el messaid",
      "arName": "امسعيد",
      "code": 46014
    },
    {
      "name": "hammam bouhadjar",
      "arName": "حمام بوحجر",
      "code": 46015
    },
    {
      "name": "hassasna",
      "arName": "الحساسنة",
      "code": 46016
    },
    {
      "name": "hassi el ghella",
      "arName": "حاسي الغلة",
      "code": 46017
    },
    {
      "name": "oued berkeche",
      "arName": "وادي برقش",
      "code": 46018
    },
    {
      "name": "oued sabah",
      "arName": "وادي الصباح",
      "code": 46019
    },
    {
      "name": "ouled boudjemaa",
      "arName": "اولاد بوجمعة",
      "code": 46020
    },
    {
      "name": "ouled kihal",
      "arName": "اولاد الكيحل",
      "code": 46021
    },
    {
      "name": "oulhaça el gheraba",
      "arName": "ولهاصة",
      "code": 46022
    },
    {
      "name": "sidi ben adda",
      "arName": "سيدي بن عدة",
      "code": 46023
    },
    {
      "name": "sidi boumedienne",
      "arName": "سيدي بومدين",
      "code": 46024
    },
    {
      "name": "sidi ouriache",
      "arName": "سيدي أورياش",
      "code": 46025
    },
    {
      "name": "sidi safi",
      "arName": "سيدي الصافي",
      "code": 46026
    },
    {
      "name": "tamzoura",
      "arName": "تامزوغة",
      "code": 46027
    },
    {
      "name": "terga",
      "arName": "تارقة",
      "code": 46028
    }
  ],
  "47": [
    {
      "name": "berriane",
      "arName": "بريان",
      "code": 47001
    },
    {
      "name": "bounoura",
      "arName": "بنورة",
      "code": 47002
    },
    {
      "name": "dhayet bendhahoua",
      "arName": "ضاية بن ضحوة",
      "code": 47003
    },
    {
      "name": "el atteuf",
      "arName": "العطف",
      "code": 47004
    },
    {
      "name": "el guerrara",
      "arName": "القرارة",
      "code": 47005
    },
    {
      "name": "ghardaïa",
      "arName": "غرداية",
      "code": 47006
    },
    {
      "name": "mansoura",
      "arName": "منصورة",
      "code": 47007
    },
    {
      "name": "metlili",
      "arName": "متليلي",
      "code": 47008
    },
    {
      "name": "sebseb",
      "arName": "سبسب",
      "code": 47009
    },
    {
      "name": "zelfana",
      "arName": "زلفانة",
      "code": 47010
    }
  ],
  "48": [
    {
      "name": "aïn rahma",
      "arName": "عين الرحمة",
      "code": 48001
    },
    {
      "name": "aïn tarek",
      "arName": "عين طارق",
      "code": 48002
    },
    {
      "name": "ammi moussa",
      "arName": "عمي موسى",
      "code": 48003
    },
    {
      "name": "belassel bouzegza",
      "arName": "بلعسل بوزغزة ",
      "code": 48004
    },
    {
      "name": "bendaoud",
      "arName": "بن داود",
      "code": 48005
    },
    {
      "name": "beni dergoun",
      "arName": "بني درقن",
      "code": 48006
    },
    {
      "name": "beni zentis",
      "arName": "بني زنطيس",
      "code": 48007
    },
    {
      "name": "dar ben abdellah",
      "arName": "دار بن عبد الله",
      "code": 48008
    },
    {
      "name": "djidioua",
      "arName": "جديوية",
      "code": 48009
    },
    {
      "name": "el guettar",
      "arName": "القطار",
      "code": 48010
    },
    {
      "name": "el hamadna",
      "arName": "الحمادنة",
      "code": 48011
    },
    {
      "name": "el hassi",
      "arName": "الحاسي",
      "code": 48012
    },
    {
      "name": "el matmar",
      "arName": "المطمر",
      "code": 48013
    },
    {
      "name": "el ouldja",
      "arName": "الولجة",
      "code": 48014
    },
    {
      "name": "had echkalla",
      "arName": "حد الشكالة",
      "code": 48015
    },
    {
      "name": "hamri",
      "arName": "حمري",
      "code": 48016
    },
    {
      "name": "kalaa",
      "arName": "القلعة",
      "code": 48017
    },
    {
      "name": "lahlef",
      "arName": "لحلاف",
      "code": 48018
    },
    {
      "name": "mazouna",
      "arName": "مازونة",
      "code": 48019
    },
    {
      "name": "mediouna",
      "arName": "مديونة",
      "code": 48020
    },
    {
      "name": "mendes",
      "arName": "منداس",
      "code": 48021
    },
    {
      "name": "merdja sidi abed",
      "arName": "مرجة سيدي عابد",
      "code": 48022
    },
    {
      "name": "ouarizane",
      "arName": "واريزان",
      "code": 48023
    },
    {
      "name": "oued essalem",
      "arName": "واد السلام",
      "code": 48024
    },
    {
      "name": "oued rhiou",
      "arName": "وادي ارهيو",
      "code": 48025
    },
    {
      "name": "ouled aiche",
      "arName": "أولاد يعيش",
      "code": 48026
    },
    {
      "name": "oued el djemaa",
      "arName": "واد الجمعة",
      "code": 48027
    },
    {
      "name": "ouled sidi mihoub",
      "arName": "أولاد سيدي الميهوب",
      "code": 48028
    },
    {
      "name": "ramka",
      "arName": "الرمكة",
      "code": 48029
    },
    {
      "name": "relizane",
      "arName": "غليزان",
      "code": 48030
    },
    {
      "name": "sidi khettab",
      "arName": "سيدي خطاب",
      "code": 48031
    },
    {
      "name": "sidi lazreg",
      "arName": "سيدي لزرق",
      "code": 48032
    },
    {
      "name": "sidi m'hamed ben ali",
      "arName": "سيدي امحمد بن علي",
      "code": 48033
    },
    {
      "name": "sidi m'hamed benaouda",
      "arName": "سيدي محمد بن عودة",
      "code": 48034
    },
    {
      "name": "sidi saada",
      "arName": "سيدي سعادة",
      "code": 48035
    },
    {
      "name": "souk el had",
      "arName": "سوق الحد",
      "code": 48036
    },
    {
      "name": "yellel",
      "arName": "يلل",
      "code": 48037
    },
    {
      "name": "zemmora",
      "arName": "زمورة",
      "code": 48038
    }
  ],
  "49": [
    {
      "name": "aougrout",
      "arName": "أوﻗﺮت",
      "code": 49001
    },
    {
      "name": "charouine",
      "arName": "ﺷﺮوﻳﻦ",
      "code": 49002
    },
    {
      "name": "deldoul",
      "arName": "دﻟﺪول",
      "code": 49003
    },
    {
      "name": "ksar kaddour",
      "arName": "قصر قدور",
      "code": 49004
    },
    {
      "name": "metarfa",
      "arName": "المطارفة",
      "code": 49005
    },
    {
      "name": "ouled aïssa",
      "arName": "وﻻد ﻋﻴﺴﻰ",
      "code": 49006
    },
    {
      "name": "ouled saïd",
      "arName": "أولاد السعيد",
      "code": 49007
    },
    {
      "name": "talmine",
      "arName": "ﻃﺎﻟﻤﻴﻦ",
      "code": 49008
    },
    {
      "name": "timimoun",
      "arName": "ﺗﻴﻤﻴﻤﻮن",
      "code": 49009
    },
    {
      "name": "tinerkouk",
      "arName": "تينركوك",
      "code": 49010
    }
  ],
  "50": [
    {
      "name": "bordj badji mokhtar",
      "arName": "ﺑﺮج ﺑﺎﺟﻰ ﻣﺨﺘﺎر",
      "code": 50001
    },
    {
      "name": "timiaouine",
      "arName": "ﺗﻴﻤﻴﺎوﻳﻦ",
      "code": 50002
    }
  ],
  "51": [
    {
      "name": "besbes",
      "arName": "البسباس",
      "code": 51001
    },
    {
      "name": "ech chaïba",
      "arName": "الشعيبة",
      "code": 51002
    },
    {
      "name": "doucen",
      "arName": "الدوسن",
      "code": 51003
    },
    {
      "name": "ouled djellal",
      "arName": "أولاد جلال",
      "code": 51004
    },
    {
      "name": "sidi khaled",
      "arName": "سيدي خالد",
      "code": 51005
    },
    {
      "name": "ras el miaad",
      "arName": "راس الميعاد",
      "code": 51006
    }
  ],
  "52": [
    {
      "name": "béni abbès",
      "arName": "بني عباس",
      "code": 52001
    },
    {
      "name": "beni ikhlef",
      "arName": "بني يخلف",
      "code": 52002
    },
    {
      "name": "el ouata",
      "arName": "الواتة",
      "code": 52003
    },
    {
      "name": "igli",
      "arName": "إقلي",
      "code": 52004
    },
    {
      "name": "kerzaz",
      "arName": "كرزاز",
      "code": 52005
    },
    {
      "name": "ksabi",
      "arName": "القصابي",
      "code": 52006
    },
    {
      "name": "oulad khodeir",
      "arName": "أولاد خضير",
      "code": 52007
    },
    {
      "name": "tabelbala",
      "arName": "تبلبالة",
      "code": 52008
    },
    {
      "name": "tamtert",
      "arName": "تامترت",
      "code": 52009
    },
    {
      "name": "timoudi",
      "arName": "تيمودي",
      "code": 52010
    }
  ],
  "53": [
    {
      "name": "in salah",
      "arName": "عين صالح",
      "code": 53001
    },
    {
      "name": "foggaret ezzaouia",
      "arName": "فقارة الزوى",
      "code": 53002
    },
    {
      "name": "in ghar",
      "arName": "إن غار",
      "code": 53003
    }
  ],
  "54": [
    {
      "name": "in guezzam",
      "arName": "عين قزام",
      "code": 54001
    },
    {
      "name": "tin zaouatine",
      "arName": "تين زاوتين",
      "code": 54002
    }
  ],
  "55": [
    {
      "name": "benaceur",
      "arName": "ﺑﻦ ﻧﺎﺻﺮ",
      "code": 55001
    },
    {
      "name": "blidet amor",
      "arName": "ﺑﻠﻴﺪة ﻋﺎﻣﺮ",
      "code": 55002
    },
    {
      "name": "el allia",
      "arName": "العالية",
      "code": 55003
    },
    {
      "name": "el hadjira",
      "arName": "الحجيرة",
      "code": 55004
    },
    {
      "name": "megarine",
      "arName": "اﻟﻤﻘﺎرﻳﻦ",
      "code": 55005
    },
    {
      "name": "m'naguer",
      "arName": "اﻟﻤﻨﻘﺮ",
      "code": 55006
    },
    {
      "name": "nezla",
      "arName": "ﻧﺰﻟﺔ",
      "code": 55007
    },
    {
      "name": "sidi slimane",
      "arName": "ﺳﻴﺪي ﺳﻠﻴﻤﺎن",
      "code": 55008
    },
    {
      "name": "taibet",
      "arName": "اﻟﻄﻴﺒﺎت",
      "code": 55009
    },
    {
      "name": "temacine",
      "arName": "ﺗﻤﺎﺳﻴﻦ",
      "code": 55010
    },
    {
      "name": "tebesbest",
      "arName": "ﺗﻴﺒسﺴﺖ",
      "code": 55011
    },
    {
      "name": "touggourt",
      "arName": "تقرت",
      "code": 55012
    },
    {
      "name": "zaouia el abidia",
      "arName": "ﻟﺰاوﻳﺔ اﻟﻌﺎﺑﺪﻳﺔ",
      "code": 55013
    }
  ],
  "56": [
    {
      "name": "djanet",
      "arName": "ﺟﺎﻧﺖ",
      "code": 56001
    },
    {
      "name": "bordj el gaouas",
      "arName": "ﺑﺮ ج اﻟﺤﻮاس",
      "code": 56002
    }
  ],
  "57": [
    {
      "name": "djamaa",
      "arName": "جامعة",
      "code": 57001
    },
    {
      "name": "el m'ghair",
      "arName": "المغير",
      "code": 57002
    },
    {
      "name": "merara",
      "arName": "المرارة",
      "code": 57003
    },
    {
      "name": "oum touyour",
      "arName": "أم الطيور",
      "code": 57004
    },
    {
      "name": "sidi amrane",
      "arName": "سيدي عمران",
      "code": 57005
    },
    {
      "name": "sidi khellil",
      "arName": "سيدي خليل",
      "code": 57006
    },
    {
      "name": "still",
      "arName": "سطيل",
      "code": 57007
    },
    {
      "name": "tendla",
      "arName": "تندلة",
      "code": 57008
    }
  ],
  "58": [
    {
      "name": "el menia",
      "arName": "المنيعة",
      "code": 58001
    },
    {
      "name": "hassi gara",
      "arName": "حاسي القارة",
      "code": 58002
    },
    {
      "name": "hassi fehal",
      "arName": "حاسي الفحل",
      "code": 58003
    }
  ]
}

export default townsData