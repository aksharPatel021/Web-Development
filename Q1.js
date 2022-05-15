


//JS CODE HERE

let result = 0;
const numberOfWorkers = 10;
const workers = [];

let workerCounter = 0;
let workingWorkers = 10;

window.onload = () => {
    console.log(Date.now());
    for (let x = 0; x < numberOfWorkers; x++) {
        let worker = new Worker('Q1Worker.js');
        worker.onmessage = handleResponse;
        worker.postMessage(getArrayChunk(x));
        workers.push(worker);
    }

    workerCounter = numberOfWorkers;
}

function getArrayChunk(counter) {
    let start = counter*1000;
    //console.log(start, start+999);
    return ARRAY.slice(start, start+999);
}

function handleResponse(e) {
    result += e.data;
    if ((workerCounter+1)*1000 < ARRAY.length) {
        workerCounter += 1;
        e.target.postMessage(getArrayChunk(workerCounter))
    } else {
        e.target.terminate()
        workingWorkers -=1;
        if (workingWorkers === 0) {
            outputCount(result);
        }
    }
}

function outputCount(count) {
    document.getElementById('totalSquares').innerHTML = `There are ${count} perfect squares`;
}