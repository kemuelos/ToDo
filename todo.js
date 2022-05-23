// const fetch_res = fetch("https://jsonplaceholder.typicode.com/todos")
// 	.then((response) => response.json())
// 	.then((json) => {
// 		console.log(json);

// 		const body = document.querySelector("body");

// 		for (const todo of json) {
// 			const div = document.createElement("div");
// 			div.classList.add("todo");

// 			const span = document.createElement("span");
// 			if (todo.completed) {
// 				span.textContent = "X";
// 			} else {
// 				span.textContent = "O";
// 			}
// 			div.appendChild(span);

// 			const h3 = document.createElement("h3");
// 			h3.textContent = todo.title;
// 			div.appendChild(h3);

// 			body.appendChild(div);
// 		}
// 	});

async function showTodos(json) {
	// for (const child of container.children) {
	// 	child.remove();
	// }

	container.innerHTML = "";

	for (const todo of json) {
		const div = document.createElement("div");
		div.classList.add("todo");

		const span_statut = document.createElement("span");
		span_statut.classList.add("icon");

		// if todo.completed is true then span.innerText = "check_circle" else span.innerText = "circle"
		span_statut.innerText = todo.completed ? "check_circle" : "circle";

		// change the text content of the span when someone clicks on it
		span_statut.addEventListener("click", (event) => {
			todo.completed = !todo.completed;
			span_statut.innerText = todo.completed ? "check_circle" : "circle";
			console.log(todo);
		});

		// span for edit line
		const span_edit = document.createElement("span");
		span_edit.classList.add("icon");
		span_edit.innerText = "edit";

		span_edit.addEventListener("click", (event) => {
			const input = document.createElement("input");
			input.type = "text";
			input.value = todo.title;
			input.addEventListener("keyup", (event) => {
				if (event.key === "Enter") {
					todo.title = input.value;
					span_edit.parentElement.querySelector("h3").textContent = todo.title;
					input.remove();
				}
			});
			span_edit.parentElement.appendChild(input);
		});

		// span for remove line
		const span_delete = document.createElement("span");
		span_delete.classList.add("icon");
		span_delete.innerText = "delete";

		span_delete.addEventListener("click", () => {
			div.remove();
			json.splice(json.indexOf(todo), 1);
		});

		div.appendChild(span_statut);

		const h3 = document.createElement("h3");
		h3.textContent = todo.title;
		div.appendChild(h3);
		div.appendChild(span_delete);
		div.appendChild(span_edit);

		container.appendChild(div);
	}
}

const add = document.querySelector("#add");
const div_add = document.querySelector(".add_todo");
const valider = document.querySelector("#valider");
const container = document.querySelector(".todos_container");
const input = document.querySelector("input");
const todos = [];

add.addEventListener("click", () => {
	div_add.classList.toggle("invisible");
	add.innerText = div_add.classList.contains("invisible") ? "add" : "close";
});

valider.addEventListener("click", () => {
	const todo = {
		userId: 1,
		title: input.value,
		completed: false,
	};

	console.log(todos);
	todos.push(todo);
	console.log(todo);

	div_add.classList.toggle("invisible");

	showTodos(todos); // show the new todo

	input.value = "";

	add.innerText = "add";
});
