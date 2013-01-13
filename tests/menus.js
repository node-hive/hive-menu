var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var tap = require('tap');
var hive_menu = require('./../index');

var _DEBUG = false;

/* ************************************
 * 
 * ************************************ */

tap.test('basic menu construction', function (t) {

	var menu = new hive_menu.Menu({
		name:  'foo',
		title: 'Foo',
		items: [
			{title: 'Alpha', name: 'alpha', link: '/alpha', weight: 1},
			{title: 'Beta', name: 'beta',  link: '/beta', weight: 0}
		]});

	var menu_json = menu.toJSON();

	t.deepEqual(menu_json,  {
		"name" : "foo", 
		"weight" : 0, 
		"title" : "Foo", 
		"items" : [{
			"name" : "beta",
			"weight" : 0, 
			"title" : "Beta", 
			"link" : "/beta" 
		},{
			"name" : "alpha",
			"weight" : 1, 
			"title" : "Alpha", 
			"link" : "/alpha" 
		}] 
	}, 'basic menu json');

	var beta = menu.item('beta');

	t.deepEqual(beta.toJSON(), {
		"name" : "beta",
		"weight" : 0,
		"title" : "Beta",
		"link" : "/beta"
	}, 'found beta');

	beta.hide = true;

	 menu_json = menu.toJSON();
	t.deepEqual(menu_json,  {
		"name" : "foo",
		"weight" : 0,
		"title" : "Foo",
		"items" : [{
			"name" : "alpha",
			"weight" : 1,
			"title" : "Alpha",
			"link" : "/alpha"
		}]
	}, 'basic menu json - after hiding beta');
	t.end();

});