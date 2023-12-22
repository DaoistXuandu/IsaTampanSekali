export function setDate(localString) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let day = days[localString.getDay() % 7];
    let date = localString.toLocaleString().split(", ")[0].split("/");
    let time = localString.toLocaleString().split(", ")[1]
    let formattedDate = `${date[1]} ${months[date[0] - 1].slice(0, 3)} ${date[2]}`;

    return `${day}, ${formattedDate} at ${time}`
}