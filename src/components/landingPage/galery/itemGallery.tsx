"use client"
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect  } from 'react';
interface GalleryItemProps {
    imageUrl: string;
    onClick: () => void;
}
export default function ItemGallery({ imageUrl, onClick }: Readonly<GalleryItemProps>) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const src = URL.createObjectURL(blob);
        setImageSrc(src);
        setLoading(false);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc, imageUrl]);

    return (
      <div onClick={onClick} className="w-24 h-24 overflow-hidden rounded-lg">
        {loading ? (
          <Skeleton className="h-[92px] w-[92px] rounded-xl"  />
          ) : (
          <Image
            className="rounded-[10px] w-full h-full object-cover"
            width={92}
            height={92}
            src={imageUrl}
            alt="Gallery Item"
          />
        )}
      </div>
      );
    }
