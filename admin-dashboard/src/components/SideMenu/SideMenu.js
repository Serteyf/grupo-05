import SideMenuLink from "./SideMenuLink/SideMenuLink";

function SideMenu() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Admin</div>
      </a>

      <hr className="sidebar-divider my-0" />

      <SideMenuLink title="General Information" />

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Actions</div>

      <SideMenuLink title="Listed Products" />

      <SideMenuLink title="Listed Users" />

      <SideMenuLink title="More..." />

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default SideMenu;
