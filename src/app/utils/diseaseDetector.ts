export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface DiagnosisResult {
  id: string;
  disease: string;
  probability: number;
  description: string;
  symptoms: string[];
  remedies: Remedy[];
  precautions: string[];
  whenToSeeDoctor: string[];
  date: string;
}

export interface Remedy {
  type: 'medication' | 'lifestyle' | 'home-remedy' | 'diet';
  title: string;
  description: string;
  duration?: string;
}

// Mock disease database
const diseaseDatabase = [
  {
    disease: 'Common Cold',
    symptoms: ['runny nose', 'sneezing', 'sore throat', 'cough', 'fatigue', 'mild fever'],
    description: 'A viral infection of your nose and throat (upper respiratory tract). It\'s usually harmless, although it might not feel that way.',
    remedies: [
      {
        type: 'home-remedy' as const,
        title: 'Rest and Hydration',
        description: 'Get plenty of sleep and drink lots of fluids (water, warm tea, soup)',
        duration: '7-10 days'
      },
      {
        type: 'medication' as const,
        title: 'Over-the-counter medications',
        description: 'Pain relievers like acetaminophen or ibuprofen, decongestants',
        duration: 'As needed'
      },
      {
        type: 'home-remedy' as const,
        title: 'Honey and Lemon',
        description: 'Mix honey and lemon in warm water to soothe throat',
        duration: '2-3 times daily'
      }
    ],
    precautions: [
      'Wash hands frequently',
      'Avoid close contact with infected people',
      'Cover mouth when coughing or sneezing',
      'Disinfect frequently touched surfaces'
    ],
    whenToSeeDoctor: [
      'Symptoms last more than 10 days',
      'Fever higher than 101.3°F (38.5°C)',
      'Difficulty breathing',
      'Severe headache or sinus pain'
    ]
  },
  {
    disease: 'Seasonal Flu (Influenza)',
    symptoms: ['high fever', 'body aches', 'fatigue', 'cough', 'headache', 'chills'],
    description: 'A contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness.',
    remedies: [
      {
        type: 'medication' as const,
        title: 'Antiviral drugs',
        description: 'Prescription antivirals like oseltamivir (Tamiflu) if started within 48 hours',
        duration: '5 days'
      },
      {
        type: 'home-remedy' as const,
        title: 'Rest and Fluids',
        description: 'Complete bed rest and plenty of warm fluids',
        duration: '1-2 weeks'
      },
      {
        type: 'lifestyle' as const,
        title: 'Isolation',
        description: 'Stay home to prevent spreading to others',
        duration: 'Until fever-free for 24 hours'
      }
    ],
    precautions: [
      'Get annual flu vaccine',
      'Avoid touching eyes, nose, and mouth',
      'Clean and disinfect surfaces',
      'Stay away from sick people'
    ],
    whenToSeeDoctor: [
      'Difficulty breathing or shortness of breath',
      'Chest pain or pressure',
      'Sudden dizziness or confusion',
      'Severe vomiting'
    ]
  },
  {
    disease: 'Migraine',
    symptoms: ['severe headache', 'nausea', 'sensitivity to light', 'visual disturbances', 'dizziness'],
    description: 'A neurological condition characterized by intense, debilitating headaches often accompanied by nausea and sensitivity to light and sound.',
    remedies: [
      {
        type: 'medication' as const,
        title: 'Pain relievers',
        description: 'Triptans, NSAIDs, or prescribed migraine medications',
        duration: 'As directed'
      },
      {
        type: 'lifestyle' as const,
        title: 'Dark, Quiet Room',
        description: 'Rest in a dark, quiet room with cool compress on forehead',
        duration: 'Until symptoms subside'
      },
      {
        type: 'diet' as const,
        title: 'Dietary Changes',
        description: 'Avoid trigger foods, maintain regular meal times, stay hydrated',
        duration: 'Ongoing'
      }
    ],
    precautions: [
      'Identify and avoid triggers',
      'Maintain regular sleep schedule',
      'Manage stress through relaxation techniques',
      'Keep a headache diary'
    ],
    whenToSeeDoctor: [
      'Sudden, severe headache',
      'Headache with fever, stiff neck, confusion',
      'Headache after head injury',
      'Increasing frequency or severity'
    ]
  },
  {
    disease: 'Gastroenteritis (Stomach Flu)',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'mild fever', 'loss of appetite'],
    description: 'Inflammation of the stomach and intestines, typically caused by a viral or bacterial infection.',
    remedies: [
      {
        type: 'home-remedy' as const,
        title: 'Rehydration',
        description: 'Drink plenty of clear fluids, oral rehydration solutions',
        duration: '3-7 days'
      },
      {
        type: 'diet' as const,
        title: 'BRAT Diet',
        description: 'Eat bland foods: Bananas, Rice, Applesauce, Toast',
        duration: 'Until symptoms improve'
      },
      {
        type: 'medication' as const,
        title: 'Probiotics',
        description: 'Probiotic supplements to restore gut bacteria',
        duration: '1-2 weeks'
      }
    ],
    precautions: [
      'Wash hands thoroughly',
      'Avoid contaminated food and water',
      'Disinfect surfaces',
      'Avoid preparing food for others when sick'
    ],
    whenToSeeDoctor: [
      'Severe dehydration',
      'Blood in vomit or stool',
      'High fever (over 104°F)',
      'Symptoms lasting more than several days'
    ]
  },
  {
    disease: 'Allergic Rhinitis (Hay Fever)',
    symptoms: ['sneezing', 'runny nose', 'itchy eyes', 'nasal congestion', 'fatigue'],
    description: 'An allergic reaction to pollen, dust mites, or other allergens, causing inflammation in the nose.',
    remedies: [
      {
        type: 'medication' as const,
        title: 'Antihistamines',
        description: 'Over-the-counter or prescription antihistamines',
        duration: 'During allergy season'
      },
      {
        type: 'home-remedy' as const,
        title: 'Nasal Rinse',
        description: 'Saline nasal irrigation to clear allergens',
        duration: 'Daily during symptoms'
      },
      {
        type: 'lifestyle' as const,
        title: 'Avoid Allergens',
        description: 'Keep windows closed, use air purifiers, shower after outdoor activities',
        duration: 'Ongoing'
      }
    ],
    precautions: [
      'Monitor pollen counts',
      'Wear sunglasses outdoors',
      'Keep indoor air clean',
      'Wash bedding regularly in hot water'
    ],
    whenToSeeDoctor: [
      'Symptoms interfere with daily life',
      'Over-the-counter medications don\'t help',
      'Chronic sinus infections',
      'Asthma symptoms worsen'
    ]
  },
  {
    disease: 'Anxiety',
    symptoms: ['worry', 'restlessness', 'fatigue', 'difficulty concentrating', 'muscle tension', 'sleep problems'],
    description: 'A mental health condition characterized by excessive worry and physical symptoms of stress.',
    remedies: [
      {
        type: 'lifestyle' as const,
        title: 'Relaxation Techniques',
        description: 'Practice deep breathing, meditation, progressive muscle relaxation',
        duration: 'Daily practice'
      },
      {
        type: 'lifestyle' as const,
        title: 'Regular Exercise',
        description: 'Engage in physical activity for at least 30 minutes most days',
        duration: 'Ongoing'
      },
      {
        type: 'diet' as const,
        title: 'Limit Caffeine',
        description: 'Reduce caffeine and alcohol intake',
        duration: 'Ongoing'
      }
    ],
    precautions: [
      'Maintain regular sleep schedule',
      'Stay connected with supportive people',
      'Limit exposure to stressful news',
      'Practice stress management'
    ],
    whenToSeeDoctor: [
      'Anxiety interferes with daily activities',
      'Experiencing panic attacks',
      'Thoughts of self-harm',
      'Symptoms don\'t improve with self-care'
    ]
  }
];

export function detectDisease(symptoms: Symptom[]): DiagnosisResult[] {
  const symptomNames = symptoms.map(s => s.name.toLowerCase());
  const results: DiagnosisResult[] = [];

  diseaseDatabase.forEach(disease => {
    const matchCount = disease.symptoms.filter(ds => 
      symptomNames.some(sn => sn.includes(ds) || ds.includes(sn))
    ).length;

    if (matchCount > 0) {
      const probability = Math.min((matchCount / disease.symptoms.length) * 100, 95);
      
      results.push({
        id: Date.now().toString() + Math.random(),
        disease: disease.disease,
        probability: Math.round(probability),
        description: disease.description,
        symptoms: disease.symptoms,
        remedies: disease.remedies,
        precautions: disease.precautions,
        whenToSeeDoctor: disease.whenToSeeDoctor,
        date: new Date().toISOString()
      });
    }
  });

  // Sort by probability
  results.sort((a, b) => b.probability - a.probability);

  // Return top 3 results
  return results.slice(0, 3);
}

export function saveDiagnosis(userId: string, diagnosis: DiagnosisResult) {
  const history = JSON.parse(localStorage.getItem(`medicalHistory_${userId}`) || '[]');
  history.unshift(diagnosis);
  localStorage.setItem(`medicalHistory_${userId}`, JSON.stringify(history));
}

export function getMedicalHistory(userId: string): DiagnosisResult[] {
  return JSON.parse(localStorage.getItem(`medicalHistory_${userId}`) || '[]');
}
