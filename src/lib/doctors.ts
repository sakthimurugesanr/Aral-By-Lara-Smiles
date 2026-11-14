import { branches } from './branches';

export type DoctorProfile = {
 slug: string;
 name: string;
 initials: string;
 branchSlug: string;
 portrait: string | null;
 role?: string;
};

// Add a clinic-supplied portrait path here when the named doctor's photo is ready.
export const doctors: DoctorProfile[] = [
 { slug: 'abhishikth-suresh', role: 'Founder & CEO', name: 'Dr. Abhishikth Suresh', initials: 'AS', branchSlug: 'gandhi-nagar', portrait: '/images/team/abhishikth-suresh.webp' },
 { slug: 'sendoor', name: 'Dr. Sendoor', initials: 'S', branchSlug: 'gandhi-nagar', portrait: null },
 { slug: 'roshini', name: 'Dr. Roshini', initials: 'R', branchSlug: 'rakkiyapalayam', portrait: null },
];

export const branchesWithoutNamedDoctors = branches.filter(branch => !doctors.some(doctor => doctor.branchSlug === branch.slug));
