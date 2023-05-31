const socket = io()
const messageForm = document.getElementById('chat-form')
const messageContainer = document.getElementById('message-container')

const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix: true})

socket.emit('joinRoom', {username, room})
socket.on('message', message => {
    console.log(message)
    renderMessage(message)
})

//emit message on form submission
messageForm.addEventListener('submit', e => {
    e.preventDefault()

    const msg = e.target.elements.messageBox.value

    console.log(msg)
    socket.emit('chatMessage', msg)

    e.target.elements.messageBox.value = ''

})

function renderMessage(m){
    const div = document.createElement('div')
    div.classList.add('message-item')
    div.innerHTML = `<div class="message-item">
                <div class="message-author">${m.username}</div>
                <div class="message-ts">${m.date}</div>
                <div class="message-text">
                ${m.msg}
                </div>
            </div>`
    messageContainer.appendChild(div)
}