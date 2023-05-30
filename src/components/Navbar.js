import { Link, Routes, Route } from "react-router-dom"; //import Link,Routes, and Route to connect the pages
import Contact from "./Contact";
import Home from "./Home";
import About from "./About";
import "../App.css";

function Navbar() {
  return (
    <div className="Navbar"> {/* The parent container div with the CSS class 'Navbar' */}
      <nav className="header"> {/* The navigation element with the CSS class 'header' */}
        <ul className="no-bullets"> {/* The unordered list element with the CSS class 'no-bullets' */}
          <li>
            <Link to="/">Home</Link> {/* A Link component representing a navigation link to the 'Home' route */}
          </li>
          <li>
            <Link to="/about">About</Link> {/* A Link component representing a navigation link to the 'About' route */}
          </li>
          <li>
            <Link to="/contact">Contact</Link> {/* A Link component representing a navigation link to the 'Contact' route */}
          </li>
        </ul>
      </nav>
      <Routes> {/* The parent element for defining the route components */}
        <Route path="/" element={<Home />} /> {/* A Route component defining the 'Home' route */}
        <Route path="/about" element={<About />} /> {/* A Route component defining the 'About' route */}
        <Route path="/contact" element={<Contact />} /> {/* A Route component defining the 'Contact' route */}
      </Routes>
    </div>
  );
}

export default Navbar;
