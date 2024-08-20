"use client"
import YouTube from 'react-youtube';
import { Separator } from "@/components/ui/separator"
export default function InfoVideoCta() {
    const videoId = '_Y-U0s9duec'
    const opts = {
        width: '340px',
        height: '190px',
    };

    return (
        <>
        <Separator/>
        <div className="flex flex-col p-4 gap-4 justify-center items-center">
            <p className="text-justify">
            Venha se reconectar consigo mesma durante três dias em uma charmosa chácara, longe das pressões cotidianas.
            </p>
            <p className="text-justify">
            Este retiro oferece um espaço de crescimento pessoal, através de palestras, dinâmicas e momentos de reflexão, todos voltados para promover o cuidado emocional.
            </p>
            <YouTube videoId={videoId} opts={opts} />
        </div>
        <Separator/>
        </>
    );
}