const input = document.querySelector('input');
const button = document.querySelector('button');
const ul = document.querySelector('ul');
const liItems = document.getElementsByTagName('li');

// Função para criar novo elemento na lista
function createListElement() {
  const li = document.createElement('li');
  const deleteButton = document.createElement('img');

  deleteButton.setAttribute('src', 'images/delete.png');
  deleteButton.setAttribute('alt', 'delete');
  deleteButton.classList.add('delete-button');
  li.appendChild(document.createTextNode(input.value));
  li.appendChild(deleteButton);
  ul.appendChild(li);
  input.value = '';
}

// Função para adicionar novo elemento na lista
function addListAfterClick() {
  if (input.value.length > 0) {
    createListElement();
    saveToLocalStorage();
  }
}

// Função para adicionar novo elemento na lista ao pressionar a tecla Enter
function addListAfterKeypress(event) {
  if (input.value.length > 0 && event.keyCode === 13) {
    createListElement();
    saveToLocalStorage();
  }
}

// Função para excluir elemento da lista
function deleteListItem(event) {
  if (event.target.classList.contains('delete-button')) {
    const li = event.target.parentNode;
    ul.removeChild(li);
    saveToLocalStorage();
  }
}

// Função para salvar tarefas no localStorage
function saveToLocalStorage() {
  const tasks = [];
  for (let i = 0; i < liItems.length; i++) {
    tasks.push(liItems[i].textContent);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para recuperar tarefas salvas no localStorage
function getFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    for (let i = 0; i < tasks.length; i++) {
      const li = document.createElement('li');
      const deleteButton = document.createElement('img');

      deleteButton.setAttribute('src', 'images/delete.png');
      deleteButton.setAttribute('alt', 'delete');
      deleteButton.classList.add('delete-button');
      li.appendChild(document.createTextNode(tasks[i]));
      li.appendChild(deleteButton);
      ul.appendChild(li);
    }
  }
}

button.addEventListener('click', addListAfterClick);
input.addEventListener('keypress', addListAfterKeypress);
ul.addEventListener('click', deleteListItem);
getFromLocalStorage();
