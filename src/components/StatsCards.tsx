import { FC } from 'react';
import { Briefcase, Lightbulb, Calculator, ClipboardCheck, Mail, Cog, FileText, Settings } from 'lucide-react';
import { Idea } from '../types/idea';

interface StatsCardsProps {
  ideas: Idea[];
}

interface StatCard {
  title: string;
  value: number;
  icon: JSX.Element;
  className: string;
  darkClassName: string;
}

export const StatsCards: FC<StatsCardsProps> = ({ ideas }) => {
  const stats: StatCard[] = [
    {
      title: 'Total Projects',
      value: ideas.length,
      icon: <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      className: 'bg-indigo-50',
      darkClassName: 'dark:bg-indigo-950/30',
    },
    {
      title: 'Thoughts',
      value: ideas.filter(idea => idea.stage === 'thoughts').length,
      icon: <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
      className: 'bg-yellow-50',
      darkClassName: 'dark:bg-yellow-950/30',
    },
    {
      title: 'Quantify',
      value: ideas.filter(idea => idea.stage === 'quantify').length,
      icon: <Calculator className="h-5 w-5 text-green-600 dark:text-green-400" />,
      className: 'bg-green-50',
      darkClassName: 'dark:bg-green-950/30',
    },
    {
      title: 'Internal Review',
      value: ideas.filter(idea => idea.stage === 'internal_review').length,
      icon: <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      className: 'bg-blue-50',
      darkClassName: 'dark:bg-blue-950/30',
    },
    {
      title: 'External Review',
      value: ideas.filter(idea => idea.stage === 'external_review').length,
      icon: <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      className: 'bg-purple-50',
      darkClassName: 'dark:bg-purple-950/30',
    },
    {
      title: 'POC',
      value: ideas.filter(idea => idea.stage === 'poc').length,
      icon: <Cog className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      className: 'bg-orange-50',
      darkClassName: 'dark:bg-orange-950/30',
    },
    {
      title: 'Cases',
      value: ideas.filter(idea => idea.stage === 'completed').length,
      icon: <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
      className: 'bg-teal-50',
      darkClassName: 'dark:bg-teal-950/30',
    },
    {
      title: 'Projects in Drafts',
      value: 23,
      icon: <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      className: 'bg-gray-50',
      darkClassName: 'dark:bg-gray-800',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`${stat.className} ${stat.darkClassName} rounded-lg p-4 flex items-center space-x-4`}
        >
          <div className="rounded-lg p-2">{stat.icon}</div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};