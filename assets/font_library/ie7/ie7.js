/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'bentley-iconfont\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-acrobat': '&#xe900;',
		'icon-active_learning': '&#xe901;',
		'icon-activity': '&#xe902;',
		'icon-add': '&#xe903;',
		'icon-align_center': '&#xe904;',
		'icon-align_justify': '&#xe905;',
		'icon-align_left': '&#xe906;',
		'icon-align_right': '&#xe907;',
		'icon-approve': '&#xe908;',
		'icon-apps_launcher': '&#xe909;',
		'icon-archived': '&#xe90a;',
		'icon-arrow_down': '&#xe90b;',
		'icon-arrow_left': '&#xe90c;',
		'icon-arrow_right': '&#xe90d;',
		'icon-arrow_up': '&#xe90e;',
		'icon-bar': '&#xe90f;',
		'icon-basket': '&#xe910;',
		'icon-bell': '&#xe911;',
		'icon-budget': '&#xe912;',
		'icon-calendar': '&#xe913;',
		'icon-check': '&#xe914;',
		'icon-chevron_down': '&#xe915;',
		'icon-chevron_left': '&#xe916;',
		'icon-chevron_right': '&#xe917;',
		'icon-chevron_up': '&#xe918;',
		'icon-close': '&#xe919;',
		'icon-clouds': '&#xe91a;',
		'icon-collapse': '&#xe91b;',
		'icon-collapse-window': '&#xe91c;',
		'icon-collapse-window-2': '&#xe91d;',
		'icon-comments': '&#xe91e;',
		'icon-compare': '&#xe91f;',
		'icon-construction': '&#xe920;',
		'icon-contractor': '&#xe921;',
		'icon-contracts': '&#xe922;',
		'icon-delete': '&#xe923;',
		'icon-download': '&#xe924;',
		'icon-edit': '&#xe925;',
		'icon-email': '&#xe926;',
		'icon-event': '&#xe927;',
		'icon-expand': '&#xe928;',
		'icon-expand-window': '&#xe929;',
		'icon-export': '&#xe92a;',
		'icon-favorite': '&#xe92b;',
		'icon-file': '&#xe92c;',
		'icon-fill': '&#xe92d;',
		'icon-filter': '&#xe92e;',
		'icon-filter-outlined': '&#xe92f;',
		'icon-folder': '&#xe930;',
		'icon-font_bold': '&#xe931;',
		'icon-font_color': '&#xe932;',
		'icon-font_italic': '&#xe933;',
		'icon-font_size': '&#xe934;',
		'icon-forward': '&#xe935;',
		'icon-full_screen': '&#xe936;',
		'icon-hand': '&#xe937;',
		'icon-history': '&#xe938;',
		'icon-home': '&#xe939;',
		'icon-image': '&#xe93a;',
		'icon-inspection': '&#xe93b;',
		'icon-layers': '&#xe93c;',
		'icon-learning_paths': '&#xe93d;',
		'icon-link': '&#xe93e;',
		'icon-list': '&#xe93f;',
		'icon-locked': '&#xe940;',
		'icon-map': '&#xe941;',
		'icon-marker': '&#xe942;',
		'icon-microstation': '&#xe943;',
		'icon-move': '&#xe944;',
		'icon-new-revision': '&#xe945;',
		'icon-open-new-window': '&#xe946;',
		'icon-pause-o': '&#xe947;',
		'icon-pie': '&#xe948;',
		'icon-play-o': '&#xe949;',
		'icon-ppt': '&#xe94a;',
		'icon-print': '&#xe94b;',
		'icon-redo': '&#xe94c;',
		'icon-refresh': '&#xe94d;',
		'icon-remove': '&#xe94e;',
		'icon-repair': '&#xe94f;',
		'icon-rotate_left': '&#xe950;',
		'icon-rotate_right': '&#xe951;',
		'icon-search': '&#xe952;',
		'icon-settings': '&#xe953;',
		'icon-share': '&#xe954;',
		'icon-standard_task_item': '&#xe955;',
		'icon-stop-o': '&#xe956;',
		'icon-suitcase': '&#xe957;',
		'icon-task_order': '&#xe958;',
		'icon-task_orders': '&#xe959;',
		'icon-thumbs': '&#xe95a;',
		'icon-undo': '&#xe95b;',
		'icon-unlocked': '&#xe95c;',
		'icon-upload': '&#xe95d;',
		'icon-user': '&#xe95e;',
		'icon-user_group': '&#xe95f;',
		'icon-use-template': '&#xe960;',
		'icon-variable': '&#xe961;',
		'icon-visibility': '&#xe962;',
		'icon-word': '&#xe963;',
		'icon-work_packaging': '&#xe964;',
		'icon-xls': '&#xe965;',
		'status-icon-help': '&#xe966;',
		'status-icon-info': '&#xe967;',
		'status-icon-ok': '&#xe968;',
		'status-icon-pending': '&#xe969;',
		'status-icon-rejected': '&#xe96a;',
		'status-icon-warning': '&#xe96b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
