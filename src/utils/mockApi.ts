// utils/mockApi.ts

// import { RolesResponse, PermissionsResponse } from "../t"; 

// types/index.ts (or your preferred types file)

// SubMenu Interface
export interface SubMenu {
    SubMenuId: number;  // Unique identifier for the sub-menu
    SubMenu: string;    // Name of the sub-menu
  }
  
  // Menu Interface
  export interface Menu {
    MenuId: number;     // Unique identifier for the menu
    Menu: string;       // Name of the menu
    SubMenus: SubMenu[]; // Array of sub-menus under this menu
  }
  
  // Role Interface for RolesResponse
  export interface Role {
    RoleId: number;     // Unique identifier for the role
    RoleName: string;   // Name of the role
    Menus: Menu[];      // Array of menus associated with this role
  }
  
  // RolesResponse Interface
  export interface RolesResponse {
    Roles: Role[];      // Array of roles
  }
  
  // Permission Interface for PermissionsResponse
  export interface Permission {
    MenuId: number;     // Unique identifier for the menu
    SubMenuId: number;  // Unique identifier for the sub-menu
    SubMenu: string;    // Name of the sub-menu
  }
  
  // RolePermissions Interface for PermissionsResponse
  export interface RolePermissions {
    RoleId: number;     // Unique identifier for the role
    RoleName: string;   // Name of the role
    Permissions: Permission[]; // Array of permissions for this role
  }
  
  // PermissionsResponse Interface
  export interface PermissionsResponse {
    Roles: RolePermissions[]; // Array of roles with their permissions
  }
  

export const fetchRolesData = async (): Promise<RolesResponse> => {
  // Simulate fetching data from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Roles: [
          {
            RoleId: 1,
            RoleName: "Admin",
            Menus: [
              {
                MenuId: 1,
                Menu: "Dashboard",
                SubMenus: [{ SubMenuId: 1, SubMenu: "View" }],
              },
              // Add more menus as needed
            ],
          },
          // Add more roles as needed
        ],
      });
    }, 1000);
  });
};

export const fetchPermissionsData = async (): Promise<PermissionsResponse> => {
  // Simulate fetching data from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Roles: [
          {
            RoleId: 1,
            RoleName: "Admin",
            Permissions: [
              { MenuId: 1, SubMenuId: 1, SubMenu: "View" },
              // Add more permissions as needed
            ],
          },
          // Add more roles as needed
        ],
      });
    }, 1000);
  });
};
