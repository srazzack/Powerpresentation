
//(function($){

  //$.fn.inlineReplace = function(){

$(document).ready(function()   
{  
    var value, newValue;  
  
    $(".inLine").hover(  
      function()  
      {  
          $(this).addClass("editHover");  
      },   
      function()  
      {  
          $(this).removeClass("editHover");  
      }  
      );  
    
    $(".editable").on("dblclick", replaceHTML);  
       
       
    $(".btnSave").live("click",   
                    function()  
                    {  
                        newText = $(this).siblings("form")  
                                         .children(".editBox")  
                                         .val().replace(/"/g, """);  
                                           
                        $(this).parent()  
                               .html(newText)  
                               .removeClass("noPad")  
                               .bind("dblclick", replaceHTML);  
                    }  
                    );   
      
    $(".btnDiscard").live("click",   
                    function()  
                    {  
                        $(this).parent()  
                               .html(oldText)  
                               .removeClass("noPad")  
                               .bind("dblclick", replaceHTML);  
                    }  
                    );   
      
    function replaceHTML()  
                    {  
                        oldText = $(this).html()  
                                         .replace(/"/g, """);  
  
                        $(this).addClass("noPad")  
                               .html("")  
                               .html("<form><input type=\"text\" class=\"editBox\"  
                                value=\"" + oldText + "\" /> </form><a href=\"#\" class=\"btnSave\">Save changes</a>   
                               .unbind('dblclick', replaceHTML);  
              
                    }  
}  
);  
