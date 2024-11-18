// AuthService.js

// Function to save user data to local storage
export const saveUserDataToLocal = (adminData) => {
  localStorage.setItem('adminData', btoa(JSON.stringify(adminData)))
}

// Function to get user data from local storage
export const getUserDataFromLocal = () => {
  const userDataString = localStorage.getItem('adminData')
  return userDataString ? JSON.parse(atob(userDataString)) : null
}

// Function to remove user data from local storage
export const removeUserDataFromLocal = () => {
  localStorage.removeItem('adminData')
}

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const adminData = getUserDataFromLocal()
  return adminData && adminData.token
}

// Function to get the user token
export const getToken = () => {
  const adminData = getUserDataFromLocal()
  // console.log('Login User ', adminData)
  return adminData ? adminData.token : null
}

export const isAdmin = () => {
  const adminData = getUserDataFromLocal()
  return adminData && adminData.role === 'admin'
}

export const isSubadmin = () => {
  const adminData = getUserDataFromLocal()
  return adminData && adminData.role === 'subadmin'
}

export const hasPermissionForModule = (moduleName) => {
  // console.log(moduleName,"module name");
  
  const adminData = getUserDataFromLocal()
  console.log(adminData,"has permission");

  const permission = adminData?.permission?.find((perm) => perm.permission_module.name.toLowerCase() === moduleName.toLowerCase());

  console.log(isAdmin(),"perm");
  
    
  return (
    isAdmin() ||
    (permission &&
      (permission.is_add || permission.is_view || permission.is_edit || permission.is_delete || permission.is_status))
  )
}

export const getUserPermissions = (moduleName) => {
  // console.log(moduleName,"getuser module");
  
  const adminData = getUserDataFromLocal()
  console.log('adminData: ', adminData)
  const permission =
    adminData?.permission && adminData?.permission?.find((perm) =>perm.permission_module.name.toLowerCase() === moduleName.toLowerCase())
    console.log(permission,"permission subadmin");
    
  return permission || {}
}

export const getLocalStorageItem = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
      try {
          const decodedValue = atob(storedValue);
          return JSON.parse(decodedValue);
      } catch (e) {
          console.error("Error decoding localStorage value", e);
          return defaultValue;
      }
  }
  return defaultValue;
};

export const setLocalStorageItem = (key, value) => {
  const encodedValue = btoa(JSON.stringify(value));
  localStorage.setItem(key, encodedValue);
};

export const clearLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};
