// https://marcoselvatici.github.io/WASM_tutorial/

//emcc hello.c -o hello.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_addOne"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "getValue", "setValue"]'

emcc hello.cpp -o hello.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_addOne"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "getValue", "setValue"]'

emrun josh.html