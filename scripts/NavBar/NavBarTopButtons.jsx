import React from 'react';

import {AccountButton} from "./AccountButton";
import {SettingsIconButton} from "./SettingsIconButton";
export function NavBarTopButtons()
{
    return (
    <div className="navbar-top-buttons">
        <AccountButton />
        <SettingsIconButton />
    </div>
    );
}
