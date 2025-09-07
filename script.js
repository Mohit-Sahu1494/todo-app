    let main = document.querySelector(".display_text");
    let input = document.querySelector("#input");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function create_box(data, completed = false, index) {
      let box = document.createElement("div");
      box.setAttribute("class", "textarea");
      main.appendChild(box);

      let check_box = document.createElement("div");
      check_box.setAttribute("class", "check_box");
      box.appendChild(check_box);

      let text = document.createElement("div");
      text.setAttribute("class", "text");
      text.innerHTML = data;
      box.appendChild(text);

      if (completed) {
        check_box.innerHTML = `<i class="ri-check-line"></i>`;
        check_box.style.backgroundColor = "rgb(4, 255, 4)";
        text.style.textDecoration = "line-through";
      }
      check_box.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        Tasks();
      });

      let undo = document.createElement("div");
      undo.setAttribute("class", "undo");
      undo.innerHTML = `<i class="ri-close-large-line"></i>`;
      box.appendChild(undo);
      undo.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        Tasks();
      });
    }
    function add_button() {
      if (input.value !== "") {
        let data = input.value;
        tasks.push({ text: data, completed: false });
        saveTasks();
        Tasks();
        input.value = "";
      }
    }
    function Tasks() {
      main.innerHTML = "";
      tasks.forEach((task, index) => {
        create_box(task.text, task.completed, index);
      });
    }
    Tasks();