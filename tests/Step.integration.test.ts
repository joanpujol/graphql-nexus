import {createTestContext} from './helper'
import * as _ from 'lodash'

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
      "id": "1",
      "title": "do something 1",
    },
    Object {
      "completed": true,
      "id": "2",
      "title": "do something 2",
    },
    Object {
      "completed": true,
      "id": "3",
      "title": "do something 3",
    },
    Object {
      "completed": false,
      "id": "4",
      "title": "do something 4",
    },
    Object {
      "completed": false,
      "id": "5",
      "title": "do something 5",
    },
    Object {
      "completed": false,
      "id": "6",
      "title": "do something 6",
    },
  ],
}
`)

    // TODO Improve testing approach
    try {
        await ctx.client.request(`
            mutation {
              toggleStep(id: 8) {
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
              toggleStep(id: 1) {
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
              toggleStep(id: 5) {
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

    const createdStep = await ctx.client.request(`
            mutation {
              toggleStep(id: 4) {
                title,
                completed,
              }
            }
    `)
    expect(_.isEqual(createdStep, { toggleStep: { title: 'do something 4', completed: true } }))
}, 20000) // 20 seconds
