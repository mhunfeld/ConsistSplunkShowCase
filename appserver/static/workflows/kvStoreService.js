define([
    'underscore',
    "splunkjs/mvc"
], function (_, mvc) {

	var service = mvc.createService({
        owner: "nobody"
    });


	function renewURIComponent(component) {
		return encodeURIComponent(decodeURIComponent(component));
	}

    /**
     * saves single record in kv-store
     * @param {String} collection name of kv-store collection 
     * @param {Object} record object, that should be stored in kv-store
     * @param {*} overwrite true for overwriting existing record,
     *                      id of record should be stored in _key
     */
	function saveRecord(record, callback, overwrite) {
        var url = this.restEndPoint + "storage/collections/data/" + this.kvStore;
		if (overwrite) {
			url = url + encodeURIComponent(record._key);
        }
        
		service.request(
			url,
			"POST",
			null,
			null,
            JSON.stringify(record), 
            {
			    "Content-Type": "application/json"
		    },
			callback);
    }

    /**
     * saves single record in kv-store
     * @param {String} collection name of kv-store collection 
     * @param {Object} record object, that should be stored in kv-store
     * @param {*} overwrite true for overwriting existing record,
     *                      id of record should be stored in _key
     */
	function smartSaveRecord(record, callback) {
        var key = JSON.parse(record)._key;
        var url = this.restEndPoint + "storage/collections/data/" + this.kvStore;
        var informedSave = function(errorResponse, response) {
            if (response && response.status == 200) {
                var keyFound = _.find(response.data, function(item) {
                    return item["_key"] == key;
                });
                if (keyFound) {
                    url += "/" + encodeURIComponent(key);
                }
                service.request(
                    url,
                    "POST",
                    null,
                    null,
                    record, 
                    {
                        "Content-Type": "application/json"
                    },
                    callback);
            } else {
                callback(errorResponse, response)
            }
        }
        
		service.request(
			url,
			"GET",
			null,
			null,
            null, 
            {
			    "Content-Type": "application/json"
		    },
            informedSave.bind(this));
    }
    
    /**
     * saves an array of objects in kv-store
     * @param {String} collection name of kv-store collection 
     * @param {Array} records array of objects, that should be stored
     */
	function saveRecordsInBatch(records, callback) {
        service.request(
			this.restEndPoint + "storage/collections/data/" + this.kvStore + '/batch_save',
			"POST",
			null,
			null,
            JSON.stringify(records),
            {
			"Content-Type": "application/json"
		    },
			callback);
    }
    
    /**
     * deletes object in kv-store
     * @param {String} collection name of kv-store collection
     * @param {*} record object, that should be deleted,
     *                   id of object should be stored in _key 
     */
	function deleteRecord(record) {
		service.del(
            this.restEndPoint + "storage/collections/data/" + this.kvStore + renewURIComponent(record._key));
    }

    function getRecords(query, callback) {
        var url = this.restEndPoint + "storage/collections/data/" + this.kvStore;
		service.request(
			url,
			"GET",
			{query: JSON.stringify(query)},
			null,
            null, 
            {
			    "Content-Type": "application/json"
		    },
            callback);
    }
    
    /**
     * Service for storing records in kv-store
     * @param restEndpoint {String} Url of REST-endpoit for kv-store
     */
    return function KVStoreServices(options) {
        this.restEndPoint = '/servicesNS/nobody/' + options.app;
        this.kvStore = options.kvStore

        return{
            deleteRecord: deleteRecord.bind(this),
            saveRecord: saveRecord.bind(this),
            smartSaveRecord: smartSaveRecord.bind(this),
            saveRecordsInBatch: saveRecordsInBatch.bind(this),
            getRecords: getRecords.bind(this)
        }
    }
});