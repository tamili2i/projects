(function() {
  "use strict";

  angular
    .module("immiApp.intakeform")
    .controller("PetitionerDocumentController", PetitionerDocumentController);

  /**
   * @ngdoc Injector
   * @name PetitionerDocumentController
   * @private
   * @module immiApp.intakeform
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  PetitionerDocumentController.$inject = ["$scope"];

  /**
   * @ngdoc Controller
   * @name PetitionerDocumentController
   * @module immiApp.intakeform
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function PetitionerDocumentController($scope) {
    var vm = this;

    vm.files = [];
    vm.folderFiles = [];

    vm.untrackedFilesTemp = [];
    vm.untrackedFiles = [];

    vm.folders = [{
      "id": 1,
      "name": "Passport",
      "supported_extensions": "jpeg,pdf",
      "max_upload_size": 4,
      "is_multiple": true,
      files: []
    }, {
      "id": 2,
      "name": "ID Proof",
      "supported_extensions": "jpeg,pdf",
      "max_upload_size": 1,
      "is_multiple": false,
      files: []
    }, {
      "id": 3,
      "name": "Education",
      "supported_extensions": "jpeg,pdf",
      "max_upload_size": 1,
      "is_multiple": true,
      files: []
    }];

    vm.activeFolder = vm.folders[0];

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
          files[i].id = i;
          vm.folderFiles.push(files[i]);
        }
      }
      vm.activeFolder.files = vm.activeFolder.files.concat(vm.folderFiles);
      files = [];
    };

    /**
     * @ngdoc function
     * @name removeFile
     * @param evt, file
     * @description
     * Removes the uploaded/being uploaded files
     *
     */
    vm.removeFile = function(evt, file, $index) {
      evt.stopPropagation();
      vm.folderFiles.splice($index, 1);
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
      //TODO Get Folder settings based on Selected folder to apply for drop box
      vm.activeFolder = folder;
      vm.folderFiles = folder.files;
    };


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
    vm.uploadUntrackedFiles = function(files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          files[i].id = i;
          vm.untrackedFiles.push(files[i]);
        }
      }
      files = [];
    };


    /**
     * @ngdoc function
     * @name addUntrackedFileToFolder
     * @description
     *
     *
     */
    vm.addUntrackedFileToFolder = function(file, index) {
      vm.folderFiles.push(file);
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
  }

})();
