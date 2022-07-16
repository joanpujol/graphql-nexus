import { StepAPI } from '../api/entities/stepApi'
import { db } from './mockData'

describe('Stage unit tests', () => {
    let stepApi: StepAPI

    beforeEach(() => {
        stepApi = new StepAPI(db)
    })

    it('should test that getStepById function works as expected', () => {
        const step = stepApi.getStepById('3')
        expect(step?.title == 'do something 3')
        const anotherStep = stepApi.getStepById('-50')
        expect(typeof anotherStep == undefined)
    })

    it('should test that getStepsWithPagination function works as expected', () => {
        const steps = stepApi.getStepsWithPagination(2, 2)
        expect(steps.length == 2)
        expect(steps[0].title == 'do something 3')
    })

    it('should test that getStepsByStageId function works as expected', () => {
        const steps = stepApi.getStepsByStageId('2')
        expect(steps.length == 2)
    })

    it('should test that toggleStep function works as expected', () => {
        stepApi.toggleStep('4')
        expect(db.stages[1].completed)
    })
})
