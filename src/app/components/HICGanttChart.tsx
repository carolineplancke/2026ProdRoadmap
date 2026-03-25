import { useMemo } from "react";

interface Commitment {
  name: string;
  owner: string;
  primaryPM: string;
  startDate: string;
  endDate: string;
  description: string;
  status: "Green" | "Amber" | "Red";
  strapline: string;
}

interface Category {
  title: string;
  color: string;
  commitments: Commitment[];
}

interface HICGanttChartProps {
  categories: Category[];
  dataAnalyticsProjects?: Array<{
    name: string;
    owner: string;
    primaryPM: string;
    startDate: string;
    endDate: string;
    description: string;
    subPortfolio: string;
    businessValue?: string;
    projectOverview?: string;
    deliveryPrime?: string;
  }>;
}

// Convert date strings like "01 Jan 2026" to Date objects
function parseDate(dateStr: string): Date {
  // Handle "TBD" or empty dates
  if (!dateStr || dateStr === "TBD") {
    return new Date(2026, 11, 31); // Default to end of 2026
  }

  const months: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  // Handle format "01 Jan 2026"
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    return new Date(year, month, 1);
  }
  
  // Handle old format "Jan 2026" as fallback
  if (parts.length === 2) {
    const month = months[parts[0]];
    const year = parseInt(parts[1]);
    return new Date(year, month, 1);
  }
  
  return new Date(2026, 0, 1); // Default fallback
}

// Calculate position and width for Gantt bars
function calculateBarMetrics(startDate: Date, endDate: Date, minDate: Date, maxDate: Date) {
  const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Check if project started before minDate (before Jan 2026)
  const actualStartDate = startDate;
  const visualStartDate = startDate < minDate ? minDate : startDate;
  const startedBeforeRange = actualStartDate < minDate;
  
  const startDays = (visualStartDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
  const durationDays = (endDate.getTime() - visualStartDate.getTime()) / (1000 * 60 * 60 * 24);
  
  const left = (startDays / totalDays) * 100;
  const width = (durationDays / totalDays) * 100;
  
  return { left, width, startedBeforeRange };
}

export function HICGanttChart({ categories, dataAnalyticsProjects }: HICGanttChartProps) {
  // Flatten all commitments and parse dates
  const allCommitments = useMemo(() => {
    const flattened = categories.flatMap(category => 
      category.commitments.map(commitment => ({
        ...commitment,
        category: category.title,
        color: category.color,
        parsedStartDate: parseDate(commitment.startDate),
        parsedEndDate: parseDate(commitment.endDate)
      }))
    );
    return flattened;
  }, [categories]);

  // Find date range
  const { minDate, maxDate } = useMemo(() => {
    const dates = allCommitments.flatMap(c => [c.parsedStartDate, c.parsedEndDate]);
    return {
      minDate: new Date(2026, 0, 1), // Force start at January 2026
      maxDate: new Date(Math.max(...dates.map(d => d.getTime())))
    };
  }, [allCommitments]);

  // Generate month labels for timeline
  const monthLabels = useMemo(() => {
    const labels: { date: Date; label: string }[] = [];
    const current = new Date(minDate);
    
    while (current <= maxDate) {
      labels.push({
        date: new Date(current),
        label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      });
      current.setMonth(current.getMonth() + 1);
    }
    
    return labels;
  }, [minDate, maxDate]);

  const getStatusColor = (status: "Green" | "Amber" | "Red") => {
    switch (status) {
      case "Green":
        return "var(--status-green)";
      case "Amber":
        return "var(--status-amber)";
      case "Red":
        return "var(--status-red)";
    }
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ minWidth: '1400px' }}>
        {/* Timeline Header */}
        <div className="mb-4">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '12px'
          }}>
            <div style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', paddingLeft: '8px' }}>
              Project
            </div>
            <div style={{
              display: 'flex',
              position: 'relative',
              height: '32px',
              borderBottom: '2px solid var(--border)'
            }}>
              {monthLabels.map((month, idx) => {
                const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
                const monthDays = (month.date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
                const left = (monthDays / totalDays) * 100;
                
                return (
                  <div 
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${left}%`,
                      fontSize: '11px',
                      color: 'var(--muted-foreground)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    {month.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gantt Rows by Category */}
        {categories.map((category) => (
          <div key={category.title} className="mb-6">
            {/* Category Header */}
            <div className="mb-3">
              <h3 style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: '4px'
              }}>
                {category.title}
              </h3>
              <div style={{
                width: '40px',
                height: '3px',
                backgroundColor: category.color,
                borderRadius: 'var(--radius)'
              }}></div>
            </div>

            {/* Commitment Rows */}
            {category.commitments.map((commitment, idx) => {
              const startDate = parseDate(commitment.startDate);
              const endDate = parseDate(commitment.endDate);
              const { left, width, startedBeforeRange } = calculateBarMetrics(startDate, endDate, minDate, maxDate);

              return (
                <div 
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    gap: '12px',
                    alignItems: 'center',
                    marginBottom: '8px',
                    minHeight: '36px'
                  }}
                >
                  {/* Project Name */}
                  <div style={{ paddingLeft: '8px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '2px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        lineHeight: '1.3',
                        flex: 1
                      }}>
                        {commitment.name.replace(/^Deliver on\s*/i, '')}
                      </div>
                      {/* Status Badge */}
                      <div 
                        style={{
                          backgroundColor: getStatusColor(commitment.status),
                          color: 'white',
                          borderRadius: 'var(--radius-button)',
                          fontSize: '9px',
                          fontWeight: 'var(--font-weight-bold)',
                          padding: '2px 6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                        title={`Status: ${commitment.status}`}
                      >
                        {commitment.status}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--muted-foreground)'
                    }}>
                      PM: {commitment.primaryPM || 'TBD'}
                    </div>
                  </div>

                  {/* Timeline Bar */}
                  <div style={{
                    position: 'relative',
                    height: '36px',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    {/* Vertical month grid lines */}
                    {monthLabels.map((month, mIdx) => {
                      const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
                      const monthDays = (month.date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
                      const leftPos = (monthDays / totalDays) * 100;
                      
                      return (
                        <div 
                          key={mIdx}
                          style={{
                            position: 'absolute',
                            left: `${leftPos}%`,
                            top: 0,
                            bottom: 0,
                            width: '1px',
                            backgroundColor: 'var(--border)',
                            opacity: 0.3
                          }}
                        />
                      );
                    })}

                    {/* Gantt Bar */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${left}%`,
                        width: `${Math.max(width, 1)}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '24px',
                        backgroundColor: category.color,
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 6px',
                        boxShadow: 'var(--elevation-sm)',
                        minWidth: '2px'
                      }}
                    >
                      {/* Left Arrow Indicator for 2025 starts */}
                      {startedBeforeRange && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '-8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 0,
                            height: 0,
                            borderTop: '8px solid transparent',
                            borderBottom: '8px solid transparent',
                            borderRight: `8px solid ${category.color}`,
                            filter: 'drop-shadow(-1px 0 1px rgba(0, 0, 0, 0.2))'
                          }}
                          title="Started in 2025"
                        />
                      )}
                      <span style={{
                        fontSize: '10px',
                        color: 'var(--accent-foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {width > 5 ? `${commitment.startDate} → ${commitment.endDate}` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Data & Analytics Projects Section */}
        {dataAnalyticsProjects && dataAnalyticsProjects.length > 0 && (
          <div className="mb-6">
            {/* Section Header */}
            <div className="mb-3">
              <h3 style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: '4px'
              }}>
                Data & Analytics Priority Projects
              </h3>
              <div style={{
                width: '40px',
                height: '3px',
                backgroundColor: 'var(--brand-purple-analytics)',
                borderRadius: 'var(--radius)'
              }}></div>
            </div>

            {/* Project Rows */}
            {dataAnalyticsProjects.map((project, idx) => {
              const startDate = parseDate(project.startDate);
              const endDate = parseDate(project.endDate);
              const { left, width, startedBeforeRange } = calculateBarMetrics(startDate, endDate, minDate, maxDate);

              return (
                <div 
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    gap: '12px',
                    alignItems: 'center',
                    marginBottom: '8px',
                    minHeight: '36px'
                  }}
                >
                  {/* Project Name */}
                  <div style={{ paddingLeft: '8px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '2px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--foreground)',
                        lineHeight: '1.3',
                        flex: 1
                      }}>
                        {project.name}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--muted-foreground)'
                    }}>
                      PM: {project.primaryPM || 'TBD'}
                    </div>
                  </div>

                  {/* Timeline Bar */}
                  <div style={{
                    position: 'relative',
                    height: '36px',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    {/* Vertical month grid lines */}
                    {monthLabels.map((month, mIdx) => {
                      const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
                      const monthDays = (month.date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
                      const leftPos = (monthDays / totalDays) * 100;
                      
                      return (
                        <div 
                          key={mIdx}
                          style={{
                            position: 'absolute',
                            left: `${leftPos}%`,
                            top: 0,
                            bottom: 0,
                            width: '1px',
                            backgroundColor: 'var(--border)',
                            opacity: 0.3
                          }}
                        />
                      );
                    })}

                    {/* Gantt Bar - Purple for Data & Analytics */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${left}%`,
                        width: `${Math.max(width, 1)}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '24px',
                        backgroundColor: 'var(--brand-purple-analytics)',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 6px',
                        boxShadow: 'var(--elevation-sm)',
                        minWidth: '2px'
                      }}
                    >
                      {/* Left Arrow Indicator for 2025 starts */}
                      {startedBeforeRange && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '-8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 0,
                            height: 0,
                            borderTop: '8px solid transparent',
                            borderBottom: '8px solid transparent',
                            borderRight: '8px solid var(--brand-purple-analytics)',
                            filter: 'drop-shadow(-1px 0 1px rgba(0, 0, 0, 0.2))'
                          }}
                          title="Started in 2025"
                        />
                      )}
                      <span style={{
                        fontSize: '10px',
                        color: 'var(--accent-foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {width > 5 ? `${project.startDate} → ${project.endDate}` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}