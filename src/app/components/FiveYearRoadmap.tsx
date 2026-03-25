import { Card } from "@/app/components/ui/card";

export function FiveYearRoadmap() {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Q1 */}
        <div>
          <div 
            className="mb-4 py-3 px-4 text-white text-center"
            style={{ 
              backgroundColor: '#00373A',
              borderRadius: 'var(--radius-button)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-h4)'
            }}
          >
            Q1
          </div>
          <div className="space-y-3">
            <TimelineItem text="Mental Health: Next Available Counsellor Flow" />
            <TimelineItem text="Well-Being: Corporate Challenges" />
            <TimelineItem text="Enhanced Health Outcomes Report: Mental Health" />
            <TimelineItem text="Travel Insurance: MGA" />
          </div>
        </div>

        {/* Q2 */}
        <div>
          <div 
            className="mb-4 py-3 px-4 text-white text-center"
            style={{ 
              backgroundColor: '#00373A',
              borderRadius: 'var(--radius-button)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-h4)'
            }}
          >
            Q2
          </div>
          <div className="space-y-3">
            <TimelineItem text="Mental Health: Dashboard Redesign" />
            <TimelineItem text="Digital Pharmacy Order Status" />
            <TimelineItem text="Enhanced Health Outcomes Report: Women's Health*" />
            <TimelineItem text="Plan Sponsor Portal - Health" />
            <TimelineItem text="MFA in GS+ for Plan Members and Plan Sponsors" />
          </div>
        </div>

        {/* Q3 */}
        <div>
          <div 
            className="mb-4 py-3 px-4 text-white text-center"
            style={{ 
              backgroundColor: '#00373A',
              borderRadius: 'var(--radius-button)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-h4)'
            }}
          >
            Q3
          </div>
          <div className="space-y-3">
            <TimelineItem text="Guided Interactions: onboarding, monthly topics, new launches" />
            <TimelineItem text="Launch of CSaaS, with integrated chat agents" />
            <TimelineItem text="Dependent Invitation Flow" />
            <TimelineItem text="Wellbeing Engagement Notifications" />
            <TimelineItem text="Enhanced Health Outcomes Report: Men's Health*" />
            <TimelineItem text="Group Conversion" />
          </div>
        </div>

        {/* Q4 */}
        <div>
          <div 
            className="mb-4 py-3 px-4 text-white text-center"
            style={{ 
              backgroundColor: '#00373A',
              borderRadius: 'var(--radius-button)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-h4)'
            }}
          >
            Q4
          </div>
          <div className="space-y-3">
            <TimelineItem text="Dynamic Personalized Dashboard" />
            <TimelineItem text="Personalized Care Pathways" />
            <TimelineItem text="Enhanced Health Outcomes Report: Metabolic Health*" />
          </div>
        </div>
      </div>

      {/* Timeline Connector */}
      <div className="mt-8 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-1 hidden lg:block"
          style={{ backgroundColor: '#00373A' }}
        ></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="hidden lg:flex justify-center">
              <div 
                className="w-4 h-4 rounded-full -mt-1.5"
                style={{ backgroundColor: '#00373A' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TimelineItemProps {
  text: string;
}

function TimelineItem({ text }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex-shrink-0 mt-1.5">
        <div 
          className="rounded-full border-2"
          style={{ 
            width: '12px',
            height: '12px',
            borderColor: '#00373A',
            backgroundColor: 'white'
          }}
        ></div>
      </div>
      <div 
        className="text-foreground"
        style={{ 
          fontSize: 'var(--text-base)',
          lineHeight: '1.5',
          color: 'var(--foreground)'
        }}
      >
        {text}
      </div>
    </div>
  );
}