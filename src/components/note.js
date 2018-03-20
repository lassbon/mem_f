// Add your javascript here
const noteForm = document.getElementById('js-note-form')
const textArea = document.getElementById('js-note-textarea')

let state = {}
const stateSubscribers = {}

const updateState = data => {
  state = { ...state, ...data }
  Object.keys(data).forEach(key => {
    emit(key, data)
  })
}
const emit = (key, data) => {
  if (!state[key]) return

  const subscribers = stateSubscribers[key]
  subscribers.forEach(func => {
    func(key, data)
  })
}
const subscribe = (key, subscriber) => {
  if (!stateSubscribers[key]) {
    stateSubscribers[key] = []
  }
  return stateSubscribers[key].push(subscriber)
}

const getData = (...inputs) => {
  return inputs.reduce((obj, input) => {
    obj[input.name] = input.value
    return obj
  }, {})
}

const renderNotes = (key, data) => {
  console.log(key)
}

subscribe('note', renderNotes)

const noteFormSubmitHandler = e => {
  e.preventDefault()
  const data = getData(textArea)
  // updateState({note: data.note})

  // console.log(data)
}

noteForm.addEventListener('submit', noteFormSubmitHandler, false)
