import Image from "next/image";
import ButtonRegistro from "./buttonRegistro";
export default function Header() {
  const baseUrl = process.env.BASE_URL
    return (
      <>
      <div className="flex flex-col gap-4 items-center mx-auto my-auto">
        <Image
            width={104}
            height={127}
            alt={'Logo Resgatando Anas Você é Terra Fértil'}
            src={`${baseUrl}/img/LogoResgatandoAnas.png`}
          />
      <div className="flex flex-row justify-center w-full">
        <div className="overflow-hidden w-[324px] h-[260px] relative">
          <div>
          <Image
            className="absolute w-[324px] h-[260x] top-0 left-0 object-cover"
            width={324}
            height={260}
            alt={'Logo Mulher Lendo'}
            src={'/img/foto-header.png'}
          />
          <div className="absolute w-[252px] h-[64px] top-[90px] left-0 bg-primary" />
          <div className="absolute w-[254px] top-[95px] left-[17px] font-bold text-gray-800 text-[1rem]">
            RETIRO DE <br />
            MULHERES 2024
          </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h6 className="font-bold -mt-6 pr-4">Tema: Descendo do Salto</h6>
        <p>
        Reserve um tempo para si mesma e entre em um espaço de cura e crescimento.
        </p>
        <ButtonRegistro/>
        <p>
        Descendo do Salto é mais do que um evento; é um convite para se conectar consigo mesma, elevar sua autoestima e se cercar de apoio. Independentemente de onde você esteja em sua jornada, este retiro foi criado com você em mente.
        </p>
      </div>
      </div>
      <p className="mx-auto my-auto py-4 p-4">
      Junte-se a nós em um retiro transformador, mergulhando em um ambiente acolhedor e enriquecedor, especialmente projetado para mulheres como você.
      </p>
      <p className="mx-auto my-auto py-4 p-4">
      Descendo do Salto é mais do que um evento; é um convite para cuidar da sua saúde emocional, enquanto compartilha experiências valiosas e encontra apoio em uma comunidade acolhedora.
      </p>
      <p className="mx-auto my-auto py-4 p-4">
      Vamos juntas descer do salto e caminhar para uma vida mais plena e autêntica!
      </p>
      </>
    );
}