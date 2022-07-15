import {Db} from './db'
import {Step} from './typeDefs'
import * as _ from 'lodash'

export class StepAPI {
    private database: Db

    constructor(db: Db) {
        this.database = db
    }

    getStepById(id: string): Step | undefined {
        return this.database.steps.find(step => step.id == id)
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

    switchStep(id: string): Step {
        const stepIndex = _.findIndex(this.database.steps, step => step.id == id)
        this.database.steps[stepIndex].completed = !this.database.steps[stepIndex].completed
        // Once the value has changed, the stage needs to be updated
        const stageId = this.database.steps[stepIndex].stageId
        const isStageCompleted = this.database.steps.filter(step => step.stageId == stageId).every(step => step.completed)
        const foundIndex = this.database.stages.findIndex(stage => stage.id == stageId)
        this.database.stages[foundIndex].completed = isStageCompleted
        return this.database.steps[stepIndex]
    }

    // TODO Add create step function (title, stageId)
    // TODO Add function to update other attributes
    // TODO Add function to remove steps
}
