import {objectType, extendType} from 'nexus'
import {Step} from './Step'

export const Stage = objectType({
    name: 'Stage',
    definition(t) {
        t.id('id')
        t.string('title')
        t.int('position')
        t.boolean('completed', {
            resolve: (root, _, context) => {
                return context.stageApi.getStageById(root.id).completed
            }
        })
        t.list.field('steps', {
            type: Step,
            resolve(root, args, context) {
                return context.stepApi.getStepsByStageId(root.id)
            },
        })
    },
})

export const StageQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('stages', {
            type: 'Stage',
            resolve(root, _, context) {
                return context.stageApi.getAllStages()
            },
        })
    },
})
