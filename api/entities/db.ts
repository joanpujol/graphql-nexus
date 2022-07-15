import {Stage, Step} from './typeDefs'

export interface Db {
    stages: Stage[],
    steps: Step[],
}

// TODO Integrate with an actual data source
