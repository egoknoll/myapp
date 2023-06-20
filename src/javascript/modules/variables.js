
const url = 'https://jsonplaceholder.typicode.com/users'
const todoCards = JSON.parse(localStorage.getItem('todos')) || []
const inProgressCards = JSON.parse(localStorage.getItem('inProgress')) || []
const completedCards = JSON.parse(localStorage.getItem('completed')) || []

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
const secretButtonElement = document.querySelector('.secret-button')
const dismissSecretButtonElement = document.querySelector('.close-secret-button')


export {
  url,
  todoCards,
  inProgressCards,
  completedCards,
  listsElement,
  modalAddTodoElement,
  todoTitleElement,
  todoDescriptionElement,
  todoUserElement,
  todoCardsElement,
  inProgressCardsElement,
  completedCardsElement,
  deleteAllButtonElement,
  todoColorpickerElement,
  completeAllButtonElement,
  buttonAddTodoElement,
  secretButtonElement,
  dismissSecretButtonElement,
}
