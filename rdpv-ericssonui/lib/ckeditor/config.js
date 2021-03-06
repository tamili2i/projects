/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
		config.toolbarGroups = [
  		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
  		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
  		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
  		{ name: 'paragraph', groups: [ 'list', 'indent', 'align', 'bidi', 'paragraph' ] },
  		'/',
  		{ name: 'styles', groups: [ 'styles' ] },
  		{ name: 'colors', groups: [ 'colors' ] },
  	];
    config.heigth= "300px";
};
