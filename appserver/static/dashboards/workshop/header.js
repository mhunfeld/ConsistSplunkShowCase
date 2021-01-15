define([
    'jquery',
    'css!/static/app/ConsistSplunkShowCase/dashboards/workshop/header.css',
    'splunkjs/mvc/simplexml/ready!'
], function($) {

    var logoTemplate = /*html*/ `
            <a href="./" class="logo">
                <img src="/static/app/SplunkJSWorkshop/images/Logo-white.svg" alt="Logo Ipsum Homepage"/>
            </a>`;
    
    var helpdeskButtonTemplate = /*html*/`
            <a href="/helpdesk" class="helpdesk" title="Bei Fragen wenden Sie sich an das Heldesk">
                <img src="data:image/png;base64,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"/>
            </a>
            `;
    
    $('.dashboard-header').append(logoTemplate);
    $('.dashboard-header').append(helpdeskButtonTemplate);
});
//@ sourceURL=header.js