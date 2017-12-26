/*!
 * Music dialog plugin for Editor.md
 *
 * @file        music-dialog.js
 * @author      knia
 * @version     1.0.0
 * @updateTime  2017-12-26
 */

(function() {

    var factory = function (exports) {

		var pluginName   = "music-dialog";

		exports.fn.musicDialog = function() {

			var _this       = this;
			var cm          = this.cm;
            var editor      = this.editor;
            var settings    = this.settings;
            var selection   = cm.getSelection();
            var lang        = this.lang;
            var musicLang    = lang.dialog.music;
            var classPrefix = this.classPrefix;
			var dialogName  = classPrefix + pluginName, dialog;

			cm.focus();
			
			
            if (editor.find("." + dialogName).length > 0)
            {
                dialog = editor.find("." + dialogName);
                dialog.find("[data-url]").val("");
                dialog.find("[data-title]").val("");

                this.dialogShowMask(dialog);
                this.dialogLockScreen();
                dialog.show();
            }
            else
            {
                var dialogHTML = "<div class=\"" + classPrefix + "form\">" + 
                                        "<label>" + musicLang.musicTitle + "</label>" + 
                                        "<input type=\"text\" value=\"\" data-title />" +
                                        "<br/>" + 
                                        "<label>" + musicLang.author + "</label>" + 
                                        "<input type=\"text\" value=\"\" data-author />" +
                                        "<br/>" + 
                                        "<label>" + musicLang.pic + "</label>" + 
                                        "<input type=\"text\" value=\"\" data-pic />" +
                                        "<br/>" + 
                                        "<label>" + musicLang.url + "</label>" + 
                                        "<input type=\"text\" value=\"\" data-music />" + 
                                        "<br/>" +
                                    "</div>";

                dialog = this.createDialog({
                    title      : musicLang.title,
                    width      : 380,
                    height     : 297,
                    content    : dialogHTML,
                    mask       : settings.dialogShowMask,
                    drag       : settings.dialogDraggable,
                    lockScreen : settings.dialogLockScreen,
                    maskStyle  : {
                        opacity         : settings.dialogMaskOpacity,
                        backgroundColor : settings.dialogMaskBgColor
                    },
                    buttons    : {
                        enter  : [lang.buttons.enter, function() {
                            var url   = this.find("[data-url]").val();
                            var pic   = this.find("[data-pic]").val();
                            var author   = this.find("[data-author]").val();
                            var title = this.find("[data-title]").val();

                            if (url === "http://" || url === "")
                            {
                                alert(musicLang.urlEmpty);
                                return false;
                            }

                            if (title === "")
                            {
                                alert(musicLang.titleEmpty);
                                return false;
                            }
                            
                            if (pic === "")
                            {
                                alert(musicLang.picEmpty);
                                return false;
                            }
                            /* 插入APlayer代码 */
                            var insertHTML = "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.6.0/APlayer.min.js\"></script>"+
												"<div id=\"aplayer1\" class=\"aplayer\"></div>											   "+
												"<script>																				   "+
												"var ap = new APlayer({																	   "+
												"    element: document.getElementById('aplayer1'),										   "+
												"    music: {																			   "+
												"        title: '"+title+"',															   "+
												"        author: '"+author+"',															   "+
												"        url: '"+url+"',								   								   "+
												"        pic: '"+pic+"'									   								   "+
												"    }																					   "+
												"});																					   "+
												"</script>";
                            
                            cm.replaceSelection(insertHTML);

                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }],

                        cancel : [lang.buttons.cancel, function() {                                   
                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }]
                    }
                });
			}
		};

	};
    
	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
		if (define.amd) { // for Require.js

			define(["editormd"], function(editormd) {
                factory(editormd);
            });

		} else { // for Sea.js
			define(function(require) {
                var editormd = require("./../../editormd");
                factory(editormd);
            });
		}
	} 
	else
	{
        factory(window.editormd);
	}

})();