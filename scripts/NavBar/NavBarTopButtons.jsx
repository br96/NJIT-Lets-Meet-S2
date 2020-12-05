import React from 'react';
import {SettingsIconButton} from "./SettingsIconButton";
import {AccountButton} from "./AccountButton";
export function NavBarTopButtons()
{
    return (
    <div className="navbar-top-buttons">
        <SettingsIconButton />
        {/* <AccountButton /> */}
    </div>
    );
}
