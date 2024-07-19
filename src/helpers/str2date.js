export const DEFAULT_LOCALE = {
    months: "January February March April May June July August September October November December".split(" "),
    monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
    weekdaysMin: "Su Mo Tu We Th Fr Sa".split(" ")
}

export default (str, format) => {
    let norm, normFormat, fItems, dItems;
    let iMonth, iDay, iYear, iHour, iMinute, iSecond, iMs;
    let year, month, day, hour, minute, second, ms;
    let parsedMonth;

    const getIndex = function(where, what){
        return where.map(function(el){
            return el.toLowerCase();
        }).indexOf(what.toLowerCase());
    }

    const monthNameToNumber = function(month = 0){
        let i = -1;
        const names = DEFAULT_LOCALE;

        i = getIndex(names.months, month);

        if (i === -1) {
            month = month.substring(0, 3);
            i = getIndex(names.monthsShort, month);
        }

        return i === -1 ? -1 : i + 1;
    };

    const getPartIndex = function(part){
        const parts = {
            "month": ["M", "mm", "%m"],
            "day": ["D", "dd", "%d"],
            "year": ["YY", "YYYY", "yy", "yyyy", "%y"],
            "hour": ["h", "hh", "%h"],
            "minute": ["m", "mi", "i", "ii", "%i"],
            "second": ["s", "ss", "%s"],
            "ms": ["sss"]
        }

        let result = -1, key, index;

        for(let i = 0; i < parts[part].length; i++) {
            key = parts[part][i];
            index = fItems.indexOf(key);
            if (index !== -1) {
                result = index;
                break;
            }
        }

        return result;
    }

    if (!format) {
        return Date.parse(str);
    }

    norm = str.replace(/[\/,.:\s]/g, '-');
    normFormat = format.toLowerCase().replace(/[^a-zA-Z0-9%]/g, '-');
    fItems = normFormat.split('-');
    dItems = norm.split('-');

    if (norm.replace(/-/g,"").trim() === "") {
        return false
    }

    iMonth = getPartIndex("month");
    iDay = getPartIndex("day");
    iYear = getPartIndex("year");
    iHour = getPartIndex("hour");
    iMinute = getPartIndex("minute");
    iSecond = getPartIndex("second");
    iMs = getPartIndex("ms");

    if (iMonth > -1 && dItems[iMonth]) {
        if (isNaN(parseInt(dItems[iMonth]))) {
            dItems[iMonth] = monthNameToNumber(dItems[iMonth]);
            if (dItems[iMonth] === -1) {
                iMonth = -1;
            }
        } else {
            parsedMonth = parseInt(dItems[iMonth]);
            if (parsedMonth < 1 || parsedMonth > 12) {
                iMonth = -1;
            }
        }
    } else {
        iMonth = -1;
    }

    year  = iYear > -1 && dItems[iYear] ? dItems[iYear] : 0;
    month = iMonth > -1 && dItems[iMonth] ? dItems[iMonth] : 1;
    day   = iDay > -1 && dItems[iDay] ? dItems[iDay] : 1;

    hour    = iHour > -1 && dItems[iHour] ? dItems[iHour] : 0;
    minute  = iMinute > -1 && dItems[iMinute] ? dItems[iMinute] : 0;
    second  = iSecond > -1 && dItems[iSecond] ? dItems[iSecond] : 0;
    ms  = iMs > -1 && dItems[iMs] ? dItems[iMs] : 0;

    return new Date(year, month-1, day, hour, minute, second, ms);
}