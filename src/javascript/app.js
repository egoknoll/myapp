const todoCards = JSON.parse(localStorage.getItem('todos')) || []
const inProgressCards = JSON.parse(localStorage.getItem('inProgress')) || []
const completedCards = JSON.parse(localStorage.getItem('completed')) || []
const url = 'https://jsonplaceholder.typicode.com/users'

function Card (title, description, user, color) {
  this.id = Date.now()
  this.createdAt = getTime()
  this.title = title
  this.description = description
  this.user = user
  this.color = color
  this.status = 'Todo'
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
const buttonAddTodoElement = document.querySelector('.btn-add-todo')


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
  let todoStatus = todoCard.status == 'Todo' ? 'selected' : ''
  let inProgressStatus = todoCard.status == 'In Progress' ? 'selected' : ''
  let completedStatus = todoCard.status == 'Completed' ? 'selected' : ''
  return `
    <div class="card" id="${id}" draggable="true" style="background-color: ${color}">
      <div class="card-content">
        <div class="card-title">${title}</div>
        <div class="card-description">${description}</div>
        <div class="card-user">${user}</div>
        <div class="card-created-at">${time}</div>
      </div>
      <div class="card-control">
        <select id="${id}" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
          <option ${todoStatus} value="todo">Todo</option>
          <option ${inProgressStatus} value="inProgress">In Progress</option>
          <option ${completedStatus} value="completed">Completed</option>
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
                <h5 class="modal-title">Choose User:</h5>
                <select class="form-select form-select-sm todo-user card-users card-user${id}" value="${user}" aria-label=".form-select-sm example">
                  <option selected value="${user}">Current User : ${user}</option>
                </select>
                <label for="colorpicker" class="form-label">Card color</label>
                <input type="color" class="form-control form-control-color card-color${id}" id="colorpicker" value="${color}" title="Choose your color">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" >Confirm</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
}

function getUserTemplate (user) {
  return `
  <option value="${user.name}">${user.name}</option>
  `
}

function updateLocalStorage () {
  localStorage.setItem('todos', JSON.stringify(todoCards))
  localStorage.setItem('inProgress', JSON.stringify(inProgressCards))
  localStorage.setItem('completed', JSON.stringify(completedCards))
}

function renderOptions (data) {
  const result = data.reduce((prev, next) => {
    if (next) {
      let pattern = getUserTemplate(next)
      return prev + pattern
    }
  }, '')
  document.querySelector('#users').innerHTML = result
}

async function renderCardsAfterFetch () {
  try {
    const response = await fetch(url)
    const data = await response.json()
    renderCertainCardOptions(data)
  } catch (error) {
    console.error('Something went wrong')
  }
}

function renderCertainCardOptions (data) {
  const editUsersElements = document.querySelectorAll('.card-users')
  const result = data.reduce((prev, next) => {
    if (next) {
      let pattern = getUserTemplate(next)
      return prev + pattern
    }
  }, '')
  editUsersElements.forEach(item => {
    item.innerHTML += result
  })
}

function renderCards (data, element) {
  const result = data.reduce((prev, next) => {
    if (next) {
      let pattern = getCardTemplate(next)
      return prev + pattern
    }
  }, '')
  element.innerHTML = result
}

function globalRender () {
  renderCards(todoCards, todoCardsElement)
  renderCards(inProgressCards, inProgressCardsElement)
  renderCards(completedCards, completedCardsElement)
}

function handleDeleteAllButton (event) {
  event.preventDefault()
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
      if (inProgressCards.length > 5) {
        const submitModal = document.querySelector('#modal-in-progress')
        const submitChangeBsModal = new bootstrap.Modal(submitModal)
        submitChangeBsModal.toggle()
        submitModal.querySelector('.btn-primary').addEventListener('click', () => {
          todoCards.forEach((item, index) => {
            if (item.id == target.id) {
              item.status = 'In Progress'
              inProgressCards.push(item)
              todoCards.splice(index, 1)
            }
          })
          completedCards.forEach((item, index) => {
            if (item.id == target.id) {
              item.status = 'In Progress'
              inProgressCards.push(item)
              completedCards.splice(index, 1)
            }
          })
          updateLocalStorage()
          globalRender()
          renderCardsAfterFetch()
        })
      } else {
        todoCards.forEach((item, index) => {
          if (item.id == target.id) {
            item.status = 'In Progress'
            inProgressCards.push(item)
            todoCards.splice(index, 1)
          }
        })
        completedCards.forEach((item, index) => {
          if (item.id == target.id) {
            item.status = 'In Progress'
            inProgressCards.push(item)
            completedCards.splice(index, 1)
          }
        })
      }
    } else if (target.value == 'completed') {
      todoCards.forEach((item, index) => {
        if (item.id == target.id) {
          item.status = 'Completed'
          completedCards.push(item)
          todoCards.splice(index, 1)
        }
      })
      inProgressCards.forEach((item, index) => {
        if (item.id == target.id) {
          item.status = 'Completed'
          completedCards.push(item)
          inProgressCards.splice(index, 1)
        }
      })
    } else {
      inProgressCards.forEach((item, index) => {
        if (item.id == target.id) {
          item.status = 'Todo'
          todoCards.push(item)
          inProgressCards.splice(index, 1)
        }
      })
      completedCards.forEach((item, index) => {
        if (item.id == target.id) {
          item.status = 'Todo'
          todoCards.push(item)
          completedCards.splice(index, 1)
        }
      })
    }
    updateLocalStorage()
    globalRender()
    renderCardsAfterFetch()
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
  updateLocalStorage()
  globalRender()
  renderCardsAfterFetch()
}

function handleClock () {
  setInterval(() => {
    document.querySelector('.header__current-time').innerHTML = getTime()
  }, 1000)
}

function handleAddTodo (event) {
  event.preventDefault()
  const modalAddTodoBs = new bootstrap.Modal(document.querySelector('#modal-add-todo'))
  const todoCard = new Card(todoTitleElement.value, todoDescriptionElement.value, todoUserElement.value, todoColorpickerElement.value)
  todoCards.push(todoCard)
  modalAddTodoElement.reset()
  modalAddTodoBs.hide()
  updateLocalStorage()
  globalRender()
  handleDragAndDrop()
}


function handleDragAndDrop () {
  const cardContainers = document.querySelectorAll('.cards')
  const draggableCards = document.querySelectorAll('.card')
  draggableCards.forEach(draggable=> {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })
  cardContainers.forEach(container => {
    container.addEventListener('dragover', (event) => {
      event.preventDefault()
      const draggingElement = document.querySelector('.dragging')
      // container.appendChild(draggingElement)
      if (container.classList.contains('in-progress-cards')) {
        todoCards.forEach((item, index) => {
          if (item.id == draggingElement.id) {
            item.status = 'In Progress'
            inProgressCards.push(item)
            renderCards(inProgressCards, inProgressCardsElement)
            renderCardsAfterFetch()
            todoCards.splice(index, 1)
            updateLocalStorage()
            renderCards(todoCards, todoCardsElement)
          }
        })
        completedCards.forEach((item, index) => {
          if (item.id == draggingElement.id) {
            item.status = 'In Progress'
            inProgressCards.push(item)
            renderCards(inProgressCards, inProgressCardsElement)
            renderCardsAfterFetch()
            completedCards.splice(index, 1)
            updateLocalStorage()
            renderCards(completedCards, completedCardsElement)
          }
        })
      } else if (container.classList.contains('todo-cards')) {
        inProgressCards.forEach((item, index) => {
          if (item.id == draggingElement.id) {
            item.status = 'Todo'
            todoCards.push(item)
            renderCards(todoCards, todoCardsElement)
            renderCardsAfterFetch()
            inProgressCards.splice(index, 1)
            updateLocalStorage()
            renderCards(inProgressCards, inProgressCardsElement)
          }
        })
        completedCards.forEach((item, index) => {
          if (item.id == draggingElement.id) {
            item.status = 'Todo'
            todoCards.push(item)
            renderCards(todoCards, todoCardsElement)
            renderCardsAfterFetch()
            completedCards.splice(index, 1)
            updateLocalStorage()
            renderCards(completedCards, completedCardsElement)
          }
        })
      } else if (container.classList.contains('completed-cards')){
        todoCards.forEach((item, index) => {
          if (item.id == draggingElement.id) {
            item.status = 'Completed'
            completedCards.push(item)
            renderCards(completedCards, completedCardsElement)
            renderCardsAfterFetch()
            todoCards.splice(index, 1)
            updateLocalStorage()
            renderCards(todoCards, todoCardsElement)
          }
        })
        inProgressCards.forEach((item, index) => {
          if (item.id == draggingElement.id) {
            item.status = 'Completed'
            completedCards.push(item)
            renderCards(completedCards, completedCardsElement)
            renderCardsAfterFetch()
            inProgressCards.splice(index, 1)
            updateLocalStorage()
            renderCards(inProgressCards, inProgressCardsElement)
          }
        })
      }
    })
  })
}

function handleReload () {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderOptions(data)
    })
  globalRender()
  handleDragAndDrop()
  renderCardsAfterFetch()
}

function fetchData (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.onload = function () {
    if (xhr.status == 200) {
      callback(xhr.response)
    } else if (xhr.status >= 400) {
      console.error(`Error: status ${xhr.status} ${xhr.statusText}`)
    }
  }
  xhr.onerror = function () {
    console.error(`Something went wrong`)
  }
  xhr.send()
}




modalAddTodoElement.addEventListener('submit', handleAddTodo)
listsElement.addEventListener('click', handleDeleteCertainTodo)
listsElement.addEventListener('submit', handleEditCertainCard)
listsElement.addEventListener('change', handleChangeCategory)
deleteAllButtonElement.addEventListener('click', handleDeleteAllButton)
completeAllButtonElement.addEventListener('click', handleCompleteAllElement)


window.addEventListener('DOMContentLoaded', handleClock)
window.addEventListener('DOMContentLoaded', handleReload)
window.addEventListener('mouseover', handleDragAndDrop)
