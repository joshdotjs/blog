// Parameters for the carrier and modulating wave
const carrierFrequency = 10;
const modulatingFrequency = 2;
const modulationIndex = 0.5;

// Plotting the carrier wave
(function() {
    const board = JXG.JSXGraph.initBoard('carrierGraph', {
        boundingbox: [-1, 2, 10, -2],
        axis: true
    });

    board.create('functiongraph', [
        function(t) {
            return Math.sin(2 * Math.PI * carrierFrequency * t);
        },
        -1, 10,
        { strokeColor: 'blue', name: 'Carrier Wave' }
    ]);
})();

// Plotting the modulating wave
(function() {
    const board = JXG.JSXGraph.initBoard('modulatingGraph', {
        boundingbox: [-1, 2, 10, -2],
        axis: true
    });

    board.create('functiongraph', [
        function(t) {
            return Math.sin(2 * Math.PI * modulatingFrequency * t);
        },
        -1, 10,
        { strokeColor: 'green', name: 'Modulating Wave' }
    ]);
})();

// Plotting the AM modulated wave
(function() {
    const board = JXG.JSXGraph.initBoard('amGraph', {
        boundingbox: [-1, 2, 10, -2],
        axis: true
    });

    board.create('functiongraph', [
        function(t) {
            const carrier = Math.sin(2 * Math.PI * carrierFrequency * t);
            const modulating = 1 + modulationIndex * Math.sin(2 * Math.PI * modulatingFrequency * t);
            return carrier * modulating;
        },
        -1, 10,
        { strokeColor: 'red', name: 'AM Modulated Wave' }
    ]);
})();