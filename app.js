angular.module('myApp', ['ngFileUpload'])
.controller('MyCtrl', ['Upload', '$timeout', function (Upload, $timeout) {
    var vm = this;

    vm.uploadFiles = function(file) {
        vm.f = file;
        if (file) {
            file.upload = Upload.upload({
                url: 'http://localhost:3000/upload', // Cambia esta URL a la de tu servidor
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    vm.imageUrl = response.data.url; // Asumiendo que la respuesta contiene la URL de la imagen subida
                });
            }, function (response) {
                if (response.status > 0)
                    vm.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    }
}]);