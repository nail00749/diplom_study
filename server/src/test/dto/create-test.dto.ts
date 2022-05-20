export class CreateTestDto {
    lesson: number
    description: string
    questions: IQuestion[]
}

interface IQuestion {
    answers: IAnswer[],
    is_extended?: boolean,
    is_multiple?: boolean,
}

interface IAnswer {
    text: string,
    is_correct?: boolean,
}


