import * as React from 'react';
import {NavIcon} from "../nav/NavIcon";
import {Link} from "react-router-dom";
import {MUIPaperToolbar} from "../../../../web/js/mui/MUIPaperToolbar";
import {createTeleporter} from "react-teleporter";
import {RepoNavbar} from "../RepoNavbar";
import {DeviceRouter} from "../../../../web/js/ui/DeviceRouter";
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {AccountAuthButton} from "../../../../web/js/ui/cloud_auth/AccountAuthButton";
import {CloudConnectivityButton} from "../../../../web/js/apps/repository/CloudConnectivityButton";

export namespace RepoHeader {

    export const leftMenuTeleporter = createTeleporter();
    export const LeftMenuTarget = leftMenuTeleporter.Target;
    export const LeftMenu = leftMenuTeleporter.Source;

    export const rightTeleporter = createTeleporter();
    export const RightTarget = rightTeleporter.Target;
    export const Right = rightTeleporter.Source;

    export const leftTeleporter = createTeleporter();
    export const LeftTarget = rightTeleporter.Target;
    export const Left = rightTeleporter.Source;

}

const Handheld = () => {

    return (

        <MUIPaperToolbar borderBottom
                         padding={1}>

            <div style={{display: 'flex'}}>

                <div className="mr-1"
                     style={{
                         flexGrow: 1,
                         display: 'flex',
                         alignItems: 'center'
                     }}>

                    <RepoHeader.LeftMenuTarget/>

                    <div className="mr-1">
                        <NavIcon/>
                    </div>

                    <RepoHeader.LeftTarget/>

                </div>

                <div className="mt-auto mb-auto"
                     style={{
                         display: 'flex'
                     }}>

                    <RepoHeader.RightTarget/>

                    <Link to={{hash: 'account'}}>
                        {/*<Button size="md" color="clear" className="btn-no-outline">*/}
                        {/*    <i className="fas fa-user"/>*/}
                        {/*</Button>*/}
                    </Link>

                    {/*<CloudAuthButton persistenceLayerController={this.props.persistenceLayerController} />*/}

                </div>

            </div>
        </MUIPaperToolbar>
    );

}

const Desktop = () => {

    const Settings = () => {

        return (
            <Link to="/settings">
                <IconButton>
                    <SettingsIcon
                        // size="md"
                        //         className="border ml-1 text-muted"
                        //             color="clear"
                    >
                    </SettingsIcon>
                </IconButton>
            </Link>
        );

    };

    return (

        <MUIPaperToolbar borderBottom
                         padding={1}>

            <div className=""
                 style={{
                     display: 'flex'
                 }}>

                <div>
                    <RepoNavbar/>
                </div>

                <div style={{
                    flexGrow: 1,
                    display: 'flex'
                }}>

                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="flex-end"
                        alignItems="center">

                        <Grid item>
                            <CloudConnectivityButton/>
                        </Grid>

                        <Grid item>
                            <AccountAuthButton/>
                        </Grid>

                        {/*<Grid item>*/}
                        {/*    <HelpDropdown/>*/}
                        {/*</Grid>*/}

                        <Grid item>
                            <Settings/>
                        </Grid>

                    </Grid>


                    {/*<ChromeExtensionInstallButton/>*/}

                    {/*<Notifications persistenceLayerProvider={this.props.persistenceLayerProvider}/>*/}

                    {/*<LinkDropdown hidden={! isDesktop}/>*/}

                </div>

            </div>

        </MUIPaperToolbar>

    );
}

/**
 * Simple header for the repository which supports arbitrary children.
 */
export const RepoHeader3 = React.memo(() => {
    return <DeviceRouter handheld={<Handheld />} desktop={<Desktop/>}/>;
})
