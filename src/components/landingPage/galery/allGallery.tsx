"use client"
import { IoMdCloseCircle } from "react-icons/io";
import React, { useState } from 'react';
import ItemGallery from './itemGallery';
import Image from 'next/image';

interface GalleryProps {
    images: string[];
}

export default function AllGallery({images}:Readonly<GalleryProps>) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    return (
        <>
        <div className="flex flex-wrap w-[616px] max-h-[240px] gap-2">
            {images.map((imageUrl, index) => (
            <ItemGallery
                key={index}
                imageUrl={imageUrl}
                onClick={() => handleClick(imageUrl)}
            />
            ))}
        </div>
        {selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative max-w-[90%] max-h-[90%]">
                    <button className="absolute -top-10 -right-0 text-destructive" onClick={() => setSelectedImage(null)}>
                    <IoMdCloseCircle className="w-8 h-8" />
                    </button>
                    <div className="rounded-lg shadow-lg">
                    <Image className="rounded-[10px]" width={340} height={340} src={selectedImage} alt="Selected Image" />
                    </div>
                </div>
            </div>
        )}
        </>
    );
}