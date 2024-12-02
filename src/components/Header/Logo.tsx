import { FC } from 'react';
import { Hexagon } from 'lucide-react';

export const Logo: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Hexagon className="h-8 w-8 text-primary" />
      <div className="flex flex-col">
        <span className="font-bold text-xl text-foreground">Xebia</span>
        <span className="text-sm text-muted-foreground">Value Portal</span>
      </div>
    </div>
  );
};