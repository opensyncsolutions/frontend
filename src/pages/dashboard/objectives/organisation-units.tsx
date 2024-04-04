import { DATE_FORMAT } from "@/shared/constants/constants";
import { format } from "date-fns";

const OrganisationUnits = ({ objective }: { objective: Objective }) => {
  return (
    <div className="min-h-60 space-y-5 px-4">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {objective?.organisationUnits?.map((unit) => (
          <li className="border rounded p-3 flex flex-col gap-2 text-sm">
            <span>
              <b>Name:</b> {unit?.name}
            </span>
            {unit?.shortName && (
              <span>
                <b>Short Name:</b> {unit?.shortName}
              </span>
            )}
            <span>
              <b>Level:</b> {unit?.level}
            </span>
            <span>
              <b>Active:</b> {unit?.active ? "YES" : "NO"}
            </span>
            <span>
              <b>Created:</b> {format(unit?.created, DATE_FORMAT)}
            </span>
            <span>
              <b>Opening Date:</b> {format(unit.openingDate, DATE_FORMAT)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganisationUnits;
