import {Db} from './db'
import {Stage} from './typeDefs'

export class StageAPI {
    private database: Db

    constructor(db: Db) {
        this.database = db
    }

    getStageById(id: string | null | undefined): Stage | null {
        const stage = this.database.stages.find(step => step.id == id)
        return stage ? stage: null
    }

    getAllStages(): Stage[] {
        return this.database.stages
    }

    getPreviousStage(id: string): Stage | undefined {
        const localId = parseInt(id)
        if(localId > 0 && localId <= this.database.stages.length) {
            const currentStage = this.database.stages.find(stage => stage.id == id)
            if(!currentStage) return
            const stagePosition = currentStage.position
            if (stagePosition == 1) return currentStage // First stage returns itself as previous
            return this.database.stages.find(stage => stage.position == stagePosition -1)
        }
    }

    // TODO Add create function
    // TODO Add update function (title, position)
    // TODO Add delete function
    // TODO Add helper function to modify position
}
