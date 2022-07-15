export interface Stage {
    id: string
    title: string
    position: number
    completed: boolean
}

export interface Step {
    id: string
    title: string
    completed: boolean
    stageId: string
}
