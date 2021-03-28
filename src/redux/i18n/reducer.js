import {I18nEnum} from "./actions";

export const allowLanguage = ['es', 'en'];

const LANGUAGE_KEY = 'language';

export function defaultLanguage() {
    let lang = localStorage.getItem(LANGUAGE_KEY);
    if (lang) {
        return lang;
    }
    console.log('aaa', lang)
    lang = navigator?.language || navigator?.userLanguage;
    return allowLanguage.reduce((previousValue, currentValue) => {
        if (lang.toLowerCase().startsWith(currentValue)) {
            return currentValue;
        }
        return previousValue
    }, false) || 'en';
}

const initialState = {
    i18n: {},
    language: defaultLanguage()
};

function i18nReducer(state = initialState, action) {
    switch (action.type) {
        case I18nEnum.CHANGE_LANGUAGE:
            localStorage.setItem(LANGUAGE_KEY, action.language);
            return {...state, language: action.language};
        case I18nEnum.FETCH_I18N:
            return {...state, i18n: action.i18n};
        default:
            return state;
    }
}

export default i18nReducer;
