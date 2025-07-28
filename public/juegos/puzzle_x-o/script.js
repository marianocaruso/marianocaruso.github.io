document.addEventListener('DOMContentLoaded', () => {
    const ALL_PIECE_DEFINITIONS = {
        2: {
            1: [ { type: "X", color: "B" }, { type: "O", color: "Y" }, { type: "X", color: "G" }, { type: "O", color: "R" } ],
            2: [ { type: "X", color: "G" }, { type: "O", color: "R" }, { type: "X", color: "B" }, { type: "O", color: "Y" } ],
            3: [ { type: "X", color: "G" }, { type: "O", color: "B" }, { type: "X", color: "R" }, { type: "O", color: "Y" } ],
            4: [ { type: "X", color: "B" }, { type: "O", color: "Y" }, { type: "X", color: "G" }, { type: "O", color: "B" } ]
        },
        3: {
            1: [ { type: "O", color: "G" }, { type: "X", color: "R" }, { type: "O", color: "B" }, { type: "X", color: "Y" } ],
            2: [ { type: "O", color: "R" }, { type: "X", color: "G" }, { type: "O", color: "Y" }, { type: "X", color: "R" } ],
            3: [ { type: "O", color: "B" }, { type: "X", color: "B" }, { type: "O", color: "R" }, { type: "X", color: "G" } ],
            4: [ { type: "O", color: "B" }, { type: "X", color: "Y" }, { type: "O", color: "G" }, { type: "X", color: "R" } ],
            5: [ { type: "O", color: "Y" }, { type: "X", color: "B" }, { type: "O", color: "R" }, { type: "X", color: "Y" } ],
            6: [ { type: "O", color: "R" }, { type: "X", color: "G" }, { type: "O", color: "Y" }, { type: "X", color: "B" } ],
            7: [ { type: "O", color: "G" }, { type: "X", color: "G" }, { type: "O", color: "Y" }, { type: "X", color: "B" } ],
            8: [ { type: "O", color: "R" }, { type: "X", color: "R" }, { type: "O", color: "B" }, { type: "X", color: "G" } ],
            9: [ { type: "O", color: "Y" }, { type: "X", color: "Y" }, { type: "O", color: "G" }, { type: "X", color: "R" } ]
        }
    };

    const LOGICAL_SOLUTIONS = {
        2: [
            { r: 0, c: 0, id: 1, rot: 0 }, { r: 0, c: 1, id: 2, rot: 0 },
            { r: 1, c: 0, id: 3, rot: 0 }, { r: 1, c: 1, id: 4, rot: 0 }
        ],
        3: [
            { r: 0, c: 0, id: 1, rot: 0 }, { r: 0, c: 1, id: 2, rot: 0 }, { r: 0, c: 2, id: 3, rot: 0 },
            { r: 1, c: 0, id: 4, rot: 0 }, { r: 1, c: 1, id: 5, rot: 0 }, { r: 1, c: 2, id: 6, rot: 0 },
            { r: 2, c: 0, id: 7, rot: 0 }, { r: 2, c: 1, id: 8, rot: 0 }, { r: 2, c: 2, id: 9, rot: 0 }
        ]
    };

    const COLOR_MAP = { "R": "#E74C3C", "G": "#2ECC71", "Y": "#F1C40F", "B": "#3498DB" };

    let currentGridSize = 2;
    let PIECE_DEFINITIONS = ALL_PIECE_DEFINITIONS[currentGridSize];

    const gridSizeSelector = document.getElementById('grid-size-selector');
    const startNewGameButton = document.getElementById('start-new-game-button');
    const paletteDiv = document.getElementById('palette');
    const puzzleBoardDiv = document.getElementById('puzzle-board');
    const boardTitle = document.getElementById('board-title');
    const resetButton = document.getElementById('reset-button');
    const hintButton = document.getElementById('hint-button');
    const solveButton = document.getElementById('solve-button');
    const winMessage = document.getElementById('win-message');
    const bodyElement = document.body;
    const timerDisplay = document.getElementById('timer-display');
    const actionsDisplay = document.getElementById('actions-display'); // Cambiado

    let boardState = [];
    let paletteState = [];
    let boardCellElements = [];
    let draggedPieceData = null;

    let timerInterval = null;
    let secondsElapsed = 0;
    let actionCount = 0; // Cambiado

    const shapeXPath = "M-12,-12 L12,12 M-12,12 L12,-12";
    const circleRadius = 14;

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(secondsElapsed);
    }

    function startTimer() {
        if (timerInterval) stopTimer();
        secondsElapsed = 0;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            secondsElapsed++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        stopTimer();
        secondsElapsed = 0;
        updateTimerDisplay();
    }

    function updateActionsDisplay() { // Cambiado
        actionsDisplay.textContent = `acciones: ${actionCount}`;
    }

    function incrementActionCount() { // Cambiado
        actionCount++;
        updateActionsDisplay();
    }

    function resetActionCount() { // Cambiado
        actionCount = 0;
        updateActionsDisplay();
    }


    function triggerConfetti() {
        const confettiColors = Object.values(COLOR_MAP);
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000, colors: confettiColors };
        function randomInRange(min, max) { return Math.random() * (max - min) + min; }
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    function togglePieceNumbersVisibility() {
        bodyElement.classList.toggle('numbers-hidden');
    }

    function createPieceElement(pieceId, rotation, uniqueElementId) {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('puzzle-piece', `puzzle-piece-${currentGridSize}x${currentGridSize}`);
        pieceElement.setAttribute('draggable', true);
        pieceElement.id = uniqueElementId || `piece-${pieceId}-${Date.now()}${Math.random()}`;
        pieceElement.dataset.pieceId = pieceId;
        pieceElement.dataset.rotation = rotation;

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "-50 -50 100 100");
        svg.style.transform = `rotate(${rotation * 90}deg)`;

        const currentPieceSet = ALL_PIECE_DEFINITIONS[currentGridSize];
        const pieceConnectorsDefinition = currentPieceSet[pieceId];

        if (!pieceConnectorsDefinition) {
            console.error(`Definición no encontrada para pieza ID: ${pieceId} con tamaño ${currentGridSize}x${currentGridSize}`);
            return pieceElement;
        }

        const connectorData = [pieceConnectorsDefinition[0], pieceConnectorsDefinition[1], pieceConnectorsDefinition[2], pieceConnectorsDefinition[3]];
        const connectorOffset = 32;
        const positions = [{ x: 0, y: -connectorOffset }, { x: connectorOffset, y: 0 }, { x: 0, y: connectorOffset }, { x: -connectorOffset, y: 0 }];

        connectorData.forEach((connector, index) => {
            const group = document.createElementNS(svgNS, "g");
            group.setAttribute("transform", `translate(${positions[index].x}, ${positions[index].y})`);
            let shapeElement;
            if (connector.type === "X") {
                shapeElement = document.createElementNS(svgNS, "path");
                shapeElement.setAttribute("d", shapeXPath);
                shapeElement.setAttribute("stroke", COLOR_MAP[connector.color]);
                shapeElement.setAttribute("stroke-width", "6");
                shapeElement.setAttribute("fill", "none");
                shapeElement.setAttribute("stroke-linecap", "round");
                shapeElement.setAttribute("stroke-linejoin", "round");
            } else {
                shapeElement = document.createElementNS(svgNS, "circle");
                shapeElement.setAttribute("cx", "0");
                shapeElement.setAttribute("cy", "0");
                shapeElement.setAttribute("r", circleRadius.toString());
                shapeElement.setAttribute("fill", COLOR_MAP[connector.color]);
            }
            group.appendChild(shapeElement);
            svg.appendChild(group);
        });
        pieceElement.appendChild(svg);
        
        const idDisplay = document.createElement('div');
        idDisplay.classList.add('piece-id-display');
        idDisplay.textContent = pieceId;
        pieceElement.appendChild(idDisplay);

        pieceElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentRotation = parseInt(pieceElement.dataset.rotation);
            const newRotation = (currentRotation + 1) % 4;
            pieceElement.dataset.rotation = newRotation;
            svg.style.transform = `rotate(${newRotation * 90}deg)`;
            const pId = parseInt(pieceElement.dataset.pieceId);
            const parent = pieceElement.parentElement;
            if (parent.classList.contains('board-cell')) {
                const r = parseInt(parent.dataset.r);
                const c = parseInt(parent.dataset.c);
                if (boardState[r] && boardState[r][c]) boardState[r][c].rotation = newRotation;
            } else if (parent.id === 'palette') {
                const paletteEntry = paletteState.find(p => p.elementId === pieceElement.id);
                if (paletteEntry) paletteEntry.rotation = newRotation;
            }
            if(timerInterval) incrementActionCount();
            checkWinCondition();
        });
        pieceElement.addEventListener('dragstart', handleDragStart);
        pieceElement.addEventListener('dragend', handleDragEnd);
        return pieceElement;
    }

    function setupBoardUI() {
        boardTitle.textContent = `tablero (${currentGridSize}x${currentGridSize})`;
        puzzleBoardDiv.className = '';
        puzzleBoardDiv.classList.add('puzzle-board', `grid-${currentGridSize}x${currentGridSize}`);
        puzzleBoardDiv.innerHTML = '';
        boardCellElements = [];
        boardState = Array(currentGridSize).fill(null).map(() => Array(currentGridSize).fill(null));
        for (let r = 0; r < currentGridSize; r++) {
            const rowElements = [];
            for (let c = 0; c < currentGridSize; c++) {
                const cell = document.createElement('div');
                cell.classList.add('board-cell', `board-cell-${currentGridSize}x${currentGridSize}`);
                cell.dataset.r = r;
                cell.dataset.c = c;
                cell.addEventListener('dragover', handleDragOver);
                cell.addEventListener('drop', handleDropOnBoard);
                cell.addEventListener('dragleave', handleDragLeave);
                puzzleBoardDiv.appendChild(cell);
                rowElements.push(cell);
            }
            boardCellElements.push(rowElements);
        }
    }

    function initializePalette() {
        paletteDiv.innerHTML = '';
        paletteState = [];
        PIECE_DEFINITIONS = ALL_PIECE_DEFINITIONS[currentGridSize];
        const pieceIds = Object.keys(PIECE_DEFINITIONS).map(Number);
        paletteDiv.className = '';
        paletteDiv.classList.add('palette', `palette-grid-${currentGridSize}x${currentGridSize}`);
        for (let i = pieceIds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pieceIds[i], pieceIds[j]] = [pieceIds[j], pieceIds[i]];
        }
        pieceIds.forEach(pieceId => {
            const rotation = Math.floor(Math.random() * 4);
            const uniqueId = `palette-piece-${pieceId}-${Date.now()}${Math.random()}`;
            const pieceElement = createPieceElement(pieceId, rotation, uniqueId);
            paletteState.push({ id: pieceId, rotation: rotation, elementId: pieceElement.id });
            paletteDiv.appendChild(pieceElement);
        });
        paletteDiv.addEventListener('dragover', handleDragOver);
        paletteDiv.addEventListener('drop', handleDropOnPalette);
        paletteDiv.addEventListener('dragleave', handleDragLeavePalette);
    }

    function startGame() {
        currentGridSize = parseInt(gridSizeSelector.value);
        PIECE_DEFINITIONS = ALL_PIECE_DEFINITIONS[currentGridSize];
        winMessage.classList.add('hidden');
        bodyElement.classList.add('numbers-hidden');
        
        startTimer();
        resetActionCount();
        
        setupBoardUI();
        initializePalette();
    }

    function resetPiecePositions() {
        winMessage.classList.add('hidden');
        bodyElement.classList.add('numbers-hidden');
        
        resetTimer();
        resetActionCount();
        
        boardCellElements.forEach(row => row.forEach(cell => cell.innerHTML = ''));
        boardState = Array(currentGridSize).fill(null).map(() => Array(currentGridSize).fill(null));
        initializePalette();
    }

    function handleDragStart(e) { e.target.classList.add('dragging'); const pieceId = parseInt(e.target.dataset.pieceId); const rotation = parseInt(e.target.dataset.rotation); let source, originalIndexOrCoords; if (e.target.parentElement.id === 'palette') { source = 'palette'; originalIndexOrCoords = paletteState.findIndex(p => p.elementId === e.target.id); } else { source = 'board'; originalIndexOrCoords = { r: parseInt(e.target.parentElement.dataset.r), c: parseInt(e.target.parentElement.dataset.c) }; } draggedPieceData = { pieceId, rotation, elementId: e.target.id, source, originalIndexOrCoords }; e.dataTransfer.setData('text/plain', e.target.id); e.dataTransfer.effectAllowed = 'move'; }
    function handleDragEnd(e) { e.target.classList.remove('dragging'); draggedPieceData = null; document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over')); document.querySelectorAll('.palette-drag-over').forEach(el => el.classList.remove('palette-drag-over')); }
    function handleDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (e.currentTarget.id === 'palette') e.currentTarget.classList.add('palette-drag-over'); else if (e.currentTarget.classList.contains('board-cell')) e.currentTarget.classList.add('drag-over'); }
    function handleDragLeave(e) { if (e.currentTarget.classList.contains('board-cell')) e.currentTarget.classList.remove('drag-over'); }
    function handleDragLeavePalette(e) { if (e.currentTarget.id === 'palette') e.currentTarget.classList.remove('palette-drag-over'); }
    
    function handleDropOnBoard(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        if (!draggedPieceData || !timerInterval) return;

        const targetR = parseInt(e.currentTarget.dataset.r);
        const targetC = parseInt(e.currentTarget.dataset.c);
        const draggedElement = document.getElementById(draggedPieceData.elementId);
        const existingPieceDataInCell = boardState[targetR]?.[targetC];
        const existingElementInCell = e.currentTarget.firstChild;

        if (!boardState[targetR]) boardState[targetR] = [];
        boardState[targetR][targetC] = { id: draggedPieceData.pieceId, rotation: draggedPieceData.rotation };
        e.currentTarget.appendChild(draggedElement);
        incrementActionCount();

        if (draggedPieceData.source === 'board') {
            const origR = draggedPieceData.originalIndexOrCoords.r;
            const origC = draggedPieceData.originalIndexOrCoords.c;
            if (boardState[origR]) boardState[origR][origC] = null;
        } else {
            paletteState.splice(draggedPieceData.originalIndexOrCoords, 1);
        }

        if (existingPieceDataInCell && existingElementInCell !== draggedElement) {
            if (draggedPieceData.source === 'palette') {
                paletteState.push({ id: existingPieceDataInCell.id, rotation: existingPieceDataInCell.rotation, elementId: existingElementInCell.id });
                paletteDiv.appendChild(existingElementInCell);
            } else {
                const origR = draggedPieceData.originalIndexOrCoords.r;
                const origC = draggedPieceData.originalIndexOrCoords.c;
                if (!boardState[origR]) boardState[origR] = [];
                boardState[origR][origC] = { id: existingPieceDataInCell.id, rotation: existingPieceDataInCell.rotation };
                boardCellElements[origR][origC].appendChild(existingElementInCell);
            }
        }
        checkWinCondition();
    }

    function handleDropOnPalette(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('palette-drag-over');
        if (!draggedPieceData || draggedPieceData.source === 'palette' || !timerInterval) return;

        const draggedElement = document.getElementById(draggedPieceData.elementId);
        paletteState.push({ id: draggedPieceData.pieceId, rotation: draggedPieceData.rotation, elementId: draggedPieceData.elementId });
        paletteDiv.appendChild(draggedElement);
        
        const origR = draggedPieceData.originalIndexOrCoords.r;
        const origC = draggedPieceData.originalIndexOrCoords.c;
        if (boardState[origR]) boardState[origR][origC] = null;
        
        incrementActionCount();
        checkWinCondition();
    }

    function getPieceConnectors(pieceId, rotationCount) {
        const currentPieceDefs = ALL_PIECE_DEFINITIONS[currentGridSize];
        if (!currentPieceDefs || !currentPieceDefs[pieceId]) {
            console.error(`Error en getPieceConnectors: No se encontró pieza ID ${pieceId} para tamaño ${currentGridSize}`);
            return [{},{},{},{}];
        }
        const baseConnectors = currentPieceDefs[pieceId];
        let rotatedConnectors = [...baseConnectors];
        for (let i = 0; i < (rotationCount % 4); i++) {
            rotatedConnectors = [rotatedConnectors[3], rotatedConnectors[0], rotatedConnectors[1], rotatedConnectors[2]];
        }
        return rotatedConnectors;
    }

    function checkWinCondition() {
        winMessage.classList.add('hidden');
        let boardFull = true;
        for (let r = 0; r < currentGridSize; r++) {
            for (let c = 0; c < currentGridSize; c++) {
                if (!boardState[r] || !boardState[r][c]) { boardFull = false; break; }
            }
            if (!boardFull) break;
        }
        if (!boardFull) return false;
        for (let r = 0; r < currentGridSize; r++) {
            for (let c = 0; c < currentGridSize - 1; c++) {
                const p1Connectors = getPieceConnectors(boardState[r][c].id, boardState[r][c].rotation);
                const p2Connectors = getPieceConnectors(boardState[r][c+1].id, boardState[r][c+1].rotation);
                if (p1Connectors[1].type !== p2Connectors[3].type || p1Connectors[1].color !== p2Connectors[3].color) return false;
            }
        }
        for (let c = 0; c < currentGridSize; c++) {
            for (let r = 0; r < currentGridSize - 1; r++) {
                const p1Connectors = getPieceConnectors(boardState[r][c].id, boardState[r][c].rotation);
                const p2Connectors = getPieceConnectors(boardState[r+1][c].id, boardState[r+1][c].rotation);
                if (p1Connectors[2].type !== p2Connectors[0].type || p1Connectors[2].color !== p2Connectors[0].color) return false;
            }
        }
        triggerConfetti();
        stopTimer();
        return true;
    }

    function showSolutionAction() {
        resetPiecePositions();
        winMessage.classList.add('hidden');
        solveButton.textContent = "auto-solución";
        
        const solutionConfig = LOGICAL_SOLUTIONS[currentGridSize];
        const numPiecesTotal = currentGridSize * currentGridSize;
        let configToUse = solutionConfig;
        if (!solutionConfig || solutionConfig.length !== numPiecesTotal) {
            console.warn(`Solución lógica para ${currentGridSize}x${currentGridSize} no definida/incorrecta. Fallback.`);
            configToUse = Array.from({ length: numPiecesTotal }, (_, i) => {
                const pieceId = i + 1;
                const pieceExists = ALL_PIECE_DEFINITIONS[currentGridSize]?.[pieceId] !== undefined;
                return { r: Math.floor(i / currentGridSize), c: i % currentGridSize, id: pieceExists ? pieceId : -1, rot: 0 };
            }).filter(item => item.id !== -1);
        }
        configToUse.forEach(item => {
            const { r, c, id: pieceIdToPlace, rot: solutionRotation } = item;
            const paletteIdx = paletteState.findIndex(p => p.id === pieceIdToPlace);
            if (paletteIdx > -1) {
                const pieceElement = document.getElementById(paletteState[paletteIdx].elementId);
                pieceElement.dataset.rotation = solutionRotation;
                const svg = pieceElement.querySelector('svg');
                if (svg) svg.style.transform = `rotate(${solutionRotation * 90}deg)`;
                if (boardState[r] !== undefined && boardCellElements[r]?.[c]) {
                   if (!boardState[r]) boardState[r] = [];
                   boardState[r][c] = { id: pieceIdToPlace, rotation: solutionRotation };
                   boardCellElements[r][c].appendChild(pieceElement);
                } else {
                     console.error(`Error al colocar pieza en la solución: celda (${r},${c}) no existe o boardState no inicializado.`);
                }
                paletteState.splice(paletteIdx, 1);
            } else {
                 console.warn(`Pieza ID ${pieceIdToPlace} para la solución no encontrada en la paleta.`);
            }
        });
        if (checkWinCondition()) {
             stopTimer();
        }
    }

    gridSizeSelector.value = currentGridSize.toString();
    PIECE_DEFINITIONS = ALL_PIECE_DEFINITIONS[currentGridSize];
    winMessage.classList.add('hidden');
    bodyElement.classList.add('numbers-hidden');
    resetTimer();
    resetActionCount();
    setupBoardUI();
    initializePalette();

    startNewGameButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetPiecePositions);
    hintButton.addEventListener('click', togglePieceNumbersVisibility);
    solveButton.addEventListener('click', showSolutionAction);
});