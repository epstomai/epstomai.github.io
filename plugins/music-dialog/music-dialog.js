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
            var lang        = this.lang;
            var editor      = this.editor;
            var settings    = this.settings;
            var cursor      = cm.getCursor();
            var selection   = cm.getSelection();
            var musicLang   = lang.dialog.music;
            var classPrefix = this.classPrefix;
            var iframeName  = classPrefix + "music-iframe";
			var dialogName  = classPrefix + pluginName, dialog;

			cm.focus();

            var loading = function(show) {
                var _loading = dialog.find("." + classPrefix + "dialog-mask");
                _loading[(show) ? "show" : "hide"]();
            };

			dialog = editor.find("." + dialogName);
			dialog.find("[type=\"text\"]").val("");
			dialog.find("[type=\"file\"]").val("");
			dialog.find("[data-link]").val("");

			this.dialogShowMask(dialog);
			this.dialogLockScreen();
			dialog.show();

		};

	};

})();
