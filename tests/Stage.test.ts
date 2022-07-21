import { StageAPI } from '../api/entities/stageApi'
import { db } from './mockData'

describe('Stage unit tests', () => {
    let stageApi: StageAPI

    beforeEach(() => {
        stageApi = new StageAPI(db)
    })

    it('should test that getStageById function works as expected', () => {
        const stage = stageApi.getStageById('2')
        expect(stage!.title).toEqual('second')
    })
    it('should test that getAllStages function works as expected', () => {
        const allStages = stageApi.getAllStages()
        expect(db.stages.length).toEqual(allStages.length)
    })
    it('should test that getPreviousStage function works as expected', () => {
        // Tests negative id
        let previousStage = stageApi.getPreviousStage('-3')
        expect(previousStage).toBeUndefined()
        previousStage = stageApi.getPreviousStage('3')
        expect(previousStage?.position).toEqual(2)
    })
})
