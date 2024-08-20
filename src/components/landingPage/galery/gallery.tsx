import AllGallery from './allGallery';
import { FaArrowRight } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const baseUrl = process.env.BASE_URL;
const BaseGallery = {
  images2021: {
    ano: 'Galeria 2021',
    tema: 'Raízes curadas',
    fotos: [
      `${baseUrl}/img/retiro2021/retiro2021-0001.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0002.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0003.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0004.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0005.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0006.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0007.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0008.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0009.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0010.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0011.jpg`,
      `${baseUrl}/img/retiro2021/retiro2021-0012.jpg`,
    ]
  },
  images2022: {
    ano: 'Galeria 2022',
    tema: 'Floresça',
    fotos: [
      `${baseUrl}/img/retiro2022/retiro2022-0001.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0002.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0003.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0004.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0005.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0006.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0007.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0008.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0009.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0010.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0011.jpg`,
      `${baseUrl}/img/retiro2022/retiro2022-0012.jpg`,
    ]
  },
  images2023: {
    ano: 'Galeria 2023',
    tema: 'Frutifique',
    fotos: [
      `${baseUrl}/img/retiro2023/retiro2023-0001.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0002.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0003.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0004.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0005.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0006.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0007.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0008.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0009.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0010.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0011.jpg`,
      `${baseUrl}/img/retiro2023/retiro2023-0012.jpg`,
    ]
  }
};

export default function Gallery() {
  const galleries = Object.values(BaseGallery);

  return (
    <ScrollArea id='galeria' className="w-[100%] max-h-[290px] py-4 pl-4 overflow-auto">
      <div className="flex gap-2 flex-row">
        {galleries.map((gallery, index) => (
          <div key={index}>
            <div className='flex flex-col justify-center pl-[70px]'>
              <div className="flex gap-2 ">
                {index !== 0 && <FaArrowRight className="mt-2 transform rotate-180"/>}
                <div className="text-center mx-6">
                  <h6 className='font-bold'>{gallery.ano}</h6>
                  <p>{gallery.tema}</p>
                </div>
                {index !== galleries.length - 1 && <FaArrowRight className="mt-2" />}
              </div>
            </div>
            <AllGallery images={gallery.fotos} />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}