import i18n from '../../plugins/i18n'
var $i18n = i18n;
export default {
    require: [v => !!v || $i18n.getLocaleMessage($i18n.locale).rules.require],
    require2: [v => !!v.length || $i18n.getLocaleMessage($i18n.locale).rules.require]
}