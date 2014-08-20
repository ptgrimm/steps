function parallaxIt() {
  var $fwindow = $(window);
 
  $('[data-type="content"]').each(function (index, e) {
    var scrollTop = $fwindow.scrollTop();
    var $contentObj = $(this);
 
    $fwindow.on('scroll resize', function (){
      scrollTop = $fwindow.scrollTop();
 
      $contentObj.css('top', ($contentObj.height() * index) - scrollTop);
    });
  });
 
  $('[data-type="background"]').each(function(){
    var $backgroundObj = $(this);
 
    $fwindow.on('scroll resize', function() {
      var yPos = - ($fwindow.scrollTop() / $backgroundObj.data('speed')); 
      console.log(yPos)
      var coords = '50% '+ yPos + 'px';
 
      // Move the background
      $backgroundObj.css({ backgroundPosition: coords });
    }); 
  }); 
   
  $fwindow.trigger('scroll');
};
 
parallaxIt();

