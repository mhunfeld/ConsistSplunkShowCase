define([
    'jquery',
    'underscore',
    "splunkjs/mvc/tableview",
    '/static/app/ConsistSplunkShowCase/dashboards/ua-parser.min.js',
    'splunkjs/mvc/simplexml/ready!'
], function($, _, TableView, UAParser) {

    /*
    * parses a userAgentString 
    * gives you a 
    */
    var UserAgentHandler = function() {
        this.parser = new UAParser();
    
        this.browserIconMap = {
            'Safari': /*html*/`<img src="data:image/png;base64,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"/>`,
            'Chrome': /*html*/`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAHgklEQVRoge1Za1BU5xl+vnP27J5Fd1lcFuSiBC9Y7iKNmtRqliB4HaQmmEtbm/qnYyNtM9NJk6YTMs2P1sykTVLTib90OpOpt4RqI4m1RqdGGkDjgAQUMdxNuO2FZffsnj3n6w+QIGcv3yJtf8Tn157vvM/7Pu93fb+zwH3cxzcbZC6c7HtzsyHLobycOBZ8LMUVTE8dDYpxAUri/Cr0nAKIClSRwmcNUmeK6nUk8BeMXlJV+Mvm8f9rAr97rXxrdm/gYGG3lJroUWLiUouMwVx/oDuDf6FkT8vrs9UwqwRe/f3mtat6fKcf6vAlCAqdbewJ6FQ4Vo0rHcuEXSV7mk/ESo85gYMvlXy07aq3zOxTY6VGRpyCjlLvF0U/a1sSC405gX01T5vLhvu77G3ehNjVsatxFo8pzRvklC1bbg4xUqLj1T9vS3v0U9et/F6//t4UssGX7aWfrKd5O6paP49my0Uz2FfztHl9k7vzfyUeAIxtceS758i1s2czk6PZ6qIZbBru717VJRnmRho7DB1xJOuc0o8oGiOOwIGXy+o2tHktc6osBixoMPFXX8++FckmbAI7j+9cnjLiKZ97WTGAAssuiJl1R/Mqw5mETcDPK387WTSPNFnd/x1xrPAIyPlMORbudcj5tenE9x4E1OzhBfPQlkQB1YFvO9h2T754NXQbSsHlrwSXlATwAPXeBh1ugtpzGupXl5j8EJ0MoveD0/uRKgT498uW/6jS3nFIYxeKvP29ynpK6FoAEIIKXnjzn/AlpaPYGX45cOmLoX/uRfAFRRGF0aEGBBtfAh3rmqZCBRFkcHr/lGiQuw/Kennh2MOl3eaoCdTU1OiaCq9KAPg7bYWtA3jmSAP6s5aj2KkdCb6gCIZXXgMxmTDiozjUIuPj7iC6XBNlRmY8gT1Dh935AqxGAgRcUBp+DLj/Bc7gB9EFABK5JHFQA84OLjJVVbV67oo903B+dcIeEFRMb/sqyYQHeh1Y0tGDzxfNQ5pPnHrHpS+GuP8AiMmE051BfP+khE/6FAx5KWQVkFVgyEvRcFvBu61BZMZzWG6LA5e6EZz7CIg6xHScGomCTsGU/Ne/jJyc3q5ZxJTQx0M5OLE1HwrPIaPtBhotI1Pt+p//akr8vjMSxuXwPTkuUzx7RkJdZxDQLQCy3omufBosxF8xs02TAAfkhiIPWefjwkNLAQCLr3ei0TIMvng1+JXFGPFRPP+xHyx1KQXw/Hk/Rn0UiF8HWOzMCSSQgGb+akeAwhrOwYePrIDLLE4mcQuOsvUAgEMtcsSenwlPgOJwizzxYHuMmWfl/Zoprz0HOBq25gnodagtz5t6TlxaAAA41xVkFnEH57onOfHrmDkmEtC0aROgJOKSulKQjo4liQAAPikNANDtjv1Sc2eHgiGNmSMS7a0vajUaCse3FELhvqbO5lr3dTfd28VImwChUbvzy2QTLq7JhDLYDwDIiI89hQzzJMc/wMyRqGYJhEhADTHRQuB0STbczRNlQUlG1Kpcg0cfmOS4LjJz3Kp2eWoSIISOaKxCQBJ1qHM0AgB25wuYJ7CPgklPsDtfAADQwePMPIdq0CwCTQIqSCurw6Pm22gZbIbVSLDfbmBaCwTAfrsBCSJB+8BlwHWeNRxGqWF0Zpv2IFO5o6wOKQHeuPo23AE3Ni/V4U9lIubrw6dh0hO8XS6ifIkOHskFV3t1TBuAU9XXzmzTrIqncnY1Dyz88tdg3KHG5XFcH72BNSlrkGsTsStbgIEn8AYpPDIg8AQrrByeyBHwx1IReTYeHsmFg2eew+NxHzGLd1ADnHzWusOH7z50QnbAttqKelCyltk7gNT5KXh25V7kJ+ZFtGvtacQ7//gt9i66hG+Jnoi201EfWDj28EZtOR1y+wgqfLWOUxuYvQMY8NzGixd/g0JbAdalfQe51hzYjBMH3pBvGNe7GnCp7UNc62nAskQak3gZHHqD4t5Q78JOwe3vVVyjhIQs7GIF8csQe/smHngOBwpuwiYw7dYAgCbZJj1Y2mcM9S7sPA8GxApyr8fkJHjJN/V7TbIUk3gPFdAXsGjK6DsIm0DdE0c6VRUHmCNFAOeVAAC8wOOnaV0xcS/JyVcqt1w7E9Z3JPIHO2urKWjUz3uRQcFNjsC2dBdEwj6ol2WbVL6xsziSTdStMk7WFxGAvWCZGcAvgygqRCOPp2x9zLx22aK28LqUqP6jGRyrOhaATikkoIPM0acH8E1Mnx9mDDIfWu2yRb3BJ654xt7ljOqfxeGp7aeGxyyuDEIpc5kxFcDngzWeQ6mZ6Ws5Lss26d+80Vphb73JYh9zHbz9/R1/oCDVAGVKXvyiB6/k9CDHOBbRbowKqJeTr0Sb8zMR84XmVGXtLxS/PosS2hLVud+PpQnBiOJlcGiSbdIH8kJ7rOKBe/yTb+vftxYTWXgLwGqE+sbkduKNtCtIEvwa7qhqwPVgwtigYvzJjk3t785Ww5z8zVpTU6NrKvjsB6BkFziSC4pEcKrhSa6dVJl7IFEeTqqHQzUoDmoYdar6WrM+tdpuPy/NRfz7uI9vMv4DQ4yv4h/qMU0AAAAASUVORK5CYII="/>`,
            'Edge': /*html*/`<img src="data:image/png;base64,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"/>`,
            'IE': /*html*/`<img src="data:image/png;base64,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"/>`,
            'Opera': /*html*/`<img src="data:image/png;base64,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"/>`
        };
    
        this.osIconMap = {
            'Windows': /*html*/`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABaUlEQVRoge2Zz0rDQBCHv6kKXurfm71oEgTbq48hmIuvqRXFtxB8Ej14bGQ8ZBtsumkxbbpJmA+WhLAZfr/d2WWSBcMwOo2EFrDEq54yI2JAhBIh7gpjUhmVu+8HkFglcgJMyDhBAHV9tXhLfaGaM1AWCRNgDCRkHFeI/DebGXjRETMSxDVISOUBgIzPBZENsd7AfCSlGMHItWt+GDJoVuA6/AaedOpGNCbjsIVLvcBvQLjfsY7aBE6AzemtgYb3ju3R2xnoDJZCoemtAUuhXdF5A0Zo/IXyVDNgr1bEVMTFUOAbyOpJ88Y+Kz9q+pt4uMVY3p2x84vYDITGDITGDITGDISmtwY+yOuY1uOvhVK5BaoPG/LrFS04IFldzN3JF/Du2iJvesSMGEhQYijaTmluBB/1hoEzN//Tnd9fAgc1IiqpLKV8mBR41guUcZGOf88cqkvwFhlYRW4u9sxcTCrnoeUZhrFlfgHTp1V7NujOQgAAAABJRU5ErkJggg=="/>`, 
            'Mac OS': /*html*/`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEF0lEQVRoge2YXWgcVRTH/+fO7GSy+aJhm7YqPlhqKU2DCH3wQWgT0fahiiJLU9P4EqjB1FJQwRQh+CAIPtRqtR/GQq0RX6TFDxBtY1uwj4ZuVy2ihYqKbbMxm93ZmZ2Ze3yQSkzi5t6dnfVlf287e86Z//9+zLkzQIMGDRr8n1C9b7j9c24qzxSfBGg3A2vPPdWyLko9s1bCVHjo/bkt3kzxGEC3Rc9GrVk3A30ThQHJdGLBPa9ErVsXA72nituZcRILliwDX0StLaIWWI6HT3ILgPeweL8Vg4Q8ErV+7DMQGqUhAKsXXmfQ6MV0282o9WOfAYZ8fNFFwvHJXc1v1qJ+7AYAum/eD5eZR8/1J/eAiGtRvR6beAbAdTB9BlO8O7nT/gkDtStedSPbcZSThVZngEBpgNcBWAnQdQJfAfMnCOWnZ59un56fs+UE22Q5jxDwGAibwbgTIBPgawCfZeLxyV1t2dgNbJ1w0sT8DoDOCmEBwN8AlGWiOcG8noGtANor5DABxynhvfhVulOpyekZYKa+ieJBBj2nlacNXTUE937Z3/LbcpFam7h3wjkQv3gA4PVBiHGVSGUDfROFbQBeqVqTDkynXCv5hEqo0lNobIzFBXZeQx1Or0EYfnxhd9ug6mNWycD5e90HidETTdryFBw/Vyp4L4DalXuEkgGSvC3OsWcGZvIuPD/49vv9q37WyVVrZMT3V6VMAccNMD1bglcO0dHcpH28UOzEdDdQk84PBlD2Q5TcAHNOGV45/Oc/QxrndespGuB/NZ/bAlw/RLkcQkpGyH8blJIhBEEQgeYvOwJYAqFkMC8eDAJhav+KP2MyABdg5Is+8gUP7rxRWwopGVJzxhiMTUdzmzJ7OjM6eUoGCo7PubyLsl9ZeFTIlzsBaBlQamR5xzPjFg8Arh8O6uYoGTCIrurL0cfzgru637o1rJOjZICEebo6SXowAKfkH9p4+NZm1RwlA9y1YlwIklUr0yAIpek4/qWet6eHVOKV++uGN258Vyz5G6qXpo9tGb/ckV91z9djFPxXjPJp1BRitDay1BEEWUk8oGEgszd12raMXHRZahCARMLct1yc1guNnbRG6vU1OGmb2cxI6sxycVoGLj/T+WGzbfxQvSw1hCCZMHiHUqxucZvEo4YpYu1qbUnr1ct7V19TidU2MLWv68cO23w+rqXUYptTmZHUy6rxVX2ZmxpZebC11TpWTW4l7Cbzj1JH1wM6OZEGsvvQjY/mSn56idMxiICmhDEtDHGTgCJLTvmBXOOH0lqqVrNl/m62293ZoQ6tJ13kldBzJNfvlfzXPT9cAwAJU8zaCfNMq4kDl4ZTvy6M33h4ZjD0vZf8AGuDMExYplG0mowPss+mhkH16fYNGjRoUDv+AotTfqg5rVRTAAAAAElFTkSuQmCC"/>`,
            'Linux': /*html*/`<img src="data:image/png;base64,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"/>`
        };
    
        this.splunkIcon = /*html*/`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADQ0lEQVRoge2US2gdVRjHf9/clEui0tQgEaTJnJlQsqiohGIjEaSItokLEREURRCh+KrZaLpQ6kqSGxd2p4uCqNVFLNWaVNrqQhQTlIiPrto4Z5JKaRViK5ZS753zuZkbh6s3pPFuhPNbncf3+n/nAR6Px+PxeDwej8fj+R8RRdHrxhhtRSxjjEZRNL9e/2A9Ts45t96ErWYtAkphGN7a29t7W91eRNYrQHp6ejatMS8AL05vf+C5o7vKzfbboijaCLylqruAS6o6kaZpJb8iXwMlYJOIGGPMD6q6E1i5PsaYE8Dd1loprClwzFq7MwzDz0RkB7AbqAAbjTGnVPXeNE3TYjFhGPaLyGHgZWvtBwAicqhDL1zcOzN4REWnkj82H516aCqr+wTOuVFVvV9VR2u12s2qOlWIuU1Vn7XWxqr6NHCLiIw3nECtSXMkL6AudoeI3CkiDwJbROSFonEcx5tF5Djwp4icWAmipRjY5yBC5Uh0zc+Le2e27x/75PYhgEBEkjzRnnK53L64uGgLcb9L03QOoKur6wBwGRhueAPNBNTRPP7uJEl+TJLkUL5+w4qBaqdz7jgg1Wp1OEmSi/W98fu+TCZGZvdXRmaHcjGTDhnABV8ABNbad1R1DNiSZdlcHMd3rKgXSevj+fn5ai6gvXgCIrLqCdQFFIvK/TYUptcBNwFnuru7f2nWieUbL58R5WxxLQBI07QCDAOdWZa9XehMf30cx3EfcD3wPYU3oKrVYsD8Tf1DQCOq2laYnheRp4DB5eXl1xptRw/f1Tk2M/h85/nyTyq8K8LZQHQIoC0Mw8dLpdJp59w5oCoixYL6wzDcB3ykqq/mxUwA2wo2v+aFPwycVNWXGgQ0oyjAJUly0BhzD7AniqK5JEneBxibHjyAXHkEuBDAmxm1NyaHvzlXdwyA0Dl3EJgFvhWRxwqBj4nItUEQTKtqKCKPWms/bnjEFeCUqr6nqp8DnwKo6qon0CAgA+jo6HgGOK2qTwwMDGzI27BVRZ9sv/R77/jIV69Mjvxd/KoYY9QY8+GajCHI//f/TF9fX9M//18TtyIp4JaWln5rRaCFhYUrV2PfKgEej8fj8Xg8Ho/H47la/gIvZ0dnRT43XgAAAABJRU5ErkJggg=="/>`;
    
        this.unknownIcon = /*html*/`<img src="data:image/png;base64,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"/>`;
    
    };

    _.extend(UserAgentHandler.prototype, {

        /*
        * here you can initialize the handler with the current user agent string
        */
        setUserAgentString: function(userAgentString) {
            this.parser.setUA(userAgentString);
            this.parsedUserAgent = this.parser.getResult();
        }, 

        /*
        * gives you a popover element with the given user agent string (see Popovers in ConsistSplunkToolbox)
        * parameter placement - String with direction of the popover -> left, right, top, bottom
        */
        getPopupTemplate: function(placement) {

            placement = placement || 'right';

            return `
            <a href="#" title="User Agents" data-placement="${placement}" data-toggle="popover" data-trigger="hover" data-content="${this.parsedUserAgent.ua}"></a>
            `
        }, 

        /*
        * gives you a matching browser icon for the user agent string
        */
        getBrowserIcon: function() {
            if(this.parsedUserAgent.ua.includes('Splunk')) {
                return this.splunkIcon;
            }
            return this.browserIconMap[this.parsedUserAgent.browser.name] || this.unknownIcon
        },

        /*
        * gives you a matching OS icon for the user agent string
        */
        getOSIcon: function() {
            return this.osIconMap[this.parsedUserAgent.os.name] || this.unknownIcon;
        }
    });



    var UserAgentTableCellRenderer = TableView.BaseCellRenderer.extend({

        /*Instance of the userAgentHandler from above. you can access this instance with this.userAgentIconHandler in every method of this object */
        userAgentHandler: new UserAgentHandler(),
        
        /*
        * here you can decide if you want to render for this cell
        * cell.field = fieldname or header of this cell
        * cell.value = value of this cell
        * 
        * this function is called by splunk every time new data should be displayed
        * should return true, if you want to render or false if not
         */
        canRender: function(cell) {
            return cell.field == 'Browser' || cell.field == 'Betriebssystem';
        },
    
       
    
        /**
         * renders the table cell
         * called by splunk every time new data should be displayed and the canRender function returned true
         * parameter:
         * 
         * $td - jquery Element of the current table cell, you can append every html oder string you want..
         * 
         * cell - current data cell
         * cell.field = fieldname of current cell
         * cell.value = current value of cell
         * 
         * this method returns nothing
         */
        render: function($td, cell) {
            
            if(cell.value) {
                $td.addClass('align-center');

                //set userAgentString in UserAgentHandler
                this.userAgentHandler.setUserAgentString(cell.value);
    
                //get the matching icon for browser or os
                if(cell.field == 'Browser') {
                    var icon = this.userAgentHandler.getBrowserIcon();
                } else {
                    var icon = this.userAgentHandler.getOSIcon();
                }
                
                //get the popover
                var placement = cell.field === "Betriebssystem" ? 'left' : 'right';
                var popupTemplate = this.userAgentHandler.getPopupTemplate(placement);
                //append icon to popup anchor
                var $popup = $(popupTemplate).append(icon);
                
                //append popover anchor to table cell
                $td.html($popup);
            }
        }
    });

    return UserAgentTableCellRenderer;

});