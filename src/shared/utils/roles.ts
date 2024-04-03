export const getRoles = (roles: Role[]) => {
  //   users
  const readUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_USERS" || privilege?.value === "ALL"
    )
  )?.id;

  const createUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_USERS" || privilege?.value === "ALL"
    )
  )?.id;

  const editUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_USERS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteUsersRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_USERS" || privilege?.value === "ALL"
    )
  )?.id;

  // roles
  const readRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_ROLES" || privilege?.value === "ALL"
    )
  )?.id;

  const createRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_ROLES" || privilege?.value === "ALL"
    )
  )?.id;

  const editRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_ROLES" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteRolesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_ROLES" || privilege?.value === "ALL"
    )
  )?.id;

  // privileges
  const readAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_AUTHORITIES" || privilege?.value === "ALL"
    )
  )?.id;

  const createAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_AUTHORITIES" || privilege?.value === "ALL"
    )
  )?.id;

  const editAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_AUTHORITIES" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteAuthorityRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_AUTHORITIES" || privilege?.value === "ALL"
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
        privilege?.value === "READ_FOLLOWUPS" || privilege?.value === "ALL"
    )
  )?.id;

  const createFollowUpsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_FOLLOWUPS" || privilege?.value === "ALL"
    )
  )?.id;

  const editFollowUpsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_FOLLOWUPS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteFollowUpsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_FOLLOWUPS" || privilege?.value === "ALL"
    )
  )?.id;

  // disbursement
  const readDisbursementsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_DISBURSEMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const createDisbursementsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_DISBURSEMENTS" || privilege?.value === "ALL"
    )
  )?.id;

  const editDisbursementsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_DISBURSEMENTS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const deleteDisbursementsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_DISBURSEMENTS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  // blood collection
  const readBloodCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_BLOODCOLLECTIONS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const createBloodCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_BLOODCOLLECTIONS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const editBloodCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_BLOODCOLLECTIONS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const deleteBloodCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_BLOODCOLLECTIONS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  // data collection
  const readDataCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_DATACOLLECTIONS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const createDataCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_DATACOLLECTIONS" || privilege?.value === "ALL"
    )
  )?.id;

  const editDataCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_DATACOLLECTIONS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const deleteDataCollectionRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_DATACOLLECTIONS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  // configurations
  // menu
  const readMenuRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_MENUS" || privilege?.value === "ALL"
    )
  )?.id;

  const createMenuRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_MENUS" || privilege?.value === "ALL"
    )
  )?.id;

  const editMenuRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_MENUS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteMenuRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_MENUS" || privilege?.value === "ALL"
    )
  )?.id;

  // fields
  const readFieldsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_FIELDS" || privilege?.value === "ALL"
    )
  )?.id;

  const createFieldsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_FIELDS" || privilege?.value === "ALL"
    )
  )?.id;

  const editFieldsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_FIELDS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteFieldsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_FIELDS" || privilege?.value === "ALL"
    )
  )?.id;

  // forms
  const readFormsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_FORMS" || privilege?.value === "ALL"
    )
  )?.id;

  const createFormsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_FORMS" || privilege?.value === "ALL"
    )
  )?.id;

  const editFormsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_FORMS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteFormsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_FORMS" || privilege?.value === "ALL"
    )
  )?.id;

  // sections
  const readSectionsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_SECTIONS" || privilege?.value === "ALL"
    )
  )?.id;

  const createSectionsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_SECTIONS" || privilege?.value === "ALL"
    )
  )?.id;

  const editSectionsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_SECTIONS" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteSectionsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_SECTIONS" || privilege?.value === "ALL"
    )
  )?.id;

  // objectives
  const readObjectivesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_OBJECTIVES" || privilege?.value === "ALL"
    )
  )?.id;

  const createObjectivesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_OBJECTIVES" || privilege?.value === "ALL"
    )
  )?.id;

  const editObjectivesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_OBJECTIVES" || privilege?.value === "ALL"
    )
  )?.id;

  const deleteObjectivesRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_OBJECTIVES" || privilege?.value === "ALL"
    )
  )?.id;

  // organisation units
  const readOrganisationUnitsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "READ_ORGANISATIONUNITS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const createOrganisationUnitsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "ADD_ORGANISATIONUNITS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const editOrganisationUnitsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "UPDATE_ORGANISATIONUNITS" ||
        privilege?.value === "ALL"
    )
  )?.id;

  const deleteOrganisationUnitsRole = roles?.find((role) =>
    role?.privileges?.find(
      (privilege) =>
        privilege?.value === "DELETE_ORGANISATIONUNITS" ||
        privilege?.value === "ALL"
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

    // disbursement
    readDisbursementsRole,
    createDisbursementsRole,
    editDisbursementsRole,
    deleteDisbursementsRole,

    // blood collection
    readBloodCollectionRole,
    createBloodCollectionRole,
    editBloodCollectionRole,
    deleteBloodCollectionRole,

    // data collection
    readDataCollectionRole,
    createDataCollectionRole,
    editDataCollectionRole,
    deleteDataCollectionRole,

    // configurations
    // menu
    readMenuRole,
    createMenuRole,
    editMenuRole,
    deleteMenuRole,

    // forms
    readFormsRole,
    createFormsRole,
    editFormsRole,
    deleteFormsRole,

    // fields
    readFieldsRole,
    createFieldsRole,
    editFieldsRole,
    deleteFieldsRole,

    // sections
    readSectionsRole,
    createSectionsRole,
    editSectionsRole,
    deleteSectionsRole,

    // objectives
    readObjectivesRole,
    createObjectivesRole,
    editObjectivesRole,
    deleteObjectivesRole,

    // organisation units
    readOrganisationUnitsRole,
    createOrganisationUnitsRole,
    editOrganisationUnitsRole,
    deleteOrganisationUnitsRole,
  };
};
