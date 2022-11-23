const todoCards = JSON.parse(localStorage.getItem('todos')) || []
const inProgressCards = JSON.parse(localStorage.getItem('inProgress')) || []
const completedCards = JSON.parse(localStorage.getItem('completed')) || []

function Card (title, description, user, color) {
  this.id = Date.now()
  this.createdAt = getTime()
  this.title = title
  this.description = description
  this.user = user
  this.color = color
}

const listsElement = document.querySelector('.lists')
const modalAddTodoElement = document.querySelector('#modal-add-todo')
const todoTitleElement = document.querySelector('.todo-title')
const todoDescriptionElement = document.querySelector('.todo-description')
const todoUserElement = document.querySelector('.todo-user')
const todoCardsElement = document.querySelector('.todo-cards')
const inProgressCardsElement = document.querySelector('.in-progress-cards')
const completedCardsElement = document.querySelector('.completed-cards')
const deleteAllButtonElement = document.querySelector('.submit-delete-all')
const todoColorpickerElement = document.querySelector('.form-control-color')
const completeAllButtonElement = document.querySelector('.btn-complete-all')

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
  const color = todoCard.color
  return `
    <div class="card" style="background-color: ${color}">
      <div class="card-content">
        <div class="card-title">${title}</div>
        <div class="card-description">${description}</div>
        <div class="card-user">${user}</div>
        <div class="card-created-at">${time}</div>
      </div>
      <div class="card-control">
        <select id="${id}" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
          <option selected>Choose</option>
          <option value="todo">Todo</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="button" id="${id}" class="btn btn-primary btn-delete">Delete</button>
        <button type="button" id="${id}" data-bs-toggle="modal" data-bs-target="#edit${id}" class="btn btn-primary btn-edit">Edit</button>
          <form class="modal edit" id="edit${id}">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <input class="form-control todo-title card-title${id}" type="text" value="${title}" placeholder="${title}">
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <textarea class="form-control todo-description card-description${id}" placeholder="${description}">${description}</textarea>
              </div>
              <div class="modal-footer">
                <select class="form-select form-select-sm todo-user card-user${id}" value="${user}" aria-label=".form-select-sm example">
                  <option selected value="${user}">Choose User</option>
                  <option value="Billy">Billy</option>
                  <option value="Van">Van</option>
                  <option value="Mark">Mark</option>
                </select>
                <label for="colorpicker" class="form-label">Card color</label>
                <input type="color" class="form-control form-control-color card-color${id}" id="colorpicker" value="${color}" title="Choose your color">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        </form>
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

function renderInProgress () {
  const result = inProgressCards.reduce((prev, next) => {
    if (next) {
      let pattern = getCardTemplate(next)
      return prev + pattern
    }
  }, '')
  inProgressCardsElement.innerHTML = result
}

function renderCompleted () {
  const result = completedCards.reduce((prev, next) => {
    if (next) {
      let pattern = getCardTemplate(next)
      return prev + pattern
    }
  }, '')
  completedCardsElement.innerHTML = result
}

function globalRender () {
  renderTodos()
  renderInProgress()
  renderCompleted()
}

function handleDeleteAllButton () {
  completedCards.length = 0
  updateLocalStorage()
  globalRender()
}

function handleDeleteCertainTodo ({target}) {
  if (target.classList.contains('btn-delete')) {
    todoCards.forEach((item, index) => {
      if (item.id == target.id) {
        todoCards.splice(index, 1)
      }
    })
    inProgressCards.forEach((item, index) => {
      if (item.id == target.id) {
        inProgressCards.splice(index, 1)
      }
    })
    completedCards.forEach((item, index) => {
      if (item.id == target.id) {
        completedCards.splice(index, 1)
      }
    })
    updateLocalStorage()
    globalRender()
  }
}

function handleChangeCategory ({target}) {
  if (target.classList.contains('form-select-lg')) {
    if (target.value == 'inProgress') {
      todoCards.forEach((item, index) => {
        if (item.id == target.id) {
          inProgressCards.push(item)
          todoCards.splice(index, 1)
        }
      })
      completedCards.forEach((item, index) => {
        if (item.id == target.id) {
          inProgressCards.push(item)
          completedCards.splice(index, 1)
        }
      })
    } else if (target.value == 'completed') {
      todoCards.forEach((item, index) => {
        if (item.id == target.id) {
          completedCards.push(item)
          todoCards.splice(index, 1)
        }
      })
      inProgressCards.forEach((item, index) => {
        if (item.id == target.id) {
          completedCards.push(item)
          inProgressCards.splice(index, 1)
        }
      })
    } else {
      inProgressCards.forEach((item, index) => {
        if (item.id == target.id) {
          todoCards.push(item)
          inProgressCards.splice(index, 1)
        }
      })
      completedCards.forEach((item, index) => {
        if (item.id == target.id) {
          todoCards.push(item)
          completedCards.splice(index, 1)
        }
      })
    }
    updateLocalStorage()
    globalRender()
  }
}

function handleCompleteAllElement () {
  inProgressCards.forEach(item => {
    completedCards.push(item)
  })
  inProgressCards.length = 0
  updateLocalStorage()
  globalRender()
}

function handleEditCertainCard (event) {
  let target = event.target
  if (target.classList.contains('edit')) {
    event.preventDefault()
    let targetId = target.id.slice(4)
    let cardTitleElement = document.querySelector(`.card-title${targetId}`)
    let cardDescriptionElement = document.querySelector(`.card-description${targetId}`)
    let cardUserElement = document.querySelector(`.card-user${targetId}`)
    let cardColorElement = document.querySelector(`.card-color${targetId}`)
    todoCards.forEach(item => {
      if(item.id == targetId) {
        item.title = cardTitleElement.value
        item.description = cardDescriptionElement.value
        item.user = cardUserElement.value
        item.color = cardColorElement.value
      }
    })
    inProgressCards.forEach(item => {
      if(item.id == targetId) {
        item.title = cardTitleElement.value
        item.description = cardDescriptionElement.value
        item.user = cardUserElement.value
        item.color = cardColorElement.value
      }
    })
    completedCards.forEach(item => {
      if(item.id == targetId) {
        item.title = cardTitleElement.value
        item.description = cardDescriptionElement.value
        item.user = cardUserElement.value
        item.color = cardColorElement.value
      }
    })
  }
  document.body.classList.remove('modal-open')
  document.body.setAttribute('style', '')
  document.querySelector('.modal-backdrop').remove()
  updateLocalStorage()
  globalRender()
}

function handleClock () {
  setInterval(() => {
    document.querySelector('.header__current-time').innerHTML = getTime()
  }, 1000)
}

function handleAddTodo (event) {
  event.preventDefault()
  const todoCard = new Card(todoTitleElement.value, todoDescriptionElement.value, todoUserElement.value, todoColorpickerElement.value)
  todoCards.push(todoCard)
  modalAddTodoElement.reset()
  updateLocalStorage()
  globalRender()
}

function handleReload () {
  globalRender()
}

modalAddTodoElement.addEventListener('submit', handleAddTodo)
listsElement.addEventListener('click', handleDeleteCertainTodo)
listsElement.addEventListener('submit', handleEditCertainCard)
listsElement.addEventListener('change', handleChangeCategory)
deleteAllButtonElement.addEventListener('click', handleDeleteAllButton)
completeAllButtonElement.addEventListener('click', handleCompleteAllElement)


window.addEventListener('DOMContentLoaded', handleClock)
window.addEventListener('DOMContentLoaded', handleReload)
