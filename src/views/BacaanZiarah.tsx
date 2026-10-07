
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
  const [copied, setCopied] = useState(false);

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
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-4 pb-20">

      {/* Modern Notice / Disclaimer */}
      <div className="bg-emerald-50/80 rounded-2xl p-3.5 sm:p-4 mb-6 border border-emerald-200/70 text-xs sm:text-sm text-emerald-950 shadow-xs">
        <p className="leading-relaxed text-center">
          <strong>Adab & Panduan Ziarah:</strong> Bersumber dari tradisi amalan ahlussunnah wal jama'ah. Harap tetap mengutamakan ketertiban dan adab di area maqbarah.
        </p>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 mb-6 flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200/90 shadow-xs gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-gradient-to-tr from-emerald-800 to-teal-700 text-gold-300 rounded-2xl shadow-sm">
            <BookOpenIcon />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight">Panduan Ziarah</h1>
            <p className="text-xs sm:text-sm mt-0.5 text-slate-500">Adab, Tawassul, Yasin, dan Tahlil</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ukuran:</span>
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200/80">
            {['A', 'A+', 'A++'].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  fontSize === size 
                    ? 'bg-white text-emerald-800 shadow-xs font-black' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 mb-6">
        {/* Modern Tasbih Widget */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <span className="font-bold text-xs text-slate-900 tracking-wider uppercase block">Tasbih Digital</span>
              <span className="text-[11px] text-slate-400">Ketuk untuk berdzikir</span>
            </div>
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button onClick={() => { setTasbihMax(33); setTasbihCount(0); }} className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-colors ${tasbihMax === 33 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}>33</button>
              <button onClick={() => { setTasbihMax(100); setTasbihCount(0); }} className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-colors ${tasbihMax === 100 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}>100</button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden p-0.5">
            <motion.div 
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 h-full rounded-full"
              initial={false}
              animate={{ width: `${Math.min(100, Math.round((tasbihCount / tasbihMax) * 100))}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>

          <div className="flex items-center justify-between relative z-10 gap-2.5">
            <motion.button 
              whileTap={{ scale: 0.92, rotate: [-1, 1, 0] }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              onClick={handleTasbihClick}
              className="flex-1 bg-gradient-to-b from-slate-50 to-emerald-50/70 hover:to-emerald-100/70 rounded-2xl py-6 px-3 border border-slate-200/90 text-center cursor-pointer shadow-inner select-none relative overflow-hidden group"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-800 transition-colors block">
                <motion.span 
                  key={tasbihCount}
                  initial={{ scale: 1.3, y: -3 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="inline-block"
                >
                  {tasbihCount}
                </motion.span>
                <span className="text-sm text-slate-400 font-semibold ml-1">/ {tasbihMax}</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider block mt-1">
                {tasbihCount === tasbihMax ? '✨ Selesai 1 Putaran' : `${Math.round((tasbihCount / tasbihMax) * 100)}%`}
              </span>
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.85, rotate: -45 }}
              onClick={() => setTasbihCount(0)} 
              title="Reset" 
              className="p-3.5 bg-white rounded-2xl hover:bg-slate-50 border border-slate-200 transition-colors shadow-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Urutan Controls */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <span className="font-bold text-xs text-slate-900 tracking-wider uppercase block">Tahapan Ziarah</span>
              <span className="text-[11px] text-slate-400">Pilih urutan bacaan yang ingin dilafalkan</span>
            </div>
            <div className="flex items-center space-x-3 bg-slate-50 p-1 rounded-xl border border-slate-200/80">
              <label className="flex items-center cursor-pointer text-xs font-semibold text-slate-700 px-2.5 py-1 rounded-lg hover:bg-white transition-all select-none">
                <input type="checkbox" checked={showLatin} onChange={() => setShowLatin(!showLatin)} className="mr-1.5 accent-emerald-600 rounded cursor-pointer" />
                Latin
              </label>
              <label className="flex items-center cursor-pointer text-xs font-semibold text-slate-700 px-2.5 py-1 rounded-lg hover:bg-white transition-all select-none">
                <input type="checkbox" checked={showTerjemahan} onChange={() => setShowTerjemahan(!showTerjemahan)} className="mr-1.5 accent-emerald-600 rounded cursor-pointer" />
                Terjemahan
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {steps.slice(1).map((step) => (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStep(step.id)}
                className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all text-center border cursor-pointer ${
                  activeStep === step.id 
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs shadow-emerald-950/10' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50/50 hover:text-emerald-800'
                }`}
              >
                {step.stepLabel}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-sm p-6 sm:p-10 border border-slate-200/90"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 mb-8 gap-3">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-[11px] font-bold rounded-xl uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/70">
              {steps.find(s => s.id === activeStep)?.label}
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-black tracking-tight text-slate-900">
              {activeStep === 'SALAM' && 'Salam Masuk Area Makam Waliyullah'}
              {activeStep === 'TAWASSUL' && 'Bacaan Tawassul Khusus Ziarah'}
              {activeStep === 'YASIN' && 'Surah Yasin (Singkat)'}
              {activeStep === 'TAHLIL' && 'Susunan Tahlil Singkat'}
              {activeStep === 'DOA' && 'Doa Penutup Ziarah Kubur'}
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              navigator.clipboard.writeText(`Bacaan ${activeStep} - Ziarah Nusantara`);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center text-xs font-bold px-3.5 py-2 rounded-xl transition-all bg-slate-50 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200/80 shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            {copied ? (
              <span className="text-emerald-700 font-bold">✓ Tersalin!</span>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                <span>Salin Teks</span>
              </>
            )}
          </motion.button>
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
