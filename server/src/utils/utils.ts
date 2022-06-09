import * as uuid from 'uuid'

export const editFileName = (req: any, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) => {
    const fileExt = file.originalname.split('.').pop();
    const fileName = uuid.v4()
    callback(null, `${fileName}.${fileExt}`)
}

export const shuffleArray = (array: any[]): any[] => {
    let currentIndex = array.length,  randomIndex;


    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
