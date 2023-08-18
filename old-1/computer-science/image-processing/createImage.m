close all, clc, clear;

x = [255, 0; 0, 255];
subplot(1,2,1);         imshow(x);
imwrite(uint8(x),'synth-image.png','PNG');

y = imread('synth-image.png');
subplot(1,2,2);         imshow(y);