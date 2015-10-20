(function ($) {
    var container;
    var target;
    var items = [];
    var strinchItem;
    var countItems = 0;
    var addStyleContainer = function () {
        if (target) {
            target.addClass("ss-Grid");
        }
    };
    var initContainer = function () {   
        var gridContent = $("<div class=\"ss-Grid-Content\" id=\"ss-Grid-Content\"></div>");
        target.append(gridContent);
        $(gridContent).mCustomScrollbar({
            theme: "ss-grid",
            axis: "x",
            callbacks:{
                    onOverflowX: function(){
                        var height=   $(".content .mCustomScrollBox").height();
                        $(".content .mCustomScrollBox").height(height-15);
                    },
                    onOverflowXNone: function(){
                        var height=   $(".content .mCustomScrollBox").height();
                        $(".content .mCustomScrollBox").height(height+15);
                    }
            },
            autoHideScrollbar: false,
            scrollInertia: 200
        });

        container = $(".ss-Grid-Content .mCSB_container");
    };
    
    var initChild = function(options){
                    var gridChildDom = $("<div class=\"ss-Grid-child\" id=\"ss-Grid-child-"+countItems+"\"></div>");
                    var contentDom = $("<div class=\"content\"></div>");
                    var titleDom = $("<section>" + options.title + "</section>");
                    var headerDom = $("<div class=\"header\"></div>");
                    var navDom = $("<section></section>");
                    var closeDom = $("<div class=\"button buttonClose\"><div class=\"close\"></div></div>");
                    var restoreDown = $("<div class=\"button\"><div class=\"maximise\" id=\"ss-Grid-maximise-"+countItems+"\"></div></div>");
                    var domObject = $(options.id);
                    
                    domObject.css("white-space", "normal")                    
                    domObject.height("100%");
                    
                     items.push({
                        id: options.id,
                        target: gridChildDom,
                        isOpen: options.isOpen,
                        isRestoreDown: options.isRestoreDown,
                        width:  domObject.width()  ,     
                        countId:  countItems
                    });
                    
                    
                    if (!options.isOpen)
                        gridChildDom.hide();
                     
                     if(options.isRestoreDown){                                                      
                          restoreDown.click(function () {   
                            methods.restoreDown(options.id);
                        });                         
                         
                        navDom.append(restoreDown);                         
                     }
                        
                    if (options.isClose) {                           
                        closeDom.click(function () {
                            methods.hideItem(options.id);
                        });
                        
                        navDom.append(closeDom);
                    }
                        
                    headerDom.append(titleDom);
                    headerDom.append(navDom);
                    contentDom.append(domObject);
                    gridChildDom.append(headerDom);
                    gridChildDom.append(contentDom);
                    container.append(gridChildDom);
                    
                   

                    
                    var s = headerDom.height();
                    var h = $(document).height();
                    
                     $(domObject).mCustomScrollbar({
                        theme: "minimal-dark",
                    });

                    countItems++;
                    $(".content .mCustomScrollBox").height(h-s-20);                
    };

    var extendOptions = function(options){
      return  $.extend({
                    isClose: true,
                    isRestoreDown: true,
                    isStrench: true,
                    title: "",
                    id: undefined,
                    isOpen: true,
                    navigation: []
                }, options);
    }

    var getItem = function (id) {
        if (!id)
            $.error('id не определен');

        var length = items.length;
        for (var i = 0; i < length; i++) {
            if (items[i].id === id) {
                return items[i];
            }

        }

    };

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('ss-Grid');

                if (!data) {
                    $(this).data('ss-Grid', {
                        target: $this
                    });
                    target = $this;
                    addStyleContainer();
                    initContainer();
                } else {
                    target = data.target;
                }
            });
        },
        destroy: function () {
        },
        addItem: function (options) {
            return this.each(function () {                            
                if(!options)
                 return;
                 
                var optionsCout = options.length;
                
                if(!optionsCout){  
                   var opt = extendOptions(options)
                    
                                      
                    if(!opt.id)
                        return;
                        
                    initChild(opt); 
                }else{
                    for (var i = 0; i < optionsCout; i++) {
                       var option =   extendOptions(options[i])
                       
                            if(!option.id)
                                continue;
                        
                        initChild(option); 
                    }  
                }
            });

        },
        getStateItem: function (id) {
            return getItem(id).isOpen;
        },
        showItem: function (id) {
            var target = getItem(id);


            target.isOpen = !target.isOpen;
            target.target.show();
        },
        hideItem: function (id) {
            var target = getItem(id);

            target.isOpen = !target.isOpen;

            target.target.hide();

        },
        restoreDown: function (id) {
            var target = getItem(id);

            if(target.isRestoreDown){
                $(target.id).width($(document).width()-15);
                $("#ss-Grid-maximise-"+target.countId).addClass("restoreDown");
                $("#ss-Grid-maximise-"+target.countId).removeClass("maximise");
                
                target.isRestoreDown = !target.isRestoreDown;
            }else{                
                $("#ss-Grid-maximise-"+target.countId).removeClass("restoreDown");
                $("#ss-Grid-maximise-"+target.countId).addClass("maximise");
                $(target.id).width(target.width);
                target.isRestoreDown = !target.isRestoreDown;
            }         
            	$("#ss-Grid-Content").mCustomScrollbar("scrollTo",target.id);
            	$("#ss-Grid-Content").mCustomScrollbar("scrollTo",'+=5');
                $("#ss-Grid-Content").mCustomScrollbar("update");
        },
        
        stretchItem: function (index) {
        },
        unStretchItem: function (index) {
        },
        getAllOpenItems: function () {
        },
        update: function (content) {

        }
    };

    $.fn.gridSunRise = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Метод с именем ' + method + ' не существует для jQuery.gridSunRise');

        return undefined;
    };


})(jQuery);