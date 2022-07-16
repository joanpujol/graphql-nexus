import {createTestContext} from './helper'

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
      ],
      "title": "first",
    },
    Object {
      "completed": false,
      "id": "2",
      "steps": Array [
        Object {
          "completed": false,
          "id": "4",
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
          "id": "5",
          "title": "do something 5",
        },
        Object {
          "completed": false,
          "id": "6",
          "title": "do something 6",
        },
      ],
      "title": "third",
    },
  ],
}
`)
})
