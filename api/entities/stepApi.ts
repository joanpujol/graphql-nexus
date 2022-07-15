import {Db} from './db'
import {Step} from './typeDefs'

export class StepAPI {
    private database: Db

    constructor(db: Db) {
        this.database = db
    }

    getStepsByStageId(stageId: string): Step[] {
        return this.database.steps.filter(step => step.stageId == stageId)
    }

    getStepsWithPagination(pageSize: number, page:number): Step[] {
        if (this.database.steps.length < pageSize) return this.database.steps
        if (page < 1) page = 1 // Defaults page to 1 if page is 0 or negative
        const totalPages = Math.ceil(this.database.steps.length / pageSize)
        if (page > totalPages) page = totalPages // Defaults to the last page
        if (page == totalPages) return this.database.steps.slice(pageSize * (page -1), this.database.steps.length)
        else return this.database.steps.slice(pageSize * (page -1), pageSize * page)
    }
}
