import { createTestContext } from './helper'
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

    it('should test that switchStep function works as expected', () => {
        stepApi.switchStep('4')
        expect(db.stages[1].completed)
    })
})

describe('Step integration tests', () => {
    const ctx = createTestContext()
    it('Tests a couple of cases', async () => {
        const result = await ctx.client.request(`
        {
            steps {
              id
              title
              completed
            }
        }
        `)
        expect(result).toMatchInlineSnapshot(`
Object {
  "steps": Array [
    Object {
      "completed": true,
      "id": 1,
      "title": "do something 1",
    },
    Object {
      "completed": true,
      "id": 2,
      "title": "do something 2",
    },
    Object {
      "completed": true,
      "id": 3,
      "title": "do something 3",
    },
    Object {
      "completed": true,
      "id": 4,
      "title": "do something 4",
    },
    Object {
      "completed": false,
      "id": 5,
      "title": "do something 5",
    },
    Object {
      "completed": false,
      "id": 6,
      "title": "do something 6",
    },
  ],
}
`)

        // TODO Improve testing approach
        try {
            await ctx.client.request(`
                mutation {
                  switchStep(id: 8) {
                    title,
                    completed,
                  }
                }
            `)
        } catch (error) {
            expect(JSON.stringify(error)).toContain(
                'The requested id does not exist'
            )
        }

        try {
            await ctx.client.request(`
                mutation {
                  switchStep(id: 1) {
                    title,
                    completed,
                  }
                }
        `)
        } catch (error) {
            expect(JSON.stringify(error)).toContain(
                'It\'s not possible to edit already completed stages'
            )
        }

        try {
            await ctx.client.request(`
                mutation {
                  switchStep(id: 5) {
                    title,
                    completed,
                  }
                }
        `)
        } catch (error) {
            expect(JSON.stringify(error)).toContain(
                'It\'s not possible check tasks if the previous Stage is not complete'
            )
        }
    })
})
