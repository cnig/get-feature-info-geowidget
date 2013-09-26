/*
 *     Copyright (c) 2013 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 *     This file is part of the GeoWidgets Project,
 *
 *     http://conwet.fi.upm.es/geowidgets
 *
 *     Licensed under the GNU General Public License, Version 3.0 (the 
 *     "License"); you may not use this file except in compliance with the 
 *     License.
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     under the License is distributed in the hope that it will be useful, 
 *     but on an "AS IS" BASIS, WITHOUT ANY WARRANTY OR CONDITION,
 *     either express or implied; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *  
 *     See the GNU General Public License for specific language governing
 *     permissions and limitations under the License.
 *
 *     <http://www.gnu.org/licenses/gpl.txt>.
 *
 */

use("conwet");

conwet.Gadget = Class.create({

    initialize: function() {
        // EzWeb Events
        this.locationInfoEvent = new conwet.events.Event('location_info_event');
        //this.locationEvent     = new conwet.events.Event('location_event');
        this.linkUrlEvent      = new conwet.events.Event('link_url_event');

        this.featureInfoSlot = new conwet.events.Slot('feature_info_slot', function(feature){
            this.setFeature(feature.evalJSON());
        }.bind(this));
    },

    // TODO
    /*sendLocation: function(lon, lat) {
        this.locationEvent.send(lon + ", " + lat);
    },*/

    setFeature: function(feature) {
        $("info").innerHTML = feature.text;

        var links = $("info").getElementsByTagName("a");
        for (var i=links.length-1; i>=0; i--) {
            this._replaceLinkElement(links[i]);
        };
    },

    _replaceLinkElement: function(aElement) {
        if (aElement.mailto && (aElement.mailto != "")) {
            return;
        }
        var linkElement = this._createLinkElement(aElement.innerHTML, aElement.href);
        aElement.parentNode.insertBefore(linkElement, aElement);
        aElement.parentNode.removeChild(aElement);
    },

    _createLinkElement: function(value, href) {
        var link = document.createElement("span");
        $(link).addClassName("link");
        link.title = _("Send Event");
        link.appendChild(document.createTextNode(value));
        link.observe("click", function() {
            this.linkUrlEvent.send(href);
        }.bind(this));
        return link;
    },

});
