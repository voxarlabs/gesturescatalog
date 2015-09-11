angular.module('gesturesApp.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("partials/about.html",
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\">Sci-Fi Gestures Catalog</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <h3>Understanding the future of gestural interaction</h3>\n" +
    "\n" +
    "    <p>In Science Fiction (Sci-Fi) movies, filmmakers try to anticipate trends and new forms of interaction. Metaphors are created allowing their characters to interact with futuristic devices and environments. These devices and metaphors should be target of research considering they have proven to be useful before. Moreover, the impact of the new interfaces on the audience may indicate their expectations regarding future gesture interactions. Thus, the first goal of this work is to collect and expose a compilation of gestural interactions in Sci-Fi movies, providing a catalog to researchers as resource to future discussions. The second goal is to classify the collected data according to a series of criteria. The catalog is also open to new content contribution, and fellow researchers are invited to provide additional entries of hand gesture scenes from any Sci-Fi title as well as suggestions about new classification criteria and amendments on the already provided content.</p>\n" +
    "\n" +
    "	<p>Enjoy it.</p>\n" +
    "\n" +
    "	<br />\n" +
    "\n" +
    "	<strong>Related Publications:</strong>\n" +
    "\n" +
    "	<p>Figueiredo, L. S., Maciel Pinheiro, M. G., Vilar Neto, E. X., & Teichrieb, V. (2015, April). An Open Catalog of Hand Gestures from Sci-Fi Movies. In Proceedings of the 33rd Annual ACM Conference Extended Abstracts on Human Factors in Computing Systems (pp. 1319-1324). ACM.</p>\n" +
    "\n" +
    "	<p>Figueiredo, L. S., Maciel Pinheiro, M. G., Vilar Neto, E. X., & Teichrieb, V.  (2015, September). Sci-Fi Gestures Catalog: Understanding the future of gestural interaction. In INTERACT.</p>\n" +
    "\n" +
    "	<br />\n" +
    "\n" +
    "	<strong>Contact the authors:</strong>\n" +
    "\n" +
    "	<p style=\"text-indent: 0px;\">Lucas S. Figueiredo (lsf@cin.ufpe.br) <br />\n" +
    "	Mariana G. Maciel Pinheiro (mgmp@cin.ufpe.br)<br />\n" +
    "	Edvar X. C. Vilar Neto (excvn@cin.ufpe.br)<br />\n" +
    "	Veronica Teichrieb (vt@cin.ufpe.br)</p>\n" +
    "\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "</div>\n" +
    "	");
  $templateCache.put("partials/cards.html",
    "<div class=\"alert alert-danger\" ng-if=\"pageGestures.length == 0\">\n" +
    "  <strong>Sorry, no gestures found for the current filters.</strong>\n" +
    "</div>\n" +
    "<div id=\"masonry-container\" masonry preserve-order reload-on-resize masonry-options=\"{percentPosition: true}\">\n" +
    "<div class=\"masonry-brick result-single\" \n" +
    "	ng-repeat=\"gesture in pageGestures\" ng-model=\"resultWidth\">\n" +
    "\n" +
    "  <div class=\"result-single-data\">\n" +
    "\n" +
    "    <div ng-repeat=\"(field, value) in gesture\" ng-if=\"schema[field].video\" class=\"aspect-ratio-wrapper\">\n" +
    "\n" +
    "        <youtube-thumb\n" +
    "          video-id=\"value\"\n" +
    "          player-width=\"'100%'\"\n" +
    "          player-height=\"'200px'\">\n" +
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
    "    	<p ng-if=\"schema[field].shown && !schema[field].title\"><strong>{{ schema[field].name | capitalize }}</strong>: {{ value | joinBy:', ' }} </p>\n" +
    "\n" +
    "    </div>\n" +
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
    "<div class=\"alert alert-danger\" ng-if=\"pageGestures.length == 0\">\n" +
    "  <strong>Sorry, no gestures found for the current filters.</strong>\n" +
    "</div>\n" +
    "\n" +
    "<table class=\"table table-bordered table-hover table-striped\"  ng-if=\"pageGestures.length > 0\">\n" +
    "\n" +
    "	<thead>\n" +
    "		<tr>\n" +
    "			<td ng-repeat=\"column in schema\" ng-if=\"column.title\">\n" +
    "        		<strong>{{ column.name | capitalize }}</strong>\n" +
    "    		</td>\n" +
    "			<td ng-repeat=\"column in schema\" ng-if=\"column.shown && !column.title\">\n" +
    "				<strong>{{ column.name | capitalize }}</strong>\n" +
    "			</td>\n" +
    "		</tr>\n" +
    "	</thead>\n" +
    "\n" +
    "	<tbody>\n" +
    "		<tr ng-repeat=\"gesture in pageGestures\">\n" +
    "\n" +
    "			<td ng-repeat=\"(field, value) in gesture\" ng-if=\"schema[field].title\">\n" +
    "        		<strong>{{ value | capitalize }}</strong>\n" +
    "    		</td>\n" +
    "\n" +
    "			<td ng-repeat=\"(field, value) in gesture\" ng-if=\"schema[field].shown && !schema[field].title\">\n" +
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
