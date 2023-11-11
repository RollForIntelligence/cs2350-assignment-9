//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"

function DisplayGuests() {
    if (localStorage.getItem("guests")) {
        let guests = JSON.parse(localStorage.getItem("guests"))
        let guests_HTML = ''
        for (let g of guests) {
            guests_HTML += `
            <tr>
              <td>${g.first}</td>
              <td>${g.last}</td>
            </tr>
            `
        }

        document.getElementById("guests").innerHTML = guests_HTML
    }
    else (
        document.getElementById("guests").innerHTML = ''
    )
}

function GetGuests() {
    if (localStorage.getItem('guests')) {
        return JSON.parse(localStorage.getItem('guests'))
    }
    else {
        return []
    }
}

function AddGuest(event) {
    event.preventDefault()

    let f = document.querySelector("#first-name").value
    let l = document.querySelector("#last-name").value

    let guests = GetGuests()
    if (f && l) {
        let guest = {
            first: f, last: l
        }

        for (let g of guests) {
            if (guest.first == g.first && guest.last == g.last) {
                alert("Already registered")
                CancelGuest()
                DisplayGuests()
                return
            }
        }
        guests.push(guest)
        localStorage.setItem("guests", JSON.stringify(guests))
    }

    CancelGuest()

    DisplayGuests()
}

function ClearGuests() {
    localStorage.removeItem("guests")

    DisplayGuests()
}

function CancelGuest() {
    document.querySelector('#first-name').value = ''
    document.querySelector('#last-name').value = ''
}


document.querySelector('#myForm').onsubmit = AddGuest
document.querySelector('#clear-guests').onclick = ClearGuests
document.querySelector('#reset').onclick = CancelGuest

DisplayGuests()