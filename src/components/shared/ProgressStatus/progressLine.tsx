export function ProgressLine({ active }: { active: boolean }) {
    return (
      <div
        className={`flex-1 h-0.5 bg-${active ? "success" : "primary"} rounded-lg`}
      />
    );
  }