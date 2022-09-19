const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function daysFromToday(dateString) {
    return datediff(new Date(), new Date(dateString));
}

function datediff(first, second) {
    return Math.abs(Math.floor((first - second) / MS_PER_DAY));
}
