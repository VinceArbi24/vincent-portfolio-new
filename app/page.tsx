"use client";

import { useState } from "react";
import PageIntro from "@/components/layout/PageIntro";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WorkGallery from "@/components/sections/WorkGallery";
import ShopListing from "@/components/sections/ShopListing";
import GraphicDesign from "@/components/sections/GraphicDesign";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <PageIntro onComplete={() => setIntroDone(true)} />

      <Sidebar />
      <MobileNav />

      <main className="pt-14 lg:pl-[var(--sidebar-w)] lg:pt-0">
        <Hero ready={introDone} />
        <WorkGallery />
        <ShopListing />
        <GraphicDesign />
        <About />
        <Services />
        <Experience />
        <Reviews />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
