import {objectType} from 'nexus'
import {Stage} from './Stage'

export const Step = objectType({
    name: 'Step',
    definition(t) {
        t.int('id')
        t.string('title')
        t.boolean('completed')
        t.field('stage', {
            type: Stage,
            resolve(root, _, context) {
                return context.stepApi.getStepsByStageId(root.stageId)
            },
        })
    },
})
