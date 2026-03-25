import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  quarter: number;
  track: string;
  status: "planning" | "in-progress" | "completed";
  duration: number; // Number of quarters
}

interface RoadmapTimelineProps {
  items: RoadmapItem[];
  year: number;
}

const statusColors = {
  planning: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  "in-progress": "bg-[var(--accent)] text-[var(--accent-foreground)]",
  completed: "bg-[var(--chart-3)] text-white",
};

const trackColors = {
  "Booking & Access": "border-l-[var(--chart-3)]",
  "Member Engagement": "border-l-[var(--accent)]",
  "Personalization": "border-l-[var(--chart-2)]",
};

export function RoadmapTimeline({ items, year }: RoadmapTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 style={{ 
        fontSize: 'var(--text-h3)', 
        fontWeight: 'var(--font-weight-semibold)',
        fontFamily: "'Gilroy', sans-serif",
        color: 'var(--foreground)',
        marginBottom: 'var(--spacing-4)'
      }}>
        2026 High Integrity Commitments (HICs)
      </h3>
      {items.map((item) => (
        <Card
          key={item.id}
          className="border-l-4 hover:shadow-md transition-shadow"
          style={{
            borderLeftColor: trackColors[item.track as keyof typeof trackColors] 
              ? `var(${trackColors[item.track as keyof typeof trackColors].replace('border-l-', '--color-')})` 
              : 'var(--border)',
            borderRadius: 'var(--radius-card)',
            padding: '1.5rem',
            fontFamily: "'Gilroy', sans-serif"
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h4 style={{ 
              fontSize: 'var(--text-h4)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              fontFamily: "'Gilroy', sans-serif"
            }}>
              {item.title}
            </h4>
            <Badge
              className="bg-[var(--accent)] text-[var(--accent-foreground)]"
              style={{
                borderRadius: 'var(--radius-button)',
                fontSize: 'var(--text-label)',
                fontFamily: "'Gilroy', sans-serif"
              }}
            >
              Q{item.quarter}
            </Badge>
          </div>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--chart-2)',
            fontFamily: "'Gilroy', sans-serif",
            fontWeight: 'var(--font-weight-normal)'
          }}>
            {item.description}
          </p>
        </Card>
      ))}
    </div>
  );
}