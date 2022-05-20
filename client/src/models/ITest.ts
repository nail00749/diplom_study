export interface ITest {
    lesson: string
    description: string
    questions: IQuestion[]
    _id?: string
}

export interface IQuestion {
    text: string,
    answers: IAnswer[],
    is_extended?: boolean,
    is_multiple?: boolean,
    id?: string
}

export interface IAnswer {
    text: string,
    is_correct?: boolean,
    id?: number

}
