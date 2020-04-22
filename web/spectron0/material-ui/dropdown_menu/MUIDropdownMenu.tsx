import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper, {PopperPlacementType} from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {NULL_FUNCTION} from "polar-shared/src/util/Functions";
import IconButton from "@material-ui/core/IconButton";
import {MUIDropdownCaret} from "../MUIDropdownCaret";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            zIndex: 1000
        },
        popper: {
            zIndex: 1000
        },
        paper: {
            // marginRight: theme.spacing(2),
            // marginTop: theme.spacing(1),
            marginTop: '2px'
        },
    }),
);


export interface IButtonProps {
    readonly onClick?: () => void;
    readonly icon?: JSX.Element;
    readonly text?: string;
    readonly color?: 'primary' | 'secondary' | 'default'
    readonly size?: 'small' | 'medium' | 'large';
    readonly ref?: React.RefObject<HTMLButtonElement>;
}

interface IProps {
    readonly id?: string;
    readonly button: IButtonProps;
    readonly children: JSX.Element;
    readonly placement?: PopperPlacementType;
    readonly caret?: boolean;
}

export const MUIDropdownMenu = (props: IProps) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    // FIXME: how do we do the button.. ?

    // FIXME: what behaviior do I want to share?
    // - position the menu BELOW the button
    //
    // specify button icon and text... and type of icon...
    //

    const buttonProps = {
        onClick: handleToggle || NULL_FUNCTION,
        color: props.button.color,
        size: props.button.size,
        ref: anchorRef,
    };

    const placement = props.placement || 'bottom';

    const id = props.id || 'dropdown';

    const menuListID = id + "-menu-list-grow";

    return (
        <div className={classes.root}>
            <div>
                {/*<Button*/}
                {/*    ref={anchorRef}*/}
                {/*    aria-controls={open ? 'menu-list-grow' : undefined}*/}
                {/*    aria-haspopup="true"*/}
                {/*    onClick={handleToggle}>*/}
                {/*    Toggle Menu Grow*/}
                {/*</Button>*/}

                {/*<MUIDropdownButton {...props.button}*/}
                {/*                   ref={anchorRef}*/}
                {/*                   aria-controls={open ? 'menu-list-grow' : undefined}*/}
                {/*                   aria-haspopup="true"*/}
                {/*                   onClick={handleToggle}/>*/}

                {props.button.text && props.button.icon &&
                    <Button {...buttonProps}
                            startIcon={props.button.icon}
                            endIcon={props.caret ? <MUIDropdownCaret/> : undefined}
                            variant="contained">
                        {props.button.text}
                    </Button>}

                {props.button.icon && ! props.button.text &&
                    <IconButton {...buttonProps}
                                size={buttonProps.size === 'large' ? 'medium' : buttonProps.size}>
                        {props.button.icon}
                    </IconButton>}

                {! props.button.icon && props.button.text &&
                    <Button {...buttonProps} size="large" variant="contained">
                        {props.button.text}
                    </Button>}

                <Popper open={open}
                        className={classes.popper}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        popperOptions={{
                            offsets: {
                                popper: {
                                    top: 10
                                }
                            }
                        }}
                        placement={placement}
                        disablePortal>

                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps}
                              // style={{ transformOrigin: placement === 'bottom' ? 'left bottom' : 'left bottom' }}
                        >
                            <Paper elevation={10}
                                   className={classes.paper}>
                                <ClickAwayListener onClickAway={handleClose}>

                                    <MenuList autoFocusItem={open}
                                              id={menuListID}
                                              onClick={handleClose}
                                              onKeyDown={handleListKeyDown}>
                                        {props.children}

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
