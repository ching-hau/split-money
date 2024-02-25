import logo from "./assets/logo.png"
function Header() {
    return (
        <header>
            <img alt="logo" src={logo} id="logo"></img>
            <h1>Split Money</h1>
            <img alt="logo" src={logo} id="logo2"></img>
        </header>
    );
};

export default Header;