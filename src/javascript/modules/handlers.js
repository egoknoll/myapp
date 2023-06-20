import { getTime } from "./utilites"
import {
  url,
  todoCards,
  inProgressCards,
  completedCards,
  todoCardsElement,
  inProgressCardsElement,
  completedCardsElement,
  todoTitleElement,
  todoDescriptionElement,
  todoUserElement,
  todoColorpickerElement,
  modalAddTodoElement,
} from "./variables"
import {
  globalRender,
  renderOptions,
  countTasks,
  renderCardsAfterFetch,
  renderCards,
  updateLocalStorage,
} from "./utilites"

import { Card } from "./classes"


function handleDeleteAllButton (event) {
  event.preventDefault()
  completedCards.length = 0
  updateLocalStorage()
  globalRender()
  countTasks()
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
    countTasks()
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
          countTasks()
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
    countTasks()
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
  countTasks()
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
  countTasks()
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
            countTasks()
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
            countTasks()
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
            countTasks()
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
            countTasks()
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
            countTasks()
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
            countTasks()
          }
        })
      }
    })
  })
}

function hadleSecretButton () {
  const secretVideoElement = document.querySelector('.secret-video')
  secretVideoElement.play()
  }
  function hadleDismissSecretButton () {
    const secretVideoElement = document.querySelector('.secret-video')
    secretVideoElement.pause()
  }


function handleReload () {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderOptions(data)
    })
  globalRender()
  countTasks()
  handleDragAndDrop()
  renderCardsAfterFetch()
}

export {
  handleDeleteAllButton,
  handleDeleteCertainTodo,
  handleChangeCategory,
  handleCompleteAllElement,
  handleEditCertainCard,
  handleClock,
  handleAddTodo,
  handleDragAndDrop,
  handleReload,
  hadleSecretButton,
  hadleDismissSecretButton,
}
