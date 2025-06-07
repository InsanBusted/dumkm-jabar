import Footer from '@/components/Footer/page';
import Header from '@/components/Header/page';
import Jumbotron from '@/components/Jumbotron/page';
import ProductPage from '@/components/Product/page';
import React from 'react'

const Product = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <section className="h-[65vh] xl:h-[60vh]">
          <Jumbotron link="Product" />
        </section>
        <section className="h-[220vh] xl:h-[80vh]">
          <ProductPage />
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default Product
