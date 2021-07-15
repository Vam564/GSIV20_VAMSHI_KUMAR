import { API_SUCCESS, ON_PAGE_CHANGE, DETAIL_PAGE_CONTENT, INCREMENT_PAGE, DECREMENT_PAGE, SEARCH_DATA, SEARCH_DATA_FLAG, SEARCH_KEYWORD } from '../actions/ListPageActionTypes'
const initial_state = {
    fullMovieApiData: {},
    total_pages: 1,
    upcomingMovieListData: [],
    detailPageData: {},
    currentPage: 1,
    searchMovieData: [],
    searchFlag: false,
    searchValue:''
}

const ListPageReducer = (state = initial_state, { type, payload }) => {

    switch (type) {
        case API_SUCCESS:
            return {
                ...state,
                fullMovieApiData: payload,
                upcomingMovieListData: payload.results,
                total_pages: payload.total_pages,
                currentPage: payload.page
            }

        case ON_PAGE_CHANGE:
            return {
                ...state,
                currentPage: payload
            }

        case DETAIL_PAGE_CONTENT:
            return {
                ...state,
                detailPageData: payload
            }
        case INCREMENT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        case DECREMENT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1
            }
        case SEARCH_DATA:
            return {
                ...state,
                searchMovieData: payload.results,
                total_pages: payload.total_pages,
                currentPage: 1,
                searchFlag: true,
            }
        case SEARCH_DATA_FLAG:
            return {
                ...state,
                searchFlag: false,
                total_pages: state.fullMovieApiData.total_pages,
                currentPage: 1,
            }
        case SEARCH_KEYWORD:
            return {
                ...state,
                searchValue: payload,
   
            }

        default: return state
    }

}

export default ListPageReducer