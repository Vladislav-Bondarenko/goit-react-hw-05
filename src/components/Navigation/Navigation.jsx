import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          color: isActive ? "tomato" : "black",
          marginRight: 16,
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          color: isActive ? "tomato" : "black",
        })}
      >
        Movies
      </NavLink>
    </nav>
  );
}
