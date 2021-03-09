/**
 * JavaScript:Error Class
 */

//  type commends='up' | 'down' | 'left' | 'right';
//  function moves(commend:commends){
//     switch(commend){
//         case 'up':
//             position.y++;
//             break;
//         case 'down':
//             position.y--;
//             break;
//         case 'left':
//             position.x--;
//             break;
//         case 'right':
//             position.x++;
//             break;
//         default:
//             const invaild:never=commend;
//             throw new Error(`unCatch Error ${invaild}`);
//     }
// }


/**
 * Error(Exception) Handling :try, catch, finally
 */

function readFile(fileName:string):string{
    if(fileName==='not exist!!'){
        throw Error(`file not exist ${fileName}`);
    }
    return 'file contents';
}

function closeFile(fileName:string) {
    //close
}

const fileName='not exist!!';
// try는 정말 에러가 발생할 것 같은 코드만 넣어 되도록 짧게 만든다.
try{
    console.log(readFile(fileName));    
}catch(error){
    console.log('catched');
}finally{
    closeFile(fileName);
}
