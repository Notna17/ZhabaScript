const canvasG = document.getElementById('canvasGraph');
const canvasT = document.getElementById('canvasTree');
const buttonBFS = document.getElementById('bfs');
const buttonDFS = document.getElementById('dfs');
const n1 = 4;
const n2 = 1;
const n3 = 0;
const n4 = 8;
const k = 1 - (n3 * 0.05) - (n4 * 0.005) - 0.15;
const nodeNumber = 10 + n3;
const nodeRadius = 15;
const nodes = [
    {x: 100, y: 100},
    {x: 300, y: 100},
    {x: 500, y: 100},
    {x: 700, y: 100},
    {x: 100, y: 300},
    {x: 400, y: 300},
    {x: 700, y: 300},
    {x: 100, y: 500},
    {x: 400, y: 500},
    {x: 700, y: 500},
]
const randomizeArray = () => {
const result = [];
for (let i = 0; i < nodeNumber; i++) {
    const row = [];
    for (let j = 0; j < nodeNumber; j++) {
    row.push(Math.floor(Math.random() * 2 * k));
    }
    result.push(row);
} return result };
const randomArray = randomizeArray();
console.log('Random matrix:');
console.log(randomArray);

const drawCurve = (ctx, x1, y1, x2, y2, arrowed) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const adjustedX1 = x1 + 15 * Math.cos(angle);
    const adjustedY1 = y1 + 15 * Math.sin(angle);
    const adjustedX2 = x2 - 15 * Math.cos(angle);
    const adjustedY2 = y2 - 15 * Math.sin(angle); 
    const midX = (adjustedX1 + adjustedX2) / 2;
    const midY = (adjustedY1 + adjustedY2) / 2; 
    const dx = adjustedX2 - adjustedX1;
    const dy = adjustedY2 - adjustedY1;
    const len = Math.sqrt(dx*dx + dy*dy);
    const nx = -dy/len;
    const ny = dx/len; 
    const offset = len * 0.2;
    const controlX = midX + nx * offset;
    const controlY = midY + ny * offset; 
    ctx.beginPath();
    ctx.moveTo(adjustedX1, adjustedY1);
    ctx.quadraticCurveTo(controlX, controlY, adjustedX2, adjustedY2);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (arrowed) {
    const arrowAngle = Math.atan2(adjustedY2 - controlY, adjustedX2 - controlX);
    ctx.beginPath();
    ctx.moveTo(adjustedX2, adjustedY2);
    ctx.lineTo(
        adjustedX2 - 10 * Math.cos(arrowAngle - Math.PI/6),
        adjustedY2 - 10 * Math.sin(arrowAngle - Math.PI/6)
    );
    ctx.lineTo(
        adjustedX2 - 10 * Math.cos(arrowAngle + Math.PI/6),
        adjustedY2 - 10 * Math.sin(arrowAngle + Math.PI/6)
    );
    ctx.closePath();
    ctx.fillStyle = '#666';
    ctx.fill();}
};
const drawLoop = (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y - 15, 25, Math.PI/2, Math.PI*2.5);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.stroke();
};
const drawGraph = (canvas, nodes, matrix, directed) => {
 const ctx = canvas.getContext('2d');
 matrix.forEach((row, i) => {
    row.forEach((value, j) => {
        if (value === 1) {
            const node1 = nodes[i];
            const node2 = nodes[j];
            if (i === j) {drawLoop(ctx, node1.x, node1.y)}
            else {drawCurve(ctx, node1.x, node1.y, node2.x, node2.y, directed)}
        };
    });
  });

 nodes.forEach((node, id) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#a0a0a0';
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(id, node.x, node.y);
  });
};
drawGraph(canvasG, nodes, randomArray, true);
let visited = new Set();
let queue = [];
let stack = [];
let currentStep = 0;
let isBFS = false;
let isDFS = false;
let treeEdges = [];
let treeNodes = [];
let parentMap = {};


const printTreeMatrix = () => {
    const matrix = Array(nodeNumber).fill().map(() => Array(nodeNumber).fill(0));
    treeEdges.forEach(([from, to]) => {
        matrix[from][to] = 1;
    });
    console.log("Матриця суміжності дерева обходу:");
    console.log(matrix);
}

const printRenumberingVector = () => {
    const renumbering = {};
    let newNumber = 0;
    const order = isBFS ? Array.from(visited) : treeNodes;
    
    order.forEach(nodeId => {
        if (!(nodeId in renumbering)) {
            renumbering[nodeId] = newNumber++;
        }
    });
    console.log("Вектор відповідності номерів вершин:");
    console.log("Старий номер -> Новий номер");
    Object.entries(renumbering).forEach(([oldNum, newNum]) => {
        console.log(`${oldNum} -> ${newNum}`);
    });
}

const findStartNode = () => {
    for (let i = 0; i < nodeNumber; i++) {
        if (randomArray[i].some((val, j) => val === 1 && i !== j)) {
            return i;
        }
    }
    return -1; 
}

const initBFS = () => {
    buttonDFS.style.display = 'none';
    buttonBFS.style.display = 'none';
    isBFS = true;
    const startNode = findStartNode();
    if (startNode === -1) {
        console.log("Немає вершин для обходу!");
        return;
    }
    visited.clear();
    queue = [startNode];
    visited.add(startNode);
    treeEdges = [];
    treeNodes = [startNode];
    parentMap = { [startNode]: null };
    console.log(`Початок BFS з вершини ${startNode}`);
    updateTreeCanvas();
}

const initDFS = () => {
    buttonBFS.style.display = 'none';
    buttonDFS.style.display = 'none';
    isDFS = true;
    const startNode = findStartNode();
    if (startNode === -1) {
        console.log("Немає вершин для обходу!");
        return;
    }
    visited.clear();
    stack = [startNode];
    treeEdges = [];
    treeNodes = [startNode];
    parentMap = { [startNode]: null };
    console.log(`Початок DFS з вершини ${startNode}`);
    updateTreeCanvas();
}

const updateTreeCanvas = () => {
    const ctx = canvasT.getContext('2d');
    ctx.clearRect(0, 0, canvasT.width, canvasT.height);
    treeEdges.forEach(([from, to]) => {
        const nodeFrom = nodes[from];
        const nodeTo = nodes[to];
        drawCurve(ctx, nodeFrom.x, nodeFrom.y, nodeTo.x, nodeTo.y, true);
    });
    treeNodes.forEach((nodeId) => {
        const node = nodes[nodeId];
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = visited.has(nodeId) ? '#4CAF50' : '#a0a0a0';
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nodeId, node.x, node.y);
    });
}

function bfsStep() {
    if (queue.length === 0) {
        const nextStart = findUnvisitedNode();
        if (nextStart !== -1) {
            queue.push(nextStart);
            visited.add(nextStart);
            parentMap[nextStart] = null;
            console.log(`Перехід до нової компоненти: вершина ${nextStart}`);
            return;
        } else {
            console.log("BFS завершено!");
            printTreeMatrix();
            printRenumberingVector();
            return;
        }
    }

    const current = queue.shift();
    console.log(`BFS крок ${currentStep}: відвідуємо ${current}`);
    for (let neighbor = 0; neighbor < nodeNumber; neighbor++) {
        if (randomArray[current][neighbor] === 1 && !visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
            treeEdges.push([current, neighbor]);
            treeNodes.push(neighbor);
            parentMap[neighbor] = current;
            console.log(`  Додаємо вершину ${neighbor} до черги`);
        }
    }

    currentStep++;
    updateTreeCanvas();
}

function dfsStep() {
    if (stack.length === 0) {
        const nextStart = findUnvisitedNode();
        if (nextStart !== -1) {
            stack.push(nextStart);
            parentMap[nextStart] = null;
            treeNodes.push(nextStart);
            console.log(`Знайдено нову компоненту: починаємо з вершини ${nextStart}`);
            updateTreeCanvas();
            return;
        } else {
            console.log("DFS завершено!");
            printTreeMatrix();
            printRenumberingVector();
            return;
        }
    }

    const current = stack[stack.length - 1];
    
    if (!visited.has(current)) {
        visited.add(current);
        console.log(`DFS крок ${currentStep}: відвідуємо ${current}`);
    }
    let nextNeighbor = -1;
    for (let neighbor = 0; neighbor < nodeNumber; neighbor++) {
        if (randomArray[current][neighbor] === 1 && !visited.has(neighbor) && !parentMap.hasOwnProperty(neighbor)) {
            nextNeighbor = neighbor;
            break;
        }
    }

    if (nextNeighbor !== -1) {
        stack.push(nextNeighbor);
        treeEdges.push([current, nextNeighbor]);
        treeNodes.push(nextNeighbor);
        parentMap[nextNeighbor] = current;
        console.log(`  Переходимо до вершини ${nextNeighbor}`);
    } else {
        stack.pop();
        console.log(`  Повертаємось від вершини ${current}`);
    }

    currentStep++;
    updateTreeCanvas();
}


const findUnvisitedNode = () => {
    for (let i = 0; i < nodeNumber; i++) {
        if (!visited.has(i)) { 
            return i;
        }
    }
    return -1;
}

const handleStep = () => {
    if (isBFS) bfsStep();
    else if (isDFS) dfsStep();
}

const stepButton = document.getElementById('step');
stepButton.addEventListener('click', handleStep);
buttonBFS.addEventListener('click', initBFS);
buttonDFS.addEventListener('click', initDFS);