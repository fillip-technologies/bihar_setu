import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import SubmissionsPanel from './SubmissionsPanel';
import FormBuilder from './FormBuilder';
import PageSectionEditor from './PageSectionEditor';
import { contentPath } from './constants';

// Page editors used to live at /admin/home/<section> and /admin/about/<section>.
function OldContentPath({ page }) {
  const { section } = useParams();
  return <Navigate to={contentPath(page, section)} replace />;
}

// Routes under /admin. Each form has a submissions view and a field builder; each website page has a section editor.
export default function AdminApp() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F0E0A] font-sans" style={{ colorScheme: 'light' }}>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="agenda/submissions" replace />} />
          <Route path=":formKey/submissions" element={<SubmissionsPanel />} />
          <Route path=":formKey/fields" element={<FormBuilder />} />
          {/* Under their own prefix, so a page key can never clash with a form key (both are "agenda") */}
          <Route path="pages/:page/:section" element={<PageSectionEditor />} />
          <Route path="home/:section" element={<OldContentPath page="home" />} />
          <Route path="about/:section" element={<OldContentPath page="about" />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </div>
  );
}
