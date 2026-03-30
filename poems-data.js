const POEMS_DATA = [{
    "id": 1,
    "title": "四时田园杂兴·春日其一",
    "author": "【宋】范成大",
    "content": [
        "土膏欲动雨频催，",
        "万草千花一饷开。",
        "舍后荒畦犹绿秀，",
        "邻家鞭笋过墙来。"
    ],
    "pinyin": [
        "tǔ gāo yù dòng yǔ pín cuī，",
        "wàn cǎo qiān huā yī xiǎng kāi。",
        "shě hòu huāng qí yóu lǜ xiù，",
        "lín jiā biān sǔn guò qiáng lái。"
    ],
    "keywords": [
        { "word": "土膏", "note": "肥沃湿润的泥土。" },
        { "word": "一饷", "note": "片刻，一会儿。" },
        { "word": "鞭笋", "note": "竹根生出的新笋。" }
    ],
    "analysis": "春雨滋润，泥土苏醒，花草竞相开放。屋后荒地也生机盎然，邻家竹笋穿墙而来，充满春日生机与野趣。"
},
{
    "id": 2,
    "title": "四时田园杂兴·春日其二",
    "author": "【宋】范成大",
    "content": [
        "高田二麦接山青，",
        "傍水低田绿未耕。",
        "桃杏满村春似锦，",
        "踏歌椎鼓过清明。"
    ],
    "pinyin": [
        "gāo tián èr mài jiē shān qīng，",
        "bàng shuǐ dī tián lǜ wèi gēng。",
        "táo xìng mǎn cūn chūn sì jǐn，",
        "tà gē zhuī gǔ guò qīng míng。"
    ],
    "keywords": [
        { "word": "二麦", "note": "大麦、小麦。" },
        { "word": "踏歌", "note": "以脚踏地为节拍唱歌。" },
        { "word": "椎鼓", "note": "击鼓。" }
    ],
    "analysis": "麦田青绿，桃杏盛开，村民击鼓踏歌欢度清明，描绘出春日乡村热闹又祥和的景象。"
},
{
    "id": 3,
    "title": "四时田园杂兴·春日其三",
    "author": "【宋】范成大",
    "content": [
        "老盆初熟杜茅柴，",
        "携向田头祭社来。",
        "巫媪莫嫌滋味薄，",
        "旗亭官酒更多灰。"
    ],
    "pinyin": [
        "lǎo pén chū shú dù máo chái，",
        "xié xiàng tián tóu jì shè lái。",
        "wū ǎo mò xián zī wèi bó，",
        "qí tíng guān jiǔ gèng duō huī。"
    ],
    "keywords": [
        { "word": "杜茅柴", "note": "农家自酿的薄酒。" },
        { "word": "祭社", "note": "祭祀土地神。" },
        { "word": "巫媪", "note": "主持祭祀的老妇。" }
    ],
    "analysis": "农家新酿薄酒用于祭社，幽默自嘲酒味虽淡，却比官酒更纯净，体现乡村质朴生活。"
},
{
    "id": 4,
    "title": "四时田园杂兴·春日其四",
    "author": "【宋】范成大",
    "content": [
        "胡蝶双双入菜花，",
        "日长无客到田家。",
        "鸡飞过篱犬吠窦，",
        "知有行商来买茶。"
    ],
    "pinyin": [
        "hú dié shuāng shuāng rù cài huā，",
        "rì cháng wú kè dào tián jiā。",
        "jī fēi guò lí quǎn fèi dòu，",
        "zhī yǒu xíng shāng lái mǎi chá。"
    ],
    "keywords": [
        { "word": "日长", "note": "白昼渐长。" },
        { "word": "窦", "note": "墙洞。" },
        { "word": "行商", "note": "流动商人。" }
    ],
    "analysis": "春日乡村宁静，蝴蝶飞舞菜花间，鸡犬惊动方知茶商到来，以动衬静，闲适自然。"
},
{
    "id": 5,
    "title": "四时田园杂兴·春日其五",
    "author": "【宋】范成大",
    "content": [
        "楼前乱草没高低，",
        "日午风休鸟自啼。",
        "应笑幽人更无事，",
        "卧看蝴蝶满园飞。"
    ],
    "pinyin": [
        "lóu qián luàn cǎo méi gāo dī，",
        "rì wǔ fēng xiū niǎo zì tí。",
        "yīng xiào yōu rén gèng wú shì，",
        "wò kàn hú dié mǎn yuán fēi。"
    ],
    "keywords": [
        { "word": "日午", "note": "中午。" },
        { "word": "幽人", "note": "隐居闲适之人。" },
        { "word": "风休", "note": "风停。" }
    ],
    "analysis": "庭院草长，风静鸟鸣，诗人闲卧观蝶，尽显隐居生活的恬淡自在。"
},
{
    "id": 6,
    "title": "四时田园杂兴·春日其六",
    "author": "【宋】范成大",
    "content": [
        "槐叶初匀日气凉，",
        "葱葱鼠耳翠成双。",
        "三公只得三株看，",
        "闲客清阴满北窗。"
    ],
    "pinyin": [
        "huái yè chū yún rì qì liáng，",
        "cōng cōng shǔ ěr cuì chéng shuāng。",
        "sān gōng zhǐ de sān zhū kàn，",
        "xián kè qīng yīn mǎn běi chuāng。"
    ],
    "keywords": [
        { "word": "鼠耳", "note": "形似鼠耳的嫩叶。" },
        { "word": "三公", "note": "代指高官。" },
        { "word": "清阴", "note": "清凉树荫。" }
    ],
    "analysis": "槐叶舒展，绿荫宜人，诗人自嘲高官难享此景，自己却坐拥满窗清凉，自得其乐。"
},
{
    "id": 7,
    "title": "四时田园杂兴·春日其七",
    "author": "【宋】范成大",
    "content": [
        "黄尘行客汗如浆，",
        "少住侬家漱井香。",
        "借与门前磐石坐，",
        "柳阴亭午正风凉。"
    ],
    "pinyin": [
        "huáng chén xíng kè hàn rú jiāng，",
        "shǎo zhù nóng jiā shù jǐng xiāng。",
        "jiè yǔ mén qián pán shí zuò，",
        "liǔ yīn tíng wǔ zhèng fēng liáng。"
    ],
    "keywords": [
        { "word": "汗如浆", "note": "汗流不止。" },
        { "word": "侬家", "note": "我家。" },
        { "word": "亭午", "note": "正午。" }
    ],
    "analysis": "农家热情招呼酷热行人歇息乘凉，展现乡村淳朴善良的民风。"
},
{
    "id": 8,
    "title": "四时田园杂兴·春日其八",
    "author": "【宋】范成大",
    "content": [
        "三旬蚕忌闭门中，",
        "邻曲都无步往踪。",
        "犹是晓晴风露下，",
        "采桑时节暂相逢。"
    ],
    "pinyin": [
        "sān xún cán jì bì mén zhōng，",
        "lín qǔ dōu wú bù wǎng zōng。",
        "yóu shì xiǎo qíng fēng lù xià，",
        "cǎi sāng shí jié zàn xiāng féng。"
    ],
    "keywords": [
        { "word": "蚕忌", "note": "养蚕期间的禁忌风俗。" },
        { "word": "邻曲", "note": "邻居。" },
        { "word": "晓晴", "note": "清晨天晴。" }
    ],
    "analysis": "蚕忙时节村民闭门少往来，只在清晨采桑时偶遇，真实记录乡村养蚕习俗。"
},
{
    "id": 9,
    "title": "四时田园杂兴·春日其九",
    "author": "【宋】范成大",
    "content": [
        "种园得果偿劳倦，",
        "不奈儿童鸟雀搔。",
        "已插棘针樊笋径，",
        "更铺渔网盖樱桃。"
    ],
    "pinyin": [
        "zhòng yuán dé guǒ cháng láo juàn，",
        "bù nài ér tóng niǎo què sāo。",
        "yǐ chā jí zhēn fán sǔn jìng，",
        "gèng pū yú wǎng gài yīng táo。"
    ],
    "keywords": [
        { "word": "偿劳倦", "note": "报答辛劳。" },
        { "word": "棘针", "note": "荆棘枝条。" },
        { "word": "樊", "note": "篱笆，围挡。" }
    ],
    "analysis": "为守护果实，用荆棘拦路、渔网护果，充满农家生活的真实趣味。"
},
{
    "id": 10,
    "title": "四时田园杂兴·春日其十",
    "author": "【宋】范成大",
    "content": [
        "吉日初开种稻包，",
        "南山雷动雨连宵。",
        "今年不欠秧田水，",
        "新涨看看拍小桥。"
    ],
    "pinyin": [
        "jí rì chū kāi zhòng dào bāo，",
        "nán shān léi dòng yǔ lián xiāo。",
        "jīn nián bù qiàn yāng tián shuǐ，",
        "xīn zhǎng kàn kàn pāi xiǎo qiáo。"
    ],
    "keywords": [
        { "word": "种稻包", "note": "开始育稻种。" },
        { "word": "连宵", "note": "整夜。" },
        { "word": "新涨", "note": "新涨的水。" }
    ],
    "analysis": "春雨连绵，秧田水足，预示丰收，满含农家喜悦之情。"
},
{
    "id": 11,
    "title": "四时田园杂兴·春日其十一",
    "author": "【宋】范成大",
    "content": [
        "桑下春蔬绿满畦，",
        "菘心青嫩芥苔肥。",
        "溪头洗择店头卖，",
        "日暮裹盐沽酒归。"
    ],
    "pinyin": [
        "sāng xià chūn shū lǜ mǎn qí，",
        "sōng xīn qīng nèn jiè tái féi。",
        "xī tóu xǐ zé diàn tóu mài，",
        "rì mù guǒ yán gū jiǔ guī。"
    ],
    "keywords": [
        { "word": "春蔬", "note": "春日蔬菜。" },
        { "word": "菘", "note": "白菜一类蔬菜。" },
        { "word": "沽酒", "note": "买酒。" }
    ],
    "analysis": "菜农采摘新鲜蔬菜到溪边洗净售卖，傍晚买盐带酒而归，生活平淡而充实。"
},
{
    "id": 12,
    "title": "四时田园杂兴·春日其十二",
    "author": "【宋】范成大",
    "content": [
        "雨后山家起较迟，",
        "天窗晓色半熹微。",
        "老翁欹枕听莺啭，",
        "童子开门放燕飞。"
    ],
    "pinyin": [
        "yǔ hòu shān jiā qǐ jiào chí，",
        "tiān chuāng xiǎo sè bàn xī wēi。",
        "lǎo wēng qī zhěn tīng yīng zhuàn，",
        "tóng zǐ kāi mén fàng yàn fēi。"
    ],
    "keywords": [
        { "word": "熹微", "note": "天色微亮。" },
        { "word": "欹枕", "note": "斜靠枕头。" },
        { "word": "莺啭", "note": "黄莺鸣叫。" }
    ],
    "analysis": "春雨过后山村清晨闲适，老翁听莺，童子放燕，画面宁静温馨。"
},
{
    "id": 13,
    "title": "四时田园杂兴·夏日其一",
    "author": "【宋】范成大",
    "content": [
        "梅子金黄杏子肥，",
        "麦花雪白菜花稀。",
        "日长篱落无人过，",
        "惟有蜻蜓蛱蝶飞。"
    ],
    "pinyin": [
        "méi zǐ jīn huáng xìng zǐ féi，",
        "mài huā xuě bái cài huā xī。",
        "rì cháng lí luò wú rén guò，",
        "wéi yǒu qīng tíng jiá dié fēi。"
    ],
    "keywords": [
        { "word": "肥", "note": "饱满。" },
        { "word": "篱落", "note": "篱笆。" },
        { "word": "蛱蝶", "note": "蝴蝶。" }
    ],
    "analysis": "初夏瓜果蔬菜长势喜人，昼长村静，只有蜻蜓蝴蝶飞舞，静谧优美。"
},
{
    "id": 14,
    "title": "四时田园杂兴·夏日其二",
    "author": "【宋】范成大",
    "content": [
        "五月江吴麦秀寒，",
        "移秧披絮尚衣单。",
        "稻根科斗行如阵，",
        "田水今年一尺宽。"
    ],
    "pinyin": [
        "wǔ yuè jiāng wú mài xiù hán，",
        "yí yāng pī xù shàng yī dān。",
        "dào gēn kē dǒu xíng rú zhèn，",
        "tián shuǐ jīn nián yī chǐ kuān。"
    ],
    "keywords": [
        { "word": "麦秀", "note": "麦子抽穗。" },
        { "word": "移秧", "note": "插秧。" },
        { "word": "科斗", "note": "蝌蚪。" }
    ],
    "analysis": "初夏插秧时节天气微凉，田水充足，蝌蚪成群，一派农忙水乡风光。"
},
{
    "id": 15,
    "title": "四时田园杂兴·夏日其三",
    "author": "【宋】范成大",
    "content": [
        "三夜阴霪败场圃，",
        "一竿晴日舞比邻。",
        "小儿拔秧大儿插，",
        "笠是兜鍪蓑是甲。"
    ],
    "pinyin": [
        "sān yè yīn yín bài cháng pǔ，",
        "yī gān qíng rì wǔ bǐ lín。",
        "xiǎo ér bá yāng dà ér chā，",
        "lì shì dōu móu suō shì jiǎ。"
    ],
    "keywords": [
        { "word": "阴霪", "note": "连绵阴雨。" },
        { "word": "比邻", "note": "邻居。" },
        { "word": "兜鍪", "note": "古代头盔，代指斗笠。" }
    ],
    "analysis": "久雨初晴，全家抢时插秧，斗笠蓑衣如盔甲，农忙紧张又热烈。"
},
{
    "id": 16,
    "title": "四时田园杂兴·夏日其四",
    "author": "【宋】范成大",
    "content": [
        "槐影沉沉雨势来，",
        "小池满处水萦回。",
        "农人只恨无禾麦，",
        "不在梅边与柳边。"
    ],
    "pinyin": [
        "huái yǐng chén chén yǔ shì lái，",
        "xiǎo chí mǎn chù shuǐ yíng huí。",
        "nóng rén zhǐ hèn wú hé mài，",
        "bù zài méi biān yǔ liǔ biān。"
    ],
    "keywords": [
        { "word": "萦回", "note": "回旋流淌。" },
        { "word": "禾麦", "note": "庄稼。" },
        { "word": "恨", "note": "担心，忧虑。" }
    ],
    "analysis": "大雨将至，农人只忧心庄稼，无心欣赏风雨景色，心系农事令人动容。"
},
{
    "id": 17,
    "title": "四时田园杂兴·夏日其五",
    "author": "【宋】范成大",
    "content": [
        "青枝满地花狼藉，",
        "知是儿孙斗草来。",
        "雨里船中最无事，",
        "藕丝菱叶傍江干。"
    ],
    "pinyin": [
        "qīng zhī mǎn dì huā láng jí，",
        "zhī shì ér sūn dòu cǎo lái。",
        "yǔ lǐ chuán zhōng zuì wú shì，",
        "ǒu sī líng yè bàng jiāng gàn。"
    ],
    "keywords": [
        { "word": "狼藉", "note": "杂乱。" },
        { "word": "斗草", "note": "儿童游戏。" },
        { "word": "江干", "note": "江边。" }
    ],
    "analysis": "雨后花枝凌乱，知是孩童斗草嬉戏，水乡闲静，充满童趣。"
},
{
    "id": 18,
    "title": "四时田园杂兴·夏日其六",
    "author": "【宋】范成大",
    "content": [
        "昼出耘田夜绩麻，",
        "村庄儿女各当家。",
        "童孙未解供耕织，",
        "也傍桑阴学种瓜。"
    ],
    "pinyin": [
        "zhòu chū yún tián yè jì má，",
        "cūn zhuāng ér nǚ gè dāng jiā。",
        "tóng sūn wèi jiě gòng gēng zhī，",
        "yě bàng sāng yīn xué zhǒng guā。"
    ],
    "keywords": [
        { "word": "耘田", "note": "除草。" },
        { "word": "绩麻", "note": "搓麻线。" },
        { "word": "傍", "note": "靠近。" }
    ],
    "analysis": "农家日夜忙碌，男女各司其职，孩童也模仿劳作，生动展现乡村勤劳风貌。"
},
{
    "id": 19,
    "title": "四时田园杂兴·夏日其七",
    "author": "【宋】范成大",
    "content": [
        "麻叶萧萧桑叶乾，",
        "蚕眠三日已三番。",
        "屋上鸠鸣谷雨过，",
        "茧簇高低昼已寒。"
    ],
    "pinyin": [
        "má yè xiāo xiāo sāng yè qián，",
        "cán mián sān rì yǐ sān fān。",
        "wū shàng jiū míng gǔ yǔ guò，",
        "jiǎn cù gāo dī zhòu yǐ hán。"
    ],
    "keywords": [
        { "word": "萧萧", "note": "风吹叶声。" },
        { "word": "蚕眠", "note": "蚕蜕皮时的休眠。" },
        { "word": "茧簇", "note": "蚕结茧的草簇。" }
    ],
    "analysis": "蚕事将毕，桑叶渐枯，天气转凉，真实记录养蚕后期景象。"
},
{
    "id": 20,
    "title": "四时田园杂兴·夏日其八",
    "author": "【宋】范成大",
    "content": [
        "槐叶初齐乳燕飞，",
        "樱桃枝上熟梅肥。",
        "无人不道看花去，",
        "自扫林亭看落晖。"
    ],
    "pinyin": [
        "huái yè chū qí rǔ yàn fēi，",
        "yīng táo zhī shàng shú méi féi。",
        "wú rén bù dào kàn huā qù，",
        "zì sǎo lín tíng kàn luò huī。"
    ],
    "keywords": [
        { "word": "乳燕", "note": "小燕。" },
        { "word": "落晖", "note": "夕阳余晖。" },
        { "word": "林亭", "note": "林间小亭。" }
    ],
    "analysis": "夏日花果繁盛，诗人独扫亭院静看夕阳，清雅闲适。"
},
{
    "id": 21,
    "title": "四时田园杂兴·夏日其九",
    "author": "【宋】范成大",
    "content": [
        "下田戽水出江流，",
        "高垄翻江逆上沟。",
        "地势不齐人力尽，",
        "丁男常在踏车头。"
    ],
    "pinyin": [
        "xià tián hù shuǐ chū jiāng liú，",
        "gāo lǒng fān jiāng nì shàng gōu。",
        "dì shì bù qí rén lì jìn，",
        "dīng nán cháng zài tà chē tóu。"
    ],
    "keywords": [
        { "word": "戽水", "note": "车水灌溉。" },
        { "word": "高垄", "note": "高田。" },
        { "word": "踏车", "note": "踩踏水车。" }
    ],
    "analysis": "农民费力踏车灌溉高低田地，尽显农作辛苦。"
},
{
    "id": 22,
    "title": "四时田园杂兴·夏日其十",
    "author": "【宋】范成大",
    "content": [
        "种禾终不种山苗，",
        "薄俗由来羡富饶。",
        "试问太平田舍子，",
        "何如马上取金貂。"
    ],
    "pinyin": [
        "zhǒng hé zhōng bù zhǒng shān miáo，",
        "báo sú yóu lái xiàn fù ráo。",
        "shì wèn tài píng tián shè zǐ，",
        "hé rú mǎ shàng qǔ jīn diāo。"
    ],
    "keywords": [
        { "word": "山苗", "note": "山上杂草。" },
        { "word": "薄俗", "note": "世俗风气。" },
        { "word": "金貂", "note": "高官服饰。" }
    ],
    "analysis": "诗人对比农耕与仕途，坚守田园之志，暗含对世俗名利的淡然。"
},
{
    "id": 23,
    "title": "四时田园杂兴·夏日其十一",
    "author": "【宋】范成大",
    "content": [
        "蜩螗千万沸斜阳，",
        "蛙黾无边聒夜长。",
        "不把痴聋相对治，",
        "梦魂争得到藜床。"
    ],
    "pinyin": [
        "tiáo táng qiān wàn fèi xié yáng，",
        "wā miǎn wú biān guō yè cháng。",
        "bù bǎ chī lóng xiāng duì zhì，",
        "mèng hún zhēng dé dào lí chuáng。"
    ],
    "keywords": [
        { "word": "蜩螗", "note": "蝉。" },
        { "word": "蛙黾", "note": "蛙类。" },
        { "word": "藜床", "note": "简陋床榻。" }
    ],
    "analysis": "夏日蝉鸣蛙叫日夜不绝，诗人自嘲需装聋作哑方能安睡，幽默生动。"
},
{
    "id": 24,
    "title": "四时田园杂兴·夏日其十二",
    "author": "【宋】范成大",
    "content": [
        "紫青莼菜卷荷香，",
        "玉雪芹芽拔薤长。",
        "自撷溪毛充晚食，",
        "不劳鼎食厌膏粱。"
    ],
    "pinyin": [
        "zǐ qīng chún cài juǎn hé xiāng，",
        "yù xuě qín yá bá xiè cháng。",
        "zì xié xī máo chōng wǎn shí，",
        "bù láo dǐng shí yàn gāo liáng。"
    ],
    "keywords": [
        { "word": "莼菜", "note": "水生野菜。" },
        { "word": "薤", "note": "野菜名。" },
        { "word": "鼎食", "note": "富贵人家饮食。" }
    ],
    "analysis": "采摘野菜自食，清淡自在，胜过富贵膏粱，表达安贫乐道之心。"
},
{
    "id": 25,
    "title": "四时田园杂兴·秋日其一",
    "author": "【宋】范成大",
    "content": [
        "拨泥寻笋覆苔痕，",
        "采菊东篱偶开门。",
        "近日田家不迎客，",
        "雨声秋尽断人魂。"
    ],
    "pinyin": [
        "bō ní xún sǔn fù tái hén，",
        "cǎi jú dōng lí ǒu kāi mén。",
        "jìn rì tián jiā bù yíng kè，",
        "yǔ shēng qiū jìn duàn rén hún。"
    ],
    "keywords": [
        { "word": "苔痕", "note": "苔藓痕迹。" },
        { "word": "东篱", "note": "东边篱笆，代指菊圃。" },
        { "word": "断人魂", "note": "令人伤感。" }
    ],
    "analysis": "秋日雨后寻笋采菊，秋深雨冷，田家少客，意境清寂。"
},
{
    "id": 26,
    "title": "四时田园杂兴·秋日其二",
    "author": "【宋】范成大",
    "content": [
        "新筑场泥镜面平，",
        "家家打稻趁霜晴。",
        "笑歌声里轻雷动，",
        "一夜连枷响到明。"
    ],
    "pinyin": [
        "xīn zhù cháng ní jìng miàn píng，",
        "jiā jiā dǎ dào chèn shuāng qíng。",
        "xiào gē shēng lǐ qīng léi dòng，",
        "yī yè lián jiā xiǎng dào míng。"
    ],
    "keywords": [
        { "word": "场泥", "note": "打谷场。" },
        { "word": "霜晴", "note": "下霜后的晴天。" },
        { "word": "连枷", "note": "脱粒农具。" }
    ],
    "analysis": "秋收时节，村民连夜打稻，欢声笑语伴着农具声响，丰收喜悦满溢。"
},
{
    "id": 27,
    "title": "四时田园杂兴·秋日其三",
    "author": "【宋】范成大",
    "content": [
        "租船满载候开仓，",
        "粒粒如珠白似霜。",
        "不惜两钟输一斛，",
        "尚赢糠覈饱儿郎。"
    ],
    "pinyin": [
        "zū chuán mǎn zài hòu kāi cāng，",
        "lì lì rú zhū bái sì shuāng。",
        "bù xī liǎng zhōng shū yī hú，",
        "shàng yíng kāng hé bǎo ér láng。"
    ],
    "keywords": [
        { "word": "租船", "note": "运粮船。" },
        { "word": "钟、斛", "note": "古代容量单位。" },
        { "word": "糠覈", "note": "谷皮粗屑。" }
    ],
    "analysis": "农民辛苦收获却要缴纳重租，仅剩粗糠养家，反映现实疾苦。"
},
{
    "id": 28,
    "title": "四时田园杂兴·秋日其四",
    "author": "【宋】范成大",
    "content": [
        "菊枝倾倒不成丛，",
        "桐叶凋零已半空。",
        "自是人生常恨别，",
        "西风吹雨又残红。"
    ],
    "pinyin": [
        "jú zhī qīng dǎo bù chéng cóng，",
        "tóng yè diāo líng yǐ bàn kōng。",
        "zì shì rén shēng cháng hèn bié，",
        "xī fēng chuī yǔ yòu cán hóng。"
    ],
    "keywords": [
        { "word": "凋零", "note": "枯萎飘落。" },
        { "word": "残红", "note": "残花。" },
        { "word": "恨别", "note": "为离别而遗憾。" }
    ],
    "analysis": "秋景萧瑟，触景生情，抒发人生离别之愁。"
},
{
    "id": 29,
    "title": "四时田园杂兴·秋日其五",
    "author": "【宋】范成大",
    "content": [
        "静看檐蛛结网低，",
        "无端妨碍小虫飞。",
        "蜻蜒倒挂蜂儿窘，",
        "催唤山童为解围。"
    ],
    "pinyin": [
        "jìng kàn yán zhū jié wǎng dī，",
        "wú duān fáng ài xiǎo chóng fēi。",
        "qīng tíng dào guà fēng ér jiǒng，",
        "cuī huàn shān tóng wéi jiě wéi。"
    ],
    "keywords": [
        { "word": "檐蛛", "note": "屋檐下的蜘蛛。" },
        { "word": "窘", "note": "困窘，被困。" },
        { "word": "解围", "note": "解救。" }
    ],
    "analysis": "诗人见小虫被蛛网所困，唤童解救，充满仁爱与闲趣。"
},
{
    "id": 30,
    "title": "四时田园杂兴·秋日其六",
    "author": "【宋】范成大",
    "content": [
        "垂成穑事苦艰难，",
        "忌雨嫌风更怯寒。",
        "笺诉天公休掠剩，",
        "半偿私债半输官。"
    ],
    "pinyin": [
        "chuí chéng sè shì kǔ jiān nán，",
        "jì yǔ xián fēng gèng qiè hán。",
        "jiān sù tiān gōng xiū lüè shèng，",
        "bàn cháng sī zhài bàn shū guān。"
    ],
    "keywords": [
        { "word": "穑事", "note": "收割庄稼。" },
        { "word": "怯寒", "note": "害怕寒冷。" },
        { "word": "输官", "note": "缴纳官府。" }
    ],
    "analysis": "秋收将成仍怕风雨，收成仅够还债缴税，道尽农民生存艰辛。"
},
{
    "id": 31,
    "title": "四时田园杂兴·秋日其七",
    "author": "【宋】范成大",
    "content": [
        "秋风吹雨暗郊扉，",
        "渺渺平湖白鹭飞。",
        "百里渔家无与伴，",
        "钓船斜系柳阴稀。"
    ],
    "pinyin": [
        "qiū fēng chuī yǔ àn jiāo fēi，",
        "miǎo miǎo píng hú bái lù fēi。",
        "bǎi lǐ yú jiā wú yǔ bàn，",
        "diào chuán xié jì liǔ yīn xī。"
    ],
    "keywords": [
        { "word": "郊扉", "note": "郊外门户。" },
        { "word": "渺渺", "note": "辽阔。" },
        { "word": "渔家", "note": "打鱼人家。" }
    ],
    "analysis": "秋雨平湖，白鹭孤舟，描绘出秋日水乡的孤寂清幽。"
},
{
    "id": 32,
    "title": "四时田园杂兴·秋日其八",
    "author": "【宋】范成大",
    "content": [
        "煮芋烧薪晚未休，",
        "青茨黄独满庭秋。",
        "老翁醉倚柴门看，",
        "乌桕风吹叶打头。"
    ],
    "pinyin": [
        "zhǔ yù shāo xīn wǎn wèi xiū，",
        "qīng cí huáng dú mǎn tíng qiū。",
        "lǎo wēng zuì yǐ chái mén kàn，",
        "wū jiù fēng chuī yè dǎ tóu。"
    ],
    "keywords": [
        { "word": "芋", "note": "芋头。" },
        { "word": "柴门", "note": "简陋院门。" },
        { "word": "乌桕", "note": "落叶乔木。" }
    ],
    "analysis": "秋日农家煮芋闲坐，落叶拂面，质朴悠然。"
},
{
    "id": 33,
    "title": "四时田园杂兴·秋日其九",
    "author": "【宋】范成大",
    "content": [
        "黄纸蠲租白纸催，",
        "皂衣旁午下乡来。",
        "长官头脑冬烘甚，",
        "乞汝青钱买酒回。"
    ],
    "pinyin": [
        "huáng zhǐ juān zū bái zhǐ cuī，",
        "zào yī páng wǔ xià xiāng lái。",
        "zhǎng guān tóu nǎo dōng hōng shèn，",
        "qǐ rǔ qīng qián mǎi jiǔ huí。"
    ],
    "keywords": [
        { "word": "蠲租", "note": "免除租税。" },
        { "word": "皂衣", "note": "差役。" },
        { "word": "冬烘", "note": "糊涂迂腐。" }
    ],
    "analysis": "讽刺官府催租扰民，差役勒索，揭露官场弊病。"
},
{
    "id": 34,
    "title": "四时田园杂兴·秋日其十",
    "author": "【宋】范成大",
    "content": [
        "探梅公子款柴门，",
        "枝北枝南总未春。",
        "忽见小桃红似锦，",
        "却疑侬是武陵人。"
    ],
    "pinyin": [
        "tàn méi gōng zǐ kuǎn chái mén，",
        "zhī běi zhī nán zǒng wèi chūn。",
        "hū jiàn xiǎo táo hóng sì jǐn，",
        "què yí nóng shì wǔ líng rén。"
    ],
    "keywords": [
        { "word": "款", "note": "到访。" },
        { "word": "武陵人", "note": "桃花源中人。" },
        { "word": "小桃", "note": "早桃。" }
    ],
    "analysis": "冬日寻梅未见，忽见桃花盛开，恍如误入桃源，惊喜悠然。"
},
{
    "id": 35,
    "title": "四时田园杂兴·秋日其十一",
    "author": "【宋】范成大",
    "content": [
        "村巷冬深草树稀，",
        "断烟残雪映柴扉。",
        "老翁醉里题诗罢，",
        "自扫阶前落叶归。"
    ],
    "pinyin": [
        "cūn xiàng dōng shēn cǎo shù xī，",
        "duàn yān cán xuě yìng chái fēi。",
        "lǎo wēng zuì lǐ tí shī bà，",
        "zì sǎo jiē qián luò yè guī。"
    ],
    "keywords": [
        { "word": "冬深", "note": "深冬。" },
        { "word": "柴扉", "note": "柴门。" },
        { "word": "阶前", "note": "台阶前。" }
    ],
    "analysis": "深冬村巷冷清，老翁扫叶题诗，清雅自适。"
},
{
    "id": 36,
    "title": "四时田园杂兴·秋日其十二",
    "author": "【宋】范成大",
    "content": [
        "放船闲看雪山晴，",
        "风定奇寒晚更凝。",
        "坐听一篙珠玉碎，",
        "不知湖面已成冰。"
    ],
    "pinyin": [
        "fàng chuán xián kàn xuě shān qíng，",
        "fēng dìng qí hán wǎn gèng níng。",
        "zuò tīng yī gāo zhū yù suì，",
        "bù zhī hú miàn yǐ chéng bīng。"
    ],
    "keywords": [
        { "word": "奇寒", "note": "极度寒冷。" },
        { "word": "凝", "note": "冻结。" },
        { "word": "珠玉碎", "note": "篙破冰的声音。" }
    ],
    "analysis": "冬日泛舟观景，不觉湖面已冻，撑篙破冰，意境清冷又灵动。"
},
{
    "id": 37,
    "title": "四时田园杂兴·冬日其一",
    "author": "【宋】范成大",
    "content": [
        "杞菊垂珠滴露清，",
        "麦摇柔浪晓风轻。",
        "林深无人鸟相呼，",
        "日照空山自雨晴。"
    ],
    "pinyin": [
        "qǐ jú chuí zhū dī lù qīng，",
        "mài yáo róu làng xiǎo fēng qīng。",
        "lín shēn wú rén niǎo xiāng hū，",
        "rì zhào kōng shān zì yǔ qíng。"
    ],
    "keywords": [
        { "word": "杞菊", "note": "枸杞与菊花。" },
        { "word": "柔浪", "note": "麦浪轻柔。" },
        { "word": "空山", "note": "寂静山林。" }
    ],
    "analysis": "冬日清晨露清风柔，山林寂静，鸟鸣空山，宁静淡远。"
},
{
    "id": 38,
    "title": "四时田园杂兴·冬日其二",
    "author": "【宋】范成大",
    "content": [
        "折苇枯荷倒浦风，",
        "黑云垂雨暗江空。",
        "平生惯见荒寒景，",
        "胜似桃源洞里红。"
    ],
    "pinyin": [
        "zhé wěi kū hé dào pǔ fēng，",
        "hēi yún chuí yǔ àn jiāng kōng。",
        "píng shēng guàn jiàn huāng hán jǐng，",
        "shèng sì táo yuán dòng lǐ hóng。"
    ],
    "keywords": [
        { "word": "浦风", "note": "水边风。" },
        { "word": "荒寒", "note": "荒凉清寒。" },
        { "word": "桃源", "note": "桃花源。" }
    ],
    "analysis": "偏爱冬日荒寒江景，认为胜过绚烂春色，体现独特审美。"
},
{
    "id": 39,
    "title": "四时田园杂兴·冬日其三",
    "author": "【宋】范成大",
    "content": [
        "茅舍烟晨吐晓光，",
        "疏林残雪弄斜阳。",
        "隔溪一树寒梅色，",
        "占尽人间腊月香。"
    ],
    "pinyin": [
        "máo shè yān chén tǔ xiǎo guāng，",
        "shū lín cán xuě nòng xié yáng。",
        "gé xī yī shù hán méi sè，",
        "zhàn jìn rén jiān là yuè xiāng。"
    ],
    "keywords": [
        { "word": "晓光", "note": "晨光。" },
        { "word": "斜阳", "note": "夕阳。" },
        { "word": "腊月", "note": "农历十二月。" }
    ],
    "analysis": "冬日晨烟斜阳，寒梅独开，清香满溢，清雅高洁。"
},
{
    "id": 40,
    "title": "四时田园杂兴·冬日其四",
    "author": "【宋】范成大",
    "content": [
        "屋上青山屋下泉，",
        "石盆养竹翠娟娟。",
        "道人不作阳台梦，",
        "只爱西窗雪满天。"
    ],
    "pinyin": [
        "wū shàng qīng shān wū xià quán，",
        "shí pén yǎng zhú cuì juān juān。",
        "dào rén bù zuò yáng tái mèng，",
        "zhī ài xī chuāng xuě mǎn tiān。"
    ],
    "keywords": [
        { "word": "娟娟", "note": "秀美。" },
        { "word": "道人", "note": "诗人自称。" },
        { "word": "阳台梦", "note": "男女情爱之梦。" }
    ],
    "analysis": "山居竹青泉净，诗人独爱雪景，清心寡欲，超然物外。"
},
{
    "id": 41,
    "title": "四时田园杂兴·冬日其五",
    "author": "【宋】范成大",
    "content": [
        "探梅时节暮悠悠，",
        "梅影横斜水自流。",
        "醉里不知天在水，",
        "满船清梦压星河。"
    ],
    "pinyin": [
        "tàn méi shí jié mù yōu yōu，",
        "méi yǐng héng xié shuǐ zì liú。",
        "zuì lǐ bù zhī tiān zài shuǐ，",
        "mǎn chuán qīng mèng yā xīng hé。"
    ],
    "keywords": [
        { "word": "暮悠悠", "note": "傍晚闲适。" },
        { "word": "横斜", "note": "梅花疏朗姿态。" },
        { "word": "星河", "note": "天上银河。" }
    ],
    "analysis": "月夜探梅，醉卧舟中，梦境与星河交融，空灵浪漫。"
},
{
    "id": 42,
    "title": "四时田园杂兴·冬日其六",
    "author": "【宋】范成大",
    "content": [
        "寒日初升雾未收，",
        "霜华满地碎金流。",
        "老翁早起开门看，",
        "昨夜新添百尺楼。"
    ],
    "pinyin": [
        "hán rì chū shēng wù wèi shōu，",
        "shuāng huá mǎn dì suì jīn liú。",
        "lǎo wēng zǎo qǐ kāi mén kàn，",
        "zuó yè xīn tiān bǎi chǐ lóu。"
    ],
    "keywords": [
        { "word": "霜华", "note": "霜。" },
        { "word": "百尺楼", "note": "喻雪景堆积。" },
        { "word": "新添", "note": "新出现。" }
    ],
    "analysis": "清晨霜雪满地，雪景壮观，令人惊叹。"
},
{
    "id": 43,
    "title": "四时田园杂兴·冬日其七",
    "author": "【宋】范成大",
    "content": [
        "水港浮桥断复通，",
        "渔舟依岸系孤篷。",
        "晚来风定无人迹，",
        "雪满前村一笛风。"
    ],
    "pinyin": [
        "shuǐ gǎng fú qiáo duàn fù tōng，",
        "yú zhōu yī àn xì gū péng。",
        "wǎn lái fēng dìng wú rén jì，",
        "xuě mǎn qián cūn yī dí fēng。"
    ],
    "keywords": [
        { "word": "浮桥", "note": "简易桥。" },
        { "word": "孤篷", "note": "孤船。" },
        { "word": "笛风", "note": "笛声随风。" }
    ],
    "analysis": "雪夜村静，一笛悠扬，清冷中透着诗意。"
},
{
    "id": 44,
    "title": "四时田园杂兴·冬日其八",
    "author": "【宋】范成大",
    "content": [
        "松竹青青岁寒姿，",
        "霜雪纷纷自有时。",
        "莫笑田家无所有，",
        "瓮头春酒熟多时。"
    ],
    "pinyin": [
        "sōng zhú qīng qīng suì hán zī，",
        "shuāng xuě fēn fēn zì yǒu shí。",
        "mò xiào tián jiā wú suǒ yǒu，",
        "wèng tóu chūn jiǔ shú duō shí。"
    ],
    "keywords": [
        { "word": "岁寒姿", "note": "岁寒时节依然青翠的姿态。" },
        { "word": "瓮头", "note": "酒瓮口，指新酿的酒。" },
        { "word": "春酒", "note": "冬日酿制、春日饮用的酒。" }
    ],
    "analysis": "松竹经冬不凋，霜雪按时而至。不要笑话农家贫寒一无所有，家中酒瓮里的春酒早已酿熟，充满质朴自得的田园意趣。"
},
{
    "id": 45,
    "title": "四时田园杂兴·冬日其九",
    "author": "【宋】范成大",
    "content": [
        "烘暖衣裘意自佳",
        "莫嫌寒尽客愁加",
        "今朝霜重东门路",
        "照野残阳满地花"
    ],
    "pinyin": [
        "hōng nuǎn yī qiú yì zì jiā",
        "mò xián hán jìn kè chóu jiā",
        "jīn zhāo shuāng zhòng dōng mén lù",
        "zhào yě cán yáng mǎn dì huā"
    ],
    "keywords": [
        { "word": "烘暖", "note": "烤火取暖" },
        { "word": "霜重", "note": "霜很厚" },
        { "word": "残阳", "note": "夕阳" }
    ],
    "analysis": "冬日取暖虽舒适，仍有淡淡客愁。清晨霜铺满路，夕阳照在原野上，如同满地落花，景色清冷又美丽。"
},
{
    "id": 46,
    "title": "四时田园杂兴·冬日其十",
    "author": "【宋】范成大",
    "content": [
        "黄纸蠲租白纸催",
        "皂衣旁午下乡来",
        "长官头脑冬烘甚",
        "乞汝青钱买酒回"
    ],
    "pinyin": [
        "huáng zhǐ juān zū bái zhǐ cuī",
        "zào yī páng wǔ xià xiāng lái",
        "zhǎng guān tóu nǎo dōng hōng shèn",
        "qǐ rǔ qīng qián mǎi jiǔ huí"
    ],
    "keywords": [
        { "word": "蠲租", "note": "免除租税" },
        { "word": "皂衣", "note": "差役" },
        { "word": "冬烘", "note": "糊涂迂腐" }
    ],
    "analysis": "官府一边免税一边催租，差役下乡骚扰百姓，讽刺官吏昏庸、勒索乡民，反映当时民间疾苦。"
},
{
    "id": 47,
    "title": "四时田园杂兴·冬日其十一",
    "author": "【宋】范成大",
    "content": [
        "村巷冬深草树稀",
        "断烟残雪映柴扉",
        "老翁醉里题诗罢",
        "自扫阶前落叶归"
    ],
    "pinyin": [
        "cūn xiàng dōng shēn cǎo shù xī",
        "duàn yān cán xuě yìng chái fēi",
        "lǎo wēng zuì lǐ tí shī bà",
        "zì sǎo jiē qián luò yè guī"
    ],
    "keywords": [
        { "word": "冬深", "note": "深冬" },
        { "word": "柴扉", "note": "柴门" },
        { "word": "阶前", "note": "台阶前" }
    ],
    "analysis": "深冬村庄草木稀疏，残雪映着柴门。老人酒后扫叶题诗，生活简朴又悠然自得。"
},
{
    "id": 48,
    "title": "四时田园杂兴·冬日其十二",
    "author": "【宋】范成大",
    "content": [
        "放船闲看雪山晴",
        "风定奇寒晚更凝",
        "坐听一篙珠玉碎",
        "不知湖面已成冰"
    ],
    "pinyin": [
        "fàng chuán xián kàn xuě shān qíng",
        "fēng dìng qí hán wǎn gèng níng",
        "zuò tīng yī gāo zhū yù suì",
        "bù zhī hú miàn yǐ chéng bīng"
    ],
    "keywords": [
        { "word": "奇寒", "note": "特别寒冷" },
        { "word": "凝", "note": "冻结" },
        { "word": "珠玉碎", "note": "竹篙破冰的清脆声响" }
    ],
    "analysis": "乘船看雪山晴景，风停后夜晚更冷。坐着听篙声清脆，才发现湖面早已结冰，意境清冷又灵动。"
},
{
    "id": 49,
    "title": "四时田园杂兴·冬日其十三",
    "author": "【宋】范成大",
    "content": [
        "骑吹东来里巷喧",
        "行春车马闹如烟",
        "系牛莫碍门前路",
        "移系门西碌碡边"
    ],
    "pinyin": [
        "qí chuī dōng lái lǐ xiàng xuān",
        "xíng chūn chē mǎ nào rú yān",
        "xì niú mò ài mén qián lù",
        "yí xì mén xī lù zhóu biān"
    ],
    "keywords": [
        { "word": "骑吹", "note": "官员出行的仪仗乐队" },
        { "word": "里巷", "note": "街巷" },
        { "word": "碌碡", "note": "石制农具，用来碾谷压地" }
    ],
    "analysis": "官员下乡巡视，街巷喧闹。农家怕牛挡路，把牛拴到石碾边，真实记录乡村日常与官民场景。"
},
{
    "id": 50,
    "title": "四时田园杂兴·冬日其十四",
    "author": "【宋】范成大",
    "content": [
        "寒食花枝插满头",
        "蒨裙青袂几扁舟",
        "一年一度游山寺",
        "不上灵岩即虎丘"
    ],
    "pinyin": [
        "hán shí huā zhī chā mǎn tóu",
        "qiàn qún qīng mèi jǐ biǎn zhōu",
        "yī nián yī dù yóu shān sì",
        "bù shàng líng yán jí hǔ qiū"
    ],
    "keywords": [
        { "word": "寒食", "note": "寒食节" },
        { "word": "蒨裙", "note": "红色裙子" },
        { "word": "灵岩、虎丘", "note": "苏州两座名山" }
    ],
    "analysis": "寒食节人们盛装出游，乘船游山，每年必去灵岩或虎丘，描绘江南节日风俗。"
},
{
    "id": 51,
    "title": "四时田园杂兴·冬日其十五",
    "author": "【宋】范成大",
    "content": [
        "老盆新熟杜茅柴",
        "携向田头祭社来",
        "巫媪莫嫌滋味薄",
        "旗亭官酒更多灰"
    ],
    "pinyin": [
        "lǎo pén xīn shú dù máo chái",
        "xié xiàng tián tóu jì shè lái",
        "wū ǎo mò xián zī wèi bó",
        "qí tíng guān jiǔ gèng duō huī"
    ],
    "keywords": [
        { "word": "杜茅柴", "note": "农家自酿薄酒" },
        { "word": "祭社", "note": "祭祀土地神" },
        { "word": "巫媪", "note": "主持祭祀的老妇人" }
    ],
    "analysis": "农家拿自酿薄酒去祭社，幽默地说别嫌酒淡，官店里的酒杂质更多，充满乡村生活气息。"
},
{
    "id": 52,
    "title": "四时田园杂兴·冬日其十六",
    "author": "【宋】范成大",
    "content": [
        "步屧寻春有好怀",
        "雨余蹄道水如杯",
        "随人黄犬搀前去",
        "走到溪边忽自回"
    ],
    "pinyin": [
        "bù xiè xún chūn yǒu hǎo huái",
        "yǔ yú tí dào shuǐ rú bēi",
        "suí rén huáng quǎn chān qián qù",
        "zǒu dào xī biān hū zì huí"
    ],
    "keywords": [
        { "word": "步屧", "note": "步行" },
        { "word": "蹄道", "note": "有马蹄印的路" },
        { "word": "搀前", "note": "抢在前面" }
    ],
    "analysis": "春日雨后散步寻春，黄狗跑在前面，到溪边又自己跑回来，生动活泼，充满生活小趣味。"
},
{
    "id": 53,
    "title": "四时田园杂兴·冬日其十七",
    "author": "【宋】范成大",
    "content": [
        "种园得果偿劳倦",
        "不奈儿童鸟雀搔",
        "已插棘针樊笋径",
        "更铺渔网盖樱桃"
    ],
    "pinyin": [
        "zhòng yuán dé guǒ cháng láo juàn",
        "bù nài ér tóng niǎo què sāo",
        "yǐ chā jí zhēn fán sǔn jìng",
        "gèng pū yú wǎng gài yīng táo"
    ],
    "keywords": [
        { "word": "偿劳倦", "note": "报答辛苦劳作" },
        { "word": "棘针", "note": "荆棘" },
        { "word": "樊", "note": "围挡" }
    ],
    "analysis": "辛苦种出果实，怕孩子和鸟雀偷吃，用荆棘拦路、渔网盖樱桃，农家护果场景十分真实有趣。"
},
{
    "id": 54,
    "title": "四时田园杂兴·冬日其十八",
    "author": "【宋】范成大",
    "content": [
        "静看檐蛛结网低",
        "无端妨碍小虫飞",
        "蜻蜓倒挂蜂儿窘",
        "催唤山童为解围"
    ],
    "pinyin": [
        "jìng kàn yán zhū jié wǎng dī",
        "wú duān fáng ài xiǎo chóng fēi",
        "qīng tíng dào guà fēng ér jiǒng",
        "cuī huàn shān tóng wéi jiě wéi"
    ],
    "keywords": [
        { "word": "檐蛛", "note": "屋檐下的蜘蛛" },
        { "word": "窘", "note": "被困住" },
        { "word": "解围", "note": "解救出来" }
    ],
    "analysis": "诗人看见蜻蜓蜜蜂被蛛网困住，叫孩童来解救，充满怜爱之心与闲逸情趣。"
},
{
    "id": 55,
    "title": "四时田园杂兴·冬日其十九",
    "author": "【宋】范成大",
    "content": [
        "垂成穑事苦艰难",
        "忌雨嫌风更怯寒",
        "笺诉天公休掠剩",
        "半偿私债半输官"
    ],
    "pinyin": [
        "chuí chéng sè shì kǔ jiān nán",
        "jì yǔ xián fēng gèng qiè hán",
        "jiān sù tiān gōng xiū lüè shèng",
        "bàn cháng sī zhài bàn shū guān"
    ],
    "keywords": [
        { "word": "穑事", "note": "收割庄稼" },
        { "word": "怯寒", "note": "害怕寒潮" },
        { "word": "输官", "note": "交给官府" }
    ],
    "analysis": "庄稼快要收成却怕风雨寒潮，农民向天公祷告，收成一半还债一半交税，写尽农民艰辛。"
},
{
    "id": 56,
    "title": "四时田园杂兴·冬日其二十",
    "author": "【宋】范成大",
    "content": [
        "租船满载候开仓",
        "粒粒如珠白似霜",
        "不惜两钟输一斛",
        "尚赢糠覈饱儿郎"
    ],
    "pinyin": [
        "zū chuán mǎn zài hòu kāi cāng",
        "lì lì rú zhū bái sì shuāng",
        "bù xī liǎng zhōng shū yī hú",
        "shàng yíng kāng hé bǎo ér láng"
    ],
    "keywords": [
        { "word": "租船", "note": "运送租粮的船" },
        { "word": "钟、斛", "note": "古代容量单位" },
        { "word": "糠覈", "note": "谷皮、粗糠" }
    ],
    "analysis": "粮食雪白饱满，却要高额交税，农民只能靠糠皮养活孩子，深刻反映赋税沉重。"
},
{
    "id": 57,
    "title": "四时田园杂兴·冬日其二十一",
    "author": "【宋】范成大",
    "content": [
        "新筑场泥镜面平",
        "家家打稻趁霜晴",
        "笑歌声里轻雷动",
        "一夜连枷响到明"
    ],
    "pinyin": [
        "xīn zhù chǎng ní jìng miàn píng",
        "jiā jiā dǎ dào chèn shuāng qíng",
        "xiào gē shēng lǐ qīng léi dòng",
        "yī yè lián jiā xiǎng dào míng"
    ],
    "keywords": [
        { "word": "场泥", "note": "打谷场" },
        { "word": "霜晴", "note": "下霜后的晴天" },
        { "word": "连枷", "note": "打谷用的农具" }
    ],
    "analysis": "秋收时节，打谷场平整如镜，家家户户趁晴天打稻，整夜欢声笑语、农具作响，满是丰收喜悦。"
},
{
    "id": 58,
    "title": "四时田园杂兴·冬日其二十二",
    "author": "【宋】范成大",
    "content": [
        "槐叶初匀日气凉",
        "葱葱鼠耳翠成双",
        "三公只得三株看",
        "闲客清阴满北窗"
    ],
    "pinyin": [
        "huái yè chū yún rì qì liáng",
        "cōng cōng shǔ ěr cuì chéng shuāng",
        "sān gōng zhǐ de sān zhū kàn",
        "xián kè qīng yīn mǎn běi chuāng"
    ],
    "keywords": [
        { "word": "鼠耳", "note": "一种嫩叶植物" },
        { "word": "三公", "note": "代指高官" },
        { "word": "清阴", "note": "清凉树荫" }
    ],
    "analysis": "槐树叶茂阴凉，诗人幽默地说高官也难得这般绿荫，自己却独享满窗清凉，自得田园闲适。"
},
{
    "id": 59,
    "title": "四时田园杂兴·冬日其二十三",
    "author": "【宋】范成大",
    "content": [
        "黄尘行客汗如浆",
        "少住侬家漱井香",
        "借与门前磐石坐",
        "柳阴亭午正风凉"
    ],
    "pinyin": [
        "huáng chén xíng kè hàn rú jiāng",
        "shǎo zhù nóng jiā shù jǐng xiāng",
        "jiè yǔ mén qián pán shí zuò",
        "liǔ yīn tíng wǔ zhèng fēng liáng"
    ],
    "keywords": [
        { "word": "汗如浆", "note": "汗流很多" },
        { "word": "侬家", "note": "我家" },
        { "word": "亭午", "note": "正午" }
    ],
    "analysis": "路上行人酷热难当，农家热情邀请他在门前柳阴磐石歇息、喝井水乘凉，民风淳朴善良。"
},
{
    "id": 60,
    "title": "四时田园杂兴·冬日其二十四",
    "author": "【宋】范成大",
    "content": [
        "三旬蚕忌闭门中",
        "邻曲都无步往踪",
        "犹是晓晴风露下",
        "采桑时节暂相逢"
    ],
    "pinyin": [
        "sān xún cán jì bì mén zhōng",
        "lín qǔ dōu wú bù wǎng zōng",
        "yóu shì xiǎo qíng fēng lù xià",
        "cǎi sāng shí jié zàn xiāng féng"
    ],
    "keywords": [
        { "word": "蚕忌", "note": "养蚕期间的风俗禁忌" },
        { "word": "邻曲", "note": "邻居" },
        { "word": "晓晴", "note": "清晨天晴" }
    ],
    "analysis": "养蚕期间村民闭门少往来，只在清晨采桑时偶然相遇，真实记录江南乡村养蚕习俗。"
}
];