# graphql-nexus

## Tech stack used
- apollo-server
- nexus
- jest for testing

## How to run
```bash
git clone git@github.com:joanpujol/graphql-nexus.git
cd graphql-nexus
npm install
npm run test
npm run dev
```

## Sample graphQL requests
Stages query example:
```
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
```
toggleStep mutation example:
```
mutation {
  toggleStep(id: 4) {
    title,
    completed,
    stage {
      completed
    }
  }
}
```

## Proposed database schema
![image](https://user-images.githubusercontent.com/6762884/179230646-8a2d060e-e0cf-405d-8f56-7488cbd3f878.png)

## Main design considerations
- Tasks/Steps can be infinite, so we need a way to optimize for them, both from the front-end perspective and from the back-end.
- Front-end wise I implemented a pagination system when requesting steps.
- From the back-end, one possible optimization is to include an index in the database for (stageId, completed), this way we could quickly check how many tasks are left to complete to mark the Stage/Phase as completed.
- The completion of a Phase can be computed at runtime, I've added a completed field to the Phase model to cache this value.
- The main bulk of the logic is located within the toggleStep mutation which toggles a step's completion from true to false and vice-versa. This function is logic heavy because it has to check for blocked stages, completed stages and updating their state when a change occurs.
- When an action is not doable, the API throws a UserInputError

## Pending tasks
- Implement eslint
- Add more CRUD functionality
- Add auth system to be able to decide who creates/deletes tasks and who does them.
- Check more corner cases to improve validation
- Create more testing helpers to speed up test writing
