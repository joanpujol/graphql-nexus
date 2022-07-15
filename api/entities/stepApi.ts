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
}
