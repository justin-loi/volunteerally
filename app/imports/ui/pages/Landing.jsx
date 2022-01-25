import React from 'react';
import LandingTopSection from '../components/LandingTopSection';
import LandingMiddleSection from '../components/LandingMiddleSection';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <div>
    <LandingTopSection/>
    <LandingMiddleSection/>
  </div>
);

export default Landing;
