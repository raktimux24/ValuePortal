import { Idea, IdeaFilters } from '../types/idea';

export const filterIdeas = (ideas: Idea[], filters: IdeaFilters): Idea[] => {
  return ideas.filter((idea) => {
    const matchesSearch = idea.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStage = filters.stage === 'all' || idea.stage === filters.stage;
    return matchesSearch && matchesStage;
  });
};