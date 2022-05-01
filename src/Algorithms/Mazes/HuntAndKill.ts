import { NodeType } from "../../Types";

export default function sideWinder (tree: NodeType[][]){
const wallsInOrder = []
    const rows = tree.length;

    let carved = false

    for(let i = 1 ; i<rows; i+=2){
        const run = []
        for(let  j = 0; j<tree[0].length; j++){



const isCarve = Math.random()  > 0.5

if(carved){
    carved = false

    continue

} else if(isCarve) {
    carved = true
    wallsInOrder.push(tree[i-1][j])
}

run.push(tree[i][j])
wallsInOrder.push(tree[i][j])
}


    }
    return wallsInOrder
}