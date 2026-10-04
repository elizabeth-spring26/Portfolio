export const site = {
  email: "etran2@babson.edu",
  linkedin: "https://www.linkedin.com/in/elizabeth-tran-5807b2244/",
  /** Set to "/resume.pdf" once the file is in /public; every resume link is hidden until then. */
  resume: null as string | null,
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks = [
  { label: "LinkedIn", href: site.linkedin },
  ...(site.resume ? [{ label: "Resume (PDF)", href: site.resume }] : []),
  { label: "Email", href: `mailto:${site.email}` },
];
