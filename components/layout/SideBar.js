import Link from "next/link";
import Router from "next/router";
import { destroyCookie } from "nookies";
const SideBar = ({ user }) => {
  const handleSideBar = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    sidebar.classList.toggle("open");
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
  };

  const Logout = () => {
    destroyCookie(null, "access_token");
    Router.push("/login");
  };

  const goToLogin = () => {
    Router.push("/login");
  };

  return (
    <div className='sidebar'>
      <div className='logo-details'>
        <i className='bx bx-lg bxl-mailchimp icon'></i>
        <div className='logo_name'>Sombreros Finos</div>
        <i className='bx bx-menu' id='btn' onClick={handleSideBar}></i>
      </div>
      <ul className='nav-list'>
        <li>
          <Link href='/'>
            <a>
              <i className='bx bx-home-alt'></i>
              <span className='links_name'>Home</span>
              <span className='tooltip'>Home</span>
            </a>
          </Link>
        </li>
        {user && user.role === "admin" && (
          <li>
            <Link href='/products/admin'>
              <a>
                <i className='bx bxs-shopping-bags'></i>
                <span className='links_name'>Administrador Productos</span>
                <span className='tooltip'>Administrador Productos</span>
              </a>
            </Link>
          </li>
        )}
        <li className='profile'>
          <div className='profile-details'>
            <i className='bx bx-user'></i>
            <div className='name_job'>
              <div className='name'>
                {user ? `${user.nombres} ${user.apellidos}` : "Inicie Sesion"}
              </div>
              {/* <div className='job'>{user.role.toUpperCase()}</div> */}
            </div>
          </div>
          {user ? (
            <i
              style={{ cursor: "pointer" }}
              onClick={() => Logout()}
              className='bx bx-log-out'
              id='log_out'
            ></i>
          ) : (
            <i
              style={{ cursor: "pointer" }}
              onClick={() => goToLogin()}
              className='bx bx-log-in'
              id='log_out'
            ></i>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
