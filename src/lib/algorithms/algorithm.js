function calc_best_times(calendars, eventLength, startDate, endDate, dayStartHour, dayStartMinute, dayEndHour, dayEndMinute) {
    let possibleTimes = [];
    let currentDate = startDate.getDate();

    // Calculate the possible times for the event
    while (currentDate <= endDate.getDate()) {
        let currentTime = new Date(startDate.getFullYear(), startDate.getMonth(), currentDate, dayStartHour, dayStartMinute);
        let endTime = new Date(startDate.getFullYear(), startDate.getMonth(), currentDate, dayEndHour, dayEndMinute);
        while (currentTime <= endTime) {
            possibleTimes.push(currentTime);
            currentTime = new Date(currentTime.getTime() + 15 * 60000);
        }
        currentDate++;
    }

    // Calculate the weight of each possible time
    let possibleTimesWeight = [];
    for (let time in possibleTimes) {
        possibleTimesWeight.push([time, calculateTimeWeight(time, new Date(time.getTime() + eventLength * 60000),
            calendars, dayStartHour, dayStartMinute, dayEndHour, dayStartEnd)]);
    }

    // Sort the possible times by weight
    return possibleTimesWeight.sort(function (a, b) { return b[1] - a[1]; });
}

function calculateTimeWeight(newEventStartTime, newEventEndTime, calendars, dayStartHour, dayStartMinute, dayEndHour, dayEndMinute) {
    let weight = 0;
    let conflict = false;
    outer: for (let calendar in calendars) {
        let i = 0;
        inner: while (i < calendar.length) {
            startBusy = calendar[i]["start"];
            endBusy = calendar[i]["end"];
            //time conflict
            if (startBusy >= newEventStartTime && endBusy <= newEventEndTime) {
                conflict = true;
                break inner;
            }
        }
        if (!conflict) {
            weight += 100 * 0.40;
            // start of new event minus end of last event, start of next event minus end of new event 

            endBusyPrevious = calendar[i].end;
            let difference1 = (newEventStartTime.getTime() - endBusyPrevious.getTime()) / 60000;
            let difference2 = 0;
            if (i + 1 < calendar.length) {
                startBusyNext = calendar[i + 1].start;
                difference2 = (startBusyNext.getTime() - newEventEndTime.getTime()) / 60000
            }
            weight += (Math.min(difference1 / 15, 1) * 100) * 0.15 + (Math.min(difference2 / 15, 1) * 100) * 0.25;

            let difference3 = (newEventStartTime.getHours() * 60 + newEventStartTime.getMinutes()) - (dayStartHour * 60 + dayStartMinute);
            let difference4 = (dayEndHour * 60 + dayEndMinute) - (newEventEndTime.getHours() * 60 + newEventEndTime.getMinutes());

            let difference5 = Math.abs(difference4 - difference3);
            weight += 100 * (1 - Math.min(1, (difference5)/60)) * 0.1;

        }

    }

    return weight / calendars.length;

}