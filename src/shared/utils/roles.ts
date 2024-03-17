export const getRoles = (roles: Role[]) => {
  //   users
  const readUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const createUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const editUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const readRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const createRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const editRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  // privileges
  const readAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const createAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const editAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  // enrollments
  const readEnrollmentsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const createEnrollmentsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const editEnrollmentsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteEnrollmentsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  // followup
  const readFollowUpsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const createFollowUpsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const editFollowUpsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteFollowUpsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_ENROLLMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  return {
    // roles
    readRolesRole,
    createRolesRole,
    editRolesRole,
    deleteRolesRole,

    // privileges
    readAuthorityRole,
    createAuthorityRole,
    editAuthorityRole,
    deleteAuthorityRole,

    // users
    readUsersRole,
    createUsersRole,
    editUsersRole,
    deleteUsersRole,

    // enrollments
    readEnrollmentsRole,
    createEnrollmentsRole,
    editEnrollmentsRole,
    deleteEnrollmentsRole,

    // followups
    readFollowUpsRole,
    createFollowUpsRole,
    editFollowUpsRole,
    deleteFollowUpsRole,
  };
};
