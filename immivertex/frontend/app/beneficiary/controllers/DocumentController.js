(function() {
  "use strict";

  angular
    .module("immiApp.beneficiary")
    .controller("DocumentController", DocumentController);

  /**
   * @ngdoc Injector
   * @name DocumentController
   * @private
   * @module immiApp.beneficiary
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  DocumentController.$inject = ["$scope", "HTTPFactory", "Upload", "BeneficiaryService", "Utils", "Session", "Beneficiary", "DocumentSubTypes","ToasterService"];

  /**
   * @ngdoc Controller
   * @name DocumentController
   * @module immiApp.beneficiary
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function DocumentController($scope, HTTPFactory, Upload, BeneficiaryService, Utils, Session, Beneficiary, DocumentSubTypes, ToasterService) {
    var vm = this,
      docs = [];

    vm.files = [];
    vm.folderFiles = [];

    vm.untrackedFilesTemp = [];
    vm.untrackedFiles = [];
    var validFormats = ['jpg','jpeg','png','pdf'];
    vm.folders = DocumentSubTypes;

    /**
     * @ngdoc watch
     * @name watchFiles
     * @description
     * watches for new file is added or dropped to upload
     *
     */
    $scope.$watch(function watchFiles($scope) {
      return (vm.files);
    }, function handleFilesChange() {
      if (vm.files && vm.files.length > 0) {
        vm.uploadFiles(vm.files);
      }
    });

    /**
     * @ngdoc watch
     * @name watchFiles
     * @description
     * watches for new file is added or dropped to
     * untracked folder
     *
     */
    $scope.$watch(function watchFiles($scope) {
      return (vm.untrackedFilesTemp);
    }, function handleFilesChange() {
      if (vm.untrackedFilesTemp && vm.untrackedFilesTemp.length > 0) {
        vm.uploadUntrackedFiles(vm.untrackedFilesTemp);
      }
    });

    /**
     * @ngdoc function
     * @name uploadFiles
     * @description
     * Upload files to server
     * @param files
     // TODO http://jsfiddle.net/dinakarankec/cs83stb5/ fileupload with server
     */
    vm.uploadFiles = function(files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var ext = files[i].name.substr(files[i].name.lastIndexOf(".")+1);
          if(validFormats.indexOf(ext)>-1) {
            files[i].id = i;
            vm.folderFiles.push(files[i]);
            initUpload(files[i]);
          } else {
            vm.file = "";
            ToasterService.toastError(".jpeg, .jpg, .png and .pdf only", "Invalid file");
          }

        }
      }
    };


    function initUpload(file) {

      var rBody = {
        "party_id": Beneficiary.party_id,
        "type_id": vm.activeFolder.id,
        "updated_by": Session.getUpdatedBy()
      };

      BeneficiaryService.uploadDocs(rBody, file, function(data) {
        docs.push(data);
      });
    }

    /**
     * @ngdoc function
     * @name removeFile
     * @param evt, file
     * @description
     * Removes the uploaded/being uploaded files
     *
     */
    vm.removeDocument = function(evt, file, $index) {
      evt.stopPropagation();
      BeneficiaryService.removeDocument(file.id, Beneficiary.party_id, function() {
        vm.folderFiles.splice($index, 1);
        docs = _.without(docs, _.findWhere(docs, {
          id: file.id
        }));
      });
    };

    /**
     * @ngdoc function
     * @name activateFolder
     * @param folder
     * @description
     * Activates the folder and responsible
     * for displaying files based on folder
     *
     */
    vm.activateFolder = function(folder) {
      vm.activeFolder = folder;
      vm.activeFolder.accept = Utils.getFileAcceptanceCriteria(folder.supported_extensions);
      vm.folderFiles = BeneficiaryService.getFolderFiles(docs, folder);
    };


    /**
     * @ngdoc function
     * @name uploadFiles
     * @description
     * Upload files to server
     * @param files
     // TODO http://jsfiddle.net/dinakarankec/cs83stb5/ fileupload with server
     */
    vm.uploadUntrackedFiles = function(files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var ext = files[i].name.substr(files[i].name.lastIndexOf(".")+1);
          if(validFormats.indexOf(ext)>-1) {
            files[i].id = i;
            vm.untrackedFiles.push(files[i]);
          } else {
            vm.file = "";
            ToasterService.toastError(".jpeg, .jpg, .png and .pdf only", "Invalid file");
          }
        }
      }
      files = [];
    };


    /**
     * @ngdoc function
     * @name addUntrackedFileToFolder
     * @description
     * Uploads the document to specific
     * type_id
     *
     */
    vm.addUntrackedFileToFolder = function(file, index) {
      vm.uploadFiles([file]);
      vm.untrackedFiles.splice(index, 1);
    };

    /**
     * @ngdoc function
     * @name deleteUntrackedFileToFolder
     * @description
     *
     *
     */
    vm.deleteUntrackedFileToFolder = function(file, index) {
      vm.untrackedFiles.splice(index, 1);
    };

    /**
     * @ngdoc function
     * @name init
     * @description
     * Gets uploaded documents while
     * controller initialization.
     *
     */
    var init = function() {
      var param = BeneficiaryService.constructQueryParam(Beneficiary.party_id);
      BeneficiaryService.getUploadedDocs(param, function(data) {
        docs = data;
        vm.activateFolder(vm.folders[0]);
      });
    };

    /**
     * @ngdoc function
     * @name preventUpload
     * @description
     * Prevents uploading function
     *
     */
    vm.preventUpload = function(event) {
      event.stopPropagation();
    };

    init();
  }

})();
