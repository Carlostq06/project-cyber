export const navItems = [
  { id: "registry", label: "Patient Registry", icon: "users" },
  { id: "staff", label: "Staff Directory", icon: "heart" },
  { id: "catalog", label: "Treatment Catalog", icon: "wave" },
  { id: "appointments", label: "Appointments", icon: "calendar" },
  { id: "consent", label: "Informed Consent", icon: "file" },
  { id: "billing", label: "Billing", icon: "card" },
];

export const appointmentStats = [
  { label: "Today's Visits", value: 12 },
  { label: "Confirmed", value: 8 },
  { label: "Pending", value: 3 },
  { label: "Canceled Today", value: 1 },
];

export const staff = [
  {
    initials: "EV",
    name: "Dr. Eleanor Vance",
    specialty: "Acupuncture",
    schedule: "Mon, Wed, Fri - 09:00 - 15:00",
  },
  {
    initials: "JB",
    name: "Dr. Julian Bashir",
    specialty: "Holistic Medicine",
    schedule: "Tue, Thu - 10:00 - 17:00",
  },
  {
    initials: "BC",
    name: "Dr. Beverly Crusher",
    specialty: "Cardiology",
    schedule: "Mon, Tue, Wed - 08:30 - 14:00",
  },
  {
    initials: "SS",
    name: "Dr. Stephen Strange",
    specialty: "Neurology",
    schedule: "Thu, Fri - 11:00 - 18:00",
  },
  {
    initials: "LM",
    name: "Dr. Leonard McCoy",
    specialty: "General Practice",
    schedule: "Daily - 09:00 - 12:00",
  },
  {
    initials: "DS",
    name: "Dr. Dana Scully",
    specialty: "Pathology",
    schedule: "Tue, Fri - 13:00 - 17:00",
  },
];

export const patients = [
  {
    name: "Clara Oswald",
    id: "PT-2026-089",
    age: 28,
    sex: "F",
    lastVisit: "May 28, 2026",
    status: "Admitted",
  },
  {
    name: "Alistair Gordon",
    id: "PT-2026-054",
    age: 62,
    sex: "M",
    lastVisit: "May 24, 2026",
    status: "Discharged",
  },
  {
    name: "Rose Tyler",
    id: "PT-2026-112",
    age: 19,
    sex: "F",
    lastVisit: "May 21, 2026",
    status: "Admitted",
  },
  {
    name: "Martha Jones",
    id: "PT-2026-003",
    age: 34,
    sex: "F",
    lastVisit: "Apr 15, 2026",
    status: "Discharged",
  },
];

export const treatments = [
  {
    title: "Acupuncture Therapy",
    summary:
      "Holistic pain relief and energy rebalancing via targeted, ultra-fine therapy.",
    duration: "60 minutes",
    price: 45,
  },
  {
    title: "Craniosacral Therapy",
    summary:
      "Gentle manual pressure to release tension in the nervous system and deep tissues.",
    duration: "75 minutes",
    price: 170,
  },
  {
    title: "Electro-Acupuncture",
    summary:
      "Modern enhancement of meridian stimulation using microcurrent neural pulses.",
    duration: "45 minutes",
    price: 160,
  },
  {
    title: "Holistic Health Consult",
    summary:
      "In-depth lifestyle coaching paired with personalized herbal recommendations.",
    duration: "50 minutes",
    price: 120,
  },
];

export const appointments = [
  {
    patient: "Eleanor Vance",
    doctor: "Dr. Arthur Sterling",
    specialty: "Cardiology",
    treatment: "Comprehensive Consultation",
    time: "June 02, 10:00 AM",
    status: "Confirmed",
  },
  {
    patient: "Thomas Thorne",
    doctor: "Dr. Clara Bennett",
    specialty: "Dermatology",
    treatment: "Acne Laser Session",
    time: "June 02, 11:30 AM",
    status: "Pending",
  },
  {
    patient: "Julian Blackwood",
    doctor: "Dr. Arthur Sterling",
    specialty: "Cardiology",
    treatment: "Electrocardiogram",
    time: "June 01, 03:00 PM",
    status: "Completed",
  },
  {
    patient: "Genevieve Vance",
    doctor: "Dr. Silas Thorne",
    specialty: "Orthopedics",
    treatment: "Joint Infiltration",
    time: "June 03, 09:00 AM",
    status: "Canceled",
  },
];

export const invoices = [
  {
    id: "#INV-2026-084",
    date: "June 01, 2026",
    patient: "Julian Blackwood",
    service: "Electrocardiogram + Cardiology",
    amount: 302.4,
    status: "Paid",
  },
  {
    id: "#INV-2026-083",
    date: "May 28, 2026",
    patient: "Thomas Thorne",
    service: "Acne Laser Treatment Session",
    amount: 195.0,
    status: "Overdue",
  },
  {
    id: "#INV-2026-082",
    date: "May 26, 2026",
    patient: "Eleanor Vance",
    service: "Consultation + Pathology Review",
    amount: 150.0,
    status: "Paid",
  },
  {
    id: "#INV-2026-081",
    date: "May 22, 2026",
    patient: "Genevieve Vance",
    service: "Orthopedics Joint Infiltration",
    amount: 250.0,
    status: "Pending",
  },
];
