export const SITE = {
    owner: 'Collins Nyamari',
    email: 'nyamaricollins14@gmail.com',
    whatsapp: '254794522933', // 0794 522 933 in international format, digits only
    legalUpdated: 'October 2, 2026',
    governingLaw: 'the Republic of Kenya',
    regulator: { name: 'Office of the Data Protection Commissioner (ODPC)', url: 'https://www.odpc.go.ke' },
} as const;

export type AppView = 'home' | 'privacy' | 'terms' | 'security';