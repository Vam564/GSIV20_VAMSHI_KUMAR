import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Header from '../Header/Header'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent:"center",
        margin: '10px 0',
        border: 'none',
        boxShadow: 'none'
    },
    details: {
        display: 'flex',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '70%',
        padding: 10,
        height:'90%',
        [theme.breakpoints.up('md')]: {
            width:'100%',
            margin:'0 auto',
            objectFit:'contain',
        },
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    rating: {
        color: '#d2c9c9',
    },
    image_content: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    movie_content:{
        padding:15,
        margin:'10px',
      
        [theme.breakpoints.up('md')]: {
           paddingTop:'30px 0',
           margin:'10px 0'
            
        },
    },
    movie_overview:{
        fontSize:'14px',
    },
    movie_cast:{
        fontSize:'14px',
    },
    movie_title:{
        fontSize:'16px',
        fontWeight:'bold',
    },
    movie_details:{
        fontSize:'14px',
    },

}));


const DetailPage = () => {

    const content = useSelector((state) => state.ListPageReducer)
    const { detailPageData } = content
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        if(Object.entries(detailPageData).length === 0){
            history.push('/')
        }
    })

    return (
        <div>
            <Header></Header>
            <Card className={classes.root}>
                <div>
                    <Grid container >
                        <Grid container >
                            <Grid item xs={12} md={2} className={classes.image_content}>
                                <CardMedia
                                    component="img"
                                    alt="Image"
                                    height="150"
                                    className={classes.cover}
                                    image={detailPageData.poster_path ? (`http://image.tmdb.org/t/p/w500${detailPageData.poster_path}`) : (`http://image.tmdb.org/t/p/w500${detailPageData.backdrop_path}`)}
                                    title="Live from space album cover"
                                />
                            </Grid>
                            <Grid item xs={12} md={9} className={classes.movie_content}>
                                <Typography component="h5" variant="h5" className={classes.movie_title}>
                                    {detailPageData.original_title} <span className={classes.rating}>({detailPageData.vote_average})</span>
                                </Typography>
                                <Typography component="p" variant="p" className={classes.movie_details}>
                                    Year | Length | Director
                                </Typography>
                                <Typography component="p" variant="p" className={classes.movie_cast}>
                                    Cast : Actor 1, Actor 2 ...
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.movie_overview}>
                                    {detailPageData.overview}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>

            </Card>
        </div>
    );
}

export default DetailPage






