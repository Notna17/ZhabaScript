const board = [['O', 'X', ' '],
               ['O', 'X', ' '],
               ['O', ' ', 'X'],] 
//'X'  це хід хрестиків, 'O' це хід нуликів, ' ' це поки порожня клітинка. Один [] усередині board це 1 рядок
const winner = (rows, symbolX = 'X', symbolO = 'O') => {
    let winX = false
    let winO = false
    const array = rows.flat()
    const collums = [[array[0],array[3],array[6]],   [array[1],array[4],array[7]],   [array[2],array[5],array[8]]]
    const diagonals = [[array[0],array[4],array[8]],   [array[2],array[4],array[6]]]
    const solutions = [...rows, ...collums, ...diagonals]
    for (const solution of solutions) {
        if (solution[0] === symbolX && solution[1] === symbolX && solution[2] === symbolX) winX = true
        if (solution[0] === symbolO && solution[1] === symbolO && solution[2] === symbolO) winO = true
    }
    if (winX && winO) console.log('Сталася дивна ситуація, перемогли і хрестики, і нулики. Ви точно грали за правилами?')
    if (winX && !winO) console.log('Хрестики перемогли!')
    if (!winX && winO) console.log('Нулики перемогли!')
    if (!winX && !winO) console.log('Поки що ніхто не переміг')
}
winner(board)