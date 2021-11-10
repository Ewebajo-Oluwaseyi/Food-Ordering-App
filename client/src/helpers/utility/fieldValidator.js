import {EMAIL_REGEX} from './regexes';

export const validateEmailAddresss = (email) => {
    return EMAIL_REGEX.test(email);
}