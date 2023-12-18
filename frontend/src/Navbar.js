import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Navbar() {
  const location = useLocation();
  const handleNavigation = (e) => {
    if (location.pathname === '/Calculator') {
      const userConfirmed = window.confirm('Are you sure you want to leave this page? Your progress will be lost.');
      if (!userConfirmed) {
        e.preventDefault();
      }
    }
  }
  return (
    <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="navItem" to="/" onClick={handleNavigation}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="navItem" to="https://iitk.ac.in/ckc/" onClick={handleNavigation}>About CKCEPS</Link>
            </li>
            <li className="nav-item">
              <Link className="navItem" to="/Connect" onClick={handleNavigation}>Connect</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}