import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './giphy.js';
import DinoIpsum from './dino.js';

$(document).ready(function () {

  let promise = GiphyService.getTrending();
  promise.then(function(response) {
    const body = JSON.parse(response);
    $('#trend1').html(`<img src="${body.data[0].images.original.url}">`);
    $('#trend2').html(`<img src="${body.data[1].images.original.url}">`);
    $('#trend3').html(`<img src="${body.data[2].images.original.url}">`);
  }, function(error) {
    $('#trend1').text(`Sorry, it's not working.`);
    $('#trend2').text(`Sorry, it's not working.`);
    $('#trend3').text(`Sorry, it's not working.`);
  });
  
  $('#gifSearch').click(function () {
    const searchInput = $('#search').val();
    let promise = GiphyService.getSearchGiphy(searchInput);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showGIF').html(`<img src="${body.data[0].images.original.url}">`);
      $('.showGIF1').html(`<img src="${body.data[1].images.original.url}">`);
    }, function(error) {
      $('.showGIF').text(`Sorry, it's not working.`);
    });
  });
  
  $('#randomSearch').click(function () {
    let promise = GiphyService.getRandomSearch();
    promise.then(function(response) {
      const body1 = JSON.parse(response);
      $('#randomGIF').html(`<img src="${body1.data.images.original.url}">`);
    }, function(error) {
      $('#randomGIF').text(`Sorry, it's not working.`);
    });
  });

  $('#randomDinoSearch').click(function () {
    let promise = DinoIpsum.getRandomDinosaur();
    let dinoWord = "";
  
    promise.then(function(response) {
      const result = JSON.parse(response);
      dinoWord += result[0][0];
      console.log(dinoWord);
      return GiphyService.getSearchGiphy("cat");
    }).then(function(response2) {
      console.log(response2);
      const body = JSON.parse(response2);
      console.log(body);
      $('#randomDinoGIF').html(`<img src="${body.data[0].images.original.url}">`);
    }).catch(function (error) {
      $('#randomDinoGIF').text(`Sorry, it's not working.`);
    });
  });
});

  // The beginner way of what's accomplished above
  // $('#randomDinoSearch').click(function () {
  //   let promise1 = DinoIpsum.getRandomDinosaur();
  //   let dinoWord = "";
  
  //   promise1.then(function(response) {
  //     const result = JSON.parse(response);
  //     dinoWord += result[0][0];
  //     console.log(dinoWord);
      
  //     let promise2 = GiphyService.getSearchGiphy(dinoWord);
  //     promise2.then(function(response) {
  //       const body = JSON.parse(response);
  //       $('#randomDinoGIF').html(`<img src="${body.data[0].images.original.url}">`);
  //     }, function(error) {
  //       $('#randomDinoGIF').text(`Sorry, it's not working.`);
  //     });

  //   }, function(error) {
  //     console.log("Sorry, it's not working.");
  //   });
  // });