const { adjacencyList }  = require('../SearchLogic/graph');

const dfs = (start, finalDst, visited = new Set()) => {
    visited.add(start)

    const destinations = adjacencyList.get(start);

    for (const destination of destinations) {

        if (destination == finalDst) { 
            console.log(`DFS found ${finalDst}`)
            return true
        }
        
        if (!visited.has(destination)) {
            if(dfs(destination,finalDst, visited)){
                console.log(destination)
                return true
            }
            continue
        }
    }
}

dfs('M1N-20', 'M3-16')

