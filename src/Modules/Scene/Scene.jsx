import React from 'react';

export const Scene = ({ visibility }) => <canvas className={visibility ? "canvas" : "canvas hidden"} id="canvas">
</canvas>