import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import SubmissionsPanel from './SubmissionsPanel';
import FormBuilder from './FormBuilder';
import PageSectionEditor from './PageSectionEditor';
import { CONTENT_PAGES } from './constants';

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
          {CONTENT_PAGES.map((p) => (
            <Route key={p.key} path={`${p.key}/:section`} element={<PageSectionEditor pageKey={p.key} />} />
          ))}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </div>
  );
}
