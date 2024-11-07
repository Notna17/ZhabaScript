const tbl = document.createElement("table")
const tblBody = document.createElement("tbody")
const header = document.getElementById("header")
let array = [null, null, null, null, null, null, null, null, null]
let xmove = true
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
    //чек діагоналей
    if ((array[0] === array[8] && array[0] === array[4] && array[0] !== null) || (array[2] === array[4] && array[6] === array[4] && array[2] !== null)) {
        end(array[4])
        return
    }
    //чек колон і потім рядків
    for (let i = 0; i < 3; i++) {
        if (array[i] === array[i+3] && array[i+6] === array[i] && array[i] !== null) {
            end(array[i])
            return
        }
        if (array[i*3] === array[1+(i*3)] && array[2+(i*3)] === array[i*3] && array[i*3] !== null) {
            end(array[i*3])
            return
        }
    }
}
for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr")
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement("td")
      let button = document.createElement("button")
      let id = 3*i + j
      button.style.width = "100px"
      button.style.height = "100px"
      button.style.fontSize = "80px"
      button.id = id.toString()
      button.onclick = clicked(id)
      cell.appendChild(button);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
}


tbl.appendChild(tblBody);
document.body.appendChild(tbl);
