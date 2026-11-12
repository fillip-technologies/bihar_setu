import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Inbox, Loader2, Search, Trash2 } from 'lucide-react';
import { adminRequest, downloadAdminFile } from '../../utils/api';
import { Modal, PageHeader, StatusBadge, dangerButton, iconButton, inputClass, primaryButton, secondaryButton } from './ui';
import { PUBLIC_PATHS } from './constants';

const PAGE_SIZE = 20;

const formatDate = (iso) => new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return value === undefined || value === null ? '' : String(value);
}

// Remounted per form (see default export) so search, filters and paging reset when switching forms.
function Submissions({ formKey }) {
  const { forms, refreshForms } = useOutletContext();
  const form = forms.find((f) => f.key === formKey);

  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [reloadTick, setReloadTick] = useState(0);
  const [selected, setSelected] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(query.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filterParams = () => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (status) params.set('status', status);
    return params;
  };

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({ page, limit: PAGE_SIZE });
    if (search) params.set('q', search);
    if (status) params.set('status', status);
    adminRequest(`/forms/${formKey}/submissions?${params}`)
      .then((d) => {
        if (!active) return;
        setData(d);
        setError('');
      })
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [formKey, page, search, status, reloadTick]);

  const columns = data?.columns ?? [];
  // A few short answers make the table scannable; the full submission opens in the detail view.
  const previewColumns = columns.filter((c) => !c.removed && !c.hidden && !['checkbox', 'textarea'].includes(c.type)).slice(0, 4);

  const afterChange = () => {
    setReloadTick((t) => t + 1);
    refreshForms();
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      await downloadAdminFile(`/forms/${formKey}/submissions/export?${filterParams()}`, `${formKey}-submissions.csv`);
    } catch (err) {
      setError(err.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <PageHeader
        title={form?.title ?? 'Submissions'}
        subtitle={form ? `${form.total} total · ${form.new} new` : undefined}
        actions={
          <button type="button" onClick={exportCsv} disabled={exporting || !data?.total} className={secondaryButton}>
            {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
            Export CSV
          </button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8988F]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, mobile, reference..."
            aria-label="Search submissions"
            className={`${inputClass} pl-9`}
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by status"
          className={`${inputClass} sm:w-44`}
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
        </select>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-lg border border-[#F3C9C4] bg-[#FDF1EF] px-4 py-3 text-sm text-[#B42318]">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-[#EFE5D7] bg-white">
        {!data ? (
          <div className="flex items-center justify-center py-20 text-[#8A7972]">
            <Loader2 size={20} className="animate-spin" />
          </div>
        ) : data.items.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <Inbox size={32} className="mx-auto text-[#D8CBB6]" />
            <p className="mt-3 text-sm font-semibold text-[#4A3831]">{search || status ? 'No matching submissions' : 'No submissions yet'}</p>
            {!search && !status && PUBLIC_PATHS[formKey] && (
              <a href={PUBLIC_PATHS[formKey]} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm text-[#96681E] underline">
                Open the form on the website
              </a>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#EFE5D7] bg-[#FDFBF7] text-left text-[11px] font-bold uppercase tracking-wider text-[#8A7972]">
                  <th className="px-4 py-3 whitespace-nowrap">Reference</th>
                  {previewColumns.map((c) => (
                    <th key={c.key} className="px-4 py-3 whitespace-nowrap">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 whitespace-nowrap">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((s) => (
                  <tr
                    key={s._id}
                    onClick={() => setSelected(s)}
                    className="border-b border-[#F5EEE3] last:border-0 hover:bg-[#FDFBF7] cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#651B12] whitespace-nowrap">
                      <button type="button" className="cursor-pointer hover:underline" onClick={() => setSelected(s)}>
                        {s.referenceId}
                      </button>
                    </td>
                    {previewColumns.map((c) => (
                      <td key={c.key} className="px-4 py-3 max-w-[220px] truncate text-[#1F0E0A]">
                        {formatValue(s.data?.[c.key]) || <span className="text-[#C8BBAF]">-</span>}
                      </td>
                    ))}
                    <td className="px-4 py-3 whitespace-nowrap text-[#6B5A52]">{formatDate(s.createdAt)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data && data.pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-[#6B5A52]">
          <span>
            Page {data.page} of {data.pages} · {data.total} results
          </span>
          <div className="flex gap-1">
            <button type="button" onClick={() => setPage((p) => p - 1)} disabled={page <= 1} aria-label="Previous page" className={iconButton}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => setPage((p) => p + 1)} disabled={page >= data.pages} aria-label="Next page" className={iconButton}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {selected && (
        <SubmissionDetail
          submission={selected}
          columns={columns}
          onClose={() => setSelected(null)}
          onChanged={(updated) => {
            setSelected(updated);
            afterChange();
          }}
          onDeleted={() => {
            setSelected(null);
            afterChange();
          }}
        />
      )}
    </div>
  );
}

function SubmissionDetail({ submission, columns, onClose, onChanged, onDeleted }) {
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  // Columns this submission actually answered, in form order, plus any answers outside the known columns.
  const known = new Set(columns.map((c) => c.key));
  const rows = [
    ...columns.filter((c) => submission.data && c.key in submission.data),
    ...Object.keys(submission.data || {})
      .filter((k) => !known.has(k))
      .map((k) => ({ key: k, label: submission.fieldsSnapshot?.find((f) => f.key === k)?.label || k, removed: true })),
  ];

  const run = async (fn) => {
    setBusy(true);
    setError('');
    try {
      await fn();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const toggleStatus = () =>
    run(async () => {
      const updated = await adminRequest(`/submissions/${submission._id}`, {
        method: 'PATCH',
        body: { status: submission.status === 'new' ? 'reviewed' : 'new' },
      });
      setBusy(false);
      onChanged(updated);
    });

  const remove = () =>
    run(async () => {
      await adminRequest(`/submissions/${submission._id}`, { method: 'DELETE' });
      onDeleted();
    });

  return (
    <Modal
      title={submission.referenceId}
      onClose={onClose}
      wide
      footer={
        confirmDelete ? (
          <>
            <span className="mr-auto self-center text-sm text-[#B42318]">Delete this submission permanently?</span>
            <button type="button" onClick={() => setConfirmDelete(false)} disabled={busy} className={secondaryButton}>
              Cancel
            </button>
            <button type="button" onClick={remove} disabled={busy} className={dangerButton}>
              {busy && <Loader2 size={15} className="animate-spin" />}
              Delete
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setConfirmDelete(true)} className={`${secondaryButton} mr-auto text-[#B42318]`}>
              <Trash2 size={15} />
              Delete
            </button>
            <button type="button" onClick={toggleStatus} disabled={busy} className={primaryButton}>
              {busy && <Loader2 size={15} className="animate-spin" />}
              {submission.status === 'new' ? 'Mark as reviewed' : 'Mark as new'}
            </button>
          </>
        )
      }
    >
      <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-[#6B5A52]">
        <StatusBadge status={submission.status} />
        <span>Submitted {formatDate(submission.createdAt)}</span>
      </div>

      {error && <p className="mb-4 rounded-lg bg-[#FDF1EF] px-3 py-2 text-sm text-[#B42318]">{error}</p>}

      <dl className="divide-y divide-[#F5EEE3] rounded-xl border border-[#EFE5D7]">
        {rows.map((c) => (
          <div key={c.key} className="grid gap-1 px-4 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
            <dt className="text-xs font-semibold text-[#8A7972]">
              {c.label}
              {c.removed && <span className="ml-1.5 font-normal text-[#B8A99D]">(removed field)</span>}
            </dt>
            <dd className="text-sm text-[#1F0E0A] whitespace-pre-wrap break-words">
              {formatValue(submission.data[c.key]) || <span className="text-[#C8BBAF]">-</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}

export default function SubmissionsPanel() {
  const { formKey } = useParams();
  return <Submissions key={formKey} formKey={formKey} />;
}
