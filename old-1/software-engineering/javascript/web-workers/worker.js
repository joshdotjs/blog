this.onmessage = e => {
    const delay = e.data;

    const start = performance.now();
    while (performance.now() - start < delay);
    const end = performance.now();

    this.postMessage(end - start);
};
