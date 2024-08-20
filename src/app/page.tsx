import InfoVideoCta from "@/components/landingPage/InfoVideoCta";
import Gallery from "@/components/landingPage/galery/gallery";
import Header from "@/components/landingPage/header";
import Information from "@/components/landingPage/informations";

export default function Home() {
  return (
    <main>
      <Header/>
      <Gallery/>
      <InfoVideoCta/>
      <Information/>
    </main>
  )
}
