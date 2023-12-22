import { useEffect } from "react";
import GetToken from "./token";
import { useState } from "react";
import axios from "axios";

const authToken = GetToken();
const config = {
    headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json' // Assuming the content type is JSON
    }
};

export function GetShip() {
    const url = "https://oprec-betis-be.up.railway.app/perahu";
    const [ship, setShip] = useState()

    useEffect(() => {
        axios.get(url, config)
            .then(response => {
                setShip(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    return ship;
}

export function addShip(data) {
    const url = "https://oprec-betis-be.up.railway.app/perahu";
    axios.post(url, {
        name: data[0],
        description: data[1],
        capacity: parseInt(data[2]),
        color: data[3]
    }, config)
        .then(response => {
            alert("Ship has been added")
            window.location.reload(false)
        })
        .catch(error => {
            alert("Ship failed to added")
            console.error('Error:', error);
        });


}

export function deleteShip(id) {
    const url = `https://oprec-betis-be.up.railway.app/perahu/${id}`;
    axios.delete(url, config)
        .then(response => {
            alert("Ship has been removed")
            window.location.reload(false)
        })
        .catch(error => {
            alert("Ship failed to remove")
            console.error('Error:', error);
        });
}


export function updateShip(data) {
    const url = `https://oprec-betis-be.up.railway.app/perahu/${data.id}`;
    axios.patch(url, {
        name: data.name,
        description: data.description,
        capacity: data.capacity,
        color: data.color
    }, config)
        .then(response => {
            alert("Ship has been updated")
            window.location.reload(false)
        })
        .catch(error => {
            alert("Ship failed to update")
            console.error('Error:', error);
        });
}

export function sailShip(id) {
    const url = `https://oprec-betis-be.up.railway.app/perahu/${id}/berlayar`;
    axios.patch(url, {}, config)
        .then(response => {
            alert("Ship has been sailed")
            window.location.reload(false)
        })
        .catch(error => {
            alert("Ship failed to sail")
            console.error('Error:', error);
        });
}
