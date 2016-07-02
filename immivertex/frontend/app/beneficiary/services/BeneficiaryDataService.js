(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/


  function BeneficiaryDataService($q, $timeout, Upload, HTTPFactory) {

    var _self = this;


    /**
     * @ngdoc function
     * @name getBeneficiaryList
     * @param {object} queryParam
     * @description
     * Get list of beneficiaries
     *
     */
    _self.getBeneficiaryList = function(queryParam) {
      return HTTPFactory.call({
        url: "/beneficiary/beneficiaries",
        method: "GET",
        params: queryParam
      });
    };

    /**
      * @ngdoc function
      * @name getCorpBeneficiaryList
      * @param {Object} queryParam includes party_id of corporation
      * @description
      * Get list of beneficiaries by party_id under corporation
      *
      */
    _self.getCorpBeneficiaryList = function(queryParam){
      return HTTPFactory.call({
        url: "/corporation/corporations/getBeneficiaryList",
        method: "GET",
        params: queryParam
      });
    };

    /**
      * @ngdoc function
      * @name getLawfirmBeneficiaryList
      * @param {Object} queryParam includes party_id of lawfirm
      * @description
      * Get list of beneficiaries by party_id under lawfirm
      *
      */
    _self.getLawfirmBeneficiaryList = function(queryParam){
      return HTTPFactory.call({
        url: "/law-firm/law-firms/getBeneficiaryList",
        method: "GET",
        params: queryParam
      });
    };

    /**
      * @ngdoc function
      * @name getPartyBeneficiaryList
      * @param {Object} queryParam includes party_id of party
      * @description
      * Get list of beneficiaries by party_id under party
      *
      */
    _self.getPartyBeneficiaryList = function(queryParam){
      return HTTPFactory.call({
        url: "/user/user-roles/getBeneficiaryList",
        method: "POST",
        params: queryParam
      });
    };

    /**
     * @ngdoc function
     * @name saveGeneralInfo
     * @param beneficiary_id
     * @param  general_form_obj
     * @description
     * Create Beneficiary general form
     *
     */
    _self.saveGeneralInfo = function(general) {
      return HTTPFactory.call({
        method: "POST",
        url: "/person/persons",
        data: general
      });
    };

    /**
     * @ngdoc function
     * @name getGeneralInfo
     * @param {object} queryParam
     * @description
     * Get Beneficiary general info
     *
     */
    _self.getGeneralInfo = function(queryParam) {
      return HTTPFactory.call({
        url: "/person/persons/getPersonInfoByPartyId",
        method: "GET",
        params: queryParam
      });
    };

    /**
     * @ngdoc function
     * @name saveBeneficiary
     * @param  {object} beneficiary
     * @description
     * Creates Beneficiary
     *
     */
    _self.saveBeneficiary = function(beneficiary) {
      return HTTPFactory.call({
        url: "/beneficiary/beneficiaries/storeBeneficiary",
        method: "POST",
        data: beneficiary
      });
    };

    /**
     * @ngdoc function
     * @name uploadDocs
     * @param {object} rBody
     * @param {File} file
     * @description
     * Uploads the document using angular service Upload
     * which is an plugin.
     */
    _self.uploadDocs = function(rBody, file) {
      return Upload.upload({
        "url": HTTPFactory.getHostURL() + "/document/documents",
        "fields": rBody,
        "file": file
      });
    };

    /**
     * @ngdoc function
     * @name getUploadedDocs
     * @param {object} queryParam
     * @description
     * Get list of uploaded files under
     * given beneficiary.
     */
    _self.getUploadedDocs = function(queryParam) {
      return HTTPFactory.call({
        url: "/document/documents/getUploadedBeneficiaryDocumentListFromPartyId",
        method: "GET",
        params: queryParam
      });
    };

    /**
     * @ngdoc function
     * @name removeDocument
     * @param {String} id of document
     * @description
     * Removes the id of the document
     */
    _self.removeDocument = function(id) {
      return HTTPFactory.call({
        url: "/document/documents/" + id,
        method: "DELETE"
      });
    };

    /**
     * @ngdoc function
     * @param queryParam
     * @name getBeneficiaryEducation
     * @description
     * Gets list of education mapped to
     * given ParyId
     *
     */
    _self.getBeneficiaryEducation = function(queryParam) {
      return HTTPFactory.call({
        url: "/person/educations/showByPartyId",
        method: "GET",
        params: queryParam
      });
    };

    /**
     * @ngdoc function
     * @name saveBeneficiaryEducation
     * @param {Object} rBody
     * @description
     * saves the given Eduation detail under
     * given partyId
     */
    _self.saveBeneficiaryEducation = function(rBody) {
      return HTTPFactory.call({
        url: "/person/educations/storeBeneficiaryEducation",
        method: "POST",
        data: rBody
      });
    };

    /**
     * @ngdoc function
     * @name
     * @param {Object} queryParam
     * @description
     * saves the given Eduation detail under
     * given partyId
     */
    _self.saveChangeHistory = function(rBody) {
      return HTTPFactory.call({
        url: "/beneficiary/createchangeinfo",
        method: "POST",
        data: rBody
      });
    };

    /**
     * @ngdoc function
     * @name
     * @param {Object} queryParam
     * @description
     * Gets the list of change history
     */
    _self.getChangeHistory = function(queryParam) {
      return HTTPFactory.call({
        url: "/beneficiary/changeinfo",
        method: "GET",
        params: queryParam
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
      return HTTPFactory.call({
        url: "/qa/questions/getQuestionsForSubModule",
        method: "POST",
        data: background
      });
    };

    /**
     * @ngdoc function
     * @name saveBackground
     * @param {object} background
     * @description
     * Save Background question with answers
     */
    _self.saveBackground = function(background){
      return HTTPFactory.call({
        url: "/qa/answers/storeMultipleAnswersForPartyId",
        method: "POST",
        data: background
      });
    };

    /**
     * @ngdoc function
     * @name getBeneficiaryEmployment
     * @param queryParam
     * @description
     * Gets list of employment mapped to
     * given ParyId
     *
     */
    _self.getBeneficiaryEmployment = function(queryParam) {
      return HTTPFactory.call({
        url: "/person/employments/showByPartyId",
        method: "POST",
        params: queryParam
      });
    };


    /**
     * @ngdoc function
     * @name saveBeneficiaryEmployment
     * @param {Object} rBody
     * @description
     * saves the given employment detail under
     * given partyId
     */
    _self.saveBeneficiaryEmployment = function(rBody) {
      return HTTPFactory.call({
        url: "/person/employments/storeBeneficiaryEmployment",
        method: "POST",
        data: rBody
      });
    };

  /**
   * @ngdoc function
   * @name getCaseList
   * @description
   * Gets list of cases
   */
  _self.getCaseList = function() {
    return HTTPFactory.call({
      url: "/case-types",
      method: "GET"
    });
  };

  /**
   * @ngdoc function
   * @name getCaseStatusList
   * @description
   * Gets list of case status
   */
  _self.getCaseStatusList = function() {
    return HTTPFactory.call({
      url: "/case-statuses",
      method: "GET"
    });
  };

  /**
   * @ngdoc function
   * @name getBeneficiaryStatus
   * @description
   * Gets list of beneficiary status
   */
  _self.getBeneficiaryStatus = function() {
    return HTTPFactory.call({
      url: "/person/beneficiary-statuses",
      method: "GET"
    });
  };

  /**
   * @ngdoc function
   * @name getBeneficiaryStatus
   * @description
   * Gets list of beneficiary on search
   */
  _self.getBeneficiarySearchList = function(queryParam) {
    return HTTPFactory.call({
      url: "/beneficiary/beneficiaries/search",
      method: "GET",
      params: queryParam
    });
  };

  /**
   * @ngdoc function
   * @name getAvailableBeneficiary
   * @description
   * Get available beneficiary by email
   */
  _self.getAvailableBeneficiary = function(queryParam) {
    return HTTPFactory.call({
      url: "/emails/showByEmail",
      method: "GET",
      params: queryParam
    });
  };

  /**
   * @ngdoc function
   * @name getAvailableBeneficiaryByPassport
   * @description
   * Get available beneficiary by passport number
   */
  _self.getAvailableBeneficiaryByPassport = function(queryParam) {
    return HTTPFactory.call({
      url: "/person/passportno",
      method: "GET",
      params: queryParam
    });
  };

  /**
  * @ngdoc function
  * @name getBeneficiaryAddress
  * @param {object} queryParam includes party_id of baneficiary
  * @description
  * Gets list of Addresses mapped to
  * given ParyId
  *
  */
 _self.getBeneficiaryAddress = function(queryParam) {
   return HTTPFactory.call({
     url: "/address/addresses/getAddressesByPartyId",
     method: "GET",
     params: queryParam
   });
 };


 /**
  * @ngdoc function
  * @name saveBeneficiaryAddress
  * @param {Object} rBody
  * @description
  * saves the given address detail under
  * given partyId
  */
 _self.saveBeneficiaryAddress = function(rBody) {
   return HTTPFactory.call({
     url: "/address/addresses/createBeneficiaryAddress",
     method: "POST",
     data: rBody
   });
 };

 /**
 * @ngdoc function
 * @name getMarriageHistory
 * @param {object} rBody includes party_id of baneficiary
 * @description
 * Gets list of marriage history mapped to
 * given ParyId
 *
 */
_self.getMarriageHistory = function(rBody) {
  return HTTPFactory.call({
    url: "/person/marriage-informations/showByPartyId",
    method: "POST",
    data: rBody
  });
};


/**
 * @ngdoc function
 * @name saveMarriageHistory
 * @param {Object} rBody
 * @description
 * saves the given marriage history detail under
 * given partyId
 */
_self.saveMarriageHistory = function(rBody) {
  return HTTPFactory.call({
    url: "/person/marriage-informations/storeBeneficiaryMarriage",
    method: "POST",
    data: rBody
  });
};

/**
* @ngdoc function
* @name getTripsHistory
* @param {object} rBody includes party_id of baneficiary
* @description
* Gets list of trips history mapped to
* given ParyId
*
*/
_self.getTripsHistory = function(rBody) {
 return HTTPFactory.call({
   url: "/person/visits/showByPartyId",
   method: "POST",
   data: rBody
 });
};


/**
* @ngdoc function
* @name saveTripsHistory
* @param {Object} rBody
* @description
* saves the given trips history detail under
* given partyId
*/
_self.saveTripsHistory = function(rBody) {
 return HTTPFactory.call({
   url: "/person/visits",
   method: "POST",
   data: rBody
 });
};

 /**
   * @ngdoc function
   * @name getCases
   * @param {object} queryParam includes party_id
   * @description
   * Gets list of cases.
   */
  _self.getCases = function(queryParam) {
    return HTTPFactory.call({
      url: "/cases/showbyParty",
      method: "GET",
      params: queryParam
    });
  };

  /**
    * @ngdoc function
    * @name deleteAddress
    * @param {Number} addressId includes id of the address
    * @description
    * Remove address from address list
    */
   _self.deleteAddress = function(addressId) {
     return HTTPFactory.call({
       url: "/address/addresses/" + addressId,
       method: "DELETE"
     });
   };

   /**
     * @ngdoc function
     * @name deleteEducation
     * @param {Number} educationId includes id of the education
     * @description
     * Remove education from education list
     */
    _self.deleteEducation = function(educationId) {
      return HTTPFactory.call({
        url: "/person/educations/" + educationId,
        method: "DELETE"
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
       return HTTPFactory.call({
         url: "/person/employments/" + employmentId,
         method: "DELETE"
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
        return HTTPFactory.call({
          url: "/person/marriage-informations/" + marriageHistoryId,
          method: "DELETE"
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
         return HTTPFactory.call({
           url: "/person/visits/" + tripHistoryId,
           method: "DELETE"
         });
       };

       _self.getCasesForBeneficiary = function(queryParam) {
         return HTTPFactory.call({
           url: "/cases/showbyParty",
           method: "GET",
           params: queryParam
         })
       };
}


  /**
   * @ngdoc Injector
   * @name BeneficiaryDataService
   * @private
   * @module immiApp.beneficiary
   * @description
   * Inject module that needs to be useful for grid service
   * @author Ideas2IT Technologies
   * @copyright
   */
  BeneficiaryDataService.$inject = ["$q", "$timeout", "Upload", "HTTPFactory"];

  /**
   * @ngdoc Service
   * @name BeneficiaryDataService
   * @module immiApp.beneficiary
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Ideas2IT Technologies
   * @copyright
   */
  angular.module("immiApp.beneficiary")
    .service("BeneficiaryDataService", BeneficiaryDataService);

})();
