import { forwardRef, LegacyRef, ReactElement } from "react";

interface SectionProps {
  sectionType: string;
  children: ReactElement;
}

function Section({ sectionType, children }: SectionProps, ref: LegacyRef<HTMLDivElement>) {
  return (
    <div className={`section ${sectionType}`} ref={ref}>
      {children}
    </div>
  );
}

export default forwardRef(Section);
