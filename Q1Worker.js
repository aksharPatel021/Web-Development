
onmessage = (e) => {
    //e will be an array of 1000 numbers..
    let squareRootNumbers = 0;
    for (let n of e.data) {
        if (Math.sqrt(n) % 1 === 0) {
            squareRootNumbers += 1
        }
    }
    postMessage(squareRootNumbers);
}