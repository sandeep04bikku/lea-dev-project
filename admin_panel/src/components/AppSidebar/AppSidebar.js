import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useModuleSettings } from "../moduleSettingsContext/ModuleSettingsContext";
import { getUserPermissions, hasPermissionForModule, isAdmin } from "../../common/LocalStorageService";

const AppSidebar = () => {
  const { resetSettings } = useModuleSettings(); // Accessing resetSettings from context
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = () => {
    resetSettings(); // Reset settings when navigating between modules
  };

  const menuItems = [
    {
      items: [
        {
          route: "/dashboard",
          icon: "airplay", // Updated icon
          text: "Dashboards",
          name: "dashboard"
        },
        // { route: "/category", icon: "layers", text: "Category", name: "category" }, // Updated icon
        // { route: "/course", icon: "book-open", text: "Course", name: "course" }, // Updated icon
      ],
    },
  ];

  return (
    <div className="left-side-menu" style={{ overflowY: "auto" }}>
      <div className="h-100">
        {/* User box */}
        <div className="user-box text-center">
          {/* User avatar and dropdown */}
        </div>
        {/* Sidemenu */}
        <div id="sidebar-menu">
          <ul id="side-menu">
            {menuItems.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {section.items.map((item, itemIndex) => {
                  // const hasPermission = item.name === "dashboard" || ((hasPermissionForModule(item.name) && getUserPermissions(item.name).is_view) || isAdmin());
                  // if (!hasPermission) return null;

                  const isActive = location.pathname === item.route;
                  const isSubOpen =
                    item?.subItems &&
                    item?.subItems?.some((val) => location.pathname === val.route);
                  
                  return (
                    <li
                      key={itemIndex}
                      className={isActive || isSubOpen ? "menuitem-active" : ""}
                    >
                      <Link
                        to={item.route}
                        data-bs-toggle={item.subItems ? "collapse" : undefined}
                        onClick={handleNavigation} // Call handleNavigation on link click
                      >
                        <i data-feather={item.icon} />
                        {item.badge && (
                          <span className={`badge ${item.badge.class}`}>{item.badge.text}</span>
                        )}
                        <span> {item.text} </span>
                        {item.subItems && !item.badge && <span className="menu-arrow" />}
                      </Link>
                      {/* Render subitems if exist */}
                      {item.subItems && (
                        <div className="collapse" id={item.route.substring(1)}>
                          <ul className="nav-second-level">
                            {item.subItems.map((subItem, subItemIndex) => {
                              const isActive = location.pathname === subItem.route;
                              return (
                                <li
                                  key={subItemIndex}
                                  className={isActive ? "menuitem-active" : ""}
                                >
                                  <Link to={subItem.route}>{subItem.text}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;




// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useModuleSettings } from "../moduleSettingsContext/ModuleSettingsContext";
// import { getUserPermissions, hasPermissionForModule } from "../../common/LocalStorageService";

// const AppSidebar = () => {
//   const { resetSettings } = useModuleSettings(); // Accessing resetSettings from context
//   const location = useLocation();
//   const navigate = useNavigate();

//   const hasPemisisson = hasPermissionForModule("review");

//   console.log(hasPemisisson,"permission");
  

//   const handleNavigation = () => {
//     resetSettings(); // Reset settings when navigating between modules
//   };

//   const menuItems = [
//     {
//       items: [
//         {
//           route: "/dashboard",
//           icon: "airplay", // Updated icon
//           text: "Dashboards",
//           name:"dashboard" 
//         },
//         { route: "/users", icon: "users", text: "Users",name:"user" }, // Updated icon
//         { route: "/trainer", icon: "user-check", text: "Trainers",name:"trainer"  }, // Updated icon
//         { route: "/category", icon: "layers", text: "Category" ,name:"category" }, // Updated icon
//         { route: "/course", icon: "book-open", text: "Course",name:"course"  }, // Updated icon
//         { route: "/test", icon: "file-text", text: "Test",name:"test"  }, // Updated icon
//         { route: "/discount", icon: "percent", text: "Discount Code",name:"discount code"  }, // Updated icon
//         {
//           route: "#sidebarReview",
//           icon: "star", // Updated icon for Review
//           text: "Review",
//           name:"review" ,
//           subItems: [
//             { route: "/review/course", text: "Course Review" },
//           ],
//         },
//         { route: "/corporate-profile", icon: "briefcase", text: "Corporate Profile",name:"corporate profile"  }, // Updated icon
//         { route: "/subadmin", icon: "shield", text: "Sub-Admin",name:""  }, // Updated icon
//         { route: "/language", icon: "globe", text: "Language",name:"language"  }, // Updated icon
//         { route: "/community-forum", icon: "message-square", text: "Community Forum",name:"community forum"  }, // Updated icon
//         { route: "/blog", icon: "edit", text: "Blogs" ,name:"blog" },
//         { route: "/animated-video", icon: "film", text: "Animated Video" ,name:"animated video" },
//         { route: "apps-chat.html", icon: "message-square", text: "Chat" ,name:"chat" },
//         {
//           route: "#sidebarCrm",
//           icon: "users",
//           text: "CMS",
//           name:"cms" ,
//           subItems: [
//             { route: "/about", text: "About Us" },
//             { route: "privacy-policy", text: "Privacy Policy" },
//             { route: "/terms-condition", text: "Term & Condition" },
//             { route: "/faq", text: "FAQ" },
//             { route: "contact-us", text: "Contact Us" },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="left-side-menu" style={{overflowY:"auto"}}>
//       <div className="h-100">
//         {/* User box */}
//         <div className="user-box text-center">
//           {/* User avatar and dropdown */}
//         </div>
//         {/* Sidemenu */}
//         <div id="sidebar-menu">
//           <ul id="side-menu">
//             {menuItems.map((section, sectionIndex) => (
//               <React.Fragment key={sectionIndex}>
//                 {section.items.map((item, itemIndex) => {
//                   const isActive = location.pathname === item.route;
//                   const isSubOpen =
//                     item?.subItems &&
//                     item?.subItems?.some((val) => location.pathname === val.route);
//                   return (
//                     <li
//                       key={itemIndex}
//                       className={isActive || isSubOpen ? "menuitem-active" : ""}
//                     >
//                       <Link
//                         to={item.route}
//                         data-bs-toggle={item.subItems ? "collapse" : undefined}
//                         onClick={handleNavigation} // Call handleNavigation on link click
//                       >
//                         <i data-feather={item.icon} />
//                         {item.badge && (
//                           <span className={badge ${item.badge.class}}>{item.badge.text}</span>
//                         )}
//                         <span> {item.text} </span>
//                         {item.subItems && !item.badge && <span className="menu-arrow" />}
//                       </Link>
//                       {/* Render subitems if exist */}
//                       {item.subItems && (
//                         <div className="collapse" id={item.route.substring(1)}>
//                           <ul className="nav-second-level">
//                             {item.subItems.map((subItem, subItemIndex) => {
//                               const isActive = location.pathname === subItem.route;
//                               return (
//                                 <li
//                                   key={subItemIndex}
//                                   className={isActive ? "menuitem-active" : ""}
//                                 >
//                                   <Link to={subItem.route}>{subItem.text}</Link>
//                                 </li>
//                               );
//                             })}
//                           </ul>
//                         </div>
//                       )}
//                     </li>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppSidebar;





// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const AppSidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const menuItems = [
//     {
//       items: [
//         {
//           route: "/dashboard",
//           icon: "airplay",
//           text: "Dashboards",
//         },
//         { route: "/users", icon: "user", text: "Users" },
//         { route: "/trainer", icon: "user", text: "Trainers" },
//         { route: "/category", icon: "user", text: "Category" },
//         { route: "/course", icon: "user", text: "Course" },
//         { route: "/test", icon: "user", text: "Test" },
//         { route: "apps-chat.html", icon: "message-square", text: "Chat" },
//         // {
//         //   route: "#sidebarEcommerce",
//         //   icon: "shopping-cart",
//         //   text: "Ecommerce",
//         //   subItems: [
//         //     { route: "/dashboard2", text: "Dashboard" },
//         //     { route: "/dashboard3", text: "Products" },
//         //     { route: "ecommerce-product-detail.html", text: "Product Detail" },
//         //     { route: "ecommerce-product-edit.html", text: "Add Product" },
//         //     { route: "ecommerce-customers.html", text: "Customers" },
//         //     { route: "ecommerce-orders.html", text: "Orders" },
//         //     { route: "ecommerce-order-detail.html", text: "Order Detail" },
//         //     { route: "ecommerce-sellers.html", text: "Sellers" },
//         //     { route: "ecommerce-cart.html", text: "Shopping Cart" },
//         //     { route: "ecommerce-checkout.html", text: "Checkout" },
//         //   ],
//         // },
//         {
//           route: "#sidebarCrm",
//           icon: "users",
//           text: "CRM",
//           subItems: [
//             { route: "/dashboard4", text: "Dashboard" },
//             { route: "crm-contacts.html", text: "Contacts" },
//             { route: "crm-opportunities.html", text: "Opportunities" },
//             { route: "crm-leads.html", text: "Leads" },
//             { route: "crm-customers.html", text: "Customers" },
//           ],
//         },
//         // {
//         //   route: "#sidebarEmail",
//         //   icon: "mail",
//         //   text: "Email",
//         //   subItems: [
//         //     { route: "email-inbox.html", text: "Inbox" },
//         //     { route: "email-read.html", text: "Read Email" },
//         //     { route: "email-compose.html", text: "Compose Email" },
//         //     { route: "email-templates.html", text: "Email Templates" },
//         //   ],
//         // },
//         // {
//         //   route: "apps-social-feed.html",
//         //   icon: "rss",
//         //   badge: { class: "bg-pink float-end", text: "Hot" },
//         //   text: "Social Feed",
//         // },
//         // { route: "apps-companies.html", icon: "activity", text: "Companies" },
//       ],
//     },
//   ];

//   return (
//     <div className="left-side-menu">
//       <div className="h-100" >
//         {/* User box */}
//         <div className="user-box text-center">
//           <img
//             src="../assets/images/users/user-1.jpg"
//             alt="user-img"
//             title="Mat Helme"
//             className="rounded-circle avatar-md"
//           />
//           <div className="dropdown">
//             <a
//               href="javascript: void(0);"
//               className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block"
//               data-bs-toggle="dropdown"
//             >
//               Geneva Kennedy
//             </a>
//             <div className="dropdown-menu user-pro-dropdown">
//               {/* item*/}
//               <a
//                 href="javascript:void(0);"
//                 className="dropdown-item notify-item"
//               >
//                 <i className="fe-user me-1" />
//                 <span>My Account</span>
//               </a>
//               {/* item*/}
//               <a
//                 href="javascript:void(0);"
//                 className="dropdown-item notify-item"
//               >
//                 <i className="fe-settings me-1" />
//                 <span>Settings</span>
//               </a>
//               {/* item*/}
//               <a
//                 href="javascript:void(0);"
//                 className="dropdown-item notify-item"
//               >
//                 <i className="fe-lock me-1" />
//                 <span>Lock Screen</span>
//               </a>
//               {/* item*/}
//               <a
//                 href="javascript:void(0);"
//                 className="dropdown-item notify-item"
//               >
//                 <i className="fe-log-out me-1" />
//                 <span>Logout</span>
//               </a>
//             </div>
//           </div>
//           <p className="text-muted">Admin Head</p>
//         </div>
//         {/*- Sidemenu */}
//         <div id="sidebar-menu">
//           <ul id="side-menu">
//             {menuItems.map((section, sectionIndex) => (
//               <React.Fragment key={sectionIndex}>
//                 {section.items.map((item, itemIndex) => {
//                   const isActive = location.pathname === item.route;
//                   const isSubOpen =
//                     item?.subItems &&
//                     item?.subItems?.some(
//                       (val) => location.pathname === val.route
//                     );
//                   return (
//                     <li
//                       key={itemIndex}
//                       className={isActive || isSubOpen ? "menuitem-active" : ""}
//                     >
//                       <Link
//                         to={item.route}
//                         data-bs-toggle={item.subItems ? "collapse" : undefined}
//                       >
//                         <i data-feather={item.icon} />
//                         {item.badge && (
//                           <span className={`badge ${item.badge.class}`}>
//                             {item.badge.text}
//                           </span>
//                         )}
//                         <span> {item.text} </span>
//                         {item.subItems && !item.badge && (
//                           <span className="menu-arrow" />
//                         )}
//                       </Link>
//                       {item.subItems && (
//                         <div className="collapse" id={item.route.substring(1)}>
//                           <ul className="nav-second-level">
//                             {item.subItems.map((subItem, subItemIndex) => {
//                               const isActive =
//                                 location.pathname === subItem.route;
//                               return (
//                                 <li
//                                   className={isActive ? "menuitem-active" : ""}
//                                   key={subItemIndex}
//                                 >
//                                   <a
//                                     onClick={() => {
//                                       navigate(subItem.route);
//                                     }}
//                                   >
//                                     {subItem.text}
//                                   </a>
//                                 </li>
//                               );
//                             })}
//                           </ul>
//                         </div>
//                       )}
//                     </li>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </ul>
//         </div>

//         {/* <div className="clearfix" /> */}
//       </div>
//     </div>
//   );
// };

// export default AppSidebar;
