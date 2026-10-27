import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Uncaught application error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F9F8F4] flex items-center justify-center p-6 text-center font-sans text-stone-900">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-lg">
            <h1 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Memuat Ulang Halaman
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              Terjadi pembaruan jaringan atau komponen halaman. Silakan muat ulang untuk melanjutkan perjalanan ziarah Anda.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Muat Ulang Sekarang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </RootErrorBoundary>
  </StrictMode>
);

