import React from 'react';
import Banner from '../components/Banner';
import WhyUs from '../components/WhyUs';
import BestProperties from '../components/BestProperties';
import Reviews from '../components/Reviews';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div>
      <BestProperties />
      <Banner />
      <WhyUs />
      <Newsletter />
      <Reviews />
    </div>
  );
}
