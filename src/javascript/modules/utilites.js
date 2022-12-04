import { getUserTemplate, getCardTemplate } from "./templates"
import {
  url
  , todoCards
  , inProgressCards
  , completedCards
  , todoCardsElement
  , inProgressCardsElement
  , completedCardsElement
} from "./variables"

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


function countTasks () {
  const todoListTitleElement = document.querySelector('.lists__todo-list-title')
  const inProgressListTitleElement = document.querySelector('.lists__in-progress-list-title')
  const completedListTitleElement = document.querySelector('.lists__completed-list-title')
  todoListTitleElement.textContent = `TODO : ${todoCards.length}`
  inProgressListTitleElement.textContent = `IN PROGRESS : ${inProgressCards.length}`
  completedListTitleElement.textContent = `Completed : ${completedCards.length}`
}

export {
  getTime
  , updateLocalStorage
  , renderOptions
  , renderCardsAfterFetch
  , renderCertainCardOptions
  , renderCards
  , globalRender
  , countTasks
}
