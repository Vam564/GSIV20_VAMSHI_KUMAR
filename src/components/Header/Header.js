import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchData, setSearchFlag, setSearchValue } from '../../store/actions/ListPageActionTypes'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            fontWeight: 'bold'
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#DFDFDF',
        '&:hover': {
            backgroundColor: '#DFDFDF',
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        color: '#9b9b9b',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '60ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    homeIcon: {
        color: '#9b9b9b'
    }
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        console.log(e.target.value)
        if (e.target.value === '') {
            dispatch(setSearchFlag())
        }
        else {
            dispatch(setSearchValue(e.target.value))
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=88428b2a9e9d271ea540df7c3fa4dac3&query=${e.target.value}`)
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    dispatch(setSearchData(response.data,e.target.value))
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="transparent" >
                <Toolbar>
                    {window.location.pathname.split("/")[1] === "detailpage" ? (
                        <Typography variant="h6" className={classes.title} type="h6">
                            Movie Details
                        </Typography>
                    ) : (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearch}
                            />
                        </div>
                    )}
                    <div className={classes.grow} />
                    <div >
                        <IconButton aria-label="Home" color="inherit" className={classes.homeIcon}>
                            <Link to="/">
                                <HomeIcon />
                            </Link>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header