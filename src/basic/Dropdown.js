import "./Dropdown.css"
import { useState } from "react"
import { enumColors } from "../enumColors"
import { updateShip, sailShip } from "../api/api"

function DropDown({ value, id, enable = 2, ship }) {
    const [status, setStatus] = useState(0)

    function handleSelectChange() {
        let selectDefault = document.getElementById(`custom-${id}`)
        let input = document.getElementById(`input-${id}`)
        let selectInput = document.getElementById(`inputGroupSelect${id}`)
        if (selectDefault.value == "2") {
            if (enable == 3) {
                input.classList.add("d-none")
                selectInput.classList.remove("d-none")
                selectInput.value = value
            }
            input.disabled = false
        }
        else {
            if (enable == 3) {
                input.classList.remove("d-none")
                selectInput.classList.add("d-none")
            }
            input.disabled = true
            input.value = value
        }
    }

    function handleSelectInputChange() {
        let selectInput = document.getElementById(`inputGroupSelect${id}`)
        let input = document.getElementById(`input-${id}`)
        let data = ship
        data.color = selectInput.value
        updateShip(data)
        input.classList.remove("d-none")
        selectInput.classList.add("d-none")
    }

    function handleInput(e) {
        if (e.key == "Enter") {
            let input = document.getElementById(`input-${id}`)
            let selectDefault = document.getElementById(`custom-${id}`)

            let data = ship

            if (parseInt(input.value).toString() != input.value) {
                alert("Capacity must be an integer")
                return
            }

            data.capacity = parseInt(input.value)
            updateShip(data)
            input.disabled = true
            selectDefault.value = 1
        }
    }

    function handleSail() {
        if (enable == 0) {
            sailShip(ship.id)
        }
    }

    return (
        <div className="row">
            <div className="col-md-9 col-12 left-area">
                <input id={`input-${id}`} className="input-style" defaultValue={value} disabled onKeyDown={handleInput}></input>
                <select class="d-none form-select" id={`inputGroupSelect${id}`} onChange={handleSelectInputChange}>
                    {
                        enumColors().map(item => (
                            <option value={item} key={item} id={item}>{item}</option>
                        ))
                    }
                </select>

            </div>
            <div className="col-md-3 col-12 right-area">
                {enable <= 1 ? <button id={`button-${id}`} type="button" onClick={handleSail} class={`btn button-square btn-${enable == 1 ? "secondary" : "primary"}`}>{enable == 1 ? "Show" : ship.is_sailing ? "Sailing" : "Set Sail"}</button> :
                    <select id={`custom-${id}`} class="form-select" onChange={handleSelectChange}>
                        <option value="1">Show</option>
                        <option value="2">Edit</option>
                    </select>
                }
            </div>
        </div >
    )
}

export default DropDown;