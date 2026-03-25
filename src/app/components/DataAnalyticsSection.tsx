import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Project {
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
}

interface DataAnalyticsSectionProps {
  projects: Project[];
}

export function DataAnalyticsSection({ projects }: DataAnalyticsSectionProps) {
  const [sectionExpanded, setSectionExpanded] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleSection = () => {
    setSectionExpanded(!sectionExpanded);
  };

  const toggleCard = (projectName: string) => {
    const newExpanded = new Set(expandedCards);
    
    if (newExpanded.has(projectName)) {
      newExpanded.delete(projectName);
    } else {
      newExpanded.add(projectName);
    }
    
    setExpandedCards(newExpanded);
  };

  const isExpanded = (projectName: string) => {
    return expandedCards.has(projectName);
  };

  // Group projects by subPortfolio
  const groupedProjects = projects.reduce((acc, project) => {
    const portfolio = project.subPortfolio;
    if (!acc[portfolio]) {
      acc[portfolio] = [];
    }
    acc[portfolio].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // Define the order of subportfolios
  const portfolioOrder = ['Data Analytics', 'Data Engineering', 'Data Governance Office'];
  
  // Sort portfolios according to the defined order
  const sortedPortfolios = portfolioOrder.filter(portfolio => groupedProjects[portfolio]);

  return (
    <div className="w-full">
      {/* Section Header - Collapsible */}
      <button
        onClick={toggleSection}
        className="w-full mb-8 p-8 text-left"
        style={{
          backgroundColor: 'var(--brand-purple-analytics)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--elevation-sm)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--elevation-sm)';
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ 
              fontSize: 'var(--text-h2)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--accent-foreground)',
              marginBottom: '8px'
            }}>
              Data & Analytics Priority Projects
            </h3>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--accent-foreground)',
              opacity: 0.9,
              maxWidth: '800px'
            }}>
              {projects.length} priority projects supporting High Integrity Commitments through data engineering, analytics, and governance
            </p>
          </div>
          <ChevronDown 
            className="w-8 h-8"
            style={{
              color: 'var(--accent-foreground)',
              transform: sectionExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              flexShrink: 0
            }}
          />
        </div>
      </button>

      {/* Projects Grid - Shown when section is expanded */}
      {sectionExpanded && (
        <div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          style={{
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {sortedPortfolios.map((portfolio, portfolioIdx) => (
            <div key={portfolio} className="flex flex-col">
              {/* Subportfolio Header */}
              <h4 style={{
                fontSize: 'var(--text-h3)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--brand-purple-analytics)',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid var(--brand-purple-analytics)'
              }}>
                {portfolio}
              </h4>
              
              {/* Projects stacked vertically in this column */}
              <div className="flex flex-col gap-6">
                {groupedProjects[portfolio].map((project, idx) => {
                  const expanded = isExpanded(project.name);
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCard(project.name)}
                      className="p-6 text-left"
                      style={{
                        backgroundColor: 'var(--card)',
                        borderRadius: 'var(--radius-card)',
                        border: '1px solid var(--border)',
                        borderLeft: '4px solid var(--brand-purple-analytics)',
                        boxShadow: 'var(--elevation-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--elevation-sm)';
                      }}
                    >
                      {/* Title and Chevron - Always visible */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 style={{ 
                          fontSize: 'var(--text-h4)', 
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          lineHeight: '1.4',
                          flex: 1
                        }}>
                          {project.name}
                        </h4>
                        <ChevronDown 
                          className="w-5 h-5"
                          style={{
                            color: 'var(--brand-purple-analytics)',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        />
                      </div>

                      {/* Date Range - Always visible */}
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          style={{
                            backgroundColor: 'var(--brand-purple-analytics)',
                            color: 'var(--accent-foreground)',
                            borderRadius: 'var(--radius-button)',
                            fontSize: 'var(--text-label)',
                            fontWeight: 'var(--font-weight-medium)',
                            padding: '4px 10px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {project.startDate}
                        </span>
                        <span style={{ 
                          fontSize: 'var(--text-label)', 
                          color: 'var(--muted-foreground)'
                        }}>
                          →
                        </span>
                        <span 
                          style={{
                            backgroundColor: 'var(--brand-purple-analytics)',
                            color: 'var(--accent-foreground)',
                            borderRadius: 'var(--radius-button)',
                            fontSize: 'var(--text-label)',
                            fontWeight: 'var(--font-weight-medium)',
                            padding: '4px 10px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {project.endDate}
                        </span>
                      </div>

                      {/* Sub-Portfolio Badge - Always visible */}
                      <div className="mb-3">
                        <span 
                          style={{
                            backgroundColor: 'var(--muted)',
                            color: 'var(--foreground)',
                            borderRadius: 'var(--radius)',
                            fontSize: 'var(--text-label)',
                            fontWeight: 'var(--font-weight-medium)',
                            padding: '4px 12px',
                            display: 'inline-block'
                          }}
                        >
                          {project.subPortfolio}
                        </span>
                      </div>

                      {/* Expandable Details */}
                      {expanded && (
                        <div 
                          style={{
                            paddingTop: '12px',
                            borderTop: '1px solid var(--border)',
                            animation: 'fadeIn 0.3s ease'
                          }}
                        >
                          {/* Owner and PM Info */}
                          <div className="mb-4 space-y-1">
                            {project.owner && (
                              <p style={{ 
                                fontSize: 'var(--text-label)', 
                                color: 'var(--muted-foreground)'
                              }}>
                                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Owner:</span> {project.owner}
                              </p>
                            )}
                            {project.primaryPM && (
                              <p style={{ 
                                fontSize: 'var(--text-label)', 
                                color: 'var(--muted-foreground)'
                              }}>
                                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>PM:</span> {project.primaryPM}
                              </p>
                            )}
                            {project.deliveryPrime && (
                              <p style={{ 
                                fontSize: 'var(--text-label)', 
                                color: 'var(--muted-foreground)'
                              }}>
                                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Delivery Prime:</span> {project.deliveryPrime}
                              </p>
                            )}
                          </div>

                          {/* Project Overview */}
                          {project.projectOverview && (
                            <div className="mb-4">
                              <h5 style={{
                                fontSize: 'var(--text-label)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--foreground)',
                                marginBottom: '8px'
                              }}>
                                Project Overview
                              </h5>
                              <p style={{ 
                                fontSize: 'var(--text-base)', 
                                color: 'var(--foreground)',
                                lineHeight: '1.6'
                              }}>
                                {project.projectOverview}
                              </p>
                            </div>
                          )}

                          {/* Description */}
                          <div className="mb-4">
                            <h5 style={{
                              fontSize: 'var(--text-label)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)',
                              marginBottom: '8px'
                            }}>
                              Description
                            </h5>
                            <p style={{ 
                              fontSize: 'var(--text-base)', 
                              color: 'var(--foreground)',
                              lineHeight: '1.6'
                            }}>
                              {project.description}
                            </p>
                          </div>

                          {/* Business Value */}
                          {project.businessValue && (
                            <div 
                              className="p-4"
                              style={{
                                backgroundColor: 'var(--muted)',
                                borderRadius: 'var(--radius)',
                                borderLeft: '3px solid var(--brand-purple-analytics)'
                              }}
                            >
                              <h5 style={{
                                fontSize: 'var(--text-label)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--foreground)',
                                marginBottom: '8px'
                              }}>
                                Business Value
                              </h5>
                              <p style={{ 
                                fontSize: 'var(--text-base)', 
                                color: 'var(--foreground)',
                                lineHeight: '1.6'
                              }}>
                                {project.businessValue}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}