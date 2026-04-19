import React, { useMemo, useState } from "react";
import {
  Globe,
  Filter,
  X,
  Search,
  CalendarDays,
  Clock3,
  MapPin,
  Trophy,
  Play,
  Radio,
} from "lucide-react";

// Put a direct embeddable streaming URL here (official player/embed or direct stream URL).
// Leave empty to hide the player.
const STREAM_EMBED_URL = "https://www.youtube.com/embed/dZDj2CnG5dE";

const matches = [
  { id: 1, date: "2026-06-11", time_pt: "12:00 PM", venue: "Estadio Azteca", city: "Mexico City", round_en: "Group Stage", round_zh: "小组赛", match_en: "Mexico vs South Africa", match_zh: "墨西哥 对阵 南非" },
  { id: 2, date: "2026-06-11", time_pt: "7:00 PM", venue: "Estadio Akron", city: "Zapopan", round_en: "Group Stage", round_zh: "小组赛", match_en: "South Korea vs Czech Republic", match_zh: "韩国 对阵 捷克" },
  { id: 3, date: "2026-06-12", time_pt: "12:00 PM", venue: "BMO Field", city: "Toronto", round_en: "Group Stage", round_zh: "小组赛", match_en: "Canada vs Bosnia and Herzegovina", match_zh: "加拿大 对阵 波斯尼亚和黑塞哥维那" },
  { id: 4, date: "2026-06-12", time_pt: "6:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Group Stage", round_zh: "小组赛", match_en: "United States vs Paraguay", match_zh: "美国 对阵 巴拉圭" },
  { id: 5, date: "2026-06-13", time_pt: "6:00 PM", venue: "Gillette Stadium", city: "Foxborough", round_en: "Group Stage", round_zh: "小组赛", match_en: "Haiti vs Scotland", match_zh: "海地 对阵 苏格兰" },
  { id: 6, date: "2026-06-13", time_pt: "9:00 PM", venue: "BC Place", city: "Vancouver", round_en: "Group Stage", round_zh: "小组赛", match_en: "Australia vs Turkey", match_zh: "澳大利亚 对阵 土耳其" },
  { id: 7, date: "2026-06-13", time_pt: "3:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Group Stage", round_zh: "小组赛", match_en: "Brazil vs Morocco", match_zh: "巴西 对阵 摩洛哥" },
  { id: 8, date: "2026-06-13", time_pt: "12:00 PM", venue: "Levi's Stadium", city: "Santa Clara", round_en: "Group Stage", round_zh: "小组赛", match_en: "Qatar vs Switzerland", match_zh: "卡塔尔 对阵 瑞士" },
  { id: 9, date: "2026-06-14", time_pt: "4:00 PM", venue: "Lincoln Financial Field", city: "Philadelphia", round_en: "Group Stage", round_zh: "小组赛", match_en: "Ivory Coast vs Ecuador", match_zh: "科特迪瓦 对阵 厄瓜多尔" },
  { id: 10, date: "2026-06-14", time_pt: "9:00 AM", venue: "NRG Stadium", city: "Houston", round_en: "Group Stage", round_zh: "小组赛", match_en: "Germany vs Curaçao", match_zh: "德国 对阵 库拉索" },
  { id: 11, date: "2026-06-14", time_pt: "1:00 PM", venue: "AT&T Stadium", city: "Arlington", round_en: "Group Stage", round_zh: "小组赛", match_en: "Netherlands vs Japan", match_zh: "荷兰 对阵 日本" },
  { id: 12, date: "2026-06-14", time_pt: "7:00 PM", venue: "Estadio BBVA", city: "Guadalupe", round_en: "Group Stage", round_zh: "小组赛", match_en: "Sweden vs Tunisia", match_zh: "瑞典 对阵 突尼斯" },
  { id: 13, date: "2026-06-15", time_pt: "3:00 PM", venue: "Hard Rock Stadium", city: "Miami Gardens", round_en: "Group Stage", round_zh: "小组赛", match_en: "Saudi Arabia vs Uruguay", match_zh: "沙特阿拉伯 对阵 乌拉圭" },
  { id: 14, date: "2026-06-15", time_pt: "9:00 AM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Group Stage", round_zh: "小组赛", match_en: "Spain vs Cape Verde", match_zh: "西班牙 对阵 佛得角" },
  { id: 15, date: "2026-06-15", time_pt: "6:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Group Stage", round_zh: "小组赛", match_en: "Iran vs New Zealand", match_zh: "伊朗 对阵 新西兰" },
  { id: 16, date: "2026-06-15", time_pt: "12:00 PM", venue: "Lumen Field", city: "Seattle", round_en: "Group Stage", round_zh: "小组赛", match_en: "Belgium vs Egypt", match_zh: "比利时 对阵 埃及" },
  { id: 17, date: "2026-06-16", time_pt: "12:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Group Stage", round_zh: "小组赛", match_en: "France vs Senegal", match_zh: "法国 对阵 塞内加尔" },
  { id: 18, date: "2026-06-16", time_pt: "3:00 PM", venue: "Gillette Stadium", city: "Foxborough", round_en: "Group Stage", round_zh: "小组赛", match_en: "Iraq vs Norway", match_zh: "伊拉克 对阵 挪威" },
  { id: 19, date: "2026-06-16", time_pt: "6:00 PM", venue: "Arrowhead Stadium", city: "Kansas City", round_en: "Group Stage", round_zh: "小组赛", match_en: "Argentina vs Algeria", match_zh: "阿根廷 对阵 阿尔及利亚" },
  { id: 20, date: "2026-06-16", time_pt: "9:00 PM", venue: "Levi's Stadium", city: "Santa Clara", round_en: "Group Stage", round_zh: "小组赛", match_en: "Austria vs Jordan", match_zh: "奥地利 对阵 约旦" },
  { id: 21, date: "2026-06-17", time_pt: "4:00 PM", venue: "BMO Field", city: "Toronto", round_en: "Group Stage", round_zh: "小组赛", match_en: "Ghana vs Panama", match_zh: "加纳 对阵 巴拿马" },
  { id: 22, date: "2026-06-17", time_pt: "1:00 PM", venue: "AT&T Stadium", city: "Arlington", round_en: "Group Stage", round_zh: "小组赛", match_en: "England vs Croatia", match_zh: "英格兰 对阵 克罗地亚" },
  { id: 23, date: "2026-06-17", time_pt: "10:00 AM", venue: "NRG Stadium", city: "Houston", round_en: "Group Stage", round_zh: "小组赛", match_en: "Portugal vs DR Congo", match_zh: "葡萄牙 对阵 刚果民主共和国" },
  { id: 24, date: "2026-06-17", time_pt: "7:00 PM", venue: "Estadio Azteca", city: "Mexico City", round_en: "Group Stage", round_zh: "小组赛", match_en: "Uzbekistan vs Colombia", match_zh: "乌兹别克斯坦 对阵 哥伦比亚" },
  { id: 25, date: "2026-06-18", time_pt: "9:00 AM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Group Stage", round_zh: "小组赛", match_en: "Czech Republic vs South Africa", match_zh: "捷克 对阵 南非" },
  { id: 26, date: "2026-06-18", time_pt: "12:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Group Stage", round_zh: "小组赛", match_en: "Switzerland vs Bosnia and Herzegovina", match_zh: "瑞士 对阵 波斯尼亚和黑塞哥维那" },
  { id: 27, date: "2026-06-18", time_pt: "3:00 PM", venue: "BC Place", city: "Vancouver", round_en: "Group Stage", round_zh: "小组赛", match_en: "Canada vs Qatar", match_zh: "加拿大 对阵 卡塔尔" },
  { id: 28, date: "2026-06-18", time_pt: "6:00 PM", venue: "Estadio Akron", city: "Zapopan", round_en: "Group Stage", round_zh: "小组赛", match_en: "Mexico vs South Korea", match_zh: "墨西哥 对阵 韩国" },
  { id: 29, date: "2026-06-19", time_pt: "5:30 PM", venue: "Lincoln Financial Field", city: "Philadelphia", round_en: "Group Stage", round_zh: "小组赛", match_en: "Brazil vs Haiti", match_zh: "巴西 对阵 海地" },
  { id: 30, date: "2026-06-19", time_pt: "3:00 PM", venue: "Gillette Stadium", city: "Foxborough", round_en: "Group Stage", round_zh: "小组赛", match_en: "Scotland vs Morocco", match_zh: "苏格兰 对阵 摩洛哥" },
  { id: 31, date: "2026-06-19", time_pt: "7:00 PM", venue: "Levi's Stadium", city: "Santa Clara", round_en: "Group Stage", round_zh: "小组赛", match_en: "Turkey vs Paraguay", match_zh: "土耳其 对阵 巴拉圭" },
  { id: 32, date: "2026-06-19", time_pt: "12:00 PM", venue: "Lumen Field", city: "Seattle", round_en: "Group Stage", round_zh: "小组赛", match_en: "United States vs Australia", match_zh: "美国 对阵 澳大利亚" },
  { id: 33, date: "2026-06-20", time_pt: "1:00 PM", venue: "BMO Field", city: "Toronto", round_en: "Group Stage", round_zh: "小组赛", match_en: "Germany vs Ivory Coast", match_zh: "德国 对阵 科特迪瓦" },
  { id: 34, date: "2026-06-20", time_pt: "5:00 PM", venue: "Arrowhead Stadium", city: "Kansas City", round_en: "Group Stage", round_zh: "小组赛", match_en: "Ecuador vs Curaçao", match_zh: "厄瓜多尔 对阵 库拉索" },
  { id: 35, date: "2026-06-20", time_pt: "10:00 AM", venue: "NRG Stadium", city: "Houston", round_en: "Group Stage", round_zh: "小组赛", match_en: "Netherlands vs Sweden", match_zh: "荷兰 对阵 瑞典" },
  { id: 36, date: "2026-06-20", time_pt: "9:00 PM", venue: "Estadio BBVA", city: "Guadalupe", round_en: "Group Stage", round_zh: "小组赛", match_en: "Tunisia vs Japan", match_zh: "突尼斯 对阵 日本" },
  { id: 37, date: "2026-06-21", time_pt: "3:00 PM", venue: "Hard Rock Stadium", city: "Miami Gardens", round_en: "Group Stage", round_zh: "小组赛", match_en: "Uruguay vs Cape Verde", match_zh: "乌拉圭 对阵 佛得角" },
  { id: 38, date: "2026-06-21", time_pt: "9:00 AM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Group Stage", round_zh: "小组赛", match_en: "Spain vs Saudi Arabia", match_zh: "西班牙 对阵 沙特阿拉伯" },
  { id: 39, date: "2026-06-21", time_pt: "12:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Group Stage", round_zh: "小组赛", match_en: "Belgium vs Iran", match_zh: "比利时 对阵 伊朗" },
  { id: 40, date: "2026-06-21", time_pt: "6:00 PM", venue: "BC Place", city: "Vancouver", round_en: "Group Stage", round_zh: "小组赛", match_en: "New Zealand vs Egypt", match_zh: "新西兰 对阵 埃及" },
  { id: 41, date: "2026-06-22", time_pt: "5:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Group Stage", round_zh: "小组赛", match_en: "Norway vs Senegal", match_zh: "挪威 对阵 塞内加尔" },
  { id: 42, date: "2026-06-22", time_pt: "2:00 PM", venue: "Lincoln Financial Field", city: "Philadelphia", round_en: "Group Stage", round_zh: "小组赛", match_en: "France vs Iraq", match_zh: "法国 对阵 伊拉克" },
  { id: 43, date: "2026-06-22", time_pt: "10:00 AM", venue: "AT&T Stadium", city: "Arlington", round_en: "Group Stage", round_zh: "小组赛", match_en: "Argentina vs Austria", match_zh: "阿根廷 对阵 奥地利" },
  { id: 44, date: "2026-06-22", time_pt: "8:00 PM", venue: "Levi's Stadium", city: "Santa Clara", round_en: "Group Stage", round_zh: "小组赛", match_en: "Jordan vs Algeria", match_zh: "约旦 对阵 阿尔及利亚" },
  { id: 45, date: "2026-06-23", time_pt: "1:00 PM", venue: "Gillette Stadium", city: "Foxborough", round_en: "Group Stage", round_zh: "小组赛", match_en: "England vs Ghana", match_zh: "英格兰 对阵 加纳" },
  { id: 46, date: "2026-06-23", time_pt: "4:00 PM", venue: "BMO Field", city: "Toronto", round_en: "Group Stage", round_zh: "小组赛", match_en: "Panama vs Croatia", match_zh: "巴拿马 对阵 克罗地亚" },
  { id: 47, date: "2026-06-23", time_pt: "10:00 AM", venue: "NRG Stadium", city: "Houston", round_en: "Group Stage", round_zh: "小组赛", match_en: "Portugal vs Uzbekistan", match_zh: "葡萄牙 对阵 乌兹别克斯坦" },
  { id: 48, date: "2026-06-23", time_pt: "7:00 PM", venue: "Estadio Akron", city: "Zapopan", round_en: "Group Stage", round_zh: "小组赛", match_en: "Colombia vs DR Congo", match_zh: "哥伦比亚 对阵 刚果民主共和国" },
  { id: 49, date: "2026-06-24", time_pt: "3:00 PM", venue: "Hard Rock Stadium", city: "Miami Gardens", round_en: "Group Stage", round_zh: "小组赛", match_en: "Scotland vs Brazil", match_zh: "苏格兰 对阵 巴西" },
  { id: 50, date: "2026-06-24", time_pt: "3:00 PM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Group Stage", round_zh: "小组赛", match_en: "Morocco vs Haiti", match_zh: "摩洛哥 对阵 海地" },
  { id: 51, date: "2026-06-24", time_pt: "12:00 PM", venue: "BC Place", city: "Vancouver", round_en: "Group Stage", round_zh: "小组赛", match_en: "Switzerland vs Canada", match_zh: "瑞士 对阵 加拿大" },
  { id: 52, date: "2026-06-24", time_pt: "12:00 PM", venue: "Lumen Field", city: "Seattle", round_en: "Group Stage", round_zh: "小组赛", match_en: "Bosnia and Herzegovina vs Qatar", match_zh: "波斯尼亚和黑塞哥维那 对阵 卡塔尔" },
  { id: 53, date: "2026-06-24", time_pt: "6:00 PM", venue: "Estadio Azteca", city: "Mexico City", round_en: "Group Stage", round_zh: "小组赛", match_en: "Czech Republic vs Mexico", match_zh: "捷克 对阵 墨西哥" },
  { id: 54, date: "2026-06-24", time_pt: "6:00 PM", venue: "Estadio BBVA", city: "Guadalupe", round_en: "Group Stage", round_zh: "小组赛", match_en: "South Africa vs South Korea", match_zh: "南非 对阵 韩国" },
  { id: 55, date: "2026-06-25", time_pt: "1:00 PM", venue: "Lincoln Financial Field", city: "Philadelphia", round_en: "Group Stage", round_zh: "小组赛", match_en: "Curaçao vs Ivory Coast", match_zh: "库拉索 对阵 科特迪瓦" },
  { id: 56, date: "2026-06-25", time_pt: "1:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Group Stage", round_zh: "小组赛", match_en: "Ecuador vs Germany", match_zh: "厄瓜多尔 对阵 德国" },
  { id: 57, date: "2026-06-25", time_pt: "4:00 PM", venue: "AT&T Stadium", city: "Arlington", round_en: "Group Stage", round_zh: "小组赛", match_en: "Japan vs Sweden", match_zh: "日本 对阵 瑞典" },
  { id: 58, date: "2026-06-25", time_pt: "4:00 PM", venue: "Arrowhead Stadium", city: "Kansas City", round_en: "Group Stage", round_zh: "小组赛", match_en: "Tunisia vs Netherlands", match_zh: "突尼斯 对阵 荷兰" },
  { id: 59, date: "2026-06-25", time_pt: "7:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Group Stage", round_zh: "小组赛", match_en: "Turkey vs United States", match_zh: "土耳其 对阵 美国" },
  { id: 60, date: "2026-06-25", time_pt: "7:00 PM", venue: "Levi's Stadium", city: "Santa Clara", round_en: "Group Stage", round_zh: "小组赛", match_en: "Paraguay vs Australia", match_zh: "巴拉圭 对阵 澳大利亚" },
  { id: 61, date: "2026-06-26", time_pt: "12:00 PM", venue: "Gillette Stadium", city: "Foxborough", round_en: "Group Stage", round_zh: "小组赛", match_en: "Norway vs France", match_zh: "挪威 对阵 法国" },
  { id: 62, date: "2026-06-26", time_pt: "12:00 PM", venue: "BMO Field", city: "Toronto", round_en: "Group Stage", round_zh: "小组赛", match_en: "Senegal vs Iraq", match_zh: "塞内加尔 对阵 伊拉克" },
  { id: 63, date: "2026-06-26", time_pt: "8:00 PM", venue: "Lumen Field", city: "Seattle", round_en: "Group Stage", round_zh: "小组赛", match_en: "Egypt vs Iran", match_zh: "埃及 对阵 伊朗" },
  { id: 64, date: "2026-06-26", time_pt: "8:00 PM", venue: "BC Place", city: "Vancouver", round_en: "Group Stage", round_zh: "小组赛", match_en: "New Zealand vs Belgium", match_zh: "新西兰 对阵 比利时" },
  { id: 65, date: "2026-06-26", time_pt: "5:00 PM", venue: "NRG Stadium", city: "Houston", round_en: "Group Stage", round_zh: "小组赛", match_en: "Cape Verde vs Saudi Arabia", match_zh: "佛得角 对阵 沙特阿拉伯" },
  { id: 66, date: "2026-06-26", time_pt: "5:00 PM", venue: "Estadio Akron", city: "Zapopan", round_en: "Group Stage", round_zh: "小组赛", match_en: "Uruguay vs Spain", match_zh: "乌拉圭 对阵 西班牙" },
  { id: 67, date: "2026-06-27", time_pt: "2:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Group Stage", round_zh: "小组赛", match_en: "Panama vs England", match_zh: "巴拿马 对阵 英格兰" },
  { id: 68, date: "2026-06-27", time_pt: "2:00 PM", venue: "Lincoln Financial Field", city: "Philadelphia", round_en: "Group Stage", round_zh: "小组赛", match_en: "Croatia vs Ghana", match_zh: "克罗地亚 对阵 加纳" },
  { id: 69, date: "2026-06-27", time_pt: "7:00 PM", venue: "Arrowhead Stadium", city: "Kansas City", round_en: "Group Stage", round_zh: "小组赛", match_en: "Algeria vs Austria", match_zh: "阿尔及利亚 对阵 奥地利" },
  { id: 70, date: "2026-06-27", time_pt: "7:00 PM", venue: "AT&T Stadium", city: "Arlington", round_en: "Group Stage", round_zh: "小组赛", match_en: "Jordan vs Argentina", match_zh: "约旦 对阵 阿根廷" },
  { id: 71, date: "2026-06-27", time_pt: "4:30 PM", venue: "Hard Rock Stadium", city: "Miami Gardens", round_en: "Group Stage", round_zh: "小组赛", match_en: "Colombia vs Portugal", match_zh: "哥伦比亚 对阵 葡萄牙" },
  { id: 72, date: "2026-06-27", time_pt: "4:30 PM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Group Stage", round_zh: "小组赛", match_en: "DR Congo vs Uzbekistan", match_zh: "刚果民主共和国 对阵 乌兹别克斯坦" },
  { id: 73, date: "2026-06-28", time_pt: "12:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Runner-up Group A vs Runner-up Group B", match_zh: "A组亚军 对阵 B组亚军" },
  { id: 74, date: "2026-06-29", time_pt: "1:30 PM", venue: "Gillette Stadium", city: "Foxborough", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group E vs 3rd Group A/B/C/D/F", match_zh: "E组冠军 对阵 A/B/C/D/F组第三名" },
  { id: 75, date: "2026-06-29", time_pt: "6:00 PM", venue: "Estadio BBVA", city: "Guadalupe", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group F vs Runner-up Group C", match_zh: "F组冠军 对阵 C组亚军" },
  { id: 76, date: "2026-06-29", time_pt: "10:00 AM", venue: "NRG Stadium", city: "Houston", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group C vs Runner-up Group F", match_zh: "C组冠军 对阵 F组亚军" },
  { id: 77, date: "2026-06-30", time_pt: "2:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group I vs 3rd Group C/D/F/G/H", match_zh: "I组冠军 对阵 C/D/F/G/H组第三名" },
  { id: 78, date: "2026-06-30", time_pt: "10:00 AM", venue: "AT&T Stadium", city: "Arlington", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Runner-up Group E vs Runner-up Group I", match_zh: "E组亚军 对阵 I组亚军" },
  { id: 79, date: "2026-06-30", time_pt: "6:00 PM", venue: "Estadio Azteca", city: "Mexico City", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group A vs 3rd Group C/E/F/H/I", match_zh: "A组冠军 对阵 C/E/F/H/I组第三名" },
  { id: 80, date: "2026-07-01", time_pt: "12:00 PM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group L vs 3rd Group E/H/I/J/K", match_zh: "L组冠军 对阵 E/H/I/J/K组第三名" },
  { id: 81, date: "2026-07-01", time_pt: "5:00 PM", venue: "Levi's Stadium", city: "Santa Clara", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group D vs 3rd Group B/E/F/I/J", match_zh: "D组冠军 对阵 B/E/F/I/J组第三名" },
  { id: 82, date: "2026-07-01", time_pt: "1:00 PM", venue: "Lumen Field", city: "Seattle", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group G vs 3rd Group A/E/H/I/J", match_zh: "G组冠军 对阵 A/E/H/I/J组第三名" },
  { id: 83, date: "2026-07-02", time_pt: "4:00 PM", venue: "BMO Field", city: "Toronto", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Runner-up Group K vs Runner-up Group L", match_zh: "K组亚军 对阵 L组亚军" },
  { id: 84, date: "2026-07-02", time_pt: "12:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group H vs Runner-up Group J", match_zh: "H组冠军 对阵 J组亚军" },
  { id: 85, date: "2026-07-02", time_pt: "8:00 PM", venue: "BC Place", city: "Vancouver", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group B vs 3rd Group E/F/G/I/J", match_zh: "B组冠军 对阵 E/F/G/I/J组第三名" },
  { id: 86, date: "2026-07-03", time_pt: "2:00 PM", venue: "Hard Rock Stadium", city: "Miami Gardens", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group J vs Runner-up Group H", match_zh: "J组冠军 对阵 H组亚军" },
  { id: 87, date: "2026-07-03", time_pt: "7:30 PM", venue: "Arrowhead Stadium", city: "Kansas City", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Winner Group K vs 3rd Group D/E/I/J/L", match_zh: "K组冠军 对阵 D/E/I/J/L组第三名" },
  { id: 88, date: "2026-07-03", time_pt: "11:00 AM", venue: "AT&T Stadium", city: "Arlington", round_en: "Round of 32", round_zh: "1/16决赛", match_en: "Runner-up Group D vs Runner-up Group G", match_zh: "D组亚军 对阵 G组亚军" },
  { id: 89, date: "2026-07-04", time_pt: "1:00 PM", venue: "Lincoln Financial Field", city: "Philadelphia", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 74 vs Winner Match 77", match_zh: "第74场胜者 对阵 第77场胜者" },
  { id: 90, date: "2026-07-04", time_pt: "10:00 AM", venue: "NRG Stadium", city: "Houston", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 73 vs Winner Match 75", match_zh: "第73场胜者 对阵 第75场胜者" },
  { id: 91, date: "2026-07-05", time_pt: "1:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 76 vs Winner Match 78", match_zh: "第76场胜者 对阵 第78场胜者" },
  { id: 92, date: "2026-07-05", time_pt: "5:00 PM", venue: "Estadio Azteca", city: "Mexico City", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 79 vs Winner Match 80", match_zh: "第79场胜者 对阵 第80场胜者" },
  { id: 93, date: "2026-07-06", time_pt: "11:00 AM", venue: "AT&T Stadium", city: "Arlington", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 83 vs Winner Match 84", match_zh: "第83场胜者 对阵 第84场胜者" },
  { id: 94, date: "2026-07-06", time_pt: "5:00 PM", venue: "Lumen Field", city: "Seattle", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 81 vs Winner Match 82", match_zh: "第81场胜者 对阵 第82场胜者" },
  { id: 95, date: "2026-07-07", time_pt: "9:00 AM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 86 vs Winner Match 88", match_zh: "第86场胜者 对阵 第88场胜者" },
  { id: 96, date: "2026-07-07", time_pt: "1:00 PM", venue: "BC Place", city: "Vancouver", round_en: "Round of 16", round_zh: "1/8决赛", match_en: "Winner Match 85 vs Winner Match 87", match_zh: "第85场胜者 对阵 第87场胜者" },
  { id: 97, date: "2026-07-09", time_pt: "1:00 PM", venue: "Gillette Stadium", city: "Foxborough", round_en: "Quarterfinals", round_zh: "四分之一决赛", match_en: "Winner Match 89 vs Winner Match 90", match_zh: "第89场胜者 对阵 第90场胜者" },
  { id: 98, date: "2026-07-10", time_pt: "12:00 PM", venue: "SoFi Stadium", city: "Inglewood", round_en: "Quarterfinals", round_zh: "四分之一决赛", match_en: "Winner Match 93 vs Winner Match 94", match_zh: "第93场胜者 对阵 第94场胜者" },
  { id: 99, date: "2026-07-11", time_pt: "1:00 PM", venue: "Hard Rock Stadium", city: "Miami Gardens", round_en: "Quarterfinals", round_zh: "四分之一决赛", match_en: "Winner Match 91 vs Winner Match 92", match_zh: "第91场胜者 对阵 第92场胜者" },
  { id: 100, date: "2026-07-11", time_pt: "5:00 PM", venue: "Arrowhead Stadium", city: "Kansas City", round_en: "Quarterfinals", round_zh: "四分之一决赛", match_en: "Winner Match 95 vs Winner Match 96", match_zh: "第95场胜者 对阵 第96场胜者" },
  { id: 101, date: "2026-07-14", time_pt: "11:00 AM", venue: "AT&T Stadium", city: "Arlington", round_en: "Semifinals", round_zh: "半决赛", match_en: "Winner Match 97 vs Winner Match 98", match_zh: "第97场胜者 对阵 第98场胜者" },
  { id: 102, date: "2026-07-15", time_pt: "11:00 AM", venue: "Mercedes-Benz Stadium", city: "Atlanta", round_en: "Semifinals", round_zh: "半决赛", match_en: "Winner Match 99 vs Winner Match 100", match_zh: "第99场胜者 对阵 第100场胜者" },
  { id: 103, date: "2026-07-18", time_pt: "2:00 PM", venue: "Hard Rock Stadium", city: "Miami Gardens", round_en: "Match for third place", round_zh: "季军赛", match_en: "Loser Match 101 vs Loser Match 102", match_zh: "第101场负者 对阵 第102场负者" },
  { id: 104, date: "2026-07-19", time_pt: "12:00 PM", venue: "MetLife Stadium", city: "East Rutherford", round_en: "Final", round_zh: "决赛", match_en: "Winner Match 101 vs Winner Match 102", match_zh: "第101场胜者 对阵 第102场胜者" },
];

const roundQuickSets = [
  { key: "all", en: "All", zh: "全部" },
  { key: "group", en: "Group", zh: "小组赛" },
  { key: "knockout", en: "Knockout", zh: "淘汰赛" },
  { key: "final", en: "Final", zh: "决赛" },
];

const roundBuckets = {
  all: () => true,
  group: (m) => m.round_en === "Group Stage",
  knockout: (m) => m.round_en !== "Group Stage" && m.round_en !== "Final",
  final: (m) => m.round_en === "Final",
};

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function formatLabel(lang, en, zh) {
  return lang === "zh" ? zh : en;
}

function App() {
  const [lang, setLang] = useState("en");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quick, setQuick] = useState("all");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [round, setRound] = useState("");
  const [musicOpen, setMusicOpen] = useState(false);

  const rounds = useMemo(() => {
    const map = new Map();
    matches.forEach((m) => {
      if (!map.has(m.round_en)) map.set(m.round_en, m.round_zh);
    });
    return Array.from(map.entries());
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return matches.filter((m) => {
      const quickOk = roundBuckets[quick](m);
      const dateOk = !date || m.date === date;
      const timeOk = !time || m.time_pt === time;
      const venueOk = !venue || m.venue.toLowerCase().includes(venue.trim().toLowerCase());
      const roundOk = !round || m.round_en === round;
      const text = [m.match_en, m.match_zh, m.venue, m.city, m.round_en, m.round_zh, m.date, m.time_pt].join(" ").toLowerCase();
      const queryOk = !q || text.includes(q);
      return quickOk && dateOk && timeOk && venueOk && roundOk && queryOk;
    });
  }, [quick, query, date, time, venue, round]);

  const grouped = useMemo(() => {
    const map = new Map();
    visible.forEach((m) => {
      if (!map.has(m.date)) map.set(m.date, []);
      map.get(m.date).push(m);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [visible]);

  const clearFilters = () => {
    setQuery("");
    setDate("");
    setTime("");
    setVenue("");
    setRound("");
    setQuick("all");
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/worldcup-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.75),rgba(0,0,0,0.85))]" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.25),transparent_60%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_25px_rgba(34,197,94,0.18)]">
              <Trophy className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="text-[17px] font-semibold tracking-tight">
              {lang === "zh" ? "2026世界杯" : "2026 World Cup"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {STREAM_EMBED_URL ? (
              <button
                onClick={() => setMusicOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100 shadow-lg shadow-emerald-500/10 backdrop-blur-md active:scale-[0.98]"
              >
                <Radio className="h-4 w-4" />
                {lang === "zh" ? "音乐" : "Music"}
              </button>
            ) : null}
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 shadow-lg shadow-black/20 backdrop-blur-md active:scale-[0.98]"
            >
              <Filter className="h-4 w-4 text-emerald-300" />
              {lang === "zh" ? "筛选" : "Filters"}
            </button>
            <button
              onClick={() => setLang((v) => (v === "en" ? "zh" : "en"))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.18)] active:scale-[0.98]"
              aria-label="Language toggle"
            >
              <Globe className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-24 pt-4">
        <section className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Search className="h-4 w-4 text-emerald-300" />
            <span>{lang === "zh" ? "搜索比赛、球队、场馆、城市或轮次" : "Search matches, teams, venues, cities, or rounds"}</span>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "zh" ? "输入关键词" : "Type a keyword"}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base outline-none placeholder:text-white/35 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/15"
          />

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {roundQuickSets.map((item) => (
              <button
                key={item.key}
                onClick={() => setQuick(item.key)}
                className={cx(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
                  quick === item.key
                    ? "bg-gradient-to-r from-emerald-400 to-lime-300 text-black shadow-lg shadow-emerald-500/20"
                    : "border border-white/10 bg-white/5 text-white/80"
                )}
              >
                {formatLabel(lang, item.en, item.zh)}
              </button>
            ))}
          </div>
        </section>

        {musicOpen && STREAM_EMBED_URL ? (
          <section className="mb-4 overflow-hidden rounded-3xl border border-emerald-400/20 bg-black/35 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-100">
                <Play className="h-4 w-4" />
                {lang === "zh" ? "流媒体播放" : "Streaming player"}
              </div>
              <button onClick={() => setMusicOpen(false)} className="rounded-full border border-white/10 bg-white/6 p-2 text-white/80">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              <iframe
                title="Streaming Music"
                src={STREAM_EMBED_URL}
                className="h-24 w-full rounded-2xl border border-white/10"
                allow="autoplay; encrypted-media; clipboard-write; fullscreen"
              />
              <p className="mt-2 text-xs text-white/55">
                {lang === "zh" ? "请使用可嵌入的官方流媒体链接。" : "Use a legal embeddable streaming link here."}
              </p>
            </div>
          </section>
        ) : null}

        <div className="space-y-5">
          {grouped.map(([day, items]) => (
            <section key={day}>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-200/90">
                <CalendarDays className="h-4 w-4" />
                <span>{day}</span>
                <span className="text-white/40">{items.length}</span>
              </div>

              <div className="space-y-3">
                {items.map((m) => (
                  <article key={m.id} className="group rounded-3xl border border-white/10 bg-white/6 p-4 shadow-xl shadow-black/25 backdrop-blur-xl transition hover:border-emerald-400/25 hover:bg-white/8">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[15px] font-semibold tracking-tight text-white">{lang === "zh" ? m.match_zh : m.match_en}</div>
                        <div className="mt-1 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-100">
                          {lang === "zh" ? m.round_zh : m.round_en}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-right">
                        <div className="flex items-center gap-2 text-xs text-white/55">
                          <Clock3 className="h-3.5 w-3.5" />
                          PT
                        </div>
                        <div className="mt-1 text-sm font-semibold text-amber-200">{m.time_pt || "TBD"}</div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-white/78 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-lime-300" />
                        <span className="truncate">{m.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:justify-end sm:text-right">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">{m.city}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {visible.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/70 backdrop-blur-xl">
              {lang === "zh" ? "没有匹配的比赛。" : "No matches found."}
            </div>
          )}
        </div>
      </main>

      <div className={cx("fixed inset-0 z-40 transition", filtersOpen ? "pointer-events-auto" : "pointer-events-none")}>
        <div className={cx("absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity", filtersOpen ? "opacity-100" : "opacity-0")} onClick={() => setFiltersOpen(false)} />

        <div className={cx("absolute bottom-0 left-0 right-0 mx-auto w-full max-w-4xl rounded-t-[28px] border border-white/10 bg-[#07120b]/95 shadow-[0_-20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-transform duration-300", filtersOpen ? "translate-y-0" : "translate-y-full")}>
          <div className="mx-auto flex max-w-4xl items-center justify-between border-b border-white/10 px-4 py-4">
            <div>
              <div className="text-base font-semibold">{lang === "zh" ? "筛选" : "Filters"}</div>
              <div className="text-xs text-white/55">{lang === "zh" ? "细化搜索结果" : "Refine the schedule"}</div>
            </div>
            <button onClick={() => setFiltersOpen(false)} className="rounded-full border border-white/10 bg-white/6 p-2 text-white/80">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-4 py-4 pb-8">
            <div className="grid gap-4">
              <Field label={lang === "zh" ? "日期" : "Date"} icon={<CalendarDays className="h-4 w-4" />}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-base outline-none focus:border-emerald-400/40"
                />
              </Field>

              <Field label={lang === "zh" ? "时间" : "Time"} icon={<Clock3 className="h-4 w-4" />}>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-base outline-none focus:border-emerald-400/40"
                >
                  <option value="">{lang === "zh" ? "全部时间" : "All times"}</option>
                  {[...new Set(matches.map((m) => m.time_pt))].sort().map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label={lang === "zh" ? "场馆" : "Venue"} icon={<MapPin className="h-4 w-4" />}>
                <input
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder={lang === "zh" ? "输入场馆名称" : "Type a stadium name"}
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-base outline-none placeholder:text-white/35 focus:border-emerald-400/40"
                />
              </Field>

              <Field label={lang === "zh" ? "轮次" : "Round"} icon={<Trophy className="h-4 w-4" />}>
                <select
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-base outline-none focus:border-emerald-400/40"
                >
                  <option value="">{lang === "zh" ? "全部轮次" : "All rounds"}</option>
                  {rounds.map(([en, zh]) => (
                    <option key={en} value={en}>{lang === "zh" ? zh : en}</option>
                  ))}
                </select>
              </Field>

              <div className="flex gap-3 pt-2">
                <button onClick={clearFilters} className="flex-1 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 font-medium text-white/85">
                  {lang === "zh" ? "清除" : "Clear"}
                </button>
                <button onClick={() => setFiltersOpen(false)} className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-400 to-lime-300 px-4 py-3 font-semibold text-black shadow-lg shadow-emerald-500/20">
                  {lang === "zh" ? "完成" : "Done"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
        <span className="text-emerald-300">{icon}</span>
        <span>{label}</span>
      </div>
      {children}
    </label>
  );
}

export default App;
