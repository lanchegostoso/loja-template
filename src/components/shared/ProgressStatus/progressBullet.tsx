import { FaCheckSquare } from "react-icons/fa";

export function ProgressBullet({ active, status }: { active: boolean; status: "filled" | "notFilled" }) {
    return (
      <div
        className={`w-5 h-5 rounded-full ${
          active && status === "filled" ? "bg-success900" : active ? "bg-success" : "bg-primary"
        } flex items-center justify-center text-success`}>
        {active && <FaCheckSquare className="w-2.5 h-2.5" />}
      </div>
    );
  }