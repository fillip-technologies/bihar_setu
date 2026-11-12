import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import EnquiryPopup from './shared/EnquiryPopup';
import SiteContentProvider from './content/SiteContentProvider';
import Home from './pages/Home';
import About from './pages/About';
import Agenda from './pages/Agenda';
import GetInvolved from './pages/GetInvolved';
import Enquire from './pages/Enquire';
import Partners from './pages/Partners';
import Speakers from './pages/Speakers';

// The admin panel is loaded on demand so it doesn't add to the public site's bundle.
const AdminApp = lazy(() => import('./pages/admin/AdminApp'));

function SiteLayout() {
  return (
    <SiteContentProvider>
      <div className="min-h-screen bg-[#1A0502] text-white flex flex-col font-sans selection:bg-[#CB9010] selection:text-[#370C01]">
        {/* Global Navbar */}
        <Navbar />

        {/* Dynamic Pages Container */}
        <main className="grow">
          <Outlet />
        </main>

        {/* Global Fixed Right-Side Enquiry Popup Widget */}
        <EnquiryPopup />

        {/* Global Footer */}
        <Footer />
      </div>
    </SiteContentProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin panel - its own layout, without the website navbar and footer */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
              <AdminApp />
            </Suspense>
          }
        />

        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="/partners" element={<Partners />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
