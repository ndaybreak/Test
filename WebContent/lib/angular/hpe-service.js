(function () {
    var hpe = angular.module('hpe.service', []);

    hpe.factory('spin', function () {
        if ($("#hpe_spin_overlay").length == 0) {
            var html = '<div class="ui-widget-overlay ui-front" id="hpe_spin_overlay"></div>' +
                       '<img src="images/spinning2.gif" id="hpe_spin_img" style="position: fixed; top: 50%; left: 50%; z-index: 9999999; margin-left: -30px; margin-top: -30px;"/>';
            $(document.body).append(html);
            var ctx = $('#hpe_spin_overlay');
            var spin = $('#hpe_spin_img');
            ctx.hide();
            spin.hide();
        }
        return {
            start: function () {
                ctx.show();
                spin.show();
            },
            stop: function () {
                ctx.hide();
                spin.hide();
            }
        }
    });

    hpe.factory('msgbox', function ($q) {
        var html = '<div title>' +
                    '<p><span class="ui-icon" style="float: left; margin: 0 7px 20px 0;"></span>' +
                    '<span message></span></p>' +
                    '</div>';
        //TODO:better define buttons/icon
        var defaultOpts = {
            resizable: false,
            title: 'Information',
            icon: 'ui-icon-alert',
            width: 400,
            autoOpen: false,
            modal: true,
            draggable: true,
            message: 'Proceed?',
            buttons: [{
                        text: 'OK',
                        'class': 'btn btn-Primary',
                        result: true
                     },
                     {
                        text: 'Cancel',
                        'class': 'btn btn-Secondary',
                        result: false
                     }]
        };
        
        var dlg = null;
        return {
            show: function (opt) {
                if (dlg) {
                    dlg.dialog('destroy');
                }
                
                var deferred = $q.defer();
                var tempOpt = angular.copy(defaultOpts);
                angular.extend(tempOpt, opt);

                var segment = $(html);
                segment.attr('title', tempOpt.title);
                $('span[message]', segment).text(tempOpt.message);
                $('span[style]', segment).addClass(tempOpt.icon);

                var btns = [];
                for (var i = 0; i < tempOpt.buttons.length; i++) {
                    var btn = {
                        text: tempOpt.buttons[i].text,
                        result: tempOpt.buttons[i].result,
                        'class': tempOpt.buttons[i]['class'],
                        click: function (evt) {
                            
                            var txt = $(evt.target).text();
                            for (var j = 0; j < tempOpt.buttons.length; j++) {
                                if (tempOpt.buttons[j].text == txt) {
                                    var result = tempOpt.buttons[j].result;
                                    deferred.resolve(result);
                                    break;
                                }
                            }
                            $(this).dialog('close');
                        }
                    }
                    btns.push(btn);
                }
                
                tempOpt.buttons = btns;
                dlg = segment.dialog(tempOpt);

                dlg.bind('dialogclose', function () {
                    deferred.resolve(null);
                });

                dlg.dialog('open');
                return deferred.promise;
            }
        }
    });
    
    hpe.factory('dialog', function ($q, $compile, $http, $rootScope) {
        var html = '<div title>' +
                    '<p>' +
                    '</p>' +
                    '</div>';
        
        var defaultOpts = {
            resizable: false,
            title: 'Dialog',
            width: 400,
            autoOpen: false,
            modal: true,
            draggable: true,
            buttons: []
        };

        var dlg = null;
        return {
            show: function (opt) {
                if (dlg) {
                    dlg.dialog('destroy');
                }

                var deferred = $q.defer();
                var tempOpt = angular.copy(defaultOpts);
                angular.extend(tempOpt, opt);

                var segment = $(html);
                segment.attr('title', tempOpt.title);
                
                function compileTemplateAndShow(template) {
                    var x = $(template);
                    var p = $('p', segment).append(x);
                    
                    if (tempOpt.controller) {
                        p.attr("ng-controller", tempOpt.controller);
                    }

                    var scope = $rootScope.$new();
                    scope.close = function (result) {
                        deferred.resolve(result);
                        dlg.dialog('close');
                    };
                    if (tempOpt.param) {
                        scope.param = tempOpt.param;
                    }
                    
                    $compile(p)(scope);

                    dlg = segment.dialog(tempOpt);

                    dlg.bind('dialogclose', function () {
                        deferred.resolve(null);
                    });

                    dlg.dialog('open');
                };
                
                if (tempOpt.template) {
                    compileTemplateAndShow(tempOpt.template);
                } else if (tempOpt.templateUrl) {
                    $http({
                        method: 'GET',
                        url: tempOpt.templateUrl
                    }).then(function (result) {
                        compileTemplateAndShow(result.data);
                    });
                }
                
                
                return deferred.promise;
            }
        }
    });
})();