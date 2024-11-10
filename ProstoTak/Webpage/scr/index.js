const end = (playerX) => {
    for (let i = 0; i < 9; i++) {
        let el = document.getElementById(i.toString())
        el.onclick = null   
    }
    if (playerX) {
        header.innerHTML = "Хрестики виграли, вітаю!"
    } else {
        header.innerHTML = "Нулики виграли, вітаю!"
    }

}
const clicked = (id) =>  {
    return () => {
        let now = document.getElementById(id)
        if (xmove) {
            now.innerHTML = "X"
            now.style.color = "FF0000"
            array[id] = true
        } else { 
            now.innerHTML = "O"
            now.style.color = "0000FF"
            array[id] = false
        }
        xmove = !xmove
        now.onclick = null
        isWinner()
    }
}
const isWinner = () => {
    let winner = null
    //чек діагоналей
    if ((array[0] === array[8] && array[0] === array[4] && array[0] !== undefined) || (array[2] === array[4] && array[6] === array[4] && array[2] !== undefined)) {
        end(array[4])
        return
    }
    //чек колон і потім рядків
    for (let i = 0; i < 3; i++) {
        if (array[i] === array[i+3] && array[i+6] === array[i] && array[i] !== undefined) {
            end(array[i])
            return
        }
        if (array[i*3] === array[1+(i*3)] && array[2+(i*3)] === array[i*3] && array[i*3] !== undefined) {
            end(array[i*3])
            return
        }
    }
}
const header = document.getElementById("header")
const table = document.getElementById("table")
let array = new Array(9)
let xmove = true
for (let i = 0; i < 3; i++) {
    const row = document.createElement("div")
    row.classList.add("row")
    for (let j = 0; j < 3; j++) {
      let button = document.createElement("div")
      let id = 3*i + j
      button.classList.add("button")
      button.id = id.toString()
      button.onclick = clicked(id)
      row.appendChild(button);
    }
    table.appendChild(row);
}

const restart = document.getElementById("restart")
const refresh = () => {
    array = new Array(9)
    xmove = true
    header.innerHTML = "Гра у хрестики-нулики на двох!"
    for (let i = 0; i < 9; i++) {
        el = document.getElementById(i.toString())
        el.innerHTML = " "
        el.onclick = clicked(i)
    }
}
restart.onclick = refresh