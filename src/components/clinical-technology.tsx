import Link from 'next/link';

const clinicalInformation = [
 { title: 'Invisalign & Invisalign Go', note: 'Provider credentials to confirm', text: 'Supplied brand material reports Invisalign, Invisalign Go and Invisalign First provider credentials. These systems use digitally planned, removable aligners. Confirm current provider status and available systems with your clinic.' },
 { title: '3D iTero digital scanning', note: 'Availability varies by branch', text: 'Intraoral scans can support treatment planning, orthodontic assessment and smile visualization. The supplied material mentions iTero technology; scanner availability needs confirmation at your chosen branch.' },
 { title: 'Precisalign Clear Aligner Partner', note: 'Reported partnership', text: 'The supplied material describes Lara Smiles as an authorized Precisalign provider. Current authorization and participating locations have not been confirmed. Ask your clinic about available aligner options.' },
 { title: 'Dental practitioner licensing', note: 'Individual registrations to verify', text: 'The supplied material describes care by BDS/MDS dental professionals registered with the appropriate dental regulatory authorities. Individual qualifications and registrations have not been verified here.' },
] as const;

export function ClinicalTechnology() {
 return <section id="clinical-technology" className="section clinical-technology-section" aria-labelledby="clinical-technology-title">
  <div className="container">
   <div className="clinical-technology-heading">
    <div><p className="eyebrow">Clinical practice</p><h2 id="clinical-technology-title">Clinical credentials<br/><em>&amp; technology.</em></h2></div>
    <p>Reported in the supplied brand material. These credentials and technologies have not been verified as available across every Lara Smiles location.</p>
   </div>
   <div className="clinical-technology-grid">{clinicalInformation.map(item => <article className="clinical-technology-card" key={item.title}>
    <h3>{item.title}</h3><p>{item.text}</p><span className="clinical-technology-note">{item.note}</span>
   </article>)}</div>
   <div className="clinical-technology-footer"><p>Before arranging treatment, confirm current provider credentials, equipment and practitioner registration with your clinic.</p><Link href="/branches" className="text-link">Ask your clinic</Link></div>
  </div>
 </section>;
}
