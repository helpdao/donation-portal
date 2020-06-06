import React from 'react'
import {RampInstantSDK} from '@ramp-network/ramp-instant-sdk'
import { Button } from 'antd'
export default function RampWidget(props){
    const handleClick = () => {
        let widget = new RampInstantSDK({
            hostAppName: 'HelpDAO',
            hostLogoUrl: 'http://localhost:3000/help_dao_min.png',//TODO remember to change the hostname when go to production 
            variant: 'auto'
        });
        widget.show();
        };
    return(
        <Button type="link" onClick={() => handleClick()}>
            Bank account - 🇪🇺🇬🇧
        </Button>
        )
} 