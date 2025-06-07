import Detail from '@/components/About/Detail/page';
import VisiMisi from '@/components/About/VisiMisi/page';
import Footer from '@/components/Footer/page';
import Header from '@/components/Header/page';
import Jumbotron from '@/components/Jumbotron/page';
import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <section className="h-[65vh] xl:h-[60vh]">
          <Jumbotron link="About" />
        </section>
        <section className="h-[65vh] xl:h-[70vh]">
          <Detail />
        </section>
        <section className="h-[65vh] xl:h-[70vh]">
          <VisiMisi />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About
