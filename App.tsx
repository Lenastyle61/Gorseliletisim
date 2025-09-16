
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// =================================================================================
// --- TYPE DEFINITIONS (from types.ts) ---
// =================================================================================

export interface Translation {
    tr: string;
    en: string;
}

export interface Style {
    sacModeli: Translation;
    sacRengi: Translation;
    makyaj: Translation;
    kiyafet: Translation;
    aksesuarlar: string[];
}

export interface Voice {
    tone: Translation;
    pitch: Translation;
    pace: Translation;
    age: Translation;
    clarity: Translation;
}

export interface Character {
    id: string;
    ad: string;
    yas: number;
    anlatim: string;
    sabitPromptEn: string;
    img: string;
    stil: Style;
    voice: Voice;
}

export interface Scene {
    directorNote: string;
    aiSummary: string;
    fullPromptEn: string | null;
    veo3Prompt: string | null;
    corePromptLength?: number;
}

export interface FormState {
    'zaman-dilimi': string;
    'atmosfer': string;
    'mevsim': string;
    'hava-durumu': string;
    'pozisyon-etkilesim': Translation;
    'ortam-arka-plan': Translation;
    'gorsel-stil': string;
    'cekim-olcegi': string;
    'kamera-hareketi': string;
    'sahne-sayisi': number;
}

export interface Preset {
    id: string;
    name: string;
    createdAt: string;
    data: {
        selectedCharacters: Character[];
        formState: FormState;
        selectedAspectRatio: string;
        generatedScenes: Scene[];
    };
}

export interface AppState {
    activeTab: string;
    characterData: Character[];
    selectedCharacters: Character[];
    generatedScenes: Scene[];
    formState: FormState;
    selectedAspectRatio: string;
    presets: Preset[];
    consistencyReport: string | null;
}

export interface InitialAppState {
    activeTab: string;
    characterData: Character[];
    selectedCharacters: Character[];
    generatedScenes: Scene[];
    formState: FormState;
    selectedAspectRatio: string;
    presets: Preset[];
    consistencyReport: string | null;
    data: Omit<AppState, 'presets'>
}

// =================================================================================
// --- CONSTANTS (from constants.ts) ---
// =================================================================================

export const translations = {
    tr: {
        // Tabs
        tabKarakterler: "Karakterler",
        tabOrtam: "Ortam",
        tabStilOdasi: "Stil Odası",
        tabSahneleme: "Sahneleme",
        tabFotofilm: "Fotofilm",
        // General
        kaydet: "Kaydet",
        iptal: "İptal",
        kapat: "Kapat",
        uyari: "Uyarı",
        hata: "Hata",
        basarili: "Başarılı",
        olusturuluyor: "Oluşturuluyor...",
        tamam: "Tamam",
        iptalEt: "İptal Et",
        iptalEdildi: "İptal Edildi",
        iptalEdildiMesaj: "İşlem kullanıcı tarafından iptal edildi.",
        // Characters Tab
        karakterKutuphanesi: "Karakter Kütüphanesi",
        yas: "yaş",
        duzenle: "Düzenle",
        sahnedenCikar: "Sahneden Çıkar",
        sahneyeSec: "Sahneye Seç",
        karakterDuzenle: "Karakteri Düzenle",
        ad: "Ad",
        anlatim: "Anlatım",
        sabitPrompt: "Sabit Prompt (AI için)",
        sesKarakteri: "Ses Karakteri",
        ton: "Ton",
        perde: "Perde (Pitch)",
        hiz: "Hız (Pace)",
        sesYasi: "Ses Yaşı",
        sesNetligi: "Ses Tınısı / Netliği",
        // Environment Tab
        ortamTanimi: "Ortam Tasarımı",
        zamanDilimi: "Zaman Dilimi",
        atmosfer: "Atmosfer",
        mevsim: "Mevsim",
        havaDurumu: "Hava Durumu",
        pozisyonEtkilesim: "Karakter Pozisyonu ve Etkileşim",
        pozisyonEtkilesimPlaceholder: "Örn: Lena ve Kayra şezlonglarda uzanmış, birbirlerine dönük sohbet ediyorlar...",
        ortamArkaPlan: "Ortam ve Arka Plan",
        ortamArkaPlanPlaceholder: "Örn: Kalabalık bir yaz plajı, altın rengi kumlar, denizde yüzen insanlar...",
        aiAnlatimOlusturucu: "AI ile Anlatımları Oluştur",
        zamanDilimiSec: "Zaman Dilimi Seç",
        atmosferSec: "Atmosfer Seç",
        mevsimSec: "Mevsim Seç",
        havaDurumuSec: "Hava Durumu Seç",
        // Style Room Tab
        stilOdasi: "Stil Odası",
        karakterSecUyarisi: "Stilini düzenlemek için önce 'KARAKTERLER' sekmesinden bir karakter seçin.",
        kostumKarti: "Kostüm Kartı",
        sacModeli: "Saç Modeli",
        sacRengi: "Saç Rengi",
        makyaj: "Makyaj",
        kiyafet: "Kıyafet",
        aksesuarlar: "Aksesuarlar",
        aiStilOnerisi: "AI Kıyafet Önerisi Al",
        oneriliyor: "Öneriliyor...",
        // Staging Tab
        sahneleme: "Sahneleme ve Sinematografi",
        gorselVeSinematografi: "Görsel ve Sinematografi Ayarları",
        gorselStil: "Görsel Stil",
        cekimOlcegi: "Çekim Ölçeği",
        kameraHareketi: "Kamera Hareketi",
        cekimOlcegiSec: "Çekim Ölçeği Seç",
        kameraHareketiSec: "Kamera Hareketi Seç",
        enBoyOrani: "En-Boy Oranı (Tüm Sahneler)",
        yapilandirma: "Sahne Yapılandırma",
        istenenSahneSayisi: "İstenen Sahne Sayısı",
        aiSahneleriOlustur: "AI Reji Asistanı ile Sahne Kurgula",
        fotografPromptuOlustur: "Foto Prompt'u Oluştur",
        videoPromptuOlustur: "Video Prompt'u Oluştur",
        tumFotografPromptlariniOlustur: "Tüm Foto Prompt'larını Oluştur",
        tumVideoPromptlariniOlustur: "Tüm Video Prompt'larını Oluştur",
        promptKopyala: "Prompt'u Kopyala",
        kopyalandi: "Kopyalandı!",
        tutarlilikAnalizi: "Tutarlılık Analizi",
        tutarlilikAnaliziRaporu: "Tutarlılık Analizi Raporu",
        analizYap: "Tutarlılık Analizi Yap",
        otomatikDuzelt: "Otomatik Düzelt",
        analizEdiliyor: "Analiz ediliyor...",
        duzeltiliyor: "Düzeltiliyor...",
        corePromptUyarisi: "Çekirdek prompt, karakter tutarlılığı için önerilen 1700 karakter sınırını aşıyor.",
        // Photofilm Tab
        fotofilm: "Fotofilm",
        sahneSec: "Görüntülenecek Sahneyi Seçin",
        seciliSahneyiOlustur: "Seçili Sahneyi Oluştur",
        tumSahneleriOlustur: "Tüm Sahneleri Oluştur",
        tumFotograflariOlustur: "Tüm Fotoğrafları Oluştur",
        tumVideolariOlustur: "Tüm Videoları Oluştur",
        seciliSahneOnizleme: "Selected Scene Preview",
        storyboardGorunumu: "Storyboard Görünümü",
        gorselBekleniyor: "Görsel bekleniyor...",
        slaytGosterimi: "Tüm Sahneler - Slayt Gösterimi",
        otomatikOynat: "Otomatik Oynat",
        duraklat: "Duraklat",
        tekrarOlustur: "Tekrar Oluştur",
        fotografPromptu: "Fotoğraf Prompt'u",
        veo3Promptu: "Veo 3 Prompt'u",
        yonetmenNotu: "Yönetmen Notu",
        // Other UI
        presetYonetimi: "Preset Yönetimi",
        yeniPresetAdi: "Yeni Preset Adı",
        presetAdiPlaceholder: "Örn: Proje X - Sahne 1",
        kayitliPresetler: "Kayıtlı Presetler",
        presetYok: "Kayıtlı preset bulunmuyor.",
        yukle: "Yükle",
        sil: "Sil",
        tumSecimleriSifirla: "Tüm Seçimleri Sıfrla",
        sifirlandiMesaj: "Tüm seçimleriniz başarıyla sıfırlandı.",
        presetler: "Presetler",
        islemDevamEdiyor: "İşlem Devam Ediyor",
        tamamlandi: "tamamlandı",
        sahnePromptuOlusturuluyor: "Sahne {sceneNumber} prompt'ları oluşturuluyor...",
        // Error/Warning Messages
        etkilesimGirUyarisi: "Lütfen bir eylem ve konumlandırma istemi girin.",
        karakterSecimUyarisi: "Lütfen önce en az bir karakter seçin.",
        ortamTanimUyarisi: "Lütfen önce ortam tanımı oluşturun veya manuel olarak girin.",
        promptOlusturmaUyarisi: "Lütfen önce 'Sahne {sceneNumber}' için tam prompt oluşturun.",
        gecerliSahneSecUyarisi: "Geçerli bir sahne seçin.",
        apiMetinHata: "Metin oluşturulurken bir hata oluştu: ",
        apiGorselHata: "Görüntü oluşturulurken bir hata oluştu: ",
        apiGorselBOSDondu: "Görüntü oluşturulamadı. API boş yanıt döndürdü.",
        gecersizFormatHata: "Stil önerisi alınken geçersiz formatta yanıt alındı.",
        presetKayitHata: "Preset kaydedilirken bir hata oluştu.",
    },
    en: {
        // This is kept for data structures that still use en/tr but the UI will be TR only.
    }
};

export const ASPECT_PRESETS = [
    { value: '16:9', label: { tr: 'Yatay', en: 'Horizontal' } as Translation, class: 'aspect-video' },
    { value: '9:16', label: { tr: 'Dikey', en: 'Vertical' } as Translation, class: 'aspect-[9/16]' },
    { value: '1:1', label: { tr: 'Kare', en: 'Square' } as Translation, class: 'aspect-square' },
    { value: '4:3', label: { tr: 'Standart', en: 'Standard' } as Translation, class: 'aspect-[4/3]' },
    { value: '3:4', label: { tr: 'Yüksek', en: 'Tall' } as Translation, class: 'aspect-[3/4]' },
];

export const VISUAL_STYLES = [
    { value: 'Hiper Gerçekçi', label: { tr: 'Hiper Gerçekçi', en: 'Hyper Realistic' }, description: { tr: 'Son derece detaylı ve gerçekçi, 8K çözünürlük.', en: 'Extremely detailed and realistic, 8K resolution.' }, prompt: 'photorealistic, professional photography, 8K UHD, tack-sharp focus, high detail, detailed skin texture, sharp and detailed eyes, realistic lighting, anamorphic lens bokeh, HDR10+, high dynamic range, rich color grading, Dolby Vision look, atmospheric depth' },
    { value: 'Sinematik', label: { tr: 'Sinematik', en: 'Cinematic' }, description: { tr: 'Geniş dinamik aralık, dramatik aydınlatma ve film estetiği.', en: 'Wide dynamic range, dramatic lighting, and film aesthetic.' }, prompt: 'cinematic still, film grain, anamorphic lens flare, rich color grading, dramatic lighting, high dynamic range, atmospheric depth' },
    { value: 'Anime', label: { tr: 'Anime', en: 'Anime' }, description: { tr: 'Canlı, parlak renkler ve stilize, el çizimi sanat eseri.', en: 'Vibrant colors and stylized, hand-drawn artwork.' }, prompt: 'anime style, cel-shading, vibrant colors, clean outlines, dynamic action pose, detailed background art, 2D illustration, manga-inspired shading, Japanese animation aesthetic, hand-drawn textures' },
    { value: 'Pixar Animasyon', label: { tr: 'Pixar Animasyon', en: 'Pixar Animation' }, description: { tr: 'Yumuşak dokular, canlı renkler ve iyimser atmosfer.', en: 'Soft textures, vivid colors, and an upbeat atmosphere.' }, prompt: 'Pixar style, 3D CGI animation, soft textures, stylized lighting, vivid colors, playful mood, exaggerated expressions, subsurface scattering, cartoon rendering, clean smooth shading' },
    { value: 'Ghibli Stili', label: { tr: 'Ghibli Stili', en: 'Ghibli Style' }, description: { tr: 'Suluboya arka planlar ve pastel renk paletleri.', en: 'Watercolor backgrounds and pastel color palettes.' }, prompt: 'Studio Ghibli style, watercolor background, soft pastel palette, whimsical fantasy setting, hand-painted look, natural scenery, magical realism, warm light tones, dreamy atmosphere, Japanese anime fantasy' },
];

export const SHOT_SCALES = [
    { value: 'Ultra Geniş Açı', label: { tr: 'Ultra Geniş Açı', en: 'Extreme Wide Shot' }, shortPrompt: 'Extreme wide shot, establishing the scene with a vast panoramic view.', prompt: 'Extreme wide shot, using a 14mm lens for a vast panoramic perspective, establishing the scene with an epic, sweeping view. The subject appears small, emphasizing the grand scale of the environment. Deep focus ensures clarity from foreground to background, creating an immersive, cinematic feel. Consistent scale and positioning.' },
    { value: 'Geniş Açı', label: { tr: 'Geniş Açı', en: 'Wide Shot' }, shortPrompt: "Wide shot, showing the subject's full body in relation to their surroundings.", prompt: "Wide shot, captured with a 24mm lens, showing the subject's full body in relation to their surroundings. This shot provides balanced environmental context, framed with a natural depth of field for clear, cinematic storytelling. Maintains consistent character proportions and positioning." },
    { value: 'Orta Çekim', label: { tr: 'Orta Çekim', en: 'Medium Shot' }, shortPrompt: 'Medium shot, framing the subject from the waist up.', prompt: "A medium shot taken with a 50 mm lens to mimic the human eye, framing the subject from the waist up. Natural human perspective, cinematic balance, sharp focus on subject movement, 8K resolution, high detail. This creates a perfect, natural, and balanced perspective for capturing interactions and body language with sharp focus." },
    { value: 'Yakın Çekim', label: { tr: 'Yakın Çekim', en: 'Close-up' }, shortPrompt: 'Close-up, framing the head and shoulders.', prompt: "Close-up, shot on an 85mm prime lens, framing the head and shoulders to capture intimate emotions. A shallow depth of field creates beautiful cinematic bokeh, drawing all attention to the subject's expressive facial details and tack-sharp eyes. Consistent facial positioning and lighting." },
    { value: 'Detay Çekim', label: { tr: 'Detay Çekim', en: 'Extreme Close-up' }, shortPrompt: 'Extreme close-up, focusing on a single, tiny detail.', prompt: 'Extreme close-up, using a 100mm macro lens, focusing on a single, tiny detail like an eye or a texture. Hyper-sharp focus and an ultra-shallow depth of field create a dramatic, cinematic highlight on micro-details. Consistent detail focus and quality.' },
    { value: 'Omuz Üstü', label: { tr: 'Omuz Üstü', en: 'Over-the-Shoulder' }, shortPrompt: 'Over-the-shoulder shot.', prompt: "Over-the-shoulder shot, with a 50mm lens, creating a conversational, point-of-view perspective. The foreground shoulder is softly blurred, guiding the viewer's eye to the main subject with natural depth and cinematic composition. Consistent perspective and positioning." },
];

export const CAMERA_MOVEMENTS = {
    tr: ['Sabit', 'Yavaş Kaydırma (Slow Pan)', 'Yavaş Yaklaşma (Slow Dolly In)', 'Yavaş Uzaklaşma (Slow Dolly Out)', 'Takip (Tracking)', 'Yukarı / Aşağı Kaydırma (Tilt)', 'Zoom In / Out'],
    en: ['Static', 'Slow Pan', 'Slow Dolly In', 'Slow Dolly Out', 'Tracking', 'Tilt', 'Zoom In / Out']
};

export const ENVIRONMENT_OPTIONS = {
    'zaman-dilimi': { tr: ['Gündoğumu', 'Öğlen', 'Gün Batımı', 'Gece'], en: ['Sunrise', 'Noon', 'Sunset', 'Night'] },
    'atmosfer': { tr: ['Gizemli', 'Neşeli', 'Gergin', 'Huzurlu'], en: ['Mysterious', 'Cheerful', 'Tense', 'Peaceful'] },
    'mevsim': { tr: ['Yaz', 'Sonbahar', 'Kış', 'İlkbahar'], en: ['Summer', 'Autumn', 'Winter', 'Spring'] },
    'hava-durumu': { tr: ['Güneşli', 'Parçalı Bulutlu', 'Yağmurlu', 'Karlı', 'Fırtınalı'], en: ['Sunny', 'Partly Cloudy', 'Rainy', 'Snowy', 'Stormy'] }
};

export const STYLE_OPTIONS: Record<string, { tr: string[]; en: string[] }> = {
    sacModeli: {
        tr: ["Doğal Dalgalı", "Düz ve Uzun", "Küt Kesim Bob", "Pixie Kesim", "Yüksek At Kuyruğu", "Örgülü Topuz", "Yanlara Ayrılmış Lob", "Kısa ve Düzgün"],
        en: ["Natural Wavy", "Straight and Long", "Blunt Cut Bob", "Pixie Cut", "High Ponytail", "Braided Bun", "Side-Parted Lob", "Short and Neat"]
    },
    sacRengi: {
        tr: ["Espresso Kahve", "Buzlu Platin Sarısı", "Bakır Kızıl", "Gece Siyahı", "Küllü Kumral", "Bal Köpüğü", "Pastel Pembe"],
        en: ["Espresso Brown", "Icy Platinum Blonde", "Copper Red", "Midnight Black", "Ash Brown", "Honey Blonde", "Pastel Pink"]
    },
    makyaj: {
        tr: ["Minimal ve Doğal", "Dumanlı Göz Makyajı", "Kırmızı Ruj ve Eyeliner", "Grafik Eyeliner", "Parlak ve Işıltılı", "Yok"],
        en: ["Minimal and Natural", "Smokey Eye", "Red Lipstick and Eyeliner", "Graphic Eyeliner", "Glossy and Shimmering", "None"]
    }
};

export const ACCESSORY_OPTIONS = {
    tr: ["Yok", "Güneş Gözlüğü", "Kolye", "Bilezik", "Şapka", "Plaj Çantası"],
    en: ["None", "Sunglasses", "Necklace", "Bracelet", "Hat", "Beach Bag"]
};

export const VOICE_TONE_OPTIONS = {
    tr: ["Sıcak", "Net", "Derin", "Hırıltılı", "Yumuşak", "Tınılı"],
    en: ["Warm", "Crisp", "Deep", "Gravelly", "Soft", "Resonant"]
};

export const VOICE_PITCH_OPTIONS = {
    tr: ["Düşük", "Orta", "Yüksek"],
    en: ["Low", "Medium", "High"]
};

export const VOICE_PACE_OPTIONS = {
    tr: ["Yavaş", "Normal", "Hızlı"],
    en: ["Slow", "Normal", "Fast"]
};

export const VOICE_AGE_OPTIONS = {
    tr: ["Genç Yetişkin", "Yetişkin", "Orta Yaş", "Yaşlı"],
    en: ["Young Adult", "Adult", "Middle-Aged", "Elderly"]
};

export const VOICE_CLARITY_OPTIONS = {
    tr: ["Net ve Anlaşılır", "Pürüzlü / Kısık", "Fısıltılı / Nefesli", "Genizden Gelen (Nazal)"],
    en: ["Clear and Articulate", "Raspy / Hoarse", "Breathy / Soft", "Nasal"]
};


export const INITIAL_CHARACTER_DATA: Character[] = [
    {
        id: "lena", ad: "Lena", yas: 22,
        anlatim: "Zarif ve gizemli bir genç kadın modeldir. Oval yüzü, yüksek elmacık kemikleri ve dar çenesi ile simetrik ve dengeli bir görünüme sahiptir. Bakışları sıcak ve gizemli bir hava taşır.",
        sabitPromptEn: "A 22-year-old whose elegance commands attention. She stands tall at 180cm with an athletic hourglass figure. Her flawless porcelain skin contrasts beautifully with her features. She has a perfectly oval face, framed by high cheekbones and a delicate chin. Her olive-green eyes, flecked with gold, hold a hint of captivating mystery, reflecting both confidence and a slightly reserved nature.",
        img: `https://github.com/Lenastyle61/Gorseliletisim/blob/e5b7dce8dee489a9f6204caca25aeb844ebdf42f/lena%20profil%20resmi.png?raw=true`,
        stil: {
            sacModeli: { tr: "Doğal Dalgalı", en: "Natural Wavy" },
            sacRengi: { tr: "Espresso Kahve", en: "Espresso Brown" },
            makyaj: { tr: "Minimal ve Doğal", en: "Minimal and Natural" },
            kiyafet: { tr: "", en: "" },
            aksesuarlar: ["Yok"]
        },
        voice: {
            tone: { tr: "Yumuşak", en: "Soft" },
            pitch: { tr: "Orta", en: "Medium" },
            pace: { tr: "Normal", en: "Normal" },
            age: { tr: "Genç Yetişkin", en: "Young Adult" },
            clarity: { tr: "Net ve Anlaşılır", en: "Clear and Articulate" }
        }
    },
    {
        id: "kayra", ad: "Kayra", yas: 21,
        anlatim: "Enerjik ve eğlenceli bir genç kadın modeldir. Yuvarlak yüz hatları, belirgin yanakları ve hafifçe dolgun dudaklarıyla genç ve neşeli bir görünüm sunar.",
        sabitPromptEn: "A 21-year-old radiating youthful energy. At 175cm, she has a slim, athletic build. Her warm, light-toned skin glows with a natural vibrancy. Her round face, with prominent cheeks and slightly full lips, gives her a perpetually cheerful and fun-loving look. Her most striking feature is her bright blue eyes, which are full of life and excitement.",
        img: `https://github.com/Lenastyle61/Gorseliletisim/blob/e5b7dce8dee489a9f6204caca25aeb844ebdf42f/kayra%20profil%20resmi.png?raw=true`,
        stil: {
            sacModeli: { tr: "Yanlara Ayrılmış Lob", en: "Side-Parted Lob" },
            sacRengi: { tr: "Pastel Pembe", en: "Pastel Pink" },
            makyaj: { tr: "Kırmızı Ruj ve Eyeliner", en: "Red Lipstick and Eyeliner" },
            kiyafet: { tr: "", en: "" },
            aksesuarlar: ["Yok"]
        },
        voice: {
            tone: { tr: "Net", en: "Crisp" },
            pitch: { tr: "Yüksek", en: "High" },
            pace: { tr: "Hızlı", en: "Fast" },
            age: { tr: "Genç Yetişkin", en: "Young Adult" },
            clarity: { tr: "Net ve Anlaşılır", en: "Clear and Articulate" }
        }
    },
    {
        id: "alara", ad: "Alara", yas: 23,
        anlatim: "Sosyetik ve karizmatik bir güzellik. Keskin ve belirgin çene hattına sahip kalp şeklinde bir yüzü var. Kendine güvenen duruşu ve etkileyici bakışlarıyla her ortamda dikkat çeker.",
        sabitPromptEn: "A 23-year-old who possesses a sophisticated and charismatic presence. She is 177cm tall with a slim, elegant figure. Her skin has a sun-kissed golden Mediterranean olive tone. Her heart-shaped face, with a sharply defined jawline, gives her a strikingly beautiful look. Her captivating honey-colored eyes and shoulder-length platinum blonde hair complete her unforgettable appearance.",
        img: `https://github.com/Lenastyle61/Gorseliletisim/blob/e5b7dce8dee489a9f6204caca25aeb844ebdf42f/alara%20profil%20resmi.png?raw=true`,
        stil: {
            sacModeli: { tr: "Küt Kesim Bob", en: "Blunt Cut Bob" },
            sacRengi: { tr: "Buzlu Platin Sarısı", en: "Icy Platinum Blonde" },
            makyaj: { tr: "Dumanlı Göz Makyajı", en: "Smokey Eye" },
            kiyafet: { tr: "", en: "" },
            aksesuarlar: ["Yok"]
        },
        voice: {
            tone: { tr: "Tınılı", en: "Resonant" },
            pitch: { tr: "Orta", en: "Medium" },
            pace: { tr: "Normal", en: "Normal" },
            age: { tr: "Genç Yetişkin", en: "Young Adult" },
            clarity: { tr: "Net ve Anlaşılır", en: "Clear and Articulate" }
        }
    },
    {
        id: "metin", ad: "Metin", yas: 35,
        anlatim: "Esprili ve eğlenceli bir erkek fotoğrafçıdır. Maskülen duruşu, yuvarlak çenesi ve belirgin yüz hatları ile kadın karakterlerden tamamen farklıdır.",
        sabitPromptEn: "A 35-year-old male photographer known for his witty and fun personality. Standing at 185cm, he has a solid, athletic build. His light brown skin suggests a life spent both indoors and out. His friendly brown eyes and short, neat black hair give him the look of a seasoned and approachable professional.",
        img: `https://github.com/Lenastyle61/Gorseliletisim/blob/e5b7dce8dee489a9f6204caca25aeb844ebdf42f/metin%20profil%20resmi.png?raw=true`,
        stil: {
            sacModeli: { tr: "Kısa ve Düzgün", en: "Short and Neat" },
            sacRengi: { tr: "Gece Siyahı", en: "Midnight Black" },
            makyaj: { tr: "Yok", en: "None" },
            kiyafet: { tr: "", en: "" },
            aksesuarlar: ["Yok"]
        },
        voice: {
            tone: { tr: "Derin", en: "Deep" },
            pitch: { tr: "Düşük", en: "Low" },
            pace: { tr: "Normal", en: "Normal" },
            age: { tr: "Yetişkin", en: "Adult" },
            clarity: { tr: "Net ve Anlaşılır", en: "Clear and Articulate" }
        }
    }
];

export const TABS = [
    { id: 'karakterler', labelKey: 'tabKarakterler', icon: 'Users' },
    { id: 'ortam', labelKey: 'tabOrtam', icon: 'Globe' },
    { id: 'stil-odasi', labelKey: 'tabStilOdasi', icon: 'Paintbrush' },
    { id: 'sahneleme', labelKey: 'tabSahneleme', icon: 'Clapperboard' },
    { id: 'fotofilm', labelKey: 'tabFotofilm', icon: 'Film' }
];

export const getNegativePrompts = (visualStyle: string, isVideo = false) => {
    let baseNegatives = 'blur, low resolution, bad anatomy, deformed hands, duplicate faces, duplicate hair, duplicate body type, duplicate outfits, male, androgynous, text, watermark, low quality, ugly, disfigured, extra limbs, missing limbs, mutated hands.';
    if (isVideo) {
        baseNegatives += ' misaligned lips, mis-synced dialogue, unnatural skin tones.';
    }
    if (visualStyle === 'Hiper Gerçekçi' || visualStyle === 'Sinematik') {
        baseNegatives += ' anime, manga, cartoon, illustration, painting, 3D render, CGI, stylized, oversaturated.';
    } else if (['Anime', 'Pixar Animasyon', 'Ghibli Stili'].includes(visualStyle)) {
        baseNegatives += ' photorealistic, realistic photos, natural light, human photography, skin pores, lifelike shadows, real person.';
    }
    return baseNegatives;
};

export const toCamelCase = (str: string) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());


// =================================================================================
// --- ICONS (from components/Icons.tsx) ---
// =================================================================================
type IconProps = { className?: string; };

const UsersIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const GlobeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </svg>
);
const PaintbrushIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </svg>
);
const ClapperboardIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
        <path d="m6.2 5.3 3.1 3.9" />
        <path d="m12.4 3.7 3.1 3.9" />
        <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
);
const FilmIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M17 3v18" />
        <path d="M3 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 7.5h4" />
        <path d="M17 16.5h4" />
    </svg>
);
const ResetIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v6h6" />
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
        <path d="M21 22v-6h-6" />
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
    </svg>
);
const PresetsIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const CopyIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
);
const CheckIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const EditIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </svg>
);
const TrashIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);
const UploadIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
);
const XIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
const IconMap: Record<string, React.FC<IconProps>> = {
    Users: UsersIcon,
    Globe: GlobeIcon,
    Paintbrush: PaintbrushIcon,
    Clapperboard: ClapperboardIcon,
    Film: FilmIcon
};

// =================================================================================
// --- UI COMPONENTS (from components/*.tsx) ---
// =================================================================================

const Loader: React.FC<{ size?: string }> = ({ size = 'h-6 w-6' }) => (
    <div className={`animate-spin rounded-full ${size} border-b-2 border-sky-400`}></div>
);

type AutosizeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const AutosizeTextarea: React.FC<AutosizeTextareaProps> = (props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { value, ...rest } = props;
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            style={{ overflow: 'hidden' }}
            {...rest}
        />
    );
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    maxWidth?: string;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, showCloseButton = true, maxWidth = "max-w-md" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className={`bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-6 sm:p-8 w-full ${maxWidth} text-white shadow-2xl relative transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95`}
                onClick={(e) => e.stopPropagation()}
            >
                {showCloseButton && (
                     <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                )}
                <h3 className="text-2xl font-bold mb-4 pr-8 bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">
                    {title}
                </h3>
                {children}
            </div>
        </div>
    );
};

interface EditCharacterModalProps {
    isOpen: boolean;
    onClose: () => void;
    character: Character;
    onSave: (updatedChar: Omit<Character, 'img' | 'stil'>) => void;
    t: Record<string, string>;
}
const EditCharacterModal: React.FC<EditCharacterModalProps> = ({ isOpen, onClose, character, onSave, t }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const getTranslation = (options: { tr: string[], en: string[] }, valueEn: string) => {
            const index = options.en.indexOf(valueEn);
            return { tr: options.tr[index], en: valueEn };
        };

        const updatedChar = {
            id: String(formData.get('id')),
            ad: String(formData.get('ad')),
            yas: parseInt(String(formData.get('yas')), 10),
            anlatim: String(formData.get('anlatim')),
            sabitPromptEn: character.sabitPromptEn,
            voice: {
                tone: getTranslation(VOICE_TONE_OPTIONS, String(formData.get('voice-tone'))),
                pitch: getTranslation(VOICE_PITCH_OPTIONS, String(formData.get('voice-pitch'))),
                pace: getTranslation(VOICE_PACE_OPTIONS, String(formData.get('voice-pace'))),
                age: getTranslation(VOICE_AGE_OPTIONS, String(formData.get('voice-age'))),
                clarity: getTranslation(VOICE_CLARITY_OPTIONS, String(formData.get('voice-clarity'))),
            }
        };
        onSave(updatedChar);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t.karakterDuzenle} maxWidth="max-w-4xl">
            <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto pr-2">
                <input type="hidden" name="id" defaultValue={character.id} />
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="edit-char-ad" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.ad}</label>
                            <input type="text" id="edit-char-ad" name="ad" defaultValue={character.ad} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="edit-char-yas" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.yas.charAt(0).toUpperCase() + t.yas.slice(1)}</label>
                            <input type="number" id="edit-char-yas" name="yas" defaultValue={character.yas} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300" />
                        </div>
                    </div>
                     <div className="space-y-4 border-t border-b border-slate-700/50 py-6">
                        <h3 className="text-lg font-semibold text-sky-300">{t.sesKarakteri}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="voice-age" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.sesYasi}</label>
                                <select id="voice-age" name="voice-age" defaultValue={character.voice.age.en} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300">
                                    {VOICE_AGE_OPTIONS.en.map((opt, index) => <option key={opt} value={opt}>{VOICE_AGE_OPTIONS.tr[index]}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="voice-clarity" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.sesNetligi}</label>
                                <select id="voice-clarity" name="voice-clarity" defaultValue={character.voice.clarity.en} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300">
                                    {VOICE_CLARITY_OPTIONS.en.map((opt, index) => <option key={opt} value={opt}>{VOICE_CLARITY_OPTIONS.tr[index]}</option>)}
                                </select>
                            </div>
                             <div className="space-y-2">
                                <label htmlFor="voice-pitch" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.perde}</label>
                                <select id="voice-pitch" name="voice-pitch" defaultValue={character.voice.pitch.en} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300">
                                     {VOICE_PITCH_OPTIONS.en.map((opt, index) => <option key={opt} value={opt}>{VOICE_PITCH_OPTIONS.tr[index]}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="voice-tone" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.ton}</label>
                                <select id="voice-tone" name="voice-tone" defaultValue={character.voice.tone.en} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300">
                                    {VOICE_TONE_OPTIONS.en.map((opt, index) => <option key={opt} value={opt}>{VOICE_TONE_OPTIONS.tr[index]}</option>)}
                                </select>
                            </div>
                           
                            <div className="space-y-2">
                                <label htmlFor="voice-pace" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.hiz}</label>
                                <select id="voice-pace" name="voice-pace" defaultValue={character.voice.pace.en} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300">
                                     {VOICE_PACE_OPTIONS.en.map((opt, index) => <option key={opt} value={opt}>{VOICE_PACE_OPTIONS.tr[index]}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="edit-char-anlatim" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.anlatim}</label>
                        <AutosizeTextarea id="edit-char-anlatim" name="anlatim" defaultValue={character.anlatim} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 min-h-[100px] focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300 resize-none" />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={onClose} className="px-8 py-3 bg-slate-700/80 hover:bg-slate-600/80 text-white rounded-xl font-medium transition-all duration-300">{t.iptal}</button>
                    <button type="submit" className="px-8 py-3 bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 text-white rounded-xl font-medium transition-all duration-300">{t.kaydet}</button>
                </div>
            </form>
        </Modal>
    );
};

interface PresetsModalProps {
    isOpen: boolean;
    onClose: () => void;
    presets: Preset[];
    onSave: (name: string) => void;
    onLoad: (id: string) => void;
    onDelete: (id: string) => void;
    t: Record<string, string>;
}
const PresetsModal: React.FC<PresetsModalProps> = ({ isOpen, onClose, presets, onSave, onLoad, onDelete, t }) => {
    const presetNameRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        const name = presetNameRef.current?.value.trim();
        if (name) {
            onSave(name);
            presetNameRef.current!.value = '';
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t.presetYonetimi} maxWidth="max-w-2xl">
            <div className="max-h-[70vh] flex flex-col">
                <div className="mb-6 space-y-4 flex-shrink-0">
                    <input ref={presetNameRef} type="text" placeholder={t.presetAdiPlaceholder} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300" />
                    <button onClick={handleSave} className="w-full bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">{t.kaydet}</button>
                </div>
                <div className="space-y-4 flex-grow overflow-y-auto pr-2">
                    <h3 className="text-xl font-bold text-slate-200">{t.kayitliPresetler}</h3>
                    {presets.length === 0 ? (
                        <p className="text-slate-400 italic text-center py-4">{t.presetYok}</p>
                    ) : (
                        <div className="space-y-3">
                            {presets.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(preset => (
                                <div key={preset.id} className="flex items-center justify-between bg-slate-800/70 rounded-xl p-3 hover:bg-slate-700/70 transition-colors">
                                    <div>
                                        <h4 className="font-medium text-white">{preset.name}</h4>
                                        <p className="text-xs text-slate-400">{new Date(preset.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => onLoad(preset.id)} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"><UploadIcon className="w-4 h-4"/><span>{t.yukle}</span></button>
                                        <button onClick={() => onDelete(preset.id)} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"><TrashIcon className="w-4 h-4"/><span>{t.sil}</span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

interface MainHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onReset: () => void;
    onPresets: () => void;
    t: Record<string, string>;
}
const MainHeader: React.FC<MainHeaderProps> = ({ activeTab, setActiveTab, onReset, onPresets, t }) => {
    return (
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 sm:gap-2 mr-4">
                        {TABS.map(tab => {
                            const Icon = IconMap[tab.icon];
                            return (
                                <button 
                                    key={tab.id} 
                                    onClick={() => setActiveTab(tab.id)} 
                                    className={`flex items-center justify-center py-3 px-2 sm:px-4 rounded-xl font-bold text-sm transition-all duration-300 group ${activeTab === tab.id ? 'bg-gradient-to-r from-sky-500 to-violet-600 text-white shadow-lg shadow-sky-500/25' : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white'}`}
                                >
                                    {Icon && <Icon className={`mr-2 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />}
                                    <span className="hidden sm:inline">{t[tab.labelKey]}</span>
                                </button>
                            )
                        })}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button onClick={onReset} className="bg-slate-800/50 hover:bg-rose-600/80 text-slate-300 hover:text-white p-2.5 rounded-xl transition-all duration-300" title={t.tumSecimleriSifirla}>
                            <ResetIcon className="w-5 h-5" />
                        </button>
                        <button onClick={onPresets} className="bg-slate-800/50 hover:bg-sky-600/80 text-slate-300 hover:text-white p-2.5 rounded-xl transition-all duration-300" title={t.presetler}>
                            <PresetsIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

// =================================================================================
// --- TAB COMPONENTS (from components/tabs/*.tsx) ---
// =================================================================================

interface CharactersTabProps {
    characterData: Character[];
    selectedCharacters: Character[];
    t: Record<string, string>;
    toggleCharacterSelection: (charId: string) => void;
    setEditModal: (modalState: { open: true; char: Character }) => void;
}
const CharactersTab: React.FC<CharactersTabProps> = React.memo(({ characterData, selectedCharacters, t, toggleCharacterSelection, setEditModal }) => (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">{t.karakterKutuphanesi}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {characterData.map(char => {
                const isSelected = selectedCharacters.some(c => c.id === char.id);
                return (
                    <div key={char.id} className={`group relative bg-slate-800/50 rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${isSelected ? 'border-sky-500 shadow-lg shadow-sky-500/20' : 'border-slate-700 hover:border-slate-600'}`}>
                        <div className="relative">
                            <img src={char.img} alt={char.ad} className="w-full aspect-square object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-xl font-bold text-white">{char.ad}</h3>
                                <p className="text-sky-300 text-sm font-medium">{char.yas} {t.yas}</p>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <p className="text-slate-300 text-xs leading-relaxed h-10 line-clamp-3">{char.anlatim}</p>
                            <div className="flex gap-2">
                                <button onClick={() => setEditModal({ open: true, char })} className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-300 text-sm"><EditIcon/> {t.duzenle}</button>
                                <button onClick={() => toggleCharacterSelection(char.id)} className={`flex-1 font-medium py-2.5 px-3 rounded-lg transition-all duration-300 text-sm ${isSelected ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-sky-600 hover:bg-sky-500 text-white'}`}>{isSelected ? t.sahnedenCikar : t.sahneyeSec}</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
));

interface EnvironmentTabProps {
    appState: AppState;
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    t: Record<string, string>;
    isLoading: Record<string, boolean>;
    setIsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    setInfoModal: (info: { open: boolean, title: string, message: string }) => void;
    currentAbortController: React.MutableRefObject<AbortController | null>;
}
const EnvironmentTab: React.FC<EnvironmentTabProps> = React.memo(({ appState, setAppState, t, isLoading, setIsLoading, setInfoModal, currentAbortController }) => {
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setAppState(prev => {
            const newFormState = { ...prev.formState };
            if (id === 'pozisyon-etkilesim' || id === 'ortam-arka-plan') {
                (newFormState[id] as any).tr = value;
            } else {
                (newFormState as any)[id] = value;
            }
            return { ...prev, formState: newFormState };
        });
    }, [setAppState]);

    const handleAiEnvironmentGeneration = useCallback(async () => {
        setIsLoading(prev => ({ ...prev, env: true }));
        currentAbortController.current = new AbortController();
        const signal = currentAbortController.current.signal;

        try {
            const { formState, selectedCharacters } = appState;
            const characterNames = selectedCharacters.map(c => c.ad).join(' ve ');
            
            const selectorsContextParts = [
                formState['zaman-dilimi'] && `${t.zamanDilimi}: ${formState['zaman-dilimi']}`,
                formState.atmosfer && `${t.atmosfer}: ${formState.atmosfer}`,
                formState.mevsim && `${t.mevsim}: ${formState.mevsim}`,
                formState['hava-durumu'] && `${t.havaDurumu}: ${formState['hava-durumu']}`
            ].filter(Boolean);
            const selectorsContext = selectorsContextParts.join(', ');

            const mainIdea = formState['pozisyon-etkilesim'].tr || formState['ortam-arka-plan'].tr || selectorsContext;

            const { positionInteraction, environmentBackground } = await FotofilmDirectorService.generateEnvironmentDescriptions({
                mainIdea,
                characterNames,
                selectorsContext,
                language: 'tr',
                signal
            });

            const posEn = await FotofilmDirectorService.translateText(positionInteraction, 'en', signal);
            const envEn = await FotofilmDirectorService.translateText(environmentBackground, 'en', signal);
            
            setAppState(prev => ({
                ...prev,
                formState: {
                    ...prev.formState,
                    'pozisyon-etkilesim': { tr: positionInteraction, en: posEn },
                    'ortam-arka-plan': { tr: environmentBackground, en: envEn }
                }
            }));
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                 console.error("Error during AI generation:", e);
                 setInfoModal({ open: true, title: t.hata, message: `${t.apiMetinHata}${e.message}` });
            }
        } finally {
            setIsLoading(prev => ({ ...prev, env: false }));
        }
    }, [appState, setIsLoading, setAppState, t, currentAbortController, setInfoModal]);
    
    return (
        <div className="space-y-8 animate-in fade-in-0 duration-500">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">{t.ortamTanimi}</h2>
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {Object.keys(ENVIRONMENT_OPTIONS).map(key => {
                        const id = key as keyof typeof ENVIRONMENT_OPTIONS;
                        return (
                             <div key={id} className="space-y-2">
                                <label htmlFor={id} className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t[toCamelCase(id)]}</label>
                                <div className="relative">
                                    <select id={id} value={appState.formState[id]} onChange={handleInputChange} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white py-3 pl-3 pr-10 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300 appearance-none">
                                        <option value="">{t[`${toCamelCase(id)}Sec`]}</option>
                                        {ENVIRONMENT_OPTIONS[id].tr.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                            <path d="M6 8l4 4 4-4"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                     <div className="space-y-3">
                        <label htmlFor="ortam-arka-plan" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.ortamArkaPlan}</label>
                        <AutosizeTextarea id="ortam-arka-plan" value={appState.formState['ortam-arka-plan'].tr} onChange={handleInputChange} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-4 min-h-[150px] focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300 resize-none" placeholder={t.ortamArkaPlanPlaceholder} />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="pozisyon-etkilesim" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.pozisyonEtkilesim}</label>
                        <AutosizeTextarea id="pozisyon-etkilesim" value={appState.formState['pozisyon-etkilesim'].tr} onChange={handleInputChange} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-4 min-h-[150px] focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all duration-300 resize-none" placeholder={t.pozisyonEtkilesimPlaceholder} />
                    </div>
                </div>
                <button onClick={handleAiEnvironmentGeneration} disabled={isLoading.env} className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.01]">{isLoading.env ? (<div className="flex items-center justify-center gap-3"><Loader /> {t.olusturuluyor}</div>) : t.aiAnlatimOlusturucu}</button>
            </div>
        </div>
    );
});

interface StyleRoomTabProps {
    selectedCharacters: Character[];
    t: Record<string, string>;
    handleStyleChange: (charId: string, prop: string, value: string) => void;
    handleAccessoryChange: (charId: string, accessoryTr: string) => void;
    isLoading: Record<string, boolean>;
    handleAiStyleSuggestion: (charId: string) => void;
}
const StyleRoomTab: React.FC<StyleRoomTabProps> = React.memo(({ selectedCharacters, t, handleStyleChange, handleAccessoryChange, isLoading, handleAiStyleSuggestion }) => {
    return (
        <div className="space-y-8 animate-in fade-in-0 duration-500">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent">{t.stilOdasi}</h2>
            {selectedCharacters.length === 0 ? (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center">
                    <p className="text-slate-400 text-lg">{t.karakterSecUyarisi}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {selectedCharacters.map(char => (
                        <div key={char.id} className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                            <h3 className="text-2xl font-bold text-white mb-8">
                                {char.ad} - <span className="bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent">{t.kostumKarti}</span>
                            </h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Object.keys(STYLE_OPTIONS).map(key => {
                                        const prop = key as keyof typeof STYLE_OPTIONS;
                                        return (
                                             <div key={prop} className="space-y-2">
                                                <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t[prop]}</label>
                                                <div className="relative">
                                                    <select value={char.stil[prop]?.tr ?? ''} onChange={(e) => handleStyleChange(char.id, prop, e.target.value)} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white py-3 pl-3 pr-10 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 transition-all duration-300 appearance-none">
                                                        {STYLE_OPTIONS[prop].tr.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                                            <path d="M6 8l4 4 4-4"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.aksesuarlar}</label>
                                    <div className="flex flex-wrap gap-2">
                                        {ACCESSORY_OPTIONS.tr.map((acc, index) => {
                                            const isSelected = char.stil.aksesuarlar?.includes(acc);
                                            return (<button key={acc} onClick={() => handleAccessoryChange(char.id, acc)} className={`px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium ${isSelected ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-lg' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}>{ACCESSORY_OPTIONS.tr[index]}</button>);
                                        })}
                                    </div>
                                </div>
                                 <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.kiyafet}</label>
                                    <AutosizeTextarea value={char.stil.kiyafet?.tr ?? ''} onChange={(e) => handleStyleChange(char.id, 'kiyafet', e.target.value)} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-4 min-h-[100px] focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 transition-all duration-300 resize-none" />
                                </div>
                                <button onClick={() => handleAiStyleSuggestion(char.id)} disabled={isLoading[`style_${char.id}`]} className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.01]">{isLoading[`style_${char.id}`] ? (<div className="flex items-center justify-center gap-3"><Loader />{t.oneriliyor}</div>) : t.aiStilOnerisi}</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

interface StagingTabProps {
    appState: AppState;
    updateState: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
    t: Record<string, string>;
    isLoading: Record<string, boolean>;
    setIsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    setInfoModal: (info: { open: boolean, title: string, message: string }) => void;
    generatePromptForScene: (index: number, type: 'photo' | 'video') => Promise<void>;
    generateAllPrompts: (type: 'photo' | 'video') => Promise<void>;
    handleAnalyzeConsistency: () => Promise<void>;
    currentAbortController: React.MutableRefObject<AbortController | null>;
}
const StagingTab: React.FC<StagingTabProps> = React.memo(({ appState, updateState, t, isLoading, setIsLoading, setInfoModal, generatePromptForScene, generateAllPrompts, handleAnalyzeConsistency, currentAbortController }) => {
    const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const val = e.target.type === 'number' ? parseInt(value, 10) : value;
        updateState('formState', { ...appState.formState, [id]: val });
    }, [appState.formState, updateState]);
    
    const handleGenerateScenes = useCallback(async () => {
        if (appState.selectedCharacters.length === 0) {
            setInfoModal({ open: true, title: t.uyari, message: t.karakterSecimUyarisi }); return;
        }
        const mainConcept = appState.formState['pozisyon-etkilesim'].tr || appState.formState['ortam-arka-plan'].tr;
        if (!mainConcept) {
            setInfoModal({ open: true, title: t.uyari, message: t.ortamTanimUyarisi }); return;
        }
        setIsLoading(prev => ({...prev, scenes: true}));
        currentAbortController.current = new AbortController();

        try {
            const scenes = await FotofilmDirectorService.breakdownConceptIntoScenes(
                mainConcept, 
                appState.formState['sahne-sayisi'],
                'tr',
                currentAbortController.current.signal
            );
            
            if (scenes) {
                const newScenes = scenes.map(s => ({ ...s, fullPromptEn: null, veo3Prompt: null }));
                updateState('generatedScenes', newScenes);
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                console.error(e);
                setInfoModal({ open: true, title: t.hata, message: `${t.apiMetinHata}${e.message}` });
            }
        } finally {
            setIsLoading(prev => ({...prev, scenes: false}));
        }
    }, [appState, setIsLoading, setInfoModal, t, updateState, currentAbortController]);

    const handleCopyPrompt = useCallback((textToCopy: string, key: string) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyStatus(prev => ({ ...prev, [key]: true }));
            setTimeout(() => setCopyStatus(prev => ({ ...prev, [key]: false })), 1500);
        });
    }, []);

    const handleSceneTextChange = useCallback((index: number, field: 'directorNote' | 'aiSummary' | 'fullPromptEn' | 'veo3Prompt', value: string) => {
        const newScenes = appState.generatedScenes.map((s, i) => {
            if (i === index) {
                const updatedScene: Scene = { ...s, [field]: value };
                // If core text is edited, invalidate generated prompts
                if (field === 'directorNote' || field === 'aiSummary') {
                    updatedScene.fullPromptEn = null;
                    updatedScene.veo3Prompt = null;
                    updatedScene.corePromptLength = undefined;
                }
                 // If a full prompt is edited, invalidate the calculated core length
                if (field === 'fullPromptEn') {
                     updatedScene.corePromptLength = undefined;
                }
                return updatedScene;
            }
            return s;
        });
        updateState('generatedScenes', newScenes);
    }, [appState.generatedScenes, updateState]);


    const selectedVisualStyle = VISUAL_STYLES.find(style => style.value === appState.formState['gorsel-stil']);
    
    return (
        <div className="space-y-8 animate-in fade-in-0 duration-500">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">{t.sahneleme}</h2>
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-100">{t.gorselVeSinematografi}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                        <label htmlFor="gorsel-stil" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.gorselStil}</label>
                        <div className="relative">
                            <select id="gorsel-stil" value={appState.formState['gorsel-stil']} onChange={handleInputChange} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white py-3 pl-3 pr-10 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 appearance-none">
                                {VISUAL_STYLES.map(style => <option key={style.value} value={style.value}>{style.label.tr}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                    <path d="M6 8l4 4 4-4"/>
                                </svg>
                            </div>
                        </div>
                        {selectedVisualStyle && (<p className="text-xs text-slate-400 leading-tight mt-2">{selectedVisualStyle.description.tr}</p>)}
                    </div>
                     <div className="space-y-2">
                        <label htmlFor="cekim-olcegi" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.cekimOlcegi}</label>
                        <div className="relative">
                            <select id="cekim-olcegi" value={appState.formState['cekim-olcegi']} onChange={handleInputChange} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white py-3 pl-3 pr-10 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 appearance-none">
                                <option value="">{t.cekimOlcegiSec}</option>
                                {SHOT_SCALES.map(scale => <option key={scale.value} value={scale.value}>{scale.label.tr}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                    <path d="M6 8l4 4 4-4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="kamera-hareketi" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.kameraHareketi}</label>
                        <div className="relative">
                            <select id="kamera-hareketi" value={appState.formState['kamera-hareketi']} onChange={handleInputChange} className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl text-white py-3 pl-3 pr-10 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 appearance-none">
                                <option value="">{t.kameraHareketiSec}</option>
                                {CAMERA_MOVEMENTS.tr.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                    <path d="M6 8l4 4 4-4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.enBoyOrani}</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {ASPECT_PRESETS.map(preset => (
                            <button key={preset.value} onClick={() => updateState('selectedAspectRatio', preset.value)} className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold text-sm ${appState.selectedAspectRatio === preset.value ? 'bg-amber-500/10 text-amber-300 border-amber-500' : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 hover:border-slate-500'}`}>
                                {preset.label.tr}
                                <div className="text-xs opacity-70 mt-1">{preset.value}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-100">{t.yapilandirma}</h3>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
                    <div className="space-y-2 w-full sm:w-auto">
                        <label htmlFor="sahne-sayisi" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">{t.istenenSahneSayisi}</label>
                        <input type="number" id="sahne-sayisi" value={appState.formState['sahne-sayisi']} onChange={handleInputChange} min="1" max="10" className="bg-slate-900/80 border border-slate-600/50 rounded-xl text-white p-3 w-full sm:w-32 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300" />
                    </div>
                    <button onClick={handleGenerateScenes} disabled={isLoading.scenes} className="w-full sm:w-auto flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]">{isLoading.scenes ? (<div className="flex items-center justify-center gap-3"><Loader /> {t.olusturuluyor}</div>) : t.aiSahneleriOlustur}</button>
                </div>
                {appState.generatedScenes.length > 0 && (
                     <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button onClick={() => generateAllPrompts('photo')} disabled={isLoading.all_prompts_photo} className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.01]">{isLoading.all_prompts_photo ? (<div className="flex items-center justify-center gap-3"><Loader /> {t.olusturuluyor}</div>) : t.tumFotografPromptlariniOlustur}</button>
                        <button onClick={() => generateAllPrompts('video')} disabled={isLoading.all_prompts_video} className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.01]">{isLoading.all_prompts_video ? (<div className="flex items-center justify-center gap-3"><Loader /> {t.olusturuluyor}</div>) : t.tumVideoPromptlariniOlustur}</button>
                        <button onClick={handleAnalyzeConsistency} disabled={isLoading.consistency || appState.generatedScenes.filter(s => s.fullPromptEn).length < 2} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.01]">{isLoading.consistency ? (<div className="flex items-center justify-center gap-3"><Loader /> {t.analizEdiliyor}</div>) : t.analizYap}</button>
                    </div>
                )}
                {appState.generatedScenes.length > 0 && (
                    <div className="space-y-6">
                        {appState.generatedScenes.map((scene, index) => (
                            <div key={index} className="bg-slate-900/60 rounded-xl border border-slate-700 p-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                    <h4 className="text-xl font-bold text-amber-400">Sahne {index + 1}</h4>
                                     <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <button onClick={() => generatePromptForScene(index, 'photo')} disabled={isLoading[`prompt_photo_${index}`] || isLoading.all_prompts_photo} className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 disabled:opacity-50">{isLoading[`prompt_photo_${index}`] ? (<div className="flex items-center justify-center gap-2"><Loader size="h-4 w-4"/>{t.olusturuluyor}</div>) : t.fotografPromptuOlustur}</button>
                                        <button onClick={() => generatePromptForScene(index, 'video')} disabled={isLoading[`prompt_video_${index}`] || isLoading.all_prompts_video} className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 disabled:opacity-50">{isLoading[`prompt_video_${index}`] ? (<div className="flex items-center justify-center gap-2"><Loader size="h-4 w-4"/>{t.olusturuluyor}</div>) : t.videoPromptuOlustur}</button>
                                    </div>
                                </div>
                                <div className="text-slate-300 leading-relaxed mb-4 p-3 bg-slate-800/50 rounded-lg">
                                    <p className="font-bold text-sm text-amber-300 mb-2">Yönetmen Notu:</p>
                                    <AutosizeTextarea
                                        value={scene.directorNote}
                                        onChange={(e) => handleSceneTextChange(index, 'directorNote', e.target.value)}
                                        className="w-full bg-slate-700/60 border border-transparent hover:border-slate-600 focus:border-amber-500 rounded-md text-slate-300 p-2 text-sm italic resize-none focus:ring-1 focus:ring-amber-500 transition-colors"
                                    />
                                </div>
                                <div className="text-slate-300 leading-relaxed mb-4 p-3 bg-slate-800/50 rounded-lg">
                                    <p className="font-bold text-sm text-amber-300 mb-2">Sahne Özeti:</p>
                                    <AutosizeTextarea
                                        value={scene.aiSummary}
                                        onChange={(e) => handleSceneTextChange(index, 'aiSummary', e.target.value)}
                                        className="w-full bg-slate-700/60 border border-transparent hover:border-slate-600 focus:border-amber-500 rounded-md text-slate-300 p-2 text-sm resize-none focus:ring-1 focus:ring-amber-500 transition-colors"
                                    />
                                </div>
                                
                                {scene.fullPromptEn && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <h5 className="text-base font-bold text-amber-400">Fotoğraf Prompt'u</h5>
                                            {scene.corePromptLength && (
                                                <div className={`text-xs font-mono px-2 py-1 rounded ${scene.corePromptLength > 1700 ? 'bg-red-500/20 text-red-400' : 'text-slate-400'}`}>
                                                    Core: {scene.corePromptLength} / 1700
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <AutosizeTextarea value={scene.fullPromptEn} onChange={(e) => handleSceneTextChange(index, 'fullPromptEn', e.target.value)} className="w-full bg-slate-950/80 border border-slate-600/50 rounded-xl text-slate-400 p-4 text-xs min-h-[150px] font-mono resize-none pr-12 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors" />
                                            <button onClick={() => handleCopyPrompt(scene.fullPromptEn!, `photo_${index}`)} className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-all duration-300">{copyStatus[`photo_${index}`] ? <CheckIcon/> : <CopyIcon/>}</button>
                                        </div>
                                         {scene.corePromptLength && scene.corePromptLength > 1700 && (
                                            <p className="text-red-400 text-xs italic mt-1 px-1">{t.corePromptUyarisi}</p>
                                        )}
                                    </div>
                                )}
                                {scene.veo3Prompt && (
                                     <div className="space-y-2 mt-4">
                                        <h5 className="text-base font-bold text-teal-400">Veo3 Video Prompt'u</h5>
                                        <div className="relative">
                                            <AutosizeTextarea value={scene.veo3Prompt} onChange={(e) => handleSceneTextChange(index, 'veo3Prompt', e.target.value)} className="w-full bg-slate-950/80 border border-teal-600/50 rounded-xl text-teal-300 p-4 text-xs min-h-[150px] font-mono resize-none pr-12 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors" />
                                            <button onClick={() => handleCopyPrompt(scene.veo3Prompt!, `veo3_${index}`)} className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-all duration-300">{copyStatus[`veo3_${index}`] ? <CheckIcon/> : <CopyIcon/>}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

interface ImagePreviewProps {
    isLoading: boolean;
    imageUrl?: string;
    aspectRatioClass: string;
    promptType: 'photo' | 'veo';
    sceneIndex: number;
    hasPrompt: boolean;
    onGenerate: () => void;
    onImageClick: (imageUrl: string) => void;
    t: Record<string, string>;
}
const ImagePreview: React.FC<ImagePreviewProps> = ({ isLoading, imageUrl, aspectRatioClass, onImageClick, onGenerate, hasPrompt, t }) => (
    <div className={`w-full bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden relative group ${aspectRatioClass}`}>
        {isLoading ? (
             <div className="w-full h-full bg-slate-700 animate-pulse-fast"></div>
        ) : imageUrl ? (
            <img 
                src={imageUrl} 
                alt={`Scene Preview`} 
                className="w-full h-full object-cover cursor-pointer" 
                onClick={() => onImageClick(imageUrl)}
            />
        ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <p className="text-xs text-slate-500 mb-3">{t.gorselBekleniyor}</p>
                <button 
                    onClick={onGenerate} 
                    disabled={!hasPrompt} 
                    className={`font-semibold py-2 px-4 rounded-lg text-xs transition-all duration-300 shadow-md bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {t.seciliSahneyiOlustur}
                </button>
            </div>
        )}
    </div>
);
interface PhotofilmTabProps {
    t: Record<string, string>;
    generatedScenes: Scene[];
    formState: FormState;
    isLoading: Record<string, boolean>;
    generateImageForScene: (index: number, type: 'photo' | 'veo') => void;
    sceneImages: Record<number, { photo?: string; veo?: string }>;
    setSceneImages: React.Dispatch<React.SetStateAction<Record<number, { photo?: string; veo?: string }>>>;
    selectedAspectRatio: string;
    setProgressModal: React.Dispatch<React.SetStateAction<{ open: boolean, message: string, current: number, total: number }>>;
    setInfoModal: (info: { open: boolean, title: string, message: string }) => void;
    currentAbortController: React.MutableRefObject<AbortController | null>;
    setLightboxImage: (url: string | null) => void;
}
const PhotofilmTab: React.FC<PhotofilmTabProps> = React.memo(({ t, generatedScenes, formState, isLoading, generateImageForScene, sceneImages, setSceneImages, selectedAspectRatio, setProgressModal, setInfoModal, currentAbortController, setLightboxImage }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideshowIntervalRef = useRef<number | null>(null);

    const allSlides = useMemo(() => {
        const slides: { sceneIndex: number; type: 'photo' | 'veo'; imageUrl: string }[] = [];
        Object.entries(sceneImages)
            .sort(([a], [b]) => Number(a) - Number(b))
            .forEach(([sceneIndexStr, images]) => {
                const sceneIndex = Number(sceneIndexStr);
                if (images.photo) {
                    slides.push({ sceneIndex, type: 'photo', imageUrl: images.photo });
                }
                if (images.veo) {
                    slides.push({ sceneIndex, type: 'veo', imageUrl: images.veo });
                }
            });
        return slides;
    }, [sceneImages]);
    
    useEffect(() => {
        if (currentSlide >= allSlides.length && allSlides.length > 0) {
            setCurrentSlide(0);
        }
    }, [allSlides, currentSlide]);

    const handleAllScenesGeneration = useCallback(async (type: 'photo' | 'veo') => {
        const scenesWithoutPrompts = generatedScenes.some(s => (type === 'photo' && !s.fullPromptEn) || (type === 'veo' && !s.veo3Prompt));
        if (scenesWithoutPrompts) {
             setInfoModal({ open: true, title: t.uyari, message: "Lütfen önce ilgili türdeki tüm sahne prompt'larını oluşturun."});
             return;
        }
        
        currentAbortController.current = new AbortController();
        const signal = currentAbortController.current.signal;
        setProgressModal({ open: true, message: t.olusturuluyor, current: 0, total: generatedScenes.length });
        
        const newImages = { ...sceneImages };
        let progress = 0;
        
        for (let i = 0; i < generatedScenes.length; i++) {
            if (signal.aborted) break;
            
            const prompt = type === 'photo' ? generatedScenes[i].fullPromptEn : generatedScenes[i].veo3Prompt;
            const promptTypeName = type === 'photo' ? t.fotografPromptu : t.veo3Promptu;

            setProgressModal(prev => ({ ...prev, message: `Sahne ${i + 1} (${promptTypeName})...`, current: ++progress }));
            try {
                const imageUrl = await FotofilmDirectorService.generateImage(prompt!, selectedAspectRatio, signal);
                if (imageUrl) {
                    if (!newImages[i]) newImages[i] = {};
                    newImages[i][type] = imageUrl;
                }
            } catch (e) {
                if (!signal.aborted) console.error(`Error generating ${type} for Scene ${i + 1}:`, e);
            }
        }
        setSceneImages(newImages);
        setProgressModal({ open: false, message: '', current: 0, total: 0 });
        if (!signal.aborted) {
            setInfoModal({ open: true, title: t.basarili, message: 'Tüm sahneler başarıyla oluşturuldu!' });
        }
    }, [generatedScenes, selectedAspectRatio, t, sceneImages, setSceneImages, setProgressModal, setInfoModal, currentAbortController]);

    const stopSlideshow = useCallback(() => {
        if (slideshowIntervalRef.current) {
            clearInterval(slideshowIntervalRef.current);
            slideshowIntervalRef.current = null;
        }
    }, []);

    const startSlideshow = useCallback(() => {
        stopSlideshow();
        if (allSlides.length > 1) {
            slideshowIntervalRef.current = window.setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % allSlides.length);
            }, 3000);
        }
    }, [stopSlideshow, allSlides]);

    const handleNextSlide = useCallback(() => {
        if (allSlides.length > 0) {
            setCurrentSlide(prev => (prev + 1) % allSlides.length);
        }
    }, [allSlides.length]);

    const handlePrevSlide = useCallback(() => {
         if (allSlides.length > 0) {
            setCurrentSlide(prev => (prev - 1 + allSlides.length) % allSlides.length);
        }
    }, [allSlides.length]);

    useEffect(() => {
        return () => stopSlideshow();
    }, [stopSlideshow]);
    
    const aspectRatioClass = ASPECT_PRESETS.find(p => p.value === selectedAspectRatio)?.class || 'aspect-video';

    return (
        <div className="space-y-8 animate-in fade-in-0 duration-500">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-600 bg-clip-text text-transparent">{t.fotofilm}</h2>
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-slate-100">{t.storyboardGorunumu}</h3>
                    <div className="flex gap-4">
                        <button onClick={() => handleAllScenesGeneration('photo')} className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">{t.tumFotograflariOlustur}</button>
                        <button onClick={() => handleAllScenesGeneration('veo')} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">{t.tumVideolariOlustur}</button>
                    </div>
                </div>
                 <div className="grid grid-cols-1 gap-6">
                    {generatedScenes.map((scene, index) => {
                        const mainCameraInstruction = scene.directorNote.toLowerCase();
                        const foundScale = SHOT_SCALES.find(s => mainCameraInstruction.includes(s.value.toLowerCase()));
                        const cameraScaleDisplay = foundScale ? foundScale.label.tr : (formState['cekim-olcegi'] || 'Belirtilmemiş');
                        const foundMovement = CAMERA_MOVEMENTS.tr.find(m => mainCameraInstruction.includes(m.toLowerCase()));
                        const cameraMovementDisplay = foundMovement || formState['kamera-hareketi'] || 'Belirtilmemiş';

                        return (
                            <div key={index} className="border border-slate-700/50 rounded-xl p-4 bg-slate-900/50">
                                <h4 className="font-bold text-lg mb-4 text-slate-300 text-center">Sahne {index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <h5 className="font-semibold text-center text-amber-400">{t.fotografPromptu}</h5>
                                         <div className="relative group">
                                            <ImagePreview 
                                                isLoading={isLoading[`image_photo_${index}`]}
                                                imageUrl={sceneImages[index]?.photo}
                                                aspectRatioClass={aspectRatioClass}
                                                promptType="photo"
                                                sceneIndex={index}
                                                hasPrompt={!!scene.fullPromptEn}
                                                onGenerate={() => generateImageForScene(index, 'photo')}
                                                onImageClick={setLightboxImage}
                                                t={t}
                                            />
                                            {sceneImages[index]?.photo && !isLoading[`image_photo_${index}`] && (
                                                <button onClick={() => generateImageForScene(index, 'photo')} title={t.tekrarOlustur} className="absolute bottom-2 right-2 bg-slate-900/60 hover:bg-slate-800/80 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                    <ResetIcon className="w-5 h-5"/>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                         <h5 className="font-semibold text-center text-teal-400">{t.veo3Promptu}</h5>
                                        <div className="relative group">
                                            <ImagePreview 
                                                isLoading={isLoading[`image_veo_${index}`]}
                                                imageUrl={sceneImages[index]?.veo}
                                                aspectRatioClass={aspectRatioClass}
                                                promptType="veo"
                                                sceneIndex={index}
                                                hasPrompt={!!scene.veo3Prompt}
                                                onGenerate={() => generateImageForScene(index, 'veo')}
                                                onImageClick={setLightboxImage}
                                                t={t}
                                            />
                                            {sceneImages[index]?.veo && !isLoading[`image_veo_${index}`] && (
                                                <button onClick={() => generateImageForScene(index, 'veo')} title={t.tekrarOlustur} className="absolute bottom-2 right-2 bg-slate-900/60 hover:bg-slate-800/80 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                    <ResetIcon className="w-5 h-5"/>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 p-3 bg-slate-800/50 rounded-md space-y-2">
                                    <p className="font-semibold text-amber-300 text-xs">{t.yonetmenNotu}: <span className="font-normal text-slate-300 italic">{scene.directorNote}</span></p>
                                    <div className="border-t border-slate-700/50"></div>
                                    <p className="text-slate-400 text-xs leading-relaxed whitespace-pre-wrap pt-1">{scene.aiSummary}</p>
                                    <div className="border-t border-slate-700/50 pt-2 mt-2 flex justify-around text-xs">
                                        <p><span className="font-semibold text-slate-300">{t.cekimOlcegi}:</span> <span className="text-slate-400">{cameraScaleDisplay}</span></p>
                                        <p><span className="font-semibold text-slate-300">{t.kameraHareketi}:</span> <span className="text-slate-400">{cameraMovementDisplay}</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {allSlides.length > 0 && (
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
                    <h3 className="text-2xl font-bold text-slate-100 mb-6">{t.slaytGosterimi}</h3>
                    <div className={`relative w-full mx-auto ${aspectRatioClass} bg-black/50 rounded-xl overflow-hidden border border-slate-600/30 mb-6 flex items-center justify-center group`}>
                        {allSlides.length > 1 && (
                            <button onClick={handlePrevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label="Previous Slide">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                        )}
                        <img src={allSlides[currentSlide].imageUrl} alt={`Sahne ${allSlides[currentSlide].sceneIndex + 1} - ${allSlides[currentSlide].type}`} className="w-full h-full object-contain" />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-black/50 rounded-full text-white text-xs">
                            {t.sahneleme.split(' ')[0]} {allSlides[currentSlide].sceneIndex + 1} ({allSlides[currentSlide].type === 'photo' ? t.fotografPromptu : t.veo3Promptu})
                        </div>
                         {allSlides.length > 1 && (
                            <button onClick={handleNextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label="Next Slide">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        )}
                    </div>
                    <div className="flex justify-center gap-2 mb-6">
                        {allSlides.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-gradient-to-r from-sky-500 to-violet-600 shadow-lg' : 'bg-slate-600 hover:bg-slate-500'}`} />))}
                    </div>
                    <div className="flex justify-center gap-4">
                        <button onClick={startSlideshow} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">{t.otomatikOynat}</button>
                        <button onClick={stopSlideshow} className="bg-rose-600 hover:bg-rose-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">{t.duraklat}</button>
                    </div>
                </div>
            )}
        </div>
    );
});


// =================================================================================
// --- CUSTOM HOOKS (from hooks/useDebouncedPersistentState.ts) ---
// =================================================================================

function useDebouncedPersistentState<T,>(key: string, initialValue: T, delay = 500) {
  const [state, setState] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, state, delay]);

  return [state, setState] as const;
}

// =================================================================
// AI FOTOFILM DIRECTOR - PRODUCTION AI SERVICE LAYER
// =================================================================
const API_KEY = process.env.API_KEY || "";

// --- Bölüm 1: Temel Google AI Servisi (Low-Level API Interface) ---
const GoogleAIService = {
    async callGemini(model: string, prompt: string, generationConfig: any = {}, signal?: AbortSignal) {
        if (!API_KEY) {
            throw new Error("Google AI API anahtarı ayarlanmamış.");
        }
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Hatası: ${response.status}`);
        }
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    },

    async callImagen(prompt: string, aspectRatio: string, signal?: AbortSignal) {
        if (!API_KEY) {
            throw new Error("Google AI API anahtarı ayarlanmamış.");
        }
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${API_KEY}`;
        const payload = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio } };
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal,
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage;
            try { errorMessage = JSON.parse(errorText).error?.message || errorText; } 
            catch { errorMessage = errorText || `API Hatası: ${response.status}`; }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        if (data.predictions?.[0]?.bytesBase64Encoded) {
            return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
        } else {
            throw new Error("API geçerli bir görsel verisi döndürmedi.");
        }
    }
};

// --- Bölüm 2: AI Fotofilm Director Servisi (Uygulama Mantığı ve Üretim Modelleri) ---
const FotofilmDirectorService = {
    async generateEnvironmentDescriptions({ mainIdea, characterNames, selectorsContext, language, signal }: { mainIdea: string, characterNames: string, selectorsContext: string, language: 'tr' | 'en', signal?: AbortSignal }) {
        const prompts = {
            tr: {
                pos: `Bir yönetmen gibi davran. Sağlanan "Ana Fikir"den ilham alarak, karakterlerin ("${characterNames}") vücut dillerini, duruşlarını ve eylemlerini betimle. En fazla 3 cümle ve 40 kelime olacak şekilde, somut ve tek bir paragraf yaz. Soyut ifadelerden kaçın.\n- Ana Fikir: ${mainIdea}`,
                env: `Bir mekan sorumlusu gibi davran. Sağlanan "Ana Fikir" ve diğer unsurları kullanarak, mekanın FİZİKSEL DETAYLARINI ve ARKA PLANINI betimle. En fazla 3 cümle ve 50 kelime olacak şekilde, tek ve kısa bir paragraf yaz. Soyut ifadelerden kaçın.\n- Ana Fikir: ${mainIdea}\n- Diğer Unsurlar: ${selectorsContext}`
            },
            en: {
                pos: `Act as a director. Inspired by the "Main Idea" provided, describe the body language, posture, and actions of the characters ("${characterNames}"). Write a single, concrete paragraph of no more than 3 sentences and 40 words. Avoid abstract expressions.\n- Main Idea: ${mainIdea}`,
                env: `Act as a location scout. Using the "Main Idea" and other elements, describe the PHYSICAL DETAILS of the environment and background. Write a single, short paragraph of no more than 3 sentences and 50 words. Avoid abstract feelings.\n- Main Idea: ${mainIdea}\n- Other Elements: ${selectorsContext}`
            }
        };

        const [positionInteraction, environmentBackground] = await Promise.all([
            GoogleAIService.callGemini('gemini-2.5-flash', prompts[language].pos, {}, signal),
            GoogleAIService.callGemini('gemini-2.5-flash', prompts[language].env, {}, signal)
        ]);
        
        return { positionInteraction, environmentBackground };
    },

    async suggestOutfit({ environment, interaction, userRequest, language, signal }: { environment: string, interaction: string, userRequest: string, language: 'tr' | 'en', signal?: AbortSignal }) {
        const prompts = {
            tr: `Bir moda stilisti gibi davran. Sağlanan bilgilere dayanarak karakter için mantıklı ve somut bir kıyafet önerisi oluştur.\nKURALLAR:\n1. Baştan aşağı komple bir kıyafet (üst, alt, ayakkabı) öner. Eksik parça BIRAKMA.\n2. Mümkün olduğunca Nike, Adidas, Zara, Levi's gibi bilinen, gerçek markaların spesifik ürün modellerini kullan. Örn: 'Nike Pro Dri-FIT kısa kollu siyah tişört, Levi's 501 açık mavi kot pantolon ve Adidas Ultraboost 22 siyah koşu ayakkabıları.'\n3. KESİNLİKLE genel tanımlar ('rahat şort' gibi) kullanma. Spesifik marka ve model bilgisi ver.\n4. Cevabın SADECE kıyafet tanımını içeren TEK BİR METİN dizesi olmalıdır.\nBAĞLAM:\n- Ortam: ${environment}\n- Etkileşim: ${interaction}\n- Kullanıcının Kıyafet İsteği: ${userRequest}`,
            en: `Act as a fashion stylist. Create a logical and concrete outfit suggestion for the character based on the provided information.\nRULES:\n1. Suggest a complete head-to-toe outfit (top, bottom, footwear). DO NOT leave any pieces missing.\n2. Use specific product models from well-known, real-world brands like Nike, Adidas, Zara, Levi's whenever possible. E.g., 'Nike Pro Dri-FIT short-sleeve black t-shirt, Levi's 501 light blue jeans, and Adidas Ultraboost 22 black running shoes.'\n3. Absolutely DO NOT use generic descriptions (like 'comfortable shorts'). Provide specific brand and model details.\n4. Your response must be a SINGLE STRING containing only the outfit description.\nCONTEXT:\n- Environment: ${environment}\n- Interaction: ${interaction}\n- User's Outfit Request: ${userRequest}`
        };

        const generationConfig = {
            responseMimeType: 'application/json',
            responseSchema: { type: 'OBJECT', properties: { outfit: { type: 'STRING' } } }
        };
        const rawResult = await GoogleAIService.callGemini('gemini-2.5-flash', prompts[language], generationConfig, signal);
        const resultJson = JSON.parse(rawResult);
        return resultJson.outfit;
    },
    
    async breakdownConceptIntoScenes(mainConcept: string, sceneCount: number, language: 'tr' | 'en', signal?: AbortSignal): Promise<Array<{directorNote: string, aiSummary: string}>> {
        const prompts = {
            en: `Act as a director and strictly follow these rules:\n1. Do not add any comments or introductory sentences.\n2. Divide the "General Concept" below into exactly ${sceneCount} logical, sequential scenes.\n3. Start each scene with 'Scene X:'.\n4. Begin each scene's content with a director's note specifying the most appropriate camera scale and movement for that scene. E.g., 'static wide shot'. Use the provided guide.\n5. After the director's note, write a short, cinematic, and concrete paragraph describing the characters' actions and positions.\n6. Do not use abstract or literary language.\nCAMERA GUIDE: For wide shots, use 'static wide shot'. For medium/close-up shots, use 'medium shot, static' or 'close-up, static'. If movement is needed, choose slow movements like 'slow dolly in'.\n\n**General Concept:**\n${mainConcept}`,
            tr: `Bir yönetmen gibi davran ve aşağıdaki kurallara harfiyen uy:\n1. Yorum veya giriş cümlesi ekleme.\n2. Aşağıdaki "Genel Konsept"i tam olarak ${sceneCount} adet mantıksal ve sıralı sahneye böl.\n3. Her sahneye 'Sahne X:' ile başla.\n4. Her sahnenin içeriğine, o sahne için en uygun kamera ölçeğini ve hareketini belirten bir yönetmen notuyla başla. Örn: 'sabit geniş açı'. Sağlanan rehberi kullan.\n5. Yönetmen notundan sonra, karakterlerin eylemlerini ve pozisyonlarını anlatan kısa, sinematik ve somut bir paragraf yaz.\n6. Soyut veya edebi bir dil kullanma.\nKAMERA REHBERİ: Geniş açılar için 'sabit geniş açı' kullan. Orta/yakın plan çekimler için 'orta çekim, sabit' veya 'yakın çekim, sabit' kullan. Hareket gerekiyorsa 'yavaş dolly in' gibi yavaş hareketleri seç.\n\n**Genel Konsept:**\n${mainConcept}`
        };
        
        const result = await GoogleAIService.callGemini('gemini-2.5-flash', prompts[language], {}, signal);
        
        return result.split(/Scene \d+:|Sahne \d+:/i).filter(s => s.trim()).map(s => {
            const content = s.trim();
            const firstLineEnd = content.indexOf('\n');
            const directorNote = firstLineEnd !== -1 ? content.substring(0, firstLineEnd).trim() : 'sabit orta çekim';
            const aiSummary = firstLineEnd !== -1 ? content.substring(firstLineEnd + 1).trim() : content;
            return { directorNote, aiSummary };
        });
    },

    async generateDialogue(sceneSummary: string, characterVoiceTags: string, signal?: AbortSignal) {
        const prompt = `Aşağıdaki sahne eylemlerine ve karakterlerin ses etiketlerine dayanarak, 3-4 satırlık kısa, doğal TÜRKÇE diyaloglar oluştur.\n- Eylemler:\n${sceneSummary}\n- Karakterler ve Ses Etiketleri:\n${characterVoiceTags}\n- Kurallar:\n1. Diyaloglar doğrudan eylemlerle ilgili olmalıdır.\n2. Her satırı KESİNLİKLE şu formatta yaz: [Karakter Adı] (SES_ETİKETİ): "Diyalog metni."\n   Örnek: [Lena] (VOICE_A): "Bunu yapabileceğimize eminim."\n3. Ekstra metin, açıklama veya formatlama EKLEME. SADECE diyalog satırlarıyla yanıt ver.`;

        return GoogleAIService.callGemini('gemini-2.5-flash', prompt, {}, signal);
    },

    async analyzeSceneConsistency(promptsText: string, language: 'tr' | 'en', signal?: AbortSignal) {
        const prompts = {
            en: `You are an expert film continuity supervisor. Analyze the following scene prompts for a photorealistic project. Your goal is to ensure absolute consistency for key elements across all scenes.\nKey elements to check:\n1. Character Appearance: Body type, skin tone, hair color/style, eye color, and unique features for each character MUST remain identical.\n2. Character Outfit: Outfits and accessories for each character MUST be consistent. IMPORTANT EXCEPTION: It is not an inconsistency if footwear information is missing for shot scales where the character's feet would not be visible (e.g., 'Medium Shot', 'Close-up').\n3. Environment: The location's core features must be consistent.\n4. Story Flow: The sequence of actions should be logical.\n\nProvide your report in markdown format. Start with a brief overall summary. Then, list each inconsistency you find, specifying the scene number and the exact issue. If there are no issues, state that 'All scenes are consistent.'\n\nSCENE PROMPTS:\n${promptsText}`,
            tr: `Sen uzman bir film devamlılık sorumlususun. Fotogerçekçi bir proje için aşağıdaki sahne prompt'larını analiz et. Amacın, tüm sahnelerde kilit unsurlar için mutlak tutarlılığı sağlamaktır.\nKontrol edilecek kilit unsurlar:\n1. Karakter Görünümü: Her karakter için vücut tipi, ten rengi, saç rengi/stili, göz rengi ve benzersiz özellikler TAMAMEN aynı kalmalıdır.\n2. Karakter Kıyafeti: Her karakterin kıyafetleri ve aksesuarları tutarlı OLMALIDIR. ÖNEMLİ İSTİSNA: Karakterin ayaklarının görünmeyeceği çekim ölçeklerinde (örn. 'Orta Çekim', 'Yakın Çekim') ayakkabı bilgisinin eksik olması bir tutarsızlık değildir.\n3. Ortam: Mekanın temel özellikleri tutarlı olmalıdır.\n4. Hikaye Akışı: Eylemlerin sırası mantıklı olmalıdır.\n\nRaporunu markdown formatında sun. Kısa bir genel özetle başla. Ardından, bulduğun her tutarsızlığı sahne numarasını ve tam sorunu belirterek listele. Hiçbir sorun yoksa, 'Tüm sahneler tutarlı.' diye belirt.\n\nSAHNE PROMPTLARI:\n${promptsText}`
        };
        return GoogleAIService.callGemini('gemini-2.5-flash', prompts[language], {}, signal);
    },

    async fixInconsistencies(originalScenes: Scene[], report: string, signal?: AbortSignal) {
        const prompt = `You are an expert script doctor and prompt engineer. You will be given a series of scene prompts and a consistency analysis report that identifies errors.\nYour task is to rewrite the 'fullPromptEn' and 'veo3Prompt' for each scene to resolve all the inconsistencies listed in the report.\nRULES:\n1. Preserve the original intent, action, and camera direction of each scene.\n2. Only change the parts of the prompt necessary to fix the reported inconsistencies.\n3. CRITICAL RULE: You MUST preserve the exact original formatting of the 'fullPromptEn' and 'veo3Prompt' strings, including all headers like '[Camera]', line breaks, etc. Only change the text content *within* the existing structure.\n4. Return the corrected data as a JSON array of the complete scene objects.\n5. YOUR RESPONSE MUST BE ONLY THE JSON ARRAY. Do not add comments, explanations, or markdown formatting.\n\nORIGINAL SCENES:\n${JSON.stringify(originalScenes, null, 2)}\n\nINCONSISTENCY REPORT:\n${report}`;

        const generationConfig = { responseMimeType: 'application/json' };
        const rawResult = await GoogleAIService.callGemini('gemini-2.5-flash', prompt, generationConfig, signal);
        return JSON.parse(rawResult);
    },

    async translateText(text: string, targetLang: 'tr' | 'en', signal?: AbortSignal) {
        if (!text?.trim()) return text;
        const sourceLang = targetLang === 'en' ? 'Turkish' : 'English';
        const targetLangFullName = targetLang === 'en' ? 'English' : 'Turkish';
        const prompt = `Translate the following text from ${sourceLang} to ${targetLangFullName}. Respond ONLY with the translated text, without any additional comments, labels, or formatting.\nText to translate:\n"""\n${text}\n"""`;
        return GoogleAIService.callGemini('gemini-2.5-flash', prompt, {}, signal);
    },

    async generateImage(prompt: string, aspectRatio: string, signal?: AbortSignal) {
        return GoogleAIService.callImagen(prompt, aspectRatio, signal);
    }
};

// =================================================================================
// --- INITIAL STATE (from state.ts) ---
// =================================================================================
export const INITIAL_APP_STATE: InitialAppState = {
    activeTab: 'karakterler',
    characterData: JSON.parse(JSON.stringify(INITIAL_CHARACTER_DATA)),
    selectedCharacters: [],
    generatedScenes: [],
    formState: {
        'zaman-dilimi': '',
        'atmosfer': '',
        'mevsim': '',
        'hava-durumu': '',
        'pozisyon-etkilesim': { tr: '', en: '' },
        'ortam-arka-plan': { tr: '', en: '' },
        'gorsel-stil': 'Hiper Gerçekçi',
        'cekim-olcegi': '',
        'kamera-hareketi': '',
        'sahne-sayisi': 3,
    },
    selectedAspectRatio: '16:9',
    presets: [],
    consistencyReport: null,
    get data() {
        return {
            activeTab: this.activeTab,
            characterData: this.characterData,
            selectedCharacters: this.selectedCharacters,
            generatedScenes: this.generatedScenes,
            formState: this.formState,
            selectedAspectRatio: this.selectedAspectRatio,
            consistencyReport: this.consistencyReport,
        }
    }
};

// =================================================================================
// --- PROMPT BUILDER HELPERS ---
// =================================================================================

const promptBuilder = {
    getCharacterBlock(character: Character, cameraScaleValue: string): string {
        const fixedPart = `[${character.ad}]: ${character.sabitPromptEn}`;
        const accessoriesEnList = character.stil.aksesuarlar
            .filter(acc => acc !== 'Yok' && acc)
            .map(accTr => {
                const accEn = ACCESSORY_OPTIONS.en[ACCESSORY_OPTIONS.tr.indexOf(accTr)];
                if (accEn === 'Sunglasses') return 'wearing sunglasses on her face';
                if (['Necklace', 'Bracelet', 'Hat'].includes(accEn)) return `wearing a ${accEn.toLowerCase()}`;
                return accEn;
            });
        let outfitEn = character.stil.kiyafet.en;
        const shotsThatHideFeet = ['Orta Çekim', 'Yakın Çekim', 'Detay Çekim'];
        if (shotsThatHideFeet.includes(cameraScaleValue)) {
            const footwearRegex = /,?\s+(with|wearing|and)\s*.*(shoes|flip-flops|sandals|boots)|,?\s*barefoot\.?$/i;
            outfitEn = outfitEn.replace(footwearRegex, '');
        }
        const variableParts = [
            `- Outfit: ${outfitEn}`,
            `- Hair: ${character.stil.sacModeli.en} ${character.stil.sacRengi.en}`,
            `- Makeup: ${character.stil.makyaj.en}`,
        ];
        if (accessoriesEnList.length > 0) {
            variableParts.push(`- Accessories: ${accessoriesEnList.join(', ')}`);
        }
        return `${fixedPart}\n${variableParts.join('\n')}`;
    },

    getQualityBlock(visualStylePrompt: string, characters: Character[]): string {
        const characterNames = characters.map(c => c.ad).join(', ');
        const qualityNote = `\nImportant Quality Note: Despite the shot scale, the primary subjects (${characterNames}) and their facial features, especially their eyes, must be rendered with high detail and clarity.`;
        return `${visualStylePrompt}${qualityNote}`;
    },

    async generateVeo3Prompt(
        { sceneSummary, characters, cameraScaleValue, formState, mainCameraInstruction, visualStyleInfo, selectedAspectRatio }: any,
        signal: AbortSignal
    ): Promise<string> {
        const getVoiceDescriptionEn = (voice: Character['voice']) => {
           return `${voice.age.en.toLowerCase()}, ${voice.clarity.en.toLowerCase()}, ${voice.pitch.en.toLowerCase()} pitch, ${voice.tone.en.toLowerCase()} tone, ${voice.pace.en.toLowerCase()} pace`;
        };
        const voiceCastingBlock = `[Voice Casting]\n` + characters.map((c: Character, index: number) => 
            `[${c.ad}] (VOICE_${String.fromCharCode(65 + index)}): ${getVoiceDescriptionEn(c.voice)}.`
        ).join('\n');
        const characterVoiceTags = characters.map((c: Character, index: number) => 
            `- ${c.ad} (VOICE_${String.fromCharCode(65 + index)})`
        ).join('\n');
        
        const [dialogueBlock, sceneSummaryEn, environmentBlockEn] = await Promise.all([
            FotofilmDirectorService.generateDialogue(sceneSummary, characterVoiceTags, signal),
            FotofilmDirectorService.translateText(sceneSummary, 'en', signal),
            formState['ortam-arka-plan'].en || FotofilmDirectorService.translateText(formState['ortam-arka-plan'].tr, 'en', signal)
        ]);
        
        const characterDefinitionsBlock = characters.map((c: Character) => this.getCharacterBlock(c, cameraScaleValue)).join('\n');
        const cameraShortPrompt = SHOT_SCALES.find((s: any) => s.value === cameraScaleValue)?.shortPrompt || '';
        const coreBlock = `${cameraShortPrompt}\n${sceneSummaryEn}\n${characterDefinitionsBlock}`;
        const cameraMovementValue = CAMERA_MOVEMENTS.en.find((m: any) => mainCameraInstruction.toLowerCase().includes(m.toLowerCase())) || formState['kamera-hareketi'];
        const cameraInfo = cameraScaleValue ? SHOT_SCALES.find((s: any) => s.value === cameraScaleValue)?.prompt || '' : '';
        const cameraMovementInfo = cameraMovementValue ? `${cameraMovementValue} camera movement` : '';

        return [
            coreBlock,
            environmentBlockEn,
            voiceCastingBlock,
            `[Camera]\n${cameraInfo}, ${cameraMovementInfo}.`,
            `[Visual Style / Quality]\n${this.getQualityBlock(visualStyleInfo.prompt, characters)}`,
            dialogueBlock ? `[Dialogue]\n${dialogueBlock}` : null,
            `[Negative Prompts]\n${getNegativePrompts(formState['gorsel-stil'], true)}`,
            `[Technical Specs]\nAspect Ratio: ${selectedAspectRatio}\nDuration: 8 seconds\nFPS: 24`
        ].filter(Boolean).join('\n');
    },

    async generatePromptsForScene(
        { scene, charactersToUse, formState, selectedAspectRatio }: { scene: Scene, charactersToUse: Character[], formState: FormState, selectedAspectRatio: string },
        type: 'photo' | 'video' | 'both',
        signal: AbortSignal
    ): Promise<Partial<Scene>> {
        const visualStyleInfo = VISUAL_STYLES.find(s => s.value === formState['gorsel-stil'])!;
        const mainCameraInstruction = scene.directorNote;
        const cameraScaleValue = SHOT_SCALES.find(s => mainCameraInstruction.toLowerCase().includes(s.label.en.toLowerCase().split(',')[0].replace(' shot', '')) || mainCameraInstruction.toLowerCase().includes(s.value.toLowerCase()))?.value || formState['cekim-olcegi'];
        const cameraMovementValue = CAMERA_MOVEMENTS.en.find(m => mainCameraInstruction.toLowerCase().includes(m.toLowerCase())) || formState['kamera-hareketi'];

        const result: Partial<Scene> = {};
        
        if (type === 'photo' || type === 'both') {
            const [actionBlockEn, environmentBlockEn] = await Promise.all([
                FotofilmDirectorService.translateText(scene.aiSummary, 'en', signal),
                formState['ortam-arka-plan'].en || FotofilmDirectorService.translateText(formState['ortam-arka-plan'].tr, 'en', signal)
            ]);

            const characterDefinitionsBlock = charactersToUse.map(c => this.getCharacterBlock(c, cameraScaleValue)).join('\n');
            const cameraShortPrompt = SHOT_SCALES.find(s => s.value === cameraScaleValue)?.shortPrompt || '';
            const coreBlock = `${cameraShortPrompt}\n${actionBlockEn}\n${characterDefinitionsBlock}`;
            result.corePromptLength = coreBlock.length;
            
            const cameraInfo = cameraScaleValue ? SHOT_SCALES.find(s => s.value === cameraScaleValue)?.prompt || '' : '';
            const cameraMovementInfo = cameraMovementValue ? `${cameraMovementValue} camera movement` : '';
                
            const technicalDetailsBlock = [
                `[Camera]\n${cameraInfo}, ${cameraMovementInfo}`,
                `[Visual Style / Quality]\n${this.getQualityBlock(visualStyleInfo.prompt, charactersToUse)}`,
                `[Negative Prompts]\n${getNegativePrompts(formState['gorsel-stil'], false)}`,
                `[Technical Specs]\nAspect Ratio: ${selectedAspectRatio}`
            ].join('\n');
            
            result.fullPromptEn = `${coreBlock}\n${environmentBlockEn}\n${technicalDetailsBlock}`;
        }
        
        if (type === 'video' || type === 'both') {
            const veo3Prompt = await this.generateVeo3Prompt({
                sceneSummary: scene.aiSummary,
                characters: charactersToUse,
                cameraScaleValue,
                formState,
                mainCameraInstruction,
                visualStyleInfo,
                selectedAspectRatio
            }, signal);
            result.veo3Prompt = veo3Prompt;
        }

        return result;
    },
};

// =================================================================================
// --- MAIN APP COMPONENT ---
// =================================================================================

export default function App() {
    const [appState, setAppState] = useDebouncedPersistentState<AppState>('photo-ai-app-state', INITIAL_APP_STATE);
    const [sceneImages, setSceneImages] = useState<Record<number, { photo?: string; veo?: string }>>({});
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const [infoModal, setInfoModal] = useState({ open: false, title: '', message: '' });
    const [progressModal, setProgressModal] = useState({ open: false, message: '', current: 0, total: 0 });
    const [editModal, setEditModal] = useState<{ open: false, char: null } | { open: true, char: Character }>({ open: false, char: null });
    const [presetsModal, setPresetsModal] = useState(false);
    const [consistencyModalOpen, setConsistencyModalOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    
    const currentAbortController = useRef<AbortController | null>(null);
    const apiKeyChecked = useRef(false);

    const t = translations.tr;
    
    useEffect(() => {
        if (!API_KEY && !apiKeyChecked.current) {
             apiKeyChecked.current = true;
             setInfoModal({
                open: true,
                title: "API Key Required",
                message: "Google AI API Key is not configured. Please add your API key to use AI features."
            });
        }
    }, []);


    const updateState = <K extends keyof AppState>(key: K, value: AppState[K]) => {
        setAppState(prev => ({ ...prev, [key]: value }));
    };

    const toggleCharacterSelection = (charId: string) => {
        const isSelected = appState.selectedCharacters.some(c => c.id === charId);
        let newSelected: Character[];
        if (isSelected) {
            newSelected = appState.selectedCharacters.filter(c => c.id !== charId);
        } else {
            const charToAdd = appState.characterData.find(c => c.id === charId);
            newSelected = charToAdd ? [...appState.selectedCharacters, JSON.parse(JSON.stringify(charToAdd))] : appState.selectedCharacters;
        }
        updateState('selectedCharacters', newSelected);
    };

    const handleStyleChange = useCallback((charId: string, prop: string, value: string) => {
        const newSelected = appState.selectedCharacters.map(char => {
            if (char.id === charId) {
                const newStil = { ...char.stil };
                const styleOptions = STYLE_OPTIONS as any;
                if (styleOptions[prop]) {
                    const options = styleOptions[prop];
                    const trIndex = options.tr.indexOf(value);
                    (newStil as any)[prop] = {
                        tr: options.tr[trIndex],
                        en: options.en[trIndex]
                    };
                } else {
                    (newStil.kiyafet as any).tr = value;
                }
                return { ...char, stil: newStil };
            }
            return char;
        });
        updateState('selectedCharacters', newSelected);
    }, [appState.selectedCharacters, updateState]);
    
    const handleAccessoryChange = useCallback((charId: string, accessoryTr: string) => {
        const newSelected = appState.selectedCharacters.map(char => {
            if (char.id === charId) {
                let currentAccessories = [...(char.stil.aksesuarlar || [])];
                if (accessoryTr === 'Yok') {
                    currentAccessories = ['Yok'];
                } else {
                    currentAccessories = currentAccessories.filter(acc => acc !== 'Yok');
                    if (currentAccessories.includes(accessoryTr)) {
                        currentAccessories = currentAccessories.filter(acc => acc !== accessoryTr);
                    } else {
                        currentAccessories.push(accessoryTr);
                    }
                    if (currentAccessories.length === 0) {
                        currentAccessories = ['Yok'];
                    }
                }
                return { ...char, stil: { ...char.stil, aksesuarlar: currentAccessories } };
            }
            return char;
        });
        updateState('selectedCharacters', newSelected);
    }, [appState.selectedCharacters, updateState]);

    const handleEditFormSubmit = (updatedCharData: Omit<Character, 'img' | 'stil'>) => {
        const newCharacterData = appState.characterData.map(c => c.id === updatedCharData.id ? { ...c, ...updatedCharData } : c);
        const newSelectedCharacters = appState.selectedCharacters.map(c => c.id === updatedCharData.id ? { ...c, ...updatedCharData } : c);
        setAppState(prev => ({ ...prev, characterData: newCharacterData, selectedCharacters: newSelectedCharacters }));
        setEditModal({ open: false, char: null });
    };

    const resetAllSelections = useCallback(() => {
        setAppState(prev => ({...INITIAL_APP_STATE.data, presets: prev.presets}));
        setSceneImages({});
        setInfoModal({ open: true, title: t.basarili, message: t.sifirlandiMesaj });
    }, [t, setAppState]);

    const savePreset = useCallback((presetName: string) => {
        if (!presetName) return;
        const newPreset: Preset = {
            id: Date.now().toString(),
            name: presetName,
            data: {
                selectedCharacters: appState.selectedCharacters, 
                formState: appState.formState, 
                selectedAspectRatio: appState.selectedAspectRatio, 
                generatedScenes: appState.generatedScenes
            },
            createdAt: new Date().toISOString()
        };
        updateState('presets', [...appState.presets, newPreset]);
        setInfoModal({ open: true, title: t.basarili, message: 'Preset saved successfully!' });
    }, [appState, updateState, t]);

    const loadPreset = useCallback((presetId: string) => {
        const preset = appState.presets.find(p => p.id === presetId);
        if (!preset) return;
        setAppState(prev => ({
            ...prev,
            selectedCharacters: preset.data.selectedCharacters || [],
            formState: preset.data.formState || prev.formState,
            selectedAspectRatio: preset.data.selectedAspectRatio || '16:9',
            generatedScenes: preset.data.generatedScenes || [],
        }));
        setSceneImages({});
        setPresetsModal(false);
        setInfoModal({ open: true, title: t.basarili, message: 'Preset loaded successfully!' });
    }, [appState.presets, setAppState, t]);

    const deletePreset = useCallback((presetId: string) => {
        updateState('presets', appState.presets.filter(p => p.id !== presetId));
        setInfoModal({ open: true, title: t.basarili, message: 'Preset deleted successfully!' });
    }, [appState.presets, updateState, t]);

    const handleAiStyleSuggestion = useCallback(async (charId: string) => {
        const character = appState.selectedCharacters.find(c => c.id === charId);
        if (!character) return;

        setIsLoading(prev => ({ ...prev, [`style_${charId}`]: true }));
        const controller = new AbortController();
        
        try {
            const hasUserOutfitRequest = character.stil.kiyafet.tr?.trim().length > 0;
            const userOutfitRequest = hasUserOutfitRequest ? character.stil.kiyafet.tr : "Belirli bir istek yok, ortama uygun bir kıyafet oluştur.";

            const outfitSuggestion = await FotofilmDirectorService.suggestOutfit({
                environment: appState.formState['ortam-arka-plan'].tr,
                interaction: appState.formState['pozisyon-etkilesim'].tr,
                userRequest: userOutfitRequest,
                language: 'tr',
                signal: controller.signal
            });
            
            if (outfitSuggestion) {
                const enOutfit = await FotofilmDirectorService.translateText(outfitSuggestion, 'en', controller.signal);

                const newSelected = appState.selectedCharacters.map(char =>
                    char.id === charId ? { ...char, stil: { ...char.stil, kiyafet: { tr: outfitSuggestion, en: enOutfit } } } : char
                );
                updateState('selectedCharacters', newSelected);
            } else {
                throw new Error("Invalid format received from AI.");
            }
        } catch (e: any) {
             if (e.name !== 'AbortError') {
                console.error("Style Suggestion Error:", e);
                setInfoModal({ open: true, title: t.hata, message: `${t.gecersizFormatHata}: ${e.message}` });
             }
        } finally {
            setIsLoading(prev => ({ ...prev, [`style_${charId}`]: false }));
        }
    }, [appState, updateState, t]);

    const generatePromptForScene = useCallback(async (sceneIndex: number, type: 'photo' | 'video') => {
        const loadingKey = `prompt_${type}_${sceneIndex}`;
        setIsLoading(prev => ({ ...prev, [loadingKey]: true }));
        const controller = new AbortController();
    
        try {
            const { generatedScenes, selectedCharacters, formState, selectedAspectRatio } = appState;
            const scene = generatedScenes[sceneIndex];
            if (!scene) return;
    
            const updatedParts = await promptBuilder.generatePromptsForScene({
                scene,
                charactersToUse: selectedCharacters,
                formState,
                selectedAspectRatio,
            }, type, controller.signal);
            
            const newScenes = appState.generatedScenes.map((s, i) => i === sceneIndex ? { ...s, ...updatedParts } : s);
            updateState('generatedScenes', newScenes);
    
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                setInfoModal({ open: true, title: t.hata, message: `Prompt generation error: ${e.message}` });
            }
        } finally {
            setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
        }
    }, [appState, updateState, t]);
    
    const generateAllPrompts = useCallback(async (type: 'photo' | 'video') => {
        const loadingKey = `all_prompts_${type}`;
        setIsLoading(prev => ({ ...prev, [loadingKey]: true }));
        const { generatedScenes, selectedCharacters, formState, selectedAspectRatio } = appState;
    
        currentAbortController.current = new AbortController();
        const signal = currentAbortController.current.signal;
        setProgressModal({ open: true, message: t.olusturuluyor, current: 0, total: generatedScenes.length });
    
        const newScenes = [...generatedScenes];
        let progress = 0;
    
        try {
            for (let i = 0; i < generatedScenes.length; i++) {
                if (signal.aborted) break;
    
                setProgressModal(prev => ({ ...prev, message: t.sahnePromptuOlusturuluyor.replace('{sceneNumber}', String(i + 1)), current: ++progress }));
    
                const updatedParts = await promptBuilder.generatePromptsForScene({
                    scene: newScenes[i],
                    charactersToUse: selectedCharacters,
                    formState,
                    selectedAspectRatio,
                }, type, signal);
                newScenes[i] = { ...newScenes[i], ...updatedParts };
            }
            
            if (!signal.aborted) {
                updateState('generatedScenes', newScenes);
            }
    
        } catch (error: any) {
            if (!signal.aborted) {
                setInfoModal({ open: true, title: t.hata, message: `Toplu prompt oluşturma sırasında bir hata oluştu: ${error.message}` });
            }
        } finally {
            setProgressModal({ open: false, message: '', current: 0, total: 0 });
            if (!signal.aborted) {
                 setInfoModal({ open: true, title: t.basarili, message: 'Tüm sahne promptları başarıyla oluşturuldu.' });
            }
            setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
        }
    }, [appState, updateState, t]);

    const generateImageForScene = useCallback(async (index = 0, promptType: 'photo' | 'veo') => {
        if (isNaN(index) || !appState.generatedScenes[index]) {
            setInfoModal({ open: true, title: t.hata, message: t.gecerliSahneSecUyarisi }); return;
        }
        let promptToGenerate = promptType === 'veo' ? appState.generatedScenes[index].veo3Prompt : appState.generatedScenes[index].fullPromptEn;
        if (!promptToGenerate) {
             setInfoModal({ open: true, title: t.uyari, message: t.promptOlusturmaUyarisi.replace('{sceneNumber}', String(index + 1)) }); 
             return;
        }

        const loadingKey = `image_${promptType}_${index}`;
        setIsLoading(prev => ({ ...prev, [loadingKey]: true }));
        const controller = new AbortController();

        try {
            const imageUrl = await FotofilmDirectorService.generateImage(promptToGenerate, appState.selectedAspectRatio, controller.signal);
            if (imageUrl) {
                setSceneImages(prev => ({
                    ...prev,
                    [index]: {
                        ...prev[index],
                        [promptType]: imageUrl
                    }
                }));
            }
        } catch (e: any) { 
            if (e.name !== 'AbortError') {
                setInfoModal({ open: true, title: t.hata, message: `${t.apiGorselHata}${e.message}` });
            }
        } 
        finally { 
            setIsLoading(prev => ({ ...prev, [loadingKey]: false })); 
        }
    }, [appState.generatedScenes, appState.selectedAspectRatio, t]);

    const handleAnalyzeConsistency = useCallback(async () => {
        if (appState.generatedScenes.filter(s => s.fullPromptEn).length < 2) return;
        setIsLoading(prev => ({ ...prev, consistency: true }));
        currentAbortController.current = new AbortController();
        try {
            const promptsText = appState.generatedScenes.map((scene, index) => 
                `--- SCENE ${index + 1} ---\nDirector Note: ${scene.directorNote}\nSummary: ${scene.aiSummary}\nFull Prompt: ${scene.fullPromptEn}\n`
            ).join('\n');
            const report = await FotofilmDirectorService.analyzeSceneConsistency(promptsText, 'tr', currentAbortController.current.signal);
            updateState('consistencyReport', report);
            setConsistencyModalOpen(true);
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                setInfoModal({ open: true, title: t.hata, message: `Analiz sırasında hata: ${e.message}` });
            }
        } finally {
            setIsLoading(prev => ({ ...prev, consistency: false }));
        }
    }, [appState.generatedScenes, updateState, t]);

    const handleFixConsistency = useCallback(async () => {
        if (!appState.consistencyReport) return;
        setIsLoading(prev => ({ ...prev, consistencyFix: true }));
        currentAbortController.current = new AbortController();

        try {
            const updatedScenesData = await FotofilmDirectorService.fixInconsistencies(
                appState.generatedScenes, 
                appState.consistencyReport, 
                currentAbortController.current.signal
            );

            const environmentBlockEn = appState.formState['ortam-arka-plan'].en || await FotofilmDirectorService.translateText(appState.formState['ortam-arka-plan'].tr, 'en', currentAbortController.current.signal);

            const updatedScenesWithLength = updatedScenesData.map((sceneData: Scene) => {
                 let corePromptLength: number | undefined = undefined;
                if (sceneData.fullPromptEn) {
                    const techStartIndex = sceneData.fullPromptEn.indexOf('[Camera]');
                    if (techStartIndex !== -1) {
                        const coreAndEnv = sceneData.fullPromptEn.substring(0, techStartIndex).trim();
                        if (coreAndEnv.endsWith(environmentBlockEn)) {
                            const coreBlock = coreAndEnv.substring(0, coreAndEnv.length - environmentBlockEn.length).trim();
                            corePromptLength = coreBlock.length;
                        }
                    }
                }
                return { ...sceneData, corePromptLength };
            });

            updateState('generatedScenes', updatedScenesWithLength);
            setConsistencyModalOpen(false);
            updateState('consistencyReport', null);
            setInfoModal({ open: true, title: t.basarili, message: 'Promptlar başarıyla düzeltildi.' });
        } catch (e: any) {
             if (e.name !== 'AbortError') {
                setInfoModal({ open: true, title: t.hata, message: `Düzeltme sırasında hata: ${e.message}` });
             }
        } finally {
            setIsLoading(prev => ({ ...prev, consistencyFix: false }));
        }
    }, [appState, t, updateState]);

    const renderContent = () => {
        switch (appState.activeTab) {
            case 'karakterler': return <CharactersTab characterData={appState.characterData} selectedCharacters={appState.selectedCharacters} t={t} toggleCharacterSelection={toggleCharacterSelection} setEditModal={setEditModal} />;
            case 'ortam': return <EnvironmentTab appState={appState} setAppState={setAppState} t={t} isLoading={isLoading} setIsLoading={setIsLoading} setInfoModal={setInfoModal} currentAbortController={currentAbortController}/>;
            case 'stil-odasi': return <StyleRoomTab selectedCharacters={appState.selectedCharacters} t={t} handleStyleChange={handleStyleChange} handleAccessoryChange={handleAccessoryChange} isLoading={isLoading} handleAiStyleSuggestion={handleAiStyleSuggestion} />;
            case 'sahneleme': return <StagingTab appState={appState} updateState={updateState} t={t} isLoading={isLoading} setIsLoading={setIsLoading} setInfoModal={setInfoModal} generatePromptForScene={generatePromptForScene} generateAllPrompts={generateAllPrompts} handleAnalyzeConsistency={handleAnalyzeConsistency} currentAbortController={currentAbortController} />;
            case 'fotofilm': return <PhotofilmTab t={t} generatedScenes={appState.generatedScenes} formState={appState.formState} isLoading={isLoading} generateImageForScene={generateImageForScene} sceneImages={sceneImages} setSceneImages={setSceneImages} selectedAspectRatio={appState.selectedAspectRatio} setProgressModal={setProgressModal} setInfoModal={setInfoModal} currentAbortController={currentAbortController} setLightboxImage={setLightboxImage} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in-0"
                    onClick={() => setLightboxImage(null)}
                >
                    <img
                        src={lightboxImage}
                        alt="Fullscreen Preview"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors"
                        aria-label="Close"
                    >
                        <XIcon className="w-8 h-8" />
                    </button>
                </div>
            )}
            <Modal
                isOpen={infoModal.open}
                onClose={() => setInfoModal({ open: false, title: '', message: '' })}
                title={infoModal.title}
            >
                <p className="mb-6 text-slate-300 leading-relaxed">{infoModal.message}</p>
                <button 
                    onClick={() => setInfoModal({ open: false, title: '', message: '' })} 
                    className="w-full bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 rounded-xl py-3 font-medium transition-all duration-300"
                >
                    {t.tamam}
                </button>
            </Modal>
            <Modal
                isOpen={progressModal.open}
                onClose={() => { /* Cannot close progress modal manually */ }}
                title={progressModal.message}
                showCloseButton={false}
            >
                 <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{progressModal.message}</h3>
                    <div className="bg-slate-700 rounded-full h-2.5 mb-4">
                        <div 
                            className="bg-gradient-to-r from-sky-500 to-violet-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${(progressModal.current / progressModal.total) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-slate-400 text-sm">
                        {progressModal.current} / {progressModal.total} {t.tamamlandi}
                    </p>
                    <button
                        onClick={() => {
                            currentAbortController.current?.abort();
                            setProgressModal({ open: false, message: '', current: 0, total: 0 });
                            setInfoModal({ open: true, title: t.iptalEdildi, message: t.iptalEdildiMesaj });
                        }}
                        className="mt-6 w-full bg-slate-700/80 hover:bg-slate-600/80 text-white rounded-xl py-2.5 font-medium transition-all duration-300"
                    >
                        {t.iptalEt}
                    </button>
                </div>
            </Modal>
             <Modal
                isOpen={consistencyModalOpen}
                onClose={() => setConsistencyModalOpen(false)}
                title={t.tutarlilikAnaliziRaporu}
                maxWidth="max-w-4xl"
            >
                <div className="max-h-[70vh] flex flex-col">
                    <div className="overflow-y-auto pr-2 flex-grow">
                        <pre className="whitespace-pre-wrap font-sans text-slate-300 bg-slate-900/80 p-4 rounded-lg border border-slate-700">
                            {appState.consistencyReport || t.analizEdiliyor}
                        </pre>
                    </div>
                    <div className="flex justify-end gap-4 pt-6 flex-shrink-0">
                        <button onClick={() => setConsistencyModalOpen(false)} className="px-8 py-3 bg-slate-700/80 hover:bg-slate-600/80 text-white rounded-xl font-medium transition-all duration-300">
                            {t.kapat}
                        </button>
                        <button onClick={handleFixConsistency} disabled={isLoading.consistencyFix || !appState.consistencyReport?.trim() || appState.consistencyReport.includes("All scenes are consistent") || appState.consistencyReport.includes("Tüm sahneler tutarlı")} className="px-8 py-3 bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {isLoading.consistencyFix ? <><Loader size="h-5 w-5"/> {t.duzeltiliyor}</> : t.otomatikDuzelt}
                        </button>
                    </div>
                </div>
            </Modal>
            {editModal.open && (
                <EditCharacterModal 
                    isOpen={editModal.open} 
                    onClose={() => setEditModal({open: false, char: null})} 
                    character={editModal.char!}
                    onSave={handleEditFormSubmit}
                    t={t}
                />
            )}
            {presetsModal && (
                <PresetsModal 
                    isOpen={presetsModal}
                    onClose={() => setPresetsModal(false)}
                    presets={appState.presets}
                    onSave={savePreset}
                    onLoad={loadPreset}
                    onDelete={deletePreset}
                    t={t}
                />
            )}
            
            <MainHeader 
                activeTab={appState.activeTab}
                setActiveTab={(tab) => updateState('activeTab', tab)}
                onReset={resetAllSelections}
                onPresets={() => setPresetsModal(true)}
                t={t}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
        </div>
    );
}