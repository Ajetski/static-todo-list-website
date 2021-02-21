const myList = document.getElementById('list');
const apiBase = 'http://localhost:8080';

const appendTaskToList = (task) => {
	const listItem = document.createElement('li');

	const listText = document.createElement('span');
	listText.innerText = task.title;
	listText.className = task.completed ? 'completed' : 'incomplete';
	listText.addEventListener('click', (e) => {
		updateProgress(task, e.target);
	});
	listItem.appendChild(listText);

	const deleteButton = document.createElement('button');
	deleteButton.type = 'button';
	deleteButton.className = 'delete-task'
	deleteButton.innerHTML = '✖';
	deleteButton.onclick = (e) => {
		deleteTask(task).then(() => {
			myList.removeChild(listItem);
		});
	}
	listItem.appendChild(deleteButton);

	myList.appendChild(listItem);
}

const updateTasks = async () => {
	try {
		const { data } = await axios.get(`${apiBase}/task`);
		data.forEach(task => {
			appendTaskToList(task);
		});
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

updateTasks();

const addTask = async (task) => {
	try {
		const inputBox = document.getElementById('task');
		inputBox.value = '';
		inputBox.focus();
		const { data } = await axios.post(`${apiBase}/task`, task);
		appendTaskToList(data);
	} catch (error) {
		console.error(error);
	}
};

const updateProgress = async (task, taskElem) => {
	try {
		task.completed = !task.completed;
		taskElem.className = task.completed ? 'completed' : 'incomplete';
		await axios.post(`${apiBase}/task/${task.id}`, task);
	} catch (error) {
		console.error(error);
	}
};

const deleteTask = async (task) => {
	try {
		await axios.delete(`${apiBase}/task/${task.id}`);
	} catch (error) {
		console.error(error);
	}
};

