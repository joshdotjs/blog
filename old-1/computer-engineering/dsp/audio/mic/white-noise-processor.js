// https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor

// Step 1: Create a separate file;
// Step 2: In the file:
//    2.a) Extend the AudioWorkletProcessor class (see "Deriving classes" section) and supply your own process() method in it;
//    2.b) Register the processor using AudioWorkletGlobalScope.registerProcessor() method;
// Step 3: Load the file using addModule() method on your audio context's audioWorklet property;
// Step 4: Create an AudioWorkletNode based on the processor. The processor will be instantiated internally by the AudioWorkletNode constructor.
// Step 5: Connect the node to the other nodes.


// white-noise-processor.js
class WhiteNoiseProcessor extends AudioWorkletProcessor {
  process (inputs, outputs, parameters) {

    console.log('josh');

    const output = outputs[0]
    output.forEach(channel => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1
      }
    })
    return true
  }
}

// step 2.b
registerProcessor('white-noise-processor', WhiteNoiseProcessor)