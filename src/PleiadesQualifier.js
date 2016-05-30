var nsYandex = nsYandex || {};

(function($){
	var PleiadesQualifier = function(column, idField, sortBy, filters, fields, useSync, itemsRasterVisible){
		nsYandex.BaseQualifier.call(this, column, idField, sortBy, filters, fields, useSync, itemsRasterVisible);
	};
	PleiadesQualifier.prototype = Object.create(nsYandex.BaseQualifier.prototype);
	PleiadesQualifier.prototype.constructor = PleiadesQualifier;

	PleiadesQualifier.prototype._layerFilter = function(layer){
		return layer.getGmxProperties().MetaProperties.hasOwnProperty('yandexQuality');
	};

	PleiadesQualifier.prototype.attachMenus = function (module) {
		this._chain([
			function(){
				return this.isMemberOf('scanex_sales');
			}.bind(this),
			function(is_scanex){
				var def = new $.Deferred();
				this.isMemberOf('airbus_team').done(function(is_airbus){
					def.resolve(is_scanex || is_airbus);
				});
				return def;
			}.bind(this),
			function(ok){
				if(ok){
					module.afterViewer({
						layer: Object.keys(this._layers).join(','),
						column: this._column,
						menus: [
							{
								title: nsGmx.Translations.getText('quality.revert'),
								value: function(gmx) {
									return { value: null };
								}
							},
							{title: nsGmx.Translations.getText('quality.accept'), value: 1},
							{title: nsGmx.Translations.getText('quality.reject.snow'), value: 2},
							{title: nsGmx.Translations.getText('quality.reject.duplicate'), value: 3},
							{title: nsGmx.Translations.getText('quality.reject.geometry'), value: 4}
						]
					}, this._map);
				}
			}.bind(this)
		]);
	};

	nsYandex.PleiadesQualifier = PleiadesQualifier;

}(jQuery));
