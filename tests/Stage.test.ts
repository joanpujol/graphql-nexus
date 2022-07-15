import { createTestContext } from './helper'
import { StageAPI } from '../api/entities/stageApi'
import { db } from './mockData'

describe('Stage unit tests', () => {
    let stageApi: StageAPI

    beforeEach(() => {
        stageApi = new StageAPI(db)
    })

    it('should test that getStageById function works as expected', () => {
        const stage = stageApi.getStageById('2')
        expect(stage?.title == 'second')
    })
    it('should test that getAllStages function works as expected', () => {
        const allStages = stageApi.getAllStages()
        expect(db.stages.length == allStages.length)
    })
    it('should test that getPreviousStage function works as expected', () => {
        // Tests negative id
        let previousStage = stageApi.getPreviousStage('-3')
        expect(typeof previousStage == undefined)
        previousStage = stageApi.getPreviousStage('3')
        expect(previousStage?.position == 2)
    })
})

describe('Stage integration tests', () => {
    const ctx = createTestContext()
    it('Tests stage query', async () => {
        const draftResult = await ctx.client.request(`
            {
              stages {
                id
                title
                completed
                steps {
                  id
                  title
                  completed
                }
              }
            }
        `)
        expect(draftResult).toMatchInlineSnapshot(`
Object {
  "stages": Array [
    Object {
      "completed": true,
      "id": "1",
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
      ],
      "title": "first",
    },
    Object {
      "completed": false,
      "id": "2",
      "steps": Array [
        Object {
          "completed": false,
          "id": 4,
          "title": "do something 4",
        },
      ],
      "title": "second",
    },
    Object {
      "completed": false,
      "id": "3",
      "steps": Array [
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
      "title": "third",
    },
  ],
}
`)
    })
})
