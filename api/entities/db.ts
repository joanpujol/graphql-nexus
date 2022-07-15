import {Stage, Step} from './typeDefs'

export interface Db {
    stages: Stage[],
    steps: Step[],
}

// TODO Integrate with an actual data source
export const db: Db = {
    stages: [
        {id: '1', title: 'first', position: 1, completed: true},
        {id: '2', title: 'second', position: 2, completed: false},
        {id: '3', title: 'third', position: 3, completed: false},
    ],
    steps: [
        {id: '1', title: 'do something 1', completed: true, stageId: '1'},
        {id: '2', title: 'do something 2', completed: true, stageId: '1'},
        {id: '3', title: 'do something 3', completed: true, stageId: '1'},
        {id: '4', title: 'do something 4', completed: false, stageId: '2'},
        {id: '5', title: 'do something 5', completed: false, stageId: '3'},
        {id: '6', title: 'do something 6', completed: false, stageId: '3'},
    ],
}
