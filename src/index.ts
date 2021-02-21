import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static('web'));
app.use(bodyParser.json());

type Task = {
	id?: number,
	title: string,
	completed: boolean
};

let list: Task[] = [];

app.get('/task', (req: Request, res: Response) => {
	res.send(list);
});

app.post('/task', (req: Request<{}, {}, Task>, res: Response) => {
	if(!req.body.id) {
		req.body.id = list.length;
	}
	
	list.push(req.body);
	res.send(req.body);
});

app.post('/task/:id', (req: Request<{id: number}, {}, Task>, res: Response) => {
	const idx = list.findIndex(task => task.id == req.params.id);
	list[idx] = {...list[idx] , ...req.body};
	res.send(list[idx]);
});

app.delete('/task/:id', (req: Request<{id: number}, {}, Task>, res: Response) => {
	list = list.filter(task => task.id != req.params.id);
	res.send();
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
