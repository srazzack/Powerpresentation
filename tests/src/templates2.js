var templates = {
    'presViewTemplate':'<div id="controls" class="center">

        <button id="deleteSlide" type="button" class="btn btn-default btn-lg">
            <span class="glyphicon glyphicon-minus"></span>
        </button>
        <button id="saveSlide" type="button" class="btn btn-default btn-lg">
            <span class="glyphicon glyphicon-floppy-disk"></span>
        </button>
        <button id="addSlide" type="button" class="btn btn-default btn-lg">
            <span class="glyphicon glyphicon-plus"></span>
        </button>
    </div> 
    <hr>
      <div class="pre-scrollable">
        <% _.each(models, function (slide) { %>
          <div class="row">
            <div id="slidesBarTemp" class="col-md-3" data-id="<%= slide.cid %>">
                <div id="slideTitle"><%= slide.get("title") %></div>
                <div id="slideHeader"><%= slide.get("header") %></div>
                <p id="slideContent"><%= slide.get("content") %></p>
            </div>
            <div class="col-md-1">
                <button id="slideUp" type="button" class="btn btn-default btn-sm" data-id="<%= slide.cid %>">
                    <span class="glyphicon glyphicon-arrow-up"></span>
                </button>
                <button id="slideDown" type="button" class="btn btn-default btn-sm" data-id="<%= slide.cid %>">
                    <span class="glyphicon glyphicon-arrow-down"></span>
                </button>
            </div>
          </div>
        <% }) %>',
    'slideTemplate':'<ul>
        <li id="slideTitle"><%= title %></li>
        <li id="slideHeader"><%= header %></li>
        <li id="slideContent"><%= content %></li>
    </ul>'
};