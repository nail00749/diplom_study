export interface ITest {
    lesson_id: number
    description: string
    questions: IQuestion[]
    id: number
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
    id?: string

}
