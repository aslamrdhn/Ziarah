
import React, { useState } from 'react';
import { RotateCcw, Copy } from 'lucide-react';
import { motion } from 'motion/react';

export const BacaanZiarah: React.FC = () => {
  const [fontSize, setFontSize] = useState<'A' | 'A+' | 'A++'>('A');
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihMax, setTasbihMax] = useState(33);
  const [showLatin, setShowLatin] = useState(true);
  const [showTerjemahan, setShowTerjemahan] = useState(true);
  const [activeStep, setActiveStep] = useState<string>('SALAM');

  const steps = [
    { id: 'SEMUA', label: 'Semua' },
    { id: 'SALAM', label: 'Salam', stepLabel: '1. SALAM' },
    { id: 'TAWASSUL', label: 'Tawassul', stepLabel: '2. TAWASSUL' },
    { id: 'YASIN', label: 'Yasin', stepLabel: '3. YASIN' },
    { id: 'TAHLIL', label: 'Tahlil', stepLabel: '4. TAHLIL' },
    { id: 'DOA', label: 'Doa', stepLabel: '5. DOA' },
  ];

  const handleTasbihClick = () => {
    setTasbihCount((prev) => (prev + 1) > tasbihMax ? 1 : prev + 1);
  };

  const getFontSizeClass = () => {
    if (fontSize === 'A+') return 'text-4xl md:text-5xl';
    if (fontSize === 'A++') return 'text-5xl md:text-6xl';
    return 'text-3xl md:text-4xl';
  };

  return (
      
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pb-20">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 mb-6 flex flex-col md:flex-row md:items-center justify-between border border-stone-200 shadow-sm">
        <div className="flex items-start space-x-4 mb-6 md:mb-0">
          <div className="p-3.5 bg-brand-50 text-brand-700 rounded-2xl border border-brand-100">
            <BookOpenIcon />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-brand-900 tracking-tight">Panduan Ziarah</h1>
            <p className="text-sm mt-1 text-stone-500">Adab, Tawassul, Yasin, dan Tahlil</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-stone-50 rounded-xl p-1 border border-stone-200">
            {['A', 'A+', 'A++'].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size as any)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                  fontSize === size 
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Tasbih Widget */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <span className="font-bold text-sm text-stone-800 tracking-wide uppercase">Tasbih Digital</span>
            <div className="flex items-center space-x-1 bg-stone-50 p-1 rounded-xl border border-stone-200">
              <button onClick={() => { setTasbihMax(33); setTasbihCount(0); }} className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors ${tasbihMax === 33 ? 'bg-white text-stone-900 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-900'}`}>33</button>
              <button onClick={() => { setTasbihMax(100); setTasbihCount(0); }} className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-colors ${tasbihMax === 100 ? 'bg-white text-stone-900 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-900'}`}>100</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <button 
              onClick={handleTasbihClick}
              className="flex-1 bg-stone-50 hover:bg-stone-100 rounded-2xl py-8 px-4 border border-stone-200 text-center mr-4 active:scale-95 transition-all group"
            >
              <span className="text-4xl font-extrabold text-brand-700 transition-colors">{tasbihCount} <span className="text-xl text-stone-400 font-medium">/ {tasbihMax}</span></span>
            </button>
            <button onClick={() => setTasbihCount(0)} className="p-4 bg-white rounded-2xl hover:bg-stone-50 border border-stone-200 transition-colors shadow-sm text-stone-600">
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Urutan Controls */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <span className="font-bold text-sm text-stone-800 tracking-wide uppercase mb-4 sm:mb-0">Tahapan Ziarah</span>
            <div className="flex items-center space-x-4 bg-stone-50 p-1.5 rounded-xl border border-stone-200">
              <label className="flex items-center cursor-pointer text-xs font-bold text-stone-600 px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                <input type="checkbox" checked={showLatin} onChange={() => setShowLatin(!showLatin)} className="mr-2 accent-brand-600 rounded" />
                Latin
              </label>
              <label className="flex items-center cursor-pointer text-xs font-bold text-stone-600 px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                <input type="checkbox" checked={showTerjemahan} onChange={() => setShowTerjemahan(!showTerjemahan)} className="mr-2 accent-brand-600 rounded" />
                Terjemahan
              </label>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {steps.slice(1).map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`py-3 px-3 text-xs md:text-sm font-bold rounded-xl transition-all flex-1 text-center min-w-[90px] border ${
                  activeStep === step.id 
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {step.stepLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm p-6 md:p-12 border border-stone-200"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-100 pb-8 mb-10">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="px-3 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-widest bg-brand-50 text-brand-700 border border-brand-200">
              {steps.find(s => s.id === activeStep)?.label}
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-brand-900">
              {activeStep === 'SALAM' && 'Salam Masuk Area Makam Waliyullah'}
              {activeStep === 'TAWASSUL' && 'Bacaan Tawassul Khusus Ziarah'}
              {activeStep === 'YASIN' && 'Surah Yasin (Singkat)'}
              {activeStep === 'TAHLIL' && 'Susunan Tahlil Singkat'}
              {activeStep === 'DOA' && 'Doa Penutup Ziarah Kubur'}
            </h2>
          </div>
          <button className="p-3 rounded-xl transition-colors bg-stone-50 text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-stone-200">
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-12">
          {activeStep === 'SALAM' && (
            <>
              <div className="text-center" dir="rtl">
                <p className={`font-arabic leading-[2.8] text-stone-900 ${getFontSizeClass()} transition-all duration-300`}>
                  سَلَامُ اللهِ يَا سَادَة ٠ مِنَ الرَّحْمٰنِ يَغْشَاكُمْ<br/>
                  عِبَادَ اللهِ جِئْنَاكُمْ ٠ قَصَدْنَاكُمْ طَلَبْنَاكُمْ<br/>
                  تُعِينُونَا تُغِيثُونَا ٠ بِهِمَّتِكُمْ وَجَدْوَاكُمْ<br/>
                  فَأَحِبُّونَا وَأَعْطُونَا ٠ عَطَايَاكُمْ هَدَايَاكُمْ<br/>
                  فَلَا خَيَّبْتُمُو ظَنِّي ٠ فَحَاشَاكُمْ وَحَاشَاكُمْ<br/>
                  سَعِدْنَا إِذْ أَتَيْنَاكُمْ ٠ وَفُزْنَا حِينَ زُرْنَاكُمْ<br/>
                  فَقُومُوا وَاشْفَعُوا فِينَا ٠ إِلَى الرَّحْمٰنِ مَوْلَاكُمْ
                </p>
              </div>
              
              {showLatin && (
                <div className="p-6 md:p-10 rounded-2xl text-center bg-stone-50 border border-stone-200">
                  <p className="italic leading-loose text-sm md:text-base text-stone-700 font-medium">
                    "Salaamullaahi yaa saadah, minar-Rahmaani yaghshaakum.<br/>
                    'Ibaadallaahi ji'naakum, qashadnaakum thalabnaakum.<br/>
                    Tu'iinuunaa tughiitsuunaa, bihimmatikum wa jadwaakum.<br/>
                    Fa ahibbuunaa wa a'thuunaa, 'athaayaakum hadaayaakum.<br/>
                    Falaa khayyabtumuu zhannii, fahaasyaakum wa haasyaakum.<br/>
                    Sa'idnaa idz atainaakum, wa fuznaa hiina zurnaakum.<br/>
                    Faquumuu wasyfa'uu fiinaa, ilar-Rahmaani mawlaakum."
                  </p>
                </div>
              )}

              {showTerjemahan && (
                <div className="text-center px-4 md:px-12">
                  <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium text-stone-500">
                    "Kesejahteraan dari Allah wahai para pemimpin, dari Tuhan Yang Maha Pengasih semoga menyelimuti kalian. Wahai hamba-hamba Allah, kami datang kepada kalian. Kami bermaksud kepada kalian, kami meminta kepada kalian. Bantulah kami, tolonglah kami, dengan tekad dan kemurahan kalian. Maka cintailah kami dan berikanlah kepada kami, pemberian kalian, hadiah kalian. Maka janganlah kalian mengecewakan prasangkaku, pantang bagi kalian, pantang bagi kalian. Kami bahagia ketika kami mendatangi kalian, dan kami beruntung ketika kami menziarahi kalian. Maka bangkitlah dan berikanlah syafaat bagi kami, kepada Tuhan Yang Maha Pengasih, Tuhan kalian."
                  </p>
                </div>
                )}
              </>
            )}

          {activeStep === 'TAWASSUL' && (
            <>
              <div className="text-center" dir="rtl">
                <p className={`font-arabic leading-[2.8] text-stone-900 ${getFontSizeClass()} transition-all duration-300`}>
                  إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَآلِهِ وَصَحْبِهِ شَيْءٌ لِلَّهِ لَهُمُ الْفَاتِحَةُ<br/><br/>
                  ثُمَّ إِلَى حَضْرَةِ إِخْوَانِهِ مِنَ الْأَنْبِيَاءِ وَالْمُرْسَلِيْنَ وَالْأَوْلِيَاءِ وَالشُّهَدَاءِ وَالصَّالِحِيْنَ... الْفَاتِحَةُ<br/><br/>
                  ثُمَّ إِلَى رُوْحِ الْوَلِيِّ (سُبُوتْكَان نَامَا وَلِي)... الفَاتِحَةُ
                </p>
              </div>
              
              {showLatin && (
                <div className="p-6 md:p-10 rounded-2xl text-center bg-stone-50 border border-stone-200">
                  <p className="italic leading-loose text-sm md:text-base text-stone-700 font-medium">
                    "Ilaa hadhratin nabiyyil musthafaa Muhammadin shallallaahu 'alaihi wa sallama, wa aalihi wa shahbihii syai-un lillaahi lahumul faatihah...<br/><br/>
                    Tsumma ilaa hadhrati ikhwaanihii minal ambiyaa-i wal mursaliina wal auliyaa-i wasy-syuhadaa-i wash-shaalihiin... al-faatihah...<br/><br/>
                    Tsumma ilaa ruuhi al-waliyyi (Sebutkan Nama Wali yang diziarahi)... al-faatihah..."
                  </p>
                </div>
              )}

              {showTerjemahan && (
                <div className="text-center px-4 md:px-12">
                  <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium text-stone-500">
                    "Kehadirat Nabi Pilihan Muhammad SAW, keluarga, dan para sahabatnya, segala sesuatu adalah milik Allah, bagi mereka (bacaan) Al-Fatihah... Kemudian kepada para saudaranya dari kalangan nabi, rasul, wali, syuhada, dan orang-orang saleh... Al-Fatihah... Kemudian kepada ruh Wali (sebutkan nama wali)... Al-Fatihah."
                  </p>
                </div>
                )}
              </>
            )}

          {activeStep === 'YASIN' && (
            <>
              <div className="text-center" dir="rtl">
                <p className={`font-arabic leading-[2.8] text-stone-900 ${getFontSizeClass()} transition-all duration-300`}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ<br/>
                  يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾ عَلَى صِرَاطٍ مُسْتَقِيمٍ ﴿٤﴾ تَنْزِيلَ الْعَزِيزِ الرَّحِيمِ ﴿٥﴾ لِتُنْذِرَ قَوْمًا مَا أُنْذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ ﴿٦﴾<br/><br/>
                  <span className="text-xl text-stone-400 font-sans">(... Lanjutkan hingga akhir surat Yasin ...)</span>
                </p>
              </div>
              
              {showLatin && (
                <div className="p-6 md:p-10 rounded-2xl text-center bg-stone-50 border border-stone-200">
                  <p className="italic leading-loose text-sm md:text-base text-stone-700 font-medium">
                    "Bismillaahir rahmaanir rahiim.<br/>
                    Yaa siin. Wal qur'aanil hakiim. Innaka laminal mursaliin. 'Alaa shiraathim mustaqiim. Tanziilal 'aziizir rahiim. Litundzira qauman maa undzira aabaa-uhum fahum ghaafiluun..."
                  </p>
                </div>
                )}
              </>
            )}

          {activeStep === 'TAHLIL' && (
            <>
              <div className="text-center" dir="rtl">
                <p className={`font-arabic leading-[2.8] text-stone-900 ${getFontSizeClass()} transition-all duration-300`}>
                  لَا إِلَهَ إِلَّا اللهُ (٣٣×)<br/>
                  لَا إِلَهَ إِلَّا اللهُ مُحَمَّدٌ رَسُوْلُ اللهِ<br/>
                  اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ، اللَّهُمَّ صَلِّ عَلَيْهِ وَسَلِّمْ (٣×)<br/>
                  سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيْمِ (٣٣×)
                </p>
              </div>
              
              {showLatin && (
                <div className="p-6 md:p-10 rounded-2xl text-center bg-stone-50 border border-stone-200">
                  <p className="italic leading-loose text-sm md:text-base text-stone-700 font-medium">
                    "Laa ilaaha illallaah (33x)<br/>
                    Laa ilaaha illallaah, Muhammadur rasuulullaah<br/>
                    Allahumma shalli 'alaa sayyidinaa Muhammad, Allahumma shalli 'alaihi wa sallim (3x)<br/>
                    Subhaanallaahi wa bihamdih, subhaanallaahil 'azhiim (33x)"
                  </p>
                </div>
                )}
              </>
            )}

          {activeStep === 'DOA' && (
            <>
              <div className="text-center" dir="rtl">
                <p className={`font-arabic leading-[2.8] text-stone-900 ${getFontSizeClass()} transition-all duration-300`}>
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ. اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِيْنَ، حَمْدًا شَاكِرِيْنَ، حَمْدًا النَّاعِمِيْنَ<br/>
                  اللَّهُمَّ اجْعَلْ وَأَوْصِلْ ثَوَابَ مَا قَرَأْنَاهُ مِنْ سُوْرَةِ يَسۤ وَمَا هَلَّلْنَا وَمَا سَبَّحْنَا هَدِيَّةً بَالِغَةً وَرَحْمَةً نَازِلَةً وَبَرَكَةً شَامِلَةً إِلَى حَضْرَةِ حَبِيْبِنَا وَشَفِيْعِنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَإِلَى رُوْحِ هَذَا الْوَلِيِّ الْمَقْبُوْرِ هُنَا...<br/>
                  رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                </p>
              </div>
              
              {showLatin && (
                <div className="p-6 md:p-10 rounded-2xl text-center bg-stone-50 border border-stone-200">
                  <p className="italic leading-loose text-sm md:text-base text-stone-700 font-medium">
                    "Bismillaahir rahmaanir rahiim. Alhamdulillaahi rabbil 'aalamiin, hamdasy-syaakiriin, hamdan-naa'imiin.<br/>
                    Allahummaj'al wa awshil tsawaaba maa qara'naahu min suurati Yasin wa maa hallalna wa maa sabbahnaa hadiyyatan baalighatan wa rahmatan naazilatan... ilaa ruuhi haadzal waliyyil maqbuuri hunaa...<br/>
                    Rabbanaa aatinaa fid-dunyaa hasanatan wa fil aakhirati hasanatan wa qinaa 'adzaaban naar."
                  </p>
                </div>
              )}

              {showTerjemahan && (
                <div className="text-center px-4 md:px-12">
                  <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium text-stone-500">
                    "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah Tuhan semesta alam... Ya Allah, jadikanlah dan sampaikanlah pahala dari apa yang kami baca dari surah Yasin, tahlil, dan tasbih kami sebagai hadiah yang tersampaikan, rahmat yang turun... kepada ruh wali yang dimakamkan di sini... Ya Tuhan kami, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa api neraka."
                  </p>
                </div>
                )}
              </>
            )}
        </div>
      </motion.div>

    </div>
  );
};

function BookOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
    
  
  );
}
