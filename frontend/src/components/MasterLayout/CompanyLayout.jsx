import React, { Fragment, useRef } from 'react';
import { Accordion, Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {AiOutlineUnorderedList, AiOutlineBank,AiOutlineProject,AiOutlineLogout, AiOutlineMenu, AiOutlineUser} from 'react-icons/ai';
import {BsBagPlus, BsBagX, BsBox, BsCartPlus, BsCircle, BsGraphUp, BsPeople,BsCollectionFill } from 'react-icons/bs';
import {IoCreateOutline} from 'react-icons/io5';
import {RiDashboardLine} from 'react-icons/ri';
import { FaUniversity,FaGift,FaUsers,FaHandshake,FaUserSecret} from "react-icons/fa";
import { TbSettings2 } from "react-icons/tb";
import { IoIosGift,IoIosNotifications } from "react-icons/io";
import {TbTruckDelivery} from 'react-icons/tb';
import { GiExpense } from "react-icons/gi";
import logo from "../../assets/images/defaultLogo.png"
import userPhoto from "../../assets/images/user.jpg"

import {getUserDetails, removeSessions} from "../../helper/SessionHelper";
import AuthUser from '../../AuthApi/AuthUser';

const MasterLayout = (props) => {
  let contentRef, sideNavRef,topNavRef = useRef();

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    let topNav = topNavRef;
    if (sideNav.classList.contains('side-nav-open')) {
      sideNav.classList.add('side-nav-close');
      sideNav.classList.remove('side-nav-open');
      content.classList.add('content-expand');
      content.classList.remove('content');
      topNav.classList.remove('top-nav-open');
      topNav.classList.add('top-nav-close');
    } else {
      sideNav.classList.remove('side-nav-close');
      sideNav.classList.add('side-nav-open');
      content.classList.remove('content-expand');
      content.classList.add('content');
      topNav.classList.add('top-nav-open');
      topNav.classList.remove('top-nav-close');
    }
  };

  const isSidebarAccordionActive = () => {
    let urlList = [];
    sidebarItems.map((item) => {
      urlList.push(
          item.subMenu.map((subItem) => {
            return subItem?.url;
          })
      );
    });
    return urlList.findIndex((items) =>
        items.includes(window.location.pathname)
    );
  };
  const {users} = AuthUser();
  const userType = users ? users.user_type : 'client';
  

  const companySidebarItems = [
        {
            title: 'Dashboard',
            icon: <RiDashboardLine className="side-bar-item-icon" />,
            url: '/client',
            subMenu: [],
        },
        {
      title: 'Members',
      icon: <BsPeople className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Add Member',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/member/create',
        },
        {
          title: 'Member List',
          icon: (
              <BsCircle  size={16} className="side-bar-subitem-icon" />
          ),
          url: '/member/list',
        },
      ],
    },
    {
      title: 'Patner',
      icon: <FaHandshake className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Add Patner',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/patner/create',
        },
        {
          title: 'Patner List',
          icon: (
              <BsCircle  size={16} className="side-bar-subitem-icon" />
          ),
          url: '/patner/list',
        },
      ],
    },
    {
      title: 'Project',
      icon: <AiOutlineProject  className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Add Project',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/project/create',
        },
        {
          title: 'Project List',
          icon: (
              <BsCircle  size={16} className="side-bar-subitem-icon" />
          ),
          url: '/project/list',
        },
      ],
    },
    {
      title: 'Employees',
      icon: <FaUsers className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Add Employee',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/employee/create',
        },
        {
          title: 'Employee List',
          icon: (
              <BsCircle  size={16} className="side-bar-subitem-icon" />
          ),
          url: '/employee/list',
        },
      ],
    },
    {
      title: 'Bank',
      icon: <AiOutlineBank className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
        title: 'Bank Accounts',
        icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
        url: '/bank-accounts/list',
      },
      {
        title: 'Blance Transfer',
        icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
        url: '/Product',
      },
      ],
    },
    {
      title: 'Collection',
      icon: <BsCollectionFill  className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Receiveable payment',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/Product',
        },
        {
        title: 'Project revenues',
        icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
        url: '/bank-accounts/list',
      },
      {
        title: 'Other revenues',
        icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
        url: '/Product',
      }
      ],
    },
    {
      title: 'Expense',
      icon: <GiExpense  className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Salary payments',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/Product',
        },
        {
        title: 'Invest payments',
        icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
        url: '/bank-accounts/list',
      },
      {
        title: 'Other payments',
        icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
        url: '/Product',
      }
      ],
    },
    {
      title: 'Notice',
      icon: <IoIosNotifications  className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Add Notice',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/notices/create',
        },
        {
          title: 'Notice List',
          icon: (
              <BsCircle  size={16} className="side-bar-subitem-icon" />
          ),
          url: '/notices/list',
        },
      ],
    },
    {     
      title: 'Report',
          icon: <BsGraphUp className="side-bar-item-icon" />,
          url: '/Report',
          subMenu: [
            {
              title: 'Project Report',
              icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
              url: '/SaleReportPage',
            },
            {
              title: 'Income Report',
              icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
              url: '/ExpenseReportPage',
            },
            {
              title: 'Expense Report',
              icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
              url: '/ExpenseReportPage',
            },
          ],
        },
    {
      title: 'Designations',
      icon: <FaUserSecret  className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Add',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/designation/create',
        },
        {
          title: 'List',
          icon: (
              <BsCircle  size={16} className="side-bar-subitem-icon" />
          ),
          url: '/designation/list',
        },
      ],
    },
    {
      title: 'Settings',
      icon: <TbSettings2 className="side-bar-item-icon" />,
      url: '/Product',
      subMenu: [
        {
          title: 'Roles',
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: '/BrandCreateUpdatePage',
        },
        {
          title: 'Company Profile',
          icon: (
              <BsCircle  size={16} className="side-bar-subitem-icon" />
          ),
          url: '/BrandListPage',
        },
      ],
    },
    ];
    

// const sidebarItems = userType === 'client' ? companySidebarItems : adminSidebarItems;
const sidebarItems = userType === 'client' ? companySidebarItems : (userType === 'super' ? superSidebarItems : adminSidebarItems);

  const onLogout=()=>{
    removeSessions();
  }
  return (
       <Fragment>
           <Navbar className="fixed-top px-0">
             <Container fluid={true}>
               <Navbar.Brand>
                 <div ref={(div) => { topNavRef = div }} className="top-nav-open">
                   <h4 className="text-white m-0 p-0">
                     <a onClick={MenuBarClickHandler}>
                       <AiOutlineMenu />
                     </a>
                   </h4>
                 </div>
               </Navbar.Brand>
               <div className="float-right h-auto d-flex align-items-center">
                 <div className="user-dropdown">
                   <img className="icon-nav-img icon-nav" src={userPhoto} alt="" />
                   <div className="user-dropdown-content ">
                     <div className="mt-4 text-center">
                       <img className="icon-nav-img" src={userPhoto} alt="" />
                       <h6>{userType}</h6>
                       <hr className="user-dropdown-divider p-0" />
                     </div>
                     <NavLink to="/Profile" className="side-bar-item">
                       <AiOutlineUser className="side-bar-item-icon" />
                       <span className="side-bar-item-caption">Profile</span>
                     </NavLink>
                     <a onClick={onLogout} className="side-bar-item">
                       <AiOutlineLogout className="side-bar-item-icon" />
                       <span className="side-bar-item-caption">Logout</span>
                     </a>
                   </div>
                 </div>
               </div>
             </Container>
           </Navbar>
           <div ref={(div) => { sideNavRef = div }} className="side-nav-open border-radius-0 card">
             <NavLink to="/client" end className="d-flex justify-content-center sticky-top bg-white">
               <img src={logo} className="logo w-25" />
             </NavLink>
        <div className='bg-pannel'>
          <h5 className='text-center mt-1 pannelTitle fs-5'>Company Pannel</h5>
        </div>
             <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
               {sidebarItems.map((item, index) => {
                 return item.subMenu.length !== 0 ? (
                   <Accordion.Item key={index.toString()} eventKey={`${index}`} className="mt-2">
                     <Accordion.Header>
                       <div className="side-bar-item">
                         {item.icon}
                         <span className="side-bar-item-caption">{item.title}</span>
                       </div>
                     </Accordion.Header>
                     <Accordion.Body>
                       {item.subMenu.map((subItem, index) => (
                         <NavLink
                           key={index.toString()}
                           className={(navData) => 
                             navData.isActive ? 'side-bar-subitem-active side-bar-subitem' : 'side-bar-subitem'
                           }
                           to={subItem?.url}
                           end
                         >
                           {subItem?.icon}
                           <span className="side-bar-subitem-caption">{subItem?.title}</span>
                         </NavLink>
                       ))}
                     </Accordion.Body>
                   </Accordion.Item>
                 ) : (
                   <NavLink
                     className={(navData) =>
                       navData.isActive ? 'side-bar-item-active side-bar-item mt-2' : 'side-bar-item mt-2'
                     }
                     to={item.url}
                     end
                   >
                     {item.icon}
                     <span className="side-bar-item-caption">{item.title}</span>
                   </NavLink>
                 );
               })}
             </Accordion>
           </div>
           <div ref={(div) => (contentRef = div)} className="content">
             {props.children}
           </div>
         </Fragment>
  );
};

export default MasterLayout;
