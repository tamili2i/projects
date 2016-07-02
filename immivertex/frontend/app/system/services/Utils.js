(function() {
  "use strict";

  angular
    .module("immiApp.system")
    .service("Utils", Utils);

  Utils.$inject = [
    "$q",
    "MasterDataService"
  ];

  /* @ngInject */
  function Utils($q, MasterDataService) {
    var dimension = {},
      extensions = {
        "jpeg": "image",
        "pdf": "application"
      },
      utils = {
        setWindowDimension: setWindowDimension,
        getWindowDimension: getWindowDimension,
        getHeight: getHeight,
        getAppIDsForAddress: getAppIDsForAddress,
        getFileAcceptanceCriteria: getFileAcceptanceCriteria,
        createPlaceInstance: createPlaceInstance,
        createPlacesInstance: createPlacesInstance,
        createWatch: createWatch,
        createWatchesAndPlacesInstance: createWatchesAndPlacesInstance,
        createWatchesAndPlacesInstanceForAddress: createWatchesAndPlacesInstanceForAddress,
        createWatchesAndPlacesInstanceForHistory: createWatchesAndPlacesInstanceForHistory,
        getAddressModel : getAddressModel,
        parseDateToISOString : parseDateToISOString,
        timeSince : timeSince
      };

    return utils;

    /**
     * @name setWindowDimension
     * @description
     * Sets window dimensions as its local
     * @param wdDimension {Object}
     */
    function setWindowDimension(wdDimension) {
      dimension = wdDimension;
    }

    /**
     * @name getWindowDimension
     * @description
     * gets window dimensions from its local
     * @return dimension {Object}
     */
    function getWindowDimension() {
      return dimension;
    }

    /**
     * @name getHeight
     * @description
     * gets window dimensions from its local
     * @param height {Number | String}
     * @return height {Number}
     */
    function getHeight(height) {
      height = height || 0;
      return dimension.height + height;
    }

    /**
     * @ngdoc function
     * @name getAppIDSForAddresses
     * @param {object} address
     * @description
     * Address object returned from Google places
     * doesn't contains system specific ID's. So that we have to request
     * our server to get specific ID for specific address
     *
     * Gets address to ID's
     * Country name to country ID
     * state name to state ID
     * city name to city ID
     * @return height {Number}
     */
    function getAppIDsForAddress(address) {
      var defer = $q.defer(),
        addressAppIds = MasterDataService.getAppIDsForAddress(address);

      addressAppIds.then(function(response) {
        defer.resolve(response.data);
      }, function(error) {
        defer.resolve({
          "city_id": 3593,
          "country_id": 100,
          "state_id": 753
        });
      });

      return defer.promise;

    }

    /**
     * @ngdoc function
     * @name getFileAcceptanceCriteria
     * @param {String} ext - raw format from server
     * @description
     * Converts raw file format to HTML understandable format
     * for file restrictions during file upload.
     * @return  {String} builtExt
     */
    function getFileAcceptanceCriteria(ext) {
      var builtExt = [],
        tmp = "";
      if (!_.isEmpty(ext)) {
        ext = ext.split(",");
        for (var i = 0; i < ext.length; i++) {
          tmp = extensions[ext[i]] + "/" + ext[i];
          builtExt.push(tmp);
        }
      } else {
        //If no extension is provided by default
        //PDF will be used
        tmp = extensions["pdf"] + "/" + "pdf";
        builtExt.push(tmp);
      }
      return builtExt.toString();
    }

    /**
     * @ngdoc function
     * @name createPlaceInstance
     * @param {Object} vmAddress
     * @param {function} PlacesFactory
     * @description
     * Create PlacesFactory instance for given address object
     * if address object contains country_id, then specific states for
     * that country will be loaded. Also if address object contains state_id,
     * then cities will be loaded for particular state.
     * @return {object} place
     */
    function createPlaceInstance(vmAddress, PlacesFactory) {
      var place = new PlacesFactory();
      if (vmAddress && vmAddress.location && vmAddress.location.country_id) {
        var location = {
          "city_id" : vmAddress.location.city_id,
          "state_id" : vmAddress.location.state_id,
          "country_id" : vmAddress.location.country_id,
        }
        place.getPlacesInfo(location);
      }
      return place;
    }

    /**
     * @ngdoc function
     * @name createPlacesInstance
     * @param {Array} vmObjects - view model object
     * @param {function} PlacesFactory
     * @description
     * Creates PlacesFactory instance for address part
     * of that object. This will be mostly used for add more
     * options in some forms like Education, Employment, Address
     * @return {Array} places
     */
    function createPlacesInstance(vmObjects, PlacesFactory) {
      var places = [],
        obj = {};
      for (var i = 0; i < vmObjects.length; i++) {
        obj = vmObjects[i];
        places[i] = createPlaceInstance(obj.address, PlacesFactory);
      }
      return places;
    };

    /**
     * @ngdoc function
     * @name createWatch
     * @param {Object} vmObject - view model object
     * @param {Object} context
     * @param {function} watchCallback
     * @description
     * create watch for object under the given context(Scope), also
     * registers the callback for the same
     *
     */
    function createWatch(vmObject, context, watchCallback) {
      context.$watch(function watchObject() {
        return (vmObject);
      }, watchCallback, true);
    }

    /**
     * @ngdoc function
     * @name createWatchesAndPlacesInstance
     * @param {Array} vmObjects - view model object
     * @param {function} PlacesFactory
     * @param {object} context
     * @param {function} watchCallback
     * @description
     * Creates the watch for given vmObject and also places instance
     * for all.
     *
     */
    function createWatchesAndPlacesInstance(vmObjects, PlacesFactory, context, watchCallback) {
      var places = [],
        obj = {};
      for (var i = 0; i < vmObjects.length; i++) {
        obj = vmObjects[i];
        createWatch(obj, context, watchCallback);
        places[i] = createPlaceInstance(obj.address, PlacesFactory);
      }
      return places;
    }

    /**
     * @ngdoc function
     * @name createWatchesAndPlacesInstanceForAddress
     * @param {Array} vmObjects - view model object
     * @param {function} PlacesFactory
     * @param {object} context
     * @param {function} watchCallback
     * @description
     * Creates the watch for given vmObject and also places instance
     * for all.
     *
     */
    function createWatchesAndPlacesInstanceForAddress(vmObjects, PlacesFactory, context, watchCallback) {
      var places = [],
        obj = {};
      for (var i = 0; i < vmObjects.length; i++) {
        obj = vmObjects[i];
        createWatch(obj, context, watchCallback);
        places[i] = createPlaceInstance(obj, PlacesFactory);
      }
      return places;
    }

    /**
     * @ngdoc function
     * @name createWatchesAndPlacesInstanceForHistory
     * @param {Array} vmObjects - view model object
     * @param {function} PlacesFactory
     * @param {object} context
     * @param {function} watchCallback
     * @param {String} histType - type of history - marriage and termination
     * @description
     * Creates the watch for given vmObject and also places instance
     * for all.
     *
     */
    function createWatchesAndPlacesInstanceForHistory(vmObjects, PlacesFactory, context, watchCallback, histType) {
      var places = [],
        obj = {};
      var typeObj = {};
      for (var i = 0; i < vmObjects.length; i++) {
        obj = vmObjects[i];
        if(obj.marriage){
          if(histType == "marriage"){
            typeObj = obj.marriage.marriage_location;
            createWatch(obj, context, watchCallback);
          }else if (histType == "trips") {
            typeObj = obj.marriage.termination_location;
          }
        }
        places[i] = createPlaceInstance(typeObj, PlacesFactory);
      }
      return places;
    }

    /**
     * @ngdoc function
     * @name getAddressModel
     * @param {object} moduleAddressTypes
     * @param {String} subType
     * @param {String} partyId
     * @description
     * Address part is differentiated by its module. Those relationships
     * are maintained seperately using addressTypes. This will returns the
     * Address object with specific party_id and type of address module
     * @return {object} address
     */
    function getAddressModel(moduleAddressTypes, subType, partyId) {
      var address = {
        "location": {
          "state_id": null,
          "city_id": null,
          "country_id": null
        }
      };
      if(partyId){
        address.party_id = partyId;
      }
      if(subType)
        address.type_id  = _.where(moduleAddressTypes, {"name" : subType})[0].id;
      return address;
    };

    /**
     * @ngdoc function
     * @name parseDateToISOString
     * @param {String} date
     * @description
     * which converts date string to ISO String.
     *
     */
     function parseDateToISOString(date){
       var parsedDate = null;
       if(!_.isEmpty(date)){
         parsedDate = date.split(" ").join("T")+".000Z";
       }
       return parsedDate;
     }

     /**
      * @ngdoc function
      * @name timeSince
      * @param {String} date
      * @description
      * Calculates diffrence betweem date passed
      * and returns perfect days or time
      *
      */
     function timeSince(date) {
       if (typeof date !== 'object') {
         date = new Date(date);
       }

       var seconds = Math.floor((new Date() - date) / 1000),
        intervalType, interval = Math.floor(seconds / 86400);
       if(interval == 1) {
          return  'Yesterday at ' + getActualTime(date);
       } else if(interval > 1){
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
       } else {
        interval = Math.floor(seconds / 3600);
        if(interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
       }

       if(interval > 1 || interval === 0) {
         intervalType += 's';
       }

       return interval + ' ' + intervalType + ' ago';
     };

    /**
     * @ngdoc function
     * @name getActualTime
     * @param {String} date
     * @description
     * Converts time to 12hrs format
     *
     */
    function getActualTime(date) {
      var dateHour = date.getHours(),
        dateMin = date.getMinutes(),
        hour, state;
			if(dateHour == 0) {
      	hour = 12;
        state = "am";
      } else if(dateHour >= 12) {
        hour = dateHour - 12?  dateHour -12 : 12;
        state = "pm";
      } else {
        hour = dateHour;
        state = "am";
      }
      hour = hour > 9 ? hour: "0"+hour;
      var min = dateMin < 10 ? "0" +dateMin : dateMin;
      var time = hour + ':'+ min + " " +state;
      return time;
    }

  }
})();
