import { QuantificationForm } from './quantification';

export type IdeaStage = 'thoughts' | 'quantify' | 'internal_review' | 'external_review' | 'poc' | 'completed';

export type IdeaCategory = 'process_improvement' | 'cost_reduction' | 'revenue_growth' | 'customer_experience' | 'innovation' | 'other';

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

export interface HistoryEntry {
  id: string;
  type: 'submission' | 'stage_change' | 'comment' | 'reply' | 'attachment_added' | 'attachment_removed';
  user: string;
  timestamp: string;
  details?: string;
}

interface Quantification {
  timeInvestment: number;
  complexity: string;
  impactLevel: number;
  estimatedBudget: number;
  resourcesNeeded: {
    implementationTime: string;
    teamSize: number;
    skills: string[];
    additionalResources: string[];
  };
  businessMetrics: {
    customerSatisfaction: number;
    operationalEfficiency: number;
    costReduction: number;
  };
  risks: string[];
  timeline: {
    planning: string;
    development: string;
    testing: string;
    deployment: string;
  };
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: IdeaCategory;
  submittedBy: string;
  submittedOn: string;
  stage: IdeaStage;
  attachments: Attachment[];
  problemStatement?: string;
  proposedSolution?: string;
  expectedBenefits?: string;
  quantification?: Quantification;
  comments?: Comment[];
  history?: HistoryEntry[];
}

export interface IdeaFilters {
  search: string;
  stage: IdeaStage | 'all';
}

export interface NewIdeaForm {
  step: number;
  title: string;
  description: string;
  category: IdeaCategory;
  attachments: File[];
  problemStatement: string;
  proposedSolution: string;
  expectedBenefits: string;
}