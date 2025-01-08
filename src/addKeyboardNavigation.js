export function addKeyboardNavigation(){

    const rowSize = 4;
    const columnSize = 15;
    
    let activeRow = 0;
    let activeCol = 0;

    let lastPositions = {
        'row0': 0,
        'row1': 0,
        'row2': 0,
        'row3': 0,
    };

    function setLastPosition(event){
        const departingFromRow = event.target.parentNode.getAttribute("data-row");
        const departingFromCol = event.target.parentNode.getAttribute("data-col");
        lastPositions[`row${departingFromRow}`] = departingFromCol;
        activeCol = lastPositions[`row${activeRow}`];
    }
    
    // Set active cell
    function setActiveCell(row, col) {
        document.querySelectorAll('li').forEach(cell => cell.classList.remove('active'));   
        const activeCell = document.querySelector(`li[data-row="${row}"][data-col="${col}"]`);
        if (activeCell) {
            activeCell.classList.add('active');
            document.querySelector("li.active button").focus();
            activeCell.scrollIntoView({inline: "center"});
        }
    }
    
    // Initialize active cell
    setActiveCell(activeRow, activeCol);
    
    // Handle key events
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (activeRow > 0) {
                    activeRow--;
                    setLastPosition(event);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (activeRow < rowSize - 1) {
                    activeRow++;
                    setLastPosition(event);
                }
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (activeCol > 0) activeCol--;
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (activeCol < columnSize - 1) activeCol++;
                break;
            default:
                return;
        }
        setActiveCell(activeRow, activeCol);
    });
}