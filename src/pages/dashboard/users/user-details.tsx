import { format } from "date-fns";

import { useUser } from "@/shared/services/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserDetails = ({ id }: { id: string }) => {
  const { user } = useUser({
    id,
  });
  return (
    <div className="my-6 space-y-4">
      <div className="flex justify-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.dp} />
          <AvatarFallback>
            {user?.username?.substring(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="text-sm">Name</p>
        <h3>{user?.name}</h3>
      </div>
      <div>
        <p className="text-sm">Username</p>
        <h3>{user?.username}</h3>
      </div>
      <div>
        <p className="text-sm">Active</p>
        <h3>{user?.active ? "Yes" : "No"}</h3>
      </div>
      <div>
        <p className="text-sm">Date Created</p>
        <h3>{format(user?.created || "", "dd MMMM, yyyy HH:mm")}</h3>
      </div>
      <div>
        <p className="text-sm">Roles</p>
        <h3 className="flex flex-col ml-2">
          {user?.roles?.map((role, i) => (
            <span key={role?.id}>
              {i + 1}. {role?.name}
            </span>
          ))}
        </h3>
      </div>
      {user?.organisationUnits?.length ? (
        <div>
          <p className="text-sm">Organization Unit(s)</p>
          <h3 className="flex flex-col ml-2">
            {user?.organisationUnits?.map((unit, i) => (
              <span key={unit?.id}>
                {i + 1}. {unit?.name}
              </span>
            ))}
          </h3>
        </div>
      ) : null}
    </div>
  );
};

export default UserDetails;
