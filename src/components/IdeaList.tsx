import { FC } from 'react';
import { Idea } from '../types/idea';
import { IdeaCard } from './IdeaCard';

interface IdeaListProps {
  ideas: Idea[];
  onViewIdea: (id: string) => void;
}

export const IdeaList: FC<IdeaListProps> = ({ ideas, onViewIdea }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onView={onViewIdea} />
      ))}
    </div>
  );
};