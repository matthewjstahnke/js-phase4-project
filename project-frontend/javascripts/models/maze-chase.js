class MazeChase {


    static gridTemplate() {
        return `
        <body>
        <div class="grid"></div>
    
        <h3>Score:<span id="score"></span></h3>
    
        </body>
        `;

    }

    static renderGrid() {
        resetMain();
        main().innerHTML = MazeChase.gridTemplate();
        grid = document.querySelector('.grid')
        squares
        
    }


    static createBoard(grid) {
        for (let i = 0; i < layout.length; i++) {
          const square = document.createElement('div')
          grid.appendChild(square)
          squares.push(square)
    
          //add layout to the board
          if(layout[i] === 0) {
            squares[i].classList.add('pac-dot')
          } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
          } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
          } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
          }
        }
    }


    render() {
        let score = 0
        let pacmanCurrentIndex = 490
        squares[pacmanCurrentIndex].classList.add('pac-man')
    }

    
}