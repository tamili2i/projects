(function() {

  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/

  /**
   * @ngdoc Service
   * @name BeneficiaryService
   * @module immiApp.beneficiary
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Ideas2IT Technologies
   * @copyright
   */
  angular.module("immiApp.beneficiary")
    .service("BeneficiaryService", BeneficiaryService);

  /**
   * @ngdoc Injector
   * @name BeneficiaryService
   * @private
   * @module immiApp.beneficiary
   * @description
   * Inject module that needs to be useful for grid service
   * @author Ideas2IT Technologies
   * @copyright
   */
  BeneficiaryService.$inject = ["$q", "$timeout", "$state", "BeneficiaryGridConfig", "Session", "BeneficiaryDataService", "HTTPFactory", "ToasterService", "$rootScope", "MasterDataService", "$stateParams"];


  function BeneficiaryService($q, $timeout, $state, BeneficiaryGridConfig, Session, BeneficiaryDataService, HTTPFactory, ToasterService, $rootScope, MasterDataService ,$stateParams) {

    var _self = this,
       docChange = false;

    /**
     * @ngdoc function
     * @name getBeneficiaryList
     * @param successCallback
     * @param errorCallback
     * @param {object} queryParam
     * @description
     * Get list of beneficiaries
     *
     */
    _self.getBeneficiaryList = function(queryParam, successCallback, errorCallback) {
      var beneficiaryList = {},
        partyType = Session.getPartyType();
        queryParam.party_id = Session.getPartyId();
      if(Object.keys(queryParam).length>1) {
        queryParam.module = partyType;
        beneficiaryList = BeneficiaryDataService.getBeneficiarySearchList(queryParam);
      } else {
        if(partyType === "corporation" || partyType == "law_firm_corporation"){
          beneficiaryList = BeneficiaryDataService.getCorpBeneficiaryList(queryParam);
        }else if(partyType == "law_firm" || partyType == "corporation_law_firm"){
          beneficiaryList = BeneficiaryDataService.getLawfirmBeneficiaryList(queryParam);
        }else if(Session.getPartyAccessCode() == "party"){
          var partyDetail = Session.getPartyDetail();
          queryParam.owned_by = partyDetail.created_by;
          queryParam.role_id = partyDetail.role_id;
          beneficiaryList = BeneficiaryDataService.getPartyBeneficiaryList(queryParam);
        }if(partyType === "system_administrator"){
          beneficiaryList = BeneficiaryDataService.getBeneficiaryList(queryParam);
        }
      }

      beneficiaryList.then(function(response) {
        successCallback(response.data);
      }, function() {
        errorCallback();
      });
    };

    /**
     * @ngdoc function
     * @name saveGeneralInfo
     * @param beneficiary_id
     * @param {object} general
     * @param {function} callback
     * @description
     * Create Beneficiary general form
     *
     */
    _self.saveGeneralInfo = function(general, callback) {
      var generalQ = BeneficiaryDataService.saveGeneralInfo(general);
      generalQ.then(function(response) {
        ToasterService.toastSuccess("General info saved successfully", "Success");
        _self.saveChangeHistory("General Info updated", response.data.party_id);
        callback(response.data);
        $state.go("home.beneficiary.address");
      }, function() {
        ToasterService.toastError("Something went wrong", "Error");
      });
    };

    /**
     * @ngdoc function
     * @name
     * @description
     *
     *
     */
    _self.constructQueryParam = function(party_id) {
      var queryParam = {};
      queryParam.party_id = party_id;
      return queryParam;
    };

    /**
     * @ngdoc function
     * @name getGeneralInfo
     * @param {object} queryParam - partyId
     * @description
     * Gets general information of party using
     * given partyId.
     */
    _self.getGeneralInfo = function(queryParam) {
      return BeneficiaryDataService.getGeneralInfo(queryParam);
    };

    /**
     * @ngdoc function
     * @name uploadDocs
     * @param {object} rBody to be appended with
     * @param {File} doc to be uploaded
     * @description
     * Upload the document
     * Event will be called to indicate the file progress
     *
     */
    _self.uploadDocs = function(rBody, doc, callback) {
      var docQ = BeneficiaryDataService.uploadDocs(rBody, doc);
      docQ.progress(function(evt) {
        var percentUploaded = parseInt(100.0 * evt.loaded / evt.total);
        doc.upPercentage = percentUploaded + "%";
      }).success(function(data) {
        data.type_id = parseInt(data.type_id);
        docChange = true;
        _self.saveChangeHistory("Document uploaded", data.party_id);
        callback(data);
      }).error(function(response) {
        doc.error = true;
        console.log(response);
      });
    };

    /**
     * @ngdoc function
     * @name getUploadedDocs
     * @param {object} queryParam
     * @param {function} callback
     * @description
     * Get list of uploaded files under
     * given beneficiary.
     */
    _self.getUploadedDocs = function(queryParam, callback) {
      var docs = BeneficiaryDataService.getUploadedDocs(queryParam);
      docs.then(function success(response) {
        console.log(response.data);
        callback(response.data);
      }, function error(err) {
        callback([]);
        ToasterService.toastError("While getting Documents", "ERRORR");
      });
    };

    /**
     * @ngdoc function
     * @name removeDocument
     * @param {String} id of document
     * @param {function} callback
     * @description
     * Removes the id of the document
     */
    _self.removeDocument = function(docId, partyId, callback) {
      var doc = BeneficiaryDataService.removeDocument(docId);
      doc.then(function success(response) {
        callback(response.data);
        _self.saveChangeHistory("Document Removed", partyId);
        ToasterService.toastSuccess("Document removed successfully", "Success");
      }, function error(err) {
        ToasterService.toastError("While removing Document", "ERROR");
      });
    };

    /**
     * @ngdoc function
     * @name getFolderFiles
     * @param {Array} documents
     * @param {object} folder
     * @description
     * Filters document related particular typeID
     *
     */
    _self.getFolderFiles = function(documents, folder) {
      var docs = _.where(documents, {
        "type_id": folder.id
      });
      //  docs = docs.concat(documents, {"type_id" : ""+folder.id})
      for (var i = 0; i < docs.length; i++) {
        docs[i].type = docs[i].extension;
        //docs[i].name =
      }
      return docs;
    };

    /**
     * @ngdoc function
     * @name saveBeneficiary
     * @param  {object} beneficiary
     * @param {function} successCallback
     * @description
     * Creates Beneficiary
     *
     */
   _self.saveBeneficiary = function(beneficiary, callback) {
     var beneficiary =  BeneficiaryDataService.saveBeneficiary(beneficiary);
     beneficiary.then(function (response) {
       ToasterService.toastSuccess("Beneficiary created successfully","Success");
       //_self.saveChangeHistory("Beneficiary Created", response.data.id);
       callback(response.data);
       _self.getNextPage();
     }, function(response){
       if(response.data["email.email"] || response.data["passport.number"]){
         callback(response.data);
       } else {
         ToasterService.toastError("Something went wrong","Error");
       }
     });
   };

    /**
     * @ngdoc function
     * @name getBeneficiaryEducation
     * @param {Object} queryParam - partyId
     * @description
     * Gets list of Education details related to
     * given partyId
     *
     */
    _self.getBeneficiaryEducation = function(queryParam) {
      return BeneficiaryDataService.getBeneficiaryEducation(queryParam);
    };

    /**
     * @ngdoc function
     * @name saveBeneficiaryEducation
     * @param {Array} educations - list of educations
     * @param {function} callback - callback to controller
     * @description
     * Each education in array will be saved only edited in view
     * Callback to controller will be called only when all educations
     * saved.
     */
    _self.saveBeneficiaryEducation = function(educations, callback) {
      var education = {},
        promises = [];
      for (var i = 0; i < educations.length; i++) {
        education = educations[i];
        if (education.changeLog > 1) {
          education.updated_by = Session.getUpdatedBy();
          if(education.is_completed == "true"){
            education.is_completed = true;
          }else{
            education.is_completed = false;
          }
          var educationQ = BeneficiaryDataService.saveBeneficiaryEducation(education);
          promises.push(educationQ);
        }
      }
      $q.all(promises).then(function(){
        _self.saveChangeHistory("Education Info updated", educations[0].party_id);
        ToasterService.toastSuccess("Education Info save successfully", "Success");
        $state.go("home.beneficiary.employment");
        callback();
      },function(){
        ToasterService.toastError("Something went wrong", "Error");
      });

    };

    /**
     * @ngdoc function
     * @name saveChangeHistory
     * @param {string} desc - Description of log to be saved.
     * @param {string} userId - ID of beneficiary.
     * @description
     * Saves the log information under given ID
     */
    _self.saveChangeHistory = function(desc, userId) {
      var rBody = {};
        rBody.user_id = userId;
        rBody.change_desc = desc;
        rBody.created_by = Session.getUpdatedBy();

      BeneficiaryDataService.saveChangeHistory(rBody).then(function(){
        console.log();
      });
    };

    /**
     * @ngdoc function
     * @name getChangeHistory
     * @param {string} desc - Description of log to be saved.
     * @param {Number} page - page number
     * @description
     * Gets list of log information for give ID
     */
    _self.getChangeHistory = function(partyId, page, callback) {
      var queryParam = {};
        queryParam.uid = partyId;
        queryParam.page = page;

      var changeQ = BeneficiaryDataService.getChangeHistory(queryParam);

      changeQ.then(function success(response){
        callback(response.data);

      }, function error(){
        callback();
        ToasterService.toastError("Error in getting change history", "Error");
      });
    };

    /**
     * @name getBeneficiaryEmployment
     * @param {Object} queryParam - partyId
     * @description
     * Gets list of employment details related to
     * given partyId
     *
     */
    _self.getBeneficiaryEmployment = function(queryParam) {
      return BeneficiaryDataService.getBeneficiaryEmployment(queryParam);
    };

    /**
     * @ngdoc function
     * @name saveBeneficiaryEmployment
     * @param {Array} employments - list of employments
     * @param {function} callback - callback to controller
     * @description
     * Each employment in array will be saved only edited in view
     * Callback to controller will be called only when all employments
     * saved.
     */
    _self.saveBeneficiaryEmployment = function(employments, callback) {
      console.log("employments: ",employments);
      var employment = {},
        promises = [];
      for (var i = 0; i < employments.length; i++) {
        employment = employments[i];
        if (employment.changeLog > 1) {
          employment.updated_by = Session.getUpdatedBy();
          if(employment.is_completed == "true"){
            employment.is_completed = true;
          }else{
            employment.is_completed = false;
          }
          var employmentQ = BeneficiaryDataService.saveBeneficiaryEmployment(employment);
          promises.push(employmentQ);
        }
      }
      $q.all(promises).then(function(){
        _self.saveChangeHistory("Employment Info updated", employments[0].party_id);
        ToasterService.toastSuccess("Employment Info saved successfully", "Success");
        $state.go("home.beneficiary.history");
        callback();
      },function(){
        ToasterService.toastError("Something went wrong", "Error");
      });

    };

    /**
     * @ngdoc function
     * @name getBackgroundQuestions
     * @param {object} background - includes module , sub_module and party_id
     * @description
     * Gets list of Background Questions
     */
    _self.getBackgroundQuestions = function(background){
      return BeneficiaryDataService.getBackgroundQuestions(background);
    };

    /**
     * @ngdoc function
     * @name saveBackground
     * @param {object} background
     * @param callback
     * @description
     * Save Background question with answers
     */
    _self.saveBackground = function(background, callback){
      var backgroundQ = BeneficiaryDataService.saveBackground(background);

      backgroundQ.then(function(response){
        ToasterService.toastSuccess("Background Info saved successfully", "Success");
        _self.saveChangeHistory("Background Info updated", background.party_id);
        callback(response);
        $state.go("home.beneficiary.cases");
      },function(){
        ToasterService.toastError("All Fields are required", "Error");
      });
    };

    /**
     * @ngdoc function
     * @name getCaseList
     * @description
     * Gets list of cases
     */
     _self.getCaseList = function(){
       return BeneficiaryDataService.getCaseList();
     }

     /**
      * @ngdoc function
      * @name getCaseStatusList
      * @description
      * Gets list of cases status
      */
      _self.getCaseStatusList = function(){
        return BeneficiaryDataService.getCaseStatusList();
      }

      /**
       * @ngdoc function
       * @name getBeneficiaryStatus
       * @description
       * Gets list of beneficiary status
       */
       _self.getBeneficiaryStatus = function(){
         return BeneficiaryDataService.getBeneficiaryStatus();
       }

     /**
      * @ngdoc function
      * @name getAvailableBeneficiary
      * @description
      * Get available beneficiary details with email
      */
    _self.getAvailableBeneficiary = function(email, callback){
        var queryParam = {};
        queryParam.party_id = Session.getPartyId();
        queryParam.module = Session.getPartyType();
        queryParam.emailid = email;
        BeneficiaryDataService.getAvailableBeneficiary(queryParam).then(function(response){
          console.log(response.data);
          if(response.data.error){
            ToasterService.toastError("The Beneficiary not belongs to this "+queryParam.module, "Email Availability");
          } else {
            callback(response.data);
          }
        });
      }

      /**
       * @ngdoc function
       * @name getAvailableBeneficiaryByPassport
       * @description
       * Get available beneficiary details with passport number
       */
      _self.getAvailableBeneficiaryByPassport = function(passportNo, callback){
         var queryParam = {};
         queryParam.party_id = Session.getPartyId();
         queryParam.module = Session.getPartyType();
         queryParam.passno = passportNo;
         BeneficiaryDataService.getAvailableBeneficiaryByPassport(queryParam).then(function(response){
           console.log(response.data);
           if(response.data.error){
             ToasterService.toastError("The Beneficiary not belongs to this "+queryParam.module, "Passport Availability");
           } else {
             callback(response.data);
           }
         });
       };

      /**
        * @name getBeneficiaryAddress
        * @param {Object} queryParam - partyId
        * @description
        * Gets list of Address details related to
        * given partyId
        *
        */
       _self.getBeneficiaryAddress = function(queryParam) {
         return BeneficiaryDataService.getBeneficiaryAddress(queryParam);
       };

       /**
        * @ngdoc function
        * @name saveBeneficiaryAddress
        * @param {Array} addresses - list of addresses
        * @param {function} callback - callback to controller
        * @description
        * Each address in array will be saved only edited in view
        * Callback to controller will be called only when all addresses
        * saved.
        */
       _self.saveBeneficiaryAddress = function(addresses, callback) {
         var address = {},
           promises = [];
         for (var i = 0; i < addresses.length; i++) {
           address = addresses[i];
           if (address.changeLog > 1) {
             address.updated_by = Session.getUpdatedBy();
             if(address.is_completed == "true"){
               address.is_completed = true;
             }else{
               address.is_completed = false;
             }
             var addressQ = BeneficiaryDataService.saveBeneficiaryAddress(address);
             promises.push(addressQ);
           }
         }
         $q.all(promises).then(function(response){
           _self.saveChangeHistory("Address Info updated", addresses[0].party_id);
           ToasterService.toastSuccess("Address Info updated successfully", "Success");
           $state.go("home.beneficiary.documents");
           callback(response);
         },function(){
           ToasterService.toastError("Something went wrong", "Error");
         });
       };

       /**
        * @ngdoc function
        * @name getCases
        * @param {object} queryParam includes party_id
        * @description
        * Gets list of cases
        */
        _self.getCases = function(queryParam){
          return BeneficiaryDataService.getCases(queryParam);
        };

    /**
      * @name getMarriageHistory
      * @param {Object} partyId - partyId
      * @description
      * Gets list of marriage history details related to
      * given partyId
      *
      */
     _self.getMarriageHistory = function(partyId) {
       return BeneficiaryDataService.getMarriageHistory(partyId);
     };

     /**
       * @name getTripsHistory
       * @param {Object} queryParam - partyId
       * @description
       * Gets list of trips history details related to
       * given partyId
       *
       */
      _self.getTripsHistory = function(partyId) {
        return BeneficiaryDataService.getTripsHistory(partyId);
      };

      /**
       * @ngdoc function
       * @name saveMarriageHistory
       * @param {Array} addresses - list of addresses
       * @param {function} callback - callback to controller
       * @description
       * Each marriage detail in array will be saved only edited in view
       * Callback to controller will be called only when all marriage info
       * saved.
       */
      _self.saveHistory = function(historyFormObj, callback) {
          var promises = saveMarriageTripHistory(historyFormObj);
          $q.all(promises).then(function(response){
            _self.saveChangeHistory("History Info updated", historyFormObj[0].body[0].party_id);
            ToasterService.toastSuccess("History Info updated successfully", "Success");
            $state.go("home.beneficiary.background");
            callback(response);
          },function(){
            ToasterService.toastError("Something went wrong", "Error");
          });
      };

    var saveMarriageTripHistory = function(historyFormObj){
      var promises = [],
          histType = "",
          history = {};

      for (var j = 0; j < historyFormObj.length; j++) {
        for (var i = 0; i < historyFormObj[j].body.length; i++) {
          history = historyFormObj[j].body[i];
          histType = historyFormObj[j].type;
          if (history.changeLog > 1) {
            history.updated_by = Session.getUpdatedBy();
            if(histType == "marriage"){
              var marriageQ = BeneficiaryDataService.saveMarriageHistory(history);
              promises.push(marriageQ);
            }
            if (histType == "trips") {
              var tripQ = BeneficiaryDataService.saveTripsHistory(history);
              promises.push(tripQ);
            }
          }
        }
      }
      return promises;
    };

    /**
      * @ngdoc function
      * @name deleteAddress
      * @param {Number} addressId includes id of the address
      * @description
      * Remove address from address list
      */
     _self.deleteAddress = function(addressId) {
       var addressQ = BeneficiaryDataService.deleteAddress(addressId);

       addressQ.then(function(response){
         ToasterService.toastSuccess("Address deleted successfully", "Success");
       },function(){
         ToasterService.toastError("Something went wrong", "Error");
       });
     };

     /**
       * @ngdoc function
       * @name removeEducation
       * @param {Number} educationId includes id of the education
       * @description
       * Remove education from education list
       */
      _self.deleteEducation = function(educationId) {
        var educationQ = BeneficiaryDataService.deleteEducation(educationId);

        educationQ.then(function(response){
          ToasterService.toastSuccess("Education deleted successfully", "Success");
        },function(){
          ToasterService.toastError("Something went wrong", "Error");
        });
      };

      /**
        * @ngdoc function
        * @name deleteEmployment
        * @param {Number} employmentId includes id of the employment
        * @description
        * Remove employment from employment list
        */
       _self.deleteEmployment = function(employmentId) {
         var employmentQ = BeneficiaryDataService.deleteEmployment(employmentId);

         employmentQ.then(function(response){
           ToasterService.toastSuccess("Employment deleted successfully", "Success");
         },function(){
           ToasterService.toastError("Something went wrong", "Error");
         });
       };

       /**
         * @ngdoc function
         * @name deleteMarriageHistory
         * @param {Number} marriageHistoryId includes id of the marriage history
         * @description
         * Remove marriage info from marriage info list
         */
        _self.deleteMarriageHistory = function(marriageHistoryId) {
          var marriageQ = BeneficiaryDataService.deleteMarriageHistory(marriageHistoryId);

          marriageQ.then(function(response){
            ToasterService.toastSuccess("Marriage History deleted successfully", "Success");
          },function(){
            ToasterService.toastError("Something went wrong", "Error");
          });
        };

      /**
        * @ngdoc function
        * @name deleteTripHistory
        * @param {Number} tripHistoryId includes id of the trip history
        * @description
        * Remove trip info from trip info list
        */
       _self.deleteTripHistory = function(tripHistoryId) {
         var tripQ = BeneficiaryDataService.deleteTripHistory(tripHistoryId);

         tripQ.then(function(response){
           ToasterService.toastSuccess("Trip History deleted successfully", "Success");
         },function(){
           ToasterService.toastError("Something went wrong", "Error");
         });
       };

       /**
         * @ngdoc function
         * @name getNextPage
         * @description
         * Redirection to create case page
         */
       _self.getNextPage = function() {
         if(Session.getPageRedirection()){
           $state.go("home.cases.createCase");
           Session.setPageRedirection(false);
         } else {
           $state.go("home.beneficiaries");
         }
       };

       /**
         * @ngdoc function
         * @name $stateChangeStart
         * @description
         * Checks for document upload
         */
       $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
          if(fromState.name === "home.beneficiary.documents" && docChange) {
            var beneficiary_id = parseInt(fromParams.id);
              getActiveCase(fromParams.id, function callback(case_id){
                if(case_id) {
                  var data ={
                    "beneficiary_id":beneficiary_id,
                    "party_id":beneficiary_id,
                    "case_id": case_id
                  };
                  MasterDataService.getCaseStatus(data).then(function(response){
                    createCaseStatus(data, response.data);
                  });
                }
                docChange = false;
            });
          }
       });

      /**
        * @ngdoc function
        * @name getActiveCase
        * @description
        * Get current workflow status of case
        */
      var getActiveCase = function(beneficiary_id, callback) {
        var cases = BeneficiaryDataService.getCasesForBeneficiary({"party_id": beneficiary_id});
          cases.then(function(response){
            if(response.data.data.length) {
              callback(_.where(response.data.data, {"status_id": 4})[0].id);
            }
          }, function(response) {
            return null;
          });
        };
        /**
          * @ngdoc function
          * @name createCaseStatus
          * @description
          * Create next workflow notification
          */
        var createCaseStatus = function(data, caseStatus) {
          var nextStep = data;
          MasterDataService.updateCaseStatus(status).then(function(response) {

          });
        };
  }

})();
