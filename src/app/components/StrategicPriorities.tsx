import { Card } from "@/app/components/ui/card";
import { Zap, Trophy } from "lucide-react";

export function StrategicPriorities() {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-xl mb-2">Our Vision</h2>
        <p className="text-slate-600">
          Our aspiration is to be known for the best customer experience in the payer-provider space. 
          We are doubling down on experience — we're not just improving usability, we're enabling access to care. 
          Every point of friction is a barrier to health.
        </p>
      </div>

      <h2 className="text-xl mb-4">2026 Enterprise Priorities</h2>
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border-l-4 border-l-blue-600">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg mb-1">Maintain our First Mover Advantage</h3>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                Continue development of GreenShield+ to maintain market leadership through integrated 
                solutions, including ability to deploy on SaaS basis
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                Ensure continued product-market fit as we expand our payer-provider capabilities through 
                strong Voice of Customer programs and data-driven decision making at all levels
              </span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 border-l-4 border-l-purple-600">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg mb-1">Establish Technology as a Competitive Advantage</h3>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>
                Store integrated healthcare and insurance data records at plan member level, seeking to 
                integrate data from other private/public partners over time
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>
                Establish GS+ Self-Serve Insights as a valued part of every Insurance and Health contract
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>
                Launch Payer|Provider Premier Report Series with focus on health outcomes and ROI demonstration
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
