import grants from "../grants.json";

const grantsData: any = grants;
export function checkPermission(roles:string[], action:any) {
  for (const role of roles) {
    const userRole = grantsData[role];
    if (userRole && userRole.permissions.includes(action)) {
      return true; // User has the required permission in at least one role
    }
  }
  
  return false; // User does not have the required permission in any role
}
