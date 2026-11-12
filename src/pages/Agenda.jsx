import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AgendaHero from '../components/agenda/AgendaHero';
import AgendaSchedule from '../components/agenda/AgendaSchedule';
import AgendaRegisterForm from '../components/agenda/AgendaRegisterForm';
import GetInTouch from '../components/home/GetInTouch';

export default function Agenda() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#register-form') {
      const timer = setTimeout(() => {
        const el = document.getElementById('register-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero Banner with 'FULL AGENDA 2026' */}
      <AgendaHero />

      {/* 2. Interactive Schedule (Day 1 / Day 2, Search, Panels, Evening Programme) */}
      <AgendaSchedule />

      {/* 3. Delegate Registration Form for Sessions */}
      <AgendaRegisterForm />

      {/* 4. Get In Touch Section (Reused from Home) */}
      <GetInTouch />
    </div>
  );
}

