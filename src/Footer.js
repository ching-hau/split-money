import emailIcon from "./assets/email.png";
import linkedInIcon from "./assets/linkedIn.png";
import gitHubIcon from "./assets/github.png";

function Footer() {
    return (
        <footer>
            <div>
                <div className="footerContact">
                    <span>Contact with me:&nbsp;</span>
                    <a href="https://www.linkedin.com/in/chinghau/"><img src={linkedInIcon} alt="email" className="footerIcon"/></a>
                    <a href="https://github.com/ching-hau" target="_blank" rel="noopener noreferrer"><img src={gitHubIcon} alt="gitHub" className="footerIcon"/></a>
                    <a href="mailto:chinghauchu@gmail.com" target="_blank" rel="noopener noreferrer"><img src={emailIcon} alt="linkedIn" className="footerIcon"/></a>
                </div>
                <p>&copy; 2024 chinghau All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;