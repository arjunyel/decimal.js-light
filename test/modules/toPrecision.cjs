if (typeof T === "undefined") require("../setup.cjs");

T("toPrecision", function () {
	function t(expected, n, sd, rm) {
		T.assertEqual(expected, new Decimal(n).toPrecision(sd, rm));
	}

	function tx(fn, msg) {
		T.assertException(fn, msg);
	}

	Decimal.config({
		precision: 20,
		rounding: 4,
		toExpNeg: -7,
		toExpPos: 40,
	});

	// ---------------------------------------------------------------- v8 start

	t("1e+27", "1.2345e+27", 1);
	t("1.2e+27", "1.2345e+27", 2);
	t("1.23e+27", "1.2345e+27", 3);
	t("1.235e+27", "1.2345e+27", 4);
	t("1.2345e+27", "1.2345e+27", 5);
	t("1.23450e+27", "1.2345e+27", 6);
	t("1.234500e+27", "1.2345e+27", 7);

	t("-1e+27", "-1.2345e+27", 1);
	t("-1.2e+27", "-1.2345e+27", 2);
	t("-1.23e+27", "-1.2345e+27", 3);
	t("-1.235e+27", "-1.2345e+27", 4);
	t("-1.2345e+27", "-1.2345e+27", 5);
	t("-1.23450e+27", "-1.2345e+27", 6);
	t("-1.234500e+27", "-1.2345e+27", 7);

	t("7", 7, 1);
	t("7.0", 7, 2);
	t("7.00", 7, 3);

	t("-7", -7, 1);
	t("-7.0", -7, 2);
	t("-7.00", -7, 3);

	t("9e+1", 91, 1);
	t("91", 91, 2);
	t("91.0", 91, 3);
	t("91.00", 91, 4);

	t("-9e+1", -91, 1);
	t("-91", -91, 2);
	t("-91.0", -91, 3);
	t("-91.00", -91, 4);

	t("9e+1", 91.1234, 1);
	t("91", 91.1234, 2);
	t("91.1", 91.1234, 3);
	t("91.12", 91.1234, 4);
	t("91.123", 91.1234, 5);
	t("91.1234", 91.1234, 6);
	t("91.12340", 91.1234, 7);
	t("91.123400", 91.1234, 8);
	t("-9e+1", -91.1234, 1);
	t("-91", -91.1234, 2);
	t("-91.1", -91.1234, 3);
	t("-91.12", -91.1234, 4);
	t("-91.123", -91.1234, 5);
	t("-91.1234", -91.1234, 6);
	t("-91.12340", -91.1234, 7);
	t("-91.123400", -91.1234, 8);

	t("5.55000000000000e-7", 0.000000555, 15);
	t("-5.55000000000000e-7", -0.000000555, 15);
	t("-1.2e-9", -0.0000000012345, 2);
	t("-1.2e-8", -0.000000012345, 2);
	t("-1.2e-7", -0.00000012345, 2);
	t("1e+8", 123456789, 1);
	t("123456789", 123456789, 9);
	t("1.2345679e+8", 123456789, 8);
	t("1.234568e+8", 123456789, 7);
	t("-1.234568e+8", -123456789, 7);

	t("-0.0000012", -0.0000012345, 2);
	t("-0.000012", -0.000012345, 2);
	t("-0.00012", -0.00012345, 2);
	t("-0.0012", -0.0012345, 2);
	t("-0.012", -0.012345, 2);
	t("-0.12", -0.12345, 2);
	t("-1.2", -1.2345, 2);
	t("-12", -12.345, 2);
	t("-1.2e+2", -123.45, 2);
	t("-1.2e+3", -1234.5, 2);
	t("-1.2e+4", -12345, 2);
	t("-1.235e+4", -12345.67, 4);
	t("-1.234e+4", -12344.67, 4);

	t("1.3", 1.25, 2);
	t("1.4", 1.35, 2);

	Decimal.rounding = 0;

	t("1e+4", 9631.01, 1, 4);
	t("1.0e+7", 9950095.87, 2, 4);
	t("1e+1", "9.856839969", 1, 4);
	t("1e+2", "97.504", 1, 4);
	t("1e+5", 97802.6, 1, 4);
	t("1e+1", 9.9617, 1, 4);
	t("1e+3", 989.2, 1, 4);
	t("1.0e+5", 99576, 2, 4);
	t("1e+8", "96236483.87", 1, 4);

	// ------------------------------------------------------------------ v8 end

	t("-0.00001", "-0.00001", 1);
	t("-0.000090000000", "-0.00009", 8);
	t("-7e-7", "-0.0000007", 1);
	t("68.9316834061848", "68.931683406184761912218250317", 15);
	t("7.8601018089704732e+27", "7860101808970473167417935916.60087069", 17);
	t(
		"3.21445885399803244067719798337437062000000e-11",
		"0.0000000000321445885399803244067719798337437062",
		42
	);
	t(
		"-8171786349835057630612358814.162756978",
		"-8171786349835057630612358814.162756977984",
		37
	);
	t(
		"3340.9039701",
		"3340.903970019817086594869184429527413533291595472085",
		11
	);
	t(
		"-7269097658095414435895.9161181115739745427300313060",
		"-7269097658095414435895.916118111573974542730031306",
		50
	);
	t("0.00000632207", "0.00000632206077863", 6);
	t("6e+2", "573", 1);
	t("7.4e-7", "0.000000738", 2);
	t("-5.031561e-7", "-0.0000005031560306227217140253964236911907612837", 7);
	t("-4.291e+11", "-429050053964", 4);
	t("8.514e+7", "85131637", 4);
	t("-3.4e-9", "-0.000000003326783057540398442677461", 2);
	t(
		"6.9404295962722512e-20",
		"0.00000000000000000006940429596272251146200868514973032594273",
		17
	);
	t(
		"-828376248340605120247.15155295014",
		"-828376248340605120247.15155295013990774586360178257303370779",
		32
	);
	t(
		"-7.9828e+6",
		"-7982750.6677764682946015520272838914918899297118139169410659",
		5
	);
	t("0.00712610393722542527880200", "0.007126103937225425278801997738", 24);
	t("-5.7e+4", "-56242", 2);
	t(
		"-8928855203945443164.755136735230293537",
		"-8928855203945443164.755136735230293536124112124",
		37
	);
	t("5218572327.99", "5218572327.98424443372003772604597054153304", 12);
	t(
		"71707870535238750871516796339.60",
		"71707870535238750871516796339.59678962573869890935",
		31
	);
	t(
		"88817462.7137982220652429",
		"88817462.71379822206524285939115943006583441400005007918",
		24
	);
	t("3.00000e-9", "0.000000003", 6);
	t("-6.053", "-6.05291095813493573191", 4);
	t("6.51630828677e+19", "65163082867698740076", 12);
	t(
		"2483202135696501.60187899",
		"2483202135696501.60187898870193199949004966876115645",
		24
	);
	t("1.0766e-10", "0.000000000107650515680635692286894826641576642261", 5);
	t(
		"642724503819056076.659397077514269963295025",
		"642724503819056076.659397077514269963295024012414",
		42
	);
	t("-7.1192e+21", "-7119169102619893823635.32141854354", 5);
	t(
		"-6.717481255640638829101946114674e-8",
		"-0.000000067174812556406388291019461146732616998258",
		31
	);
	t("-12.41976452", "-12.4197645179995365323309894", 10);
	t(
		"-6.529258780126449116249954644017839921024112900e-16",
		"-0.00000000000000065292587801264491162499546440178399210241129",
		46
	);
	t("-441838.0", "-441838", 7);
	t(
		"1.128285293592950e-8",
		"0.000000011282852935929493101783925259749957192",
		16
	);
	t("-8.654857e+7", "-86548567", 7);
	t(
		"3.8883293855303995e-7",
		"0.00000038883293855303994672627854769926811949",
		17
	);
	t("3.25870000e-13", "0.00000000000032587", 9);
	t("3.702e+6", "3701031.59037494113", 4);
	t(
		"-3580077435.93682917449675702508371047",
		"-3580077435.93682917449675702508371046631533",
		36
	);
	t("-7.400", "-7.4", 4);
	t(
		"109519523263844229810.068",
		"109519523263844229810.067657779734413280795410968892638",
		24
	);
	t(
		"-509247322311590671954830.86847660619",
		"-509247322311590671954830.8684766061855",
		35
	);
	t(
		"7.5518638430980800496570562671727890e-10",
		"0.00000000075518638430980800496570562671727889997",
		35
	);
	t(
		"-5056721600639122835615986051.468831942818200",
		"-5056721600639122835615986051.4688319428182",
		43
	);
	t(
		"-1.796146861125551785886171829251460000000000e-16",
		"-0.000000000000000179614686112555178588617182925146",
		43
	);
	t("6.0e+2", "599", 2);
	t("7.619930e-16", "0.00000000000000076199293", 7);
	t(
		"834668.2370121038159610193",
		"834668.237012103815961019258574789273273342",
		25
	);
	t(
		"-3.92251395952329649490768e+26",
		"-392251395952329649490767912.240768552138247705202732",
		24
	);
	t(
		"-47504099413385554632166.5098",
		"-47504099413385554632166.50972492550706",
		27
	);

	Decimal.rounding = 1;

	t("-1.4e+9", "-1336106841", 2, 0);
	t(
		"-2244450.2134814273335263",
		"-2244450.2134814273335262397290334104071203538487453309626146",
		23,
		0
	);
	t(
		"8.74e+29",
		"873625255363763952428129881990.679929486040461455296118489",
		3,
		0
	);
	t(
		"-1.85453549733179613185923288786",
		"-1.8545354973317961318592328878502252820666161607740183",
		30,
		0
	);
	t("431.7150651927", "431.71506519265522010949747887049", 13, 0);
	t(
		"-8606297211156287.52520023752564",
		"-8606297211156287.5252002375256362382564355963505470716151",
		30,
		0
	);
	t("-8.4634889709e+24", "-8463488970828351722405003.220603", 11, 0);

	t("-844789036.5239726", "-844789036.52397268892", 16);
	t(
		"-5056.20629012767878749185273209679064306054",
		"-5056.206290127678787491852732096790643060542",
		42
	);
	t(
		"-0.3287519131314873763501859870298952500",
		"-0.32875191313148737635018598702989525",
		37
	);
	t("-60729764", "-60729764", 8);
	t("-7.622e-14", "-0.00000000000007622481594531380999826456196664586", 4);
	t(
		"-4686402261639729535.736324492474",
		"-4686402261639729535.7363244924747488",
		31
	);
	t("-2.0", "-2", 2);
	t(
		"-13801188035233586637950193108.13592574381473451125649500",
		"-13801188035233586637950193108.135925743814734511256495",
		55
	);
	t("0.0000807327587149839799300000", "0.00008073275871498397993", 24);
	t("-6.000000e-8", "-0.00000006", 7);
	t("-3.83574993e+11", "-383574993535", 9);
	t("7.6987000000000000e-14", "0.000000000000076987", 17);
	t(
		"80928866804.6112050947427973",
		"80928866804.6112050947427973864826014844575374353",
		27
	);
	t("-0.00730140", "-0.0073014067221009206110062377503733", 6);
	t(
		"2.72104773884160491036088486e+30",
		"2721047738841604910360884862459.4086993273252009015",
		27
	);
	t("3.008780781917733594e+25", "30087807819177335941398228.1424107931203", 19);
	t(
		"-1.31528920779613669158250146972297797867760000000000000000000e-19",
		"-0.00000000000000000013152892077961366915825014697229779786776",
		60
	);
	t("-8.5e+11", "-858982311008.257025719798657844609315293821", 2);
	t("-3.6312e-12", "-0.0000000000036312827608449878", 5);
	t("-0.0060000", "-0.006", 5);
	t("-4.65727e+23", "-465727983501322687372765", 6);
	t(
		"-0.00000332331666628036603",
		"-0.000003323316666280366035430077076052",
		18
	);
	t("3.533702e-8", "0.00000003533702791135712510338001418872124", 7);
	t("-0.04340", "-0.0434", 4);
	t(
		"-597340.278566069086858587852236235470",
		"-597340.2785660690868585878522362354706741",
		36
	);
	t("6.000e-8", "0.00000006", 4);
	t(
		"-3.624323359112776296e-19",
		"-0.00000000000000000036243233591127762966338166",
		19
	);
	t(
		"-3731378568692042924197.154",
		"-3731378568692042924197.15400334142251496795634388",
		25
	);
	t("-68249040894032065692.62", "-68249040894032065692.62771690318493", 22);
	t(
		"8786096722661914.89732851",
		"8786096722661914.89732851188880184891692993684242690315",
		24
	);
	t(
		"-1.8413321536281347264486372900000000000e-12",
		"-0.00000000000184133215362813472644863729",
		38
	);
	t("4.0e-9", "0.0000000040395827543504045", 2);
	t("-2.9427e+16", "-29427119846374896", 5);
	t("-917760614.4", "-917760614.45404359204911454", 10);
	t("8e+4", "89427", 1);
	t(
		"0.00000920323988134356953828667260",
		"0.0000092032398813435695382866726",
		27
	);
	t("8.2e+16", "82068995955708118", 2);
	t("3.35195944828e+26", "335195944828445911672446409.3379497158141", 12);
	t(
		"-3.89774891030e-9",
		"-0.00000000389774891030223957363124620581272897758735065471",
		12
	);
	t("-4", "-4", 1);
	t("8", "8", 1);
	t(
		"1.41172955693912934219137966000000e-10",
		"0.000000000141172955693912934219137966",
		33
	);
	t("9.21481e+13", "92148111958857", 6);
	t("-5.859975978432853e-18", "-0.0000000000000000058599759784328539", 16);
	t("-72.0", "-72", 3);
	t(
		"3785098751297.8929911950994079707157472",
		"3785098751297.89299119509940797071574729867819252140059",
		38
	);
	t("4.38e+16", "43893416753778361.297703358127215475077814", 3);
	t("-33110.29096", "-33110.2909623520267070846514", 10);
	t(
		"-74.38305251784882707720486436292121914036495",
		"-74.3830525178488270772048643629212191403649548392158614",
		43
	);

	Decimal.rounding = 2;

	t("5.80e+18", "5805164734299168659.6173113885173384955443", 3, 1);
	t(
		"-1.719875889271327",
		"-1.719875889271327133154458155573493605566221534",
		16,
		1
	);
	t(
		"113.672129563",
		"113.672129563441659725876055771857758675550104070419635029",
		12,
		1
	);
	t(
		"-77950052814622081084397.9",
		"-77950052814622081084397.91853869253589242574",
		24,
		1
	);
	t(
		"4.53106985e+27",
		"4531069852787151785292512309.2901993579425172826443679877",
		9,
		1
	);
	t(
		"45285.246089613169416440797840714",
		"45285.2460896131694164407978407142422013937",
		32,
		1
	);
	t(
		"307760226411464.7333268079863299",
		"307760226411464.73332680798632996332324381779707",
		31,
		1
	);

	t("-0.0300", "-0.0300921721159558", 3);
	t(
		"65317841202.20949859371772273480125",
		"65317841202.2094985937177227348012464402154",
		34
	);
	t(
		"-8.9231575495202e+29",
		"-892315754952021994731329589682.1894180393920044085713",
		14
	);
	t("-2.8075679202e-8", "-0.0000000280756792028583066", 11);
	t("9.71456e+9", "9714558552", 6);
	t("2.9514099281e-10", "0.00000000029514099281", 11);
	t("-1.24459e+14", "-124459985101107", 6);
	t(
		"0.0000734657394154607815562372000000",
		"0.0000734657394154607815562372",
		30
	);
	t("1.78719530353972e+15", "1787195303539715", 15);
	t("-2.8e+9", "-2861102528", 2);
	t("-8.74480375581000e-9", "-0.00000000874480375581", 15);
	t(
		"-1792404726015427380.248150830448457643618022",
		"-1792404726015427380.248150830448457643618022",
		43
	);
	t(
		"-678437320202616518.2220157912209286",
		"-678437320202616518.22201579122092864",
		34
	);
	t(
		"-1.937304915215780220809799809655893674619672771e-8",
		"-0.000000019373049152157802208097998096558936746196727718",
		46
	);
	t("824172.15863347130174103087", "824172.15863347130174103086069960571", 26);
	t("1.90040714061724000e-9", "0.00000000190040714061724", 18);
	t(
		"-1634488249956745498.58311",
		"-1634488249956745498.58311123049258868631623840423306",
		24
	);
	t(
		"0.0000019600923098540334001755857361187871270117098000",
		"0.0000019600923098540334001755857361187871270117098",
		47
	);
	t("8.383e+4", "83829", 4);
	t("2.843306120337864064e+23", "284330612033786406376718", 19);
	t("1.86235e+15", "1862340943682995.08270612464203237562317928642459", 6);
	t("-2.31e+13", "-23195312138083", 3);
	t("5.450237e+21", "5450236028274773541895.65198933808968167192289601277", 7);
	t(
		"-0.008976419749408075453861117865459",
		"-0.00897641974940807545386111786545972434475187220274239581167",
		31
	);
	t("-761181660548661030.25", "-761181660548661030.25539542029", 20);
	t("-1844205.93619958", "-1844205.936199580689273072905714475263817", 15);
	t(
		"4842.77906784902805070438222238898372327093",
		"4842.77906784902805070438222238898372327092242428134814721",
		42
	);
	t("-4.161198953445629503503971e+26", "-416119895344562950350397179", 25);
	t("1.084e+4", "10836", 4);
	t(
		"8.71081704218174598654542083000e-8",
		"0.0000000871081704218174598654542083",
		30
	);
	t(
		"7.9139683e+36",
		"7913968291641940848703040206324645237.8515176490912667096",
		8
	);
	t("-0.000008", "-0.000008", 1);
	t("8.3660085625e+34", "83660085624983922907621996804192921.3992927", 11);
	t("0.000006980263008", "0.000006980263007423150706324065130475391", 10);
	t(
		"-31348084528321454060964445534333629317.69561497283830023",
		"-31348084528321454060964445534333629317.69561497283830023",
		55
	);
	t(
		"-2417953792643886.3485495754363678888681996409674308643",
		"-2417953792643886.3485495754363678888681996409674308643",
		53
	);
	t("4.0e+6", "3982592", 2);
	t("-2092315.015029722200", "-2092315.0150297222", 19);
	t(
		"-364992136844916.9092238",
		"-364992136844916.909223894931280218350055327754935",
		22
	);
	t("8.34e+24", "8333642861002789136219873", 3);
	t(
		"7.6008837179413e+14",
		"760088371794122.3380234188299740029832128019574765416",
		14
	);
	t("-6655726127.0", "-6655726127", 11);

	Decimal.rounding = 3;

	t("-1.7218673528e+29", "-172186735288586033321621121024.11240623", 11, 2);
	t("-3.31e+28", "-33197729862068219255677464974", 3, 2);
	t(
		"-4.835191326e+29",
		"-483519132605694848658321267839.23575134378118945659616358",
		10,
		2
	);
	t("7.3", "7.24882150443803", 2, 2);
	t(
		"-89186640077683569.407061427673",
		"-89186640077683569.4070614276736450982125609",
		29,
		2
	);
	t("-49379651041268.5", "-49379651041268.548293", 15, 2);
	t(
		"-7685054.17489171951660",
		"-7685054.17489171951660508194254495141726065698575306365447451",
		21,
		2
	);

	t(
		"-39449414270333.925852213835",
		"-39449414270333.925852213834759031494508489474",
		26
	);
	t("-7.50437989976", "-7.50437989975503711836768", 12);
	t("-0.000004303975760000000", "-0.00000430397576", 16);
	t(
		"-16040233916257241895.97650633973989",
		"-16040233916257241895.9765063397398857",
		34
	);
	t("-7438.9287248601393819", "-7438.9287248601393818639176907606", 20);
	t("9.857465584298e-7", "0.000000985746558429876825600458537705318327799", 13);
	t(
		"532637.9095983547284850466577958315920",
		"532637.90959835472848504665779583159203905641996",
		37
	);
	t(
		"-1.40416695292e+30",
		"-1404166952915258058306475434520.7856110230505157",
		12
	);
	t(
		"60346876.6670832429026869255506808488",
		"60346876.6670832429026869255506808488",
		36
	);
	t("-2.52466133e+23", "-252466132238128405832984", 9);
	t("55", "55", 2);
	t(
		"-63075151.962465776516325792253177939493172",
		"-63075151.9624657765163257922531779394931714",
		41
	);
	t("7.411461e+17", "741146113404361548.543142388", 7);
	t(
		"-58835755359067474972692072494278983.7",
		"-58835755359067474972692072494278983.6314961114191480012916",
		36
	);
	t("-333", "-333", 3);
	t("7.24707e+13", "72470760481059", 6);
	t(
		"39232618.1513515442233995765535454389",
		"39232618.151351544223399576553545438981252",
		36
	);
	t("-4e+5", "-357994", 1);
	t(
		"-1.90e+4",
		"-18904.11335233460016293296574557643545512393801643609213933",
		3
	);
	t(
		"-6585152111956929.924309477123328984876184272828762900",
		"-6585152111956929.9243094771233289848761842728287629",
		52
	);
	t("4.505e-7", "0.0000004505328", 4);
	t("-2.4125965461846e+19", "-24125965461845662271", 14);
	t("4.82673137e+33", "4826731373891127996812671510065700.871947701", 9);
	t(
		"-6621278.2",
		"-6621278.1120573461544975284970826524341806671316100080257485",
		8
	);
	t(
		"-1.8015392869565386634525164264799463344376205007391000000e-7",
		"-0.00000018015392869565386634525164264799463344376205007391",
		56
	);
	t(
		"-0.00026465463574439280006655492609887593",
		"-0.00026465463574439280006655492609887592672292239588307259",
		35
	);
	t("4.87815228988300090", "4.8781522898830009076096556452567", 18);
	t(
		"-5.1107117199524082779077801201617e+35",
		"-511071171995240827790778012016163902",
		32
	);
	t("1.4734242515706890557e+20", "147342425157068905574.390834406", 20);
	t(
		"-4019325091848890817268596991.815200",
		"-4019325091848890817268596991.8152",
		34
	);
	t("3.8e+14", "384715413967421", 2);
	t("7483444.49", "7483444.498791364040133403947480439118040376737700653", 9);
	t("-594538312.6255", "-594538312.625485172379", 13);
	t("0.00753000", "0.00753", 6);
	t("8.1440148247e+13", "81440148247675.27449603492606125135884", 11);
	t("8.444003009300e+21", "8444003009300239495556", 13);
	t(
		"2308.1529840912558574923966042774800185916972327325289",
		"2308.1529840912558574923966042774800185916972327325289261",
		53
	);
	t("2.67e+3", "2674.698673623", 3);
	t(
		"-2.82819136180287470854625537e+30",
		"-2828191361802874708546255368471.80800005766",
		27
	);
	t("518250411", "518250411", 9);
	t("3.2e+4", "32661.9135347256259375001777960775509", 2);
	t("29.15347602216416991973", "29.153476022164169919735054013077734177", 22);
	t("-4.611285536613066108e+30", "-4611285536613066107912600830385", 19);
	t(
		"-51774110.0705144989023975360207167071143094356321",
		"-51774110.070514498902397536020716707114309435632036586",
		48
	);
	t("-11969053.91", "-11969053.9052", 10);

	Decimal.rounding = 4;

	t(
		"687378946204028.408158998985701",
		"687378946204028.408158998985701430935094",
		30,
		3
	);
	t("42.452", "42.4523909443358871476552683504968536100051", 5, 3);
	t(
		"-22771061110217019663705702.44170142085172",
		"-22771061110217019663705702.44170142085171219649140996",
		40,
		3
	);
	t(
		"-1470.640309974016167512235698629586",
		"-1470.6403099740161675122356986295857257144815364",
		34,
		3
	);
	t("-1.110228e+27", "-1110227398804733429555663947.06619", 7, 3);
	t("-6.4898237111e+26", "-648982371105405071851661301", 11, 3);
	t(
		"-4641197449469148.658850361201903",
		"-4641197449469148.658850361201902222",
		31,
		3
	);

	t("7.905300379788e+16", "79053003797878062.6454954", 13);
	t("-6.83490000000e-13", "-0.00000000000068349", 12);
	t(
		"-62760641815.69084973661201201",
		"-62760641815.690849736612012010742308663",
		28
	);
	t("0.000704", "0.000704496313", 3);
	t(
		"82926865286287.8852357368342860830310721063079299643",
		"82926865286287.88523573683428608303107210630792996432",
		51
	);
	t(
		"-0.00032388272393900301214220090249",
		"-0.00032388272393900301214220090248744799603424908",
		29
	);
	t("8.6e+12", "8621641486938.4837308885005093571508566552428700982454", 2);
	t("2", "2", 1);
	t(
		"1.4641440117052559075e+20",
		"146414401170525590746.047955203899370771105088",
		20
	);
	t("3511.925583", "3511.925583", 10);
	t("2861824.253079699095728", "2861824.253079699095727765750377038689", 22);
	t("-3.940097756e+10", "-39400977564.548924098664431671700066962", 10);
	t("-888", "-888", 3);
	t(
		"-0.000302106125213724988141721256104",
		"-0.00030210612521372498814172125610432438685",
		30
	);
	t(
		"6943.4804552555315615809650428503",
		"6943.480455255531561580965042850266831249032130818358478956",
		32
	);
	t("3365678", "3365678.3397481381125085749", 7);
	t("-5.3943374314e+19", "-53943374313769567458.386865325", 11);
	t(
		"-6.67880509225510150542252852147049489938254298497979",
		"-6.6788050922551015054225285214704948993825429849797925563674",
		51
	);
	t("1.36424e+18", "1364240644139816224.60228356028", 6);
	t(
		"1.410236477950416725e+23",
		"141023647795041672538410.84935693266374259666015274447",
		19
	);
	t("-802.817765", "-802.81776500697712984253334522", 9);
	t(
		"-5.276210722424690668896260075355037218851",
		"-5.27621072242469066889626007535503721885096",
		40
	);
	t(
		"-0.000874209568970788",
		"-0.0008742095689707877849902027926289294748756775668387",
		15
	);
	t(
		"0.092053833162002",
		"0.09205383316200189249855864903410820435666385119723209239",
		14
	);
	t(
		"7.0656298318128209e-14",
		"0.0000000000000706562983181282092835675843980510112",
		17
	);
	t("-8.66511516852116659e+18", "-8665115168521166587", 18);
	t(
		"3.3490648464e+22",
		"33490648463534229842937.79268276945692333064632966129475",
		11
	);
	t(
		"-39041587174692569176.82740706154183894",
		"-39041587174692569176.827407061541838942655371389185",
		37
	);
	t("-3834.0", "-3834", 5);
	t("-0.008912382644814418776268630", "-0.00891238264481441877626863", 25);
	t("-2.1e+5", "-206119", 2);
	t("4.83340000000e-8", "0.000000048334", 12);
	t(
		"3.185196533675230520000000000000e-19",
		"0.000000000000000000318519653367523052",
		31
	);
	t(
		"6.0431217298488095562718496137220939447806000000000000000e-17",
		"0.000000000000000060431217298488095562718496137220939447806",
		56
	);

	Decimal.rounding = 5;

	t("-8e+26", "-786589693451258754942279859.3834", 1, 4);
	t("-26.0", "-26", 3, 4);
	t(
		"-8.462226728e+11",
		"-846222672789.2087639320702375427266333530942524245",
		10,
		4
	);
	t("-4e-7", "-0.0000004019666978288041783154210868", 1, 4);
	t("-315609.775843992", "-315609.775843992", 15, 4);
	t("-3.319e+9", "-3318880945", 4, 4);
	t("-6", "-6.2847", 1, 4);

	t("-1408003897645960.648499616456", "-1408003897645960.648499616456", 28);
	t("-1.0", "-1", 2);
	t("-8.28e+14", "-827860423543649", 3);
	t(
		"0.00054398953021585321711560388890",
		"0.00054398953021585321711560388889590290139888",
		29
	);
	t("-4.409e-9", "-0.000000004408792", 4);
	t("4.0000e-10", "0.0000000004", 5);
	t("3.40e+16", "34001779327925905", 3);
	t("-9.03e+34", "-90332622851356543193546536340366547", 3);
	t("-4.5320e+16", "-45320100856429143.39155209710530673318222777", 5);
	t("3.618e+30", "3618328715720583671291544414202", 4);
	t("-1003.61140", "-1003.61139687804673322250551", 9);
	t("-8139415035028632370.38737", "-8139415035028632370.38736602659835", 24);
	t("8e+7", "83198058", 1);
	t("-7.99492e+14", "-799491603856548", 6);
	t("444", "444", 3);
	t(
		"0.00000613258266938",
		"0.0000061325826693823067791292255878336353793864046451956723",
		12
	);
	t(
		"-554696279951718746537611.26040",
		"-554696279951718746537611.26040029508470430208572833137315",
		29
	);
	t("446", "446.189185820662709163412845035853873", 3);
	t(
		"22873128187827109553471831451.06623850867",
		"22873128187827109553471831451.06623850866672688842662473",
		40
	);
	t("9e+5", "880389", 1);
	t("-6.7516118890844e+16", "-67516118890844443.625641", 14);
	t(
		"-0.36107158435820",
		"-0.36107158435820101656696353075596201902674001080619510849",
		14
	);
	t(
		"8.958386374640407365",
		"8.958386374640407364828679985365339921820421370157246",
		19
	);
	t("3e+2", "257", 1);
	t(
		"-1.904659739878e+18",
		"-1904659739878060478.113131137688927604413210083841",
		13
	);
	t("-0.0000627142", "-0.00006271421732891589577305487292334", 6);
	t("3.310541e+8", "331054103", 7);
	t("-1.793886e+23", "-179388600781592577147651.2641684828762234473", 7);
	t("0.0004600", "0.00046", 4);
	t("-2.9e+21", "-2906505321975413509885", 2);
	t("86415.94739506", "86415.9473950557683374", 13);
	t("6.730414", "6.7304135909152", 7);
	t("-5.032367e+14", "-503236749968584", 7);
	t("-5.0241682013868216287718e+32", "-502416820138682162877178622610283", 23);
	t(
		"-0.0552606118984074172116684879479087",
		"-0.0552606118984074172116684879479087",
		33
	);
	t(
		"91017414629852252476380368766.471",
		"91017414629852252476380368766.47117955844005",
		32
	);
	t("28586.32124747000", "28586.32124747000107561236523943", 16);
	t(
		"0.000001935665545322534195131",
		"0.0000019356655453225341951305040536808235510260170838860718",
		22
	);
	t("7.8", "7.803563246406851025", 2);
	t(
		"-4.89914223627882382434323e+26",
		"-489914223627882382434323457.50920109688497974624541155867073",
		24
	);
	t("384718796891211107", "384718796891211107", 18);
	t(
		"42510.74002309897971230194",
		"42510.7400230989797123019438399853496258",
		25
	);
	t("-7.388e+11", "-738804895894", 4);
	t("-5.0000000e-7", "-0.0000005", 8);

	Decimal.rounding = 6;

	t(
		"42334337596496149636254",
		"42334337596496149636254.4926162509306406461",
		23,
		5
	);
	t("-7e+9", "-7246374971.34279698356", 1, 5);
	t(
		"71516263932998764871838469072",
		"71516263932998764871838469072.280115355524",
		29,
		5
	);
	t(
		"71257489.5995227415169007618702182092",
		"71257489.59952274151690076187021820922744",
		36,
		5
	);
	t("268492835", "268492834.77041", 9, 5);
	t("50325.551277778107847798802", "50325.551277778107847798801525", 26, 5);
	t("-5.289303987e+29", "-528930398665449048343281311623.69686", 10, 5);

	t("0.08000", "0.08", 4);
	t("-4.5132e+21", "-4513243388120382069815.8508153058993058875", 5);
	t("-73549", "-73549.2594630551663822238", 5);
	t("1.275868004728922895890883e+29", "127586800472892289589088296800.6", 25);
	t(
		"-0.0003715444034899460421534099962225699000",
		"-0.0003715444034899460421534099962225699",
		37
	);
	t("-6.9625565265e+24", "-6962556526511822306135536", 11);
	t("1.67583703641e+13", "16758370364138.915293525076269061228714877", 12);
	t(
		"-173594.95064085553515176707313947534918109631092170",
		"-173594.950640855535151767073139475349181096310921699",
		50
	);
	t("-6.9503965525e+19", "-69503965525000308384.151383", 11);
	t("4.411225e+20", "441122486054080817112", 7);
	t(
		"2.467044064783596937642371770e+31",
		"24670440647835969376423717700462.39",
		28
	);
	t(
		"3.9711897549481645654e+24",
		"3971189754948164565361634.8039734590476326224193520402091769",
		20
	);
	t(
		"-1.4757613208690e+21",
		"-1475761320868963235919.64499841336073105746686372924161",
		14
	);
	t(
		"91683083887068.6191146",
		"91683083887068.61911461351134520171343337804061135",
		21
	);
	t("-7923074181102822.578", "-7923074181102822.5778", 19);
	t("-6.800e-8", "-0.000000068", 4);
	t("-2.57954671081460000000e-10", "-0.00000000025795467108146", 21);
	t("5.5352911972e-9", "0.000000005535291197169667611325365189624523452", 11);
	t("6.0488358e+8", "604883577", 8);
	t("-7.575535014e-9", "-0.00000000757553501363609536678641245355", 10);
	t(
		"7.547067960578900230644488e-10",
		"0.00000000075470679605789002306444877998602723",
		25
	);
	t("-3.64561456763e+12", "-3645614567625.4", 12);
	t("9.0e-7", "0.0000009", 2);
	t("7e+2", "687", 1);
	t(
		"517277827334839.8174848543680868",
		"517277827334839.8174848543680868015165926618",
		31
	);
	t("7e+2", "655.46270361324473194", 1);
	t(
		"1632131488313153.49737424823493573157",
		"1632131488313153.497374248234935731568",
		36
	);
	t(
		"274068317992.5998880719845028748169734442",
		"274068317992.5998880719845028748169734442394151076",
		40
	);
	t("-7.060e-9", "-0.00000000706025531009734073", 4);
	t("0.004444", "0.0044439457493", 4);
	t(
		"72482770689153111154104782082.023",
		"72482770689153111154104782082.022764082943227214833851",
		32
	);
	t("5.9130694036072794206e+24", "5913069403607279420613864.152", 20);
	t("843384561300245347961437.966", "843384561300245347961437.96592523791", 27);
	t("0.0000035198821282510000000", "0.000003519882128251", 20);
	t(
		"-1.00371560130267706870097e-9",
		"-0.00000000100371560130267706870096885251",
		24
	);
	t("17504218.4970302", "17504218.49703016415913667026121376499", 15);
	t("-5e-9", "-0.000000005169058703", 1);
	t("6.922803246e+10", "69228032455", 10);
	t("-16", "-16", 2);
	t(
		"-1.355147513468192707127939151e+40",
		"-13551475134681927071279391508441439066206.58705380600075",
		28
	);
	t(
		"81670324.1197758695",
		"81670324.1197758695212865075629796973196504241126",
		18
	);
	t("0.00005", "0.00004797485174640366805332660647", 1);
	t(
		"-4.864397594e-10",
		"-0.0000000004864397594461335282648538530108953965681345",
		10
	);
	t("47694105.2312532", "47694105.23125322528167211284521303", 15);
	t("-4.962106181e+26", "-496210618135432953927871636.779236", 10);
	t(
		"1.2800030559497062236642e+37",
		"12800030559497062236641930592334626609.7332",
		23
	);
	t("-574830783.7", "-574830783.6689168903917696583746514637433390929", 10);
	t("5969.431086199057470", "5969.43108619905746956015212970904111744101", 19);
	t("-4.8e+3", "-4814.32904953003285", 2);
	t("4.297e+16", "42973001760252134", 4);
	t(
		"-5.7628e+6",
		"-5762846.590152347665179652381407653797146356303622218259885",
		5
	);
	t(
		"904864662232032.160612401810317927291657403142932",
		"904864662232032.16061240181031792729165740314293194205879163",
		48
	);
	t("7.9892e+20", "798923115068265241915.537619430376605", 5);
	t("-8.97759349384000643", "-8.97759349384000643427096282979", 18);

	t("123.45", "12.345e1");

	tx(function () {
		new Decimal(1.23).toPrecision("3");
	}, "(1.23).toPrecision('3')");
	tx(function () {
		new Decimal(1.23).toPrecision(new Decimal(3));
	}, "(1.23).toPrecision(new Decimal(3))");
	tx(function () {
		new Decimal(1.23).toPrecision(null);
	}, "(1.23).toPrecision(null)");
	tx(function () {
		new Decimal(1.23).toPrecision(NaN);
	}, "(1.23).toPrecision(NaN)");
	tx(function () {
		new Decimal(1.23).toPrecision("NaN");
	}, "(1.23).toPrecision('NaN')");
	tx(function () {
		new Decimal(1.23).toPrecision([]);
	}, "(1.23).toPrecision([])");
	tx(function () {
		new Decimal(1.23).toPrecision({});
	}, "(1.23).toPrecision({})");
	tx(function () {
		new Decimal(1.23).toPrecision("");
	}, "(1.23).toPrecision('')");
	tx(function () {
		new Decimal(1.23).toPrecision(" ");
	}, "(1.23).toPrecision(' ')");
	tx(function () {
		new Decimal(1.23).toPrecision("hello");
	}, "(1.23).toPrecision('hello')");
	tx(function () {
		new Decimal(1.23).toPrecision("\t");
	}, "(1.23).toPrecision('\t')");
	tx(function () {
		new Decimal(1.23).toPrecision(new Date());
	}, "(1.23).toPrecision(new Date)");
	tx(function () {
		new Decimal(1.23).toPrecision(new RegExp());
	}, "(1.23).toPrecision(new RegExp)");
	tx(function () {
		new Decimal(1.23).toPrecision(2.01);
	}, "(1.23).toPrecision(2.01)");
	tx(function () {
		new Decimal(1.23).toPrecision(10.5);
	}, "(1.23).toPrecision(10.5)");
	tx(function () {
		new Decimal(1.23).toPrecision("1.1e1");
	}, "(1.23).toPrecision('1.1e1')");
	tx(function () {
		new Decimal(1.23).toPrecision(true);
	}, "(1.23).toPrecision(true)");
	tx(function () {
		new Decimal(1.23).toPrecision(false);
	}, "(1.23).toPrecision(false)");
	tx(function () {
		new Decimal(1.23).toPrecision(function () {});
	}, "(1.23).toPrecision(function (){})");
	tx(function () {
		new Decimal(1.23).toPrecision("-1");
	}, ".toPrecision('-1')");
	tx(function () {
		new Decimal(1.23).toPrecision(-23);
	}, ".toPrecision(-23)");
	tx(function () {
		new Decimal(1.23).toPrecision(1e9 + 1);
	}, ".toPrecision(1e9 + 1)");
	tx(function () {
		new Decimal(1.23).toPrecision(0);
	}, ".toPrecision(0)");
	tx(function () {
		new Decimal(1.23).toPrecision("-0");
	}, ".toPrecision('-0')");
	tx(function () {
		new Decimal(1.23).toPrecision(0.9);
	}, ".toPrecision(0.9)");
	tx(function () {
		new Decimal(1.23).toPrecision("-1e-1");
	}, ".toPrecision('-1e-1')");
	tx(function () {
		new Decimal(1.23).toPrecision(Infinity);
	}, ".toPrecision(Infinity)");
	tx(function () {
		new Decimal(1.23).toPrecision("-Infinity");
	}, ".toPrecision('-Infinity')");

	tx(function () {
		new Decimal(1.23).toPrecision(1, "3");
	}, "(1.23).toPrecision('3')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, new Decimal(3));
	}, "(1.23).toPrecision(new Decimal(3))");
	tx(function () {
		new Decimal(1.23).toPrecision(1, null);
	}, "(1.23).toPrecision(null)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, NaN);
	}, "(1.23).toPrecision(1, NaN)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "NaN");
	}, "(1.23).toPrecision(1, 'NaN')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, []);
	}, "(1.23).toPrecision(1, [])");
	tx(function () {
		new Decimal(1.23).toPrecision(1, {});
	}, "(1.23).toPrecision(1, {})");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "");
	}, "(1.23).toPrecision(1, '')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, " ");
	}, "(1.23).toPrecision(1, ' ')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "hello");
	}, "(1.23).toPrecision(1, 'hello')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "\t");
	}, "(1.23).toPrecision(1, '\t')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, new Date());
	}, "(1.23).toPrecision(1, new Date)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, new RegExp());
	}, "(1.23).toPrecision(1, new RegExp)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, 2.01);
	}, "(1.23).toPrecision(1, 2.01)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, 10.5);
	}, "(1.23).toPrecision(1, 10.5)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "1.1e1");
	}, "(1.23).toPrecision(1, '1.1e1')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, true);
	}, "(1.23).toPrecision(1, true)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, false);
	}, "(1.23).toPrecision(1, false)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, function () {});
	}, "(1.23).toPrecision(1, function (){})");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "-1");
	}, ".toPrecision(1, '-1')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, -23);
	}, ".toPrecision(1, -23)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, 9);
	}, ".toPrecision(1, 8)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "-0");
	}, ".toPrecision(1, '-0')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, 0.9);
	}, ".toPrecision(1, 0.9)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "-1e-1");
	}, ".toPrecision(1, '-1e-1')");
	tx(function () {
		new Decimal(1.23).toPrecision(1, Infinity);
	}, ".toPrecision(1, Infinity)");
	tx(function () {
		new Decimal(1.23).toPrecision(1, "-Infinity");
	}, ".toPrecision(1, '-Infinity')");
});
