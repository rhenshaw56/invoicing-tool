
import dotenv from 'dotenv';
import { createExpressApp } from './server';

dotenv.config();
const PORT = process.env.PORT || 3006;

createExpressApp()

createExpressApp()
  .then((app) => app.listen(PORT))
  .then(() => console.log(`Server up @ ${PORT}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// const connection =
