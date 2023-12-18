import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import { motion } from "framer-motion"

export default function Calculating(props) {
    const calculating = props.calculating;
    const err=props.err;
    const errMsg=props.errMsg;
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        {calculating ?
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h4 style={{ display: "flex", alignItems: "center" }}><CircularProgress variant="solid" color="success" size="sm" value={25} />&nbsp;&nbsp;Calculating. Please Wait.</h4>
                                <h5>This may take a while. Please do not press the back button, or refresh this page.</h5>
                            </div>
                            : (err?
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <h4 style={{textAlign:"center"}}>Could not complete the calculations.</h4>
                                    <h5 style={{textAlign:"center"}}>{errMsg}</h5>
                                    <h5 style={{textAlign:"center"}}>Refresh the page and re-upload the correctly filled Excel Sheet.</h5>
                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                                </motion.div>:
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h4>Calculations Completed.</h4>
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                            </motion.div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}