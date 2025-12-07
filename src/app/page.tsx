import { Hero } from "@/components/sections/Hero";
import { PhysicsHero } from "@/components/sections/PhysicsHero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Interests } from "@/components/sections/Interests";
import { Experience } from "@/components/sections/Experience";
import { Roadmap } from "@/components/sections/Roadmap";

export default function Home() {
  return (
    <main>
      <PhysicsHero />
      <Philosophy />
      <Interests />
      <Experience />
      <Roadmap />
    </main>
  );
}
