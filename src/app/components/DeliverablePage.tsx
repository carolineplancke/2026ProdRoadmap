import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface DeliverablePageProps {
  title: string;
  quarter: string;
  director: string;
  problem: string;
  opportunity: string;
  solution: string[];
  metric?: {
    title: string;
    current: string;
    startOfYear: string;
    target: string;
  };
  imageSlot?: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  currentPage: number;
  totalPages: number;
}

export function DeliverablePage({
  title,
  quarter,
  director,
  problem,
  opportunity,
  solution,
  metric,
  imageSlot,
  onNext,
  onPrevious,
  currentPage,
  totalPages,
}: DeliverablePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-accent text-accent-foreground" style={{ borderRadius: 'var(--radius)' }}>
              {quarter} Delivery
            </Badge>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-label)', fontWeight: 'bold', color: 'var(--color-brand-primary-dark)' }}>
              Director: {director}
            </span>
          </div>
          <h1 className="mb-6 text-[20px]">{title}</h1>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Problem */}
            <div>
              <h3 className="mb-3 text-destructive-foreground">The Problem</h3>
              <p className="text-foreground">{problem}</p>
            </div>

            {/* Opportunity */}
            <div>
              <h3 className="mb-3 text-chart-2">The Opportunity</h3>
              <p className="text-foreground">{opportunity}</p>
            </div>

            {/* Solution */}
            <div>
              <h3 className="mb-3 text-accent">The Solution</h3>
              <ul className="space-y-3">
                {solution.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Image/Wireframe Slot */}
          <div className="flex items-center justify-center">
            {imageSlot ? (
              imageSlot
            ) : (
              <div 
                className="w-full h-full min-h-[600px] bg-muted/20 border-2 border-dashed border-border rounded-lg flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
                  Wireframe / Mockup Image
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Metric Card - moved to bottom */}
        {metric && (
          <Card className="mb-8 p-6 bg-secondary/10 border-secondary" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="mb-2">{metric.title}</h4>
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                      2025 FY
                    </div>
                    <div style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-semibold)' }}>
                      90%
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                      Jan 2025
                    </div>
                    <div style={{ fontSize: 'var(--text-base)' }}>{metric.startOfYear}</div>
                  </div>
                </div>
              </div>
              <div 
                className="text-center px-6 py-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--chart-2)',
                  borderRadius: 'var(--radius-card)'
                }}
              >
                <div className="text-white mb-2" style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}>
                  2026 Goal
                </div>
                <div className="text-white" style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--font-weight-bold)' }}>
                  {metric.target}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentPage === 1}
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
            {currentPage} of {totalPages}
          </span>
          <Button
            onClick={onNext}
            disabled={currentPage === totalPages}
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}