import { getTime } from "./utilites"

class Card {
  constructor (title, description, user, color) {
    this.id = Date.now()
    this.createdAt = getTime()
    this.title = title
    this.description = description
    this.user = user
    this.color = color
    this.status = 'Todo'
  }
  getCardTemplate () {
    const title = this.title
    const description = this.description
    const user = this.user
    const time = this.createdAt
    const id = this.id
    const color = this.color
    let todoStatus = this.status == 'Todo' ? 'selected' : ''
    let inProgressStatus = this.status == 'In Progress' ? 'selected' : ''
    let completedStatus = this.status == 'Completed' ? 'selected' : ''
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
}

export { Card }
