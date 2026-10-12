import Food from "@/components/Food";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlateBuilder from "@/components/PlateBuilder";
import Rooms from "@/components/Rooms";
import Story from "@/components/Story";
import { Trust, Visit } from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <PlateBuilder />
        <Story />
        <Food />
        <Rooms />
        <Trust />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
