import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORY_CREATE_URL, CATEGORY_DELETE_URL, CATEGORY_DETAIL_URL, CATEGORY_UPDATE_URL, FETCH_ALL_CATEGORIES_URL } from "../../utils/api";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        loading: false,
        message: null,
        error: null,
        categories: [],
        category: null,
    },
    reducers: {
        fetchCategoriesRequest(state) {
            state.loading = true;
        },
        fetchCategoriesSuccess(state, actions) {
            state.loading = false;
            state.categories = actions.payload;
        },
        fetchCategoriesFailure(state) {
            state.loading = false;
        },

        fetchCategoryByIdRequest(state) {
            state.loading = true;
        },

        fetchCategoryByIdSuccess(state, actions) {
            state.loading = false;
            state.category = actions.payload;
        },

        fetchCategoryByIdFailure(state) {
            state.loading = false;
        },

        createCategoryRequest(state) {
            state.loading = true;
        },
        createCategorySuccess(state, actions) {
            state.loading = false;
            state.message = actions.payload.message;
        },
        createCategoryFailure(state, actions) {
            state.loading = false;
            state.error = actions.payload;
        },

        updateCategoryRequest(state) {
            state.loading = true;
        },
        updateCategorySuccess(state, actions) {
            state.loading = false;
            state.message = actions.payload.message;
        },
        updateCategoryFailure(state, actions) {
            state.loading = false;
            state.error = actions.payload;
        },

        deleteCategoryRequest(state) {
            state.loading = true;
        },
        deleteCategorySuccess(state, actions) {
            state.loading = false;
            state.message = actions.payload.message;
        },
        deleteCategoryFailure(state, actions) {
            state.loading = false;
            state.error = actions.payload;
        },

        resetCategorySlice(state) {
            state.loading = false;
            state.error = null;
            state.message = null;
        },
    },
});

export const fetchAllCategories = () => async (dispatch) => {
    dispatch(categorySlice.actions.fetchCategoriesRequest());
    await axios
        .get(FETCH_ALL_CATEGORIES_URL)
        .then((res) => {
            dispatch(
                categorySlice.actions.fetchCategoriesSuccess(res.data.categories)
            );
        })
        .catch((error) => {
            dispatch(
                categorySlice.actions.fetchCategoriesFailure(
                    error.response.data.message
                )
            );
        });
};

export const fetchCategoryById = (id) => async (dispatch) => {
    dispatch(categorySlice.actions.fetchCategoryByIdRequest());
    await axios
        .get(CATEGORY_DETAIL_URL + id + '/')
        .then((res) => {
            dispatch(categorySlice.actions.fetchCategoryByIdSuccess(res.data.category)
            );
        })
        .catch((error) => {
            dispatch(
                categorySlice.actions.fetchCategoryByIdFailure(
                    error.response.data.message
                )
            );
        });
};

export const createCategory = (data) => async (dispatch) => {
    dispatch(categorySlice.actions.createCategoryRequest());
    await axios
        .post(CATEGORY_CREATE_URL, data, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            dispatch(categorySlice.actions.createCategorySuccess(res.data));
        })
        .catch((error) => {
            dispatch(categorySlice.actions.createCategoryFailure(error.response.data.message))
        })
};

export const updateCategory = (data, id) => async (dispatch) => {
    dispatch(categorySlice.actions.updateCategoryRequest());
    await axios
        .put(CATEGORY_UPDATE_URL + id + '/', data, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            dispatch(categorySlice.actions.updateCategorySuccess(res.data));
        })
        .catch((error) => {
            dispatch(categorySlice.actions.updateCategoryFailure(error.response.data.message))
        })
}

export const deleteCategory = (id) => async (dispatch) => {
    dispatch(categorySlice.actions.deleteCategoryRequest());
    await axios
        .delete(CATEGORY_DELETE_URL + id + '/')
        .then((res) => {
            dispatch(categorySlice.actions.deleteCategorySuccess(res.data));
        })
        .catch((error) => {
            dispatch(categorySlice.actions.deleteCategoryFailure(error.response.data.message))
        })
}

export const resetCategorySlice = () => (dispatch) => {
    dispatch(categorySlice.actions.resetCategorySlice());
}

export default categorySlice.reducer;
