import { create } from 'zustand';
import { Attachment, Comment, Idea, NewIdeaForm } from '../types/idea';
import { QuantificationForm } from '../types/quantification';

interface IdeaStore {
  ideas: Idea[];
  addIdea: (newIdea: NewIdeaForm) => void;
  addAttachment: (ideaId: string, file: File) => void;
  removeAttachment: (ideaId: string, attachmentId: string) => void;
  addComment: (ideaId: string, content: string) => void;
  addReply: (ideaId: string, commentId: string, content: string) => void;
}

const initialIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Customer Service Bot',
    description: 'An AI driven chatbot to handle customer inquiries and support tickets.',
    category: 'customer_experience',
    submittedBy: 'John Doe',
    submittedOn: '2024-03-15T14:00:00Z',
    stage: 'quantify',
    attachments: [
      {
        id: '1',
        name: 'Project Proposal.pdf',
        size: 25 * 1024 * 1024, // 25MB
        type: 'application/pdf',
      },
      {
        id: '2',
        name: 'Market research.docx',
        size: 14 * 1024 * 1024, // 14MB
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }
    ],
    problemStatement: 'Customer support team is overwhelmed with repetitive queries.',
    proposedSolution: 'Implement an AI chatbot that can handle common customer inquiries.',
    expectedBenefits: 'Reduced response time, 24/7 support, and lower operational costs.',
    comments: [
      {
        id: '1',
        author: 'Alice Johnson',
        content: 'This looks promising! Have we considered integration costs?',
        timestamp: '2024-03-16T10:30:00Z',
        replies: []
      }
    ],
    history: [
      {
        id: '1',
        action: 'Created',
        timestamp: '2024-03-15T14:00:00Z',
        user: 'John Doe'
      },
      {
        id: '2',
        action: 'Updated',
        timestamp: '2024-03-16T09:00:00Z',
        user: 'John Doe',
        details: 'Added problem statement and proposed solution'
      }
    ],
    quantification: {
      timeInvestment: 75,
      complexity: 'medium',
      impactLevel: 85,
      estimatedBudget: 50000,
      resourcesNeeded: {
        implementationTime: '3-6_months',
        teamSize: 4,
        skills: ['AI/ML', 'Backend Development', 'DevOps'],
        additionalResources: ['Cloud Infrastructure', 'Training Data']
      },
      businessMetrics: {
        customerSatisfaction: 90,
        operationalEfficiency: 80,
        costReduction: 70
      },
      risks: [
        'Data privacy concerns',
        'Initial training period required',
        'Integration with existing systems'
      ],
      timeline: {
        planning: '4 weeks',
        development: '12 weeks',
        testing: '4 weeks',
        deployment: '2 weeks'
      }
    }
  },
  {
    id: '2',
    title: 'AI-Powered Inventory Management',
    description: 'Using AI to optimize inventory levels and reduce costs.',
    category: 'cost_reduction',
    submittedBy: 'Jane Smith',
    submittedOn: '2024-03-14T09:15:00Z',
    stage: 'thoughts',
    attachments: [],
    comments: [],
    history: [
      {
        id: '1',
        type: 'submission',
        user: 'Jane Smith',
        timestamp: '2024-03-14T09:15:00Z',
      }
    ]
  },
  {
    id: '3',
    title: 'Blockchain for Supply Chain',
    description: 'Implementing blockchain technology for supply chain transparency.',
    category: 'innovation',
    submittedBy: 'Mike Johnson',
    submittedOn: '2024-03-13T16:45:00Z',
    stage: 'internal_review',
    attachments: [],
    comments: [],
    history: [
      {
        id: '1',
        type: 'submission',
        user: 'Mike Johnson',
        timestamp: '2024-03-13T16:45:00Z',
      }
    ]
  },
  {
    id: '4',
    title: 'VR Training Program',
    description: 'Virtual reality training program for new employees.',
    category: 'process_improvement',
    submittedBy: 'Sarah Williams',
    submittedOn: '2024-03-12T11:00:00Z',
    stage: 'external_review',
    attachments: [],
    comments: [],
    history: [
      {
        id: '1',
        type: 'submission',
        user: 'Sarah Williams',
        timestamp: '2024-03-12T11:00:00Z',
      }
    ]
  }
];

export const useIdeaStore = create<IdeaStore>((set) => ({
  ideas: initialIdeas,
  addIdea: (newIdea: NewIdeaForm) => {
    const idea: Idea = {
      id: crypto.randomUUID(),
      title: newIdea.title,
      description: newIdea.description,
      category: newIdea.category,
      submittedBy: 'John Doe',
      submittedOn: new Date().toISOString(),
      stage: 'thoughts',
      attachments: [],
      comments: [],
      problemStatement: newIdea.problemStatement,
      proposedSolution: newIdea.proposedSolution,
      expectedBenefits: newIdea.expectedBenefits,
      history: [
        {
          id: crypto.randomUUID(),
          type: 'submission',
          user: 'John Doe',
          timestamp: new Date().toISOString(),
        }
      ]
    };

    set((state) => ({
      ideas: [idea, ...state.ideas],
    }));
  },
  addAttachment: (ideaId: string, file: File) => {
    const attachment: Attachment = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    };

    set((state) => ({
      ideas: state.ideas.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            attachments: [...idea.attachments, attachment],
            history: [
              ...(idea.history || []),
              {
                id: crypto.randomUUID(),
                type: 'attachment_added',
                user: 'John Doe',
                timestamp: new Date().toISOString(),
                details: file.name,
              },
            ],
          };
        }
        return idea;
      }),
    }));
  },
  removeAttachment: (ideaId: string, attachmentId: string) => {
    set((state) => ({
      ideas: state.ideas.map((idea) => {
        if (idea.id === ideaId) {
          const attachment = idea.attachments.find((a) => a.id === attachmentId);
          return {
            ...idea,
            attachments: idea.attachments.filter((a) => a.id !== attachmentId),
            history: [
              ...(idea.history || []),
              {
                id: crypto.randomUUID(),
                type: 'attachment_removed',
                user: 'John Doe',
                timestamp: new Date().toISOString(),
                details: attachment?.name,
              },
            ],
          };
        }
        return idea;
      }),
    }));
  },
  addComment: (ideaId: string, content: string) => {
    const comment: Comment = {
      id: crypto.randomUUID(),
      author: 'John Doe',
      content,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    set((state) => ({
      ideas: state.ideas.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            comments: [...(idea.comments || []), comment],
            history: [
              ...(idea.history || []),
              {
                id: crypto.randomUUID(),
                type: 'comment',
                user: 'John Doe',
                timestamp: new Date().toISOString(),
                details: 'Added a comment',
              },
            ],
          };
        }
        return idea;
      }),
    }));
  },
  addReply: (ideaId: string, commentId: string, content: string) => {
    const reply: Comment = {
      id: crypto.randomUUID(),
      author: 'John Doe',
      content,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      ideas: state.ideas.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            comments: (idea.comments || []).map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), reply],
                };
              }
              return comment;
            }),
            history: [
              ...(idea.history || []),
              {
                id: crypto.randomUUID(),
                type: 'reply',
                user: 'John Doe',
                timestamp: new Date().toISOString(),
                details: 'Replied to a comment',
              },
            ],
          };
        }
        return idea;
      }),
    }));
  },
}));