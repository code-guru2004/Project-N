"use client";

import { useEffect, useRef, useState } from "react";
import { emotionAudios, EmotionType } from "./helper/emotionAudios";
import CustomCursor from "@/components/shared/custom-cursor";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Slider } from "@/components/ui/slider";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { History } from "lucide-react";

const emotions: EmotionType[] = ["Happy", "Sad", "Love"];
type TurnScore = {
    turn: number;
    responseTime: number;
    isCorrect: boolean;
};

export default function GamePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playerRef = useRef<any>(null);

    const [currentAudio, setCurrentAudio] = useState<string | null>(null);
    const [correctEmotion, setCorrectEmotion] = useState<EmotionType | null>(null);
    const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [showPlayAgain, setShowPlayAgain] = useState(false);
    const [volume, setVolume] = useState(1);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [responseTime, setResponseTime] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [turns, setTurns] = useState<TurnScore[]>([]);
    const [turnNumber, setTurnNumber] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [gameHistory, setGameHistory] = useState<TurnScore[]>([]);

    const startGame = () => {
        setResult(null);
        setTurnNumber(1);
        setSelectedEmotion(null);
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const audios = emotionAudios[randomEmotion];
        const randomAudio = audios[Math.floor(Math.random() * audios.length)];
        setIsPlaying(true);
        setCorrectEmotion(randomEmotion);
        setCurrentAudio(randomAudio);
        setStartTime(null); // reset
        setResponseTime(null);
        setIsDialogOpen(false)
    };


    const handlePlayAgain = () => {
        if (turnNumber >= 3) {
            // setIsDialogOpen(true)
            return;
        } // stop at 3 turns
        setTurnNumber((prev) => prev + 1);
        setShowPlayAgain(false);
        let seconds = 3;
        setCountdown(seconds);
        const interval = setInterval(() => {
            seconds -= 1;
            setCountdown(seconds);
            if (seconds === 0) {
                clearInterval(interval);
                setCountdown(null);
                startGame();
            }
        }, 1000);
    };
    const handleSelection = (emotion: EmotionType) => {
        setSelectedEmotion(emotion);

        if (startTime !== null) {
            const timeTaken = Date.now() - startTime; // ⏱️ in ms
            setResponseTime(timeTaken);
            console.log(`⏱️ Response time: ${timeTaken}ms`);
            const isCorrect = emotion === correctEmotion;
            setTurns((prev) => [
                ...prev,
                {
                    turn: prev.length + 1,
                    responseTime: timeTaken,
                    isCorrect,
                },
            ]);
        }

        if (emotion === correctEmotion) {

            setResult("✅ Correct!");
        } else {
            setResult(`❌ Wrong! It was ${correctEmotion}`);
        }

        setShowPlayAgain(true);
    };

    useEffect(() => {
        if (turns.length === 3) {
            const existing = JSON.parse(localStorage.getItem("gameSessions") || "[]");
            const updated = [...existing, turns];
            localStorage.setItem("gameSessions", JSON.stringify(updated));
        }
    }, [turns]);


    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black overflow-hidden flex items-center justify-center flex-col px-4 py-9"
        >
            <CustomCursor containerRef={containerRef} />
            <>
                {Array.from({ length: 20 }).map((_, i) => (
                    <MusicalNote
                        key={i}
                        top={`${Math.random() * 100}%`}
                        left={`${Math.random() * 100}%`}
                        size={20 + Math.random() * 30}
                        color={['#f472b6', '#60a5fa', '#facc15', '#34d399'][i % 4]}
                        delay={Math.random() * 2}
                    />
                ))}
            </>
            <div className='absolute top-8 right-5 md:right-10'>

                <HistoryDrawer />
            </div>
            <motion.h1
                className="text-4xl font-extrabold mb-6 text-center text-white tracking-wide"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                🎧  Echo Match
            </motion.h1>

            {
                !currentAudio && (
                    <motion.button
                        onClick={startGame}
                        className="mb-6 px-8 py-3 bg-blue-600 rounded-xl text-white text-lg font-medium shadow-md hover:bg-blue-700 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start
                    </motion.button>
                )
            }

            <AnimatePresence>
                {countdown !== null && (
                    <motion.div
                        key="overlay"
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-3xl font-bold text-white">Starts in</h1>
                        <motion.div
                            key={countdown}
                            className="text-white text-[80px] font-extrabold"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            {countdown}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {currentAudio && (
                <motion.div
                    className="mb-6 text-center flex flex-col items-center gap-6 w-full max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-lg text-white">
                        🔊 Listen to the audio and select the emotion:
                    </p>

                    {/* Spinning Disc */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <Image
                            src="/cd-png.png"
                            alt="disc"
                            width={160}
                            height={160}
                            className={`animate-spin-slow pointer-events-none ${isPlaying && 'animate-spin-slow'}`}
                        />
                    </div>

                    {/* Audio Player */}
                    <AudioPlayer
                        ref={playerRef}
                        autoPlay
                        src={currentAudio}
                        showJumpControls={false}
                        onPlay={() => {
                            setStartTime(Date.now());
                        }}
                        onEnded={() => setIsPlaying(false)}
                        layout="horizontal"
                        className="!bg-slate-700 !text-white !border-none !rounded-xl"
                    />

                    {/* Volume Slider */}
                    <div className="w-full max-w-sm">
                        <label className="text-white text-sm mb-1 block">Volume</label>
                        <Slider
                            defaultValue={[volume]}
                            value={[volume]}
                            min={0}
                            max={1}
                            step={0.01}
                            onValueChange={(value) => {
                                const newVolume = value[0];
                                if (playerRef.current?.audio?.current) {
                                    playerRef.current.audio.current.volume = newVolume;
                                }
                                setVolume(newVolume);
                            }}
                            className="w-full"
                        />
                        <div className="text-xs text-white mt-1 text-right">{Math.round(volume * 100)}%</div>
                    </div>
                </motion.div>
            )}

            {currentAudio && (
                <div className="flex space-x-4 mt-2 flex-wrap justify-center">
                    {emotions.map((emotion) => (
                        <motion.button
                            key={emotion}
                            onClick={() => handleSelection(emotion)}
                            disabled={selectedEmotion !== null}
                            className={`px-6 py-3 rounded-xl text-black text-lg font-semibold shadow-md transition-all ${selectedEmotion === emotion
                                ? emotion === correctEmotion
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                : "bg-yellow-300 hover:bg-yellow-400"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {emotion}
                        </motion.button>
                    ))}
                </div>
            )}
            {responseTime !== null && (
                <div className="text-white text-sm mt-2">
                    ⏱️ Response Time: {(responseTime / 1000).toFixed(2)}s
                </div>
            )}

            {turns.length === 3 && (
                <div className="mt-6 text-white text-center space-y-2">
                    <h2 className="text-xl font-bold">🎉 Game Over</h2>
                    <ul className="space-y-1 text-sm">
                        {turns.map((t) => (
                            <li key={t.turn}>
                                Turn {t.turn}: {t.isCorrect ? "✅" : "❌"} – {t.responseTime / 1000}s
                            </li>
                        ))}
                    </ul>
                    <div className="font-semibold mt-2">
                        Accuracy:{" "}
                        {Math.round(
                            (turns.filter((t) => t.isCorrect).length / 3) * 100
                        )}
                        %
                    </div>
                    <button
                        onClick={() => {
                            setTurnNumber(1);
                            setTurns([]);
                            setResult(null);
                            setSelectedEmotion(null);
                            setCurrentAudio(null);
                        }}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                    >
                        🔄 Restart Game
                    </button>
                </div>
            )}

            <AnimatePresence>
                {result && (
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="text-2xl font-semibold text-white mb-4">{result}</div>
                        {turnNumber < 3 && showPlayAgain && (
                            <button
                                onClick={handlePlayAgain}
                                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-xl shadow"
                            >
                                🔁 Play Again
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
function MusicalNote({
    top,
    left,
    size,
    color,
    delay = 0,
}: {
    top: string;
    left: string;
    size: number;
    color: string;
    delay?: number;
}) {
    return (
        <motion.svg
            className="absolute opacity-30"
            style={{ top, left, width: size, height: size, color }}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
                repeat: Infinity,
                duration: 3,
                repeatType: 'reverse',
                delay,
            }}
        >
            <path d="M9 3v12a4 4 0 1 1-2-3.465V6h8V3H9z" />
        </motion.svg>
    );
}

function HistoryDrawer() {
    const [history, setHistory] = useState<TurnScore[][]>([]);


    useEffect(() => {
        const sessions = JSON.parse(localStorage.getItem("gameSessions") || "[]");
        console.log("All game sessions:", sessions);
        setHistory(sessions);
    }, [])

    return (
        <Drawer>
            <DrawerTrigger title='History'>
                <History className='size-7' />
            </DrawerTrigger>

            <DrawerContent className="bg-gradient-to-br from-[#1f1b2e] via-[#2c223f] to-[#1a162a] text-white border-t border-purple-700">
                <DrawerHeader>
                    <DrawerTitle className="text-purple-300 text-xl">🎮 Game History</DrawerTitle>
                    <DrawerDescription className="text-gray-400">
                        Here's your performance in past sessions:
                    </DrawerDescription>
                </DrawerHeader>



                {history.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 mt-6">No games played yet.</p>
                ) : (
                    <div className="px-4 pb-6 space-y-4 overflow-y-scroll">
                        {history.map((session, i) => (
                            <div
                                key={i}
                                className="border border-purple-700 bg-[#241c35] rounded-xl p-4 shadow-md"
                            >
                                <p className="text-purple-400 font-semibold mb-3 text-base sm:text-lg">
                                    🎮 Game {i + 1}
                                </p>
                                <div className="font-semibold my-2 text-sm text-green-600">
                                    {/* Accuracy calcucation */}
                                    {
                                    Math.round(
                                        (session.filter((t) => t.isCorrect).length / 3) * 100
                                    ) > 50 ? (
                                        <span className="text-green-400">🎯 Accuracy : {Math.round(
                                            (session.filter((t) => t.isCorrect).length / 3) * 100
                                        )}%</span>
                                    ) :<span className="text-red-400">🎯 Accuracy : {Math.round(
                                        (session.filter((t) => t.isCorrect).length / 3) * 100
                                    )}%</span>
                                    
                                    }
                                    
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm sm:text-base">
                                    {session.map((turn, j) => (
                                        <div key={j} className="bg-[#33294a] p-3 rounded-lg">
                                            <p>🌀 <span className="font-medium">Turn:</span> {turn.turn}</p>
                                            <p>⏱️ <span className="font-medium">Time:</span> {turn.responseTime}ms</p>
                                            <p>
                                                ✅ <span className="font-medium">Correct:</span>{" "}
                                                <span className={turn.isCorrect ? "text-green-400" : "text-red-400"}>
                                                    {turn.isCorrect ? "Yes" : "No"}
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </DrawerContent>
        </Drawer>
    );
}
function StatItem({ label, value, span = false }: { label: string, value: string | number | boolean, span?: boolean }) {
    return (
        <div className={`flex items-center gap-1 ${span ? "col-span-2 sm:col-span-3" : ""}`}>
            {label}: <span>{value}</span>
        </div>
    );
}