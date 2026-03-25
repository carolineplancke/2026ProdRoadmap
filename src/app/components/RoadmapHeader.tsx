import { Target } from "lucide-react";

interface RoadmapHeaderProps {
  year: number;
  company: string;
}

export function RoadmapHeader({ year, company }: RoadmapHeaderProps) {
  return (
    <div className="mb-12">
      {/* Title Section */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
          <Target className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl">{year} Product Roadmap</h1>
          <p className="text-slate-500">{company}</p>
        </div>
      </div>
    </div>
  );
}