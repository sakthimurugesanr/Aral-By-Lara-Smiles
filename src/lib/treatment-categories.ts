export const treatmentCategories = [
  { name: 'Orthodontics', summary: 'Invisalign, Invisalign Go, clear aligners, transparent and traditional braces, consultations, adjustments and removal.' },
  { name: 'Cosmetic dentistry', summary: 'Teeth whitening and bleaching, porcelain veneers, tooth reshaping, smile makeovers and digital smile designing.' },
  { name: 'Restorative dentistry', summary: 'Cavity fillings, aesthetic restorations, crowns and bridges, including zirconia and ceramic options.' },
  { name: 'Endodontics', summary: 'Root canal treatment (RCT). Discuss anaesthesia, comfort and your individual care plan with your dentist.' },
  { name: 'Implant dentistry', summary: 'Dental implants and implant consultations.' },
  { name: 'Prosthodontics', summary: 'Removable partial dentures, full-mouth rehabilitation and maxillofacial prosthetics.' },
  { name: 'Oral surgery', summary: 'Wisdom tooth extraction, routine extractions and minor oral surgery.' },
  { name: 'Preventive dentistry', summary: 'Scaling, teeth cleaning, check-ups, bleeding gum care and sensitivity treatment.' },
  { name: 'Pediatric dentistry', summary: 'Children’s check-ups, pediatric cavity care and guidance for family dental care.' },
  { name: 'Digital dentistry', summary: '3D scanning, iTero intraoral scans, digital smile planning and dental X-rays.' },
  { name: 'Other services', summary: 'Dental laser procedures, emergency dental care and general consultations.' },
] as const;

export type TreatmentCategory = (typeof treatmentCategories)[number]['name'];
