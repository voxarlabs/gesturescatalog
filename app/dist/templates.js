angular.module('gesturesApp.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("partials/about.html",
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\">About this page</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    Lorem ipsum dolot sitamet. <br />\n" +
    "\n" +
    "    Lorem ipsum.\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "</div>\n" +
    "");
  $templateCache.put("partials/cards.html",
    "<div masonry preserve-order>\n" +
    "<div class=\"masonry-brick result-single\" \n" +
    "	ng-repeat=\"gesture in pageGestures\">\n" +
    "\n" +
    "  <div class=\"result-single-data\">\n" +
    "\n" +
    "    <div ng-repeat=\"(field, value) in gesture\" ng-if=\"schema[field].video\">\n" +
    "\n" +
    "        <youtube-thumb\n" +
    "          video-id=\"value\"\n" +
    "          player-width=\"230\"\n" +
    "          player-height=\"200\">\n" +
    "      </youtube-thumb>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-repeat=\"(field, value) in gesture\">\n" +
    "\n" +
    "        <h1 ng-if=\"schema[field].title\" class=\"result-single-title\">{{ value }}</h1>\n" +
    "\n" +
    "    </div>\n" +
    "  	\n" +
    "\n" +
    "    <div ng-repeat=\"(field, value) in gesture\">\n" +
    "\n" +
    "    	<p ng-if=\"schema[field].shown && !schema[field].title\"><strong>{{ schema[field].name | capitalize }}</strong>: {{ value }} </p>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <a class=\"result-single-detail\" href=\"\" ng-click=\"showDetails(gesture.rowNumber)\">CLICK TO VIEW DETAILS</a>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"clearfix\"></div>");
  $templateCache.put("partials/details.html",
    "<div class=\"modal-header\" ng-repeat=\"(field, value) in item\" ng-if=\"schema[field].title\">\n" +
    "	 <h3 class=\"modal-title\">{{ value }}</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "\n" +
    "      <div class=\"col-md-6\">\n" +
    "\n" +
    "          <youtube-thumb ng-repeat=\"(field, value) in item\" ng-if=\"schema[field].video\"\n" +
    "            video-id=\"value\"\n" +
    "            player-width=\"400\"\n" +
    "            player-height=\"400\">\n" +
    "          </youtube-thumb>\n" +
    "\n" +
    "          <a href=\"\" ng-click=\"showDetails(7)\">CLICK TO VIEW DETAILS</a>\n" +
    "\n" +
    "\n" +
    "          <br style=\"clear: both\" />\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-md-6\" id=\"details-modal-content\">\n" +
    "\n" +
    "          <p ng-repeat=\"(field, value) in item\" ng-if=\"schema[field].visibility && !schema[field].title\">\n" +
    "            <strong><span>{{ schema[field].name | capitalize }}</span></strong>\n" +
    "            {{ value }} \n" +
    "          </p>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "\n" +
    "    \n" +
    "\n" +
    "    \n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning\" ng-click=\"$dismiss()\">Close</button>\n" +
    "</div>");
  $templateCache.put("partials/table.html",
    "<table class=\"table table-bordered table-hover table-striped\">\n" +
    "\n" +
    "	<thead>\n" +
    "		<tr>\n" +
    "			<td ng-repeat=\"column in schema\" ng-if=\"column.shown\">\n" +
    "				<strong>{{ column.name | capitalize }}</strong>\n" +
    "			</td>\n" +
    "		</tr>\n" +
    "	</thead>\n" +
    "\n" +
    "	<tbody>\n" +
    "		<tr ng-repeat=\"gesture in pageGestures\">\n" +
    "\n" +
    "			<td ng-repeat=\"(field, value) in gesture\" ng-if=\"schema[field].shown\">\n" +
    "				{{ value }}\n" +
    "			</td>\n" +
    "			\n" +
    "		</tr>\n" +
    "	</tbody>\n" +
    "\n" +
    "</table>\n" +
    "\n" +
    "<div class=\"clearfix\"></div>");
}]);
