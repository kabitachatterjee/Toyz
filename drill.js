var toysDictionary = {};

function fetchData() {
 var rawTemplate = $('#my-template').html();
  $.get('https://torrid-heat-1073.firebaseio.com/toys.json', function(toys) {
    
    for (var i =0; i< toys.length; i++) {
      var currentToy = toys[i];
      //console.log(currentToy);
    var stampedTemplate = Mustache.render(rawTemplate,currentToy);
    //console.log(stampedTemplate);
    $('#cards-container').append(stampedTemplate);

    };
    
   buildDictionary(toys);
   bindEventListeners();
 });
}

function bindEventListeners(){
$('.card').click(function(e){
      var targetId = e.target.children[0].innerHTML;
      var info = (toysDictionary[targetId]);
      //console.log(info);
      var rawTemplate = $('#lightbox-template').html();

      var stampedTemplate = Mustache.render(rawTemplate, info);
      //console.log(stampedTemplate);
      $('#lightbox-container').html(stampedTemplate);
      $('#lightbox-container').fadeIn();
      $('#mask').fadeIn();
      
      $('#mask').click(function(e){
        $('#lightbox-container').fadeOut();
        $('#mask').fadeOut();

      });

    });
}
function buildDictionary(toys) {
  for (var i = 0; i < toys.length; i++) {
    var currentToy = toys[i];
    toysDictionary[currentToy.title] = currentToy;
  }
 
}

fetchData();



function search(){
$( "#target" ).click(function(e) {
  //console.log(toysDictionary);
  var mytitle = $("#input1").val();
  //console.log(mytitle);
  var myloc = $("#input2").val();
  //console.log(myloc);
  $("#cards-container").html('');
  for (artist in toysDictionary){
    //console.log(toysDictionary.title);
    var currentTitle = toysDictionary[artist].title;
    //console.log(currentTitle);
    var currentLoc = toysDictionary[artist].address;
    //console.log(currentLoc);
    if (currentTitle.includes(mytitle) && (currentLoc.includes(myloc))){
      //console.log(mytitle);
      var currentToy = toysDictionary[artist];
      //console.log(currentToy);
      var rawTemplate = $('#my-template').html();
     // console.log(rawTemplate);
      var stampedTemplate = Mustache.render(rawTemplate, currentToy);
     // console.log(stampedTemplate);
      $('#cards-container').append(stampedTemplate);
    }
    
}
bindEventListeners();
  });
}

search();

function share(){
  var count = 0;
  var toysRef = new Firebase('https://torrid-heat-1073.firebaseio.com/toys');
  toysRef.on("value", function(snapshot) {
  //console.log(snapshot.val());
  //console.log(snapshot.val().length);
   count = count + ((snapshot.val().length) - 1);
   count = count + 1;
  //console.log(count);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
  $("#target1").click(function(e) {
    var newTitle = $("#input3").val();
    console.log(newTitle);
  var newDes = $("#input4").val();
  var newLoc = $("#input5").val();
  var newImage = $("#input6").val();
  var ref = toysRef.child(count);
  if((newTitle != "") &&(newDes != "") && (newLoc !="") && (newImage != "")){
ref.set({ 'title': newTitle, 'description': newDes,'address':newLoc,'image': newImage});}
else{
  alert("All fields are compulsory");
}
$('#input3').val('');
$('#input4').val('');
$('#input5').val('');
$('#input6').val('');
});
}

share();

/*function update(){
  var toysRef = new Firebase('https://torrid-heat-1073.firebaseio.com/toys/');
// Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
toysRef.update({ title: 'abc', description: 'xyz' });
}*/


/*function summary(){
var toysref = new Firebase('https://torrid-heat-1073.firebaseio.com/toys');
// Attach an asynchronous callback to read the data at our posts reference
toysref.on("value", function(snapshot) {
  console.log(snapshot.val());
  console.log(snapshot.val().length);
  var count = ((snapshot.val().length) - 1);
  console.log(count);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
}*/








      
