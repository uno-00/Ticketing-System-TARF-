export type ProfilePlacementField = {
  variable: string;
  label: string;
  hint: string;
};

/** Always available in Print Template → Fields to place (auto-filled from requester). */
export const DEFAULT_PROFILE_PLACEMENT_FIELDS: ProfilePlacementField[] = [
  { variable: "{{prof_division}}", label: "Division/Section", hint: "Requester profile (auto-filled)" },
  { variable: "{{prof_first}}", label: "First Name", hint: "Requester profile (auto-filled)" },
  { variable: "{{prof_middle}}", label: "Middle Initial", hint: "Requester profile (auto-filled)" },
  { variable: "{{prof_last}}", label: "Last Name", hint: "Requester profile (auto-filled)" },
  { variable: "{{prof_email}}", label: "Email Address", hint: "Requester profile (auto-filled)" },
  { variable: "{{prof_designation}}", label: "Designation", hint: "Requester profile (auto-filled)" },
];

export const PROFILE_PLACEMENT_VARIABLES = new Set(
  DEFAULT_PROFILE_PLACEMENT_FIELDS.map((field) => field.variable),
);

export type RequesterProfile = {
  name?: string;
  email?: string;
  division?: string;
  firstName?: string;
  middleInitial?: string;
  lastName?: string;
  designation?: string;
};

export function parseDisplayName(name: string): {
  firstName: string;
  middleInitial: string;
  lastName: string;
} {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", middleInitial: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], middleInitial: "", lastName: "" };
  if (parts.length === 2) return { firstName: parts[0], middleInitial: "", lastName: parts[1] };
  return {
    firstName: parts[0],
    middleInitial: parts[1].replace(/\./g, "").slice(0, 1),
    lastName: parts.slice(2).join(" "),
  };
}

export function buildRequesterProfileAnswerValues(
  profile: RequesterProfile,
): Record<string, string> {
  let firstName = (profile.firstName ?? "").trim();
  let middleInitial = (profile.middleInitial ?? "").trim();
  let lastName = (profile.lastName ?? "").trim();

  if (!firstName && !lastName && (profile.name ?? "").trim()) {
    const parsed = parseDisplayName(profile.name!);
    firstName = parsed.firstName;
    middleInitial = middleInitial || parsed.middleInitial;
    lastName = parsed.lastName;
  }

  return {
    "{{prof_division}}": (profile.division ?? "").trim(),
    "{{prof_first}}": firstName,
    "{{prof_middle}}": middleInitial,
    "{{prof_last}}": lastName,
    "{{prof_email}}": (profile.email ?? "").trim(),
    "{{prof_designation}}": (profile.designation ?? "").trim(),
  };
}
