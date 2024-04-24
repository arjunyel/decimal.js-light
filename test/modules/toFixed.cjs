if (typeof T === "undefined") require("../setup.cjs");

T("toFixed", function () {
	function t(expected, n, dp) {
		T.assertEqual(expected, new Decimal(n).toFixed(dp));
	}

	function tx(fn, msg) {
		T.assertException(fn, msg);
	}

	Decimal.config({
		precision: 20,
		rounding: 4,
		toExpNeg: -9e15,
		toExpPos: 9e15,
	});

	t("100.0", 99.9512986, 1);
	t("10.0", 9.95036, 1);
	t("1.0", 0.99, 1);
	t("0.10", 0.09906, 2);
	t("0.010", 0.0098034, 3);

	t("1111111111111111111111.00000000", "1111111111111111111111", 8);
	t("0.1", 0.1, 1);
	t("0.10", 0.1, 2);
	t("0.100", 0.1, 3);
	t("0.01", 0.01, 2);
	t("0.010", 0.01, 3);
	t("0.0100", 0.01, 4);
	t("0.00", 0.001, 2);
	t("0.001", 0.001, 3);
	t("0.0010", 0.001, 4);
	t("1.0000", 1, 4);
	t("1.0", 1, 1);
	t("1", 1, 0);
	t("12", 12, 0);
	t("1", 1.1, 0);
	t("12", 12.1, 0);
	t("1", 1.12, 0);
	t("12", 12.12, 0);
	t("0.0000006", 0.0000006, 7);
	t("0.00000006", 0.00000006, 8);
	t("0.000000060", 0.00000006, 9);
	t("0.0000000600", 0.00000006, 10);
	t("0", 0, 0);
	t("0.0", 0, 1);
	t("0.00", 0, 2);

	t("-1111111111111111111111.00000000", "-1111111111111111111111", 8);
	t("-0.1", -0.1, 1);
	t("-0.10", -0.1, 2);
	t("-0.100", -0.1, 3);
	t("-0.01", -0.01, 2);
	t("-0.010", -0.01, 3);
	t("-0.0100", -0.01, 4);
	t("-0.00", -0.001, 2);
	t("-0.001", -0.001, 3);
	t("-0.0010", -0.001, 4);
	t("-1.0000", -1, 4);
	t("-1.0", -1, 1);
	t("-1", -1, 0);
	t("-1", -1.1, 0);
	t("-12", -12.1, 0);
	t("-1", -1.12, 0);
	t("-12", -12.12, 0);
	t("-0.00000", -0.0000006, 5);
	t("-0.0000006", -0.0000006, 7);
	t("-0.00000006", -0.00000006, 8);
	t("-0.000000060", -0.00000006, 9);
	t("-0.0000000600", -0.00000006, 10);
	t("0", 0, 0);
	t("0", -0, 0);
	t("0.0", -0, 1);
	t("0.00", -0, 2);
	t("0.00", "-0.0", 2);
	t("0.00", "-0.0000", 2);
	t("0.0000", -0, 4);

	t("1000", 1000);
	t("0.00001", 0.00001);
	t("0.00001", 0.00001, 5);
	t("0.00000000000000000010", "0.0000000000000000001", 20);
	t("0.00001000000000000", 0.00001, 17);
	t("1.00000000000000000", 1, 17);
	t("1000000000000000128", "1000000000000000128");
	t("100000000000000128.0", "100000000000000128", 1);
	t("10000000000000128.00", "10000000000000128", 2);
	t("10000000000000128.00000000000000000000", "10000000000000128", 20);
	t("0", 0);
	t("-42.000", -42, 3);
	t("-1000000000000000128", "-1000000000000000128");
	t("-0.00000000000000000010", "-0.0000000000000000001", 20);
	t("0.12312312312312300000", "0.123123123123123", 20);

	t("1", 0.5, 0);
	t("-1", -0.5, 0);
	t("1.3", 1.25, 1);
	t("234.2041", 234.20405, 4);
	t("234.2041", "234.204050000000000000000000000000006", 4);

	Decimal.rounding = 0;

	t("0.000001", "0.000001", 6);
	t(
		"6552606716539719300271040797809220.3",
		"6552606716539719300271040797809220.237838405",
		1
	);
	t("25605410.260045950231371", "25605410.260045950231370974066", 15);
	t("-65593283.0000", "-65593283", 4);
	t(
		"-2238743875407788208860272230040067273281097722822075126.88000000000",
		"-2238743875407788208860272230040067273281097722822075126.88",
		11
	);
	t("-1714042659419404211.0000000", "-1714042659419404211", 7);
	t("580861301.000", "580861301", 3);
	t("-495746734.000", "-495746734", 3);
	t("-909962202.00000", "-909962202", 5);
	t("-6588.00", "-6588", 2);
	t("-89235424125324.000000", "-89235424125324", 6);
	t("-0.0001", "-0.0000000000177", 4);
	t("-0.1", "-0.000000000000007", 1);
	t(
		"7086047552021418140460170703933026989776558656.864197000000000",
		"7086047552021418140460170703933026989776558656.864197",
		15
	);
	t("-0.0000000001", "-0.0000000000000000007707", 10);
	t("6613833500.133407255728", "6613833500.133407255727325566781771", 12);
	t("-0.60", "-0.6", 2);
	t(
		"-5800577761301861465745732694236894834.347199790459214393940",
		"-5800577761301861465745732694236894834.34719979045921439394",
		21
	);
	t(
		"65495133621931312001260.90",
		"65495133621931312001260.89870016055223846451749943336585697",
		2
	);
	t("-0.0000001", "-0.0000000000021727264987520611266069544793244453321336", 7);
	t(
		"5138338134667513058267845351654.0073",
		"5138338134667513058267845351654.007282",
		4
	);
	t(
		"-419591612781413402.1606094651083282",
		"-419591612781413402.16060946510832813452",
		16
	);
	t("-842984708.00000", "-842984708", 5);
	t(
		"6094679992788973717749530934167375519948195193196.00000000000",
		"6094679992788973717749530934167375519948195193196",
		11
	);
	t("3070926.00", "3070926", 2);
	t("-0.0000000000000004274", "-0.00000000000000042733957907641417564294", 19);
	t("-307434.0", "-307434", 1);
	t(
		"-7155930111672774753753.84501482871023",
		"-7155930111672774753753.845014828710226",
		14
	);
	t("-204638.0", "-204638", 1);
	t("67354.81", "67354.801797", 2);
	t("0.000042911675", "0.000042911674899533228107357062", 12);
	t("-57865060735863.5903347110", "-57865060735863.590334711", 10);
	t("-0.00889", "-0.0088857", 5);
	t(
		"655593535442553089245040020344044.000000000000",
		"655593535442553089245040020344044",
		12
	);
	t(
		"-2077237944012133216588518213.9402",
		"-2077237944012133216588518213.9401561759783653376",
		4
	);
	t("3354.50", "3354.49314543", 2);
	t(
		"-0.00001",
		"-0.000000000000091204118667391473401958802734362777499449233",
		5
	);
	t(
		"-2817626898661648124242602088971648489124280903.00000000000000000000000",
		"-2817626898661648124242602088971648489124280903",
		23
	);
	t("-0.1138", "-0.1137406345875745478881089475981775971743", 4);
	t("372625.84", "372625.836933301", 2);
	t("-0.0001", "-0.0000000000030295", 4);

	Decimal.rounding = 1;

	t("0.3", "0.3", 1);
	t(
		"-200258348374.3",
		"-200258348374.3595802551014614089785610548492885372322083789",
		1
	);
	t(
		"-8996550690041157178188143247448286757711.5580857413",
		"-8996550690041157178188143247448286757711.55808574133329",
		10
	);
	t("-3172413669280032477.00", "-3172413669280032477", 2);
	t(
		"6547946357820.750067107731812021675",
		"6547946357820.750067107731812021675351468709784004",
		21
	);
	t(
		"24188393190716631282750407915133817062572333100239.0000000000000000000",
		"24188393190716631282750407915133817062572333100239",
		19
	);
	t(
		"539982361589798324286450574560330534901309503.82000000",
		"539982361589798324286450574560330534901309503.82",
		8
	);
	t("829898800701640360552652.0000", "829898800701640360552652", 4);
	t("-1585782773394.4", "-1585782773394.44501382110847", 1);
	t(
		"-7604844176594943774211951887242195107.399",
		"-7604844176594943774211951887242195107.399576743428669618164",
		3
	);
	t("-0.00", "-0.0000000000000005153003506839", 2);
	t("0.000", "0.00003", 3);
	t(
		"-5454249481540317712.560293859013731302",
		"-5454249481540317712.56029385901373130215526009738012974642338",
		18
	);
	t(
		"15352607654972198961429295651185206861818141054385638.00000000000000000",
		"15352607654972198961429295651185206861818141054385638",
		17
	);
	t(
		"91494535411039025233040.292",
		"91494535411039025233040.29224903220309368507011",
		3
	);
	t("2043369316.0", "2043369316", 1);
	t(
		"-0.0000000782350618457",
		"-0.0000000782350618457630647420312027682238301541350414",
		19
	);
	t("2122652.0", "2122652", 1);
	t("-0.00841365", "-0.00841365099301981489219310202029642", 8);
	t("0.0", "0.0007035", 1);
	t(
		"-0.00000000000000374916",
		"-0.0000000000000037491685778894015479084539735777088",
		20
	);
	t("534883638.00", "534883638", 2);
	t("-2.0", "-2", 1);
	t(
		"-5634442247266825358399629799939027370665.0000000000000000000",
		"-5634442247266825358399629799939027370665",
		19
	);
	t("3331187169219186569122.000000000", "3331187169219186569122", 9);
	t("0.0000000000", "0.0000000000006604395609805032330367635527", 10);
	t("-0.0000000000000576901", "-0.00000000000005769013292086168690493327", 19);
	t("-661.8", "-661.828596629053201916486", 1);
	t(
		"-6073555395665254434249128854999349235744174928042756.1153000000000",
		"-6073555395665254434249128854999349235744174928042756.1153",
		13
	);
	t("-5013086846966.000", "-5013086846966", 3);
	t("0.004015", "0.00401523226833", 6);
	t(
		"3140295374107374579919222510.1462722",
		"3140295374107374579919222510.1462722819395532",
		7
	);
	t("-0.000000", "-0.00000000000000799876460379334679831886", 6);
	t("-0.00", "-0.0003", 2);
	t(
		"-0.026760766726884267",
		"-0.026760766726884267750393307117624838556001925491",
		18
	);
	t(
		"-20821740502968847857923433558797.0899",
		"-20821740502968847857923433558797.08997487843745",
		4
	);
	t("0.00000000002", "0.000000000020346524414696573703092255317751132892", 11);
	t(
		"45492073832204366341299301624.000000000",
		"45492073832204366341299301624",
		9
	);

	Decimal.rounding = 2;

	t(
		"7810971819938620325901899057970512790433.0000000000000000",
		"7810971819938620325901899057970512790433",
		16
	);
	t("-623395.0", "-623395", 1);
	t(
		"81334094079413997693749807.000000000000",
		"81334094079413997693749807",
		12
	);
	t("790143966.5", "790143966.406169480041929356421", 1);
	t("-0.000485", "-0.0004851099615478", 6);
	t(
		"843581583868277359263.9721265",
		"843581583868277359263.97212648230399373761717",
		7
	);
	t("-921038771017147427324121032.000000", "-921038771017147427324121032", 6);
	t("-823.0", "-823", 1);
	t("505.0", "505", 1);
	t("-866703339332502.8636000", "-866703339332502.8636", 7);
	t("46.0", "46", 1);
	t("60042202798790129685.0000000", "60042202798790129685", 7);
	t("-1847392.0000", "-1847392", 4);
	t(
		"-4580251343840510165820631684073999841789879.0000000000000000000000",
		"-4580251343840510165820631684073999841789879",
		22
	);
	t(
		"3501378778000.539063748827265447",
		"3501378778000.5390637488272654464266281832626835121535730779",
		18
	);
	t("0.000000004686", "0.000000004685387489140232", 12);
	t("-0.0", "-0.0006", 1);
	t("-445677508.00", "-445677508", 2);
	t("0.0002", "0.00015099822561012723", 4);
	t(
		"-2992505698074499692367794831646886.0000000000000000",
		"-2992505698074499692367794831646886",
		16
	);
	t("5297873.59", "5297873.5869265978056497873793730268", 2);
	t("72978439324039191443182.00000000000", "72978439324039191443182", 11);
	t("0.66028387", "0.660283869505570207917431271006277981914716620876", 8);
	t("-232008389442485.0", "-232008389442485", 1);
	t("-2.371568", "-2.37156855939356279513952542004820909", 6);
	t(
		"731916154123696.1935",
		"731916154123696.193488323779184681349292529227446",
		4
	);
	t(
		"-793941153937799250384382615553258074.00000",
		"-793941153937799250384382615553258074",
		5
	);
	t("651002.00", "651002", 2);
	t("-61317874871.00", "-61317874871", 2);
	t("8673.00", "8673", 2);
	t(
		"-14490519736189597435728386282.030655",
		"-14490519736189597435728386282.0306558561264348956674",
		6
	);
	t("0.001", "0.00000000000002", 3);
	t("0.000009", "0.000008920984342", 6);
	t(
		"0.0000920957086395973679873",
		"0.000092095708639597367987279557138375172816422475",
		25
	);
	t(
		"28125849913667924088615.25407023317734",
		"28125849913667924088615.2540702331773399078402875044891",
		14
	);
	t("87.55538597", "87.55538596435839691343147", 8);
	t(
		"939705902083425775202905619379.0000000",
		"939705902083425775202905619379",
		7
	);
	t("7303936681469130614.8345000", "7303936681469130614.8345", 7);
	t("-5831852886782.68010000", "-5831852886782.6801", 8);
	t("-0.0000000", "-0.0000000213769530812", 7);

	Decimal.rounding = 3;

	t("0.0000", "0.00000000000584", 4);
	t(
		"-79055907138737329232.165677999092552368",
		"-79055907138737329232.1656779990925523674",
		18
	);
	t(
		"47206303530045536472421888342339.00000000",
		"47206303530045536472421888342339",
		8
	);
	t("3974.0", "3974", 1);
	t("1296297430771.39", "1296297430771.391670729445980444292", 2);
	t("0.000016", "0.00001686928031", 6);
	t("-0.00001", "-0.0000000000008", 5);
	t("4883938724383.000", "4883938724383", 3);
	t(
		"-5.4115622307",
		"-5.411562230628539329345282639155988044655000352687981880842",
		10
	);
	t("-0.01", "-0.0000000000155280115429218804426906540524", 2);
	t("-2730930776035874709906.00000", "-2730930776035874709906", 5);
	t("8419336352549424092369623.00000", "8419336352549424092369623", 5);
	t("52897.4", "52897.4", 1);
	t(
		"-783171007682720320053252521365465473997085.0",
		"-783171007682720320053252521365465473997085",
		1
	);
	t("0.8", "0.8", 1);
	t(
		"-0.00000000085280",
		"-0.000000000852796916216780032747621063045628213284",
		14
	);
	t("809486781065644418.9", "809486781065644418.939", 1);
	t("-9.0", "-9", 1);
	t("2399395.00", "2399395", 2);
	t(
		"-243707862514768528758611224374.0000000000000",
		"-243707862514768528758611224374",
		13
	);
	t("-87906.00", "-87906", 2);
	t(
		"-36206954271055061276640398631031143034683624940748.9970000000000000000000",
		"-36206954271055061276640398631031143034683624940748.997",
		22
	);
	t("0.00", "0.0000000000565885579252765288683939564608114096713", 2);
	t(
		"-8391656174313988740342135972218668561645437.0",
		"-8391656174313988740342135972218668561645437",
		1
	);
	t("2798706581453003.177239111", "2798706581453003.17723911167031", 9);
	t(
		"607781292230803273523112111.091726721140",
		"607781292230803273523112111.09172672114",
		12
	);
	t("-0.3", "-0.3", 1);
	t(
		"3008522535782692059736852844809784198247000184.0",
		"3008522535782692059736852844809784198247000184",
		1
	);
	t("14227.00", "14227", 2);
	t(
		"7841760307718014116576857993957.0000",
		"7841760307718014116576857993957",
		4
	);
	t("-0.00001", "-0.00000000000002596", 5);
	t("5247199732982111073.000000000", "5247199732982111073", 9);
	t("-12.0", "-12", 1);
	t("0.000", "0.00005", 3);
	t("-1383703062.0000", "-1383703062", 4);
	t("0.0051019245305169", "0.00510192453051698060366202631871161193", 16);
	t(
		"-45565092550117861497905653558246322559799.0",
		"-45565092550117861497905653558246322559799",
		1
	);
	t("-0.284", "-0.284", 3);
	t("-8962.00", "-8962", 2);
	t("49335989571.2173023", "49335989571.217302304037", 7);

	Decimal.rounding = 4;
	Decimal.toExpNeg = Decimal.toExpPos = 0;

	t(
		"733744593401073823825766410831877679446.0000000000000000000",
		"733744593401073823825766410831877679446",
		19
	);
	t("-64.6849459", "-64.6849458687691227978", 7);
	t("-0.000000", "-0.00000000009", 6);
	t(
		"-62537287527837589298857228059657673223234916.95923265430000000",
		"-62537287527837589298857228059657673223234916.9592326543",
		17
	);
	t(
		"3393668096256773847245721315080265089731.000000",
		"3393668096256773847245721315080265089731",
		6
	);
	t("0.0", "0.0000000000000056674956638008432348702401392", 1);
	t("72516372734.6", "72516372734.6447", 1);
	t("-418.28", "-418.2800731793741351", 2);
	t("0.00", "0.001", 2);
	t("8366217346845756726.00000000", "8366217346845756726", 8);
	t("-0.000000", "-0.0000000000000092034548636370987112234384736726", 6);
	t("0.35", "0.35474830751442135112334772517193392", 2);
	t("64703289793894.5830", "64703289793894.58296866", 4);
	t(
		"-0.000000000000000036",
		"-0.000000000000000036461242408590182363418943891",
		18
	);
	t(
		"5494508405056449117588.631948",
		"5494508405056449117588.631948458033233759999",
		6
	);
	t("-0.0", "-0.00393971618499838726739122333520030506235698", 1);
	t("375581290738585826632.00000000", "375581290738585826632", 8);
	t(
		"254.96635275802300887",
		"254.96635275802300886544776010389418575738792480979736",
		17
	);
	t(
		"21492347.69467571391498624445",
		"21492347.6946757139149862444482880595559468",
		20
	);
	t("313576441324233.0000000", "313576441324233", 7);
	t(
		"-534460490015293367127173277346694900936058.0000",
		"-534460490015293367127173277346694900936058",
		4
	);
	t(
		"182707431911537249021116759327712693311898345504618668.43327000000000000000000",
		"182707431911537249021116759327712693311898345504618668.43327",
		23
	);
	t(
		"210005324615278.4586839690045963321032",
		"210005324615278.458683969004596332103244549279",
		22
	);
	t(
		"779837001772884165637922377221951347134695.644834",
		"779837001772884165637922377221951347134695.6448338",
		6
	);
	t(
		"-0.000001",
		"-0.00000064188301390033596845335767993853284632527964514979079",
		6
	);
	t("13.0", "13", 1);
	t("0.0000001269", "0.0000001269060795648365813491128357427111184222", 10);
	t("18446632248354.00", "18446632248354", 2);
	t("-1229249.79", "-1229249.7897249259", 2);
	t("49082.0", "49082", 1);
	t("-61.0", "-61", 1);
	t("-893.0", "-893", 1);
	t(
		"5002282278.56974877690066484",
		"5002282278.569748776900664839184116538222902",
		17
	);
	t("41372.00", "41372", 2);
	t(
		"-4732022445962399687294885123498809.7625585825095",
		"-4732022445962399687294885123498809.7625585825095",
		13
	);
	t("-55484242.036895641", "-55484242.036895641", 9);
	t(
		"-41427133134.52583323427907663268339",
		"-41427133134.525833234279076632683393992706825",
		23
	);
	t("0.0", "0.00004300614085218825243480119971669264977421", 1);
	t(
		"-472025754597316278339412186866.7010659789",
		"-472025754597316278339412186866.701065978877597089729906019843",
		10
	);

	Decimal.rounding = 5;

	t("0.00", "0.00000000000000070362", 2);
	t("682377946933004839.0000000", "682377946933004839", 7);
	t(
		"0.000000000",
		"0.00000000000000301722508588270616971784651380892069087869575",
		9
	);
	t("-356330174906.7", "-356330174906.737986270704", 1);
	t(
		"771875969530483104163034745359742192923504.000000000000000",
		"771875969530483104163034745359742192923504",
		15
	);
	t("-85.57612133364", "-85.576121333642541652128540737082", 11);
	t("-796870619982006783.00000000", "-796870619982006783", 8);
	t("985819.0", "985819", 1);
	t("0.000000", "0.00000000000000000007093034243958", 6);
	t("-0.0000", "-0.0000000006400178083107075310177579449", 4);
	t("-105570971372984.0", "-105570971372984", 1);
	t(
		"4387745564661852845308.94229815083918",
		"4387745564661852845308.9422981508391799473309882",
		14
	);
	t("-3978043797116373.2", "-3978043797116373.159631", 1);
	t(
		"5.8961281424853232622595",
		"5.8961281424853232622594846548715356650909645537495738043051",
		22
	);
	t(
		"-0.0000081539970551874384495",
		"-0.000008153997055187438449482684680130340977472796176926",
		25
	);
	t("-65.0", "-65", 1);
	t("-24012940205869.000", "-24012940205869", 3);
	t("0.000000", "0.000000000000000066985234999507396", 6);
	t(
		"2935194283452.35738951157832206907124",
		"2935194283452.357389511578322069071242729133894",
		23
	);
	t("542060.7771", "542060.77713479586821060591807145320317", 4);
	t(
		"890815036528241639534803534813.592588608837168425865025",
		"890815036528241639534803534813.59258860883716842586502472472",
		24
	);
	t("685877749980391051.17", "685877749980391051.1715", 2);
	t(
		"47820177163147405231185068730213.894293",
		"47820177163147405231185068730213.89429254869826585947429821",
		6
	);
	t("1536364305.00", "1536364305", 2);
	t("-85825125.5810188", "-85825125.5810188298", 7);
	t(
		"-4983288214158634188.4572989",
		"-4983288214158634188.4572988600705359104",
		7
	);
	t("0.0000000000", "0.0000000000000000017929073", 10);
	t("-1684136337600384671.00000000", "-1684136337600384671", 8);
	t("567733137127609543.000000", "567733137127609543", 6);
	t("607675679770387.000", "607675679770387", 3);
	t("43727409067319.0", "43727409067319", 1);
	t("-77274559773372606.00", "-77274559773372606", 2);
	t("-28855643486070486857836.00000", "-28855643486070486857836", 5);
	t("-915356570870.00", "-915356570870.00041832252262829437239", 2);
	t("0.0", "0.00000000000004843552301428650828", 1);

	Decimal.rounding = 6;

	t(
		"-6614662975368684488885953285955838893900074215956.00",
		"-6614662975368684488885953285955838893900074215956",
		2
	);
	t("8642393776898.000", "8642393776898", 3);
	t(
		"3612207878528.1106344698085142865",
		"3612207878528.1106344698085142865438924419",
		19
	);
	t("977910386.93", "977910386.9343537", 2);
	t(
		"-8937937492688941768401276851642629965923372.0",
		"-8937937492688941768401276851642629965923372",
		1
	);
	t(
		"-8327876772303865517454752161.4376112752921904774",
		"-8327876772303865517454752161.43761127529219047742910886",
		19
	);
	t("-27707.00", "-27707", 2);
	t(
		"-7287595765894242586375.92700435484",
		"-7287595765894242586375.927004354837723619581861634319",
		11
	);
	t("-0.00000", "-0.000000000000023670858459165486137218740358207859", 5);
	t(
		"574676836802209077.64156",
		"574676836802209077.641563875647945277493356873895",
		5
	);
	t(
		"-3041038455237222898218053653661.87952947815",
		"-3041038455237222898218053653661.87952947815",
		11
	);
	t("-628244132307.000", "-628244132307", 3);
	t("316566935167341670725238.000", "316566935167341670725238", 3);
	t("-77953301569468294124105528.0", "-77953301569468294124105528", 1);
	t("0.0046", "0.00460227833968584", 4);
	t("4323265763616518980379929221104.0", "4323265763616518980379929221104", 1);
	t(
		"1674500565014237781637959673471730398.1120033",
		"1674500565014237781637959673471730398.1120032995511774",
		7
	);
	t("872559441430499650732600166.00000", "872559441430499650732600166", 5);
	t("-87858304.0000", "-87858304", 4);
	t("-4158788.000", "-4158788", 3);
	t("3983930437416823631395.9093", "3983930437416823631395.90934402583657", 4);
	t(
		"-14.5531937",
		"-14.5531936852106573016020290135814233645752955297443336",
		7
	);
	t(
		"0.00000000002201",
		"0.00000000002200503795474854372849141363413146996972",
		14
	);
	t(
		"0.0000000000000",
		"0.00000000000000000894955653982033503846831364474746320232",
		13
	);
	t("61564779.00", "61564779", 2);
	t("-7.0", "-7", 1);
	t(
		"-0.000000000000028455976228",
		"-0.00000000000002845597622815028653703372125435938812845106",
		24
	);
	t(
		"728982423193598397582409707715766595902844.0000000",
		"728982423193598397582409707715766595902844",
		7
	);
	t("14538075860529.2697937480", "14538075860529.269793748", 10);
	t("0.000", "0.00000000000000000007021566096", 3);
	t(
		"-5136066535080.86830591678842264063462546263",
		"-5136066535080.86830591678842264063462546262988980471309228558",
		29
	);
	t(
		"-3026751112367460839746524832112404665.000000000000000",
		"-3026751112367460839746524832112404665",
		15
	);

	t("0.5", "0.5");
	t("-0", "-0.5", 0);
	t("10.5", "10.5");
	t("0.05", "0.05");
	t("0.4", "0.4");
	t("0.6", "0.6");
	t("1.5", "1.5");
	t("-1.5", "-1.5");

	Decimal.rounding = 4;

	t("-535564000.00", "-535564000", 2);
	t("-80000000.000", "-80000000", 3);
	t("-240.0", "-240", 1);
	t("-7520000000.0", "-7520000000", 1);
	t("306550.000", "306550", 3);
	t("800000000.0", "800000000", 1);
	t("-454000000.00000", "-454000000", 5);
	t("60.0", "60", 1);
	t("-4700000.000", "-4700000", 3);
	t("25000.00", "25000", 2);
	t("6847.0", "6847", 1);
	t("780.0", "780", 1);
	t("-50.0", "-50", 1);
	t("700.0", "700", 1);
	t("412598000.0000", "412598000", 4);
	t("-84581600.0", "-84581600", 1);
	t("5590000.00", "5590000", 2);
	t("-66000.0", "-66000", 1);
	t("600.0", "600", 1);
	t("-513335000.000", "-513335000", 3);
	t("-40.0", "-40", 1);

	t(
		"-52536202527.13891931933498708496518913773517016037224",
		"-5.253620252713891931933498708496518913773517016037224E10"
	);
	t(
		"0.0000000000000008761383898703999300297605784533730922",
		"8.761383898703999300297605784533730922E-16"
	);
	t("-0.0000000000000000000000000000000000004", "-4E-37");
	t(
		"2832044194940.47654015529986948208",
		"2.83204419494047654015529986948208E12"
	);
	t("0.00000000000000000000000064668155275864837", "6.4668155275864837E-25");
	t("4.34128088694", "4.34128088694E0");
	t("-851957.6572615611436542", "-8.519576572615611436542E5");
	t(
		"-89097468286.2561077879598798580253771544265682053",
		"-8.90974682862561077879598798580253771544265682053E10"
	);
	t(
		"-0.000000000000000000000000000000000000000000000030409767",
		"-3.0409767E-47"
	);
	t(
		"0.000000000000000000004295112484112357722747956581254",
		"4.295112484112357722747956581254E-21"
	);
	t("-839203207475651.6542808578", "-8.392032074756516542808578E14");
	t("-0.00000000000000000078216", "-7.8216E-19");
	t(
		"-1782290274935701247734.21262413032385",
		"-1.78229027493570124773421262413032385E21"
	);
	t(
		"31669451104144801337076433457.18511076",
		"3.166945110414480133707643345718511076E28"
	);
	t("0.000000000000000000000000000000000000472351852761", "4.72351852761E-37");
	t(
		"-50155220217523568901083623.78842580174913602672593731",
		"-5.015522021752356890108362378842580174913602672593731E25"
	);
	t("-291.37", "-2.9137E2");
	t(
		"-52474611936456205886027195352961212383.2279441143",
		"-5.24746119364562058860271953529612123832279441143E37"
	);
	t("-326.9376463292543", "-3.269376463292543E2");
	t("0.00000000000044", "4.4E-13");
	t("0.000000087792449", "8.7792449E-8");
	t(
		"497835793870987132484033.938845920610565887398960253648",
		"4.97835793870987132484033938845920610565887398960253648E23"
	);
	t("-33960439442302770058.74863962", "-3.396043944230277005874863962E19");
	t(
		"0.00000000000000000000000000000000000000020694696587293782",
		"2.0694696587293782E-40"
	);

	t("123.45", "123.45");
	t("123", "123.45", 0);
	t("123", "123.45", -0);

	tx(function () {
		new Decimal(1.23).toFixed("3");
	}, "(1.23).toFixed('3')");
	tx(function () {
		new Decimal(1.23).toFixed(new Decimal("3"));
	}, "(1.23).toFixed(new Decimal('3'))");
	tx(function () {
		new Decimal(1.23).toFixed(null);
	}, "(1.23).toFixed(null)");
	tx(function () {
		new Decimal(1.23).toFixed(NaN);
	}, "(1.23).toFixed(NaN)");
	tx(function () {
		new Decimal(1.23).toFixed("NaN");
	}, "(1.23).toFixed('NaN')");
	tx(function () {
		new Decimal(1.23).toFixed([]);
	}, "(1.23).toFixed([])");
	tx(function () {
		new Decimal(1.23).toFixed({});
	}, "(1.23).toFixed({})");
	tx(function () {
		new Decimal(1.23).toFixed("");
	}, "(1.23).toFixed('')");
	tx(function () {
		new Decimal(1.23).toFixed(" ");
	}, "(1.23).toFixed(' ')");
	tx(function () {
		new Decimal(1.23).toFixed("hello");
	}, "(1.23).toFixed('hello')");
	tx(function () {
		new Decimal(1.23).toFixed("\t");
	}, "(1.23).toFixed('\t')");
	tx(function () {
		new Decimal(1.23).toFixed(new Date());
	}, "(1.23).toFixed(new Date)");
	tx(function () {
		new Decimal(1.23).toFixed(new RegExp());
	}, "(1.23).toFixed(new RegExp)");
	tx(function () {
		new Decimal(1.23).toFixed(2.01);
	}, "(1.23).toFixed(2.01)");
	tx(function () {
		new Decimal(1.23).toFixed(10.5);
	}, "(1.23).toFixed(10.5)");
	tx(function () {
		new Decimal(1.23).toFixed("1.1e1");
	}, "(1.23).toFixed('1.1e1')");
	tx(function () {
		new Decimal(1.23).toFixed(true);
	}, "(1.23).toFixed(true)");
	tx(function () {
		new Decimal(1.23).toFixed(false);
	}, "(1.23).toFixed(false)");
	tx(function () {
		new Decimal(1.23).toFixed(function () {});
	}, "(1.23).toFixed(function (){})");

	tx(function () {
		new Decimal("123.45").toFixed(1e9 + 1);
	}, ".toFixed(1e9 + 1)");
	tx(function () {
		new Decimal("123.45").toFixed("-0.01");
	}, ".toFixed('-0.01')");
	tx(function () {
		new Decimal("123.45").toFixed("-1e-1");
	}, ".toFixed('-1e-1')");
	tx(function () {
		new Decimal("123.45").toFixed(Infinity);
	}, ".toFixed(Infinity)");
	tx(function () {
		new Decimal("123.45").toFixed("-Infinity");
	}, ".toFixed('-Infinity')");

	tx(function () {
		new Decimal(1.23).toFixed(1, "3");
	}, "(1.23).toFixed(1, '3')");
	tx(function () {
		new Decimal(1.23).toFixed(1, new Decimal("3"));
	}, "(1.23).toFixed(1, new Decimal('3'))");
	tx(function () {
		new Decimal(1.23).toFixed(1, null);
	}, "(1.23).toFixed(1, null)");
	tx(function () {
		new Decimal(1.23).toFixed(1, NaN);
	}, "(1.23).toFixed(1, NaN)");
	tx(function () {
		new Decimal(1.23).toFixed(1, "NaN");
	}, "(1.23).toFixed(1, 'NaN')");
	tx(function () {
		new Decimal(1.23).toFixed(1, []);
	}, "(1.23).toFixed(1, [])");
	tx(function () {
		new Decimal(1.23).toFixed(1, {});
	}, "(1.23).toFixed(1, {})");
	tx(function () {
		new Decimal(1.23).toFixed(1, "");
	}, "(1.23).toFixed(1, '')");
	tx(function () {
		new Decimal(1.23).toFixed(1, " ");
	}, "(1.23).toFixed(1, ' ')");
	tx(function () {
		new Decimal(1.23).toFixed(1, "hello");
	}, "(1.23).toFixed(1, 'hello')");
	tx(function () {
		new Decimal(1.23).toFixed(1, "\t");
	}, "(1.23).toFixed(1, '\t')");
	tx(function () {
		new Decimal(1.23).toFixed(1, new Date());
	}, "(1.23).toFixed(1, new Date)");
	tx(function () {
		new Decimal(1.23).toFixed(1, new RegExp());
	}, "(1.23).toFixed(1, new RegExp)");
	tx(function () {
		new Decimal(1.23).toFixed(1, 2.01);
	}, "(1.23).toFixed(1, 2.01)");
	tx(function () {
		new Decimal(1.23).toFixed(1, 10.5);
	}, "(1.23).toFixed(1, 10.5)");
	tx(function () {
		new Decimal(1.23).toFixed(1, "1.1e1");
	}, "(1.23).toFixed(1, '1.1e1')");
	tx(function () {
		new Decimal(1.23).toFixed(1, true);
	}, "(1.23).toFixed(1, true)");
	tx(function () {
		new Decimal(1.23).toFixed(1, false);
	}, "(1.23).toFixed(1, false)");
	tx(function () {
		new Decimal(1.23).toFixed(1, function () {});
	}, "(1.23).toFixed(1, function (){})");

	tx(function () {
		new Decimal("123.45").toFixed(1, 9);
	}, ".toFixed(1, 9)");
	tx(function () {
		new Decimal("123.45").toFixed(1, "-0.01");
	}, ".toFixed(1, '-0.01')");
	tx(function () {
		new Decimal("123.45").toFixed(1, "-1e-1");
	}, ".toFixed(1, '-1e-1')");
	tx(function () {
		new Decimal("123.45").toFixed(1, Infinity);
	}, ".toFixed(1, Infinity)");
	tx(function () {
		new Decimal("123.45").toFixed(1, "-Infinity");
	}, ".toFixed(1, '-Infinity')");

	// ROUND_HALF_CEIL
	// Rounds towards nearest neighbour. If equidistant, rounds towards Infinity
	Decimal.rounding = 7;

	t("0.1", "0.05", 1);
	t("1", 0.5, 0);
	t("1", 0.54, 0);
	t("1", 0.55, 0);
	t("1", 0.56, 0);
	t("-1", -0.54, 0);
	t("-0", -0.5, 0);
	t("-1", -0.56, 0);
	t("-0.5", -0.5, 1);
	t("1.3", 1.25, 1);
	t("-1.2", -1.25, 1);
	t("234.2041", 234.20405, 4);
	t("-234.2040", -234.20405, 4);
	t("234.2041", "234.204050000000000000000000000000006", 4);
	t("-234.2045", "-234.20449", 4);
	t("-234.2041", "-234.204050000000000000000000000000006", 4);
	t("999.0", 999, 1);
	t("1000", 999.5, 0);
	t("-999", -999.5, 0);
	t("-999.5", -999.5, 1);
	t("1.00000000000000000", "1.000000000000000000005", 17);
	t("1.00000000000000000001", "1.000000000000000000005", 20);
	t("-1.00000000000000000", "-1.000000000000000000005", 17);
	t("-1.00000000000000000000", "-1.000000000000000000005", 20);

	// ROUND_HALF_FLOOR
	// Rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
	Decimal.rounding = 8;

	t("0.0", "0.05", 1);
	t("0", 0.5, 0);
	t("1", 0.54, 0);
	t("1", 0.55, 0);
	t("1", 0.56, 0);
	t("-1", -0.54, 0);
	t("-1", -0.5, 0);
	t("-1", -0.56, 0);
	t("-0.5", -0.5, 1);
	t("1.2", 1.25, 1);
	t("-1.3", -1.25, 1);
	t("234.2040", 234.20405, 4);
	t("-234.2041", -234.20405, 4);
	t("234.2040", "234.20404999999999999999999999999999", 4);
	t("234.2041", "234.204050000000000000000000000000006", 4);
	t("-234.2045", "-234.20449", 4);
	t("-234.2041", "-234.204050000000000000000000000000006", 4);
	t("999.0", 999, 1);
	t("999", 999.5, 0);
	t("-1000", -999.5, 0);
	t("-999.5", -999.5, 1);
	t("1.00000000000000000", "1.000000000000000000005", 17);
	t("1.00000000000000000000", "1.000000000000000000005", 20);
	t("-1.00000000000000000", "-1.000000000000000000005", 17);
	t("-1.00000000000000000001", "-1.000000000000000000005", 20);
});
