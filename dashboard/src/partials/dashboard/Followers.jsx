import React from "react";

const Followers = ( {linkedinFollowers, twitterFollowers}) => {
    return ( 
        <>
        {
            linkedinFollowers && twitterFollowers && (
        <div className="flex flex-wrap items-center">
            
            <h1 className="text-2xl font-bold mr-10">Followers: </h1>
            {/* Twitter icon */}
            <a href="https://twitter.com/ckc_iitk/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" fill="#008000" />
            </svg>
            <h1 className="text-xl font-bold mr-6">{twitterFollowers}</h1>
            </a>
            {/* Linkedin icon */}
            <a href="https://www.linkedin.com/company/kesavan-center-energy-and-climate-iit-kanpur/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-linkedin mr-1" viewBox="0 0 16 16"> 
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" fill="#008000" /> 
            </svg>
            <h1 className="text-xl font-bold mr-6">{linkedinFollowers}</h1>
            </a>
        </div>
            )
        }
        </>
     );
}
 
export default Followers;