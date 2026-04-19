import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Filter,
  Languages,
  MapPin,
  RefreshCcw,
  Trophy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const schedule = [
  {
    "id": 1,
    "date": "2026-06-11",
    "time_pt": "12:00 PM PT",
    "venue": "Estadio Azteca",
    "city": "Mexico City",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Mexico v South Africa",
    "match_zh": "墨西哥 vs 南非"
  },
  {
    "id": 2,
    "date": "2026-06-11",
    "time_pt": "7:00 PM PT",
    "venue": "Estadio Akron",
    "city": "Guadalajara",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "South Korea v Czechia",
    "match_zh": "韩国 vs 捷克"
  },
  {
    "id": 3,
    "date": "2026-06-12",
    "time_pt": "12:00 PM PT",
    "venue": "BMO Field",
    "city": "Toronto",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Canada v Bosnia and Herzegovina",
    "match_zh": "加拿大 vs 波斯尼亚和黑塞哥维那"
  },
  {
    "id": 4,
    "date": "2026-06-12",
    "time_pt": "6:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "USA v Paraguay",
    "match_zh": "美国 vs 巴拉圭"
  },
  {
    "id": 5,
    "date": "2026-06-13",
    "time_pt": "6:00 PM PT",
    "venue": "Gillette Stadium",
    "city": "Boston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Haiti v Scotland",
    "match_zh": "海地 vs 苏格兰"
  },
  {
    "id": 6,
    "date": "2026-06-13",
    "time_pt": "9:00 PM PT",
    "venue": "BC Place",
    "city": "Vancouver",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Australia v Türkiye",
    "match_zh": "澳大利亚 vs 土耳其"
  },
  {
    "id": 7,
    "date": "2026-06-13",
    "time_pt": "3:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Brazil v Morocco",
    "match_zh": "巴西 vs 摩洛哥"
  },
  {
    "id": 8,
    "date": "2026-06-13",
    "time_pt": "12:00 PM PT",
    "venue": "Levi's Stadium",
    "city": "San Francisco Bay Area",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Qatar v Switzerland",
    "match_zh": "卡塔尔 vs 瑞士"
  },
  {
    "id": 9,
    "date": "2026-06-14",
    "time_pt": "4:00 PM PT",
    "venue": "Lincoln Financial Field",
    "city": "Philadelphia",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Ivory Coast v Ecuador",
    "match_zh": "科特迪瓦 vs 厄瓜多尔"
  },
  {
    "id": 10,
    "date": "2026-06-14",
    "time_pt": "10:00 AM PT",
    "venue": "NRG Stadium",
    "city": "Houston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Germany v Curaçao",
    "match_zh": "德国 vs 库拉索"
  },
  {
    "id": 11,
    "date": "2026-06-14",
    "time_pt": "1:00 PM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Netherlands v Japan",
    "match_zh": "荷兰 vs 日本"
  },
  {
    "id": 12,
    "date": "2026-06-14",
    "time_pt": "7:00 PM PT",
    "venue": "Estadio BBVA",
    "city": "Monterrey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Sweden v Tunisia",
    "match_zh": "瑞典 vs 突尼斯"
  },
  {
    "id": 13,
    "date": "2026-06-15",
    "time_pt": "3:00 PM PT",
    "venue": "Hard Rock Stadium",
    "city": "Miami",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Saudi Arabia v Uruguay",
    "match_zh": "沙特阿拉伯 vs 乌拉圭"
  },
  {
    "id": 14,
    "date": "2026-06-15",
    "time_pt": "9:00 AM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Spain v Cape Verde",
    "match_zh": "西班牙 vs 佛得角"
  },
  {
    "id": 15,
    "date": "2026-06-15",
    "time_pt": "6:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Iran v New Zealand",
    "match_zh": "伊朗 vs 新西兰"
  },
  {
    "id": 16,
    "date": "2026-06-15",
    "time_pt": "12:00 PM PT",
    "venue": "Lumen Field",
    "city": "Seattle",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Belgium v Egypt",
    "match_zh": "比利时 vs 埃及"
  },
  {
    "id": 17,
    "date": "2026-06-16",
    "time_pt": "12:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "France v Senegal",
    "match_zh": "法国 vs 塞内加尔"
  },
  {
    "id": 18,
    "date": "2026-06-16",
    "time_pt": "3:00 PM PT",
    "venue": "Gillette Stadium",
    "city": "Boston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Iraq v Norway",
    "match_zh": "伊拉克 vs 挪威"
  },
  {
    "id": 19,
    "date": "2026-06-16",
    "time_pt": "6:00 PM PT",
    "venue": "Arrowhead Stadium",
    "city": "Kansas City",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Argentina v Algeria",
    "match_zh": "阿根廷 vs 阿尔及利亚"
  },
  {
    "id": 20,
    "date": "2026-06-16",
    "time_pt": "9:00 PM PT",
    "venue": "Levi's Stadium",
    "city": "San Francisco Bay Area",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Austria v Jordan",
    "match_zh": "奥地利 vs 约旦"
  },
  {
    "id": 21,
    "date": "2026-06-17",
    "time_pt": "4:00 PM PT",
    "venue": "BMO Field",
    "city": "Toronto",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Ghana v Panama",
    "match_zh": "加纳 vs 巴拿马"
  },
  {
    "id": 22,
    "date": "2026-06-17",
    "time_pt": "1:00 PM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "England v Croatia",
    "match_zh": "英格兰 vs 克罗地亚"
  },
  {
    "id": 23,
    "date": "2026-06-17",
    "time_pt": "10:00 AM PT",
    "venue": "NRG Stadium",
    "city": "Houston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Portugal v Congo DR",
    "match_zh": "葡萄牙 vs 刚果民主共和国"
  },
  {
    "id": 24,
    "date": "2026-06-17",
    "time_pt": "7:00 PM PT",
    "venue": "Estadio Azteca",
    "city": "Mexico City",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Uzbekistan v Colombia",
    "match_zh": "乌兹别克斯坦 vs 哥伦比亚"
  },
  {
    "id": 25,
    "date": "2026-06-18",
    "time_pt": "9:00 AM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Czechia v South Africa",
    "match_zh": "捷克 vs 南非"
  },
  {
    "id": 26,
    "date": "2026-06-18",
    "time_pt": "12:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Switzerland v Bosnia and Herzegovina",
    "match_zh": "瑞士 vs 波斯尼亚和黑塞哥维那"
  },
  {
    "id": 27,
    "date": "2026-06-18",
    "time_pt": "3:00 PM PT",
    "venue": "BC Place",
    "city": "Vancouver",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Canada v Qatar",
    "match_zh": "加拿大 vs 卡塔尔"
  },
  {
    "id": 28,
    "date": "2026-06-18",
    "time_pt": "6:00 PM PT",
    "venue": "Estadio Akron",
    "city": "Guadalajara",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Mexico v South Korea",
    "match_zh": "墨西哥 vs 韩国"
  },
  {
    "id": 29,
    "date": "2026-06-19",
    "time_pt": "6:00 PM PT",
    "venue": "Lincoln Financial Field",
    "city": "Philadelphia",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Brazil v Haiti",
    "match_zh": "巴西 vs 海地"
  },
  {
    "id": 30,
    "date": "2026-06-19",
    "time_pt": "3:00 PM PT",
    "venue": "Gillette Stadium",
    "city": "Boston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Scotland v Morocco",
    "match_zh": "苏格兰 vs 摩洛哥"
  },
  {
    "id": 31,
    "date": "2026-06-19",
    "time_pt": "8:00 PM PT",
    "venue": "Levi's Stadium",
    "city": "San Francisco Bay Area",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Türkiye v Paraguay",
    "match_zh": "土耳其 vs 巴拉圭"
  },
  {
    "id": 32,
    "date": "2026-06-19",
    "time_pt": "12:00 PM PT",
    "venue": "Lumen Field",
    "city": "Seattle",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "USA v Australia",
    "match_zh": "美国 vs 澳大利亚"
  },
  {
    "id": 33,
    "date": "2026-06-20",
    "time_pt": "1:00 PM PT",
    "venue": "BMO Field",
    "city": "Toronto",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Germany v Ivory Coast",
    "match_zh": "德国 vs 科特迪瓦"
  },
  {
    "id": 34,
    "date": "2026-06-20",
    "time_pt": "5:00 PM PT",
    "venue": "Arrowhead Stadium",
    "city": "Kansas City",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Ecuador v Curaçao",
    "match_zh": "厄瓜多尔 vs 库拉索"
  },
  {
    "id": 35,
    "date": "2026-06-20",
    "time_pt": "10:00 AM PT",
    "venue": "NRG Stadium",
    "city": "Houston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Netherlands v Sweden",
    "match_zh": "荷兰 vs 瑞典"
  },
  {
    "id": 36,
    "date": "2026-06-20",
    "time_pt": "9:00 PM PT",
    "venue": "Estadio BBVA",
    "city": "Monterrey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Tunisia v Japan",
    "match_zh": "突尼斯 vs 日本"
  },
  {
    "id": 37,
    "date": "2026-06-21",
    "time_pt": "3:00 PM PT",
    "venue": "Hard Rock Stadium",
    "city": "Miami",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Uruguay v Cape Verde",
    "match_zh": "乌拉圭 vs 佛得角"
  },
  {
    "id": 38,
    "date": "2026-06-21",
    "time_pt": "9:00 AM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Spain v Saudi Arabia",
    "match_zh": "西班牙 vs 沙特阿拉伯"
  },
  {
    "id": 39,
    "date": "2026-06-21",
    "time_pt": "12:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Belgium v Iran",
    "match_zh": "比利时 vs 伊朗"
  },
  {
    "id": 40,
    "date": "2026-06-21",
    "time_pt": "6:00 PM PT",
    "venue": "BC Place",
    "city": "Vancouver",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "New Zealand v Egypt",
    "match_zh": "新西兰 vs 埃及"
  },
  {
    "id": 41,
    "date": "2026-06-22",
    "time_pt": "5:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Norway v Senegal",
    "match_zh": "挪威 vs 塞内加尔"
  },
  {
    "id": 42,
    "date": "2026-06-22",
    "time_pt": "2:00 PM PT",
    "venue": "Lincoln Financial Field",
    "city": "Philadelphia",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "France v Iraq",
    "match_zh": "法国 vs 伊拉克"
  },
  {
    "id": 43,
    "date": "2026-06-22",
    "time_pt": "10:00 AM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Argentina v Austria",
    "match_zh": "阿根廷 vs 奥地利"
  },
  {
    "id": 44,
    "date": "2026-06-22",
    "time_pt": "8:00 PM PT",
    "venue": "Levi's Stadium",
    "city": "San Francisco Bay Area",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Jordan v Algeria",
    "match_zh": "约旦 vs 阿尔及利亚"
  },
  {
    "id": 45,
    "date": "2026-06-23",
    "time_pt": "1:00 PM PT",
    "venue": "Gillette Stadium",
    "city": "Boston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "England v Ghana",
    "match_zh": "英格兰 vs 加纳"
  },
  {
    "id": 46,
    "date": "2026-06-23",
    "time_pt": "4:00 PM PT",
    "venue": "BMO Field",
    "city": "Toronto",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Panama v Croatia",
    "match_zh": "巴拿马 vs 克罗地亚"
  },
  {
    "id": 47,
    "date": "2026-06-23",
    "time_pt": "10:00 AM PT",
    "venue": "NRG Stadium",
    "city": "Houston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Portugal v Uzbekistan",
    "match_zh": "葡萄牙 vs 乌兹别克斯坦"
  },
  {
    "id": 48,
    "date": "2026-06-23",
    "time_pt": "7:00 PM PT",
    "venue": "Estadio Akron",
    "city": "Guadalajara",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Colombia v Congo DR",
    "match_zh": "哥伦比亚 vs 刚果民主共和国"
  },
  {
    "id": 49,
    "date": "2026-06-24",
    "time_pt": "3:00 PM PT",
    "venue": "Hard Rock Stadium",
    "city": "Miami",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Scotland v Brazil",
    "match_zh": "苏格兰 vs 巴西"
  },
  {
    "id": 50,
    "date": "2026-06-24",
    "time_pt": "3:00 PM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Morocco v Haiti",
    "match_zh": "摩洛哥 vs 海地"
  },
  {
    "id": 51,
    "date": "2026-06-24",
    "time_pt": "12:00 PM PT",
    "venue": "BC Place",
    "city": "Vancouver",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Switzerland v Canada",
    "match_zh": "瑞士 vs 加拿大"
  },
  {
    "id": 52,
    "date": "2026-06-24",
    "time_pt": "12:00 PM PT",
    "venue": "Lumen Field",
    "city": "Seattle",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Bosnia and Herzegovina v Qatar",
    "match_zh": "波斯尼亚和黑塞哥维那 vs 卡塔尔"
  },
  {
    "id": 53,
    "date": "2026-06-24",
    "time_pt": "6:00 PM PT",
    "venue": "Estadio Azteca",
    "city": "Mexico City",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Czechia v Mexico",
    "match_zh": "捷克 vs 墨西哥"
  },
  {
    "id": 54,
    "date": "2026-06-24",
    "time_pt": "6:00 PM PT",
    "venue": "Estadio BBVA",
    "city": "Monterrey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "South Africa v South Korea",
    "match_zh": "南非 vs 韩国"
  },
  {
    "id": 55,
    "date": "2026-06-25",
    "time_pt": "1:00 PM PT",
    "venue": "Lincoln Financial Field",
    "city": "Philadelphia",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Curaçao v Ivory Coast",
    "match_zh": "库拉索 vs 科特迪瓦"
  },
  {
    "id": 56,
    "date": "2026-06-25",
    "time_pt": "1:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Ecuador v Germany",
    "match_zh": "厄瓜多尔 vs 德国"
  },
  {
    "id": 57,
    "date": "2026-06-25",
    "time_pt": "4:00 PM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Japan v Sweden",
    "match_zh": "日本 vs 瑞典"
  },
  {
    "id": 58,
    "date": "2026-06-25",
    "time_pt": "4:00 PM PT",
    "venue": "Arrowhead Stadium",
    "city": "Kansas City",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Tunisia v Netherlands",
    "match_zh": "突尼斯 vs 荷兰"
  },
  {
    "id": 59,
    "date": "2026-06-25",
    "time_pt": "7:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Türkiye v USA",
    "match_zh": "土耳其 vs 美国"
  },
  {
    "id": 60,
    "date": "2026-06-25",
    "time_pt": "7:00 PM PT",
    "venue": "Levi's Stadium",
    "city": "San Francisco Bay Area",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Paraguay v Australia",
    "match_zh": "巴拉圭 vs 澳大利亚"
  },
  {
    "id": 61,
    "date": "2026-06-26",
    "time_pt": "12:00 PM PT",
    "venue": "Gillette Stadium",
    "city": "Boston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Norway v France",
    "match_zh": "挪威 vs 法国"
  },
  {
    "id": 62,
    "date": "2026-06-26",
    "time_pt": "12:00 PM PT",
    "venue": "BMO Field",
    "city": "Toronto",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Senegal v Iraq",
    "match_zh": "塞内加尔 vs 伊拉克"
  },
  {
    "id": 63,
    "date": "2026-06-26",
    "time_pt": "8:00 PM PT",
    "venue": "Lumen Field",
    "city": "Seattle",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Egypt v Iran",
    "match_zh": "埃及 vs 伊朗"
  },
  {
    "id": 64,
    "date": "2026-06-26",
    "time_pt": "8:00 PM PT",
    "venue": "BC Place",
    "city": "Vancouver",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "New Zealand v Belgium",
    "match_zh": "新西兰 vs 比利时"
  },
  {
    "id": 65,
    "date": "2026-06-26",
    "time_pt": "5:00 PM PT",
    "venue": "NRG Stadium",
    "city": "Houston",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Cape Verde v Saudi Arabia",
    "match_zh": "佛得角 vs 沙特阿拉伯"
  },
  {
    "id": 66,
    "date": "2026-06-26",
    "time_pt": "5:00 PM PT",
    "venue": "Estadio Akron",
    "city": "Guadalajara",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Uruguay v Spain",
    "match_zh": "乌拉圭 vs 西班牙"
  },
  {
    "id": 67,
    "date": "2026-06-27",
    "time_pt": "2:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Panama v England",
    "match_zh": "巴拿马 vs 英格兰"
  },
  {
    "id": 68,
    "date": "2026-06-27",
    "time_pt": "2:00 PM PT",
    "venue": "Lincoln Financial Field",
    "city": "Philadelphia",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Croatia v Ghana",
    "match_zh": "克罗地亚 vs 加纳"
  },
  {
    "id": 69,
    "date": "2026-06-27",
    "time_pt": "7:00 PM PT",
    "venue": "Arrowhead Stadium",
    "city": "Kansas City",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Algeria v Austria",
    "match_zh": "阿尔及利亚 vs 奥地利"
  },
  {
    "id": 70,
    "date": "2026-06-27",
    "time_pt": "7:00 PM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Jordan v Argentina",
    "match_zh": "约旦 vs 阿根廷"
  },
  {
    "id": 71,
    "date": "2026-06-27",
    "time_pt": "4:30 PM PT",
    "venue": "Hard Rock Stadium",
    "city": "Miami",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Colombia v Portugal",
    "match_zh": "哥伦比亚 vs 葡萄牙"
  },
  {
    "id": 72,
    "date": "2026-06-27",
    "time_pt": "4:30 PM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Group Stage",
    "round_zh": "小组赛",
    "match_en": "Congo DR v Uzbekistan",
    "match_zh": "刚果民主共和国 vs 乌兹别克斯坦"
  },
  {
    "id": 73,
    "date": "2026-06-28",
    "time_pt": "12:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group A Runners Up v Group B Runners Up",
    "match_zh": "A组亚军 vs B组亚军"
  },
  {
    "id": 74,
    "date": "2026-06-29",
    "time_pt": "1:30 PM PT",
    "venue": "Gillette Stadium",
    "city": "Boston",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group E Winners v Group A/B/C/D/F 3rd Place",
    "match_zh": "E组冠军 vs A/B/C/D/F组第三名"
  },
  {
    "id": 75,
    "date": "2026-06-29",
    "time_pt": "6:00 PM PT",
    "venue": "Estadio BBVA",
    "city": "Monterrey",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group F Winners v Group C Runners Up",
    "match_zh": "F组冠军 vs C组亚军"
  },
  {
    "id": 76,
    "date": "2026-06-29",
    "time_pt": "10:00 AM PT",
    "venue": "NRG Stadium",
    "city": "Houston",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group C Winners v Group F Runners Up",
    "match_zh": "C组冠军 vs F组亚军"
  },
  {
    "id": 77,
    "date": "2026-06-30",
    "time_pt": "2:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group I Winners v Group C/D/F/G/H 3rd Place",
    "match_zh": "I组冠军 vs C/D/F/G/H组第三名"
  },
  {
    "id": 78,
    "date": "2026-06-30",
    "time_pt": "10:00 AM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group E Runners Up v Group I Runners Up",
    "match_zh": "E组亚军 vs I组亚军"
  },
  {
    "id": 79,
    "date": "2026-06-30",
    "time_pt": "6:00 PM PT",
    "venue": "Estadio Azteca",
    "city": "Mexico City",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group A Winners v Group C/E/F/H/I 3rd Place",
    "match_zh": "A组冠军 vs C/E/F/H/I组第三名"
  },
  {
    "id": 80,
    "date": "2026-07-01",
    "time_pt": "9:00 AM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group L Winners v Group E/H/I/J/K 3rd Place",
    "match_zh": "L组冠军 vs E/H/I/J/K组第三名"
  },
  {
    "id": 81,
    "date": "2026-07-01",
    "time_pt": "5:00 PM PT",
    "venue": "Levi's Stadium",
    "city": "San Francisco Bay Area",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group D Winners v Group B/E/F/I/J 3rd Place",
    "match_zh": "D组冠军 vs B/E/F/I/J组第三名"
  },
  {
    "id": 82,
    "date": "2026-07-01",
    "time_pt": "1:00 PM PT",
    "venue": "Lumen Field",
    "city": "Seattle",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group G Winners v Group A/E/H/I/J 3rd Place",
    "match_zh": "G组冠军 vs A/E/H/I/J组第三名"
  },
  {
    "id": 83,
    "date": "2026-07-02",
    "time_pt": "4:00 PM PT",
    "venue": "BMO Field",
    "city": "Toronto",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group K Runners Up v Group L Runners Up",
    "match_zh": "K组亚军 vs L组亚军"
  },
  {
    "id": 84,
    "date": "2026-07-02",
    "time_pt": "12:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group H Winners v Group J Runners Up",
    "match_zh": "H组冠军 vs J组亚军"
  },
  {
    "id": 85,
    "date": "2026-07-02",
    "time_pt": "8:00 PM PT",
    "venue": "BC Place",
    "city": "Vancouver",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group B Winners v Group E/F/G/I/J 3rd Place",
    "match_zh": "B组冠军 vs E/F/G/I/J组第三名"
  },
  {
    "id": 86,
    "date": "2026-07-03",
    "time_pt": "3:00 PM PT",
    "venue": "Hard Rock Stadium",
    "city": "Miami",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group J Winners v Group H Runners Up",
    "match_zh": "J组冠军 vs H组亚军"
  },
  {
    "id": 87,
    "date": "2026-07-03",
    "time_pt": "6:30 PM PT",
    "venue": "Arrowhead Stadium",
    "city": "Kansas City",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group K Winners v Group D/E/I/J/L 3rd Place",
    "match_zh": "K组冠军 vs D/E/I/J/L组第三名"
  },
  {
    "id": 88,
    "date": "2026-07-03",
    "time_pt": "11:00 AM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Round of 32",
    "round_zh": "32强赛",
    "match_en": "Group D Runners Up v Group G Runners Up",
    "match_zh": "D组亚军 vs G组亚军"
  },
  {
    "id": 89,
    "date": "2026-07-04",
    "time_pt": "2:00 PM PT",
    "venue": "Lincoln Financial Field",
    "city": "Philadelphia",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 74 Winner v Match 77 Winner",
    "match_zh": "第74场胜者 vs 第77场胜者"
  },
  {
    "id": 90,
    "date": "2026-07-04",
    "time_pt": "10:00 AM PT",
    "venue": "NRG Stadium",
    "city": "Houston",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 73 Winner v Match 75 Winner",
    "match_zh": "第73场胜者 vs 第75场胜者"
  },
  {
    "id": 91,
    "date": "2026-07-05",
    "time_pt": "1:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 76 Winner v Match 78 Winner",
    "match_zh": "第76场胜者 vs 第78场胜者"
  },
  {
    "id": 92,
    "date": "2026-07-05",
    "time_pt": "5:00 PM PT",
    "venue": "Estadio Azteca",
    "city": "Mexico City",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 79 Winner v Match 80 Winner",
    "match_zh": "第79场胜者 vs 第80场胜者"
  },
  {
    "id": 93,
    "date": "2026-07-06",
    "time_pt": "12:00 PM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 83 Winner v Match 84 Winner",
    "match_zh": "第83场胜者 vs 第84场胜者"
  },
  {
    "id": 94,
    "date": "2026-07-06",
    "time_pt": "5:00 PM PT",
    "venue": "Lumen Field",
    "city": "Seattle",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 81 Winner v Match 82 Winner",
    "match_zh": "第81场胜者 vs 第82场胜者"
  },
  {
    "id": 95,
    "date": "2026-07-07",
    "time_pt": "9:00 AM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 86 Winner v Match 88 Winner",
    "match_zh": "第86场胜者 vs 第88场胜者"
  },
  {
    "id": 96,
    "date": "2026-07-07",
    "time_pt": "1:00 PM PT",
    "venue": "BC Place",
    "city": "Vancouver",
    "round_en": "Round of 16",
    "round_zh": "1/8决赛",
    "match_en": "Match 85 Winner v Match 87 Winner",
    "match_zh": "第85场胜者 vs 第87场胜者"
  },
  {
    "id": 97,
    "date": "2026-07-09",
    "time_pt": "1:00 PM PT",
    "venue": "Gillette Stadium",
    "city": "Boston",
    "round_en": "Quarter-finals",
    "round_zh": "1/4决赛",
    "match_en": "Match 89 Winner v Match 90 Winner",
    "match_zh": "第89场胜者 vs 第90场胜者"
  },
  {
    "id": 98,
    "date": "2026-07-10",
    "time_pt": "12:00 PM PT",
    "venue": "SoFi Stadium",
    "city": "Los Angeles",
    "round_en": "Quarter-finals",
    "round_zh": "1/4决赛",
    "match_en": "Match 93 Winner v Match 94 Winner",
    "match_zh": "第93场胜者 vs 第94场胜者"
  },
  {
    "id": 99,
    "date": "2026-07-11",
    "time_pt": "2:00 PM PT",
    "venue": "Hard Rock Stadium",
    "city": "Miami",
    "round_en": "Quarter-finals",
    "round_zh": "1/4决赛",
    "match_en": "Match 91 Winner v Match 92 Winner",
    "match_zh": "第91场胜者 vs 第92场胜者"
  },
  {
    "id": 100,
    "date": "2026-07-11",
    "time_pt": "6:00 PM PT",
    "venue": "Arrowhead Stadium",
    "city": "Kansas City",
    "round_en": "Quarter-finals",
    "round_zh": "1/4决赛",
    "match_en": "Match 95 Winner v Match 96 Winner",
    "match_zh": "第95场胜者 vs 第96场胜者"
  },
  {
    "id": 101,
    "date": "2026-07-14",
    "time_pt": "12:00 PM PT",
    "venue": "AT&T Stadium",
    "city": "Dallas",
    "round_en": "Semi-finals",
    "round_zh": "半决赛",
    "match_en": "Match 97 Winner v Match 98 Winner",
    "match_zh": "第97场胜者 vs 第98场胜者"
  },
  {
    "id": 102,
    "date": "2026-07-15",
    "time_pt": "12:00 PM PT",
    "venue": "Mercedes-Benz Stadium",
    "city": "Atlanta",
    "round_en": "Semi-finals",
    "round_zh": "半决赛",
    "match_en": "Match 99 Winner v Match 100 Winner",
    "match_zh": "第99场胜者 vs 第100场胜者"
  },
  {
    "id": 103,
    "date": "2026-07-18",
    "time_pt": "2:00 PM PT",
    "venue": "Hard Rock Stadium",
    "city": "Miami",
    "round_en": "Third Place",
    "round_zh": "三四名决赛",
    "match_en": "Match 101 Loser v Match 102 Loser",
    "match_zh": "第101场负者 vs 第102场负者"
  },
  {
    "id": 104,
    "date": "2026-07-19",
    "time_pt": "12:00 PM PT",
    "venue": "MetLife Stadium",
    "city": "New York/New Jersey",
    "round_en": "Final",
    "round_zh": "决赛",
    "match_en": "Match 101 Winner v Match 102 Winner",
    "match_zh": "第101场胜者 vs 第102场胜者"
  }
];

const roundLabels = {
  en: {
    "Group Stage": "Group Stage",
    "Round of 32": "Round of 32",
    "Round of 16": "Round of 16",
    "Quarter-finals": "Quarter-finals",
    "Semi-finals": "Semi-finals",
    "Third Place": "Third Place",
    "Final": "Final",
  },
  zh: {
    "Group Stage": "小组赛",
    "Round of 32": "32强赛",
    "Round of 16": "1/8决赛",
    "Quarter-finals": "1/4决赛",
    "Semi-finals": "半决赛",
    "Third Place": "三四名决赛",
    "Final": "决赛",
  },
};

const ui = {
  en: {
    title: "2026 FIFA World Cup Schedule",
    subtitle: "Static bilingual schedule. Times are shown in Pacific Time (PT).",
    language: "Language",
    english: "English",
    chinese: "Simplified Chinese",
    total: "Total matches",
    showing: "Showing",
    searchMatch: "Search match",
    date: "Date",
    time: "Time",
    venue: "Venue / Stadium",
    round: "Round",
    clear: "Clear filters",
    filters: "Filters",
    helper: "Use any combination of filters to narrow the schedule.",
    noResults: "No matches found.",
    match: "Match",
    city: "City",
    allRounds: "All rounds",
    cards: "matches",
    pt: "PT",
    showFilters: "Show filters",
    hideFilters: "Hide filters",
    filtersCollapsed: "Filters are hidden to save space.",
    quickFilters: "Quick chips",
    allDates: "All dates",
    allTimes: "All times",
    allVenues: "All venues",
    allMatches: "All matches",
  },
  zh: {
    title: "2026年国际足联世界杯赛程",
    subtitle: "静态双语赛程表，时间均为太平洋时间（PT）。",
    language: "语言",
    english: "英文",
    chinese: "简体中文",
    total: "总场次",
    showing: "当前显示",
    searchMatch: "搜索比赛",
    date: "日期",
    time: "时间",
    venue: "场馆 / 体育场",
    round: "阶段",
    clear: "清除筛选",
    filters: "筛选",
    helper: "可组合使用任意筛选条件快速定位赛程。",
    noResults: "未找到符合条件的比赛。",
    match: "比赛",
    city: "城市",
    allRounds: "全部阶段",
    cards: "场比赛",
    pt: "PT",
    showFilters: "展开筛选",
    hideFilters: "收起筛选",
    filtersCollapsed: "筛选已收起，以节省页面空间。",
    quickFilters: "快捷标签",
    allDates: "全部日期",
    allTimes: "全部时间",
    allVenues: "全部场馆",
    allMatches: "全部比赛",
  },
};

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function RoundBadge({ roundEn, lang }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-white/85 ring-1 ring-white/10">
      {roundLabels[lang][roundEn] ?? roundEn}
    </span>
  );
}

function FieldLabel({ children }) {
  return <span className="text-xs font-medium uppercase tracking-wide text-white/60">{children}</span>;
}

function DesktopSelect({ icon: Icon, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/40 py-3 pl-10 pr-10 text-sm text-white outline-none ring-0 transition focus:border-emerald-400 focus:bg-slate-950/70 focus:ring-2 focus:ring-emerald-400/30"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function MobileChipGroup({ label, value, onChange, options, allLabel }) {
  return (
    <div className="grid gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => onChange("")}
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition ring-1 ${
            value === "" ? "bg-emerald-400 text-slate-950 ring-emerald-200" : "bg-white/8 text-white/75 ring-white/10"
          }`}
        >
          {allLabel}
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition ring-1 ${
              value === option.value ? "bg-amber-400 text-slate-950 ring-amber-200" : "bg-white/8 text-white/75 ring-white/10"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileMatchInput({ value, onChange, placeholder }) {
  return (
    <div className="grid gap-2">
      <FieldLabel>Match</FieldLabel>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none ring-0 transition placeholder:text-white/35 focus:border-emerald-400 focus:bg-slate-950/70 focus:ring-2 focus:ring-emerald-400/30"
      />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [matchQuery, setMatchQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [timeQuery, setTimeQuery] = useState("");
  const [venueQuery, setVenueQuery] = useState("");
  const [roundQuery, setRoundQuery] = useState("");

  const copy = ui[lang];

  const matches = useMemo(() => schedule, []);
  const dates = useMemo(() => Array.from(new Set(schedule.map((item) => item.date))).sort(), []);
  const times = useMemo(
    () => Array.from(new Set(schedule.map((item) => item.time_pt))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    []
  );
  const venues = useMemo(() => Array.from(new Set(schedule.map((item) => item.venue))).sort((a, b) => a.localeCompare(b)), []);
  const rounds = useMemo(() => Array.from(new Set(schedule.map((item) => item.round_en))), []);

  const filteredSchedule = useMemo(() => {
    const mq = normalize(matchQuery);
    const dq = normalize(dateQuery);
    const tq = normalize(timeQuery);
    const vq = normalize(venueQuery);
    const rq = normalize(roundQuery);

    return schedule.filter((item) => {
      const matchText = normalize(String(item.id));
      const matchEnglish = normalize(item.match_en);
      const matchChinese = normalize(item.match_zh);
      const dateText = normalize(item.date);
      const timeText = normalize(item.time_pt);
      const venueText = normalize(item.venue);
      const cityText = normalize(item.city);
      const roundText = normalize(item.round_en);

      const matchOk = !mq || matchText === mq || matchEnglish.includes(mq) || matchChinese.includes(mq);
      const dateOk = !dq || dateText === dq;
      const timeOk = !tq || timeText === tq;
      const venueOk = !vq || venueText === vq || cityText === vq;
      const roundOk = !rq || roundText === rq;

      return matchOk && dateOk && timeOk && venueOk && roundOk;
    });
  }, [dateQuery, matchQuery, roundQuery, timeQuery, venueQuery]);

  const clearFilters = () => {
    setMatchQuery("");
    setDateQuery("");
    setTimeQuery("");
    setVenueQuery("");
    setRoundQuery("");
  };

  const activeFilterCount = [matchQuery, dateQuery, timeQuery, venueQuery, roundQuery].filter(Boolean).length;

  const mobileDateOptions = dates.map((date) => ({ value: date, label: date }));
  const mobileTimeOptions = times.map((time) => ({ value: time, label: time }));
  const mobileVenueOptions = venues.map((venue) => ({ value: venue, label: venue }));
  const mobileRoundOptions = rounds.map((round) => ({ value: round, label: roundLabels[lang][round] ?? round }));
  const desktopMatchOptions = matches.map((item) => ({ value: String(item.id), label: lang === "en" ? item.match_en : item.match_zh }));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.18),_transparent_28%),linear-gradient(180deg,#06111f_0%,#0b1b2f_42%,#10263b_100%)] text-slate-50">
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
          <div className="px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="shrink-0 rounded-2xl border border-white/10 bg-white/10 p-1 shadow-lg shadow-black/20 backdrop-blur">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition ${lang === "en" ? "bg-emerald-400 text-slate-950 shadow-sm" : "text-white/60"}`}
                    aria-pressed={lang === "en"}
                  >
                    <Languages className="mr-1 inline h-4 w-4" />
                    {copy.english}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("zh")}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition ${lang === "zh" ? "bg-amber-400 text-slate-950 shadow-sm" : "text-white/60"}`}
                    aria-pressed={lang === "zh"}
                  >
                    <Languages className="mr-1 inline h-4 w-4" />
                    {copy.chinese}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 flex-1 px-4 py-4 sm:px-6">
          {filtersOpen ? (
            <section className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-emerald-300" />
                <h2 className="text-base font-semibold text-white">{copy.filters}</h2>
              </div>
              <p className="mt-1 text-sm text-white/70">{copy.helper}</p>

              <div className="mt-4 grid gap-4">
                <div className="sm:hidden">
                  <MobileMatchInput value={matchQuery} onChange={setMatchQuery} placeholder={copy.searchMatch} />
                </div>

                <div className="hidden sm:grid sm:grid-cols-2 sm:gap-3">
                  <label className="grid gap-1.5 sm:col-span-2">
                    <FieldLabel>{copy.match}</FieldLabel>
                    <DesktopSelect
                      icon={Trophy}
                      value={matchQuery}
                      onChange={setMatchQuery}
                      options={desktopMatchOptions}
                      placeholder={copy.allMatches}
                    />
                  </label>

                  <label className="grid gap-1.5">
                    <FieldLabel>{copy.date}</FieldLabel>
                    <DesktopSelect
                      icon={CalendarDays}
                      value={dateQuery}
                      onChange={setDateQuery}
                      options={mobileDateOptions}
                      placeholder={copy.allDates}
                    />
                  </label>

                  <label className="grid gap-1.5">
                    <FieldLabel>{copy.time}</FieldLabel>
                    <DesktopSelect
                      icon={Clock3}
                      value={timeQuery}
                      onChange={setTimeQuery}
                      options={mobileTimeOptions}
                      placeholder={copy.allTimes}
                    />
                  </label>

                  <label className="grid gap-1.5">
                    <FieldLabel>{copy.venue}</FieldLabel>
                    <DesktopSelect
                      icon={MapPin}
                      value={venueQuery}
                      onChange={setVenueQuery}
                      options={mobileVenueOptions}
                      placeholder={copy.allVenues}
                    />
                  </label>

                  <label className="grid gap-1.5">
                    <FieldLabel>{copy.round}</FieldLabel>
                    <DesktopSelect
                      icon={Trophy}
                      value={roundQuery}
                      onChange={setRoundQuery}
                      options={mobileRoundOptions}
                      placeholder={copy.allRounds}
                    />
                  </label>
                </div>

                <div className="sm:hidden grid gap-4">
                  <MobileChipGroup label={copy.date} value={dateQuery} onChange={setDateQuery} options={mobileDateOptions} allLabel={copy.allDates} />
                  <MobileChipGroup label={copy.time} value={timeQuery} onChange={setTimeQuery} options={mobileTimeOptions} allLabel={copy.allTimes} />
                  <MobileChipGroup label={copy.venue} value={venueQuery} onChange={setVenueQuery} options={mobileVenueOptions} allLabel={copy.allVenues} />
                  <MobileChipGroup label={copy.round} value={roundQuery} onChange={setRoundQuery} options={mobileRoundOptions} allLabel={copy.allRounds} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="text-sm text-white/70">
                    {filteredSchedule.length} / {schedule.length} {lang === "en" ? "matches" : "场比赛"}
                  </div>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/30 bg-gradient-to-r from-emerald-400 to-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-105"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    {copy.clear}
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          <section className="mt-5 space-y-3">
            {filteredSchedule.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-8 text-center text-sm text-white/70 backdrop-blur">
                {copy.noResults}
              </div>
            ) : (
              filteredSchedule.map((item) => {
                const primaryMatch = lang === "zh" ? item.match_zh : item.match_en;
                const secondaryMatch = lang === "zh" ? item.match_en : item.match_zh;
                const primaryRound = roundLabels[lang][item.round_en] ?? item.round_en;
                const secondaryRound = roundLabels[lang === "zh" ? "en" : "zh"][item.round_en] ?? item.round_en;

                return (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-400 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
                          {item.id}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                              {copy.match} {item.id}
                            </span>
                            <RoundBadge roundEn={item.round_en} lang={lang} />
                          </div>
                          <h3 className="mt-1 text-lg font-semibold leading-snug text-white">{primaryMatch}</h3>
                          <p className="mt-1 text-sm text-white/70">{secondaryMatch}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 rounded-2xl bg-slate-950/35 p-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wide text-white/60">{copy.date}</div>
                          <div className="mt-1 text-sm font-semibold">{item.date}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wide text-white/60">{copy.time}</div>
                          <div className="mt-1 text-sm font-semibold">{item.time_pt}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wide text-white/60">{copy.venue}</div>
                          <div className="mt-1 text-sm font-semibold">{item.venue}</div>
                          <div className="mt-0.5 text-sm text-white/70">{item.city}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wide text-white/60">{copy.round}</div>
                          <div className="mt-1 text-sm font-semibold">{primaryRound}</div>
                          <div className="mt-0.5 text-sm text-white/70">{secondaryRound}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </main>

        <footer className="px-4 pb-8 pt-2 text-center text-xs text-white/65 sm:px-6">
          {lang === "en"
            ? "Built as a static schedule page with no backend or fetch requests."
            : "这是一个静态赛程页面，不包含后端或数据请求。"}
        </footer>
      </div>
    </div>
  );
}
