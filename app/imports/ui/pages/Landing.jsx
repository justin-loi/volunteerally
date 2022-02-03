import React from 'react';
import LandingTopSection from '../components/landing/LandingTopSection';
import LandingMiddleSection from '../components/landing/LandingMiddleSection';
import LandingEventCalendarSection from '../components/landing/LandingEventCalendarSection';
import LandingOpportunitiesByCategorySection from '../components/landing/LandingOpportunitiesByCategorySection';
import LandingBottomSection from '../components/landing/LandingBottomSection';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <div>
    <LandingTopSection/>
    <LandingMiddleSection/>
    <LandingEventCalendarSection/>
    <LandingOpportunitiesByCategorySection/>
    <LandingBottomSection/>
  </div>
);

export default Landing;
