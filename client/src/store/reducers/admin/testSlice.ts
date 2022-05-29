import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAnswer, IQuestion, ITest} from "../../../models/ITest";
import {ILesson} from "../../../models/ILesson";


export interface TestState {
    open: boolean
    questions: IQuestion[]
    description: string
    descriptionError: boolean
    isUpdate: boolean | undefined
    id?: string
    lesson: ILesson | null
    lessonError: boolean,
}

const initialState: TestState = {
    open: false,
    questions: [],
    description: '',
    descriptionError: false,
    isUpdate: false,
    lesson: null,
    lessonError: false
}

interface ITextChange {
    index: number,
    text: string
}

interface IAnswerPayload {
    indexQuestion: number,
    indexAnswer: number,
    value?: string
}

interface openPayload {
    lessons: ILesson[] | null | undefined
    isUpdate: boolean | undefined
    test: ITest
}

export const testSlice = createSlice({
    name: 'testCreate',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<openPayload | undefined>) => {
            if (action.payload) {
                const {test, lessons, isUpdate} = action.payload
                state.description = test.description
                const lesson = lessons?.find(l => l._id === test.lesson)
                state.lesson = lesson as ILesson
                state.questions = test.questions
                state.isUpdate = isUpdate
                if(isUpdate){
                    state.id = test!._id
                }
            }
            state.open = true
        },
        closeModal: () => initialState,
        changeDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
            state.descriptionError = false
        },
        errorDescriptionChange: (state) => {
            state.descriptionError = true
        },
        changeLesson: (state, action: PayloadAction<ILesson | null>) => {
            state.lesson = action.payload
            state.lessonError = false
        },
        errorLessonChange: (state) => {
            state.lessonError = true
        },
        addQuestion: (state) => {
            const question: IQuestion = {
                text: '',
                answers: [],
                is_extended: false,
                is_multiple: false,
                id: Date.now().toString()
            }
            state.questions.push(question)
        },
        textQuestion: (state, action: PayloadAction<ITextChange>) => {
            const {index, text} = action.payload
            state.questions[index].text = text
        },
        deleteQuestion: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.filter((item, i) => i !== action.payload)
        },
        extensionChange: (state, action: PayloadAction<number>) => {
            state.questions[action.payload].is_extended = !state.questions[action.payload].is_extended
        },
        multipleChange: (state, action: PayloadAction<number>) => {
            state.questions[action.payload].is_multiple = !state.questions[action.payload].is_multiple
        },
        addAnswer: (state, action: PayloadAction<number>) => {
            const answer: IAnswer = {
                text: '',
                is_correct: false,
                id: Date.now()
            }
            state.questions[action.payload].answers.push(answer)
        },
        deleteAnswer: (state, action: PayloadAction<IAnswerPayload>) => {
            const {indexQuestion: i, indexAnswer: j} = action.payload
            state.questions[action.payload.indexQuestion].answers = state.questions[i].answers
                .filter((_, k) => k !== j)
        },
        textAnswer: (state, action: PayloadAction<IAnswerPayload>) => {
            const {indexQuestion: i, indexAnswer: j} = action.payload
            const answers = state.questions[i].answers
            answers[j].text = action.payload.value!
            state.questions[i].answers = answers
        },
        correctAnswer: (state, action: PayloadAction<IAnswerPayload>) => {
            const {indexQuestion: i, indexAnswer: j} = action.payload
            const answers = state.questions[i].answers
            answers[j].is_correct = !answers[j].is_correct
            const count = answers.reduce((acc, curr) => curr.is_correct ? acc + 1 : acc, 0)

            if (count > 1) {
                state.questions[i].is_multiple = true
            }
            state.questions[i].answers = answers
        },

    }
})

export const {
    addQuestion,
    textQuestion,
    deleteQuestion,
    closeModal,
    extensionChange,
    multipleChange,
    addAnswer,
    deleteAnswer,
    textAnswer,
    correctAnswer,
    changeDescription,
    changeLesson,
    errorDescriptionChange,
    errorLessonChange,
    openModal
} = testSlice.actions

export default testSlice.reducer
