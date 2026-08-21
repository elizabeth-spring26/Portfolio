"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const awards = [
  "Diversity Leadership Scholarship",
  "Excellence in Entrepreneurship & Ecommerce",
  "1st Place: Business Plan (FBLA)",
  "1st Place: Mobile App Development (FBLA)",
];

const courses = [
  "Business Analytics",
  "Accounting",
  "AP Macroeconomics",
  "Foundations of Management & Entrepreneurship",
  "Technology Entrepreneurship",
];

const involvement = [
  "CODE (Community of Developers and Entrepreneurs)",
  "Babson Asian Pacific Student Association",
  "The Generator (AI Lab)",
];

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-sm text-foreground tnum">{value}</p>
    </div>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader index="05" label="Education" title="Where I'm learning" />

        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-10 lg:gap-14 border-t border-border pt-10">
          <div>
            <h3 className="font-display text-2xl text-foreground leading-tight">Babson College</h3>
            <p className="font-mono text-[0.6875rem] text-muted-foreground mt-1.5">
              Wellesley, Massachusetts
            </p>

            <p className="text-foreground mt-6">
              Bachelor of Science in Business Administration
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Concentration: Technology Entrepreneurship
            </p>

            <div className="flex flex-wrap gap-x-14 gap-y-5 mt-7">
              <MetaRow label="Expected" value="May 2028" />
              <MetaRow label="GPA" value="3.75" />
            </div>

            <div className="mt-9 pt-7 border-t border-border">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Relevant Coursework
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {courses.map((course) => (
                  <li key={course} className="text-sm text-foreground/75">
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Involvement
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {involvement.map((org) => (
                  <li key={org} className="text-sm text-foreground/75">
                    {org}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground mb-4">
              Awards
            </p>
            <ul className="border-t border-border">
              {awards.map((award) => (
                <li
                  key={award}
                  className="text-sm text-foreground/75 leading-snug border-b border-border py-3.5"
                >
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
