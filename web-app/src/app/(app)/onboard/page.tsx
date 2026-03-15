import { OnboardingWizard } from "./OnboardingWizard";

export default function OnboardPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Add Client Workspace</h1>
        <p className="text-sm text-gray-400 mt-1">
          Each client gets their own Marketing OS workspace — a separate GitHub repository with their brand, ICP, and all generated content.
        </p>
      </div>
      <OnboardingWizard />
    </div>
  );
}
