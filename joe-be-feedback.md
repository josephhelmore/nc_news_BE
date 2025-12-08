## Test Output

It is **Recommended** to open this file in preview mode for readability.

Read through all errors messages, hints and any linked relevant notes as well as using any other [NC Notes](https://l2c.northcoders.com/courses/sd-notes/back-end#sectionId=,step=). Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.


------------------------------
### CORE GET `/api/articles?order=asc`
## Completed

Assertion: Cannot read properties of undefined (reading 'length')

Hints:
- accept an `order` query of `asc` or `desc`

Relevant Notes:
- [Handling Endpoint Queries](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=express-servers,step=queries)
- [Greenlisting](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=dynamic-queries,step=greenlisting)




------------------------------
### CORE GET `/api/articles?topic=paper`
## Completed

Assertion: expected 404 to equal 200

Hints:
- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists

Relevant Notes:
- [Handling Endpoint Queries](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=express-servers,step=queries)
- [Greenlisting](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=dynamic-queries,step=greenlisting)
- [Handline Empty Responses](https://l2c.northcoders.com/courses/sd-notes/back-end#sectionId=handling-empty-responses,step=intro)


------------------------------
### CORE PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:
- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
error: null value in column "author" of relation "comments" violates not-null constraint
    at /Users/rosemullan/Desktop/classroom tools/team-be-review-runner/evaluations/joe/node_modules/pg-pool/index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async postComment (/Users/rosemullan/Desktop/classroom tools/team-be-review-runner/evaluations/joe/controllers/post-controllers.js:11:21) {
  length: 257,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (19, 1, this is a comment, 0, null, 2025-12-05 10:39:24.900132).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'comments',
  column: 'author',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '1987',
  routine: 'ExecConstraints'
}


------------------------------
### CORE POST `/api/articles/1/comments`

Assertion: expected 500 to equal 400

Hints:
- use a 400: Bad Request status code when `POST` request does not include all the required keys

Relevant Notes:
- [Error Handling Middleware](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=error-handling-middleware)
- [Common Error Status Codes](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=common-errors-and-status-codes)
- [Custom Error Handling](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=custom-errors)


------------------------------
### CORE POST `/api/articles/1/comments`

Assertion: expected 500 to equal 404

Hints:
- use a 404: Not Found status code when `POST` contains a valid username that does not exist

Relevant Notes:
- [Error Handling Middleware](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=error-handling-middleware)
- [Common Error Status Codes](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=common-errors-and-status-codes)
- [Custom Error Handling](https://l2c.northcoders.com/courses/sd-notes/back-end/#sectionId=error-handling,step=custom-errors)



