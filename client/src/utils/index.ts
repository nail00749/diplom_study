import {intervalToDuration} from 'date-fns'

const regexp = new RegExp(/^(([^<>()\\[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/);

export const validateEmail = (email: string): boolean => {
    return regexp.test(email.toLowerCase())
};

export const noop = () => {
}

export const shuffleArray = <T>(arr: T[]): T[] => {
    let array = [...arr]
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}

export const formatTime = (time: number): string => {
    let formattedDate = ''
    const duration = intervalToDuration({start: 0, end: time * 1000})
    if (duration.hours) {
        formattedDate += duration.hours + 'ч.'
    }
    if (duration.minutes) {
        formattedDate += duration.minutes + 'мин.'
    }
    if (duration.seconds) {
        formattedDate += duration.seconds + 'сек.'
    }


    return formattedDate
}
