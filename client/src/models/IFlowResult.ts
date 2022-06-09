export interface IFlowResult {
    _id: string
    user: string
    flow: string
    lessonVideosTimings: Record<string, number>
    moduleTasks: Record<string, IModuleTaskResult>
    testsResult: Record<string, ITestResult>
}

export interface IModuleTaskResult {
    mark: number
    response: string[]
}

export interface ITestResult {
    mark: number
    response: Record<string, string | string[] | ExtensionResponse>
}

interface ExtensionResponse {
    text: string
    isCorrect: boolean
}

