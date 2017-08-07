'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('WorkbenchCtrl', ['$scope' ,'$state','ProductService','$stateParams',function ($scope ,$state,ProductService,$stateParams) {


    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        scrollParent: true,
        normalize: true,
        minimap: true
    });

    wavesurfer.load('https://s3-us-west-2.amazonaws.com/qa-recordings/575f3a8439332ae87bec4418517b803f%4078.46.105.230.wav');

    $scope.playPause = function(){
        wavesurfer.playPause();
    }


    wavesurfer.on('ready', function () {
      // Enable creating regions by dragging
      wavesurfer.enableDragSelection({});

  });




    /* Toggle play/pause buttons. */
    var playButton = angular.element(document.querySelector('#play'));
    var pauseButton = angular.element(document.querySelector('#pause'));
    console.log(playButton)
    wavesurfer.on('play', function () {
        playButton[0].style.display = 'none';
        pauseButton[0].style.display = '';
    });
    wavesurfer.on('pause', function () {
        playButton[0].style.display = '';
        pauseButton[0].style.display = 'none';
    });

    wavesurfer.on('region-click', function (region, e) {
        e.stopPropagation();
        // Play on click, loop on shift click
        e.shiftKey ? region.playLoop() : region.play();
    });
    wavesurfer.on('region-click', editAnnotation);
    wavesurfer.on('region-updated', saveRegions);
    wavesurfer.on('region-removed', saveRegions);
    wavesurfer.on('region-in', showNote);

    wavesurfer.on('region-play', function (region) {
        region.once('out', function () {
            wavesurfer.play(region.start);
            wavesurfer.pause();
        });
    });



     function saveRegions() {
        localStorage.regions = JSON.stringify(
            Object.keys(wavesurfer.regions.list).map(function (id) {
                var region = wavesurfer.regions.list[id];
                return {
                    start: region.start,
                    end: region.end,
                    attributes: region.attributes,
                    data: region.data
                };
            })
            );
    }


     function loadRegions(regions) {
        regions.forEach(function (region) {
            region.color = randomColor(0.1);
            wavesurfer.addRegion(region);
        });
    }

  
     function editAnnotation (region) {
        var form = document.forms.edit;
        form.style.opacity = 1;
        form.elements.start.value = Math.round(region.start * 10) / 10,
        form.elements.end.value = Math.round(region.end * 10) / 10;
        form.elements.note.value = region.data.note || '';
        form.onsubmit = function (e) {
            e.preventDefault();
            region.update({
                start: form.elements.start.value,
                end: form.elements.end.value,
                data: {
                    note: form.elements.note.value
                }
            });
            form.style.opacity = 0;
        };
        form.onreset = function () {
            form.style.opacity = 0;
            form.dataset.region = null;
        };
        form.dataset.region = region.id;
    }


     function showNote (region) {
        if (!showNote.el) {
            showNote.el = document.querySelector('#subtitle');
        }
        showNote.el.textContent = region.data.note || '–';
    }


 
     $scope.delete = function () {
        var form = document.forms.edit;
        var regionId = form.dataset.region;
        if (regionId) {
            wavesurfer.regions.list[regionId].remove();
            form.reset();
        }
    };   




}]);


