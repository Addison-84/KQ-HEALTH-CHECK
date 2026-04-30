import React, { useState, useEffect, useRef } from "react";
const WHATSAPP_LINK = "https://wa.me/60164006608";
// --- 1. 题目配置 (精确靶向) ---
const QI_QUESTIONS = [
  "食欲较差，饭后易腹胀，大便常不成形 (测脾胃气机)",
  "畏寒怕冷，手脚常年冰凉，吃生冷易腹泻 (测脾肾阳气)",
  "口干咽燥，眼睛干涩，午后面部常发热 (测肝肾津液)",
  "经常叹气，胸胁闷胀，情绪易感压抑低落 (测肝气疏泄)",
  "口苦口臭，面部易出油，常觉身体闷热黏腻 (测湿热蕴结)",
  "面色苍白或发黄，蹲下站起时常感头晕心悸 (测气血储备)",
  "夜间频繁出汗(盗汗)，手脚心常觉莫名发热 (测阴分火旺)",
  "身体沉重发沉，四肢像灌了铅，大便黏滞难冲 (测痰湿阻滞)",
  "入睡困难多梦易醒，常觉心慌，记忆力下降 (测心脾双虚)",
  "急躁易怒，一点就着，常觉头晕胀痛、面红目赤 (测肝火上炎)",
  "身体常有固定刺痛感，舌底紫暗筋脉明显 (测血瘀内阻)",
  "动则气喘出虚汗，反复感冒，不敢吹冷风 (测肺卫表气)",
  "腰膝时常酸软无力，耳鸣脱发，精力断崖式衰退 (测肾精本源)",
  "无明显上述不适，整体精力充沛，情绪平稳 (平和体质测试)",
];

// 神的10种五行能量问卷
const SHEN_QUESTIONS = [
  "情绪易感郁闷委屈，常不自觉叹气，对周遭事物缺乏耐心 (测木行·肝郁)",
  "容易急躁易怒，控制不住火气，常伴有偏头痛或眼部胀痛 (测木行·肝火)",
  "心烦意乱，睡眠极浅多梦，容易心慌心悸，常觉莫名的焦虑 (测火行·心火)",
  "精神恍惚，容易受惊吓，缺乏安全感，遇事容易往坏处想 (测火行·心虚)",
  "思虑过度，脑子里不停盘算，导致食欲下降，身体感觉沉重 (测土行·脾湿)",
  "极度疲乏，对任何事物都提不起兴趣，说话声音低微懒言 (测土行·脾虚)",
  "常常无故陷入悲伤情绪，容易流泪，对未来缺乏期待与动力 (测金行·肺郁)",
  "情绪容易激动但很快疲劳，常觉呼吸短促，伴随皮肤异常干燥 (测金行·气虚)",
  "长期处于高压恐惧中，害怕失败，常感腰膝酸软，精力透支 (测水行·精耗)",
  "缺乏决断力，遇事容易慌张退缩，极度渴望温暖，常觉下肢冰凉 (测水行·阳虚)",
];

// --- 2. 气：14种证型全数据库 (日常起居专业扩容) ---
const QI_DATABASE = {
  "01": {
    name: "脾胃虚弱",
    tea: "KQ 01 号",
    base: "乌饭茶",
    herbs: [
      { n: "黄芪", e: "补气之长，提升机体卫气防御。" },
      { n: "党参", e: "后天能量引擎，促进消化生化。" },
      { n: "白术", e: "健脾第一要药，消除肠胃积滞。" },
      { n: "茯苓", e: "药性平和，渗利水湿宁安神智。" },
    ],
    acup: [
      {
        n: "足三里",
        p: "外膝眼下四横指",
        e: "人体第一保健要穴，激发脾胃动力。",
      },
      { n: "中脘", p: "腹部正中线", e: "中焦气机枢纽，快速缓解积食胀气。" },
    ],
    advice: [
      "【忌生冷寒凉】生冷食物会直接扑灭脾胃阳气，导致消化酶活性骤降，加重腹胀与湿气累积。",
      "【饭后缓行百步】借助轻微的肢体活动，微微带动气血流转，帮助中焦脾胃运化肠道积滞。",
      "【注意腹部保暖】脾胃最怕受寒，可使用暖宝宝或日常穿戴护腰，维系核心脏腑的运化温度。",
      "【多食山药等健脾物】山药色白入肺、味甘入脾，能温和补益后天脾胃生化之源，且不增加负担。",
    ],
  },

  "02": {
    name: "脾肾阳虚",
    tea: "KQ 02 号",
    base: "乌饭茶",
    herbs: [
      { n: "干姜", e: "温中散寒，驱逐中焦脏腑冷气。" },
      { n: "肉桂", e: "引火归元，大补命门之火。" },
      { n: "杜仲", e: "双向降压，专治腰膝酸冷。" },
      { n: "小茴香", e: "温暖下焦肾气，缓解少腹冷痛。" },
    ],
    acup: [
      { n: "关元", p: "肚脐下三寸处", e: "培补元气，为身体注入纯阳之火。" },
      { n: "命门", p: "后腰对肚脐处", e: "生命之火源泉，激活督脉阳气。" },
    ],
    advice: [
      "【坚持热水泡脚】水位建议没过三阴交穴（内踝上三寸），引虚火下行，同时温热血液回流温暖肾脏。",
      "【忌晨起洗头】早晨是人体阳气生发之时，头为诸阳之会，遇水受寒极易导致阳气受损被遏制。",
      "【晨饮生姜红枣水】生姜散寒，红枣补血，早晨饮用能如朝阳般唤醒机体一天的热量代谢系统。",
      "【增加户外背部日照】背部督脉总督一身之阳，借自然界的太阳补充体内的“太阳”，驱除深层寒气。",
    ],
  },

  "03": {
    name: "肝肾阴虚",
    tea: "KQ 03 号",
    base: "乌饭茶",
    herbs: [
      { n: "石斛", e: "救命仙草，修复熬夜造成的津液干涸。" },
      { n: "麦冬", e: "清肺胃虚热，缓解口干内火灼烧。" },
      { n: "玉竹", e: "温润黏膜，改善眼干涩皮肤干燥。" },
      { n: "枸杞", e: "平补肝肾，补充肝血明目抗衰。" },
    ],
    acup: [
      { n: "太溪", p: "内踝后方凹陷", e: "肾经原穴，滋生肾水制约虚火。" },
      { n: "三阴交", p: "内踝尖上三寸", e: "女性保养大穴，主治内分泌。" },
    ],
    advice: [
      "【午休子午觉必不可少】中午11点-1点是心经当令，小憩20分钟能极有效滋养心血与肝血，防止虚火上炎。",
      "【控制电子产品使用】“久视伤血”，长时间紧盯屏幕会过度消耗肝血，引发眼睛干涩和视力衰退。",
      "【戒除辛辣烟酒刺激】辛辣物品犹如火上浇油，会进一步灼烧体内本就干涸的津液（水液储备）。",
      "【晚间尝试静心冥想】阴虚之人往往伴随心神浮躁，睡前冥想有助于收敛外散的神气，诱导深度睡眠。",
    ],
  },

  "04": {
    name: "肝郁气滞",
    tea: "KQ 04 号",
    base: "乌饭茶",
    herbs: [
      { n: "玫瑰花", e: "疏解肝脏郁结之气，平复焦虑。" },
      { n: "佛手", e: "理气化痰不伤阴，打通胸胁胀满。" },
      { n: "合欢皮", e: "安神解郁，促进多巴胺分泌。" },
      { n: "陈皮", e: "调理中焦气机，带动能量循环。" },
    ],
    acup: [
      { n: "太冲", p: "足背第一二趾间", e: "肝经出气筒，排解怒气郁闷。" },
      { n: "内关", p: "腕横纹上两寸", e: "双向调节心脏，宽胸理气。" },
    ],
    advice: [
      "【建立情绪宣泄通道】肝主疏泄，情绪压抑会导致体内气机堵塞，可通过大声唱歌、拳击或倾诉将郁气排出。",
      "【保持规律有氧运动】运动是推动气血运行的最佳方式，每周3次微汗慢跑，能强效打破身体的气滞状态。",
      "【多听柔和舒缓音乐】角音入肝，优美柔和的旋律能共振肝胆频率，软化绷紧的神经系统。",
      "【增加绿叶及芳香蔬菜摄入】如芹菜、薄荷、香菜等，芳香之气自带走窜之性，能协助疏达郁结之气。",
    ],
  },

  "05": {
    name: "痰湿蕴热",
    tea: "KQ 05 号",
    base: "乌饭茶",
    herbs: [
      { n: "薏苡仁", e: "化解深层顽固湿浊通过微循环排出。" },
      { n: "淡竹叶", e: "清心火利小便，冲刷体内热毒。" },
      { n: "荷叶", e: "清暑化湿，分解多余脂肪沉积。" },
      { n: "山楂", e: "消散肉食积滞，清除血管垃圾。" },
    ],
    acup: [
      { n: "阴陵泉", p: "小腿内侧胫骨下", e: "脾经排湿开关，抽干下肢湿热。" },
      { n: "丰隆", p: "小腿前外侧中点", e: "化痰要穴，化解有形与无形之痰。" },
    ],
    advice: [
      "【严格戒断夜宵习惯】夜间新陈代谢减缓，此时进食极易转化为宿便和痰浊脂肪，加重身体湿热负荷。",
      "【忌食肥甘厚腻之物】深度加工的甜品和高油脂肉类是痰湿的“培养皿”，需转换为清淡蒸煮饮食。",
      "【保持皮肤与衣物干爽】外湿易引动内湿，湿热体质出汗后必须及时擦干或更换衣物，防止湿邪回流。",
      "【定期进行肠胃轻断食】每周设定1天只摄入流质或轻食，给超载的消化系统一个自我清理垃圾的窗口。",
    ],
  },

  "06": {
    name: "气血两虚",
    tea: "KQ 06 号",
    base: "乌饭茶",
    herbs: [
      { n: "当归", e: "补血圣药，促进红细胞生成。" },
      { n: "熟地", e: "填补骨髓肾精，滋阴补血深层底料。" },
      { n: "龙眼肉", e: "补益心脾，提供天然葡萄糖能量。" },
      { n: "大枣", e: "保护胃气，协同补中益气养血安神。" },
    ],
    acup: [
      { n: "血海", p: "髌骨内上方两寸", e: "引导血液回流，解决眩晕供血不足。" },
      {
        n: "气海",
        p: "肚脐正下方1.5寸",
        e: "激活先天后天之气，提升生命能量。",
      },
    ],
    advice: [
      "【绝对避免大汗运动】“汗为心之液”，大量出汗会进一步耗散本就虚弱的气血，建议以八段锦、太极等静功为主。",
      "【多摄入红色补血食材】如红枣、红豆、猪肝等，通过食物天然的五色五味，直接对位补充造血原料。",
      "【每日晨起进行头皮梳理】用木梳从前发际线梳至后脑，刺激头部多条阳经，引导气血上行充养大脑。",
      "【切忌过度思虑劳神】脑力劳动极度消耗气血，工作需设定专注时钟，每45分钟闭目养神，降低内耗。",
    ],
  },

  "07": {
    name: "阴虚火旺",
    tea: "KQ 07 号",
    base: "乌饭茶",
    herbs: [
      { n: "生地黄", e: "深入血分凉血，扑灭虚假燥火。" },
      { n: "知母", e: "清泻胃肺实火，滋生枯竭津液。" },
      { n: "黄柏", e: "专攻下焦湿热，抑制盗汗发热。" },
      { n: "地骨皮", e: "擅长退骨蒸潮热，散发深层热量。" },
    ],
    acup: [
      { n: "复溜", p: "太溪穴直上两寸", e: "刺激肾水上涌，对付虚火口干。" },
      { n: "照海", p: "内踝尖正下方凹陷", e: "引火归原、养阴安神的捷径。" },
    ],
    advice: [
      "【子时前必须强制入睡】晚11点至凌晨1点是天地阴气最重之时，熬夜会直接抽干津液储备，导致虚火愈演愈烈。",
      "【采用少量多次饮水法】大口灌水无法被细胞吸收，需小口慢饮温水，才能真正滋润干燥的黏膜系统。",
      "【关注居住环境湿度】在干燥季节或冷气房内必须使用加湿器，防止外环境进一步剥夺体表的微小水分。",
      "【多食滋润属性胶质食物】如银耳、百合、秋梨等，利用其天然植物胶质，修复受损发炎的深层细胞。",
    ],
  },

  "08": {
    name: "痰湿阻滞",
    tea: "KQ 08 号",
    base: "乌饭茶",
    herbs: [
      { n: "半夏", e: "化解脾胃寒痰，打通气机升降。" },
      { n: "茯苓", e: "渗水能力强，温和排出经络水湿。" },
      { n: "苍术", e: "气味芳香，强力烘干脾胃积湿。" },
      { n: "厚朴", e: "行气消积，对付腹部胀满胸闷。" },
    ],
    acup: [
      { n: "丰隆", p: "小腿外侧最高处", e: "强效化解咳嗽有形与脂肪无形之痰。" },
      { n: "脾俞", p: "背部第11胸椎旁", e: "振奋脾脏阳气，根本杜绝湿气生成。" },
    ],
    advice: [
      "【保证居住环境通风除湿】外湿是诱发内湿的重要因素，梅雨季或潮湿天需开启除湿机，切断外邪入侵途径。",
      "【增加每日慢走步数】“动则生阳”，持续温和的活动能像内部的暖风机一样，慢慢烘干阻滞在经络中的水湿。",
      "【杜绝一切冰镇冷饮】寒冷会使水液瞬间凝结成“死水”，导致脾胃彻底罢工，代谢废物全面停滞在体内。",
      "【睡前使用艾草温热泡脚】艾草为纯阳之草，配合热水能强力逼出体内的湿寒之气，改善下肢水肿沉重。",
    ],
  },

  "09": {
    name: "心脾两虚",
    tea: "KQ 09 号",
    base: "乌饭茶",
    herbs: [
      { n: "远志", e: "打通心肾连接，改善健忘不集中。" },
      { n: "酸枣仁", e: "天然安眠药，滋养心血对抗失眠。" },
      { n: "茯神", e: "比普通茯苓更强的镇静神经系统。" },
      { n: "木香", e: "行脾胃之气不伤阴，防止肠胃阻滞。" },
    ],
    acup: [
      { n: "神门", p: "手腕横纹尺侧", e: "安定神经，诱发深度睡眠。" },
      { n: "心俞", p: "背部第5胸椎旁", e: "改善心脏供血，缓解慢性疲劳。" },
    ],
    advice: [
      "【睡前进行数字断舍离】心藏神，睡前远离短视频等高刺激信息源，切断大脑的碎片化思虑对心血的持续消耗。",
      "【多食用莲子桂圆健脾粥】脾为气血生化之源，通过药食同源的温和滋养，同时补充消化动力与心脏能量。",
      "【工作采用番茄钟间歇法】不要连续长时间强迫大脑运转，每25分钟彻底放空5分钟，保护脆弱的精力阈值。",
      "【睡前揉捏脚心涌泉穴】引气血下行，不仅能改善手脚冰冷，更能平息大脑飞速转动的念头，助你安眠。",
    ],
  },

  10: {
    name: "肝火上炎",
    tea: "KQ 10 号",
    base: "乌饭茶",
    herbs: [
      { n: "夏枯草", e: "纯阳之气，精准清泄肝脏实火。" },
      { n: "栀子", e: "体内灭火器，导热下行通过小便排出。" },
      { n: "菊花", e: "清透头面风热，缓解红血丝眼干。" },
      { n: "决明子", e: "润滑肠道，将毒素火气从大便排泄。" },
    ],
    acup: [
      { n: "行间", p: "足背一二趾间", e: "专泻肝火，平抑狂躁血压情绪。" },
      { n: "阳陵泉", p: "膝盖外侧下方", e: "疏通肝胆气机，缓解胁肋部抽痛。" },
    ],
    advice: [
      "【设立暴怒情绪缓冲期】“怒则气上”，发火会使气血逆乱直冲脑部。感到愤怒时强迫自己深呼吸十次再开口。",
      "【绝对禁忌高度烈酒与辛辣】酒与辣椒皆为纯阳大热之物，对肝火旺盛者如同火上浇油，极易引发血压危险。",
      "【晨起大口饮用常温白水】利用水分快速通过肠道，促进排便排毒，将积蓄了一夜的肝胆之火从下路排解。",
      "【闭目养神冷敷眼部】肝开窍于目，眼睛发红发胀是肝火外透的信号，可用冷毛巾或洋甘菊纯露冷敷双眼降温。",
    ],
  },

  11: {
    name: "血瘀内阻",
    tea: "KQ 11 号",
    base: "乌饭茶",
    herbs: [
      { n: "丹参", e: "超强活血化瘀，疏通微血管网络。" },
      { n: "桃仁", e: "破除经络陈旧淤血，润泽肠道。" },
      { n: "红花", e: "辛温走窜，打通最细微毛细血管。" },
      { n: "川芎", e: "血中之气药，带动血液加速流动。" },
    ],
    acup: [
      { n: "膈俞", p: "背部第7胸椎旁", e: "血液统领中心，激发骨髓造血。" },
      { n: "委中", p: "膝盖后方横纹中", e: "疏通膀胱经瘀滞，排除深层毒素。" },
    ],
    advice: [
      "【打破久坐带来的血液停滞】久坐是现代人血瘀的元凶，每45分钟必须起身做拉伸动作，促进下肢静脉血液强力回流。",
      "【增加扩胸与甩手运动】胸腔是气血交汇的枢纽，频繁扩胸能振奋心肺功能，用气推动瘀血消散。",
      "【日常菜肴加入理气活血佐料】如适当使用山楂、醋、洋葱、黑木耳等食材，利用其天然的血管清道夫特性改善微循环。",
      "【注意下肢与小腹绝对保暖】“血得热则行，遇寒则凝”，穿露脐装或露踝袜会直接导致局部微血管痉挛形成瘀阻。",
    ],
  },

  12: {
    name: "肺气不足",
    tea: "KQ 12 号",
    base: "乌饭茶",
    herbs: [
      { n: "人参", e: "百草之王，激发肺部吸氧效率。" },
      { n: "五味子", e: "收敛外泄肺气，制止无故虚汗。" },
      { n: "麦冬", e: "滋润肺泡黏膜，防止内生燥火。" },
      { n: "桑白皮", e: "泻除虚热，清理呼吸道深层废弃物。" },
    ],
    acup: [
      { n: "肺俞", p: "背部第3胸椎旁", e: "肺气血输注枢纽，扩充肺活量。" },
      { n: "孔最", p: "小臂内侧中上段", e: "清热止血，宣通肺部闭塞气机。" },
    ],
    advice: [
      "【每日练习腹式深呼吸】大多数人是浅表呼吸。深长缓慢的呼吸能成倍扩充肺泡容积，提升血氧饱和度与免疫力。",
      "【随天气变化及时增减衣物】肺主皮毛，肺虚者体表防御网脆弱，极易受风寒侵袭，需遵从“洋葱式”穿衣法随时调节。",
      "【增加晨间富氧环境散步】选择空气清新的公园或森林，利用植物释放的大量负氧离子，清洗并充盈虚弱的肺脏。",
      "【多摄入白色入肺食物】如白萝卜、百合、杏仁、莲藕等，传统经验证明白色食材对呼吸道黏膜有极佳的润泽修复作用。",
    ],
  },

  14: {
    name: "肾精亏虚",
    tea: "KQ 14 号",
    base: "乌饭茶",
    herbs: [
      { n: "桑葚", e: "直接入肾经，深层滋养阴血延缓衰老。" },
      { n: "黄精", e: "道家仙药，持久填补底层阴精储备。" },
      { n: "覆盆子", e: "固摄精华，防止能量继续流失。" },
      { n: "山茱萸", e: "大补肝肾实体物质，封藏真气。" },
    ],
    acup: [
      {
        n: "涌泉",
        p: "脚底前三分之一凹陷",
        e: "肾经源头，唤醒全身精气引火下行。",
      },
      { n: "肾俞", p: "背部第2腰椎旁", e: "热能传导至肾脏，强壮腰脊先天。" },
    ],
    advice: [
      "【房事必须节制有度】肾精是生命最底层的核燃料，过度消耗会导致脑髓空虚、早衰脱发，需立刻固摄本源休养生息。",
      "【养成叩齿吞津的道家习惯】早晨空腹上下牙齿相叩36下，产生的唾液分三次咽下，唾液为肾之液，咽下可直接滋养肾精。",
      "【多食黑色入肾补益食材】如黑芝麻、黑豆、乌鸡、海参等，黑色蕴含着深藏的力量，能有效填补流失的骨髓物质。",
      "【常做提肛运动固护底盘】日常站立或静坐时，随时做收缩肛门上提的动作，能极强地固摄会阴处的精气，防止能量下泄。",
    ],
  },

  15: {
    name: "平和体质",
    tea: "KQ 15 号",
    base: "乌饭茶",
    herbs: [
      { n: "茯苓", e: "健脾渗湿，维持水液代谢平衡。" },
      { n: "陈皮", e: "芳香理气，微微推动气机流转。" },
      { n: "枸杞", e: "抵御用眼疲劳，持续提供微小能量包。" },
      { n: "桑葚", e: "基础抗氧化，清除自由基润滑肠道。" },
    ],
    acup: [
      { n: "足三里", p: "外膝眼下四横指", e: "万能穴位，持续激活免疫系统。" },
      { n: "合谷", p: "手背虎口最高处", e: "调动上半身阳气，预防外邪入侵。" },
    ],
    advice: [
      "【维持顺应四时的起居节律】日出而作日落而息，保持人体生物钟与大自然运转的同频共振，是最高级的养生。",
      "【保持膳食的五味均衡】不偏食不挑食，维持五谷、蔬菜、肉类、水果的合理配比，确保获取全图谱的生命营养。",
      "【建立豁达开朗的情绪应对机制】遇到挫折不内耗，保持心境的平和与流动，不让负面情绪在体内形成结节与停滞。",
      "【坚持适度且规律的身体拉伸】如瑜伽、普拉提或太极，保持筋骨的柔韧性与气血通道的通畅，防止“未老先衰”。",
    ],
  },
};

// --- 3. 神：10种五行芳疗 + 脉轮与水晶数据库 ---
const SHEN_DATABASE = {
  0: {
    name: "木行·气郁",
    radar: [0.9, 0.6, 0.5, 0.4, 0.7],
    stress: "神经处于压抑的绷紧状态，肝气无法向外舒展。",
    energy: "建议黄昏时分进行大幅度的动态拉伸，物理打开经络。",
    oils: [
      { n: "佛手柑", e: "像阳光般化解胸中阴霾，瞬间提振低落压抑的心情。" },
      { n: "薰衣草", e: "温柔安抚极度疲惫的中枢神经，松弛紧绷的肌肉。" },
    ],
    chakra: {
      name: "喉轮 (Throat Chakra)",
      crystal: "海蓝宝 (Aquamarine)",
      action: "声音疗愈与书写释放",
      desc: "木郁气滞往往伴随自我表达的受限。海蓝宝能冷却因压抑产生的虚火，疏通颈部能量淤堵，让真实的情绪得以流畅表达。",
    },
  },
  1: {
    name: "木行·亢旺",
    radar: [1.0, 0.8, 0.4, 0.3, 0.5],
    stress: "能量过度向头部冲刷，导致交感神经持续亢奋。",
    energy: "闭目，用冷水轻拍后颈部大椎穴，物理降温平抑怒火。",
    oils: [
      { n: "罗马洋甘菊", e: "强力清热平肝，扑灭燃烧在头面部的无名之火。" },
      { n: "欧薄荷", e: "带来极致的清凉感，迅速化解偏头痛与头晕脑胀。" },
    ],
    chakra: {
      name: "眉心轮 (Third Eye Chakra)",
      crystal: "紫水晶 (Amethyst)",
      action: "暗室凝视与数字排毒",
      desc: "肝火上炎导致能量过度冲刷头部。紫水晶的高频紫光能直接安抚活跃的大脑皮层与松果体，平息狂躁与头面部无名火。",
    },
  },
  2: {
    name: "火行·内扰",
    radar: [0.6, 0.9, 0.5, 0.4, 0.3],
    stress: "心脏能量消耗过大，导致心神无处安放，产生焦虑。",
    energy: "睡前 1 小时彻底隔绝屏幕蓝光，降低感官信息熵值。",
    oils: [
      { n: "依兰依兰", e: "具有极强的镇静血压和心率的作用，平抑燥乱的心火。" },
      { n: "苦橙叶", e: "安抚焦虑恐慌的情绪，帮助大脑顺利切入深度睡眠。" },
    ],
    chakra: {
      name: "心轮 (Heart Chakra)",
      crystal: "绿东陵 (Green Aventurine)",
      action: "森林浴与感恩冥想",
      desc: "心火内扰源于心神失去停泊的港湾。绿东陵生机勃勃的扩展频率能抚平焦虑的心跳，释放心脏区域的紧绷感。",
    },
  },
  3: {
    name: "火行·气怯",
    radar: [0.4, 0.3, 0.5, 0.6, 0.7],
    stress: "心脏供血与能量不足，导致心智外露，缺乏安全感。",
    energy: "双手搓热后交叠捂住胸口膻中穴，给予自己拥抱般的能量。",
    oils: [
      {
        n: "大马士革玫瑰",
        e: "最高频率的芳香分子，深度滋养匮乏的心神与自爱感。",
      },
      { n: "檀香", e: "带来沉稳古老的木质支撑，安定游移不定、容易受惊的心。" },
    ],
    chakra: {
      name: "海底轮 (Root Chakra)",
      crystal: "黑曜石 (Black Obsidian)",
      action: "赤足接地练习 (Earthing)",
      desc: "心虚胆怯本质是精神失去了‘扎根’大地的安全感。黑曜石极强的吸附性犹如精神避雷针，能吸收底层的恐惧与虚无感。",
    },
  },
  4: {
    name: "土行·困顿",
    radar: [0.5, 0.4, 0.9, 0.7, 0.6],
    stress: "思虑过度导致脑部耗氧过大，拖垮了脾胃的消化机能。",
    energy: "停止无意义的逻辑推演，用 4-7-8 呼吸法清空大脑内存。",
    oils: [
      { n: "甜橙", e: "充满童真快乐的果香，能健脾开胃，扫除思虑的沉重感。" },
      { n: "广藿香", e: "泥土的芬芳能强力化解体内湿气，唤醒被困住的脾胃。" },
    ],
    chakra: {
      name: "太阳神经丛 (Solar Plexus)",
      crystal: "虎眼石 (Tiger's Eye)",
      action: "腹式火之呼吸",
      desc: "思虑过度会拖垮消化系统的能量中枢。虎眼石能共振太阳轮，清除自我怀疑与杂念，重塑强大的个人意志与决断力。",
    },
  },
  5: {
    name: "土行·虚滞",
    radar: [0.6, 0.5, 0.3, 0.4, 0.7],
    stress: "核心发动机动力不足，导致对一切事物都提不起兴致。",
    energy: "避免长久坐卧，每日清晨空腹喝一杯温热柠檬水唤醒肠道。",
    oils: [
      { n: "柠檬", e: "清新的酸气能瞬间劈开混沌的大脑，提振委靡不振的精神。" },
      { n: "生姜", e: "像热浪般渗入肌肤，温补脾胃元气，驱逐深层的虚寒。" },
    ],
    chakra: {
      name: "本我轮 (Sacral Chakra)",
      crystal: "红玉髓 (Carnelian)",
      action: "水疗净化与动态静心",
      desc: "脾虚导致内驱力与生命源泉干涸。红玉髓的振动频率与微血管呼应，能温和促使停滞的情绪重新流动，唤醒对生活的热情。",
    },
  },
  6: {
    name: "金行·郁结",
    radar: [0.4, 0.5, 0.6, 0.9, 0.5],
    stress: "悲伤情绪锁住了胸腔的呼吸幅度，导致气机无法流转。",
    energy: "去户外森林或公园深呼吸，利用大自然的氧气冲刷肺部。",
    oils: [
      { n: "丝柏", e: "帮助释放潜意识中压抑的悲伤和不舍，接受万物的流转。" },
      {
        n: "尤加利",
        e: "拥有强悍的穿透力，能瞬间打通闭塞的呼吸道，宣通肺气。",
      },
    ],
    chakra: {
      name: "心轮 (Heart Chakra)",
      crystal: "粉晶 (Rose Quartz)",
      action: "心轮扩展与自我拥抱",
      desc: "肺气郁结常源于深层的悲伤与执念。粉晶温和的粉色光波能渗透潜意识，抚平旧有的精神创伤，教导无条件的爱与释怀。",
    },
  },
  7: {
    name: "金行·阴耗",
    radar: [0.5, 0.4, 0.5, 0.3, 0.8],
    stress: "过度消耗导致体表保护层受损，情绪一点就着且极易疲劳。",
    energy: "增加室内空气湿度，使用补水面膜，减少洗澡的水温和时长。",
    oils: [
      {
        n: "乳香",
        e: "被称为神圣之油，能放慢呼吸频率，加深并修护受损的肺阴。",
      },
      {
        n: "没药",
        e: "具有强大的粘合修护力，抚平内心创伤，愈合干燥皲裂的身心。",
      },
    ],
    chakra: {
      name: "顶轮 (Crown Chakra)",
      crystal: "白水晶 (Clear Quartz)",
      action: "深度静默与能量清理",
      desc: "长期阴耗导致能量保护场千疮百孔。白水晶作为‘晶王’，其全色光能强效放大并净化人体的整个能量场，修复脆弱的边界。",
    },
  },
  8: {
    name: "水行·枯竭",
    radar: [0.6, 0.7, 0.4, 0.5, 0.2],
    stress: "长期的恐惧和高压透支了最底层的生命原动力。",
    energy: "减少所有不必要的社交，周末尽量独处静坐，闭藏精气。",
    oils: [
      {
        n: "大西洋雪松",
        e: "巍峨的巨树能量，能为透支的底层注入坚不可摧的支撑力。",
      },
      {
        n: "杜松浆果",
        e: "净化积累在细胞层面的毒素与负面情绪，清理恐惧的残渣。",
      },
    ],
    chakra: {
      name: "海底轮 (Root Chakra)",
      crystal: "石榴石 (Garnet)",
      action: "底盘稳固与骨盆运动",
      desc: "水行枯竭代表底层生命核燃料见底。石榴石炽热的能量能直接点燃海底轮的生命之火，对抗深层的恐惧与透支感。",
    },
  },
  9: {
    name: "水行·寒凝",
    radar: [0.3, 0.4, 0.5, 0.6, 0.9],
    stress: "身体底盘缺乏热量，导致性格退缩，缺乏决断力与勇气。",
    energy: "睡前用过脚踝的热水强力泡脚至微微出汗，将热能导入肾经。",
    oils: [
      {
        n: "迷迭香",
        e: "极具穿透力的草本香，能强效振奋低迷的阳气，激发行动力。",
      },
      {
        n: "黑胡椒",
        e: "带来强烈的热感，温暖冰冷的肾气，给予勇往直前的底气。",
      },
    ],
    chakra: {
      name: "太阳神经丛 (Solar Plexus)",
      crystal: "太阳石 (Sunstone)",
      action: "清晨日光浴与核心激活",
      desc: "阳虚寒凝使人极度渴望温暖并缺乏勇气。太阳石蕴含强大的纯阳之光，能驱散内心的阴霾退缩，注入勇往直前的底气。",
    },
  },
};

// --- 4. 精：5种动态模型 ---
const ESSENCE_MODELS = {
  lean: {
    title: "偏瘦型体态",
    status: "精血储备不足 · 吸收率待优化",
    tips: {
      food: "增加红薯、山药、牛肉。补益脾胃生化之源。",
      nutrition:
        "脾胃吸收偏弱，建议补充易消化的优质蛋白与多糖，如山药粉、鸡蛋羹、核桃露，采取少食多餐策略。",
      sculpt: "避免高强度出汗，保护津液。侧重拉伸。",
      detox: "减少咖啡因，夜间采用足部温浴加速循环。",
      sport: "每周2次瑜伽或太极，保存核心能量能级。",
    },
  },
  balanced: {
    title: "匀称型体态",
    status: "精气充盈 · 代谢节律稳定",
    tips: {
      food: "多食鲈鱼、小米、红枣。避免生冷刺激导致气机阻滞。",
      nutrition:
        "维持现有优质宏量营养素配比，推荐丰富色彩的地中海饮食结构，确保全图谱维生素与矿物质摄入。",
      sculpt: "核心肌群稳定性训练，改善因重心偏离导致的内脏受压。",
      detox: "晨起 35.5°C 温水，配合腹式呼吸激活淋巴循环。",
      sport: "每周3次快走，每次30min。以身体微出汗作为激活标准。",
    },
  },
  slightly_heavy: {
    title: "丰润型体态",
    status: "痰湿初聚 · 代谢略显迟缓",
    tips: {
      food: "增加粗粮比例，多食陈皮、白萝卜理气化痰。",
      nutrition:
        "增加水溶性膳食纤维摄入（如燕麦、魔芋），适度降低精制碳水比例，可补充B族维生素辅助脂肪代谢。",
      sculpt: "注重核心发力，改善盆骨前倾等体态代偿。",
      detox: "多饮温热茶水，利用微汗排出浅层滞留水液。",
      sport: "每周3次中等强度有氧，微微出汗即可。",
    },
  },
  heavy: {
    title: "丰腴型体态",
    status: "湿热蕴结 · 能量周转率受限",
    tips: {
      food: "多食赤小豆、薏米、冬瓜。严格控制深度加工糖分。",
      nutrition:
        "严格限制游离糖与饱和脂肪，增加优质低脂白肉，餐前先饮清汤并进食高纤维蔬菜以平稳血糖与饱腹感。",
      sculpt: "通过筋膜松解改善淋巴回流，消除下肢滞重感。",
      detox: "午后饮用陈皮水，利用天然精油成分疏导中焦阻滞。",
      sport: "每周4次中低强度有氧，强化心肺，带动水湿代谢。",
    },
  },
  severe_heavy: {
    title: "滞重型体态",
    status: "痰浊壅塞 · 循环系统承压",
    tips: {
      food: "低脂低糖，多食黑木耳、芹菜等高纤维清肠食物。",
      nutrition:
        "执行抗炎饮食体系，杜绝反式脂肪与深加工食品，大量摄入十字花科蔬菜，建议在专业指导下适度轻断食。",
      sculpt: "减轻下肢关节压力，多做坐姿或水下阻力训练。",
      detox: "严格戒断夜宵与生冷，睡前中药泡脚发汗通络。",
      sport: "每日快步走或游泳40分钟，循序渐进提升心肺。",
    },
  },
};

const FiveElementsChart = ({ data }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const center = 100,
      radius = 70;
    const points = ["木", "火", "土", "金", "水"];
    const values = data || [0.8, 0.7, 0.9, 0.6, 0.75];
    ctx.clearRect(0, 0, 200, 200);
    ctx.strokeStyle = "#eee";
    ctx.beginPath();
    for (let j = 1; j <= 4; j++) {
      const r = (radius / 4) * j;
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        ctx.lineTo(center + r * Math.cos(angle), center + r * Math.sin(angle));
      }
      ctx.closePath();
    }
    ctx.stroke();
    ctx.beginPath();
    points.forEach((p, i) => {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      ctx.moveTo(center, center);
      ctx.lineTo(
        center + radius * Math.cos(angle),
        center + radius * Math.sin(angle)
      );
      ctx.fillStyle = "#999";
      ctx.font = "10px bold sans-serif";
      ctx.fillText(
        p,
        center + (radius + 15) * Math.cos(angle) - 5,
        center + (radius + 15) * Math.sin(angle) + 5
      );
    });
    ctx.stroke();
    ctx.fillStyle = "rgba(123, 142, 97, 0.4)";
    ctx.strokeStyle = "#7b8e61";
    ctx.lineWidth = 2;
    ctx.beginPath();
    values.forEach((v, i) => {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      ctx.lineTo(
        center + radius * v * Math.cos(angle),
        center + radius * v * Math.sin(angle)
      );
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }, [data]);
  return (
    <canvas ref={canvasRef} width="200" height="200" className="mx-auto" />
  );
};

export default function App() {
  // --- 新增：使用 localStorage 初始化状态，实现数据记忆 ---
  const [stage, setStage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kq_stage_v39");
      if (saved) return saved;
    }
    return "welcome";
  });

  const [bio, setBio] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kq_bio_v39");
      if (saved) return JSON.parse(saved);
    }
    return { age: "", sex: "女", height: 170, weight: 60 };
  });

  const [answers, setAnswers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kq_answers_v39");
      if (saved) return JSON.parse(saved);
    }
    return {};
  });

  // --- 新增：当状态改变时，自动存入 localStorage ---
  useEffect(() => {
    localStorage.setItem("kq_stage_v39", stage);
  }, [stage]);
  useEffect(() => {
    localStorage.setItem("kq_bio_v39", JSON.stringify(bio));
  }, [bio]);
  useEffect(() => {
    localStorage.setItem("kq_answers_v39", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stage]);

  // --- 新增：重启时清空记录 ---
  const handleRestart = () => {
    localStorage.removeItem("kq_stage_v39");
    localStorage.removeItem("kq_bio_v39");
    localStorage.removeItem("kq_answers_v39");
    setStage("welcome");
    setBio({ age: "", sex: "女", height: 170, weight: 60 });
    setAnswers({});
  };

  const bmi = (bio.weight / Math.pow(bio.height / 100, 2)).toFixed(1);

  let model = ESSENCE_MODELS.balanced;
  if (bmi < 18.5) model = ESSENCE_MODELS.lean;
  else if (bmi < 24) model = ESSENCE_MODELS.balanced;
  else if (bmi < 28) model = ESSENCE_MODELS.slightly_heavy;
  else if (bmi < 32) model = ESSENCE_MODELS.heavy;
  else model = ESSENCE_MODELS.severe_heavy;

  const getQiResult = () => {
    const s = answers;
    let max = 0,
      idx = -1;
    for (let i = 0; i < 14; i++) {
      if ((s[`qi_${i}`] || 0) > max) {
        max = s[`qi_${i}`];
        idx = i;
      }
    }
    if (max < 3 || idx === 13 || idx === -1) return QI_DATABASE["15"];
    const map = {
      0: "01",
      1: "02",
      2: "03",
      3: "04",
      4: "05",
      5: "06",
      6: "07",
      7: "08",
      8: "09",
      9: "10",
      10: "11",
      11: "12",
      12: "14",
    };
    return QI_DATABASE[map[idx]] || QI_DATABASE["15"];
  };

  const getShenResult = () => {
    const s = answers;
    let max = 0,
      idx = -1;
    for (let i = 0; i < 10; i++) {
      if ((s[`shen_${i}`] || 0) > max) {
        max = s[`shen_${i}`];
        idx = i;
      }
    }
    return SHEN_DATABASE[idx === -1 ? 4 : idx];
  };

  const qi = getQiResult();
  const shen = getShenResult();

  return (
    <div className="min-h-screen bg-[#F7F8F7] text-[#1A1A1A] font-sans pb-20 overflow-x-hidden text-left">
      <header className="bg-white/80 backdrop-blur-md p-5 flex items-center border-b border-gray-100 sticky top-0 z-50">
        <div className="bg-[#7b8e61] p-2 rounded-xl mr-3 shadow-md shadow-[#7b8e61]/20">
          <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center text-white font-black text-[10px]">
            KQ
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold">KQ 自然疗法中心</h1>
          <p className="text-[11px] tracking-widest text-[#7b8e61] font-bold uppercase italic italic">
            Bio-System Modeling
          </p>
        </div>
      </header>

      {stage === "welcome" && (
        <div className="max-w-3xl mx-auto py-16 px-8 text-center animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-[#2d332d]">
            生命能量
            <br />
            （精气神）解析
          </h1>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] text-left mb-10 shadow-sm space-y-8 border border-gray-50">
            <p className="text-sm font-black tracking-widest text-[#7b8e61] text-center uppercase italic border-b border-gray-100 pb-4">
              Jing · Qi · Shen Modeling
            </p>

            <div>
              <p className="text-xl font-black mb-4 text-[#1A1A1A]">
                为什么要平衡“精、气、神”？
              </p>
              <p className="text-base font-bold text-gray-500 leading-relaxed italic">
                古人云：“天有三宝日月星，人有三宝精气神”。
                <br />
                <br />
                <strong className="text-[#7b8e61]">【精】</strong>{" "}
                是肉体的物理底盘与物质储备；
                <br />
                <strong className="text-[#7b8e61]">【气】</strong>{" "}
                是脏腑运化与能量传输的动力；
                <br />
                <strong className="text-[#7b8e61]">【神】</strong>{" "}
                则是情绪调节与心智的统御中枢。
                <br />
                <br />
                唯有三者共振平衡，才能真正唤醒机体深层的自愈力，抵御内耗与初老。
              </p>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-[2rem] border border-gray-100">
              <p className="text-lg font-black mb-3 text-[#1A1A1A]">
                本次评测特点
              </p>
              <ul className="text-base font-bold text-gray-500 leading-loose italic space-y-2">
                <li>
                  <span className="text-[#7b8e61] mr-2">■</span>{" "}
                  <strong>多维锚定：</strong>结合现代体态参数(BMI)，与东方 14
                  种气机、10 种五行神态进行交叉深度辨证。
                </li>
                <li>
                  <span className="text-[#7b8e61] mr-2">■</span>{" "}
                  <strong>精准干预：</strong>
                  拒绝千篇一律的宽泛建议，靶向为您输出专属的「茶方、穴位、五行芳疗与起居协议」。
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setStage("q_jing")}
            className="w-full py-6 bg-[#7b8e61] text-white rounded-[2.5rem] font-bold text-xl md:text-2xl shadow-xl transition-transform active:scale-95"
          >
            开启我的生命建模
          </button>
        </div>
      )}

      {stage.startsWith("q_") && (
        <div className="max-w-3xl mx-auto p-6 animate-fadeIn pb-24">
          <h2
            className={`text-center font-black tracking-widest uppercase italic py-4 text-xl ${
              stage === "q_shen" ? "text-orange-500" : "text-[#7b8e61]"
            }`}
          >
            {stage === "q_jing"
              ? "Step 01: 精 · 物理建模"
              : stage === "q_qi"
              ? "Step 02: 气 · 信号辨证"
              : "Step 03: 神 · 能量建模"}
          </h2>
          {stage === "q_jing" && (
            <div className="bg-white p-10 md:p-14 rounded-[3rem] space-y-8 mt-4 shadow-sm border border-gray-100">
              <div className="flex gap-4">
                {["男", "女"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setBio({ ...bio, sex: s })}
                    className={`flex-1 py-6 rounded-2xl font-bold text-lg transition-all ${
                      bio.sex === s
                        ? "bg-[#7b8e61] text-white shadow-lg"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="space-y-6">
                <input
                  type="number"
                  placeholder="年龄"
                  value={bio.age}
                  className="w-full p-6 bg-gray-50 rounded-2xl font-bold text-lg text-center outline-none"
                  onChange={(e) => setBio({ ...bio, age: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="身高 cm"
                  value={bio.height || ""}
                  className="w-full p-6 bg-gray-50 rounded-2xl font-bold text-lg text-center outline-none"
                  onChange={(e) =>
                    setBio({ ...bio, height: Number(e.target.value) })
                  }
                />
                <input
                  type="number"
                  placeholder="体重 kg"
                  value={bio.weight || ""}
                  className="w-full p-6 bg-gray-50 rounded-2xl font-bold text-lg text-center outline-none"
                  onChange={(e) =>
                    setBio({ ...bio, weight: Number(e.target.value) })
                  }
                />
              </div>
              <button
                onClick={() => setStage("q_qi")}
                className="w-full py-6 mt-4 bg-[#7b8e61] text-white rounded-[2.2rem] font-bold text-xl shadow-lg"
              >
                进入下一阶
              </button>
            </div>
          )}
          {stage === "q_qi" && (
            <div className="space-y-4">
              {QI_QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm"
                >
                  <p className="text-lg font-bold mb-6 italic text-left">
                    {i + 1}. {q}
                  </p>
                  <div>
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() =>
                            setAnswers({ ...answers, [`qi_${i}`]: v })
                          }
                          className={`flex-1 py-4 rounded-xl text-base md:text-lg font-black transition-all ${
                            answers[`qi_${i}`] === v
                              ? "bg-[#7b8e61] text-white"
                              : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mt-2 px-1 font-bold tracking-widest uppercase">
                      <span>1 - Weak</span>
                      <span>5 - Strong</span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setStage("q_shen")}
                className="w-full py-6 bg-[#7b8e61] text-white rounded-[2.2rem] font-bold text-xl mt-8 sticky bottom-6 shadow-2xl"
              >
                进入下一阶
              </button>
            </div>
          )}
          {stage === "q_shen" && (
            <div className="space-y-4">
              {SHEN_QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="bg-[#1A1A1A] p-8 rounded-[2rem] shadow-xl text-white"
                >
                  <p className="text-lg font-bold mb-6 italic opacity-90 text-left">
                    {i + 1}. {q}
                  </p>
                  <div>
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() =>
                            setAnswers({ ...answers, [`shen_${i}`]: v })
                          }
                          className={`flex-1 py-4 rounded-xl text-base md:text-lg font-black transition-all ${
                            answers[`shen_${i}`] === v
                              ? "bg-orange-500 text-white"
                              : "bg-white/5 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] md:text-xs text-gray-500 mt-2 px-1 font-bold tracking-widest uppercase">
                      <span>1 - Weak</span>
                      <span>5 - Strong</span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setStage("report")}
                className="w-full py-6 bg-orange-500 text-white rounded-[2.2rem] font-bold text-xl mt-8 sticky bottom-6 shadow-2xl"
              >
                生成报告
              </button>
            </div>
          )}
        </div>
      )}

      {stage === "report" && (
        <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-12 pb-32 text-left animate-fadeIn">
          {/* 精 */}
          <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl font-black pointer-events-none text-[#7b8e61]">
              精
            </div>
            <p className="text-sm font-bold text-[#7b8e61] mb-10 uppercase italic border-l-4 border-[#7b8e61] pl-4">
              ESSENCE · 物理画像
            </p>
            <div className="flex justify-between items-end mb-10 text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#2d332d]">
                {model.title}
              </h2>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  BMI Index
                </p>
                <p className="text-5xl font-black text-[#7b8e61] tracking-tighter leading-none">
                  {bmi}
                </p>
              </div>
            </div>
            <p className="text-base font-bold text-gray-500 mb-8 italic">
              ● {model.status}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: "三餐建议", c: model.tips.food },
                { t: "营养建议", c: model.tips.nutrition },
                { t: "塑身建议", c: model.tips.sculpt },
                { t: "排毒建议", c: model.tips.detox },
                { t: "运动建议", c: model.tips.sport },
              ].map((i) => (
                <div
                  key={i.t}
                  className="bg-gray-50 p-8 rounded-[2.2rem] border border-gray-100"
                >
                  <p className="text-sm font-bold text-[#7b8e61] mb-3 uppercase italic">
                    {i.t}
                  </p>
                  <p className="text-base font-bold text-[#1A1A1A] leading-relaxed">
                    {i.c}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 气 */}
          <div className="space-y-6">
            <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 relative overflow-hidden shadow-sm text-center">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl font-black pointer-events-none text-[#7b8e61]">
                气
              </div>
              <p className="text-sm font-bold text-gray-400 tracking-[0.4em] mb-6 uppercase italic text-center">
                DIAGNOSTIC
              </p>
              <h2 className="text-5xl font-black mb-8">{qi.name}</h2>
              <p className="text-lg font-bold text-gray-500 leading-loose italic bg-gray-50 p-8 rounded-[2.5rem]">
                经辨证，您的当前能级表现为{" "}
                <strong className="text-[#7b8e61] text-xl mx-1">
                  {qi.name}
                </strong>
                。建议采用“以茶代药”的温和靶向方式，以{qi.base}
                为基底修复机体失衡。
              </p>
            </section>

            <section className="bg-[#7b8e61] rounded-[3.5rem] p-10 md:p-14 shadow-2xl text-white relative">
              <h3 className="text-base font-bold opacity-80 tracking-[0.4em] uppercase mb-12 text-center italic">
                专属茶方建议
              </h3>
              <div className="bg-white/10 rounded-[3rem] p-10 md:p-12 text-center mb-10 border border-white/20 backdrop-blur-sm">
                <p className="text-sm font-bold opacity-80 mb-4 uppercase tracking-widest">
                  指定用方
                </p>
                <h4 className="text-5xl font-black mb-6 tracking-tighter text-orange-200">
                  {qi.tea}
                </h4>
                <p className="text-base font-bold italic opacity-90">
                  1味基底 + 4味配伍靶向修复
                </p>
              </div>

              <div className="bg-white/10 p-8 md:p-10 rounded-[2.5rem] border border-white/10 mb-8 text-center">
                <p className="text-3xl font-black mb-4 italic text-orange-200 tracking-tight">
                  {qi.base} 🌱
                </p>
                <p className="text-base md:text-lg font-bold opacity-80 italic leading-relaxed text-center">
                  【核心底层基底】富含天然强效抗氧化花青素，犹如黏膜修复剂，强健肠胃防御力与筋骨。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {qi.herbs.map((h) => (
                  <div
                    key={h.n}
                    className="bg-white/5 p-8 rounded-[2rem] border border-white/10 text-left flex flex-col justify-start"
                  >
                    <p className="text-2xl font-black mb-3 italic leading-none">
                      {h.n}
                    </p>
                    <p className="text-sm md:text-base font-bold opacity-80 leading-relaxed italic">
                      {h.e}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6">
                {qi.acup.map((a) => (
                  <div
                    key={a.n}
                    className="bg-white/5 p-8 rounded-[2rem] border border-white/5 text-left md:flex md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-xs font-black text-orange-300 mb-2 italic tracking-widest uppercase">
                        Press Point
                      </p>
                      <p className="text-2xl font-black italic mb-2 md:mb-0">
                        {a.n}{" "}
                        <span className="text-sm opacity-60 font-normal ml-2">
                          ({a.p})
                        </span>
                      </p>
                    </div>
                    <p className="text-base font-bold opacity-80 italic leading-relaxed md:w-1/2 md:text-right">
                      {a.e}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 神 */}
          <section className="bg-white p-12 md:p-16 rounded-[3.5rem] border border-gray-100 relative overflow-hidden shadow-sm text-center">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl font-black pointer-events-none">
              神
            </div>
            <p className="text-sm font-bold text-[#7b8e61] mb-10 uppercase italic border-l-4 border-[#7b8e61] pl-4 text-left">
              SPIRIT · 能量建模
            </p>

            <h3 className="text-4xl font-black mb-10 tracking-tight text-[#2d332d]">
              {shen.name}
            </h3>

            <div className="transform scale-110 mb-10">
              <FiveElementsChart data={shen.radar} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-12">
              <div className="p-8 bg-white rounded-3xl border-l-8 border-orange-500 shadow-sm border border-gray-50">
                <p className="text-sm font-bold uppercase opacity-40 mb-3 tracking-widest">
                  压 力 干 预
                </p>
                <p className="text-base md:text-lg font-black italic text-[#1A1A1A] leading-relaxed">
                  {shen.stress}
                </p>
              </div>
              <div className="p-8 bg-white rounded-3xl border-l-8 border-[#7b8e61] shadow-sm border border-gray-50">
                <p className="text-sm font-bold uppercase opacity-40 mb-3 tracking-widest">
                  能 量 补 给
                </p>
                <p className="text-base md:text-lg font-black italic text-[#1A1A1A] leading-relaxed">
                  {shen.energy}
                </p>
              </div>
            </div>

            <div className="mt-10 bg-indigo-50/50 p-10 rounded-[3rem] border border-indigo-100/50">
              <p className="text-sm md:text-base font-bold text-indigo-500 mb-8 uppercase tracking-widest italic text-center">
                脉轮能量与晶石共振 (Chakra & Crystal)
              </p>
              <div className="bg-white p-8 rounded-3xl shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">
                  💎
                </div>
                <div className="mb-4">
                  <span className="text-xs font-black text-white bg-indigo-400 px-3 py-1 rounded-full uppercase tracking-widest mr-2">
                    Target Chakra
                  </span>
                  <span className="text-xl font-black italic text-[#2d332d]">
                    {shen.chakra.name}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-xs font-black text-indigo-400 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-widest mr-2">
                    Resonance Crystal
                  </span>
                  <span className="text-lg font-bold text-gray-700">
                    {shen.chakra.crystal}
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-base font-bold text-gray-600 leading-relaxed italic">
                    <strong className="text-[#1A1A1A]">升华方式：</strong>
                    {shen.chakra.action}
                  </p>
                  <p className="text-base font-bold text-gray-500 leading-relaxed italic">
                    <strong className="text-[#1A1A1A]">专业解析：</strong>
                    {shen.chakra.desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-orange-50/50 p-10 rounded-[3rem] border border-orange-100/50">
              <p className="text-sm md:text-base font-bold text-orange-600 mb-8 uppercase tracking-widest italic text-center">
                定制五行芳疗处方 (Aroma)
              </p>
              <div className="space-y-6">
                {shen.oils.map((oil, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-3xl shadow-sm text-left flex items-start"
                  >
                    <span className="text-3xl mr-6 opacity-80">💧</span>
                    <div>
                      <p className="text-xl font-black italic text-[#2d332d] mb-2">
                        {oil.n}
                      </p>
                      <p className="text-base font-bold text-gray-500 leading-relaxed italic">
                        {oil.e}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 日常起居指令 */}
          <section className="bg-[#1A1A1A] p-12 md:p-16 rounded-[3.5rem] text-white shadow-2xl">
            <h3 className="text-3xl font-black mb-12 tracking-tight text-center italic text-[#7b8e61]">
              日常起居干预指令
            </h3>
            <div className="space-y-8">
              {qi.advice.map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-6 border-b border-white/10 pb-6 text-left"
                >
                  <div className="w-2 h-2 bg-[#7b8e61] rounded-full shrink-0 mt-2.5"></div>
                  <p className="text-base md:text-lg font-bold italic opacity-90 leading-relaxed tracking-wide">
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 🔥 转化区 */}
          <section className="bg-[#7b8e61] p-10 md:p-14 rounded-[3rem] text-white shadow-2xl text-center">
            <h3 className="text-3xl font-black mb-6">
              👉 你的体质已经分析完成
            </h3>

            <p className="text-lg font-bold mb-8 opacity-90">
              根据你的结果：「{qi.name} + {shen.name}」
              <br />
              若不调理，可能发展为：
              <span className="text-orange-200">
                <br />
                疲劳累积 · 免疫下降 · 慢性不适
              </span>
            </p>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={`${WHATSAPP_LINK}?text=我刚做完KQ体质测试，我的结果是：${qi.name} + ${shen.name}，想获取完整调理方案`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-5 bg-orange-500 rounded-2xl text-xl font-black"
              >
                👉 获取专属咨询（WhatsApp）
              </a>
            </div>
          </section>

          <button
            onClick={handleRestart}
            className="w-full py-16 text-gray-400 font-black text-sm tracking-[0.5em] uppercase underline underline-offset-8 transition-colors hover:text-[#7b8e61]"
          >
            Restart Modeling
          </button>
        </div>
      )}
    </div>
  );
}
