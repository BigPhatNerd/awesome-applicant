import express, { Express, Request, Response} from 'express';
import router from './routes';
const app: Express = express();
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(router);


app.get('/', (req: Request, res: Response) =>{
    res.send('Hello, world!')
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

export default app;