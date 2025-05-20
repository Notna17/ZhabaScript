const canvasG = document.getElementById('canvasGraph');
const canvasT = document.getElementById('canvasBone');
const n1 = 4;
const n2 = 1;
const n3 = 0;
const n4 = 8;
const k = 1 - (n3 * 0.01) - (n4 * 0.005) - 0.05;
const nodeNumber = 10 + n3;
const nodeRadius = 15;
const nodes = [];
const nodeCoords = () => {
    let nodesPerRow = []
    let y = 100;
    let x = 100;
    if (nodeNumber % 3 === 0) {
        const l = nodeNumber / 3;
        nodesPerRow = [l, l, l]}
    if (nodeNumber % 3 === 1) {
        const l = (nodeNumber - 1) / 3;
        nodesPerRow = [l + 1, l, l]}
    if (nodeNumber % 3 === 2) {
        const l = (nodeNumber - 2) / 3;
        nodesPerRow = [l + 1, l, l + 1]}
    for (let i = 0; i < nodesPerRow.length; i++) {
        let deltaX = 600 / (nodesPerRow[i] - 1);
        for (let j = 0; j < nodesPerRow[i]; j++) {
            nodes.push({ x: x + j * deltaX, y: y })
        }
        y += 200;
        x = 100;
}}
nodeCoords();

const randomizeArray = () => {
const result = [];
for (let i = 0; i < nodeNumber; i++) {
    const row = [];
    for (let j = 0; j < nodeNumber; j++) {
        row.push(Math.floor(Math.random() * 2 * k))
    }
    result.push(row);
} return result };
const randomArray = randomizeArray();
const undirectedArray = randomArray.map((row, i) => {
    return row.map((value, j) => {
        if (i === j) {
            return 0;
        } else if (i < j) {
            return value;
        } else {
            return randomArray[j][i];
        }
    });
});
const weightGenerator = () => {
    const matrixB = [];
    const matrixC = [];
    const matrixD = [];
    const matrixH = [];
    const matrixTr = [];
    const matrixW = [];
    for (let i = 0; i < nodeNumber; i++) {
        const rowB = [];
        const rowC = [];
        const rowD = [];
        const rowTr = [];
        for (let j = 0; j < nodeNumber; j++) {
            const cellB = Math.random() * 2;
            const cellTr = (i < j) ? 1 : 0;
            const cellC = Math.ceil(cellB * 100 * undirectedArray[i][j]);
            const cellD = (cellC === 0) ? 0 : 1;
            rowB.push(cellB);
            rowC.push(cellC);
            rowD.push(cellD);
            rowTr.push(cellTr);

        }
        matrixB.push(rowB);
        matrixC.push(rowC);
        matrixD.push(rowD);
        matrixTr.push(rowTr);
    }
    for (let i = 0; i < nodeNumber; i++) {
        const rowH = [];
        const rowW = [];
        for (let j = 0; j < nodeNumber; j++) {
            const cellH = (matrixD[i][j] !== matrixD[j][i]) ? 1 : 0;
            let cellW;
            if (j < i) {cellW = matrixW[j][i]}
            else {cellW = (matrixD[i][j] + cellH * matrixTr[i][j]) * matrixC[i][j]}
            rowH.push(cellH);
            rowW.push(cellW);
        }
        matrixH.push(rowH);
        matrixW.push(rowW);
    }
    return matrixW;
};
const weightArray = weightGenerator();

const drawCurve = (ctx, x1, y1, x2, y2, arrowed, weight, color = "#666") => {
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
    ctx.strokeStyle = color;
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
        ctx.fillStyle = color;
        ctx.fill();
    }

    if (weight !== undefined) {
        const textX = midX + nx * offset * 0.5;
        const textY = midY + ny * offset * 0.5;
        
        ctx.fillStyle = '#aa2323';
        ctx.font = 'bold 15px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(weight.toString(), textX, textY);
    }
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
        if (value === 1 && (directed || i < j)) {
            const node1 = nodes[i];
            const node2 = nodes[j];
            if (i === j) {drawLoop(ctx, node1.x, node1.y)}
            else {drawCurve(ctx, node1.x, node1.y, node2.x, node2.y, directed, weightArray[i][j])}
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
drawGraph(canvasG, nodes, undirectedArray, false);

console.log('Ненапрямлена матриця');
console.log(undirectedArray);
console.log('Матриця ваг');
console.log(weightArray);

// n4 парний, отож роблю за алгоритмом Краскала
const edges = []; 
const mstEdges = []; 
let currentStep = 0; 
let parent = []; 

const initializeParent = () => {
    parent = [];
    for (let i = 0; i < nodeNumber; i++) {
        parent[i] = i;
    }
};
const find = (i) => {
    while (parent[i] !== i) {
        i = parent[i];
    }
    return i;
};
const union = (i, j) => {
    const a = find(i);
    const b = find(j);
    parent[a] = b;
};
const prepareEdges = () => {
    edges.length = 0;
    for (let i = 0; i < nodeNumber; i++) {
        for (let j = i + 1; j < nodeNumber; j++) {
            if (undirectedArray[i][j] === 1) {
                edges.push({
                    from: i,
                    to: j,
                    weight: weightArray[i][j]
                });
            }
        }
    }
    edges.sort((a, b) => a.weight - b.weight);
};
const visualizeStep = () => {
    const ctx = canvasT.getContext('2d');
    ctx.clearRect(0, 0, canvasT.width, canvasT.height);
    nodes.forEach((node, id) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#a0a0a0';
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(id, node.x, node.y);
    });
    
    mstEdges.forEach(edge => {
        const node1 = nodes[edge.from];
        const node2 = nodes[edge.to];
        drawCurve(ctx, node1.x, node1.y, node2.x, node2.y, false, edge.weight);
    });
    if (currentStep < edges.length && mstEdges.length < nodeNumber - 1) {
        const currentEdge = edges[currentStep];
        const node1 = nodes[currentEdge.from];
        const node2 = nodes[currentEdge.to];
        drawCurve(ctx, node1.x, node1.y, node2.x, node2.y, false, currentEdge.weight, '#bbb');
    }
};
const startAlgorithm = () => {
    console.log('Початок алгоритму Крускала');
    prepareEdges();
    initializeParent();
    visualizeStep();
};
const step = () => {
    if (mstEdges.length === nodeNumber - 1) {
        console.log('Алгоритм завершено. Мінімальне остовне дерево знайдено.');
        return;
    }
    
    if (currentStep >= edges.length) {
        console.log('Алгоритм завершено. Не вдалось знайти остовне дерево (граф не зв\'язаний).');
        return;
    }
    
    const edge = edges[currentStep];
    console.log(`Крок ${currentStep + 1}: Перевіряємо ребро ${edge.from}-${edge.to} з вагою ${edge.weight}`);
    
    const x = find(edge.from);
    const y = find(edge.to);
    
    if (x !== y) {
        mstEdges.push(edge);
        union(x, y);
        console.log(`  Додаємо ребро ${edge.from}-${edge.to} з вагою ${edge.weight} до MST`);
    } else {
        console.log(`  Ребро ${edge.from}-${edge.to} утворює цикл, пропускаємо`);
    }
    
    currentStep++;
    visualizeStep();
    
    if (mstEdges.length === nodeNumber - 1) {
        console.log('Мінімальне остовне дерево знайдено:');
        console.log(mstEdges);
        let totalWeight = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
        console.log(`Загальна вага: ${totalWeight}`);
    }
};


startAlgorithm();
const stepButton = document.getElementById('step');
stepButton.addEventListener('click', step);
