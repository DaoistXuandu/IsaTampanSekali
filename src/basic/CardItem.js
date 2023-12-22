import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./CardItem.css"
import { deleteShip, updateShip } from "../api/api";
import DropDown from "./Dropdown";
import { setDate } from "../date"

function CardItem({ ship }) {
    const [btnColor, setBtnColor] = useState(0);
    const navigate = useNavigate()


    const name = ship.name;
    const rawBought_at = ship.bought_at;
    const rawUpdated_at = ship.updated_at;
    const description = ship.description;
    const capacity = ship.capacity;
    const color = ship.color;
    const status = ship.is_sailing;

    const dataBought = setDate((new Date(rawBought_at)));
    const dataUpdate = setDate((new Date(rawUpdated_at)));

    function handleDel() {
        if (window.confirm("Are you sure want to delete this ship?")) {
            console.log(1)
            deleteShip(ship.id)
            navigate(-1);
        }
    }

    function handleText() {
        let descText = document.getElementById("descText")
        let desc = document.getElementById("desc")
        desc.classList.toggle("d-none")
        descText.classList.toggle("d-none")

        if (!descText.classList.contains("d-not")) {
            descText.value = desc.innerHTML
        }
    }

    function handleTextChange(e) {
        if (e.key == "Enter") {
            let data = ship
            let descText = document.getElementById("descText")
            let desc = document.getElementById("desc")

            data.description = descText.value
            updateShip(data)
            handleText()
        }
    }

    return (
        <div className="cardsItem wordwrap">
            <div className="row">
                <div className="col-md-7 col-12">
                    <div className="main-info">
                        <div id="name">{name}</div>
                        <div id="dateUpdate">Last Updated: {dataUpdate}</div>
                    </div>
                    <div className="description-info">
                        <b>Description</b>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16" onClick={handleText}>
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                        <div id="desc">{description}</div>
                        <textarea id="descText" className="d-none" onKeyDown={handleTextChange}></textarea>
                    </div>
                    <div className="btn-place">
                        <button type="button" class={`btn col-md-2 col-12 ${btnColor == 0 ? "btn-secondary" : "btn-primary"}`} onMouseEnter={() => setBtnColor(1)} onMouseLeave={() => setBtnColor(0)} onClick={handleDel} >Delete</button>
                    </div>
                </div>

                <div className="col-md-5 col-12">
                    <div className="description-info">
                        <div id="info"><b>Information</b></div>
                        <div className="info-group">
                            <div id="capacity" className="info-item g-0">Capacity:</div>
                            <DropDown value={capacity} id={1} ship={ship} />
                            <div id="color" className="info-item">Color:</div>
                            <DropDown value={color} id={2} enable={3} ship={ship} />
                            <div id="dateBought" className="info-item">Date Bought:</div>
                            <DropDown value={dataBought} enable={1} id={3} ship={ship} />

                            <div id="status" className="info-item">Status:</div>
                            <DropDown value={status ? "Offshore" : "Onshore"} enable={0} id={4} ship={ship} />

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )


}

export default CardItem;