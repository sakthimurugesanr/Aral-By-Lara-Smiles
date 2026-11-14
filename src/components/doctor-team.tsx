import Image from 'next/image';
import Link from 'next/link';
import { branches } from '@/lib/branches';
import { doctors, branchesWithoutNamedDoctors } from '@/lib/doctors';

export function DoctorTeam() {
 return <section id="team" className="section branch-doctor-section" aria-labelledby="branch-doctor-title"><div className="container">
  <div className="branch-doctor-heading"><div><p className="eyebrow">Familiar faces. Local care.</p><h2 id="branch-doctor-title">People behind <em>the care.</em></h2></div><p>Meet the doctors publicly mentioned in the supplied branch information. Please confirm the current consulting team and availability with your clinic.</p></div>
  <div className="branch-doctor-grid">{doctors.map(doctor => {
   const branch = branches.find(item => item.slug === doctor.branchSlug)!;
   return <article className="branch-doctor-card" key={doctor.slug}>
    <div className="branch-doctor-portrait">{doctor.portrait ? <Image src={doctor.portrait} alt={doctor.name} fill sizes="(max-width: 760px) 90vw, (max-width: 1000px) 45vw, 30vw"/> : <><span className="branch-doctor-initials" aria-hidden="true">{doctor.initials}</span><span className="branch-doctor-photo-note">Portrait to be added</span></>}</div>
    <div className="branch-doctor-copy"><h3>{doctor.name}</h3>{doctor.role && <span className="branch-doctor-role">{doctor.role}</span>}<Link className="branch-doctor-location" href={'/branches#' + branch.slug}>{branch.slug === 'rakkiyapalayam' ? 'ARAL · Rakkiyapalayam' : branch.name}<span>{branch.city}, {branch.state}</span></Link><p>Publicly mentioned at this branch. Qualifications and registration details await clinic verification.</p><Link className="branch-doctor-enquiry" href={'/book-appointment?branch=' + branch.slug}>Enquire at this clinic</Link></div>
   </article>;
  })}</div>
  <div className="unnamed-branch-teams"><div><h3>Teams at our other locations</h3><p>Individual doctor names have not been confirmed for these branches.</p></div><ul>{branchesWithoutNamedDoctors.map(branch => <li key={branch.slug}><Link href={'/branches#' + branch.slug}><strong>{branch.name} · {branch.city}</strong><span>Names not confirmed</span></Link></li>)}</ul></div>
 </div></section>;
}
