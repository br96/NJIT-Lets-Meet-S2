import React from 'react';

import Settings from "../Settings";
export function SettingsIconButton()
{
    const [toggleSettings, setToggleSettings] = React.useState(false);

    function toggleView() {
        if (toggleSettings) {
        setToggleSettings(false);
        }
        else {
        setToggleSettings(true);
        }
    }

    return (
    <div>
        <i className="fas fa-cog settings-toggle-button clickable-icon" onClick={toggleView}></i>
        { toggleSettings ? <Settings /> : null}
    </div>
    );
}
