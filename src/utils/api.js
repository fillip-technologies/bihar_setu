// Thin fetch wrapper for the Bihar Setu API. In dev, Vite proxies /api to the server on :5000.
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status, fieldErrors = {}) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function parse(res) {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(body.message || 'Something went wrong. Please try again.', res.status, body.errors);
  return body;
}

async function request(path, options) {
  try {
    return await parse(await fetch(`${API_BASE}${path}`, options));
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError('Unable to reach the server. Please check your connection and try again.', 0);
  }
}

export const getFormDefinition = (key) => request(`/api/forms/${key}`);

export const getPageContent = (page) => request(`/api/content/${page}`);

export const submitForm = (key, data) =>
  request(`/api/forms/${key}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

// Distinct from the older Bihar Setu app's key, which ran on the same localhost origin.
const TOKEN_KEY = 'bihar-setu-admin-session';
export const adminToken = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (t) => {
    try {
      localStorage.setItem(TOKEN_KEY, t);
    } catch {
      /* storage unavailable */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable */
    }
  },
};

const redirectToLogin = () => {
  adminToken.clear();
  if (window.location.pathname !== '/admin/login') window.location.assign('/admin/login');
};

// Authenticated admin calls. A 401 clears the token and sends the admin back to the login screen.
export async function adminRequest(path, { body, ...options } = {}) {
  try {
    return await request(`/api/admin${path}`, {
      ...options,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        Authorization: `Bearer ${adminToken.get()}`,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch (err) {
    if (err.status === 401 && path !== '/login') redirectToLogin();
    throw err;
  }
}

// Image upload for the content editor (multipart, so the browser sets the Content-Type boundary itself).
export async function uploadAdminImage(file) {
  const body = new FormData();
  body.append('image', file);
  try {
    return await request('/api/admin/uploads', {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken.get()}` },
      body,
    });
  } catch (err) {
    if (err.status === 401) redirectToLogin();
    throw err;
  }
}

// CSV export needs the Authorization header, so fetch it as a blob instead of using a plain link.
export async function downloadAdminFile(path, fallbackName) {
  const res = await fetch(`${API_BASE}/api/admin${path}`, {
    headers: { Authorization: `Bearer ${adminToken.get()}` },
  });
  if (res.status === 401) return redirectToLogin();
  if (!res.ok) throw new ApiError('Could not download the file', res.status);
  const name = /filename="([^"]+)"/.exec(res.headers.get('Content-Disposition') || '')?.[1] || fallbackName;
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
