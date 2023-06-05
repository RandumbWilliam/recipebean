// import React, { useState } from "react";
// import {
//   IconContainer,
//   IconLabel,
//   IconMenuContainer,
//   Items,
//   SidebarContainer,
//   StyledLogo,
//   OpenSidebarContainer,
//   OpenIconContainer,
//   OpenIconMenuContainer,
//   OpenIconLabel,
// } from "./styles";
// import Icon from "../../elements/Icon";
// import { Drawer } from "@mui/material";
// import { useRouter } from "next/router";
// import Link from "next/link";

// interface SidebarProps {}

// const IconSize = 28;
// const OpenIconSize = 32;
// const IconColor = "#FCFBFC";
// const MenuItems = [
//   {
//     iconName: "Cookbook" as const,
//     label: "Cookbooks",
//     link: "/cookbooks",
//     value: "cookbooks",
//   },
//   {
//     iconName: "Utensils" as const,
//     label: "Recipes",
//     link: "/recipes",
//     value: "recipes",
//   },
//   {
//     iconName: "Basket" as const,
//     label: "Grocery",
//     link: "/grocery",
//     value: "grocery",
//   },
//   {
//     iconName: "Heart" as const,
//     label: "Favourites",
//     link: "/favourites",
//     value: "favourites",
//   },
// ];

// const Sidebar: React.FC<SidebarProps> = ({}) => {
//   const router = useRouter();
//   const currentPath = router.pathname;
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <SidebarContainer>
//         <Items>
//           <IconMenuContainer onClick={handleOpen}>
//             <Icon name="Menu" size={IconSize} color={IconColor} />
//           </IconMenuContainer>
//           {MenuItems.map((item) => (
//             <Link href={item.link} key={item.value}>
//               <a>
//                 <IconContainer active={currentPath === item.link}>
//                   <Icon
//                     name={item.iconName}
//                     size={IconSize}
//                     color={IconColor}
//                   />
//                   <IconLabel>{item.label}</IconLabel>
//                 </IconContainer>
//               </a>
//             </Link>
//           ))}
//         </Items>
//       </SidebarContainer>
//       <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
//         <OpenSidebarContainer>
//           <Items>
//             <OpenIconMenuContainer onClick={handleOpen}>
//               <Icon name="Menu" size={IconSize} color={IconColor} />
//               <StyledLogo color={IconColor} />
//             </OpenIconMenuContainer>
//             {MenuItems.map((item) => (
//               <Link href={item.link} key={item.value}>
//                 <a>
//                   <OpenIconContainer active={currentPath === item.link}>
//                     <Icon
//                       name={item.iconName}
//                       size={OpenIconSize}
//                       color={IconColor}
//                     />
//                     <OpenIconLabel>{item.label}</OpenIconLabel>
//                   </OpenIconContainer>
//                 </a>
//               </Link>
//             ))}
//           </Items>
//         </OpenSidebarContainer>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;
