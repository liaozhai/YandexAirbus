(function ($) {

	nsGmx.Translations.addText('rus',{
		info: 'Информация',
		quality: {
			revert: 'Отменить',
			accept: '1 - Принять (Все хорошо)',
			reject: {
				snow: '2 - Отложить (Контроль снега)',
				duplicate: '3 - Отклонить (Дубль)',
				geometry: '4 - Отклонить (Брак геометрии)'
			}
		},

	});

	nsGmx.Translations.addText('eng',{
		info: 'Information',
		quality: {
			revert: 'Revert',
			accept: "1 - Accept (Everything's OK)",
			reject: {
				snow: '2 - Postpone (Snow)',
				duplicate: '3 - Reject (Duplicated)',
				geometry: '4 - Reject (Bad geometry)'
			}
		},

	});

	var sortBy = {field: 'QUALITY', asc: true};
	var filters = {
		'QUALITY': {
			filter: function(value){
				return value || 0;
			},
			values: {}
		}
	};

	var fields = {
		'Segment_AC': {
			name: 'Segment_AC', title: 'Segment_AC', type: 'string',
			icon: 'icon-satellite', iconAsc: 'icon-satellite-asc', iconDesc: 'icon-satellite-desc',
		},
		'QUALITY': {
			name: 'QUALITY', title: 'QUALITY', type: 'integer',
			icon: 'icon-cloud', iconAsc: 'icon-cloud-asc', iconDesc: 'icon-cloud-desc',
			style: 'yandex-layers-mark-cell'
		},
		'layerShort': {
			name: 'LAYER', title: 'LAYER', type: 'string',
			icon: 'icon-date', iconAsc: 'icon-date-asc', iconDesc: 'icon-date-desc'
		}
	};

	var pluginPath = gmxCore.getModulePath('AirbusPleiades');

	var qualifier = null;

	gmxCore.addModule('AirbusPleiades', {
		pluginName: 'Airbus Pleiades',
		afterViewer: function(params, map){
			gmxCore.loadCSS(pluginPath + 'style.min.css');
			qualifier = new nsYandex.PleiadesQualifier('QUALITY', 'Segment_AC', sortBy, filters, fields, false, true);
		},
		unload: function(){
			if(qualifier){
				qualifier.dispose();
			}
		}
	});

}(jQuery));
