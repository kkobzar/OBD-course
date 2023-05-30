const socket = io()
const messageForm = document.getElementById('chat-form')

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

})

function renderMessage(m){
    const div = document.createElement('div')
    div.classList.add('message-item')
    div.innerHTML = `<div class="message-item">
                <div class="message-author">Tester</div>
                <div class="message-ts">19:30</div>
                <div class="message-text">
                ${m}
                </div>
            </div>`
    document.getElementById('message-container').appendChild(div)
}