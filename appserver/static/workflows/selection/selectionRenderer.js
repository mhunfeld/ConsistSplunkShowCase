define([
    'underscore', 
    'backbone',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    //'css!./popups.css'
], function(_, Backbone, mvc, TableView) {
    var defaultTokens = mvc.Components.getInstance('default');
    var submittedTokens = mvc.Components.getInstance('submitted');

    var SelectionRenderer = TableView.BaseCellRenderer.extend({

        checkBoxTemplate: _.template('<label class="checkbox selectWagon" id="wagonId_<%=value%>">\
                                            <a href="#" data-name="\"selectedWagons\"" class="btn">\
                                                <i data-value="<%=value%>" class="icon-check selectedWagons" style="display: none;"></i>\
                                            </a>\
                                    </label>'),

        selectAllTemplate: _.template('<span class="selectAllCheckbox">\
                                            <label class="checkbox selectAll" id="selectAll">\
                                                <a href="#" data-name="selectedWagons" class="btn">\
                                                    <i data-value="selectAll" class="icon-check selectAll" style="display: none;"></i>\
                                                </a>\
                                                Alle auswählen</label>\
                                        </span>'),


        initialize: function(options) {
            this.selectedWagonsToken = options.selectedWagonsToken;
            defaultTokens.on('change:' + this.selectedWagonsToken, this.selectSelectedWagons.bind(this));
            defaultTokens.on('change:resetProtocol_tok', this.onDeselectWagons.bind(this));
            defaultTokens.on('change:selectAllWagons_tok', this.onSelectAllWagons.bind(this));


            this.tableComponent = options.tableComponent;
            this.tableComponent.$el.on('click', '.selectWagon', this.selectWagonClicked.bind(this));
            this.tableComponent.$el.on('click', '.selectAllCheckbox', this.onSelectAllClicked.bind(this));
        },

        canRender: function(cell) {
            return cell.field === 'Auswahl';
        },

        render: function($td, cell) {
            $td.html(this.checkBoxTemplate(cell));
            if(!this.isSelectAllRenderered) {
                $(this.selectAllTemplate())
                    .insertBefore(this.tableComponent.$el.find('.splunk-paginator'));
                this.isSelectAllRenderered = true;
            }
        },

        onDeselectWagons: function(newIndexName, tokValue, options) {
            if(tokValue) {
                this.deselectAll();
                defaultTokens.unset('resetProtocol_tok');
                submittedTokens.unset('resetProtocol_tok');
            }
        },
        
        onSelectAllWagons: function(newIndexName, tokValue, options) {
            if(tokValue) {
                this.selectAll();
                defaultTokens.unset('selectAllWagons_tok');
                submittedTokens.unset('selectAllWagons_tok');
            }
        },
        
        selectSelectedWagons: function(newIndexName, tokValue, options) { 
            this.tableComponent.$el.find('i.icon-check:visible').hide();

            if(tokValue) {
                //var selectedWagons = tokValue.split(',');
                var $checkboxes  = this.tableComponent.$el.find('i.icon-check');
                _.each(tokValue, function(selectedWagon) {
                    $checkboxes.filter('[data-value="' + selectedWagon + '"]').show();
                });
            }
        },

        setSelectedWagonsToTokenModel: function() {
            var selectedWagons = _.map(this.tableComponent.$el.find('i.icon-check:visible'), function(input) {
                return $(input).data('value');
            });

            //var selectedWagons = JSON.stringify(selectedWagons).replace('[', '').replace(']', '');             
            defaultTokens.set(this.selectedWagonsToken, selectedWagons);
            submittedTokens.set(this.selectedWagonsToken, selectedWagons);
        },

        selectWagonClicked: function(event) {
            var $checkbox = $(event.currentTarget).find('i');
            $checkbox.toggle();
            this.setSelectedWagonsToTokenModel();
            this.handleSelectAllCheckbox();
        },

        handleSelectAllCheckbox: function() {
            this.tableComponent.$el.find('i.icon-check:visible').length < this.tableComponent.$el.find('i.icon-check').length 
                || this.tableComponent.$el.find('i.icon-check').length < 1 
                    ? $('#selectAll i.icon-check').hide() 
                    : $('#selectAll i.icon-check').show();
        },

        onSelectAllClicked: function(event) {
            $(event.currentTarget).find('i.icon-check').toggle();
            if($(event.currentTarget).find('i.icon-check').is(':visible')) {
                this.selectAll();
            } else {
                this.deselectAll();
            }
        },

        selectAll: function() {
            this.tableComponent.$el.find('i.icon-check').show();
            this.setSelectedWagonsToTokenModel();
            this.handleSelectAllCheckbox();
        },

        deselectAll: function() {
            this.tableComponent.$el.find('i.icon-check:visible').hide();
            this.setSelectedWagonsToTokenModel();
            this.handleSelectAllCheckbox();
        }

    });

    return SelectionRenderer;
});