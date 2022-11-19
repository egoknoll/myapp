const todoCards = JSON.parse(localStorage.getItem('todos')) || []
const inProgressCards = JSON.parse(localStorage.getItem('inProgress')) || []
const completedCards = JSON.parse(localStorage.getItem('completed')) || []

function Card (title, description, user, status) {
  this.id = Date.now()
  this.createdAt = getTime()
  this.title = title
  this.description = description
  this.user = user
  this.status = status
}


const modalAddTodoElement = document.querySelector('#modal-add-todo')
const todoTitleElement = document.querySelector('.todo-title')
const todoDescriptionElement = document.querySelector('.todo-description')
const todoUserElement = document.querySelector('.todo-user')
const todoCardsElement = document.querySelector('.todo-cards')

function getTime () {
  const date = new Date()
  const realMonths = {
    0 :'Jan',
    1 :'Feb',
    2 :'Mar',
    3 :'Apr',
    4 :'May',
    5 :'June',
    6 :'July',
    7 :'Aug',
    8 :'Sep',
    9 :'Oct',
    10 :'Nov',
    11 :'Dec'
  }
  const realDate = () => (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
  const realHours = () => (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours()
  const realMinutes = () => (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
  const realSeconds = () => (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds()
  return `${realDate()}.${realMonths[date.getMonth()]}.${date.getFullYear()} ${realHours()}:${realMinutes()}:${realSeconds()}`
}


function getCardTemplate (todoCard) {
  const title = todoCard.title
  const description = todoCard.description
  const user = todoCard.user
  const time = todoCard.createdAt
  const id = todoCard.id
  return `
    <div class="card">
      <div class="card-content">
        <div class="card-title">${title}</div>
        <div class="card-description">${description}</div>
        <div class="card-user">${user}</div>
        <div class="card-created-at">${time}</div>
      </div>
      <div class="card-control">
        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
          <option selected>Choose</option>
          <option value="1">Todo</option>
          <option value="2">In Progress</option>
          <option value="3">Completed</option>
        </select>
        <button type="button" id="${id}" class="btn btn-primary btn-delete">Delete</button>
        <button type="button" id="${id}" class="btn btn-primary btn-edit">Edit</button>
      </div>
    </div>
  `
}


function updateLocalStorage () {
  localStorage.setItem('todos', JSON.stringify(todoCards))
  localStorage.setItem('inProgress', JSON.stringify(inProgressCards))
  localStorage.setItem('completed', JSON.stringify(completedCards))
}


function renderTodos () {
  const result = todoCards.reduce((prev, next) => {
    if (next) {
      let pattern = getCardTemplate(next)
      return prev + pattern
    }
  }, '')
  todoCardsElement.innerHTML = result
}

function handleDeleteCertainTodo ({target}) {
  if (target.classList.contains('btn-delete')) {
    todoCards.forEach((item, index) => {
      if (item.id == target.id) {
        todoCards.splice(index, 1)
      }
    })
    updateLocalStorage()
    renderTodos()
  }
}

function handleClock () {
  setInterval(() => {
    document.querySelector('.header__current-time').innerHTML = getTime()
  }, 1000)
}

function handleAddTodo (event) {
  event.preventDefault()
  const todoCard = new Card(todoTitleElement.value, todoDescriptionElement.value, todoUserElement.value, 'todo')
  todoCards.push(todoCard)
  modalAddTodoElement.reset()
  updateLocalStorage()
  renderTodos()
}

function handleReload () {
  renderTodos()
}

modalAddTodoElement.addEventListener('submit', handleAddTodo)
todoCardsElement.addEventListener('click', handleDeleteCertainTodo)

window.addEventListener('DOMContentLoaded', handleClock)
window.addEventListener('DOMContentLoaded', handleReload)
