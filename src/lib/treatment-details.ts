export type TreatmentStep = { title: string; text: string };
export const treatmentProcesses: Record<string, TreatmentStep[]> = {
 'clear-aligners': [
  {title:'Assess your teeth and bite',text:'Your dentist examines your oral health and may use photographs, scans or impressions to assess whether aligners are suitable.'},
  {title:'Plan your tooth movements',text:'Discuss a proposed sequence of movement, estimated timing, costs, limitations and alternatives. Digital scanning depends on branch availability.'},
  {title:'Wear and review your aligners',text:'Wear each prescribed set as directed, remove it for meals and cleaning, and attend progress reviews. Your dentist may adjust the plan.'},
  {title:'Maintain your new alignment',text:'After active treatment, retainers and follow-up care help maintain tooth position. Your dentist explains your individual retention schedule.'}],
 'braces': [
  {title:'Examination and records',text:'Your dentist assesses the bite and gathers appropriate records before discussing metal or ceramic braces and other options.'},
  {title:'Fit the brackets and wires',text:'Brackets are attached to the teeth and connected with an orthodontic wire. Your team explains cleaning, eating and comfort advice.'},
  {title:'Review and adjust',text:'Regular appointments allow your clinician to monitor movement and adjust the appliance. The schedule depends on your care plan.'},
  {title:'Remove braces and retain',text:'When treatment goals are reached, the braces are removed and a retainer plan is discussed. Continued dental care remains important.'}],
 'dental-implants': [
  {title:'Check suitability',text:'An assessment considers bone support, gum health, medical history and imaging. Your dentist explains risks and alternative tooth replacements.'},
  {title:'Plan and place the implant',text:'For suitable patients, an implant is placed surgically under an agreed anaesthetic plan. Additional procedures may be needed in some cases.'},
  {title:'Allow healing and review',text:'The implant and surrounding tissues are monitored during healing. Timing varies with your clinical situation.'},
  {title:'Restore and maintain',text:'When appropriate, a crown, bridge or other restoration is fitted. Regular review and careful cleaning support ongoing maintenance.'}],
 'root-canal': [
  {title:'Assess the affected tooth',text:'An examination and appropriate imaging help identify the problem and whether root canal treatment is a suitable option.'},
  {title:'Anaesthetise and clean',text:'Local anaesthesia is usually used. The dentist accesses the tooth, removes infected pulp and cleans and shapes the canals.'},
  {title:'Fill and seal the canals',text:'The cleaned canals are filled and sealed. A temporary filling may be used between appointments; more than one visit may be needed.'},
  {title:'Protect and review the tooth',text:'A final restoration or crown may be recommended to protect the tooth. Follow-up checks assess healing and function.'}],
 'smile-designing': [
  {title:'Talk about your goals',text:'Share what you would like to change. Your dentist checks oral health and discusses expectations without promising a particular result.'},
  {title:'Explore suitable options',text:'Photographs, records or a preview may help explain options such as alignment, whitening, veneers or restorative care.'},
  {title:'Agree a staged plan',text:'The plan covers suitability, limitations, risks, alternatives, costs and any sequence of treatments. Oral health needs come first.'},
  {title:'Review and care for your smile',text:'The team reviews the agreed treatment and provides advice on cleaning, maintenance and any future appointments.'}],
 'teeth-whitening': [
  {title:'Examine teeth and staining',text:'Your dentist assesses oral health and the cause of discolouration. Whitening affects natural teeth differently from fillings, crowns or dentures.'},
  {title:'Choose a dentist-guided approach',text:'Discuss the available method, expected limitations, sensitivity and instructions. Whitening may not be appropriate for everyone.'},
  {title:'Whiten as prescribed',text:'Treatment uses a professionally prescribed whitening system. If a home system is provided, follow your dentist’s instructions carefully.'},
  {title:'Review shade and sensitivity',text:'Your dentist reviews your response and advises on any sensitivity and maintenance. Results and the need for future treatment vary.'}],
 'veneers': [
  {title:'Check suitability and alternatives',text:'An assessment considers your tooth structure, bite, gums and goals. Discuss less invasive options where appropriate.'},
  {title:'Plan shape and shade',text:'Your dentist discusses materials and appearance. Some veneers require permanent removal of enamel, which is explained before you decide.'},
  {title:'Prepare and fit',text:'Where needed, the teeth are prepared and records are taken. Veneers are checked for fit and appearance before being attached.'},
  {title:'Review your bite and care',text:'The team checks comfort and bite, and explains cleaning and maintenance. Veneers may need repair or replacement over time.'}],
 'crowns-bridges-dentures': [
  {title:'Compare restoration choices',text:'Your dentist assesses teeth, gums and missing spaces, then explains whether a crown, bridge, denture or another option may be suitable.'},
  {title:'Prepare and take records',text:'The preparation depends on the chosen restoration. Scans or impressions may be taken; a temporary restoration may be needed.'},
  {title:'Try and fit the restoration',text:'Fit, bite and appearance are checked. Adjustments may be needed before or after the final restoration is provided.'},
  {title:'Learn everyday maintenance',text:'Receive cleaning instructions and a review plan. Removable dentures and fixed restorations have different maintenance needs.'}],
 'gum-care': [
  {title:'Assess gum health',text:'The dentist examines your gums and checks for plaque, deposits, inflammation and any signs that need further investigation.'},
  {title:'Remove deposits',text:'Professional cleaning removes plaque and hardened deposits. Deeper gum treatment may be advised depending on the assessment.'},
  {title:'Build a home-care routine',text:'Your team explains brushing and cleaning between teeth, adapted to your mouth and any gum concerns.'},
  {title:'Review your response',text:'Follow-up checks help assess gum health and decide on further care or an appropriate maintenance interval.'}],
 'wisdom-teeth': [
  {title:'Assess whether removal is needed',text:'Your dentist reviews symptoms, tooth position and appropriate imaging. Not every wisdom tooth needs to be removed.'},
  {title:'Discuss the procedure and risks',text:'Review alternatives, anaesthesia, possible nerve or sinus-related risks where relevant, and whether referral is appropriate.'},
  {title:'Remove the tooth if indicated',text:'The tooth is removed using the agreed approach. Some extractions require a surgical procedure or stitches.'},
  {title:'Follow recovery advice',text:'The clinic provides advice on bleeding, swelling, cleaning and when to seek help. Attend a review if recommended.'}],
 'pediatric-dentistry': [
  {title:'A gentle introduction',text:'The visit begins with an age-appropriate conversation with the child and parent or carer, helping explain what will happen.'},
  {title:'Check growth and oral health',text:'The dentist examines teeth, gums and development, and discusses brushing, diet and any concerns.'},
  {title:'Plan preventive or dental care',text:'Advice or treatment is tailored to the child’s needs. Options, consent and comfort measures are discussed with the parent or carer.'},
  {title:'Support healthy habits',text:'Receive practical home-care guidance and an individual review schedule as your child’s teeth develop.'}],
 'emergency-care': [
  {title:'Call for triage and availability',text:'Describe the concern to the clinic. If you have breathing difficulty, severe facial swelling or uncontrolled bleeding, seek urgent hospital care.'},
  {title:'Assess the urgent problem',text:'If a visit is available, your dentist examines the affected area and considers any appropriate tests or imaging.'},
  {title:'Provide appropriate initial care',text:'Treatment depends on the cause. Options and consent are discussed; an urgent visit may address the immediate problem rather than complete all treatment.'},
  {title:'Arrange follow-up care',text:'Your dentist explains what to watch for and whether further restorative treatment, monitoring or referral is needed.'}],
};
