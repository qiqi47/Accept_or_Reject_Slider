import { React, useState } from 'react';
import { useMotionValue, useTransform, motion, useMotionValueEvent } from 'motion/react';
import { CheckIcon, XIcon } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'lottie-react';
import leftAni from './AnimatedAssets/glowing_left_arrows.json';
import rightAni from './AnimatedAssets/glowing_right_arrows.json';
import redleft from './StaticAssets/red_left_arrows.png';
import redright from './StaticAssets/red_right_arrows.png';
import greenleft from './StaticAssets/green_left_arrows.png';
import greenright from './StaticAssets/green_right_arrows.png';

export default function Slider() {
    const [arrowColor, setArrowColor] = useState('default');
    const [textColor, setTextColor] = useState('rgba(255, 255, 255, 1)');
    const [background, setBackground] = useState(
        'linear-gradient(to top, rgba(20, 20, 27, 1), rgba(20, 20, 27, 1))',
    );
    const box = {
        width: 64,
        height: 64,
        zIndex: 1,
        borderRadius: 20,
    };

    const x = useMotionValue(0);

    useMotionValueEvent(x, 'change', (latest) => {
        if (x.get() === 0) {
            //default
            setArrowColor('default');
            setTextColor('rgba(255, 255, 255, 1)');
            setBackground('linear-gradient(to top, rgba(20, 20, 27, 1), rgba(20, 20, 27, 1))');
        } else if (x.get() > 0) {
            //green area
            setArrowColor('green');
            setTextColor('rgba(3, 112, 65, 1)');
            setBackground(
                'linear-gradient(to top, rgba(64, 198, 134, 1), rgba(26, 80, 62, 1))',
            );
        } else {
            //red area
            setArrowColor('red');
            setTextColor('rgba(135, 28, 57, 1)');
            setBackground(
                'linear-gradient(to top, rgba(255, 90, 139, 1), rgba(98, 22, 49, 1))',
            );
        }
    });

    const outsideGradientColor = useTransform(x, (value) => {
        if (value === 0) {
            return 'url(#gradient-orange)'; // center
        } else {
            return 'rgba(0, 0, 0, 0.4)';
        } // two sides
    });

    const outsideFilter = useTransform(x, (value) => {
        if (value === 0) {
            return 'drop-shadow(0px 0px 4px rgba(252, 144, 51, 0.36))';
        } else return 'rgba(0, 0, 0, 0.4)';
    });

    const outsideBorder = useTransform(x, (value) => {
        if (value === 0) {
            return 'url(#stroke-gradient)';
        } else return 'rgba(0, 0, 0, 0.4)';
    });

    const handleDragEnd = (event, info) => {
        if (info.offset.x <= -450) {
            toast.error('Declined!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (info.offset.x >= 450) {
            toast.success('Accepted!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div>
            <motion.div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    width: 335,
                    height: 65,
                    maxWidth: '100%',
                    borderRadius: 20,
                    background: background,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <motion.div
                    style={{ ...box, x }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                >
                    <svg className="progress-icon cursor-pointer" viewBox="0 0 50 50">
                        {/* outside circle */}
                        <defs>
                            {/* orange Gradient */}
                            <linearGradient
                                id="gradient-orange"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="rgba(251, 72, 51, 1)" />
                                <stop offset="100%" stopColor="rgba(252, 159, 50, 1)" />
                            </linearGradient>
                            {/* stroke Gradient */}
                            <linearGradient
                                id="stroke-gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0%" stop-color="#FFFF00" />
                                <stop offset="50%" stop-color="#FF0000" />
                                <stop offset="100%" stop-color="#FFFF00" />
                            </linearGradient>
                        </defs>

                        <motion.path
                            strokeWidth="1"
                            stroke={outsideBorder}
                            filter={outsideFilter}
                            fill={outsideGradientColor}
                            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                            style={{
                                x: 5,
                                y: 5,
                            }}
                        />

                        {/* inside circle */}
                        <motion.path
                            fill="rgba(37, 37, 47, 1)"
                            strokeWidth="2"
                            d="M 8, 20 a 12, 12 0 1,0 24,0 a 12, 12 0 1,0 -24,0"
                            style={{
                                x: 5,
                                y: 5,
                            }}
                        />
                    </svg>
                </motion.div>

                <motion.div
                    className="absolute left-4 text-sm flex flex-row gap-2 items-center z-0"
                    style={{ color: textColor, opacity: useTransform(x, [-100, 100], [1, 1]) }}
                >
                    <XIcon /> Decline{' '}
                    {arrowColor === 'default' ? (
                        <Lottie animationData={leftAni} />
                    ) : arrowColor === 'green' ? (
                        <img src={greenleft} alt="green arrow" className="w-[54px] h-8" />
                    ) : (
                        <img src={redleft} alt="red arrow" className="w-[54px] h-8" />
                    )}
                </motion.div>
                <motion.div
                    className="absolute right-4 text-sm flex flex-row gap-2 items-center z-0"
                    style={{ color: textColor, opacity: useTransform(x, [-100, 100], [1, 1]) }}
                >
                    {x.get() === 0 ? (
                        <Lottie animationData={rightAni} />
                    ) : x.get() > 0 ? (
                        <img src={greenright} alt="green arrow" className="w-10 h-8" />
                    ) : (
                        <img src={redright} alt="red arrow" className="w-10 h-8" />
                    )}
                    Accept <CheckIcon />
                </motion.div>
            </motion.div>
            <ToastContainer />
        </div>
    );
}
