/*
Navicat MySQL Data Transfer

Source Server         : lxs
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : dementia_elderly_screening_platform

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2023-10-06 12:11:53
*/

SET FOREIGN_KEY_CHECKS=0;


-- ----------------------------
-- Table structure for `adl`
-- ----------------------------
DROP TABLE IF EXISTS `adl`;
CREATE TABLE `adl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(32) NOT NULL COMMENT '受试者id',
  `vehicles` int(11) DEFAULT NULL COMMENT '1.使用公共车辆',
  `walk` int(11) DEFAULT NULL COMMENT '2.行走',
  `cook` int(11) DEFAULT NULL COMMENT '3.做饭菜',
  `housework` int(11) DEFAULT NULL COMMENT '4.做家务',
  `medicine` int(11) DEFAULT NULL COMMENT '5.吃药',
  `eat` int(11) DEFAULT NULL COMMENT '6.吃饭',
  `dress` int(11) DEFAULT NULL COMMENT '7.穿衣',
  `hair` int(11) DEFAULT NULL COMMENT '8.梳头、刷牙等',
  `laundry` int(11) DEFAULT NULL COMMENT '9.洗衣',
  `shower` int(11) DEFAULT NULL COMMENT '10.洗澡',
  `shopping` int(11) DEFAULT NULL COMMENT '11.购物',
  `bathroom` int(11) DEFAULT NULL COMMENT '12.定时上厕所',
  `phone` int(11) DEFAULT NULL COMMENT '13.打电话',
  `money` int(11) DEFAULT NULL COMMENT '14.处理自己钱物',
  `ADLSCORE` int(11) DEFAULT NULL COMMENT 'ADL总分',
  `time` text COMMENT '记录时间',
  `unix_timestamp` bigint(13) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of adl
-- ----------------------------

-- ----------------------------
-- Table structure for `doctor`
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weixin_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of doctor
-- ----------------------------

-- ----------------------------
-- Table structure for `doctor_subject`
-- ----------------------------
DROP TABLE IF EXISTS `doctor_subject`;
CREATE TABLE `doctor_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` varchar(255) NOT NULL,
  `id_card` bigint(18) NOT NULL,
  `is_check` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of doctor_subject
-- ----------------------------

-- ----------------------------
-- Table structure for `gdscale`
-- ----------------------------
DROP TABLE IF EXISTS `gdscale`;
CREATE TABLE `gdscale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(32) NOT NULL COMMENT '受试者id',
  `GDSATIS` int(11) DEFAULT NULL COMMENT '1.你对生活基本上满意吗？',
  `GDDROP` int(11) DEFAULT NULL COMMENT '2.你是否已放弃了许多活动与兴趣？',
  `GDEMPTY` int(11) DEFAULT NULL COMMENT '3.你是否觉得生活空虚？',
  `GDBORED` int(11) DEFAULT NULL COMMENT '4.你是否常感到厌倦？',
  `GDSPIRIT` int(11) DEFAULT NULL COMMENT '5.你觉得未来有希望吗？',
  `GDMIND` int(11) DEFAULT NULL COMMENT '6.你是否因为脑子里一些想法摆脱不掉而烦恼？',
  `GDENERGY` int(11) DEFAULT NULL COMMENT '7.你是否大部分时间精力充沛？',
  `GDAFRAID` int(11) DEFAULT NULL COMMENT '8.你是否害怕会有不幸的事落到你头上？',
  `GDHAPPY` int(11) DEFAULT NULL COMMENT '9.你是否大部分时间感到幸福？',
  `GDHELP` int(11) DEFAULT NULL COMMENT '10.你是否常感到孤立无援？',
  `GDFIDGET` int(11) DEFAULT NULL COMMENT '11.你是否经常坐立不安，心烦意乱？',
  `GDHOME` int(11) DEFAULT NULL COMMENT '12.你是否希望呆在家里而不愿去做些新鲜事？',
  `GDFUTURE` int(11) DEFAULT NULL COMMENT '13.你是否常常担心将来？',
  `GDMEMORY` int(11) DEFAULT NULL COMMENT '14.你是否觉得记忆力比以前差？',
  `GDALIVE` int(11) DEFAULT NULL COMMENT '15.你觉得现在活着很惬意吗？',
  `GDDEPRESSED` int(11) DEFAULT NULL COMMENT '16.你是否常感到心情沉重、郁闷？',
  `GDMEANINGLESS` int(11) DEFAULT NULL COMMENT '17.你是否觉得象现在这样活着毫无意义？',
  `GDWORRY` int(11) DEFAULT NULL COMMENT '18.你是否总为过去的事忧愁？ ①是 ②否',
  `GDEXCITING` int(11) DEFAULT NULL COMMENT '19.你觉得生活很令人兴奋吗？',
  `GDNEWJOB` int(11) DEFAULT NULL COMMENT '20.你开始一件新的工作很困难吗？',
  `GDVITALITY` int(11) DEFAULT NULL COMMENT '21.你觉得生活充满活力吗？',
  `GDHOPE` int(11) DEFAULT NULL COMMENT '22.你是否觉得你的处境已毫无希望？',
  `GDBETTER` int(11) DEFAULT NULL COMMENT '23.你是否觉得大多数人比你强得多？',
  `GDSAD` int(11) DEFAULT NULL COMMENT '24.你是否常为些小事伤心？',
  `GDCRYING` int(11) DEFAULT NULL COMMENT '25.你是否常觉得想哭？',
  `GDCONCENTRATE` int(11) DEFAULT NULL COMMENT '26.你集中精力有困难吗？',
  `GDMORNING` int(11) DEFAULT NULL COMMENT '27.你早晨起来很快活吗？',
  `GDPARTY` int(11) DEFAULT NULL COMMENT '28.你希望避开聚会吗？',
  `GDDECISION` int(11) DEFAULT NULL COMMENT '29.你做决定很容易吗？',
  `GDCLEAR` int(11) DEFAULT NULL COMMENT '30.你的头脑象往常一样清晰吗？',
  `GDTOTAL` int(11) DEFAULT NULL COMMENT 'GDSCALE总分',
  `time` text COMMENT '记录时间',
  `unix_timestamp` bigint(13) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gdscale
-- ----------------------------

-- ----------------------------
-- Table structure for `health_statu`
-- ----------------------------
DROP TABLE IF EXISTS `health_statu`;
CREATE TABLE `health_statu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(32) NOT NULL COMMENT '受试者id',
  `family_his` int(11) DEFAULT NULL COMMENT '父母或兄弟姐妹中，是否有人患老年痴呆',
  `visual` varchar(4) DEFAULT NULL COMMENT '视力情况',
  `hearing` varchar(4) DEFAULT NULL COMMENT '听力情况',
  `chronic_disease` int(11) DEFAULT NULL COMMENT '慢性疾病',
  `vascular_his` text DEFAULT NULL COMMENT '心脑血管病史',
  `vascular_his_other` text DEFAULT NULL COMMENT '其他心脑血管病史',
  `other_disease` text DEFAULT NULL COMMENT '是否以下疾病',
  `other_disease_other` text DEFAULT NULL COMMENT '其他疾病',
  `mental_performance` text DEFAULT NULL COMMENT '精神系统疾病表现',
  `mental_performance_other` text DEFAULT NULL COMMENT '其他精神系统疾病表现',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='健康状况';

-- ----------------------------
-- Records of health_statu
-- ----------------------------

-- ----------------------------
-- Table structure for `life_style`
-- ----------------------------
DROP TABLE IF EXISTS `life_style`;
CREATE TABLE `life_style` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(32) NOT NULL COMMENT '受试者id',
  `sleep` int(11) DEFAULT NULL COMMENT '睡眠情况',
  `sleep_time_day` int(11) DEFAULT NULL COMMENT '每天的睡眠（午间和夜间）时间',
  `diet` varchar(5) DEFAULT NULL COMMENT '饮食口味',
  `food_extra` text COMMENT '除主食（米饭、面等）外，还经常吃下面哪些食物',
  `food_extra_other` text COMMENT '其他食物',
  `fresh_food` int(11) DEFAULT NULL COMMENT '新鲜的肉类、蔬菜、水果',
  `preserved_food` int(11) DEFAULT NULL COMMENT '腊肉、腊肠、泡菜、咸菜',
  `nutrient` int(11) DEFAULT NULL COMMENT '维生素或其他营养素',
  `smoke` int(11) DEFAULT NULL COMMENT '吸烟',
  `smoke_rate` int(11) DEFAULT NULL COMMENT '吸烟频率',
  `smoke_year` int(11) DEFAULT NULL COMMENT '吸烟年数',
  `smoke_day` int(11) DEFAULT NULL COMMENT '平均支/天',
  `alcohol_abuse` int(11) DEFAULT NULL COMMENT '饮酒',
  `alcohol_abuse_rate` int(11) DEFAULT NULL COMMENT '饮酒频率',
  `alcohol_type` text COMMENT '饮酒的种类',
  `alcohol_type_other` text COMMENT '其他饮酒种类',
  `alcohol_day` int(11) DEFAULT NULL COMMENT '平均毫升/天',
  `drink_tea` int(11) DEFAULT NULL COMMENT '喝茶',
  `drink_tea_rate` int(11) DEFAULT NULL COMMENT '喝茶频率',
  `drink_tea_day` int(11) DEFAULT NULL COMMENT '平均杯/天 (按50毫升杯子为例)',
  `oiltea` int(11) DEFAULT NULL COMMENT '喝油茶',
  `oiltea_rate` int(11) DEFAULT NULL COMMENT '喝油茶频率',
  `oiltea_day` int(11) DEFAULT NULL COMMENT '平均碗/天',
  `read_book` int(11) DEFAULT NULL COMMENT '阅读',
  `read_rate` int(11) DEFAULT NULL COMMENT '阅读频率',
  `watch_tv` int(11) DEFAULT NULL COMMENT '看电视',
  `watch_tv_rate` int(11) DEFAULT NULL COMMENT '看电视频率',
  `radio` int(11) DEFAULT NULL COMMENT '听广播',
  `radio_rate` int(11) DEFAULT NULL COMMENT '听广播频率',
  `use_smartphone` int(11) DEFAULT NULL COMMENT '使用智能手机并上网',
  `use_smartphone_rate` int(11) DEFAULT NULL COMMENT '使用智能手机并上网频率',
  `housework` int(11) DEFAULT NULL COMMENT '做家务',
  `housework_rate` int(11) DEFAULT NULL COMMENT '做家务频率',
  `exercise` int(11) DEFAULT NULL COMMENT '体育锻炼',
  `exercise_rate` int(11) DEFAULT NULL COMMENT '体育锻炼频率',
  `exercise_type` text COMMENT '体育锻炼项目',
  `exercise_type_other` text COMMENT '其他体育锻炼项目',
  `hobby` text DEFAULT NULL COMMENT '兴趣爱好',
  `hobby_other` text DEFAULT NULL COMMENT '其他兴趣爱好',
  `recreational_activities` text DEFAULT NULL COMMENT '文娱活动',
  `recreational_activities_other` text DEFAULT NULL COMMENT '其他文娱活动',
  `social` text DEFAULT NULL COMMENT '社交活动',
  `social_other` text DEFAULT NULL COMMENT '其他社交活动',
  `personal_relationship` int(11) DEFAULT NULL COMMENT '与子女的关系',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='生活方式';

-- ----------------------------
-- Records of life_style
-- ----------------------------

-- ----------------------------
-- Table structure for `log`
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` int(11) NOT NULL COMMENT 'id',
  `controller` varchar(255) DEFAULT NULL COMMENT '使用的controller',
  `method` varchar(255) DEFAULT NULL COMMENT '方法',
  `user` varchar(255) DEFAULT NULL COMMENT '操作用户的id',
  `ip` varchar(255) DEFAULT NULL COMMENT 'ip地址',
  `operatetime` varchar(255) DEFAULT NULL COMMENT '操作时间',
  `exmsg` varchar(255) DEFAULT NULL COMMENT '返回结果',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log
-- ----------------------------

-- ----------------------------
-- Table structure for `mmse`
-- ----------------------------
DROP TABLE IF EXISTS `mmse`;
CREATE TABLE `mmse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(32) NOT NULL,
  `MMYEAR` int(11) DEFAULT NULL COMMENT '时间定向力-年',
  `MMMONTH` int(11) DEFAULT NULL COMMENT '时间定向力-月',
  `MMDATE` int(11) DEFAULT NULL COMMENT '时间定向力-日',
  `MMDAY` int(11) DEFAULT NULL COMMENT '时间定向力-星期',
  `MMSEASON` int(11) DEFAULT NULL COMMENT '时间定向力-季节',
  `MMAREA` int(11) DEFAULT NULL COMMENT '场所定向力-国家',
  `MMSTATE` int(11) DEFAULT NULL COMMENT '场所定向力-省市',
  `MMCITY` int(11) DEFAULT NULL COMMENT '场所定向力-街道地址',
  `MMHOSPIT` int(11) DEFAULT NULL COMMENT '场所定向力-什么地方（福利院）',
  `MMFLOOR` int(11) DEFAULT NULL COMMENT '场所定向力-几楼',
  `garden` int(11) DEFAULT NULL COMMENT '记忆力-花园',
  `refrigerator` int(11) DEFAULT NULL COMMENT '记忆力-冰箱',
  `flag` int(11) DEFAULT NULL COMMENT '记忆力-国旗',
  `MMDLTR` int(11) DEFAULT NULL COMMENT '注意力计算力-93',
  `MMLLTR` int(11) DEFAULT NULL COMMENT '注意力计算力-86',
  `MMRLTR` int(11) DEFAULT NULL COMMENT '注意力计算力-79',
  `MMOLTR` int(11) DEFAULT NULL COMMENT '注意力计算力-72',
  `MMWLTR` int(11) DEFAULT NULL COMMENT '注意力计算力-65',
  `garden2` int(11) DEFAULT NULL COMMENT '回忆力-花园',
  `refrigerator2` int(11) DEFAULT NULL COMMENT '回忆力-冰箱',
  `flag2` int(11) DEFAULT NULL COMMENT '回忆力-国旗',
  `MMWATCH` int(11) DEFAULT NULL COMMENT '语言及时空间能力-手表',
  `MMPENCIL` int(11) DEFAULT NULL COMMENT '语言及时空间能力-铅笔',
  `MMREPEAT` int(11) DEFAULT NULL COMMENT '语言及时空间能力-重复一句话',
  `MMHAND` int(11) DEFAULT NULL COMMENT '语言及时空间能力-右手拿纸',
  `MMFOLD` int(11) DEFAULT NULL COMMENT '语言及时空间能力-两手将纸对折',
  `MMONFLR` int(11) DEFAULT NULL COMMENT '语言及时空间能力-将纸放在左腿',
  `MMCLEYE` int(11) DEFAULT NULL COMMENT '语言及时空间能力-念并闭上眼睛',
  `MMWRITE` int(11) DEFAULT NULL COMMENT '语言及时空间能力-写句子',
  `MMDRAW` int(11) DEFAULT NULL COMMENT '语言及时空间能力-照样子画图',
  `MMSE` int(11) DEFAULT NULL COMMENT 'MMSE总分',
  `time` text COMMENT '记录时间',
  `unix_timestamp` bigint(13) DEFAULT NULL COMMENT '记录时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mmse
-- ----------------------------

-- ----------------------------
-- Table structure for `moca`
-- ----------------------------
DROP TABLE IF EXISTS `moca`;
CREATE TABLE `moca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(32) NOT NULL COMMENT '受试者ID',
  `MOCA` int(11) DEFAULT NULL COMMENT 'moca总分',
  `TRAILS` int(11) DEFAULT NULL COMMENT '视空间与执行功能-连线',
  `CUBE` int(11) DEFAULT NULL COMMENT '视空间与执行功能-复制立方体',
  `CLOCKCON` int(11) DEFAULT NULL COMMENT '视空间与执行功能-画钟表-轮廓',
  `CLOCKNO` int(11) DEFAULT NULL COMMENT '视空间与执行功能-画钟表-数字',
  `CLOCKHAN` int(11) DEFAULT NULL COMMENT '视空间与执行功能-画钟表-指针',
  `LION` int(11) DEFAULT NULL COMMENT '命名-狮子',
  `RHINO` int(11) DEFAULT NULL COMMENT '命名-犀牛',
  `CAMEL` int(11) DEFAULT NULL COMMENT '命名-骆驼',
  `IMMT1W1` int(11) DEFAULT NULL COMMENT '记忆-重复词语1-脸',
  `IMMT1W2` int(11) DEFAULT NULL COMMENT '记忆-重复词语1-天鹅绒',
  `IMMT1W3` int(11) DEFAULT NULL COMMENT '记忆-重复词语1-教堂',
  `IMMT1W4` int(11) DEFAULT NULL COMMENT '记忆-重复词语1-菊花',
  `IMMT1W5` int(11) DEFAULT NULL COMMENT '记忆-重复词语1-红色',
  `IMMT2W1` int(11) DEFAULT NULL COMMENT '记忆-重复词语2-脸',
  `IMMT2W2` int(11) DEFAULT NULL COMMENT '记忆-重复词语2-天鹅绒',
  `IMMT2W3` int(11) DEFAULT NULL COMMENT '记忆-重复词语2-教堂',
  `IMMT2W4` int(11) DEFAULT NULL COMMENT '记忆-重复词语2-菊花',
  `IMMT2W5` int(11) DEFAULT NULL COMMENT '记忆-重复词语2-红色',
  `DIGFOR` int(11) DEFAULT NULL COMMENT '注意-顺背',
  `DIGBACK` int(11) DEFAULT NULL COMMENT '注意-倒背',
  `LETTERS` int(11) DEFAULT NULL COMMENT '注意-数字敲打',
  `SERIAL1` int(11) DEFAULT NULL COMMENT '注意-93',
  `SERIAL2` int(11) DEFAULT NULL COMMENT '注意-86',
  `SERIAL3` int(11) DEFAULT NULL COMMENT '注意-79',
  `SERIAL4` int(11) DEFAULT NULL COMMENT '注意-72',
  `SERIAL5` int(11) DEFAULT NULL COMMENT '注意-65',
  `REPEAT1` int(11) DEFAULT NULL COMMENT '语言-重复1',
  `REPEAT2` int(11) DEFAULT NULL COMMENT '语言-重复2',
  `FFLUENCY` int(11) DEFAULT NULL COMMENT '语言-流畅性',
  `ABSTRAN` int(11) DEFAULT NULL COMMENT '抽象-火车-自行车',
  `ABSMEAS` int(11) DEFAULT NULL COMMENT '抽象-手表-尺子',
  `DELW1` int(11) DEFAULT NULL COMMENT '延迟回忆-脸',
  `DELW2` int(11) DEFAULT NULL COMMENT '延迟回忆-天鹅绒',
  `DELW3` int(11) DEFAULT NULL COMMENT '延迟回忆-教堂',
  `DELW4` int(11) DEFAULT NULL COMMENT '延迟回忆-菊花',
  `DELW5` int(11) DEFAULT NULL COMMENT '延迟回忆-红色',
  `DATE` int(11) DEFAULT NULL COMMENT '定向-日期',
  `MONTH` int(11) DEFAULT NULL COMMENT '定向-月份',
  `YEAR` int(11) DEFAULT NULL COMMENT '定向-年份',
  `DAY` int(11) DEFAULT NULL COMMENT '定向-星期几',
  `PLACE` int(11) DEFAULT NULL COMMENT '定向-地点',
  `CITY` int(11) DEFAULT NULL COMMENT '定向-城市',
  `time` text COMMENT '记录时间',
  `unix_timestamp` bigint(13) DEFAULT NULL COMMENT '记录时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of moca
-- ----------------------------

-- ----------------------------
-- Table structure for `npiq`
-- ----------------------------
DROP TABLE IF EXISTS `npiq`;
CREATE TABLE `npiq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(32) NOT NULL COMMENT '受试者id',
  `NPIA` int(11) DEFAULT NULL COMMENT '妄想',
  `NPIASEV` int(11) DEFAULT NULL COMMENT '妄想严重程度',
  `NPIB` int(11) DEFAULT NULL COMMENT '幻觉',
  `NPIBSEV` int(11) DEFAULT NULL COMMENT '幻觉严重程度',
  `NPIC` int(11) DEFAULT NULL COMMENT '激越/攻击行为',
  `NPICSEV` int(11) DEFAULT NULL COMMENT '激越/攻击行为严重程度',
  `NPID` int(11) DEFAULT NULL COMMENT '抑郁/心境恶劣',
  `NPIDSEV` int(11) DEFAULT NULL COMMENT '抑郁/心境恶劣严重程度',
  `NPIE` int(11) DEFAULT NULL COMMENT '焦虑',
  `NPIESEV` int(11) DEFAULT NULL COMMENT '焦虑严重程度',
  `NPIF` int(11) DEFAULT NULL COMMENT '情感高涨/欣快',
  `NPIFSEV` int(11) DEFAULT NULL COMMENT '情感高涨/欣快严重程度',
  `NPIG` int(11) DEFAULT NULL COMMENT '情感淡漠/漠不关心',
  `NPIGSEV` int(11) DEFAULT NULL COMMENT '情感淡漠/漠不关心严重程度',
  `NPIH` int(11) DEFAULT NULL COMMENT '脱抑制',
  `NPIHSEV` int(11) DEFAULT NULL COMMENT '脱抑制严重程度',
  `NPII` int(11) DEFAULT NULL COMMENT '易激惹/情绪不稳',
  `NPIISEV` int(11) DEFAULT NULL COMMENT '易激惹/情绪不稳严重程度',
  `NPIJ` int(11) DEFAULT NULL COMMENT '运动紊乱',
  `NPIJSEV` int(11) DEFAULT NULL COMMENT '运动紊乱严重程度',
  `NPIK` int(11) DEFAULT NULL COMMENT '夜间行为',
  `NPIKSEV` int(11) DEFAULT NULL COMMENT '夜间行为严重程度',
  `NPIL` int(11) DEFAULT NULL COMMENT '食欲/进食',
  `NPILSEV` int(11) DEFAULT NULL COMMENT '食欲/进食严重程度',
  `NPISCORE` int(11) DEFAULT NULL COMMENT 'NPIQ总分',
  `time` text COMMENT '记录时间',
  `unix_timestamp` bigint(13) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of npiq
-- ----------------------------

-- ----------------------------
-- Table structure for `demo_character`
-- ----------------------------
DROP TABLE IF EXISTS `demo_character`;
CREATE TABLE `demo_character` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '数据ID编号',
  `id_card` bigint(18) DEFAULT NULL COMMENT '受试者身份证号',
  `name` varchar(50) DEFAULT NULL COMMENT '姓名',
  `gender` varchar(50) DEFAULT '' COMMENT '性别',
  `born_date` varchar(20) DEFAULT NULL COMMENT '出生年月',
  `phone` varchar(11) DEFAULT NULL COMMENT '电话',
  `home_phone` varchar(11) DEFAULT NULL COMMENT '家属电话',
  `address` varchar(50) DEFAULT NULL COMMENT '住址',
  `race` varchar(50) DEFAULT NULL COMMENT '民族',
  `race_other` varchar(50) DEFAULT NULL COMMENT '其他民族',
  `fluency` int(11) DEFAULT NULL COMMENT '汉语交流',
  `area_type` int(11) DEFAULT NULL COMMENT '居住地',
  `live_type` text COMMENT '居住方式',
  `live_type_other` text COMMENT '其他居住方式',
  `education` int(11) DEFAULT NULL COMMENT '文化程度',
  `marital` int(11) DEFAULT NULL COMMENT '婚姻状况',
  `retire` int(11) DEFAULT NULL COMMENT '是否离退休',
  `occupation` text COMMENT '职业(在职/离退休前)',
  `income` text COMMENT '经济收入来源',
  `income_other` text COMMENT '其他经济收入来源',
  `income_level` int(11) DEFAULT NULL COMMENT '收入情况',
  `medical_insurance` varchar(6) DEFAULT NULL COMMENT '医疗保险',
  `height` float DEFAULT NULL COMMENT '身高',
  `weight` float DEFAULT NULL COMMENT '体重',
  `waistline` float DEFAULT NULL COMMENT '腰围',
  `systolic_pressure` float DEFAULT NULL COMMENT '收缩压',
  `diastolic_pressure` float DEFAULT NULL COMMENT '舒张压',
  `time` text COMMENT '记录时间',
  `unix_timestamp` bigint(13) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人口学特征';

-- ----------------------------
-- Records of demo_character
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_log`
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountname` int(11) DEFAULT NULL,
  `patient_Id` int(11) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `methods` varchar(255) DEFAULT NULL,
  `user_ip` varchar(255) DEFAULT NULL,
  `exception` varchar(255) DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
