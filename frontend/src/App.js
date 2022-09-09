import * as React from 'react';
import { useState, useEffect } from 'react';

import classes from './App.module.css';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MuiColorInput } from 'mui-color-input'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';

import svgBadge from './svgBadge';
import SVG from 'react-inlinesvg';

function App() {
    const [formData, setFormData] = useState({ "shadow": true, "text": "VISITS", "visitsBG": "#555555", "countBG": "#A2C93E", "visitsText": "#FFFFFF", "countText": "#FFFFFF" });
    const [svgData, setSvgData] = useState();
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(() => {
        setSvgData(svgBadge(formData.text, formData.shadow, formData.visitsBG, formData.countBG, formData.visitsText, formData.countText, 12345));
    }, [formData]);

    const copyToClipboard = (content) => {
        const el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const createLink = () => {
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        let randomStr = "";
        for (let i = 0; i < 20; i++)
            randomStr += charset[Math.floor(Math.random() * charset.length)];
        var textContent = encodeURI(formData.text)
        const link = `https://visits.roshan.cyou/${randomStr}?textContent=${textContent}&textShadow=${(formData.shadow) ? 1 : 0}&visitsBG=${formData.visitsBG.substring(1)}&countBG=${formData.countBG.substring(1)}&visitsText=${formData.visitsText.substring(1)}&countText=${formData.countText.substring(1)}`;
        return link;
    }

    return (
        <div className={classes.app}>
            <SVG
                className={classes.badge}
                src={svgData}
                title="React"
            />
            <Button variant="contained" disableElevation startIcon={(linkCopied) ? <DoneIcon /> : <ContentCopyIcon />} onClick={() => {
                setLinkCopied(true);
                copyToClipboard(createLink());
                setTimeout(() => {
                    setLinkCopied(false)
                }, 2000);
            }}>
                {(linkCopied) ? "Image link copied" : "Copy image link"}
            </Button>
            <div className={classes.card}>
                <div className={classes.customize}>Customizations</div>
                <TextField
                    required
                    id="outlined-required"
                    label="Text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, "text": e.target.value })}
                    helperText="Text to be displayed on the left side of the counter"
                />
                <MuiColorInput isAlphaHidden={true} format='hex' value={formData.visitsBG} onChange={(c) => setFormData({ ...formData, "visitsBG": c })} helperText="Background colour of the left part containing the text" />
                <MuiColorInput isAlphaHidden={true} format='hex' value={formData.countBG} onChange={(c) => setFormData({ ...formData, "countBG": c })} helperText="Background colour of the right part containing the visits count" />
                <MuiColorInput isAlphaHidden={true} format='hex' value={formData.visitsText} onChange={(c) => setFormData({ ...formData, "visitsText": c })} helperText="Colour of the text on left" />
                <MuiColorInput isAlphaHidden={true} format='hex' value={formData.countText} onChange={(c) => setFormData({ ...formData, "countText": c })} helperText="Colour of the visitor count on right" />
                <FormControlLabel control={<Switch checked={formData.shadow} onChange={(e) => setFormData({ ...formData, "shadow": !formData.shadow })} />} label="Text shadow" />
            </div>
            <div className={classes.bottomLinks}>
                <Button target="_blank" href="https://github.com/roshan1337d/visits-counter" variant="contained" startIcon={<GitHubIcon />}>
                    SOURCE CODE
                </Button>
                <Button target="_blank" href="https://roshan.cyou" variant="outlined" startIcon={<PersonIcon />}>
                    AUTHOR
                </Button>
            </div>
        </div >
    );
}

export default App;