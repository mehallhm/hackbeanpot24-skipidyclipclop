export function calc_best_times(
  calendars,
  eventLength,
  startDate,
  endDate,
  dayStartHour,
  dayStartMinute,
  dayEndHour,
  dayEndMinute
) {
  let possibleTimes = [];
  let currentDate = startDate.getDate();

  // Calculate the possible times for the event
  while (currentDate <= endDate.getDate()) {
    let currentTime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      currentDate,
      dayStartHour,
      dayStartMinute
    );
    let endTime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      currentDate,
      dayEndHour,
      dayEndMinute
    );
    while (currentTime <= endTime) {
      possibleTimes.push(currentTime);
      currentTime = new Date(currentTime.getTime() + 15 * 60000);
    }
    currentDate++;
  }

  // Calculate the weight of each possible time
  let possibleTimesWeight = [];
  for (let i = 0; i < possibleTimes.length; i++) {
    possibleTimesWeight.push([
      possibleTimes[i],
      calculateTimeWeight(
        possibleTimes[i],
        new Date(possibleTimes[i].getTime() + eventLength * 60000),
        calendars,
        dayStartHour,
        dayEndHour
      ),
    ]);
  }

  // Sort the possible times by weight
  return possibleTimesWeight.sort(function (a, b) {
    return b[1] - a[1];
  });
}

function calculateTimeWeight(
  newEventStartTime,
  newEventEndTime,
  calendars,
  dayStartHour,
  dayEndHour
) {
  // Weight of the time
  let weight = 0;
  let middleOfEvent = new Date(
    newEventStartTime.getFullYear(),
    newEventStartTime.getMonth(),
    newEventStartTime.getDate(),
    (dayStartHour + dayEndHour) / 2,
    newEventStartTime.getMinutes()
  );
  let middleOfNewEvent = new Date(
    newEventStartTime.getFullYear(),
    newEventStartTime.getMonth(),
    newEventStartTime.getDate(),
    (newEventStartTime.getHours() + newEventEndTime.getHours()) / 2,
    newEventStartTime.getMinutes()
  );

  // Loop through each calendar
  calendars.forEach((calendar) => {
    {
      // Check if this (person's) calendar has a conflict with the new event
      let conflictWeight =
        calendar.filter((event) => {
          let startBusy = event["start"];
          let endBusy = event["end"];
          // If the new event overlaps with any other event, the weight is 0
          return (
            startBusy.getTime() <= newEventEndTime.getTime() &&
            endBusy.getTime() <= newEventStartTime.getTime()
          );
        }).length > 0
          ? 0
          : 100 * 0.5;

      // Calculate the weight of the time based on how close it is to the middle fo the time range
      let convientTimeWeight =
        10 *
        Math.pow(
          1 - 0.005,
          Math.abs(middleOfEvent.getMinutes() - middleOfNewEvent.getMinutes())
        );

      // Calculate the weight of the time based on how close it is to the start of the time range
      let closestStart = getTimeClosestToStart(calendar, newEventStartTime);
      let timeBeforeEventWeight =
        newEventStartTime.getTime() == closestStart.getTime()
          ? 20
          : 20 /
            (1 +
              Math.pow(
                Math.E,
                -Math.abs(
                  (newEventStartTime.getTime() - closestStart.getTime()) % 60000
                ) /
                  4 +
                  2
              ));

      // Calculate the weight of the time based on how close it is to the end of the time range
      let closestEnd = getTimeClosestToEnd(calendar, newEventEndTime);
      let timeAfterEventWeight =
        newEventEndTime.getTime() == closestEnd.getTime()
          ? 20
          : 20 /
            (1 +
              Math.pow(
                Math.E,
                -Math.abs(
                  (newEventEndTime.getTime() - closestEnd.getTime()) % 60000
                ) /
                  4 +
                  2
              ));

      // Sum weights
      weight +=
        conflictWeight +
        convientTimeWeight +
        timeBeforeEventWeight +
        timeAfterEventWeight;
    }
  });

  return weight / calendars.length;
}

// Calculate the the time closest to the start of the time range
function getTimeClosestToStart(calendar, time) {
  let filteredSortedCal = calendar
    .filter((event) => {
      let startBusy = event["start"];
      return (
        startBusy.getTime() < time.getTime() &&
        startBusy.getDay() == time.getDay() &&
        startBusy.getMonth() == time.getMonth()
      );
    })
    .sort((a, b) => {
      return b["start"].getTime() - a["start"].getTime();
    });
  return filteredSortedCal.length > 0 ? filteredSortedCal[0]["start"] : time;
}

// Calculate the the time closest to the end of the time range
function getTimeClosestToEnd(calendar, time) {
  let filteredSortedCal = calendar
    .filter((event) => {
      let endBusy = event["end"];
      return (
        endBusy.getTime() < time.getTime() &&
        endBusy.getDay() == time.getDay() &&
        endBusy.getMonth() == time.getMonth()
      );
    })
    .sort((a, b) => {
      return b["end"].getTime() - a["end"].getTime();
    });
  return filteredSortedCal.length > 0 ? filteredSortedCal[0]["end"] : time;
}
