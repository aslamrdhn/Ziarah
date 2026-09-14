import React from 'react';
import { BookOpen, AlertCircle, HeartHandshake, ListOrdered } from 'lucide-react';
import { panduanZiarah } from '../data/panduan';

export const PanduanZiarah: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50 h-full p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-neutral-900">
            Panduan & Adab Ziarah
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Pelajari adab yang benar dan doa-doa yang diajarkan saat melakukan ziarah kubur.
          </p>
        </div>

        {/* Adab Section */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-6">
            <HeartHandshake className="w-6 h-6 text-brand-500 mr-3" />
            <h2 className="text-2xl font-bold text-neutral-900">Adab Ziarah</h2>
          </div>
          <div className="space-y-4">
            {panduanZiarah.adab.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Susunan Ziarah/Tahlil */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-6">
            <ListOrdered className="w-6 h-6 text-brand-500 mr-3" />
            <h2 className="text-2xl font-bold text-neutral-900">Urutan Amalan Ziarah</h2>
          </div>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                1
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1">Membaca Salam</h4>
                <p className="text-sm text-neutral-600">Mengucapkan salam kepada ahli kubur saat memasuki area makam.</p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1">Membaca Surah Al-Fatihah</h4>
                <p className="text-sm text-neutral-600">Diniatkan (dihadiahkan pahalanya) untuk ruh ahli kubur yang diziarahi.</p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                3
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1">Membaca Surah Yasin</h4>
                <p className="text-sm text-neutral-600">Membaca Surah Yasin (Opsional namun sangat dianjurkan saat berziarah).</p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                4
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1">Membaca Tahlil Singkat</h4>
                <p className="text-sm text-neutral-600">Membaca Al-Ikhlas (3x), Al-Falaq (1x), An-Nas (1x), Ayat Kursi, dan kalimat Laa Ilaaha Illallah.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                5
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1">Doa Ziarah & Ampunan</h4>
                <p className="text-sm text-neutral-600">Memohon kepada Allah SWT agar ahli kubur diampuni dosa-dosanya dan diterima amal ibadahnya.</p>
              </div>
            </div>
            
          </div>
        </section>

        {/* Doa Section */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-6">
            <AlertCircle className="w-6 h-6 text-brand-500 mr-3" />
            <h2 className="text-2xl font-bold text-neutral-900">Doa Ziarah</h2>
          </div>
          
          <div className="space-y-8">
            {/* Salam */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-neutral-900 border-b border-neutral-100 pb-2">Salam Kepada Ahli Kubur</h3>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 text-center space-y-4">
                <p className="text-2xl font-bold text-neutral-900 leading-relaxed font-serif" dir="rtl">
                  {panduanZiarah.doa.salam.arabic}
                </p>
                <p className="text-brand-600 font-medium italic text-sm">
                  "{panduanZiarah.doa.salam.latin}"
                </p>
                <p className="text-neutral-600 text-sm">
                  Artinya: {panduanZiarah.doa.salam.translation}
                </p>
              </div>
            </div>

            {/* Doa Pendek */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-neutral-900 border-b border-neutral-100 pb-2">Doa Memohon Ampunan</h3>
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 text-center space-y-4">
                <p className="text-2xl font-bold text-neutral-900 leading-relaxed font-serif" dir="rtl">
                  {panduanZiarah.doa.ziarah.arabic}
                </p>
                <p className="text-brand-600 font-medium italic text-sm">
                  "{panduanZiarah.doa.ziarah.latin}"
                </p>
                <p className="text-neutral-600 text-sm">
                  Artinya: {panduanZiarah.doa.ziarah.translation}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

