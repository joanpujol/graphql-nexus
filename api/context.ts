import {StageAPI} from './entities/stageApi'
import {StepAPI} from './entities/stepApi'
import {db} from '../tests/mockData'

export interface Context {
    stageApi: StageAPI
    stepApi: StepAPI
}

export const context = {
    stageApi: new StageAPI(db),
    stepApi: new StepAPI(db)
}
