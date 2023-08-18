import {draw_circle, draw_line, draw_rect} from './draw.js';
// ----------------------------------------------
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;
// ----------------------------------------------
const translate = (p, a, b) => {

    function mat_mult(x, y, a, b) {

        // Translation Matrix
        const mat = [
            [1, 0, 0],
            [0, 1, 0],
            [a, b, 1]
        ];

        // Input homo-vector
        const vec_in = [[x, y, 1]]; // (1x3) row-vector

        // row_vec * mat
        // (1 x 3) * (3 x 3)
        // (M x K) * (K * N)
        // (M=1    x      N=3)    :    Output dimensions
        const [M, K, N] = [1, 3, 3];
        let vec_out = [[0, 0, 0]];

        for (let m = 0; m < M; ++m) {
            for (let n = 0; n < N; ++n) {
                let c_mn = 0;
                for (let k = 0; k < K; ++k)
                    c_mn += vec_in[m][k] * mat[k][n];
                vec_out[m][n] = c_mn;
            }
        }
        return vec_out;
    }
    const vec = mat_mult(p.x, p.y, a, b);
    return new Point(vec[0][0], vec[0][1]);
};
// ----------------------------------------------
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(color='deeppink') {
        draw_circle(ctx, this.x, this.y, 5, color);
    }
}
// ----------------------------------------------
const scale = (p, a, b) => {

    function mat_mult(x, y, a, b) {

        // Translation Matrix
        const mat = [
            [a, 0, 0],
            [0, b, 0],
            [0, 0, 1]
        ];

        // Input homo-vector
        const vec_in = [[p.x, p.y, 1]]; // (1x3) row-vector

        // row_vec * mat
        // (1 x 3) * (3 x 3)
        // (M x K) * (K * N)
        // (M=1    x      N=3)    :    Output dimensions
        const [M, K, N] = [1, 3, 3];
        let vec_out = [[0, 0, 0]];

        for (let m = 0; m < M; ++m) {
            for (let n = 0; n < N; ++n) {
                let c_mn = 0;
                for (let k = 0; k < K; ++k)
                    c_mn += vec_in[m][k] * mat[k][n];
                vec_out[m][n] = c_mn;
            }
        }
        return vec_out;
    }

    const vec = mat_mult(p.x, p.y, a, b);
    return new Point(vec[0][0], vec[0][1]);
};
// ----------------------------------------------
const rotate = (p, theta) => {

    function mat_mult(x, y, theta) {

        const phi = theta * (Math.PI / 180);

        // Translation Matrix
        const mat = [
            [Math.cos(phi),  Math.sin(phi), 0],
            [-Math.sin(phi), Math.cos(phi), 0],
            [0,                0,           1]
        ];

        // Input homo-vector
        const vec_in = [[p.x, p.y, 1]]; // (1x3) row-vector

        // row_vec * mat
        // (1 x 3) * (3 x 3)
        // (M x K) * (K * N)
        // (M=1    x      N=3)    :    Output dimensions
        const [M, K, N] = [1, 3, 3];
        let vec_out = [[0, 0, 0]];

        for (let m = 0; m < M; ++m) {
            for (let n = 0; n < N; ++n) {
                let c_mn = 0;
                for (let k = 0; k < K; ++k)
                    c_mn += vec_in[m][k] * mat[k][n];
                vec_out[m][n] = c_mn;
            }
        }
        return vec_out;
    }

    const vec = mat_mult(p.x, p.y, theta);
    return new Point(vec[0][0], vec[0][1]);
};
// ----------------------------------------------

//              [light, dark]
const blues  = ['lightblue', 'blue'];
const reds   = ['deeppink', 'red'];
const greens = ['#8FBC8F', '#006400'];
const golds  = ['#FFD700', '#DAA520'];


const P1 = new Point(100, 100);     P1.draw(blues[0]);
const P2 = new Point(100, 200);     P2.draw(reds[0]);
const P3 = new Point(200, 200);     P3.draw(greens[0]);
const P4 = new Point(200, 100);     P4.draw(golds[0]);

// Translate the points to be centered at the origin:
const P1_t = translate(P1, -150, -150);
const P2_t = translate(P2, -150, -150);
const P3_t = translate(P3, -150, -150);
const P4_t = translate(P4, -150, -150);

// Scale the origin-centered points:
const Q1_t = scale(P1_t, 2, 2);
const Q2_t = scale(P2_t, 2, 2);
const Q3_t = scale(P3_t, 2, 2);
const Q4_t = scale(P4_t, 2, 2);

// Rotate the points 45deg
const R1 = rotate(Q1_t, 45);          //R1.draw(blues[0]);
const R2 = rotate(Q2_t, 45);          //R2.draw(reds[0]);
const R3 = rotate(Q3_t, 45);          //R3.draw(greens[0]);
const R4 = rotate(Q4_t, 45);          //R4.draw(golds[0]);

// Translate back to the original posision:
// const Q1 = translate(Q1_t, 150, 150);   Q1.draw(blues[1]);
// const Q2 = translate(Q2_t, 150, 150);   Q2.draw(reds[1]);
// const Q3 = translate(Q3_t, 150, 150);   Q3.draw(greens[1]);
// const Q4 = translate(Q4_t, 150, 150);   Q4.draw(golds[1]);
const Q1 = translate(R1, 150, 150);   Q1.draw(blues[1]);
const Q2 = translate(R2, 150, 150);   Q2.draw(reds[1]);
const Q3 = translate(R3, 150, 150);   Q3.draw(greens[1]);
const Q4 = translate(R4, 150, 150);   Q4.draw(golds[1]);
