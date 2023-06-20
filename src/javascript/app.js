
import {
  handleDeleteAllButton,
  handleDeleteCertainTodo,
  handleChangeCategory,
  handleCompleteAllElement,
  handleEditCertainCard,
  handleClock,
  handleAddTodo,
  handleDragAndDrop,
  handleReload,
  hadleDismissSecretButton,
  hadleSecretButton,
} from './modules/handlers'

import {
  modalAddTodoElement,
  listsElement,
  deleteAllButtonElement,
  completeAllButtonElement,
  secretButtonElement,
  dismissSecretButtonElement,
} from './modules/variables'


modalAddTodoElement.addEventListener('submit', handleAddTodo)
listsElement.addEventListener('click', handleDeleteCertainTodo)
listsElement.addEventListener('submit', handleEditCertainCard)
listsElement.addEventListener('change', handleChangeCategory)
deleteAllButtonElement.addEventListener('click', handleDeleteAllButton)
completeAllButtonElement.addEventListener('click', handleCompleteAllElement)
secretButtonElement.addEventListener('click', hadleSecretButton)
dismissSecretButtonElement.addEventListener('click', hadleDismissSecretButton)


window.addEventListener('DOMContentLoaded', handleClock)
window.addEventListener('DOMContentLoaded', handleReload)
window.addEventListener('mouseover', handleDragAndDrop)
