import {extendType, idArg, intArg, nonNull, objectType} from 'nexus'
import {Stage} from './Stage'
import {UserInputError} from "apollo-server"

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

export const StepMutation = extendType({
    type: 'Mutation',
    definition(t) {
        // TODO Implement other CRUD operations
        t.nonNull.field('switchStep', {
            type: 'Step',
            args: {
                id: nonNull(idArg()),
            },
            resolve(root, { id }, context) {
                const step = context.stepApi.getStepById(id)
                if(!step) {
                    throw new UserInputError('The requested id does not exist', {
                        argumentName: 'id'
                    });
                }
                const isStageCompleted = context.stageApi.getStageById(step.stageId).completed
                if (isStageCompleted) {
                    throw new UserInputError('It\'s not possible to edit already completed stages', {
                        argumentName: 'stageId'
                    });
                }
                const previousStage = context.stageApi.getPreviousStage(step.stageId)
                if(!previousStage || !previousStage.completed) {
                    throw new UserInputError('It\'s not possible check tasks if the previous Stage is not complete', {
                        argumentName: 'stageId'
                    });
                }
                return context.stepApi.switchStep(
                    id
                )
            },
        })
    },
})
