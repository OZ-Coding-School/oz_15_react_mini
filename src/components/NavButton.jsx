import {Link} from "react-router-dom";

function NavButton({to, children, className}){
    return(
        <Link to={to} className={className}>
            {children}
        </Link>
    );
}

export default NavButton;