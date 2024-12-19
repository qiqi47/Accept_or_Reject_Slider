'use client';

import React from 'react';
import Slider from './slider';

export default function Demo() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 w-[1000px]">
            <h1 className="text-3xl font-bold mb-8 text-white">Slider Demo</h1>
            <Slider />
        </div>
    );
}
