import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useState, useEffect } from 'react';

import { GetShip, addShip, deleteShip } from '../api/api';
import CardItem from './CardItem';
import { enumColors } from '../enumColors';
import { setDate } from '../date';

function Home({ data }) {
    let list_of_ship = data, valid = 0;
    const navigate = useNavigate()

    if (list_of_ship != null) {
        list_of_ship = list_of_ship.daftarPerahu;
        valid = 1
    }

    function getGrid() {
        if (valid == 0) return;
        let cards = [];
        list_of_ship.forEach(element => {


            const dateUpdate = setDate(new Date(element.bought_at));
            const timeUpdate = setDate(new Date(element.updated_at));

            const status = `${element.is_sailing ? "Offshore" : "Onshore"}`;

            cards.push(
                <div className='items wordwrap' key={element.id}>
                    <div className='name'>{element.name}</div>
                    <div className='basicInfo'>
                        <div className='timeUpdate'>Last updated: {timeUpdate}</div>
                        <div className='sailing'>Status: <b>{status}</b></div>
                    </div>
                    {/* <button className='info' onClick={() => handleInfo(element.id)}><u>See More</u></button> */}
                    <button className='info' onClick={() => navigate(`/${element.id}`)}><u>See More</u></button>
                </div >
            )
        });
        return cards;
    }

    function handleAdd(e) {
        e.preventDefault();
        const element = document.getElementsByClassName("addForm")[0];
        element.classList.toggle("d-none")
    }

    function handleBtn() {
        let form = document.getElementsByClassName("form-group");
        let color = document.getElementsByClassName("form-select")[0];
        let data = []
        for (let i = 0; i < 3; i++) {
            if (form[i].children[1].value == "") {
                alert("Input must not be empty");
                return;
            }
            else if (i == 2 && parseInt(form[i].children[1].value).toString() != form[i].children[1].value) {
                alert("Capacity must be an integer");
                return;
            }
            else data.push(form[i].children[1].value)
        }

        if (color.value == "Choose...") {
            alert("Input must not be empty");
            return;
        }
        else data.push(color.value);
        addShip(data)
    }


    return (
        <div className="Home position-relative">
            <div className='title d-flex justify-content-center align-items-center'>
                Shipyard Management
            </div>
            <div className='adds'>
                <div className='addButton position-fixed' onClick={handleAdd}>
                    <div className='position-relative addIcon d-flex justify-content-center align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="bi bi-database-fill-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1" />
                            <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12.31 12.31 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.552 4.552 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.507 4.507 0 0 1-1.3-1.905" />
                        </svg>
                    </div>
                </div>
                <div className='addForm position-fixed d-none'>
                    <div className='d-flex justify-content-center addTitle'>
                        Add Ship
                    </div>
                    <div class="form-group">
                        <label for="nameInput">Name</label>
                        <input type="email" class="form-control col-6 in" aria-describedby="emailHelp" placeholder="Enter name"></input>
                    </div>
                    <div class="form-group">
                        <label for="descInput">Description</label>
                        <input type="email" class="form-control col-6 in" aria-describedby="emailHelp" placeholder="Enter description"></input>
                    </div>
                    <div class="form-group">
                        <label for="capacityInput">Capacity</label>
                        <input type="email" class="form-control col-6 in" aria-describedby="emailHelp" placeholder="Enter capacity"></input>
                    </div>

                    <label class="col-12" for="inputGroupSelect01">Options</label>
                    <select class="form-select col-12" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        {
                            enumColors().map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))
                        }
                    </select>

                    <div className='d-flex justify-content-center'>
                        <button type="button" class="btn btn-primary btn-md" onClick={handleBtn}>Submit</button>
                    </div>
                </div>
            </div>
            <div className='grid d-flex flex-row flex-wrap justify-content-center'>
                {getGrid()}
            </div>
        </div>
    );
}

export default Home;
