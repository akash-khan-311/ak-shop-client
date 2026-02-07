export default function RoleBadges({
  role,
  status,
}: {
  role: "admin" | "user" | "superAdmin";
  status?: string;
}) {
  const roleStyle =
    role === "admin" ? "bg-red/15 text-red" : "bg-green/15 text-green";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${roleStyle}`}
      >
        {role.toUpperCase()}
      </span>
      {status && (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${status === "active" ? "bg-green text-gray-2" : "bg-red text-gray-2"} bg-green text-gray-2`}
        >
          {status.toUpperCase()}
        </span>
      )}
    </div>
  );
}
