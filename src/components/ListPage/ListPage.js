import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setApiData, setIncrementPage, setDecrementPage } from '../../store/actions/ListPageActionTypes'
import List from './List'
import Header from '../Header/Header'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    button_wrapper: {
        display: "flex",
        justifyContent: 'center',
        padding: '10px 0',
        margin: '10px 0'
    },
    btns: {
        margin: "0 5px"
    }
}));


const ListPage = () => {

    const classes = useStyles();
    const listPageState = useSelector((state) => state.ListPageReducer)
    const { upcomingMovieListData, currentPage, total_pages, searchMovieData, searchFlag, searchValue } = listPageState
    const dispatch = useDispatch()

    useEffect(() => {
        let url = searchFlag ? (`https://api.themoviedb.org/3/search/movie?api_key=88428b2a9e9d271ea540df7c3fa4dac3&query=${searchValue}&page=${currentPage}`)
            : (`https://api.themoviedb.org/3/movie/upcoming?api_key=88428b2a9e9d271ea540df7c3fa4dac3&page=${currentPage}`)

        axios.get(url)
            .then(function (response) {
                // handle success
                dispatch(setApiData(response.data))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [currentPage,searchFlag])

    return (
        <div>
            <Header></Header>
            <div className={classes.button_wrapper}>
                <Button variant="contained" className={classes.btns} onClick={() => dispatch(setDecrementPage())} disabled={currentPage === 1 ? true : false}>Previous</Button>
                <Button variant="contained" className={classes.btns} onClick={() => dispatch(setIncrementPage())} disabled={currentPage === total_pages ? true : false}>Next</Button>
            </div>
            <Grid container className={classes.root} >
                <Grid item xs={12}>
                    <Grid container justifyContent="center" >
                        {
                            searchFlag ? (
                                searchMovieData.map((value) => (
                                    <Grid key={value.id} item>
                                        <List data={value} />
                                    </Grid>
                                ))
                            ) : (
                                upcomingMovieListData.map((value) => (
                                    <Grid key={value.id} item>
                                        <List data={value} />
                                    </Grid>
                                ))
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            <div className={classes.button_wrapper}>
                <Button variant="contained" className={classes.btns} onClick={() => dispatch(setIncrementPage())} disabled={currentPage <= 1 ? true : false}>Previous</Button>
                <Button variant="contained" className={classes.btns} onClick={() => dispatch(setDecrementPage())} disabled={currentPage >= total_pages ? true : false}>Next</Button>
            </div>

        </div>
    )
}

export default ListPage
