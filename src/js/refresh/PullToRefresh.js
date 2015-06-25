var React = require('react');
var PullToRefresh = function(params)  {
    var p = this;

    p.initPullToRefresh = function (pageContainer) {
        var eventsTarget = $(pageContainer);
        if (!eventsTarget.hasClass('pull-to-refresh-content')) {
            eventsTarget = eventsTarget.find('.pull-to-refresh-content');
        }
        if (!eventsTarget || eventsTarget.length === 0) return;

        var isTouched, isMoved, touchesStart = {}, isScrolling, touchesDiff, touchStartTime, container, refresh = false, useTranslate = false, startTranslate = 0, translate, scrollTop, wasScrolled, layer, triggerDistance, dynamicTriggerDistance;
        var page = eventsTarget.hasClass('page') ? eventsTarget : eventsTarget.parents('.page');
        var hasNavbar = false;
        if (page.find('.navbar').length > 0 || page.parents('.navbar-fixed, .navbar-through').length > 0 || page.hasClass('navbar-fixed') || page.hasClass('navbar-through')) hasNavbar = true;
        if (page.hasClass('no-navbar')) hasNavbar = false;
        if (!hasNavbar) eventsTarget.addClass('pull-to-refresh-no-navbar');

        container = eventsTarget;

        // Define trigger distance
        if (container.attr('data-ptr-distance')) {
            dynamicTriggerDistance = true;
        }
        else {
            triggerDistance = 44;
        }

        function handleTouchStart(e) {
            if (isTouched) {
                if (app.device.os === 'android') {
                    if ('targetTouches' in e && e.targetTouches.length > 1) return;
                }
                else return;
            }
            isMoved = false;
            isTouched = true;
            isScrolling = undefined;
            wasScrolled = undefined;
            touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = (new Date()).getTime();
            /*jshint validthis:true */
            container = $(this);
        }

        function handleTouchMove(e) {
            if (!isTouched) return;
            var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if (typeof isScrolling === 'undefined') {
                isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
            }
            if (!isScrolling) {
                isTouched = false;
                return;
            }

            scrollTop = container[0].scrollTop;
            if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true; 

            if (!isMoved) {
                /*jshint validthis:true */
                container.removeClass('transitioning');
                if (scrollTop > container[0].offsetHeight) {
                    isTouched = false;
                    return;
                }
                if (dynamicTriggerDistance) {
                    triggerDistance = container.attr('data-ptr-distance');
                    if (triggerDistance.indexOf('%') >= 0) triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
                }
                startTranslate = container.hasClass('refreshing') ? triggerDistance : 0;
                if (container[0].scrollHeight === container[0].offsetHeight || app.device.os !== 'ios') {
                    useTranslate = true;
                }
                else {
                    useTranslate = false;
                }
            }
            isMoved = true;
            touchesDiff = pageY - touchesStart.y;

            if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
                // iOS 8 fix
                if (app.device.os === 'ios' && parseInt(app.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;

                if (useTranslate) {
                    e.preventDefault();
                    translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                    container.transform('translate3d(0,' + translate + 'px,0)');
                }
                else {
                }
                if ((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
                    refresh = true;
                    container.addClass('pull-up').removeClass('pull-down');
                }
                else {
                    refresh = false;
                    container.removeClass('pull-up').addClass('pull-down');
                }
            }
            else {

                container.removeClass('pull-up pull-down');
                refresh = false;
                return;
            }
        }
        function handleTouchEnd(e) {
            if (!isTouched || !isMoved) {
                isTouched = false;
                isMoved = false;
                return;
            }
            if (translate) {
                container.addClass('transitioning');
                translate = 0;
            }
            container.transform('');
            if (refresh) {
                container.addClass('refreshing');
                container.trigger('refresh', {
                    done: function () {
                        p.pullToRefreshDone(container);
                    }
                });
            }
            else {
                container.removeClass('pull-down');
            }
            isTouched = false;
            isMoved = false;
        }

        // Attach Events
        eventsTarget.on(app.touchEvents.start, handleTouchStart);
        eventsTarget.on(app.touchEvents.move, handleTouchMove);
        eventsTarget.on(app.touchEvents.end, handleTouchEnd);

        // Detach Events on page remove
        if (page.length === 0) return;
        function destroyPullToRefresh() {
            eventsTarget.off(app.touchEvents.start, handleTouchStart);
            eventsTarget.off(app.touchEvents.move, handleTouchMove);
            eventsTarget.off(app.touchEvents.end, handleTouchEnd);
        }
        eventsTarget[0].f7DestroyPullToRefresh = destroyPullToRefresh;
        function detachEvents() {
            destroyPullToRefresh();
            page.off('pageBeforeRemove', detachEvents);
        }
        page.on('pageBeforeRemove', detachEvents);

    };

    p.pullToRefreshDone = function (container) {
        container = $(container);
        if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
        container.removeClass('refreshing').addClass('transitioning');
        container.transitionEnd(function () {
            container.removeClass('transitioning pull-up pull-down');
        });
    };
    p.pullToRefreshTrigger = function (container) {
        container = $(container);
        if (container.length === 0) container = $('.pull-to-refresh-content');
        if (container.hasClass('refreshing')) return;
        container.addClass('transitioning refreshing');
        container.trigger('refresh', {
            done: function () {
                p.pullToRefreshDone(container);
            }
        });
    };

    p.destroyPullToRefresh = function (pageContainer) {
        pageContainer = $(pageContainer);
        var pullToRefreshContent = pageContainer.hasClass('pull-to-refresh-content') ? pageContainer : pageContainer.find('.pull-to-refresh-content');
        if (pullToRefreshContent.length === 0) return;
        if (pullToRefreshContent[0].f7DestroyPullToRefresh) pullToRefreshContent[0].f7DestroyPullToRefresh();
    };

    return p;
};

module.exports = React.createClass({
    componentDidMount: function() {
        var self = this;
        this.pullToRefresh = new PullToRefresh();
        this.container = $('.pull-to-refresh-content');
        this.pullToRefresh.initPullToRefresh(this.container);
        this.container.on('refresh', function (e) {
            self.props.onRefresh && self.props.onRefresh(e);
        });
    },
    componentWillUnmount: function() {
        this.pullToRefresh.destroyPullToRefresh();
    },
    render: function() {
         return (
            <div className="pull-to-refresh-layer">
                <div className="preloader"></div>
                <div className="pull-to-refresh-arrow"></div>
            </div>
         );
    }
});
