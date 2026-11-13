import { z } from 'zod';
import { branches, treatments } from './content';
export const appointmentSchema = z.object({
 name: z.string().trim().min(2, 'Please enter your full name.').max(100),
 phone: z.string().trim().regex(/^(?:\+91[ -]?|0)?[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number.'),
 email: z.union([z.email('Please enter a valid email.'), z.literal('')]),
 branch: z.string().refine(v => branches.some(b=>b.slug===v), 'Choose a clinic.'),
 treatment: z.string().refine(v=>v==='consultation'||treatments.some(t=>t.slug===v), 'Choose a treatment.'),
 date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose your preferred date.').refine(v=>{ const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()); return v >= today && !Number.isNaN(Date.parse(v)); }, 'Please choose today or a future date.'),
 time: z.enum(['morning', 'afternoon', 'evening'], { error: 'Choose a preferred time.' }),
 message: z.string().trim().max(1000, 'Please keep your message under 1,000 characters.'),
 consent: z.boolean().refine(v=>v, 'Please consent so we can contact you.'),
 website: z.string().max(0),
});
export type AppointmentValues = z.infer<typeof appointmentSchema>;
