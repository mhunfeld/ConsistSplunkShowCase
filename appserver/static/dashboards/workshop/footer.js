define([
    'jquery',
    'css!/static/app/ConsistSplunkShowCase/dashboards/workshop/footer.css',
    'splunkjs/mvc/simplexml/ready!'
], function($) {

    var footerTemplate = /*html*/ `
        <div id="footer" class="dashboard-footer">
            <div id="copyright">
                © LogoIpsum 1995-2020
            </div>
            <div id="link-section" class="link-section">
                <a href="https://www.logoipsum.com">
                    Impressum
                </a>
                <span class="link-sepertor">|</span>
                <a href="https://www.logoipsum.com">
                    Terms of Use
                </a>
            </div>
        </div>
    `;

    $('#dashboard1').append(footerTemplate);


    
});
//@ sourceURL=footer.js