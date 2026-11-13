export type PatientReview = { name: string; text: string; excerpt?: boolean };

// Google review text supplied by the clinic. No ratings or missing sentences inferred.
export const patientReviews: PatientReview[] = [
  { name: 'suhail M', text: 'I had a really good experience with Dr. Senthamil Selvi. She did my root canal treatment and fixed the dental cap very neatly. The whole procedure was handled with great care and patience.', excerpt: true },
  { name: 'Parvez (Parvez)', text: 'Sometimes, what makes a doctor really special isn’t just the treatment, but how they make you feel heard.', excerpt: true },
  { name: 'Vanitha Gunasekaran', text: 'I have lot of pain inmy teeth. Then I met Dr. Senthamil selvi. Her advice and approch was very nice. Her treatment also very good. After her treatment my teeth pain was gone. Realy i very thankful to her.' },
  { name: 'Muneeswari Jeganathan', text: 'I took my daughter with full of pain Doctor advice me to do root canal treatment for her and Fully satisfied with your treatment and guidance. I also refer other people who need correct guidance and good treatment. Thankyou.' },
  { name: 'Golden Gopi', text: 'Very very satisfied treatment in lara smiles 😊 and good hospitality doctor very clear explanation to patient good response thank u to treatment in lara smiles' },
  { name: 'Rani Manickam', text: 'I understand well...very excellent consulting....\nShe is very good explaing to Comparing other dental doctors....\nI feel so good and cleared...' },
  { name: 'Kalai Kaleesh', text: 'Na inaikutha first time clinic vantha senthamil selvi mam care panni nalla treatment pakranga. All is good.' },
  { name: 'Selva Kousi', text: 'Doctor is very kind and treatment is also very good.\nI feel very good about procedure that I have done.' },
  { name: 'Salam Abdul', text: 'Having Excellent treatment experience with Dr.Roshini explain me a very well. Clearly understand what problem I am having. She is friendly and Assistant also taking good care of me.I am suggesting everyone who need to know exact solution. Thankyou' },
];
