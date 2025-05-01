'use client';


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleFadingArrowUp, Link2, LogOut, MenuIcon, Mic, Send, Settings, Smile, XIcon } from "lucide-react";
import Link from 'next/link';


type Msg = { id: number; text: string };


const chat: Msg[] = [
    { id: 1, text: "Hey there! 👋" },
    { id: 2, text: "Hi! How can I assist you today?" },
    { id: 1, text: "What's the weather like? 🌤️" },
    { id: 2, text: "It's sunny and warm outside! ☀️" },
    { id: 1, text: "Can you recommend a good book? 📚" },
    { id: 2, text: "Sure! Try 'Atomic Habits' by James Clear." },
    { id: 1, text: "Thanks for the suggestion! 🙌" },
    { id: 2, text: "You're welcome! Let me know if you need more ideas." },
    { id: 1, text: "Hey there! 👋" },
    { id: 2, text: "Hi! How can I assist you today?" },
    { id: 1, text: "What's the weather like? 🌤️" },
    { id: 2, text: "It's sunny and warm outside! ☀️" },
    { id: 1, text: "Can you recommend a good book? 📚" },
    { id: 2, text: "Sure! Try 'Atomic Habits' by James Clear." },
    { id: 1, text: "Thanks for the suggestion! 🙌" },
    { id: 2, text: "You're welcome! Let me know if you need more ideas." },
];


export default function petaiPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleSend = () => {


    }
    return (
        
        <div className="flex h-screen overflow-hidden relative ">


        {/* Sidebar for desktop */}
        <div
            className={`bg-gray-900 text-white transition-all duration-300 fixed top-0 left-0 h-full z-30 ${sidebarOpen ? 'w-52' : 'w-0'} overflow-hidden hidden lg:block`}
        >
            {sidebarOpen && (
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 ">
                        <Link href={"/pet-ai"} className="text-xl font-bold">
                            <CircleArrowLeft className='size-6' />
                        </Link>
                        <Button  onClick={() => setSidebarOpen(false)} className='bg-transparent cursor-pointer text-white hover:bg-slate-800'>
                            <XIcon className="size-6" />
                        </Button>
                    </div>
                    <div>
                        <h1 className='text-center text-lg mt-3'>Start a new chat</h1>
                    </div>
                    <ul className="flex flex-col h-full justify-end overflow-y-auto space-y-2 px-1 pb-8">
                        <li className='flex  gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                            <Settings className='size-5' /> Settings
                        </li>
                        <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                            <LogOut className='size-5' /> Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>

        {/* Sidebar for mobile */}
        <div
                className={`fixed top-0 left-0 h-screen w-60 bg-slate-900 text-white p-4 z-40 transform transition-transform duration-300 ease-in-out ${sidebarDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {sidebarDrawerOpen && (
                    <div className="flex flex-col h-full ">
                        <div className="flex justify-between items-center p-1">
                            <Link href={"#"} className="text-xl font-bold">
                                <CircleArrowLeft className='size-6' />
                            </Link>
                            <Button  onClick={() => setSidebarDrawerOpen(false)} className='bg-transparent hover:bg-slate-800 cursor-pointer'>
                                <XIcon className="size-6" />
                            </Button>
                        </div>
                        <div>
                            <h1 className='text-center text-lg mt-3'>Start a new chat</h1>
                        </div>
                        <ul className="flex flex-col h-full justify-end overflow-y-auto space-y-2 px-1 pb-8">
                            <li className='flex  gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                                <Settings className='size-5' /> Settings
                            </li>
                            <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                                <LogOut className='size-5' /> Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>


            {/* Main Chat Area */}
            <div className={`flex-1 flex-col bg-gray-100 overflow-y-auto relative cursor-default transition-all duration-300 ${sidebarOpen ? 'lg:pl-52' : ''}`}>


                {/* Top bar */}
                <div className='bg-black p-4  text-blue-700 fixed w-full z-20'>
                    {/* Sidebar for desktop */}
                    {!sidebarOpen && (
                        <Button
                            onClick={() => setSidebarOpen(true)}
                            className="absolute top-4 left-4 z-10 bg-transparent text-white hover:bg-gray-600 cursor-pointer sm:hidden lg:block"
                        >
                            <MenuIcon className="size-6" />
                        </Button>
                    )}
                    {/* Sidebar toggle botton for mobile */}
                    {!sidebarDrawerOpen && (
                        <button
                            onClick={() => setSidebarDrawerOpen(true)}
                            className="absolute top-4 left-4 z-10 bg-transparent flex items-center justify-center p-2 rounded cursor-pointer shadow sm:block lg:hidden"
                        >
                            <MenuIcon className="text-gray-100 size-6" />
                        </button>
                    )}
                    <div className={`${sidebarOpen ? 'pl-[35%]' : 'text-center'} ${sidebarDrawerOpen && 'blur-xs'}`}>
  <h1 className="text-3xl font-semibold text-white">
    Pet AI
    <br />
    <span className="text-xs border border-green-600 px-2 py-1 rounded-full mt-2 inline-block w-auto">🟢 Online</span>
  </h1>
</div>

                </div>


                {/* Chat messages */}
                <section className={`flex-1 overflow-y-auto py-28 px-2 w-full lg:px-24 scroll-smooth ${sidebarDrawerOpen ? 'opacity-30' : ''} bg-black`}>
                    <div className="flex flex-col gap-3">
                        {chat.map((m, idx) =>
                            m.id === 1 ? (
                                <UserBubble key={idx}>{m.text}</UserBubble>
                            ) : (
                                <BotBubble key={idx}>{m.text}</BotBubble>
                            )
                        )}
                    </div>
                </section>


                {/* Input area */}
                {/* Input area fixed at the bottom */}
                <div className={`flex items-center justify-center px-4 py-2 bg-black shadow-md fixed bottom-0 left-0 w-full lg:px-8 gap-2 z-10 ${sidebarOpen ? 'lg:pl-64' : ''} ${sidebarDrawerOpen ? 'blur-xs' : ''}`}>




                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Send a message..."
                        className="h-14 p-3  text-blue-400 bg-slate-950  text-sm  rounded-md shadow-sm resize-none overflow-y-auto  w-[80%] outline-none border"
                    />
                    <div className="flex items-center right-[8.5%] gap-2 ">
                        <Button size="icon" variant="ghost" className="text-white">
                            <Smile className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                            <Link2 className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                            <Mic className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                           
                            <CircleFadingArrowUp className='size-5'/>
                        </Button>
                        <Button onClick={handleSend} size="icon" variant="ghost" className="text-black bg-white rounded-full cursor-pointer">
                            <Send className="size-5 " />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function UserBubble({ children }: { children: React.ReactNode }) {
    return (
        <div className="ml-auto flex max-w-[75%] items-end gap-2">
            <div className="rounded-2xl rounded-br-sm bg-green-600 px-4 py-2 text-sm text-white shadow">
                {children}
            </div>
        </div>
    );
}


function BotBubble({ children }: { children: React.ReactNode }) {
    return (
        <div className="mr-auto flex max-w-[75%] items-end gap-2">
            <div className="rounded-2xl rounded-bl-sm bg-gray-50 text-gray-800 px-4 py-2 text-sm shadow">
                {children}
            </div>
        </div>
    );
}
