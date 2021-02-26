/**
 * Let's make a game 🕹
 */
type commend='up' | 'down' | 'left' | 'right';
type positionType={
    x:number,
    y:number,
}
const position:positionType={
    x:0,
    y:0,
}

function move(commend:commend){
    switch(commend){
        case 'up':
            position.y++;
            break;
        case 'down':
            position.y--;
            break;
        case 'left':
            position.x--;
            break;
        case 'right':
            position.x++;
            break;
        default:
            throw new Error(`unCatch Error ${commend}`);
    }
}
console.log(position); // { x: 0, y: 0}
move('up');
console.log(position); // { x: 0, y: 1}
move('down');
console.log(position); // { x: 0, y: 0}
move('left');
console.log(position); // { x: -1, y: 0}
move('right');
console.log(position); // { x: 0, y: 0}
