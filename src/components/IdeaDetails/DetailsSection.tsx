import { FC } from 'react';
import { Idea } from '../../types/idea';

interface DetailsSectionProps {
  idea: Idea;
}

export const DetailsSection: FC<DetailsSectionProps> = ({ idea }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Submission Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Basic Information</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-foreground">Submitted By</dt>
                <dd className="text-foreground">{idea.submittedBy}</dd>
              </div>
              <div>
                <dt className="text-sm text-foreground">Submitted On</dt>
                <dd className="text-foreground">{formatDate(idea.submittedOn)}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Category</h3>
            <p className="text-foreground capitalize">
              {idea.category.replace('_', ' ')}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Idea Details</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
            <p className="text-foreground whitespace-pre-wrap">{idea.description}</p>
          </div>
          {idea.problemStatement && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Problem Statement</h3>
              <p className="text-foreground whitespace-pre-wrap">{idea.problemStatement}</p>
            </div>
          )}
          {idea.proposedSolution && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Proposed Solution</h3>
              <p className="text-foreground whitespace-pre-wrap">{idea.proposedSolution}</p>
            </div>
          )}
          {idea.expectedBenefits && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Expected Benefits</h3>
              <p className="text-foreground whitespace-pre-wrap">{idea.expectedBenefits}</p>
            </div>
          )}
        </div>
      </section>

      {idea.quantification && (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Quantification Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Effort Required */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-4">Effort Required</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Time Investment</dt>
                  <dd className="text-lg font-medium text-foreground">{idea.quantification.timeInvestment}%</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Implementation Time</dt>
                  <dd className="text-lg font-medium text-foreground capitalize">
                    {idea.quantification.resourcesNeeded.implementationTime.replace('_', ' ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Team Size</dt>
                  <dd className="text-lg font-medium text-foreground">
                    {idea.quantification.resourcesNeeded.teamSize} people
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Complexity</dt>
                  <dd className="text-lg font-medium text-foreground capitalize">
                    {idea.quantification.complexity}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Value Metrics */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-4">Value Metrics</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Impact Level</dt>
                  <dd className="text-lg font-medium text-foreground">{idea.quantification.impactLevel}%</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Customer Satisfaction</dt>
                  <dd className="text-lg font-medium text-foreground">
                    {idea.quantification.businessMetrics.customerSatisfaction}%
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Operational Efficiency</dt>
                  <dd className="text-lg font-medium text-foreground">
                    {idea.quantification.businessMetrics.operationalEfficiency}%
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Cost Reduction</dt>
                  <dd className="text-lg font-medium text-foreground">
                    {idea.quantification.businessMetrics.costReduction}%
                  </dd>
                </div>
              </dl>
            </div>

            {/* Resources */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-4">Required Resources</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {idea.quantification.resourcesNeeded.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Additional Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    {idea.quantification.resourcesNeeded.additionalResources.map((resource, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Budget</h4>
                  <p className="text-lg font-medium text-foreground">
                    ${idea.quantification.estimatedBudget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-4">Project Timeline</h3>
              <dl className="space-y-4">
                {Object.entries(idea.quantification.timeline).map(([phase, duration]) => (
                  <div key={phase}>
                    <dt className="text-sm text-muted-foreground capitalize">{phase}</dt>
                    <dd className="text-lg font-medium text-foreground">{duration}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Risks */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mt-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Potential Risks</h3>
            <ul className="list-disc list-inside space-y-2">
              {idea.quantification.risks.map((risk, index) => (
                <li key={index} className="text-muted-foreground">
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};