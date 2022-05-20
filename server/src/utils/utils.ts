import * as uuid from 'uuid'

export const editFileName = (req: any, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) => {
    const fileExt = file.originalname.split('.').pop();
    const fileName = uuid.v4()
    callback(null, `${fileName}.${fileExt}`)
}
