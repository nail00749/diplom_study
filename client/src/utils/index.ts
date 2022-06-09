const regexp = new RegExp(/^(([^<>()\\[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/);

export const validateEmail = (email: string): boolean => {
    return regexp.test(email.toLowerCase())
};

export const noop = () => {}

export const shuffleArray = <T>(arr: T[]): T[] => {
    let array = [...arr]
    let currentIndex = array.length,  randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}
