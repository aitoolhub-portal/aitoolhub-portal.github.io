// ===== MediScan AI — Application Logic =====

// ===== State =====
const state = {
  currentStep: 1,
  totalSteps: 5,
  patient: {
    name: '',
    age: '',
    gender: '',
    weight: '',
    medicalHistory: ''
  },
  selectedAreas: [],
  selectedSymptoms: [],
  additionalSymptoms: '',
  duration: '',
  severity: 5,
  notes: '',
  uploadedImages: []
};

// ===== Symptom Database =====
const symptomDatabase = {
  head: {
    label: '🧠 Head',
    symptoms: [
      'Headache', 'Migraine', 'Dizziness', 'Lightheadedness',
      'Pressure in head', 'Blurred vision', 'Fainting', 'Confusion',
      'Memory problems', 'Difficulty concentrating', 'Scalp tenderness'
    ]
  },
  eyes: {
    label: '👁️ Eyes',
    symptoms: [
      'Blurred vision', 'Eye pain', 'Red eyes', 'Itchy eyes',
      'Watery eyes', 'Sensitivity to light', 'Double vision',
      'Floaters', 'Dry eyes', 'Swollen eyelids', 'Eye discharge'
    ]
  },
  ears: {
    label: '👂 Ears',
    symptoms: [
      'Ear pain', 'Hearing loss', 'Tinnitus (ringing)', 'Ear discharge',
      'Itchy ears', 'Feeling of fullness', 'Vertigo', 'Balance problems'
    ]
  },
  'nose-throat': {
    label: '👃 Nose / Throat',
    symptoms: [
      'Sore throat', 'Runny nose', 'Nasal congestion', 'Sneezing',
      'Post-nasal drip', 'Difficulty swallowing', 'Hoarseness',
      'Loss of smell', 'Loss of taste', 'Cough', 'Dry cough',
      'Productive cough', 'Nosebleeds'
    ]
  },
  chest: {
    label: '🫁 Chest',
    symptoms: [
      'Chest pain', 'Shortness of breath', 'Rapid heartbeat', 'Palpitations',
      'Wheezing', 'Tight chest', 'Cough with blood', 'Chest pressure',
      'Difficulty breathing when lying down', 'Irregular heartbeat'
    ]
  },
  abdomen: {
    label: '🫃 Abdomen',
    symptoms: [
      'Stomach pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Constipation',
      'Bloating', 'Gas', 'Heartburn', 'Loss of appetite', 'Blood in stool',
      'Abdominal cramps', 'Indigestion', 'Acid reflux', 'Dark stool'
    ]
  },
  skin: {
    label: '🖐️ Skin',
    symptoms: [
      'Rash', 'Itching', 'Redness', 'Swelling', 'Hives', 'Dry skin',
      'Blisters', 'Skin discoloration', 'Bumps or lumps', 'Acne',
      'Peeling skin', 'Bruising easily', 'Skin ulcers', 'Moles changing',
      'Excessive sweating', 'Yellowing skin (jaundice)'
    ]
  },
  joints: {
    label: '🦴 Joints / Bones',
    symptoms: [
      'Joint pain', 'Joint stiffness', 'Swollen joints', 'Muscle pain',
      'Muscle weakness', 'Limited range of motion', 'Cracking joints',
      'Bone pain', 'Muscle cramps', 'Numbness', 'Tingling'
    ]
  },
  back: {
    label: '🔙 Back',
    symptoms: [
      'Lower back pain', 'Upper back pain', 'Neck pain', 'Stiffness',
      'Sciatica', 'Pain radiating to legs', 'Muscle spasms',
      'Difficulty standing straight', 'Pain when bending'
    ]
  },
  legs: {
    label: '🦵 Legs / Feet',
    symptoms: [
      'Leg pain', 'Swollen legs', 'Leg cramps', 'Varicose veins',
      'Foot pain', 'Numbness in feet', 'Cold feet', 'Swollen ankles',
      'Difficulty walking', 'Restless legs', 'Tingling in legs'
    ]
  },
  general: {
    label: '🌡️ General',
    symptoms: [
      'Fever', 'Chills', 'Fatigue', 'Weight loss', 'Weight gain',
      'Night sweats', 'Loss of appetite', 'Dehydration', 'Swollen lymph nodes',
      'General weakness', 'Body aches', 'Frequent infections',
      'Excessive thirst', 'Frequent urination'
    ]
  },
  mental: {
    label: '🧘 Mental Health',
    symptoms: [
      'Anxiety', 'Depression', 'Insomnia', 'Mood swings', 'Irritability',
      'Panic attacks', 'Loss of interest', 'Difficulty sleeping',
      'Excessive worry', 'Social withdrawal', 'Brain fog',
      'Restlessness', 'Feeling hopeless'
    ]
  }
};

// ===== Disease Database =====
const diseaseDatabase = [
  {
    name: 'Common Cold / Upper Respiratory Infection',
    symptoms: ['Sore throat', 'Runny nose', 'Nasal congestion', 'Sneezing', 'Cough', 'Dry cough', 'Fatigue', 'Headache', 'Body aches', 'Fever', 'Chills', 'Post-nasal drip', 'Loss of smell', 'Watery eyes'],
    description: 'A viral infection of the upper respiratory tract. Common colds are generally harmless and resolve on their own within 7-10 days.',
    recommendation: 'Rest, stay hydrated, and use over-the-counter remedies for symptom relief. Seek medical attention if symptoms persist beyond 10 days or worsen significantly.',
    severity: 'low',
    areas: ['nose-throat', 'head', 'general', 'chest']
  },
  {
    name: 'Influenza (Flu)',
    symptoms: ['Fever', 'Chills', 'Body aches', 'Fatigue', 'Cough', 'Sore throat', 'Headache', 'Runny nose', 'Muscle pain', 'General weakness', 'Loss of appetite', 'Night sweats'],
    description: 'A contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness, and at times can lead to complications.',
    recommendation: 'Antiviral medications may help if started within 48 hours. Rest, fluids, and fever reducers are recommended. Seek immediate care if you experience difficulty breathing or chest pain.',
    severity: 'medium',
    areas: ['general', 'nose-throat', 'head', 'chest']
  },
  {
    name: 'COVID-19',
    symptoms: ['Fever', 'Dry cough', 'Fatigue', 'Loss of smell', 'Loss of taste', 'Shortness of breath', 'Body aches', 'Sore throat', 'Headache', 'Diarrhea', 'Chills', 'Night sweats'],
    description: 'A respiratory illness caused by the SARS-CoV-2 virus. Symptoms range from mild to severe and can affect multiple organ systems.',
    recommendation: 'Get tested immediately. Isolate and monitor symptoms. Seek emergency care if you experience difficulty breathing, persistent chest pain, or confusion.',
    severity: 'high',
    areas: ['general', 'chest', 'nose-throat', 'abdomen']
  },
  {
    name: 'Migraine',
    symptoms: ['Migraine', 'Headache', 'Sensitivity to light', 'Nausea', 'Vomiting', 'Blurred vision', 'Dizziness', 'Pressure in head', 'Difficulty concentrating'],
    description: 'A neurological condition causing intense, debilitating headaches often accompanied by nausea, vomiting, and sensitivity to light and sound.',
    recommendation: 'Consult a neurologist if migraines are frequent. Over-the-counter pain relief may help mild episodes. Keep a migraine diary to identify triggers.',
    severity: 'medium',
    areas: ['head', 'eyes']
  },
  {
    name: 'Allergic Rhinitis (Hay Fever)',
    symptoms: ['Sneezing', 'Runny nose', 'Nasal congestion', 'Itchy eyes', 'Watery eyes', 'Post-nasal drip', 'Itching', 'Fatigue', 'Sore throat'],
    description: 'An allergic response causing cold-like symptoms triggered by allergens such as pollen, dust mites, or pet dander.',
    recommendation: 'Antihistamines and nasal sprays can provide relief. Identify and avoid triggers. Consider allergy testing for persistent symptoms.',
    severity: 'low',
    areas: ['nose-throat', 'eyes', 'general']
  },
  {
    name: 'Gastroesophageal Reflux Disease (GERD)',
    symptoms: ['Heartburn', 'Acid reflux', 'Chest pain', 'Difficulty swallowing', 'Indigestion', 'Nausea', 'Sore throat', 'Dry cough', 'Bloating'],
    description: 'A digestive disorder where stomach acid frequently flows back into the esophagus, causing irritation and heartburn.',
    recommendation: 'Avoid trigger foods (spicy, acidic, fatty). Eat smaller meals. Don\'t lie down right after eating. See a gastroenterologist if symptoms persist despite lifestyle changes.',
    severity: 'medium',
    areas: ['abdomen', 'chest', 'nose-throat']
  },
  {
    name: 'Urinary Tract Infection (UTI)',
    symptoms: ['Frequent urination', 'Abdominal cramps', 'Fever', 'Chills', 'Lower back pain', 'General weakness', 'Nausea'],
    description: 'An infection in any part of the urinary system. UTIs are common and usually affect the bladder and urethra.',
    recommendation: 'See a doctor for proper diagnosis and antibiotic treatment. Drink plenty of water. Do not delay treatment as the infection can spread to the kidneys.',
    severity: 'medium',
    areas: ['abdomen', 'back', 'general']
  },
  {
    name: 'Eczema (Atopic Dermatitis)',
    symptoms: ['Rash', 'Itching', 'Dry skin', 'Redness', 'Skin discoloration', 'Peeling skin', 'Blisters', 'Swelling'],
    description: 'A chronic skin condition that causes inflamed, itchy, cracked, and rough skin. It commonly affects children but can occur at any age.',
    recommendation: 'Use fragrance-free moisturizers regularly. Avoid known irritants. A dermatologist can prescribe topical corticosteroids or other treatments for flare-ups.',
    severity: 'low',
    areas: ['skin']
  },
  {
    name: 'Psoriasis',
    symptoms: ['Rash', 'Dry skin', 'Peeling skin', 'Skin discoloration', 'Itching', 'Joint pain', 'Redness', 'Bumps or lumps', 'Scalp tenderness'],
    description: 'An autoimmune condition that causes rapid buildup of skin cells, leading to scaling, redness, and inflammation.',
    recommendation: 'See a dermatologist for proper treatment. Options include topical treatments, phototherapy, and systemic medications depending on severity.',
    severity: 'medium',
    areas: ['skin', 'joints', 'head']
  },
  {
    name: 'Type 2 Diabetes',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Weight loss', 'Numbness', 'Tingling', 'Dehydration', 'Frequent infections'],
    description: 'A chronic metabolic condition affecting how the body processes blood sugar (glucose). It develops gradually and can lead to serious complications.',
    recommendation: 'Get a blood glucose test immediately. Early detection is crucial. Lifestyle changes (diet, exercise) and medication can effectively manage this condition.',
    severity: 'high',
    areas: ['general', 'eyes', 'legs']
  },
  {
    name: 'Hypertension (High Blood Pressure)',
    symptoms: ['Headache', 'Dizziness', 'Shortness of breath', 'Chest pain', 'Blurred vision', 'Fatigue', 'Nosebleeds', 'Palpitations'],
    description: 'A condition where the force of blood against artery walls is consistently too high. Often called the "silent killer" as it may not show symptoms.',
    recommendation: 'Get your blood pressure checked regularly. Reduce salt intake, exercise regularly, manage stress, and consult a cardiologist for medication if needed.',
    severity: 'high',
    areas: ['head', 'chest', 'general']
  },
  {
    name: 'Anxiety Disorder',
    symptoms: ['Anxiety', 'Panic attacks', 'Excessive worry', 'Restlessness', 'Insomnia', 'Difficulty sleeping', 'Rapid heartbeat', 'Palpitations', 'Shortness of breath', 'Difficulty concentrating', 'Muscle pain', 'Irritability', 'Fatigue'],
    description: 'A mental health condition characterized by persistent excessive worry, nervousness, and fear that interferes with daily activities.',
    recommendation: 'Cognitive behavioral therapy (CBT) is highly effective. Consult a mental health professional. Relaxation techniques, regular exercise, and sometimes medication can help manage symptoms.',
    severity: 'medium',
    areas: ['mental', 'chest', 'general', 'head']
  },
  {
    name: 'Depression',
    symptoms: ['Depression', 'Loss of interest', 'Insomnia', 'Fatigue', 'Feeling hopeless', 'Social withdrawal', 'Loss of appetite', 'Weight loss', 'Weight gain', 'Difficulty concentrating', 'Brain fog', 'Body aches'],
    description: 'A mood disorder causing persistent feelings of sadness, loss of interest, and can affect how you feel, think, and handle daily activities.',
    recommendation: 'Reach out to a mental health professional. Treatment typically includes therapy (CBT, talk therapy) and/or medication. If you have thoughts of self-harm, please call a crisis helpline immediately.',
    severity: 'high',
    areas: ['mental', 'general']
  },
  {
    name: 'Asthma',
    symptoms: ['Wheezing', 'Shortness of breath', 'Tight chest', 'Cough', 'Dry cough', 'Difficulty breathing when lying down', 'Chest pressure'],
    description: 'A chronic respiratory condition where airways narrow and swell, producing extra mucus, making breathing difficult.',
    recommendation: 'See a pulmonologist for proper testing and an inhaler prescription. Identify and avoid triggers. Have an action plan for asthma attacks.',
    severity: 'medium',
    areas: ['chest']
  },
  {
    name: 'Irritable Bowel Syndrome (IBS)',
    symptoms: ['Stomach pain', 'Abdominal cramps', 'Bloating', 'Gas', 'Diarrhea', 'Constipation', 'Nausea', 'Loss of appetite'],
    description: 'A common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, and changes in bowel habits.',
    recommendation: 'Dietary changes (low-FODMAP diet), stress management, and probiotics may help. Consult a gastroenterologist for persistent symptoms.',
    severity: 'medium',
    areas: ['abdomen']
  },
  {
    name: 'Rheumatoid Arthritis',
    symptoms: ['Joint pain', 'Joint stiffness', 'Swollen joints', 'Fatigue', 'Limited range of motion', 'General weakness', 'Numbness', 'Tingling', 'Muscle weakness'],
    description: 'An autoimmune disorder that primarily affects joints, causing painful swelling that can eventually result in bone erosion and joint deformity.',
    recommendation: 'Early diagnosis is crucial. See a rheumatologist. Treatment includes DMARDs, biologics, and physical therapy to slow disease progression.',
    severity: 'high',
    areas: ['joints', 'general']
  },
  {
    name: 'Conjunctivitis (Pink Eye)',
    symptoms: ['Red eyes', 'Itchy eyes', 'Eye discharge', 'Watery eyes', 'Swollen eyelids', 'Eye pain', 'Sensitivity to light'],
    description: 'Inflammation of the conjunctiva (the transparent membrane lining the eyelid). Can be caused by viruses, bacteria, or allergies.',
    recommendation: 'Practice good hygiene. Bacterial conjunctivitis may need antibiotic eye drops. Allergic conjunctivitis may respond to antihistamine drops. See an eye doctor if symptoms persist.',
    severity: 'low',
    areas: ['eyes']
  },
  {
    name: 'Otitis Media (Ear Infection)',
    symptoms: ['Ear pain', 'Hearing loss', 'Ear discharge', 'Fever', 'Feeling of fullness', 'Balance problems', 'Headache'],
    description: 'An infection of the middle ear, common in children but can affect adults. Often follows a cold or respiratory infection.',
    recommendation: 'See a doctor for evaluation. Antibiotics may be needed for bacterial infections. Pain management and warm compresses can help with symptoms.',
    severity: 'medium',
    areas: ['ears', 'head']
  },
  {
    name: 'Sciatica',
    symptoms: ['Sciatica', 'Lower back pain', 'Pain radiating to legs', 'Leg pain', 'Numbness in feet', 'Tingling in legs', 'Muscle spasms', 'Difficulty walking'],
    description: 'Pain that radiates along the path of the sciatic nerve, from the lower back through the hips and down each leg. Usually affects one side.',
    recommendation: 'Physical therapy and stretching exercises often help. NSAIDs for pain relief. See a spine specialist if pain is severe or doesn\'t improve in a few weeks.',
    severity: 'medium',
    areas: ['back', 'legs']
  },
  {
    name: 'Fungal Skin Infection',
    symptoms: ['Rash', 'Itching', 'Redness', 'Peeling skin', 'Bumps or lumps', 'Skin discoloration', 'Dry skin'],
    description: 'Infections caused by fungi that affect the skin, hair, or nails. Common types include athlete\'s foot, ringworm, and yeast infections.',
    recommendation: 'Over-the-counter antifungal creams are effective for most cases. Keep the affected area clean and dry. See a dermatologist if it doesn\'t improve or spreads.',
    severity: 'low',
    areas: ['skin', 'legs']
  },
  {
    name: 'Iron Deficiency Anemia',
    symptoms: ['Fatigue', 'General weakness', 'Dizziness', 'Shortness of breath', 'Rapid heartbeat', 'Cold feet', 'Headache', 'Brittle nails', 'Loss of appetite'],
    description: 'A condition where the blood lacks adequate healthy red blood cells due to insufficient iron. It\'s the most common type of anemia.',
    recommendation: 'Get a complete blood count (CBC) test. Iron supplements and dietary changes (red meat, leafy greens, beans) can help. Identify and treat the underlying cause.',
    severity: 'medium',
    areas: ['general', 'head', 'chest', 'legs']
  },
  {
    name: 'Sinusitis',
    symptoms: ['Nasal congestion', 'Pressure in head', 'Headache', 'Post-nasal drip', 'Loss of smell', 'Sore throat', 'Fever', 'Fatigue', 'Cough', 'Ear pain'],
    description: 'Inflammation of the sinuses, often caused by infections, allergies, or structural issues. Can be acute or chronic.',
    recommendation: 'Saline nasal irrigation and decongestants can help. Acute bacterial sinusitis may require antibiotics. See an ENT specialist for chronic or recurring cases.',
    severity: 'low',
    areas: ['nose-throat', 'head', 'ears']
  },
  {
    name: 'Vertigo / Vestibular Disorder',
    symptoms: ['Vertigo', 'Dizziness', 'Balance problems', 'Nausea', 'Vomiting', 'Tinnitus (ringing)', 'Hearing loss', 'Lightheadedness'],
    description: 'A sensation of spinning or loss of balance. Can be caused by inner ear problems (BPPV, Meniere\'s disease) or central nervous system issues.',
    recommendation: 'Consult an ENT specialist or neurologist. Vestibular rehabilitation therapy is often effective. Certain head position maneuvers (Epley maneuver) can help with BPPV.',
    severity: 'medium',
    areas: ['ears', 'head']
  }
];

// ===== Navigation Functions =====

function startDiagnosis() {
  document.getElementById('heroSection').style.display = 'none';
  const historySec = document.getElementById('historySection');
  if (historySec) historySec.style.display = 'none';
  const encyclopediaSec = document.getElementById('encyclopediaSection');
  if (encyclopediaSec) encyclopediaSec.style.display = 'none';

  document.getElementById('diagnosticSection').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetApp() {
  // Reset state
  state.currentStep = 1;
  state.selectedAreas = [];
  state.selectedSymptoms = [];
  state.additionalSymptoms = '';
  state.duration = '';
  state.severity = 5;
  state.notes = '';
  state.uploadedImages = [];
  state.patient = { name: '', age: '', gender: '', weight: '', medicalHistory: '' };
  state.isViewingSaved = false;

  // Reset UI
  const banner = document.getElementById('savedReportBanner');
  if (banner) banner.style.display = 'none';
  
  // Refresh history display on landing page
  loadHistory();

  document.getElementById('heroSection').style.display = '';
  const encyclopediaSec = document.getElementById('encyclopediaSection');
  if (encyclopediaSec) encyclopediaSec.style.display = 'block';

  document.getElementById('diagnosticSection').classList.remove('active');
  document.getElementById('analysisSection').classList.remove('active');
  document.getElementById('resultsSection').classList.remove('active');

  // Reset form fields
  document.getElementById('patientName').value = '';
  document.getElementById('patientAge').value = '';
  document.getElementById('patientGender').value = '';
  document.getElementById('patientWeight').value = '';
  document.getElementById('medicalHistory').value = '';
  document.getElementById('additionalSymptoms').value = '';
  document.getElementById('symptomNotes').value = '';
  document.getElementById('severitySlider').value = 5;
  updateSeverity(5);

  // Reset selections
  document.querySelectorAll('.body-area.selected').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.symptom-chip.selected').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.duration-option.selected').forEach(el => el.classList.remove('selected'));

  // Reset upload
  document.getElementById('uploadPreviews').innerHTML = '';

  // Reset progress
  updateProgress(1);

  // Show step 1
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`step${i}`).style.display = i === 1 ? 'block' : 'none';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Step Navigation =====

function goToStep(step) {
  // Validate current step
  if (step > state.currentStep && !validateStep(state.currentStep)) {
    return;
  }

  // Save current step data
  saveStepData(state.currentStep);

  // Hide current, show next
  const currentCard = document.getElementById(`step${state.currentStep}`);
  const nextCard = document.getElementById(`step${step}`);

  currentCard.style.display = 'none';
  nextCard.style.display = 'block';
  nextCard.classList.add('slide-in');

  setTimeout(() => nextCard.classList.remove('slide-in'), 500);

  state.currentStep = step;
  updateProgress(step);

  // Generate symptoms list when entering step 3
  if (step === 3) {
    generateSymptomsList();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
  switch (step) {
    case 1:
      const age = document.getElementById('patientAge').value;
      if (!age || age < 1 || age > 120) {
        showToast('Please enter a valid age (1-120)');
        return false;
      }
      return true;
    case 2:
      if (state.selectedAreas.length === 0) {
        showToast('Please select at least one affected body area');
        return false;
      }
      return true;
    case 3:
      if (state.selectedSymptoms.length === 0) {
        showToast('Please select at least one symptom');
        return false;
      }
      return true;
    case 4:
      if (!state.duration) {
        showToast('Please select symptom duration');
        return false;
      }
      return true;
    default:
      return true;
  }
}

function saveStepData(step) {
  switch (step) {
    case 1:
      state.patient.name = document.getElementById('patientName').value;
      state.patient.age = document.getElementById('patientAge').value;
      state.patient.gender = document.getElementById('patientGender').value;
      state.patient.weight = document.getElementById('patientWeight').value;
      state.patient.medicalHistory = document.getElementById('medicalHistory').value;
      break;
    case 3:
      state.additionalSymptoms = document.getElementById('additionalSymptoms').value;
      break;
    case 4:
      state.severity = document.getElementById('severitySlider').value;
      state.notes = document.getElementById('symptomNotes').value;
      break;
  }
}

// ===== Progress Bar =====

function updateProgress(step) {
  const labels = ['Patient Information', 'Affected Areas', 'Symptoms', 'Details', 'Image Upload'];
  document.getElementById('progressLabel').textContent = labels[step - 1];

  for (let i = 1; i <= 5; i++) {
    const circle = document.getElementById(`step${i}Circle`);
    circle.classList.remove('active', 'completed');
    if (i < step) {
      circle.classList.add('completed');
      circle.innerHTML = '✓';
    } else if (i === step) {
      circle.classList.add('active');
      circle.innerHTML = i;
    } else {
      circle.innerHTML = i;
    }

    if (i > 1) {
      const line = document.getElementById(`line${i - 1}`);
      line.classList.toggle('active', i <= step);
    }
  }
}

// ===== Body Area Selection =====

function toggleBodyArea(el) {
  el.classList.toggle('selected');
  const area = el.dataset.area;
  if (el.classList.contains('selected')) {
    if (!state.selectedAreas.includes(area)) {
      state.selectedAreas.push(area);
    }
  } else {
    state.selectedAreas = state.selectedAreas.filter(a => a !== area);
  }
}

// ===== Symptoms List =====

function generateSymptomsList() {
  const container = document.getElementById('symptomsList');
  container.innerHTML = '';

  let areas = state.selectedAreas.length > 0 ? state.selectedAreas : Object.keys(symptomDatabase);

  areas.forEach(area => {
    const data = symptomDatabase[area];
    if (!data) return;

    const category = document.createElement('div');
    category.className = 'symptom-category';
    category.innerHTML = `
      <div class="symptom-category__title">${data.label}</div>
      <div class="symptom-grid">
        ${data.symptoms.map(s => `
          <div class="symptom-chip ${state.selectedSymptoms.includes(s) ? 'selected' : ''}"
               onclick="toggleSymptom(this, '${s.replace(/'/g, "\\'")}')"
               data-symptom="${s}">
            <span class="symptom-chip__check">✓</span>
            ${s}
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(category);
  });
}

function toggleSymptom(el, symptom) {
  el.classList.toggle('selected');
  if (el.classList.contains('selected')) {
    if (!state.selectedSymptoms.includes(symptom)) {
      state.selectedSymptoms.push(symptom);
    }
  } else {
    state.selectedSymptoms = state.selectedSymptoms.filter(s => s !== symptom);
  }
}

// ===== Duration Selection =====

function selectDuration(el) {
  document.querySelectorAll('.duration-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  state.duration = el.dataset.duration;
}

// ===== Severity Slider =====

function updateSeverity(val) {
  const labels = ['', '1 — Very Mild', '2 — Mild', '3 — Slight', '4 — Mild-Moderate', '5 — Moderate', '6 — Moderate-High', '7 — High', '8 — Severe', '9 — Very Severe', '10 — Extreme'];
  document.getElementById('severityValue').textContent = labels[val] || val;
}

// ===== Image Upload =====

function handleImageUpload(event) {
  const files = event.target.files;
  const previewContainer = document.getElementById('uploadPreviews');

  Array.from(files).forEach(file => {
    if (file.size > 10 * 1024 * 1024) {
      showToast(`File "${file.name}" exceeds 10MB limit`);
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      state.uploadedImages.push({ name: file.name, data: e.target.result });

      const preview = document.createElement('div');
      preview.className = 'upload-preview';
      const idx = state.uploadedImages.length - 1;
      preview.innerHTML = `
        <img src="${e.target.result}" alt="Uploaded image preview" />
        <button class="upload-preview__remove" onclick="removeImage(${idx}, this)" title="Remove image">✕</button>
      `;
      previewContainer.appendChild(preview);
    };
    reader.readAsDataURL(file);
  });
}

function removeImage(index, btn) {
  state.uploadedImages.splice(index, 1);
  btn.parentElement.remove();
  // Re-index remaining remove buttons
  document.querySelectorAll('.upload-preview__remove').forEach((b, i) => {
    b.setAttribute('onclick', `removeImage(${i}, this)`);
  });
}

// Drag and drop
const uploadZone = document.getElementById('uploadZone');
if (uploadZone) {
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const input = document.getElementById('imageUpload');
    input.files = e.dataTransfer.files;
    handleImageUpload({ target: input });
  });
}

// ===== Analysis =====

function startAnalysis() {
  saveStepData(state.currentStep);

  // Hide diagnostic, show analysis
  document.getElementById('diagnosticSection').classList.remove('active');
  document.getElementById('analysisSection').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const steps = [
    { id: 'analysisStep1', status: 'Processing patient information', duration: 800 },
    { id: 'analysisStep2', status: 'Cross-referencing symptom database', duration: 1200 },
    { id: 'analysisStep3', status: 'Analyzing uploaded images', duration: 1000 },
    { id: 'analysisStep4', status: 'Generating differential diagnosis', duration: 1500 },
    { id: 'analysisStep5', status: 'Compiling recommendations', duration: 800 }
  ];

  const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);
  let elapsed = 0;

  steps.forEach((step, index) => {
    setTimeout(() => {
      // Mark previous as completed
      if (index > 0) {
        const prev = document.getElementById(steps[index - 1].id);
        prev.classList.remove('active');
        prev.classList.add('completed');
        prev.querySelector('.analysis__step-icon').textContent = '✓';
      }

      // Mark current as active
      const current = document.getElementById(step.id);
      current.classList.add('active');
      current.querySelector('.analysis__step-icon').textContent = '⚙️';
      document.getElementById('analysisStatus').textContent = step.status + '...';

      // Update progress bar
      const progressPercent = ((elapsed + step.duration) / totalDuration) * 100;
      document.getElementById('analysisProgressFill').style.width = progressPercent + '%';

    }, elapsed);

    elapsed += step.duration;
  });

  // Final step
  setTimeout(() => {
    const last = document.getElementById(steps[steps.length - 1].id);
    last.classList.remove('active');
    last.classList.add('completed');
    last.querySelector('.analysis__step-icon').textContent = '✓';
    document.getElementById('analysisProgressFill').style.width = '100%';
    document.getElementById('analysisStatus').textContent = 'Analysis complete!';

    setTimeout(() => showResults(), 600);
  }, elapsed);
}

// ===== Results =====

function showResults() {
  document.getElementById('analysisSection').classList.remove('active');
  document.getElementById('resultsSection').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Generate summary
  generateSummary();

  // Generate condition matches
  const matches = analyzeSymptoms();
  renderConditions(matches);

  // Save this analysis session to history
  saveToHistory(matches);
  loadHistory();
}

function generateSummary() {
  const grid = document.getElementById('summaryGrid');
  const durationLabels = {
    'today': 'Just today',
    '2-3days': '2-3 days',
    '1week': 'About 1 week',
    '2weeks': '2 weeks',
    '1month': 'About 1 month',
    'months': 'Several months'
  };

  const items = [
    { label: 'Patient', value: state.patient.name || 'Anonymous' },
    { label: 'Age / Gender', value: `${state.patient.age || 'N/A'} / ${(state.patient.gender || 'N/A').charAt(0).toUpperCase() + (state.patient.gender || 'N/A').slice(1)}` },
    { label: 'Symptoms', value: `${state.selectedSymptoms.length} reported` },
    { label: 'Duration', value: durationLabels[state.duration] || 'Not specified' },
    { label: 'Severity', value: `${state.severity}/10` },
    { label: 'Images', value: `${state.uploadedImages.length} uploaded` }
  ];

  grid.innerHTML = items.map(item => `
    <div class="summary-item">
      <div class="summary-item__label">${item.label}</div>
      <div class="summary-item__value">${item.value}</div>
    </div>
  `).join('');
}

function analyzeSymptoms() {
  const matches = [];

  // Calculate symptom frequencies for TF-IDF style precision weighting
  const symptomFreq = {};
  diseaseDatabase.forEach(d => {
    d.symptoms.forEach(s => {
      symptomFreq[s] = (symptomFreq[s] || 0) + 1;
    });
  });

  const getWeight = (s) => {
    // Rarer symptoms are heavily weighted. Common ones (like 'Fever') count less.
    return 1.0 / (symptomFreq[s] || 1);
  };

  let userTotalWeight = 0;
  state.selectedSymptoms.forEach(s => userTotalWeight += getWeight(s));

  diseaseDatabase.forEach(disease => {
    const matchedSymptoms = state.selectedSymptoms.filter(s => disease.symptoms.includes(s));
    const areaOverlap = state.selectedAreas.filter(a => disease.areas.includes(a));

    if (matchedSymptoms.length === 0 && areaOverlap.length === 0) return;

    let diseaseTotalWeight = 0;
    disease.symptoms.forEach(s => diseaseTotalWeight += getWeight(s));
    
    let matchedWeight = 0;
    matchedSymptoms.forEach(s => matchedWeight += getWeight(s));

    // Calculate match score
    const symptomMatchRatio = matchedWeight / Math.max(diseaseTotalWeight, 0.1);
    const userCoverageRatio = matchedWeight / Math.max(userTotalWeight, 0.1);
    const areaMatchRatio = areaOverlap.length / Math.max(disease.areas.length, 1);

    // Weighted confidence score prioritizing rare, specific symptoms
    let confidence = (symptomMatchRatio * 0.55 + userCoverageRatio * 0.35 + areaMatchRatio * 0.10) * 100;

    // Boost based on severity alignment
    if (state.severity >= 7 && disease.severity === 'high') confidence *= 1.15;
    if (state.severity <= 3 && disease.severity === 'low') confidence *= 1.15;

    // Boost for duration alignment
    if (['months', '1month'].includes(state.duration) && disease.severity === 'high') confidence *= 1.05;

    // Cap at 95%
    confidence = Math.min(confidence, 95);

    // Only include if there's meaningful match (at least 1 rare symptom or multiple common ones)
    if (matchedWeight >= 0.5 || (matchedSymptoms.length >= 1 && areaOverlap.length >= 1)) {
      matches.push({
        ...disease,
        matchedSymptoms,
        confidence: Math.round(confidence),
        areaOverlap
      });
    }
  });

  matches.sort((a, b) => b.confidence - a.confidence);
  return matches.slice(0, 5);
}

function renderConditions(matches) {
  const container = document.getElementById('conditionsList');

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: var(--space-2xl);">
        <div style="font-size: 48px; margin-bottom: var(--space-md);">🤔</div>
        <h3 class="card__title" style="margin-bottom: var(--space-sm);">No Strong Matches Found</h3>
        <p style="color: var(--text-secondary);">
          Based on the symptoms provided, our AI couldn't find a strong match. This could mean the condition is uncommon or more information is needed.
          <br/><br/><strong>We strongly recommend consulting a healthcare professional.</strong>
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = matches.map((match, index) => {
    const confidenceClass = match.confidence >= 60 ? 'high' : match.confidence >= 35 ? 'medium' : 'low';

    // Separate matched and common symptoms
    const otherSymptoms = match.symptoms.filter(s => !match.matchedSymptoms.includes(s)).slice(0, 5);

    return `
      <div class="condition-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.15}s both;">
        <div class="condition-card__header">
          <div class="condition-card__name">
            <span class="condition-card__rank">${index + 1}</span>
            ${match.name}
          </div>
          <div class="condition-card__confidence">
            <div>
              <div class="condition-card__confidence-value ${confidenceClass}">${match.confidence}%</div>
              <div class="condition-card__confidence-label">Match</div>
            </div>
          </div>
        </div>

        <div class="condition-card__bar">
          <div class="condition-card__bar-fill ${confidenceClass}" style="width: ${match.confidence}%"></div>
        </div>

        <div class="condition-card__body">
          <div>
            <div class="condition-card__section-title">Description</div>
            <p class="condition-card__description">${match.description}</p>
          </div>

          <div>
            <div class="condition-card__section-title">Your Matching Symptoms</div>
            <div class="condition-card__symptoms">
              ${match.matchedSymptoms.map(s => `<span class="condition-card__symptom-tag matched">✓ ${s}</span>`).join('')}
              ${otherSymptoms.map(s => `<span class="condition-card__symptom-tag common">${s}</span>`).join('')}
            </div>
          </div>

          <div class="condition-card__recommendation">
            <strong>💡 Recommendation:</strong> ${match.recommendation}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Animate confidence bars
  setTimeout(() => {
    document.querySelectorAll('.condition-card__bar-fill').forEach(bar => {
      bar.style.width = bar.style.width; // trigger reflow animation
    });
  }, 100);
}

// ===== History Management =====

function saveToHistory(matches) {
  if (state.isViewingSaved) return;

  const historyItem = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    patient: { ...state.patient },
    selectedAreas: [...state.selectedAreas],
    selectedSymptoms: [...state.selectedSymptoms],
    additionalSymptoms: state.additionalSymptoms,
    duration: state.duration,
    severity: state.severity,
    notes: state.notes,
    hasImages: state.uploadedImages.length > 0,
    imageCount: state.uploadedImages.length,
    topMatch: matches && matches.length > 0 ? {
      name: matches[0].name,
      confidence: matches[0].confidence,
      severity: matches[0].severity
    } : null
  };

  try {
    const history = JSON.parse(localStorage.getItem('mediscan_history') || '[]');
    history.unshift(historyItem);
    if (history.length > 10) history.pop(); // limit to last 10 entries
    localStorage.setItem('mediscan_history', JSON.stringify(history));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

function loadHistory() {
  const historyList = JSON.parse(localStorage.getItem('mediscan_history') || '[]');
  const historySection = document.getElementById('historySection');
  const historyGrid = document.getElementById('historyGrid');

  if (!historySection || !historyGrid) return;

  if (historyList.length === 0) {
    historySection.style.display = 'none';
    return;
  }

  historySection.style.display = 'block';
  historyGrid.innerHTML = historyList.map(item => {
    const initials = item.patient.name ? item.patient.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '👤';
    const ageGenderText = [
      item.patient.age ? `${item.patient.age} y/o` : '',
      item.patient.gender ? item.patient.gender.charAt(0).toUpperCase() + item.patient.gender.slice(1) : ''
    ].filter(Boolean).join(' • ');

    const resultBadgeClass = item.topMatch ? item.topMatch.severity : 'low';
    const resultNameText = item.topMatch ? `${item.topMatch.name} (${item.topMatch.confidence}%)` : 'No Match';

    const symptomsPreview = item.selectedSymptoms.slice(0, 3).map(s => `
      <span class="history-card__symptom-dot">${s}</span>
    `).join('') + (item.selectedSymptoms.length > 3 ? `<span class="history-card__symptom-dot">+${item.selectedSymptoms.length - 3}</span>` : '');

    return `
      <div class="history-card" onclick="loadHistoryItem('${item.id}')">
        <div class="history-card__avatar">${initials}</div>
        <div class="history-card__info">
          <div class="history-card__name">
            ${item.patient.name || 'Anonymous Patient'}
            ${ageGenderText ? `<span class="history-card__tag">${ageGenderText}</span>` : ''}
          </div>
          <div class="history-card__meta">
            <span>📅 ${item.date}</span>
            <span>🌡️ Severity: ${item.severity}/10</span>
          </div>
          <div class="history-card__symptoms-preview">
            ${symptomsPreview}
          </div>
        </div>
        <div class="history-card__actions">
          <span class="history-card__result-badge ${resultBadgeClass}">${resultNameText}</span>
        </div>
        <div class="history-card__arrow">→</div>
        <button class="history-card__delete" onclick="deleteHistoryItem('${item.id}', event)" title="Delete entry">✕</button>
      </div>
    `;
  }).join('');
}

function loadHistoryItem(id) {
  const historyList = JSON.parse(localStorage.getItem('mediscan_history') || '[]');
  const item = historyList.find(x => x.id === id);
  if (!item) return;

  // Populate state
  state.patient = { ...item.patient };
  state.selectedAreas = [...item.selectedAreas];
  state.selectedSymptoms = [...item.selectedSymptoms];
  state.additionalSymptoms = item.additionalSymptoms || '';
  state.duration = item.duration || '';
  state.severity = item.severity || 5;
  state.notes = item.notes || '';
  state.uploadedImages = [];
  state.isViewingSaved = true;

  // Show results screen
  document.getElementById('heroSection').style.display = 'none';
  const historySec = document.getElementById('historySection');
  if (historySec) historySec.style.display = 'none';
  const encyclopediaSec = document.getElementById('encyclopediaSection');
  if (encyclopediaSec) encyclopediaSec.style.display = 'none';

  document.getElementById('diagnosticSection').classList.remove('active');
  document.getElementById('analysisSection').classList.remove('active');
  document.getElementById('resultsSection').classList.add('active');

  let banner = document.getElementById('savedReportBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'savedReportBanner';
    banner.style.cssText = `
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: var(--radius-lg);
      padding: var(--space-md) var(--space-lg);
      margin-bottom: var(--space-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.88rem;
      color: var(--accent-primary-light);
      font-family: 'Inter', sans-serif;
    `;
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.insertBefore(banner, resultsSection.firstChild);
  }
  banner.innerHTML = `
    <span>📅 Viewing saved diagnostic report from <strong>${item.date}</strong></span>
    <button class="btn btn--secondary" style="padding: 6px 14px; font-size: 0.75rem;" onclick="editFromHistory()">Use Info for New Check</button>
  `;
  banner.style.display = 'flex';

  generateSummary();
  const matches = analyzeSymptoms();
  renderConditions(matches);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function editFromHistory() {
  const banner = document.getElementById('savedReportBanner');
  if (banner) banner.style.display = 'none';

  state.isViewingSaved = false;

  document.getElementById('resultsSection').classList.remove('active');
  document.getElementById('diagnosticSection').classList.add('active');

  // Populate UI
  document.getElementById('patientName').value = state.patient.name;
  document.getElementById('patientAge').value = state.patient.age;
  document.getElementById('patientGender').value = state.patient.gender;
  document.getElementById('patientWeight').value = state.patient.weight;
  document.getElementById('medicalHistory').value = state.patient.medicalHistory;
  document.getElementById('additionalSymptoms').value = state.additionalSymptoms;
  document.getElementById('symptomNotes').value = state.notes;
  document.getElementById('severitySlider').value = state.severity;
  updateSeverity(state.severity);

  document.querySelectorAll('.body-area').forEach(el => {
    const area = el.dataset.area;
    el.classList.toggle('selected', state.selectedAreas.includes(area));
  });

  document.querySelectorAll('.duration-option').forEach(el => {
    const dur = el.dataset.duration;
    el.classList.toggle('selected', state.duration === dur);
  });

  state.currentStep = 1;
  updateProgress(1);
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`step${i}`).style.display = i === 1 ? 'block' : 'none';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteHistoryItem(id, event) {
  if (event) event.stopPropagation();

  let historyList = JSON.parse(localStorage.getItem('mediscan_history') || '[]');
  historyList = historyList.filter(x => x.id !== id);
  localStorage.setItem('mediscan_history', JSON.stringify(historyList));
  loadHistory();
  showSuccessToast('Entry deleted successfully');
}

function clearHistory() {
  if (confirm('Are you sure you want to clear all diagnostic history?')) {
    localStorage.removeItem('mediscan_history');
    loadHistory();
    showSuccessToast('All history cleared');
  }
}

// ===== Disease Encyclopedia =====

let currentCategoryFilter = 'all';

function initEncyclopedia() {
  const categoryContainer = document.getElementById('encyclopediaCategories');
  const gridContainer = document.getElementById('encyclopediaGrid');

  if (!categoryContainer || !gridContainer) return;

  const categories = [
    { id: 'all', label: '🌐 All Conditions' },
    { id: 'head', label: '🧠 Head' },
    { id: 'eyes', label: '👁️ Eyes' },
    { id: 'ears', label: '👂 Ears' },
    { id: 'nose-throat', label: '👃 Nose & Throat' },
    { id: 'chest', label: '🫁 Chest' },
    { id: 'abdomen', label: '🫃 Abdomen' },
    { id: 'skin', label: '🖐️ Skin' },
    { id: 'joints', label: '🦴 Joints' },
    { id: 'back', label: '🔙 Back' },
    { id: 'legs', label: '🦵 Legs & Feet' },
    { id: 'general', label: '🌡️ General' },
    { id: 'mental', label: '🧘 Mental' }
  ];

  categoryContainer.innerHTML = categories.map(cat => `
    <button class="encyclopedia__cat-btn ${cat.id === 'all' ? 'active' : ''}" 
            data-cat="${cat.id}" 
            onclick="setEncyclopediaCategory('${cat.id}')">
      ${cat.label}
    </button>
  `).join('');

  renderEncyclopediaGrid(diseaseDatabase);
}

function renderEncyclopediaGrid(diseases) {
  const gridContainer = document.getElementById('encyclopediaGrid');
  
  if (diseases.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-xl); color: var(--text-secondary);">
        🔍 No matching conditions found in our database.
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = diseases.map(disease => {
    const areaLabel = disease.areas.map(a => {
      const dbArea = symptomDatabase[a];
      return dbArea ? dbArea.label : a;
    }).join(', ');

    const symptomsPreview = disease.symptoms.slice(0, 3).map(s => `
      <span class="disease-card__symptom-mini">${s}</span>
    `).join('') + (disease.symptoms.length > 3 ? `<span class="disease-card__symptom-mini">+${disease.symptoms.length - 3}</span>` : '');

    return `
      <div class="disease-card" data-severity="${disease.severity}" onclick="openDiseaseModal('${disease.name.replace(/'/g, "\\'")}')">
        <div class="disease-card__name">${disease.name}</div>
        <div class="disease-card__category">${areaLabel}</div>
        <div class="disease-card__desc">${disease.description}</div>
        <div class="disease-card__symptoms-row">
          ${symptomsPreview}
        </div>
      </div>
    `;
  }).join('');
}

function setEncyclopediaCategory(catId) {
  currentCategoryFilter = catId;
  document.querySelectorAll('.encyclopedia__cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === catId);
  });
  filterEncyclopedia();
}

function filterEncyclopedia() {
  const query = document.getElementById('encyclopediaSearch').value.toLowerCase().trim();

  const filtered = diseaseDatabase.filter(disease => {
    const matchesCategory = currentCategoryFilter === 'all' || disease.areas.includes(currentCategoryFilter);
    if (!matchesCategory) return false;

    if (!query) return true;

    const matchesName = disease.name.toLowerCase().includes(query);
    const matchesDesc = disease.description.toLowerCase().includes(query);
    const matchesSymptoms = disease.symptoms.some(s => s.toLowerCase().includes(query));

    return matchesName || matchesDesc || matchesSymptoms;
  });

  renderEncyclopediaGrid(filtered);
}

// Modal management
function openDiseaseModal(name) {
  const disease = diseaseDatabase.find(d => d.name === name);
  if (!disease) return;

  const modal = document.getElementById('diseaseModal');
  const bar = document.getElementById('modalSeverityBar');
  
  bar.className = 'modal__severity-bar ' + disease.severity;
  document.getElementById('modalTitle').textContent = disease.name;
  
  const areaLabels = disease.areas.map(a => {
    const dbArea = symptomDatabase[a];
    return dbArea ? dbArea.label : a;
  }).join(', ');
  document.getElementById('modalCategory').textContent = areaLabels + ` • Severity: ${disease.severity.toUpperCase()}`;

  document.getElementById('modalDescription').textContent = disease.description;
  document.getElementById('modalRecommendation').textContent = disease.recommendation;

  const symptomsList = document.getElementById('modalSymptoms');
  symptomsList.innerHTML = disease.symptoms.map(s => `<li>${s}</li>`).join('');

  const tagsList = document.getElementById('modalAreas');
  tagsList.innerHTML = disease.areas.map(a => {
    const dbArea = symptomDatabase[a];
    return `<span class="modal__tag">${dbArea ? dbArea.label : a}</span>`;
  }).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDiseaseModalDirect() {
  const modal = document.getElementById('diseaseModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeDiseaseModal(event) {
  if (event.target === document.getElementById('diseaseModal')) {
    closeDiseaseModalDirect();
  }
}

// ===== Utility Functions =====

function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(239, 68, 68, 0.95);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 500;
    z-index: 9999;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
    opacity: 0;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
  `;
  toast.textContent = '⚠️ ' + message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function printResults() {
  window.print();
}

function downloadReport() {
  // Generate a text-based report
  const lines = [];
  lines.push('═══════════════════════════════════════════');
  lines.push('        MEDISCAN AI — DIAGNOSTIC REPORT');
  lines.push('═══════════════════════════════════════════');
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);
  lines.push(`Time: ${new Date().toLocaleTimeString()}`);
  lines.push('');
  lines.push('── PATIENT INFORMATION ──');
  lines.push(`Name: ${state.patient.name || 'Anonymous'}`);
  lines.push(`Age: ${state.patient.age || 'N/A'}`);
  lines.push(`Gender: ${state.patient.gender || 'N/A'}`);
  lines.push(`Weight: ${state.patient.weight ? state.patient.weight + ' kg' : 'N/A'}`);
  lines.push(`Medical History: ${state.patient.medicalHistory || 'None specified'}`);
  lines.push('');
  lines.push('── REPORTED SYMPTOMS ──');
  state.selectedSymptoms.forEach(s => lines.push(`  • ${s}`));
  if (state.additionalSymptoms) {
    lines.push(`  Additional: ${state.additionalSymptoms}`);
  }
  lines.push(`Duration: ${state.duration || 'Not specified'}`);
  lines.push(`Severity: ${state.severity}/10`);
  if (state.notes) {
    lines.push(`Notes: ${state.notes}`);
  }
  lines.push('');
  lines.push('── AI ANALYSIS RESULTS ──');

  const matches = analyzeSymptoms();
  if (matches.length === 0) {
    lines.push('No strong matches found. Please consult a healthcare professional.');
  } else {
    matches.forEach((match, i) => {
      lines.push('');
      lines.push(`#${i + 1} — ${match.name} (${match.confidence}% match)`);
      lines.push(`   ${match.description}`);
      lines.push(`   Matched symptoms: ${match.matchedSymptoms.join(', ')}`);
      lines.push(`   Recommendation: ${match.recommendation}`);
    });
  }

  lines.push('');
  lines.push('═══════════════════════════════════════════');
  lines.push('DISCLAIMER: This report is AI-generated for');
  lines.push('informational purposes only. It does NOT');
  lines.push('constitute medical advice. Always consult a');
  lines.push('qualified healthcare professional.');
  lines.push('═══════════════════════════════════════════');

  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MediScan_Report_${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);

  showSuccessToast('Report downloaded successfully!');
}

function showSuccessToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(16, 185, 129, 0.95);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 500;
    z-index: 9999;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
    opacity: 0;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
  `;
  toast.textContent = '✅ ' + message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== General Modals =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModalDirect(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModalOnOverlay(modalId, event) {
  if (event.target === document.getElementById(modalId)) {
    closeModalDirect(modalId);
  }
}

// ===== FAQ Accordion =====
function toggleFaq(item) {
  const answer = item.querySelector('.faq-item__answer');
  const toggle = item.querySelector('.faq-item__toggle');
  
  if (item.classList.contains('active')) {
    item.classList.remove('active');
    answer.style.maxHeight = null;
    toggle.style.transform = 'rotate(0deg)';
  } else {
    // Close others
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('active');
      el.querySelector('.faq-item__answer').style.maxHeight = null;
      el.querySelector('.faq-item__toggle').style.transform = 'rotate(0deg)';
    });
    
    item.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + "px";
    toggle.style.transform = 'rotate(180deg)';
  }
}

// ===== Onboarding Wizard =====
let currentOnboardingSlide = 0;

function checkOnboarding() {
  const hasOnboarded = localStorage.getItem('mediscan_consent');
  if (!hasOnboarded) {
    document.getElementById('onboardingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    updateOnboardingUI();
  } else {
    document.getElementById('startDiagnosisBtn').disabled = false;
  }
}

function toggleOnboardingAgree(checked) {
  if (checked) {
    localStorage.setItem('mediscan_consent', 'true');
    closeModalDirect('onboardingModal');
    document.getElementById('startDiagnosisBtn').disabled = false;
    document.getElementById('disclaimerConsent').checked = true;
  }
}

function toggleConsent(checked) {
  document.getElementById('startDiagnosisBtn').disabled = !checked;
  if (checked) {
    localStorage.setItem('mediscan_consent', 'true');
  } else {
    localStorage.removeItem('mediscan_consent');
  }
}

function nextOnboarding() {
  if (currentOnboardingSlide < 2) {
    currentOnboardingSlide++;
    updateOnboardingUI();
  } else {
    // On the last slide, prompt them to check the box
    const cb = document.getElementById('onboardingConsentCheck');
    if (!cb.checked) {
      showToast("Please agree to the terms to proceed.");
      cb.parentElement.style.animation = "shake 0.5s";
      setTimeout(() => cb.parentElement.style.animation = "", 500);
    }
  }
}

function prevOnboarding() {
  if (currentOnboardingSlide > 0) {
    currentOnboardingSlide--;
    updateOnboardingUI();
  }
}

function goOnboardingSlide(index) {
  currentOnboardingSlide = index;
  updateOnboardingUI();
}

function updateOnboardingUI() {
  document.querySelectorAll('.onboarding-slide').forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentOnboardingSlide);
  });
  
  document.querySelectorAll('.onboarding-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentOnboardingSlide);
  });

  const prevBtn = document.getElementById('onboardingPrevBtn');
  prevBtn.style.visibility = currentOnboardingSlide === 0 ? 'hidden' : 'visible';

  const nextBtn = document.getElementById('onboardingNextBtn');
  if (currentOnboardingSlide === 2) {
    nextBtn.textContent = "Finish";
  } else {
    nextBtn.textContent = "Next →";
  }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  updateSeverity(5);
  loadHistory();
  initEncyclopedia();
  
  // Set initial FAQ state logic if needed
  checkOnboarding();
  
  const existingConsent = localStorage.getItem('mediscan_consent');
  if (existingConsent) {
    const cb = document.getElementById('disclaimerConsent');
    if (cb) cb.checked = true;
    const startBtn = document.getElementById('startDiagnosisBtn');
    if (startBtn) startBtn.disabled = false;
  }
});
