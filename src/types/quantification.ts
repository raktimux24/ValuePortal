export interface ResourceType {
  id: string;
  type: string;
  role: string;
}

export interface QuantificationForm {
  timeInvestment: number;
  complexity: 'low' | 'medium' | 'high';
  impactLevel: number;
  estimatedBudget: number;
  teamSize: number;
  resourceTypes: ResourceType[];
  implementationTime: '1-3_months' | '3-6_months' | '6-12_months' | '12+_months';
  additionalResources: string;
  comments: string;
}

export const defaultQuantificationForm: QuantificationForm = {
  timeInvestment: 50,
  complexity: 'medium',
  impactLevel: 50,
  estimatedBudget: 0,
  teamSize: 1,
  resourceTypes: [{ id: '1', type: '', role: '' }],
  implementationTime: '3-6_months',
  additionalResources: '',
  comments: '',
};