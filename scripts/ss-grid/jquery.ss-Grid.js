// (function ($) {
//   var container;
//   var target;
//   var items = [];
//   var strenchItem;
//   var countItems = 0;
//   var addStyleContainer = function () {
//     if (target) {
//       target.addClass("ss-Grid");
//     }
//   };
//   var initContainer = function () {
//     var gridContent = $("<div class=\"ss-Grid-Content\" id=\"ss-Grid-Content\"></div>");
//     target.append(gridContent);
//     $(gridContent).mCustomScrollbar({
//       theme: "ss-grid",
//       axis: "x",
//       autoDraggerLength: true,
//       callbacks: {
//         //onOverflowX: function () {
//         //  var s = $(".content .mCustomScrollBox");
// 
//         //  for (var i = 0;i< s.length; i++) {
//         //    var height = $(s[i]).height();
//         //    $(s[i]).height(height - 15);
//         //  }
// 
// 
//         //},
//         //onOverflowXNone: function () {
// 
//         //  var s = $(".content .mCustomScrollBox");
// 
//         //  for (var i = 0; i < s.length; i++) {
//         //    var height = $(s[i]).height();
//         //    $(s[i]).height(height + 15);
//         //  }
// 
//         //}
//       },
//       autoHideScrollbar: false,
//       scrollInertia: 200
//     });
// 
//     container = $(".ss-Grid-Content .mCSB_container");
//   };
// 
//   var initChild = function (options) {
//     var gridChildDom = $("<div class=\"ss-Grid-child\" id=\"ss-Grid-child-" + countItems + "\"></div>");
//     var contentDom = $("<div class=\"content\"></div>");
//     var titleDom = $("<section>" + options.title + "</section>");
//     var headerDom = $("<div class=\"header\"></div>");
//     var navDom = $("<section></section>");
//     var closeDom = $("<div class=\"ss-Grid-button ss-Grid-buttonClose\"><div class=\"ss-Grid-close\"></div></div>");
//     var restoreDown = $("<div class=\"ss-Grid-button\"><div class=\"ss-Grid-maximise\" id=\"ss-Grid-maximise-" + countItems + "\"></div></div>");
//     var domObject = $(options.id);
// 
//     domObject.css("white-space", "normal")
//     domObject.height("100%");
// 
//     items.push({
//       id: options.id,
//       target: gridChildDom,
//       isOpen: options.isOpen,
//       isScroll: options.isScroll,
//       isRestoreDown: options.isRestoreDown,
//       width: domObject.width(),
//       countId: countItems,
//       callback: options.callback
//     });
// 
//     if (!options.isOpen)
//       gridChildDom.hide();
// 
//     if (options.navigation.length != 0) {
// 
//       var length = options.navigation.length;
// 
//       for (var i = 0; i < length; i++) {
//         navDom.append($(options.navigation[i].content));
//       }
//     }
//     if (options.isRestoreDown) {
//       restoreDown.click(function () {
//         methods.restoreDown(options.id);
//       });
// 
//       navDom.append(restoreDown);
//     }
// 
//     if (options.isClose) {
//       closeDom.click(function () {
//         methods.hideItem(options.id);
//       });
// 
//       navDom.append(closeDom);
//     }
// 
//     headerDom.append(titleDom);
//     headerDom.append(navDom);
// 
//     contentDom.append(domObject);
//     gridChildDom.append(headerDom);
//     gridChildDom.append(contentDom);
//     container.append(gridChildDom);
// 
//     var s = 30;//$(headerDom).height()
//     var h = $(document).height();
// 
//     if (options.isScroll) {
//       $(domObject).mCustomScrollbar({
//         theme: "dark",
//         scrollInertia: 200
//       });
// 
//       $(".content .mCustomScrollBox").height(h - s - 20 - $("header").height());
// 
//     } else {
//       $(".content " + options.id).height(h - s - 20 - $("header").height());
//     }
// 
//     countItems++;
//     
//     if (options.callback.addedContent)
//       options.callback.addedContent.call(this);
//   };
// 
//   var extendOptions = function (options) {
//     return $.extend({
//       isClose: true,
//       isRestoreDown: true,
//       isStrench: true,
//       callback: callback,
//       isScroll: true,
//       title: "",
//       id: undefined,
//       isOpen: true,
//       navigation: []
//     }, options);
//   }
// 
//   var getItem = function (id) {
//     if (!id)
//       $.error('id не определен');
// 
//     var length = items.length;
//     for (var i = 0; i < length; i++) {
//       if (items[i].id === id) {
//         return items[i];
//       }
//     }
// 
//     $.error(id + ' не найден');
// 
//   };
// 
// 
//   var callback = {
//     onChangedSizeWindow: function () { },
//     addedConten: function () { }
//   }
// 
//   var resize = function () {
//     for (var i = 0; i < countItems; i++) {
//       var item = items[i];
//       var s = 30;
//       var h = $(document).height();
//       if (item.isScroll) {
//         $(".content .mCustomScrollBox").height(h - s - 20 - $("header").height());
//       } else {
// 
//         $(".content " + item.id).height(h - s - 20 - $("header").height());
//       }
// 
// 
//     }
// 
//   }
// 
// 
// 
// 
//   var methods = {
//     init: function (options) {
//       return this.each(function () {
//         var $this = $(this),
//             data = $this.data('ss-Grid');
// 
//         if (!data) {
//           $(this).data('ss-Grid', {
//             target: $this
//           });
//           target = $this;
//           addStyleContainer();
//           initContainer();
//           $(window).resize(function () {
//             resize();
//           });
// 
//         } else {
//           target = data.target;
//         }
//       });
//     },
//     destroy: function () {
//     },
//     addItem: function (options) {
//       return this.each(function () {
//         if (!options)
//           return;
// 
//         var optionsCout = options.length;
// 
//         if (!optionsCout) {
//           var opt = extendOptions(options)
// 
// 
//           if (!opt.id)
//             return;
// 
//           initChild(opt);
//         } else {
//           for (var i = 0; i < optionsCout; i++) {
//             var option = extendOptions(options[i])
// 
//             if (!option.id)
//               continue;
// 
//             initChild(option);
//           }
//         }
//         
//       });
// 
//     },
//     getStateItem: function (id) {
//       return getItem(id).isOpen;
//     },
//     showItem: function (id) {
//       var target = getItem(id);
//       target.isOpen = !target.isOpen;
//       target.target.show();
//       var item = $(target.id + " .mCustomScrollBox");
//       item.css("max-height", "100%");
// 
//       $("#ss-Grid-Content").mCustomScrollbar("update");
//     },
//     hideItem: function (id) {
//       var target = getItem(id);
// 
//       target.isOpen = !target.isOpen;
// 
//       target.target.hide();
//       $("#ss-Grid-Content").mCustomScrollbar("update");
// 
//     },
//     restoreDown: function (id) {
//       var t = getItem(id);
// 
//       if (t.isRestoreDown) {
//         $(t.id).width(target.width() - 15);
//         $("#ss-Grid-maximise-" + t.countId).addClass("ss-Grid-restoreDown");
//         $("#ss-Grid-maximise-" + t.countId).removeClass("ss-Grid-maximise");
//         t.isRestoreDown = !t.isRestoreDown;
//       } else {
//         $("#ss-Grid-maximise-" + t.countId).removeClass("ss-Grid-restoreDown");
//         $("#ss-Grid-maximise-" + t.countId).addClass("ss-Grid-maximise");
//         $(t.id).width(t.width);
//         t.isRestoreDown = !t.isRestoreDown;
//       }
//       methods.scrollTo(id);
//       $("#ss-Grid-Content").mCustomScrollbar("update");
// 
//       if (t.callback.onChangedSizeWindow)
//         t.callback.onChangedSizeWindow.call(this);
//     },
//     scrollTo: function (id) {
//       var t = getItem(id);
//       $("#ss-Grid-Content").mCustomScrollbar("scrollTo", "#ss-Grid-child-" + t.countId);
//     },
//     addContent: function (content) {
//       var s = $(content.id + " .mCSB_container");
// 
//       s.append(content.content);
// 
// 
//     },
// 
//     clearContent: function (id) {
//       var s = $(id + " .mCSB_container");
// 
//       s.empty();
// 
// 
//     },
// 
//     stretchItem: function (index) {
//     },
//     unStretchItem: function (index) {
//     },
//     getAllOpenItems: function () {
//     },
//     update: function (content) {
// 
// 
// 
//     }
//   };
// 
//   //$.fn.myPlugin = function() {
// 
//   //  // extend the options from pre-defined values:
//   //  var options = $.extend({
//   //      callback: function() { }
//   //  }, arguments[0]|| { });
// 
//   //    // call the callback and apply the scope:
//   //    options.callback.call(this);
// 
//   //  };
// 
//   $.fn.ssGrid = function (method) {
//     if (methods[method]) {
//       return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
//     } else if (typeof method === 'object' || !method) {
//       return methods.init.apply(this, arguments);
//     }
//     $.error('Метод с именем ' + method + ' не существует для jQuery.ssGrid');
// 
//     return undefined;
//   };
// 
// 
// })(jQuery);

(function ($) {

var ssGrid = [];

var methods = {
  init: function (options) {
     return this.each(function () {
        var $this = $(this),
            data = $this.data('ss-Grid');

        if (!data) {
          $(this).data('ss-Grid', {
            target: $this
          });               
            
        ssGrid[$this.id]= {
          items: [],
          methods: {
            minimize: function(){
              
            },
            maximize: function(){
              
            },
            rollUp: function(){
              
            },
            resize: function(){
              
            },
            strench: function(){
              
            }
          }
        }

        } 
      });
  },
  addChild: function(options){
    
  },
  deleteChild: function(options){
    
  },
  openChild: function(){
    
  },
  closeChild: function(){
      
  },
  openAll: function(){
    
  },
  closeAll: function(){
    
  },
  changeHeader: function(){
    
  },
  resize: function(){
    
  }
};

$.fn.ssGrid = function (method) {
   if (ssGrid.hasOwnProperty(this.id)) {
  
  
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    $.error('Метод с именем ' + method + ' не существует для jQuery.ssGrid');

    return undefined;
  }};
})(jQuery);