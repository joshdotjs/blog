
// Parameters for the modulating wave and modulation index
const modulatingFrequency = 2;
const modulationIndex = 0.5;

// Plotting the carrier wave with a slider to modify frequency
let slider;
(function() {
    const board = JXG.JSXGraph.initBoard('carrierGraph', {
        boundingbox: [-1, 2, 10, -2],
        axis: true
    });

    // Create a slider for carrier frequency
    slider = board.create('slider', [[1, -1.5], [5, -1.5], [1, 10, 20]], {
        name: 'Carrier Frequency',
        snapWidth: 0.1
    });

    // Create the carrier wave using the slider value for frequency
    board.create('functiongraph', [
        function(t) {
            return Math.sin(2 * Math.PI * slider.Value() * t);
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

// Plotting the AM modulated wave, linked to the carrier frequency slider
(function() {
    const board = JXG.JSXGraph.initBoard('amGraph', {
        boundingbox: [-1, 2, 10, -2],
        axis: true
    });

    const amWave = board.create('functiongraph', [
        function(t) {
            const carrierFrequency = slider.Value(); // Get value from the top graph's slider
            const carrier = Math.sin(2 * Math.PI * carrierFrequency * t);
            const modulating = 1 + modulationIndex * Math.sin(2 * Math.PI * modulatingFrequency * t);
            return carrier * modulating;
        },
        -1, 10,
        { strokeColor: 'red', name: 'AM Modulated Wave' }
    ]);

    // Update the AM wave when the slider value changes
    slider.on('drag', () => {
        board.update();
    });
})();