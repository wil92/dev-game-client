import {fetchInternal} from "../../utils/fetch";

export const I18nEnum = {
    FETCH_I18N: "FETCH_I18N",
    CHANGE_LANGUAGE: "CHANGE_LANGUAGE"
};

export function changeLanguage(language = 'en') {
    return (dispatch, getState) => {
        dispatch({type: I18nEnum.CHANGE_LANGUAGE, language});
        return fetchI18n()(dispatch, getState);
    };
}

export function fetchI18n() {
    return (dispatch, getState) => {
        const language = getState().i18n.language || 'en';
        return fetchInternal(`/i18n/${language}.json`, {})
            .then(res => res.json())
            .then(i18n => {
                dispatch({type: I18nEnum.FETCH_I18N, i18n})
            })
            .catch(console.error);
    };
}
