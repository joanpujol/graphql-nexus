import {Db} from './db'
import {Stage} from './typeDefs'

export class StageAPI {
    private database: Db

    constructor(db: Db) {
        this.database = db
    }

    getStageById(id: string): Stage | undefined {
        return this.database.stages.find(step => step.id == id)
    }

    getAllStages(): Stage[] {
        return this.database.stages
    }
}
