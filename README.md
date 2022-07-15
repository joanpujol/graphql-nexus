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

## Sample graphQL request
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

## Proposed database schema
![image](https://user-images.githubusercontent.com/6762884/179217226-e03b252f-7153-483d-851c-e9cb2d57612b.png)

## Main design considerations
- Tasks/Steps can be infinite, so we need a way to optimize for them, both from the front-end perspective and from the back-end.
- Front-end wise I implemented a pagination system when requesting steps.
- From the back-end the optimization I would do is to create an index in the database for (stageId, completed), this way we could quickly check how many tasks are left to complete to mark the Stage/Phase as completed.
- The completion of a Phase could be computed at runtime but I've added a completed field to the Phase model, it's an optimization to not compute all stepss (which could be a lot) when checking if previous or current phase when checking if it's possible to modify it.
- The main bulk of the logic is in the switchStep, mutation, that toggles a step from true to false and viceversa. This is because it has to check for blocked stages, completed stages and updating their state.
- When an action is not doable, the API throws a UserInputError

## Pending tasks
- Implement eslint
- Add more CRUD functionality to endpoints
- Add auth system to be able to decide who creates/deletes tasks and who does them.
- Check more corner cases to improve validation
- Create more testing helpers to speed up test writing
