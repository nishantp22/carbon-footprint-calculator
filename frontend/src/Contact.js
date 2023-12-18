import CKCLogo from "./images/ckclogo.png";
import Card from '@mui/joy/Card';
import { motion } from 'framer-motion';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Contact = () => {
    return (  
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}  className="contactUs">
            <h1 style={{width:'100%',textAlign:'center'}}><b>CONNECT WITH US</b></h1>
            <Card sx={{ width: 400, maxWidth:'100%' }}>
                <img style={{borderRadius:"100%"}}src={CKCLogo} alt="ashish-garg"></img>
                <h2 style={{textAlign:"center"}}>Chandrakanta Kesavan Centre, IIT Kanpur</h2>
                <p className="cardP">Block-A Near Media Lab <br/>
                    Department of Sustainable Energy Engineering<br/>
                    Indian Institute of Technology, Kanpur,<br/>
                    Uttar Pradesh, 208016</p>
                <div className="links">
                    <a className="link" href="https://www.x.com/ckcepcs_seeiitk/"><FontAwesomeIcon icon={faXTwitter} /></a>
                    <a className="link" href="https://www.linkedin.com/company/kesavan-center-energy-and-climate-iit-kanpur/"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a className="link" href="https://www.instagram.com/iitk_ckcepcs/"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a className="link" href="https://www.youtube.com/channel/UCu9WfISA5RKz4SxmtkagNCg"><FontAwesomeIcon icon={faYoutube} /></a>
                </div>
            </Card>

        </motion.div>
    );
}
 
export default Contact;