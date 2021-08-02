# Typescript
#BE
Denpendencies: express  @type/express nodemon  body-parser cors @type/cors ts-node-dev typescript mongoose @types/mongoose bcrypt @types/bcrypt jsonwebtoken @types/jsonwebtoken multer @types/multer class-validator class-transformer twilio

Note: 
- Carefull with path folder when use nodemon
- Use nodemon to watch both .ts and .js extension, node only use for .js 
- import replace with require to avoid errors

Folders Structure:
- config: Aplication configure
- controllers: business logic
- dtos: data transfer object -> request pattern -> data allowed to see
- middlewares: include functions to handle logic request before the next request functions
- models: keep models of table in db
- routes: handle/map endpoints routes
- services: processing
- utility: handle heplper function
- images: save images of custormer/product 
-pass:Q;(Ak5LahU5(XWQ
