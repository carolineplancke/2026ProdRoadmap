import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

interface HICSectionProps {
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

export function HICSection({ categories, dataAnalyticsProjects }: HICSectionProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isDataAnalyticsSectionExpanded, setIsDataAnalyticsSectionExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (categoryTitle: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryTitle)) {
      newExpanded.delete(categoryTitle);
    } else {
      newExpanded.add(categoryTitle);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleCard = (categoryTitle: string, commitmentName: string) => {
    const cardId = `${categoryTitle}-${commitmentName}`;
    const newExpanded = new Set(expandedCards);
    
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    
    setExpandedCards(newExpanded);
  };

  const isExpanded = (categoryTitle: string, commitmentName: string) => {
    const cardId = `${categoryTitle}-${commitmentName}`;
    return expandedCards.has(cardId);
  };

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
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="mb-4" style={{ fontSize: 'var(--text-h2)', color: 'var(--foreground)' }}>
          2026 High Integrity Commitments
        </h2>
        <p style={{ 
          fontSize: 'var(--text-base)', 
          color: 'var(--muted-foreground)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          26 committed initiatives organized by category. Click any card to view details.
        </p>
      </div>
      
      {categories.map((category) => (
        <div key={category.title} className="mb-12">
          {/* Collapsible Category Header */}
          <button
            onClick={() => toggleCategory(category.title)}
            className="w-full mb-6 p-6"
            style={{
              backgroundColor: category.color,
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--elevation-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: 'none',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
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
                  fontSize: 'var(--text-h3)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--accent-foreground)',
                  marginBottom: '4px'
                }}>
                  {category.title}
                </h3>
                <p style={{
                  fontSize: 'var(--text-label)',
                  color: 'var(--accent-foreground)',
                  opacity: 0.9
                }}>
                  {category.commitments.length} commitments
                </p>
              </div>
              <ChevronDown 
                className="w-6 h-6"
                style={{ 
                  color: 'var(--accent-foreground)',
                  transform: expandedCategories.has(category.title) ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0
                }}
              />
            </div>
          </button>

          {/* Collapsible Commitments Grid - 2 columns */}
          {expandedCategories.has(category.title) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ animation: 'fadeIn 0.3s ease' }}>
              {category.commitments.map((commitment, idx) => {
                const expanded = isExpanded(category.title, commitment.name);
                
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCard(category.title, commitment.name)}
                    className="p-6 text-left"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderRadius: 'var(--radius-card)',
                      border: '1px solid var(--border)',
                      borderLeft: `4px solid ${category.color}`,
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
                        {commitment.name.replace(/^Deliver on\s*/i, '')}
                      </h4>
                      <ChevronDown 
                        className="w-5 h-5"
                        style={{
                          color: category.color,
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
                          backgroundColor: category.color,
                          color: 'var(--accent-foreground)',
                          borderRadius: 'var(--radius-button)',
                          fontSize: 'var(--text-label)',
                          fontWeight: 'var(--font-weight-medium)',
                          padding: '4px 10px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {commitment.startDate}
                      </span>
                      <span style={{ 
                        fontSize: 'var(--text-label)', 
                        color: 'var(--muted-foreground)'
                      }}>
                        →
                      </span>
                      <span 
                        style={{
                          backgroundColor: category.color,
                          color: 'var(--accent-foreground)',
                          borderRadius: 'var(--radius-button)',
                          fontSize: 'var(--text-label)',
                          fontWeight: 'var(--font-weight-medium)',
                          padding: '4px 10px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {commitment.endDate}
                      </span>
                    </div>

                    {/* Strapline - Always visible */}
                    <div 
                      className="p-3 mb-3"
                      style={{
                        backgroundColor: 'var(--muted)',
                        borderRadius: 'var(--radius)',
                        borderLeft: `3px solid ${getStatusColor(commitment.status)}`
                      }}
                    >
                      <p style={{ 
                        fontSize: 'var(--text-label)', 
                        color: 'var(--foreground)',
                        lineHeight: '1.5',
                        fontStyle: 'italic'
                      }}>
                        {commitment.strapline}
                      </p>
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
                          <p style={{ 
                            fontSize: 'var(--text-label)', 
                            color: 'var(--muted-foreground)'
                          }}>
                            <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Owner:</span> {commitment.owner}
                          </p>
                          {commitment.primaryPM && (
                            <p style={{ 
                              fontSize: 'var(--text-label)', 
                              color: 'var(--muted-foreground)'
                            }}>
                              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>PM:</span> {commitment.primaryPM}
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <p style={{ 
                          fontSize: 'var(--text-base)', 
                          color: 'var(--foreground)',
                          lineHeight: '1.6'
                        }}>
                          {commitment.description}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Data & Analytics Section - After Administration */}
          {false && category.title === "Administration" && dataAnalyticsProjects && dataAnalyticsProjects.length > 0 && (
            <div className="mt-12">
              {/* Data & Analytics Header */}
              <div 
                className="mb-6 p-6"
                style={{
                  backgroundColor: 'var(--brand-purple-analytics)',
                  borderRadius: 'var(--radius-card)',
                  boxShadow: 'var(--elevation-sm)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 style={{ 
                      fontSize: 'var(--text-h3)', 
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--accent-foreground)',
                      marginBottom: '4px'
                    }}>
                      Data & Analytics Priority Projects
                    </h3>
                    <p style={{
                      fontSize: 'var(--text-label)',
                      color: 'var(--accent-foreground)',
                      opacity: 0.9
                    }}>
                      {dataAnalyticsProjects.length} priority projects supporting HICs
                    </p>
                  </div>
                </div>
              </div>

              {/* Data & Analytics Projects Grid - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataAnalyticsProjects.map((project, idx) => {
                  const expanded = isExpanded("Data & Analytics", project.name);
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCard("Data & Analytics", project.name)}
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

                      {/* Project Description - Always visible */}
                      <div 
                        className="p-3 mb-3"
                        style={{
                          backgroundColor: 'var(--muted)',
                          borderRadius: 'var(--radius)',
                          borderLeft: '3px solid var(--brand-purple-analytics)'
                        }}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-label)', 
                          color: 'var(--foreground)',
                          lineHeight: '1.5'
                        }}>
                          {project.description}
                        </p>
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

                          {/* Business Value */}
                          {project.businessValue && (
                            <div className="mb-4">
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
                          <div>
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
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Data & Analytics Priority Projects Section - After GS+ */}
      {dataAnalyticsProjects && dataAnalyticsProjects.length > 0 && (
        <div className="mb-12">
          {/* Collapsible Section Header */}
          <button
            onClick={() => setIsDataAnalyticsSectionExpanded(!isDataAnalyticsSectionExpanded)}
            className="w-full mb-6 p-6"
            style={{ 
              backgroundColor: 'var(--brand-purple-analytics)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--elevation-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: 'none',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
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
                  fontSize: 'var(--text-h3)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--accent-foreground)',
                  marginBottom: '4px'
                }}>
                  Data & Analytics Priority Projects
                </h3>
                <p style={{
                  fontSize: 'var(--text-label)',
                  color: 'var(--accent-foreground)',
                  opacity: 0.9
                }}>
                  {dataAnalyticsProjects.length} priority projects supporting HICs
                </p>
              </div>
              <ChevronDown 
                className="w-6 h-6"
                style={{ 
                  color: 'var(--accent-foreground)',
                  transform: isDataAnalyticsSectionExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0
                }}
              />
            </div>
          </button>

          {/* Collapsible Projects Grid */}
          {isDataAnalyticsSectionExpanded && (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              style={{ 
                animation: 'fadeIn 0.3s ease'
              }}
            >
              {dataAnalyticsProjects.map((project, idx) => {
                const expanded = isExpanded("Data & Analytics", project.name);
                
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCard("Data & Analytics", project.name)}
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

                    {/* Project Description - Always visible */}
                    <div 
                      className="p-3 mb-3"
                      style={{ 
                        backgroundColor: 'var(--muted)',
                        borderRadius: 'var(--radius)',
                        borderLeft: '3px solid var(--brand-purple-analytics)'
                      }}
                    >
                      <p style={{ 
                        fontSize: 'var(--text-label)', 
                        color: 'var(--foreground)',
                        lineHeight: '1.5'
                      }}>
                        {project.description}
                      </p>
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

                        {/* Business Value */}
                        {project.businessValue && (
                          <div className="mb-4">
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
                        <div>
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
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
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