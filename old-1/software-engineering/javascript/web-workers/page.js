// https://youtu.be/O1WmnLCLk3Q

const delay = 5000;

// Run without web worker

const withoutWorkerButton = document.createElement('button');
document.body.appendChild(withoutWorkerButton);
withoutWorkerButton.textContent = 'Without worker';

withoutWorkerButton.addEventListener('click', () => {
    // Without worker

    // const start = performance.now();
    // while (performance.now() - start < delay);
    // const end = performance.now();


    let x = 0;
    for (let i = 0; i < 1e16; ++i) {
        x = (++x * Math.pow(x * x, 2)) / Math.pow(x * x, 2);
    }


    console.log(end - start);
});

// Run with web worker

const worker = new Worker('./worker.js');
worker.onmessage = e => {
    console.log(`Worker says: "${e.data}"`);
};

const withWorkerButton = document.createElement('button');
document.body.appendChild(withWorkerButton);
withWorkerButton.textContent = 'With worker';

withWorkerButton.addEventListener('click', () => {
    // With worker
    worker.postMessage(delay);
});
