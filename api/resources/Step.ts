import {extendType, intArg, objectType} from 'nexus'
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

export const StepQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('steps', {
            type: 'Step',
            args: {
                pageSize: intArg({ // TODO Add more arg descriptions
                    description: 'The number of results to show per page. Default = 20',
                }),
                page: intArg({
                    description: 'Which page to show',
                }),
            },
            resolve(root, { pageSize = 20, page = 1 }, context) {
                return context.stepApi.getStepsWithPagination(
                    pageSize,
                    page
                )
            },
        })
    },
})
