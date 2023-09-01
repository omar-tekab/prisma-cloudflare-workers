import grants from "../grants.json";

const grantsData: any = grants;
export function checkPermission(role:string, action:any) {
    const userRole  = grantsData[role];
    if (!userRole) {
      return false; // Role does not exist
    }
  
    const permissions = userRole.permissions;
    if (!permissions.includes(action)) {
      return false; // User does not have the required permission
    }
  
    return true; // User has the required permission
  }