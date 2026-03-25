import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { FiveYearRoadmap } from "@/app/components/FiveYearRoadmap";

interface ConclusionPageProps {
  onPrevious?: () => void;
  onBackToStart?: () => void;
  currentPage: number;
  totalPages: number;
}

export function ConclusionPage({
  onPrevious,
  onBackToStart,
  currentPage,
  totalPages,
}: ConclusionPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-6 text-[24px] text-[rgb(3,49,49)]">2026-2029 Innovation Roadmap</h1>
        </div>

        {/* Five Year Roadmap */}
        <FiveYearRoadmap />

        {/* Key Takeaways */}
        <div className="mb-12">
          <h2 className="mb-6" style={{ fontSize: 'var(--text-h3)' }}>Key Takeaways</h2>
          <div className="grid gap-6">
            <Card className="p-6" style={{ borderRadius: 'var(--radius-card)', backgroundColor: 'var(--color-background-subtle)' }}>
              <h3 className="mb-3 text-chart-2">Customer Experience Excellence</h3>
              <p className="text-foreground">
                Our 2026 roadmap is designed to establish GreenShield+ as the leader in customer experience within the payer-provider space. Every deliverable focuses on reducing friction, increasing engagement, and making healthcare more accessible.
              </p>
            </Card>

            <Card className="p-6" style={{ borderRadius: 'var(--radius-card)', backgroundColor: 'var(--color-background-subtle)' }}>
              <h3 className="mb-3 text-accent">First Mover Advantage</h3>
              <p className="text-foreground">
                Through innovations like Next Available Counsellor, Guided Interactions, and Personalized Care Pathways, we're maintaining our competitive edge by delivering features that members need before they know they need them.
              </p>
            </Card>

            <Card className="p-6" style={{ borderRadius: 'var(--radius-card)', backgroundColor: 'var(--color-background-subtle)' }}>
              <h3 className="mb-3" style={{ color: 'var(--color-brand-primary-dark)' }}>Technology as Competitive Advantage</h3>
              <p className="text-foreground">
                Leveraging machine learning for personalized dashboards, intelligent care coordination, and behavior-driven recommendations positions technology at the heart of our competitive strategy.
              </p>
            </Card>
          </div>
        </div>

        {/* Success Metrics Summary */}
        <div className="mb-12">
          <h2 className="mb-6" style={{ fontSize: 'var(--text-h3)' }}>2026 Success Metrics</h2>
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center" style={{ borderRadius: 'var(--radius-card)', borderColor: 'var(--chart-2)', borderWidth: '2px' }}>
              <div className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-label)' }}>
                EAP Utilization Target
              </div>
              <div style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--font-weight-bold)', color: 'var(--chart-2)' }}>
                ≥11%
              </div>
            </Card>

            <Card className="p-6 text-center" style={{ borderRadius: 'var(--radius-card)', borderColor: 'var(--color-brand-primary)', borderWidth: '2px' }}>
              <div className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-label)' }}>
                Monthly Active Users Target
              </div>
              <div style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-brand-primary)' }}>
                ≥40%
              </div>
            </Card>

            <Card className="p-6 text-center" style={{ borderRadius: 'var(--radius-card)', borderColor: 'var(--accent)', borderWidth: '2px' }}>
              <div className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-label)' }}>
                Cross Product Utilization Target
              </div>
              <div style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--font-weight-bold)', color: 'var(--accent)' }}>
                ≥5%
              </div>
            </Card>

            <Card className="p-6 text-center" style={{ borderRadius: 'var(--radius-card)', borderColor: 'var(--color-brand-primary-dark)', borderWidth: '2px' }}>
              <div className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-label)' }}>
                CSAT Score Target
              </div>
              <div style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-brand-primary-dark)' }}>
                ≥90%
              </div>
            </Card>
          </div>
        </div>

        {/* Closing Statement */}
        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrevious}
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
            {currentPage} of {totalPages}
          </span>
          <Button
            onClick={onBackToStart}
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            Back to Overview
          </Button>
        </div>
      </div>
    </div>
  );
}