const { Language } = require('klasa');

module.exports = class extends Language {

    constructor(...args) {
        super(...args, {
            name: 'myLanguageName',
            enabled: true
        });

        this.language = {
            DEFAULT: (key) => `${key} has not been localized for en-US yet.`,
            DEFAULT_LANGUAGE: 'Default Language',
            SETTING_GATEWAY_EXPECTS_GUILD: 'The parameter <Guild> expects either a Guild or a Guild Object.',
            // ...
            COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``
        }
    }
};