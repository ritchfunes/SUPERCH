/**
 * Created by Roberto on 13/05/2016.
 */
function localTimeToUtc(dateTime){
    if(dateTime==null){
        return null;
    }else{
        var now = dateTime;
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        return moment(new Date(now_utc)).format('YYYY-MM-DD HH:mm:ss');
    }
}

function utcTimeToLocalTime(dateTime)
{
    if(dateTime==null) {
        return null;
    }else{
        var localTime  = moment.utc(dateTime).local().toDate();
        return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    }
}

function getTimeFromMins(mins) {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    if (mins >= 24 * 60 || mins < 0) {
        throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    }
    var h = mins / 60 | 0,
        m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format("hh:mm A");
}